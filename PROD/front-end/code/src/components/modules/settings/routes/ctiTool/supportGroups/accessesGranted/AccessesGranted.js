import React, { useContext, useEffect, useState } from "react";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";
import List from "../../../../../../Interface/list/List";
import AllowedSupportGroup from "./allowedSupportGroup/AllowedSupportGroup";
import UserContext from "../../../../../../context/userContext/UserContext";
import AppContext from "../../../../../../context/appContext/AppContext";
import RequestPassword from "../../../../components/modals/requestPassword/RequestPassword";
import sortByField from "../../../../../../../functions/array/sortByField";
import Legend from "../../../../../../Interface/legend/Legend";
import SettingSection from "../../../../components/settingSection/SettingSection";

function AccessesGranted(props) {
    const [supportGroups, setSupportGroups] = useState([]);
    const appCtx = useContext(AppContext);
    const userCtx = useContext(UserContext);
    const fetcher = useContext(FetcherContext);  

    useEffect(() => {
        getSupportGroups();
        props.onRefreshData && props.onRefreshData(getSupportGroups);
    }, []);

    const getSupportGroups = async () => {
        const res = await fetcher.getSupportGroups(
            {
                query: {
                    status: {$ne: 'not supported by Wipro'}
                },
                settings: {
                    projection: {
                        applications: {
                            _id: 1, 
                            name: 1, 
                            'support group': 1, 
                            country: 1,
                            status: 1
                        }
                    }
                }
            },
            {
                awaitingFlag: 'getSupportGroupsData'
            }
        );

        if(!res.ok) return;
        setSupportGroups(res.data);
    }

    const handleOnRemoveAccess = async (supportGroupName, ) => {
        const res = await fetcher.updateCTIApplicationPermissions({
            supportGroup: supportGroupName, 
            action: 'remove'
        });

        if(res.ok) await props.onRemoveAccess();
        return res;
    }

    const handleOnAccountableRemoveAccess = async (supportGroupName, password) => {
        if(!password) {
            appCtx.showModal((
                <RequestPassword 
                    onRemove={(password) => handleOnAccountableRemoveAccess(supportGroupName, password)}
                />
            ));
            return;
        }

        const res = await fetcher.updateMemberCtiApplications({
            userId: props.user._id, 
            supportGroup: supportGroupName, 
            action: 'remove',
            password
        });
        
        if(res.ok) await props.onRemoveAccess();
        return res;
    }

    let allowedAccesses = [];

    if(supportGroups.length) {
        const userApplications = sortByField(
            props.accountableView
                ? props.user.settings['cti tool'] && props.user.settings['cti tool'].applications || []
                : userCtx.getCTIApplication(),
            'name'
        );
    
        const userSupportGroups = Object.keys(
            userApplications.reduce((supportGroups, application) => {
                supportGroups[application['support group']] = true;
                return supportGroups;
            }, {})
        ).
        sort();
    
        allowedAccesses = userSupportGroups.map(supportGroupName => {
            let onRemove = props.disableRemove? null : () => handleOnRemoveAccess(supportGroupName);

            if(props.accountableView) {
                const accountableApplications = userCtx.getCTIApplication().map(application => application._id);
                const userApplicationsOnSupportGroup = userApplications
                    .filter(application => application['support group'] === supportGroupName)
                    .map(application => application._id);

                if(userApplicationsOnSupportGroup.every(application => accountableApplications.includes(application))) {
                    onRemove = () => handleOnAccountableRemoveAccess(supportGroupName);
                } else {
                    onRemove = null;
                }
            }

            return (
                <AllowedSupportGroup
                    key={supportGroupName} 
                    supportGroup={supportGroups.find(supportGroup => supportGroup.name === supportGroupName)} 
                    userApplications={userApplications.map(application => application._id)} 
                    onRemove={onRemove}
                    popBoxcontainerId='setting-container'
                />
            );
        });   
    }

    const legends = [
        {
            icon: {
                name: 'check_circle',
                color: 'green',
                weight: 300
            },
            label: 'You have access'
        },
        {
            icon: {
                name: 'close',
                color: 'red',
                weight: 300
            },
            label: 'You do not have access'
        }
    ];

    const list = (
        <>
            <List 
                className={props.className} 
                noDataIcon='no access'
                noDataMessage='No access granted' 
                hoverEffect 
                style={{
                    alignSelf: 'stretch',
                    flexGrow: 1,
                    height: 0
                }}
                loading={fetcher.awaiting.getSupportGroupsData}
            >
                {allowedAccesses}
            </List>
            <Legend legends={legends}/>
        </>
    );

    if(props.disableHeader) return list;

    return (
        <SettingSection title='Your Support Groups' style={{flexGrow: 1, height: 0}}>
            {list}
        </SettingSection>
    );
}

export default AccessesGranted;