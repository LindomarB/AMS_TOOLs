import React, { useRef, useState } from 'react';
import style from './InputField.module.css';
import Select from './select/Select';
import Textarea from './textarea/Textarea';

/*
    COMPONENT PROPS

    value (required): the input value.
    name (required): the input name.
    type (optional): the input type (select, textarea, text, password, etc...). By default the input will be a text type.
    label (optional): the input label.
    error (required): a boolean specifying if the input value is invalid. If true, the error message will be displayed.
    errorMessage (optional): a message that will be displayed when the props 'error' is true.
    disableErrorMessage (optional): if true, the error message will never be displayed.
    onChange (required): a function that will be executed when the input value changes and receives an object with the keys name(input name) and value.
    showErrorMessageWhenEmpty (optional): a boolean. By default (false), if the error props is true but the input has no value, no error message will be displayed. If this boolean is true, the error message will be displayed.
    debouncing (optional): enable and specify the debouncing time. If true is passed, the debouncing time will be 300ms by default. If a number is passed, it will be the debouncing time in ms.
    onFocus (optional): a function that will be executed when the input receive focus and receives an object with the keys name(input name) and value.
    onBlur (optional): a function that will be executed when the input loses focus.
    sendValueOnBlur (optional): if true, the onChange function will only be executed when the input loses the focus. Default is false.
    inputClassName (optional): a CSS class that will be applied to the input element.
    uppercase (optional): a boolean specifying if the input value must be displayed in uppercase. Default is false.
    placeholder (optional): the input placeholder.
    disabled (optiona): enable or disable the input.
    selectSize (optional): a number specifying the size of the input type select. Default is 1.
    options (optional): an array of strings or objects with the options for an input type select. Objects must have the keys value and label.
    className (optional): a CSS class to be applied in the main element.
    style (optional): a style object to be applied in the main element.
    ***labelPosition (optional): by default, the label appears at input's top. If label position is equal to 'left', it will be displayed on the left.
    labelClassName (optional): a CSS class to be applied on the label.
    optionalText (optional): if true, a text saying '(optional)' will be placed after the label.


    ***MUDAR ISSO PARA labelOnLeft JÁ QUE NÃO HÁ OUTRO VALOR A CONSIDERAR
*/

function InputField (props) {
    const [inputValue, setInputValue] = useState(props.value);
    const [hasFocus, setHasFocus] = useState(false);
    const debouncingTimer = useRef(null);

    const handleOnFocus = (event) => {
        setHasFocus(true);

         props.onFocus && props.onFocus({
            name: event.target.name,
            value: event.target.value
        });
    }

    const handleOnBlur = (event) => {
        setHasFocus(false);
        
        props.sendValueOnBlur && props.onChange({
            name: event.target.name,
            value: event.target.value
        });

        props.onBlur && props.onBlur();
    }

    const handleOnChange = (event) => {
        if(props.sendValueOnBlur) {
            onChangeOnBlur(event);
        } else if(props.debouncing) {
            onChangeDebouncing(event);
        } else {
            onChange(event);
        }
    }
    
    const onChangeOnBlur = (event) => {
        setInputValue(event.target.value);
    }

    const onChangeDebouncing = (event) => {
        const value = event.target.value;

        setInputValue(value);

        clearTimeout(debouncingTimer.current);
        const time = typeof props.debouncing === 'number'
            ? props.debouncing
            : 300;

        debouncingTimer.current = setTimeout(() => {
            props.onChange({
                name: event.target.name,
                value
            });
        }, time);
    }
    
    const onChange = (event) => {
        props.onChange({
            name: event.target.name,
            value: event.target.value
        });
    }

    let inputFieldCssClass = ''; 

    if(hasFocus) {
        if(!props.disableHighlightOnFocus) {
            inputFieldCssClass = style.focus;
        }
    } else if(props.error) {
        if(props.value || props.showErrorMessageWhenEmpty) {
            inputFieldCssClass = style.error;
        }
    }

    const inputCssClass = `${style.input} ${props.inputClassName || ''} ${props.uppercase? style.uppercase : ''} ${props.disableHighlightOnFocus? style.disableHighlight : ''}`;
    const useStateValue = props.debouncing || props.sendValueOnBlur;

    const inputCommonAttributes = {
        className: inputCssClass,
        disabled: props.disabled,
        name: props.name,
        placeholder: props.placeholder,
        onChange: handleOnChange,
        onFocus: handleOnFocus,
        onBlur: handleOnBlur,
        onKeyDown: props.onKeyDown
    }

    let input = null;

    if(props.type === 'select' ) {
        input = (
            <Select 
                value={props.value}
                size={props.selectSize || 1}
                options={props.options}
                {...inputCommonAttributes}
            />
        );
    } else if(props.type === 'textarea') {
        input = (
            <Textarea
                value={useStateValue? inputValue : props.value}
                {...inputCommonAttributes}
            />
        );
    } else {
        input = (
            <input 
                type={props.type || 'text'} 
                value={useStateValue? inputValue : props.value}
                {...inputCommonAttributes}
            />
        );
    }

    return (
        <div 
            className={`${style.InputField} ${props.className || ''} ${(props.labelPosition === 'left')? style.labelOnLeft : ''} ${inputFieldCssClass}`}
            style={props.style || {}}
        >
            {props.label &&
                <label className={`${style.label} ${props.labelClassName || ''}`} >
                    {props.label}{props.optionalText && <span className={style.optional}> {props.optionalText}</span>}
                </label>
            }
            {input}
            {!props.disableErrorMessage &&
                <p className={`${style.errorMessage}`}>{(inputFieldCssClass === style.error)? props.errorMessage : '' }</p>
            }
        </div>
    );
}

export default InputField;