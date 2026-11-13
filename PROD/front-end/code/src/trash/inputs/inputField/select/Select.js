import React from 'react';
import style from './Select.module.css';

function Select (props) {
    const options = props.options.map(option => (
        <option key={option.value || option} value={option.value || option}>
            {option.label || option.value || option}
        </option>
    ))

    return (
        <select 
            className={`${props.className} ${props.value? '' : style.placeholder}`}
            value={props.value}
            size={props.selectSize || 1}
            disabled={props.disabled}
            name={props.name}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
        >
            {props.placeholder && 
                <option disabled value=''>{props.placeholder}</option>
            }
            {options}
        </select>
    );
}

export default Select;