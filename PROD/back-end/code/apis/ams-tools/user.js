const { ObjectId } = require("mongodb");
const User = require("../../model/User");
const Application = require("../../model/Application");
const { addApplicationPermission, removeApplicationPermission } = require("../../controllers/cti-tool/user-settings-controllers");
const { addUserAccess, removeUserAccess } = require("../../controllers/ams-tools/user-controllers");
const roles = require("../../data/roles");
const Request = require("../../model/request/Request");
const Notification = require("../../model/notification/Notification");
const capitalize = require("../../functions/capitalize");
const {getUser: getUser_controller} = require("../../controllers/ams-tools/user-controllers");
const sortByField = require("../../functions/sortByField");

async function getUser(req, res, next) {
    let id = req._user || req._id;

    if(!id || Array.isArray(id)) {
        res.status(400);
        return res.json({message: 'Invalid user ID'});
    }

    if(typeof id === 'string' && ObjectId.isValid(id)) {
        id = ObjectId(id);
    }

    const user = await User.get({_id: id});
    
    if(!user) {
        res.status(404);
        return res.json({message: 'User not found'});
    }

    req._user = user;
    next();
}

async function getUserFromId(req, res, next, userId) {
    req._user = userId;
    getUser(req, res, next);
}

async function updateUserApplications(req, res) {
    const {action, supportGroup} = req.body;
    let {applications = []} = req.body;
    
    if(!action ||!(applications || supportGroup) || !Array.isArray(applications)) {
        res.status(400);
        return res.json({message: 'Invalid data format'});
    }
    const user = req._user;

    if(supportGroup) {
        const result = await Application.getMany(
            {
                'support group': supportGroup,
                status: {$ne: 'not supported by Wipro'}
            },
            {
                projection: {
                    _id: 1
                }
            }
        );

        applications.push(...result.map(application => application._id.toString()));
    }

    let result = null;

    try {
        if(action === 'add') {
            result = await addApplicationPermission(user, applications);
        } else if(action === 'remove') {
            result = await removeApplicationPermission(user, applications);
        } else {
            res.status(400);
            return res.json({message: `Invalid action '${action}'`});
        }
    } catch (err) {
        res.status(500);
        return res.json({message: `Internal server error`});
    }

    if(result.notifications) {
        for(let notification of result.notifications) {
            await Notification.create(notification);
        }
    }

    res.status(result.status);
    return res.json(result.json);
}

async function updateUserAccess(req, res) {
    const {access, action} = req.body;

    if(!access || !action) {
        res.status(400);
        return res.json({message: 'Data in bad format'});
    }

    const user = req._user;
    let result = null;

    try{
        if(action === 'add') {
            result = await addUserAccess(user, access);
        } else if(action === 'remove') {
            result = await removeUserAccess(user, access);

        } else {
            res.status(400);
            return res.json({message: `Invalid action '${action}'`});
        }
    } catch(err) {
        console.log(err);
        res.status(500);
        return res.json({message: `Internal server error`});
    }

    if(!result.ok) {
        res.status(result.status);
        return res.json(result.json);
    }

    res.status(result.status);
    return res.json(result.json);
}

async function getAccountableOptions(req, res) {
    let user = req._user;
    const accountableRoles = roles[user.profile.role].accountableRoles;

    if(!accountableRoles || !accountableRoles.length) {
        return res.json({accountables: []});
    }
    
    const pendingRequests = await Request.getMany({
        'requester._id': user._id.toString(),
        type: {$in: ['new accountable', 'accountable change']},
        status: 'pending'
    });

    const accountableInPendingRequests = pendingRequests.map(request => ObjectId(request.data.newAccountable._id));

    const accountableInPendingRequestsData = await User.getMany(
        {
            _id: {$in: accountableInPendingRequests}
        },
        {
            projection: {
                accountables: 1
            }
        }
    );

    accountableInPendingRequestsData.forEach(user => 
        accountableInPendingRequests.push(...user.accountables.map(accountable => ObjectId(accountable._id)))
    );

    const accountables = await User.getMany(
        {
            'profile.role': {$in : accountableRoles},
            status: {$ne: 'locked'},
            ...req.query,
            _id: {
                $nin: [
                    user._id, 
                    ...user.accountables.map(accountable => ObjectId(accountable._id)),
                    ...accountableInPendingRequests
                ]
            }
        }, 
        {
            projection: {
                'profile.name': 1,
                'profile.role': 1,
                'profile.email': 1,
                'profile.cargillId': 1,
                'settings.profile.avatarColor': 1
            },
            sort: {
                'profile.name': 1
            },
            ...req.querySettings
        }
    );
   
    return res.json(accountables);
}

async function updatePassword(req, res) {
    const user = req._user;
    const result = await user.setPassword(req.body.currentPassword, req.body.newPassword);

    res.status(result.status);
    return res.json(result.json);
}


async function getUsers(req, res) {
    const pipeline = [
        {$match: req.query}
    ];

    if(req.querySettings.getCtiApplications) {
        pipeline.push(
            {$set: {
                'settings.cti tool.applications': {
                    $map: {
                        input: '$settings.cti tool.applications',
                        as: 'application',
                        in: {
                            $toObjectId: '$$application'
                        }
                    }
                }
            }},
            {$lookup: {
                from: 'applications',
                localField: 'settings.cti tool.applications',
                foreignField: '_id',
                as: 'settings.cti tool.applications'
            }}
        );
    }

    const projection = {
        ...req.querySettings.projection || {}
    };

    const inclusionProjection = projection[Object.keys(projection)[0]] === 1;

    if(inclusionProjection) {
        delete projection.password;
    } else {
        projection.password = 0;
    }

    pipeline.push(
        {$project: projection},
        {$sort: {
            'profile.name': 1,
            ...req.querySettings.sort || {}
        }}
    );

    const users = await User.aggregate(pipeline);

    return res.json(users);
}

async function getFilters(req, res) {
    const settings = {
        'Access': 'accesses',
        'Accountable': 'accountables',
        'Accountable Role': 'accountables.role',
        'CTI Tool - Application': 'settings.cti tool.applications',
        'Role': 'profile.role',
        'Status': 'status'
    };

    if(req.querySettings.projection) {
        const inclusive = Object.values(req.querySettings.projection)[0] === 1;

        if(inclusive) {
            for(let filter in settings) {
                if(!req.querySettings.projection[filter]) {
                    delete settings[filter]
                }
            }
        } else {
            for(let filter in settings) {
                if(req.querySettings.projection[filter] === 0) {
                    delete settings[filter]
                }
            }
        }
    }

    const projection = Object.keys(settings).reduce((projection, filter) => {
        projection[filter] = `$${settings[filter]}`
        return projection;
    }, {});

    const result = await User.aggregate([
        {$match: req.query},
        {$project: projection}
    ]);

    const filters = Object.keys(settings).reduce((filters, filter) => {
        filters[filter] = new Set();
        return filters;
    }, {});

    result.forEach(user => {
        for(let filter in filters) {
            if(Array.isArray(user[filter])) {
                user[filter].forEach(value => filters[filter].add(value));
            } else {
                filters[filter].add(user[filter]);
            }
        }
    }, {});

    for(let filter in filters) {
        filters[filter] = Array.from(filters[filter]);
    }
    
    if(filters['Accountable']) {
        filters['Accountable'] = filters['Accountable'].reduce((accountables, newAccountable) => {
            if(!accountables.some(accountable => accountable.value === newAccountable._id)) {
                accountables.push({
                    label: newAccountable.name,
                    value: newAccountable._id
                });
            }
    
            return accountables;
        }, []);
    
        settings['Accountable'] = 'accountables._id';
    }

    if(filters['CTI Tool - Application']) {
        const applications = filters['CTI Tool - Application'].map(application => ObjectId(application));
    
        filters['CTI Tool - Application'] = await Application.getMany(
            {
                _id: {$in: applications}
            },
            {
                projection: {
                    name: 1
                }
            }
        );
    
        filters['CTI Tool - Application'] = filters['CTI Tool - Application'].map(application => ({
            label: application.name,
            value: application._id
        }));
        
        filters['CTI Tool - Support Group'] = await Application.getSupportGroups(
            {
                _id: {$in: applications}
            },
            {
                projection: {
                    'applications._id': 1,
                    'applications.name': 1
                }
            }
        );
    
        filters['CTI Tool - Support Group'] = filters['CTI Tool - Support Group'].map(supportGroup => ({
            label: supportGroup.name,
            value: supportGroup.applications.map(application => application._id)
        }));
    
        settings['CTI Tool - Support Group'] = 'settings.cti tool.applications.support group';
    }

    for(let filter in filters) {
        if(typeof filters[filter][0] === 'string') {
            filters[filter] = filters[filter].map(value => ({
                label: capitalize(value),
                value
            }));
        }

        sortByField(filters[filter], 'label');
    }


    const filtersEnd = Object.keys(filters).reduce((filtersEnd, filter) => {
        if(filters[filter].length) {
            filtersEnd.push({
                name: settings[filter],
                label: filter,
                options: filters[filter]
            });
        }

        return filtersEnd;
    }, []);

    return res.json(filtersEnd);
}

async function getNotificationsOld(req, res) {
    const result = await Notification.getReceivedOld({
        userId: req._id.toString(), 
        query: req.query, pipeline: req.pipeline
    });

    res.status(result.status);
    return res.json(result.json);
}

async function getNotifications(req, res) {
    const result = await Notification.getReceived({
        userId: req._id.toString(), 
        query: req.query,
        settings: req.querySettings
    });

    res.status(result.status);
    return res.json(result.json);
}

async function updateLastSeenNotifications(req, res) {
    const user = req._user;
    const result = await user.updateLastSeenNotifications(req.body);

    res.status(result.status);
    return res.json(result.json);
}

async function getToolOptions(req, res) {
    const result = await getUser_controller(req.query._id || req._id);

    if(!result.ok) {
        res.status(result.status);
        return res.json(result.json);
    }

    const user = result.user;

    const pendingRequests = await Request.getMany({
        'requester._id': user._id.toString(),
        type: 'tool',
        status: 'pending'
    });

    const options = roles[user.profile.role].allowedAccesses.sort().reduce((options, access) => {
        if(
            !user.accesses.includes(access) && 
            !pendingRequests.find(request => request.data.access === access
        )) {
            options.push(access);
        }

        return options;
    }, []);

    return res.json(options);   
}

//-----------------------------------------------------------
//            \/ OLD APIS \/

async function updateStatus(req, res) {
    const {accountablePassword, newStatus} = req.body;

    const user = req._user;
    const accountable = await getUser(ObjectId(user.accountable._id), res);
    const passwordValidation = await accountable.validatePassword(accountablePassword);

    if(!passwordValidation.ok) {
        res.status(passwordValidation.status);
        return res.json(passwordValidation.json);
    }

    let result = null;

    if(newStatus === 'active') {
        result = await user.activate();
    } else if(newStatus === 'locked'){
        result = await user.lock();

        if(result.ok) {
            const userPendingRequests = await Request.getMany({requester: user._id, status: 'pending'});
    
            userPendingRequests.forEach(async pendingRequest => {
                const request = new Request(pendingRequest);
                await request.cancel(user._id);
            });
        }
    } else {
        res.status(400);
        return res.json({
            ok: false,
            message: 'Invalid status'
        });
    }

    res.status(result.status);
    return res.json(result.json);
}

async function setAwayMode(req, res) {
    const {userId, settings, notifyTeam} = req.body;
    const user = req._user;

    const result = await user.setAwayMode(settings);

    if(result.ok && notifyTeam) {
        const awayMode = {...user.settings.awayMode};
        delete awayMode.message;

        await Notification.create({
            author: userId,
            group: 'team',
            code: 'user-away mode-set',
            data: awayMode
        });
    }

    res.status(result.status);
    return res.json(result.json);
}

async function unsetAwayMode(req, res) {
    const user = req._user;

    const result = await user.disableAwayMode();;

    res.status(result.status);
    return res.json(result.json);
}

async function unsetAwayMode(req, res) {
    const user = req._user;

    const result = await user.disableAwayMode();;

    res.status(result.status);
    return res.json(result.json);
}

exports.getUser = getUser;
exports.getUserFromId = getUserFromId;
exports.updateUserApplications = updateUserApplications;
exports.updateUserAccess = updateUserAccess;
exports.getAccountableOptions = getAccountableOptions;
exports.updatePassword = updatePassword;
exports.getUsers = getUsers;
exports.updateStatus = updateStatus;
exports.setAwayMode = setAwayMode;
exports.unsetAwayMode = unsetAwayMode;
exports.getFilters = getFilters;
exports.updateLastSeenNotifications = updateLastSeenNotifications;
exports.getNotificationsOld = getNotificationsOld;
exports.getNotifications = getNotifications;
exports.getToolOptions = getToolOptions;
exports.getToolOptions = getToolOptions;