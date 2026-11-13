const ctiToolModule = {
    name: 'cti tool',
    path: '/cti-tool',
    relativePath: 'cti-tool',
    icon: 'cti tool',
    label: 'CTI Tool',
    isTool: true,
    userHaveAccess: (user) => {
        if(!user) return false;
        return user.accesses.includes('cti tool');
    },
    // accessAllowedTo: ['analyst', 'track leader', 'manager', 'administrator'],
    description: {
        en: 'Create and manage the incident resolutions',
        es: 'Crear y administrar resoluciones de incidentes',
        pt: 'Crie e administre resoluções de incidentes'
    },
    submodules: [
        {
            name: 'create resolution',
            relativePath: 'create-resolution',
            icon: 'resolution',
            label: {
                en: 'Create Resolution',
                es: 'Crear Resolucione',
                pt: 'Criar Resolução'
            },
            description: {
                en: 'Create resolutions to attach to your resolved incident',
                es: 'Cree resoluciones para adjuntar a su incidente resuelto',
                pt: 'Crie resoluções para anexar ao seu incidente resolvido'
            },
            routes: [
                {
                    name: 'new resolution',
                    relativePath: 'new-resolution'
                }
            ]
        },
        {
            name: 'search',
            relativePath: 'search',
            icon: 'search',
            label: {
                en: 'Search',
                es: 'Búsqueda',
                pt: 'Busca'
            },
            description: {
                en: 'Search for incident resolutions',
                es: 'Buscar resoluciones de incidentes',
                pt: 'Busque por resoluções de incidentes'
            }
        },
        {
            name: 'dashboards',
            relativePath: 'dashboards',
            icon: 'dashboards',
            label: 'Dashboards',
            description: {
                en: 'See data about the resolutions created with the CTI Tool',
                es: 'Ver datos sobre resoluciones creadas con CTI Tool',
                pt: 'Veja dados sobre as resoluções criadas com o CTI Tool'
            }
        },
        {
            name: 'tiers tree management',
            relativePath: 'tiers-tree-management',
            icon: 'tiers tree',
            label: 'Tiers Tree Management',
            description: {
                en: 'Manage the CTI Tool tiers and their connections',
                es: 'Administre los tiers de CTI Tool y sus conexiones',
                pt: 'Gerencie os tiers do CTI Tool e suas conexões'
            },
            routes: [
                {
                    name: 'export tiers',
                    relativePath: 'export-tiers',
                    icon: 'download',
                    label: 'Export Tiers',
                    description: {
                        en: 'Export all tiers in an excel file',
                        es: 'Exporte todos los tiers en un archivo de excel',
                        pt: 'Exporte todos os tiers em um arquivo do excel'
                    }
                }
            ]
        }
    ],
    routes: [
        {
            name: 'edit resolution',
            relativePath: 'edit-resolution'
        }
    ]
};

export default ctiToolModule;

