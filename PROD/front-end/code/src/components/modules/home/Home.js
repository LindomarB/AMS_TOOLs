import React, { useContext } from "react";
import AppContext from "../../context/appContext/AppContext";
import UserContext from "../../context/userContext/UserContext";
import Banner from "../../Interface/banner/Banner";
import modules from "../../../data/app/modules";
import Section from "../../Interface/section/Section";
import Button from "../../Interface/buttons/button/Button";
import CardButton from "../../Interface/buttons/cardButton/CardButton";
import style from "./Home.module.css";
import Page from "../../Interface/page/Page";
import sortByField from "../../../functions/array/sortByField";

function Home(props) {
    const lang = useContext(AppContext).currentLanguage;
    const user = useContext(UserContext).user;

    const module = modules('home');

    const tools = sortByField(modules(), 'name').map(module => {
        if(
            !module.isTool || 
            (!module.defaultAccess && !user.accesses.includes(module.name))
        ) return;

        const submodules = module.submodules.map(submodule => (
            <Button 
                key={submodule.name} 
                type='icon' 
                iconWeight={300} 
                icon={submodule.icon} 
                tooltip={submodule.label[lang]} 
                alert={user.settings.alerts[submodule.name]}
                path={submodule.path}
            />
        ));

        return (
            <CardButton key={module.name} className={style.toolButton} {...module.getProps(lang)} image={`/images/thumbnails/${module.name}.png`}>
                {!!submodules.length && 
                    <div className={style.toolSubmodules}>
                        {submodules}
                    </div>
                }
            </CardButton>
        );
    });

    const title = <span className={style.title}>Welcome to <img className={style.logo} src={'/images/ams-tools-logo-white.svg'}/></span>

    return (
        <Page>
            <Banner title={title} subtitle={module.description[lang]} image='/images/banners/home.svg'/>
            <Section icon='tools' color='theme' title='Tools'>
                <div className={style.toolsContainer}>
                    {tools}
                </div>
            </Section>
        </Page>
    );
}

export default Home;