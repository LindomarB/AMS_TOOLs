const Model = require("./Model");

class Application extends Model {
    static collection = 'applications';
    static ModelClass = Application;

    constructor(data) {
        super(Application, data);
    }

    //quando criar o create sempre organizar os países por nome (tambem no metodo para atualiza-los)

    static async getSupportGroups(query = {}, settings = {}) {
        const {projection, sort} = settings;
        const supportGroups = await Application.aggregate([
            {$match: query},
            {$group: 
                {
                    _id: '$support group',
                    applications: {$push: '$$ROOT'}
                }
            },
            {$project: {
                    _id: 0,
                    name: '$_id',
                    ...projection || {applications: 1}
                }
            },
            {$sort: sort || {name: 1}}
        ]);
    
        return supportGroups;
    }

    static async getSupportGroup(supportGroupName, settings) {
        const supportGroup = await this.getSupportGroups({supportGroup: supportGroupName}, settings);
        return supportGroup[0];
    }

    setDocument(data) {
        const document = {};

        document._id = data._id;
        document.region = data.region;
        document.name = data.name;
        document.group = data.group;
        document.country = data.country;
        document['business unity'] = data['business unity'];
        document.technology = data.technology;
        document.interfaces = data.interfaces;
        document['support group'] = data['support group'];
        document.coverage = data.coverage;
        document.sdm = data.sdm;
        document['app lead'] = data['app lead'];
        document['track lead'] = data['track lead'];
        document.shifts = data.shifts;
        document.description = data.description;

        this.document = document;
    }

    
}

module.exports = Application;