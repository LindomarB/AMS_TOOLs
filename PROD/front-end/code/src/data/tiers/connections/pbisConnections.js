const pbisConnections = [
    {
        origin: 'ILLPNU Y ILASID NO ESTAN SIENDO GRAVADOS EN CARDEX',
        destinations: ['PBI000001025784'],
        rules: [{1: 'FTS', 2: 'PLANTS & OPERATIONS', 3: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'APB - DOCUMENTO SUMARIZADO SEM INTERFACE',
        destinations: ['PBI000001008911'],
        rules: [{1: 'GL', 2: 'OW7A8', 3: 'PROPERTY'}]
    },
    {
        origin: 'DUPLICIDAD DE KGS DESPUES DE TRANSFERIR SIN MOV FISICO',
        destinations: ['PBI000001014275'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'MERCADERIA A LIQUIDAR EN NEGATIVO',
        destinations: ['PBI000001007128'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'RETIRO CONSUMO NO APARECEN EN LA PANTALLA',
        destinations: ['PBI000001015100'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'MOV MOLIENDA NO APARECEN EN LA PANTALLA',
        destinations: ['PBI000001015436'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'MOV ELEVACION NO APARECEN EN LA PANTALLA',
        destinations: ['PBI000001001842'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'SLIP ALTERACION NO ACTUALIZA EN LA PANTALLA',
        destinations: ['PBI000001015095'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'APARECE LIQUIDACION PEND DE COE Y YA FUE PAGA',
        destinations: ['PBI000001015460'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'FICHAS SERVICIO NO TRAEN CANTIDAD EN ENTRADA SERVICIOS',
        destinations: ['PBI000001015371'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'CAMBIO EN MANUTENCION MASIVA NO REFLEJA EN LA PANTALLA',
        destinations: ['PBI000001015463'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'REASIGNACION DE BP QUEDA CON LA LINEA EN ABIERTO',
        destinations: ['PBI000000193673', 'KBA00093719'],
        rules: [{1: 'CUENTA CORRIENTE KGS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'FALTA MONTO EN RPSTA1 y RPSTF1 DE LA F0411',
        destinations: ['PBI000001011981'],
        rules: [{1: 'BATCH', 2: 'ACCOUNTS PAYABLE', 3: 'JDE A9 WS'}]
    },
    {
        origin: 'INCORRECT ASSET STATUS',
        destinations: ['PBI000001024046'],
        rules: [{1: 'INVALID BALANCE', 2: 'JOB COST', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: 'ACCOUNTING DATE CANT VARIATE',
        destinations: ['PBI000000357761'],
        rules: [{1: 'AP', 2: 'OW7A8', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: 'INCORRECT REVERSAL OV NUMBER',
        destinations: ['PBI000001027681'],
        rules: [{1: 'RECEPTION', 2: 'PROCUREMENT', 3: 'PROPERTY', 4:'BRAZIL'}]
    }
];

export default pbisConnections;