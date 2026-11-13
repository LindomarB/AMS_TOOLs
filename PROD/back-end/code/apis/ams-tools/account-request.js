const { ObjectId, ServerHeartbeatStartedEvent } = require("mongodb");
const User = require("../../model/User");
const Notification = require("../../model/notification/Notification");
const AccountRequest = require("../../model/request/AccountRequest");
const roles = require("../../data/roles");
const Request = require("../../model/request/Request");
const { getUserApplications } = require("../../controllers/cti-tool/user-settings-controllers");

async function createRequest(req, res) {
    const result = await AccountRequest.create(req.body);

    if(result.ok) {
        await Notification.create(result.notification);
    }

    res.status(result.status);
    return res.json(result.json);
}

async function validateId(req, res) {
    const user = await User.get({'profile.cargillId': req.query.id});

    if(user) {
        res.status(400);
        return res.json({message: 'This ID is already in use.'});
    }

    const request = await Request.get({
        type: 'new account', 
        'data.profile.cargillId': req.query.id,
        status: 'pending'
    });

    if(request) {
        res.status(400);
        return res.json({message: 'An account for this ID has already been requested.'});
    }

    res.status(200);
    return res.json({});
}

async function validateEmail(req, res) {
    const user = await User.get({'profile.email': req.query.email});
 
    if(user) {
        res.status(400);
        return res.json({message: 'This email is already in use.'});
    }

    const request = await AccountRequest.get({
        type: 'new account', 
        'data.profile.email': req.query.email,
        status: 'pending'
    });

    if(request) {
        res.status(400);
        return res.json({message: 'An account for this email has already been requested.'});
    }

    res.status(200);
    return res.json({});
}

async function getAccountableOptions(req, res) {
    let role = req.query.role;
    const accountableRoles = (roles[role] && roles[role].accountableRoles) || [];

    const result = await User.getMany(
        {
            'profile.role': {$in : accountableRoles}
        }, 
        {
            projection: {'profile.name': 1}
        }
    );
    
    const accountables = result.map(accountable => ({
        _id: accountable._id,
        name: accountable.profile.name
    }));
    
    return res.json(accountables);
}

async function getCtiApplicationOptions(req, res) {
    if(!ObjectId.isValid(req.query.accountableId)) {
        res.status(400);
        return res.json({message: 'Unrecognized accountable ID'});
    }

    const accountable = await User.get({_id: ObjectId(req.query.accountableId)});

    if(!accountable) {
        res.status(404);
        return res.json({message: 'Accountable not found'});
    }

    try {
        const result = await getUserApplications(accountable);
        res.status(200);
        return res.json(result);
    } catch(err) {
        console.log(err);
        res.status(500);
        return res.json({message: 'Internal server error'});
    }
}

exports.createRequest = createRequest;
exports.validateEmail = validateEmail;
exports.validateId = validateId;
exports.getAccountableOptions = getAccountableOptions;
exports.getCtiApplicationOptions = getCtiApplicationOptions;