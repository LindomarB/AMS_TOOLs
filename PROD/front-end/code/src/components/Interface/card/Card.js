import React, { useEffect, useRef } from "react";
import style from "./Card.module.css";

function Card (props) {
    const card = useRef();
    const zoomScale = useRef(1);
    const mouseOverCard = useRef();
    const panInitial = useRef({});

    useEffect(() => {
        if(props.zoom) {
            card.current.addEventListener('wheel', zoom, {passive: false});
        }

        if(props.pan) {
            card.current.addEventListener('mouseenter', pan);
            card.current.addEventListener('mouseenter', checkMouseOver);
            card.current.addEventListener('mouseleave', checkMouseOver);
        }

        return () => {
            document.removeEventListener('keydown', preventSpaceScrolling);
            document.removeEventListener('keydown', checkPanMode);
            document.removeEventListener('keyup', enableSpaceScrolling);
            document.removeEventListener('keyup', exitPanMode);
            document.removeEventListener('mousemove', startPan);
            document.removeEventListener('mouseup', endPan);
            document.removeEventListener('mouseup', checkIfMouseLeave);
        }
    }, []);

    const checkMouseOver = (event) => {
        mouseOverCard.current = event.type === 'mouseenter';
    }

    const pan = () => {
        document.addEventListener('keydown', checkPanMode);
        card.current.addEventListener('mouseleave', endCheck);
    }

    const preventSpaceScrolling = (event) => {
        if(event.key === ' ') {
            event.preventDefault();
        }
    }

    const enableSpaceScrolling = (event) => {
        document.removeEventListener('keydown', preventSpaceScrolling);
        document.removeEventListener('keyup', enableSpaceScrolling);
    }

    const enterPanMode = () => {
        card.current.removeEventListener('mouseleave', endCheck);
        document.addEventListener('mouseup', checkIfMouseLeave);
    }

    const exitPanMode = () => {
        card.current.classList.remove(style.panMode);
        card.current.removeEventListener('mousedown', panMode);
        document.removeEventListener('keyup', exitPanMode);
        document.removeEventListener('keydown', preventSpaceScrolling);
    }

    const checkIfMouseLeave = () => {
        if(mouseOverCard.current) {
            card.current.addEventListener('mouseleave', endCheck);
        } else {
            endCheck();
        }

        document.removeEventListener('mouseup', checkIfMouseLeave);
    }

    const checkPanMode = (event) => {
        if(event.key === ' ') {
            event.preventDefault();
            if(mouseOverCard.current) {
                card.current.classList.add(style.panMode);
            }

            card.current.addEventListener('mousedown', panMode);
            card.current.addEventListener('mousedown', enterPanMode);
            document.addEventListener('keyup', exitPanMode);
            document.addEventListener('keyup', enableSpaceScrolling);
            document.addEventListener('keydown', preventSpaceScrolling);
        }
    }

    const endCheck = () => {
        card.current.classList.remove(style.panMode);
        document.removeEventListener('keydown', checkPanMode);
        document.removeEventListener('keyup', exitPanMode);
        card.current.removeEventListener('mouseleave', endCheck);
        card.current.removeEventListener('mousedown', panMode);
    }

    const panMode = (event) => {
        if(event.key) {}

        panInitial.current.position = {
            x: event.pageX,
            y: event.pageY
        };

        panInitial.current.scroll = {
            x: card.current.scrollLeft,
            y: card.current.scrollTop
        };
 
        document.addEventListener('mousemove', startPan);
        document.addEventListener('mouseup', endPan); 
        card.current.classList.add(style.pan);    
    }

    const startPan = (event) => {
        const scroll = {
            x: ((event.pageX - panInitial.current.position.x) * -1) + panInitial.current.scroll.x,
            y: ((event.pageY - panInitial.current.position.y) * -1) + panInitial.current.scroll.y
        }
        
        card.current.scrollTo(scroll.x, scroll.y);
    }

    const endPan = () => {
        document.removeEventListener('mousemove', startPan);
        document.removeEventListener('mouseup', endPan);
        card.current.classList.remove(style.pan);
        panInitial.current = {};
    }

    const zoom = (event) => {
        if(event.ctrlKey) {
            event.preventDefault();

            let zoom = (zoomScale.current) + (+event.deltaY * -0.001);
            zoom = zoom > 1? 1 : zoom < 0.1? 0.1 : zoom;
            zoom = +((zoom > 1 && 1) || (zoom < 0.1 && 0.1) || zoom).toFixed(1);

            Array.from(card.current.children).forEach(child => {
                // const xOrigin = (event.currentTarget.offsetWidth / 2) + event.currentTarget.scrollLeft;
                // const yOrigin = (event.currentTarget.offsetHeight / 2) + event.currentTarget.scrollTop;

                // child.style.transformOrigin = `${xOrigin}px ${yOrigin}px`;
                child.style.transform = `scale(${zoom})`;
            });
            
            zoomScale.current = zoom;
        }
    }

    return (
        <div 
            ref={card}
            className={`${style.Card} ${props.shadow? style.shadow : ''} ${props.hoverEffect? style.hoverEffect : ''} ${props.className || ""}`}
            style={props.style || {}}
            onClick={props.onClick || null}
        >
            {props.children}
        </div>
    );
}

export default Card;