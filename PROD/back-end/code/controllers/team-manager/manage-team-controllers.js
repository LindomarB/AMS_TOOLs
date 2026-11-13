const User = require("../../model/User");
const { addUserAccountable, removeUserAccountable } = require("../ams-tools/user-controllers");

async function addMemberToTeam(userId, accountableId) {
    const result = await addUserAccountable(userId, accountableId);

    if(!result.ok) return result;

    const memberTeam = await User.getMany({'accountables._id': userId}, null, true);
    const teamChanges = [];

    for(let user of memberTeam) {
        const primaryAccountablesBefore = structuredClone(user.getPrimaryAccountables());
        await addUserAccountable(user, accountableId);

        const accountablesChanged = primaryAccountablesBefore.filter(primaryBefore => 
            !user.accountables.some(accountable => accountable._id === primaryBefore._id && accountable.primary)
        );
        
        if(accountablesChanged.length) {
            teamChanges.push({
                user,
                accountablesChanged
            });
        }
    }

    return {
        ok: true,
        ...result,
        teamChanges
    };
}

async function removeMemberFromTeam(userId, accountableId, membersToKeep) {
    const result = await removeUserAccountable(userId, accountableId);

    if(!result.ok) return result;

    const directTeamMembers = await User.getMany({
        'accountables': {
            $elemMatch: {
                _id: accountableId,
                primary: {$exists: true}
            }
        }
    });

    const newTeamStructure = directTeamMembers.map(user => user._id.toString());
    newTeamStructure.push(...membersToKeep || []);
    
    for(let member of directTeamMembers) {
        const team = await User.getMany({'accountables._id': member._id.toString()});
        newTeamStructure.push(...team.map(member => member._id.toString()));
    }

    const currentTeam = await User.getMany({'accountables._id': accountableId}, null, true);

    for(let member of currentTeam) {
        if(newTeamStructure.includes(member._id.toString())) {
            await addUserAccountable(member, accountableId);
        } else {
            await removeUserAccountable(member, accountableId);
        }
    }

    for(let newMember of newTeamStructure) {
        if(!currentTeam.some(member => member._id.toString() === newMember)) {
            await addUserAccountable(newMember, accountableId);
        }
    }

    return {
        ok: true,
        ...result
    };
}

exports.addMemberToTeam = addMemberToTeam;
exports.removeMemberFromTeam = removeMemberFromTeam;