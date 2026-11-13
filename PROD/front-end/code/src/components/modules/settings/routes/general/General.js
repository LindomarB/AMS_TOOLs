import React from "react";
import Language from "./language/Language";
import QuickAccess from "./quickAccess/QuickAccess";

function General(props) {
    return (
        <>
            <Language />
            <QuickAccess />
        </>
    );
}

export default General;