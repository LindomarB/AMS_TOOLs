import React, { useContext, useEffect, useState } from "react";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";
import useInput from "../../../../../../hooks/useInput";
import Button from "../../../../../../Interface/buttons/button/Button";
import InputButton from "../../../../../../Interface/containers/inputButton/InputButton";
import Select from "../../../../../../Interface/inputs/select/Select";
import TextInput from "../../../../../../Interface/inputs/textInput/TextInput";
import Text from "../../../../../../Interface/Text/Text";
import SettingSection from "../../../../components/settingSection/SettingSection";
import modules from "../../../../../../../data/app/modules";
import LoadableContent from "../../../../../../Interface/containers/loadableContent/LoadableContent";
import AppContext from "../../../../../../context/appContext/AppContext";
import Header from "../../../../../../Interface/header/Header";
import style from './RequestTool.module.css';

function RequestTool(props) {
    const [toolOptions, setToolOptions] = useState([]);
    const fetcher = useContext(FetcherContext);
    const appCtx = useContext(AppContext);

    const tool = useInput({name: 'tool', required: true});
    const password = useInput({name: 'password', required: props.accountableView});

    useEffect(() => {
        fetchToolOptions();
        props.onRefreshData(fetchToolOptions);
    }, []);

    const fetchToolOptions = async() => {
        const res = await fetcher.getToolOptions(
            props.accountableView? {query:  {_id: props.user._id}} : null
        );

        if(!res.ok) return ;
        
        const options = res.data.map(tool => {
            const module = modules(tool);

            return {
                value: tool, 
                label: module.label[appCtx.currentLanguage]
            };
        });

        setToolOptions(options);   
    }


    const handleOnRequestAccess = async () => {
        const res = await fetcher.sendRequest({
            requester: props.user._id, 
            type: 'tool', 
            data: {access: tool.value},
        });
        
        if(res.ok || res.status === 499) {
            await fetchToolOptions();
            await props.onSendRequest(res.ok);
            tool.reset();  
        }
    }

    const handleOnGiveAccess = async () => {
        const res = await fetcher.updateMemberAccess({
            userId: props.user._id, 
            action: 'add',
            access: tool.value,
            password: password.value
        });
        
        if(res.ok || res.status === 499) {
            await fetchToolOptions();
            await props.onSendRequest(res.ok);
            tool.reset();
            password.reset();       
        }
    }

    let toolInfo = null;

    if(tool.value) {
        const toolData = modules(tool.value);

        const features = toolData.submodules.map((submodule, idx) =>
            <Text key={idx} li color='grey'>{submodule.description[appCtx.currentLanguage]}</Text>
         );

        toolInfo = (
            <div className={style.toolInfo}>
                <Header 
                    color='icon'
                    icon={toolData.icon} 
                    text={toolData.label[appCtx.currentLanguage]}
                />
                <Text className={style.description} color='grey'>
                    {toolData.description[appCtx.currentLanguage]}.
                </Text>
                {!!features.length &&
                    <>
                        <Text color='grey' weight={600}>Features</Text>
                        <ul className={style.features}>
                            {features}
                        </ul>
                    </>
                }

            </div>
        );
    }

    const action = props.accountableView? 'Give' : 'Request';

    return (
        <LoadableContent loading={fetcher.awaiting.getToolOptions}>
            <SettingSection title={`${action} Access`}>
                <Text color='grey'>{`Select a tool to ${action.toLowerCase()} access. ${props.accountableView? '' :  'Your accountable will need to approve it and will be notified.'}`}</Text>
                <InputButton style={props.accountableView? {flexDirection: 'column', alignItems: 'stretch', rowGap: '1rem'} : {}}>
                    <Select 
                        style={{minWidth: '300px'}}
                        input={tool}
                        options={toolOptions}
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
                        disabled={!tool.isValid || !password.isValid} 
                        onClick={props.accountableView? handleOnGiveAccess : handleOnRequestAccess}
                        awaiting={fetcher.awaiting.sendRequest || fetcher.awaiting.updateMemberAccess}
                    >{`${action} Access`}</Button>
                </InputButton>
                {toolInfo}
            </SettingSection>
        </LoadableContent>
    );
}

export default RequestTool;