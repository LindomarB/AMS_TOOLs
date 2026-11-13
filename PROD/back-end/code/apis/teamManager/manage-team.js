const jwt = require('jsonwebtoken');
const { approveRequests, cancelRequests } = require("../../controllers/ams-tools/request-controllers");
const { getUser, addUserAccess, removeUserAccess } = require("../../controllers/ams-tools/user-controllers");
const { getUserApplications, addApplicationPermission, removeApplicationPermission, getUserApplicationOptions, getUserSupportGroupOptions } = require("../../controllers/cti-tool/user-settings-controllers");
const roles = require("../../data/roles");
const Application = require("../../model/Application");
const User = require("../../model/User");
const Notification = require("../../model/notification/Notification");
const { addMemberToTeam, removeMemberFromTeam } = require('../../controllers/team-manager/manage-team-controllers');

async function checkAccountable(req, res, next) {
    const getUserResult = await getUser(req.body.userId);

    if(!getUserResult.ok) {
        res.status(getUserResult.status);
        return res.json(getUserResult.json);
    }

    const accountable = req._user;
    let member = getUserResult.user;

    if(!member.isAccountable(accountable._id.toString())) {
        res.status(401);
        return res.json({message: 'Unauthorized access'});
    }

    if(req.body.key) {
        const key = jwt.decode(req.body.key);

        if(!key || key.token !== req.token) {
            res.status(401);
            return res.json({message: 'Invalid key'});
        }

        req._key = key;
    } else {
        const passwordValidation = await accountable.validatePassword(req.body.password);
    
        if(!passwordValidation.ok) {
            res.status(passwordValidation.status);
            return res.json(passwordValidation.json);
        }
    }
    
    req._member = member;
    next();
}


async function getTeamMember(req, res) {
    const user = req._user;

    if(user.settings['cti tool']) {
        user.settings['cti tool'].applications  = await getUserApplications(user);
    }

    delete user.password;
    return res.json(user);
}

// async function getTeamMembers(req, res) {
//     const projection = {
//         ...req.querySettings.projection || {}
//     };

//     if(projection.password) {
//         projection.password = 0;
//     }

//     if(!req.query['accountables._id']) {
//         req.query['accountables._id'] = req._id.toString();
//     } else {
//         $and = [
//             {'accountables._id': req._id.toString()},
//             {'accountables._id': req.query['accountables._id']}
//         ];

//         if(req.query.$and) {
//             req.query.$and.push(...$and);
//         } else {
//             req.query.$and = $and;
//         }

//         delete req.query['accountables._id'];
//     }

//     const users = await User.getMany(req.query, {
//         ...req.querySettings,
//         projection
//     });

//     return res.json(users);
// }

async function getNewMemberOptions(req, res) {
    const user = req._user;

    const projection = {
        ...req.querySettings.projection || {}
    };

    if(projection.password) {
        projection.password = 0;
    }

    req.query['accountables._id'] = {$ne: user._id.toString()};
    req.query['profile.role'] = {$in: Object.keys(roles).filter(role => roles[role].accountableRoles.includes(user.profile.role))};

    const users = await User.getMany(
        req.query, 
        {
            ...req.querySettings,
            projection
        }
    );

    return res.json(users);
}

async function getMemberApplicationOptions(req, res) {
    const getUserResult = await getUser(req.query.userId);

    if(!getUserResult.ok) {
        res.status(getUserResult.status);
        return res.json(getUserResult.json);
    }

    const member = getUserResult.user;
    const accountable = req._user;

    const accountableApplications = accountable.getSettings('cti tool', 'applications') || [];
    const memberApplicationOptions = await getUserApplicationOptions(member);

    const options = memberApplicationOptions.filter(application => accountableApplications.includes(application._id.toString()));
    return res.json(options);
}

async function getMemberSupportGroupOptions(req, res) {
    const getUserResult = await getUser(req.query.userId);

    if(!getUserResult.ok) {
        res.status(getUserResult.status);
        return res.json(getUserResult.json);
    }

    const member = getUserResult.user;
    const accountable = req._user;

    const supportGroups = await Application.getSupportGroups();
    const accountableApplications = accountable.getSettings('cti tool', 'applications') || [];
    const accountableSupportGroups = supportGroups.filter(supportGroup => 
        supportGroup.applications.every(application => 
            accountableApplications.includes(application._id.toString())
    )).
    map(supportGroup => supportGroup.name);

    const memberSupportGroupOptions = await getUserSupportGroupOptions(member);
    const options = memberSupportGroupOptions.filter(supportGroup => accountableSupportGroups.includes(supportGroup.name));
    
    return res.json(options);
}

async function updateMemberApplications(req, res) {
    const {userId, action, supportGroup, password, key} = req.body;
    let {applications = []} = req.body;
    
    if(!userId || !action || !(password || key) ||!(applications || supportGroup) || !Array.isArray(applications)) {
        res.status(400);
        return res.json({message: 'Invalid data format'});
    }

    if(req._key && req._key.process !== 'addMember') {
        res.status(401);
        return res.json({message: 'Invalid key'});
    }

    const accountable = req._user;
    let member = req._member;

    if(supportGroup) {
        const result = await Application.getMany(
            {
                'support group': supportGroup,
                status: 'active'
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
            await approveRequests({
                'requester._id': member._id.toString(), 
                $or: [
                        {
                            type: 'cti application access', 
                            'data.application._id': {$in: applications}
                        },
                        {
                            type: 'cti support group access', 
                            'data.supportGroup': supportGroup
                        }
                    ]
                    
                },
                accountable._id.toString(),
                password
            );
            
            member = await User.get({_id: member._id});
            result = await addApplicationPermission(member, applications);
        } else if(action === 'remove') {
            result = await removeApplicationPermission(member, applications);
        } else {
            res.status(400);
            return res.json({message: `Invalid action '${action}'`});
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({message: `Internal server error`});
    }

    if(result.ok) {
        const notification = {
            author: 'system',
            addressee: member._id.toString(),
        };

        if(supportGroup && (result.removedApplications || result.addedApplications)) {
            await Notification.create({
                ...notification,
                code: `cti tool-support group access-${action}`,
                data: {
                    accountable: accountable.profile.name,
                    supportGroup
                }
            });
        } else if(applications && (result.removedApplications || result.addedApplications)) {
            await Notification.create({
                ...notification,
                code: `cti tool-application permission-${action}`,
                data: {
                    accountable: accountable.profile.name,
                    application: result.removedApplications? result.removedApplications.join(', ') : result.addedApplications.join(', ')
                }
            });
        } 

        if(result.notifications) {
            for(let notification of result.notifications) {
                await Notification.create(notification);
            }
        }
    }

    res.status(result.status);
    return res.json(result.json);
}

async function updateMemberAccess(req, res) {
    const {userId, access, action, password, key} = req.body;

    if(!userId || !access || !action || !(password || key)) {
        res.status(400);
        return res.json({message: 'Data in bad format'});
    }

    if(req._key && req._key.process !== 'addMember') {
        res.status(401);
        return res.json({message: 'Invalid key'});
    }

    const accountable = req._user;
    let member = req._member;
    let result = null;

    try{
        if(action === 'add') {
            await approveRequests({
                    'requester._id': member._id.toString(),
                    type: 'tool',
                    'data.access': access
                },
                accountable._id.toString(),
                password
            );
            
            member = await User.get({_id: member._id});

            if(member.hasAccess(access)) {
                return res.json({message: `Access granted`});
            };

            result = await addUserAccess(member, access);
        } else if(action === 'remove') {
            result = await removeUserAccess(member, access);

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

    await Notification.create({
        author: 'system',
        addressee: member._id.toString(),
        code: `ams tools-tool-${action}`,
        data: {
            access,
            accountable: accountable.profile.name
        }
    });

    res.status(result.status);
    return res.json(result.json);
}

async function addMember(req, res) {
    const accountable = req._user;
    const result = await addMemberToTeam(req.body.userId, accountable._id.toString());

    if(!result.ok) {
        res.status(result.status);
        return res.json(result.json);
    }

    await Notification.create({
        author: 'system',
        addressee: req.body.userId,
        code: 'team manager-member-add',
        data: {accountable: accountable.profile.name}
    });

    if(result.removedPrimaryAccountables.length) {
        await Notification.create({
            author: 'system',
            addressee: result.removedPrimaryAccountables,
            code: 'team manager-accountable-direct member change',
            data: {
                accountable: accountable.profile.name,
                member: result.user.profile.name
            }
        });
    }

    for(let teamChange of result.teamChanges) {
        for(let accountable of teamChange.accountablesChanged) {
            await Notification.create({
                author: 'system',
                addressee: teamChange.user._id.toString(),
                code: 'team manager-member-direct accountable change',
                data: {accountable: accountable.name}
            });
        }
    }

    await cancelRequests({
        'requester._id': req.body.userId,
        type: {$in: ['new accountable', 'accountable change']},
        'data.newAccountable._id': accountable._id.toString()
    });

    return res.json({
        message: 'User added to your team',
        key: jwt.sign(
            {
                process: 'addMember',
                token: req.token
            },
            'primary_key'
        )
    });
}

async function removeMember(req, res) {
    const accountable = req._user;
    const member = req._member;

    if(member.profile.role !== 'analyst' && !req.body.membersToKeep) {
        const accountableTeam = await User.getMany(
            {
                'accountables._id': accountable._id.toString()
            },
            {
                projection: {
                    profile: {
                        name: 1,
                        role: 1,
                        email: 1
                    },
                    accountables: 1,
                    'status': 1,
                    'settings.profile': 1
                }
            }
        ); 

        const newTeam = [];
        const memberTeam = [];

        accountableTeam.forEach(member => {
            if(member.accountables.some(accountable => accountable._id === req.body.userId)) {
                member.accountables = member.accountables.filter(memberAccountable => memberAccountable._id !== accountable._id);
                memberTeam.push(member);
            } else if(member._id.toString() !== req.body.userId) {
                newTeam.push(member._id.toString());
            }
        });

        const membersToRemove = memberTeam.filter(member => !member.accountables.some(accountable => newTeam.includes(accountable._id)));        

        if(membersToRemove.length) {
            return res.json({
                checkMembersToKeep: true,
                members: membersToRemove
            });
        }
    }

    const result = await removeMemberFromTeam(member._id.toString(), accountable._id.toString(), req.body.membersToKeep);

    if(!result.ok) {
        res.status(result.status);
        return res.json(result.json);
    }

    await Notification.create({
        author: 'system',
        addressee: req.body.userId,
        code: 'team manager-member-remove',
        data: {accountable: accountable.profile.name}
    });

    if(result.addedPrimaryAccountables.length) {
        await Notification.create({
            author: 'system',
            addressee: result.addedPrimaryAccountables,
            code: 'team manager-accountable-indirect member change',
            data: {
                accountable: accountable.profile.name,
                member: member.profile.name
            }
        });
    }

    if(req.body.membersToKeep && req.body.membersToKeep.length) {
        await Notification.create({
            author: 'system',
            addressee: req.body.membersToKeep,
            code: 'team manager-member-indirect accountable change',
            data: {
                accountable: accountable.profile.name
            }
        });
    }

    return res.json({message: 'User removed from your team'});
}

async function generatePasswordResetAuthorization(req, res) {
    try {
        const result = await req._member.getPasswordResetAuthorization();
        if(!result.ok) {
            res.status(result.status);
            return res.json(result.json);
        }

        return res.json({message: 'Link generated'});
    } catch(err) {
        res.status(500);
        return res.json({message: 'The authorization code could not be generated'});
    }
}

exports.checkAccountable = checkAccountable;
exports.getTeamMember = getTeamMember;
// exports.getTeamMembers = getTeamMembers;
exports.getNewMemberOptions = getNewMemberOptions;
exports.getMemberApplicationOptions = getMemberApplicationOptions;
exports.getMemberSupportGroupOptions = getMemberSupportGroupOptions;
exports.updateMemberApplications = updateMemberApplications;
exports.updateMemberAccess = updateMemberAccess;
exports.addMember = addMember;
exports.removeMember = removeMember;
exports.generatePasswordResetAuthorization = generatePasswordResetAuthorization;