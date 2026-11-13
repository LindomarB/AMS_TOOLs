import React, { useContext, useEffect, useState } from 'react';
import SettingSection from '../../../../components/settingSection/SettingSection';
import Text from '../../../../../../Interface/Text/Text';
import Button from '../../../../../../Interface/buttons/button/Button';
import useInput from '../../../../../../hooks/useInput';
import FetcherContext from '../../../../../../context/fetcherContext/FetcherContext';
import Autocomplete from '../../../../../../Interface/inputs/autocomplete/Autocomplete';
import User from '../../../../../../Interface/listItems/user/User';
import Loading from '../../../../../../Interface/loaders/loading/Loading';
import Warning from '../../../../../../Interface/warning/Warning';
import Card from '../../../../../../Interface/card/Card';
import UserResume from '../../../../../../Interface/user/userResume/UserResume';
import useServerData from '../../../../../../hooks/useServerData';
import LoadableContent from '../../../../../../Interface/containers/loadableContent/LoadableContent';
import style from './AddAccountable.module.css';

function AddAccountable(props) {
    const [selectedAccountable, setSelectedAccountable] = useState();
    const [pendingRequests, setPendingRequests] = useState([]);
    const fetcher = useContext(FetcherContext);

    const accountableOptions = useServerData({
        fetcher: {
            method: 'getAccountableOptions',
        },
        keysets: {'profile.name': '$gt'}
    });

    const newAccountable = useInput({
        name: 'newAccountable', 
        required: true
    });

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    useEffect(() => {
        accountableOptions.updateQuery({
            $or: [
                {'profile.name': {$regex: newAccountable.value, $options: 'i'}},
                {'profile.email': {$regex: newAccountable.value, $options: 'i'}},
                {'profile.cargillId': {$regex: newAccountable.value, $options: 'i'}}
            ]
        });

        if(!newAccountable.value) {
            setSelectedAccountable(null);
        }
    }, [newAccountable.value]);

    const fetchPendingRequests = async () => {
        const res = await fetcher.getRequests({
            query: {
                'requester._id': props.user._id, 
                type: {$in : ['new accountable', 'accountable change', 'accountable removal']}, 
                status: {$in : ['pending', 'approval in progress']}
            }
        });

        if(res.ok) setPendingRequests(res.data);
    }

    const fetchAccountableInfo = async (accountableId) => {
        const res = await fetcher.getUsers(
            {
                query: {_id: accountableId},
                settings: {
                    projection: {
                        profile: 1,
                        accountables: 1,
                        settings: {
                            profile: {
                                avatarColor: 1
                            }
                        }
                    }
                }
            },
            {
                awaitingFlag: 'getAccountableInfo'
            }
        );

        if(res.ok) {
            newAccountable.setValue(res.data[0].profile.name);
            setSelectedAccountable(res.data[0]);
        }
    }

    const handleOnSendRequest = async () => {
        const res = await fetcher.sendRequest({
            requester: props.user._id, 
            type: 'new accountable', 
            data: {
                newAccountable: selectedAccountable._id
            }
        });
        
        if(res.ok || res.status === 499) {
            await props.onSendRequest(res.ok);
            newAccountable.reset();       
            setSelectedAccountable(null);
            fetchPendingRequests();
        }
    }

    let requestCancellationWarning = null;

    if(selectedAccountable) {
        const requestsToCancel = pendingRequests.filter(request => 
            request.type !== 'accountable removal' && selectedAccountable.accountables.some(accountable => request.data.newAccountable._id === accountable._id)
        );

        if(requestsToCancel) {
            requestCancellationWarning = [...requestsToCancel.map(request => {
                const requestAccountable = request.data.newAccountable.name;
                return `Upon proceeding, the new accountable request for ${requestAccountable} will be canceled. ${requestAccountable} is accountable for ${selectedAccountable.profile.name}, therefore, if this request is accepted, ${requestAccountable} will also be one of your accountables.`;
            })];
        }
    }

    const newAccountableOptions = accountableOptions.data.map(accountable => (
        <User 
            key={accountable._id}
            user={accountable}
            onClick={() => fetchAccountableInfo(accountable._id)}
        />
    ));

    // const fetchRoleChangeRequest = async () => {
    //     const res = await fetcher.getRequests({
    //         query: {
    //             'requester._id': props.user._id, 
    //             type: 'role change', 
    //             status: {$in : ['pending', 'approval in progress']}
    //         }
    //     });
    //     if(res.data.length) setHasRoleChangeRequest(true);
    // }

    // if(props.hasRoleChangeRequest) {
    //     return (
    //         <SettingSection title='Add Accountable'>
    //             <Text color='grey'>
    //                 You have a role change request in process. Await until it completes before requesting a new approver.
    //             </Text>
    //         </SettingSection> 
    //     );
    // }

    return (
        <LoadableContent loading={fetcher.awaiting.fetchPendingRequests || fetcher.awaiting.getAccountableOptions}>
            <SettingSection 
                className={style.settingSection} 
                childrenContainerClassName={style.settingSectionChildren}
                title='Add Accountable'
            >
                <Text color='grey'>
                    You can add new accountables to you. If the new accountable approves, you will be added to their team.
                </Text>
                <Autocomplete 
                    input={newAccountable}
                    placeholder='Select your new accountable'
                    options={newAccountableOptions}
                    onReachBottom={accountableOptions.getNext}
                    containerId='setting-container'
                    disabled={fetcher.awaiting.getAccountableInfo}
                />
                {fetcher.awaiting.getAccountableInfo &&
                    <Loading />
                }
                <Card className={style.userResume}>
                    <UserResume 
                        user={selectedAccountable}
                        notShow={{profile: ['name']}}
                        info={['profile']}
                        removeHeader
                    />
                </Card>
                {requestCancellationWarning &&
                    requestCancellationWarning.map((warning, idx) => (
                        <Warning key={idx} title border>
                            {warning}
                        </Warning>
                    ))
                }
                <Button 
                    className={style.sendButton}
                    icon='send' 
                    iconWeight={300} 
                    color='green' 
                    disabled={!newAccountable.isValid}
                    onClick={handleOnSendRequest}
                    awaiting={fetcher.awaitingResponse.sendRequest}
                >Send Request</Button>
            </SettingSection>     
        </LoadableContent>
     );
}

export default AddAccountable;