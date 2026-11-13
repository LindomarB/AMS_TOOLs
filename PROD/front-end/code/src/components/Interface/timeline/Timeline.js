import React, { useEffect, useRef } from "react";
import Tooltip from "../tooltip/Tooltip";
import style from "./Timeline.module.css";

/*
    COMPONENT PROPS

    steps (required): an array of objects that defined the time line step name and if it is disabled. [{name: '', disabled: true || false}]
    currentStep (required): the current step (index).
    onClickStep (optional): a function to be trigged when a step is clicked, and receives and argument the step index.
*/

function Timeline(props) {
    const currentStep = useRef();
    
    useEffect(() => {
        currentStep.current.scrollIntoView({behavior: "smooth", block: "center"});
    }, [props.currentStep]);

     
    const firstDisabledStep = props.steps.findIndex(step => step.disabled);

    const steps = props.steps.map((step, stepIdx) => {            
        const disableStep = firstDisabledStep === -1
            ? false
            : stepIdx > firstDisabledStep;
        
        const isCurrentStep = stepIdx === props.currentStep;
        const isNextStep = firstDisabledStep === stepIdx;
        const isLastStep = stepIdx === props.steps.length - 1;

        return (
            <Tooltip
                key={stepIdx}
                contentClassName={`${style.tooltip} ${(disableStep || isNextStep)? style.disabled : ""}`}
                content={step.name}
                position="left"
                hideDelay={0}
                disabled={!props.tiny}
            >
                <div 
                    className={style.stepContainer}
                >
                    <button 
                        ref={isCurrentStep? currentStep : null}  
                        className={`${style.step} ${!step.disabled? style.complete : ""} ${isCurrentStep? style.current : ""} ${isNextStep? style.next : ""}`} 
                        onClick={() => props.onClickStep(stepIdx)}
                        disabled={disableStep}
                    >
                        <div className={style.checkerContainer}>
                            {!isLastStep && <div className={style.line}></div>}
                            <div className={style.checkerBackground}>
                                <div className={style.checkerOutCircle}></div>
                                <div className={style.checker}></div>
                            </div>
                        </div>
                        {!props.tiny &&
                            <p className={style.stepName} label={step.name}>{step.name}</p>
                        }
                    </button>
                </div>
            </Tooltip>
        );
    });

    return (
        <div className={`${style.Timeline} ${props.className || ""} ${props.tiny? style.tiny : ""}`}>
            {steps}
        </div>
    );
}

export default Timeline;