import React, { useEffect, useState } from 'react';
import style from './ConstructionPhase.module.css';
import useForm from '../useForm';

function ConstructionPhase(props) {
    const [sectionStage, setSectionStage] = useState(-1);
    const form = useForm();
    
    useEffect(() => {
        if(sectionStage < props.children.length - 1) {
            setSectionStage(curSt => curSt + 1);
        }
    });

    useEffect(() => {
        const validChildren = props.children.filter(child => !child.readOnly).map(child => child.name);
        const currentFormSections = Object.keys(form.get());

        if(validChildren.every(child => currentFormSections.includes(child))) {
            props.onEndConstruction(form); 
        }
    }, [form]);

    const setFormSection = (sectionName, inputs) => {
        form.addSection(sectionName, inputs);
    }

    if(sectionStage === -1) return null;

    const section = props.children[sectionStage];

    if(section.readOnly) return null;
 
    const initialValues = (props.initialValues && props.initialValues[section.name]) || {};

    return (
        <div className={style.ConstructionPhase}>
            <section.element.type 
                {...section.element.props}
                formId={props.id}
                values={initialValues}
                setFormSection={setFormSection}
                form={form}
                onConstructionPhase
            />
        </div>
    );
}

export default ConstructionPhase