import React from 'react';
import Icon from '../icons/icon/Icon';
import Text from '../Text/Text';
import stampData from './stampData';
import style from './Stamp.module.css';

function Stamp(props) {
    const stamp = stampData[props.type]

    if(!stamp) return null;

    return (
        <Text className={style.Stamp}>
            <Icon size={18} weight={300} {...stamp.icon}/>
            <Text span weight={500} color={stamp.icon.color}>{stamp.text}</Text>
        </Text>
    );
}

export default Stamp;