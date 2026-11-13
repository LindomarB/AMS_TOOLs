const jwt = require('jsonwebtoken');

const primaryKey = 'primary_key';

function generateToken(payload) {
    return jwt.sign(payload, primaryKey);
}

function verify(token) {
    try {
        return jwt.verify(token, primaryKey);
    } catch (err) {
        return false;
    }
}

function getToken(req) {
    if(req.headers.authorization) {
        const tokenReceived = req.headers.authorization.includes('Bearer ');

        if(tokenReceived) {
            const token = req.headers.authorization.replace('Bearer ', '');
            return token;
        }
    }

    return null;
}

function generateAppToken() {
    console.log(jwt.sign('app_token', primaryKey))
}

exports.generateToken = generateToken;
exports.verify = verify;
exports.getToken = getToken;