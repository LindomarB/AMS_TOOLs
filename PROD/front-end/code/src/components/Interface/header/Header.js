import React from 'react';
import Icon from '../icons/icon/Icon';
import Text from '../Text/Text';
import style from './Header.module.css';

function Header(props) {
    return (
        <header className={`${style.Header} ${props.rule? style.rule : ''} ${props.rule === 'strong'? style.strong : ''} ${props.className || ''}`} style={props.style || {}}>
            <Text className={`${style.text} ${props.textClassName || ''}`} size={18} color={props.color} weight={500} transform='capitalize' ellipsis {...props.textProps || {}}>
                {(props.icon || props.iconProps) &&
                    <Icon name={props.icon} size={24} color={props.color} weight={300} {...props.iconProps || {}}/>
                }
                {props.text}
            </Text>
            {props.children &&
                <div className={`${style.children} ${props.childrenContainerClassName || ''}`}>
                    {props.children}
                </div>
            }
        </header>
    );
}

Header.defaultProps = {
    color: 'black'
};

export default Header;