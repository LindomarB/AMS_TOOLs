import React, { useRef, useEffect } from 'react';
import style from './NavbarButton.module.css';
import Tooltip from '../../tooltip/Tooltip';
import Icon from '../../icons/icon/Icon';

function NavbarButton(props) {
    const button = useRef();

    useEffect(() => {
        if(!props.dontMoveSelectBar && props.active) {
            const center = button.current.offsetTop + (button.current.offsetHeight / 2);
            props.setSelectBarPosition(center);
        }
    }, [props.active, props.dontMoveSelectBar, props.showLabel]);

    const handleOnMouseEnter = () => {
        if(props.submenuItems) {
            props.setSubmenu({
                show: true,
                items: props.submenuItems,
                origin: props.label
            });
        } else {
            props.setSubmenu({
                show: false,
                items: null,
                origin: null
            });
        }
    }

    const handleOnClick = () => {
        props.onClick && props.onClick();
        props.closeSubmenu && props.closeSubmenu();
    }

    let icon = null;

    if(props.icon) {
        if(props.icon.default && props.icon.active) {
            icon = (
                <div className={style.iconWrapper}>
                    <Icon {...props.icon} fileName={props.icon.default.fileName} className={style.iconDefault}/>
                    <Icon {...props.icon} fileName={props.icon.active.fileName} className={style.iconActive}/>
                </div>
            );
        } else {
            icon = (
                <div className={style.iconWrapper}>
                    <Icon {...props.icon} className={style.icon}/>
                </div>
            );
        }
    } else if(props.defaultIcon && props.activeIcon) {
        icon = (
            <div className={style.iconWrapper}>
                <Icon {...props.defaultIcon} className={style.iconDefault}/>
                <Icon {...props.activeIcon} className={style.iconActive}/>
            </div>
        );
    }
    
    return (
        <Tooltip
            position='right'
            content={props.tooltip || props.label}
            hideDelay={0}
            disabled={props.disableTooltip}
            hideOnClick
        >
           <button 
                ref={button}
                className={`${style.NavbarButton} ${props.className || ''} ${props.showLabel? style.showLabel : ''} ${props.active? style.active : ''} ${props.forceHover && !props.active? style.forceHover : ''}`} 
                onClick={handleOnClick} 
                onBlur={props.onBlur || null}
                onFocus={props.onFocus || null}
                onMouseEnter={handleOnMouseEnter}
            >
                {icon}
                {props.showLabel && 
                    <p className={style.label}>{props.label}</p>
                }
                {props.notification && 
                    <div className={style.notification}></div>
                }
            </button>
        </Tooltip>
    );
}

export default NavbarButton;