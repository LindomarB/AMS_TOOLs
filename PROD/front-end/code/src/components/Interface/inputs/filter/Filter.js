import React from "react";
import style from "./Filter.module.css";

function Filter(props) {
    const handleOnSelectOption = (option) => {
        let selectedOptions = [...props.selectedOptions];
        
        const optionIndex = selectedOptions.findIndex(selectedOption => selectedOption === option);

        if(optionIndex === -1) {
            selectedOptions.push(option);
        } else {
            selectedOptions = selectedOptions.slice(0, optionIndex).concat(selectedOptions.slice(optionIndex + 1));
        }

        props.onSelectOption({
            name: props.name,
            selectedOptions
        });
    }

    const options = props.options.map(option => {
        const value = option || "(blank)";
        const isActive = props.selectedOptions.includes(value);

        return (
            <div 
                key={`${props.name}-${value}`}
                className={`${style.option} ${isActive? style.active : ''}`} 
                onClick={() => handleOnSelectOption(option)}
            >
                <div className={`${style.checkBox}`}>
                    <span className="material-icons">check</span>
                </div>
                <span className={style.label} title={value}>{value}</span>
            </div>
        );
    });

    return (
        <div className={`${props.className || ""}`}>
            <h3 className={style.name} title={props.label}>{props.label}</h3>
            <div className={style.options}>
                {options}
            </div>
        </div>
    );
}

Filter.defaultProps = {
    selectedOptions: []
}

export default Filter;