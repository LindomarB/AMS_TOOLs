import React, { useRef, useState } from 'react';
import InputLayout from '../inputLayout/InputLayout';
import style from './TextInput.module.css';

/*
    COMPONENT PROPS

    input (required): an useInputValue hook. The input value and validity will be handle by the Input component.
    type (optional): the input type (area, text, password, etc...). By default the input will be a text type.
    label (optional): the input label.
    labelOnLeft (optional): by default, the label appears at input's top. If labelOnLeft is true, it will be displayed at input's left.
    labelClassName (optional): a CSS class to be applied on the label.
    optional (optional): if true, a text saying '(optional)' will be placed after the label.
    disableErrorMessage (optional): if true, the error message will never be displayed.
    showErrorMessageWhenEmpty (optional): a boolean. By default (false), if the error props is true but the input has no value, no error message will be displayed. If this boolean is true, the error message will be displayed.
    debouncing (optional): enable and specify the debouncing time. If true is passed, the debouncing time will be 300ms by default. If a number is passed, it will be the debouncing time in ms.
    onChange (optional): a function that will be executed when the input value changes and receives an object with the keys name(input name) and value.
    onFocus (optional): a function that will be executed when the input receive focus and receives an object with the keys name(input name) and value.
    onBlur (optional): a function that will be executed when the input loses focus.
    onEnter (optional): a function to be executed when 'Enter' key is pressed.
    onKeyDown (optional): a function to be executed when a key is pressed.
    sendValueOnBlur (optional): if true, the onChange function will only be executed when the input loses the focus. Default is false.
    inputClassName (optional): a CSS class that will be applied to the input element.
    uppercase (optional): a boolean specifying if the input value must be converted to uppercase. Default is false.
    placeholder (optional): the input placeholder.
    disabled (optional): enable or disable the input.
    className (optional): a CSS class to be applied in the main element.
    style (optional): a style object to be applied in the main element.    
*/

function TextInput (props) {
    const [valueHolder, setValueHolder] = useState(props.input.value);
    const [hasFocus, setHasFocus] = useState(false);
    const debouncingTimer = useRef(null);

    const handleOnKeyDown = (event) => {
        if(event.key === 'Enter' && props.onPressEnter) {
            props.onPressEnter();
        } else if(props.onKeyDown) {
            props.onKeyDown();
        }
    }

    const handleOnFocus = (event) => {
        setHasFocus(true);
        props.onFocus && props.onFocus({
            name: props.input.name,
            value: event.target.value
        });
    }

    const handleOnBlur = () => {
        setHasFocus(false);
        props.sendValueOnBlur && onChange(valueHolder);
        props.onBlur && props.onBlur();
    }

    const handleOnChange = (event) => {
        const value = props.uppercase? event.target.value.toUpperCase() : event.target.value;

        if(props.sendValueOnBlur) {
            setValueHolder(value);
        } else if(props.debouncing) {
            setDebouncingTimer(value);
        } else {
            onChange(value);
        }
    }

    const setDebouncingTimer = (value) => {
        clearTimeout(debouncingTimer.current);
        const time = typeof props.debouncing === 'number'
            ? props.debouncing
            : 300;

        debouncingTimer.current = setTimeout(() => onChange(value), time);
    }
    
    const onChange = (value) => {
        props.input.setValue(value);
        props.onChange && props.onChange({name: props.input.name, value});
    }

    const usingValueHolder = props.debouncing || props.sendValueOnBlur;

    const inputCommonAttributes = {
        className: `${props.uppercase? style.uppercase : ''} ${props.resizable? style.resizable : ''}`,
        disabled: props.disabled,
        name: props.input.name,
        placeholder: props.placeholder,
        onChange: handleOnChange,
        onFocus: handleOnFocus,
        onBlur: handleOnBlur,
        onKeyDown: handleOnKeyDown
    }

    let input = null;

    if(props.type === 'area') {
        input = (
            <textarea 
                {...inputCommonAttributes}
                className={`${inputCommonAttributes.className} ${props.resizable? style.resizable : ''}`}
                value={usingValueHolder? valueHolder : props.input.value}
            ></textarea>

        );
    } else {
        input = (
            <input 
                type={props.type || 'text'} 
                value={usingValueHolder? valueHolder : props.input.value}
                {...inputCommonAttributes}
            />
        );
    }

    return (
        <InputLayout 
            {...props}
            hasFocus={hasFocus}
        >
            {input}
        </InputLayout>
    );
}

export default TextInput;