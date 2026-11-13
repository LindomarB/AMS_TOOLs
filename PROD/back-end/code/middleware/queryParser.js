const ObjectId = require('mongodb').ObjectId;

function queryParser(req, res, next) {
    if(Object.keys(req.query).length) {        
        for(let key in req.query) {
            if(
                (req.query[key].startsWith('[') && req.query[key].endsWith(']')) ||
                (req.query[key].startsWith('{') && req.query[key].endsWith('}'))
            ) {
                req.query[key] = JSON.parse(req.query[key]);
            }
        }

        req.querySettings = req.query.settings || {};
        req.query = req.query.query || {};

        for(let key in req.query) {
            if(key === '_id') {
                req.query._id = convertToObjectId(req.query._id)
            } else if(key === '$and' || key === '$or') {
                req.query[key].forEach(expression => {
                    if(expression._id) {
                        expression._id = convertToObjectId(expression._id);
                    }
                });
            }
        }
    }
    
    next();
}

function convertToObjectId(_id) {
    if(typeof _id === 'object' && !Array.isArray(_id)) {
        for(let operator in _id) {
            if(operator === '$in') {
                _id[operator].forEach((id, index) => {
                    if(ObjectId.isValid(id)) {
                        _id[operator][index] = ObjectId(id);
                    }
                });

                return _id;
            } else {
                if(ObjectId.isValid(_id[operator])) {
                    return {[operator]: ObjectId(_id[operator])};
                }
            }
        }
    } else {
        if(ObjectId.isValid(_id)) {
            return ObjectId(_id);
        }
    }

    return _id;
}

module.exports = queryParser;