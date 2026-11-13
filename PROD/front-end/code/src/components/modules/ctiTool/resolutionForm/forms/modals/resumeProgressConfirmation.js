import React from 'react';
import Button from '../../../../../Interface/buttons/button/Button';
import ButtonsContainer from '../../../../../Interface/containers/buttonsContainer/ButtonsContainer';
import Modal from '../../../../../Interface/modal/Modal';
import Text from '../../../../../Interface/Text/Text';

function ResumeProgressConfirmation(props) {
    return (
        <Modal
            title='Resume Resolution Progress'
            titleIcon={{name: 'resolution in progress'}}
            onClose={props.onClose}
        >
            <Text align='center' weight={600}>
                Do you want to resume the progress for this resolution?
            </Text>
            <ButtonsContainer>
                <Button
                    icon='close'
                    color='red'
                    onClick={props.onClose}
                >Cancel</Button>
                <Button
                    icon='resume'
                    color='green'
                    onClick={props.onResume}
                >Resume</Button>
            </ButtonsContainer>
        </Modal>
    );
}

export default ResumeProgressConfirmation;