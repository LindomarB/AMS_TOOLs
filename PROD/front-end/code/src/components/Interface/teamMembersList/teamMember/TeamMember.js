import React from 'react';
import ListItem from '../../list/listItem/ListItem';
import UserPhoto from '../../user/userPhoto/UserPhoto';

function TeamMember(props) {
    const icon = (
        <UserPhoto 
            user={props.member.profile.name} 
            badge={props.member.status} 
            color={props.member.settings.profile.avatarColor}
        />
    );

    return (
        <ListItem 
            onClick={props.onClick} 
            icon={icon} 
            title={props.member.profile.name} 
            subtitleIcon='badge' 
            subtitle={props.member.profile.cargillId} 
            text={props.member.profile.email}
        />
    );
}

export default TeamMember;