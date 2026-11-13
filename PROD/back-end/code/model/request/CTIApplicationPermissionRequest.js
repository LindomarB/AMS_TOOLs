const ObjectId = require("mongodb").ObjectId;
const Application = require("../Application");
const Request = require("./Request");
const User = require("../User");
const { parseId } = require("../../controllers/database/database-controllers");

class CTIApplicationPermissionRequest extends Request {
    static ModelClass = CTIApplicationPermissionRequest;
    
    constructor(request) {
        super(request, CTIApplicationPermissionRequest);
    }

    static async createData({data}) {
        const applicationId = parseId(data.application);

        const application = applicationId && await Application.get(
            {
                _id: applicationId
            },
            {
                projection: {
                    name: 1,
                    country: 1,
                    'support group': 1
                }
            },
            false
        );

        if(!application) {
            return {
                ok: false,
                status: 404,
                json: {
                    message: `The application do not exists`
                }
            };
        }

        return {
            ok: true,
            data: {
                application: {
                    ...application,
                    _id: application._id.toString()
                }
            }
        };
    }

    static canBeApprover(user, data) {
        const userApplications = user.getSettings('cti tool', 'applications') || [];
        return userApplications.includes(data.application._id);
    }

    async canApprove(user) {
        return CTIApplicationPermissionRequest.canBeApprover(user, this.document.data);
    }

    onSetDocument({document, request}) {
        document.type = 'cti application access';
        document.data.application = request.data.application;
    }

    async validation() {
        const application = this.document.data.application;

        if(!application._id || !application.name || !application.country || !application['support group']) return {ok: false};

        const applicationExists = await Application.get({_id: ObjectId(application._id)});
        return {ok: !!applicationExists};
    }

    async onApprove() {
        const { addApplicationPermission } = require("../../controllers/cti-tool/user-settings-controllers");

        const user = await User.get({_id: ObjectId(this.document.requester._id)});
        return await addApplicationPermission(user, [this.document.data.application._id]);
    }

    async beforeSave() {
        if(!this._id) {
            const requester = await User.get({_id: ObjectId(this.document.requester._id)});
            const requesterApplications = requester.getSettings('cti tool', 'applications') || [];
    
            if(requesterApplications.includes(this.document.data.application._id)) {
                return {
                    ok: false,
                    status: 499,
                    json: {
                        message: `You already have access to this application.`
                    }
                };
            }
    
            const pendingRequest = await Request.get({
                type: this.document.type, 
                'requester._id': this.document.requester._id, 
                status: 'pending', 
                'data.application._id': this.document.data.application._id
            });
    
            if(pendingRequest) {
                return {
                    ok: false,
                    status: 499,
                    json: {
                        message: `The access to this application has already been requested and is awaiting a response.`
                    }
                };
            }
        }

        return {ok: true};
    }
}

module.exports = CTIApplicationPermissionRequest;