import React, { useContext, useEffect, useState } from 'react';
import capitalize from '../../../functions/text/capitalize';
import UserContext from '../../context/userContext/UserContext';
import FadeTransition from '../../Interface/animations/fadeTransition/FadeTransition';
import Button from '../../Interface/buttons/button/Button';
import Drawer from '../../Interface/drawer/Drawer';
import Header from '../../Interface/header/Header';
import List from '../../Interface/list/List';
import Notification from './notification/Notification';
import AppContext from '../../context/appContext/AppContext';
import Tabs from '../../Interface/navigation/tabs/Tabs';
import getNotificationPath from './getNotificationPath/getNotificationPath';
import style from './Notifications.module.css';
import Text from '../../Interface/Text/Text';

function Notifications(props) {
    const userCtx = useContext(UserContext);
    const [group, setGroup] = useState('global');
    const [lastSeen, setLastSeen] = useState(userCtx.user.settings.notifications.lastSeen);
    const [newNotifications, setNewNotifications] = useState(structuredClone(userCtx.notifications.new));
    const appCtx = useContext(AppContext);

    useEffect(() => {
        setLastSeen(userCtx.user.settings.notifications.lastSeen);
        setNewNotifications(structuredClone(userCtx.notifications.new));
    }, [userCtx.notifications.lastUpdate, group]);

    useEffect(() => {
        if(props.open) {
            setLastSeen(userCtx.user.settings.notifications.lastSeen);
            setNewNotifications(structuredClone(userCtx.notifications.new));
        }
    }, [props.open]);

    useEffect(() => {
        if(props.open) {
            userCtx.updateLastSeenNotifications(group);
        }
    }, [group, props.open]);

    const handleOnClose = () => {
        props.setOpen(false);
        userCtx.updateLastSeenNotifications(group);
    }

    const handleOnSelectGroup = (newGroup) => {
        setGroup(newGroup);
    }

    const refresh = () => {
        userCtx.refresh();
    }

    const checkNotificationCode = (notification) => {
        const path = getNotificationPath(notification)

        const navigateTo = () => {
            handleOnClose();
            appCtx.showNavigationWarning(path);
        }

        return path && navigateTo;
    }

    let notifications = [];
    const groupNotifications = userCtx.notifications.groups[group].data;

    if(groupNotifications) {
        notifications = groupNotifications.map(notification => {
            const onClick = notification.code 
                ? checkNotificationCode(notification)
                : null;

            const lastSeenNotification = new Date(lastSeen[group] || userCtx.user.meta.createdOn).getTime();
            const isNew = !lastSeenNotification || new Date(notification.date).getTime() > lastSeenNotification;

            return (
                <Notification 
                    key={notification._id} 
                    {...notification} 
                    onClick={onClick}
                    new={isNew}
                    active={isNew}
                />
            );
    });
    }

    const groups = Object.keys(userCtx.notifications.groups);

    const groupItems = groups.map(groupName => ({
        color: 'grey',
        icon: groupName, 
        value: groupName,
        active: groupName === group,
        onClick: () => handleOnSelectGroup(groupName),
        alert: newNotifications[groupName],
        alertMax: 9,
        alertOverIcon: true,
        tooltip: capitalize(groupName),
        tooltipPosition: 'left'
    }));

    return (
        <Drawer className={style.Notifications} open={props.open}>
            <Header 
                className={style.header}
                color='theme' 
                text={`${capitalize(group)} Notifications`} 
                icon={group} 
                iconProps={{filled: true}} 
                rule
            >
                <Button 
                    type='icon'
                    icon='refresh'
                    color='grey'
                    tooltip='Refresh notifications'
                    onClick={refresh}
                />
                <Button 
                    type='icon'
                    icon='close'
                    color='grey'
                    tooltip='Close'
                    onClick={handleOnClose}
                />
            </Header>
            <div className={style.drawerContent}>
                <FadeTransition switchTransition currentElementKey={group}>
                    <List 
                        className={style.list} 
                        noDataIcon='notifications_off' 
                        noDataMessage='You have no notifications in this group'
                        noBorderRadius
                        onReachBottom={userCtx.notifications.groups[group].getNext}
                    >
                            {notifications}
                    </List>
                </FadeTransition>
                <Tabs 
                    className={style.tabs} 
                    tabClassName={style.tab} 
                    tabsContainerClassName={style.tabsContainer} 
                    activeClassName={style.activeTab} 
                    selectorClassName={style.tabSelector}
                    tabs={groupItems} 
                    selectedTab={group}
                    type='icon'
                    vertical
                    pill
                    onClick={handleOnSelectGroup}
                />
            </div>
            <Text className={style.lastUpdate} color='grey'>
                {`Last update: ${userCtx.lastUserUpdate? userCtx.lastUserUpdate.toLocaleString() : 'pending'}`}
            </Text>
        </Drawer>
    );
}

export default Notifications;