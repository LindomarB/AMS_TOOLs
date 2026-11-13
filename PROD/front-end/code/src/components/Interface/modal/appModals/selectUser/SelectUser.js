import React, { useContext, useEffect, useState } from 'react';
import useInput from '../../../../hooks/useInput';
import useServerData from '../../../../hooks/useServerData';
import Modal from '../../../modal/Modal';
import Button from '../../../buttons/button/Button';
import Autocomplete from '../../../inputs/autocomplete/Autocomplete';
import User from '../../../listItems/user/User';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import style from './SelectUser.module.css';
import Card from '../../../card/Card';
import UserResume from '../../../user/userResume/UserResume';

function SelectUser(props) {
    const [selectedUser, setSelectedUser] = useState();
    const fetcher = useContext(FetcherContext);
    const options = useServerData({
        fetcher: {
            method: 'getuserOptions',
        },
        keysets: {'profile.name': '$gt'},
        querySettings: {
            sort: {
                'profile.name': 1
            }
        },
        ...props.useServerData
    });

    const user = useInput({
        name: 'user',
        required: true
    });

    useEffect(() => {
        options.updateQuery({
            ...props.query,
            $or: [
                {'profile.name': {$regex: user.value, $options: 'i'}},
                {'profile.email': {$regex: user.value, $options: 'i'}},
                {'profile.cargillId': {$regex: user.value, $options: 'i'}}
            ]
        });

        if(!user.value) {
            setSelectedUser(null);
        }
    }, [user.value]);

    const fetchUserInfo = async (userId, awaitingFlag = 'getUserInfo') => {
        const res = await fetcher.getUsers(
            {
                query: {_id: userId},
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
                awaitingFlag
            }
        );

        return res.ok? res.data[0] : null;
    }

    const handleOnConfirm = () => {
        props.onConfirm(selectedUser);
    }

    const handleOnSelectuser = async (userId) => {
        const userInfo= await fetchUserInfo(userId, 'getuserInfo');

        if(userInfo) {
            user.setValue(userInfo.profile.name);
            setSelectedUser(userInfo);
        }
    }

    const userOptions = options.data.map(user => (
        <User
            key={user._id}
            user={user}
            onClick={() => handleOnSelectuser(user._id)}
        />
    ));

    return (
        <Modal
            className={`${style.SelectUser} ${props.className}`}
            onClose={props.onClose}
            disableBackdropClose={props.disableBackdropClose}
            {...props.modal}
        >
            <Autocomplete
                input={user}
                options={userOptions}
                onReachBottom={options.getNext}
                disabled={fetcher.awaiting.getUserInfo}
                container={document.body}
                {...props.input}
            />
            <Card className={style.userResume}>
                <UserResume
                    noUserMessage={props.noUserMessage}
                    loading={fetcher.awaiting.getuserInfo}
                    user={selectedUser}
                    notShow={{profile: ['name']}}
                    info={['profile']}
                    removeHeader
                />
            </Card>
            <Button
                className={style.button}
                color='green'
                highlight
                onClick={handleOnConfirm}
                disabled={!selectedUser}
                {...props.button}
            >{props.button.text}</Button>
        </Modal>
    );
}

SelectUser.defaultProps = {
    useServerData: {},
    query: {},
    modal: {},
    input: {},
    noUserMessage: 'No user selected',
    button: {},
    disableBackdropClose: true
}

export default SelectUser;