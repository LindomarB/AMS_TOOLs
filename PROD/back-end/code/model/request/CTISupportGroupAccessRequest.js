const Application = require("../Application");
const Request = require("./Request");
const User = require("../User");
const CTIApplicationPermissionRequest = require("./CTIApplicationPermissionRequest");
const { ObjectId } = require("mongodb");

class CTISupportGroupRequest extends Request {
    static ModelClass = CTISupportGroupRequest;

    constructor(request) {
        super(request, CTISupportGroupRequest);
    }

    static async createData({data}) {
        const supportGroupApplications = await Application.getMany(
            {
                'support group': data.supportGroup,
                status: {$ne: 'not supported by Wipro'}
            },
            {
                projection: {
                    name: 1,
                    country: 1
                }
            }
        );

        if(!supportGroupApplications.length) {
            return {
                ok: false,
                status: 404,
                json: {
                    message: `No applications were found for support group ${data.supportGroup}`
                }
            };
        }

        return {
            ok: true,
            data: {
                supportGroup: data.supportGroup,
                applications: supportGroupApplications.map(application => ({
                    ...application,
                    _id: application._id.toString()
                }))
            }
        };
    }

    static canBeApprover(user, data) {
        const userApplications = user.getSettings('cti tool', 'applications') || [];
        return data.applications.every(application => userApplications.includes(application._id));
    }

    async canApprove(user) {
        return CTISupportGroupRequest.canBeApprover(user, this.document.data);
    }

    onSetDocument({document, request}) {
        document.type = 'cti support group access';
        document.data.supportGroup = request.data.supportGroup;
        document.data.applications = request.data.applications;
    }

    async validation() {
        const someApplication = await Application.get({'support group': this.document.data.supportGroup});
        return {ok: !!someApplication};
    }

    async onApprove() {
        const { addApplicationPermission } = require("../../controllers/cti-tool/user-settings-controllers");

        const user = await User.get({_id: ObjectId(this.document.requester._id)});
        return await addApplicationPermission(user, this.document.data.applications.map(application => application._id));
    }

    async beforeSave() {
        if(!this._id) {
            const requester = await User.get({_id: ObjectId(this.document.requester._id)});
            const supportGroupApplications = this.document.data.applications.map(application => application._id);
            const requesterApplications = requester.getSettings('cti tool', 'applications') || [];

            if(supportGroupApplications.every(application => requesterApplications.includes(application))) {
                return {
                    ok: false,
                    status: 499,
                    json: {
                        message: `You already have access to all applications in ${this.document.data.supportGroup} support group.`
                    }
                };
            }
    
            const pendingRequest = await Request.get({
                type: this.document.type, 
                'requester._id': this.document.requester._id, 
                status: 'pending', 
                'data.supportGroup': this.document.data.supportGroup
            });
    
            if(pendingRequest) {
                return {
                    ok: false,
                    status: 499,
                    json: {
                        message: `The access to ${this.document.data.supportGroup} has already been requested and is awaiting a response.`
                    }
                };
            }
        }

        return {ok: true};
    }

    async _afterSave() {
        const supportGroupApplications = this.document.data.applications.map(application => application._id);
        const pendingApplicationPermissionRequests = await Request.getMany({
            'requester._id': this.document.requester._id, 
            type: 'cti application access', 
            status: 'pending',
            'data.application._id': {$in: supportGroupApplications}
        });

        for(let pendingRequest of pendingApplicationPermissionRequests) {
            const request = new CTIApplicationPermissionRequest(pendingRequest);

            try {
                await request.cancel();
            } catch(err) {
                console.log(err);
            }
        }

        return {ok: true};
    }
}

module.exports = CTISupportGroupRequest;