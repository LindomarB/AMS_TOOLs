import React from "react";
import style from './ButtonsContainer.module.css';

function ButtonsContainer(props) {
    return (
        <div className={`${style.ButtonsContainer} ${props.stretchButtons? style.stretchButtons : ''} ${props.className || ''}`} style={props.style || {}}>
            {props.children}
        </div>
    );
}

export default ButtonsContainer;