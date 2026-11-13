const ToolRequest = require('../../model/request/ToolRequest');
const AccountRequest = require('../../model/request/AccountRequest');
const AccountableChangeRequest = require('../../model/request/AccountableChangeRequest');
const RoleChangeRequest = require('../../model/request/RoleChangeRequest');
const CTIApplicationPermissionRequest = require('../../model/request/CTIApplicationPermissionRequest');
const CTISupportGroupRequest = require('../../model/request/CTISupportGroupAccessRequest');
const Request = require('../../model/request/Request');
const Notification = require('../../model/notification/Notification');
const NewAccountableRequest = require('../../model/request/NewAccountableRequest');
const AccountableRemovalRequest = require('../../model/request/AccountableRemovalRequest');

async function createRequest({type, requester, data}) {
    let result = null;

    switch(type) {
        case 'new account':
            result = await AccountRequest.create({requester, data});
            break;
        case 'tool':
            result = await ToolRequest.create({requester, data});
            break;
        case 'new accountable':
            result = await NewAccountableRequest.create({requester, data});
            break;
        case 'accountable change':
            result = await AccountableChangeRequest.create({requester, data});
            break;
        case 'accountable removal':
            result = await AccountableRemovalRequest.create({requester, data});
            break;
        case 'role change':
            result = await RoleChangeRequest.create({requester, data});
            break;
        case 'cti application access':
            result = await CTIApplicationPermissionRequest.create({requester, data});
            break;
        case 'cti support group access':
            result = await CTISupportGroupRequest.create({requester, data});
            break;
        default:
            return {
                ok: false,
                status: 400,
                json: {
                    message: 'Invalid request type.'
                }
            };
    }

    return result;
}

async function getRequest({query, data}) {
    if(query) {
        data = await Request.get(query, {}, false);
    }

    if(!data) return null;

    let result = null;

    switch(data.type) {
        case 'new account':
            result = new AccountRequest(data);
            break;
        case 'tool':
            result = new ToolRequest(data);
            break;
        case 'new accountable':
            result = new NewAccountableRequest(data);
            break;
        case 'accountable change':
            result = new AccountableChangeRequest(data);
            break;
        case 'accountable removal':
            result = new AccountableRemovalRequest(data);
            break;
        case 'role change':
            result = new RoleChangeRequest(data);
            break;
        case 'cti application access':
            result = new CTIApplicationPermissionRequest(data);
            break;
        case 'cti support group access':
            result = new CTISupportGroupRequest(data);
            break;
        default:
            return null;
    }

    if(result.error) return null;

    return result;
}

async function getRequests(query) {
    const requestsData = await Request.getMany(query);
    const requests = [];

    for(let requestData of requestsData) {
        const request = await getRequest({data: requestData});
        requests.push(request);
    }

    return requests;
}

async function cancelRequests(query) {
    const pendingRequests = await Request.getMany({
        ...query,
        status: {$in: ['pending', 'approval in progress']}
    });

    for(let data of pendingRequests) {
        const request = await getRequest({data});
        await request.cancel();
    }
}

async function approveRequests(query, approverId, password) {
    const pendingRequests = await Request.getMany({
        ...query,
        status: 'pending'
    });

    for(let data of pendingRequests) {
        const request = await getRequest({data});
        const result = await request.approve(approverId, password);

        if(result.notification) {   
            await Notification.create(result.notification);
        }
    }
}

exports.createRequest = createRequest;
exports.getRequest = getRequest;
exports.getRequests = getRequests;
exports.cancelRequests = cancelRequests;
exports.approveRequests = approveRequests;