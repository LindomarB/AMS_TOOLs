import React from 'react';
import Text from '../Text/Text';
import Icon from '../icons/icon/Icon';
import style from './Legend.module.css';

/* 
    COMPONENT PROPS 

    legends (required): an array of objects in the format {icon: {iconProps}, label} defining the legends.
*/

function Legend(props) {
    const legends = props.legends.map(legend => (
        <div key={legend.label} className={style.container}>
            <Icon 
                {...legend.icon}
                size={18} 
            />
            <Text color='black' size={12} weight={500}>
                {legend.label}
            </Text>
        </div>
    ));

    return (
        <div className={`${style.Legend} ${props.className || ''}`}>
            {legends}
        </div>
    );
}

export default Legend;