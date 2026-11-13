import React, { useContext } from "react";
import AppContext from "../../../../context/appContext/AppContext";
import TextNavbar from "../../../../Interface/navigation/textNavbar/TextNavbar";
import style from './SettingsMenu.module.css';

function SettingsMenu(props) {
    const lang = useContext(AppContext).currentLanguage; 

    const hasPermission = (route) => {
        if(
            route.accessRequired &&
            !props.user.accesses.includes(route.accessRequired)
        ) {
            return false;
        }

        if(route.allowedTo) {
            return route.allowedTo.includes(props.user.profile.role);
        } else if(route.notAllowedTo) {
            return !route.notAllowedTo.includes(props.user.profile.role);
        }

        return true;
    }

    const items = props.routes.reduce((array, route) => {
        if(!hasPermission(route)) return array;

        if(route.routes && route.routes.length) {
            const items = route.routes.reduce((items, nestedRoute) => {
                if(hasPermission(nestedRoute)) {
                    items.push({
                        label: nestedRoute.name, 
                        path: nestedRoute.path
                    });
                }
                
                return items;
            }, []);

            array.push({
                sectionName: route.label[lang], 
                items
            });
        } else {
            array.push({
                label: route.label[lang], 
                path: route.path
            });
        }

        return array;
    }, []);

    return (
        <TextNavbar 
            className={style.SettingsMenu} 
            activeClassName={style.active}
            items={items}
        />
    );
}

export default SettingsMenu;