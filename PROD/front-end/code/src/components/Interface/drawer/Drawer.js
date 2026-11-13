import React from 'react';
import style from './Drawer.module.css';

function Drawer(props) {
    return (
        <div
            className={`${style.Drawer} ${style[props.position]} ${props.noOverlap? style.noOverlap : ''} ${props.open? style.opened : style.closed} ${props.className || ''} `} 
            style={props.style || {}}
        >
            {props.children}
        </div>
    );
}

Drawer.defaultProps = {
    position: 'right'
};

export default Drawer;