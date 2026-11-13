const Request = require("./Request");

class AccountableChangeRequest extends Request {
    static ModelClass = AccountableChangeRequest;

    constructor(request) {
        super(request, AccountableChangeRequest);
    }

    static async createData({requester, data}) {
        const { getUser } = require("../../controllers/ams-tools/user-controllers");

        if(requester.isAccountable(data.newAccountable)) {
            return {
                ok: false,
                status: 400,
                json:{
                    message: 'The new accountable is already a user accountable'
                }
            };
        }

        const newAccountable = await getUser(data.newAccountable);

        if(!newAccountable.ok) return newAccountable;

        if(!requester.isAccountable(data.currentAccountable)) {
            return {
                ok: false,
                status: 400,
                json:{
                    message: `The accountable is not one of user's primary accountable`
                }
            };
        }

        if(data.cancelPendingRequest) {
            const pendingRequests = await Request.getMany({
                'requester._id': requester._id.toString(), 
                status: {$in : ['pending', 'approval in progress']},
                type: 'accountable removal', 
                'data.accountable._id': data.currentAccountable
            });

            for(let data of pendingRequests) {
                const request = new Request(data);
                const result = await request.cancel();

                if(!result.ok) return result;
            }
        }

        const currentAccountable = requester.accountables.find(accountable => accountable._id === data.currentAccountable);
        delete currentAccountable.primary;

        return {
            ok: true,
            data:{
                newAccountable: {
                    _id: newAccountable.user._id.toString(),
                    ...newAccountable.user.profile,
                },
                currentAccountable
            }
        };
    }

    static async createApprovers({data}) {
        return {
            ok: true,
            approvers: [data.newAccountable, data.currentAccountable],
            mandatoryApprovers: [[data.newAccountable._id], [data.currentAccountable._id]]
        };
    }

    static canBeApprover(user, data) {
        return user._id.toString() === data.newAccountable._id || user._id.toString() === data.currentAccountable._id;
    }

    async canApprove(user) {
        return AccountableChangeRequest.canBeApprover(user, this.document.data);
    }

    onSetDocument({document, request}) {
        document.type = 'accountable change';
        document.data.currentAccountable = request.data.currentAccountable;
        document.data.newAccountable = request.data.newAccountable;
    }
    

    async onApprove() {
        const { addMemberToTeam, removeMemberFromTeam } = require("../../controllers/team-manager/manage-team-controllers");

        const addAccountable =  await addMemberToTeam(this.document.requester._id, this.document.data.newAccountable._id);
        if(!addAccountable.ok) return addAccountable;

        const removeAccountable = await removeMemberFromTeam(this.document.requester._id, this.document.data.currentAccountable._id);
        if(!removeAccountable.ok) return removeAccountable;

        return {ok: true};
    }

    async beforeSave() {
        const pendingRequest = await Request.get({
            _id: {$ne: this._id},
            'requester._id': this.document.requester._id, 
            status: {$in : ['pending', 'approval in progress']},
            $or: [
                {
                    type: 'accountable removal', 
                    'data.accountable._id': this.document.data.currentAccountable._id
                },
                {type: 'role change'},
                {
                    type: {$in: ['new accountable', 'accountable change']}, 
                    'data.newAccountable._id': this.document.data.newAccountable._id
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

    validation() {
        return {
            ok: !!(this.document.data.newAccountable && this.document.data.currentAccountable)
        };
    }
}

module.exports = AccountableChangeRequest