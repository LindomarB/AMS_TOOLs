import React, { useContext } from 'react';
import UserContext from '../../../../../context/userContext/UserContext';
import RequestList from '../../../../../Interface/requestList/RequestList';
import UserRequest from '../../../../../Interface/requestList/userRequest/UserRequest';

function Requests(props) {
    const user = useContext(UserContext).user;

    return (
        <RequestList 
            header={'Requests'} 
            listItem={<UserRequest />}
            query={{'requester._id': user._id, type: {$not: {$eq: 'new account'}}}}
            filters={['date', 'status', 'type']}
        />
    );
}

export default Requests;