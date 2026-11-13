import React from 'react';
import Icon from '../Icon';
import style from './BorderedIcon.module.css';
import colors from '../../../../generalStyles/colors.module.css';

function BorderedIcon(props) {
    const padding = (props.padding === 0 || props.padding)? {padding: `${props.padding / 16}rem`} : {};
    const size = props.size
        ? {
            width: `${props.size / 16}rem`,
            height: `${props.size / 16}rem`
        } 
        : {};
    const iconSize = (props.size || 36) - (props.padding === 0? 0 : props.padding || 6 * 2);

    return (
        <div className={`${style.BorderedIcon} ${colors[props.color]} ${props.className || ''}`} style={{...padding, ...size, ...props.style || {}}}>
            {props.backgroundClassName && 
                <div className={`${style.background} ${props.backgroundClassName}`}></div>
            }
            <div className={`${style.border} ${props.invertColor? style.invertColor : ''} ${props.borderClassName || ''}`}></div>
            <Icon {...props} border={false} className={`${style.icon} ${props.iconClassName || ''}`} style={props.iconStyle} color={props.invertColor? 'white' : props.color} size={iconSize}/>
        </div>
    );
}

export default BorderedIcon;