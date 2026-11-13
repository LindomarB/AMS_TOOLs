import React, { useContext } from 'react';
import Button from '../../buttons/button/Button';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import ModalContext from '../../../context/modalContext/ModalContext';
import CancelRequestConfirmation from './CancelRequestConfirmation';

function CancelRequest(props) {
    const fetcher = useContext(FetcherContext);
    const modalCtx = useContext(ModalContext);

    if(props.request.status !== 'pending' && props.request.status !== 'approval in progress') return null;

    const handleOnCancel = async () => {
        modalCtx.show(
            <CancelRequestConfirmation onCancel={onCancelRequest}/>
        );
    }

    const onCancelRequest = async () => {
        const res = await fetcher.updateRequest({
            requestId: props.request._id, 
            response: 'cancel'
        });

        if(res.ok || res.status === 499) {
            modalCtx.close();
        }

        props.onCancel && props.onCancel(res);
    }

    return (
        <Button 
            style={{marginTop: '1rem'}}
            icon='cancel request' 
            color='red'
            onClick={handleOnCancel}
        >
            Cancel Request
        </Button>
    );
}

export default CancelRequest;