import React from 'react';
import AccountableList from './accountableList/AccountableList';
import PendingRequests from '../../../components/pendingRequests/PendingRequests';
import AccountableRequest from './accountableRequest/AccountableRequest';
import AddAccountable from './addAccountable/AddAccountable';
import Accesses from '../../../components/accesses/Accesses';

function Accountables(props) {
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
            text: props.accountableView? 'Accountables' : 'Your Accountables',
            element: (
                <AccountableList 
                    user={props.user}
                    accountableView={props.accountableView} 
                    onSendRequest={onSendRequest} 
                    refreshData={onRefreshData}
                />
            )
        }
    ];

    if(!props.accountableView) {
        tabs.push({
            text: 'Add Accountable',
            element: (
                <AddAccountable
                    user={props.user}
                    onSendRequest={onSendRequest}
                />
            )
        });
    }

    tabs.push({
        text: 'Pending Requests',
        element: (
            <PendingRequests
                user={props.user}
                pendingRequestsQuery={{type: {$in : ['new accountable', 'accountable change', 'accountable removal']}}} 
                onRespondRequest={onRefreshData}
                accountableView={props.accountableView} 
                listItem={AccountableRequest}
            />
        )
    });

    return (
        <Accesses 
            tabs={tabs}
            refreshUser={props.refreshUser}
        />
     );
}

export default Accountables;