import React from 'react';
import Header from '../../../../header/Header';
import style from './DataHeader.module.css';

function DataHeader(props) {
    return (
        <Header
            key={`${props.text}-header`}
            className={style.DataHeader}
            // rule 
            icon={props.icon} 
            iconProps={props.iconProps || {filled: true}}
            color='icon' 
            text={props.text}
        />
    );
}

export default DataHeader;