import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../Interface/page/Page";
import Banner from "../../Interface/banner/Banner";
import Card from "../../Interface/card/Card";
import modules from "../../../data/app/modules";
import TextInput from "../../Interface/inputs/textInput/TextInput";
import useInput from "../../hooks/useInput";
import Button from "../../Interface/buttons/button/Button";
import CardButton from "../../Interface/buttons/cardButton/CardButton";
import Text from "../../Interface/Text/Text";
import AppContext from "../../context/appContext/AppContext";
import Rule from "../../Interface/rule/Rule";
import FetcherContext from "../../context/fetcherContext/FetcherContext";
import style from './Support.module.css';

function Support(props) {
    const lang = useContext(AppContext).currentLanguage;
    const fetcher = useContext(FetcherContext);
    const navigate = useNavigate();

    const faqSearch = useInput({
        name: 'faqSearch',
        required: true
    });

    const module = modules('support');

    const handleOnSearchFaq = ({value}) => {
        if(value) {
            navigate(`${modules('support', 'faq').path}?search=${value}`)
        }
    }

    const handleOnDownloadGuide = (lang) => {
        fetcher.getUserGuide({query: {lang}}, {filename: `AMS Tools User Guide - ${lang}`});
    }

    const toolsHelp = [
        'Account Settings',
        'Application Catalog',
        'CTI Tool',
        'SLA Time',
        'Team Manager',
    ].map(subject => {
        const module = modules(subject.toLowerCase());

        if(!module) return null;

        return (
            <Button
                key={subject}
                type='text'
                className={style.toolButton}
                activeClassName={style.toolButtonActive}
                icon={module.icon}
                iconSize={32}
                iconWeight={300}
                path={`${modules('support', 'faq').path}?subject=${module.name}`}
            >
                {module.label[lang]}
            </Button>
        );
    });

    const submodules = module.submodules.reduce((submodules, submodule) => {
        submodules.push(
            <CardButton
                key={submodule.name}
                className={style.submoduleButton}
                {...submodule.getProps(lang)}
            />,
            <Rule key={`${submodule.name}-rule`} className={style.rule} vertical />
        );

        return submodules;
    }, []);

    submodules.pop();

    // description: {
    //     en: 'Are you new here? Forgot something? Want to know more about the new features? Click here to download our guide.',
    //     es: '¿Eres nuevo por aquí? ¿Olvido algo? ¿Quieres saber más sobre las nuevas funciones? Haga clic aquí para descargar nuestra guía.',
    //     pt: 'É novo por aqui? Esqueceu de algo? Quer saber mais sobre os novos recursos? Clique aqui para baixar nosso guia.'
    // }

    return (
        <Page className={style.Support}>
            <Card className={style.bannerCard}>
                <Banner 
                    className={style.banner}
                    titleClassName={style.bannerTitle}
                    contentClassName={style.bannerContent}
                    icon='support'
                    iconProps={{filled: true, weight: 400}}
                    title={module.label[lang]} 
                    subtitle={module.description[lang]} 
                    image={`/images/banners/${module.relativePath}.svg`} 
                    style={{backgroundPosition: '50% 25%'}}
                    gradient='linear-gradient(to right, #070F21 25%, #080f21bf 50%, #070F21 75%)'
                >
                    <TextInput
                        className={style.searchInput}
                        input={faqSearch}
                        placeholder='What are you looking for?'
                        confirmButton='search'
                        onConfirm={handleOnSearchFaq}
                    />
                </Banner>
                <div className={style.toolsHelp}>
                    {toolsHelp}
                </div>
            </Card>
            <Card className={style.submodulesCard}>
                <div className={style.submodules}>
                    {submodules}
                </div>
                <div className={style.userGuide}>
                    <Text color='white' size={16} weight={600} style={{marginBottom: '1rem'}}>
                        Are you new here? Forgot something? Want to know more about the new features? Download our guide!
                    </Text>
                    <Text color='white' >
                        In which language do you want to download the user guide?
                    </Text>
                    <div className={style.buttonsContainer}>
                        <Button
                            className={style.downloadButton}
                            color='white'
                            icon='guide'
                            onClick={() => handleOnDownloadGuide('EN')}
                        >
                            English
                        </Button>
                        <Button
                            className={style.downloadButton}
                            color='white'
                            icon='guide'
                            onClick={() => handleOnDownloadGuide('PT')}
                        >
                            Portuguese
                        </Button>
                    </div>
                </div>
            </Card>
        </Page>
    );
}

export default Support;