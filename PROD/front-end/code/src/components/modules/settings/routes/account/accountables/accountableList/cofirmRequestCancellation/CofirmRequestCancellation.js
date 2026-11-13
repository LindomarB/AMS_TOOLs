import React from 'react';
import Modal from '../../../../../../../Interface/modal/Modal';
import ButtonsContainer from '../../../../../../../Interface/containers/buttonsContainer/ButtonsContainer';
import Button from '../../../../../../../Interface/buttons/button/Button';
import Text from '../../../../../../../Interface/Text/Text';

function ConfirmRequestCancellation(props) {
    const handleOnConfirm = async () => {
        const res = await props.onConfirm();

        if(res.ok) {
            props.onClose();
        }
    }

    return (
        <Modal
            title='Request cancellation'
            titleIcon={{
                name: 'warning',
                color: 'yellow',
                filled: true,
                type: 'rounded',
                weight: 400
            }}
            onClose={props.onClose}
        >
            <Text weight={500}>
                {props.text}
            </Text>
            <ButtonsContainer>
                <Button
                    // className={style.button}
                    icon='close'
                    color='red'
                    onClick={props.onClose}
                >Cancel</Button>
                <Button
                    // className={style.button}
                    icon='confirm'
                    color='green'
                    onClick={handleOnConfirm}
                >Confirm</Button>
            </ButtonsContainer>
        </Modal>
    );
}

export default ConfirmRequestCancellation;