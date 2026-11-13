import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import modules from '../../../../../data/app/modules';
import randomColor from '../../../../../functions/randomColor';
import UserContext from '../../../../context/userContext/UserContext';
import Button from '../../../buttons/button/Button';
import BadgeIcon from '../../../icons/badgeIcon/BadgeIcon';
import Icon from '../../../icons/icon/Icon';
import PopBox from '../../../popBox/PopBox';
import Text from '../../../Text/Text';
import UserPhoto from '../../../user/userPhoto/UserPhoto';
import style from './AccountButton.module.css';

function AccountButton(props) {
    const popBoxButton = useRef();
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const user = userCtx.user;

    const handleOnClickAccountSetting = () => {
        navigate(modules('account settings').getRoute('account', 'tools').path);
        popBoxButton.current.setShow(false);
    }

    const buttonProps = {
        type: 'menu',
        color: 'blue',
        iconWeight: 300
    };

    let awayMode = null;

    if(user.settings.awayMode) {
        const startDate = new Date(user.settings.awayMode.startDate);
        const endDate = new Date(user.settings.awayMode.endDate);
        awayMode = {started: startDate.getTime() < new Date().getTime()};

        if(awayMode.started) {
            awayMode.text = `Away mode activated from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
        } else {
            awayMode.text = `Scheduled away mode from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
        }
    }

    return (
        <PopBox
            ref={popBoxButton}
            className={style.popBox}
            horizontalAlign='right'
            button={{
                className: style.button,
                icon: 'account',
                type: 'icon',
                tooltip: "Account"
            }}
        >
            <div className={style.user}>
                <UserPhoto user={user.profile.name} color={user.settings.profile.avatarColor}/>
                <div className={style.userInfo}>
                    <Text className={style.userName} title={user.profile.name} bold>{user.profile.name}</Text>
                    <Text title={user.profile.email} size={12} color='grey'>{user.profile.email}</Text>
                </div>
            </div>
            {awayMode &&
                <div className={style.awayMode}>
                    <Icon name='away' color='purple' border invertColor={awayMode.started}/>
                    <Text color='grey'>{awayMode.text}</Text>
                </div>
            }
            <Button 
                {...buttonProps}
                icon='account settings'
                onClick={handleOnClickAccountSetting}
            >Account Settings</Button>
            {/* <Button 
                {...buttonProps}
                icon='language'
            >Language</Button> */}
            <Button 
                {...buttonProps}
                icon='logout'
                onClick={userCtx.logOut}
            >Log Out</Button>
        </PopBox>
    );
}

export default AccountButton;