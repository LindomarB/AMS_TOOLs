import React, { useEffect } from 'react';
import useInput from '../../../../hooks/useInput';
import BinaryQuestion from '../../../../Interface/inputs/binaryQuestion/BinaryQuestion';
import Fade from '../../../../Interface/animations/fade/Fade';
import RadioButton from '../../../../Interface/inputs/radioButton/RadioButton';
import breachReasons from '../../data/breachReasons';
import Text from '../../../../Interface/Text/Text';

function SLA(props) {
    const wasLost = useInput({
        name: 'was lost',
        initialValue: props.values['was lost'],
        required: true
    });

    const wiproFault = useInput({
        name: 'wipro fault',
        initialValue: props.values['wipro fault'],
        required: wasLost.value === 'yes',
        dependencies: [wasLost]
    });

    const breachReason = useInput({
        name: 'breach reason',
        initialValue: props.values['breach reason'],
        required: wasLost.value === 'yes',
        dependencies: [wasLost]
    });

    const breachDescription = useInput({
        name: 'breach description',
        initialValue: props.values['breach description'],
        required: wasLost.value === 'yes',
        dependencies: [wasLost]
    });

    const exception = useInput({
        name: 'exception',
        initialValue: props.values.exception,
        required: wasLost.value === 'yes',
        dependencies: [wasLost]
    });
    
    useEffect(() => {
        if(wasLost.value === 'no') {
            wiproFault.setValue('');
            breachReason.setValue('');
            breachDescription.setValue('');
            exception.setValue('');
        }
    }, [wasLost.value]);

    useEffect(() => {
        props.setFormSection(props.name, [wasLost, wiproFault, breachReason, exception, breachDescription]);
    }, []);

    useEffect(() => {
        if(breachReason.value) {
            const breachReasonData = breachReasons.find(
                breach => breach.name === breachReason.value
            );

            breachDescription.setValue(breachReasonData.description['en']);
            exception.setValue(breachReasonData.exception);
        }
    }, [breachReason.value]);

    const breachReasonOptions = breachReasons.map(breachReason => ({
        value: breachReason.name,
        description: (
            <Text span>
                {breachReason.description['en']}<br/>
                <Text span color='grey' weight={600}>
                    {`Exception: ${breachReason.exception}`}
                </Text>
            </Text>
        )
    }));

    return (
        <>
            <BinaryQuestion
                input={wasLost}
                label='SLA was lost?'
            />
            <Fade in={wasLost.value === 'yes'}>
                <BinaryQuestion
                    input={wiproFault}
                    label='Was Wipro’s fault?'
                />
            </Fade>
            <Fade in={wasLost.value === 'yes'}>
                <RadioButton
                    input={breachReason}
                    label='What is the breach reason?'
                    options={breachReasonOptions}
                />
            </Fade>
        </>
    );
}

SLA.defaultProps = {
    name: 'sla',
    title: 'SLA',
    subtitle: 'Give the details about the incident SLA'
};

export default SLA;