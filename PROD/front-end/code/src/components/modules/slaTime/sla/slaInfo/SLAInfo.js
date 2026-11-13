import React, { useContext } from "react";
import AppContext from "../../../../context/appContext/AppContext";
import Text from "../../../../Interface/Text/Text";
import Icon from "../../../../Interface/icons/icon/Icon";
import capitalize from "../../../../../functions/text/capitalize";
import style from './SLAInfo.module.css';

function SLAInfo(props) {
    const lang = useContext(AppContext).currentLanguage;

    const priorityColors = {
        critical: '#A1343c',
        high: '#E66c37',
        medium: '#D9b300',
        low: '#0d6abf',
        extended: '#6b007b'
    };

    const infoIconProps = {
        className: style.infoIcon,
        size: 22 ,
        weight: 300,
        filled: true,
        tooltip: true
    };

    const infoTextProps = {
        className: style.infoText,
        color: 'grey'
    };

    return (
        <div className={style.SLAInfo}>
            <Icon className={style.timerIcon} name='sla time' size={36} weight={400} style={{color: priorityColors[props.priority]}}/>
            <div>
                <Text color='grey' size={12}>Priority</Text>
                <Text className={style.priority} size={16} weight={600}>{capitalize(props.priority)}</Text>
            </div>
            {!props.responseTime
                ? (
                    <>
                        <Icon {...infoIconProps} color='grey' filled={false} name='timer_off'/>
                        <Text {...infoTextProps} color='grey'>Do not have</Text>
                    </>
                )
                : (
                    <>
                        <Icon {...infoIconProps} name='support_agent' tooltip='Response time'/>
                        <Text {...infoTextProps}>{props.responseTime}</Text>
                        <Icon {...infoIconProps} name='resolution' tooltip='Resolution time'/>
                        <Text {...infoTextProps}>{props.resolutionTime}</Text>
                        <Icon {...infoIconProps} name='target'/>
                        <Text {...infoTextProps}>{props.target}</Text>
                    </>
                )
            }
        </div>
    );
}

export default SLAInfo;