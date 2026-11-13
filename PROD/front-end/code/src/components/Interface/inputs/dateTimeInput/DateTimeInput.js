import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../icons/icon/Icon';
import InputLayout from '../inputLayout/InputLayout';
import style from './DateTimeInput.module.css';

/*
    COMPONENT PROPS

    input (required): an useInputValue hook. The input value and validity will be handle by the Input component.
    type (optional): time input type (date, time, datetime). Default is date.
    min (optional): the input min value (for date: 'yyyy-mm-dd', for datetime: 'yyyy-mmmm-ddThh:mm).
    max (optional): the input max value (for date: 'yyyy-mm-dd', for datetime: 'yyyy-mmmm-ddThh:mm).
    label (optional): the input label.
    labelOnLeft (optional): by default, the label appears at input's top. If labelOnLeft is true, it will be displayed at input's left.
    labelClassName (optional): a CSS class to be applied on the label.
    disableIcon (optional): disable the input icon.
    optional (optional): if true, a text saying '(optional)' will be placed after the label.
    onChange (optional): a function that will be executed when the input value changes and receives an object with the keys name(input name) and value.
    onFocus (optional): a function that will be executed when the input receive focus and receives an object with the keys name(input name) and value.
    onBlur (optional): a function that will be executed when the input loses focus.
    inputClassName (optional): a CSS class that will be applied to the input element.
    placeholder (optional): the input placeholder.
    disabled (optional): enable or disable the input.
    className (optional): a CSS class to be applied in the main element.
    style (optional): a style object to be applied in the main element. 
    noLayout (optional): return the component out of the LayoutInput component;   
*/

function DateTimeInput (props) {
    const [hasFocus, setHasFocus] = useState(false);
    const getValue = useRef(
        props.type === 'datetime'
            ? getDatetime
            : props.type === 'time'
            ? getTime
            : getDate
    );   

    // useEffect(() => {
    //     if(typeof props.input.value === 'object') return;
    //     props.input.setValue(getValue.current(props.input.value));
    // }, []);

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
        props.onBlur && props.onBlur({
            name: props.input.name,
            value: props.input.value
        });
    }

    const handleOnChange = (event) => {
        const value = event.target.value && getValue.current(event.target.value);
        props.input.setValue(value);
        props.onChange && props.onChange({name: props.input.name, value});
    }

    const inputAttributes = {
        disabled: props.disabled,
        name: props.input.name,
        placeholder: props.placeholder,
        onChange: handleOnChange,
        onFocus: handleOnFocus,
        onBlur: handleOnBlur,
        onKeyDown: handleOnKeyDown
    }
    
    const icon = props.type === 'time'
        ? 'schedule'
        : props.type === 'datetime'
        ? 'event'
        : 'calendar';

    const value = props.input.value[props.type] || '';

    const input = (
        <div className={style.inputWrapper}>
            <Icon className={style.picker} name='expand_more' size={24} color='lightGrey' weight={300}/>
            {props.placeholder && 
                <span className={`${style.placeholder} ${hasFocus || value? style.hide : ''}`}>{props.placeholder}</span>
            }
            <input 
                className={`${style.input} ${!value? style.grey : ''}`}
                type={props.type === 'datetime'? 'datetime-local' : props.type}
                min={props.min || null}
                max={props.max || null}
                value={value}
                {...inputAttributes}
            />
        </div>
    );

    if(props.noLayout) return input;

    return (
        <InputLayout 
            {...props}
            hasFocus={hasFocus}
            icon={props.disableIcon? null : icon}
            disableErrorMessage
        >
            {input}
        </InputLayout>
    );
}

function getDate(value) {
    if(!value) {
        return {
            date: '',
            day: '',
            month: '',
            year: ''
        };
    }

    const date = value.split('-');

    const dateObj = {
        year: date[0],
        month: date[1],
        day: date[2],
        date: value
    };

    return dateObj;
}

function getTime(value) {
    if(!value) {
        return {
            time: '',
            min: '',
            hour: ''
        };
    }

    const time = value.split(':');
    const timeObj = {
        time: value,
        hour: time[0],
        min: time[1]
    };

    return timeObj;
}

function getDatetime(value) {
    if(!value) {
        return {
            ...getDate(),
            ...getTime(),
            datetime: ''
        };
    }

    const date = value.split('T')[0];
    const time = value.split('T')[1];

    const dateTimeObj = {
        ...getDate(date),
        ...getTime(time),
        datetime: value
    };

    return dateTimeObj;
}

DateTimeInput.defaultProps = {
    type: 'date'
}

export default DateTimeInput;