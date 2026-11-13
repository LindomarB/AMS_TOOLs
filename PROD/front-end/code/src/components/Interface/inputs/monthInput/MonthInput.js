import React from 'react';
import CheckBox from '../checkBox/CheckBox';
import style from './MonthInput.module.css';

function MonthInput(props) {
    const daysAmmount = new Date(props.year, props.month, 0).getDate();
    const options = [];

    for(let day = 1; day <= daysAmmount; day++) {
        if(day < 10) options.push(`0${day}`); 
        else options.push(day.toString());
    }

    return (
        <CheckBox
            {...props} 
            optionsContainerClassName={`${style.optionsContainer} ${props.optionsContainerClassName || ''}`}
            optionClassName={`${style.option} ${props.optionClassName || ''}`}
            options={options} 
        />
    );
}

MonthInput.defaultProps = {
    year: 2000,
    month: 1
};

export default MonthInput;