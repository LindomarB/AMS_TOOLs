const accountSettingsModule = {
    name: 'account settings',
    path: '/account-settings',
    relativePath: 'account-settings',
    icon: 'account settings',
    label: {
        en: 'Account Settings',
        es: 'Configuraciones de la Cuenta',
        pt: 'Configurações de Conta'
    },
    routes: [
        {
            name: 'general',
            relativePath: 'general',
            label: {
                en: 'General',
                es: 'General',
                pt: 'Geral'
            },
            routes: [
                // {
                //     name: 'away mode', 
                //     relativePath: 'away-mode',
                //     label: {
                //         en: 'Away Mode',
                //         es: 'Modo Ausente',
                //         pt: 'Modo Ausente'
                //     }
                // },
                {
                    name: 'language', 
                    relativePath: 'language',
                    label: {
                        en: 'Language',
                        es: 'Idioma',
                        pt: 'Idioma'
                    }
                }
            ]
        },
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
                    },
                    notAllowedTo: ['administrator']
                },
                {
                    name: 'password', 
                    relativePath: 'password',
                    label: {
                        en: 'Password',
                        es: 'Contraseña',
                        pt: 'Senha'
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
                // {
                //     name: 'role', 
                //     relativePath: 'role',
                //     label: {
                //         en: 'Role',
                //         es: 'Role',
                //         pt: 'Função'
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
            name: 'requests', 
            relativePath: 'requests',
            label: {
                en: 'Requests',
                es: 'Peticiones',
                pt: 'Solicitações'
            }
        }
    ]
};

export default accountSettingsModule;