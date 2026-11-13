import React from "react";
import style from "./Row.module.css";

function Row(props) {
    const cells = props.data.map((cell, cellNum) => 
        <span 
            key={`${props.id}-${cell.column}-${cellNum}`} 
            className={`${style.cell} ${props.cellClassName || ""}`}
            style={cell.width? {width: cell.width} : {}}
            title={cell.value || "—"}
        >
            {cell.value || "—"}
        </span>
    );

    return (
        <li className={`${style.Row} ${props.className || ""}`} style={props.style || null} onClick={props.onClick || null}>
            {cells}
        </li>
    );
}

export default Row;