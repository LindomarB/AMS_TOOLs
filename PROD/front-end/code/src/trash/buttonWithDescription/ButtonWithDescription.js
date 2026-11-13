import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Interface/icons/icon/Icon';
import Tooltip from '../../components/Interface/tooltip/Tooltip';
import style from './ButtonWithDescription.module.css';

function ButtonWithDescription(props) {
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
            disabled={props.disableTooltip}
        >
            <button 
                className={`${style.ButtonWithDescription} ${props.className || ''}`}
                style={buttonStyle}
                onClick={props.onClick || null}
            >
                <div className={style.title}>
                    <Icon {...props.icon} className={style.icon}/>
                    <p>{props.label}</p>
                </div>
                <p className={style.description}>{props.description}</p>
                {!!props.notifications &&
                    <p className={style.notifications}>{props.notifications}</p>
                }
            </button>
        </Tooltip>
    );

    if(props.path) {
        return (
            <Link className={style.link} to={props.path}>
                {button}
            </Link>
        );
    }

    return button;
}

export default ButtonWithDescription;