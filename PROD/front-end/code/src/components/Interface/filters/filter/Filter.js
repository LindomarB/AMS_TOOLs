import React, { useLayoutEffect, useRef, useState } from 'react';
import Button from '../../buttons/button/Button';
import CheckBox from '../../inputs/checkBox/CheckBox';
import style from './Filter.module.css';

function Filter(props) {
    const [height, setHeight] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const container = useRef();

    useLayoutEffect(() => {
        if(!container.current) return;
        container.current.style.height = 'auto';

        const containerHeight = container.current.getBoundingClientRect().height;
        const options = container.current.querySelector('li');
        const optionHeight = options.getBoundingClientRect().height + 8;
        const amountOfHiddenFilters = props.filter.options.length - props.filter.max;
        
        const height = {
            max: `${containerHeight / 16}rem`,
            min: `${((containerHeight - (optionHeight * amountOfHiddenFilters)) / 16) - 2}rem`,
        };

        container.current.style.height = showAll? height.max : height.min;
        setHeight(height);
    }, [props.filter.options.length, container.current]);

    const reachMax = props.filter.options.length > props.filter.max;

    const filter = (
        <CheckBox
            key={props.filter.name}
            className={`${style.Filter} ${reachMax? style.reachMax : ''} ${props.last? style.last : ''}`}
            labelClassName={style.label}
            label={props.filter.label || props.filter.name}
            input={props.input}
            options={props.filter.options}
            onChange={props.onChange}
            disabled={props.disabled}
            sort
            selectAll
            clearAll
        />
    );
    if(reachMax) {
        return (
            <div 
                ref={container} 
                className={style.container} 
                style={height? {height: showAll? height.max : height.min} : {}}
            >
                {filter}
                <Button
                    className={style.button}
                    textClassName={style.buttonText}
                    icon={showAll? 'expand_less' : 'expand_more'}
                    iconPosition='right'
                    type='text'
                    color='blue'
                    onClick={() => setShowAll(curSt => !curSt)}
                >
                    {showAll? 'Show less' : 'Show more'}
                </Button>
            </div>
        );
    }

    return filter;
}

export default Filter;