import React from 'react';
import Icon from '../../icons/icon/Icon';
import style from './InputLayout.module.css';
import { useRef } from 'react';

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
    inputWrapperClassName (optional): a CSS class to be applied to inputWrapper.
    style (optional): a style object to be applied in the main element.    
*/

function InputLayout(props) {
    const inputLayout = useRef();
    let stateStyle = ''; 

    if(props.disabled) {
        stateStyle = style.disabled;
    } else if(props.hasFocus && !props.disableHighlightOnFocus) {
        stateStyle = style.focus;
    } else if(!props.input.awaitingExternalValidation && !props.input.isValid && (props.input.value || props.showErrorMessageWhenEmpty)) {
        stateStyle = style.error;
    }

    const disableErrorMessage = props.disableErrorMessage || (!props.input.errorChecker && !props.input.externalValidator && !props.showErrorMessageWhenEmpty);

    return (
        <div 
            ref={inputLayout}
            className={`${style.InputLayout} ${props.className || ''} ${props.labelOnLeft? style.labelOnLeft : ''} ${stateStyle} ${props.locked? style.locked : ''}`}
            style={props.style || {}}
        >
            {props.label &&
                <label className={`${style.label} ${props.labelClassName || ''}`} >
                    {props.label}
                    {props.optional && 
                        <span className={style.optional}> 
                            {(props.optional === true && '(optional)') || props.optional }
                        </span>
                    }
                    {props.capsLockOn &&
                        <span className={style.capsLockOn}> 
                            (CapsLock On)
                        </span>
                    }
                </label>
            }
            <div className={`${style.inputWrapper} ${props.resizable? style.resizable : ''} ${props.disabled || props.locked? style.locked : ''} ${props.inputWrapperClassName || ''}`}>
                {props.icon && 
                    <Icon className={style.icon} name={props.icon} color={props.hasFocus? 'navyBlue' : 'lightGrey'} filled={props.hasFocus? true : false} size={20} weight={300}/>
                }
                {props.children}
            </div>
            {!disableErrorMessage && (
                props.input.awaitingExternalValidation
                    ? (
                        <p className={`${style.errorMessage} ${style.awaitingExternalValidation}`}>
                            Validating...
                        </p>
                    ) : (
                        <p className={`${style.errorMessage}`}>
                            {stateStyle === style.error? props.input.errorMessage : ''}
                        </p>
                    )
                )
            }
        </div>
    );
}

export default InputLayout;