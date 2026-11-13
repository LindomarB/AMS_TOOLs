import React, { useRef } from 'react';
import Button from '../../buttons/button/Button';
import Option from './option/Option';
import style from './CheckBox.module.css';
/*
    COMPONENT PROPS

    input (required): an useInput hook. The input value and validity will be handle by the Input component.
    label (optional): the input label
    optional (optional): if true, a text saying '(optional)' will be placed after the label.
    options (required): an array of strings or objects with the input options. Objects must have one of the following formarts:
        {value: 'string'} or {value: 'string', label: 'string'} or {value: 'string', label: 'string', description: 'string'}.
        To divide the options in groups, options must be an object where each key is the group name and the valeu is a array of options.
    onChange (optional): the funtion to be executed when the input value changes
    className (optional): the css class to be applied in the main component tag
    style (optional): an style object to be applied in the main component tag
    labelClassName (optional): the css class to be applied in the label tag
    optionsContainerClassName (optional): the css class to be applied in the options container
*/

function CheckBox(props) {
    const ul = useRef();

    let {options: optionsData} = props;

    const handleOnChange = (event) => {
        const inputs = ul.current.querySelectorAll('input');
        const selectedOptions = [];

        inputs.forEach(input => {
            if(input.value !== '(Select all)' && input.checked) {
                selectedOptions.push(input.value);
            }
        });

        props.input.setValue && props.input.setValue(selectedOptions);
        props.onChange && props.onChange({
            name: props.input.name,
            value: selectedOptions
        });
    }

    const handleOnSelectAll = () => {
        const inputs = ul.current.querySelectorAll('input');

        inputs.forEach(input => {
            if(input.value !== '(Select all)') {
                if(notSelectedAll && !input.checked) {
                    input.click();
                } else if(!notSelectedAll && input.checked) {
                    input.click();
                }
            }
        });
    }

    const handleOnClearAll = () => {
        const inputs = ul.current.querySelectorAll('input');

        inputs.forEach(input => {
            if(input.checked) input.click();
        });
    }

    const handleOnSelectGroup = (event) => {
        const group = event.target.name;
        const selectedGroup = event.target.checked;
        const inputs = ul.current.querySelectorAll(`[data-group="${group}"]`);

        inputs.forEach(input => {
            if(selectedGroup && !input.checked) {
                input.click();
            } else if(!selectedGroup && input.checked) {
                input.click();
            }
        });
    }

    const createOption = (option, group) => {
        const value = option.value || option;
        const label = option.label || option.value || option;
        const checked = !!props.input.value && props.input.value.includes(value);
        const key = `${props.input.name}-${value}`;

        notSelectedAll++;
        if(checked) notSelectedAll--;

        return (
            <Option 
                {...option}
                key={key} 
                inputKey={key} 
                value={value}
                label={label}
                checked={checked}
                groupOption={group}
                onChange={handleOnChange}
            />
        );
    }

    const sortOptions = (options) => {
        options.sort((next, prev) => {
            if(next.props.title > prev.props.title) return 1;
            if(next.props.title < prev.props.title) return -1;
            return 0;
        });
    }

    if(!props.options) return;

    let options = null;
    let notSelectedAll = 0;

    if(optionsData.length) {
        options = optionsData.map(option => createOption(option));
        if(props.sort) sortOptions(options);
    } else {
        options = [];

        if(props.sort) {
            optionsData = Object.keys(optionsData).sort().reduce((obj, key) => {
                obj[key] = optionsData[key]
                return obj;
            }, {});
        }

        for(let group in optionsData) {
            if(props.selectGroup) {
                const groupValues = optionsData[group].map(option => option.value || option);
                const isGroupSelected = groupValues.every(value => props.input.value.includes(value));
                const isGroupDisabled = optionsData[group].every(option => option.disabled);
                const key = `group-${group}-select all`;
                
                options.push((
                    <Option 
                        key={key} 
                        inputKey={key} 
                        value='(Select all)' 
                        title='Select group'
                        label={group}
                        group={group}
                        checked={isGroupSelected}
                        disabled={isGroupDisabled}
                        onChange={handleOnSelectGroup}
                    />
                ));

            } else {
                options.push((
                    <p key={`group-${group}`} className={style.groupLabel}>{group}</p>
                ));
            }

            const groupOptions = optionsData[group].map(option => createOption(option, group));
            if(props.sort) sortOptions(groupOptions);
            options.push(groupOptions);
        }
    }

    let selectAll = null;

    if(props.selectAll && props.options.length > 1) {
        const key = `${props.name || props.label}-(Select all)`;

        selectAll = (
            <Option 
                className={style.selectAll}
                inputKey={key} 
                value='(Select all)' 
                label='(Select all)'
                checked={!notSelectedAll}
                onChange={handleOnSelectAll}
            />
        );
    }

    return (
        <div className={`${style.CheckBox} ${props.className || ''}`} >
            {props.label &&
                <div className={style.labelContainer}>
                    <label className={`${style.label} ${props.labelClassName || ''}`} >
                        {props.label}{props.optional && <span className={style.optional}> {props.optional}</span>}
                    </label>
                    {(props.clearAll && !!props.input.value.length) &&
                        <Button 
                            type='icon'
                            icon='clear filters'
                            onClick={handleOnClearAll}
                        />
                    }
                </div>
            }
            <ul ref={ul} className={`${style.optionsContainer} ${props.optionsContainerClassName || ''}`} >
                {selectAll}
                {options}
            </ul>
        </div>
    );
}

export default CheckBox;