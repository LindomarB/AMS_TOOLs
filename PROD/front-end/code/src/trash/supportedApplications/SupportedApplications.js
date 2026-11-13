import React, { useContext } from "react";
import {useNavigate} from "react-router-dom";
import supportedApplicationsData from "../supportedApplicationsData";
import AppContext from "../../components/context/appContext/AppContext";
import Table from "../../components/Interface/table/Table";
import style from "../../generalStyles/tablePage.module.css";

function SupportedApplications(props) {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();

    const handleOnClickRow = (id) => {
        navigate(`/supported-applications/application-details/${id}`);
    }

    return (
        <Table 
            className={style.table}
            name="supportedApplications"
            title={'Supported Applications'}
            data={supportedApplicationsData}
            columns={[
                "region",
                "application",
                "group",
                "country",
                "businessUnity",
                "technology",
                // "interfaces",
                "remedyGroup",
                "coverage",
                "sdm",
                "appLead",
                "trackLead",
                // "shift"
            ]}
            filters={[
                "region",
                "group",
                "country",
                "businessUnity",
                "technology",
                // "interfaces",
                "remedyGroup",
                "coverage",
                "sdm",
                "appLead",
                "trackLead",
                // "shift"
            ]}   
            onClickRow={handleOnClickRow}         
        />
    );
}

export default SupportedApplications;