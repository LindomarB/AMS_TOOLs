import icons from "./icons";

const routes = {
    adminConsole: {
        path: '/admin-console',
        name: icons.adminConsole.label,
        description: {
            en: 'Manage your team and the AMS Tools data',
            es: 'Administre su equipo y los datos de AMS Tools',
            pt: 'Gerencie seu time e os dados do AMS Tools'
        },
        icon: icons.adminConsole        
    },
    ctiTool: {
        path: '/cti-tool',
        relativePath: 'cti-tool',
        name: icons.ctiTool.label,
        description: {
            en: 'Categorize the resolutions for your incidents',
            es: 'Categorice sus resoluciones de incidentes',
            pt: 'Categorize as resoluções de seus incidentes'
        },
        icon: icons.ctiTool,
        
        headerLinks: [
            'ctiTool_categorizeIncident',
            'ctiTool_search',
            'ctiTool_nonResponseEmail',
            'ctiTool_stats'
        ]
    },
    ctiTool_categorizeIncident: {
        path: '/cti-tool/categorize-incident',
        relativePath: 'categorize-incident',
        name: icons.ctiTool_categorizeIncident.label,
        description: {
            en: 'Create a resolution to attach to your resolved incident',
            es: 'Create a resolution to attach to your resolved incident',
            pt: 'Create a resolution to attach to your resolved incident'
        },
        icon: icons.ctiTool_categorizeIncident,
        
    },
    ctiTool_nonResponseEmail: {
        path: '/cti-tool/non-response-email',
        relativePath: 'non-response-email',
        name: icons.ctiTool_nonResponseEmail.label,
        description: {
            en: 'Send a default e-mail for the incident user in case of no response',
            es: 'Enviar un correo electrónico estándar al usuario incidente en caso de \'no response\'',
            pt: 'Envie um e-mail padrão para o usuário do incidente em caso de \'no response\''
        },
        icon: icons.ctiTool_nonResponseEmail,
        
    },
    ctiTool_search: {
        path: '/cti-tool/search',
        relativePath: 'search',
        name: icons.ctiTool_search.label,
        description: {
            en: 'Search for incident resolutions',
            es: 'Buscar resoluciones de incidentes',
            pt: 'Pesquise por resoluções de incidentes'
        },
        icon: icons.ctiTool_search,
        
    },
    ctiTool_search_resolution: {
        path: '/cti-tool/search/resolution/:id',
        relativePath: 'resolution/:id',
        
    },
    ctiTool_stats: {
        path: '/cti-tool/stats',
        relativePath: 'stats',
        name: icons.ctiTool_stats.label,
        description: {
            en: 'See data about the resolved incidents',
            es: 'Ver datos de incidencias resueltas',
            pt: 'Veja dados sobre os incidentes resolvidos'
        },
        icon: icons.ctiTool_stats,
        
    },
    forgotPassword: {
        path: '/forgot-password'
    },
    helix: {
        path: 'http://google.com',
        name: icons.helix.label,
        icon: icons.helix
    },
    home: {
        path: '/home',
        name: icons.home.label,
        description: {
            en: 'The support information hub',
            es: 'El centro de información de soporte',
            pt: 'O centro de informações do suporte'
        },
        icon: icons.home,
        
    },
    newAccountRequest: {
        path: '/newAccountRequest',
        
    },
    notificationCenter: {
        path: '/notification-center',
        relativePath: 'notification-center',
        name: icons.notificationCenter.label,
        description: {
            en: 'Create notifications to your team or for all AMS Tools users',
            es: 'Cree notificaciones para su equipo o para todos los usuarios de AMS Tools',
            pt: 'Crie notificações para seu time ou para todos os usuários do AMS Tools'
        },
        icon: icons.notificationCenter,
        
        headerLinks: [
            'teamManager', 
            'teamManager_manageTeam', 
            'teamManager_newAccountRequests'
        ]
    },
    notificationCenter_createNotification: {
        path: '/notification-center/create-notification',
        relativePath: 'create-notification',
        name: icons.notificationCenter_createNotification.label,
        description: {
            en: 'Create a notification that will be displayed into the notification board',
            es: 'Crear una notificación que se mostrará en el tablón de notificaciones.',
            pt: 'Crie uma notificação que será exibida no quadro de notificações'
        },
        icon: icons.notificationCenter_createNotification,
        
        headerLinks: [
            'teamManager', 
            'teamManager_manageTeam', 
            'teamManager_newAccountRequests'
        ]
    },
    notificationCenter_manageNotifications: {
        path: '/notification-center/manage-notifications',
        relativePath: 'manage-notifications',
        name: icons.notificationCenter_manageNotifications.label,
        description: {
            en: 'Edit, delete or search for your current and old notifications',
            es: 'Edite, elimine o busque sus notificaciones actuales y antiguas',
            pt: 'Edite, delete ou busque por suas notificações atuais e antigas'
        },
        icon: icons.notificationCenter_manageNotifications,
        
        headerLinks: [
            'teamManager', 
            'teamManager_manageTeam', 
            'teamManager_newAccountRequests'
        ]
    },
    onCallBoard: {
        path: '/on-call-board',
        name: icons.onCallBoard.label,
        icon: icons.onCallBoard
    },
    passwordCreation: {
        path: '/password-creation'
    },
    settings: {
        path: '/settings',
        relativePath: 'settings',
        name: icons.settings.label,
        icon: icons.settings,
        
    },
    settings_account: {
        path: '/settings/account',
        relativePath: 'account/*',
        
    },
    settings_account_accesses: {
        path: '/settings/account/accesses',
        relativePath: 'accesses',
        
    },
    settings_account_approver: {
        path: '/settings/account/approver',
        relativePath: 'approver',
        
    },
    settings_account_password: {
        path: '/settings/account/password',
        relativePath: 'password',
        
    },
    settings_account_profile: {
        path: '/settings/account/profile',
        relativePath: 'profile',
        
    },
    settings_account_requestHistory: {
        path: '/settings/account/request-history',
        relativePath: 'request-history',
        
    },
    settings_account_role: {
        path: '/settings/account/role',
        relativePath: 'role',
        
    },
    settings_general: {
        path: '/settings/general',
        relativePath: 'general',
        
    },
    settings_home: {
        path: '/settings/home',
        relativePath: 'home',
        
    },
    signIn: {
        path: '/sign-in'
    },
    slaTime: {
        path: '/sla-time',
        name: icons.slaTime.label,
        description: {
            en: 'Consult the SLA time for response and resolution for each priority',
            es: 'Ver tiempo de SLA de respuesta y resolución para cada prioridad',
            pt: 'Consulte o tempo de SLA de resposta e resolução para cada prioridade'
        },
        icon: icons.slaTime
    },
    supportedApplications: {
        path: '/supported-applications',
        name: icons.supportedApplications.label,
        description: {
            en: 'Find all the information you need about Wipro supported applications',
            es: 'Encuentre toda la información que necesita sobre las aplicaciones compatibles con Wipro',
            pt: 'Encontre todas as informações que você precisa sobre as aplicações suportadas pela Wipro'
        },
        icon: icons.supportedApplications
    },
    teamManager: {
        path: '/team-manager',
        relativePath: 'team-manager',
        name: icons.teamManager.label,
        description: {
            en: 'Manage your team and their requests',
            es: 'Administre su equipo y sus solicitudes',
            pt: 'Gerencie seu time e suas solicitações'
        },
        icon: icons.teamManager,
        
        headerLinks: [
            'teamManager_manageTeam', 
            'teamManager_newAccountRequests'
        ]
    },
    teamManager_manageTeam: {
        path: '/team-manager/manage-team',
        relativePath: 'manage-team',
        name: icons.teamManager_manageTeam.label,
        description: {
            en: 'Manage your team requests and accesses',
            es: 'Gestiona las solicitudes y accesos de tu equipo',
            pt: 'Gerencie as solicitações e acessos do seu time'
        },
        icon: icons.teamManager_manageTeam,
        
    },
    teamManager_manageTeam_team: {
        path: '/team-manager/manage-team/team',
        relativePath: 'team',
        name: {
            en: 'Team',
            es: 'Equipo',
            pt: 'Equipe'
        },
        
    },
    teamManager_manageTeam_team_member: {
        path: '/team-manager/manage-team/team/member/:_id/*',
        relativePath: 'member/:_id/*',
    },
    teamManager_manageTeam_team_member_accesses: {
        path: '/team-manager/manage-team/team/member/:_id/accesses',
        relativePath: 'accesses',
        name: {
            en: 'Accesses',
            es: 'Accesos',
            pt: 'Acessos'
        },
    },
    teamManager_manageTeam_team_member_account: {
        path: '/team-manager/manage-team/team/member/:_id/account',
        relativePath: 'account',
        name: {
            en: 'Account',
            es: 'Cuenta',
            pt: 'Conta'
        },
    },
    teamManager_manageTeam_team_member_ctiTool: {
        path: '/team-manager/manage-team/team/member/:_id/ctiTool',
        relativePath: 'ctiTool',
        name: {
            en: 'CTI Tool',
            es: 'CTI Tool',
            pt: 'CTI Tool'
        },
    },
    teamManager_manageTeam_teamRequests: {
        path: '/team-manager/manage-team/team-requests',
        relativePath: 'team-requests',
        name: {
            en: 'Requests',
            es: 'Solucitudes',
            pt: 'Solicitações'
        },
        
    },
    teamManager_newAccountRequests: {
        path: '/team-manager/new-account-requests' ,             
        relativePath: 'new-account-requests',
        name: icons.teamManager_newAccountRequests.label,
        description: {
            en: 'See new account requests made for you',
            es: 'Ver las solicitudes de nueva cuenta realizadas para usted',
            pt: 'Veja as solicitações de nova conta feitas para você'
        },    
        icon: icons.teamManager_newAccountRequests,
        
    }
};

export default routes;