import React from 'react';
import passwordValidation from '../../../../functions/inputValidation/passwordValidation';
import Icon from '../../icons/icon/Icon';
import Text from '../../Text/Text';
import style from './PasswordConditions.module.css';

function PasswordConditions(props) {
    const validation = passwordValidation(props.newPassword);
    delete validation.isValid;

    const conditionsLabel = {
        length: 'at least 8 characters',
        uppercase: 'at least 1 uppercase letter',
        lowercase: 'at least 1 lowercase letter',
        number: 'at least 1 number',
        'special characters': 'at least 1 special character',
        'white space': 'No white spaces'
    };

    const passwordConditions = [];

    for(let condition in validation) {
        const conditionMet = props.newPassword && validation[condition];

        passwordConditions.push((
            <div key={condition} className={style.condition}>
                {conditionMet
                    ? <Icon name='check_circle' color='green' weight={300}/>
                    : <Icon name='close' color='lightGrey' weight={300}/>
                }
                <Text>{conditionsLabel[condition]}</Text>
            </div>
        ));
    }

    return (
        <div className={style.PasswordConditions}>
            {passwordConditions}
        </div>
    );
}

export default PasswordConditions;