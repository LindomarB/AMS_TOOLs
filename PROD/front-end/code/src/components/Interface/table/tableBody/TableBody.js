import React from "react";
import Row from "../row/Row";
import style from "./TableBody.module.css";

function TableBody(props) {
    let rows = extractId(props.data);
    rows = applySearch(rows, props.search);
    rows = applyFilters(rows, props.filters);
    rows = applyAlphaOrder(rows, props.alphaOrder);    

    const columns = getVisibleColumns(props.hiddenColumns, props.columnsOrder);

    const listItems = rows.map((row, rowNum) => {
        const rowData = columns.map(column => ({
            column,
            value: row.columns[column],
            width: props.columnsWidth[column]
        }));

        return (
            <Row 
                key={`row${rowNum}`} 
                id={`row${rowNum}`}
                data={rowData} 
                onClick={() => props.onClickRow(row.id)} 
            />
        );
    });

    return (
        <ul className={style.TableBody}>
            {listItems.length === 0
                ? <p className={style.noResults}>No results found</p>
                : listItems
            }
        </ul>
    );
}

function extractId(data) {
    return data.map(row => {
        const columns = {...row};
        delete columns._id;

        return {
            id: row._id,
            columns
        };
    });
}

function applySearch(rows, search) {
    return rows.filter(row => {
        let keepRow = false;

        for(let column in row.columns) {
            const rowValue = row.columns[column];
            if(!rowValue) continue;

            keepRow = rowValue.toLowerCase().includes(search.toLowerCase());
            if(keepRow) break;
        }

        return keepRow;
    });
}

function applyFilters(rows, filters) {
    return rows.filter(row => {
        let keepRow = true;

        for(let column in filters) {
            const filter = filters[column];
            const rowValue = row.columns[column];
            keepRow = filter.selectedOptions.some(value => rowValue.includes(value));

            if(!keepRow) break;
        }

        return keepRow;
    });
}

function applyAlphaOrder(rows, alphaOrder) {
    if(alphaOrder.column) {
        rows.sort((next, cur, order = alphaOrder.order === "ascend"? 1 : -1) => {
            if(!cur.columns[alphaOrder.column]) return 1 * order;

            const curValue = cur.columns[alphaOrder.column].toLowerCase();
            const nextValue = next.columns[alphaOrder.column].toLowerCase();

            if(curValue < nextValue) return 1 * order;
            if(curValue > nextValue) return -1 * order;
            return 0;
        });
    }

    return rows;
}

function getVisibleColumns(hiddenColumns, columnsOrder) {
    return columnsOrder.filter(columnName => !hiddenColumns[columnName]);
}

export default TableBody;