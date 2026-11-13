const { ObjectId } = require("mongodb");
const roles = require("../../data/roles");
const Request = require("./Request");
const User = require("../User");
const { addUserAccess } = require("../../controllers/ams-tools/user-controllers");

class ToolRequest extends Request{
    static ModelClass = ToolRequest;

    constructor(request) {
        super(request, ToolRequest);
    }

    static canBeApprover(user, data) {
        return user.accesses.includes(data.access);
    }

    async canApprove(user) {
        return ToolRequest.canBeApprover(user, this.document.data);
    }

    onSetDocument({document, request}) {
        document.type = 'tool';
        document.data.access = request.data.access;
    }

    async onApprove() {
        const user = await User.get({_id: ObjectId(this.document.requester._id)});
        const result = await addUserAccess(user, this.document.data.access);

        if(!result.ok) return result;

        return {
            ok: true,
            json: {
                message: 'Request approved.'
            }
        };
    }

    async validation() {
        const user = await User.get({_id: ObjectId(this.document.requester._id)});
        
        return {
            ok: roles[user.profile.role].allowedAccesses.includes(this.document.data.access)
        };
    }

    async beforeSave() {
        if(!this._id) {
            const requester = await User.get({_id: ObjectId(this.document.requester._id)});
    
            if(requester.accesses.includes(this.document.data.access)) {
                return {
                    ok: false,
                    status: 499,
                    json: {
                        message: `You already have access to ${this.document.data.access}.`
                    }
                };
            }
    
            const pendingRequest = await ToolRequest.get({
                type: 'tool', 
                'requester._id': this.document.requester._id, 
                status: 'pending', 
                'data.access': this.document.data.access
            });
    
            if(pendingRequest) {
                return {
                    ok: false,
                    status: 499,
                    json: {
                        message: `The access to ${this.document.data.access} has already been requested and is awaiting a response.`
                    }
                };
            }
        }

        return {ok: true};
    }
}

module.exports = ToolRequest;