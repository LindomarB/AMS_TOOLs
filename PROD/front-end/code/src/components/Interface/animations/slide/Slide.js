import React from 'react';
import Transition from '../transition/Transition';
import style from './Slide.module.css';

function Slide(props) {
    const transitionClassNames = {
        appear: style[`appear-${props.direction}`],
        appearActive: style[`appearActive-${props.direction}`],
        appearDone: style.appearDone,
        enter: style[`enter-${props.direction}`],
        enterActive: style[`enterActive-${props.direction}`],
        enterDone: style.enterDone,
        exit: style.exit,
        exitActive: style[`exitActive-${props.direction}`],
        exitDone: style[`exitDone-${props.direction}`],
    };

    const childFactory = (child) => {
        return React.cloneElement(child, {classNames: transitionClassNames});
    }

    return (
        <Transition 
            {...props} 
            component='div' 
            className={`${style.container} 
            ${props.className || ''}`} 
            timeout={200} 
            transitionClassNames={transitionClassNames} 
            childFactory={childFactory}
        >
            <props.children.type 
                {...props.children.props} 
                className={`${style.children} ${props.children.props.className || ''}`}
            />
        </Transition>
    );
}

Slide.defaultProps = {
    direction: 'left'
}

export default Slide;
