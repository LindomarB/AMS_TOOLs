import React, { useEffect } from 'react';
import passwordValidation from '../../../../../../functions/inputValidation/passwordValidation';
import useInput from '../../../../../hooks/useInput';
import PasswordConditions from '../../../../../Interface/forms/passwordConditions/PasswordConditions';
import TextInput from '../../../../../Interface/inputs/textInput/TextInput';
import Text from '../../../../../Interface/Text/Text';

function Password(props) {
    const password = useInput({
        name: 'password',
        initialValue: props.values.password,
        required: true,
        errorChecker: (value) => passwordValidation(value).isValid? null : 'Invalid password format'
    });

    const passwordConfirmation = useInput({
        name: 'passwordConfirmation',
        initialValue: props.values.passwordConfirmation,
        required: true,
        errorChecker:(value, dependencies) => value === dependencies.password? null : 'The passwords are not the same',
        dependencies: [password],
        confirmationOnly: true
    });

    useEffect(() => {
        props.setFormSection(props.name, [password, passwordConfirmation]);
    }, []);  

    return (
        <>
            <Text size={16}>Set your password. It must meet the following requirements:</Text>
            <PasswordConditions newPassword={password.value}/>
            <TextInput 
                type='password'
                input={password}
                label='Password'
                placeholder='Password'
                enableShowPassword
            />
            <TextInput
                type='password'
                input={passwordConfirmation}
                label='Confirm the passsword'
                placeholder='Confirm the passsword'
                enableShowPassword
            />
        </>
    );
}

Password.defaultProps = {
    name: 'password'
}

export default Password;