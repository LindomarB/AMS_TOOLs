import React from "react";
import style from "./IconRevealButton.module.css";

function IconRevealButton(props) {

    return (
        <button 
            className={`${style.IconRevealButton} ${style[props.iconPosition]} ${props.className || ""}`} 
            onClick={() => props.onClick()} 
            disabled={props.disabled}
        >
            {props.iconPosition === "left" && 
                <span className={`${style.icon}`}>
                    {props.icon}
                </span>
            }
            <p>{props.children}</p>
            {props.iconPosition === "right" && 
                <span className={`${style.icon}`}>
                    {props.icon}
                </span>
            }
        </button>
    );
}

export default IconRevealButton;