import React from 'react';
import Button from '../../../../../Interface/buttons/button/Button';
import ButtonsContainer from '../../../../../Interface/containers/buttonsContainer/ButtonsContainer';
import Modal from '../../../../../Interface/modal/Modal';
import Text from '../../../../../Interface/Text/Text';

function BackConfirmation(props) {
    return (
        <Modal
            title='Unsaved Resolution'
            titleIcon={{name: 'unsaved'}}
            onClose={props.onClose}
        >
            <Text align='center' weight={600}>
                Your resolution is not saved.<br/>
                Do you want to discard your changes?
            </Text>
            <ButtonsContainer>
                  <Button
                    icon='delete'
                    color='red'
                    onClick={props.onDiscardChanges}
                >Discard</Button>
                <Button
                    icon='save'
                    color='blue'
                    onClick={props.onSaveChanges}
                    disabled={props.saveDisabled}
                >Save</Button>
            </ButtonsContainer>
        </Modal>
    );
}

export default BackConfirmation;