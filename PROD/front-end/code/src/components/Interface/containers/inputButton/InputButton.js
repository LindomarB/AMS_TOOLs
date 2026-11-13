import React from "react";
import style from './InputButton.module.css';

function InputButton(props) {
    return (
        <div className={`${style.InputButton} ${props.className || ''}`} style={props.style || {}}>
            {props.children}
        </div>
    );
}

export default InputButton;