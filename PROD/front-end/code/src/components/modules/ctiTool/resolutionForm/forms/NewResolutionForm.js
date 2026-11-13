import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import Button from "../../../../Interface/buttons/button/Button";
import Form from "../../../../Interface/form/Form";
import Page from "../../../../Interface/page/Page";
import AppContext from "../../../../context/appContext/AppContext";
import FetcherContext from "../../../../context/fetcherContext/FetcherContext";
import ResolutionSaved from "./ResolutionSaved/ResolutionSaved";
import ResetConfirmation from "./modals/ResetConfirmation";
import Saving from "./saving/Saving";
import Incident from "../sections/Incident";
import Classification from "../sections/Classification";
import Tiers from "../sections/Tiers";
import Problem from "../sections/Problem";
import Solution from "../sections/Solution";
import SLA from "../sections/SLA";
import Review from "../sections/Review";
import { useNavigate } from "react-router-dom";
import FormTimeline from "../../../../Interface/form/formTimeline/FormTimeline";
import modules from "../../../../../data/app/modules";
import BackConfirmation from "./modals/BackConfirmation";
import PBI from "../sections/PBI";
import KBA from "../sections/KBA";
import style from './ResolutionForm.module.css';
import UserContext from "../../../../context/userContext/UserContext";
import ModalContext from "../../../../context/modalContext/ModalContext";
import useTiersTree from "./tiersTree/TiersTree";
import Loading from "../../../../Interface/loaders/loading/Loading";
import FormWarning from "./FormWarning/FormWarning";

function NewResolutionForm(props) {
    const [formId, setFormId] = useState(props.id);
    const [unsaved, setUnsave] = useState(props.unsaved);
    const [saving, setSaving] = useState(false);
    const [resolution, setResolution] = useState(null);
    const [warnings, setWarnings] = useState([]);
    const [firstRender, setFirstRender] = useState(true);
    const {tiersTree} = useTiersTree();
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);
    const user = useContext(UserContext).user;
    const modalCtx = useContext(ModalContext);
    const formEl = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        //used to force the component to rerender after set the formEl
        setFirstRender(false);
    }, []);

    useEffect(() => {
        setFormId(props.id);
    }, [props.id]);

    useEffect(() => {
        if(unsaved) {
            appCtx.setNavigateWarning({
                onLeave: () => formEl.current.storage.clear()
            });
        } else {
            formEl.current && formEl.current.storage.clear();
            appCtx.setNavigateWarning(false);
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
            _id: null,
            ...form.values
        };

        const res = await fetcher.saveResolution(resolution);

        if(!res.ok) return false;

        formEl.current.storage.clear();
        setResolution(res.data.resolution);
        setUnsave(false);
        appCtx.setNavigateWarning(false);
        return true;
    }

    const handleOnSaveProgress = async () => {     
        const formValues = formEl.current.getValues();

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
            res = await fetcher.updateResolutionProgress(resolution);
        } else {
            res = await fetcher.saveResolutionProgress(resolution);
        }

        if(!res.ok) return false;

        setUnsave(false);
        if(!formId) setFormId(res.data.resolutionId);
        
        return true;        
    }

    const handleOnResetForm = () => {
        const resetForm = () => {
            formEl.current.reset();
            modalCtx.close();
        }

        modalCtx.show(
            <ResetConfirmation 
                onReset={resetForm}
            />
        );
    }

    const handleOnBack = () => {
        const back = () => {
            formEl.current.storage.clear();
            modalCtx.close();
            appCtx.setNavigateWarning(false);
            navigate(props.backTo || modules('cti tool', 'create resolution').path);
        }

        if(unsaved) {
            const save = async () => {
                const saved = await handleOnSaveProgress();
                if(saved) back();
            }

            modalCtx.show(
                <BackConfirmation 
                    onSaveChanges={save}
                    onDiscardChanges={back}
                />
            );
        } else {
            back();
        }
    }

    const handleOnStartNewForm = () => {
        formEl.current.reset();
        setFormId(null);
        setResolution(null);
        setUnsave(false);
        appCtx.setNavigateWarning(false);
    }

    const setWarning = (action, type, data) => {
        setWarnings(curSt => {
            const newState = curSt.filter(warning => warning.type !== type);

            if(action === 'add') {
                newState.push({
                    type,
                    ...data
                });
            }

            return newState;
        });
    }

    if(!tiersTree) return <Loading />

    const header = {
        rule: true,
        children: (
            <>
                <Button 
                    type='icon'
                    icon='save'
                    tooltip='Save progress'
                    onClick={handleOnSaveProgress}
                    disabled={!unsaved}
                />
                <Button 
                    type='icon'
                    icon='reset'
                    tooltip='Reset form'
                    onClick={handleOnResetForm}
                />
                <Button 
                    type='icon'
                    icon='back'
                    tooltip='Back'
                    onClick={handleOnBack}
                />
            </>
        )
    }
    
    const warning = !!warnings.length && {
        children:(
            <>
                {warnings.map(warning => (
                    <FormWarning key={warning.type} {...warning}/>
                ))}
            </>
        )
    };

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
                    onSubmit={handleOnSubmit}
                    submitButton={{
                        children: 'Save',
                        icon: 'save',
                        iconWeight: 300,
                        color: 'theme',
                        disabled: fetcher.awaiting.editResolution
                    }}
                    warning={warning}
                >
                    <Incident tiersTree={tiersTree} setWarning={setWarning}/>
                    <Classification tiersTree={tiersTree}/>
                    <Tiers tiersTree={tiersTree}/>
                    <PBI tiersTree={tiersTree}/>
                    <Problem />
                    <Solution />
                    <KBA tiersTree={tiersTree}/>
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

export default NewResolutionForm;