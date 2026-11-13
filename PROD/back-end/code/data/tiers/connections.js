const countryConnections = require("./countryConnections");
const pbisConnections = require("./pbisConnections");
const tier1Connections = require("./tier1Connections");
const tier2Connections = require("./tier2Connections");
const tier3Connections = require("./tier3Connections");

const connections = [
    ...countryConnections,
    ...tier1Connections,
    ...tier2Connections,
    ...tier3Connections,
    ...pbisConnections
];

module.exports = connections;