import React from 'react';
import PopBoxConfirmation from '../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';
import ListItem from '../../../../../../Interface/list/listItem/ListItem';

function SupportGroupRequest(props) {
    const removeButton = (
        <PopBoxConfirmation
            tooltip='Remove'
            iconProps={{
                name: 'close',
                weight: 400
            }}
            hoverColor='red'
            question='Do you really want to cancel this request?'
            onClickYes={props.onCancel}
            container={props.popBoxContainer}
        />
    );

    return (
        <ListItem
            onClick={props.onClick}
            rightText={new Date(props.request.meta.createdOn).toLocaleDateString()} 
            rightContent={props.onCancel? removeButton : null} 
            text={props.request.data.supportGroup}
        />
    );
}

export default SupportGroupRequest;