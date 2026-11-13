import React from 'react';
import PopBoxConfirmation from '../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';
import Icon from '../../../../../../Interface/icons/icon/Icon';
import ListItem from '../../../../../../Interface/list/listItem/ListItem';
import capitalize from '../../../../../../../functions/text/capitalize';

function AccessRequest(props) {
    const icon = <Icon name={props.request.data.access} size={24} color='blue' filled style={{width: '2rem'}}/>
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
            icon={icon} 
            rightText={new Date(props.request.meta.createdOn).toLocaleDateString()}
            rightContent={props.onCancel? removeButton : null} 
            text={capitalize(props.request.data.access)}
        />
    );
}

export default AccessRequest;