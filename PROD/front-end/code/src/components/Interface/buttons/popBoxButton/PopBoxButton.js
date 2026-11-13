import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PopBox from '../../popBox/PopBox';
import Button from '../button/Button';
import style from './PopBoxButton.module.css';

function PopBoxButton (props, ref) {
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        setShow
    }));

    const handleOnClick = () => {
        setShow(curSt => !curSt);
        props.onClick && props.onClick();
    }

    const handleOnBlur = () => {
        setShow(false);
        props.onBlur && props.onBlur();
    }

    return (
        <div className={`${style.PopBoxButton} ${props.className || ''}`}>
            <Button 
                id={props.id} 
                onClick={handleOnClick}
                {...props.button}
            >{props.button.text}</Button>
            <PopBox
                parentId={props.id}
                show={show}
                onBlur={handleOnBlur}
                {...props.popBox}
            >
                {props.children}
            </PopBox>
        </div>
    );
}

export default forwardRef(PopBoxButton);