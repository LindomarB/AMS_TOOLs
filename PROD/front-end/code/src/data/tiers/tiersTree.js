import Graph from "../../classes/Graph";
import vertices from "./vertices";
import countryConnections from "./connections/countryConnections";
import tier1Connections from "./connections/tier1Connections";
import tier2Connections from "./connections/tier2Connections";
import tier3Connections from "./connections/tier3Connections";
import pbisConnections from "./connections/pbisConnections";

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

// tiersTree.printPathsOnConsole(tiersTree.getPaths())
// console.log(tiersTree.getVertex('BATCH'))

export default tiersTree;