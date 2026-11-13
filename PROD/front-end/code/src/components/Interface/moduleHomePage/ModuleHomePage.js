import React, { useContext } from "react";
import AppContext from "../../context/appContext/AppContext";
import Banner from "../banner/Banner";
import modules from "../../../data/app/modules";
import Section from "../section/Section";
import CardButton from "../buttons/cardButton/CardButton";
import style from './ModuleHomePage.module.css';
import Page from "../page/Page";
import UserContext from "../../context/userContext/UserContext";

function ModuleHomePage(props) {
    const user = useContext(UserContext).user;
    const lang = useContext(AppContext).currentLanguage;

    const module = modules(props.module, props.submodule);
    const routes = props.submodule? module.routes : module.submodules;

    const createButtons = (buttons) => {
        return buttons.map(item => {
            const itemProps = item.getProps
                ? item.getProps(lang) 
                : {
                    ...item,
                    label: item.label[lang],
                    description: item.description[lang],
                };

            return (
                <CardButton
                    key={item.name}
                    className={style.menuButton}
                    alert={item.alert || user.settings.alerts[item.name]}
                    {...itemProps}
                />
            )
        });
    }

    const buttons = createButtons(routes);

    if(props.menu) {
        if(props.menu.atStart) {
            buttons.unshift(...createButtons(props.menu.atStart)); 
        }

        if(props.menu.atEnd) {
            buttons.push(...createButtons(props.menu.atEnd)); 
        }
    }

    return (
        <Page>
            <Banner title={module.label[lang]} subtitle={module.description[lang]} image={`/images/banners/${module.relativePath}.svg`} style={props.bannerStyle}/>
            <div className={style.sectionsContainer}>
                <Section title='Menu' icon='tools' color='theme'>
                    <div className={style.menu}>
                        {buttons}
                    </div>
                </Section>
                {props.children}
            </div>
        </Page>
    );
}

export default ModuleHomePage;