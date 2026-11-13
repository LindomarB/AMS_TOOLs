import React, { useContext, useEffect, useState } from "react";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";
import List from "../../../../../../Interface/list/List";
import Access from "./tool/Tool";
import SettingSection from "../../../../components/settingSection/SettingSection";
import RequestPassword from "../../../../components/modals/requestPassword/RequestPassword";
import AppContext from "../../../../../../context/appContext/AppContext";

function AllowedTools(props) {
    const [roles, setRoles] = useState({});
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);  

    useEffect(() => {
        fetchRoles();
        props.onRefreshData(fetchRoles);
    }, []);

    const fetchRoles = async() => {
        const res = await fetcher.getRoles();

        if(!res.ok) return ;
    
        setRoles(res.data);
    }

    const handleOnRemoveAccess = async (access) => {
        const res = await fetcher.updateUserAccess({
            userId: props.user._id, 
            access, 
            action: 'remove'
        });

        if(res.ok) await props.onRemoveAccess();
    }

    const handleOnAccountableRemoveAccess = async (access, password) => {
        if(!password) {
            appCtx.showModal((
                <RequestPassword
                    onRemove={(password) => handleOnAccountableRemoveAccess(access, password)}
                />
            ));
            return;
        }

        const res = await fetcher.updateMemberAccess({
            userId: props.user._id, 
            access, 
            action: 'remove',
            password
        });
        
        if(res.ok) await props.onRemoveAccess();
        return res;
    }

    const allowedAccesses = props.user.accesses.sort().map(access => (
        <Access
            key={access} 
            access={access} 
            isDefaultAccess={roles[props.user.profile.role] && roles[props.user.profile.role].defaultAccesses.includes(access)}
            onRemove={props.disableRemove
                ? null 
                : props.accountableView
                ? () => handleOnAccountableRemoveAccess(access)
                : () => handleOnRemoveAccess(access)
            }
            popBoxcontainerId='setting-container'
        />
    ));   

    return (
        <SettingSection title='Allowed Accesses' style={{flexGrow: 1, height: 0}}>
            <List 
                noDataIcon='no access'
                noDataMessage='No tool allowed' 
                hoverEffect
                loading={fetcher.awaiting.getRoles}
                style={{
                    alignSelf: 'stretch',
                    flexGrow: 1,
                    height: 0
                }}
            >
                {allowedAccesses}
            </List>
        </SettingSection>
    );
}

export default AllowedTools;