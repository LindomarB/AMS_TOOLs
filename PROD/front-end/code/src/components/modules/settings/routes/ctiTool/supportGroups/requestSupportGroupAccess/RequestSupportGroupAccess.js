import React, { useContext, useEffect, useState } from "react";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";
import useInput from "../../../../../../hooks/useInput";
import Button from "../../../../../../Interface/buttons/button/Button";
import InputButton from "../../../../../../Interface/containers/inputButton/InputButton";
import Select from "../../../../../../Interface/inputs/select/Select";
import TextInput from "../../../../../../Interface/inputs/textInput/TextInput";
import Text from "../../../../../../Interface/Text/Text";
import SettingSection from "../../../../components/settingSection/SettingSection";
import Warning from "../../../../../../Interface/warning/Warning";
import SupportGroupDetails from "./supportGroupDetails/SupportGroupDetails";
import LoadableContent from "../../../../../../Interface/containers/loadableContent/LoadableContent";
import style from './RequestSupportGroupAccess.module.css';

function RequestSupportGroupAccess(props) {
    const [supportGroups, setSupportGroups] = useState([]);
    const [supportGroupOptions, setSupportGroupOptions] = useState([]);   
    const [hasApplicationRequest, setHasApplicationRequest] = useState(); 
    const fetcher = useContext(FetcherContext);

    const supportGroup = useInput({name: 'supportGroup', required: true});
    const password = useInput({name: 'password', required: props.accountableView});

    useEffect(() => {
        getSupportGroups();
        getSupportGroupOptions();
        
        props.onRefreshData && props.onRefreshData(() => {
            getSupportGroups();
            getSupportGroupOptions();
        });
    }, []);

    useEffect(() => {
        if(supportGroup.value) {
            checkPendingApplicationRequests();
        } else {
            setHasApplicationRequest(false);
        }
    }, [supportGroup.value]);

    const getSupportGroups = async () => {
        const res = await fetcher.getSupportGroups({settings: {
            projection: {
                applications: {
                    _id: 1, 
                    name: 1, 
                    'support group': 1, 
                    country: 1
                }
            }
        }});

        if(!res.ok) return;
        setSupportGroups(res.data);
    }

    const getSupportGroupOptions = async () => {
        const res = props.accountableView
            ? await fetcher.getMemberSupportGroupOptions({query: {userId: props.user._id}})
            : await fetcher.getCtiSupportGroupOptions();

        if(!res.ok) return;
        
        setSupportGroupOptions(res.data.map(supportGroup => supportGroup.name));
    }

    const checkPendingApplicationRequests = async () => {
        const res = await fetcher.getRequests(
            {query: {
                type: 'cti application access',
                'requester._id': props.user._id,
                status: {$in: ['pending', 'approval in progress']},
                'data.application.support group': supportGroup.value
            }}, 
            {awaitingFlag: 'checkPendingApplicationRequests'}
        );
        
        if(res.ok) {
            setHasApplicationRequest(res.data.length > 0);
        }
    }

    const handleOnRequestAccess = async () => {
        const res = await fetcher.sendRequest({
            requester: props.user._id, 
            type: 'cti support group access', 
            data: {supportGroup: supportGroup.value}
        });

        if(res.ok || res.status === 499) {
            await getSupportGroups();
            await getSupportGroupOptions();
            await props.onSendRequest(res.ok);
            supportGroup.reset();
            password.reset();       
        }
    }

    const handleOnGiveAccess = async () => {
        const res = await fetcher.updateMemberCtiApplications({
            userId: props.user._id, 
            action: 'add',
            supportGroup: supportGroup.value,
            password: password.value
        });

        if(res.ok || res.status === 499) {
            await getSupportGroups();
            await getSupportGroupOptions();
            await props.onSendRequest(res.ok);
            supportGroup.reset();
            password.reset();       
        }
    }

    let applications = null;

    if(supportGroup.value) {
        applications = supportGroups.find(group => group.name === supportGroup.value).applications.map(application => application.name);
    }

    const action = props.accountableView? 'Give' : 'Request';

    return (
        <LoadableContent loading={fetcher.awaiting.getSupportGroups || fetcher.awaiting.getMemberSupportGroupOptions || fetcher.awaiting.getCtiSupportGroupOptions}>
            <SettingSection 
                className={style.settingSection}
                childrenContainerClassName={style.childrenContainer}
                title={`${action} Support Group Access`} 
            >
                <Text color='grey'>
                    {`Select a support group to ${action.toLowerCase()} permission to create resolution for all your applications.${props.accountableView? '' :  'Your accountable will need to approve it and will be notified.'}`}
                </Text>
                <InputButton className={props.accountableView? style.accountableView : ''}>
                    <Select 
                        style={{minWidth: '300px'}}
                        input={supportGroup}
                        options={supportGroupOptions}
                        placeholder='Select a support group'
                        sort
                    />
                    {props.accountableView &&
                        <TextInput 
                            type='password'
                            input={password}
                            placeholder='Type your password to proceed'
                            onPressEnter={action === 'Give'? handleOnGiveAccess : handleOnRequestAccess}
                        />
                    }
                    <Button 
                        icon='send' 
                        iconWeight={300} 
                        color='green' 
                        disabled={!supportGroup.isValid || !password.isValid} 
                        onClick={action === 'Give'? handleOnGiveAccess : handleOnRequestAccess}
                        awaiting={fetcher.awaiting.sendRequest || fetcher.awaiting.updateMemberCtiApplications || fetcher.awaiting.checkPendingApplicationRequests}
                    >{`${action} Access`}</Button>
                </InputButton>
                {supportGroup.value &&
                    <>
                        <SupportGroupDetails 
                            supportGroup={supportGroups.find(group => group.name === supportGroup.value)}
                        />
                        {hasApplicationRequest &&
                            <Warning className={style.warning} title border>
                                {`There is a pending request for one of the applications in the support group. By proceeding, this request will be canceled.`}
                            </Warning>
                        }
                    </>
                }
            </SettingSection>
        </LoadableContent>
        
    );
}

export default RequestSupportGroupAccess;