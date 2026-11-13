import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../../components/context/appContext/AppContext";

const value = {
    pageTitle: null,
    setPageTitle: () => {},
    headerNav: null,
    setHeaderNav: () => {}
};

const RouterContext = createContext(value);

export function RouterContextProvider(props) {
    const [pageTitle, setPageTitle] = useState("");
    const [headerNav, setHeaderNav] = useState(null);
    const appCtx = useContext(AppContext);
    const location = useLocation();

    const routes = appCtx.routes;

    useEffect(() => {
        document.title = `AMS Tools - ${pageTitle}`;
    }, [pageTitle]);

    useEffect(() => {
        const getHeaderItems = (headerRoutes) => {
            return headerRoutes.map(route => ({
                label: routes[route].label,
                path: routes[route].path
            }));
        }

        const rootPath = `/${location.pathname.split('/')[1]}`;

        switch(rootPath) {
            case routes.home.path:
                setPageTitle(routes.home.label);
                setHeaderNav(null);
                break;
            case routes.ctiTool.path:
                const headerRoutes = [
                    'categorizeIncident',
                    'resolutionSearch',
                    'nonResponseEmail',
                    'resolutionStats'
                ];

                const headerItems = [
                    {
                        label: routes.ctiTool.label,
                        path: routes.ctiTool.path,
                        absolutePath: true
                    },
                    ...getHeaderItems(headerRoutes)
                ];

                setHeaderNav(headerItems);
                break;
            default:
                setHeaderNav(null);
        }
    }, [location.pathname]);

    return (
        <RouterContext.Provider value={{
            ...value,
            pageTitle,
            setPageTitle,
            headerNav,
            setHeaderNav
        }}>
            {props.children}
        </RouterContext.Provider>
    );
}

export default RouterContext;