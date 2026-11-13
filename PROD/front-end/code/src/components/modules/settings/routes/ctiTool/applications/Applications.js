import React from "react";
import PendingRequests from "../../../components/pendingRequests/PendingRequests";
import PermissionsGranted from "./permissionsGranted/PermissionsGranted";
import RequestApplicationPermission from "./requestApplicationPermission/RequestApplicationPermission";
import ApplicationRequest from "./applicationRequest/ApplicationRequest";
import Accesses from "../../../components/accesses/Accesses";

function Applications(props) {
    const onSendRequest = async (ok) => {
        if(props.accountableView) {
            if(ok) {
                await props.refreshUser();
            }
        } else {
            if(!ok) {
                await props.refreshUser();
            }
        }
    }

    const onRefreshData = async () => {
        await props.refreshUser();
    }

    const tabs = [
        {
            text: 'Applications',
            element: (
                <PermissionsGranted
                    user={props.user}
                    accountableView={props.accountableView} 
                    disableRemove={props.user.profile.role === 'administrator'}
                    onRemoveAccess={onRefreshData}
                />
            )
        }        
    ];

    if(props.user.profile.role !== 'administrator') {
        tabs.push(
            {
                text: props.accountableView? 'Give Access' : 'Request Access',
                disabled: props.user.status === 'locked',
                element: (
                    <RequestApplicationPermission
                        user={props.user}
                        accountableView={props.accountableView}
                        onSendRequest={onSendRequest}
                    />
                )
            },
            {
                text: 'Pending Requests',
                element: (
                    <PendingRequests
                        user={props.user}
                        accountableView={props.accountableView}
                        pendingRequestsQuery={{type: 'cti application access'}} 
                        listItem={ApplicationRequest}
                        onRespondRequest={onRefreshData}
                    />
                )
            }
        );
    }

    return (
        <Accesses
            tabs={tabs}
            refreshUser={props.refreshUser}
        />
    );
}

export default Applications;