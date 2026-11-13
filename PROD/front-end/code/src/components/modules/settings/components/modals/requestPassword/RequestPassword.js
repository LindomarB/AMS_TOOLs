import react from 'react';
import Modal from '../../../../../Interface/modal/Modal';
import TextInput from '../../../../../Interface/inputs/textInput/TextInput';
import useInput from '../../../../../hooks/useInput';
import ButtonsContainer from '../../../../../Interface/containers/buttonsContainer/ButtonsContainer';
import Button from '../../../../../Interface/buttons/button/Button';
import InputButton from '../../../../../Interface/containers/inputButton/InputButton';
import style from './RequestPassword.module.css';
import Text from '../../../../../Interface/Text/Text';
import Warning from '../../../../../Interface/warning/Warning';
import Rule from '../../../../../Interface/rule/Rule';

function RequestPassword(props) {
    const password = useInput({
        name: 'password',
        required: true
    });

    const handleOnRemove = async () => {
        const res = await props.onRemove(password.value);

        if(res.ok) {
            props.onClose();
        }
    }

    return (
        <Modal
            className={style.RequestPassword}
            title='Remove access'
            titleIcon={{
                name: 'delete',
                color: 'red',
                filled: true,
                // type: 'rounded',
                weight: 400
            }}
            // subtitle={}
            warning='Removing an access from a user may result in the loss of some of your data.'
            onClose={props.onClose}
        >
            <Text>Type your password to procced and remove the user access.</Text>
            <TextInput
                className={style.input}
                autoFocus
                type='password'
                placeholder='Your password'
                input={password}
                onPressEnter={handleOnRemove}
            />
            <Button
                className={style.button}
                icon='delete'
                color='red'
                onClick={handleOnRemove}
                disabled={!password.isValid}
            >Remove</Button>
        </Modal>
    );
}

RequestPassword.defaultProps = {
    disableBackdropClose: true
}

export default RequestPassword;