import React from 'react';
import ListItem from '../../../../../../../Interface/list/listItem/ListItem';
import PopBoxConfirmation from '../../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';
import style from './Application.module.css';
import Text from '../../../../../../../Interface/Text/Text';

function Application(props) {
    const removeButton = (
        <PopBoxConfirmation
            buttonClassName={!props.onRemove && style.hide}
            tooltip='Remove'
            iconProps={{
                name: 'close',
                weight: 400
            }}
            hoverColor='red'
            question={`Do you really want to remove this permission?\nResolutions in progress for this application will be deleted.`}
            onClickYes={props.onRemove}
            container={props.popBoxContainer}
        />
    );

    const text = (
        <Text span className={style.Application}>
            <Text span>
                {props.application.name}
                {props.application.status === 'decommissioned' &&
                    <Text span className={style.decommissioned} weight={600} color='red'>(Decommissioned)</Text>
                }
            </Text>
            <Text span color='grey'>{props.application['support group']}</Text>
        </Text>
    );

    return (
        <ListItem
            onClick={props.onClick} 
            rightContent={removeButton} 
            text={text}
        />
    );
}

export default Application;