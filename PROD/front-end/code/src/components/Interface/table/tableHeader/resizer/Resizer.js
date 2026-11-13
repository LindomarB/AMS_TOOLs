import React, { useState, useEffect, useCallback, useRef } from "react";
import style from './Resizer.module.css';

function Resizer(props) {
    const [isResizing, setIsResizing] = useState(false);
    const resizeStartPoint = useRef(null);
    const resizeElInitialWidth = useRef(null);

    useEffect(() => {
        if(isResizing) {
            document.body.style.userSelect = 'none';
            document.body.addEventListener('mousemove', onResize);
            document.body.addEventListener('mouseup', onResizeEnd);
        } else {
            document.body.style.userSelect = 'auto';
            document.body.removeEventListener('mousemove', onResize);
            document.body.removeEventListener('mouseup', onResizeEnd);

            resizeStartPoint.current = null;
            resizeElInitialWidth.current = null;
        }
    }, [isResizing]);

    const onStartResize = useCallback((event) => {
        resizeStartPoint.current = event.pageX;
        resizeElInitialWidth.current = +getComputedStyle(event.target.closest(`#${props.columnId}`)).width.replace('px', '');
        setIsResizing(true);
    }, []);

    const onResize = useCallback((event) => {
        const widthResized = event.pageX - resizeStartPoint.current;
        const newWidth = resizeElInitialWidth.current + widthResized;
        props.onResize(props.columnName, newWidth);
    },[resizeStartPoint.current, resizeElInitialWidth.current]);

    const onResizeEnd = useCallback(() => {
        setIsResizing(false);
    }, []);

    return(
        <div 
            className={style.Resizer}
            onMouseDown={(event) => 
                onStartResize(event)
            }
        >
            <span></span>
        </div>
    );
}

export default Resizer;