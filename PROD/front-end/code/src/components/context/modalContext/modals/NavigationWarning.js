import React from 'react';
import Button from '../../../Interface/buttons/button/Button';
import ButtonsContainer from '../../../Interface/containers/buttonsContainer/ButtonsContainer';
import Modal from '../../../Interface/modal/Modal';
import Text from '../../../Interface/Text/Text';

function NavigationWarning(props) {
    return (
        <Modal
            style={{minWidth: '400px'}}
            title='Page Leave'
            titleIcon={{name: 'warning', color: 'yellow', filled: true, type: 'rounded'}}
            onClose={props.onClose}
        >
            <Text align='center' weight={600}>
                Do you really want to leave this page?<br/>
                Any unsaved changes will be lost.
            </Text>
            <ButtonsContainer>
                <Button
                    icon='close'
                    color='red'
                    onClick={props.onClose}
                >Cancel</Button>
                <Button
                    icon='confirm'
                    color='blue'
                    onClick={props.onLeave}
                >Leave</Button>
            </ButtonsContainer>
        </Modal>
    );
}

export default NavigationWarning;