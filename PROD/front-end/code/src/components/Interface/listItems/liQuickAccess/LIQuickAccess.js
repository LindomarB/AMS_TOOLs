import React from 'react';
import capitalize from '../../../../functions/text/capitalize';
import Button from '../../buttons/button/Button';
import Icon from '../../icons/icon/Icon';
import ListItem from '../../list/listItem/ListItem';

function LIQuickAccess(props) {
    const icon = <Icon name={props.module} size={24} color='blue' filled style={{width: '2rem'}}/>
    const rightContent = (
        <>
            <Button 
                icon='straight'  
                iconSize={18} 
                iconStyle={{transform: 'rotate(180deg)'}}
                iconWeight={400}
                type='icon' 
                onClick={props.onMoveDown}
            />
            <Button 
                icon='straight' 
                iconSize={18} 
                iconWeight={400}
                type='icon' 
                onClick={props.onMoveUp}
            />
            <Button
                icon='close'
                iconPosition='right'
                type='text'
                color='red'
                onClick={props.onRemove}
            >Remove</Button>
        </>
    );

    return (
        <ListItem 
            onClick={props.onClick} 
            icon={icon} 
            rightText={props.creationDate}
            rightContent={rightContent} 
            text={capitalize(props.module)}
        />
    );
}

export default LIQuickAccess;