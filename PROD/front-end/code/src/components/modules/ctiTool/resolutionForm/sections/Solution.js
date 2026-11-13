import React, { useEffect } from 'react';
import useInput from '../../../../hooks/useInput';
import TextInput from '../../../../Interface/inputs/textInput/TextInput';
import BinaryQuestion from '../../../../Interface/inputs/binaryQuestion/BinaryQuestion';
import Fade from '../../../../Interface/animations/fade/Fade';
import style from './section.module.css';
import remedyNumberValidation from '../../../../../functions/inputValidation/remedyNumberValidation';

function Solution(props) {
    const classification = props.form.get('classification', 'classification').value;
    const isUserAdoption = classification === 'User Adoption';
    const isDuplicated = classification === 'Duplicated';

    const solution = useInput({
        name: 'solution',
        initialValue: props.values.solution,
        required: true
    });

    const usedSql = useInput({
        name: 'used sql',
        initialValue: props.values['used sql'],
        required: true,
        onChangeValue: ({value}) => {
            if(value === 'no') {
                sqlCode.setValue('');
            }
        }
    });

    const sqlCode = useInput({
        name: 'sql code',
        initialValue: props.values['sql code'],
        required: usedSql.value === 'yes',
        dependencies: [usedSql]
    });

    const wasUserGuided = useInput({
        name: 'was user guided',
        initialValue: props.values['was user guided'],
        required: isUserAdoption,
    });

    const mainIncident = useInput({
        name: 'main incident',
        initialValue: props.values['main incident'],
        required: isDuplicated,
        /*errorChecker: (value) => {
            const isValid = remedyNumberValidation('inc', value);

            if(isValid) {
                return value.toLowerCase() !== props.form.get('incident', 'incident').value.toLowerCase() 
                    ? null 
                    : 'The main incident cannot be the same as the duplicated incident';
            }

            return 'The incident number is not in a valid format';
        },*/
    });

    useEffect(() => {
        props.setFormSection(props.name, [solution, usedSql, sqlCode, wasUserGuided, mainIncident]);
    }, []);

    return (
        <>
            <TextInput 
                className={style.textArea}
                type='area'
                input={solution}
                label='What was the solution?'
                placeholder='Provide the solution details...'
            />
            {isUserAdoption &&
                <BinaryQuestion
                    input={wasUserGuided}
                    label='Was the user guided?'
                    optionsDirection='row'
                    language='en'
                />
            }
            {isDuplicated &&
                <TextInput
                    input={mainIncident}
                    label='As this incident is duplicated, what is the main incident?'
                    placeholder='Incident number' // (ex: INC000123456789)'
                    uppercase
                />
            }
            <BinaryQuestion
                input={usedSql}
                label='Was used SQL to solve?'
                optionsDirection='row'
                language='en'
            />
            <Fade in={usedSql.value === 'yes'}>
                <TextInput 
                    className={`${style.textArea} ${style.code}`}
                    type='area'
                    input={sqlCode}
                    label='Provide the SQL code used'
                    placeholder='UPDATE table SET field...'
                />
            </Fade>
        </>
    );
}

Solution.defaultProps = {
    name: 'solution',
    subtitle: 'Describe the solution applied and details about SQL used'
};

export default Solution;