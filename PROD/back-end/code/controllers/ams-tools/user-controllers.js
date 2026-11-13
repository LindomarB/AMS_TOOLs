const ObjectId = require('mongodb').ObjectId;

const roles = require('../../data/roles');
const User = require('../../model/User');
const { addUserAccessToCti, removeUserAccessToCti, reviewUserAccessToCti } = require('../cti-tool/user-settings-controllers');

async function getUser(id, settings) {
    if(!id || Array.isArray(id)) {
        return {
            ok: false,
            status: 400,
            json: {message: 'Invalid user ID'}
        };
    }

    if(typeof id === 'string' && ObjectId.isValid(id)) {
        id = ObjectId(id);
    }

    const user = await User.get({_id: id}, settings);
    
    if(!user) {
        return {
            ok: false,
            status: 404,
            json: {message: 'User not found'}
        };
    }

    return {
        ok: true,
        user
    };
}

async function addUserAccess(user, access) {
    let result = null;

    switch(access) {
        case 'cti tool':
            result = await addUserAccessToCti(user);
            break;
        default:
            result = user.addAccess(access);
    }

    return result;
}

async function removeUserAccess(user, access) {
    let result = null;

    switch(access) {
        case 'cti tool':
            result = await removeUserAccessToCti(user);
            break;
        default:
            result = user.removeAccess(access);
    }

    return result;
}

async function reviewUserAccess(user, access) {
    let result = null;

    switch(access) {
        case 'cti tool':
            result = await reviewUserAccessToCti(user);
            break;
        default:
            result = {ok: true};
    }

    return result;
}

async function addUserAccountable(user, accountableId) {
    const { getRequests } = require('./request-controllers');

    if(typeof user === 'string') {
        const getUserResult = await getUser(user);

        if(!getUserResult.ok) return getUserResult;
        user = getUserResult.user;
    }

    const addAccountableResult = await user.addAccountable(accountableId);

    let addedAccountables = [];

    if(addAccountableResult.ok) {
        addedAccountables = addAccountableResult.addedAccountables.map(accountable => accountable._id);
    } else if(addAccountableResult.accountableAlreadyExists) {
        const result = await user.setPrimaryAccountables(true);

        if(!result.ok) return result;

        addedAccountables = [accountableId];
    } else {
        return addAccountableResult;
    }

    const pendingRequests = await getRequests({
        'requester._id': user._id.toString(),
        status: {$in : ['pending', 'approval in progress']}
    });

    for(let pendingRequest of pendingRequests) {
        await pendingRequest.addApprovers(addedAccountables);
    }

    return {
        ok: true,
        user,
        ...addAccountableResult
    };
}

async function removeUserAccountable(user, accountableId) {
    const { getRequests } = require('./request-controllers');

    if(typeof user === 'string') {
        const getUserResult = await getUser(user);

        if(!getUserResult.ok) return getUserResult;
        user = getUserResult.user;
    }

    const removeAccountableResult = await user.removeAccountable(accountableId);

    if(!removeAccountableResult.ok) return removeAccountableResult;

    const userAccesses = roles[user.profile.role].allowedAccesses.filter(access => user.hasAccess(access));

    for(let access of userAccesses) {
        await reviewUserAccess(user, access);
    }

    const removedAccountables = removeAccountableResult.removedAccountables.map(accountable => accountable._id);
    const pendingRequests = await getRequests({
        'requester._id': user._id.toString(),
        status: {$in : ['pending', 'approval in progress']}
    });

    for(let pendingRequest of pendingRequests) {
        await pendingRequest.removeApprovers(removedAccountables);
    }

    return {
        ok: true,
        user,
        ...removeAccountableResult
    };
}

exports.getUser = getUser;
exports.addUserAccess = addUserAccess;
exports.removeUserAccess = removeUserAccess;
exports.addUserAccountable = addUserAccountable;
exports.removeUserAccountable = removeUserAccountable;