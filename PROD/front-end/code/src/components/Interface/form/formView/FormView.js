import React, { useEffect, useRef, useState } from 'react';
import capitalize from '../../../../functions/text/capitalize';
import Header from '../../header/Header';
import FormButtons from '../formButtons/FormButtons';
import Section from '../section/Section';
import style from './FormView.module.css';
import Snackbar from '../../snackbar/Snackbar';
import FormWarning from '../formWarning/FormWarning';

function FormView(props) {
    const [showSnackbar, setShowSnackbar] = useState();
    const [notification, setNotification] = useState();
    const firstRender = useRef(true);

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false;
        } else {
            props.onChangeForm && props.onChangeForm(props.getValues());

            if(props.storage.key) {
                props.storage.update({
                    _id: props.id,
                    form: props.getValues()
                });
            }
        }
    }, [props.form.sections]);

    const notify = (notification) => {
        setNotification(notification.message);
        setShowSnackbar(true);
    }

    const onSnackbarStartClose = () => {
        setShowSnackbar(false);
    }

    const onSnackbarEndClose = () => {
        setNotification(null);
    }

    return (
        <div className={`${style.FormView} ${props.className || ''}`}>
            {props.header && (
                typeof props.header === 'object'
                    ? <Header {...props.header} text={props.header.text || props.section.title || capitalize(props.section.name)}/>
                    : <Header text={props.section.title || capitalize(props.section.name)}/>
                )
            }
            <Section
                className={props.sectionClassName}
                section={props.section}
                sectionProps={props.sectionProps}
                form={props.form}
                formId={props.id}
                changeSection={props.changeSection}
                notify={notify}
            />
            <FormButtons
                {...props}
                firstSection={props.section.isFirst}
                lastSection={props.section.isLast}
                sectionIsValid={props.section.readOnly || props.form.get(props.section.name).isValid}
                setCurrentSection={props.setCurrentSection}
                onSubmit={props.onSubmit}
            />
            {props.warning &&            
                <FormWarning {...props.warning}/>
            }
            <Snackbar
                className={`${style.AppSnackbar}`}
                show={showSnackbar}
                message={notification}
                autoHideTime={3000}
                onStartClose={onSnackbarStartClose}
                onEndClose={onSnackbarEndClose}
                position='bottom-middle'
                color='white'
                bgColor='blue'
                icon='info'
            />
        </div>
    );
}

export default FormView;