import React from 'react';
import style from './InputLayout.module.css';

/*
    COMPONENT PROPS

    input (required): an useInputValue hook used to manage the InputLayout style.
    label (optional): the input label.
    labelOnLeft (optional): by default, the label appears at input's top. If labelOnLeft is true, it will be displayed at input's left.
    labelClassName (optional): a CSS class to be applied on the label.
    optional (optional): if true, a text saying '(optional)' will be placed after the label.
    disableErrorMessage (optional): if true, the error message will never be displayed.
    showErrorMessageWhenEmpty (optional): a boolean. By default (false), if the error props is true but the input has no value, no error message will be displayed. If this boolean is true, the error message will be displayed.
    className (optional): a CSS class to be applied in the main element.
    style (optional): a style object to be applied in the main element.    
*/

function InputLayout (props) {
    let stateStyle = ''; 

    if(props.hasFocus && !props.disableHighlightOnFocus) {
        stateStyle = style.focus;
    } else if(!props.input.isValid && (props.input.value || props.showErrorMessageWhenEmpty)) {
        stateStyle = style.error;
    }

    const disableErrorMessage = props.disableErrorMessage || (!props.input.checker && !props.showErrorMessageWhenEmpty);

    return (
        <div 
            className={`${style.InputLayout} ${props.className || ''} ${props.labelOnLeft? style.labelOnLeft : ''} ${stateStyle}`}
            style={props.style || {}}
        >
            {props.label &&
                <label className={`${style.label} ${props.labelClassName || ''}`} >
                    {props.label}{props.optional && <span className={style.optional}> {props.optional}</span>}
                </label>
            }
            {props.children}
            {!disableErrorMessage &&
                <p className={`${style.errorMessage}`}>{(stateStyle === style.error)? props.input.errorMessage : '' }</p>
            }
        </div>
    );
}

export default InputLayout;