import React from 'react';
import Backdrop from '../../Interface/backdrop/Backdrop';

function AppModal(props) {
    const handleOnClose = () => {
        props.children.props.onClose();
    }

    const disableBackdropClose = props.children && props.children.props.disableBackdropClose;

    return (
        <Backdrop onClick={disableBackdropClose? null : handleOnClose}>
            {props.children}
        </Backdrop>
    );

}

export default AppModal;