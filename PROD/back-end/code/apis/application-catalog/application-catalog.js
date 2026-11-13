const capitalize = require("../../functions/capitalize");
const sortByField = require("../../functions/sortByField");
const Application = require("../../model/Application");

async function getApplicationCatalog(req, res) {
    const applicationCatalog = await Application.getMany(req.query, req.querySettings);
    return res.json(applicationCatalog);
}

async function getSupportGroups(req, res) {
    const supportGroups = await Application.getSupportGroups(req.query, req.querySettings);
    return res.json(supportGroups);
}

// async function getFilters(req, res) {
//     if(!req.querySettings.filters) return res.json([]);

//     const filters = req.querySettings.filters.reduce((filters, filter) => {
//         filters[filter.name || filter.field] = {$addToSet: `$${filter.field}`};
//         return filters;
//     }, {});

//     const options = await Application.aggregate([
//         {$match: req.query}, 
//         {$unwind: '$country'},
//         {$unwind: '$business unit'},
//         {$unwind: '$track lead'},
//         {$unwind: '$shifts'},
//         {$group: {
//                 _id: 0, 
//                 ...filters
//         }},
//         {$project: {
//             _id: 0
//         }}
//     ]);

//     return res.json(options[0] || []);
// }

async function getFilters(req, res) {
    const settings = {
        'Region': 'region',
        'Name': 'name',
        'Group': 'group',
        'Country': 'country',
        'Business unit': 'business unit',
        'Technology': 'technology',
        'Interfaces': 'interfaces',
        'Support group': 'support group',
        'Coverage': 'coverage',
        'App owner': 'app owner',
        'SDM': 'sdm',
        'App lead': 'app lead',
        'Track lead': 'track lead',
        'Shifts': 'shifts',
        'Status': 'status'
    };

    const projection = Object.keys(settings).reduce((projection, filter) => {
        projection[filter] = `$${settings[filter]}`
        return projection;
    }, {});

    const result = await Application.aggregate([
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

exports.getApplicationCatalog = getApplicationCatalog;
exports.getSupportGroups = getSupportGroups;
exports.getFilters = getFilters;