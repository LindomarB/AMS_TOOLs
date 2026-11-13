import React from 'react';
import Text from '../Text/Text';
import style from './Banner.module.css';
import Icon from '../icons/icon/Icon';

function Banner(props) {
    return (
        <div 
            className={`${style.Banner} ${props.className || ''}`}
            style={{backgroundImage: `url(${props.image})`, ...props.style || {}}}
        >
            <div 
                className={`${style.content} ${props.contentClassName || ''}`}
                style={{backgroundImage: props.gradient}}
            >
                <Text className={`${style.title} ${props.titleClassName || ''}`} size={32} color={props.textColor} weight={600} >
                    {props.icon &&
                        <Icon name={props.icon} size={40} color={props.textColor} {...props.iconProps || {}}/>
                    }
                    {props.title}
                </Text>
                {props.subtitle &&
                    <Text size={16} color={props.textColor} weight={400}>{props.subtitle}</Text>
                }
                {props.children}
            </div>
        </div>
    );
}

Banner.defaultProps = {
    textColor: 'white',
    gradient: 'linear-gradient(to right, #070F21 50%, #070f2100 75%)'
};

export default Banner;
