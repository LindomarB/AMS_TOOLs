import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import capitalize from '../../../functions/text/capitalize';
import ConstructionPhase from './constructionPhase/ConstructionPhase';
// import useNewBrowserStorage from '../../hooks/useNewBrowserStorage';
import FormView from './formView/FormView';
import useForm from './useForm';
import useSettings from '../../hooks/useSettings';

function Form(props, ref) {
    const [onConstructionPhase, setOnConstructionPhase] = useState(true);
    const [children, setChildren] = useState([]);
    const [sections, setSections] = useState([]);
    const [currentSection, setCurrentSection] = useState(-1);
    const [sectionOnHold, setSectionOnHold] = useState(null);
    const [initialValues, setInitialValues] = useState(props.initialValues);
    const [id, setId] = useState(props.id);
    const [updateTimeline, setTimelineUpdater] = useState(null);
    const form = useForm();
    const storage = useSettings({
        ...props.storage || {}
    });
    // const storage = useNewBrowserStorage({
    //     ...props.storage || {}
    // });

    useImperativeHandle(ref, () => ({
        form,
        changeSection,
        currentSection: sections[currentSection],
        getValues,
        reset,
        storage,
        setTimelineUpdater,
        _id: id
    }));
 
    useEffect(() => {
        if(storage.key) {
            const storageValue = storage.get();

            if(!storageValue || typeof storageValue !== 'object') {
                storage.update({});
            }
        }
    }, []);

    useEffect(() => {
        getChildren();
    }, [props.children]);

    useEffect(() => {
        if(!onConstructionPhase) {
            checkSections();
        }
    }, [children, form]);
    
    useEffect(() => {
        if(!onConstructionPhase) {
            setId(props.id);
            storage.set('_id', props.id);
        }
    }, [props.id]);
    
    useEffect(() => {
        if(updateTimeline) {
            updateTimeline(getTimeline());
        }
    }, [form, sections, currentSection, updateTimeline]);

    useEffect(() => {
        if(sectionOnHold) {
            if(Array.isArray(sectionOnHold)) {
                const validSection = sectionOnHold.find(sectionOnHold => 
                    sections.some(section => section.name === sectionOnHold)
                );

                if(validSection) {
                    changeSection(validSection);
                } else {
                    changeSection(0);
                }
            } else {
                changeSection(sectionOnHold);
            }
        }
    }, [sections]);

    const getChildren = () => {
        const children = props.children.filter(child => child);

        const newChildren = children.map(child => ({
            ...child.props,
            element: child
        }));

        setChildren(newChildren);
    }

    const checkSections = () => {
        const validChildren = children.filter(child => {
            if(child.condition) {
                return child.condition(getValues(), props.conditions || {});
            } else {
                return true;
            }
        });

        const validSections = validChildren.map((children, index) => ({
            ...children,
            index,
            isFirst: index === 0,
            isLast: index === validChildren.length - 1
        }));

        const hasNewSection = validSections.length !== sections.length ||
            validSections.some(newSection => 
                !sections.some(section => 
                    section.name === newSection.name    
                )    
            );

        if(hasNewSection) {
            setSections(validSections);
        }
    }

    const reset = () => {
        setOnConstructionPhase(true);
        setCurrentSection(-1);
        setSectionOnHold(null);
        setInitialValues(null);
        setSections([]);
        form.reset();
        storage.update({
            form: {}
        });
    }

    const getTimeline = () => {
        if(!sections.length || currentSection < 0) {
            return null;
        }

        const timelineSteps = sections.map(section => ({
            name: section.title || capitalize(section.name), 
            disabled: section.readOnly? false : !form.get(section.name).isValid
        }));

        return {
            steps: timelineSteps,
            currentStep: currentSection,
            onClickStep: (index) => changeSection(index)
        };
    }

    const getValues = () => {
        const values = {};
        const validSections = sections.map(section => section.name);
        
        for(let section in form.get()) {
            if(!validSections.length || validSections.includes(section)) {
                values[section] = form.getSectionValues(section, true);
            }
        }

        return values;
    }

    const handleOnSubmit = async () => {
        const completed = await props.onSubmit({
            _id: id,
            values: getValues()
        });

        if(completed && storage.key) {
            storage.clear();
        }
    }

    const changeSection = (sectionRef) => {
        const section = typeof sectionRef === 'number'
            ? sections[sectionRef]
            : sections.find(section => section.name === sectionRef);

        if(section) {
            setCurrentSection(section.index);
            setSectionOnHold(null);
        } else {
            setSectionOnHold(sectionRef);
        }
    }

    const onEndConstruction = (initialForm) => {
        if(props.initialSection && initialForm.get(props.initialSection).isValid) {
            setSectionOnHold(props.initialSection);
        } else {
            const sections = children.reduce((sections, child) => {
                const section = child.name;

                if(child.readOnly || initialForm.get(section).isValid) {
                    sections.valid.push(section);
                } else {
                    sections.invalid.push(section);
                }

                return sections;
            }, {valid: [], invalid: []});

            if(sections.invalid.length) {
                setSectionOnHold(sections.invalid);
            } else {
                setSectionOnHold(sections.valid.pop());
            }
        }

        if(!props.id && storage.key) {
            const storedId = storage.get('_id');
            setId(storedId);
        }

        form.clone(initialForm);
        setOnConstructionPhase(false);
    }

    if(onConstructionPhase) {
        if(!children.length) return null;

        let storageValue = null;

        if(!initialValues && storage.key && storage.useStoredValue) {
            storageValue = storage.get('form') || {};
        }
        
        return (
            <ConstructionPhase 
                id={id}
                children={children}
                initialValues={initialValues || storageValue}
                onEndConstruction={onEndConstruction}
            />
        );
    }

    const section = sections[currentSection];
    if(!section) return null;   

    return (
        <FormView 
            {...props}
            id={id}
            section={section}
            sectionProps={props.sectionProps && props.sectionProps[section.name]}
            form={form}
            changeSection={changeSection}
            setCurrentSection={setCurrentSection}
            onSubmit={handleOnSubmit}
            getValues={getValues}
            storage={storage}
        />
    );
}

export default forwardRef(Form);