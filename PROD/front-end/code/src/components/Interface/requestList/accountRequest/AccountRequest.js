import React from 'react';
import ListItem from '../../list/listItem/ListItem';
import UserPhoto from '../../user/userPhoto/UserPhoto';
import capitalize from '../../../../functions/text/capitalize';

function AccountRequest(props) {
    const profile = props.request.data.profile;

    const icon = <UserPhoto 
        user={profile.name} 
        badge={props.request.status} 
        style={{backgroundColor: 'transparent', border: '2px solid #707070'}} 
        textStyle={{color: '#707070'}}
    />

    return (
        <ListItem 
            onClick={props.onClick} 
            icon={icon} 
            title={profile.name} 
            rightText={new Date(props.request.meta.createdOn).toLocaleDateString()} 
            subtitleIcon='role' 
            subtitle={capitalize(profile.role)} 
            text={profile.email}
            active={props.active}
        />
    );
}

export default AccountRequest;