import React, { createContext } from "react";
import appLexicon from "../../data/lexicon/appLexicon";
import useBrowserStorage from "../../components/hooks/useBrowserStorage";

const value = {
    languages: ["en", "pt", "es"],
    currentLanguage: null,
    setCurrentLanguage: () => {},
    lexicon: null,
    appLexicon: null,
};

const LanguageContext = createContext(value);

export function LanguageContextProvider(props) {
    const [currentLanguage, setCurrentLanguage] = useBrowserStorage({
        key: "language",
        initialValue: "en"
    });

    return (
        <LanguageContext.Provider value={{
            ...value,
            currentLanguage,
            setCurrentLanguage,
            lexicon: appLexicon[currentLanguage],
            appLexicon
        }}>
            {props.children}
        </LanguageContext.Provider>
    );
}

export default LanguageContext;