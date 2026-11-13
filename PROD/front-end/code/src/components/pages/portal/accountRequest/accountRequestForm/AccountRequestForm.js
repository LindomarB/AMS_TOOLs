import React, {useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../../../context/appContext/AppContext';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import Form from '../../../../Interface/form/Form';
import style from './AccountRequestForm.module.css';
import CTIApplicationPermission from './sections/CTIApplicationPermission';
import Password from './sections/Password';
import Profile from './sections/Profile';
import RefusedRequest from './sections/RefusedRequest';
import Role from './sections/Role';

function AccountRequestForm(props) {
    const [prevRefusedRequest, setPrevRefusedRequest] = useState(null);
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);
    const formEl = useRef();

    useEffect(() => {
        if(prevRefusedRequest) {
            formEl.current.changeSection('refused request');
        }
    }, [prevRefusedRequest]);

    const handleOnSubmit = async (form) => {
        const data = {
            profile: {
                ...form.values.profile,
                role: form.values.role.role
            },
            accesses: form.values.role.accesses,
            accountable: form.values.role.accountable,
            ...form.values.password
        };

        if(form.values.role.role !== 'administrator' && form.values['cti applications']) {
            data.ctiApplications = form.values['cti applications'].applications;
        }

        const res = await fetcher.sendAccountRequest(
            {
                data, 
                skipPrevRequestsValidation: prevRefusedRequest? true : false
            },
            {
                showErrorNotification: false,
                showSuccessfulNotification: false
            }
        );

        if(!res.ok && res.status !== 499) {
            appCtx.notify({type: 'error', message: res.error});
            return;
        }

        if(res.data.status === 'refused') {
            setPrevRefusedRequest(res.data);
        } else {
            props.handleRequestResponse(res.data);
        }
    }

    return (
        <div className={style.AccountRequestForm}>
            <Form 
                ref={formEl}
                className={style.form} 
                sectionClassName={style.section} 
                buttonClassName={style.formButton}
                conditions={{prevRefusedRequest}}
                sectionProps={{
                    'refused request': {
                        res: prevRefusedRequest
                    }
                }}
                onSubmit={handleOnSubmit}
                submitButton={{waiting: fetcher.awaitingResponse}}
            >
                <Profile />
                <Role />
                <CTIApplicationPermission />
                <Password />
                <RefusedRequest />
            </Form>
        </div>
    );
}

export default AccountRequestForm;