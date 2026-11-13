import React from 'react';
import UserPhoto from '../../user/userPhoto/UserPhoto';
import ListItem from '../../list/listItem/ListItem';
import capitalize from '../../../../functions/text/capitalize';

function User(props) {
    const name = props.user.name || props.user.profile.name;
    const status = props.user.status;
    const avatarColor = props.user.avatarColor || props.user.settings.profile.avatarColor;
    const role = props.user.role || props.user.profile.role;
    const email = props.user.email || props.user.profile.email;

    const icon = (
        <UserPhoto
            user={name} 
            badge={status} 
            color={avatarColor}
        />
    );

    return (
        <ListItem
            onClick={props.onClick} 
            icon={icon} 
            title={name} 
            rightText={capitalize(role)}
            // subtitleIcon='badge' 
            // subtitle={cargillId} 
            text={email}
        />
    );
}

export default User;