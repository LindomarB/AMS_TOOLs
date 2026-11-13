import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from '../buttons/button/Button';
import Text from '../Text/Text';
import Icon from '../icons/icon/Icon';
import style from './Snackbar.module.css';
import colors from '../../generalStyles/colors.module.css';
import bgColors from '../../generalStyles/bgColors.module.css';

/*
    COMPONENT PROPS

    position (optional): the snackbar position in the screen. The values are: 
        'top-left'
        'top-middle'
        'top-rigth'
        'bottom-left'
        'bottom-middle'
        'bottom-rigth' (default)
    autoHideTime (optional): specify the time in ms that the snackbar stay visible before gone. Default is 2000ms
    onStartClose (required): an function to be executed after the defined autoHideTime.
    onEndClose (optional): an function to be executed when the snackbar 'hide' animation ends.
    show (required): a boolean specifying whether the snackbar should be shown or not
    className (optional): a CSS class to be applied in the main component
    style (optional): a CSS style object to be applied in the main component
    message (optional): the message to be displayed in the snackbar
    content (optional): a JSX element to be displayed in the snackbar
    hideCloseButton (optional): a boolean specifying whether the close button should be shown or not. The default value is true
*/

function Snackbar(props) {
    const autoHideTimerId = useRef(null);
    const onEndCloseTimerId = useRef(null);

    const setTimerToHide = () => {
        if(!props.show) return;
        clearTimeout(autoHideTimerId.current);
        clearTimeout(onEndCloseTimerId.current);
        autoHideTimerId.current = setTimeout(hide, props.autoHideTime || 2000);
    }

    const hide = () => {
        autoHideTimerId.current = null;
        props.onStartClose();

        if(props.onEndClose) {
            onEndCloseTimerId.current = setTimeout(props.onEndClose, 400);
        }
    }

    const clearTimer = () => {
        clearTimeout(autoHideTimerId.current);
        autoHideTimerId.current = null;
    }

    if(props.show) setTimerToHide(); 

    let showStyle = style.showFromBottom;

    if(props.position) {
        showStyle = props.position.includes('top')
        ? `${style.showFromTop} ${props.position.includes('middle')? style.middle : ''}` 
        : `${style.showFromBottom} ${props.position.includes('middle')? style.middle : ''}`;
    }

    const colorStyle = `${colors[props.color || 'white']} ${bgColors[props.bgColor || 'darkBg']}`;

    const iconProps = props.icon && typeof props.icon === 'object'
        ? props.icon
        : {
            name: props.icon,
            weight: 200,
            size: 24,
            color: props.color || 'white'
        };

    return createPortal((
        <div 
            className={`${style.Snackbar} ${style[`${props.position}`]} ${props.show? showStyle : ''} ${colorStyle} ${props.className || ''}`}
            style={props.style || {}}
            onMouseEnter={clearTimer}
            onMouseLeave={setTimerToHide}    
        >
            {props.content 
                ? props.content
                : (
                    <div className={style.messageWrapper} >
                        {props.icon &&
                            <Icon {...iconProps}/>
                        }
                        <Text className={`${style.message} ${props.messageClassName || ''}`}>{props.message}</Text>    
                    </div>
                )
            }
            {(props.hideCloseButton || props.hideCloseButton === undefined) && 
                <Button 
                    className={style.closeButton} 
                    type='icon' 
                    icon='close' 
                    iconSize={24} 
                    iconWeight={300} 
                    onClick={hide}
                />
            }
        </div>
    ), document.body);
}

Snackbar.defaultProps = {
    position: 'bottom-rigth'
};

export default Snackbar;