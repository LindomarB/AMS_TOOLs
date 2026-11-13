const { ObjectId } = require("mongodb");

function parseId(id) {
    if(!id || Array.isArray(id)) return null

    if(typeof id === 'string' && ObjectId.isValid(id)) {
        return ObjectId(id);
    }

    return id;
}

exports.parseId = parseId;