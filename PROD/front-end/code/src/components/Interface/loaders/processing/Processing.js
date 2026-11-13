import React from 'react';

function Processing(props) {
    return (
        <p className={props.className || ''} style={{margin: '0'}}>
            Processing...
        </p>
    );
}

export default Processing;