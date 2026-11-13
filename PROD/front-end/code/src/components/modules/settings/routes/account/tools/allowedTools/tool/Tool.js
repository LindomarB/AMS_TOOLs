import React from 'react';
import capitalize from '../../../../../../../../functions/text/capitalize';
import Icon from '../../../../../../../Interface/icons/icon/Icon';
import ListItem from '../../../../../../../Interface/list/listItem/ListItem';
import PopBoxConfirmation from '../../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';

function Tool(props) {
    const icon = <Icon name={props.access} size={24} color='blue' filled style={{width: '2rem'}}/>
    const removeButton = (
        <PopBoxConfirmation
            tooltip='Remove'
            iconProps={{
                name: 'close',
                weight: 400
            }}
            hoverColor='red'
            question={`Do you really want to remove this access?`}
            onClickYes={props.onRemove}
            container={props.popBoxContainer}
        />
    );

    return (
        <ListItem 
            onClick={props.onClick} 
            icon={icon} 
            rightContent={props.isDefaultAccess? null : removeButton} 
            text={capitalize(props.access)}
        />
    );
}

export default Tool;