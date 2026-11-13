import React from 'react';
import Button from '../../buttons/button/Button';
import ButtonsContainer from '../../containers/buttonsContainer/ButtonsContainer';
import Modal from '../../modal/Modal';
import Text from '../../Text/Text';

function CancelRequestConfirmation(props) {
    return (
        <Modal
            title='Cancel Request'
            titleIcon={{name: 'cancel request'}}
            onClose={props.onClose}
        >
            <Text align='center' weight={600}>
                Do you really want to cancel this request?
            </Text>
            <ButtonsContainer>
                  <Button
                    icon='close'
                    color='red'
                    onClick={props.onClose}
                >No</Button>
                <Button
                    icon='confirm'
                    color='green'
                    onClick={props.onCancel}
                >Yes</Button>
            </ButtonsContainer>
        </Modal>
    );
}

export default CancelRequestConfirmation;