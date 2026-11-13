import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import modules from '../../../../data/app/modules';
import AppContext from '../../../context/appContext/AppContext';
import TopNavbar from '../../../Interface/navigation/topNavbar/TopNavbar';
import style from './AppTopNavbar.module.css';
import UserContext from '../../../context/userContext/UserContext';

function AppTopNavbar(props) {
    const appCtx = useContext(AppContext);
    const user = useContext(UserContext).user;
    const location = useLocation();
    
    const lang = appCtx.currentLanguage;
    const currentLocation = modules(location.pathname);
    let module = null;
    let submodule = null;

    if(currentLocation.parent) {
        module = currentLocation.parent;
        submodule = currentLocation;
    } else {
        module = currentLocation;
        submodule = null;
    }

    const topNavbarProps = {
        ...props,
        title: module.label[lang],
        titleIcon: module.icon,
        subtitle: module.submodules.length
            ? submodule
            ? submodule.label[lang] : 'Home'
            :null
    };

    if(module.submodules.length) {
        topNavbarProps.menuItems = [{
            icon: module.icon,
            tooltip: module.label[lang],
            active: !submodule,
            // path: module.path,
            end: true,
            onClick: () => appCtx.showNavigationWarning(module.path)
        }];

        const menuItems = module.submodules.map(moduleSubmodule => {
            return {
                icon: moduleSubmodule.icon,
                tooltip: moduleSubmodule.label[lang],
                active: submodule && moduleSubmodule.path === submodule.path,
                alert: user && user.settings.alerts && user.settings.alerts[moduleSubmodule.name],
                // path: moduleSubmodule.path,
                end: false,
                onClick: () => appCtx.showNavigationWarning(moduleSubmodule.path)
            };
        });

        topNavbarProps.menuItems.push(...menuItems);
    }

    return (
        <TopNavbar 
            className={style.AppTopNavbar} 
            {...topNavbarProps} 
            logo={module.name === 'home'}
        />
    );
}


export default AppTopNavbar;