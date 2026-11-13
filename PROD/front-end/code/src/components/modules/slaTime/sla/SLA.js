import React, { useContext } from "react";
import AppContext from "../../../context/appContext/AppContext";
import Text from "../../../Interface/Text/Text";
import Card from "../../../Interface/card/Card";
import slaData from "../slaData";
import SLAInfo from "./slaInfo/SLAInfo";
import Rule from "../../../Interface/rule/Rule";
import Header from "../../../Interface/header/Header";
import style from './SLA.module.css';

function SLA(props) {
    const lang = useContext(AppContext).currentLanguage;

    const slaInfo = [];

    for(let priority in slaData[props.type]) {
        const sla = slaData[props.type][priority];

        slaInfo.push(
            <SLAInfo
                key={priority}
                type={props.type}
                priority={priority}
                responseTime={sla.response && `${sla.response.time} ${sla.response.unity}`}
                resolutionTime={sla.resolution && `${sla.resolution.time} ${sla.resolution.unity}`}
                target={sla.target}
            />
        , <Rule key={`rule-${priority}`} vertical />);
    }

    slaInfo.pop();

    return (
        <div className={style.sla}>
            <Header text={props.type}/>
            <Text className={style.slaDescription} color='grey'>{props.description}</Text>
            <Card className={style.card} shadow>
                {slaInfo}
            </Card>
        </div>
    );
}

export default SLA;