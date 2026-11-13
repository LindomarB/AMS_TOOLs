import React, { useEffect } from 'react';
import RadioButton from '../../../../Interface/inputs/radioButton/RadioButton';
import useInput from '../../../../hooks/useInput';
import classifications from '../../data/classifications';
import style from './section.module.css';
import formActions from './formActions/formActions';

function Classification(props) {
    const classification = useInput({
        name: 'classification',
        initialValue: props.values.classification,
        required: true,
        onChangeValue: ({value}) => {
            const tier5 = props.form.get('tiers', 'tier 5').value;

            if(tier5) {
                const newClassification = classifications.find(classification => classification.name === value);

                if(!newClassification.tier5.includes(tier5)) {
                    props.form.update({
                        section: 'tiers',
                        input: 'tier 5',
                        value: '',
                        isValid: false 
                    });
                }
            }

            props.form.update(
                {
                    section: 'solution',
                    input: 'was user guided',
                    value: '',
                    isValid: value !== 'User Adoption' 
                },
                {
                    section: 'solution',
                    input: 'main incident',
                    value: '',
                    isValid: value !== 'Duplicated' 
                },
                {
                    section: 'pbi',
                    input: 'number',
                    value: '',
                    isValid: value !== 'Application Bug' 
                }
            );

            if(value !== 'Application Bug' ) {
                const tiers = formActions.getTiers(props.form);
                const pbi = props.tiersTree.getDestinations(tiers).find(vertex => vertex.startsWith('PBI'));
                
                if(pbi) formActions.resetTiers(props.form, value);
            }
        }
    });

    const description = useInput({
        name: 'description',
        initialValue: props.values.description,
        required: true
    });

    useEffect(() => {
        props.setFormSection(props.name, [classification, description]);
    }, []);

    useEffect(() => {
        if(classification.value) {
            const value = classification.value;
            description.setValue(classifications.find(
                classification => classification.name === value
            ).description);
        }
    }, [classification.value]);

    const options = classifications.map(classification => ({
        value: classification.name, 
        description: classification.description
    }));

    return (
        <>
            <RadioButton
                optionsContainerClassName={style.optionsContainer}
                input={classification}
                label='How the incident is classified?'
                options={options}
            />
        </>
    );
}

Classification.defaultProps = {
    name: 'classification',
    subtitle: 'Classify the incident using the option that best fits'
}

export default Classification;