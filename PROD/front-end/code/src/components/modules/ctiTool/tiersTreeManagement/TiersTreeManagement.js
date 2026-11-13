import React from "react";
import ModuleHomePage from "../../../Interface/moduleHomePage/ModuleHomePage";
import TiersTreeStatus from "./tiersTreeStatus/TiersTreeStatus";

function TiersTreeManagement(props) {
    return (
        <ModuleHomePage module='cti tool' submodule='tiers tree management' bannerStyle={{backgroundPosition: 'right 0%'}}>
            <TiersTreeStatus />
        </ModuleHomePage>
    );
}

export default TiersTreeManagement;