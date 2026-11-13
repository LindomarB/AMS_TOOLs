import React, { useRef } from 'react';
// import { useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

function Transition(props) {
    const switcher = useRef(true);
    // const outlet = useOutlet();

    switcher.current = !switcher.current;
    const transitionClassNames = props.transitionClassNames;
    const key = props.currentElementKey || switcher.current;
    const TransitionElement = props.switchTransition? SwitchTransition : TransitionGroup;
    // const element = props.children.type.name === 'Outlet'? outlet : props.children;

    return (
        <TransitionElement component={props.component || null} className={props.className} childFactory={props.childFactory}>
            <CSSTransition
                key={key}
                mountOnEnter={props.mountOnEnter}
                unmountOnExit={props.unmountOnExit}
                timeout={{
                    appear: props.timeout,
                    enter: props.timeout,
                    exit: props.timeout
                }}
                appear
                classNames={transitionClassNames}
                >
                    <>
                        {props.children}
                    </>
            </CSSTransition>
        </TransitionElement>
    );
}

Transition.defaultProps = {
    mountOnEnter: true,
    unmountOnExit: true
};

export default Transition;
