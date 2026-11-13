import React, { useContext, useState } from 'react';
import Modal from '../../../../../../Interface/modal/Modal';
import Text from '../../../../../../Interface/Text/Text';
import List from '../../../../../../Interface/list/List';
import Button from '../../../../../../Interface/buttons/button/Button';
import ButtonsContainer from '../../../../../../Interface/containers/buttonsContainer/ButtonsContainer';
import User from '../../../../../../Interface/listItems/user/User';
import Rule from '../../../../../../Interface/rule/Rule';
import FetcherContext from '../../../../../../context/fetcherContext/FetcherContext';
import style from './DirectMemberChanging.module.css';
import Header from '../../../../../../Interface/header/Header';

function DirectMemberChanging(props) {
    const [accessToRemove, setAccessToRemove] = useState({});
    const fetcher = useContext(FetcherContext);

    const handleOnRemoveAccess = (member, accessType, value) => {
        setAccessToRemove(curSt => {
            const newState = structuredClone(curSt);

            if(!newState[accessType]) newState[accessType] = {};
            const access = newState[accessType];

            if(!access[member]) access[member] = [];
            const toRemove = access[member];
            
            if(toRemove.includes(value)) {
                newState[accessType][member] = toRemove.filter(toRemoveValue => toRemoveValue !== value);
            } else {
                toRemove.push(value);
            }

            return newState;
        });
    }

    const handleOnConfirm = async () => {
        const res = await props.onConfirm(props.newMember, false);

        if(!res.ok) return;

        if(accessToRemove['Tools']) {
            for(let member in accessToRemove['Tools']) {
                for(let access of accessToRemove['Tools'][member]) {
                    await fetcher.updateMemberAccess(
                        {
                            userId: member, 
                            access, 
                            action: 'remove',
                            key: res.data.key
                        },
                        {
                            showErrorNotification: false, 
                            showSuccessfulNotification: false
                        }
                    );
                }
            }
        }

        if(accessToRemove['CTI Tool - Applications']) {
            for(let member in accessToRemove['CTI Tool - Applications']) {
                await fetcher.updateMemberCtiApplications(
                    {
                        userId: member, 
                        applications: accessToRemove['CTI Tool - Applications'][member], 
                        action: 'remove',
                        key: res.data.key
                    },
                    {
                        showErrorNotification: false, 
                        showSuccessfulNotification: false
                    }
                );
            }
        }
    }

    const members = props.conflictingMembers.map(member => {
        const conflicts = Object.keys(member.conflicts).map(type => {
            const toRemove = accessToRemove[type]? accessToRemove[type][member._id] || [] : [];

            const values = member.conflicts[type].map(conflict => {
                const buttonProps = toRemove.includes(conflict.value)
                    ? {
                        icon: 'toggle_off',
                        color: 'grey'
                    }
                    : {
                        icon: 'toggle_on',
                        color: 'blue'
                    };
                return (
                    <div key={conflict.value} className={style.value}>
                        <Text ellipsis>{conflict.label}</Text>
                        <Button 
                            {...buttonProps}
                            type='icon'
                            iconProps={{filled: true}}
                            active
                            onClick={() => handleOnRemoveAccess(member._id, type, conflict.value)}
                        />
                    </div>
                );
            });

            return (
                <div key={type} className={style.conflict}>
                    <Text className={style.conflictHeader} color='grey' size={12}>
                        <Text span>{type}</Text>
                        <Text span>Keep</Text>
                    </Text>
                    {values}
                </div>
            );
        });

        return (
            <div key={member._id}  className={style.member}>
                <User
                    user={member} 
                />
                {!!conflicts.length &&
                    <>
                        {/* <Rule /> */}
                        <Header 
                            className={style.header}
                            text='Shared accesses' 
                            icon='access' 
                            color='blue' 
                            iconProps={{filled: true}}
                            rule
                        />
                        {conflicts}
                    </>
                }
            </div>
        );
    });

    return (
        <Modal
            className={style.DirectMemberChanging}
            title='Direct members changing'
            titleIcon={{name: 'change'}}
            subtitle={`Check the changes that will be made to your team by adding ${props.newMember.profile.name}`}
            // warning='Removing an access from a user may result in the loss of some of your data.'
            onClose={props.onClose}
        >
            <Text color='grey'>
                Some of your direct members are also members of {props.newMember.profile.name}'s team. By adding {props.newMember.profile.name} to your team, those members will become indirect members of yours.<br/>
                If these members have access only shared with you, you can choose to remove or keep them.
            </Text>
            <List
                className={style.list}
                itemClassName={style.listItem}
            >
                {members}
            </List>
            <ButtonsContainer className={style.buttonsContainer}>
                <Button
                    icon='close'
                    color='red'
                    onClick={props.onClose}
                >Cancel</Button>
                <Button
                    icon='confirm'
                    color='green'
                    onClick={handleOnConfirm}
                >Confirm</Button>
            </ButtonsContainer>
        </Modal>
    );
}

DirectMemberChanging.defaultProps = {
    disableBackdropClose: true
}

export default DirectMemberChanging;