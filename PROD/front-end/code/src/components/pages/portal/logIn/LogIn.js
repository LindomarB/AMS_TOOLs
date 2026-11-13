import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailValidation from '../../../../functions/inputValidation/emailValidation';
import CheckBox from '../../../Interface/inputs/checkBox/CheckBox';
import Button from '../../../Interface/buttons/button/Button';
import AppContext from '../../../context/appContext/AppContext';
import UserContext from '../../../context/userContext/UserContext';
import useInput from '../../../hooks/useInput';
import TextInput from '../../../Interface/inputs/textInput/TextInput';
import useForm from '../../../hooks/useForm';
import CopyRight from '../../../Interface/copyRight/CopyRight';
import Text from '../../../Interface/Text/Text';
import modules from '../../../../data/app/modules';
import style from './LogIn.module.css';

function LogIn(props) {
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const navigate = useNavigate();
    const appCtx = useContext(AppContext);
    const userCtx = useContext(UserContext);

    const email_id = useInput({
        name: 'email_id',
        required: true,
        errorChecker: (value) => {
            if(value.includes('@') || value.includes('.')) {
                const emailIsValid = emailValidation(value, ['@cargill.com', '@crgl-thirdparty.com']);
                return emailIsValid? '' : 'Invalid email';
            }

            return !value && 'Invalid ID';
        }
    });

    const password = useInput({
        name: 'password',
        required: true,
    });

    const rememberLogin = useInput({
        name: 'rememberLogin',
        initialValue: appCtx.rememberToken? ['rememberLogin'] : null,
        onChangeValue: ({value}) => appCtx.setRememberToken(!!value.length)
    });

    const form = useForm(email_id, password);

    const handleOnSubmitLogin = async () => {
        if(!form.isValid()) return;

        setAwaitingResponse(true);
        await userCtx.logIn(form.getValues());
        setAwaitingResponse(false);
    }

    return (
        <>
            <Text size={24} align='center'>Log In</Text>
            <div className={style.LogIn}>
                <TextInput 
                    style={{marginBottom: '0.5rem'}}
                    input={email_id}
                    label='Email or ID'
                    placeholder='email@cargill.com | ID000123'
                    onPressEnter={handleOnSubmitLogin}
                    disabled={awaitingResponse}
                />
                <TextInput 
                    type='password'
                    input={password}
                    label='Password'
                    placeholder='Password'
                    onPressEnter={handleOnSubmitLogin}
                    disabled={awaitingResponse}
                />
                <div className={style.rememberContainer}>
                    <CheckBox 
                        optionClassName={style.checkBox}
                        input={rememberLogin}
                        options={[{value: 'rememberLogin', label: 'Stay logged in'}]}
                    />
                    <Button
                        type='text'
                        color='blue'
                        onClick={() => navigate('forgot-password')}
                    >Forgot your password?</Button>
                </div>
                <div className={style.logInButtonContainer}>
                    <Button
                        className={style.logInButton}
                        color='blue'
                        highlight
                        highlightDisabled
                        disabled={!form.isValid() || awaitingResponse}
                        onClick={handleOnSubmitLogin}
                    >
                        {awaitingResponse? 'Log In...' : 'Log In'}
                    </Button>
                    <Text>or</Text>
                    <Button
                        style={{fontSize: '0.875rem'}}
                        type='text'
                        color='blue'
                        onClick={() => navigate('account-request')}
                    >Request your access</Button>
                </div>
            </div>
            <CopyRight className={style.copyRight}/>
        </>
    );
}

export default LogIn;