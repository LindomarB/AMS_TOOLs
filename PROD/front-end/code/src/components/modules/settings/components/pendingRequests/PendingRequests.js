import React, { useContext, useEffect, useState } from "react";
import FetcherContext from "../../../../context/fetcherContext/FetcherContext";
import List from "../../../../Interface/list/List";
import SettingSection from "../settingSection/SettingSection";
import InfoDrawer from "../../../../Interface/drawer/infoDrawer/InfoDrawer";
import Request from "../../../../Interface/request/Request";

function PendingRequests(props) {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [currentRequest, setCurrentRequest] = useState();
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchPendingRequests();
        props.onRefreshData && props.onRefreshData(fetchPendingRequests);
    }, []);

     useEffect(() => {
        const request = currentRequest && pendingRequests.find(request => request._id === currentRequest._id);
        setCurrentRequest(request);
    }, [pendingRequests]);

    const fetchPendingRequests = async () => {
        const res =  await fetcher.getRequests(
            {query: {
                ...props.pendingRequestsQuery,
                'requester._id': props.user._id,
                status: {$in: ['pending', 'approval in progress']}
            }}, 
            {awaitingFlag: 'fetchPendingRequests'}
        );

        if(!res.ok) return;

        setPendingRequests(res.data);
    }

    const handleOnCancelRequest = async (requestId,) => {
        const res = await fetcher.updateRequest({requestId, response: 'cancel'});

        if(res.ok || res.status === 499) {
            handleOnRespondRequest();
        }
    }

    const handleOnRespondRequest = async () => {
        await fetchPendingRequests();
        props.onRespondRequest && await props.onRespondRequest();
    }

    const handleOnClickRequest = (request) => {
        if(currentRequest && currentRequest._id === request._id) {
            setCurrentRequest(null);
        } else {
            setCurrentRequest(request);
        }
    }

    const handleOnCloseRequest = () => {
        setCurrentRequest(null);
    }

    const requests = pendingRequests.map(request => {
        return (
            <props.listItem
                key={request._id}
                request={request}
                onCancel={props.accountableView? null : () => handleOnCancelRequest(request._id)}
                onClick={() => handleOnClickRequest(request)}
                popBoxcontainerId='setting-container'
                active={currentRequest && currentRequest._id === request._id}
            />
        );
    });

    return (
        <SettingSection title='Pending Requests' style={{flexGrow: 1}}>
            <List 
                style={{alignSelf: 'stretch', flexGrow: 1}}
                hoverEffect
                noDataIcon='no request'
                noDataMessage={`${props.accountableView? 'No' : 'You have no'}  pending requests`}
                loading={fetcher.awaiting.fetchPendingRequests}
            >
                {requests}
            </List>
            <InfoDrawer
                header={{
                    text: 'Request Details'
                }}
                elementKey={currentRequest && currentRequest._id}
                onClose={handleOnCloseRequest}
            >
                {currentRequest &&
                    <Request 
                        data={currentRequest} 
                        onRespond={handleOnRespondRequest}
                    />
                }
            </InfoDrawer>
        </SettingSection>
    );
}

export default PendingRequests;