import React, { useEffect, useRef, useState } from 'react';
import useInput from '../../../../hooks/useInput';
import TextInput from '../../../../Interface/inputs/textInput/TextInput';
import Text from '../../../../Interface/Text/Text';
import style from './PBI.module.css';
import Button from '../../../../Interface/buttons/button/Button';
import pbiKbaValidator from './inputValidators/pbiKbaValidator';
import formActions from './formActions/formActions';
import Warning from '../../../../Interface/warning/Warning';

function PBI(props) {
    const [resolutionTiers, setResolutionTiers] = useState(formActions.getTiers(props.form));
    const [pbiRelatedToOtherTiers, setPbiRelatedToOtherTiers] = useState();
    const [relatedKba, setRelatedKba] = useState();
    const [allowTiersChange, setAllowTiersChange] = useState();
    const [resolutionTiersHavePbi, setResolutionTiersHavePbi] = useState(props.tiersTree.getDestinations(resolutionTiers).find(vertex => vertex.startsWith('PBI')));
    const [tiersChanged, setTiersChanged] = useState();
    const pbiValidation = useRef();

    const pbiNumber = useInput({
        name: 'number',
        initialValue: props.values.number,
        required: props.form.get('classification', 'classification').value === 'Application Bug',
        errorChecker: (value) => {
            pbiValidation.current = pbiKbaValidator({
                type: 'pbi',
                number: value,
                path: resolutionTiers,
                tiersTree: props.tiersTree
            });

            return pbiValidation.current.isValid? null : pbiValidation.current.error;
        },
    });

    useEffect(() => {
        props.setFormSection(props.name, [pbiNumber]);
    }, []);

    useEffect(() => {
        if(tiersChanged) {
            const newTiers = formActions.getTiers(props.form);
            setResolutionTiers(newTiers);
            setResolutionTiersHavePbi(props.tiersTree.getDestinations(newTiers).find(vertex => vertex.startsWith('PBI')));
            setTiersChanged(false);
        }
    }, [tiersChanged]);

    useEffect(() => {
        pbiNumber.validateInput();
    }, [resolutionTiers]);
    
    useEffect(() => {
        if(!pbiValidation.current) return;

        const {isValid, relatedTiers, relatedKba} = pbiValidation.current;

        
        if(!pbiNumber.value || isValid || (!isValid && !relatedTiers)) {
            setPbiRelatedToOtherTiers(false);
            setAllowTiersChange(false);
            setRelatedKba(null);
        } else {
            if(relatedTiers) {
                let pbiRelatedToOtherTiers = null;
                let allowTiersChange = true;

                const resolutionCountry = props.form.get('incident', 'country').value;
                const pathWithResolutionCountry = relatedTiers.find(path => 
                    path[0].toLowerCase() === resolutionCountry.toLowerCase()
                );

                if(pathWithResolutionCountry) {
                    pbiRelatedToOtherTiers = pathWithResolutionCountry;
                } else {
                    const countries = relatedTiers.map(path => path[0]).sort().join(' / ');
                    const path = relatedTiers[0];
                    path[0] = countries;
                    pbiRelatedToOtherTiers = path;
                    allowTiersChange = false;
                }

                if(relatedKba) {
                    if(relatedKba.length === 1) {
                        pbiRelatedToOtherTiers.push(relatedKba[0]);
                        setRelatedKba(relatedKba[0]);
                    } else {
                        pbiRelatedToOtherTiers.push(relatedKba.join(' / '));
                        allowTiersChange = false;
                        setRelatedKba(null);
                    }
                }
                
                setPbiRelatedToOtherTiers(pbiRelatedToOtherTiers);
                setAllowTiersChange(allowTiersChange);
            }
        }
    }, [pbiNumber.value, resolutionTiersHavePbi]);

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
                value: pbiRelatedToOtherTiers[index + 1],
                isValid: true
            });
        });

        props.notify({
            message: 'The tiers have been changed'
        });

        if(relatedKba) {
            props.form.update({
                section: 'kba',
                input: 'number',
                value: relatedKba,
                isValid: true
            });
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
                <Text >{`There is ${resolutionTiersHavePbi? 'an' : 'no'} associated PBI with the tiers:`}</Text>
                <ul className={style.tiersContainer}>
                    {resolutionTiers.map((tier, idx) => (
                        <Text key={`${idx}-${tier}`} {...tiersTextProps}>{tier}</Text>
                    ))}
                </ul>
            </div>
            {!resolutionTiersHavePbi &&
                <Text color='grey'>Please provide the PBI for this incident. If there is no PBI, choose a classification other than 'Application Bug'.</Text>
            }
            <TextInput
                className={style.input}
                label='PBI Number'
                input={pbiNumber}
                placeholder='PBI number (ex: PBI000123456789)'
                uppercase
                locked={resolutionTiersHavePbi}
            />
            {pbiRelatedToOtherTiers &&
                <div className={style.warningContainer}>
                    <Warning title header>
                        <div className={style.container}>
                            <Text>The provided PBI is already associated with other tiers:</Text>
                            <ul className={style.tiersContainer}>
                                {pbiRelatedToOtherTiers.map(tier => (
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
                        </>
                    }
                </div>
            }
        </>
    );
}

PBI.defaultProps = {
    name: 'pbi',
    title: 'PBI',
    subtitle: 'Provide the PBI related with the incident',
    condition: (form) => form.classification.classification === 'Application Bug'
}

export default PBI;