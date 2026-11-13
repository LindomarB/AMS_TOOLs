const database = require("../database/Database");

class Model {
    constructor(model, data) {
        try {
            this.model = model;
            this._id = data._id;
            this.setDocument(data);
            this.settings = {};
        } catch (error) {
            console.log(error);
            this.error = true;
        }
    }

    static async get(query, settings, returnModel = true) {
        if(this.queryParser) {
            this.queryParser(query);
        }

        const result = await database.get(this.collection, query, settings);

        if(!result.ok) return null;

        if(returnModel && result.data) {
            return new this.ModelClass(result.data);
        } else {
            return result.data;
        }
    }

    static async getMany(query, settings, returnModel = false) {
        if(this.queryParser) {
            this.queryParser(query);
        }

        const result = await database.getMany(this.collection, query, settings);

        if(returnModel) {
            return result.data.map(data => new this.ModelClass(data));
        } else {
            return result.data;
        }
    }

    static async aggregate(pipeline) {
        if(this.queryParser) {
            const query = pipeline.find(stage => !!stage.$match);
            
            if(query) {
                this.queryParser(query.$match);
            }
        }

        const result = await database.aggregate(this.collection, pipeline);
        return result.ok? result.data : [];
    }

    setDocument() {
        return {};
    }

    async validation() {
        for(let field in this.document) {
            if(!this.document[field]) return {ok: false};
        }
        return {ok: true};
    }

    async isValid(data) {
        try {
            const isValid = await this.validation();

            /*if(!isValid.ok) {
                return {
                    ok: false,
                    status: isValid.status || 400,
                    json: isValid.json || {
                        message: isValid.message || 'Data is not in a valid formatT'
                    }
                }
            }*/

            return {ok: true};
        } catch (error) {
            console.log(error);
            return {
                    ok: false,
                    status: 500,
                    json: {
                        message: 'Data validation failure'
                }
            };
        }
    }

    async beforeSave({data, results}) {
        return {ok: true};
    }

    async afterSave({data, results}) {
        return {ok: true};
    }

    async save(options = {}) {
        const results = {};

        results.validation = await this.isValid(options.data);
        if(!results.validation.ok) return results.validation;

        results.beforeSave = await this.beforeSave({data: options.data, results});
        if(!results.beforeSave.ok) return results.beforeSave;

        results.save = await database.save(this.model.collection, this.document);
        if(!results.save.ok) return results.save;

        if(!this._id) {
            this._id = results.save.dbResponse.insertedId;
        }

        results.afterSave = await this.afterSave({data: options.data, results});
        if(!results.afterSave.ok) return results.afterSave;

        const result = Object.values(results).reduce((finalResult, result) => {
            const json = {...finalResult.json, ...result.json || {}};
            finalResult = {...finalResult, ...result, json};
            return finalResult;
        }, {json: {}});

        result.json = {...result.json, ...options.json};

        return result;
    }

    async replace() {    
        return await database.replace(this.model.collection, {_id: this.document._id}, this.document, this.settings.replace);
    }

    async delete() {    
        return await database.delete(this.model.collection, {_id: this.document._id}, this.settings.delete);
    }
}

module.exports = Model;