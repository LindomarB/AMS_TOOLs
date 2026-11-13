import React from 'react';
import 'material-symbols';
import iconNames from './iconNames';
import style from './Icon.module.css';
import colors from '../../../generalStyles/colors.module.css';
import BorderedIcon from './borderedIcon/BorderedIcon';
import Tooltip from '../../tooltip/Tooltip';
import capitalize from '../../../../functions/text/capitalize';

function Icon(props) {
    if(props.border) return <BorderedIcon {...props} />

    const size = props.size? {fontSize: `${props.size / 16}rem`} : {};
    const settings = {
        fontVariationSettings: `'FILL' ${props.filled? 1 : 0}, 'wght' ${props.weight || 200}`
    };

    const icon = (
        <span 
            className={`material-symbols-${props.type} ${style.Icon} ${colors[props.color]} ${props.className || ''}`}
            style={{...size, ...settings, ...props.style || {}}}
            translate='no'
        >
            {iconNames[props.name] || props.name}
        </span>
    );

    if(props.tooltip) {
        return (
            <Tooltip
                content={props.tooltip === true? capitalize(props.name) : props.tooltip}
                appearDelay={500}
                hideDelay={0}
            >
                {icon}
            </Tooltip>
        );
    }

    return icon;
}

Icon.defaultProps = {
    color: 'icon',
    type: 'outlined'
}

export default Icon;