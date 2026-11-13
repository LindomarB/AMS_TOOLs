import React from 'react';
import ListItem from '../../../../../../Interface/list/listItem/ListItem';
import PopBoxConfirmation from '../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';
import Text from '../../../../../../Interface/Text/Text';

function ApplicationRequest(props) {
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

    const text = (
        <Text span style={{display: 'flex', alignItems: 'baseline'}}>
            <Text span style={{width: '100%'}}>{props.request.data.application.name}</Text>
            <Text span color='grey' style={{width: '100%'}}>{props.request.data.application['support group']}</Text>
        </Text>
    );

    return (
        <ListItem
            onClick={props.onClick}
            rightText={new Date(props.request.meta.createdOn).toLocaleDateString()} 
            rightContent={props.onCancel? removeButton : null} 
            text={text}
        />
    );
}

export default ApplicationRequest;