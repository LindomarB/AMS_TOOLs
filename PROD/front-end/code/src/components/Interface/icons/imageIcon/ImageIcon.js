import React from 'react';
import style from './ImageIcon.module.css';

function ImageIcon(props) {
    return (
        <img 
            className={`${style.ImageIcon} ${props.className || ''}`}
            style={props.style || {}}
            src={`/images/icons/${props.fileName}`}
        />
    );
}

export default ImageIcon;