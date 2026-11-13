const remedyNumberValidation = require('../../functions/remedyNumberValidation');
const Model = require('../Model');

class Resolution extends Model{
    static collection = 'resolutions';
    static ModelClass = Resolution;

    constructor(data) {
        super(Resolution, data);
    }

    static queryParser(query) {
        if(query['meta.created on']) {
            for(let operator in query['meta.created on']) {
                query['meta.created on'][operator] = new Date(query['meta.created on'][operator]);
            }
        }
    }

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
        } else {
            delete document.pbi;
        }

        if(data.kba && data.kba.number) {
            document.kba = {
                number: data.kba.number.toUpperCase()
            };
        } else {
            delete document.kba;
        }

        document.problem = {
            problem: data.problem.problem,
            'diagnosis matches the problem': data.problem['diagnosis matches the problem'],
            'is reopening': data.problem['is reopening'],
            'reopening reason': data.problem['reopening reason']
        };

        document.solution = {
            solution: data.solution.solution,
            'used sql': data.solution['used sql'],
            'sql code': data.solution['sql code'],
            'was user guided': data.solution['was user guided'],
            'main incident': data.solution['main incident'] && data.solution['main incident'].toUpperCase()
        };

        document.sla = {
            'was lost': data.sla['was lost'],
            'wipro fault': data.sla['wipro fault'],
            'breach reason': data.sla['breach reason'],
            'breach description': data.sla['breach description'],
            exception: data.sla.exception
        }

        document.meta = data.meta;

        for(let section in document) {
            for(let field in document[section]) {
                if(!document[section][field]) {
                    delete document[section][field];
                }
            }
        }

        this.document = document;
    }

    async validation() {
        const document = this.document;

        if(
            document.incident &&
            document.incident.incident &&
            document.incident.type &&
            document.incident.priority &&
            document.incident.country &&
            document.incident.application &&
            document.incident['support group'] &&
            document.classification &&
            document.classification.classification &&
            document.classification.description &&
            document.tiers &&
            document.tiers['tier 1'] &&
            document.tiers['tier 2'] &&
            document.tiers['tier 3'] &&
            document.tiers['tier 4'] &&
            document.tiers['tier 5'] &&
            document.problem &&
            document.problem.problem &&
            document.problem['diagnosis matches the problem'] &&
            document.problem['is reopening'] &&
            document.problem['is reopening'] === 'yes'
                ? document.problem['reopening reason']
                : true &&
            document.solution &&
            document.solution.solution &&
            document.solution['used sql'] &&
            document.solution['used sql'] === 'yes'
                ? document.solution['sql code']
                : true &&
            document.classification.classification === 'User Adoption'
                ? document.solution['was user guided']
                : true &&
            document.classification.classification === 'Duplicated'
                ? document.solution['main incident']
                : true &&
            document.sla &&
            document.sla['was lost'] &&
            document.sla['was lost'] === 'yes'
                ? (
                    document.sla['wipro fault'] && 
                    document.sla['breach reason'] && 
                    document.sla['breach description'] && 
                    document.sla.exception
                ) : true &&
            document.meta &&
            document.meta['created on'] &&
            document.meta['created by']
        ) {
            const incidentNumberIsValid = remedyNumberValidation('inc', document.incident.incident);

            if(!incidentNumberIsValid) {
                return {ok: false};
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
            }

            return {ok: true};
        } else {
            return {ok: false};
        }
    }

    async update(newData, user) {
        delete newData._id;

        const original = (this.document.meta.changeHistory && structuredClone(this.document.meta.changeHistory.original)) || {};
        const changes = (this.document.meta.changeHistory && structuredClone(this.document.meta.changeHistory.changes)) || [];
        const newChanges = {};

        for(let section in this.document) {
            if(section === 'meta' || section === '_id') continue;

            for(let field in this.document[section]) {
                const currentValue = this.document[section][field];
                const newValue = (newData[section] && newData[section][field]) || '';

                if(currentValue !== newValue) {
                    if(!original[section]) {
                        original[section] = {
                            [field]: currentValue
                        };
                    } else if(!original[section][field] && original[section][field] !== '') {
                        original[section][field] = currentValue;
                    }

                    if(newChanges[section]) {
                        newChanges[section][field] = newValue;
                    } else {
                        newChanges[section] = {
                            [field]: newValue
                        };
                    }
                }
            }
        }       

        for(let section in newData) {
            for(let field in newData[section]) {
                if(this.document[section] && this.document[section][field]) continue;
                if(!newData[section][field] && (!original[section] || !original[section][field])) continue;

                if(!original[section]) {
                    original[section] = {
                        [field]: ''
                    };
                } else if(!original[section][field]) {
                    original[section][field] = '';
                }

                if(!newChanges[section]) {
                    newChanges[section] = {
                        [field]: newData[section][field]
                    };
                } else if(!newChanges[section][field]) {
                    newChanges[section][field] = newData[section][field];
                }
            }  
        }

        if(!Object.keys(newChanges).length) {
            return {
                ok: true,
                status: 200,
                json: {
                    message: 'No changes were made'
                }
            }
        }

        changes.push({
            date: new Date(),
            user: {
                _id: user._id,
                name: user.profile.name,
                cargillId: user.profile.cargillId
            },
            changes: newChanges
        });

        this.setDocument({
            ...newData,
            meta: {
                ...this.document.meta,
                changeHistory: {
                    original,
                    changes
                }
            }
        });

        return this.replace();
    }
}

module.exports = Resolution;