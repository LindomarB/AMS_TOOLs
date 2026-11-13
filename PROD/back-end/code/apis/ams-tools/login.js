const jwt = require('jsonwebtoken');
const User = require('../../model/User');
const tokenController = require('../../controllers/ams-tools/token-controllers');
const Notification = require('../../model/notification/Notification');
const { ObjectId } = require('mongodb');
const { getUser } = require('../../controllers/ams-tools/user-controllers');
const { startDBConnection } = require('../../database/databaseOld');

async function logIn(req, res) {
    if(req.token) {
        return tokenLogIn(req, res);
    }
    return credentialsLogIn(req, res);
}

async function credentialsLogIn(req, res) {
    const credentials = req.body;
    const user = await User.get({
        $or: [
            {'profile.email': credentials.email_id},
            {'profile.cargillId': credentials.email_id.toUpperCase()}
        ]
    });

    if(user) {
        if(user.status === 'locked') {
            res.status(401);
            return res.json({message: 'Your account is locked'});
        }

        const userData = await user.login(credentials.password);

        if(userData) {
            const token = tokenController.generateToken({id: user._id.toString()});
            return res.json({token, userData});
        }
    } 
    
    res.status(401);
    return res.json({message: 'Invalid email, ID or password!'});
}

async function tokenLogIn(req, res) {
    if(!req.payload) {
        res.status(401);
        return res.json({message: 'Token expired!'});
    }

    const user = await User.get({_id: req._id});

    if(!user || user.meta.passwordChanged) {
        res.status(404);
        return res.json({message: 'Invalid token!'});
    }

    const userData = await user.getUserData();
    res.json({userData});
}

async function requestPasswordReset(req, res) {
    const user = await User.get({
        $or: [
            {'profile.email': req.body.user},
            {'profile.cargillId': req.body.user.toUpperCase()}
        ]
    }, null, true);

    if(!user) {
        res.status(401);
        return res.json({message: 'Invalid email or ID!'});
    }

    const accountables = user.accountables.map(accountable => ({
        name: accountable.name,
        email: accountable.email
    }));

    if(user.getSettings('password reset', 'authorization')) {
        return res.json({
            resetAlreadyRequested: true,
            accountables
        });
    }

    try {
        const result = await user.requestPasswordReset();

        if(!result.ok) throw new Error(result.json.message);

        await Notification.create({
            code: 'user-password reset-request',
            author: 'system',
            addressee: user.accountables.map(accountable => accountable._id),
            data: {
                name: user.profile.name,
                id: user._id.toString()
            }
        });

    } catch(err) {
        console.log(err);
        res.status(500);
        return res.json({message: 'We were unable to notify your accountables. Please try again later.'});
    }

    return res.json({
        accountablesNotified: true,
        accountables,
        message: 'We notify your accountables.'
    });
}

async function verifyAuthorization(authorizationCode) {
    const error = {
        ok: false,
        status: 401,
        json: {message: 'The authorization code is invalid'}
    };

    try{
        jwt.verify(authorizationCode, 'password reset');
    } catch(err) {
        return error;
    }

    const authorization = jwt.decode(authorizationCode);

    if(authorization) {
        const result = await getUser(authorization.user);

        if(!result.ok) return result;

        if(result.user.getSettings('password reset', 'authorization')) {
            return {
                ok: true,
                user: result.user
            };
        }
    }

    return error;
}

async function verifyPasswordReset(req, res) {
    const result = await verifyAuthorization(req.body.authorization);

    if(!result.ok) {
        res.status(result.status);
        return res.json(result.json);
    }

    return res.json({ok: true});
}

async function confirmPasswordReset(req, res) {
    const result = await verifyAuthorization(req.body.authorization);

    if(!result.ok) {
        res.status(result.status);
        return res.json(result.json);
    }

    const user = result.user;
    const passwordReset = await user.resetPassword(req.body.newPassword);

    if(!passwordReset.ok) {
        res.status(passwordReset.status);
        return res.json(passwordReset.json);
    }

    await Notification.create({
        code: 'user-password reset-completed',
        author: 'system',
        addressee: user.accountables.map(accountable => accountable._id),
        data: {
            name: user.profile.name
        }
    });

    return res.json({email: user.profile.email});
}

exports.logIn = logIn;
exports.requestPasswordReset = requestPasswordReset;
exports.verifyPasswordReset = verifyPasswordReset;
exports.confirmPasswordReset = confirmPasswordReset;