const mongodb = require('mongodb');

let db = null;

const startDBConnection = callback => {
    mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4')
    .then(client => {
        console.log('successful connected with database')
        db = client.db('ams-tools');
        if(callback) callback();
    })
    .catch(err => {
        console.log(err)
    });
}

const getDb = (collection) => {
    if(!collection) {
        return db;
    } else {
        return db.collection(collection);
    }
}


exports.startDBConnection = startDBConnection;
exports.getDb = getDb;
