const { addFavoriteResolution, removeFavoriteResolution, getUserApplications, getUserApplicationOptions, getUserSupportGroupOptions } = require("../../controllers/cti-tool/user-settings-controllers");

async function getApplications(req, res) {
    const userApplications = await getUserApplications(req._user);
    return res.json(userApplications);
}

async function getApplicationOptions(req, res) {
    const options = await getUserApplicationOptions(req._user);
    return res.json(options);
}

async function getSupportGroupOptions(req, res) {
    const options = await getUserSupportGroupOptions(req._user);
    return res.json(options);
}

async function updateFavoriteResolutions(req, res) {
    const {action, resolution} = req.body;

    if(!action || !resolution) {
        res.status(400);
        return res.json({message: 'Invalid data format'});
    }

    const user = req._user;
    let result = null;

    if(action === 'add') {
        result = await addFavoriteResolution(user, resolution);
    } else if(action === 'remove') {
        result = await removeFavoriteResolution(user, resolution);
    } else {
        res.status(400);
        return res.json({message: 'Invalid action'});
    }

    res.status(result.status);
    return res.json(result.json);
}

exports.getApplications = getApplications;
exports.getApplicationOptions = getApplicationOptions;
exports.getSupportGroupOptions = getSupportGroupOptions;
exports.updateFavoriteResolutions = updateFavoriteResolutions;