import descriptions from './descriptions';
import icons from './icons';

const routes = {
    adminConsole: {
        path: '/admin-console',
        icon: icons.adminConsole        
    },
    ctiTool: {
        path: '/cti-tool',
        icon: icons.ctiTool,
        categorizeIncident: {
            path: '/cti-tool/categorize-incident',
            relativePath: 'categorize-incident',
            icon: icons.ctiTool._categorizeIncident
        },
        nonResponseEmail: {
            path: '/cti-tool/non-response-email',
            relativePath: 'non-response-email',
            icon: icons.ctiTool._nonResponseEmail
        },
        search: {
            path: '/cti-tool/search',
            relativePath: 'search',
            icon: icons.ctiTool._search,
            resolution: {
                path: '/cti-tool/search/resolution/:id',
                relativePath: 'resolution/:id'
            },
        },
        stats: {
            path: '/cti-tool/stats',
            relativePath: 'stats',
            icon: icons.ctiTool._stats
        },
        relatedPaths: [
            'categorizeIncident',
            'resolutionSearch',
            'nonResponseEmail',
            'resolutionStats'
        ]
    },
    // ctiToolSettings: {
    //     label: {
    //         en: 'CTI Tool',
    //         es: 'CTI Tool',
    //         pt: 'CTI Tool'
    //     },
    //     description: {
    //         en: '',
    //         es: '',
    //         pt: ''
    //     },
    //     path: '/cti-tool'
    // },
    forgotPassword: {
        path: '/forgot-password'
    },
    helix: {
        path: 'http://google.com',
        icon: icons.helix
    },
    home: {
        path: '/home',
        icon: icons.home
    },
    newAccountRequest: {
        path: '/newAccountRequest'
    },
    notificationCenter: {
        path: '/notification-center',
        icon: icons.notificationCenter,
        createNotification: {
            path: '/notification-center/create-notification',
            relativePath: 'create-notification',
            icon: icons.notificationCenter._createNotification
        },
        manageNotifications: {
            path: '/notification-center/manage-notifications',
            relativePath: 'manage-notifications',
            icon: icons.notificationCenter._manageNotifications
        }
    },
    onCallBoard: {
        path: '/on-call-board',
        icon: icons.onCallBoard
    },
    passwordCreation: {
        path: '/password-creation'
    },
    settings: {
        path: '/settings',
        icon: icons.settings,
        account: {
            path: '/settings/account',
            relativePath: 'account',
            accesses: {
                path: '/settings/account/accesses',
                relativePath: 'accesses'
            },
            approver: {
                path: '/settings/account/approver',
                relativePath: 'approver'
            },
            password: {
                path: '/settings/account/password',
                relativePath: 'password'
            },
            profile: {
                path: '/settings/account/profile',
                relativePath: 'profile'
            },
            requestHistory: {
                path: '/settings/account/request-history',
                relativePath: 'request-history'
            },
            role: {
                path: '/settings/account/role',
                relativePath: 'role'
            }
        },
        general: {
            path: '/settings/general',
            relativePath: 'general'
        },
        home: {
            path: '/settings/home',
            relativePath: 'home'
        }
    },
    signIn: {
        path: '/sign-in'
    },
    slaTime: {
        path: '/sla-time',
        icon: icons.slaTime
    },
    supportedApplications: {
        path: '/supported-applications',
        icon: icons.supportedApplications
    },
    teamManager: {
        path: '/team-manager',
        _data: {
            icon: icons.teamManager,
            label: icons.teamManager.label,
            description: descriptions.teamManager.description
        },
        manageTeam: {
            path: '/team-manager/manage-team',
            relativePath: 'manage-team',
            _data: {
                icon: icons.teamManager._manageTeam,
                label: icons.teamManager._manageTeam.label,
                description: descriptions.teamManager.manageTeam.description
            },
            team: {
                path: '/team-manager/manage-team/team',
                relativePath: 'team',
                teamMember: {
                    path: '/team-manager/manage-team/team/team-member/:_id',
                    relativePath: 'team-member/:_id',
                }
            },
            teamRequests: {
                path: '/team-manager/manage-team/team-requests',
                relativePath: 'team-requests',
            }
        },
        newAccountRequests: {
            path: '/team-manager/access-requests' ,             
            relativePath: 'access-requests',
            _data: {
                icon: icons.teamManager._newAccountRequests,              
                label: icons.teamManager._newAccountRequests.label,
                description: descriptions.teamManager.newAccountRequests.description
            },
        },
        relatedPaths: [
            'manageTeam',
            'newAccountRequests'
        ]
    },
    // yourResolutions: {
    //     icon: {
    //         source: 'material-icons',
    //         type: '',
    //         name: 'playlist_add_check'
    //     },
    //     label: {
    //         en: 'My Resolutions',
    //         es: 'Mis Resoluciones',
    //         pt: 'Minhas Resoluções'
    //     },
    //     description: {
    //         en: 'See the resolutions you have created',
    //         es: 'Ver resoluciones creadas por usted',
    //         pt: 'Veja as resoluções criadas por você'
    //     }
    // }
};

export default routes;