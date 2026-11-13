import React, { useContext } from 'react';
import AppContext from '../../context/appContext/AppContext';
import UserContext from '../../context/userContext/UserContext';
import Info from './info/Info';
import Meta from './meta/Meta';
import style from './Request.module.css';
import Requester from './requester/Requester';
import Respond from './respond/Respond';
import ExpirationWarning from './expirationWarning/ExpirationWarning';
import Button from '../buttons/button/Button';
import CancelRequest from './cancelRequest/CancelRequest';

function Request(props) {
    const lang = useContext(AppContext).currentLanguage;
    const user = useContext(UserContext).user;

    const pendingResponse = props.data.approvers.find(approver => approver._id === user._id && !approver.response);

    const componentProps = {
        request: props.data,
        lang
    };

    return (
        <div className={style.Request}>
            <Info {...componentProps}/>
            <Requester {...componentProps}/>
            <Meta {...componentProps}/>
            {['pending', 'approval in progress'].includes(props.data.status) && pendingResponse && 
                <Respond {...componentProps} onRespond={props.onRespond}/>
            }
            <ExpirationWarning {...componentProps}/>
            {user._id === props.data.requester._id &&
                <CancelRequest {...componentProps} onCancel={props.onRespond}/>
            }
        </div>
    );
}

export default Request;