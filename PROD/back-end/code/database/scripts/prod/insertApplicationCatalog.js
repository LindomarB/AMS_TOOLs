const { ObjectId } = require("mongodb");
const database = require("../../Database");

async function insertApplicationCatalog() {
    const data = [
        
    ];

    data.forEach(application => database.save('applications', application));
}

module.exports = insertApplicationCatalog;