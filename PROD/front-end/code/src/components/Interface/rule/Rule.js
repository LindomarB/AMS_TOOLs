import React from 'react';
import colors from '../../generalStyles/bgColors.module.css';
import style from './Rule.module.css';

function Rule(props) {
    return (
        <div className={`${style.Rule} ${props.vertical? style.vertical : ''} ${colors[props.color || 'border']} ${props.className || ''}`}></div>
    );
}

export default Rule;