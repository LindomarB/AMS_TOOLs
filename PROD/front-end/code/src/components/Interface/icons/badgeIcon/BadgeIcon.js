import React from 'react';
import Icon from '../icon/Icon';
import style from './BadgeIcon.module.css';
import bgColors from '../../../generalStyles/bgColors.module.css';
import Tooltip from '../../tooltip/Tooltip';
import capitalize from '../../../../functions/text/capitalize';
import iconSettings from './iconSettings';

function BadgeIcon(props) {
    const defaultIconProps = {
        size: 18,
        weight: 300,
        filled: true
    };
    
    const icon = iconSettings[props.name];

    if(!icon) return null;

    return (
        <Tooltip 
            content={capitalize(props.name)} 
            appearDelay={500} 
            hideDelay={0} 
            disabled={props.disableTooltip}
        >
            <div className={`${style.BadgeIcon} ${icon.bgColor && bgColors[icon.bgColor]} ${props.className || ''}`}>
                <Icon 
                    name={props.name} 
                    color='white' 
                    {...defaultIconProps}
                    {...icon}
                    {...props.iconProps}
                />
            </div>
        </Tooltip>
    );
}

export default BadgeIcon;