const { exportToExcel } = require("../../controllers/ams-tools/exportData");
const { mountTiersTree } = require("../../controllers/cti-tool/tiers-controllers");
const connections = require("../../data/tiers/connections");
const vertices = require("../../data/tiers/vertices");
const capitalize = require("../../functions/capitalize");
const User = require("../../model/User");

async function getTiersTree(req, res) {
    return res.json({
        vertices,
        connections
    });
}

async function exportTiers(req, res) {
    const user = await User.get({_id: req._id});

    const headers = ['Country', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'PBI', 'KBA'];
    const paths = {
        withoutPbiKba: [], 
        withPBIKba: []
    };

    const tiersTree = mountTiersTree();

    tiersTree.getPaths().reduce((paths, path) => {
        if(path.length === 5) {
            paths.withoutPbiKba.push(path);
        } else {
            paths.withPBIKba.push(path);
        }

        return paths;
    }, paths);

    paths.withPBIKba = paths.withPBIKba.reduce((paths, path, pathIndex, pathsWithPBIKba) => {
        if(!path) return paths;

        let pbi = '';
        let kba = '';

        const pathLastVertex = path.pop();

        if(pathLastVertex.startsWith('PBI')) {
            pbi = pathLastVertex;
        } else {
            kba = pathLastVertex;
        }

        for(let index = pathIndex + 1; index < pathsWithPBIKba.length; index++) {
            const xy = pathsWithPBIKba[index].slice(0, 5).every((tier, pathIndex) => tier === path[pathIndex]);

            if(xy) {
                const pathLastVertex = pathsWithPBIKba[index].pop();

                if(pathLastVertex.startsWith('PBI')) {
                    pbi = pathLastVertex;
                } else {
                    kba = pathLastVertex;
                }

                pathsWithPBIKba[index] = null;
            }
        }

        paths.push([...path, pbi, kba]);
        return paths;
    }, []);

    const rows = [...paths.withPBIKba, ...paths.withoutPbiKba];

    try {
        return exportToExcel({
            res,
            headers,
            rows,
            creator: user.profile.name
        });
    } catch(err) {
        console.log('exportTiers')
        console.log(err)
        res.status(500);
        return res.json({message: 'Error - file could not be created'})
    }
}

function getTiersStatus(req, res) {
    const tiersTree = mountTiersTree();

    let pbis = 0;
    let kbas = 0;
    let vertices = 0
    
    const tiers = tiersTree.getPaths(null, 5);

    Object.keys(tiersTree.getVertices()).forEach(vertex => {
        if(vertex.startsWith('PBI')) pbis++;
        else if(vertex.startsWith('KBA')) kbas++;
        else vertices++;
    });

    const byCountry = {};
    const byTier1 = {};

    tiers.forEach(set => {
        const country = set[0];
        byCountry[country] = (byCountry[country] || 0) + 1;

        const tier1 = set[1];
        byTier1[tier1] = (byTier1[tier1] || 0) + 1;
    });

    const countries = Object.keys(byCountry).length;

    const tiersCount = [
        {
            title: 'Countries',
            value: countries
        },
        {
            title: 'Tiers',
            value: vertices - countries
        },
        {
            title: 'Sets',
            value: tiers.length
        },
        {
            title: 'PBIs',
            value: pbis
        },
        {
            title: 'KBAs',
            value: kbas
        }
    ];

    const tiersData = [
        {
            title: 'Vertices and sets',
            icon: 'commit',
            value: tiersCount
        },
        {
            title: 'Sets by country',
            icon: 'country',
            value: Object.keys(byCountry).sort().map(country => ({
                title: capitalize(country),
                value: byCountry[country]
            }))
        },
        {
            title: 'Sets by tier 1',
            icon: 'tenancy',
            value: Object.keys(byTier1).sort().map(Tier1 => ({
                title: capitalize(Tier1),
                value: byTier1[Tier1]
            }))
        }
    ];

    return res.json(tiersData);
}

exports.getTiersTree = getTiersTree;
exports.exportTiers = exportTiers;
exports.getTiersStatus = getTiersStatus;