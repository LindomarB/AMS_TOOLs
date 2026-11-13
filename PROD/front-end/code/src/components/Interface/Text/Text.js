import React from 'react';
import style from './Text.module.css';
import colors from '../../generalStyles/colors.module.css';

function Text(props) {
    const fontStyle = {};

    if(props.size) {
        fontStyle.fontSize = `${props.size / 16}rem`;
    }

    if(props.weight) {
        fontStyle.fontWeight = props.weight;
    }

    if(props.align) {
        fontStyle.textAlign = props.align;
    }

    if(props.transform) {
        fontStyle.textTransform = props.transform;
    }

    const className = `${style.Text} ${colors[props.color]} ${props.ellipsis? style.ellipsis : ''} ${props.oneLine? style.oneLine : ''} ${props.className || ''}`;
    const title = props.title || props.ellipsis? props.children : null;

    if(props.span) {
        return (
            <span 
                className={className}
                style={{...fontStyle, ...props.style || {}}}
                title={title}
            >
                {props.children}
            </span>
        );
    }

    if(props.li) {
        return (
            <li 
                className={className}
                style={{...fontStyle, ...props.style || {}}}
                title={title}
            >
                {props.children}
            </li>
        );
    }

    if(props.pre) {
        return (
            <pre 
                className={className}
                style={{...fontStyle, ...props.style || {}}}
                title={title}
            >
                {props.children}
            </pre>
        );
    }


    return (
        <p 
            className={className}
            style={{...fontStyle, ...props.style || {}}}
            title={title}
        >
            {props.children}
        </p>
    );
}

Text.defaultProps = {
    color: 'black'
};

export default Text;