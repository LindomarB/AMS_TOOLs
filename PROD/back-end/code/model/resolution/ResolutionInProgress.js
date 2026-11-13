const remedyNumberValidation = require('../../functions/remedyNumberValidation');
const Model = require('../Model');
const Resolution = require('./Resolution');

class ResolutionInProgress extends Model {
    constructor(data) {
        super(ResolutionInProgress, data);
        this.settings = {
            delete: {
                okMessage: 'Progress deleted'
            }
        };
    }

    static collection = 'resolutionsInProgress';
    static ModelClass = ResolutionInProgress;

    setDocument(data) {
        const document = {};

        document._id = this.document? this.document._id : data._id;

        document.incident = {
            incident: data.incident.incident && data.incident.incident.toUpperCase(),
            type: data.incident.type,
            priority: data.incident.priority,
            country: data.incident.country,
            application: data.incident.application,
            'support group': data.incident['support group']
        };

        document.classification = {
            classification: data.classification.classification,
            description: data.classification.description
        };

        document.tiers = {
            'tier 1': data.tiers['tier 1'],
            'tier 2': data.tiers['tier 2'],
            'tier 3': data.tiers['tier 3'],
            'tier 4': data.tiers['tier 4'],
            'tier 5': data.tiers['tier 5']
        };

        if(data.pbi && data.pbi.number) {
            document.pbi = {
                number: data.pbi.number.toUpperCase()
            };
        }

        if(data.kba && data.kba.number) {
            document.kba = {
                number: data.kba.number.toUpperCase()
            };
        }

        document.problem = {
            problem: data.problem.problem,
            'diagnosis matches the problem': data.problem['diagnosis matches the problem'],
            'is reopening': data.problem['is reopening']
        };

        if(data.problem['is reopening'] === 'yes') {
            document.problem['reopening reason'] = data.problem['reopening reason'];
        }

        document.solution = {
            solution: data.solution.solution,
            'used sql': data.solution['used sql']
        };

        if(data.classification.classification === 'User Adoption') {
            document.solution['was user guided'] = data.solution['was user guided'];
        }

        if(data.classification.classification === 'Duplicated') {
            document.solution['main incident'] = data.solution['main incident'] && data.solution['main incident'].toUpperCase();
        }

        if(data.solution['used sql'] === 'yes') {
            document.solution['sql code'] = data.solution['sql code'];
        }

        document.sla = {
            'was lost': data.sla['was lost']
        }

        if(data.sla['was lost'] === 'yes') {
            document.sla['wipro fault'] = data.sla['wipro fault'];
            document.sla['breach reason'] = data.sla['breach reason'];
            document.sla['breach description'] = data.sla['breach description'];
            document.sla.exception = data.sla.exception;
        }

        document.meta = data.meta || {};

        this.document = document;
    }

    async validation() {
        const document = this.document;

        if(
            document.incident &&
            document.classification &&
            document.tiers &&
            document.problem &&
            document.solution &&
            document.sla &&
            document.meta &&
            document.meta['created on'] &&
            document.meta['created by']
        ) {
            if(document.incident.incident) {
                const incidentNumberIsValid = remedyNumberValidation('inc', document.incident.incident);
    
                if(!incidentNumberIsValid) {
                    return {ok: false};
                }
            }

            if(document.pbi && document.pbi.number) {
                const pbiNumberIsValid = remedyNumberValidation('pbi', document.pbi.number);

                if(!pbiNumberIsValid) {
                    return {ok: false};
                }
            }

            if(document.kba && document.kba.number) {
                const kbaNumberIsValid = remedyNumberValidation('kba', document.kba.number);
                
                if(!kbaNumberIsValid) {
                    return {ok: false};
                }
            }

            if(!document._id) {
                const resolution = await Resolution.get({'incident.incident': document.incident.incident});
    
                if(resolution) {
                    return {
                        ok: false,
                        json: {
                            message: `There is already a resolution for ${document.incident.incident}`
                        }
                    };
                }

                const resolutionInProgress = await ResolutionInProgress.get({
                    'incident.incident': document.incident.incident,
                    'meta.created by._id': document.meta['created by']._id
                });
    
                if(resolutionInProgress) {
                    return {
                        ok: false,
                        json: {
                            message: `You already have a resolution in progress for ${document.incident.incident}`
                        }
                    };
                }
            }

            return {ok: true};
        } else {
            return {ok: false};
        }
    }

    async expire() {
        return await this.delete();      
    }

    beforeSave() {
        let totalFields = 0;
        let completedFields = 0;
        const resolution = {...this.document};
        delete resolution._id;
        delete resolution.meta;

        for(let section in resolution) {
            for(let field in resolution[section]) {
                if(resolution[section][field]) completedFields++;
                totalFields++;
            }
        }

        this.document.meta.progress =  +((completedFields / totalFields) * 100).toFixed(0);

        return {ok: true};
    }

    afterSave({results}) {
        return {
            ok: true,
            json: {
                message: 'Progress saved',
                resolutionId: results.save.dbResponse.insertedId || this.document._id
            }
        };
    }

    async update(data) {
        delete data._id;

        this.setDocument({
            ...data,
            meta: {
                ...this.document.meta,
                'last modification': new Date(),
            }
        });

        return this.save();
    }
}

module.exports = ResolutionInProgress;