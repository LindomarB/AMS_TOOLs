import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Interface/buttons/button/Button';
import Text from '../../../Interface/Text/Text';
import AccountRequestForm from './accountRequestForm/AccountRequestForm';
import style from './AccountRequest.module.css';
import RequestResponse from './requestResponse/RequestResponse';

function AccountRequest(props) {
    const [requestResponse, setRequestResponse] = useState(null);
    const navigate = useNavigate();
    
    const handleRequestResponse = (res) => {
        setRequestResponse(<RequestResponse res={res} />);
    }

    return (
        <>
            <Text className={style.title} size={24} align='center'>Access Request</Text>
            {requestResponse
                ? requestResponse
                : <AccountRequestForm handleRequestResponse={handleRequestResponse}/>
            }
            <Button
                className={style.backButton}
                type={requestResponse? null : 'text'}
                color='blue'
                onClick={() => navigate('/portal')}
            >Back To Log In</Button>
        </>
    );
}

export default AccountRequest;