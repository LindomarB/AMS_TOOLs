import React, { useRef, useState } from 'react';
import Icon from '../../icons/icon/Icon';
import InputLayout from '../inputLayout/InputLayout';
import style from './Select.module.css';

/*
    COMPONENT PROPS

    input (required): an useInputValue hook. The input value and validity will be handle by the Input component.
    options (required): an array of strings or objects with the input options. Objects must have the keys value and label.
    label (optional): the input label.
    labelOnLeft (optional): by default, the label appears at input's top. If labelOnLeft is true, it will be displayed at input's left.
    labelClassName (optional): a CSS class to be applied on the label.
    optional (optional): if true, a text saying '(optional)' will be placed after the label.
    disabled (optiona): enable or disable the input.
    disableErrorMessage (optional): if true, the error message will never be displayed.
    showErrorMessageWhenEmpty (optional): a boolean. By default (false), if the error props is true but the input has no value, no error message will be displayed. If this boolean is true, the error message will be displayed.
    onChange (optional): a function that will be executed when the input value changes and receives an object with the keys name(input name) and value.
    onFocus (optional): a function that will be executed when the input receive focus and receives an object with the keys name(input name) and value.
    onBlur (optional): a function that will be executed when the input loses focus.
    inputClassName (optional): a CSS class that will be applied to the input element.
    uppercase (optional): a boolean specifying if the input value must be converted to uppercase. Default is false.
    placeholder (optional): the input placeholder.
    size (optional): a number specifying the size of the input type select. Default is 1.
    className (optional): a CSS class to be applied in the main element.
    style (optional): a style object to be applied in the main element.    
*/

function Select (props) {
    const [hasFocus, setHasFocus] = useState(false);

    const handleOnFocus = () => {
        setHasFocus(true);
        props.onFocus && props.onFocus({
            name: props.input.name,
            value: props.input.value
        });
    }

    const handleOnBlur = () => {
        setHasFocus(false);
        props.onBlur && props.onBlur({
            name: props.input.name,
            value: props.input.value
        });
    }

    const handleOnChange = (event) => {
        const value = event.target.value;
        props.input.setValue(value);
        props.onChange && props.onChange({name: props.input.name, value});
        handleOnBlur();
    }

    const sortOptions = (options) => {
        return options.sort((next, prev) => {
            if(next.props.children > prev.props.children) return 1;
            if(next.props.children < prev.props.children) return -1;
            return 0;
        });
    }

    const options = props.options.map(option => {
        let value = option;
        let label = option;

        if(typeof option === 'object') {
            value = option.value;
            label = option.label || option.value;
        }

        return (
            <option key={value} className={style.option} value={props.uppercase? value.toUpperCase() : value}>
                {props.uppercase? label.toUpperCase() : label}
            </option>
        );
    });
    
    if(props.sort) sortOptions(options);

    const value = props.size
        ? props.input.value || undefined
        : props.input.value;

    return (
        <InputLayout 
            {...props}
            hasFocus={hasFocus}
        >
            {!props.size &&
                <Icon className={style.picker} name='expand_more' size={24} color='lightGrey' weight={300}/>
            }
            <select 
                className={`${style.Select} ${props.size? '' : style.cursor} ${props.inputClassName || ''} ${props.input.value? '' : style.placeholder}`}
                value={value}
                size={props.size || 1}
                disabled={props.disabled || props.locked}
                name={props.input.name}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            >
                {props.placeholder && 
                    <option disabled value=''>{props.placeholder}</option>
                }
                {props.clearOption && props.input.value && 
                    <option className={style.clearSelection} value=''>-- Clear Selection --</option>
                }
                {options}
            </select>
        </InputLayout>
    );
}

export default Select;