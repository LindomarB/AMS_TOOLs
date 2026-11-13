import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Button from "../buttons/button/Button";
import NoDataFound from "../noDataFound/NoDataFound";
import Drawer from "../drawer/Drawer";
import Header from "../header/Header";
import Filter from "./filter/Filter";
import style from "./Filters.module.css";
import sortByField from "../../../functions/array/sortByField";

/*
    COMPONENT PROPS

    filters (required): [{name: '', label: '', options: [{value: '', label: ''}, ...], initialValue: [], max: 0123}]
    onChange
    className
*/

function Filters(props, ref) {
    const [filterInputs, setFilterInputs] = useState({});
    const firstRender = useRef(true);
    // const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        // open: () => setOpen(true),
        // close: () => setOpen(false),
        // toggle: () => setOpen(curSt => !curSt),
        // isOpened: open,
        // hasActiveFilters: !!filterInputs && !!filterInputs.length,
        clearFilters: handleOnClearFilters
    }));

    useEffect(() => {
        const filterInputs = props.filters.reduce((filterInputs, filter) => {
            const initialValue = filter.initialValue
                ? filter.initialValue.filter(value => filter.options.some(option => option.value === value))
                : [];

            filterInputs[filter.name] = {
                name: filter.name,
                value: initialValue
            };
            
            return filterInputs;
        }, {});

        setFilterInputs(filterInputs);
    }, [props.filters]);

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false;
        } else {
            const values = Object.values(filterInputs).filter(input => input.value.length).map(input => structuredClone(input));
            props.onChange(values);
        }
    }, [filterInputs]);

    const handleOnChange = (input) => {
        setFilterInputs(curSt => {
            const newState = {...curSt};
            newState[input.name].value = input.value;
            return newState;
        });
    }

    const handleOnClearFilters = () => {
        setFilterInputs(curSt => {
            const newState = {...curSt};

            for(let input in newState) {
                newState[input] = {name: input, value: []}
            }

            return newState;
        });
    }

    let showClearButton = false;
    const filters = [];
    sortByField(props.filters, 'label');

    if(Object.keys(filterInputs).length) {
        props.filters.reduce((filters, filter, idx) => {
            if(filterInputs[filter.name]) {
                filters.push(
                    <Filter 
                        key={`${filter.label}-${filter.name}`}
                        filter={filter}
                        input={filterInputs[filter.name]}
                        onChange={handleOnChange}
                        disabled={props.disabled}
                        last={idx === props.filters.length - 1}
                    />
                );
            }
            return filters;
        }, filters);
    
        for(let input in filterInputs) {
            if(filterInputs[input].value.length) {
                showClearButton = true;
                break;
            }
        }
    }
    
    return (
        <Drawer className={`${style.Filters} ${props.className || ''} ${props.noOverlap? style.noOverlap : ''}`} open={props.open} noOverlap={props.noOverlap}>
            <Header text='Filters' icon='filter' color='theme' rule>
                {showClearButton &&
                    <Button
                        type='icon'
                        icon='clear filters'
                        color='grey'
                        tooltip='Clear filters'
                        onClick={handleOnClearFilters}
                    />
                }
                <Button 
                    type='icon' 
                    icon='close' 
                    color='grey' 
                    tooltip='Close filters'
                    onClick={() => props.setOpen(false)}
                />
            </Header>
            <div className={style.filtersContainer}>
                {filters.length
                    ? filters
                    : <NoDataFound icon='clear filters' text='No filters found'/>
                }
            </div>
            
        </Drawer>
    );
}

export default forwardRef(Filters);