import React, { useContext } from 'react';
import AppContext from '../../components/context/appContext/AppContext';
import Navbar from '../../components/Interface/navbar/Navbar';
import style from './AppNavbar.module.css';
import UserContext from '../../components/context/userContext/UserContext';

function AppNavbar (props) {
    const appCtx = useContext(AppContext);
    const userCtx = useContext(UserContext);
    const lexicon = appCtx.lexicon.theme.navbar;

    const routes = appCtx.routes;
    const user = userCtx.user;

    const items = [
        {
            path: routes.home.path,
            defaultIcon: {...routes.home.icon, type:'outlined'},
            activeIcon: routes.home.icon,
            label: routes.home.name,
            available: true
        },
        {
            path: routes.ctiTool.path,
            defaultIcon: routes.ctiTool.icon,
            activeIcon: {...routes.ctiTool.icon, style: {fontWeight: "bold"}},
            label: routes.ctiTool.name,
            submenuItems: [
                {
                    label: routes.ctiTool.name,
                    path: routes.ctiTool.path
                },
                {
                    label: routes.ctiTool_categorizeIncident.name,
                    path: routes.ctiTool_categorizeIncident.path
                },
                // {
                //     label: routes.myResolutions.label,
                //     path: routes.myResolutions.path
                // },
                // {
                //     label: routes.ctiTool_nonResponseEmail.name,
                //     path: routes.ctiTool_nonResponseEmail.path
                // },
                {
                    label: routes.ctiTool_search.name,
                    path: routes.ctiTool_search.path
                },
                // {
                //     label: routes.ctiTool_resolutionStats.name,
                //     path: routes.ctiTool_resolutionStats.path
                // }
            ],
            available: user.access.ctiTool
        },
        {
            path: routes.helix.path,
            externalLink: true,
            icon: routes.helix.icon,
            label: routes.helix.name,
            available: true
        },
        // {
        //     path: routes.notificationCenter.path,
        //     defaultIcon: {...routes.notificationCenter.icon, type: 'outlined'},
        //     activeIcon: routes.notificationCenter.icon,
        //     label: routes.notificationCenter.label,
        //     submenuItems: [
        //         {
        //             label: routes.notificationCenter.label,
        //             path: routes.notificationCenter.path,
        //         },
        //         {
        //             label: routes.createNotification.label,
        //             path: routes.createNotification.path,
        //         },
        //         {
        //             label: routes.manageNotifications.label,
        //             path: routes.manageNotifications.path,
        //         }
        //     ],
        //     available: true
        // }
        // {
        //     path: routes.supportedApplications.path,
        //     defaultIcon: {...routes.supportedApplications.icon, type: 'outlined'},
        //     activeIcon: routes.supportedApplications.icon,
        //     label: routes.supportedApplications.label,
        //     available: user.access.supportedApplications
        // },
        // {
        //     path: routes.onCall.path,
        //     defaultIcon: {...routes.onCall.icon, type: 'outlined'},
        //     activeIcon: routes.onCall.icon,
        //     label: routes.onCall.label,
        //     available: user.access.onCall
        // },
        {
            path: routes.slaTime.path,
            defaultIcon: {...routes.slaTime.icon, type: 'outlined'},
            activeIcon: routes.slaTime.icon,
            label: routes.slaTime.name,
            available: true
        },
        {
            path: routes.teamManager.path,
            defaultIcon: {...routes.teamManager.icon},
            activeIcon: routes.teamManager.icon,
            label: routes.teamManager.name,
            available: user.access.teamManager,
            notification: !!user.notifications.newAccount || !!user.notifications.teamRequest,
            submenuItems: [
                {
                    label: routes.teamManager.name,
                    path: routes.teamManager.path,
                },
                {
                    label: routes.teamManager_manageTeam.name,
                    path: routes.teamManager_manageTeam.path,
                    notification: !!user.notifications.teamRequest,
                },
                {
                    label: routes.teamManager_newAccountRequests.name,
                    path: routes.teamManager_newAccountRequests.path,
                    notification: !!user.notifications.newAccount,
                }
            ]
        },
        // {
        //     path: routes.adminConsole.path,
        //     defaultIcon: {...routes.adminConsole.icon, type: 'outlined'},
        //     activeIcon: routes.adminConsole.icon,
        //     label: routes.adminConsole.label,
        //     submenuItems: [
        //         {
        //             label: routes.adminConsole.label,
        //             path: routes.adminConsole.path
        //         },
                // {
                //     label: routes.tierTree.label,
                //     path: routes.tierTree.path,
                //     group: lexicon.ctiTool
                // },
                // {
                //     label: routes.classifications.label,
                //     path: routes.classifications.path,
                //     group: lexicon.ctiTool
                // },
                // {
                //     label: routes.breachReasons.label,
                //     path: routes.breachReasons.path,
                //     group: lexicon.ctiTool
                // },
                // {
                //     label: routes.supportedApplications.label,
                //     path: routes.supportedApplications.path,
                //     group: lexicon.wipro
                // },
                // {
                //     label: routes.slaTime.label,
                //     path: routes.slaTime.path,
                //     group: lexicon.wipro
                // }
        //     ],
        //     available: user.access.adminConsole
        // },
        {
            path: routes.settings.path,
            defaultIcon: {...routes.settings.icon, type: 'outlined'},
            activeIcon: routes.settings.icon,
            label: routes.settings.name,
            available: true
        }
    ]

    return (
        <Navbar
            {...props}
            className={style.AppNavbar}
            expandedWidth='120px'
            items={items}
            menuCollapser
        />
    );
}

export default AppNavbar;