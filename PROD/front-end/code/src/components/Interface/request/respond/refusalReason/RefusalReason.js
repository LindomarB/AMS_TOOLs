import React from 'react';
import useInput from '../../../../hooks/useInput';
import Button from '../../../buttons/button/Button';
import TextInput from '../../../inputs/textInput/TextInput';
import Modal from '../../../modal/Modal';
import style from './RefusalReason.module.css';
import Text from '../../../Text/Text';

function RefusalReason(props) {
    const reason = useInput({
        name: 'reason',
        initialValue: props.refusalReason || ''
    });

    const handleOnRefuse = () => {
        props.onRefuse(reason.value);
    }

    return (
        <Modal
            title='Refusal Reason'
            titleIcon={{name: 'refuse', color: 'red'}}
            warning='Refusing a request does not prevent the user from retrying it'
            warningProps={{
                level: 'low',
                title: 'Notice'
            }}  
            onClose={props.onClose}
        >
            <Text>{`Give a reason is optional, but it will help ${props.requester} understand what is wrong with the request.`}</Text>
            <TextInput
                className={style.input}
                labelClassName={style.label}
                type='area'
                input={reason}
                placeholder='Please inform why you are refusing this request'
            />
            <Button
                className={style.button}
                icon='refuse'
                color='red'
                highlight
                onClick={handleOnRefuse}
            >Refuse</Button>
        </Modal>
    );
}

RefusalReason.defaultProps = {
    disableBackdropClose: true
};

export default RefusalReason;