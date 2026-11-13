import React from 'react';
import { createPortal } from 'react-dom';
import style from './Backdrop.module.css';

function Backdrop(props) {
    const handleOnClick = () => {
        props.onClick && props.onClick();
    }

    if(!props.children) return null;

    return createPortal(
        <div className={style.Backdrop} onClick={handleOnClick}>
            {props.children}
        </div>
    , document.body);
}

export default Backdrop;