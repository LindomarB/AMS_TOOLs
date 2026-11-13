import React from 'react';
import Button from '../../buttons/button/Button';
import style from './FormButtons.module.css';

function FormButtons(props) {
    const handleOnNavigateSection = (increment) => {
        props.setCurrentSection(curSt => curSt + increment);
    }

    return (
        <div className={`${style.FormButtons} ${props.buttonsContainerClassName || ''}`}>
            {!props.firstSection && 
                <Button
                    key='back'
                    className={`${style.button} ${props.buttonClassName || ''}`}
                    color='blue'
                    icon='back'
                    onClick={() => handleOnNavigateSection(-1)}
                >
                    Back
                </Button>
            }
            {props.lastSection
                ? (
                    <Button
                        key='submit'
                        color='blue'
                        highlight
                        disabled={!props.sectionIsValid}
                        onClick={props.onSubmit}
                        children='Submit'
                        {...props.submitButton || {}}
                        className={`${style.button} ${props.submitButton && props.submitButton.className || ''}`}
                    />
                )
                : (
                    <Button
                        key='next'
                        className={`${style.button} ${props.buttonClassName || ''}`}
                        color='blue'
                        icon='forward'
                        iconPosition='right'
                        disabled={!props.sectionIsValid}
                        onClick={() => handleOnNavigateSection(1)}
                    >
                        Next
                    </Button>
                )                        
            }
        </div>
    );
}

export default FormButtons;