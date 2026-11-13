import React, { Fragment, useContext, useEffect } from "react";
import style from './CTITool.module.css';
import AppContext from "../../context/appContext/AppContext";
import PageSection from "../../Interface/pageSection/PageSection";
import ButtonWithDescription from "../../Interface/buttons/buttonWithDescription/ButtonWithDescription";
import ResolutionSearch from "../../cti-tool/resolutionSearch/ResolutionSearch";
import SectionHeader from "../../Interface/sectionHeader/SectionHeader";

function CTITool(props) {
    const appCtx = useContext(AppContext);
    const lexicon = appCtx.lexicon.routes.managementConsole.home;
    const routes = appCtx.routes;
    const icons = appCtx.icons;

    const menuRoutes = [
        'ctiTool_categorizeIncident',
        'ctiTool_search',
        // 'yourResolutions',
        'ctiTool_nonResponseEmail',
        'ctiTool_stats',
    ];

    const menuOptions = [];

    menuRoutes.forEach(routeName => {
        const route = routes[routeName];

        menuOptions.push(
            <ButtonWithDescription
                key={routeName} 
                icon={route.icon}
                color='#3D2D71'
                label={route.label}
                description={route.description}
                path={route.path}
                disableTooltip
            />
        );
    });

    return (
        <Fragment>
            <PageSection
                banner={{
                    className: style.banner,
                    title: routes.ctiTool.label,
                    text: routes.ctiTool.description,
                    image: '/images/banner-cti-tool.svg',
                    gradient: 'linear-gradient(to bottom, rgba(13, 8, 23, 0.60), rgba(34, 22, 60, 0.60))'
                }}
                header={{icon: icons.menu}}
                type='menu'
            >
                {menuOptions}
            </PageSection>
            <ResolutionSearch 
                name='cti-tool-your-resolutions'
                className={style.table}
                headerClassName={style.tableHeader}
                title={
                    <SectionHeader 
                        className={style.yourResolutionsHeader}
                        title='Your Resolutions'
                        icon={icons.yourResolutions}
                    />
                }
            />
        </Fragment>
    );
}

export default CTITool;