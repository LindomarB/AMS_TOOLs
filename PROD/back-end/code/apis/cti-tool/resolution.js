const { ObjectId } = require("mongodb");
const Resolution = require("../../model/resolution/Resolution");
const ResolutionInProgress = require("../../model/resolution/ResolutionInProgress");
const { getUser } = require("../../controllers/ams-tools/user-controllers");
const { hasApplicationPermission } = require("../../controllers/cti-tool/resolution-controllers");
const capitalize = require("../../functions/capitalize");
const User = require("../../model/User");
const { removeFavoriteResolution } = require("../../controllers/cti-tool/user-settings-controllers");
const sortByField = require("../../functions/sortByField");

async function newResolution(req, res, _, inProgress = false) {
    const author = req._user;

    if(!hasApplicationPermission(author, req.body)) {
        res.status(401);
        return res.json({message: 'You are not allowed to create resolutions for this application'})
    }

    const ResolutionType = inProgress? ResolutionInProgress : Resolution;
    const newResolution = new ResolutionType({
        ...req.body,
        _id: req.body._id && ObjectId(req.body._id),
        meta: {
            'created by': {
                _id: author._id.toString(),
                name: author.profile.name,
                cargillId: author.profile.cargillId 
            },
            'created on': new Date()
        }
    });

    let result = await newResolution.save();

    if(!inProgress) {
        const resolutionInProgress = await ResolutionInProgress.get({'incident.incident': newResolution.document.incident.incident});

        if(resolutionInProgress) {
            const deleteResult = await resolutionInProgress.delete();

            if(!deleteResult.ok) {
                result = deleteResult;
            }
        }
    }

    res.status(result.status);
    return res.json({
        ...result.json,
        resolution: newResolution.document
    });
}

async function editResolution(req, res) {
    const resolution = await Resolution.get({_id: ObjectId(req.body._id)});

    if(!resolution) {
        res.status(404);
        return res.json({message: 'Resolution not found'});
    }

    const user = req._user;

    if(!hasApplicationPermission(user, resolution.document.incident)) {
        res.status(403);
        return res.json({message: 'User not authorized to edit this resolution'});
    }

    const result = await resolution.update(req.body, user);
    
    res.status(result.status);
    return res.json(result.json);   
}

async function updateProgress(req, res) {
    const resolution = await ResolutionInProgress.get({_id: ObjectId(req.body._id)});
    if(!resolution) {
        res.status(404);
        return res.json({message: 'Resolution not found'});
    }

    if(resolution.document.meta['created by']._id !== req._id.toString()) {
        res.status(403);
        return res.json({message: 'User not authorized to edit this resolution'});
    }

    const result = await resolution.update(req.body);
    
    res.status(result.status);
    return res.json(result.json);   
}

async function getResolutions(req, res, _, inProgress = false) {
    const ResolutionType = inProgress? ResolutionInProgress : Resolution;
    const resolutions = await ResolutionType.getMany(req.query, req.querySettings);
    return res.json(resolutions);
}

async function deleteResolution(req, res) {
    const resolution = await Resolution.get(req.query);

    if(!resolution) {
        res.status(400);
        return res.json({
            message: 'Resolution not found'
        });
    }

    const user = req._user;

    if(user.profile.role === 'analyst' || !hasApplicationPermission(user, resolution.document.incident)) {
        res.status(403);
        return res.json({message: 'Unauthorized access'});
    }

    const result = await resolution.delete();

    if(result.ok) {
        const users = await User.getMany({
            'settings.cti tool.favorites': resolution._id.toString()
        }, null, true);

        for(let user of users) {
            await removeFavoriteResolution(user, resolution._id.toString());
        }
    }

    res.status(result.status);
    return res.json(result.json);
}

async function deleteProgress(req, res) {
    const resolution = await ResolutionInProgress.get(req.query);
    
    if(!resolution) {
        res.status(400);
        return res.json({
            message: 'Resolution not found'
        });
    }

    if(resolution.document.meta['created by']._id !== req._id.toString()) {
        res.status(403);
        return res.json({
            message: 'Unauthorized access'
        });
    }

    const result = await resolution.delete();
    res.status(result.status);
    return res.json(result.json);
}

async function getFilters(req, res) {
    const settings = {
        'Application': 'incident.application',
        'Assignee': 'meta.created by',
        'Breach Reason': 'sla.breach reason',
        'Classification': 'classification.classification',
        'Country': 'incident.country',
        'Diagnosis Matches The Problem': 'problem.diagnosis matches the problem',
        'Exception': 'sla.exception',
        'KBA': 'kba.number',
        'PBI': 'pbi.number',
        'Priority': 'incident.priority',
        'Reopening': 'problem.is reopening',
        'Reopening Reason': 'problem.reopening reason',
        'SLA Lost': 'sla.was lost',
        'SLA Lost by Wipro\'s Fault': 'sla.wipro fault',
        'Support Group': 'incident.support group',
        'Tier 1': 'tiers.tier 1',
        'Tier 2': 'tiers.tier 2',
        'Tier 3': 'tiers.tier 3',
        'Tier 4': 'tiers.tier 4',
        'Tier 5': 'tiers.tier 5',
        'Used SQL': 'solution.used sql',
        'Was user guided': 'solution.was user guided'
    };

    const projection = Object.keys(settings).reduce((projection, filter) => {
        projection[filter] = `$${settings[filter]}`
        return projection;
    }, {});

    const result = await Resolution.aggregate([
        {$match: req.query},
        {$project: projection}
    ]);

    const filters = Object.keys(settings).reduce((filters, filter) => {
        filters[filter] = new Set();
        return filters;
    }, {});

    result.forEach(resolution => {
        for(let filter in filters) {
            if(!resolution[filter]) continue;

            if(Array.isArray(resolution[filter])) {
                resolution[filter].forEach(value => value && filters[filter].add(value));
            } else {
                filters[filter].add(resolution[filter]);
            }
        }
    }, {});

    for(let filter in filters) {
        filters[filter] = Array.from(filters[filter]);
    }

    filters['Assignee'] = filters['Assignee'].reduce((filters, newAssignee) => {
        if(!filters.some(assignee => assignee.value === newAssignee._id)) {
            filters.push({
                label: newAssignee.name,
                value: newAssignee._id
            });
        }

        return filters;
    }, []);

    settings['Assignee'] = 'meta.created by._id';

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

exports.newResolution = newResolution;
exports.editResolution = editResolution;
exports.updateProgress = updateProgress;
exports.getResolutions = getResolutions;
exports.deleteResolution = deleteResolution;
exports.deleteProgress = deleteProgress;
exports.getFilters = getFilters;
