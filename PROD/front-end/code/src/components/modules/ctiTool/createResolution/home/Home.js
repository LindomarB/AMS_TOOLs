import React, { useContext } from "react";
import UserContext from "../../../../context/userContext/UserContext";
import Page from "../../../../Interface/page/Page";
import Section from "../../../../Interface/section/Section";
import CardButton from "../../../../Interface/buttons/cardButton/CardButton";
import AppContext from "../../../../context/appContext/AppContext";
import DiscartProgressConfirmation from "./modals/DiscartProgressConfirmation";
import { useNavigate } from "react-router-dom";
import modules from "../../../../../data/app/modules";
import InProgress from "./inProgress/InProgress";

function Home(props) {
    const appCtx = useContext(AppContext);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const handleOnNewResolution = () => {
        if(props.hasUnsavedProgress) {
            appCtx.showModal(
                <DiscartProgressConfirmation 
                    onResume={hanldeOnResumeUnsaved}
                    onDiscart={handleOnStartNewResolution}
                />
            );
        } else {
            handleOnStartNewResolution();
        }
    }
    
    const handleOnResumeProgress = (id) => {
        if(props.hasUnsavedProgress) {
            appCtx.showModal(
                <DiscartProgressConfirmation 
                    onResume={hanldeOnResumeUnsaved}
                    onDiscart={() => onResumeProgress(id)}
                />
            );
        } else {
            onResumeProgress(id);
        }
    }

    const hanldeOnResumeUnsaved = () => {
        props.onResumeUnsaved();
        appCtx.closeModal();
    }

    const handleOnStartNewResolution = () => {
        props.onStartNewResolution();
        appCtx.closeModal();
    }

    const onResumeProgress = (id) => {
        props.onResumeProgress(id);
        appCtx.closeModal();
    }

    const userApplications = userCtx.getCTIApplication();

    if(!userApplications || !userApplications.length) {
        return (
            <Page>
                <Section 
                    title='Create Resolution'
                    color='theme'
                    iconProps={{
                        name: 'resolution',
                        filled: true
                    }}
                >
                    <CardButton
                        icon='team requests'
                        label='Request Application Permission'
                        description={'You don\'t have any application permission to create resolutions. Click here to request a permission to your accountable.'}
                        onClick={() => navigate(modules('account settings').getRoute('cti tool', 'applications').path)}
                    />
                </Section>
            </Page>
        );
    }

    return (
        <Page>
            <Section 
                title='Create Resolution'
                color='theme'
                iconProps={{
                    name: 'resolution',
                    filled: true
                }}
            >
                <CardButton
                    icon='add'
                    label='Start a New Resolution'
                    description='You can save your progress to continue your resolution later'
                    onClick={handleOnNewResolution}
                />
                {props.hasUnsavedProgress && 
                    <CardButton
                        icon='unsaved'
                        label='Resume Unsaved Resolution'
                        description='Your last resolution was not saved. Click here to resume it.'
                        onClick={hanldeOnResumeUnsaved}
                    />
                }
            </Section>
            <InProgress 
                userId={userCtx.user._id}
                onClickResolution={handleOnResumeProgress}
            />
        </Page>
    );
}

export default Home;