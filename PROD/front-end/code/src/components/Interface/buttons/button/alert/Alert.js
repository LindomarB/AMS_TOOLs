import React from "react";
import Icon from "../../../icons/icon/Icon";
import Text from "../../../Text/Text";
import style from './Alert.module.css';

function Alert(props) {
    let content = <Icon name='exclamation' filled size={14} weight={500}/>;

    if(typeof props.children === 'number') {
        const max = props.max || 99;
        const maxText = props.max? `+${max}` : 99;
        const value = props.children > max? maxText : props.children;

        content = (
            <Text className={style.number} span size={props.children > 9? 8 : 10}>
                {value}
            </Text>
        );
    }

    return (
        <div className={`${style.alert} ${props.className || ''}`}>
            {content}
        </div>
    );
}

export default Alert;