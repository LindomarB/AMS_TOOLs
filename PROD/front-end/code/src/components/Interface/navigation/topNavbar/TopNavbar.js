import React from 'react';
import Icon from '../../icons/icon/Icon';
import IconNavbar from '../IconNavbar/IconNavbar';
import AccountButton from './accountButton/AccountButton';
import style from './TopNavbar.module.css';
import { useContext } from 'react';
import UserContext from '../../../context/userContext/UserContext';

function TopNavbar(props) {
    const userCtx = useContext(UserContext);

    const handleOnClickNotifications = () => {
        props.setShowNotifications(curSt => !curSt);
    }

    const buttons = props.menuItems? [...props.menuItems, {rule: true}] : [];
    buttons.push({
        activeClassName: style.notificationsActive,
        icon: userCtx.hasNewNotifications? 'new notification' : 'notifications',
        tooltip: 'Notifications',
        active: props.showingNotifications,
        alert: userCtx.hasNewNotifications,
        onClick: handleOnClickNotifications
    });
    buttons.push(<AccountButton />);

    return (
        <nav className={`${style.TopNavbar} ${props.className || ''}`}>
            {props.logo
                ? <img className={style.logo} src={'/images/ams-tools-logo-white.svg'} />
                : (
                    <div className={style.header}>
                        <div className={style.title}>
                            <Icon className={style.icon} name={props.titleIcon} weight={400} filled/>
                            <p>{props.title}</p>
                        </div>
                        {props.subtitle && 
                            <>
                                <Icon name='dot' size={10} color='white' filled style={{opacity: '0.75'}}/>
                                <p className={style.subtitle}>{props.subtitle}</p>
                            </>
                        }
                    </div>
                ) 
            }
            <IconNavbar
                className={style.iconNavbar}
                buttonClassName={style.button} 
                activeClassName={style.active}
                alertClassName={style.alert}
                ruleClassName={style.rule} 
                buttons={buttons}
                color='white'
            />
        </nav>
    );
}

export default TopNavbar;