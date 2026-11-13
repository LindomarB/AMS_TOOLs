import React from 'react';
import style from './SuccessfulMessage.module.css';
import Icon from '../../../../Interface/icons/icon/Icon';
import Text from '../../../../Interface/Text/Text';

function SuccessfulMessage(props) {
    return (
        <div className={style.SuccessfulMessage}>
            <Icon className={style.icon} name='recommend' color='green' size={64}/>
            <Text size={18}>
                We got your message!
            </Text>
            <Text color='grey'>
                Thank you for contacting us! We will contact you if we need more informantion.
            </Text>
        </div>
    );
}

export default SuccessfulMessage;