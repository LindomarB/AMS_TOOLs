import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Snackbar from '../../Interface/snackbar/Snackbar';
import style from './AppSnackbar.module.css';

function AppSnackbar(props, ref) {
    const [show, setShow] = useState(false);
    const [currentNotification, setCurrentNotification] = useState();
    const [notifications, setNotifications] = useState([]);

    useImperativeHandle(ref, () => ({
        notify: addNotification
    }));

    useEffect(() => {
        currentNotification && setShow(true);
    }, [currentNotification]);

    useEffect(() => {
        !currentNotification && notifications.length && notify();
    }, [notifications]);

    const onSnackbarStartClose = () => {
        setShow(false);
    }

    const onSnackbarEndClose = () => {
        notify();
    }
    
    const addNotification = (newNotification) => {
        if(
            currentNotification &&
            currentNotification.message === newNotification.message && 
            currentNotification.type === newNotification.type
        ) return;

        newNotification.priority = newNotification.priority || 0;
        
        setNotifications(curSt => {
            const notifications = [...curSt];

            if(!notifications.some(notification => 
                notification.message === newNotification.message && notification.type === newNotification.type
            )) {
                notifications.push(newNotification);
            }

            return notifications;
        });
    };

    const notify = () => {
        let nextNotificationIdx = 0;

        for(let idx = 1; idx < notifications.length; idx ++) {
            const notification = notifications[idx];
            const nextNotification = notifications[nextNotificationIdx];

            if(notification.priority > nextNotification.priority) {
                nextNotificationIdx = idx;
            }
        }

        setCurrentNotification(notifications[nextNotificationIdx]);
        setNotifications(curSt => curSt.filter((_, idx) => idx !== nextNotificationIdx));
    };

    const icons = {
        warning: {
            name: 'warning',
            color: 'black',
            type: 'rounded',
            weight: 600,
            filled: false
        },
        error: {
            name: 'error'
        },
        info: {
            name: 'info',
            weight: 200,
            filled: false
        },
        successful: {
            name: 'successful'
        }
    };

    const notification = currentNotification || {};
    
    let icon = notification.icon;

    if(notification.message && notification.type) {
        icon = {
            weight: 400,
            size: 24, 
            filled: true,
            padding: 4, 
            color: 'white',
            ...icons[notification.type] || {}
        };
    }

    return (
            <Snackbar
                className={`${notification.type? style[notification.type] : ''} ${props.className || ''}`}
                messageClassName={notification.type === 'warning'? style.warningText : null}
                show={show}
                content={notification.content}
                message={notification.message}
                icon={icon}
                position='bottom-middle'
                autoHideTime={3000}
                onStartClose={onSnackbarStartClose}
                onEndClose={onSnackbarEndClose}
                {...notification.settings || {}}
            />
    );
}

export default forwardRef(AppSnackbar);