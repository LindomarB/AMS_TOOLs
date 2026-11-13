import React from 'react';
import Button from '../../../../../Interface/buttons/button/Button';
import ButtonsContainer from '../../../../../Interface/containers/buttonsContainer/ButtonsContainer';
import Modal from '../../../../../Interface/modal/Modal';
import Text from '../../../../../Interface/Text/Text';

function DeleteConfirmation(props) {
    return (
        <Modal
            title='Delete Resolution'
            titleIcon={{name: 'resolution'}}
            onClose={props.onClose}
        >
            <Text align='center' weight={600}>
                Do you want to delete this resolution?<br/>
                <Text span align='center'>This action cannot be undone.</Text>
            </Text>
            <ButtonsContainer>
                <Button
                    icon='close'
                    color='red'
                    onClick={props.onClose}
                >Cancel</Button>
                <Button
                    icon='delete'
                    color='blue'
                    onClick={props.onDelete}
                >Delete</Button>
            </ButtonsContainer>
        </Modal>
    );
}

export default DeleteConfirmation;