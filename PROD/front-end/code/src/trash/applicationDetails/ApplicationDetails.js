import React, { useContext } from "react";
import { useParams } from "react-router-dom"
import supportedApplicationsData from "../../../data/supportedApplicationsData";
import AppContext from "../../context/appContext/AppContext.js";
import Page from "../../Interface/page/Page.js";
import Application from "../../app/supportedApplications/application/Application";
import style from "./ApplicationDetails.module.css";

function ApplicationDetails(props) {
    const appCtx = useContext(AppContext);
    const params = useParams();

    const appData = supportedApplicationsData.values.find(app => app._id === params.id);
    const fields = supportedApplicationsData.fields;
    
    const data = {};

    for(let field in fields) {
        data[field] = {
            title: fields[field],
            content: appData[field]
        };
    }

    return (
        <Page className={style.page} title={appCtx.lexicon.theme.navbar.supportedApplications}>
            <Application
                title={data.application.content}
                fields={data}
                fieldsOrder={[
                    ["description"],
                    ["region", "country", "businessUnity"],
                    ["group", "remedyGroup"],
                    ["technology", "interfaces"],
                    ["coverage", "shifts"],
                    ["sdm", "appLead", "trackLead"],
                    ["comments"],
                ]}
                backPath="/supported-applications"
            />
        </Page>
    );
}

export default ApplicationDetails;