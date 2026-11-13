import React from 'react';
import Transition from '../transition/Transition';
import style from './FadeTransition.module.css';

function FadeTransition(props) {
    const transitionClassNames = {
        appear: style.appear,
        appearActive: style[`appearActive-${props.timeout}`],
        appearDone: style.appearDone,
        enter: style.enter,
        enterActive: style[`enterActive-${props.timeout}`],
        enterDone: style.enterDone,
        exit: style.exit,
        exitActive: style[`exitActive-${props.timeout}`],
        exitDone: style.exitDone,
    };

    return (
        <Transition {...props} transitionClassNames={transitionClassNames}/>
    );
}

FadeTransition.defaultProps = {
    timeout: 200
}

export default FadeTransition;
