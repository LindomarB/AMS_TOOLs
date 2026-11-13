import React, { useContext, useEffect } from 'react';
import emailValidation from '../../../../../../functions/inputValidation/emailValidation';
import useInput from '../../../../../hooks/useInput';
import TextInput from '../../../../../Interface/inputs/textInput/TextInput';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import capitalize from '../../../../../../functions/text/capitalize';

function Profile(props) {
    const fetcher = useContext(FetcherContext);
    
    const name = useInput({
        name: 'name', 
        initialValue: props.values.name,
        required: true
    });

    const cargillId = useInput({
        name: 'cargillId', 
        initialValue: props.values.cargillId,
        required: true,
        externalValidator: async (value) => {
            const res = await fetcher.validateId({query: {id: value}}, {showErrorNotification: false});

            return {
                isValid: res.ok,
                errorMessage: res.data.message
            };
        }
    });

    const email = useInput({
        name: 'email',
        initialValue: props.values.email,
        required: true,
        errorChecker: (value) => {
            const isValid = emailValidation(value, ['@cargill.com', '@crgl-thirdparty.com']);
            return isValid? null : 'Use only @cargill.com or @crgl-thirdparty.com domains (do not use uppercase)';
        },
        externalValidator: async (value) => {
            const res = await fetcher.validateEmail({query: {email: value}}, {showErrorNotification: false});

            return {
                isValid: res.ok,
                errorMessage: res.data.message
            };
        }
    });

    const emailConfirmation = useInput({
        name: 'emailConfirmation',
        initialValue: props.values.emailConfirmation,
        required: true,
        errorChecker: (value, dependencies) => value === dependencies.email? null : 'The emails are not the same',
        dependencies: [email],
        confirmationOnly: true
    });

    const capitalizeName = () => {
        if(name.value) name.setValue(capitalize(name.value.toLowerCase(), false));
    }

    const lowercaseEmail = () => {
        if(email.value) email.setValue(email.value.toLowerCase());
    }
    const lowercaseEmailConfirmation = () => {
        if(emailConfirmation.value) emailConfirmation.setValue(emailConfirmation.value.toLowerCase());
    }

    useEffect(() => {
        props.setFormSection(props.name, [name, cargillId, email, emailConfirmation]);
    }, []);

    return (
        <>
            <TextInput 
                input={name}
                label='Your Name'
                placeholder='Name'
                // onBlur={capitalizeName}
                capitalize='all'
            />
            <TextInput 
                input={cargillId}
                label='Your Cargill ID'
                placeholder='ID001234'
                debouncing
                uppercase
            />
            <TextInput 
                input={email}
                label='Your Email'
                placeholder='CargillEmail@cargill.com'
                // onBlur={lowercaseEmail}
                debouncing
            />
            <TextInput 
                input={emailConfirmation}
                label='Confirm Your Email'
                placeholder='CargillEmail@cargill.com'
                // onBlur={lowercaseEmailConfirmation}
            />
        </>
    );
}

Profile.defaultProps = {
    name: 'profile'
}

export default Profile;