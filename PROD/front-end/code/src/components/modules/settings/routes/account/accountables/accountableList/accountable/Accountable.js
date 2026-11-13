import React from 'react';
import Button from '../../../../../../../Interface/buttons/button/Button';
import PopBoxConfirmation from '../../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';
import ListItem from '../../../../../../../Interface/list/listItem/ListItem';
import UserPhoto from '../../../../../../../Interface/user/userPhoto/UserPhoto';
import capitalize from '../../../../../../../../functions/text/capitalize';
import style from './Accountable.module.css';
import Warning from '../../../../../../../Interface/warning/Warning';
import Text from '../../../../../../../Interface/Text/Text';

function Accountable(props) {
    const icon = (
        <UserPhoto
            user={props.accountable.name} 
            badge={props.accountable.primary? 'directly accountable' : null} 
            // color={props.accountable.settings.profile.avatarColor}
        />
    );

    const changeButton = {
        tooltip: 'Change',
        onClick: props.onChange
    };
    
    const removeButton = {
        tooltip: 'Remove',
        onClickYes: props.onRemove
    };

    if(props.accountable.primary) {
        if(props.changeRequested) {
            changeButton.tooltip = (
                <Warning>
                    <Text>
                        <Text span oneLine size={12}>You have already requested to change this accountable.</Text>
                        <br/>
                        <Text span oneLine size={12}>Please await for the response.</Text>
                    </Text>
                </Warning>
            );

            changeButton.className = style.disabled;
            changeButton.onClick = null;
        }

        if(props.removalRequested) {
            removeButton.tooltip = (
                <Warning>
                    <Text>
                        <Text span oneLine size={12}>You have already requested to remove this accountable.</Text>
                        <br/>
                        <Text span oneLine size={12}>Please await for the response.</Text>
                    </Text>
                </Warning>
            );
            
            removeButton.buttonClassName = style.disabled;
            removeButton.onClickYes = null;
            removeButton.disableButton = true;
        }
    } else {
        changeButton.className = style.hide;
        changeButton.onClick = null;
        changeButton.disabled = true;

        removeButton.buttonClassName = style.hide;
        removeButton.onClickYes = null;
        removeButton.disabled = true;
    }

    const buttons = (
        <>
            {props.onChange &&
                <Button 
                    type='icon'
                    iconSize={20}
                    iconWeight={400}
                    color='grey'
                    icon='change'
                    {...changeButton}
                />
            }
            {props.onRemove &&
                <PopBoxConfirmation
                    iconProps={{
                        name: 'close',
                        weight: 400
                    }}
                    hoverColor='grey'
                    question={`Do you really want to remove this accoutable? You could lost some of your current accesses.`}
                    container={props.popBoxContainer}
                    {...removeButton}
                />
            }
        </>
    );

    return (
        <ListItem
            onClick={props.onClick} 
            icon={icon} 
            title={props.accountable.name} 
            rightText={capitalize(props.accountable.role)}
            rightContent={buttons}
            text={props.accountable.email}
        />
    );
}

export default Accountable;