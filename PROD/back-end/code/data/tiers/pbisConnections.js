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
        destinations: ['PBI000001041668'],
        rules: [{1: 'INVALID BALANCE', 2: 'JOB COST', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: 'INCORRECT REVERSAL OV NUMBER',
        destinations: ['PBI000001027681'],
        rules: [{1: 'RECEPTION', 2: 'PROCUREMENT', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: `FZ DIDN'T GENERATE VOUCHER`,
        destinations: ['PBI000001020181'],
        rules: [{1: 'RECEPTION', 2: 'PROCUREMENT', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: `APB - ASSET NUMBER DIVERGENCY ON AA/XA`,
        destinations: ['PBI000001032885'],
        rules: [{1: 'ASSET CREATION', 2: 'JOB COST', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: `JOB WENT ZOMBIE`,
        destinations: ['PBI000001030518'],
        rules: [{1: 'WORK ORDER CLOSURE', 2: 'JOB COST', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: `ACCOUNTING DATE CANT VARIATE`,
        destinations: ['PBI000001029279'],
        rules: [{1: 'AP', 2: 'OW7A8', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: `APB - INVALID DOLLAR TAX`,
        destinations: ['PBI000001033726'],
        rules: [{1: 'AP', 2: 'OW7A8', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: `TAX LINE NOT INTERFACED`,
        destinations: ['PBI000001053398'],
        rules: [{1: 'AP', 2: 'OW7A8', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: `ERROR REVERSO DE RECIBOS CON CHEQUE RECHAZADO EN DISTINTO PERIODO`,
        destinations: ['PBI000001026187'],
        rules: [{1: 'MONITOREO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4:'ARGENTINA'}]
    },
    {
        origin: `DOCUMENTO EN LOOP ID INEXISTENTE`,
        destinations: ['PBI000001029222'],
        rules: [{1: 'MONITOREO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4:'ARGENTINA'}]
    },
    {
        origin: `ERROR DE INTEGRIDAD CON DOCUMENTO ASOCIADO A NETTING ID`,
        destinations: ['PBI000001029568'],
        rules: [{1: 'MONITOREO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4:'ARGENTINA'}]
    },
    {
        origin: `DOCUMENTOS NO ESTAN EN NETTING - NETST = 0`,
        destinations: ['PBI000001016977'],
        rules: [{1: 'MONITOREO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4:'ARGENTINA'}]
    },
    {
        origin: `DOCUMENTO SIN POSTEAR EN NETTING`,
        destinations: ['PBI000001024657'],
        rules: [{1: 'NETTING', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4:'ARGENTINA'}]
    },
    {
        origin: `NETTING ESTADO X - MONTO MAYOR`,
        destinations: ['PBI000001027084'],
        rules: [{1: 'NETTING', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4:'ARGENTINA'}]
    },
    {
        origin: `DOCUMENTOS DE COBRO REVERSADO CUANDO RECHAZA CHEQUE`,
        destinations: ['PBI000001026162'],
        rules: [{1: 'CONTABILIZACION', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4:'ARGENTINA'}]
    },
    {
        origin: `MEZCLA NO GENERO IM`,
        destinations: ['PBI000001033877'],
        rules: [{1: 'MEZCLA', 2: 'PLANTS & OPERATIONS', 3: 'JDE ENTERPRISE E1/JDE A9', 4:'ARGENTINA'}]
    },
    {
        origin: `APB - PL OUT OF COMPOSITION OP/P0`,
        destinations: ['PBI000001046418'],
        rules: [{1: 'NETTING', 2: 'PROCUREMENT', 3: 'PROPERTY', 4:'BRAZIL'}]
    },
    {
        origin: `DUPLICATE SF ORDER ON JDE`,
        destinations: ['PBI000001037539'],
        rules: [{1: 'SALES FORCE', 2: 'ORDER', 3: 'SALES / TRANSPORTATION', 4:'BRAZIL'}]
    },
    {
        origin: `IMPRESION DE CONTRATO - CREADO EN PESOS SALE COMO USD EN LO PDF`,
        destinations: ['PBI000001039748'],
        rules: [{1: 'CONTRATOS', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: `APB – ERRO DE DISPONIBILIDADE NA TELA COM DEVOLUCAO`,
        destinations: ['PBI000001039664'],
        rules: [{1: 'SOLICITAÇÃO DE DESPACHO DE INSUMOS', 2: 'LOGISTICS', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'ERROR CON PRECIO',
        destinations: ['PBI000001039672'],
        rules: [{1: 'FIJACION DE PRECIO', 2: 'VENTAS', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'APB - NETTING WITHOUT FILIAL REGISTER',
        destinations: ['PBI000001040735'],
        rules: [{1: 'NETTING', 2: 'PROCUREMENT', 3: 'PROPERTY', 4: 'BRAZIL'}]
    },
    {
        origin: 'APB - INVALID DISPOSAL STATUS',
        destinations: ['PBI000001041668'],
        rules: [{1: 'INCORPORATION', 2: 'JOB COST', 3: 'PROPERTY', 4: 'BRAZIL'}]
    },
    {
        origin: 'XMLS INDEVIDOS NA PASTA DE RETORNO DE AUTORIZAÇÃO',
        destinations: ['PBI000001041571'],
        rules: [{1: 'NF - GENERATION', 2: 'INVOICE', 3: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'MONTO EN ABIERTO ARS-USD NO COINCIDEN',
        destinations: ['PBI000001043273'],
        rules: [{1: 'NETTING', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'APB - DUPLICATED REGISTER BLOCO K',
        destinations: ['PBI000001043290'],
        rules: [{1: 'BLOCK K', 2: 'COSTS AND INVENTORY', 3: 'PROPERTY', 4: 'BRAZIL'}]
    },
    {
        origin: 'APB - ASSET DEPRECIATION VALUE UNBALANCED',
        destinations: ['PBI000001046709'],
        rules: [{1: 'DEPRECIATION', 2: 'FIXED ASSET', 3: 'PROPERTY', 4: 'BRAZIL'}]
    },
    {
        origin: 'CONTABILIZACION REVERSION DOCUMENTOS B$',
        destinations: ['PBI000001044579'],
        rules: [{1: 'CONTABILIZACION', 2: 'FINANCE', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'MISSING DATA AT F5543040',
        destinations: ['PBI000001052938'],
        rules: [{1: 'DOOTAX', 2: 'PROCUREMENT', 3: 'PROPERTY', 4: 'BRAZIL'}]
    },
    {
        origin: 'COE - ITEMS DEL AJUSTE INCONSISTENTE',
        destinations: ['KBA00240682'],
        rules: [{1: 'CERTIFICACION AFIP', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'COE - H7 ERROR EN MONUTRIBUTISTAS',
        destinations: ['KBA00243825'],
        rules: [{1: 'CERTIFICACION AFIP', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'AF QUEDAN CON FECHA DE VENCIMIENTO ERRONEOS',
        destinations: ['KBA00243244'],
        rules: [{1: 'CERTIFICACION AFIP', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'V4 CON FECHA CONTABLE DISTINTA DEL PERIODO',
        destinations: ['KBA00243447'],
        rules: [{1: 'ANTICIPO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'UE - ANULACION DE SLIP QUE SE EFECTIVO',
        destinations: ['KBA00243343'],
        rules: [{1: 'ANTICIPO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'NO GENERA V4 DESDE LA PROPUESTA COMERCIAL',
        destinations: ['KBA00243646'],
        rules: [{1: 'ANTICIPO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'UE - USUARIO DESCONOCE ANULACION DE ANTICIPO',
        destinations: ['KBA00244935'],
        rules: [{1: 'ANTICIPO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'NO EXISTE SALDO SUFICIENTE',
        destinations: ['KBA00245032'],
        rules: [{1: 'ANTICIPO', 2: 'ORIGINATION', 3: 'JDE ENTERPRISE E1/JDE A9', 4: 'ARGENTINA'}]
    },
    {
        origin: 'X0 GERADO COM VALOR INCORRETO - ERRO DESCONTO QUALIDADE',
        destinations: ['PBI000001014042'],
        rules: [{1: 'MATCHING', 2: 'FINANCE', 3: 'ORIGINATION', 4: 'BRAZIL'}]
    },
];

module.exports = pbisConnections;