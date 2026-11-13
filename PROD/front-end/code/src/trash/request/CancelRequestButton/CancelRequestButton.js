import React from 'react';
import ConfirmationPopBox from '../../popBox/confirmation/ConfirmationPopBox';

import style from './CancelRequestButton.module.css';

function CancelRequestButton(props) {
    return (
        <ConfirmationPopBox 
            buttonClassName={style.CancelRequestButton}
            textClassName={style.text}
            label='Cancel Request'
            icon='close'
            question='Do you really want to cancel this request?'
            onClickYes={props.onClickYes}
        />
    );
}

export default CancelRequestButton