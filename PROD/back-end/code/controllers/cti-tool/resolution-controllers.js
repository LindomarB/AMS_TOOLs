const { ObjectId } = require("mongodb");
const User = require("../../model/User");
const Resolution = require("../../model/resolution/Resolution");
const { removeFavoriteResolution } = require("./user-settings-controllers");

function hasApplicationPermission(user, incident) {
    return (
        user.accesses.includes('cti tool') || 
        user.getSettings('cti tool', 'applications').some(application => 
            incident.application
                ? application.name === incident.application 
                : true && 
            incident['support group']
                ? application['support group'] === incident['support group'] 
                : true
    ));
}

async function deleteResolution(resolutionId) {
    const resolution = await Resolution.get({_id: ObjectId(resolutionId)});

    if(!resolution) {
        return {
            ok: false,
            status: 404,
            json: {
                message: 'Resolution not found'
            }
        };
    }

    const result = await resolution.delete();

    if(!result.ok) return result;

    const users = await User.getMany({
        'settings.cti tool.favorites': resolutionId
    });

    for(let user of users) {
        await removeFavoriteResolution(user, resolutionId);
    }

    return result;
}

exports.hasApplicationPermission = hasApplicationPermission;
