import React, { useContext } from "react";
import SettingSection from "../../../../components/settingSection/SettingSection";
import Text from "../../../../../../Interface/Text/Text";
import InputButton from "../../../../../../Interface/containers/inputButton/InputButton";
import TextInput from "../../../../../../Interface/inputs/textInput/TextInput";
import Button from "../../../../../../Interface/buttons/button/Button";
import style from './BecomeDirectlyAccountable.module.css';
import useInput from "../../../../../../hooks/useInput";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";

function BecomeDirectlyAccountable(props) {
    const fetcher = useContext(FetcherContext);

    const password = useInput({
        name: 'password', 
        required: true
    });

    const handleOnRemove = async () => {
        const res = await fetcher.removeMember({
            userId: props.member._id, 
            password: password.value
        });
    }

    return (
        <SettingSection title='Become Directly Accountable'>
            <div>
                <Text color='grey'>
                    You are not a directly accountable of {props.user.profile.name}. By becoming a direct accountable:
                </Text>
                <ul className={style.ul}>
                    <Text li weight={600} color='grey'>You can share your accesses;</Text>
                    <Text li weight={600} color='grey'>You will receive notifications of your requests;</Text>
                </ul>
            </div>
            <InputButton className={style.inputButton}>
                <TextInput
                    className={style.input}
                    type='password'
                    input={password}
                    placeholder='Type your password to proceed'
                    onPressEnter={handleOnRemove} 
                />
                <Button
                    icon='directly accountable' 
                    iconWeight={300} 
                    color='green' 
                    disabled={!password.isValid} 
                    onClick={handleOnRemove}
                    awaiting={fetcher.awaiting.removeMember}
                >Become Directly Accountable</Button>
            </InputButton>
        </SettingSection>
    );
}

export default BecomeDirectlyAccountable;