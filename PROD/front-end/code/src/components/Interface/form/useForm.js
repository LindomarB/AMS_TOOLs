import { useState } from "react";

function useForm() {
    const [sections, setSections] = useState({});
    
    const addSection = (name, inputs) => {
        const newSection = {
            name,
            inputs: inputs.map(input => ({
                name: input.name,
                value: input.value,
                isValid: input.isValid,
                confirmationOnly: input.confirmationOnly
            })),
            isValid: inputs.every(input => input.isValid)
        }

        setSections(curSt => {
            const newState = structuredClone(curSt);
            newState[name] = newSection;
            return newState;
        });
    }

    const update = (...inputs) => {
        setSections(curSt => {
            const newState = structuredClone(curSt);
            
            inputs.forEach(({section, input, value, isValid}) => {
                if(!sections[section]) return;

                const sectionInput = newState[section].inputs.find(sectionInput => sectionInput.name === input);;
                if(!sectionInput) return;

                sectionInput.value = value;
                sectionInput.isValid = isValid;
                newState[section].isValid = newState[section].inputs.every(input => input.isValid);
            });

            return newState;
        });
    }

    const get = (section, input) => {
        if(!section) {
            return sections;
        } else {
            if(!sections[section] || !input) {
                return sections[section];
            } else {
                return sections[section].inputs.find(sectionInput => sectionInput.name === input);
            }
        }         
    }

    const getSectionValues = (section, removeConfirmatios) => {
        if(!sections[section]) return {};

        return sections[section].inputs.reduce((values, input) => {
            if(removeConfirmatios && input.confirmationOnly) return values;

            values[input.name] = input.value;
            return values;
        }, {});
    }

    const getValues = (removeConfirmatios) => {
        return Object.keys(sections).reduce((values, section) => {
            values[section] = getSectionValues(section, removeConfirmatios);
            return values;
        }, {});
    }

    const isValid = () => {
        let isValid = true;

        for(let section in sections) {
            if(!sections[section].isValid) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }

    const reset = () => {
        setSections({});
    }

    const clone = (form) => {
        const sections = structuredClone(form.get());
        setSections(sections);
    }

    return {
        sections,
        addSection,
        update,
        get,
        getSectionValues,
        getValues,
        isValid,
        reset,
        clone
    };
}

export default useForm;