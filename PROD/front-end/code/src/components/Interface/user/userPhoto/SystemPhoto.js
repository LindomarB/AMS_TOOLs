import React from 'react';
import BadgeIcon from '../../icons/badgeIcon/BadgeIcon';
import Icon from '../../icons/icon/Icon';
import style from './UserPhoto.module.css';

function SystemPhoto(props) {
    return (
        <div className={`${style.UserPhoto} ${style.system} ${props.className || ''}`} style={{...props.style || {}}}>
            <Icon name={props.type} color='white' size={28} filled/>
            {props.badge && 
                <BadgeIcon className={style.badge} name={props.badge}/>
            }
        </div>
    );
}

export default SystemPhoto;