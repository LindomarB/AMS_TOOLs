import React from 'react';
import Button from '../../../../../Interface/buttons/button/Button';
import ButtonsContainer from '../../../../../Interface/containers/buttonsContainer/ButtonsContainer';
import Modal from '../../../../../Interface/modal/Modal';
import Text from '../../../../../Interface/Text/Text';

function ResetConfirmation(props) {
    return (
        <Modal
            title='Reset Resolution'
            titleIcon={{name: 'reset'}}
            onClose={props.onClose}
        >
            <Text align='center' weight={600}>
                Do you want to reset the resolution?<br/>
                Any unsaved progress will be lost.
            </Text>
            <ButtonsContainer>
                <Button
                    icon='close'
                    color='red'
                    onClick={props.onClose}
                >Cancel</Button>
                <Button
                    icon='reset'
                    color='blue'
                    onClick={props.onReset}
                >Reset</Button>
            </ButtonsContainer>
        </Modal>
    );
}

export default ResetConfirmation;