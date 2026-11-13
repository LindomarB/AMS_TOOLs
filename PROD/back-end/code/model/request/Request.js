const { ObjectId } = require('mongodb');
const User = require('../User');
const Model = require('../Model');

class Request extends Model {
    static collection = 'requests';
    static ModelClass = Request;

    constructor(request, model) {
        super(model || Request, request);
    }

    static async create({requester, data, notSave}) { 
        if(this.createData) {
            const createDataResult = await this.createData({requester, data});
            if(!createDataResult.ok) return createDataResult;
            data = createDataResult.data;
        }

        let approvers = [];
        let mandatoryApprovers = null;

        if(this.createApprovers) {
            const createApproversResult = await this.createApprovers({requester, data});
            if(!createApproversResult.ok) return createApproversResult;
            approvers = createApproversResult.approvers;
            mandatoryApprovers = createApproversResult.mandatoryApprovers;
        } else {
            const requesterAccountables = await User.getMany({
                _id: {$in: requester.accountables.map(accountable => ObjectId(accountable._id))}
            }, null, true);
    
            for(let accountable of requesterAccountables) {
                if(await this.canBeApprover(accountable, data)) {
                    approvers.push(
                        requester.accountables.find(requesterAccountable => requesterAccountable._id === accountable._id.toString())
                    );
                }
            }
        }

        if(!approvers || !approvers.length) {
            return {
                ok: false,
                status: 404,
                json: {
                    message: 'No approvers found'
                }
            }
        }

        const request = new this.ModelClass({
            requester: {
                _id: requester._id.toString(),
                ...requester.profile,
                accountable: requester.accountable,
                accountables: requester.accountables
            },
            data,
            approvers,
            mandatoryApprovers
        });

        if(notSave) {
            return {
                ok: true,
                request,
                notification: request.getNotification({type: 'new'}),
            }
        }

        const result = await request.save();
        
        if(!result.ok) return result;

        return {
            ok: true,
            status: 200,
            request,
            notification: request.getNotification({type: 'new'}),
            json: {
                ...result.json,
                message: 'Request done!'
            }
        }
    }
    
    static async canBeApprover(user, data) {
        return true;
    }

    async canApprove(user) {
        return await this.ModelClass.canBeApprover(user, this.document.data);
    }

    static queryParser(query) {
        if(query['meta.createdOn']) {
            for(let operator in query['meta.createdOn']) {
                query['meta.createdOn'][operator] = new Date(query['meta.createdOn'][operator]);
            }
        }
    }

    setDocument(request) {
        const document = {};

        document._id = request._id;
        document.requester = request.requester;
        document.data = request.data || {};
        document.meta = request.meta || {
            createdOn: new Date()
        };
        document.status = request.status || 'pending';
        document.approvers = request.approvers;

        if(request.mandatoryApprovers) {
            document.mandatoryApprovers = request.mandatoryApprovers;
        }

        this.onSetDocument && this.onSetDocument({document, request});

        this.document = document;
    }

    getNotification({type, data = {}}) {
        let code = null;
        let notificationData = null;
        let addressee = null;

        if(type === 'new') {
            code = `request-new-${this.document.type}`;
            notificationData = {
                ...this.document.data,
                requester: this.document.requester.name
            };
            addressee = this.getApproversToNotify();
        } else if(type === 'cancel') {
            code = `request-cancel`;
            notificationData = {
                type: this.document.type,
                requester: this.document.requester.name
            };
            addressee = this.getApproversToNotify();
        } else if(type === 'response') {
            code = `request-response-${data.response}`;
            notificationData = {
                approver: data.approver,
                type: this.document.type
            };
            addressee = this.document.requester._id;
        } else if(type === 'expiration') {
            return {
                requester: {
                    author: 'system',
                    addressee: this.document.requester._id,
                    code: `request-requester-expiration${data.warning? '-warning' : ''}`,
                    data: {
                        type: this.document.type,
                        remainingDays: data.remainingDays
                    }
                },
                approver: {
                    author: 'system',
                    addressee: this.getApproversToNotify(),
                    code: `request-new-expiration${data.warning? '-warning' : ''}`,
                    data: {
                        type: this.document.type,
                        remainingDays: data.remainingDays,
                        requester: this.document.requester.name,
                    }
                }
            };
        } 
        
        return {
            author: 'system',
            code,
            addressee,
            data: notificationData
        };
    }

    getApproversToNotify() {
        const approvers = this.document.mandatoryApprovers? this.document.mandatoryApprovers.flat() : [];

        this.document.approvers.filter(approver => approver.primary)
        .forEach(approver => {
            if(!approvers.includes(approver._id)) {
                approvers.push(approver._id);
            }
        });

        if(!approvers.length) {
            approvers.push(...this.document.approvers.map(approver => approver._id));
        }

        return approvers;
    }

    async addApprovers(approvers = []) {
        if(this.document.status !== 'pending' || this.document.status !== 'approval in progress') return;

        const requester = await User.get({_id: ObjectId(this.document.requester._id)});

        approvers = await User.getMany({
            _id: {$in: approvers.map(approver => ObjectId(approver))}
        }, null, true);

        const newApprovers = [];

        for(let approver of approvers) {
            if(await this.canApprove(approver, this.document.data)) {
                newApprovers.push(
                    requester.accountables.find(accountable => accountable._id === approver._id.toString())
                );
            }
        }

        this.document.approvers = this.document.approvers.filter(approver => !newApprovers.some(newApprover => newApprover._id === approver._id));
        this.document.approvers.push(...newApprovers);

        // newApprovers.forEach(newApprover => {    
        //     if(!this.document.approvers.some(approver => approver._id === newApprover._id)) {
        //         this.document.approvers.push(newApprover);
        //     }
        // });

        const result = await this.save();

        if(result.ok) await this.checkApproverAlerts(this.document.approvers.map(approver => approver._id));
        
        return result;
    }

    async removeApprovers(approvers = []) {
        if(this.document.status !== 'pending' || this.document.status !== 'approval in progress') return;

        const requester = await User.get({_id: ObjectId(this.document.requester._id)});
        const newApprovers = this.document.approvers.filter(approver => !approvers.includes(approver._id));

        const hasPrimaryAccountable = requester.getPrimaryAccountables().some(primaryAccountable => 
            newApprovers.some(newApprover => newApprover._id === primaryAccountable._id)
        );

        // if((!this.document.mandatoryApprovers || !this.document.mandatoryApprovers.length) && (!newApprovers.length || !hasPrimaryAccountable)) {
        //     return await this.cancel();
        // }
        
        if(!newApprovers.length || !hasPrimaryAccountable) {
            return await this.cancel();
        }

        this.document.approvers = newApprovers;
        
        const result = await this.save();

        if(result.ok) await this.checkApproverAlerts([...this.document.approvers.map(approver => approver._id), ...approvers]);
        
        return result;
    }

    async setApproverResponse(approverId, approverPassword, response, refusalReason) {
        const approver = this.document.approvers.find(approver => approver._id === approverId);

        if(!approver) {
            return {
                ok: false,
                status: 401,
                json: {
                    message: 'The approver not found.'
                }
            };
        }

        const approverModel = await User.get({_id: ObjectId(approver._id)});
        const passwordValidation = await approverModel.validatePassword(approverPassword);

        if(!passwordValidation.ok) return passwordValidation;

        if(approver.response) {
            return {
                ok: false,
                status: 400,
                json: {
                    message: 'The approver has already responded to this request.'
                }
            };
        }

        approver.response = response;
        approver.respondedOn = new Date();

        if(refusalReason) approver.refusalReason = refusalReason;

        return {
            ok: true,
            approver
        };
    }

    async alertApprovers() {
        const approversToNotify = this.getApproversToNotify();

        for(let approverId of approversToNotify) {    
            const approver = await User.get({_id: ObjectId(approverId)});

            if(!approver) continue;

            const alerts = approver.getSettings('alerts') || {};
            alerts['team requests'] = true;
            await approver.setSettings('alerts', null, alerts);
        }

        return {ok: true};
    }

    async checkApproverAlerts(approvers) { 
        if(!approvers) {
            approvers = this.getApproversToNotify();
        }

        for(let approverId of approvers) {
            const pendingRequests = await Request.get({
                $or: [
                    {
                        $and: [
                            {
                                mandatoryApprovers: {
                                    $elemMatch: {
                                        $elemMatch: {
                                            $eq: approverId
                                        }
                                    }
                                }
                            },
                            {
                                approvers: {
                                    $elemMatch: {
                                        _id: approverId, 
                                        response: {$exists: false}
                                    }
                                }
                            }
                        ]
                    },
                    {
                        approvers: {
                            $elemMatch: {
                                _id: approverId, 
                                primary: true,
                                response: {$exists: false}
                            }
                        }
                    },
                    {
                        'type': 'new account',
                        approvers: {
                            $elemMatch: {
                                _id: approverId, 
                                response: {$exists: false}
                            }
                        },
                    }
                ],
                status: {$in: ['pending', 'approval in progress']}
            });

            const approver = await User.get({_id: ObjectId(approverId)});

            if(!approver) continue;

            const alerts = approver.getSettings('alerts') || {};

            if(pendingRequests) {
                alerts['team requests'] = true;
            } else {
                delete alerts['team requests'];
            }
      
            await approver.setSettings('alerts', null, alerts);
        }
    }

    async expire() {
        const checkStatus = this.checkStatus();
        if(!checkStatus.ok) return checkStatus;

        this.document.status = 'expired';
        this.document.meta.expiredOn = new Date();

        const saveResult = await this.save();

        if(!saveResult.ok) return saveResult;

        await this.checkApproverAlerts();

        return {
            ...saveResult,
            status: 200,
            json: {
                message: 'Request expired.'
            },
            notification: this.getNotification({type: 'expiration'})
        }
    }
    
    async cancel() {
        const checkStatus = this.checkStatus();
        if(!checkStatus.ok) return checkStatus;

        this.document.status = 'canceled';
        this.document.meta.canceledOn = new Date();

        const saveResult = await this.save();

        if(!saveResult.ok) return saveResult;

        await this.checkApproverAlerts();

        return {
            ...saveResult,
            status: 200,
            json: {
                message: 'Request canceled.'
            },
            notification: this.getNotification({type: 'cancel'})
        }
    }

    async refuse(approverId, approverPassword, refusalReason) {
        const checkStatus = this.checkStatus();
        if(!checkStatus.ok) return checkStatus;

        const response = await this.setApproverResponse(approverId, approverPassword, 'refused', refusalReason);

        if(!response.ok) return response;

        this.document.status = 'refused';
        this.document.meta.refusedOn = new Date();

        const saveResult = await this.save();

        if(!saveResult.ok) return saveResult;

        await this.checkApproverAlerts();

        return {
            ...saveResult,
            status: 200,
            json: {
                message: 'Request refused.'
            },
            notification: this.getNotification({
                type: 'response', 
                data: {
                    response: this.document.status,
                    approver: response.approver.name
                }
            })
        }
    }

    async approve(approverId, approverPassword) {
        const checkStatus = this.checkStatus();
        if(!checkStatus.ok) return checkStatus;

        const response = await this.setApproverResponse(approverId, approverPassword, 'approved');
        if(!response.ok) return response;

        let approved = true;

        if(this.document.mandatoryApprovers) {
            approved = this.document.mandatoryApprovers.every(approvers => {
                const approved = approvers.some(approverId => {
                    const approver = this.document.approvers.find(approver => approver._id === approverId) || {};
                    return approver.response
                });

                return approved;
            });            
        }

        if(approved) {
            const onApproveResult = await this.onApprove();

            if(!onApproveResult.ok) return onApproveResult;

            this.document.status = 'approved';
            this.document.meta.approvedOn = new Date();
        } else {
            this.document.status = 'approval in progress';
        }
        
        const saveResult = await this.save();

        if(!saveResult.ok) return saveResult;

        await this.checkApproverAlerts();

        return {
            ...saveResult,
            status: 200,
            json: {
                message: this.document.status === 'approved'? 'Request approved' : 'Request updated'
            },
            notification: this.getNotification({
                type: 'response', 
                data: {
                    response: this.document.status,
                    approver: response.approver.name
                }
            })
        };
    }

    checkStatus() {
        if(this.document.status === 'pending' || this.document.status === 'approval in progress') return {ok: true};

        return {
            ok: false,
            status: 499,
            json: {
                message: `This request has already been ${this.document.status}.`
            }
        };
    }

    onApprove() {
        return {
            ok: true,
            json: {
                message: 'Request approved.'
            }
        }
    }

    async afterSave({results}) {
        this._afterSave && await this._afterSave();

        if(results.save.dbResponse.insertedId) {
            await this.alertApprovers();
        }

        return {ok: true};
    }
}

module.exports = Request;