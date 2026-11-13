const { ObjectId } = require("mongodb");
const Application = require("../../model/Application");
const ResolutionInProgress = require("../../model/resolution/ResolutionInProgress");
const Resolution = require("../../model/resolution/Resolution");
const User = require("../../model/User");

async function getUserApplications(user) {
    let userApplications = user.getSettings('cti tool', 'applications') || [];

    if(userApplications.length) {
        userApplications = await Application.getMany(
            {
                _id: {$in: userApplications.map(application => ObjectId(application))},
                status: {$ne: 'not supported by Wipro'}
            },
            {
                projection: {
                    name: 1,
                    country: 1,
                    'support group': 1,
                    status: 1
                }
            }
        );
    }

    return userApplications;
}

async function getUserApplicationOptions(user) {
    const Request = require("../../model/request/Request");

    const userApplications = user.getSettings('cti tool', 'applications') || [];
    const applicationOptions = [];

    const pendingApplicationRequests = await Request.getMany({
        'requester._id': user._id.toString(),
        type: 'cti application access',
        status: 'pending'
    });

    const supportGroupAccessPendingRequests = await Request.getMany({
        'requester._id': user._id.toString(),
        type: 'cti support group access',
        status: 'pending'
    });

    const pendingRequests = [
        ...pendingApplicationRequests.map(request => request.data.application._id),
        ...supportGroupAccessPendingRequests.reduce((applications, request) => {
            applications.push(...request.data.applications.map(application => application._id));
            return applications;
        }, []),
    ];

    const userAccountables = await User.getMany({
        _id: {$in: user.getPrimaryAccountables().map(accountable => ObjectId(accountable._id))}
    }, null, true);

    for(let accountable of userAccountables) {
        const accountableApplications = accountable.getSettings('cti tool', 'applications') || [];

        accountableApplications.forEach(accountableApplication => {
            if(
                !applicationOptions.some(applicationOption => applicationOption === accountableApplication) &&
                !userApplications.some(userApplication => userApplication === accountableApplication) &&
                !pendingRequests.some(applicationId => applicationId === accountableApplication)
            ) {
                applicationOptions.push(accountableApplication);
            }
        });
    }

    const options = await Application.getMany(
        {
            _id: {$in: applicationOptions.map(application => ObjectId(application))},
            status: {$ne: 'not supported by Wipro'}
        },
        {
            projection: {
                name: 1,
                country: 1,
                'support group': 1,
                status: 1
            }
        }
    );

    return options;
}

async function getAllUserApplicationOptions(user) {
    const applicationOptions = [];

    const userAccountables = await User.getMany({
        _id: {$in: user.getPrimaryAccountables().map(accountable => ObjectId(accountable._id))}
    }, null, true);

    for(let accountable of userAccountables) {
        const accountableApplications = accountable.getSettings('cti tool', 'applications') || [];

        accountableApplications.forEach(accountableApplication => {
            if(!applicationOptions.some(applicationOption => applicationOption === accountableApplication)) {
                applicationOptions.push(accountableApplication);
            }
        });
    }

    const options = await Application.getMany(
        {
            _id: {$in: applicationOptions.map(application => ObjectId(application))},
            status: {$ne: 'not supported by Wipro'}
        },
        {
            projection: {
                name: 1,
                country: 1,
                'support group': 1
            }
        }
    );

    return options;
}

async function getUserSupportGroupOptions(user) {
    const Request = require("../../model/request/Request");

    const supportGroups = await Application.getSupportGroups({
        status: {$ne: 'not supported by Wipro'}
    });
    const userApplications = user.getSettings('cti tool', 'applications') || [];
    const userSupportGroups = supportGroups.filter(supportGroup => 
        supportGroup.applications.every(application => 
            userApplications.includes(application._id.toString())
    )).
    map(supportGroup => supportGroup.name);

    const accountableSupportGroups = [];

    for(let primaryAccountable of user.getPrimaryAccountables()) {
        const accountable = await User.get({_id: ObjectId(primaryAccountable._id)});
        const accountableApplications = accountable.getSettings('cti tool', 'applications') || [];
        supportGroups.forEach(supportGroup => {
            if(
                supportGroup.applications.every(application => accountableApplications.includes(application._id.toString())) &&
                !accountableSupportGroups.includes(supportGroup.name)
            ) {
                accountableSupportGroups.push(supportGroup.name);
            }
        });
    }

    const supportGroupPendingRequests = await Request.getMany({
        'requester._id': user._id.toString(),
        type: 'cti support group access',
        status: 'pending'
    });

    const pendingRequests = supportGroupPendingRequests.map(request => request.data.supportGroup);

    const options = accountableSupportGroups.reduce((options, supportGroupName) => {
            if(!userSupportGroups.includes(supportGroupName) && !pendingRequests.includes(supportGroupName)) {
                options.push(supportGroups.find(supportGroup => supportGroup.name === supportGroupName))
            }
            
            return options;
    }, []);

    return options;
}

async function addApplicationPermission(user, applications = []) {
    if(!user.hasAccess('cti tool')) {
        return {
            ok: false,
            status: 401,
            json: {
                message: 'User do not have access to CTI Tool'
            }
        }
    }
    const userApplications = user.getSettings('cti tool', 'applications') || [];

    applications = applications.reduce((applications, applicationId) => {
        if(ObjectId.isValid(applicationId)) {
            applications.push(ObjectId(applicationId));
        }
        return applications;
    }, []);

    applications = await Application.getMany(
        {
            _id: {$in: applications},
            status: {$ne: 'not supported by Wipro'}
        }, 
        {
            projection: {
                name: 1
            }
        }
    );

    applications = applications.filter(application => !userApplications.includes(application._id.toString()));
    userApplications.push(...applications.map(application => application._id.toString()));
    const result = await user.setSettings('cti tool', 'applications', userApplications);

    if(!result.ok) return result;

    return {
        ok: true,
        status: 200,
        addedApplications: applications.map(application => application.name),
        json: {
            message: 'Application permissions updated',
        }
    };
}

async function removeApplicationPermission(user, applications = []) {
    if(!user.hasAccess('cti tool')) {
        return {
            ok: false,
            status: 401,
            json: {
                message: 'User do not have access to CTI Tool'
            }
        }
    }

    const userApplications = user.getSettings('cti tool', 'applications') || [];
    const removedApplicationsId = [];

    const newApplications = userApplications.filter(userApplication => {
        if(applications.includes(userApplication)) {
            removedApplicationsId.push(userApplication);
            return false;
        } else {
            return true;
        }
    });

    const result = await user.setSettings('cti tool', 'applications', newApplications);

    if(!result.ok) return result;

    
    let removedApplications = await Application.getMany(
        {
            _id: {
                $in: removedApplicationsId.map(application => ObjectId(application))
            }
        },
        {
            projection: {
                name: 1
            }
        }
    );

    removedApplications = removedApplications.map(application => application.name);

    const resolutionsInProgress = await ResolutionInProgress.getMany({
        'incident.application': {$in: removedApplications},
        'meta.created by._id': user._id.toString()
    });
    
    for(let resolution of resolutionsInProgress) {
        const resolutionInProgress = new ResolutionInProgress(resolution);
        await resolutionInProgress.delete();
    }

    const userTeam = await User.getMany({'accountables._id': user._id.toString()}, null, true);
    const notifications = [];

    for(let member of userTeam) {
        const applicationOptions = (await getAllUserApplicationOptions(member)).map(application => application._id.toString());
        const applicationsToRemove = removedApplicationsId.filter(removedApplication => !applicationOptions.includes(removedApplication));
       
        if(applicationsToRemove.length) {
            const result = await removeApplicationPermission(member, applicationsToRemove);
 
            if(result.ok && result.removedApplications.length) {
                notifications.push(...result.notifications);
                notifications.push({
                    author: 'system',
                    code: 'cti tool-application permission-accountable access removed',
                    addressee: member._id.toString(),
                    data: {
                        application: result.removedApplications.join(', ')
                    }
                });
            }
        }
    }

    return {
        ok: true,
        status: 200,
        removedApplications,
        notifications,
        json: {
            message: 'Application permissions updated',
        }
    };
}

async function addFavoriteResolution(user, resolution) {
    const resolutionExists = await Resolution.get({_id: ObjectId(resolution)});

    if(!resolutionExists) {
        return {
            ok: false,
            status: 404,
            json: {message: 'Resolution not found'}
        };
    }

    const userFavorites = user.getSettings('cti tool', 'favorites') || [];

    if(userFavorites.includes(resolution)) {
        return {
            ok: false,
            status: 400,
            json: {message: 'The resolution is already in favorites'}
        };
    }

    userFavorites.push(resolution);
    const result = await user.setSettings('cti tool', 'favorites', userFavorites);

    if(!result.ok) return result;
    
    return {
        ok: true,
        status: 200,
        json: {message: 'Resolution added to favorites'}
    };
}

async function removeFavoriteResolution(user, resolution) {
    if(!resolution) {
        return {
            ok: false,
            status: 404,
            json: {message: 'Resolution not found'}
        };
    }

    let userFavorites = user.getSettings('cti tool', 'favorites') || [];
    userFavorites = userFavorites.filter(favResolution => favResolution !== resolution);
    const result = await user.setSettings('cti tool', 'favorites', userFavorites);

    if(!result.ok) return result;

    return {
        ok: true,
        status: 200,
        json: {message: 'Resolution removed from favorites'}
    };
}

async function addUserAccessToCti(user) {
    const result = await user.addAccess('cti tool');

    if(!result.ok) return result;

    await user.setSettings('cti tool', null, {
        applications: [],
        favorites: []
    });    

    return {
        ok: true,
        status: 200,
        json: {message: 'Added access to CTI Tool'}
    };
}

async function removeUserAccessToCti(user) {
    const { cancelRequests } = require("../ams-tools/request-controllers");
    const result = await user.removeAccess('cti tool');

    if(!result.ok) return result;

    await user.removeSetting('cti tool');

    await cancelRequests({
        'requester._id': user._id.toString(), 
        $or: [
            {type: 'cti application access'},
            {type: 'cti support group access'}
        ]
    });

    const resolutionsInProgress = await ResolutionInProgress.getMany({'meta.created by._id': user._id.toString()});

    for(let resolution of resolutionsInProgress) {
        const resolutionInProgress = new ResolutionInProgress(resolution);
        await resolutionInProgress.delete();
    }

    return {
        ok: true,
        status: 200,
        json: {message: 'Access to CTI Tool removed'}
    };
}

async function reviewUserAccessToCti(user) {
    const accountables = await User.getMany({
        _id: {$in: user.getPrimaryAccountables().map(accountable => ObjectId(accountable._id))}
    }, null, true);

    const canHaveAccess = accountables.some(accountable => accountable.hasAccess('cti tool'));

    if(!canHaveAccess) {
        return await removeUserAccessToCti(user);
    }

    const accountableApplications = accountables.reduce((applications, accountable) => {
        const accountableApplications = accountable.getSettings('cti tool', 'applications') || [];

        accountableApplications.forEach(application => {
            if(!applications.includes(application)) applications.push(application);
        });

        return applications;
    }, []);

    const userApplications = user.getSettings('cti tool', 'applications') || [];

    const result = await user.setSettings('cti tool', 'applications', userApplications.filter(application => accountableApplications.includes(application)));

    if(!result.ok) return result;

    return {
        ok: true,
        status: 200,
        json: {message: 'Access to CTI Tool updated'}
    };
}

exports.getUserApplications = getUserApplications;
exports.getUserApplicationOptions = getUserApplicationOptions;
exports.getUserSupportGroupOptions = getUserSupportGroupOptions;
exports.addApplicationPermission = addApplicationPermission;
exports.removeApplicationPermission = removeApplicationPermission;
exports.addFavoriteResolution = addFavoriteResolution;
exports.removeFavoriteResolution = removeFavoriteResolution;
exports.addUserAccessToCti = addUserAccessToCti;
exports.removeUserAccessToCti = removeUserAccessToCti;
exports.reviewUserAccessToCti = reviewUserAccessToCti;