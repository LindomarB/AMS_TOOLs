import React, { useContext, useEffect, useState } from "react";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";
import useInput from "../../../../../../hooks/useInput";
import Button from "../../../../../../Interface/buttons/button/Button";
import InputButton from "../../../../../../Interface/containers/inputButton/InputButton";
import Select from "../../../../../../Interface/inputs/select/Select";
import TextInput from "../../../../../../Interface/inputs/textInput/TextInput";
import Text from "../../../../../../Interface/Text/Text";
import SettingSection from "../../../../components/settingSection/SettingSection";
import LoadableContent from "../../../../../../Interface/containers/loadableContent/LoadableContent";
import Warning from "../../../../../../Interface/warning/Warning";
import style from './RequestApplicationPermission.module.css';
import ReportDataGrid from "../../../../../../Interface/report/reportDataGrid/ReportDataGrid";
import capitalize from "../../../../../../../functions/text/capitalize";
import Rule from "../../../../../../Interface/rule/Rule";
import Stamp from "../../../../../../Interface/stamp/Stamp";

function RequestApplicationPermission(props) {
    const [applications, setApplications] = useState([]);
    const [applicationOptions, setApplicationOptions] = useState([]);
    const [applicationData, setApplicationData] = useState([]);
    const fetcher = useContext(FetcherContext);

    const application = useInput({name: 'application', required: true});
    const password = useInput({name: 'password', required: props.accountableView});

    useEffect(() => {
        fetchApplicationOptions();
        props.onRefreshData && props.onRefreshData(fetchApplicationOptions);
    }, []);

    useEffect(() => {
        if(application.value) {
            fetchApplicationInfo();
        } else {
            setApplicationData(null);
        }
    }, [application.value]);

    const fetchApplicationOptions = async () => {
        const res = props.accountableView
            ? await fetcher.getMemberApplicationOptions({query: {userId: props.user._id}})
            : await fetcher.getCtiApplicationOptions();

        if(!res.ok) return;
   
        const options = res.data.map(application => ({
            value: application._id, 
            label: application.name
        }));

        setApplications(res.data);
        setApplicationOptions(options); 
    }

    const fetchApplicationInfo = async () => {
        const res = await fetcher.getApplicationCatalog({
            query: {_id: application.value},
            settings: {
                projection: {
                    name: 1,
                    country: 1,
                    'support group': 1,
                    description: 1,
                    status: 1,
                    sdm: 1,
                    'app lead': 1,
                    'track lead': 1
                }
            }
        });

        if(!res.ok) return;
   
        setApplicationData(res.data[0]); 
    }

    const handleOnRequestAccess = async () => {
        const res = await fetcher.sendRequest({
            requester: props.user._id, 
            type: 'cti application access', 
            data: {
                application: application.value
            }
        });
        
        if(res.ok || res.status === 499) {
            await fetchApplicationOptions();
            await props.onSendRequest(res.ok);
            application.reset();
            password.reset();       
        }
    }

    const handleOnGiveAccess = async () => {
        const res = await fetcher.updateMemberCtiApplications({
            userId: props.user._id, 
            action: 'add',
            applications: [application.value],
            password: password.value
        });

        if(res.ok || res.status === 499) {
            await fetchApplicationOptions();
            await props.onSendRequest(res.ok);
            application.reset();
            password.reset();       
        }
    }

    let applicationInfo = null;

    if(applicationData) {
        const data = [
            'status',
            'country',
            'support group',
            'sdm',
            'app lead',
            'track lead'
        ].map(field => ({
            title: capitalize(field, true),
            value: Array.isArray(applicationData[field])
                ? applicationData[field].join(', ') 
                : field === 'status'
                ? <Stamp type={applicationData[field]}/>
                : applicationData[field]
        }));



        applicationInfo = (
            <div className={style.applicationInfo}>
                <Text weight={600}>{applicationData.name}</Text>
                <Text color='grey'>{applicationData.description}</Text>
                <ReportDataGrid data={data}/>
                {applicationData.status === 'decommissioned' &&
                    <Warning title border>
                        This application has been decommissioned, which means that it is no longer operating.
                    </Warning>
                }
            </div>
        );
    }

    const action = props.accountableView? 'Give' : 'Request';

    return (
        <LoadableContent loading={fetcher.awaiting.getMemberApplicationOptions || fetcher.awaiting.getCtiApplicationOptions}>
            <SettingSection 
                className={style.settingSection} 
                childrenContainerClassName={style.settingSectionChildren}
                title={`${action} Application Access`}
            >
                <Text color='grey'>
                    {`Select an application to ${action.toLowerCase()} permission to create resolution for it.${props.accountableView? '' :  ' Your accountable will need to approve it and will be notified.'}`}<br/>
                    {`If ${props.accountableView? 'there is' : 'you have'} a pending support group access request, applications from that group will not be displayed in the options.`}
                </Text>
                <InputButton className={props.accountableView? style.accountableView : ''}>
                    <Select 
                        style={{minWidth: '300px'}}
                        input={application}
                        options={applicationOptions}
                        placeholder='Select an application'
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
                        disabled={!application.isValid || !password.isValid} 
                        onClick={action === 'Give'? handleOnGiveAccess : handleOnRequestAccess}
                        awaiting={fetcher.awaiting.sendRequest || fetcher.awaiting.updateMemberCtiApplications}
                    >{`${action} Access`}</Button>
                </InputButton>
                {applicationInfo}
            </SettingSection>
        </LoadableContent>
    );
}

export default RequestApplicationPermission;