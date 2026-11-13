import React, { useEffect, useRef } from 'react';
import Resizer from './resizer/Resizer';
import style from './TableHeader.module.css';

function TableHeader(props) {
    const header = useRef();

    useEffect(() => {
        const columnsWidth = {};

        header.current.childNodes.forEach(column => {
            const columnName = column.getAttribute('name');
            columnsWidth[columnName] = getComputedStyle(column).width;
            column.style.minWidth = '60px';
        });


        props.setColumnsWidth(columnsWidth);
    }, [props.hiddenColumns]);

    const onResize = (column, width) => {
        props.setColumnsWidth(curSt => {
            return {...curSt, [column]: `${width}px`};
        });
    }

    const handleAlphaOrder = (column, order) => {
        props.setAlphaOrder(!order? {} : {column, order});
    }

    const columns = [];

    props.columnsOrder.forEach(columnName => {
        if(props.hiddenColumns[columnName]) return;

        const columnId = `column-${columnName}`;
        const columnWidth = props.columnsWidth[columnName];

        const alphaOrderActive = props.alphaOrder.column === columnName;
        let nextAlphaOrder = 'ascend';
        let currentAlphaOrder = null;

        if(alphaOrderActive) {
            currentAlphaOrder = props.alphaOrder.order;
            nextAlphaOrder = (currentAlphaOrder === 'ascend')? 'descend' : null;
        }

        const column = (
            <div 
                key={columnId} 
                id={columnId}
                name={columnName}
                className={style.column}
                style={columnWidth? {width: columnWidth} : {}}
            >
                <button className={style.columnName} title={props.columns[columnName]} onClick={() => handleAlphaOrder(columnName, nextAlphaOrder)}>
                    <span className={`${style.columnLabel} ${alphaOrderActive? style.active : ''}`}>{props.columns[columnName]}</span>
                    <span className={`${style.alphaOrderIcon} ${currentAlphaOrder? style.active : ''} material-icons`}>
                        {(currentAlphaOrder === 'descend')? 'south' : 'north'}
                    </span>
                </button>
                <Resizer
                    columnName={columnName}
                    columnId={columnId}
                    // columnWidth={+props.columnsWidth[columnName].width.replace('px', '')}
                    onResize={onResize}
                />
            </div>
        );

        columns.push(column);
    });

    return (
        <div ref={header} className={`${style.Header} ${props.className || ''}`}>
            {columns}
        </div>
    );
}

export default TableHeader;