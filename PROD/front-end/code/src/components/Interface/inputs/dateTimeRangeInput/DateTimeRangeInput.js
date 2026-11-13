import React, { useEffect, useState } from 'react';
import useInput from '../../../hooks/useInput';
import DateTimeInput from '../dateTimeInput/DateTimeInput';
import InputLayout from '../inputLayout/InputLayout';
import style from './DateTimeRangeInput.module.css';

function DateTimeRangeInput (props) {
    const [hasFocus, setHasFocus] = useState(false);

    const from = useInput({
        name: 'from', 
        initialValue: props.input.value && props.input.value.from, 
        required: props.input.required
    });

    const to = useInput({
        name: 'to', 
        initialValue: props.input.value && props.input.value.to, 
        required: props.input.required
    });

    useEffect(() => {
        if(!props.input.value) {
            !props.input.value && props.input.setValue({from: '', to: ''});

            from.setValue('');
            to.setValue('');
        } else {
            const newValue = getDateTime(structuredClone(props.input.value));

            from.setValue(newValue.from);
            to.setValue(newValue.to);

            props.onChange && props.onChange({name: props.input.name, newValue});
        }
    }, [props.input.value]);

    const handleOnFocus = () => {
        setHasFocus(true);
        props.onFocus && props.onFocus({
            name: props.input.name,
            value: props.input.value
        });
    }

    const handleOnBlur = () => {
        setHasFocus(false);
        props.onBlur && props.onBlur({
            name: props.input.name,
            value: props.input.value
        });
    }

    const handleOnChange = ({name, value}) => {
        const newValue = {...props.input.value, [name]: value}
        getDateTime(newValue);
        
        props.input.setValue(newValue);
        props.onChange && props.onChange({name: props.input.name, newValue});
    }

    const getDateTime = (value) => {
        if(props.type === 'date') {
            const timezone = new Date().getTimezoneOffset() * 60000;

            if(value.from && value.from.date) {
                value.from.dateTime = new Date(new Date(value.from.date).getTime() + timezone).toISOString();
            }

            if(value.to && value.to.date) {
                value.to.dateTime = new Date(new Date(value.to.date).getTime() + timezone + 86400000).toISOString();
            }
        }

        return value;
    }

    const icon = props.type === 'time'
        ? 'schedule'
        : props.type === 'datetime'
        ? 'event'
        : 'calendar';

    const dateTimeProps = {
        disableIcon: true,
        disableHighlightOnFocus: true,
        noLayout: true,
        type: props.type,
        onFocus: handleOnFocus,
        onBlur: handleOnBlur,
        onChange: handleOnChange
    }

    const input = {
        isValid: from.isValid && to.isValid,
        value: !!from.value || !!to.value,
        errorChecker: props.input.errorChecker,
        errorMessage: props.input.errorMessage
    };

    const minFrom = props.min;
    const maxFrom = to.value[props.type] || props.max;
    const minTo = from.value[props.type] || props.min;
    const maxTo = props.max;

    return (
        <InputLayout 
            {...props}
            input={input}
            hasFocus={hasFocus}
            icon={icon}
            disableErrorMessage
        >
            <DateTimeInput {...dateTimeProps} placeholder={props.placeholderFrom || 'From'} min={minFrom} max={maxFrom} input={from}/>
            <span className={style.separator}>-</span>
            <DateTimeInput {...dateTimeProps} placeholder={props.placeholderTo || 'To'} min={minTo} max={maxTo} input={to}/>
        </InputLayout>
    );
}

DateTimeRangeInput.defaultProps = {
    type: 'date'
}

export default DateTimeRangeInput;