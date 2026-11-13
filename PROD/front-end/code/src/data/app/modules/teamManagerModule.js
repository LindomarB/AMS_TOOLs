const teamManagerModule = {
    name: 'team manager',
    path: '/team-manager',
    relativePath: 'team-manager',
    icon: 'team manager',
    isTool: true,
    userHaveAccess: (user) => {
        if(!user) return false;
        return ['track leader', 'manager', 'administrator'].includes(user.profile.role);
    },
    // accessAllowedTo: ['track leader', 'manager', 'administrator'],
    label: {
        en: 'Team Manager',
        es: 'Administrador de Equipo',
        pt: 'Gerenciador de Equipe'
    },
    description: {
        en: 'Manage your team and their requests',
        es: 'Administre su equipo y sus solicitudes',
        pt: 'Gerencie seu time e suas solicitações'
    },
    submodules: [
        {
            name: 'manage team',
            relativePath: 'manage-team',
            icon: 'manage team',
            label: {
                en: 'Manage Team',
                es: 'Gestionar Equipo',
                pt: 'Gerenciar Time'
            },
            description: {
                en: 'View and search for notifications',
                es: 'Ver y buscar notificaciones',
                pt: 'Veja e pesquise por notificações'
            },
            routes: [
                {
                    name: 'member details',
                    relativePath: ':id',
                    routes: [
                        {
                            name: 'account',
                            relativePath: 'account',
                            label: {
                                en: 'Account',
                                es: 'Cuenta',
                                pt: 'Conta'
                            },
                            routes: [
                                {
                                    name: 'tools', 
                                    relativePath: 'tools',
                                    label: {
                                        en: 'Tools',
                                        es: 'Herramientas',
                                        pt: 'Ferramentas'
                                    }
                                },
                                {
                                    name: 'accountables', 
                                    relativePath: 'accountables',
                                    label: {
                                        en: 'Accountables',
                                        es: 'Responsables',
                                        pt: 'Responsáveis'
                                    }
                                },
                                {
                                    name: 'profile',
                                    relativePath: 'profile',
                                    label: {
                                        en: 'Profile',
                                        es: 'Perfil',
                                        pt: 'Perfil'
                                    }
                                },
                                {
                                    name: 'reset password',
                                    relativePath: 'reset-password',
                                    label: {
                                        en: 'Reset Password',
                                        es: 'Redefinir Contraseña',
                                        pt: 'Redefinir Senha'
                                    },
                                    userHaveAccess: (user) => {
                                        if(!user) return false;
                                        return !!user.settings['password reset'];
                                    }
                                },
                                // {
                                //     name: 'status',
                                //     relativePath: 'status',
                                //     label: {
                                //         en: 'Status',
                                //         es: 'Status',
                                //         pt: 'Status'
                                //     }
                                // }
                            ]
                        },                        
                        {
                            name: 'cti tool',
                            relativePath: 'cti-tool',
                            label: 'CTI Tool',
                            accessRequired: 'cti tool',
                            routes: [
                                {
                                    name: 'applications', 
                                    relativePath: 'applications',
                                    label: {
                                        en: 'Applications',
                                        es: 'Aplicaciónes',
                                        pt: 'Aplicações'
                                    }
                                },
                                {
                                    name: 'support groups', 
                                    relativePath: 'support-groups',
                                    label: {
                                        en: 'Support Groups',
                                        es: 'Grupos de Soporte',
                                        pt: 'Grupos de Suporte'
                                    }
                                }
                            ]
                        },
                        {
                            name: 'team',
                            relativePath: 'team',
                            label: 'Team',
                            accessRequired: 'team manager',
                            routes: [
                                {
                                    name: 'members', 
                                    relativePath: 'members',
                                    label: {
                                        en: 'Members',
                                        es: 'Miembros',
                                        pt: 'Membros'
                                    }
                                },
                                {
                                    name: 'stats', 
                                    relativePath: 'stats',
                                    label: {
                                        en: 'Stats',
                                        es: 'Estadísticas',
                                        pt: 'Estatísticas'
                                    }
                                }
                            ]
                        },
                        {
                            name: 'requests',
                            relativePath: 'requests',
                            label: {
                                en: 'Requests',
                                es: 'Peticiones',
                                pt: 'Solicitações'
                            }
                        },
                        {
                            name: 'remove-member',
                            relativePath: 'remove-member',
                            label: {
                                en: 'Remove Member',
                                es: 'Quitar Miembro',
                                pt: 'Remover Member'
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'team organization',
            relativePath: 'team-organization',
            icon: 'team organization',
            label: {
                en: 'Team Organization',
                es: 'Organización del Equipo',
                pt: 'Organização do Time'
            },
            description: {
                en: 'Browse your team\'s org chart',
                es: 'Explore el organigrama de su equipo',
                pt: 'Navegue pelo organograma do seu time'
            }
        },
        {
            name: 'team requests',
            relativePath: 'team-requests',
            icon: 'team requests',
            label: {
                en: 'Team Requests',
                es: 'Solicitudes de Equipo',
                pt: 'Solicitações da Equipe'
            },
            description: {
                en: 'Look for and respond to requests from your team',
                es: 'Busque y responda a las solicitudes de su equipo',
                pt: 'Procure e responda às solicitações de sua equipe'
            }
        },
        // {
        //     name: 'account requests',
        //     relativePath: 'account-requests',
        //     icon: 'account requests',
        //     label: {
        //         en: 'Account Requests',
        //         es: 'Solicitudes Cuenta',
        //         pt: 'Solicitações Conta'
        //     },
        //     description: {
        //         en: 'See account requests made to you',
        //         es: 'Ver las solicitudes de cuenta realizadas para usted',
        //         pt: 'Veja as solicitações de conta feitas para você'
        //     }
        // }
    ]
};


// appModules.add({
//     name: 'notification center',
//     path: '/notification-center',
//     relativePath: 'notification-center',
//     icon: 'notification center',
//     isTool: true,
//     accessAllowedTo: ['track leader', 'manager', 'administrator'],
//     label: {
//         en: 'Notification Center',
//         es: 'Centro de Notificaciones',
//         pt: 'Central de Notificações'
//     },
//     description: {
//         en: 'Create notifications to your team or for all AMS Tools users',
//         es: 'Cree notificaciones para su equipo o para todos los usuarios de AMS Tools',
//         pt: 'Crie notificações para seu time ou para todos os usuários do AMS Tools'
//     },
//     submodules: [
//         {
//             name: 'notification board',
//             relativePath: 'notification-board',
//             icon: 'notification board',
//             label: {
//                 en: 'Notification Board',
//                 es: 'Tablero de Notificaciones',
//                 pt: 'Quadro de Notificações'
//             },
//             description: {
//                 en: 'View and search for notifications',
//                 es: 'Ver y buscar notificaciones',
//                 pt: 'Veja e pesquise por notificações'
//             }
//         },
//         {
//             name: 'create notification',
//             relativePath: 'create-notification',
//             icon: 'create notification',
//             label: {
//                 en: 'Create Notification',
//                 es: 'Crear Notificación',
//                 pt: 'Criar Notificação'
//             },
//             description: {
//                 en: 'Create a notification that will be displayed into the notification board',
//                 es: 'Crear una notificación que se mostrará en el tablón de notificaciones.',
//                 pt: 'Crie uma notificação que será exibida no quadro de notificações'
//             }
//         },
//         {
//             name: 'manage notifications',
//             relativePath: 'manage-notifications',
//             icon: 'manage notifications',
//             label: {
//                 en: 'Manage Notifications',
//                 es: 'Administrar Notificaciones',
//                 pt: 'Gerenciar Notificações'
//             },
//             description: {
//                 en: 'Edit, delete and search for your notifications',
//                 es: 'Edite, elimine y busque sus notificaciones',
//                 pt: 'Edite, delete e busque por suas notificações'
//             }
//         }
//     ]
// });



export default teamManagerModule;