import React, { useRef } from 'react';
import style from './CheckBox.module.css';

function CheckBox(props) {
    const ul = useRef();

    const handleOnChange = () => {
        const inputsEl = ul.current.querySelectorAll('input');
        const selectedOptions = [];

        inputsEl.forEach(inputEl => {
            if(inputEl.checked) {
                selectedOptions.push(inputEl.value);
            }
        });

        props.input.setValue(selectedOptions);
        props.onChange && props.onChange();
    }

    const handleOnClickLabel = (event) => {
        event.target.previousSibling.click();
    }
    
    const options = props.options.map(option => {
        const value = option.value || option;
        const label = option.label || option.value || option;
        const checked = !!props.input.value && props.input.value.includes(value);

        return (
            <li key={value} className={`${style.option} ${props.optionClassName || ''}`} title={label}>
                <input type='checkbox' name={`${props.input.name}-${value}`} value={value} checked={checked} disabled={option.disabled} onChange={handleOnChange}/>
                <label className={option.disabled? style.disabled : ''} htmlFor={`${props.name}-${value}`} onClick={handleOnClickLabel}>{label}</label>
            </li>
        );
    });

    return (
        <div className={`${style.CheckBox} ${props.className || ''}`} >
            {props.label &&
                <label className={`${style.label} ${props.labelClassName || ''}`} >
                    {props.label}{props.optional && <span className={style.optional}> {props.optional}</span>}
                </label>
            }
            <ul ref={ul} className={`${style.optionsContainer} ${props.classNameOptionsContainer || ''}`} >
                {options}
            </ul>
        </div>
    );
}

export default CheckBox;