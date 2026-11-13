import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../../../../Interface/buttons/button/Button";
import Form from "../../../../Interface/form/Form";
import Page from "../../../../Interface/page/Page";
import AppContext from "../../../../context/appContext/AppContext";
import FetcherContext from "../../../../context/fetcherContext/FetcherContext";
import Incident from "../sections/Incident";
import Classification from "../sections/Classification";
import Tiers from "../sections/Tiers";
import Problem from "../sections/Problem";
import Solution from "../sections/Solution";
import SLA from "../sections/SLA";
import { useNavigate } from "react-router-dom";
import FormTimeline from "../../../../Interface/form/formTimeline/FormTimeline";
import modules from "../../../../../data/app/modules";
import BackConfirmation from "./modals/BackConfirmation";
import DeleteConfirmation from "./modals/DeleteConfirmation";
import PBI from "../sections/PBI";
import KBA from "../sections/KBA";
import ModalContext from "../../../../context/modalContext/ModalContext";
import style from './ResolutionForm.module.css';
import useTiersTree from "./tiersTree/TiersTree";
import Loading from "../../../../Interface/loaders/loading/Loading";

function EditResolutionForm(props) {
    const [unsaved, setUnsave] = useState(props.unsaved);
    const [invalidForm, setInvalidForm] = useState(true);
    const [firstRender, setFirstRender] = useState(true);
    const {tiersTree} = useTiersTree();
    const appCtx = useContext(AppContext);
    const modalCtx = useContext(ModalContext);
    const fetcher = useContext(FetcherContext);
    const formEl = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        //user to force the component to rerender after set the formEl
        setFirstRender(false);
    }, []);

    useEffect(() => {
        if(!firstRender) {
            setInvalidForm(formEl.current && !formEl.current.form.isValid());
        }
    }, [firstRender]);

    useEffect(() => {
        if(unsaved) {
            appCtx.setNavigateWarning({
                onLeave: () => formEl.current.storage.clear()
            });
        }
    }, [unsaved]);

    const handleOnChangeForm = () => {
        setInvalidForm(!formEl.current.form.isValid());
        setUnsave(true);
    }

    const saveResolution = async () => {
        const form = formEl.current.getValues();

        const resolution = {
            _id: props.id,
            ...form
        }

        const res = await fetcher.editResolution(resolution);

        if(!res.ok) return false;

        formEl.current.storage.clear();
        setUnsave(false);
        appCtx.setNavigateWarning(false);
        return true;
    }

    const handleOnBack = () => {
        const back = () => {
            formEl.current.storage.clear();
            modalCtx.close();
            appCtx.setNavigateWarning(false);
            navigate(`${modules('cti tool', 'search').path}?id=${props.id}`);
        }

        if(unsaved) {
            const save = async () => {
                const saved = await saveResolution();
                if(saved) back();
            }

            modalCtx.show(
                <BackConfirmation 
                    onSaveChanges={save}
                    onDiscardChanges={back}
                    saveDisabled={invalidForm}
                />
            );
        } else {
            back();
        }
    }

    const onDeleteResolution = async () => {
        const res = await fetcher.deleteResolution({query: {_id: props.id}});

        if(res.ok) {
            modalCtx.close();
            appCtx.setNavigateWarning(false);
            navigate(modules('cti tool', 'search').path);
        }
    }

    const handleOnDeleteResolution = () => {
        modalCtx.show(<DeleteConfirmation onDelete={onDeleteResolution}/>)
    }

    if(!tiersTree) return <Loading />

    const header = {
        rule: true,
        children: (
            <>
                <Button 
                    type='icon'
                    icon='save'
                    tooltip='Save changes'
                    onClick={saveResolution}
                    disabled={invalidForm || !unsaved}
                />
                {props.enableDelete &&
                    <Button
                        type='icon'
                        icon='delete'
                        tooltip='Delete resolution'
                        onClick={handleOnDeleteResolution}
                    />
                }
                <Button 
                    type='icon'
                    icon='back'
                    tooltip='Back'
                    onClick={handleOnBack}
                />
            </>
        )
    }

    return (
        <Page 
            doubleContainer
            leftContainer={{className: style.timelineContainer}}
        >
            <FormTimeline form={formEl.current}/>
            <Form 
                ref={formEl}
                className={style.form}
                sectionClassName={style.section}
                id={props.id}
                header={header}
                initialValues={props.initialValues}
                initialSection={props.initialSection}
                storage={props.storage}
                onChangeForm={handleOnChangeForm}
                onSubmit={saveResolution}
                submitButton={{
                    className: style.hidden,
                    disabled: true
                }}
            >
                <Incident tiersTree={tiersTree} resolutionIncident={props.initialValues && props.initialValues.incident.incident}/>
                <Classification tiersTree={tiersTree}/>
                <Tiers tiersTree={tiersTree}/>
                <PBI tiersTree={tiersTree}/>
                <Problem />
                <Solution />
                <KBA tiersTree={tiersTree}/>
                <SLA />
            </Form>
        </Page>
    );
}

export default EditResolutionForm;