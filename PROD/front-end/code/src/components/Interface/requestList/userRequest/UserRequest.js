import React from 'react';
import statusData from '../../../../data/app/statusData';
import Icon from '../../icons/icon/Icon';
import ListItem from '../../list/listItem/ListItem';
import getRequest from '../getRequest/getRequest';

function UserRequest(props) {
    const status = statusData[props.request.status];
    const request = getRequest(props.request);
    const icon = <Icon name={request.icon} size={36} filled weight={props.type === 'role change' && 600}/>

    return (
        <ListItem 
            onClick={props.onClick} 
            icon={icon} 
            title={request.name} 
            rightText={new Date(props.request.meta.createdOn).toLocaleDateString()} 
            subtitleIcon={status.icon} 
            subtitleIconSettings={{color: status.color, filled: false}}
            subtitle={status.name} 
            text={request.text}
            active={props.active}
        />
    );
}

export default UserRequest;