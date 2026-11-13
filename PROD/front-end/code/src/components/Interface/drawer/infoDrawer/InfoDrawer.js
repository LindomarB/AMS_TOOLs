import React, { useEffect, useRef, useState } from 'react';
import FadeTransition from '../../animations/fadeTransition/FadeTransition';
import Button from '../../buttons/button/Button';
import Drawer from '../Drawer';
import Header from '../../header/Header';
import style from './InfoDrawer.module.css';

function InfoDrawer(props) {
    const [open, setOpen] = useState(false);
    const [children, setChildren] = useState(null);
    const [elementKey, setElementKey] = useState(null);
    const hideTimer = useRef(null);

    useEffect(() => {
        if(props.children) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
            setChildren(props.children);
            setElementKey(props.elementKey);
            setOpen(true);
            props.onOpen && props.onOpen();
        } else if(!hideTimer.current) {
            hide();
        }
    }, [props.children, props.elementKey]);

    const hide = () => {
        setOpen(false);
        props.onClose && props.onClose();

        hideTimer.current = setTimeout(() => {
            setChildren(null);
            hideTimer.current = null;
        }, 500);
    }

    return (
        <Drawer 
            className={`${style.InfoDrawer} ${props.className || ''}`} 
            style={props.style || {}} 
            open={open}
        >
            {props.header 
                ? (
                    <Header rule {...props.header}>
                        {props.header.children}
                        <Button 
                            type='icon' 
                            icon='close' 
                            color='lightGrey' 
                            iconWeight={300} 
                            onClick={hide}
                        />
                    </Header>
                ) : (
                    <Button 
                        className={style.closeButton}
                        type='icon' 
                        icon='close' 
                        color='lightGrey' 
                        iconWeight={300} 
                        onClick={hide}
                    />
                )
                
            }
            <FadeTransition switchTransition currentElementKey={elementKey}>
                {children}
            </FadeTransition>
        </Drawer>
    );
}

export default InfoDrawer;