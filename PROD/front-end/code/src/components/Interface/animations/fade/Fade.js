import React from 'react';
import { CSSTransition } from 'react-transition-group';
import style from './Fade.module.css';

function Fade(props) {
    return (
        <CSSTransition
                in={props.in}
                timeout={200}
                appear
                mountOnEnter
                unmountOnExit
                classNames={{
                    appear: style.appear,
                    appearActive: style.appearActive,
                    appearDone: style.appearDone,
                    enter: style.enter,
                    enterActive: style.enterActive,
                    enterDone: style.enterDone,
                    exit: style.exit,
                    exitActive: style.exitActive,
                    exitDone: style.exitDone,
                }}
        >
            {props.children}
        </CSSTransition>
    );
}

export default Fade;