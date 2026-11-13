import React from 'react';
import Text from '../../../../../Interface/Text/Text';
import Icon from '../../../../../Interface/icons/icon/Icon';
import style from './Legend.module.css';

function Legend(props) {
    const legends = [
        {
            icon: 'you',
            color: 'darkOrange',
            label: 'You'
        },
        {
            icon: 'directly accountable',
            color: 'green',
            label: 'Directly accountable'
        },
        {
            icon: 'directly member',
            color: 'green',
            label: 'Direct member'
        }
    ].map(legend => (
        <div key={legend.icon} className={style.container}>
            <Icon 
                name={legend.icon} 
                color={legend.color} 
                size={18} 
                weight={400} 
                filled 
                border 
                invertColor 
                padding={4}
            />
            <Text color='black' size={12} weight={500}>
                {legend.label}
            </Text>
        </div>
    ));

    return (
        <div className={`${style.Legend} ${props.className || ''}`}>
            {legends}
        </div>
    );
}

export default Legend;