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
        origin: 'Acesso ao RDS-WEB',
        destinations: ['Página RDS-WEB', 'Perfil de usuário'],
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
        origin: 'ADE02',
        destinations: ['ACCESS', 'RECINTO', 'REPORTS', 'CCTV CAMERA', 'ADE PORTAL', 'INTERFAZ', 'MONITORING']
    },
    {
        origin: "ARIBA",
        destinations: ['INTERFACE'],
        rules: [{1: "PROPERTY"}]
    },
    {
        origin: 'ARMAZENAGEM',
        destinations: ['COMPLEMENTO', 'PADRAO DE QUALIDADE', 'PEDIDO E0', 'PEDIDO E1', 'PEDIDO E4', 'PEDIDO SH', 'RELATORIO CONTA CORRENTE', 'SERVICO DE ARMAZENAGEM', 'TROCA DE TITULARIDADE']
    
    },  
    {
        origin: 'Automação',
        destinations: ['Balança Serial', 'Humedímetro', 'Porta "COM"', 'RDS Captura'],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'Automação',
        destinations: ['Balança (PLC)', 'Calada / Barreiras', 'Impressora', 'Plataforma'],
        rules: [{1: 'RDS WEB', 2: 'ARGENTINA'}]
    },
    {
        origin: 'B0',
        destinations: ['REQUEST']
    
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
        origin: 'CORPORATE',
        destinations: ['ACCESS', 'BALANCE', 'DATABASE', 'ESTADA NAVIO', 'FICHA', 'INTERFAZ', 'MONITORING', 'REPORTS', 'RONDA', 'RTDUET', 'SHIPMENT ORDER'],
        rules: [{1: 'BOLTONS', 2: 'BRAZIL'}]
    }, 
    {
        origin: "COSTS AND INVENTORY",
        destinations: ['BLOCK K', 'CARDEX', 'DATA SELECTION', 'RESUMO DO CARDEX']
    },  
    {
        origin: "CTMS",
        destinations: ['ACCESS', 'CT', 'CT - APPLICATION PERFORMANCE', 'CT - AUTHORIZATION - CTE', 'CT - CADASTRO', 'CT - CALCULO', 'CT - CANCELAMENTO', 'CT - CANCELATION CTE', 'CT - CARRIER PORTAL', 'CT - DESTINATION WEIGTH', 'CT - ERRO GERACAO NFS', 'CT - FREIGTH TABLE', 'CT - FRETE EXTRA', 'CT - INTERFACE', 'CT - INTERFACE A9', 'CT - LOAD INTERFACE', 'CT - NETTING', 'CT - OC', 'CT - PRE FATURA', 'CT - RECEIVING CONTRACT EMAIL', 'CT - RELATORIO ANALISTICO', 'CT - REPOM', 'CT - REPOM – DISCHARGE', 'CT - REPORT', 'CT - TN', 'CT- FRETE EXTRA', 'FM', 'FM - ACESSO BP', 'FM - CADASTRO', 'FM - CALCULO', 'FM - CLOSING CTE', 'FM - CONHECIMENTO', 'FM - CONTABILIDADE', 'FM - CTE', 'FM - ERRO FRETE EXTRA', 'FM - EXCLUSAO CTE', 'FM - FATURA', 'FM - FREIGTH TABLE', 'FM - FRETE EXTRA', 'FM - GENERATION CTE', 'FM - INTERFACE', 'FM - LOAD/CTE', 'FM - LOAD/FICHA',  'FM - OH INTERFACE', 'FM - OH NOT SENT TO CTMS', 'FM - PESO DESTINO CT', 'FM - PRE FATURA', 'FM - RELATORIO ANALISTICO', 'FM - REPOM', 'FM - REPORT', 'FM - TDE', 'FM - TN','INCLUSAO AUTOMATICA', 'M - FATURA', 'REPORT', 'XML CANCELADO'],
        rules: [{1: "BOLTONS"}]
    },  
    {
        origin: "CTMS",
        destinations: ['LOAD'],
        rules: [{1: "SALES / TRANSPORTATION"}]
    },  
    {
        origin: "CTMS APBU",
        destinations: ['ACCESS', 'LIQUIDACION', 'RECEPCION DE FICHAS Y LOAD']
    },  
    {
        origin: 'CUT OFF',
        destinations: ['DIFERENCA CUT OFF E CARDEX', 'DIFERENCA CUT OFF E MAPA DE VENDAS', 'DIFERENCA CUT OFF E VOLUME TRANSFERENCIA', 'EXECUCAO RELATORIO', 'PROBLEMAS COM LAYOUT', 'RELATÓRIO SEM INFORMACAO', 'VOLUME INCORRETO']
    },
    {
        origin: "DUANES",
        destinations: ['DUANES INTERNAL ACCESS', 'SHIPMENT BOARDING REPORT', '121 VEHICLE ENTRY-OUT EXTERIOR REPORT', 'AD02 REPORTS', 'CCTV CAMERA', 'CELEPAR APPA LOADS RECEPTION', 'DUANES EXTERNAL ACCESS', 'EXTERNAL AUDITTING ACCESS', 'FICHA OCR REPORT', 'OCCUPACY TAX REPORT', 'SEQUENCE REPORT PGA']
    },  
    {
        origin: "E1 ENVIRONMENT",
        destinations: ['JDE E1 LAYOUT']
    },  
    {
        origin: 'FICHA',
        destinations: ['APLICACAO AUTOMATICA', 'CRIACAO FICHA', 'DESCONTO DE QUALIDADE', 'DOCUMENTO F9', 'FICHA BLOQUEADA - F5543028', 'FICHA DE CIRCULACAO', 'FICHA INCORRETA', 'FICHA NAO APLICA', 'FICHA NAO REVERTE', 'INTERFACE A9', 'INTERFACE RDS', 'ITAS', 'RELATORIO DE FICHAS', 'RELATORIO DIARIO DE COMPRAS', 'RELATORIO ROMANEIO POR FORNECEDOR', 'REVERSAO'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'FICHA',
        destinations: ['ANULAÇÃO DE FICHA', 'CADASTRO', 'DADOS', 'DIFERIDO', 'INTERFACE', 'PASSO DE FICHA'],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'FINANCE',
        destinations: ['BITACORAS AP', 'CIERRE - ASOF AP', 'INTERFACE AP EN A9', 'INTERFACE GL EN A9', 'MONITOREO', 'PROCESO CIERRE', 'ZFILE AP', 'ZFILE GL'],
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
        destinations: ['REPORT'],
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
        destinations: ['GDRWEB', 'INTERFACE NEOGRID X GDR', 'NOVA FILIAL', 'PRE INDEX']
    },  
    {
        origin: 'INFOSPHERE',
        destinations: ['MONITORING']
    },  
    {
        origin: 'INTERFACE',
        destinations: ['RDS Integration'],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'INTERFACE',
        destinations: ['Erro em monitor CTG / COT', 'Erro na Página ARBA / AFIP', 'Interface CPEAR', 'Interface CEREALNET', 'Interface RDS - E1'],
        rules: [{1: 'RDS WEB', 2: 'ARGENTINA'}]
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
        destinations: ['ASSET CREATION', 'BATCH POSTING', 'INVALID BALANCE', 'WORK ORDER CLOSURE']
    },  
    {
        origin: 'LOGISTICS',
        destinations: ['CUPO', 'DOCUMENTOS DE DESPACHO', 'FICHA OH', 'FLETE', 'LOAD', 'OBTENCION COT/CTG', 'OPERATIVO', 'SAP BO - REPORTE', 'TRANSFERENCIA'],
        rules: [{2: 'ARGENTINA'}]
    },  
    {
        origin: 'LOTE',
        destinations: ['LOT AVAILABILITY'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'MANUFACTURING',
        destinations: ['AVAILABILITY']
    },  
    {
        origin: 'MASTERSAF',
        destinations: ['CIAP', 'DW', 'EFD 0500', 'INFRA', 'INTERFACE', 'INTERFACE DETAIL', 'INVENTORY ITEM', 'INVOICE DIVERGENT', 'MONITORING', 'REQUEST'],
        rules: [{1:'BOLTONS', }]
    },  
    {
        origin: 'NETTING',
        destinations: ['PAYMENT'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'ONESOURCE',
        destinations: ['SERVICES']
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
        destinations: ['ANTICIPO', 'APPLICATION', 'BATCH RECEPCION', 'BOLETIN', 'CERTIFICACION AFIP', 'COBROS SIN CONTABILIZAR', 'COMPRA Y VENTA DE INSUMOS', 'CONTABILIZACION', 'CONTRATOS', 'CUENTA CORRIENTE FINANCIERA', 'CUENTA CORRIENTE KGS', 'E1', 'ELEVACION', 'FICHA B2B', 'FICHA COMPRA OH', 'FICHA - PROCESO DE COMPRA', 'FICHA SERVICIO E1', 'FICHA SERVICIO E1 - ERROR APLICACION', 'INSUMOS', 'MANUTENCION MASSIVA', 'MONITOREO', 'NETTING', 'PRESTAMO', 'SERVICES', 'SETTLEMENT/BORRADOR', 'SETUP', 'STOCK'],
        rules: [{1: 'JDE ENTERPRISE E1/JDE A9'}]
    }, 
    {
        origin: 'OSGT',
        destinations: ['OSGT - SAP EXPORT']
    },
    {
        origin: 'OW7A8',
        destinations: ['AP', 'GL', 'INTERFACE JOB']
    },  
    {
        origin: 'PILHA',
        destinations: ['CROSSCHECK ERROR', 'DETALHE DE PILHA', 'ENCERRAMENTO DE PILHA', 'ENDERECAMENTO', 'GERACAO DE PILHA', 'LOTE', 'PILHA INDEVIDA', 'PROBLEMA EMBALAGEM DA PILHA', 'QUALIDADE PILHA'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'PILHA',
        destinations: ['ORDER'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'PLANTS & OPERATIONS',
        destinations: ['CMA DATA', 'FTS', 'MEZCLA', 'STOCK'],
        rules: [{1: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'PLANTS & OPERATIONS',
        destinations: ['AR'],
        rules: [{1: 'PROPERTY'}]
    },  
    {
        origin: 'PORTUS',
        destinations: ['ACCESS', 'APPOINTMENT MODULE', 'DATABASE PPORL', 'ESTADA NAVIO', 'STOCK MODULE', 'CITRIX SERVER', 'SHIPMENT MOVEMENT REPORTS', 'TOLFLUX BATELADAS']
    },   
    {
        origin: 'PROCESO CIERRE',
        destinations: ['DIFERENCIA', 'TRANSLATION'],
        rules: [{1: 'JDE A9 WS'}]
    },
    {
        origin: 'PROCUREMENT',
        destinations: ['CANCELLATION', 'CREATION', 'NETTING', 'PEDIDO A# - DEVOLUCAO NF', 'PEDIDO D7 - DDEVOLUCAO NF', 'RECEPTION', 'TAX', 'VOUCHER']
    },   
    {
        origin: 'RD',
        destinations: ['AJUSTES', 'CARDEX', 'CUSTO MEDIO', 'EXECUCAO', 'MIOLO', 'RDXCP', 'RELATORIO REVALORIZACAO', 'REVALORIZACAO', 'SALDO']
    },
    {
        origin: 'RDS',
        destinations: ['REPORT', 'REQUEST', 'VEHICLE ENTRANCE', 'VEHICLE WEIGHING', 'BALANCE', 'CITRIX', 'DATABASE', 'FICHA', 'FICHA - SHIPPING', 'FICHA - FOB FARM', 'FICHA - RECEPTION', 'INSTALLATION AND CONFIGURATION', 'INTERFAZ', 'OFFLINE INTERFACE', 'MONITORING', 'WEIGHT AND PRODUCT', 'TOTEM', 'USER']
    },    
    {
        origin: 'Relatório',
        destinations: ['Correção', 'Solicitação'],
        rules: [{1: 'RDS WEB'}]
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
        destinations: ['EXTRACAO DE DADOS', 'RELATORIOS', 'INVOICE', 'SLIP', 'PROCESSO', 'MENU JDE', 'PROJETOS'],
        rules: [{1: 'ORIGINATION'}]
    }, 
    {
        origin: 'REQUEST',
        destinations: ['ORDER', 'REQUEST PARAMETERIZATION'],
        rules: [{1: 'SALES / TRANSPORTATION'}]
    },  
    {
        origin: 'ROYALTIES',
        destinations: ['CLASSIFICACAO TRANGENICO', 'ERRO NA GERACAO ROYATIES', 'GERACAO DE ROYALTIE', 'PEDIDO ZK', 'RELATORIO DESCONTO DE ROYALTIES', 'REVERSAO X0']
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
        origin: 'Servidores',
        destinations: ['Servidor de dados/aplicação'],
        rules: [{1: 'RDS WEB'}]
    },
    {
        origin: 'Servidores',
        destinations: ['Servidor de middleware'],
        rules: [{1: 'RDS WEB', 2: 'ARGENTINA'}]
    },
    {
        origin: 'TAX',
        destinations: ['ACTUALIZADOR PADRON', 'AJUSTE DE PERMUTA-VENTAS', 'CALCULO DE RETENCIONES', 'CERTIFICADOS DE RETENCION', 'DDJJ DE STOCK', 'DEVOLUCIONES DE RETENCIONES', 'FACTURACION MASIVA', 'PADRONES NACIONALES Y PROVINCIALES', 'PERFIL IMPOSITIVO', 'RECUPERO DE IVA', 'TRANSMISIONES DE COMPRAS RETENCIONES', 'TRANSMISIONES DE VENTAS PERCEPCIONES', 'VALIDACION DOCUMENTOS DE VENTAS'],
        rules: [{1: 'JDE ENTERPRISE E1/JDE A9'}]
    },  
    {
        origin: 'TECHNICAL SERVICES',
        destinations: ['ACCESS', 'REPORTS GL', 'SETUP', 'STORAGE', 'WORLD WRITER'],
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
        origin: "TIBCO",
        destinations: ['REQUEST'],
        rules: [{1: "BOLTONS"}]
    },  
    {
        origin: "TIBCO",
        destinations: ['INTERFACE'],
        rules: [{1: ["INTERFACE TIBCO/DATA MIRROR", "INTERFACE TIBCO/OPENTEXT"]}]
    },  
    {
        origin: "TRANSPORTATION",
        destinations: ['LOAD', 'LOAD - REPOM'],
        rules: [{1: "SALES / TRANSPORTATION", 2: "BRAZIL"}]
    },  
    {
        origin: "VENTAS",
        destinations: ['BOLETIN DE CALIDAD', 'CONSUMO CREDITO', 'CONTABILIZACION', 'CONTRADOCUMENTACION', 'CONTRATO', 'CREDITO CLIENTE', 'DOCUMENTOS DE DESPACHO', 'FACTURACION', 'FIJACION DE PRECIO', 'LOAD', 'MONITOREO', 'NOTA DE CREDITO', 'OBTENCION CAE/COE', 'PEDIDO', 'RECIBOS', 'REPORT']
    }
];

export default tier2Connections;