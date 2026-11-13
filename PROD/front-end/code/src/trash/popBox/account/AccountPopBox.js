import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../components/context/appContext/AppContext';
import UserContext from '../../../components/context/userContext/UserContext';
import Button from '../../../components/Interface/buttons/button/Button';
import PopBoxButton from '../../../components/Interface/buttons/popBoxButton/PopBoxButton';
import Icon from '../../../components/Interface/icons/icon/Icon';
import style from './AccountPopBox.module.css';

function AccountPopBox(props) {
    const popBoxButton = useRef();
    const appCtx = useContext(AppContext);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const icons = appCtx.icons;
    const routes = appCtx.routes;
    const user = userCtx.user;

    const handleOnClickAccountSetting = () => {
        navigate(`${routes.settings.path}/account/profile`);
        popBoxButton.current.setShow(false);
    }

    // <div style={{position: 'relative'}}>
    //     <Button 
    //         id='account' 
    //         className={style.account} 
    //         icon={icons.account} 
    //         onClick={() => setShowLoginMenu(curSt => !curSt)}
    //         disableLabel/>
    //     <PopBox
    //         parentId='account'
    //         show={showLoginMenu}
    //         horizontalAlign='right'
    //         onBlur={() => setShowLoginMenu(false)}
    //     >
    //         <LoginMenu closeMenu={() => setShowLoginMenu(false)}/>
    //     </PopBox>
    // </div>

    return (
        <PopBoxButton
            ref={popBoxButton}
            button={{
                icon: icons.account,
                disableLabel: true,
                tooltip: true
            }}
            popBox={{
                className: style.AccountPopBox,
                horizontalAlign: 'right'
            }}
        >
            <div className={style.user}>
                <Icon 
                    className={style.accountIcon}
                    {...icons.account}
                    type=''
                />
                <div className={style.userInfo}>
                    <p className={style.userName} title={user.profile.name}>{user.profile.name}</p>
                    <p title={user.profile.email}>{user.profile.email}</p>
                </div>
            </div>
            <Button 
                className={style.button}
                icon={icons.settings}
                onClick={handleOnClickAccountSetting}
            >Account Settings</Button>
            <Button 
                className={style.button}
                icon={icons.language}
            />
            <Button 
                className={style.button}
                icon={icons.logout}
                onClick={userCtx.logOut}
            />
        </PopBoxButton>
    );
}

export default AccountPopBox;