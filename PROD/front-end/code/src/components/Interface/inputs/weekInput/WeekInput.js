import React from 'react';
import CheckBox from '../checkBox/CheckBox';
import weekDays from './weekDays';
import style from './WeekInput.module.css';

function WeekInput(props) {
    const options = [
        {value: 'sun', label: weekDays.sun[props.lang]},
        {value: 'mon', label: weekDays.mon[props.lang]},
        {value: 'tue', label: weekDays.tue[props.lang]},
        {value: 'wed', label: weekDays.wed[props.lang]},
        {value: 'thu', label: weekDays.thu[props.lang]},
        {value: 'fri', label: weekDays.fri[props.lang]},
        {value: 'sat', label: weekDays.sat[props.lang]}
    ];

    return (
        <CheckBox
            {...props} 
            optionsContainerClassName={`${style.optionsContainer} ${props.optionsContainerClassName || ''}`}
            optionClassName={`${style.option} ${props.optionClassName || ''}`}
            options={options} 
        />
    );
}

WeekInput.defaultProps = {
    lang: 'en'
};

export default WeekInput;