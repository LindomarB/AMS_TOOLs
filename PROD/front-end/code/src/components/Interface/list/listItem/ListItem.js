import React from 'react';
import Icon from '../../icons/icon/Icon';
import Text from '../../Text/Text';
import bgColors from '../../../generalStyles/bgColors.module.css';
import style from './ListItem.module.css';

function ListItem(props) {
    const subtitleIconSettings = {
        size: 18,
        filled: true,
        weight: 600,
        ...props.subtitleIconSettings || {}
    };

    return (
        <div className={`${style.ListItem} ${props.className || ''}`}>
            {props.icon &&
                <div className={`${style.icon} ${!props.title? style.oneRow : ''}`}>
                    {props.icon}
                </div>
            }
            {props.title &&
                <Text {...props.titleProps || {}} className={style.title} color='grey' weight={600}>{props.title}</Text>
            }
            {props.rightText && 
                <Text {...props.rightTextProps || {}} className={`${style.rightText} ${!props.title? style.oneRow : ''}`} size={12} color='grey'>{props.rightText}</Text>
            }
            {props.rightContent && 
                <div className={style.rightContent}>
                    {props.rightContent}
                </div>
            }
            {props.subtitle && 
                <div className={`${style.subtitle} ${props.subtitleClassName || ''}`}>
                    {props.subtitleIcon && 
                        <Icon name={props.subtitleIcon} {...subtitleIconSettings}/>
                    }
                    <Text color='grey' size={12}>{props.subtitle}</Text>
                </div>
            }
            {props.text && 
                <Text {...props.textProps || {}} className={`${style.text} ${!props.title? style.firstRow : !props.subtitle? style.secondRow : ''}`}>{props.text}</Text>
            }
            {props.children && 
                <div className={`${style.text} ${!props.title? style.firstRow : !props.subtitle? style.secondRow : ''} ${props.childrenContainerClassName || ''}`}>
                    {props.children}
                </div>
            }
            {props.tag &&
                <div className={`${style.tag} ${bgColors[props.tagColor]} ${props.tagClassName || ''}`}>{props.tag}</div>
            }
        </div>
    );
}

export default ListItem;