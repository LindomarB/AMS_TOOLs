import React, { useEffect, useRef, useState } from 'react';
import useInput from '../../../../hooks/useInput';
import TextInput from '../../../../Interface/inputs/textInput/TextInput';
import Text from '../../../../Interface/Text/Text';
import style from './PBI.module.css';
import Button from '../../../../Interface/buttons/button/Button';
import pbiKbaValidator from './inputValidators/pbiKbaValidator';
import formActions from './formActions/formActions';
import Warning from '../../../../Interface/warning/Warning';

function KBA(props) {
    const [isNotApplicationBug, setIsNotApplicationBug] = useState(props.form.get('classification', 'classification').value !== 'Application Bug');
    const [resolutionTiers, setResolutionTiers] = useState(formActions.getTiers(props.form));
    const [kbaRelatedToOtherTiers, setKbaRelatedToOtherTiers] = useState();
    const [allowTiersChange, setAllowTiersChange] = useState();
    const [resolutionTiersHaveKba, setResolutionTiersHaveKba] = useState(props.tiersTree.getDestinations(resolutionTiers).find(vertex => vertex.startsWith('KBA')));
    const [relatedPbi, setRelatedPbi] = useState();
    const [tiersChanged, setTiersChanged] = useState();
    const kbaValidation = useRef();

    const kbaNumber = useInput({
        name: 'number',
        initialValue: props.values.number,
        required: resolutionTiersHaveKba,
        errorChecker: (value) => {
            kbaValidation.current = pbiKbaValidator({
                type: 'kba',
                number: value,
                path: resolutionTiers,
                tiersTree: props.tiersTree
            });

            return kbaValidation.current.isValid? null : kbaValidation.current.error;
        },
    });

    useEffect(() => {
        props.setFormSection(props.name, [kbaNumber]);
    }, []);

    useEffect(() => {
        if(tiersChanged) {
            const newTiers = formActions.getTiers(props.form);
            setResolutionTiers(newTiers);
            setResolutionTiersHaveKba(props.tiersTree.getDestinations(newTiers).find(vertex => vertex.startsWith('KBA')));
            setIsNotApplicationBug(props.form.get('classification', 'classification').value !== 'Application Bug');
            setTiersChanged(false);
        }
    }, [tiersChanged]);

    useEffect(() => {
        kbaNumber.validateInput();
    }, [resolutionTiers]);
    
    useEffect(() => {
        if(!kbaValidation.current)return;

        const {isValid, relatedTiers, relatedPbi} = kbaValidation.current;
        
        if(!kbaNumber.value || isValid || (!isValid && !relatedTiers)) {
            setKbaRelatedToOtherTiers(false);
            setAllowTiersChange(false);
            setRelatedPbi(null);
        } else {
            if(relatedTiers) {
                let kbaRelatedToOtherTiers = null;
                let allowTiersChange = true;

                const resolutionCountry = props.form.get('incident', 'country').value;
                const pathWithResolutionCountry = relatedTiers.find(path => 
                    path[0].toLowerCase() === resolutionCountry.toLowerCase()
                );

                if(pathWithResolutionCountry) {
                    kbaRelatedToOtherTiers = pathWithResolutionCountry;
                } else {
                    const countries = relatedTiers.map(path => path[0]).sort().join(' / ');
                    const path = relatedTiers[0];
                    path[0] = countries;
                    kbaRelatedToOtherTiers = path;
                    allowTiersChange = false;
                }

                if(relatedPbi) {
                    if(relatedPbi.length === 1) {
                        kbaRelatedToOtherTiers.push(relatedPbi[0]);
                        setRelatedPbi(relatedPbi[0]);
                    } else {
                        kbaRelatedToOtherTiers.push(relatedPbi.join(' / '));
                        allowTiersChange = false;
                        setRelatedPbi(null);
                    }
                }

                setKbaRelatedToOtherTiers(kbaRelatedToOtherTiers);
                setAllowTiersChange(allowTiersChange);
            }
        }
    }, [kbaNumber.value, resolutionTiersHaveKba]);

    const handleOnChangeTiers = () => {
        if(!allowTiersChange) return;

        const inputs = [
            'tier 1',
            'tier 2',
            'tier 3',
            'tier 4'
        ];

        inputs.forEach((input, index) => {
            props.form.update({
                section: 'tiers',
                input: input,
                value: kbaRelatedToOtherTiers[index + 1],
                isValid: true
            });
        });

        props.form.update({
            section: 'kba',
            input: 'number',
            value: kbaNumber.value,
            isValid: true
        });

        props.notify({
            message: 'The tiers have been changed'
        });

        if(relatedPbi) {
            props.form.update({
                section: 'pbi',
                input: 'number',
                value: relatedPbi,
                isValid: true
            });

            if(isNotApplicationBug) {
                formActions.changeClassification(props.form, 'Application Bug');

                props.form.update({
                    section: 'tiers',
                    input: 'tier 5',
                    value: '',
                    isValid: false
                });

                props.changeSection('tiers');
            }
        } else if(!isNotApplicationBug) {
            formActions.changeClassification(props.form, '');

            props.form.update({
                section: 'tiers',
                input: 'tier 5',
                value: '',
                isValid: false
            });

            props.changeSection('classification');
        }

        setTiersChanged(true);
    }

    const tiersTextProps = {
        li: true,
        weight: 600
    };

    if(!resolutionTiers) return null;

    return (
        <>
            <div className={style.container}>
                <Text>{`There is ${resolutionTiersHaveKba? 'an' : 'no'} associated KBA with the tiers:`}</Text>
                <ul className={style.tiersContainer}>
                    {resolutionTiers.map((tier, idx) => (
                        <Text key={`${idx}-${tier}`} {...tiersTextProps}>{tier}</Text>
                    ))}
                </ul>
            </div>
            {!resolutionTiersHaveKba &&
                <Text color='grey'>If there is a KBA related to this incident, please provide.</Text>
            }
            <TextInput
                className={style.input}
                label='KBA Number'
                optional={!resolutionTiersHaveKba}
                input={kbaNumber}
                placeholder='KBA number (ex: KBA000123456789)'
                uppercase
                locked={resolutionTiersHaveKba}
            />
            {kbaRelatedToOtherTiers &&
                <div className={style.warningContainer}>
                    <Warning title header>
                        <div className={style.container}>
                            <Text>The provided KBA is already associated with other tiers:</Text>
                            <ul className={style.tiersContainer}>
                                {kbaRelatedToOtherTiers.map(tier => (
                                    <Text key={tier} {...tiersTextProps}>{tier}</Text>
                                ))}
                            </ul>
                        </div>
                    </Warning>
                    {allowTiersChange && 
                        <>
                            <Button
                                className={style.button}
                                icon='change'
                                color='blue'
                                onClick={handleOnChangeTiers}
                            >
                                Use these tiers to classify the resolution
                            </Button>
                            {(relatedPbi && isNotApplicationBug) &&
                                <Warning title='Notice' level='low'>
                                    When changing tiers, the classification will be changed to 'Application Bug' and a new tier 5 will have to be chosen.
                                </Warning>
                            }
                            {(!relatedPbi && !isNotApplicationBug) &&
                                <Warning title='Notice' level='low'>
                                    As there is no PBI related to these tiers, when changing it a new classification and tier 5 will have to be chosen.
                                </Warning>
                            }
                        </>
                    }
                </div>
            }
        </>
    );
}

KBA.defaultProps = {
    name: 'kba',
    title: 'KBA',
    subtitle: 'Provide the KBA related with the incident'
}

export default KBA;