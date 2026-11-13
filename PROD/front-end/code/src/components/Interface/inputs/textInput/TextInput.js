import React, { useEffect, useRef, useState } from 'react';
import Button from '../../buttons/button/Button';
import Rule from '../../rule/Rule';
import InputLayout from '../inputLayout/InputLayout';
import style from './TextInput.module.css';
import capitalize from '../../../../functions/text/capitalize';

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
    onPressEnter (optional): a function to be executed when 'Enter' key is pressed.
    onKeyDown (optional): a function to be executed when a key is pressed.
    sendValueOnBlur (optional): if true, the onChange function will only be executed when the input loses the focus. Default is false.
    forceFocus (optional): if true, the input will always have focus. Default is false.
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
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const inputEl = useRef();
    const debouncingTimer = useRef(null);
    const holdCursorPosition = useRef(null);

    useEffect(() => {
        if(usingValueHolder) {
            props.input.setOnReset((value) => setValueHolder(value));
        }
    }, []);

    useEffect(() => {
        if(inputEl.current && props.setInputReference) {
            props.setInputReference(inputEl.current);
        }
    }, [inputEl]);

    useEffect(() => {
        if(holdCursorPosition.current) {
            inputEl.current.selectionStart = holdCursorPosition.current;
            inputEl.current.selectionEnd = holdCursorPosition.current;
            holdCursorPosition.current = false;
        }
    }, [props.input.value]);

    const handleOnKeyDown = (event) => {
        if(event.key === 'Enter' && props.onPressEnter) {
            props.onPressEnter();
        } else if(event.key === 'Enter' && props.confirmButton) {
            handleOnConfirm();
        } else if(props.onKeyDown) {
            props.onKeyDown();
        }

        if(props.type === 'password') {
            setCapsLockOn(event.getModifierState('CapsLock'));
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
        setCapsLockOn(false);

        if(props.forceFocus) {
            setHasFocus(true);
            inputEl.current.focus();
        } else {
            setHasFocus(false);
            clearTimeout(debouncingTimer.current);

            const value = props.sendValueOnBlur || props.debouncing || props.confirmButton? valueHolder.trim() : props.input.value.trim();
            onChange(value);
            props.onBlur && props.onBlur(value);
        }
    }

    const handleOnChange = (event) => {
        let value = event.target.value;

        if(props.uppercase) {
            value = event.target.value.toUpperCase();
            holdCursorPosition.current = event.target.selectionStart;
        } else if(props.lowercase) {
            value = event.target.value.toLowerCase();
            holdCursorPosition.current = event.target.selectionStart;
        } else if(props.capitalize) {
            if(props.capitalize === 'all') {
                value = capitalize(event.target.value.toLowerCase(), false);
                holdCursorPosition.current = event.target.selectionStart;
            } else {
                value = capitalize(event.target.value.toLowerCase());
                holdCursorPosition.current = event.target.selectionStart;
            }
        }

        if(props.confirmButton || props.sendValueOnBlur) {
            setValueHolder(value);
        } else if(props.debouncing) {
            setValueHolder(value);
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

    const handleOnShowPassword = () => {
        setShowPassword(curSt => !curSt);
    }

    const handleOnCleanInput = () => {
        setValueHolder('');
        onChange('');
    }

    const handleOnConfirm = () => {
        const value = valueHolder.trim();
        
        onChange(value);
        props.onConfirm && props.onConfirm({name: props.input.name, value});
    }

    const usingValueHolder = props.debouncing || props.sendValueOnBlur || props.confirmButton;

    const inputCommonAttributes = {
        ref: inputEl,
        className: `${props.uppercase? style.uppercase : ''} ${props.resizable? style.resizable : ''} ${props.inputClassName || ''}`,
        disabled: props.disabled || props.locked,
        name: props.input.name,
        placeholder: props.placeholder,
        autoFocus: props.autoFocus,
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
                value={usingValueHolder? valueHolder : props.input.value}
            ></textarea>

        );
    } else if(props.type === 'password') {
        input = (
            <input 
                type={showPassword? 'text' : 'password'} 
                min={props.min}
                max={props.max}
                value={usingValueHolder? valueHolder : props.input.value}
                {...inputCommonAttributes}
            />
        );
    } else {
        input = (
            <input 
                type={props.type || 'text'} 
                min={props.min}
                max={props.max}
                value={usingValueHolder? valueHolder : props.input.value}
                {...inputCommonAttributes}
            />
        );
    }

    const buttonProps = {
        className: style.button,
        type: 'icon',
        iconSize: 24,
        color: 'lightGrey',
        iconWeight: 300
    };
    
    const showCleanButton = props.cleanButton
        ? (props.confirmButton || props.sendValueOnBlur) && !props.locked
            ? valueHolder 
            : props.input.value
        : false;

    return (
        <InputLayout 
            {...props}
            hasFocus={hasFocus}
            capsLockOn={capsLockOn}
        >
            {input}
            {showCleanButton &&
                <>
                    <Button 
                        {...buttonProps}
                        icon='close'
                        onClick={handleOnCleanInput}
                    />
                    {(props.confirmButton || props.enableShowPassword) &&
                        <Rule className={style.rule} vertical/>
                    }
                </>
            }
            {props.confirmButton &&
                <Button 
                    {...buttonProps}
                    icon={props.confirmButton}
                    onClick={handleOnConfirm}
                />
            }
            {(props.type === 'password' && props.enableShowPassword) &&
                <Button 
                    {...buttonProps}
                    icon={showPassword? 'visibility_off' : 'visibility'}
                    onClick={handleOnShowPassword}
                />
            }
        </InputLayout>
    );
}

export default TextInput;