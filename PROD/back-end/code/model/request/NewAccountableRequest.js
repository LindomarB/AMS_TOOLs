const Request = require("./Request");

class NewAccountableRequest extends Request {
    static ModelClass = NewAccountableRequest;

    constructor(request) {
        super(request, NewAccountableRequest);
    }

    onSetDocument({document, request}) {
        document.type = 'new accountable';
        document.data.newAccountable = request.data.newAccountable;
    }

    static async createData({requester, data}) {
        const { getUser } = require("../../controllers/ams-tools/user-controllers");

        if(requester.isAccountable(data.newAccountable)) {
            return {
                ok: false,
                status: 499,
                json:{
                    message: 'The new accountable is already a user accountable'
                }
            };
        }

        const result = await getUser(data.newAccountable);

        if(!result.ok) return result;

        return {
            ok: true,
            data:{
                newAccountable: {
                    _id: result.user._id.toString(),
                    ...result.user.profile,
                }
            }
        };
    }

    static async createApprovers({data}) {
        return {
            ok: true,
            approvers: [data.newAccountable],
            mandatoryApprovers: [[data.newAccountable._id]],
        };
    }

    static canBeApprover(user, data) {
        return user._id.toString() === data.newAccountable._id;
    }

    async canApprove(user) {
        return NewAccountableRequest.canBeApprover(user, this.document.data);
    }

    async onApprove() {
        const { addMemberToTeam } = require("../../controllers/team-manager/manage-team-controllers");
        return await addMemberToTeam(this.document.requester._id, this.document.data.newAccountable._id);
    }

    async beforeSave() {
        const pendingRequest = await Request.get({
            _id: {$ne: this._id},
            'requester._id': this.document.requester._id, 
            status: {$in : ['pending', 'approval in progress']},
            $or: [
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
                status: 200,
                json: {
                    pendingRequestId: pendingRequest._id,
                    message: `There is a ${pendingRequest.type} request in progress`
                }
            }
        }

        return {ok: true};
    }

    async _afterSave() {
        const { getUser } = require("../../controllers/ams-tools/user-controllers");

        const getUserResult = await getUser(this.document.data.newAccountable._id);

        if(!getUserResult.ok) return getUserResult;

        const newAccountable = getUserResult.user;

        const pendingRequests = await Request.getMany({
            'requester._id': this.document.requester._id, 
            type: 'new accountable', 
            status: 'pending',
            'data.newAccountable._id': {$in: newAccountable.accountables.map(accountable => accountable._id)}
        });

        for(let pendingRequest of pendingRequests) {
            const request = new NewAccountableRequest(pendingRequest);

            try {
                await request.cancel();
            } catch(err) {
                console.log(err);
            }
        }

        return {ok: true};
    }

    validation() {
        return {
            ok: !!this.document.data.newAccountable
        };
    }
}

module.exports = NewAccountableRequest