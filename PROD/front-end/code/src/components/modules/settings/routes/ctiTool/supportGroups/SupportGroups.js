import React from "react";
import PendingRequests from "../../../components/pendingRequests/PendingRequests";
import RequestSupportGroupAccess from "./requestSupportGroupAccess/RequestSupportGroupAccess";
import AccessesGranted from "./accessesGranted/AccessesGranted";
import SupportGroupRequest from "./supportGroupRequest/SupportGroupRequest";
import Accesses from "../../../components/accesses/Accesses";

function SupportGroups(props) {
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
            text: 'Support Groups',
            element: (
                <AccessesGranted
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
                    <RequestSupportGroupAccess
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
                        pendingRequestsQuery={{type: 'cti support group access'}} 
                        listItem={SupportGroupRequest}
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

export default SupportGroups;