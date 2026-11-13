import React from 'react';
import Button from '../../../../../Interface/buttons/button/Button';
import ButtonsContainer from '../../../../../Interface/containers/buttonsContainer/ButtonsContainer';
import Modal from '../../../../../Interface/modal/Modal';
import Text from '../../../../../Interface/Text/Text';

function DiscartProgressConfirmation(props) {
    return (
        <Modal
            title='Discart Progress'
            titleIcon={{
                name: 'delete',
                color: 'red'
            }}
            onClose={props.onClose}
        >
            <Text align='center' weight={600}>
                There is an unsaved resolution in progress.<br/>
                Do you want to discart it?
            </Text>
            <ButtonsContainer>
                <Button
                    icon='delete'
                    color='red'
                    onClick={props.onDiscart}
                >Discart</Button>
                <Button
                    icon='not_started'
                    color='blue'
                    onClick={props.onResume}
                >Resume</Button>
              
            </ButtonsContainer>
        </Modal>
    );
}

export default DiscartProgressConfirmation;