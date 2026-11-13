import React, { useEffect, useRef } from "react";
import Tooltip from "../../components/Interface/tooltip/Tooltip";
import style from "./FormTimeline.module.css";

function FormTimeline(props) {
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
                            <p className={style.stepName}>{step.name}</p>
                        }
                    </button>
                </div>
            </Tooltip>
        );
    });

    return (
        <div className={`${style.FormTimeline} ${props.className || ""} ${props.tiny? style.tiny : ""}`}>
            {steps}
        </div>
    );
}

export default FormTimeline;