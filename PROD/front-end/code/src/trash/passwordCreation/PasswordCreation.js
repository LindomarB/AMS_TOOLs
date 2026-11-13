import React, { Fragment, useContext, useState } from 'react';
import useInputValue from '../../../hooks/useInputValue';
import InputField from '../../../inputs/inputField/InputField';
import AppContext from '../../../context/appContext/AppContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Interface/buttons/button/Button';
import loginScreenStyle from '../loginScreen.module.css';
import filledBlueButtonStyle from '../../../generalStyles/filledBlueButton.module.css';
import passwordValidation from '../../../../functions/inputValidation/passwordValidation';
import Icon from '../../../Interface/icons/icon/Icon';
import style from './PasswordCreation.module.css';

function PasswordCreation(props) {
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [resetRequestDone, setResetRequestDone] = useState(false);
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();

    const password = useInputValue({
        inputName: 'password',
        required: true,
        validators: [{
            validator: (value) => passwordValidation(value).isValid, 
            invalidMessage: 'Invalid password format'
        }]
    });

    const passwordConfirmation = useInputValue({
        inputName: 'passwordConfirmation',
        required: true,
        validators: [{
            validator: (value, dependencies) => value === dependencies.password, 
            invalidMessage: 'The passwords are not the same'
        }],
        dependencies: [password]
    });

    const inputs = {
        password,
        passwordConfirmation
    }

    const routes = appCtx.routes;
    
    const onChangeInputValue = (input) => {
        inputs[input.name].setValue(input.value);
    }

    const onSubmitLogin = () => {
        setAwaitingResponse(true);
        //send to server and wait the response
        setTimeout(() => {
            if(true) {
                setResetRequestDone(true);
            } else {
                setAwaitingResponse(false);
            }
        }, 1000);
    }

    const validation = passwordValidation(password.value);

    const passwordConditions = [
        {condition: 'length', label: '8 characters'},
        {condition: 'upperCase', label: '1 uppercase letter'},
        {condition: 'lowerCase', label: '1 lowercase letter'},
        {condition: 'number', label: '1 number'},
        {condition: 'specialCharacters', label: '1 special character'},
        {condition: 'whiteSpace', label: 'No white spaces'}
    ];
    console.log(validation)
    const passwordConditionsEl = passwordConditions.map(passwordCondition => {
        const conditionMet = password.value === ''? false : validation[passwordCondition.condition];
        return (
            <p 
                key={passwordCondition.condition}
                className={style.condition}
            >
                {<Icon {...appCtx.icons.done} className={`${style.doneIcon} ${conditionMet? style.met: ''}`}/> }{passwordCondition.label}
            </p>
        );
    });

    return (
        <div className={loginScreenStyle.mainContainer}>
            <h1 className={loginScreenStyle.title}>Access Creation</h1>
            {resetRequestDone
                ?(
                    <div style={{textAlign: 'center'}}>
                        <p>Your access was created!</p>
                        <Button
                            className={filledBlueButtonStyle.filledBlueButton}
                            onClick={() => navigate(`${routes.signIn.path}`)}
                        >
                            Go to Sign In
                        </Button>
                    </div>
                    
                )
                : (
                    <Fragment>
                        <p style={{margin: '0'}}>Set your password to conclude the creation of your access</p>
                        <div style={{width: '100%'}}>
                            {passwordConditionsEl}
                        </div>
                        <InputField 
                            type='password'
                            className={loginScreenStyle.input}
                            name={password.inputName}
                            label='Password'
                            value={password.value}
                            error={!password.isValid}
                            errorMessage={password.invalidMessage}
                            onChange={onChangeInputValue}
                            placeholder='Password'
                        />
                        <InputField 
                            type='password'
                            className={loginScreenStyle.input}
                            name={passwordConfirmation.inputName}
                            label='Confirm Passsword'
                            value={passwordConfirmation.value}
                            error={!passwordConfirmation.isValid}
                            errorMessage={passwordConfirmation.invalidMessage}
                            onChange={onChangeInputValue}
                            placeholder='Confirm passsword'
                        />
                        <Button
                            className={filledBlueButtonStyle.filledBlueButton}
                            disabled={!password.isValid || !passwordConfirmation.isValid || awaitingResponse}
                            onClick={onSubmitLogin}
                        >
                            {awaitingResponse? 'Creating Access...' : 'Create Access'}
                        </Button>
                    </Fragment>
                )
            }
        </div>
    );
}

export default PasswordCreation;