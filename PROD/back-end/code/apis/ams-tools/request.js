const ObjectId = require('mongodb').ObjectId;

const Request = require('../../model/request/Request');
const Notification = require('../../model/notification/Notification');
const { createRequest, getRequest } = require('../../controllers/ams-tools/request-controllers');

async function newRequest(req, res) {
    const requester = req._user;

    if(requester._id.toString() !== req._id.toString()) {
        res.status(401);
        return res.json({message: 'Unauthorized access'});
    }

    const result = await createRequest({
        type: req.body.type,
        requester,
        data: req.body.data
    });

    if(result.ok) {
        await Notification.create(result.notification);
    }

    res.status(result.status);
    return res.json(result.json);
}

async function updateRequest(req, res) {
    const {requestId, response, approverPassword, reason} = req.body;
    
    const request = await getRequest({query: {_id: ObjectId(requestId)}});

    if(!request) {
        res.status(400);
        return res.json({message: 'Request not found.'});
    }

    // if(response === 'cancel' && req._id !== request.document.requester._id) {
    //     res.status(401);
    //     return res.json({message: 'Only the requester can cancel your request.'});
    // }

    try {
        const result = await request[response](req._id.toString(), approverPassword, reason);
        
        if(request.type !== 'new account' && result.notification) {   
            await Notification.create(result.notification);
        }

        res.status(result.status);
        return res.json(result.json);
    } catch (err) {
        console.log(err);
        res.status(400);
        return res.json({message: 'Invalid response.'});
    }    
}

async function getRequests(req, res) {
    const requests = await Request.getMany(req.query, req.querySettings);    
    return res.json(requests);
}

async function getFilters(req, res) {
    if(!req.querySettings.filters) return res.json([]);

    const filters = req.querySettings.filters.reduce((filters, filter) => {
        filters[filter.name] = {$addToSet: `$${filter.field}`};
        return filters;
    }, {});

    const options = await Request.aggregate([
        {$match: req.query}, 
        {$group: {
                _id: 0, 
                ...filters
        }},
        {$project: {
            _id: 0
        }}
    ]);

    return res.json(options[0] || []);
}


// async function accountableRequestCheck(req, res, newRequest) {
//     const approver = newRequest.approvers.find(
//         approver => approver._id === req._id.toString()
//     );
    
//     if(!approver) return;

//     if(!req.body.password) {
//         res.status(401);
//         return res.json({
//             message: 'Invalid password.'
//         });
//     }

//     const accountable = await User.get({_id: ObjectId(approver._id)});
//     const passwordValidation = await accountable.validatePassword(req.body.password);

//     if(!passwordValidation.ok) {
//         res.status(passwordValidation.status);
//         return res.json(passwordValidation.json);
//     }

//     const saveResult = await newRequest.save();

//     if(!saveResult.ok) {
//         res.status(saveResult.status);
//         return res.json(saveResult.json);
//     }

//     const approveResult = await newRequest.approve(req._id.toString(), req.body.password);

//     if(!approveResult.ok) {
//         await newRequest.delete();
//         res.status(approveResult.status);
//         return res.json(approveResult.json);
//     }

//     await Notification.create({
//         author: 'system',
//         addressee: newRequest.requester._id,
//         code: `request-given-${newRequest.type}`,
//         data: {...newRequest.data}
//     });

//     return res.json({
//         ...approveResult.json,
//         message: 'Request approved!'
//     });
// }

exports.newRequest = newRequest;
exports.getRequests = getRequests;
exports.updateRequest = updateRequest;
exports.getFilters = getFilters;