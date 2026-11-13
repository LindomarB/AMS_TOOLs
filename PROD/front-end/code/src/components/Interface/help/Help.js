import React from 'react';
import PopBox from '../popBox/PopBox';
import Text from '../Text/Text';
import style from './Help.module.css';

function Help(props) {
    const content = props.content.map(content => (
        <div key={content.title} className={style.content}>
            <Text className={style.title} weight={500}>
                {content.title}
            </Text>
            <Text color='grey'>
                {content.text}
            </Text>
        </div>
    ));

    return (
        <PopBox
            className={`${style.Help} ${props.className || ''}`}
            horizontalAlign='right'
            allowResizing
            button={{
                type: 'icon',
                icon: 'help',
                tooltip: 'Help',
            }}
        >
            {content}
        </PopBox>
    );
}

export default Help;