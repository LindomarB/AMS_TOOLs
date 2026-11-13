import React, { useContext } from 'react';
import TextInput from '../../../../../Interface/inputs/textInput/TextInput';
import Button from '../../../../../Interface/buttons/button/Button';
import Text from '../../../../../Interface/Text/Text';
import SettingSection from '../../../components/settingSection/SettingSection';
import PasswordConditions from '../../../../../Interface/forms/passwordConditions/PasswordConditions';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import useInput from '../../../../../hooks/useInput';
import passwordValidation from '../../../../../../functions/inputValidation/passwordValidation';
import style from './Password.module.css';
import useForm from '../../../../../hooks/useForm';

function Password(props) {
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
        const res = await fetcher.updateUserPassword(currentPassword.value, newPassword.value);
        
        if(res.ok) {
            currentPassword.setValue('');
            newPassword.setValue('');
            passwordConfirmation.setValue('');
        }
    }

    return(
        <SettingSection title='Password Reset'>
            <Text>Your new password must meet the following requirements:</Text>
            <PasswordConditions newPassword={newPassword.value}/>
            <div className={style.inputsContainer}>
                <TextInput 
                    type='password'
                    input={currentPassword}
                    label='Current Password'
                    placeholder='Current Password'
                />
                <TextInput 
                    type='password'
                    input={newPassword}
                    label='New Password'
                    placeholder='New Password'
                    enableShowPassword
                />
                <TextInput
                    type='password'
                    input={passwordConfirmation}
                    label='Confirm Passsword'
                    placeholder='Confirm Passsword'
                    enableShowPassword
                />
                <Button
                    style={{marginTop: '1rem'}}
                    color='green'
                    icon='reset'
                    disabled={!form.isValid()}
                    onClick={onSubmitNewPassword}
                    awaiting={fetcher.awaiting.updateUserPassword}
                >
                    Reset Password
                </Button>
            </div>
        </SettingSection>
    );
}

export default Password;