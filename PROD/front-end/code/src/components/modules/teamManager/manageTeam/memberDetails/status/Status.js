import React, { useContext, useEffect, useState } from 'react';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import LoadableContent from '../../../../../Interface/containers/loadableContent/LoadableContent';
import LockAccount from './lockAccount/LockAccount';
import UnlockAccount from './unlockAccount/UnlockAccount';

function Status(props) {
    const [loadingData, setLoadingData] = useState(true);
    const [accountableOptions, setAccountableOptions] = useState([]);
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        getAccountableOptions().
        then(() => setLoadingData(false));
    }, []);

    const onChangeUserStatus = async (params) => {
        await fetcher.updateUserStatus({userId: props.member._id, ...params});
        await props.onChangeUserStatus();
    }
    
    const getAccountableOptions = async () => {
        const res = await fetcher.getAccountableOptions({query: {userId: props.member._id}});
        setAccountableOptions(res.ok? res.data : [])
    }

    const componentProps = {
        member: props.member,
        onChangeUserStatus: onChangeUserStatus,
        awaitingResponse: fetcher.awaitingResponse
    }

    return (
        <LoadableContent loading={loadingData}>
            {props.member.status === 'locked'
                ? <UnlockAccount {...componentProps}/>
                : <LockAccount {...componentProps} accountableOptions={accountableOptions}/>
            }
        </LoadableContent>
    );
}

export default Status;