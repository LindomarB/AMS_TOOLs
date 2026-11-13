const ObjectId = require('mongodb').ObjectId;

const tokenController = require('../controllers/ams-tools/token-controllers');
const User = require('../model/User');

async function readToken(req, res, next) {
    req.token = await tokenController.getToken(req);

    if(req.token) {
        req.payload = tokenController.verify(req.token);
        
        if(req.payload.id) {
            req._id = new ObjectId(req.payload.id);
        }
    }

    next();
}

async function validateToken(req, res, next) {
    if(!req.token) {
        res.status(401);
        return res.redirect(process.env.HTTPS_SERVER);
    }

    const user = await User.get({_id: req._id});

    if(!user || user.status === 'locked') {
        res.status(401);
        return res.redirect(process.env.HTTPS_SERVER);
    }

    // if(!user) {
    //     res.status(401);
    //     return res.json({message: 'Access denied (invalid token)'});
    // }

    // if(user.status === 'locked') {
    //     res.status(401);
    //     return res.json({
    //         userLocked: true,
    //         message: 'Locked account'
    //     });
    // }
    
    next();
}

exports.readToken = readToken;
exports.validateToken = validateToken;