import React, { useContext, useEffect, useState } from "react";
import modules from "../../../../../../data/app/modules";
import AppContext from "../../../../../context/appContext/AppContext";
import FetcherContext from "../../../../../context/fetcherContext/FetcherContext";
import LoadableContent from "../../../../../Interface/containers/loadableContent/LoadableContent";
import AllowedAccesses from "./allowedAccesses/AllowedAccesses";
import RequestAccess from "./requestAccess/RequestAccess";
import AccessRequest from "./accessRequest/AccessRequest";
import PendingRequests from "../../../components/pendingRequests/PendingRequests";
import RefreshButton from "../../../components/refreshButton/RefreshButton";
import Tabs from "../../../../../Interface/navigation/tabs/Tabs";
import SettingSection from "../../../components/settingSection/SettingSection";

function Accesses(props) {
    const [currentTab, setCurrentTab] = useState();
    const [roles, setRoles] = useState({});
    const [pendingRequests, setPendingRequests] = useState([]);
    const [accessOptions, setAccessOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetcher = useContext(FetcherContext);
    const lang = useContext(AppContext).currentLanguage;

    useEffect(() => {
        const load = async () => {
            await fetchPendingRequests();
            setLoading(false);
        }

        load();
    }, []);

    useEffect(() => {
        if(loading) return;
        getAccessOptions();
    }, [pendingRequests]);

    const getAccessOptions = async() => {
        const res = await fetcher.getRoles();

        if(!res.ok) return ;
    
        const options = res.data[props.user.profile.role].allowedAccesses.sort().reduce((options, access) => {
            if(
                !props.user.accesses.includes(access) && 
                !pendingRequests.find(request => request.data.access === access
            )) {
                const module = modules(access);
                options.push({value: module.name, label: module.label[lang]});
            }

            return options;
        }, []);

        setRoles(res.data);
        setAccessOptions(options);   
    }

    const fetchPendingRequests = async () => {
        const res = await fetcher.getRequests({query: {
            'requester._id': props.user._id,
            type: 'access',
            status: 'pending'
        }});

        if(!res.ok) return;

        setPendingRequests(res.data);
    }

    const onRequestAccess = async (ok) => {
        if(props.accountableView) {
            if(ok) {
                await props.refreshUser();
            } else {
                await fetchPendingRequests();
            }
        } else {
            if(ok) {
                await fetchPendingRequests();
            } else {
                await props.refreshUser();
            }
        }
    }

    const onRefreshData = async () => {
        await props.refreshUser();
        await fetchPendingRequests();
    }

    const tabs = [
        {
            text: 'Tools'
        }
    ];

    if(props.user.profile.role !== 'administrator') {
        tabs.push( 
            {
                text: props.accountableView? 'Give Access' : 'Request Access',
                disabled: props.user.status === 'locked'
            },
            {
                text: 'Pending Requests'
            }
        );
    }

    let section = null;

    switch(currentTab) {
        case 'Tools':
            section = (
                <AllowedAccesses
                    user={props.user}
                    onRemoveAccess={onRefreshData}
                    accountableView={props.accountableView} 
                    roles={roles}
                />
            );
            break;
        
        case props.accountableView? 'Give Access' : 'Request Access':
            section = (
                <RequestAccess
                    user={props.user}
                    accessOptions={accessOptions}
                    onRequestAccess={onRequestAccess}
                    accountableView={props.accountableView} 
                />
            );
            break;

        case 'Pending Requests':
            section = (
                <PendingRequests
                    user={props.user}
                    requests={pendingRequests} 
                    onRespondRequest={onRefreshData}
                    accountableView={props.accountableView} 
                    listItem={AccessRequest}
                />
            );
                break;

        default:
            section = null;
    }

    return (
        <LoadableContent loading={loading}>
            <RefreshButton onRefresh={onRefreshData}/>
            <Tabs
                style={{marginBottom: '2rem'}}
                tabs={tabs} 
                selectedTab={currentTab}
                onClick={(tab) => setCurrentTab(tab)}
                track
            />
            {section}
        </LoadableContent>
    );
}

export default Accesses;