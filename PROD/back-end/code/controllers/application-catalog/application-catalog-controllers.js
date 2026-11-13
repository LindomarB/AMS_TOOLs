const Application = require("../../model/Application");

async function getApplicationCatalog(req, res) {
    const applicationCatalog = await Application.getMany(req.query, req.querySettings);
    return res.json(applicationCatalog);
}

async function getSupportGroups(req, res) {
    const supportGroups = await Application.getSupportGroups(req.query, req.querySettings);
    return res.json(supportGroups);
}

async function getFilters(req, res) {
    if(!req.querySettings.filters) return res.json([]);

    const filters = req.querySettings.filters.reduce((filters, filter) => {
        filters[filter.name || filter.field] = {$addToSet: `$${filter.field}`};
        return filters;
    }, {});

    const options = await Application.aggregate([
        {$match: req.query}, 
        {$unwind: '$country'},
        {$unwind: '$business unit'},
        {$unwind: '$track lead'},
        {$unwind: '$shifts'},
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

exports.getApplicationCatalog = getApplicationCatalog;
exports.getSupportGroups = getSupportGroups;
exports.getFilters = getFilters;