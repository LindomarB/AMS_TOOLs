const Request = require("./Request");
const AccountableChangeRequest = require("./AccountableChangeRequest");
const Notification = require("../notification/Notification");

class AccountableRemovalRequest extends Request {
    static ModelClass = AccountableRemovalRequest;

    constructor(request) {
        super(request, AccountableRemovalRequest);
    }

    onSetDocument({document, request}) {
        document.type = 'accountable removal';
        document.data.accountable = request.data.accountable;
    }

    static async createData({requester, data}) {
        const { getUser } = require("../../controllers/ams-tools/user-controllers");

        if(!requester.getPrimaryAccountables().some(accountable => accountable._id === data.accountable)) {
            return {
                ok: false,
                status: 400,
                json:{
                    message: `The accountable is not one of user's primary accountable`
                }
            };
        }

        if(requester.accountables.length < 2) {
            return {
                ok: false,
                status: 401,
                json:{
                    message: `The accountable is solely accountable for the user and cannot be removed`
                }
            };
        }

        const result = await getUser(data.accountable);

        if(!result.ok) return result;

        if(data.cancelPendingRequest) {
            const pendingRequests = await Request.getMany({
                'requester._id': requester._id.toString(), 
                status: {$in : ['pending', 'approval in progress']},
                type: 'accountable change', 
                'data.currentAccountable._id': data.accountable
            });

            for(let data of pendingRequests) {
                const request = new Request(data);
                const result = await request.cancel();

                if(!result.ok) return result;
            }
        }

        return {
            ok: true,
            data:{
                accountable: {
                    _id: result.user._id.toString(),
                    ...result.user.profile,
                }
            }
        };
    }

    static async createApprovers({data}) {
        return {
            ok: true,
            approvers: [data.accountable],
            mandatoryApprovers: [[data.accountable._id]],
        };
    }

    static canBeApprover(user, data) {
        return user._id.toString() === data.accountable._id;
    }

    async canApprove(user) {
        return AccountableRemovalRequest.canBeApprover(user, this.document.data);
    }

    async onApprove() {
        const { removeUserAccountable } = require("../../controllers/ams-tools/user-controllers");

        const result = await removeUserAccountable(this.document.requester._id, this.document.data.accountable._id);

        if(result.ok && result.addedPrimaryAccountables && result.addedPrimaryAccountables.length) {
            await Notification.create({
                author: 'system',
                addressee: result.addedPrimaryAccountables,
                code: 'team manager-accountable-indirect member change',
                data: {
                    accountable: this.document.data.accountable.name,
                    member: this.document.requester.name
                }
            });
        }

        return result;
    }

    async beforeSave() {
        const pendingRequest = await Request.get({
            _id: {$ne: this._id},
            'requester._id': this.document.requester._id, 
            status: {$in : ['pending', 'approval in progress']},
            $or: [
                {
                    type: 'accountable change', 
                    'data.currentAccountable._id': this.document.data.accountable._id
                },
                {type: 'role change'},
                {
                    type: 'accountable removal', 
                    'data.accountable._id': this.document.data.accountable._id
                }
            ]
        }, null, false);

        if(pendingRequest) {
            return {
                ok: false,
                status: 499,
                json: {
                    pendingRequest: {
                        _id: pendingRequest._id,
                        type: pendingRequest.type
                    },
                    message: `There is a ${pendingRequest.type} request in progress`
                }
            }
        }

        return {ok: true};
    }

    async _afterSave() {
        const pendingRequests = await Request.getMany({
            'requester._id': this.document.requester._id, 
            type: 'accountable change', 
            status: 'pending',
            'data.currentAccountable._id': this.document.data.accountable._id
        });

        for(let pendingRequest of pendingRequests) {
            const request = new AccountableChangeRequest(pendingRequest);

            try {
                await request.cancel();
            } catch(err) {
                console.log(err);
            }
        }

        return {ok: true};
    }

    async validation() {
        return {
            ok: !!this.document.data.accountable
        };
    }
}

module.exports = AccountableRemovalRequest