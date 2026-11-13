const iconNames = {
    about: 'info',
    access: 'settings_b_roll',
    account: 'account_circle',
    'account requests': 'person_add',
    'account settings': 'settings_account_box',
    accountable: 'supervisor_account',
    'accountable change': 'social_distance',
    'accountable removal': 'group_remove',
    active: 'done',
    'add user': 'person_add',
    administrator: 'shield_person',
    alert: 'error',
    'ams tools': 'memory',
    analyst: 'person',
    'application catalog': 'auto_stories',
    'approval in progress': 'preliminary',
    approve: 'thumb_up',
    approved: 'thumb_up',
    approver: 'how_to_reg',
    away: 'exit_to_app',
    back: 'west',
    bug: 'bug_report',
    'button alert': 'error',
    calendar: 'calendar_today',
    'calendar full': 'calendar_month',
    // cancel: 'close',
    'cancel request': 'cancel_schedule_send',
    canceled: 'close',
    change: 'swap_horiz',
    confirm: 'done',
    country: 'public',
    'cti tool': 'build_circle',
    'cti application': 'settings_account_box',
    'clear filters': 'filter_alt_off',
    'close menu': 'menu_open',
    copy: 'content_copy',
    'create notification': 'notification_add',
    dashboards: 'insert_chart',
    'directly accountable': 'supervised_user_circle',
    'directly member': 'enable',
    dot: 'fiber_manual_record',
    error: 'report',
    expired: 'event_busy',
    faq: 'quiz',
    filter: 'filter_alt',
    forward: 'east',
    global: 'public',
    guide: 'book',
    id: 'badge',
    important: 'report',
    leaders: 'flag',
    locked: 'lock',
    'manage notifications': 'edit_notifications',
    'manage team': 'group',
    manager: 'groups',
    maintenance: 'home_repair_service',
    'more': 'more_horiz',
    'new notification': 'notifications_active',
    'new accountable': 'group_add',
    'no access': 'unpublished',
    'no request': 'do_not_touch',
    'no team': 'group_off',
    'no user': 'no_accounts',
    'notification center': 'notifications',
    'pending no circle': 'more_horiz',
    private: 'person',
    'quick access': 'star',
    refuse: 'block',
    refused: 'block',
    'release notes': 'new_releases',
    'remove user': 'person_remove',
    request: 'front_hand',
    reset: 'restart_alt',
    resolution: 'build',
    'resolution in progress': 'other_admission',
    save: 'download',
    successful: 'done_all',
    support: 'contact_support',
    'support group': 'support_agent',
    system: 'memory',
    role: 'assignment_ind',
    'sla time': 'timer',
    'talk to us': 'support_agent',
    target: 'my_location',
    team: 'groups',
    'team manager': 'groups',
    'team organization': 'lan',
    'team requests': 'front_hand',
    'tiers tree': 'hub',
    tools: 'widgets',
    'track leader': 'supervisor_account',
    unsaved: 'file_download_off',
    update: 'upgrade',
    user: 'account_circle',
    'user info': 'data_loss_prevention',
    you: 'person_pin_circle'
    // account: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'account_circle',
    //     label: {
    //         en: 'Account',
    //         es: 'Cuenta',
    //         pt: 'Conta'
    //     }
    // },
    // adminConsole: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'manage_accounts',
    //     label: {
    //         en: 'Management Console',
    //         es: 'Consola de Administración',
    //         pt: 'Console de Gerenciamento'
    //     }
    // },
    // alert: {
    //     source: 'material-icons',
    //     type: 'round',
    //     name: 'warning',
    //     label: {
    //         en: 'Warning',
    //         es: 'Alerta',
    //         pt: 'Alerta'
    //     }
    // },
    // approve: {
    //     source: 'material-icons',
    //     type: 'outlined',
    //     name: 'check_circle',
    //     label: {
    //         en: 'Approve',
    //         es: 'Aprobar',
    //         pt: 'Aprovar'
    //     }
    // },
    // approver: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'supervisor_account',
    //     label: {
    //         en: 'Approver',
    //         es: 'aprobador',
    //         pt: 'Aprovador'
    //     }
    // },
    // back: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'arrow_back_ios_new',
    //     label: {
    //         en: 'Back',
    //         es: 'Regresar',
    //         pt: 'Voltar'
    //     }
    // },
    // cancel: {
    //     source: 'material-icons',
    //     type: 'outlined',
    //     name: 'cancel',
    //     label: {
    //         en: 'Cancel',
    //         es: 'Cancelar',
    //         pt: 'Cancelar'
    //     }
    // },
    // cleanFilter: {
    //     source: 'material-icons',
    //     type: 'outlined',
    //     name: 'filter_alt_off',
    //     label: {
    //         en: 'Clean Filters',
    //         es: 'Borrar Filtros',
    //         pt: 'Limpar Filtros'
    //     }
    // },
    // close: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'close',
    //     label: {
    //         en: 'Close',
    //         es: 'Cerrar',
    //         pt: 'Fechar'
    //     }
    // },
    // collapseMenu: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'menu_open',
    //     label: {
    //         en: 'Collapse Menu',
    //         es: 'Colapsar Menú',
    //         pt: 'Recolher Menu'
    //     }
    // },
    // columns: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'view_column',
    //     label: {
    //         en: 'Columns',
    //         es: 'Columnas',
    //         pt: 'Colunas'
    //     }
    // },
    // copy: {
    //     source: 'material-icons',
    //     type: 'round',
    //     name: 'content_copy',
    //     label: {
    //         en: 'Copy',
    //         es: 'Copiar',
    //         pt: 'Copiar'
    //     }
    // },
    // // ctiTool: {
    // //     source: 'text',
    // //     text: 'CTI',
    // //     label: {
    // //         en: 'CTI Tool',
    // //         es: 'CTI Tool',
    // //         pt: 'CTI Tool'
    // //     }        
    
    // // },
    // ctiTool_categorizeIncident: {
    //     source: 'material-icons',
    //     type: 'outlined',
    //     name: 'fact_check',
    //     label: {
    //         en: 'Categorize Incident',
    //         es: 'Categorizar Incidente',
    //         pt: 'Categorizar Incidente'
    //     }            
    // },
    // ctiTool_nonResponseEmail: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'email',
    //     label: {
    //         en: 'Non-Response Email',
    //         es: 'Non-Response Email',
    //         pt: 'Non-Response Email'
    //     }           
    // },
    // ctiTool_search: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'search',
    //     label: {
    //         en: 'Resolution Search',
    //         es: 'Búsqueda de Resolución',
    //         pt: 'Pesquisa de Resolução'
    //     }            
    // },
    // ctiTool_stats: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'assessment',
    //     label: {
    //         en: 'Resolution Stats',
    //         es: 'Estadísticas de Resolución',
    //         pt: 'Estatísticas de Resoluções'
    //     }            
    // },
    // done: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'done',
    //     label: {
    //         en: 'Done',
    //         es: 'Concluir',
    //         pt: 'Concluir'
    //     }
    // },
    // edit: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'edit',
    //     label: {
    //         en: 'Edit',
    //         es: 'Editar',
    //         pt: 'Editar'
    //     }
    // },
    // email: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'email',
    //     label: {
    //         en: 'Email',
    //         es: 'Email',
    //         pt: 'Email'
    //     }
    // },
    // error: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'report',
    //     label: {
    //         en: 'Error',
    //         es: 'Error',
    //         pt: 'Erro'
    //     }
    // },
    // expand: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'expand_more',
    //     label: {
    //         en: 'Expand',
    //         es: 'Expandir',
    //         pt: 'Expandir'
    //     }
    // },
    // filter: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'filter_alt',
    //     label: {
    //         en: 'Filters',
    //         es: 'Filtros',
    //         pt: 'Filtros'
    //     }
    // },
    // forward: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'arrow_forward_ios',
    //     label: {
    //         en: 'Next',
    //         es: 'Siguiente',
    //         pt: 'Próximo'
    //     }
    // },
    // grant: {
    //     source: 'material-icons',
    //     type: 'outlined',
    //     name: 'check_circle',
    //     label: {
    //         en: 'Grant',
    //         es: 'Conceder',
    //         pt: 'Conceder'
    //     }
    // },
    // // home: {
    // //     source: 'material-icons',
    // //     type: '',
    // //     name: 'home',
    // //     label: {
    // //         en: 'Home',
    // //         es: 'Home',
    // //         pt: 'Home'
    // //     }
    // // },
    // helix: {
    //     source: 'image',
    //     fileName: 'helix.svg',
    //     default: {
    //         fileName: 'helix-default.svg'
    //     },
    //     active: {
    //         fileName: 'helix-active.svg'
    //     },
    //     label: {
    //         en: 'Helix',
    //         es: 'Helix',
    //         pt: 'Helix'
    //     }
    // },
    // id: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'assignment_ind',
    //     label: {
    //         en: 'Account Settings',
    //         es: 'Configuraciones de la Cuenta',
    //         pt: 'Configurações da Conta'
    //     }
    // },
    // key: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'key',
    //     label: {
    //         en: 'Unlock',
    //         es: 'Desbloquear',
    //         pt: 'Desbloquear'
    //     }
    // },
    // language: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'language',
    //     label: {
    //         en: 'Language',
    //         es: 'Idioma',
    //         pt: 'Idioma'
    //     }
    // },
    // leftArrow: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'west',
    //     label: {
    //         en: 'Back',
    //         es: 'Regressar',
    //         pt: 'Voltar'
    //     }
    // },
    // lock: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'lock',
    //     label: {
    //         en: 'Lock',
    //         es: 'Bloquear',
    //         pt: 'Bloquear'
    //     }
    // },
    // login: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'login',
    //     label: {
    //         en: 'Login',
    //         es: 'Login',
    //         pt: 'Entrar'
    //     }
    // },
    // logout: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'logout',
    //     label: {
    //         en: 'Logout',
    //         es: 'Salir',
    //         pt: 'Sair'
    //     }
    // },
    // managementConsole: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'manage_accounts',
    //     label: {
    //         en: 'Management Console',
    //         es: 'Consola de Administración',
    //         pt: 'Console de Gerenciamento'
    //     }
    // },
    // // menu: {
    // //     source: 'material-icons',
    // //     type: '',
    // //     name: 'menu',
    // //     label: {
    // //         en: 'Menu',
    // //         es: 'Menu',
    // //         pt: 'Menu'
    // //     }
    // // },
    // more: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'more_horiz',
    //     label: {
    //         en: 'More',
    //         es: 'Más',
    //         pt: 'Mais'
    //     }
    // },
    // next: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'arrow_forward_ios',
    //     label: {
    //         en: 'Next',
    //         es: 'Siguiente',
    //         pt: 'Próximo'
    //     }
    // },
    // // notificationCenter: {
    // //     source: 'material-icons',
    // //     type: '',
    // //     name: 'campaign',
    // //     label: {
    // //         en: 'Notification Center',
    // //         es: 'Centro de Notificaciones',
    // //         pt: 'Central de Notificações'
    // //     }    
    // // },
    // notificationCenter_createNotification: {
    //     source: 'material-icons',
    //     type: 'outlined',
    //     name: 'note_add',
    //     label: {
    //         en: 'Create Notification',
    //         es: 'Crear Notificación',
    //         pt: 'Criar Notificação'
    //     }            
    // },
    // notificationCenter_manageNotifications: {
    //     source: 'material-icons',
    //     type: 'outlined',
    //     name: 'sticky_note_2',
    //     label: {
    //         en: 'Manage Notification',
    //         es: 'Administrar Notificaciones',
    //         pt: 'Gerenciar Notificações'
    //     }            
    // },
    // onCallBoard: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'ring_volume',
    //     label: {
    //         en: 'On-Call',
    //         es: 'On-Call',
    //         pt: 'Plantão'
    //     },
    //     description: {
    //         en: '',
    //         es: '',
    //         pt: ''
    //     }
    // },
    // pending: {
    //     source: 'material-icons',
    //     type: 'outlined',
    //     name: 'pending',
    //     label: {
    //         en: 'Pending',
    //         es: 'Pendiente',
    //         pt: 'Pendente'
    //     }
    // },
    // role: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'person',
    //     label: {
    //         en: 'Role',
    //         es: 'Role',
    //         pt: 'Função'
    //     }
    // },
    // quickAccess: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'widgets',
    //     label: {
    //         en: 'Quick Access',
    //         es: 'Acceso rapido',
    //         pt: 'Acesso Rápido'
    //     }
    // },
    // refuse: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'do_not_disturb',
    //     label: {
    //         en: 'Refuse',
    //         es: 'Rechazar',
    //         pt: 'Recusar'
    //     }
    // },
    // reset: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'restart_alt',
    //     label: {
    //         en: 'Reset',
    //         es: 'Reiniciar',
    //         pt: 'Reiniciar'
    //     }
    // },
    // retract: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'expand_less',
    //     label: {
    //         en: 'Retract',
    //         es: 'Colapsar',
    //         pt: 'Recolher'
    //     }
    // },
    // rightArrow: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'east',
    //     label: {
    //         en: '',
    //         es: '',
    //         pt: ''
    //     }
    // },
    // save: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'save_alt',
    //     label: {
    //         en: 'Save',
    //         es: 'Guardar',
    //         pt: 'Salvar'
    //     }
    // },
    // send: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'send',
    //     label: {
    //         en: 'Send',
    //         es: 'Enviar',
    //         pt: 'Enviar'
    //     }
    // },
    // // settings: {
    // //     source: 'material-icons',
    // //     type: '',
    // //     name: 'settings',
    // //     label: {
    // //         en: 'Settings',
    // //         es: 'Ajustes',
    // //         pt: 'Configurações'
    // //     }
    // // },
    // // slaTime: {
    // //     source: 'material-icons',
    // //     type: '',
    // //     name: 'timer',
    // //     label: {
    // //         en: 'SLA Time',
    // //         es: 'Tiempo de SLA',
    // //         pt: 'Tempo de SLA'
    // //     }
    // // },
    // successful: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'done_all',
    //     label: {
    //         en: 'Successful',
    //         es: 'Con Éxito',
    //         pt: 'Com Êxito'
    //     }
    // },
    // supportedApplications: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'support_agent',
    //     label: {
    //         en: 'Supported Applications',
    //         es: 'Aplicaciones Soportado',
    //         pt: 'Aplicações Suportadas'
    //     }
    // },
    // // team: {
    // //     source: 'material-icons',
    // //     type: '',
    // //     name: 'groups',
    // //     label: {
    // //         en: 'Team',
    // //         es: 'Equipo',
    // //         pt: 'Equipe'
    // //     }
    // // }, 
    // teamManager: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'groups',
    //     label: {
    //         en: 'Team Manager',
    //         es: 'Administrador de Equipo',
    //         pt: 'Gerenciador de Equipe'
    //     }        
    // },
    // teamManager_manageTeam: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'supervisor_account',
    //     label: {
    //         en: 'Manage Team',
    //         es: 'Gestionar Equipo',
    //         pt: 'Gerenciar Time'
    //     }
    // },
    // teamManager_newAccountRequests: {
    //     source: 'material-icons',
    //     type: '',
    //     name: 'person_add_alt_1',
    //     label: {
    //         en: 'New Account Requests',
    //         es: 'Solicitudes de Nueva Cuenta',
    //         pt: 'Solicitações de Nova Conta'
    //     }            
    // },
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
    //     }
    // }
};

export default iconNames;