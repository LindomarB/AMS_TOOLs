const supportModule = {
    name: 'support',
    path: '/support',
    relativePath: 'support',
    isTool: true,
    defaultAccess: true,
    icon: 'support',
    label: {
        en: 'Support',
        es: 'Soporte',
        pt: 'Suporte'
    },
    description: {
        en: 'Need help? Here you can clear your doubts, report bugs and send us suggestion for improvement.',
        es: '¿Necesita ayuda? Aquí podrás aclarar tus dudas, reportar errores y enviarnos sugerencias de mejora.',
        pt: 'Precisa de ajuda? Aqui você pode tirar suas dúvidas, reportar bugs e nos enviar sugestões de melhorias.'
    },
    submodules: [
        {
            name: 'faq',
            relativePath: 'faq',
            icon: 'faq',
            label: 'FAQ',
            description: {
                en: 'Maybe your question is in our FAQ. Check out!',
                es: 'Quizás tu pregunta esté en nuestro FAQ. ¡Verificar!',
                pt: 'Talvez sua dúvida esteja em nosso FAQ. Confira!'
            }
        },
        {
            name: 'report bug',
            relativePath: 'report-bug',
            icon: 'bug',
            label: {
                en: 'Report a Bug',
                es: 'Reportar un Error',
                pt: 'Reportar um Erro'
            },
            description: {
                en: 'Are unexpected things happening to you? Report us this bug!',
                es: '¿Te están pasando cosas inesperadas? ¡Infórmanos de este error!',
                pt: 'Estão acontecendo coisas inesperadas com você? Nos reporte esse bug!'
            }
        },
        {
            name: 'talk to us',
            relativePath: 'talk-to-us',
            icon: 'talk to us',
            label: {
                en: 'Talk To Us',
                es: 'Hable Con Nosotros',
                pt: 'Fale Conosco'
            },
            description: {
                en: 'Didn’t find what you need here? Got suggestions? Contact us!',
                es: '¿No encontraste lo que necesitas aquí? ¿Tienes sugerencias? ¡Contáctenos!',
                pt: 'Não encontrou o que precisa aqui? Tem sugestões? Contate-nos!'
            }
        },
        {
            name: 'release notes',
            relativePath: 'release-notes',
            icon: 'release notes',
            label: {
                en: 'Release Notes',
                es: 'Notas de Lanzamiento',
                pt: 'Notas de Versão'
            },
            description: {
                en: `Bug fixes, new features, new tools. Check out what's new!`,
                es: '¿No encontraste lo que necesitas aquí? ¿Tienes sugerencias? ¡Contáctenos!',
                pt: 'Corrección de errores, nuevas funciones, nuevas herramientas. ¡Mira las novedades!'
            },
            routes: [
                {
                    name: 'version',
                    relativePath: 'version',
                    label: {
                        en: 'Version',
                        es: 'Versión',
                        pt: 'Versão'
                    }
                },
                {
                    name: 'patch history',
                    relativePath: 'patch-history',
                    label: {
                        en: 'Patch History',
                        es: 'Historial de Parches',
                        pt: 'Histórico de Patches'
                    }
                }
            ]
        }
    ]
};

export default supportModule;

