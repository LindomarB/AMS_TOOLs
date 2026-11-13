import React from 'react';
import style from './TextIcon.module.css';

function TextIcon(props) {
    return (
        <span 
            className={`${style.TextIcon} ${props.className || ''}`}
            style={props.style || {}}
        >
            {props.text}
        </span>
    );
}

export default TextIcon;