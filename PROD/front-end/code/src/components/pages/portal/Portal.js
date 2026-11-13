import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LogIn from './logIn/LogIn';
import AccountRequest from './accountRequest/AccountRequest';
import ForgotPassword from './forgotPassword/ForgotPassword';
import style from './Portal.module.css';
import PasswordReset from './passwordReset/PasswordReset';

function Portal(props) {
    return (
        <div className={style.Portal}>
            <div className={style.heroImage} style={{backgroundImage: 'url(/images/login-background.svg)'}}>

            </div>
            <div className={style.panel}>
                <img className={style.logo} src={'/images/ams-tools-logo.svg'}/>
                <div className={style.container}>
                    <Routes>
                        <Route path='/' element={<LogIn />} />
                        <Route path='account-request' element={<AccountRequest />} />
                        <Route path='forgot-password' element={<ForgotPassword />} />
                        <Route path='reset-password' element={<PasswordReset />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Portal;