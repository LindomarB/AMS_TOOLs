const { MongoClient } = require('mongodb');

class Database {
    constructor() {
        const server = process.env.MONGO_SERVER;
        this.client = new MongoClient(server);
    }

    async connect(...callbackStack) {
        try {
            await this.client.connect();
            this.setDb(process.env.MONGO_DATABASE)
            console.log('Successfully connected to database');
        } catch(error) {
            console.log('Failed to connect to database');
        }

        for(let callback of callbackStack) {
            try {
                await callback();
            } catch(error) {
                console.log(error);
            }
        }
    }

    setDb(database) {
        this.db = this.client.db(database);
    }

    async get(collection, query = {}, settings = {}) {
        try {
            const data = await this.db.collection(collection).findOne(query, settings);
            return {ok: true, data};
        } catch (error) {
            console.log(error);
            return {ok: false, error};
        }
    }

    async getMany(collection, query = {}, settings = {}) {
        try {
            const data = await this.db.collection(collection).find(query, settings).toArray();
            return {ok: true, data};
        } catch (error) {
            console.log(error);
            return {ok: false, error};
        }
    }

    async aggregate(collection, pipeline) {
        try {
            const data = await this.db.collection(collection).aggregate(pipeline).toArray();
            return {ok: true, data};
        } catch (error) {
            console.log(error);
            return {ok: false, error};
        }
    }

    async updateOne(collection, query = {}, update = {}, settings = {}) {
        try {
            const result = await this.db.collection(collection).updateOne(query, update, settings);

            return {
                ok: true,
                dbResponse: result
            };
        } catch (error) {
            console.log(error);

            return {
                ok: false, 
                error
            };
        }
    }

    async save(collection, data, settings = {}) {
        try {
            let dbResponse = null;

            if(data._id) {
                dbResponse = await this.db.collection(collection).updateOne({_id: data._id}, {$set: data});
            } else {
                dbResponse = await this.db.collection(collection).insertOne(data);
            }
            
            return {
                ok: true,
                status: 200,
                dbResponse,
                json: {
                    message: settings.okMessage || 'Save completed',
                    insertedId: dbResponse.insertedId
                }
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                status: 500,
                error,
                json: {
                    message: settings.errorMessage || 'Error during saving',
                    error
                }
            };
        }
    }

    async replace(collection, query, data, settings = {}) {
        try {
            const dbResponse = await this.db.collection(collection).replaceOne(query, data);
            
            return {
                ok: true,
                status: 200,
                dbResponse,
                json: {
                    message: settings.okMessage || 'Save completed'
                }
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                status: 500,
                error,
                json: {
                    message: settings.errorMessage || 'Error during replacement',
                    error
                }
            };
        }
    }

    async delete(collection, query, settings = {}) {
        try {
            const dbResponse = await this.db.collection(collection).deleteOne(query);

            return {
                ok: true,
                status: 200,
                dbResponse,
                json: {
                    message: settings.okMessage || 'Deleted'
                }
            };
        } catch (error) {
            console.log(error);

            return {
                ok: false,
                status: 500,
                error,
                json: {
                    message: settings.errorMessage || 'Error during deletion',
                    error
                }
            };
        }
    }
}

const database = new Database();

module.exports = database;