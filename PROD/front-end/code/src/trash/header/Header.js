import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../../components/context/appContext/AppContext';
import UnderlineMenu from '../../components/Interface/underlineMenu/UnderlineMenu';
import AccountPopBox from '../popBox/account/AccountPopBox';
import style from './Header.module.css';

function Header (props) {
    const [headerLinks, setHeaderLinks] = useState(null);
    const [rootPath, setRootPath] = useState(null);
    const appCtx = useContext(AppContext);
    const location = useLocation();
    const routes = appCtx.routes;

    useEffect(() => {
        setRootPath(`/${location.pathname.split('/')[1]}`);
    }, [location.pathname]);

    useEffect(() => {
        const headerSettings = getHeaderSettings(rootPath, routes);
        setHeaderLinks(headerSettings.links);

        document.title = `AMS Tools - ${headerSettings.pageTitle}`; 
    }, [rootPath]);

    return (
        <header className={style.Header}>
            <Link className={style.logoAnchor} to={routes.home.path}>
                <img className={style.logo} src={'images/ams-tools-logo.svg'}/>
            </Link>
            {headerLinks && 
                <UnderlineMenu 
                    className={style.underlineMenu}
                    items={headerLinks}
                />
            }
            <AccountPopBox />
        </header>
    );
}

function getHeaderSettings(rootPath, routes) {  
    const getHeaderLinks = (mainRoute) => {
        if(!routes[mainRoute].headerLinks) return null;
        const headerLinks = [
            {
                label: routes[mainRoute].icon.label,
                path: routes[mainRoute].path,
                absolutePath: true
            }
        ];

        routes[mainRoute].headerLinks.forEach(route => {
            headerLinks.push({
                label: routes[route].name,
                path: routes[route].path
            });
        });

        return headerLinks;
    }

    const headerSettings = {};
    
    for(let route in routes) {
        if(routes[route].path === rootPath) {
            headerSettings.pageTitle = routes[route].name;
            headerSettings.links = getHeaderLinks(route);
            break;
        }
    }

    return headerSettings;
}

export default Header;