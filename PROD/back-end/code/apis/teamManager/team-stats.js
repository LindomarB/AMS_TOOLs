const { ObjectId } = require("mongodb");
const Application = require("../../model/Application");
const User = require("../../model/User");
const capitalize = require("../../functions/capitalize");

async function overview(req, res) {
    const team = await User.getMany(
        {
            'accountables._id': req.query['accountables._id'] || req._id.toString(),
            status: 'active'
        },
        {
            projection: {
                _id: 0, 
                'profile.role': 1,
                status: 1,
                accesses: 1
            }
        }
    );

    const sum = {
        roles: {},
        tools: {}
    };

    team.reduce((sum, user) => {
        sum.roles[user.profile.role] = (sum.roles[user.profile.role] || 0) + 1;

        user.accesses.forEach(access => {
            sum.tools[access] = (sum.tools[access] || 0) + 1;
        });

        return sum;
    }, sum);

    const count = {
        roles: [],
        tools: []
    };
    
    for(let set in sum) {
        for(let field of Object.keys(sum[set]).sort()) {
            count[set].push({title: capitalize(field), value: sum[set][field]});
        }
    }

    return res.json([
        {
            title: 'Active Members',
            value: count.roles,
            icon: 'team'
        },
        {
            title: 'Members by Tools',
            value: count.tools,
            icon: 'tools'
        }
    ]);
}

async function ctiTeam(req, res) {
    const team = await User.getMany(
        {
            'accountables._id': req.query['accountables._id']|| req._id.toString(),
            status: 'active',
            accesses: 'cti tool'
        },
        {
            projection: {
                _id: 0, 
                settings: 1,
                'profile.role': 1,
                status: 1,
                accesses: 1
            }
        }
    );

    const teamApplications = team.reduce((applications, user) => {
        user._applications = (user.settings['cti tool'] && user.settings['cti tool'].applications) || [];

        user._applications.forEach(application => {
            if(!applications.includes(application)) {
                applications.push(application);
            }
        });

        return applications;
    }, []);

    const applications = await Application.getMany(
        {
            _id: {$in: teamApplications.map(application => ObjectId(application))}
        },
        {
            projection: {
                name: 1,
                'support group': 1
            }
        }
    );

    const sum = {
        roles: {},
        applications: {},
        supportGroups: {}
    };

    team.reduce((sum, user) => {
        const userSupportGroups = new Set();

        user._applications.forEach(applicationId => {
            const application = applications.find(application => application._id.toString() === applicationId);
            sum.applications[application.name] = (sum.applications[application.name] || 0) + 1;
            userSupportGroups.add(application['support group']);
        });

        userSupportGroups.forEach(supportGroup => {
            const groupCount = sum.supportGroups[supportGroup] || 0;
            sum.supportGroups[supportGroup] = groupCount + 1;
        });

        sum.roles[user.profile.role] = (sum.roles[user.profile.role] || 0) + 1;

        return sum;
    }, sum);

    const count = {
        roles: [],
        applications: [],
        supportGroups: []
    };
    
    for(let set in sum) {
        for(let field of Object.keys(sum[set]).sort()) {
            count[set].push({title: capitalize(field), value: sum[set][field]});
        }
    }

    return res.json([
        {
            title: 'Active Members',
            value: count.roles,
            icon: 'team'
        },
        {
            title: 'Members by Application',
            value: count.applications,
            icon: 'resolution'
        },
        {
            title: 'Members by Support Group',
            value: count.supportGroups,
            icon: 'support group'
        },
    ]);
}

exports.overview = overview;
exports.ctiTeam = ctiTeam;