import React, { useContext } from "react";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";
import useInput from "../../../../../../hooks/useInput";
import Button from "../../../../../../Interface/buttons/button/Button";
import InputButton from "../../../../../../Interface/containers/inputButton/InputButton";
import Select from "../../../../../../Interface/inputs/select/Select";
import TextInput from "../../../../../../Interface/inputs/textInput/TextInput";
import Text from "../../../../../../Interface/Text/Text";
import SettingSection from "../../../../components/settingSection/SettingSection";

function RequestAccess(props) {
    const fetcher = useContext(FetcherContext);

    const access = useInput({name: 'access', required: true});
    const password = useInput({name: 'password', required: props.accountableView});

    const handleOnRequestAccess = async () => {
        const res = await fetcher.sendRequest({
            requester: props.user._id, 
            type: 'tool', 
            data: {access: access.value},
        });
        
        if(res.ok || res.status === 499) {
            await props.onRequestAccess(res.ok);
            access.reset();  
        }
    }

    const handleOnGiveAccess = async () => {
        const res = await fetcher.updateMemberAccess({
            userId: props.user._id, 
            action: 'add',
            access: access.value,
            password: password.value
        });
        
        if(res.ok || res.status === 499) {
            await props.onRequestAccess(res.ok);
            access.reset();
            password.reset();       
        }
    }

    const action = props.accountableView? 'Give' : 'Request';

    return (
        <SettingSection title={`${action} Access`}>
            <Text color='grey'>{`Select a tool to ${action.toLowerCase()} access.${props.accountableView? '' :  'Your accountable will need to approve it and will be notified.'}`}</Text>
            <InputButton style={props.accountableView? {flexDirection: 'column', alignItems: 'stretch', rowGap: '1rem'} : {}}>
                <Select 
                    style={{minWidth: '300px'}}
                    input={access}
                    options={props.accessOptions}
                    placeholder='Select a tool'
                />
                {props.accountableView &&
                    <TextInput 
                        type='password'
                        input={password}
                        placeholder='Type your password to proceed'
                        onPressEnter={props.accountableView? handleOnGiveAccess : handleOnRequestAccess}
                    />
                }
                <Button 
                    icon='send' 
                    iconWeight={300} 
                    color='green' 
                    disabled={!access.isValid || !password.isValid} 
                    onClick={props.accountableView? handleOnGiveAccess : handleOnRequestAccess}
                    awaiting={fetcher.awaiting.sendRequest || fetcher.awaiting.updateMemberAccess}
                >{`${action} Access`}</Button>
            </InputButton>
        </SettingSection>
    );
}

export default RequestAccess;