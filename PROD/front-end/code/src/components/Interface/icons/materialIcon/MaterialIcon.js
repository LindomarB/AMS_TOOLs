import React from 'react';

function MaterialIcon(props) {
    const {type, name, style} = props;

    return (
        <span 
            className={`material-icons${type? `-${type}` : ''} ${props.className || ''}`}
            style={style || {}}
        >
            {name}
        </span>
    );
}

export default MaterialIcon;