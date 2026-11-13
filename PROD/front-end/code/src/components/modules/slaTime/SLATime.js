import React, { useContext } from "react";
import modules from "../../../data/app/modules";
import AppContext from "../../context/appContext/AppContext";
import Banner from "../../Interface/banner/Banner";
import Icon from "../../Interface/icons/icon/Icon";
import Page from "../../Interface/page/Page";
import Text from "../../Interface/Text/Text";
import SLA from "./sla/SLA";
import style from './SLATime.module.css';

function SLATime(props) {
    const lang = useContext(AppContext).currentLanguage;

    const module = modules('sla time');

    const bannerSubtitle = 'Each priority has your own SLA (Service Level Agreement) time for response and resolution. Meet this time limit characterizes the service as successful.';

    const legendIconProps = {
        className: style.infoIcon,
        size: 18 ,
        weight: 300,
        filled: true
    };


    return (
        <Page>
            <Banner title={module.label[lang]} subtitle={bannerSubtitle} image={`/images/banners/${module.relativePath}.svg`}/>
            <SLA type='incident' description='Incidents comprise applications failures that disrupt processes and operations.'/>
            <SLA type='service request' description='Service requests comprise users requests for information or data and actions that have no impact on processes and operations.'/>
            <div className={style.legendContainer}>
                <div className={style.legend}>
                    <Icon {...legendIconProps} name='support_agent'/>
                    <Text color='grey' size={12} >Response Time</Text>
                </div>
                <div className={style.legend}>
                    <Icon {...legendIconProps} name='resolution'/>
                    <Text color='grey' size={12} >Resolution Time</Text>
                </div>
                <div className={style.legend}>
                    <Icon {...legendIconProps} name='target'/>
                    <Text color='grey' size={12} >Target</Text>
                </div>
            </div>
        </Page>
    );
}

export default SLATime;