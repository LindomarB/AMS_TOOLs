import React, { createContext, useCallback, useRef, useState } from "react";
import appLexicon from "../../../data/lexicon/appLexicon";
import useBrowserStorage from "../../hooks/useBrowserStorage";
import AppSnackbar from "../../app/appSnackbar/AppSnackbar";
import AppModal from "../../app/appModal/AppModal";
import NavigationWarning from "./modals/NavigationWarning";
import { useNavigate } from "react-router-dom";

const value = {
    languages: ["en", "pt", "es"],
    currentLanguage: null,
    setCurrentLanguage: () => {},
    lexicon: null,
    appLexicon: null,
    tempStorage: {
        set: () => {},
        get: () => {}
    },
    rememberToken: false,
    setRememberToken: () => {},
    lockScreen: () => {},
    unlockScreen: () => {},
    notify: () => {},
    showModal: (modal) => {},
    closeModal: () => {},
    setNavigateWarning: () => {},
    showNavigationWarning: () => {}
};

const AppContext = createContext(value);

export function AppContextProvider(props) {
    const [navigateWarning, setNavigateWarning] = useState(null);
    const [tempStorage, setTempStorage] = useState({});
    const language = useBrowserStorage({
        key: "language",
        initialValue: "en"
    });
    const rememberToken= useBrowserStorage({
        key: 'rememberToken',
        initialValue: false
    });
    const [modal, setModal] = useState(null);
    const appSnackbar = useRef();
    const navigate = useNavigate();
 
    const notify = useCallback((notification) => {
        appSnackbar.current.notify(notification);
    });

    const screenLocker = useCallback((event) => {
        event.preventDefault()
        event.stopPropagation();
    });

    const lockScreen = useCallback(() => {
        document.getElementById('root').addEventListener('click', screenLocker, true);
    });

    const unlockScreen = useCallback(() => {
        document.getElementById('root').removeEventListener('click', screenLocker, true);
    });

    const showModal = (modal) => {
        const onClose = () => {
            modal.props.onClose && modal.props.onClose();
            closeModal();
        }

        lockScreen();
        setModal(
            <modal.type {...modal.props} onClose={onClose}/>
        );
    }

    const closeModal = () => {
        unlockScreen();
        setModal(null);
    }

    const showNavigationWarning = (path, onLeave) => {
        if(navigateWarning) {
            const handleOnLeave = () => {
                navigateWarning.onLeave && navigateWarning.onLeave();
                onLeave && onLeave();
                setNavigateWarning(false);
                closeModal();
                navigate(path);
            }

            showModal(<NavigationWarning onLeave={handleOnLeave}/>);
        } else {
                onLeave && onLeave();
                navigate(path);
        }
    }

    const saveInTempStorage = (key, value) => {
        setTempStorage(curSt => ({...curSt, [key]: value}));
    }

    const getFromTempStorage = (key) => {
        return tempStorage[key];
    }

    return (
        <AppContext.Provider value={{
            ...value,
            currentLanguage: language.value,
            setCurrentLanguage: language.setValue,
            lexicon: appLexicon[language.value],
            appLexicon,
            tempStorage: {
                set: saveInTempStorage,
                get: getFromTempStorage
            },
            rememberToken: rememberToken.value,
            setRememberToken: rememberToken.setValue,
            lockScreen,
            unlockScreen,
            notify,
            showModal,
            closeModal,
            setNavigateWarning,
            showNavigationWarning
        }}>
            {props.children}
            <AppSnackbar ref={appSnackbar}/>
            <AppModal>
                {modal}
            </AppModal>
        </AppContext.Provider>
    );
}

export default AppContext;