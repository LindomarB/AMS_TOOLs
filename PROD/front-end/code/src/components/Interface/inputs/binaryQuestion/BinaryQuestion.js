import React from "react";
import RadioButton from "../radioButton/RadioButton";
import style from "./BinaryQuestion.module.css";

function BinaryQuestion (props) {

    const options = [
        {
            value: props.binaryReturn
                ? 1 
                : props.booleanReturn
                ? true
                : props.yesValue || "yes",
            label: props.yesLabel || "Yes"
        },
        {
            value: props.binaryReturn
                ? 0 
                : props.booleanReturn
                ? false
                : props.noValue || "no",
            label: props.noLabel || "No"
        }
    ];

    const handleOnChange = (input) => {
        if(props.binaryReturn) {
            input.value = +input.value;
        }  else if(props.booleanReturn) {
            input.value = input.value === "true";
        }
        
        props.input.setValue(input.value);
    }

    return (
        <RadioButton
            {...props}
            className={`${style.BinaryQuestion} ${props.className || ""} ${(props.labelPosition === "left")? style.labelOnLeft : ""}`}
            labelOptionsContainerClassName={(props.labelPosition === "left")? style.labelOptionsContainerLeft : "" }
            optionsContainerClassName={(props.labelPosition === "left" || props.optionsDirection === "row")? style.optionsInRow : ""}
            options={options}
            onChange={handleOnChange}
            controlledValue
        />
    );
}

export default BinaryQuestion;