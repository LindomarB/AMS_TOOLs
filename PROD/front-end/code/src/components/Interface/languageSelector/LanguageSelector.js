import React, { useContext } from "react";
import AppContext from "../../context/appContext/AppContext";
import UnderlineMenu from "../underlineMenu/UnderlineMenu";
import style from "./LanguageSelector.module.css";

function LanguageSelector (props) {
    const appCtx = useContext(AppContext);

    const handleOnSelectLanguage = (selectedItem) => {
        appCtx.setCurrentLanguage(appCtx.languages[selectedItem - 1]);
    }

    const selectedLanguage = appCtx.languages.indexOf(appCtx.currentLanguage) + 1;

    return (
            <UnderlineMenu 
                className={`${style.LanguageSelector} ${props.className || ""}`} 
                itemClassName={style.item} 
                underlineClassName={style.underline}
                selectedItem={selectedLanguage}
                onSelectItem={handleOnSelectLanguage}
            >
                {appCtx.languages.map(lang => <p key={lang}>{lang.toUpperCase()}</p>)}
            </UnderlineMenu>
    );
}

export default LanguageSelector;