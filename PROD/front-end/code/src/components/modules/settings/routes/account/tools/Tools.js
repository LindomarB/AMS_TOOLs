import React from "react";
import PendingRequests from "../../../components/pendingRequests/PendingRequests";
import RequestTool from "./requestTool/RequestTool";
import AllowedTools from "./allowedTools/AllowedTools";
import ToolRequest from "./toolRequest/ToolRequest";
import Accesses from "../../../components/accesses/Accesses";

function Tools(props) {
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
            text: 'Tools',
            element: (
                <AllowedTools
                    user={props.user}
                    accountableView={props.accountableView} 
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
                    <RequestTool
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
                        pendingRequestsQuery={{type: 'tool'}} 
                        listItem={ToolRequest}
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

export default Tools;