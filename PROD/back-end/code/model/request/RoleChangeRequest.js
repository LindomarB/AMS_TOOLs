const { ObjectId } = require("mongodb");
const { getDb } = require("../../database/databaseOld");
const Request = require("./Request");
const User = require("../User");

class RoleChangeRequest extends Request {
    constructor(request) {
        super(request);
        this.type = 'role change';
        this.data.newRole = request.data.newRole;
        this.data.previousRole = request.data.previousRole;
        this.data.newAccountable = request.data.newAccountable;
        this.data.previousAccountable = request.data.previousAccountable;
    }
    
    static async create(data) {
            //se for para um role acima, serão excluídos como accountables todos as que tiverem o mesmo role ou role abaixo do novo. Não precisa de um novo accountable
            //se for para um role abaixo
            //      se não for administrator, pode escolher quem serão os novos responsáveis diretos dos seus antigos membros
            //      se for administrator, deverá escolher quem irá ser o novo responsável de seus membros e que será seu novo responsável

        if(requestData.type === 'accountable change' || requestData.type === 'role change') {
            const newAccountable = await User.get({_id: ObjectId(requestData.data.newAccountable)}, {project: {profile: 1}});
    
            if(!newAccountable) {
                res.status(400);
                return res.json({message: 'New accountable not found.'});
            }
    
            const newAccountableData = {
                _id: newAccountable._id.toString(),
                ...newAccountable.profile
            };
    
            requestData.data.previousAccountable = requester.accountable;
            requestData.data.newAccountable = newAccountableData;
            requestData.approvers.push(newAccountableData);
            notificationData.newAccountable = newAccountableData.name;
    
            if(requestData.type === 'role change') {
                requestData.data.previousRole = requester.profile.role;
            }
        }
    
    }

    async onApprove() {
        const user = await User.get({_id: ObjectId(this.requester._id)});

        if(!user) {
            return {
                ok: false,
                status: 404,
                json: {
                    message: 'User not found'
                }
            };
        }

        const result = await user.setRole(this.data.newRole, this.data.newAccountable._id);

        if(!result.ok) return result;

        // await Request.updateApproverOf(this.requester._id, this.data.previousAccountable._id, this.data.newAccountable._id);

        return {ok: true};
    }

    async beforeSave() {
        const database = getDb('requests');
        const accountableChangeRequest = await database.findOne({
            type: 'accountable change', 
            'requester._id': this.requester._id, 
            status: {$in : ['pending', 'approval in progress']}});

        if(accountableChangeRequest) {
            return {
                ok: false,
                status: 499,
                json: {
                    accountableChangeRequestId: accountableChangeRequest._id,
                    message: 'There is an accountable change request in progress'
                }
            }
        }

        return {ok: true};
    }

    validation() {
        return this.data.newAccountable && this.data.previousAccountable && this.data.newRole && this.data.previousRole;
    }
}

module.exports = RoleChangeRequest