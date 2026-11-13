import React from 'react';
import style from './RadioButton.module.css';

/*
    COMPONENT PROPS

    input (required): an useInputValue hook. The input value and validity will be handle by the Input component.
    controlledValue (optional): if true, the component will not set the input value. It will be done using the provided onChange function. Default is false.
    label (optional): the input label
    optional (optional): if true, a text saying '(optional)' will be placed after the label.
    options (required): an array of strings or objects with the input options. Objects must have one of the following formarts:
        {value: 'string'} or {value: 'string', label: 'string'} or {value: 'string', label: 'string', description: 'string'}
    onChange (optional): the funtion to be executed when the input value changes
    className (optional): the css class to be applied in the main component tag
    style (optional): an style object to be applied in the main component tag
    labelClassName (optional): the css class to be applied in the label tag
    inputContainerClassName (optional): the css class to be applied in the div that holds the label and the options
    optionsContainerClassName (optional): the css class to be applied in the options container
*/

function RadioButton (props) {
    const handleOnChange = (event) => {
        !props.controlledValue && props.input.setValue(event.target.value);
        props.onChange && props.onChange({
            name: props.input.name,
            value: event.target.value
        });
    }

    const options = [];
    let useGridLayout = false;

    for(let option of props.options) {  
        const value = option.value || option;
        const label = option.label || option.value || option;
        const checked = value === props.input.value;

        const el = (
            <div key={value} className={`${style.option} ${props.optionClassName || ''}`}>
                <input
                    id={`${props.input.name}-${value}`} 
                    name={`${props.input.name}-${value}`}
                    type='radio'
                    value={value}
                    checked={checked}
                    onChange={handleOnChange}
                />
                <label 
                    className={checked? style.checked : ''} 
                    htmlFor={`${props.input.name}-${value}`}
                >
                    {label}
                </label>
            </div>
        );

        options.push(el);

        if(option.description) {
            options.push(
                <p className={`${style.description} ${props.descriptionClassName || ''}`} key={`desc-${value}`}>{option.description}</p>
            );
            useGridLayout = true;
        }
    }

    return (
        <div 
            className={`${style.RadioButton} ${props.className || ''}`}
            style={props.style || {}}
        >
            <div className={props.inputContainerClassName || ''}>
                <label className={`${style.label} ${props.labelClassName || ''}`}>{props.label}</label>
                <div className={`${props.optionsContainerClassName || ''} ${useGridLayout? style.optionsContainerGridLayout : style.optionsContainerFlexLayout}`}>
                    {options}
                </div>
            </div>
            {props.enableErrorMessage && 
                <p className={`${style.errorMessage}`}>{props.errorMessage}</p>
            }
        </div>
    );
}

export default RadioButton;