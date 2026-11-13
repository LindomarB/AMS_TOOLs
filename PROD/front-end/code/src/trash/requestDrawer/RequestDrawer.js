import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import FadeTransition from '../../components/Interface/animations/fadeTransition/FadeTransition';
import Button from '../../components/Interface/buttons/button/Button';
import Drawer from '../../components/Interface/drawer/Drawer';
import Header from '../../components/Interface/header/Header';
import Request from '../../components/Interface/request/Request';
import style from './RequestDrawer.module.css';

function RequestDrawer(props, ref) {
    const [show, setShow] = useState(false);
    const [request, setRequest] = useState(null);
    const timeout = useRef(null);

    useImperativeHandle(ref, () => ({
        showRequest,
        updateRequest,
        hideRequest,
        request
    }));

    const showRequest = (requestData) => {
        if(!show || !request || request._id !== requestData._id) {
            clearTimeout(timeout.current);
            setRequest(requestData);
            setShow(true);
            props.onShowRequest && props.onShowRequest();
        } else {
            hideRequest();
        }
    }

    const updateRequest = (requestData) => {
        if(requestData) {
            setRequest(requestData);
        } else {
            hideRequest();
        }
    }

    const hideRequest = () => {
        setShow(false);
        timeout.current = setTimeout(() => setRequest(null), 500);
    }

    return (
        <Drawer className={`${style.RequestDrawer} ${props.className || ''}`} style={props.style || {}} open={show && request}>
            {request && 
                <>
                    <Header text='Request Details' rule>
                        <Button type='icon' icon='close' color='lightGrey' iconWeight={300} onClick={hideRequest}/>
                    </Header>
                    <FadeTransition switchTransition currentElementKey={`${request._id}-${request.status}`}>
                        <Request data={request} onRespond={props.onRespond}/>
                    </FadeTransition>
                </>
            }
        </Drawer>
    );
}

export default forwardRef(RequestDrawer);