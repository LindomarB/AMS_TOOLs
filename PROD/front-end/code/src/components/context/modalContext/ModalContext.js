import React, { createContext, useContext, useState } from "react";
import NavigationWarning from "./modals/NavigationWarning";
import { useNavigate } from "react-router-dom";
import AppContext from "../appContext/AppContext";
import Backdrop from "../../Interface/backdrop/Backdrop";

const value = {
    show: (modal) => {},
    close: () => {},
    setNavigateWarning: () => {},
    showNavigationWarning: () => {}
};

const ModalContext = createContext(value);

export function ModalContextProvider(props) {
    const [navigateWarning, setNavigateWarning] = useState(null);
    const [modal, setModal] = useState(null);
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();

    const show = (modal) => {
        const onClose = () => {
            modal.props.onClose && modal.props.onClose();
            close();
        }

        appCtx.lockScreen();

        setModal(
            <Backdrop onClick={modal.props.disableBackdropClose? null : onClose}>
                <modal.type {...modal.props} onClose={onClose}/>
            </Backdrop>
        );
    }

    const close = () => {
        appCtx.unlockScreen();
        setModal(null);
    }

    const showNavigationWarning = (path, onLeave) => {
        if(navigateWarning) {
            const handleOnLeave = () => {
                navigateWarning.onLeave && navigateWarning.onLeave();
                onLeave && onLeave();
                setNavigateWarning(false);
                close();
                navigate(path);
            }

            show(<NavigationWarning onLeave={handleOnLeave}/>);
        } else {
                onLeave && onLeave();
                navigate(path);
        }
    }

    return (
        <ModalContext.Provider value={{
            show,
            close,
            setNavigateWarning,
            showNavigationWarning
        }}>
            {props.children}
            {modal}
        </ModalContext.Provider>
    );
}

export default ModalContext;