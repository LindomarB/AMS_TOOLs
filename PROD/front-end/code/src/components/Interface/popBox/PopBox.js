import React, { useEffect, useRef, useState, Fragment, forwardRef, useImperativeHandle, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../buttons/button/Button';
import style from './PopBox.module.css';

/*
    COMPONENT PROPS

    show (required): a boolean that indicates if the pop box should be displayed.
    children (required): the pop box content.
    container (optional): the element where popBox must be inserted. If not defined the container will be the document body.
    button (optional): the buttons props.
    parentId (optional): the parent id. If not informed, the parent element will be considered the previous sibling element. It allows the onBlur listener work properly.
    onBlur (optional): a function to be executed when the pop box or the parent loses focus. 
    verticalAlign (optional): the pox box vertical position (top or bottom). The default is bottom.
    horizontalAlign (optional): the pox box horizontal position (left or right). The default is left.
    allowResizing (optional): a boolean. If true, the pop box will resize if there is not enough vertical or horizontal space. Default is false.
    allowWidthResizing (optional): a boolean. If true, the pop box will resize if there is not enough vertical space. Default is false.
    allowHeightResizing (optional): a boolean. If true, the pop box will resize if there is not enough horizontal space. Default is false.
    allowRepositioning (optional): a boolean. If true, the pop box will reposition if there is not enough vertical or horizontal space. If even repositioned there is not enough space, the initial configuration will be applied. Default is false.
    allowVerticalRepositioning (optional):a boolean. If true, the pop box will reposition if there is not enough vertical space. If even repositioned there is not enough space, the initial configuration will be applied. Default is false.
    allowHorizontalRepositioning (optional): a boolean. If true, the pop box will reposition if there is not enough horizontal space. If even repositioned there is not enough space, the initial configuration will be applied. Default is false.
    className (optional): a CSS class to be applied on the main component.

*/

function PopBox(props, ref) {
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(true);
    const popBoxEl = useRef();
    const anchorEl = useRef();
    const containerEl = useRef(
        props.containerId
            ? document.getElementById(props.containerId) 
            : props.container || document.body
    );
    const baseAlignmnet = useRef({
        vertical: props.verticalAlign || 'bottom',
        horizontal: props.horizontalAlign || 'left'
    });
    const currentAlignment = useRef({...baseAlignmnet.current});
    const isMouseOverPopBox = useRef(false);

    useEffect(() => {
        if(props.containerId) {
            containerEl.current = props.containerId? document.getElementById(props.containerId) : document.body;
        } else {
            containerEl.current = props.container || document.body;
        }
        
    }, [props.containerId, props.container]);

    useEffect(() => {
        anchorEl.current = props.anchor;
    }, [props.anchor]);

    useLayoutEffect(() => {
        if(show) {
            if(props.button) {
                document.body.addEventListener('click', closePopBoxOnBlur);
            }

            const scrollTop = popBoxEl.current.scrollTop;
            const scrollLeft = popBoxEl.current.scrollLeft;
            const newAlignment = {...baseAlignmnet.current};

            const shadow = popBoxEl.current.cloneNode(true);
            shadow.classList.add(style.shadow);
            shadow.style.removeProperty('height');
            shadow.style.removeProperty('width');
            shadow.style.removeProperty('scroll');
            shadow.classList.remove(style[`${currentAlignment.current.vertical}-${currentAlignment.current.horizontal}`]);
            shadow.classList.add(style[`${baseAlignmnet.current.vertical}-${baseAlignmnet.current.horizontal}`]);
            document.body.appendChild(shadow);
            
            const popBoxStyle = getComputedStyle(shadow);
            const popBox = {
                width: +popBoxStyle.width.replace('px', ''),
                height: +popBoxStyle.height.replace('px', '')
            };

            shadow.remove();           
            
            // const button = {
            //     top: anchorEl.current.offsetTop,
            //     bottom: anchorEl.current.offsetTop + anchorEl.current.clientHeight,
            //     left: anchorEl.current.offsetLeft,
            //     right: anchorEl.current.offsetLeft + anchorEl.current.clientWidth,
            //     width: anchorEl.current.clientWidth,
            //     height: anchorEl.current.clientHeight
            // };

            const containerCoords = containerEl.current.getBoundingClientRect();
            const anchorCoords = anchorEl.current.getBoundingClientRect();
 
            const anchor = {
                top: anchorCoords.top - containerCoords.top + containerEl.current.scrollTop,
                bottom: anchorCoords.top - containerCoords.top + containerEl.current.scrollTop + anchorCoords.height,
                left: anchorCoords.left - containerCoords.left + containerEl.current.scrollLeft,
                right: anchorCoords.left - containerCoords.left + containerEl.current.scrollLeft + anchorCoords.width,
                width: anchorCoords.width,
                height: anchorCoords.height
            };

            if(props.anchor) {
                popBox.width = anchorCoords.width;
                popBoxEl.current.style.width = `${anchorCoords.width}px`;
            }

            popBoxEl.current.style.top = props.verticalAlign === 'top'
                ? `${anchor.top - popBox.height}px`
                : `${anchor.bottom}px`;

            popBoxEl.current.style.left = props.horizontalAlign === 'right'
                ? `${anchor.right - popBox.width}px`
                : `${anchor.left}px`;

            if(props.allowResizing || props.allowRepositioning) {
                anchor.availableTopSpace = anchorCoords.top;
                anchor.availableBottomSpace = document.body.offsetHeight - (anchorCoords.top + anchorCoords.height);
                anchor.availableLeftSpace = anchorCoords.left + anchorCoords.width;
                anchor.availableRightSpace = document.body.offsetWidth - anchorCoords.left;

                if(props.allowRepositioning || props.allowVerticalRepositioning) {
                    const repositioning = {};

                    if(props.verticalAlign === 'top') {
                        repositioning.newAlignment = 'bottom';
                        repositioning.availableSpace = anchor.availableTopSpace;
                        repositioning.alternativeAvailableSpace = anchor.availableBottomSpace;
                    } else {
                        repositioning.newAlignment = 'top';
                        repositioning.availableSpace = anchor.availableBottomSpace;
                        repositioning.alternativeAvailableSpace = anchor.availableTopSpace;
                    }

                    if(
                        repositioning.availableSpace < popBox.height && 
                        repositioning.alternativeAvailableSpace > repositioning.availableSpace
                    ) {
                        newAlignment.vertical = repositioning.newAlignment;
                        popBoxEl.current.style.top = repositioning.newAlignment === 'top'
                            ? `${anchor.top - popBox.height}px`
                            : `${anchor.bottom}px`;
                    }
                }

                if(props.allowRepositioning || props.allowHorizontalRepositioning) {
                    const repositioning = {};

                    if(props.horizontalAlign === 'right') {
                        repositioning.newAlignment = 'left';
                        repositioning.availableSpace = anchor.availableLeftSpace;
                        repositioning.alternativeAvailableSpace = anchor.availableRightSpace;
                    } else {
                        repositioning.newAlignment = 'right';
                        repositioning.availableSpace = anchor.availableRightSpace;
                        repositioning.alternativeAvailableSpace = anchor.availableLeftSpace;
                    }

                    if(
                        repositioning.availableSpace < popBox.width && 
                        repositioning.alternativeAvailableSpace > repositioning.availableSpace
                    ) {
                        newAlignment.current.horizontal = repositioning.newAlignment;
                        popBoxEl.current.style.left = repositioning.newAlignment === 'right'
                            ? `${anchor.right - popBox.width}px`
                            : `${anchor.left}px`;
                    }
                }

                if(props.allowResizing || props.allowHeightResizing) {
                    if(currentAlignment.current.vertical === 'top') {
                        if(anchor.availableTopSpace < popBox.height) {
                            popBoxEl.current.style.height = `${anchor.availableTopSpace}px`;
                            popBoxEl.current.style.overflowY = 'scroll';
                        } else {
                            popBoxEl.current.style.height = `${popBox.height}px`;
                        }
                    } else {
                        if(anchor.availableBottomSpace < popBox.height) {
                            popBoxEl.current.style.height = `${anchor.availableBottomSpace}px`;
                            popBoxEl.current.style.overflowY = 'scroll';
                        } else {
                            popBoxEl.current.style.height = `${popBox.height}px`;
                        }
                    }
                }
  
                if(props.allowResizing || props.allowWidthResizing) {
                    if(currentAlignment.current.horizontal === 'right') {
                        if(anchor.availableLeftSpace < popBox.width) {
                            popBoxEl.current.style.width = `${anchor.availableLeftSpace}px`;
                            popBoxEl.current.style.overflowX = 'scroll';
                        } else {
                            popBoxEl.current.style.width = `${popBox.width}px`;
                        }
                    } else {
                        if(anchor.availableRightSpace < popBox.width) {
                            popBoxEl.current.style.width = `${anchor.availableRightSpace}px`;
                            popBoxEl.current.style.overflowX = 'scroll';
                        } else {
                            popBoxEl.current.style.width = `${popBox.width}px`;
                        }
                    }
                }
            }

            popBoxEl.current.classList.remove(style[`${currentAlignment.current.vertical}-${currentAlignment.current.horizontal}`]);
            popBoxEl.current.classList.add(style[`${newAlignment.vertical}-${newAlignment.horizontal}`]);
            currentAlignment.current = newAlignment;

            popBoxEl.current.scrollTo({
                top: scrollTop,
                left: scrollLeft
            });
        } else {
            document.body.removeEventListener('click', closePopBoxOnBlur);
        }   

    }, [show, props.children]);

    const closePopBox = () => {
        setHide(true);
    }

    useImperativeHandle(ref, () => ({
        setShow: (show) => {
            if(show) {
                setHide(false);
                setShow(true);
            } else {
                closePopBox();
            }
        }
    }));

    const closePopBoxOnBlur = useCallback(() => {
        if(!isMouseOverPopBox.current) {
            closePopBox();
            props.onBlur && props.onBlur();
        }
    }, []);

    const handleOnClickButton = (event) => {
        if(props.disableButton) return;

        event.stopPropagation();
        anchorEl.current = event.currentTarget;

        if(show) {
            closePopBox();
        } else {
            setHide(false);
            setShow(true);
        }

        props.onClickButton && props.onClickButton();
        document.body.click();
    }

    const onAnimationEnd = useCallback(() => {
        hide && setShow(false);
    }, [hide]);

    const onMouseEnter = useCallback(() => {
        isMouseOverPopBox.current = true;
        props.onMouseEnter && props.onMouseEnter();
    });

    const onMouseLeave = useCallback(() => {
        isMouseOverPopBox.current = false;
        props.onMouseLeave && props.onMouseLeave();
    }); 

    const cssPositionClass = `${currentAlignment.current.vertical}-${currentAlignment.current.horizontal}`;

    return (
        <Fragment>
            {props.button && 
                <Button 
                    {...props.button} 
                    active={!hide} 
                    onClick={handleOnClickButton} 
                    onMouseEnter={onMouseEnter} 
                    onMouseLeave={onMouseLeave}
                    
                >{props.button.text}</Button>
            }
            {show && createPortal((
                <div
                    ref={popBoxEl}
                    className={`${style.PopBox} ${style[cssPositionClass]} ${props.className? props.className : ''} ${hide? style.hide : ''} ${props.disableAnimation? style.disableAnimation : ''}`}
                    style={props.style || {}}
                    tabIndex={1}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onAnimationEnd={onAnimationEnd}
                >
                    {props.children}
                </div>
            ), containerEl.current)}
        </Fragment>
        
    );
}

export default forwardRef(PopBox);