import React from "react";
import ModuleHomePage from "../../Interface/moduleHomePage/ModuleHomePage";
import CTIUserSettings from "./home/CTIUserSettings/CTIUserSettings";

function CTITool(props) {
    return (
        <ModuleHomePage module='cti tool'>
                <CTIUserSettings />
        </ModuleHomePage>
    );
}

export default CTITool;