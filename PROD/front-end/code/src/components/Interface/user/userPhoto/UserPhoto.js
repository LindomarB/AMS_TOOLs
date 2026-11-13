import React from 'react';
import BadgeIcon from '../../icons/badgeIcon/BadgeIcon';
import style from './UserPhoto.module.css';

function UserPhoto(props) {
    const userName = props.user.split(' ');
    const firstName = userName[0];
    const lastName = userName[userName.length -1];
    const bgColor = {}
    if(props.color) {
        bgColor.backgroundColor = props.color;
        bgColor.color = props.color;
    }

    return (
        <div className={`${style.UserPhoto} ${props.className || ''}`} style={{...bgColor, ...props.style || {}}}>
            <p className={props.textClassName || ''} style={props.textStyle || {}} translate='no'>
                {firstName.slice(0, 1)}{lastName.slice(0, 1)}
            </p>
            {props.badge && 
                <BadgeIcon className={style.badge} name={props.badge}/>
            }
        </div>
    );
}

export default UserPhoto;