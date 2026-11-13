import React, { useEffect, useRef, useState } from "react";
import style from "./SlidingPanel.module.css";

function SlidingPanel(props) {
    const [isRenderingPhase, setIsRenderingPhase] = useState(true);
    const slidingPanelEl = useRef();
    const maxWidth = useRef(props.maxWidth || null);
    const minWidth = useRef(props.minWidth || "0px");

    useEffect(() => {
        if(!props.maxWidth) {
            maxWidth.current = slidingPanelEl.current.getBoundingClientRect().width;
        }
        setIsRenderingPhase(false);
    }, []);

    const handleOnOpen = () => {
        props.onOpen();
    }

    const handleOnClose = () => {
        props.onClose();
    }

    const slidingPanelStyle = isRenderingPhase
        ? {}
        : {width: props.open? maxWidth.current : minWidth.current};

    return (
        <div
            ref={slidingPanelEl}
            className={`${style.SlidingPanel} ${props.className || ""} ${props.open? style.opened : ''} ${isRenderingPhase? style.renderingPhase : ""}`} 
            style={slidingPanelStyle}
        >
        {props.showButton && 
            <button className={`${style.openCloseButton} material-icons`} onClick={props.open? handleOnClose : handleOnOpen}>
                {props.open
                    ? "arrow_forward_ios"
                    : "arrow_back_ios"
                }
            </button>
        }
        <div className={style.content}>
            {props.children}
        </div>
    </div>
    );
}

export default SlidingPanel;