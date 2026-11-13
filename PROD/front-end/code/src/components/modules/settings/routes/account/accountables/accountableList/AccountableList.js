import React, { useContext, useEffect, useState} from 'react';
import List from '../../../../../../Interface/list/List';
import sortByField from '../../../../../../../functions/array/sortByField';
import Accountable from './accountable/Accountable';
import FetcherContext from '../../../../../../context/fetcherContext/FetcherContext';
import ConfirmRequestCancellation from './cofirmRequestCancellation/CofirmRequestCancellation';
import ModalContext from '../../../../../../context/modalContext/ModalContext';
import AccountableChange from '../accountableChange/AccountableChange';
import InfoDrawer from '../../../../../../Interface/drawer/infoDrawer/InfoDrawer';
import UserResume from '../../../../../../Interface/user/userResume/UserResume';
import SettingSection from '../../../../components/settingSection/SettingSection';
import LoadableContent from '../../../../../../Interface/containers/loadableContent/LoadableContent';
import style from './AccountableList.module.css';

function AccountableList(props) {
    const [accountableInfo, setAccountableInfo] = useState();
    const [pendingRequests, setPendingRequests] = useState([]);
    const modalCtx = useContext(ModalContext);
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchPendingRequests();
    }, []);

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

    const selectAccountable = async (event, accountable) => {
        event.stopPropagation();
        await props.refreshData();

        modalCtx.show((
            <AccountableChange
                accountable={accountable}
                onChange={handleOnChangeAccountable}
            />
        ));
    }

    const handleOnChangeAccountable = async (currentAccountable, newAccountable, cancelPendingRequest) => {
        const res = await fetcher.sendRequest({
            requester: props.user._id, 
            type: 'accountable change', 
            data: {
                currentAccountable: currentAccountable._id,
                newAccountable: newAccountable._id,
                cancelPendingRequest
            },
        });

        if(res.data.pendingRequest) {
            modalCtx.show((
                <ConfirmRequestCancellation
                    text={`You have a pending removal request for ${currentAccountable.name}.\nIn order to proceed with the change request, this request must be cancelled.`}
                    onConfirm={() => handleOnChangeAccountable(currentAccountable, newAccountable, true)}
                />
            ));
        } else {
            props.onSendRequest(res.ok);
            fetchPendingRequests();
        }

        return res;
    }

    const handleOnRemoveAccountable = async (accountable, cancelPendingRequest) => {
        const res = await fetcher.sendRequest({
            requester: props.user._id, 
            type: 'accountable removal', 
            data: {
                accountable: accountable._id,
                cancelPendingRequest
            },
        });

        if(res.data.pendingRequest) {
            modalCtx.show((
                <ConfirmRequestCancellation
                    text={`You have a pending change request for ${accountable.name}.\nIn order to proceed with the removal request, this request must be cancelled.`}
                    onConfirm={() => handleOnRemoveAccountable(accountable, true)}
                />
            ));
        } else {
            props.onSendRequest(res.ok);
        }

        return res;
    }

    const handleOnClick = (accountable) => {
        if(accountableInfo && accountableInfo._id === accountable._id) {
            setAccountableInfo(null);
        } else {
            setAccountableInfo(accountable);
        }
    }

    const handleOnClose = () => {
        setAccountableInfo(null);
    }

    const accountables = sortByField(props.user.accountables, 'name').map(accountable => {
        const removalRequested = pendingRequests.some(request => request.type === 'accountable removal' && request.data.accountable._id === accountable._id);
        const changeRequested = pendingRequests.some(request => request.type === 'accountable change' && request.data.currentAccountable._id === accountable._id);

        return (
            <Accountable 
                key={accountable._id}
                accountable={accountable}
                popBoxcontainerId='setting-container'
                onChange={props.accountableView? null : (event) => selectAccountable(event, accountable)}
                onRemove={props.accountableView || props.user.accountables.length < 2? null : () => handleOnRemoveAccountable(accountable)}
                removalRequested={removalRequested}
                changeRequested={changeRequested}
                active={accountableInfo && accountableInfo._id === accountable._id}
                onClick={() => handleOnClick(accountable)}
            />
        );
    });

    return (
        <LoadableContent loading={fetcher.awaiting.fetchPendingRequests}>
            <SettingSection title='Accountables' style={{flexGrow: 1, height: 0}}>
                <List 
                    className={style.list}
                    noDataIcon='no user'
                    noDataMessage='You have no accountables' 
                    hoverEffect 
                >
                    {accountables}
                </List>   
                <InfoDrawer
                    header={{
                        text: 'Accountable Details'
                    }}
                    elementKey={accountableInfo && accountableInfo._id}
                    onClose={handleOnClose}
                >
                    {accountableInfo &&
                        <UserResume
                            className={style.userResume}
                            user={accountableInfo}
                            info={['profile']}
                            notShow={{
                                profile: ['user photo']
                            }}
                        />
                    }
                </InfoDrawer> 
            </SettingSection>
        </LoadableContent>
     );
}

export default AccountableList;