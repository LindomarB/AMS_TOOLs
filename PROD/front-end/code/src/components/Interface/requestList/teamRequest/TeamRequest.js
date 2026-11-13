import React from 'react';
import ListItem from '../../list/listItem/ListItem';
import UserPhoto from '../../user/userPhoto/UserPhoto';
import getRequest from '../getRequest/getRequest';

function TeamRequest(props) {
    const icon = <UserPhoto 
        user={props.request.requester.name} 
        badge={props.request.status} 
        color={props.avatarColor}
    />;

    const requestData = getRequest(props.request);

    if(!requestData) return null;

    return (
        <ListItem 
            onClick={props.onClick} 
            icon={icon} 
            title={props.request.requester.name} 
            rightText={new Date(props.request.meta.createdOn).toLocaleDateString()} 
            subtitleIcon={requestData.icon} 
            subtitle={requestData.name} 
            text={requestData.text}
            active={props.active}
        />
    );
}

export default TeamRequest;