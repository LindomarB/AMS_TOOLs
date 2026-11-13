import React from 'react';
import Text from '../../../Text/Text';
import style from './Option.module.css';

function Option(props) {
    return (
        <li 
            className={`${style.Option} ${props.description? style.withDescription : ''} ${props.groupOption? style.groupOption : ''} ${props.group? style.group : ''} ${props.className || ''}`} 
        >
            <input 
                className={style.input}
                id={props.inputKey} 
                data-group={props.groupOption || ''}
                type='checkbox' 
                name={props.group || props.inputKey} 
                value={props.value} 
                checked={props.checked} 
                disabled={props.disabled} 
                onChange={props.onChange}
                title={props.title || props.label}
            />
            <label 
                className={`${style.label} ${props.disabled? style.disabled : ''} ${props.checked? style.checked : ''}`} 
                htmlFor={props.inputKey} 
                title={props.title || props.label}
            >
                {props.label}
            </label>
            {props.description &&
                <Text className={style.description} color='grey'>{props.description}</Text>
            }
        </li>
    );
}

export default Option;