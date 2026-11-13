const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
const roles = require("../../data/roles");
const passwordValidation = require('../../functions/passwordValidation');
const Request = require("./Request");
const User = require("../User");
const Application = require('../Application');
const { addApplicationPermission } = require('../../controllers/cti-tool/user-settings-controllers');

class AccountRequest extends Request{
    static ModelClass = AccountRequest;

    constructor(request) {
        super(request, AccountRequest);
    }

    static async create({data, skipPrevRequestsValidation}) {
        const requestData = {
            requester: {
                name: data.profile.name,
                email: data.profile.email,
                cargillId: data.profile.cargillId,
                role: data.profile.role
            },
            data:{
                ...data
            },
            approvers: []
        };

        if(data.profile.role !== 'administrator') {
            const accountable = await User.get(
                {
                    _id: ObjectId(data.accountable)
                }, 
                {
                    project: {
                        _id: 1, 
                        profile: 1
                    }
                }
            );
    
            if(!accountable) {
                return {
                    ok: false,
                    status: 404,
                    json: {
                        message: 'Accountable not found'
                    }
                };
            }

            if(!roles[data.profile.role].accountableRoles.includes(accountable.profile.role)) {
                return {
                    ok: false, 
                    status: 401,
                    json: {
                        message: `${accountable.profile.name} cannot be your accountable.`
                    }
                };
            }

            const approver = {
                _id: accountable._id.toString(),
                ...accountable.profile
            };

            requestData.data.accountable = approver;
            requestData.approvers.push(approver);
        } else {
            const approvers = await User.getMany(
                {
                    'profile.role': 'administrator'
                }, 
                {
                    project: {
                        _id: 1, 
                        profile: 1
                    }
                }
            );

            requestData.approvers.push(...approvers.map(approver => ({
                _id: approver._id.toString(),
                ...approver.profile
            })));

            delete requestData.data.accountable;
        }

        if(!requestData.approvers || !requestData.approvers.length) {
            return {
                ok: false,
                status: 404,
                json: {
                    message: 'Approver not found'
                }
            };
        }

        // let newId = new ObjectId();
        
        // while(true) {
        //     const userWithNewId = await User.get({_id: newId});
        //     const accountRequestWithNewId = await AccountRequest.get({requester: newId});
    
        //     if(!userWithNewId && !accountRequestWithNewId) break;
    
        //     newId = new ObjectId();
        // }

        // requestData.data._id = newId;

        if(data.ctiApplications) {
            requestData.data.ctiApplications = await Application.getMany(
                {
                    _id: {$in: data.ctiApplications.map(application => ObjectId(application))},
                    status: {$ne: 'not supported by Wipro'}
                },
                {
                    projection: {
                        name: 1,
                        country: 1,
                        'support group': 1
                    }
                }
            );
        }

        const request = new AccountRequest(requestData);
    
        const result = await request.save({data: {skipPrevRequestsValidation}});
    
        if(!result.ok) return result;

        return {
            ok: true,
            status: 200,
            notification: {
                author: 'system',
                addressee: requestData.approvers.map(approver => approver._id),
                code: 'request-new-account',
                data: {
                    requester: data.profile.name
                }
            },
            json: {
                status: 'ok',
                approvers: requestData.approvers,
                message: 'Request done!'
            }
        }
    }

    static canBeApprover(user, data) {
        return user._id.toString() === data.accountable._id;
    }

    async canApprove(user) {
        return AccountRequest.canBeApprover(user, this.document.data);
    }

    onSetDocument({document}) {
        document.type = 'new account';
    }

    validation() { 
        for(let value in this.document.data) {
            if(!this.document.data[value]) return {ok: false};
        }      

        for(let value in this.document.data.profile) {
            if(!this.document.data.profile[value]) return {ok: false};
        }

        return {ok: true};
    }

    async onApprove() {
        const data = {...this.document.data};
        data.accountables = [data.accountable];

        let ctiApplications = null;

        if(data.ctiApplications) {
            ctiApplications = data.ctiApplications.map(application => application._id);
            delete data.ctiApplications
        }

        if(data.profile.role === 'administrator') {
            const applications = await Application.getMany(
                {status: {$ne: 'not supported by Wipro'}}, 
                {projection: {
                    _id: 1
                }}
            );

            ctiApplications = applications.map(application => application._id.toString());
        }

        const createUserResult = await User.create(data, !ctiApplications);

        if(!createUserResult.ok) return createUserResult;

        if(ctiApplications) {
            const result = await addApplicationPermission(createUserResult.user, ctiApplications);
            if(!result.ok) return result;
        }
        
        return {
            ok: true, 
            newUserId: createUserResult.user._id,
            json: {
                message: 'Request approved.'
            }
        };
    }

    async beforeSave({data}) {
        if(this._id) return {ok: true};

        const checkUserExistenceResult = await this.checkUserExistence();
        if(!checkUserExistenceResult.ok) return checkUserExistenceResult;

        
        if(!data.skipPrevRequestsValidation) {
            const checkForPrevRequestResult = await this.checkForPrevRequest();
            if(!checkForPrevRequestResult.ok) return checkForPrevRequestResult;
        }
        
        // const checkApproverResult = await this.checkApprover();
        // if(!checkApproverResult.ok) return checkApproverResult;
        
        const validatePasswordResult = await this.validatePassword();
        if(!validatePasswordResult.ok) return validatePasswordResult;

        return {
            ok: true,
            request: {approvers: this.document.approvers}
        };
    }

    async checkUserExistence() {
        const data = this.document.data;

        const user = await User.get({$or: [
            {'profile.email': data.profile.email},
            {'profile.cargillId': data.profile.cargillId}
        ]});
        
        if(user) {
            const messageText = user.profile.email === data.profile.email
                ? `email ${data.profile.email}` 
                : `Cargill ID ${data.profile.cargillId}`

            const response = {
                ok: false,
                status: 499,
                json: {
                    status: user.status,
                    userConflictingData: user.profile.email === data.profile.email? data.profile.email : data.profile.cargillId,
                    message: `The ${messageText} already has an account.`
                }
            };

            if(user.status === 'locked') {
                const accountable = await User.get({_id: ObjectId(user.accountable)}); 
                response.json.accountableContact = accountable.profile.email;
                response.json.message = `The ${messageText} already has a locked account.`
            }

            return response;
        }

        return {ok: true};
    }

    async checkForPrevRequest() {
        const data = this.document.data;

        const lastRequest = await Request.get(
            {
                type: 'new account', 
                $or: [
                    {'data.profile.email': data.profile.email},
                    {'data.profile.cargillId': data.profile.cargillId}
                ],
                status: {$ne: 'expired'}
            },
            {
                sort: {'meta.createdOn': -1}
            }, 
            null, 
            false
        );

        if(lastRequest) {
            const messageText = lastRequest.data.profile.email === data.profile.email
                ? `email ${data.profile.email}` 
                : `Cargill ID ${data.profile.cargillId}`

            return {
                ok: false,
                status: 499,
                json: {
                    status: lastRequest.status, 
                    approvers: lastRequest.approvers,
                    userConflictingData: lastRequest.data.profile.email === data.profile.email? data.profile.email : data.profile.cargillId,
                    message: lastRequest.status === 'refused' 
                        ? `An account request for ${messageText} has already been made and has been refused.`
                        : `There is already an account request for ${messageText}.`
                }
            };
        }

        return {ok: true};
    }

    // async checkApprover() {
    //     const approver = await User.get({_id: ObjectId(this.document.approvers[0]._id)});
        
    //     if(!approver) {
    //         return {
    //             ok: false,
    //             status: 404,
    //             json: {
    //                 message: 'Approver not found'
    //             }
    //         };
    //     }

    //     //qualquer approver pode aprovar uma solicitação de seu accountable
    //     if(!roles[this.document.data.profile.role].accountableRoles.includes(approver.profile.role)) {
    //         return {
    //             ok: false, 
    //             status: 401,
    //             json: {
    //                 message: 'The approver can not authorize your request.'
    //             }
    //         };
    //     }

    //     return {ok: true};
    // }

    async validatePassword() {
        const validationResult = passwordValidation(this.document.data.password);

        if(!validationResult.ok) return validationResult;
        
        this.document.data.password = await bcrypt.hash(this.document.data.password, 12);

        return {ok: true};
    }
}

module.exports = AccountRequest;