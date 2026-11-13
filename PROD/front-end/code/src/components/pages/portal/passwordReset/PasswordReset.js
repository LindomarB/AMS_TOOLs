import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../Interface/buttons/button/Button';
import useInput from '../../../hooks/useInput';
import TextInput from '../../../Interface/inputs/textInput/TextInput';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import Text from '../../../Interface/Text/Text';
import PasswordConditions from '../../../Interface/forms/passwordConditions/PasswordConditions';
import style from './PasswordReset.module.css';
import passwordValidation from '../../../../functions/inputValidation/passwordValidation';
import LoadableContent from '../../../Interface/containers/loadableContent/LoadableContent';
import Icon from '../../../Interface/icons/icon/Icon';
import UserContext from '../../../context/userContext/UserContext';

function PasswordReset(props) {
    const [resetCompleted, setResetCompleted] = useState(false);
    const fetcher = useContext(FetcherContext);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        verifyAuthorization();
    }, []);

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

    const verifyAuthorization = async () => {
        const res = await fetcher.verifyPasswordReset({authorization: searchParams.get('authorization')});

        if(!res.ok || !res.data.ok) {
            navigate('/portal');
        }
    }

    const onSubmitNewPassword = async () => {
        const res = await fetcher.confirmPasswordReset({
            newPassword: newPassword.value,
            authorization: searchParams.get('authorization')
        });
        
        if(res.ok) {
            setResetCompleted(true);
            setTimeout(async () => {
                    const result = await userCtx.logIn({
                        email_id: res.data.email, 
                        password: newPassword.value
                    });

                    if(result.ok) navigate('/home');
            }, 3000);
        }
    }

    return (
        <LoadableContent loading={fetcher.awaiting.verifyPasswordReset}>
            <div className={style.PasswordReset}>
                <Text size={24} align='center'>Password Reset</Text>
                {!resetCompleted &&
                    <>
                        <Text>Your new password must meet the following requirements:</Text>
                        <PasswordConditions newPassword={newPassword.value}/>
                        <div className={style.inputsContainer}>
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
                                disabled={!newPassword.isValid || !passwordConfirmation.isValid}
                                onClick={onSubmitNewPassword}
                                awaiting={fetcher.awaiting.confirmPasswordReset}
                            >
                                Reset Password
                            </Button>
                        </div>
                    </>
                }
                {resetCompleted &&
                    <>
                        <Icon style={{alignSelf: 'center'}} name='check_circle' filled color='green' size={56} weight={400}/>
                        <Text size={20} weight={500} align='center'>New passowrd set!</Text>
                        <Text weight={500} align='center'>You will now be logged into AMS Tools...</Text>
                    </>
                }
            </div>
        </LoadableContent>
    );
}

export default PasswordReset;