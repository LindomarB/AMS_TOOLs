import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./home/Home";
import NewResolution from "./newResolution/NewResolution";
import modules from "../../../../data/app/modules";
import useSettings from "../../../hooks/useSettings";

function CreateResolution(props) {
    const navigate = useNavigate();

    const storageKey = 'resolution-form-progress';
    const storage = useSettings({
        key: storageKey
    });

    const storageValue = storage.get(); 
    const hasUnsavedProgress = storageValue && typeof storageValue === 'object' && storageValue.form && typeof storageValue.form === 'object';

    const startNewResolution = () => {
        storage.clear();
        navigate('new-resolution');
    }

    const resumeProgress = (id) => {
        storage.clear();
        navigate(`new-resolution?progress=${id}`);
    }

    const resumeUnsaved = () => {
        navigate('new-resolution');
    }

    return (
        <Routes>
            <Route 
                path='/' 
                element={
                    <Home 
                        hasUnsavedProgress={hasUnsavedProgress}
                        onStartNewResolution={startNewResolution}
                        onResumeUnsaved={resumeUnsaved}
                        onResumeProgress={resumeProgress}
                    />
                } 
            />
            <Route
                path={modules('cti tool', 'create resolution').getRoute('new resolution').relativePath} 
                element={
                    <NewResolution 
                        storageKey={storageKey} 
                        unsaved={hasUnsavedProgress}
                    />
                } 
            />            
        </Routes>
    );
}

export default CreateResolution;