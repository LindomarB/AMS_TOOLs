const tier1Connections = [
    {
        origin: 'ADE02',
        destinations: [
            'ACESSO',
            'ADE PORTAL',
            'ADE RECINTOS',
            'CCTV',
            'INTERFACE',
            'MONITORAMENTO',
            'RELATÓRIO'
        ],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'BOLTONS',
        destinations: [
            'CTMS APBU',
            'INFOSPHERE'
        ],
        rules: [{1: 'ARGENTINA'}]
    },
    {
        origin: 'BOLTONS',
        destinations: [
            'CTMS',
            'GDF',
            'GDR',
            'MASTERSAF',
            'NFE CARGILL',
            'ONESOURCE',
            'OSGT',
            'TIBCO'
        ],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'BOLTONS',
        destinations: [
            'SAP BO'
        ],
        rules: [{1: ['ARGENTINA', 'BRAZIL']}]
    },
    {
        origin: 'CORPORATE',
        destinations: [
            'ACESSO',
            'AGENDAMENTO NAVIO',
            'BALANCE',
            'DATABASE',
            'FICHA',
            'INTERFACE',
            'LAUDO',
            'MONITORAMENTO',
            'RELATÓRIO'
        ],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'INTERFACE TIBCO/DATA MIRROR',
        destinations: [
            'TIBCO'
        ]
    },
    {
        origin: 'INTERFACE TIBCO/OPENTEXT',
        destinations: [
            'TIBCO'
        ]
    },
    {
        origin: 'JDE A9 WS',
        destinations: [
            'ACCOUNTING',
            'ACCOUNTS PAYABLE',
            'ACCOUNTS RECEIVABLE',
            'ADDRES BOOK',
            'FIXED ASSET',
            'ORDERS',
            'PROCESO CIERRE',
            'REPOSTEO',
            'TECHNICAL SERVICES'
        ]
    },
    {
        origin: 'JDE A9 WS',
        destinations: [
            'SERVICE REQUEST'
        ],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'JDE ENTERPRISE E1/JDE A9',
        destinations: [
            'ACCOUNT MODEL',
            'FINANCE',
            'LOGISTICS',
            'ORIGINATION',
            'PLANTS & OPERATIONS',
            'TAX',
            'VENTAS'
        ],
        rules: [{1: 'ARGENTINA'}]
    },
    {
        origin: 'ORIGINATION',
        destinations: [
            'ACCOUNT',
            'ARMAZENAGEM',
            'B0',
            'BREAK',
            'CACAU',
            'CARTA PORTE',
            'CI',
            'CM',
            'CONTABILIZACAO A9',
            'CONTRATO',
            'CUT OFF',
            'FICHA',
            'FINANCE',
            'INVOICE',
            'OP',
            'PILHA',
            'RD',
            'ROYALTIES'
        ],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'PROPERTY',
        destinations: [
            'ARIBA',
            'COSTS AND INVENTORY',
            'FIXED ASSET',
            'JOB COST',
            'MANUFACTURING',
            'OW7A8',
            'PLANTS & OPERATIONS',
            'PROCUREMENT'
        ]
    },
    {
        origin: 'RDS (.Net)',
        destinations: [
            'ACESSO',
            'AUTOMAÇÃO',
            'DATABASE',
            'FICHA',
            'INSTALAÇÃO E CONFIGURAÇÃO',
            'INTERFACE',
            'MONITORAMENTO',
            'RELATÓRIO'
        ],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'RDS WEB',
        destinations: [
            'ACESSO AO RDS-WEB', 
            'AUTOMAÇÃO',
            'FICHA',
            'INTERFACE',
            'MONITORAMENTO',
            'RELATÓRIO',
            'SERVIDORES'
        ]
    },
    {
        origin: 'RDS WEB',
        destinations: [
            'MONITORAMENTO'
        ],
        rules: [{1: ['ARGENTINA', 'BRAZIL']}]
    },
    {
        origin: 'SALES / TRANSPORTATION',
        destinations: [
            'ACCOUNT',
            'CTMS',
            'E1 ENVIRONMENT',
            'FREIGHT',
            'INVOICE',
            'LOTE',
            'NETTING',
            'ORDER',
            'PILHA',
            'REPORT',
            'REQUEST',
            'TRANSPORTATION'
        ]
    },
    {
        origin: 'SAP BO - REPORTES',
        destinations: [
            'SAP BO'
        ]
    }
];

module.exports = tier1Connections;