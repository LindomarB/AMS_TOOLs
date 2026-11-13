import React, { useEffect, useRef } from 'react';
import Slide from '../../animations/slide/Slide';
import Text from '../../Text/Text';
import style from './Section.module.css';

function Section(props) {
    const prevSection = useRef(-1);

    useEffect(() => {
        prevSection.current = props.section.index;
    }, [props.section]);

    const setFormSection = (sectionName, inputs) => {
        const updateForm = ({name, value, isValid}) => {
            props.form.update({
                section: sectionName, 
                input: name, 
                value, 
                isValid
            });
        }

        inputs.forEach(input => {
            input.addOnChangeEvent('updateForm', updateForm);
        });

        props.form.update(...inputs.map(input => ({
            section: sectionName, 
            input: input.name, 
            value: input.value, 
            isValid: input.isValid
        })));
    }

    const section = props.section;
    const sectionProps = {...section.element.props, ...props.sectionProps || {}};
    const direction = (section.index - prevSection.current) === 0 
        ? 'left' 
        : (section.index - prevSection.current) > 0
        ? 'left' 
        : 'right';

    return (
        <Slide
            direction={direction} 
            currentElementKey={section.name} 
            mountOnEnter={false} 
            unmountOnExit={false}
        >
            <div className={style.section}>
                {section.subtitle &&
                    <Text color='grey'>{section.subtitle}</Text>
                }
                <div className={style.content}>                    
                    <div className={`${section.className || props.className || ''}`}>
                        <section.element.type 
                            {...sectionProps} 
                            values={props.form.getSectionValues(section.name)}
                            setFormSection={setFormSection}
                            form={props.form}
                            formId={props.formId}
                            changeSection={props.changeSection}
                            notify={props.notify}
                        />
                    </div>
                </div>
            </div>
        </Slide>
    );
}

export default Section;