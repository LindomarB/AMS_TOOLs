import React, { useContext, useEffect } from "react";
import TiersTreeManagement from "../TiersTreeManagement";
import FetcherContext from "../../../../context/fetcherContext/FetcherContext";
import { useNavigate } from "react-router-dom";
import modules from "../../../../../data/app/modules";

function TiersExport(props) {
    const fetcher = useContext(FetcherContext);
    const navigate = useNavigate();

    useEffect(() => {
        exportTiers();
    }, []);

    const exportTiers = async () => {
        await fetcher.exportTiers({}, {fileName: `CTI Tool Tiers ${new Date().toLocaleDateString()}`});
        navigate(modules('cti tool', 'tiers tree management').path);
    }

    return (
        <TiersTreeManagement/>
    );
}

export default TiersExport;