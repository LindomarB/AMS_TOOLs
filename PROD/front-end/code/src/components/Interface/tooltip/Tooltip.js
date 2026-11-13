import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './Tooltip.module.css';
import Text from '../Text/Text';

/*
    COMPONENT PROPS

    children (required): the component to which the tooltip will be applied
    content (required): the tooltip content (string or JSX element)
    position (optional): the tooltip position relative the component (top, left, right or bottom). Default is bottom.
    disabled (optional): disable the tooltip
    appearDelay (optional): the time in ms that the tooltip should wait before appear. Default is 0
    hideDelay (optional): the time in ms that the tooltip is visible before disappearing after the mouse leaves the component. Default is 200
    hideOnClick (optional): if true, the tooltip will disappear when the component is clicked
    holdWhenMouseOver (optional): if true, the tooltip will not disapear while the mouse is over it. Default is false
    hideArrow (optional): if true, the arrow will be hide. Deafult is false
    className (optional): the CSS class to be applied in the main component
    contentClassName (optional): the CSS class to be applied in the content container
    arrowClassName (optional): the CSS class to be applied in the arrows
    contentStyle (optional): the CSS style to be applied in the content container
*/

function Tooltip(props) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [arrowPosition, setArrowPosition] = useState({});
    const tooltipEl = useRef();
    const sourceElement = useRef();
    const tooltipAppearTimer = useRef(null);
    const tooltipHideTimer = useRef(null);

    useLayoutEffect(() => {
        if(!tooltipEl.current) return;

        const sourceCoords = sourceElementRef.current.getBoundingClientRect();
        const sourceElementXMiddle = sourceCoords.left + ((sourceCoords.right - sourceCoords.left) / 2) + window.scrollX;
        const sourceElementYMiddle = sourceCoords.top + ((sourceCoords.bottom - sourceCoords.top) / 2) + window.scrollY;
        const tooltipInfo = tooltipEl.current.getBoundingClientRect();

        const safetyMargin = 3;

        const availableLeftSpace = sourceElementXMiddle;
        const availableRightSpace = window.innerWidth - (props.position === 'bottom' || props.position === 'top'? sourceElementXMiddle : sourceCoords.right);
        const availableTopSpace = sourceElementYMiddle;
        const availableBottomSpace = window.innerHeight - (props.position === 'left' || props.position === 'right'? sourceElementYMiddle : sourceCoords.bottom);

        let position = props.position || 'bottom';

        const positionOrder = {
            bottom: {
                hasSpace: availableBottomSpace >= tooltipInfo.height + 8,
                next: props.position !== 'top'? 'top' : 'left'
            },
            top: {
                hasSpace: availableTopSpace >= tooltipInfo.height  + 8,
                next: props.position === 'top'? 'bottom' : 'left'
            },
            left: {
                hasSpace: availableLeftSpace >= tooltipInfo.width  + 8,
                next: props.position !== 'right'? 'right' : 'bottom'
            },
            right: {
                hasSpace: availableRightSpace >= tooltipInfo.width  + 8,
                next: props.position === 'right'? 'left' : 'bottom'
            }
        };

        while(true) {
            const currentPosition = positionOrder[position];

            if(!currentPosition) {
                position = props.position;
                break;
            }

            if(currentPosition.hasSpace) break;

            const prevPosition = position;
            position = currentPosition.next;
            delete positionOrder[prevPosition];
        }

        const margin = 8;

        switch(position) {
            case 'top':
                const topSpace = sourceCoords.top;

                if(topSpace < (tooltipInfo.height + margin)) {
                    tooltipInfo.height = topSpace - margin;
                }

                if(window.innerWidth < (tooltipInfo.width + margin)) {
                    tooltipInfo.width = window.innerWidth - margin;
                }

                break;
            case 'left':
                const leftSpace = sourceCoords.left;

                if(leftSpace < (tooltipInfo.width + margin)) {
                    tooltipInfo.width = leftSpace - margin;
                }

                if(window.innerHeight < (tooltipInfo.height + margin)) {
                    tooltipInfo.height = window.innerHeight - margin;
                }

                break;
            case 'right':
                const rightSpace = window.innerWidth - sourceCoords.right;

                if(rightSpace < (tooltipInfo.width + margin)) {
                    tooltipInfo.width = rightSpace - margin;
                }

                if(window.innerHeight < (tooltipInfo.height + margin)) {
                    tooltipInfo.height = window.innerHeight - margin;
                }

                break;
            default:
                const bottomSpace = window.innerHeight - sourceCoords.bottom;

                if(bottomSpace < (tooltipInfo.height + margin)) {
                    tooltipInfo.height = bottomSpace - margin;
                }

                if(window.innerWidth < (tooltipInfo.width + margin)) {
                    tooltipInfo.width = window.innerWidth - margin;
                }
        }

        tooltipEl.current.style.width = `${tooltipInfo.width}px`;
        tooltipEl.current.style.height = `${tooltipInfo.height}px`;

        let xOffset = 0;

        if(availableLeftSpace < tooltipInfo.width / 2) {
            xOffset = (tooltipInfo.width / 2) - availableLeftSpace + 8;
        } else if(availableRightSpace < tooltipInfo.width / 2) {
            xOffset = ((tooltipInfo.width / 2) - availableRightSpace + 8) * -1;
        }

        let yOffset = 0;

        if(availableTopSpace < tooltipInfo.height / 2) {
            yOffset = (tooltipInfo.height / 2) - availableTopSpace + 8;
        } else if(availableBottomSpace < tooltipInfo.height / 2) {
            yOffset = ((tooltipInfo.height / 2) - availableBottomSpace + 8) * -1;
        }

        switch(position) {
            case 'top':
                setX(sourceElementXMiddle + xOffset);
                setY(sourceCoords.top + window.scrollY - safetyMargin);
                setArrowPosition({left: `calc(50% + ${-xOffset}px)`});
                break;
            case 'left':
                setX(sourceCoords.left + window.scrollX - safetyMargin);
                setY(sourceElementYMiddle + yOffset);
                setArrowPosition({top: `calc(50% + ${-yOffset}px)`});
                break;
            case 'right':
                setX(sourceCoords.right + window.scrollX + safetyMargin);
                setY(sourceElementYMiddle + yOffset);
                setArrowPosition({top: `calc(50% + ${-yOffset}px)`});
                break;
            default:
                setX(sourceElementXMiddle + xOffset);
                setY(sourceCoords.bottom + window.scrollY + safetyMargin);
                setArrowPosition({left: `calc(50% + ${-xOffset}px)`});
        }

        tooltipEl.current.classList.remove(style.top, style.bottom, style.right, style.left);
        tooltipEl.current.classList.add(style[position]);
        tooltipEl.current.classList.remove(style.constructionPhase);
    }, [props.position, showTooltip, sourceElement]);

    useEffect(() => {
        if(props.disabled) {
            setShowTooltip(false);
        }
    }, [props.disabled]);

    
    const childComponent = props.children;
    const sourceElementRef = childComponent.ref || sourceElement;

    const handleOnClick = (event) => {
        if(props.hideOnClick) {
            setShowTooltip(false);
        }

        if(childComponent.props.onClick) {
            childComponent.props.onClick(event);
        }
    }

    const handleOnMouseEnterSource = () => {
        clearTimeout(tooltipAppearTimer.current);
        clearTimeout(tooltipHideTimer.current);
        
        tooltipAppearTimer.current = setTimeout(
            () => setShowTooltip(true)
        , props.appearDelay || 0);

        if(childComponent.props.onMouseEnter) {
            childComponent.props.onMouseEnter();
        }
    }

    const handleOnMouseEnterTooltip = () => {
        if(!props.hideDelay) return;
        props.holdWhenMouseOver &&
        clearTimeout(tooltipHideTimer.current);
    }

    const hideTooltip = () => {
        clearTimeout(tooltipAppearTimer.current);
        tooltipHideTimer.current = setTimeout(
            () => setShowTooltip(false)
        , props.hideDelay ?? 200);
        
        if(childComponent.props.onMouseLeave) {
            childComponent.props.onMouseLeave();
        }
    }
    
    if(props.disabled) return childComponent;

    return (
        <Fragment>
            <childComponent.type 
                {...childComponent.props}
                ref={sourceElementRef}
                onMouseEnter={handleOnMouseEnterSource}
                onMouseLeave={hideTooltip}
                onClick={handleOnClick}
            />
            {showTooltip &&
                createPortal((
                    <div 
                        ref={tooltipEl}
                        className={`${style.Tooltip} ${style.constructionPhase}`}
                        style={{
                            left: `${x}px`,
                            top: `${y}px`
                        }}
                        onMouseEnter={handleOnMouseEnterTooltip}
                        onMouseLeave={hideTooltip}
                    >
                        <div 
                            className={`${style.contentWrapper} ${props.className || ''}`}
                            style={props.contentStyle || {}}
                        >
                            <span className={`${style.arrowBefore} ${props.arrowClassName || ''} ${props.hideArrow? style.hideArrow: ''}`} style={arrowPosition}></span>
                            <span className={`${style.arrowAfter} ${props.arrowClassName || ''} ${props.hideArrow? style.hideArrow: ''}`} style={arrowPosition}></span>
                            <div className={`${style.content} ${props.contentClassName || ''}`}>
                                {typeof props.content === 'string'
                                    ? <p className={style.text}>{props.content}</p>
                                    : props.content
                                }
                            </div>
                        </div>
                    </div>
                ), document.body)
            }
        </Fragment>
    );
}

export default Tooltip;