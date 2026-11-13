import React, { useEffect, useState } from 'react';
import useBrowserStorage from '../../hooks/useBrowserStorage';
import FilterPanel from './filterPanel/FilterPanel';
import style from './Table.module.css';
import TableBody from './tableBody/TableBody';
import TableHeader from './tableHeader/TableHeader';
import TableSettings from './tableSettings/TableSettings';

/*
    COMPONENT PROPS

    columns
    data
    filters
    title
    onClickRow
    className (optional): a CSS class to be applied in the main component
*/

function Table(props) {
    const [settings, setSettings] = useBrowserStorage({
        key: `table-${props.name}-settings`,
        initialValue: {},
        storageType: 'session'
    });
    const [columnsOrder, setColumnsOrder] = useState(props.columnsOrder || Object.keys(props.data.columns));
    const [hiddenColumns, setHiddenColumns] = useState(settings.hiddenColumns || props.hiddenColumns);
    const [filterOptions, setFilterOptions] = useState(createFilterOptions(props.data, props.filters));
    const [search, setSearch] = useState(settings.search || '');
    const [filters, setFilters] = useState(settings.filters || {});
    const [alphaOrder, setAlphaOrder] = useState(settings.alphaOrder || {})
    const [showFilters, setShowFilters] = useState(settings.showFilters || false);
    const [columnsWidth, setColumnsWidth] = useState(getColumnsWidth(settings.columnsWidth, props.columnsInitialWidth));
    
    useEffect(() => {
        const settings = {
            search,
            filters,
            alphaOrder,
            showFilters,
            columnsWidth,
            hiddenColumns
        };

        setSettings(settings);
    }, [search, filters, alphaOrder, showFilters, columnsWidth, hiddenColumns]);

    const onShowFilters = () => {
        setShowFilters(curSt => !curSt);
    }

    const onCloseFilters = () => {
        setShowFilters(false);
    }

    const onCleanFilters = () => {
        setFilters({});
    }

    const onChangeFilter = (filter) => {
        setFilters(curSt => {
            const newState = {...curSt};

            if(filter.selectedOptions.length) {
                newState[filter.name] = filter;
            } else {
                delete newState[filter.name];
            }

            return newState;
        });
    }

    const onResetSettings = () => {
        setHiddenColumns(props.hiddenColumns);
        setSearch('');
        setFilters({});
        setAlphaOrder({})
        setColumnsWidth(props.columnsInitialWidth);
    }

    return (
        <div className={`${style.tableContainer} ${props.className || ''}`}>
            <div className={`${style.Table} ${props.tableClassName || ''} ${showFilters? style.rightMargin : ''}`}>
                {props.title && 
                    <h2 className={style.title}>{props.title}</h2>
                }
                <TableSettings 
                    search={search}
                    setSearch={setSearch}
                    columns={props.data.columns}
                    columnsOrder={columnsOrder}
                    setHiddenColumns={setHiddenColumns}
                    hiddenColumns={hiddenColumns}
                    showFilters={showFilters || Object.keys(filters).length}
                    onShowFilters={onShowFilters}
                    onResetSettings={onResetSettings}
                />
                <div className={style.tableWindow}>
                    <div className={style.tableWrapper}>
                        <TableHeader 
                            className={props.headerClassName}
                            columns={props.data.columns} 
                            columnsOrder={columnsOrder}
                            hiddenColumns={hiddenColumns}
                            columnsWidth={columnsWidth}
                            setColumnsWidth={setColumnsWidth}
                            alphaOrder={alphaOrder}
                            setAlphaOrder={setAlphaOrder}
                        />
                        <TableBody 
                            data={props.data.values} 
                            filters={filters} 
                            search={search} 
                            alphaOrder={alphaOrder} 
                            columnsWidth={columnsWidth} 
                            columnsOrder={columnsOrder}
                            hiddenColumns={hiddenColumns}
                            onClickRow={props.onClickRow}
                        />
                    </div>
                </div>
            </div>
            <FilterPanel 
                className={`${style.filterPanel} ${props.filterClassName || ''}`}
                open={showFilters} 
                filterOptions={filterOptions} 
                filterState={filters}
                onChangeFilter={onChangeFilter} 
                onCleanFilters={onCleanFilters} 
                onClose={onCloseFilters}
            />
        </div>
    );
}

function getColumnsWidth(currentWidth, initialWidth) {
    initialWidth = initialWidth || {};
    if(!currentWidth) return initialWidth;

    const columnsWidth = {...currentWidth};

    for(let column in initialWidth) {
        if(!columnsWidth[column]) {
            columnsWidth[column] = initialWidth[column];
        }
    }

    return columnsWidth;
}

function createFilterOptions(data, filters) {
    return filters.map(filter => {
        const options = {}

        data.values.forEach(row => {
            const value = row[filter];
            options[value || ''] = true;
        });

        return {name: filter, label: data.columns[filter], options: Object.keys(options)};
    });
}

export default Table;