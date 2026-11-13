import React from 'react';
import style from './DotLoader.module.css';
import colors from '../../generalStyles/bgColors.module.css';

function DotLoader(props) {
    const dotsSize = {
        width: `${props.size}px`,
        height: `${props.size}px`,
    };

    const dotsGap = {
        columnGap: `${props.gap || (props.size / 2)}px`,
    };

    const dotProps = {
        className: `${style.dot} ${colors[props.color]}`,
        style: dotsSize,
    }

    return (
        <div className={style.DotLoader} style={dotsGap}>
            <div {...dotProps}></div>
            <div {...dotProps}></div>
            <div {...dotProps}></div>
        </div>
    );
}

DotLoader.defaultProps = {
    size: 8,
    color: 'blue'
}

export default DotLoader;