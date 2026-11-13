import React from 'react';
import useInput from '../../../../../../hooks/useInput';
import Button from '../../../../../../Interface/buttons/button/Button';
import Select from '../../../../../../Interface/inputs/select/Select';
import TextInput from '../../../../../../Interface/inputs/textInput/TextInput';
import Rule from '../../../../../../Interface/rule/Rule';
import Text from '../../../../../../Interface/Text/Text';
import Warning from '../../../../../../Interface/warning/Warning';
import SettingSection from '../../../../../settings/components/settingSection/SettingSection';
import style from './LockAccount.module.css';

function LockAccount(props) {
    const {name, role} = props.member.profile;
    const newAccountable = useInput({name:'newAccountable', required: role !== 'analyst'});
    const password = useInput({name:'password', required: true});  
    
    const handleOnLockAccount = async () => {
        props.onChangeUserStatus({
            newStatus: 'locked', 
            accountablePassword: password.value, 
            newAccountable: JSON.parse(newAccountable.value)
        });
    }

    return (
        <>
            <SettingSection title='Lock Account'>
                <Text>
                    You can lock this account as secure measure or if the user is no longer using the AMS Tools.<br/>
                    As the approver of this account, only you can activate it again.<br/>
                    If you lock this account, the user:
                </Text>
                <ul className={style.ul}>
                    <li>
                        <Text weight={600}>Can no longer log in to AMS Tools;</Text>
                    </li>
                    <li>
                        <Text weight={600}>Will have all his pending requests cancled;</Text>
                    </li>
                    <li>
                        <Text weight={600}>Can not request a new account;</Text>
                    </li>
                </ul>
                <div className={style.inputsContainer}>
                    {role !== 'analyst' &&
                        <>
                            <Text size={16} weight={500}>{`Select a new accountable to ${name}’s team.`}</Text>
                            <Text color='grey'>
                                {`All ${name}’s staff members and their requests will be moved to the new selected accountable, including new account requests.`}
                            </Text>
                            <Select
                                className={style.inputSize} 
                                input={newAccountable}
                                options={props.accountableOptions}
                                placeholder='Select an accountable'
                            />
                        </>
                    }
                    <TextInput 
                        className={style.inputSize} 
                        type='password'
                        input={password}
                        placeholder='Type your password to proceed'
                    />
                    <Button
                        className={style.inputSize} 
                        icon='locked'
                        color='red'
                        disabled={!newAccountable.isValid && !password.isValid}
                        onClick={handleOnLockAccount}
                        awaiting={props.awaitingResponse}
                    >Lock Account</Button>
                </div>
                <Rule />
                <Warning className={style.warning}>
                    <Text size={16} weight={500}>
                        This action cannot be undone!
                    </Text>
                    <Text color='grey' weight={500}>
                        {`Even if you active this account later, ${role !== 'analyst'? 'the team members and ' : ''}the pending requests won't return.`}
                    </Text>
                </Warning>
            </SettingSection>
        </>
    );
}

export default LockAccount;