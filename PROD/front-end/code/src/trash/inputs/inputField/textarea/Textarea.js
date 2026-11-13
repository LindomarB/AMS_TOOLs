import React from 'react';
import style from './Textarea.module.css';

function Textarea (props) {
    return (
        <textarea 
            {...props}
            className={`${props.className} ${props.resizable? style.resizable : ''}`}
            value={props.value}
        ></textarea>
    );
}

export default Textarea;