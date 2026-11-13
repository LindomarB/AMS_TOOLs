const countryConnections = require("../../data/tiers/countryConnections");
const pbisConnections = require("../../data/tiers/pbisConnections");
const tier1Connections = require("../../data/tiers/tier1Connections");
const tier2Connections = require("../../data/tiers/tier2Connections");
const tier3Connections = require("../../data/tiers/tier3Connections");
const vertices = require("../../data/tiers/vertices");
const Graph = require("../../library/Graph");

function mountTiersTree() {
    const tiersTree = new Graph(vertices);

    const connections = [
        ...countryConnections,
        ...tier1Connections,
        ...tier2Connections,
        ...tier3Connections,
        ...pbisConnections
    ];

    connections.forEach(connection => {
        const {origin, destinations, rules} = connection;
        tiersTree.addConnections(origin, destinations, rules);
    });

    return tiersTree;
}

exports.mountTiersTree = mountTiersTree;