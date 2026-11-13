const { ObjectId } = require("mongodb");
const User = require("../../model/User");
const Application = require("../../model/Application");

async function getOrgChart(req, res) {
    const origin = await User.get({_id: req._id});

    const members = await User.getMany(
        {
            $or: [
                {'accountables._id': origin._id.toString()},
                {_id: {$in: [origin._id, ...origin.accountables.map(accountable => ObjectId(accountable._id))]}}
            ]
        }, 
        {
            sort: {
                'profile.name': 1
            }, 
            projection: {
                password: 0
            }
        }
    );

    const membersWithCtiAccess = members.filter(member => 
        member.accesses.includes('cti tool') &&
        (
            member._id.toString() === origin._id.toString() || 
            member.accountables.some(accountable => accountable._id === origin._id.toString())
        )
    );

    const memberApplications = membersWithCtiAccess.reduce((applications, member) => {
        if(member.settings['cti tool'].applications) {
            applications.push(...member.settings['cti tool'].applications);
        }
        
        return applications;
    }, [])
    .map(application => ObjectId(application));

    const applications = await Application.getMany(
        {
            _id: {$in: memberApplications}
        },
        {
            projection: {
                name: 1,
                'support group': 1
            }
        }
    );

    membersWithCtiAccess.forEach(member => {
        member.settings['cti tool'].applications = member.settings['cti tool'].applications.map(
            memberApplication => applications.find(application => application._id.toString() === memberApplication)
        );
    });

    return res.json(members);
}

exports.getOrgChart = getOrgChart;