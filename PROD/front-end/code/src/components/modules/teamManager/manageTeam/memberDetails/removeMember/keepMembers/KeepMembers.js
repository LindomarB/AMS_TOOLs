import React, { useContext, useState } from "react";
import Modal from "../../../../../../Interface/modal/Modal";
import Text from "../../../../../../Interface/Text/Text";
import List from "../../../../../../Interface/list/List";
import User from "../../../../../../Interface/listItems/user/User";
import Button from "../../../../../../Interface/buttons/button/Button";
import ModalContext from "../../../../../../context/modalContext/ModalContext";
import style from './KeepMembers.module.css';
import sortByField from "../../../../../../../functions/array/sortByField";
import Header from "../../../../../../Interface/header/Header";

function KeepMembers(props) {
    const [membersToRemove, setMembersToRemove] = useState(props.members || []);
    const [membersToKeep, setMembersToKeep] = useState([]);
    const modalCtx = useContext(ModalContext);

    const handleOnConfirm = async () => {
        const res = await props.onConfirm(membersToKeep.map(member => member._id));

        if(res.ok) {
            modalCtx.close();
        }
    }

    const handleOnRemove = (memberId) => {
        setMembersToKeep(curSt => curSt.filter(member => member._id !== memberId));
        setMembersToRemove(curSt => {
            curSt.push(props.members.find(member => member._id === memberId));
            return curSt;
        });
    }

    const handleOnKeep = (memberId) => {
        setMembersToRemove(curSt => curSt.filter(member => member._id !== memberId));
        setMembersToKeep(curSt => {
            curSt.push(props.members.find(member => member._id === memberId));
            return curSt;
        });
    }

    const handleRemoveAll = () => {
        setMembersToKeep([]);
        setMembersToRemove(props.members);
    }

    const handleKeepAll = () => {
        setMembersToRemove([]);
        setMembersToKeep(props.members);
    }

    const toRemove = sortByField(membersToRemove, ['profile', 'name']).map(member => (
        <User
            key={member._id} 
            user={member} 
            onClick={() => handleOnKeep(member._id)}
        />
    ));

    const toKeep = sortByField(membersToKeep, ['profile', 'name']).map(member => (
        <User 
            key={member._id} 
            user={member} 
            onClick={() => handleOnRemove(member._id)}
        />
    ));

    const listHeaderProps = {
        className: style.listHeader,
        color: 'theme' ,
        iconProps: {filled: true}
    };

    return (
        <Modal
            className={style.KeepMembers}
            title='Keep members'
            titleIcon={{name: 'directly accountable'}}
            subtitle='Before removing a member, check if you want to keep someone from your team'
            onClose={props.onClose}
        >
            <Text color='grey'>
                When you remove a team leader, their entire team will also be removed from your team. If you wish, you can choose which members you want to keep and become their directly accountable. <br/>
                If some member of {props.accountable.profile.name}'s team is not appearing in the list below, it means that this member has another accountable who is part of your team and, therefore, will remain as your indirect member.
            </Text>
            <div className={style.listContainer}>
                <div className={style.listWrapper}>
                    <Header {...listHeaderProps} text='Members to remove' icon='remove user'/>
                    <List
                        className={style.list}
                        noDataIcon='team'
                        noDataMessage='Keep all members'
                    >
                        {toRemove}
                    </List>
                </div>
                <Button 
                    type='icon'
                    icon='change' 
                    color='grey'
                    tooltip={membersToRemove.length? 'Keep all' : 'Remove all'}
                    onClick={membersToRemove.length? handleKeepAll : handleRemoveAll}
                />
                <div className={style.listWrapper}>
                    <Header {...listHeaderProps} text='Members to keep' icon='add user'/>
                    <List
                        className={style.list}
                        noDataIcon='no team'
                        noDataMessage='Do not keep any members'
                    >
                        {toKeep}
                    </List>
                </div>
            </div>
            <Button
                className={style.button}
                icon='confirm'
                color='green'
                onClick={handleOnConfirm}
            >Confirm</Button>
        </Modal>
    );
}

KeepMembers.defaultProps = {
    disableBackdropClose: true
}

export default KeepMembers;