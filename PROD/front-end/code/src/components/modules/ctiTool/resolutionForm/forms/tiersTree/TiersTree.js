import { useContext, useEffect, useState } from "react";
import Graph from "../../../../../../classes/Graph";
import FetcherContext from "../../../../../context/fetcherContext/FetcherContext";

function useTiersTree(props) {
    const [tiersTree, setTiersTree] = useState();
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await fetcher.getTiers();

        if(res.ok) {
            const graph = new Graph(res.data.vertices);

            res.data.connections.forEach(connection => {
                const {origin, destinations, rules} = connection;
                graph.addConnections(origin, destinations, rules);
            });

            setTiersTree(graph);
        }
    }

    return {
        tiersTree,
        updateTiersTree: getData
    };
}

export default useTiersTree;