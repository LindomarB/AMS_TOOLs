import React from 'react';
import Text from '../../../../Interface/Text/Text';
import style from './Application.module.css';
import capitalize from '../../../../../functions/text/capitalize';

function Application(props) {
    const textProps = {
        color: 'grey',
        weight: props.active? 600 : 400,
        ellipsis: true
    }

    return (
        <div className={style.Application}>
            <Text className={style.name}>
                <Text span {...textProps} color='absoluteBlack'>
                    {props.data.name}
                </Text>
                {props.data.status !== 'active' &&
                    <Text span size={12} weight={500}>
                        {capitalize(props.data.status)}
                    </Text>
                }
            </Text>
            <Text {...textProps} size={12}>{props.data.country.join(', ')}</Text>
            <Text {...textProps} size={12}>{props.data['support group']}</Text>
        </div>
    );
}

export default Application;