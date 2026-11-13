import React, { useState } from 'react';
import List from '../../list/List';
import PopBox from '../../popBox/PopBox';
import style from './Autocomplete.module.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import TextInput from '../textInput/TextInput';

function Autocomplete(props) {
    const [showPopBox, setShowPopBox] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [input, setInput] = useState();
    const anchor = useRef();
    const popBox = useRef();
    const container = useRef(props.container);

    useEffect(() => {
        if(!container.current && anchor.current) {
            container.current = anchor.current.parentElement;

            if(!container.current.style.position) {
                container.current.style.position = 'relative';
            }
        }
    }, [anchor.current]);

    useEffect(() => {
        if(popBox.current) {
            popBox.current.setShow(showPopBox);
        }

        if(!showPopBox && input) {
            input.blur();
        }
    }, [showPopBox]);

    const setInputReference = (input) => {
        setInput(input);
    }

    const handleOnFocus = () => {
        setShowPopBox(true);
    }

    const handleOnBlur = () => {
        if(!mouseOver) setShowPopBox(false);
    }

    const handleOnMouseEnter = () => {
        setMouseOver(true);
    }

    const handleOnMouseLeave = () => {
        setMouseOver(false);
    }

    const handleOnSelectOption = (option) => {
        setMouseOver(false);
        setShowPopBox(false);
        props.onSelectOption && props.onSelectOption(option);
    }

    return (
        <div ref={anchor} className={props.className || ''}>
            <TextInput 
                {...props}
                className={`${style.input} ${props.inputClassName || ''}`}
                forceFocus={mouseOver}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                setInputReference={setInputReference}
            />
            <PopBox 
                ref={popBox} 
                anchor={anchor.current} 
                containerId={props.containerId}
                container={container.current}
                allowResizing
                disableAnimation
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            >
                <List 
                    className={style.list}
                    containerClassName={style.listContainer}
                    onClickItem={handleOnSelectOption}
                    onReachBottom={props.onReachBottom}
                >
                    {props.options}
                </List>
            </PopBox>
        </div>
    );
}

export default Autocomplete;