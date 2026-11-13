const tier2Connections = [ 
    {
        origin: 'ACCOUNT',
        destinations: ['CADASTROS', 'CASH TRADES', 'CMA', 'CRUSH MARGIN', 'EXECUCAO DE FRETES', 'EXPOSURE', 'FTS', 'HEDGE POSITION', 'LISTA DE PRECO', 'MANUTENCAO FRETE', 'NEW TRADES', 'OPEN SALES', 'REL COST CONVERSION'],
        rules: [{1: 'ORIGINATION', 2: 'BRAZIL'}]
    },
    {
        origin: 'ACCOUNT',
        destinations: ['NEW TRADES'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: "ACCOUNT MODEL",
        destinations: ['REPORTES COMPRAS', 'REPORTES INSUMOS', 'REPORTES SERVICIOS', 'REPORTES VENTAS', 'SOPORTE CONTABLE']
    },
    {
        origin: 'ACCOUNTING',
        destinations: ['BATCH', 'CONFIGURACION DE CENTRO DE COSTO', 'CONFIGURACION DE CUENTA', 'CONSTANTE BP', 'CREACCION DE NUEVA CIA', 'DESBALANCEO COMPANIA', 'INTERFACE CMM', 'INTERFACE CTMS', 'INTERFACE FTS', 'INTERFACE JDE E1', 'INTERFACE MASTERSAF', 'INTERFACE NOMINA', 'INTERFACES SAP-TC2', 'SETUP VERSION', 'SWEEP', 'WORLD WRITER'],
        rules: [{1: 'JDE A9 WS'}]
    },
    {
        origin: 'ACCOUNTING',
        destinations: ['INTERFACE FIBI'],
        rules: [{1: 'JDE A9 WS', 2: 'MEXICO'}]
    },
    {
        origin: 'ACCOUNTS PAYABLE',
        destinations: ['BATCH', 'INTERFACE BANCO CITI', 'INTERFACE CAMIONES', 'INTERFACE CONCUR', 'INTERFACE FTS', 'INTERFACE JDE E1', 'INTERFACE NIS', 'NEW TAX AREAS', 'TAX AREAS', 'PROCESO DE PAGO', 'PROCESO DE VOUCHERS', 'REPORT ASOF', 'RETENCIONES', 'SET UP RETENCIONES IIBB', 'SET UP UDC', 'SET UP VERSION'],
        rules: [{1: 'JDE A9 WS'}]
    },
    {
        origin: 'ACCOUNTS PAYABLE',
        destinations: ['BATCH DESBALANCEADO'],
        rules: [{1: 'JDE A9 WS', 2: ['ARGENTINA', 'URUGUAY']}]
    },
    {
        origin: 'ACCOUNTS PAYABLE',
        destinations: ['TIPOS DE CÂMBIOS'],
        rules: [{1: 'JDE A9 WS', 2: 'BRAZIL'}]
    },
    {
        origin: 'ACCOUNTS PAYABLE',
        destinations: ['INTERFACE TAX MANAGER'],
        rules: [{1: 'JDE A9 WS', 2: 'PARAGUAY'}]
    },
    {
        origin: 'ACCOUNTS RECEIVABLE',
        destinations: ['BATCH', 'FACTURA DATOS', 'FACTURACION ELECTRONICA - SETUP', 'INTERFACE BANCOS', 'INTERFACE FTS', 'INTERFACE JDE E1'],
        rules: [{1: 'JDE A9 WS'}]
    },
    {
        origin: 'ACCOUNTS RECEIVABLE',
        destinations: ['INTERFACE CARVAJAL'],
        rules: [{1: 'JDE A9 WS', 2: 'MEXICO'}]
    },
    {
        origin: 'ACESSO',
        destinations: [
            'FALHA DE ACESSO', 
            'PERMISSÃO DE USUARIO', 
            'SOLICITAÇÃO DE ACESSO'
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'ACESSO',
        destinations: [
            'APLICAÇÃO',
            'CITRIX',
            'PERFIL DE USUÁRIO'
        ],
        rules: [{1: 'RDS (.Net)'}]
    },
    {
        origin: 'ACESSO AO RDS-WEB',
        destinations: [
            'PÁGINA RDS-WEB',
            'PERFIL DE USUÁRIO'    
        ],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'ADDRES BOOK',
        destinations: ['SETUP'],
        rules: [{1: 'JDE A9 WS'}]
    },
    {
        origin: 'ADDRES BOOK',
        destinations: ['INTERFACE AGROTOOL'],
        rules: [{1: 'JDE A9 WS', 2: 'BRAZIL'}]
    },
    {
        origin: 'ACESSO',
        destinations: [
            'FALHA DE ACESSO', 
            'PERMISSÃO DE USUARIO', 
            'SOLICITAÇÃO DE ACESSO'
        ],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'ADE PORTAL',
        destinations: [
            'PERFORMANCE', 
            'PROBLEMAS COM PORTAL ADE', 
            'SOLICITAÇÃO'
        ],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'ADE RECINTOS',
        destinations: [
            'ACESSO', 
            'PERFORMANCE'
        ],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'AGENDAMENTO NAVIO',
        destinations: [
            'INTERFACES', 
            'PEDIDO DE EMBARQUE', 
            'PESAGEM DE FLUXO', 
            'PROGRAMAÇÃO NAVIO'
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'ARIBA',
        destinations: ['INTERFACE'],
        rules: [{1: 'PROPERTY'}]
    },
    {
        origin: 'ARMAZENAGEM',
        destinations: [
            'COMPLEMENTO',
            'PADRAO DE QUALIDADE',
            'PEDIDO E0',
            'PEDIDO E1',
            'PEDIDO E4',
            'PEDIDO SH',
            'RELATORIO CONTA CORRENTE',
            'SERVICO DE ARMAZENAGEM',
            'TROCA DE TITULARIDADE'
        ]
    
    },  
    {
        origin: 'AUTOMAÇÃO',
        destinations: [
            'BALANÇA ASSISTIDA',
            'BALANÇA AUTOMATIZADA',
            'CALADA / BARREIRAS',
            'HUMEDÍMETRO',
            'IMPRESSORA',
            'PLATAFORMA',
            'RDS CAPTURA'
        ],
        rules: [{1: 'RDS WEB', 2: 'ARGENTINA'}]
    },
    {
        origin: 'AUTOMAÇÃO',
        destinations: [
            'BALANÇA ASSISTIDA',
            'HUMEDÍMETRO',
            'RDS CAPTURA'
        ],
        rules: [{1: 'RDS WEB', 2: 'BOLIVIA'}]
    },
    {
        origin: 'AUTOMAÇÃO',
        destinations: [
            'BALANÇA ASSISTIDA',
            'BALANÇA AUTOMATIZADA',
            'HUMEDÍMETRO',
            'IMPRESSORA',
            'RDS CAPTURA'
        ],
        rules: [{1: 'RDS WEB', 2: 'BRAZIL'}]
    },
    {
        origin: 'AUTOMAÇÃO',
        destinations: [
            'BALANÇA',
            'HUMEDIMETRO E PRODUTO'
        ],
        rules: [{1: 'RDS (.Net)'}]
    },
    {
        origin: 'B0',
        destinations: ['REQUEST']
    
    },
    {
        origin: 'BALANCE',
        destinations: [
            'BALANÇA DE FLUXO', 
            'INTERFACE', 
            'PEDIDO DE EMBARQUE'
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'BREAK',
        destinations: ['REPROCESSAMENTO RELATORIO', 'LANCAMENTO INCORRETO', 'SOLICITACAO DE USUARIO', 'CALCULO INCORRETO', 'QUEBRA TECNICA', 'QUEBRA DE SECAGEM']
    },
    {
        origin: 'CACAU',
        destinations: ['AJUSTES', 'CONTROLE DE PILHA', 'RELATORIOS']
    },
    {
        origin: 'CARTA PORTE',
        destinations: ['REQUEST']
    },
    {
        origin: 'CCTV',
        destinations: [
            'PROBLEMAS COM CÂMERAS', 
            'SOLICITAÇÃO'
        ],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'CI',
        destinations: ['REQUEST']
    },
    {
        origin: 'CM',
        destinations: ['AVANCAR STATUS CONTRATO', 'CALL', 'CANCELAR CAK', 'CONTRATO', 'FATURAMENTO', 'MX', 'TICKET DE PRICING', 'TICKET FUTUROS']
    },
    {
        origin: 'CONTABILIZACAO A9',
        destinations: ['DOCUMENTO NAO SUBIU AO A9', 'INTERFACE DE RETORNO', 'RETENCION', 'X1 NAO SUBIU AO A9']
    },
    {
        origin: 'CONTRATO',
        destinations: ['AGRICULTURA FAMILIAR', 'CONTROLE DE ASSINATURAS', 'CPR', 'CREDITO', 'ATUALIZACAO MASSIVA', 'FIXACAO MATA MATA', 'GERACAO CONTRATO', 'IMPRESSAO DE CONTRATO', 'IMPRESSAO DE CONTRATO COM ERRO', 'LAUDO DE VISTORIA', 'LIQUIDACAO DE CONTRATO', 'PAF AUTOMATICO', 'PLANEJAMENTO DE COMPRAS', 'POSICAO DO TITULAR', 'PRE SLIP', 'PRIORIDADE DE CONTRATO', 'PROPOSTA COMERCIAL', 'REL CONTRATOS FIXO EM ABERTO', 'RELATORIO COMPOSICAO DE FIXACAO', 'RELATORIO CONTA CORRENTE', 'RELATORIO CONTAS A PAGAR', 'RELATORIO CONTRATOS EM ABERTO', 'RELATORIO DE ROMANEIO', 'RELATORIO DECLARACAO DA FIXACAO', 'RELATORIO DEMONSTRATIVO DE OPERACOES', 'RELATORIO DIARIO DE COMPRAS FIXO', 'RELATORIO PRECO MEDIO', 'SLIP DE ALTERACAO', 'SLIP DE CANCELAMENTO', 'SLIP DE CONTRATO', 'SLIP DE FIXACAO', 'SLIP DE REVERSAO', 'SPLIT', 'STATUS INCORRETO'],
        rules: [{1: 'ORIGINATION', 2: 'BRAZIL'}]
    },  
    {
        origin: 'COSTS AND INVENTORY',
        destinations: ['AS OF', 'APONTAMENTO', 'BLOCK K', 'CARDEX', 'DATA SELECTION', 'EXTRACTION', 'RESUMO DO CARDEX']
    },  
    {
        origin: 'CTMS',
        destinations: ['ACCESS', 'CT', 'CT - APPLICATION PERFORMANCE', 'CT - AUTHORIZATION - CTE', 'CT - CADASTRO', 'CT - CALCULO', 'CT - CANCELAMENTO', 'CT - CANCELATION CTE', 'CT - CARRIER PORTAL', 'CT - DESTINATION WEIGTH', 'CT - ERRO GERACAO NFS', 'CT - FREIGTH TABLE', 'CT - FRETE EXTRA', 'CT - INTERFACE', 'CT - INTERFACE A9', 'CT - LOAD INTERFACE', 'CT - NETTING', 'CT - OC', 'CT - PRE FATURA', 'CT - RECEIVING CONTRACT EMAIL', 'CT - RELATORIO ANALISTICO', 'CT - REPOM', 'CT - REPOM – DISCHARGE', 'CT - REPORT', 'CT - TN', 'CT- FRETE EXTRA', 'FM', 'FM - ACESSO BP', 'FM - CADASTRO', 'FM - CALCULO', 'FM - CLOSING CTE', 'FM - CONHECIMENTO', 'FM - CONTABILIDADE', 'FM - CTE', 'FM - ERRO FRETE EXTRA', 'FM - EXCLUSAO CTE', 'FM - FATURA', 'FM - FREIGTH TABLE', 'FM - FRETE EXTRA', 'FM - GENERATION CTE', 'FM - INTERFACE', 'FM - LOAD/CTE', 'FM - LOAD/FICHA', 'FM - OH INTERFACE', 'FM - OH NOT SENT TO CTMS', 'FM - PESO DESTINO CT', 'FM - PRE FATURA', 'FM - RELATORIO ANALISTICO', 'FM - REPOM', 'FM - REPORT', 'FM - TDE', 'FM - TN','INCLUSAO AUTOMATICA', 'M - FATURA', 'MDFE - CTMS',  'REPORT', 'XML CANCELADO'],
        rules: [{1: 'BOLTONS'}]
    },  
    {
        origin: 'CTMS',
        destinations: ['LOAD'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'CTMS APBU',
        destinations: ['ACCESS', 'LIQUIDACION', 'RECEPCION DE FICHAS Y LOAD']
    },  
    {
        origin: 'CUT OFF',
        destinations: ['DIFERENCA CUT OFF E CARDEX', 'DIFERENCA CUT OFF E MAPA DE VENDAS', 'DIFERENCA CUT OFF E VOLUME TRANSFERENCIA', 'EXECUCAO RELATORIO', 'PROBLEMAS COM LAYOUT', 'RELATÓRIO SEM INFORMACAO', 'VOLUME INCORRETO']
    },
    {
        origin: 'DATABASE',
        destinations: [
            'INTERFACES', 
            'PERFORMANCE'
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'DATABASE',
        destinations: [
            'BASE DE DADOS XE',
            'PERFORMANCE'
        ],
        rules: [{1: 'RDS (.Net)'}]
    },  
    {
        origin: 'E1 ENVIRONMENT',
        destinations: ['JDE E1 LAYOUT']
    },  
    {
        origin: 'FICHA',
        destinations: [
            'INTERFACE RDS', 
            'MONITOR DE INTERFACE'
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'FICHA',
        destinations: ['APLICACAO AUTOMATICA', 'CRIACAO FICHA', 'DESCONTO DE QUALIDADE', 'DOCUMENTO F9', 'FICHA BLOQUEADA - F5543028', 'FICHA DE CIRCULACAO', 'FICHA INCORRETA', 'FICHA NAO APLICA', 'FICHA NAO REVERTE', 'INTERFACE A9', 'INTERFACE RDS', 'ITAS', 'RELATORIO DE FICHAS', 'RELATORIO DIARIO DE COMPRAS', 'RELATORIO ROMANEIO POR FORNECEDOR', 'REVERSAO'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'FICHA',
        destinations: [
            'ANULAÇÃO DE FICHA',
            'CADASTRO',
            'DADOS',
            'INTERFACE',
            'PASSO DE FICHA'
        ],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'FICHA',
        destinations: [
            'DIFERIDO',
        ],
        rules: [{1: 'RDS WEB', 2: ['ARGENTINA', 'BOLIVIA']}]
    },
    {
        origin: 'FICHA',
        destinations: [
            'ENTRADA DE VEÍCULO',
            'FICHA EXPEDIÇÃO',
            'FICHA FOB',
            'FICHA RECEPÇÃO',
            'SOLICITAÇÃO'
        ],
        rules: [{1: 'RDS (.Net)'}]
    },
    {
        origin: 'FINANCE',
        destinations: ['BITACORAS AP', 'CIERRE - ASOF AP', 'CONTABILIZACION', 'DASHBOARD', 'INTERFACE AP EN A9', 'INTERFACE GL EN A9', 'MONITOREO', 'PROCESO CIERRE', 'PROCESO CONTABLE - ORIG', 'SISTEMA E1 / OPCION FINANCE', 'ZFILE AP', 'ZFILE GL'],
        rules: [{1: 'JDE ENTERPRISE E1/JDE A9'}]
    },     
    {
        origin: 'FINANCE',
        destinations: ['ADIANTAMENTO', 'GARANTIAS', 'LIBERACAO DE PAGAMENTO', 'MATCHING', 'NETTING', 'PD/PV', 'PENHOR', 'SOLICITACAO DE CREDITO', 'TRANSFERENCIA DE DIVIDA', 'TRANSFERENCIA DE SALDO'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'FIXED ASSET',
        destinations: ['ASIENTO CONTABLE', 'CAPITALIZACION', 'REPORTE DE INTEGRIDAD', 'REPOSTEO DE ITENS', 'SALDO DE CUENTA DESBALANCEADO'],
        rules: [{1: 'JDE A9 WS'}]
    },  
    {
        origin: 'FIXED ASSET',
        destinations: ['ASSET CREATION', 'CHILD ASSET', 'DEPRECIATION', 'INVALID BALANCE', 'LIFE TIME', 'REPORT'],
        rules: [{1: 'PROPERTY'}]
    },  
    {
        origin: 'FREIGHT',
        destinations: ['FREIGHT - TR', 'FREIGHT -DIVERGENT', 'OH - FOB', 'OH NOT SENT TO CTMS']
    },  
    {
        origin: 'GDF',
        destinations: ['REQUEST']
    },  
    {
        origin: 'GDR',
        destinations: [
            'ADDRESSBOOK',
            'GDRWEB',
            'EXCLUIR INDEX DO GDR',
            'INTERFACE GDR X SAP',
            'INTERFACE NEOGRID X GDR',
            'INTERFACE NEOGRID X GDR / GDF',
            'NOVA FILIAL',
            'PRE INDEX'
        ]
    },  
    {
        origin: 'INFOSPHERE',
        destinations: ['MONITORING']
    },  
    {
        origin: 'INSTALAÇÃO E CONFIGURAÇÃO',
        destinations: [
            'CONFIGURAÇÃO',
            'INSTALAÇÃO'
        ],
        rules: [{1: 'RDS (.Net)'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'INTERFACE CORPORATE',
            'INTERFACE PDUAL X ADE',
            'INTERFACE RDS',
            'INTERFACE RFB',
            'INTERFACE RONDA',
            'INTERFACE RTDUET X ADE',
            'PERFORMANCE'
        ],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'BOOMI INTERFACE',
            'DBLINK',
            'INTERFACE RDS',
            'PERFORMANCE',
            'RONDA',
            'RTDUET'
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'RDS INTEGRATION' 
        ],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'BOT DE ENVIOS A CAMARA', 
            'ERRO EM MONITOR CTG / COT', 
            'ERRO NA PÁGINA ARBA/ARCA/AFIP',
            'INTERFACE CEREALNET', 
            'INTERFACE CPEAR'
        ],
        rules: [{1: 'RDS WEB', 2: 'ARGENTINA'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'ADE02', 
            'CORPORATE'
        ],
        rules: [{1: 'RDS WEB', 2: 'BRAZIL'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'INTERFACE RDS - E1'
        ],
        rules: [{1: 'RDS WEB', 2: ['ARGENTINA', 'BRAZIL']}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'INTERFACE MASTER', 
            'OFFLINE INTERFACE', 
            'RUMO PAPERLESS / SAVIGENT X RDS'
        ],
        rules: [{1: 'RDS (.Net)'}]
    },
    {
        origin: 'INVOICE',
        destinations: ['MASTERSAF']
    },  
    {
        origin: 'INVOICE',
        destinations: [
            'CARTA DE CORRECAO',
            'CREDITO SUSPENSO',
            'ENTRADA DE NP',
            'FETHAB - PROBLEMAS IMPOSTOS AGRICOLAS',
            'FUNDEINFRA NÃO GERADO',
            'FUNDERSUL- PROBLEMAS IMPOSTOS AGRICOLAS',
            'FUNRURAL - PROBLEMA IMPOSTOS AGRICOLAS',
            'GERACAO NFE',
            'INUTILIZACAO/CANCELAMENTO NF',
            'MANIFESTO DO DESTINATÁRIO',
            'NAO ENVIADA AO SEFAZ',
            'NF COMPLEMENTAR',
            'NF DEVOLUCAO - D7',
            'NF DEVOLUCAO - V8',
            'NF REJEITADA',
            'NF REVERSAO',
            'NOTAS DE TRANSPORTE - TARE',
            'PEDIDO OW',
            'RELATORIO CREDITO SUSPENSO',
            'RELATORIO GERACAO NFE',
            'RELATORIO IMPRESSAO NFE',
            'RELATORIO NOTA FISCAL ENTRADA',
            'TELA MANUTENCAO NFE',
            'VERSAO'
        ],
        rules: [{1: 'ORIGINATION', 2: 'BRAZIL'}]
    },
    {
        origin: 'INVOICE',
        destinations: ['BOLETO', 'CEXP', 'LETTER OF CORRECTION', 'MDFE', 'NF - CANCEL', 'NF - DEVOLUTION', 'NF - DIVERGENT', 'NF - DUPLICATED', 'NF - GENERATION', 'NF - INUTILIZE', 'NF - REJECTED', 'NF - SEFAZ STOPPED', 'NF - SLOWLY', 'NF - STATUS'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'JOB COST',
        destinations: ['ASSET CREATION', 'BATCH POSTING', 'INCORPORATION', 'INVALID BALANCE', 'WORK ORDER CLOSURE']
    },  
    {
        origin: 'LAUDO',
        destinations: [
            'DADOS', 
            'PEDIDO DE EMBARQUE', 
            'PESAGEM DE FLUXO'
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'LOGISTICS',
        destinations: ['CUPO', 'DOCUMENTOS DE DESPACHO', 'FICHA OH', 'FLETE', 'LOAD', 'MONITOREO', 'OBTENCION COT/CTG', 'OPERATIVO', 'SAP BO - REPORTE', 'TRANSFERENCIA', 'SOLICITAÇÃO DE DESPACHO DE INSUMOS'],
        rules: [{1: 'JDE ENTERPRISE E1/JDE A9', 2: 'ARGENTINA'}]
    },  
    {
        origin: 'LOTE',
        destinations: ['LOT AVAILABILITY'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'MANUFACTURING',
        destinations: ['AVAILABILITY', 'CARDEX']
    },  
    {
        origin: 'MASTERSAF',
        destinations: ['CIAP', 'DW', 'EFD 0500', 'INFRA', 'INTERFACE', 'INTERFACE DETAIL', 'INVENTORY ITEM', 'INVOICE DIVERGENT', 'MONITORING', 'REQUEST'],
        rules: [{1:'BOLTONS', }]
    }, 
    {
        origin: 'MONITORAMENTO',
        destinations: [
            'INTERFACE',
            'SERVIDOR'
        ],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'MONITORAMENTO',
        destinations: [
            'INTERFACE',  
            'SERVIDOR'
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'MONITORAMENTO',
        destinations: [
            'INTERFACE',  
            'SERVIDOR'
        ],
        rules: [{1: 'RDS (.Net)'}]
    }, 
    {
        origin: 'MONITORAMENTO',
        destinations: [
            'INTERFACE',  
            'SERVIDOR'
        ],
        rules: [{1: 'RDS WEB'}]
    }, 
    {
        origin: 'NETTING',
        destinations: ['PAYMENT'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'NFE CARGILL',
        destinations: ['INTERFACE RUMO', 'PORTAL RUMO'],
        rules: [{1: 'BOLTONS', 2: 'BRAZIL'}]
    },
    {
        origin: 'ONESOURCE',
        destinations: ['SERVICES', 'REINF']
    },  
    {
        origin: 'OP',
        destinations: ['REQUEST']
    },  
    {
        origin: 'ORDER',
        destinations: ['CROP INPUT', 'ORDER - CANCEL', 'ORDER - CREATION', 'ORDER - DIVERGENT', 'RI - ACCOUNT', 'SALES FORCE'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'ORDERS',
        destinations: ['ARIBA', 'CONSULTA', 'MATCHING', 'SETUP'],
        rules: [{1: 'JDE A9 WS'}]
    },
    {
        origin: 'ORIGINATION',
        destinations: [
            'ANTICIPO',
            'APPLICATION',
            'BATCH RECEPCION',
            'BOLETIN',
            'CERTIFICACION AFIP',
            'COBROS SIN CONTABILIZAR',
            'COMPRA Y VENTA DE INSUMOS',
            'CONTABILIZACION',
            'CONTRATOS',
            'CUENTA CORRIENTE FINANCIERA',
            'CUENTA CORRIENTE KGS',
            'DOCSIGN',
            'E1',
            'ELEVACION',
            'FACTURACION ELECTRONICA - FCE',
            'FICHA B2B',
            'FICHA COMPRA OH',
            'FICHA - PROCESO DE COMPRA',
            'FICHA SERVICIO E1',
            'FICHA SERVICIO E1 - ERROR APLICACION',
            'INSUMOS',
            'MANUTENCION MASSIVA',
            'MONITOREO',
            'NETTING',
            'PRESTAMO',
            'SERVICES',
            'SETTLEMENT/BORRADOR',
            'SETUP',
            'STOCK'
        ],
        rules: [{1: 'JDE ENTERPRISE E1/JDE A9'}]
    }, 
    {
        origin: 'OSGT',
        destinations: ['JDE - EXPORT', 'JDE - IMPORT', 'SAP - EXPORT', 'SAP - IMPORT']
    },
    {
        origin: 'OW7A8',
        destinations: ['AP', 'AR', 'FTS AP', 'FTS GL', 'GL', 'INTERFACE JOB']
    },  
    {
        origin: 'PILHA',
        destinations: ['CROSSCHECK ERROR', 'DETALHE DE PILHA', 'ENCERRAMENTO DE PILHA', 'ENDERECAMENTO', 'GERACAO DE PILHA', 'INDUSTRIALIZACAO', 'LOTE', 'PILHA INDEVIDA', 'PROBLEMA EMBALAGEM DA PILHA', 'QUALIDADE PILHA'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'PILHA',
        destinations: ['ORDER'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'PLANTS & OPERATIONS',
        destinations: ['CMA DATA', 'FTS', 'MEZCLA', 'OOS', 'STOCK'],
        rules: [{1: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'PLANTS & OPERATIONS',
        destinations: ['AR'],
        rules: [{1: 'PROPERTY'}]
    },     
    {
        origin: 'PROCESO CIERRE',
        destinations: ['DIFERENCIA', 'TRANSLATION'],
        rules: [{1: 'JDE A9 WS'}]
    },
    {
        origin: 'PROCUREMENT',
        destinations: ['APPROVAL', 'CANCELLATION', 'CREATION', 'DIRF', 'DOOTAX', 'EXTRACTION', 'NETTING', 'OOS', 'PEDIDOS DIVERSOS – DEVOLUCAO', 'PEDIDOS DIVERSOS – TRANSFERÊNCIA', 'PRINT', 'RECEPTION', 'TAX', 'VOUCHER']
    },   
    {
        origin: 'RD',
        destinations: ['AJUSTES', 'CARDEX', 'CUSTO MEDIO', 'EXECUCAO', 'MIOLO', 'RDXCP', 'RELATORIO REVALORIZACAO', 'REVALORIZACAO', 'SALDO']
    }, 
    {
        origin: 'RELATÓRIO',
        destinations: [
            'ERRO DE DADOS', 
            'PERFORMANCE'
        ],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'RELATÓRIO',
        destinations: [
            'ERRO DE DADOS', 
            'PERFORMANCE', 
            'RDS X CORPORATE'   
        ],
        rules: [{1: 'CORPORATE'}]
    },
    {
        origin: 'RELATÓRIO',
        destinations: [
            'CORREÇÃO', 
            'SOLICITAÇÃO'
        ],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'RELATÓRIO',
        destinations: [
            'FALHA OU ERRO', 
            'SOLICITAÇÃO'
        ],
        rules: [{1: 'RDS (.Net)'}]
    }, 
    {
        origin: 'REPORT',
        destinations: ['R5500004 – REPORT OF ROMANEIO DE CARGA', 'R5549250 - OW X CTMS', 'SALES MAP', 'TRANSFER', 'TRANSIT'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'REPOSTEO',
        destinations: ['DESBALANCEO COMPANIA']
    },  
    {
        origin: 'REQUEST',
        destinations: ['ORDER', 'REQUEST PARAMETERIZATION'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'ROYALTIES',
        destinations: [
            'CLASSIFICACAO TRANGENICO',
            'ERRO NA GERACAO ROYATIES',
            'GERACAO DE ROYALTIE',
            'PEDIDO ZK',
            'PENDING LIST',
            'RELATORIO DESCONTO DE ROYALTIES',
            'REVERSAO X0'
        ]
    },
    {
        origin: 'SAP BO',
        destinations: ['INCONSISTENT DATA ON REPORT'],
        rules: [{1: ['BOLTONS', 'SAP BO - REPORTES'], 2: 'ARGENTINA'}]
    },  
    {
        origin: 'SAP BO',
        destinations: ['REQUEST'],
        rules: [{1: 'BOLTONS'}]
    },  
    {
        origin: 'SAP BO',
        destinations: ['ACCESS', 'REPORT'],
        rules: [{1: 'SAP BO - REPORTES'}]
    },  
    {
        origin: 'SAP BO',
        destinations: ['DADOS'],
        rules: [{1: 'SAP BO - REPORTES', 2: 'ARGENTINA'}]
    },  
    {
        origin: 'SAP BO',
        destinations: ['GENERATE REPORT'],
        rules: [{1: 'BOLTONS', 2: 'BRAZIL'}]
    },  
    {
        origin: 'SERVICE REQUEST',
        destinations: ['AUDITORIA KPMG']
    }, 
    {
        origin: 'SERVIDORES',
        destinations: [
            'SERVIDOR DE DADOS/APLICAÇÃO'
        ],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'SERVIDORES',
        destinations: [
            'SERVIDOR DE MIDDLEWARE'
        ],
        rules: [{1: 'RDS WEB', 2: 'ARGENTINA'}]
    },
    {
        origin: 'TAX',
        destinations: [
            'ACTUALIZADOR PADRON',
            'AJUSTE DE PERMUTA-VENTAS',
            'CALCULO DE RETENCIONES',
            'CALCULO DE IMPUESTOS',
            'CERTIFICADOS DE RETENCION',
            'DDJJ DE STOCK',
            'DEVOLUCIONES DE RETENCIONES',
            'FACTURACION MASIVA',
            'PADRONES NACIONALES Y PROVINCIALES',
            'PERFIL IMPOSITIVO',
            'RECUPERO DE IVA',
            'REPORTE GENERAL',
            'TRANSMISIONES DE COMPRAS RETENCIONES',
            'TRANSMISIONES DE VENTAS PERCEPCIONES',
            'VALIDACION DOCUMENTOS DE VENTAS'
        ],
        rules: [{1: 'JDE ENTERPRISE E1/JDE A9'}]
    },  
    {
        origin: 'TECHNICAL SERVICES',
        destinations: [
            'ACCESS',
            'DATA TRANSFER',
            'REPORTS GL',
            'SETUP',
            'STORAGE',
            'SYSTEM',
            'WORLD WRITER'
        ],
        rules: [{1: 'JDE A9 WS'}]
    },
    {
        origin: 'TECHNICAL SERVICES',
        destinations: ['INTERFACE - RG1620', 'MCR'],
        rules: [{1: 'JDE A9 WS', 2: 'ARGENTINA'}]
    },
    {
        origin: 'TECHNICAL SERVICES',
        destinations: ['INTERFACES'],
        rules: [{1: 'JDE A9 WS', 2: 'MEXICO'}]
    },
    {
        origin: 'TECHNICAL SERVICES',
        destinations: ['INTERFACE SOVI'],
        rules: [{1: 'JDE A9 WS', 2: 'PARAGUAY'}]
    },
    {
        origin: 'TECHNICAL SERVICES',
        destinations: ['INTERFAZ COBRANZAS'],
        rules: [{1: 'JDE A9 WS', 2: ['ARGENTINA', 'PARAGUAY']}]
    },
    {
        origin: 'TECHNICAL SERVICES',
        destinations: ['JOBQ']
    },
    {
        origin: 'TIBCO',
        destinations: ['REQUEST'],
        rules: [{1: 'BOLTONS'}]
    },  
    {
        origin: 'TIBCO',
        destinations: ['INTERFACE'],
        rules: [{1: ['INTERFACE TIBCO/DATA MIRROR', 'INTERFACE TIBCO/OPENTEXT']}]
    },  
    {
        origin: 'TRANSPORTATION',
        destinations: ['LOAD', 'LOAD - REPOM', 'REVERSAO', 'ROADNET'],
        rules: [{1: 'SALES / TRANSPORTATION', 2: 'BRAZIL'}]
    },  
    {
        origin: 'VENTAS',
        destinations: ['BOLETIN DE CALIDAD', 'CONSUMO CREDITO', 'CONTABILIZACION', 'CONTRADOCUMENTACION', 'CONTRATO', 'CREDITO CLIENTE', 'DOCUMENTOS DE DESPACHO', 'FACTURACION', 'FIJACION DE PRECIO', 'LOAD', 'MONITOREO', 'NOTA DE CREDITO', 'OBTENCION CAE/COE', 'PEDIDO', 'RECIBOS', 'REPORT']
    }
];

module.exports = tier2Connections;