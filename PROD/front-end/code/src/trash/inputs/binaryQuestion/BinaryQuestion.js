import React from "react";
import RadioButtonInput from "../radioButtonInput/RadioButtonInput";
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
        props.onChange(input)
    }

    return (
        <RadioButtonInput 
            className={`${style.BinaryQuestion} ${props.className || ""} ${(props.labelPosition === "left")? style.labelOnLeft : ""}`}
            style={props.style}
            labelOptionsContainerClassName={(props.labelPosition === "left")? style.labelOptionsContainerLeft : "" }
            optionsContainerClassName={(props.labelPosition === "left" || props.optionsDirection === "row")? style.optionsInRow : ""}
            name={props.name}
            label={props.label}
            options={options}
            selectedOption={props.value}
            onChange={handleOnChange}
            error={props.error}
            errorMessage={props.errorMessage}
        />
    );
}

export default BinaryQuestion;