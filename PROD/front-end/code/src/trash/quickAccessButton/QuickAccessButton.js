import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../icons/icon/Icon';
import Tooltip from '../../tooltip/Tooltip';
import style from './QuickAccessButton.module.css';

function QuickAccessButton(props) {
    const buttonStyle = props.color
        ? {
            color: props.color,
            borderColor: `${props.color}80`
        }
        : {};

    const button = (
        <Tooltip
            content={props.children}
            position='top'
            hideDelay={0}
        >
            <button 
                className={`${style.QuickAccessButton} ${props.className || ''}`}
                style={buttonStyle}
                onClick={props.onClick || null}
            >
                <Icon {...props.icon} className={style.icon}/>
                <p>{props.children}</p>
            </button>
        </Tooltip>
    );

    if(props.path) {
        return (
            <Link to={props.path}>
                {button}
            </Link>
        );
    }

    return button;
}

export default QuickAccessButton;