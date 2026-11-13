import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../components/Interface/buttons/button/Button";
import Form from "../components/Interface/form/Form";
import Page from "../components/Interface/page/Page";
import AppContext from "../components/context/appContext/AppContext";
import FetcherContext from "../components/context/fetcherContext/FetcherContext";
import UserContext from "../components/context/userContext/UserContext";
import ResolutionSaved from "./ResolutionSaved/ResolutionSaved";
import ResetConfirmation from "./modals/ResetConfirmation";
import Saving from "./saving/Saving";
import style from './ResolutionForm.module.css';
import Incident from "../components/modules/ctiTool/resolutionForm/sections/Incident";
import Classification from "../components/modules/ctiTool/resolutionForm/sections/Classification";
import Tiers from "../components/modules/ctiTool/resolutionForm/sections/Tiers";
import Problem from "../components/modules/ctiTool/resolutionForm/sections/Problem";
import Solution from "../components/modules/ctiTool/resolutionForm/sections/Solution";
import SLA from "../components/modules/ctiTool/resolutionForm/sections/SLA";
import Review from "../components/modules/ctiTool/resolutionForm/sections/Review";
import { useNavigate } from "react-router-dom";
import FormTimeline from "../components/Interface/form/formTimeline/FormTimeline";
import modules from "../data/app/modules";
import BackConfirmation from "./modals/BackConfirmation";
import DeleteConfirmation from "./modals/DeleteConfirmation";

function ResolutionForm(props) {
    const [formId, setFormId] = useState(props.id);
    const [unsaved, setUnsave] = useState(props.unsaved);
    const [saving, setSaving] = useState(false);
    const [resolution, setResolution] = useState(null);
    const [firstRender, setFirstRender] = useState(true);
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);
    const user = useContext(UserContext).user;
    const formEl = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        //user to force the component to rerender after set the formEl
        setFirstRender(false);
    }, []);

    useEffect(() => {
        if(unsaved) {
            appCtx.setNavigateWarning({
                onLeave: () => formEl.current.storage.clear()
            });
        }
    }, [unsaved]);

    const handleOnSubmit = async (formValues) => {
        setSaving(true);

        setTimeout(async () => {
            await saveResolution(formValues);
            setSaving(false)
        }, 1000);
    }

    const handleOnChangeForm = () => {
        setUnsave(true);
    }

    const saveResolution = async (form) => {
        const resolution = {
            _id: props.inProgress? null : form._id,
            ...form.values
        }

        let res = null;

        if(props.inProgress) {
            res = await fetcher.saveResolution({
                resolution,
                createdBy: {
                    _id: user._id,
                    name: user.profile.name,
                    cargillId: user.profile.cargillId
                }
            });
        } else {
            res = await fetcher.editResolution({
                resolution
            });
        }

        if(!res.ok) return false;

        if(props.inProgress) {
            formEl.current.storage.clear();
            setResolution(form);
        }

        setUnsave(false);
        appCtx.setNavigateWarning(false);
        return true;
    }

    const handleOnSaveProgress = async () => {     
        const formValues =  formEl.current.getValues();

        if(!formValues.incident.incident) {
            appCtx.notify({
                type: 'error',
                message: 'Please fill in the incident number before saving your progress'
            });

            return;
        }

        const resolution = {
            _id: formEl.current._id,
            ...formValues
        };

        let res = null;

        if(formId) {
            res = await fetcher.updateResolutionProgress({resolution});
        } else {
            res = await fetcher.saveResolutionProgress({
                resolution,
                createdBy: {
                    _id: user._id,
                    name: user.profile.name,
                    cargillId: user.profile.cargillId
                }
            });
        }

        if(!res.ok) return false;

        formEl.current.storage.clear();
        setUnsave(false);
        appCtx.setNavigateWarning(false);

        if(!formId) {
            setFormId(res.data.insertedId);
        }
        
        return true;        
    }

    const handleOnResetForm = () => {
        const resetForm = () => {
            formEl.current.reset();
            appCtx.closeModal();
        }

        appCtx.showModal(
            <ResetConfirmation 
                onReset={resetForm}
            />
        );
    }

    const handleOnBack = () => {
        const back = () => {
            formEl.current.storage.clear();
            appCtx.closeModal();
            appCtx.setNavigateWarning(false);
            navigate(
                props.inProgress
                ? modules('cti tool', 'create resolution').path
                : modules('cti tool', 'search').path
            );
        }

        if(unsaved) {
            const save = async () => {
                const saved = props.inProgress
                    ? await handleOnSaveProgress()
                    : await saveResolution();
                if(saved) back();
            }

            appCtx.showModal(
                <BackConfirmation 
                    onSaveChanges={save}
                    onDiscardChanges={back}
                />
            );
        } else {
            if(props.inProgress) {
                back();
            } else {
                
            }
        }
    }

    const handleOnStartNewForm = () => {
        formEl.current.reset();
        setFormId(null);
        setResolution(null);
        setUnsave(false);
        appCtx.setNavigateWarning(false);
    }

    const onDeleteResolution = async () => {
        const res = await fetcher.deleteResolution({query: {_id: formId}});

        if(res.ok) {
            navigate(modules('cti tool', 'search').path);
        }
    }

    const handleOnDeleteResolution = () => {
        appCtx.showModal(<DeleteConfirmation onDelete={onDeleteResolution}/>)
    }

    const enableDelete = !props.inProgress && user.profile.role !== 'analyst';
    const enableSave = unsaved && formEl.current && formEl.current.form.isvalid;

    const header = {
        rule: true,
        children: (
            <>
                {props.inProgress && 
                    <Button 
                        icon='save'
                        tooltip='Save progress'
                        onClick={handleOnSaveProgress}
                        disabled={!unsaved}
                    />
                }
                {!props.inProgress && 
                    <Button 
                        icon='save'
                        tooltip='Save changes'
                        onClick={saveResolution}
                        disabled={!enableSave}
                    />
                }
                {props.inProgress && 
                    <Button 
                        icon='reset'
                        tooltip='Reset form'
                        onClick={handleOnResetForm}
                    />
                }
                {enableDelete &&
                    <Button
                        icon='delete'
                        tolltip='Delete resolution'
                        onClick={handleOnDeleteResolution}
                    />
                }
                <Button 
                    icon='back'
                    tooltip='Back'
                    onClick={handleOnBack}
                />
            </>
        )
    }

    return (
        <>
            <Page 
                className={!saving && !resolution? '' : style.hideForm}
                doubleContainer
                leftContainer={{className: style.timelineContainer}}
            >
                <FormTimeline form={formEl.current}/>
                <Form 
                    ref={formEl}
                    className={style.form}
                    sectionClassName={style.section}
                    id={formId}
                    header={header}
                    initialValues={props.initialValues}
                    storage={props.storage}
                    onChangeForm={handleOnChangeForm}
                    onSubmit={props.inProgress? handleOnSubmit : saveResolution}
                    submitButton={{
                        className: props.inProgress? '' : style.hidden,
                        children: 'Save Resolution',
                        icon: 'save',
                        iconWeight: 300,
                        color: 'theme',
                        disabled: fetcher.awaiting.editResolution
                    }}
                >
                    <Incident />
                    <Classification />
                    <Tiers />
                    <Problem />
                    <Solution />
                    <SLA />
                    <Review />
                </Form>
            </Page>
            {saving && 
                <Saving saved={resolution}/>
            }
            {(resolution && !saving) &&
                <ResolutionSaved 
                    resolution={resolution}
                    onStartNewForm={handleOnStartNewForm}
                />
            }
        </>
    );
}

export default ResolutionForm;