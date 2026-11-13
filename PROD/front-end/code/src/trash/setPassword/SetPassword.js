import React, { useContext, useState } from 'react';
import AppContext from '../../components/context/appContext/AppContext';
import Button from '../../components/Interface/buttons/button/Button';
import passwordValidation from '../../functions/inputValidation/passwordValidation';
import Icon from '../../components/Interface/icons/icon/Icon';
import filledBlueButtonStyle from '../../../generalStyles/filledBlueButton.module.css';
import Processing from '../../components/Interface/loaders/processing/Processing';
import FetcherContext from '../../components/context/fetcherContext/FetcherContext';
import useInput from '../../components/hooks/useInput';
import useForm from '../../components/hooks/useForm';
import TextInput from '../../components/inputs/textInput/TextInput';
import style from './SetPassword.module.css';

function SetPassword(props) {
    const [sendingRequest, setSendingRequest] = useState(false);
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);

    const currentPassword = useInput({
        name: 'currentPassword',
        required: true
    });

    const newPassword = useInput({
        name: 'newPassword',
        required: true,
        errorChecker: (value) => passwordValidation(value).isValid? null : 'Invalid password format'
    });

    const passwordConfirmation = useInput({
        name: 'passwordConfirmation',
        required: true,
        errorChecker:(value, dependencies) => value === dependencies.newPassword? null : 'The passwords are not the same',
        dependencies: [newPassword]
    });

    const form = useForm(currentPassword, newPassword, passwordConfirmation);

    const onSubmitNewPassword = async () => {
        setSendingRequest(true);
        const res = await fetcher.updateUserPassword(currentPassword.value, newPassword.value);
        
        if(res.ok) {
            currentPassword.setValue('');
            newPassword.setValue('');
            passwordConfirmation.setValue('');
        }

        setSendingRequest(false);
    }

    const validation = passwordValidation(newPassword.value);

    const passwordConditions = [
        {condition: 'length', label: '8 characters'},
        {condition: 'upperCase', label: '1 uppercase letter'},
        {condition: 'lowerCase', label: '1 lowercase letter'},
        {condition: 'number', label: '1 number'},
        {condition: 'specialCharacters', label: '1 special character'},
        {condition: 'whiteSpace', label: 'No white spaces'}
    ];

    const passwordConditionsEl = passwordConditions.map(passwordCondition => {
        const conditionMet = newPassword.value === ''? false : validation[passwordCondition.condition];
        const icon = conditionMet
            ? {
                ...appCtx.icons.done,
                style: {color: 'var(--green)'}
            } : {
                ...appCtx.icons.close,
                style: {color: 'lightgrey'}
            };
        return (
            <p 
                key={passwordCondition.condition}
                className={style.condition}
            >
                {<Icon {...icon} className={style.icon}/> }{passwordCondition.label}
            </p>
        );
    });

    return (
        <div className={style.mainContainer}>
            <div style={{width: '100%'}}>
                {passwordConditionsEl}
            </div>
            <TextInput 
                type='password'
                className={style.input}
                input={currentPassword}
                label='Current Password'
                placeholder='Current Password'
            />
            <TextInput 
                type='password'
                className={style.input}
                input={newPassword}
                label='New Password'
                placeholder='New Password'
            />
            <TextInput 
                type='password'
                className={style.input}
                input={passwordConfirmation}
                label='Confirm Passsword'
                placeholder='Confirm Passsword'
            />
            {sendingRequest
                ? <Processing />
                : (
                    <Button
                        className={filledBlueButtonStyle.filledBlueButton}
                        disabled={!form.isValid()}
                        onClick={onSubmitNewPassword}
                    >
                        Reset Password
                    </Button>
                )
            }
        </div>
    );
}

export default SetPassword;