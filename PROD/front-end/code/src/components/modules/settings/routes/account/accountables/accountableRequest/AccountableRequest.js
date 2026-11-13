import React from 'react';
import PopBoxConfirmation from '../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';
import Icon from '../../../../../../Interface/icons/icon/Icon';
import ListItem from '../../../../../../Interface/list/listItem/ListItem';
import capitalize from '../../../../../../../functions/text/capitalize';
import Text from '../../../../../../Interface/Text/Text';
import style from './AccountableRequest.module.css';

function AccountableRequest(props) {
    let request = null;

    switch(props.request.type) {
        case 'new accountable': 
            request = {
                icon: 'new accountable',
                text: <Text span className={style.text}>{props.request.data.newAccountable.name}</Text>,
                role: props.request.data.newAccountable.role
            }
        break;
        case 'accountable change': 
            request = {
                icon: 'accountable change',
                tooltip: 'Accountable change',
                text: (
                    <Text span className={`${style.text} ${style.accountableChange}`}>
                        {props.request.data.currentAccountable.name}
                        <Icon name='trending_flat' color='grey'/>
                        {props.request.data.newAccountable.name}
                    </Text>
                ),
                role: props.request.data.newAccountable.role
            }
        break;
        case 'accountable removal': 
            request = {
                icon: 'accountable removal',
                text: <Text span className={style.text}>{props.request.data.accountable.name}</Text>,
                role: props.request.data.accountable.role
            }
        break;
        default:
            request = null;
    }

    if(!request) return null;

    const icon = (
        <Icon 
            className={style.icon}
            name={request.icon} 
            size={24} 
            color='blue' 
            filled 
            tooltip={request.tooltip || true}
        />
    );

    const text = (
        <Text span className={style.textWrapper}>
            {request.text}
            <Text span color='grey' className={style.text}>{capitalize(request.role)}</Text>
        </Text>
    );

    const removeButton = (
        <PopBoxConfirmation
            tooltip='Cancel'
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
            text={text}
        />
    );
}

export default AccountableRequest;