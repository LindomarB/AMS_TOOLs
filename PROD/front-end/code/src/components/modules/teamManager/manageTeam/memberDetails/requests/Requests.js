import React from 'react';
import RequestList from '../../../../../Interface/requestList/RequestList';
import UserRequest from '../../../../../Interface/requestList/userRequest/UserRequest';

function Requests(props) {
    return (
        <RequestList
            header={'Requests'} 
            listItem={<UserRequest />}
            query={{'requester._id': props.member._id}}
            filters={['date', 'status', 'type']}
        />
    );
}

export default Requests;