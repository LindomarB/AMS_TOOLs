import React, { useContext, useState, useEffect } from 'react';
import LoadableContent from '../../../../../Interface/containers/loadableContent/LoadableContent';
import RoleInfo from './roleInfo/RoleInfo';
import RoleChange from './roleChange/RoleChange';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import UserContext from '../../../../../context/userContext/UserContext';

function Role(props) {
    const [accountableOptions, setAccountableOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleChangeRequest, setRoleChangeRequest] = useState(null);
    const [accountableChangeRequestId, setAccountableChangeRequestId] = useState(null);
    const fetcher = useContext(FetcherContext);
    const user = useContext(UserContext).user;

    const fetchAccountableOptions = async (role) => {
        const res = await fetcher.getAccountableOptions({query: {role, userId: user._id}});

        let options = [];

        if(res.ok) {
            options = res.data.map(accountable => ({
                label: accountable.profile.name,
                value: accountable._id
            }));
        }

        setAccountableOptions(options);
    }

    useEffect(() => {
        const loadScreen = async () => {
            await fetchRoleChangeRequest();
            setLoading(false);
        }

        loadScreen();
    }, []);


    const fetchRoleChangeRequest = async (_id) => {
        const res = await fetcher.getRequests({query: {
            'requester._id': user._id,
            type: 'role change',
            status: {$in : ['pending', 'approval in progress']}
        }});
        
        setRoleChangeRequest(res.data[0]);
    }

    const handleOnCancelAccountableChangeRequest = async () => {
        const res = await fetcher.updateRequest({requestId: accountableChangeRequestId, response: 'cancel'});
        setAccountableChangeRequestId(null);
        return res.ok;
    }

    const handleOnSendRequest = async (newRole, newAccountable) => {
        const res = await fetcher.sendRequest({
            'requester': user._id,
            type: 'role change', 
            data: {
                newRole,
                newAccountable
            }
        });
        
        if(!res.ok) {
            if(res.data.accountableChangeRequestId) {
                setAccountableChangeRequestId(res.data.accountableChangeRequestId);
            }
        } else {
            setRoleChangeRequest(res.data.request)
        }

        return res.ok;
    }

    const handleOnCancelRequest = async () => {
        const res = await fetcher.updateRequest({requestId: roleChangeRequest._id, response: 'cancel'});

        if(res.ok) { 
            setRoleChangeRequest(null);
        };
    }

    const handleOnClickNo = () => {
        setAccountableChangeRequestId(false);
    }

    return (
        <LoadableContent loading={loading}>
            <RoleInfo role={user.profile.role} />
            <RoleChange 
                userRole={user.profile.role}
                accountableOptions={accountableOptions}
                roleChangeRequest={roleChangeRequest}
                accountableChangeRequestId={accountableChangeRequestId}
                fetchAccountableOptions={fetchAccountableOptions}
                onCancelAccountableChangeRequest={handleOnCancelAccountableChangeRequest}
                onSendRequest={handleOnSendRequest}
                onCancelRequest={handleOnCancelRequest}
                onClickNo={handleOnClickNo}
                awaitingResponse={fetcher.awaiting.sendRequest}
            />
        </LoadableContent>
     );
}

export default Role;