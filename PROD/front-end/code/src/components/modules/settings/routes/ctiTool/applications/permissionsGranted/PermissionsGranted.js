import React, { useContext } from "react";
import FetcherContext from "../../../../../../context/fetcherContext/FetcherContext";
import List from "../../../../../../Interface/list/List";
import UserContext from "../../../../../../context/userContext/UserContext";
import sortByField from "../../../../../../../functions/array/sortByField";
import RequestPassword from "../../../../components/modals/requestPassword/RequestPassword";
import AppContext from "../../../../../../context/appContext/AppContext";
import SettingSection from "../../../../components/settingSection/SettingSection";
import Application from "./Application/Application";

function PermissionsGranted(props) {
    const appCtx = useContext(AppContext);
    const userCtx = useContext(UserContext);
    const fetcher = useContext(FetcherContext);  

    const handleOnRemoveAccess = async (application) => {
        const res = await fetcher.updateCTIApplicationPermissions({
            applications: [application], 
            action: 'remove'
        });
        
        if(res.ok) await props.onRemoveAccess();
        return res;
    }

    const handleOnAccountableRemoveAccess = async (application, password) => {
        if(!password) {
            appCtx.showModal((
                <RequestPassword
                    onRemove={(password) => handleOnAccountableRemoveAccess(application, password)}
                />
            ));
            return;
        }

        const res = await fetcher.updateMemberCtiApplications({
            userId: props.user._id, 
            applications: [application], 
            action: 'remove',
            password
        });
        
        if(res.ok) await props.onRemoveAccess();
        return res;
    }

    const userApplications = sortByField(
        props.accountableView
            ? props.user.settings['cti tool'] && props.user.settings['cti tool'].applications || []
            : userCtx.getCTIApplication(),
        'name'
    );

    const allowedAccesses = userApplications.map(application => (
        <Application
            key={application._id} 
            application={application} 
            onRemove={props.disableRemove
                ? null 
                : props.accountableView
                ? userCtx.getCTIApplication().some(accountableApplication => accountableApplication._id === application._id)
                ? () => handleOnAccountableRemoveAccess(application._id)
                : null
                : () => handleOnRemoveAccess(application._id)
            }
            popBoxcontainerId='setting-container'
        />
    ));   

    const list = (
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
        >
            {allowedAccesses}
        </List>
    );

    if(props.disableHeader) return list;

    return (
        <SettingSection title='Your Applications' style={{flexGrow: 1, height: 0}}>
            {list}
        </SettingSection>
    );
}

export default PermissionsGranted;