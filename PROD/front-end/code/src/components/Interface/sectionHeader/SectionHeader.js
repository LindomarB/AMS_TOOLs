import React from 'react';
import Icon from '../icons/icon/Icon';
import style from './SectionHeader.module.css';

function SectionHeader(props) {
    return (
        <div className={`${style.SectionHeader} ${props.className || ''}`}>
            <div className={style.title}>
                {props.icon && 
                    <Icon {...props.icon} className={`${style.icon} ${props.icon.className || ''}`}/>
                }
                <h2>{props.title || props.icon.label}</h2>
            </div>
            {props.rightContent}
        </div>
    );
}

export default SectionHeader;