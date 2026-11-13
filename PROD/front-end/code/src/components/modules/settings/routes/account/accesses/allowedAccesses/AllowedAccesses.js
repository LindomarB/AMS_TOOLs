import React, { useContext } from "react";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";
import List from "../../../../../../Interface/list/List";
import Access from "./access/Access";
import SettingSection from "../../../../components/settingSection/SettingSection";
import RequestPassword from "../../../../components/modals/requestPassword/RequestPassword";
import AppContext from "../../../../../../context/appContext/AppContext";

function AllowedAccesses(props) {
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);  

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
            isDefaultAccess={props.roles[props.user.profile.role] && props.roles[props.user.profile.role].defaultAccesses.includes(access)}
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

export default AllowedAccesses;