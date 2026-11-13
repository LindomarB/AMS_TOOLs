import React from 'react';
import useInput from '../../../../../../hooks/useInput';
import Button from '../../../../../../Interface/buttons/button/Button';
import TextInput from '../../../../../../Interface/inputs/textInput/TextInput';
import Text from '../../../../../../Interface/Text/Text';
import SettingSection from '../../../../../settings/components/settingSection/SettingSection';

function UnlockAccount(props) {
    const password = useInput({name:'password', required: true});

    const handleOnUnlockAccount = async () => {
        props.onChangeUserStatus({newStatus: 'active', accountablePassword: password.value});
    }

    return (
        <>
            <SettingSection title='Unlock Account'>
                <Text>
                    This account is currently locked, preventing user login.
                </Text>
                <TextInput 
                    style={{width: '400px'}}
                    type='password'
                    input={password}
                    placeholder='Type your password to proceed'
                />
                <Button
                    style={{width: '400px'}}
                    icon='key'
                    color='green'
                    disabled={!password.isValid}
                    onClick={handleOnUnlockAccount}
                    awaiting={props.awaitingResponse}
                >Unlock Account</Button>
            </SettingSection>
        </>
    );
}

export default UnlockAccount;