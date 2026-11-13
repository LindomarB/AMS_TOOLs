import React from 'react';
import style from './RadioButtonInput.module.css';

/*
    COMPONENT PROPS

    input (required): an useInputValue hook. The input value and validity will be handle by the Input component.
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

function RadioButtonInput (props) {
    const handleOnChange = (event) => {
        props.input.setValue(event.target.value);
        props.onChange && props.onChange();
    }

    const handleOnClickLabel = (event) => {
        event.target.previousSibling.click();
    }

    const options = [];
    let useGridLayout = false;

    for(let option of props.options) {  
        const value = option.value || option;
        const label = option.label || option.value || option;

        const el = (
            <div key={value} className={`${style.option} ${props.optionClassName || ''}`}>
                <input 
                    name={`${props.input.name}-${value}`}
                    type='radio'
                    value={value}
                    checked={value === props.input.value}
                    onChange={handleOnChange}
                />
                <label onClick={handleOnClickLabel}>{label}</label>
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
            className={`${style.RadioButtonInput} ${props.className || ''}`}
            style={props.style || {}}
        >
            <div className={props.inputContainerClassName || ''}>
                <label className={`${style.label} ${props.labelClassName || ''}`}>{props.label}</label>
                <div className={`${props.optionsContainerClassName || ''} ${useGridLayout? style.optionsContainerGridLayout : style.optionsContainerFlexLayout}`}>
                    {options}
                </div>
            </div>
            <p className={`${style.errorMessage}`}>{props.errorMessage}</p>
        </div>
    );
}

export default RadioButtonInput;