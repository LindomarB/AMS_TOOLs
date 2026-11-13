import React, { useEffect } from 'react';
import useInput from '../../../../hooks/useInput';
import TextInput from '../../../../Interface/inputs/textInput/TextInput';
import BinaryQuestion from '../../../../Interface/inputs/binaryQuestion/BinaryQuestion';
import RadioButton from '../../../../Interface/inputs/radioButton/RadioButton';
import Fade from '../../../../Interface/animations/fade/Fade';
import reopeningReasonOptions from '../../data/reopeningReasons';
import style from './section.module.css';

function Problem(props) {
    const problem = useInput({
        name: 'problem',
        initialValue: props.values.problem,
        required: true
    });

    const diagnosisMatchProblem = useInput({
        name: 'diagnosis matches the problem',
        initialValue: props.values['diagnosis matches the problem'],
        required: true
    });

    const isReopening = useInput({
        name: 'is reopening',
        initialValue: props.values['is reopening'],
        required: true,
        onChangeValue: ({value}) => {
            if(value === 'no') {
                reopeningReason.setValue('');
            }
        }
    });
    
    const reopeningReason = useInput({
        name: 'reopening reason',
        initialValue: props.values['reopening reason'],
        required: isReopening.value === 'yes',
        dependencies: [isReopening]
    });

    useEffect(() => {
        props.setFormSection(props.name, [problem, diagnosisMatchProblem, isReopening, reopeningReason]);
    }, []);

    const reopenReasonOptions = reopeningReasonOptions.map(option => ({
        value: option.value,
        label: option.value
    }));

    return (
        <>
            <TextInput 
                className={style.textArea}
                type='area'
                label='What was the problem?'
                input={problem}
                placeholder='Provide the problem details...'
            />
            <BinaryQuestion
                input={diagnosisMatchProblem}
                label='Does the diagnosis match the problem reported by the user?'
                optionsDirection='row'
                language='en'
            />
            <BinaryQuestion
                input={isReopening}
                label='The incident was reopening?'
                optionsDirection='row'
                language='en'
            />
            <Fade in={isReopening.value === 'yes'}>
                <RadioButton
                    optionsContainerClassName={style.optionsContainer}
                    input={reopeningReason}
                    label='Why the incident was reopened?'
                    options={reopenReasonOptions}
                />
            </Fade>
        </>
    );
}

Problem.defaultProps = {
    name: 'problem',
    subtitle: 'Give a detailed description about the problem'
};

export default Problem;