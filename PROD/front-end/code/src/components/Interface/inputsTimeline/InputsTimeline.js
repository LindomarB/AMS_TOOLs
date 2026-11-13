import React from "react";
import style from "./InputsTimeline.module.css";

function InputsTimeline(props) {     
    const firstDisabledStep = props.steps.findIndex(step => !step.isValid);

    const steps = props.steps.map((step, stepIdx) => {            
        const disableStep = firstDisabledStep === -1
            ? false
            : stepIdx > firstDisabledStep;

        const isCurrentStep = stepIdx === props.currentStep;

        return (
            <button 
                key={stepIdx} 
                className={`${style.step} ${step.isValid && style.complete} ${isCurrentStep && style.current}`} 
                onClick={() => props.onClickStep(stepIdx)}
                disabled={disableStep}
            >
                <p className={style.stepName}>{step.name}</p>
                <p className={style.stepValue}>{step.value || "-"}</p>
            </button>
        );
    });

    const completedStep = props.steps[props.currentStep].isValid;

    return (
        <div className={`${style.InputsTimeline} ${props.className || ""}`}>
            <div 
                className={`${style.selector} ${completedStep? style.green : ""}`} 
                style={{top: `${props.currentStep * 100}px`}}
            ></div>
            {steps}
        </div>
    );
}

export default InputsTimeline;