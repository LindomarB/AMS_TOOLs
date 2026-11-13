import React, { useContext, useRef, useState } from 'react';
import AppContext from '../../../context/appContext/AppContext';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import useInput from '../../../hooks/useInput';
import Button from '../../buttons/button/Button';
import TextInput from '../../inputs/textInput/TextInput';
import Processing from '../../loaders/processing/Processing';
import Rule from '../../rule/Rule';
import Text from '../../Text/Text';
import RefusalReason from './refusalReason/RefusalReason';
import style from './Respond.module.css';
import UserContext from '../../../context/userContext/UserContext';

function Respond(props) {
    const [processing, setProcessing] = useState(false);
    const appCtx = useContext(AppContext);
    const userCtx = useContext(UserContext);
    const fetcher = useContext(FetcherContext);
    const refusalReason = useRef();

    const password = useInput({name: 'password', required: true});

    const handleOnRespond = async (response, reason) => {
        setProcessing(true);

        const res = await fetcher.updateRequest({
            requestId: props.request._id, 
            approverPassword: password.value, 
            response, 
            reason
        });

        if(res.ok || res.status === 499) {
            props.onRespond();
            userCtx.refresh();
            refusalReason.current = null;
        }

        refusalReason.current = reason;
        setProcessing(false);
    }

    const onCloseModal = () => {
        password.reset();
    }

    const onRefuse = (reason) => {
        handleOnRespond('refuse', reason);
        password.reset();
        appCtx.closeModal();
    }

    const handleOnRefuse = () => {
        appCtx.showModal(
            <RefusalReason 
                requester={props.request.requester.name} 
                refusalReason={refusalReason.current}
                onClose={onCloseModal} 
                onRefuse={onRefuse}
            />
        );
    }

    return (
        <>
            <Rule />
            <Text size={16} weight={500}>Respond to request</Text>
            <TextInput
                type='password'
                input={password}
                placeholder='Type your password to proceed' 
            />
            <div className={style.buttonsContainer}>
                {processing
                    ? <Processing />
                    : <>
                        <Button 
                            icon='refuse' 
                            color='red' 
                            disabled={!password.isValid} 
                            onClick={handleOnRefuse}
                        >Refuse</Button>
                        <Button 
                            icon='approve' 
                            color='green' 
                            disabled={!password.isValid} 
                            onClick={() => handleOnRespond('approve')}
                        >Approve</Button>
                    </>
                }
            </div>
        </>
    );
}

export default Respond;