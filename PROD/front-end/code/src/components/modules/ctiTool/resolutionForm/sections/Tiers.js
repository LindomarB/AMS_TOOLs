import React, { useEffect, useState } from 'react';
import useInput from '../../../../hooks/useInput';
import Select from '../../../../Interface/inputs/select/Select';
import classificationData from '../../../../../trash/classificationData';
import InputsTimeline from '../../../../Interface/inputsTimeline/InputsTimeline';
import capitalize from '../../../../../functions/text/capitalize';
import style from './Tiers.module.css';
import formActions from './formActions/formActions';

function Tiers(props) {
    const [currentTier, setCurrentTier] = useState(getCurrentTier(props.values));
    const tier1 = useInput({
        name: 'tier 1',
        initialValue: props.values['tier 1'],
        required: true
    });

    const tier2 = useInput({
        name: 'tier 2',
        initialValue: props.values['tier 2'],
        required: true
    });

    const tier3 = useInput({
        name: 'tier 3',
        initialValue: props.values['tier 3'],
        required: true
    });

    const tier4 = useInput({
        name: 'tier 4',
        initialValue: props.values['tier 4'],
        required: true,
        dependencies: [tier1, tier2, tier3],
        onChangeValue: ({value, dependencies}) => {
            const nextVertices = props.tiersTree.getDestinations([
                props.form.get('incident', 'country').value.toUpperCase(),
                dependencies.find(dependency => dependency.name === 'tier 1').value,
                dependencies.find(dependency => dependency.name === 'tier 2').value,
                dependencies.find(dependency => dependency.name === 'tier 3').value,
                value
            ]);

            const kba = nextVertices.find(vertex => vertex.startsWith('KBA'));
            const resolutionKba = props.form.get('kba', 'number').value;

            if(kba) {
                props.form.update({
                    section: 'kba',
                    input: 'number',
                    value: kba,
                    isValid: true
                });

                if(resolutionKba) {
                    props.notify({
                        message: `The KBA ${kba} was related to the resolution`
                    });
                }
            } else {
                if(resolutionKba) {
                    const isKbaRelatedToOtherTiers = props.tiersTree.getVertex(resolutionKba);

                    if(isKbaRelatedToOtherTiers) {
                        props.form.update({
                            section: 'kba',
                            input: 'number',
                            value: '',
                            isValid: true
                        });

                        props.notify({
                            message: `The KBA ${resolutionKba} that was related to the incident has been removed`
                        });
                    }
                }
            } 

            const pbi = nextVertices.find(vertex => vertex.startsWith('PBI'));
            const isApplicationBug = props.form.get('classification', 'classification').value === 'Application Bug'

            if(pbi) {
                props.form.update({
                    section: 'pbi',
                    input: 'number',
                    value: pbi,
                    isValid: true
                });

                if(!isApplicationBug) {
                    formActions.changeClassification(props.form, 'Application Bug');
                    tier5.reset();

                    props.notify({
                        message: `Classification changed to 'Application Bug'`
                    });
                }
            } else {
                const resolutionPbi = props.form.get('pbi', 'number').value;

                if(resolutionPbi) {
                    const isPbiRelatedToOtherTiers = props.tiersTree.getVertex(resolutionPbi);

                    if(isPbiRelatedToOtherTiers) {
                        props.form.update({
                            section: 'pbi',
                            input: 'number',
                            value: '',
                            isValid: !isApplicationBug
                        });
                    }
                }
            }   
        }
    });

    const tier5 = useInput({
        name: 'tier 5',
        initialValue: props.values['tier 5'],
        required: true
    });
    
    useEffect(() => {
        props.setFormSection(props.name, inputs);
    }, []);

    useEffect(() => {

    }, []);

    const inputs = [tier1, tier2, tier3, tier4, tier5];
    
    const handleOnClickStep = (step) => {
        setCurrentTier(step);
    }

    const handleOnChangeInputValue = () => {
        const nextTier = (currentTier + 1 > 4)? 4 : currentTier + 1;

        setCurrentTier(nextTier);
        resetNextTiers(nextTier);
    }

    const resetNextTiers = (currentTier) => {
        if(currentTier === 4) return;

        for(let tier = currentTier; tier < 4; tier++) {
            inputs[tier].reset();
        }
    }

    const getPath = () => {
        const country = props.form.get('incident', 'country').value;

        if(!country) return [];

        const path = [country.toUpperCase()];

        for(let tier = 0; tier < currentTier; tier++) {
            const tierValue = inputs[tier].value;
            if(!tierValue) break;
            path.push(tierValue);
        }

        return path;
    }

    const options = currentTier === 4
        ? classificationData.find(data => data.classification === props.form.get('classification', 'classification').value).tier5
        : props.tiersTree.getDestinations(getPath());

    return (
        <div className={style.Tiers}>
            <div className={style.inputsContainer}>
                <InputsTimeline
                    className={style.timeline}
                    steps={createSteps(inputs)}
                    currentStep={currentTier}
                    onClickStep={handleOnClickStep}
                />
                <Select 
                    className={style.select}
                    input={inputs[currentTier]}
                    size='2'
                    options={options}
                    onChange={handleOnChangeInputValue}
                    sort
                />
            </div>
        </div>
    );
}

function getCurrentTier(values) {
    let currentTier = 0;

    for(let tier = 0; tier < 5; tier++) {
        currentTier = tier;

        if(!values[`tier ${tier + 1}`]) {
            break;
        }
    }

    return currentTier;
}

function createSteps(inputs) {
    return inputs.map(input => ({
        name: capitalize(input.name),
        value: input.value,
        isValid: input.isValid
    }));
}

Tiers.defaultProps = {
    name: 'tiers',
    subtitle: 'Categorize the incident using the following tiers'
}

export default Tiers;