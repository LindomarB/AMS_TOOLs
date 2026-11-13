const tier1Connections = [
    {
        origin: 'BOLTONS',
        destinations: ['CTMS APBU', 'INFOSPHERE'],
        rules: [{1: 'ARGENTINA'}]
    },
    {
        origin: 'BOLTONS',
        destinations: ['ADE02', 'CORPORATE', 'CTMS', 'DUANES', 'GDF', 'GDR', 'MASTERSAF', 'ONESOURCE', 'PORTUS', 'RDS', 'TIBCO'],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'BOLTONS',
        destinations: ['SAP BO'],
        rules: [{1: ['ARGENTINA', 'BRAZIL']}]
    },
    {
        origin: 'INTERFACE TIBCO/DATA MIRROR',
        destinations: ['TIBCO'],
    },
    {
        origin: 'INTERFACE TIBCO/OPENTEXT',
        destinations: ['TIBCO'],
    },
    {
        origin: 'JDE A9 WS',
        destinations: ['ACCOUNTING', 'ACCOUNTS PAYABLE', 'ACCOUNTS RECEIVABLE', 'ADDRES BOOK', 'FIXED ASSET', 'ORDERS', 'PROCESO CIERRE', 'REPOSTEO', 'TECHNICAL SERVICES']
    },
    {
        origin: 'JDE A9 WS',
        destinations: ['SERVICE REQUEST'],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'JDE ENTERPRISE E1/JDE A9',
        destinations: ['ACCOUNT MODEL', 'FINANCE', 'LOGISTICS', 'ORIGINATION', 'PLANTS & OPERATIONS', 'TAX', 'VENTAS'],
        rules: [{1: 'ARGENTINA'}]
    },
    {
        origin: 'ORIGINATION',
        destinations: ['ACCOUNT', 'ARMAZENAGEM', 'B0', 'BREAK', 'CACAU', 'CARTA PORTE', 'CI', 'CM', 'CONTABILIZACAO A9', 'CONTRATO', 'CUT OFF', 'FICHA', 'FINANCE', 'INVOICE', 'OP', 'PILHA', 'RD', 'ROYALTIES'],
        rules: [{1: 'BRAZIL'}]
    },
    {
        origin: 'PROPERTY',
        destinations: ['ARIBA', 'COSTS AND INVENTORY', 'FIXED ASSET', 'JOB COST', 'MANUFACTURING', 'OW7A8', 'PLANTS & OPERATIONS', 'PROCUREMENT'],
    },
    {
        origin: 'RDS WEB',
        destinations: ['Acesso ao RDS-WEB', 'Automação', 'FICHA', 'INTERFACE', 'Relatório', 'Servidores']
    },
    {
        origin: 'SALES / TRANSPORTATION',
        destinations: ['ACCOUNT', 'CTMS', 'E1 ENVIRONMENT', 'FREIGHT', 'INVOICE', 'LOTE', 'NETTING', 'ORDER', 'OSGT', 'PILHA', 'REPORT', 'REQUEST', 'TRANSPORTATION'],
    },
    {
        origin: 'SAP BO - REPORTES',
        destinations: ['SAP BO'],
    }
];

module.exports = tier1Connections;