const tier3Connections = [  
    {
        origin: '121 VEHICLE ENTRY-OUT EXTERIOR REPORT',
        destinations: ['TRANSPORTATION ADDRESS LOAD 121 VEHICLE ENTRY-OUT EXTERIOR REPORT']
    },
    {
        origin: 'ACCESS',
        destinations: ['CARGILL USER NOT REGISTERED', 'EXPIRED PERSONAL CERTIFICATE', 'EXPIRED WEB CERTIFICATE', 'RFB USER NOT REGISTERED'],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'ACCESS',
        destinations: ['INCLUSAO AUTOMATICA', 'SERVER RESTARTED'],
        rules: [{1: 'CTMS'}]
    },
    {
        origin: 'ACCESS',
        destinations: ['JAVA SETTING', 'PROFILE SETTING'],
        rules: [{1: 'CTMS APBU'}]
    },
    {
        origin: 'ACCESS',
        destinations: ['CARGILL USER NOT REGISTERED', 'CORPORATE PORTAL DOWN', 'EXPIRED PROCESS USER', 'EXPIRED WEB CERTIFICATE', 'WEB SERVICE IIS'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'ACCESS',
        destinations: ['USER REGISTRATION'],
        rules: [{1: 'SAP BO', 3: 'ARGENTINA'}]
    },
    {
        origin: 'ACCESS',
        destinations: ['UNREGISTERED USER'],
        rules: [{1: 'SAP BO', 3: 'BRAZIL'}]
    },
    {
        origin: 'ACCESS',
        destinations: ['ACCESS TO SHARED FOLDERS ON PORTUS ACCESS', 'ADJUSTS ON NEW APP SERVER ACCESS', 'ON NEW SERVER WINDOWS - BDE/ ACCESS', 'UNLOCK ACCOUNT ACCESS', 'CITRIX - ERROR ACCESSING BY CITRIX', 'DATABASE - UNLOCK OR RESET ACCOUNT ON PPORL'],
        rules: [{1: 'PORTUS'}]
    },
    {
        origin: 'ACCESS',
        destinations: ['LIBRARY', 'PROBLEMAS DE ACESSO'],
        rules: [{1: 'TECHNICAL SERVICES'}]
    },
    {
        origin: 'ACTUALIZADOR PADRON',
        destinations: ['ERROR O DEMORA EN PROCESO']
    },
    {
        origin: 'AD02 REPORTS',
        destinations: ['DATE ON DOC PORTUARIA SHIPMENT AD02 REPORTS', 'FAILED FOR PTS CONJ DOC TABLE AD02 REPORTS', 'ON REPORT 2.14.10 AD02 REPORTS', 'TERMINAL ON SHIPMENT AD02 REPORTS']
    },
    {
        origin: 'ADE PORTAL',
        destinations: ['ADE PORTAL WITH SLOWNESS', 'PROBLEMS WITH RFB USER PORTAL', 'REGISTRATION', 'UNAVAILABLE ADE PORTAL']
    },
    {
        origin: 'ADIANTAMENTO',
        destinations: ['AAI NAO CADASTRADO', 'ADDRESS BOOK-ADDRESS BLOQUEADO', 'AH FECHA VCTO', 'AH LIQUIDADO INDEVIDAMENTE', 'AH LIQUIDADO INDEVIDAMENTE EM X0', 'AH NAO GERADO', 'AH NAO TRANSFERADO', 'ALTERACAO DESCRICAO UDC', 'ATUALIZAR DDJ PARA PERMITIR EXCLUIR V4', 'AVANCAR STATUS V4', 'CHECKLIST NAO GERADO PARA V4', 'CONFIGURACAO EM FALTA ITEM 90067 X BP', 'CONGELAMENTO VAR CAMBIAL - FERRAMENTA ULTRA PISO', 'CONGELAR JUROS E VC', 'CREDITO DISPONIVEL ZERADO', 'ERRO ADIANTAMENTO CACAU CAK SEM SLIP 12', 'EXCLUIR V4 - CONTRATO EM STATUS C', 'EXCLUIR V4 DE PERIODO FISCAL ANTERIO', 'EXCLUSAO V4 USUARIO SEM ACESSO', 'FALHA AO GERAR ADIANTAMENTO CACAU', 'FALHA DE PROCEDIMENTO', 'MASTER DATA - CADASTRO UDC 55BR RE', 'NAO PERMITE CONGELAR JUROS', 'QUANTIDADE INVALIDA DO CONTRATO', 'RELATORIO ADIANTAMENTO ABERTO', 'RELATORIO ADIANTAMENTO ABERTO - TOTAL EM REAL NAO EXIBE', 'RELATORIO ADIANTAMENTO ABERTO -TAXA INCORRETA', 'RELATORIO ADIANTAMENTO ABERTO-TAXA INCORRETA', 'RELATORIO ADIANTAMENTO NAO GERA PDF', 'REVERSAO ADIANTAMENTO - PROBLEMAS P/ REVERTER', 'REVERSAO V4', 'REVERSAO V4 - AH GERADA', 'SALDO NAO RETORNADO ADTO', 'SOLICITACAO DE CREDITO EXPIRADA', 'TAXA DE CAMBIO INCORRETA', 'TRAVAR VARIACAO CAMBIAL', 'USUARIO NAO CONSEGUE GERAR V4', 'V4 DE CANCELADO S$ EM INTERFACE COM A9', 'V4 DIVERGENTE DO VALOR NA PROP COMERCIAL', 'V4 NAO GERADA - PLANNING PO DEPOT', 'V4 NAO GERADO']
    },
    {
        origin: 'AGRICULTURA FAMILIAR',
        destinations: ['DUPLICIDADE NO ANALITICO AG FAMILIA - F5543049']
    },
    {
        origin: 'AJUSTES',
        destinations: ['ERRO LOTE EM LANCAMENTO DE AJUSTES'],
        rules: [{1: 'RD'}]
    },
    {
        origin: 'AJUSTES',
        destinations: ['WD - AJUSTE OV-OH'],
        rules: [{1: 'CACAU'}]
    },
    {
        origin: 'AJUSTE DE PERMUTA-VENTAS',
        destinations: ['ERROR EN IMPORTE CALCULADO', 'REPORT ERROR']
    },
    {
        origin: 'ANTICIPO',
        destinations: ['DESVINCULAR ANTICIPO', 'FECHA VENCIMIENTO INCORRECTA', 'PEDIDO EN ERROR', 'PROBLEMAS EN DIF TIPO CAMBIO GENERADAS']
    },
    {
        origin: 'ANULAÇÃO DE FICHA',
        destinations: ['FICHA ANULADA, MAS SEGUE ATIVA', 'FICHA APLICADA EM E1 NÃO PERMITE ANULAR EM RDS', 'PROBLEMAS PARA ANULAR FICHA', 'SOLICITAÇÃO DE AJUDA PARA ANULAR FICHA'],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'AP',
        destinations: ['ACCOUNTING DATE CANT VARIATE', 'TAX RETAINED INCORRECTLY']
    },
    {
        origin: 'APPLICATION',
        destinations: ['SLOWNESS']
    },
    {
        origin: 'APLICACAO AUTOMATICA',
        destinations: ['ADICIONAR BP NA 55BR/AH', 'APLICACAO DE EXCESSO NAO PERMITIDO', 'CAK INVALIDO - PRIORIDADE DE CONTRATO', 'CAK INVALIDO DIGITADO NA FICHA - PRIORIDADE DE CONTRATO', 'CHAVE DE ACESSO INCORRETA', 'CONFIGURAR BP APLICACAO AUTOMATICA', 'CONTRATO EM USO', 'ERRO DT NF FUTURA', 'FICHA APLICADA PARA SAFRA FUTURO', 'FICHA NAO APLICA COM KM INCORRETO', 'FICHAS APLICADAS INCORRETAMENTE', 'FILHA APLICADA DATA RETROATIVA', 'JOB NAO TERMINA', 'REGRAS APLICACAO CONTRATO', 'VOL EXCEDENTE NAO CRIA NOVA LINHA']
    },
    {
        origin: 'APPOINTMENT MODULE',
        destinations: ['INFRA - TOLFLUX ISSUE', 'BATELADAS APPOINTMENT MODULE', 'ISSUE APPOINTMENT MODULE', 'ORDEM DE EMBARQUE APPOINTMENT MODULE', 'ORDER IN BLANK ON APPOINTMENT APPOINTMENT MODULE', 'VALIDATION APPOINTMENT MODULE']
    },
    {
        origin: 'AR',
        destinations: ['DOCUMENT RESENDING'],
        rules: [{1: 'PLANTS & OPERATIONS', 2: 'PROPERTY'}]
    },
    {
        origin: 'ASSET CREATION',
        destinations: ['APB - ASSET NUMBER DIVERGENCY ON AA/XA']
    },
    {
        origin: 'ARIBA',
        destinations: ['BATCH EN ERROR POR CUENTA CONTABLE INCORRECTA'],
        rules: [{1: 'ORDERS', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'ASIENTO CONTABLE',
        destinations: ['LIMPIAR LA SUBCUENTA'],
        rules: [{1: 'FIXED ASSET', 2: 'JDE A9 WS'}]
    }, 
    {
        origin: 'AUDITORIA KPMG',
        destinations: ['EXTRACTION DE DATOS PARA AUDITORIA']
    },
    {
        origin: 'ATUALIZACAO MASSIVA',
        destinations: ['ERRO DE ATUALIZACAO']
    },
    {
        origin: 'AVAILABILITY',
        destinations: ['INCORRECT VALUE', 'TEMPORARY RESERVES']
    },
    {
        origin: 'AVANCAR STATUS CONTRATO',
        destinations: ['CONTRATO DO ANO PASSADO', 'FATURAMENTO DE PEDIDO NAO REFLETE CALL / CAK', 'INFORMACOES INCORRETAS EM PARCELA', 'NAO PERMITE ENCERRAR - EMBARQUES PENDENTES', 'NAO PERMITE ENCERRAR - UREC > UORG']
    },
    {
        origin: 'Balança (PLC)',
        destinations: ['Alteração de descrição da balança', 'Caminhão anterior travado na tela', 'Erro de "sequência" no PLC - Sequência 1, 2 ou 3', 'Erro de "sequência" no PLC - Sequência 4', 'Erro de "sequência" no PLC - Sequência 5, 6, 7, 8, 9 ou 10', 'Erro em fotocélula', 'Falha de comunicação com PLC - PLC Travado', 'Falha de comunicação com PLC - Problemas com serviço de middleware', 'Falha de comunicação com PLC - Problemas de rede', 'Falha de comunicação com PLC - Problemas físicos de conexão'],
        rules: [{1: 'Automação', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'Balança Serial',
        destinations: ['Alteração de descrição da balança', 'Configuração de string', 'Falha ao ler "peso zero"', 'Leitura de valores incorreta', 'Mudar balança de PC', 'Não captura peso', 'Nova configuração de balança', 'Problema de conexão física com balança', 'Problema físico na balança', 'Problema físico no PC', 'Variação na leitura de peso'],
        rules: [{1: 'Automação', 2: 'RDS WEB'}]
    },
    {
        origin: 'BALANCE',
        destinations: ['2 WEIGHING CANCELLED ONLY IN XE DB', 'DELETE', 'DEVICE STATION NOT PARAMETEREZED', 'FAILURE IN WEIGHING MODULE', 'HABILITAR TELA DE AFERICAO DE BALANCA', 'MODULE CONFIG', 'NEGATIVE STRING', 'NEW MODULE CONFIGURATION', 'NEW WEIGHING MODULE STRING', 'NO SUPPORT ACTION', 'PROBLEMA COM CAMERA DE PESAGEM', 'SAME WEIGHT LAST ENTRANCE', 'WRONG QUALITY DATA', 'WRONG WEIGHING STEP'],
        rules: [{1: 'RDS'}]
    },
    {
        origin: 'BALANCE',
        destinations: ['BATELADAS APPOINTMENT MODULE', 'ISSUE APPOINTMENT MODULE', 'ORDEM DE EMBARQUE APPOINTMENT MODULE', 'ORDER IN BLANK ON APPOINTMENT APPOINTMENT MODULE', 'TOLFLUX ISSUE', 'VALIDATION APPOINTMENT MODULE'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'BATCH',
        destinations: ['BATCH DESBALANCEADO', 'BATCH EN STATUS IN USE', 'BATCH SIN CABECERA Y AP', 'BORRAR DOCUMENTOS ERRONEOS', 'COA - CUENTA CONTABLE INACTIVA', 'FALTA MONTO EN RPSTA1 y RPSTF1 DE LA F0411', 'FECHA DEL PERIODO ANTERIOR', 'STATUS DE LA CABECERA INCORRECTO'],
        rules: [{1: ['ACCOUNTS PAYABLE', 'ACCOUNTS RECEIVABLE']}]
    },
    {
        origin: 'BATCH',
        destinations: ['BATCH DEL TIPO XX', 'BATCH EN ERROR', 'BATCH FECHA INCORRECTA', 'BATCH FUERA DE BALANCE', 'BATCH DEL TIPO G', 'BATCH DESBALANCEADO', 'BATCH EN STATUS IN USE', 'BORRAR DOCUMENTOS ERRONEOS', 'COA - CUENTA CONTABLE INACTIVA', 'FECHA DEL PERIODO ANTERIOR', 'STATUS DE LA CABECERA INCORRECTO'],
        rules: [{1: 'ACCOUNTING'}]
    },
    {
        origin: 'BATCH DESBALANCEADO',
        destinations: ['DISTINTAS PORCENTAJES EN LA MISMA CUENTA'],
        rules: [{1: 'ACCOUNTS PAYABLE', 2: 'JDE A9 WS', 3: ['ARGENTINA', 'URUGUAY']}]
    },
    {
        origin: 'BATCH POSTING',
        destinations: ['ERROR ON LOTE POSTING']
    },
    {
        origin: 'BATCH RECEPCION',
        destinations: ['DEMORA EN PROCESAR']
    },
    {
        origin: 'BITACORAS AP',
        destinations: ['DOCUMENTO ANULADO EN A9 PERO NO FUE ANULADO EN E1'],
        rules: [{1: 'FINANCE'}, {2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'BLOCK K',
        destinations: ['CLEANING ON TABLE F5576599']
    },
    {
        origin: 'BOLETIN',
        destinations: ['BATCH R55STZ01 NO CORRIO', 'BOLETIN CON DATOS INCORRECTOS', 'BOLETIN DE ANALISIS CON ESTADO INCORRECTO', 'BOLETIN SIN CALIDAD', 'CAMBIAR  BOLETIN', 'FICHAN SIN CERTIFICADO', 'NO GENERA BORRADOR', 'RUBROS CON MERMA', 'RUBROS CON VALORES INCORRECTOS', 'RUBROS REQUERIDOS SIN VALOR', 'USUARIO SIN PERMISOS PARA HACER CAMBIOS'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'BOLETIN DE CALIDAD',
        destinations: ['CARGA DE GRADOS', 'ORDENES SA - B2B']
    },
    {
        origin: 'BOLETO',
        destinations: ['INSTRUCAO DE PAGTO INCORRETA']
    },
    {
        origin: 'CADASTRO',
        destinations: ['Cadastro de cotas', 'Cadastro de filial', 'Cadastro de motorista', 'Cadastro de produto', 'Cadastro de safra', 'Cadastro de tolerâncias', 'Cadastro de unidade de conversão'],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'CADASTROS',
        destinations: ['COTACAO ROLAGE REMOVIDA', 'ERRO COTACAO DE PRECO']
    },
    {
        origin: 'Calada / Barreiras',
        destinations: ['Barreira não levanta - Problema físico com a barreira', 'Barreira não levanta - Problemas com fotocélula', 'Barreira não levanta - Problemas com software terceiro (ex. Tesla)', 'Barreira não levanta - Problemas no PLC', 'Caminhão anterior travado na tela', 'Erro ao acionar barreira', 'Erro de captura de dados da calada', 'Problema físico na leitora de badge', 'Problemas com serviço de middleware'],
        rules: [{1: 'Automação', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'CALCULO DE RETENCIONES',
        destinations: ['CONSIGNATARIOS Y ACOPIADORES', 'REVISION DE CALCULO'],
        rules: [{1: 'TAX', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'CALCULO DE RETENCIONES',
        destinations: ['BATCH QUEDA APROBADO Y NO CONTABILIZA', 'LINEAS RETENCIONES DUPLICADAS'],
        rules: [{1: 'RETENCIONES'}]
    },
    {
        origin: 'CALCULO INCORRETO',
        destinations: ['DOCUMENTOS SEM UMIDADE NO CARDEX', 'LANCAMENTO MANUAL DE CUT OFF INCORRETO', 'NAO ESTA CONSIDERANDO A DATA DO CUT OFF', 'UMIDADE INCORRETA- ENTRADAS']
    },
    {
        origin: 'CALL',
        destinations: ['CALL NEGATIVO NAO REFLETIU PARCELA DO CONTRATO', 'CANCELAMENTO DE ORDEM DE VENDA']
    },
    {
        origin: 'CANCELAR CAK',
        destinations: ['CANCELAR CALL']
    },
    {
        origin: 'CANCELLATION',
        destinations: ['INCORRECT OPEN AMOUNT IN ORDER', 'CANCELLATED INCORRECTLY', 'PEDIDO BLOCKED IN P00095']
    },
    {
        origin: 'CAPITALIZACION',
        destinations: ['MODIFICAR DATOS EN VL'],
        rules: [{1: 'FIXED ASSET', 2: 'JDE A9 WS'}]
    }, 
    {
        origin: 'CARDEX',
        destinations: ['BROKEN COST', 'INCLUDE ILKIT', 'MISSING AAI REGISTER'],
        rules: [{1: 'COSTS AND INVENTORY'}]
    },
    {
        origin: 'CARDEX',
        destinations: ['AJUSTE LANCADO INCORRETO', 'DATA DOCUMENTO INCORRETO NO CARDEX', 'LENTIDAO TELA CARDEX', 'USER - PARAMETRIZADO GERACAO DE B0-I3', 'VALOR INDEVIDO NO CARDEX', 'VQ COM NOTA AUTORIZADA CONSTA COMO CANCELADO'],
        rules: [{1: 'RD'}]
    },
    {
        origin: 'CARTA DE CORRECAO',
        destinations: ['ADDRESS BLOQUEADO', 'CARTA DE CORRECAO 7 DIGITOS', 'NAO SOBE PARA O NEOGRID', 'PRESA EM AUTORIZADO NO NEOGRID']
    },
    {
        origin: 'CASH TRADES',
        destinations: ['CACAU - CT RETORNA LINHAS DE DATAS INDEVIDAS', 'CAK NPE INDEVIDO', 'COMPONENTE ERRADO NO RELATORIO', 'CONTRATOS COM EXCESSO NEGATIVOS NO CT', 'CONTRATOS COM MAIS DE UMA LINHA', 'DIVERGENTE DE CONTRATO EM ABERTO', 'FIXED OPEN PURCHASE V2 - BPS NAO APARECEM', 'LINHAS DE AJUSTE INDEVIDAS', 'LINHAS ZERADAS CONTINUAM SENDO EXIBIDAS', 'PEDIDO NAO CONSTA NO RELATORIO', 'SOLICITACAO PROJETOS SQL', 'VOLUME INCORRETO NO CASH TRADE', 'VOLUME ANALITICO DIVERGENTE DE SINTETICO', 'VOLUMES INDEVIDOS NO RELATORIO'],
        rules: [{1: 'ACCOUNT', 2: 'ORIGINATION', 3: 'BRAZIL'}]
    },
    {
        origin: 'CCTV CAMERA',
        destinations: ['CCTV PROBLEM', 'EQUIPAMENT REPLACEMENT / MAINTENANCE', 'INSTALATION / CONFIGURATION'],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'CCTV CAMERA',
        destinations: ['CONFIGURATION CCTV CAMERA', 'REPLACEMENT / MAINTENANCE CCTV CAMERA'],
        rules: [{1: 'DUANES'}]
    },
    {

        origin: 'CELEPAR APPA LOADS RECEPTION',
        destinations: ['TIBCO APPA INTERFACE DOWN', 'APPA INTERFACE DOWN CELEPAR APPA LOADS RECEPTION', 'TEG CONCURRENT WITH PGA APPA CELEPAR APPA LOADS RECEPTION', 'WITHOUT NCM CELEPAR APPA LOADS RECEPTION']
    },
    {
        origin: 'CERTIFICACION AFIP',
        destinations: ['ERROR CONFIRMA', 'ERROR SIO GRANO', 'ERROR SIO FIJACIONES', 'ANULAR COE', 'ANULAR RT', 'COE CRUZADO', 'ERROR 1520', 'ERROR EN CERTIFICACION DE LPG', 'ERROR ESQUEMA', 'FICHA NO CERTIFICA', 'REPROCESAR E0', 'REPROCESAR RT'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'CERTIFICADOS DE RETENCION',
        destinations: ['ERROR EN IMPRESION']
    },
    {
        origin: 'CEXP',
        destinations: ['INCORRECT WEIGHT', 'XML WITHOUT IND EXPORT CHNFE', 'FAILURE IN LIST LINKING', 'PROBLEMS IN INTERFACE MASTER RDS', 'REMESSA WITH INCORRECT WEIGHT', 'TAX COMPLIANCE TELA ERROS COM NOTAS INDEVIDAS', 'NOT SHOW IN BASE - FICHA OH WITHOUT KEY', 'PO - INCORRECT PO', 'SP - NOTAS INDEVIDAS NA BASE', 'UA - REENVIO DE XML INDEVIDO CHAVE INCORRETA', 'FICHA COM CONTRA NOTA', 'INVOICE WITH REJECTED CANCELLATION', 'NP INPUT WRONG IN F5576201', 'USER TRY  NF OLD', 'CORRECT STATUS FICHA CCT']
    },
    {
        origin: 'CIAP',
        destinations: ['LINKING ASSETS CIAP', 'OPERATION DATE CIAP']
    },
    {
        origin: 'CIERRE - ASOF AP',
        destinations: ['DOCUMENTOS ANULADOS CON CAMPO POST LLENADO CON D', 'DOCUMENTOS EN ESTADO P SIN PAGO ASOCIADO']
    },
    {
        origin: 'CITRIX',
        destinations: ['DATETIME INCORRET', 'INCORRECT PRINT PDF', 'NO SUPPORT ACTION']
    },
    {
        origin: 'CITRIX SERVER',
        destinations: ['N DRIVER NOT MAPPED ON CITRIX CITRIX SERVER']
    },
    {
        origin: 'CLASSIFICACAO TRANGENICO',
        destinations: ['ERRO NA BAIXA DE CREDITO', 'TELA CLASSIFICACAO ALTERACAO ADDRESS', 'TELA NAO HABILITA CLASSIFICACAO', 'INPUT INCORRETO DA CLASS TRANG']
    },
    {
        origin: 'CMA',
        destinations: ['COTACAO CMA SEM VALOR PARA MESES FUTUROS', 'COTACAO NAO SUBIU AO JDE', 'ERRO ROBO CMA', 'SERVIDORES FORA DO AR', 'TAXA DLPTAX NAO ESTA SENDO ATUALIZADA', 'TAXA PTAX80 NAO ATUALIZADA', 'VARIACAO CAMBIAL FLUTUANDO ACIMA DO NORMAL']
    },
    {
        origin: 'CMA DATA',
        destinations: ['CHECK CMA DATA RECORDING F5540029']
    },
    {
        origin: 'COBROS SIN CONTABILIZAR',
        destinations: ['COBRO GENERADO EN DOLARES', 'COBROS PENDIENTES CONTABILIZAR - RZPFAP = CERO']
    },
    {
        origin: 'COMPLEMENTO',
        destinations: ['EV01 PREENCHIDO INDEVIDO', 'NAO APARECE NOTAS NA TELA DE GERACAO', 'NOTA COMPLEMENTO NAO IMPRESSA', 'VALOR DE PESO INDEVIDO']
    },
    {
        origin: 'COMPRA Y VENTA DE INSUMOS',
        destinations: ['ANULACION DE INSUMOS', 'ANULACION DE V$', 'APROBACION ORDEN', 'CONTRADOCUMENTACION NO PERMITIDA', 'CONTRATO BARTER', 'ERROR EN CONTRADOCUMENTACION VA Y D#', 'ERROR FACTURAR VA', 'ERRO EN SALDO DESPACHO VA', 'FALLA EN LA REVERSION OH', 'FALTA LINEA POR EXCEDENTE FACTURADO', 'MD - CONFIGURACION BP VIRTUAL', 'MD - HACIENDA BLOQUEADA', 'MULTIPLICIDAD AL GENERAR VAS', 'PROBLEMA EN EL PROCESO AUTOMATICO', 'SALDO INCORRETO VA (F5542072)', 'SALDO INCORRETO VA Y V$ (F5542072)', 'V$ DUPLICADA', 'VA SIN CANTIDAD DESPACHO', 'VA SIN SIGNO DE DESPACHO', 'VOLVER SALDO DESPACHO VP NN', 'VP CON ESTADO INCORRECTO'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'CONFIGURACION DE CENTRO DE COSTO',
        destinations: ['AGREGAR NUEVO CC EM ALOCACION'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'CONFIGURACION DE CUENTA',
        destinations: ['SETUP DE MONEDA'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'CONSTANTE BP',
        destinations: ['SETUP NUEVA BP Y RUTA APROBACION'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'CONSULTA',
        destinations: ['CONSULTAR OC VINCULADA A OR', 'IMPRESION DE OP']
    },
    {
        origin: 'CONSUMO CREDITO',
        destinations: ['ERROR EN EL MONTO DEL CREDITO']
    },
    {
        origin: 'CONTABILIZACION',
        destinations: ['AB - CLIENTE INHABILITADO', 'BATCH EN ESTADO APROBADO SIN CONTABILIZAR', 'DIFERENCIA DE INTEGRIDAD ENTRE EL MODULO Y CONTABILIDAD', 'DOCUMENTO BORRADOR ASOCIADO NETTING CON ERROR', 'DOCUMENTOS ELIMINADOS DEL MODULO PERO NO DE LA CONTABILIADAD', 'DOCUMENTOS QUE NO TERMINARON DE FACTURAR', 'NO GENERA H#', 'Q4 SIN CONTABILIZAR POR ERROR CAMPOS RPCRRM Y RPCRCD', 'REVERSION CON FECHA Y PERIODO CONTABLE CERRADOS'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'CONTABILIZACION',
        destinations: ['EXECUCION DE SALES UPDATE'],
        rules: [{1: 'VENTAS'}]
    },
    {
        origin: 'CONTRADOCUMENTACION',
        destinations: ['CONTR TOTAL', 'ERROR CONTRADOCUMETNACION', 'LINEA FALTANTE']
    },
    {
        origin: 'CONTRATO',
        destinations: ['ALTERAR ADDRESS DE CLIENTE EM SPLIT DE CAK', 'ALTERAR DATA DE CAK', 'ALTERAR STATUS DE CAK', 'BOLSA EXPIRADA', 'CONTRATO BLOQUEADO'],
        rules: [{1: 'CM'}]
    },
    {
        origin: 'CONTRATO',
        destinations: ['CANTIDAD DE CONTRATO', 'STATUS INCORRETO'],
        rules: [{1: 'VENTAS', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'CONTRATOS',
        destinations: ['ANTICIPO MAL GENERADO', 'ANULAR SLIP CONTRATO', 'CAMBIO DE FIJACION INCORRECTO', 'CAMBIO DE PRIORIDAD DEL CONTRATO', 'CAMBIO EN CONTRATO', 'CAMBIO ESTADO FIRMA', 'CAMBIO IMPORTES SELLADOS', 'CONTRATO DUPLICADO', 'CONTRATO FUE BORRADO DE LAS TABLAS 50 / 51', 'CONTRATO NO APLICA TOLERANCIA', 'COSECHA INCORRECTA', 'DEPURAR CONTRATO', 'ERROR DE PERMISO', 'ERROR PARA EFETIVAR SLIP', 'FLATEO DE CONTRATO', 'IMPRESION DE CONTRATO - NO EJECUTA JOB DE IMPRESION', 'INGRESO CONTRATO EN MONITOR DE SIO', 'JOB Check_CMA_Data_Recording_f5540029 LENTITUD', 'NO GENERA INTERES DE $', 'PRECIO DE PARITARIAS', 'REASIG DE CTO NO TRAE TILDE DE CARTA OFERTA', 'SLIP DE ALTERACION NO GENERA CONTRATO', 'SLIP FIJACION CON FECHA OPERACION Y LINEA EN BLANCO'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'CONTROLE DE ASSINATURAS',
        destinations: ['BAIXAS DE ASSINATURAS DE CONTRATO', 'CAD REPRESENTANTES - ADDRESS INCORRETO', 'CAK CANCELADO APARECENDO', 'ERRO DOCUSIGN EMAIL INVALIDO', 'TELA DE CONTROLE EXIBINDO DOCUSIGN', 'TELA NAO EXIBE ASSINATURA CONCLUIDA', 'VERSAO INCORRETA DO DOCUSIGN']
    },
    {
        origin: 'CONTROLE DE PILHA',
        destinations: ['LENTIDAO GERA DETALHE DE PILHA']
    },
    {
        origin: 'Correção',
        destinations: ['Dados incorretos no relatório', 'Erro ao gerar relatório', 'Relatório gerado em branco'],
        rules: [{1: 'Relatório', 2: 'RDS WEB'}]
    },
    {
        origin: 'CPR',
        destinations: ['CAMPO RG INCORRETO']
    },
    {
        origin: 'CREACCION DE NUEVA CIA',
        destinations: ['SUPPORT - CIA CONFIGURADA']
    },
    {
        origin: 'CREATION',
        destinations: ['ACCOUNT PARAMETERIZATION', 'CROP INPUT - USER ERROR', 'INCORRECT ADDRESS', 'INVALID APPROVAL ROUTE', 'NATUREZA E SUFIXO INCORRETOS', 'SO - USER HAS NO ACCESS']
    },
    {
        origin: 'CREDITO',
        destinations: ['ACESSO A TELA SOLICITACAO CREDITO/RISCO', 'CREDIT NOT APPEARING', 'LIMITE DE RISCO DE MERCADO INSUFICIENTE', 'PARAMETRIZACAO INEXISTENTE DO ITEM']
    },
    {
        origin: 'CREDITO SUSPENSO',
        destinations: ['CREDITO SUSPENSO COM VALOR INDEVIDO', 'ERRO AO LIQUIDAR CONTRATO:POSSUI CREDITO SUSPENSO', 'GERACAO INDEVIDA BPF GO', 'RELATÓRIO NAO RETORNA VALORES DE CREDITO SUSPENSO DEVIDO - MT', 'REMOVER CREDITO SUSPENSO']
    },
    {
        origin: 'CREDITO CLIENTE',
        destinations: ['EXPOSICION']
    },
    {
        origin: 'CRIACAO FICHA',
        destinations: ['CRIACAO DE OH VIA ORCH', 'ERRO ETIQUETA CRIACAO FICHA MANUAL', 'FALHA NA CRIACAO DE FICHA', 'FALTA CADASTRO RANGE DE VALORES', 'LENTIDAO CRIACAO OH', 'TIPO DE PESO INCORRETO']
    },
    {
        origin: 'CROP INPUT',
        destinations: ['ERROR OF ETIQUETA - CANCEL VH', 'INCORRECT AB VENDOR', 'INCORRECT OPERATION TYPE', 'ORDER V0 WITHOUT F5542048', 'PROBLEMS IN HISTORY PRICE', 'WEIGHT DIDNT RETURN TO POSITION', 'INCORRECT ADDRESS', 'OLD ORDERS WITH PROBLEMS IN COMISSION', 'OP DIDNT VINCULATED TO VQ', 'USER DIDNT DO THE CONFIRMATION IN SALESFORCE', 'WEIGHT DIDNT RETURN TO B2B']
    },
    {
        origin: 'CROSSCHECK ERROR',
        destinations: ['EXCLUIR QL']
    },
    {
        origin: 'CRUSH MARGIN',
        destinations: ['MOAGEM REFLETE EM RELATORIO APENAS NO DIA SEGUINTE']
    },
    {
        origin: 'CT',
        destinations: ['ALTERACAO DISTRITO']
    },
    {
        origin: 'CT - APPLICATION PERFORMANCE',
        destinations: ['AVAILABILITY ISSUE', 'TABLE LOCK']
    },
    {
        origin: 'CT - AUTHORIZATION - CTE',
        destinations: ['ITEM VALUE IS TOO LARGE', 'STUCK ON 51 STATUS']
    },
    {
        origin: 'CT - CADASTRO',
        destinations: ['SUPORTE AO USER - CADASTRO']
    },
    {
        origin: 'CT - CALCULO',
        destinations: ['LOAD NAO ESTORNA']
    },
    {
        origin: 'CT - CANCELAMENTO',
        destinations: ['ERRO']
    },
    {
        origin: 'CT - CANCELATION CTE',
        destinations: ['CANCELOU CTE REJEITADO', 'WRONG TIME ZONE IN XML']
    },
    {
        origin: 'CT - CARRIER PORTAL',
        destinations: ['AVAILABILITY ISSUE', 'EI - RESTARTED THE SERVER']
    },
    {
        origin: 'CT - DESTINATION WEIGTH',
        destinations: ['FIELD LOCK']
    },
    {
        origin: 'CT - ERRO GERACAO NFS',
        destinations: ['CTE - ADDRESS BOOK']
    },
    {
        origin: 'CT - FREIGTH TABLE',
        destinations: ['INCORRECT TYPED DATE']
    },
    {
        origin: 'CT - FRETE EXTRA',
        destinations: ['ERRO GERACAO CONTRATO', 'UR-EXCLUSAO DE DESPESA EXTRA']
    },
    {
        origin: 'CT - INTERFACE',
        destinations: ['ERRO REGISTRO DE OCORRENCIA']
    },
    {
        origin: 'CT - INTERFACE A9',
        destinations: ['RI WITHOUT CTE']
    },
    {
        origin: 'CT - LOAD INTERFACE',
        destinations: ['CTE RECEITA ERRO', 'SUPPORT - NCM PARAMETERIZATION']
    },
    {
        origin: 'CT - NETTING',
        destinations: ['INCORRECT DISCOUNT']
    },
    {
        origin: 'CT - OC',
        destinations: ['ERRO NA IMPRESSAO DE OC']
    },
    {
        origin: 'CT - PRE FATURA',
        destinations: ['PDF PRE FATURA ERROR']
    },
    {
        origin: 'CT - RECEIVING CONTRACT EMAIL',
        destinations: ['CADASTRO E-MAIL']
    },
    {
        origin: 'CT - RELATORIO ANALISTICO',
        destinations: ['PRE FATURA SEM FATURA']
    },
    {
        origin: 'CT - REPOM',
        destinations: ['ALTERACAO CONTRATO REPOM', 'CANCELAMENTO CONTRATO REPOM', 'CONTRATO REPOM', 'INTERROMPER CONTRATO REPOM', 'PESO DESTINO', 'QUITACAO - CONTRATO FRETE EXTRA', 'ROUTINE CANCELLATION REPOM', 'AUTOMATIC PRINTING ISSUE', 'ERRO GERACAO', 'QUITACAO NAO ENVIADA', 'REPOM - TIME OUT ISSUE', 'ERROR CARD REPOM', 'CHANGE LOAD PARAMETER REPOM = N', 'CREATE OR CHANGE PRINTER', 'CONTRACT NOT GENERATED']
    },
    {
        origin: 'CT - REPOM – DISCHARGE',
        destinations: ['NO IMPUT CTE AND WEIGHT DESTINATION']
    },
    {
        origin: 'CT - REPORT',
        destinations: ['REPORT DESPESA X CONTABIL']
    },
    {
        origin: 'CT - TN',
        destinations: ['OC NAO GERA LOAD']
    },
    {
        origin: 'CT- FRETE EXTRA',
        destinations: ['ERRO QUITACAO']
    },
    {
        origin: 'CUENTA CORRIENTE FINANCIERA',
        destinations: ['DATOS INCORRECTOS EN LA PANTALLA', 'DOCUMENTOS QUE NO APARECEN EN PANTALLA', 'FALLA DESCARGA DE DOCUMENTOS', 'FECHA DE VENCIMIENTO DEL DOCTO INCORRECTA', 'IMAGEN NO DISPONIBLE', 'L# NO SE VISUALIZA', 'PROBLEMAS EN LA IMPRESION DE LOS COMPROBANTES', 'SALDOS INCORRECTOS'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'CUENTA CORRIENTE KGS',
        destinations: ['APARECE LIQUIDACION PEND DE COE Y YA FUE PAGA', 'CAMBIO EN MANUTENCION MASIVA NO REFLEJA EN LA PANTALLA', 'DUPLICIDAD DE KGS DESPUES DE TRANSFERIR SIN MOV FISICO', 'ERROR SALIDAS POR TRANSFERENCIA', 'FECHA MAL CARGADA', 'FICHAS SERVICIO NO TRAEN CANTIDAD EN ENTRADA SERVICIOS', 'FICHAS SERVICIOS SIN APLICAR', 'MERCADERIA A LIQUIDAR EN NEGATIVO', 'NO APARECEN FICHAS APLICADAS', 'REASIGNACION DE BP QUEDA CON LA LINEA EN ABIERTO', 'RETIRO CONSUMO NO APARECEN EN LA PANTALLA', 'MOV MOLIENDA NO APARECEN EN LA PANTALLA', 'MOV ELEVACION NO APARECEN EN LA PANTALLA', 'SLIP ALTERACION NO ACTUALIZA EN LA PANTALLA', 'CAMBIO CLAUSULA DE CONTRATO', 'FLAT NO GENERA X0']
    },
    {
        origin: 'CUPO',
        destinations: ['CAMBIO DE CUPO', 'CUPOS NO LLEGAN A JDE', 'ERROR EN LA GRILLA DE CORDENACION', 'ERROR EN LA OBTENCION DE CUPO', 'INTERFAZ CUPO NEWS']
    },
    {
        origin: 'CUSTO MEDIO',
        destinations: ['CADASTRO RANGES', 'CALCULO INCORRETO IB', 'PARAMETRIZACAO BATCH']
    },
    {
        origin: 'DADOS',
        destinations: ['INFORMACAO INCORRETA'],
        rules: [{1: 'SAP BO', 2: 'SAP BO - REPORTES'}]
    },
    {
        origin: 'DADOS',
        destinations: ['Dados incorretos - BU Default incorreta', 'Dados incorretos - Dados duplicados', 'Dados incorretos - Dados incorretos', 'Dados incorretos - Excesso de caracteres no campo "observação"', 'Dados incorretos - Filial destino / descarga incorreta', 'Dados incorretos - Não traz valores de CUPOS', 'Dados incorretos - Placa / motorista incorretos', 'Dados incorretos - Problemas de cache', 'Dados incorretos - Safra incorreta', 'Load com dados inválidos', 'Não permite alterar dados da ficha', 'Número de remito inválido', 'Número de remito já utilizado'],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'DATA SELECTION',
        destinations: ['DATA SELECTION UPDATE'],
        rules: [{1: 'COSTS AND INVENTORY', 2: 'PROPERTY'}]
    },
    {
        origin: 'DATABASE',
        destinations: ['DATABASE CONNECTION LOST', 'LIFECYCLE PROCESS UPGRADE', 'LOCK AT DATABASE', 'NETWORK TNSNAMES', 'NO SUPPORT ACTION', 'PROFILE USER LIMIT EXPIRY DATE', 'REBUILD INDEXES', 'REINSTALL AND RECONFIGURATION OF DATABASE', 'ROLES E PERMISSOES DE USUARIO', 'ROLLOUT', 'SLOWNESS IN NETWORK', 'WRONG MAX FINAL VERSION ORACLE', 'XE DATABASE FULL'],
        rules: [{1: 'RDS'}]
    },
    {
        origin: 'DATABASE',
        destinations: ['DATABASE DEADLOCK', 'DATABASE DOWN', 'LINKED SERVER', 'SLOWNESS', 'WSCONNECT'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'DATABASE PPORL',
        destinations: ['SLOWNESS']
    },
    {
        origin: 'DDJJ DE STOCK',
        destinations: ['ALTA DE CENTROS EMISORES', 'ERROR EN MAPEO DE PLANTAS', 'ERROR EN NUMERO DE SLIP', 'ERROR EN XML DDJJ LA PAMPA']
    },
    {
        origin: 'DESBALANCEO COMPANIA',
        destinations: ['EJECUCION DEL REPOST']
    },
    {
        origin: 'DESCONTO DE QUALIDADE',
        destinations: ['DESCONTO DE QUALIDADE INDEVIDO', 'DESCONTO DE QUALIDADE NAO CADASTRADO', 'INPUT DE QUALIDADE DUPLICADA', 'INPUT DE QUALIDADE NAO INCLUIDO PELO USUARIO', 'ITEM NAO CADASTRADO EM INPUT QUALIDADE', 'LENTIDAO NA TELA INPUT DE QUALIDADE', 'MASTER DATA -PROBLEMA CADASTRO']
    },
    {
        origin: 'DETALHE DE PILHA',
        destinations: ['EXCLUIR PILHA INCORRETA', 'IT NAO ENTROU NA PILHA', 'NAO LE AJUSTE IA', 'OH CANCELADA NO DETALHE PILHA', 'OH NAO ENTROU NA PILHA', 'ORIGEM INCORRETA NA PILHA', 'PILHA SEM DADOS']
    },
    {
        origin: 'DEVOLUCIONES DE RETENCIONES',
        destinations: ['ANULACION DE DEVOLUCIONES']
    },
    {
        origin: 'DIFERENCA CUT OFF E CARDEX',
        destinations: ['DIVERGENCIA DE UMIDADE CUT OFF PARA CARDEX']
    },
    {
        origin: 'DIFERENCA CUT OFF E MAPA DE VENDAS',
        destinations: ['DIFERENCA NO VOLUME']
    },
    {
        origin: 'DIFERENCA CUT OFF E VOLUME TRANSFERENCIA',
        destinations: ['NUMERO DOCUMENTO INCORRETO ESPELHO']
    },
    {
        origin: 'DIFERENCIA',
        destinations: ['DESBALANCE DE COMPROBACION DETALLADO', 'DESBALANCEO ENTRE CIAS', 'DIFERENCIA EN REPORTE DE INTEGRIDADES', 'DIFERENCIA ENTRE ASOF Y LA CONTABILIDAD', 'DIFERENCIA EN BALANCETE'],
        rules: [{1: 'PROCESO CIERRE', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'DIFERIDO',
        destinations: ['Diferido express - Desabilitar diferido express', 'Diferido express - Habilitar diferido express', 'Não carrega datos da ficha original', 'Não carrega itens de qualidade', 'Não grava pesagem na ficha por diferido', 'Não permite alterar dados de diferido'],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'DOCUMENTO F9',
        destinations: ['LANCAMENTO INCORRETO NO CARDEX']
    },
    {
        origin: 'DOCUMENTO NAO SUBIU AO A9',
        destinations: ['DOCUMENTO V4 NAO SUBIU AO A9', 'OV NAO SUBIU PRO A9']
    },
    {
        origin: 'DOCUMENTOS DE DESPACHO',
        destinations: ['ERROR EN IMPRESION']
    },
    {
        origin: 'DOCUMENTOS DE DESPACHO',
        destinations: ['ANULACION', 'CTG AUTOMATICO', 'DIVERGENTE', 'GENERACION', 'LOAD NO GENERA CP O REMITO', 'SIMULACION'],
        rules: [{1: 'LOGISTICS'}]
    },
    {
        origin: 'DOCUMENTOS DE DESPACHO',
        destinations: ['OBTENCION COT/CTG', 'REASIGNACION DOCUMENTO DE DESPACHO'],
        rules: [{1: 'VENTAS'}]
    },
    {
        origin: 'DUANES EXTERNAL ACCESS',
        destinations: ['FAILED DUE TO POWER ISSUE DUANES EXTERNAL ACCESS', 'NOT CONFIGURED IN LOCAL MACHINE DUANES EXTERNAL ACCESS']
    },
    {
        origin: 'DUANES INTERNAL ACCESS',
        destinations: ['403: SERVER ERROR - AD EXCLUSION AFTER 60 DAYS']
    },
    {
        origin: 'DW',
        destinations: ['APPLICATION SLOWN', 'APPLICATION ACCESS', 'CONNECTION', 'EQUALIZATION ERROR', 'ERROR SCREEN', 'ICMS VERIFICATION', 'REPORT ERROR', 'SLOW APPLICATION', 'SLOW IMPORT TABLE']
    },
    {
        origin: 'E1',
        destinations: ['NO SE CONECTA']
    },
    {
        origin: 'EFD 0500',
        destinations: ['CHANGE ACCOUNTING ACCONT'],
        rules: [{1: 'MASTERSAF'}]
    },
    {
        origin: 'ELEVACION',
        destinations: ['BUQUE INGRESO CON KGS INCORRECTOS', 'BUQUE NO INGRESO EM E1 O FALTA PARTE'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'ENCERRAMENTO DE PILHA',
        destinations: ['FALHA AO ENCERRAR - STATUS DE FICHA INCO']
    },
    {
        origin: 'ENDERECAMENTO',
        destinations: ['ENDERECADO PARA LINHA INCORRETA', 'EW NAO ENTROU PILHA DESTINO', 'NAO FOI PARA A PILHA DESTINO', 'QUANTIDADE INVALIDA - TIPO EMBALAGEM']
    },
    {
        origin: 'ENTRADA DE NP',
        destinations: ['INFORMACÕES CEXP', 'INSERIU MODELO DA NP INCORRETO']
    },
    {
        origin: 'Erro em monitor CTG / COT',
        destinations: ['Fichas travadas no monitor COT', 'Fichas travadas no monitor CTG', 'Monitor COT não funciona', 'Monitor CTG não funciona'],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'Erro na Página ARBA / AFIP',
        destinations: ['Página AFIP inacessível', 'Página ARBA inacessível'],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'ERRO NA GERACAO ROYATIES',
        destinations: ['ADDRESS BOOK - CADASTRO CP CR', 'GERACAO DE RELATORIO COM BP INCORRETA']
    },
    {
        origin: 'ESTADA NAVIO',
        destinations: ['STATUS ESTADA MISSING', 'ESTADA NOT APPEARING ESTADA NAVIO'],
        rules: [{1: 'PORTUS'}]
    },
    {
        origin: 'ESTADA NAVIO',
        destinations: ['DELETE ESTADA', 'ESTADA NOT APPEARING ESTADA NAVIO', 'STATUS ESTADA MISSING'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'EXECUCAO',
        destinations: ['RD GERADO NAO APARECE PARA CONSULTA', 'VERSAO AGENDADA COM FILTRO INCORRETO']
    },
    {
        origin: 'EXECUCAO DE FRETES',
        destinations: ['VALOR DE FRETE INCORRETO']
    },
    {
        origin: 'EXECUCAO RELATORIO',
        destinations: ['EXECUTADO EM MODO FINAL INDEVIDAMENTE', 'LENTIDAO']
    },
    {
        origin: 'EXPOSURE',
        destinations: ['LINHAS DE SALDO INDEVIDAS', 'MARCAR LINHA R', 'MODALIDADE DE PAGAMENTO INCORRETA', 'PAGAMENTOS COM DATA DIVERGENTE OG O9', 'SLIPS PENDENTES TIPO 10 NAO SOBEM', 'SPLIT DE CONTRATO COM SALDO DO CONTRATO ORIGINAL', 'USUARIO CONSIDEROU CAK COMO LIQUIDADO INDEVIDAMENTE', 'X1 E V4 NAO APARECEM', 'X1 E V4 NAO CHEGARAM NA BASE']
    },
    {
        origin: 'EXTERNAL AUDITTING ACCESS',
        destinations: ['EXTERNAL USERS']
    },
    {
        origin: 'EXTRACAO DE DADOS',
        destinations: ['CONSULTA ARCHIVE', 'CONSULTA NA BASE DE DADOS']
    },
    {
        origin: 'FACTURA DATOS',
        destinations: ['CORRECCION EAN', 'ELIMINAR DOCUMENTOS', 'SALDO INCORRECTO']
    },
    {
        origin: "FACTURACION MASIVA",
        destinations: ['CONTROL DE ORDENES FACTURADAS']
    },
    {
        origin: "FACTURACION",
        destinations: ['COE INCORRECTO', 'J7', 'ORDEN RETENIDA', 'SCHEDULER']
    },
    {
        origin: 'FACTURACION ELECTRONICA - SETUP',
        destinations: ['CAMBIO DE LA FACTURA', 'CAMBIO PERIODO P55AR385-P55AR386-P55AR387-P55AR388']
    },
    {
        origin: 'FATURAMENTO',
        destinations: ['FALTA PARAMETROS PARA GERACAO DE PEDIDO F5', 'JUROS INCORRETO NA TELA DE CONFIRMING', 'PRECO VQ DIFERE DE PRECO DO CONTRATO']
    },
    {
        origin: 'FETHAB - PROBLEMAS IMPOSTOS AGRICOLAS',
        destinations: ['CADASTRO INCORRETO/FALTA CADASTRO', 'CONFIGURACAO JOB INCORRETO', 'RATEIO DE FICHA SEM FETHAB']
    },
    {
        origin: 'FICHA',
        destinations: ['ADDRESS BOOK REGISTERED INCORRECTLY', 'DELETE', 'DEVICE SERVER CLOSED', 'DRIVER INCORRECT REGISTERED', 'DRIVER WITHOUT PHONE', 'ERROR CREATION FICHA', 'FICHA IS NOT PRINTED AUTOMATICALLY', 'INCORRECT PLATE ON FICHA CREATION', 'INCORRECT PRODUCT IN FICHA', 'NO SUPPORT ACTION', 'REGISTER OF DRIVER LOCKED', 'SACARIA WRONG INPUT ADDED', 'SMARTCARD APPLICATION ERROR', 'TWO DEVICE SERVERS OPENED', 'VEHICLE TYPE REGISTERED INCORRECTLY', 'WRONG BUSINESS UNIT', 'WRONG OPERATION TYPE'],
        rules: [{1: 'RDS', 3: 'BRAZIL'}]
    },
    {
        origin: 'FICHA',
        destinations: ['ADDRESS BOOK REGISTERED INCORRECTLY', 'DELETE', 'ERROR CREATE RDS FICHA', 'ITEM NOT REGISTERED IN THE CORPORATE', 'NO SUPPORT ACTION', 'RDS FICHA NOT INTERFACED'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'FICHA - FOB FARM',
        destinations: ['DISPATCH FICHA WITHOUT WEIGHT ROW', 'FOB FAZENDA STEP NOT EXECUTED']
    },
    {
        origin: 'FICHA - PROCESO DE COMPRA',
        destinations: ['NO COMPRA - CONTRATO NO ESTA EN VIGENCIA', 'NO COMPRA - FICHA O CONTRATO NO SUSTENTABLE', 'NO COMPRA - Ficha no creada. Doc Retiro Cancelado', 'NO COMPRA - EJECUCION DEL BATCH MANUALMENTE', 'LENTITUD EN EL JOB COMPRA - R554314A', 'SUPPORT - RELACIONAR BPS DE DESCARGA', 'NO COMPRA - Ficha OH no creada. Doc Retiro E0 cancelado', 'NO COMPRA - BP Compra distinto de la ficha', 'NO COMPRA - BP RELACIONADA', 'NO COMPRA - Cliente bloqueado para aplicar', 'NO COMPRA - Contrato NPE sin Precio Fijado', 'NO COMPRA - CosechaTp Vend/Trans Invalidos', 'NO COMPRA - Ficha Comprometida Anticipo / Retiro', 'NO COMPRA - Ficha E1 sin Calidad y Boletin', 'NO COMPRA - FICHA X CONTRATO SUSTENTABLE', 'NO COMPRA - Nenhum contrato para aplicar', 'NO COMPRA - Vendedor con AB Bloqueado', 'OH GERADA PERO NO APLICA']
    },
    {
        origin: 'FICHA - RECEPTION',
        destinations: ['ADDRESS WITH TWO DIFF PARENTS', 'ADDRESSBOOK - ADDRESS LOCKED IN JDE', 'ADDRESSBOOK - PARENT ADDR WITHOUT CHILD', 'FICHA DATE AS NULL VALUE', 'FICHA DISCONT VALUE = 0', 'FICHA DO NOT ADVANCE STEP', 'FICHA DO NOT GENERATE OH WITH REINTERFACE', 'FICHA DO NOT INTERFACED TO OW', 'FICHA IS NOT BEING SENT TO INTERFACE', 'FICHA MODIFIED IN RDS DOES NOT INTERFACE', 'FICHA WITHOUT QRCODE', 'FICHAS CANNOT BE EXCLUDED', 'FREIGHT KNOWLEDGE WRONG INPUT', 'FRETE TYPE MISSING ON DOCUMENT DATA', 'INACTIVE VEHICLE', 'INCORRECT ADDRESS INPUT', 'NF AS TON UNIT MEASURE', 'NFE DANFE NOT INFORMED', 'NFE EMISSION DATE WRONG INPUT', 'NFE VALUES REGISTERED INCORRECTLY', 'PARENT ADDRESS VALUE ZERO', 'VINCULACAO TARDIA NOT INTERFACE FICHAS', 'WEIGHT INCORECT APPORTIONMENT']
    },
    {
        origin: 'FICHA - SHIPPING',
        destinations: ['2+ LOAD LINES AT SAME FICHA REPORT', 'CANNOT EDIT FICHA WITHOUT LOAD', 'DO NOT SHOWS FICHA NUMBER IN VEHICLE ENTRY', 'ERROR IN EXCLUSION INTEGRITY CONSTRAINT', 'FICHA HAS INCORRECT DISCOUNT VALUES', 'FICHA HAS WRONG VL LIQUIDO UMIDO', 'FICHA TRAVADA EM PASSO DE SEGUNDA PESAGEM', 'FICHA WITHOUT LOAD', 'FICHA WITHOUT LOAD DETAIL', 'FICHA WITHOUT SMARTCARD', 'FINALIZED FICHA WITHOUT SECOND WEIGHT ROW', 'INCORRECT BP IN LOAD', 'INCORRECT LOAD NUMBER ASSOCIATE', 'LOAD DATA DO NOT APPER AUTOMATICALLY', 'LOAD STATE 90', 'REQUEST FOR LOAD CANCELLETION']
    },
    {
        origin: 'FICHA B2B',
        destinations: ['NO SE PUEDE ANULAR', 'ASOCIAR FICHA AL LOAD', 'FICHA B2B NO TRAE CANCEL LINE EN E1', 'FICHA DIFERIDO COM ERROS NA STAGE RDS', 'FICHA CEREALNET COM ERROS NA STAGE RDS'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'FICHA BLOQUEADA - F5543028',
        destinations: ['FICHA PRESA NA F5543028']
    },
    {
        origin: 'FICHA DE CIRCULACAO',
        destinations: ['CFOP NULO', 'CRIACAO OH FALHA EXECUCAO SERVIDOR', 'FICHA APLICADA COM STATUS INCORRETO', 'FICHA NAO APARECE NA TELA PARA APLICAR']
    },
    {
        origin: 'FICHA COMPRA OH',
        destinations: ['NO APLICADAS A CONTRATO DE COMPRAS', 'FICHA DUPLICADA', 'FICHA FALTA LINHA (INCLUSION/ REVERSION) DA FICHA NO STOCK', 'FICHA OH NO INGRESA DESDE RDS', 'DESAPLICACION DE FICHA'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'FICHA INCORRETA',
        destinations: ['ALTERAR STATUS PARA CANCELADA', 'CADASTRO INCORRETO UDC 55BR VT', 'CADASTRO INCORRETO/FALTA CADASTRO', 'CHAVE DE ACESSO INCORRETA', 'DATAS DE FICHA INCORRETAS', 'DIVERGENCIA EM PRECO PAUTA', 'ERRO AO ALTERAR NF DE OH EXISTENTE', 'F5576201 NFNFENUDF INCORRETO', 'FICHAS BSER EM BRANCO', 'MODELO DE NF INCORRETO', 'NAO HOUVE O MANIFESTO DESTINATARIO AUTO', 'NUMERO DA NF INCORRETA', 'PRECO UNITARIO E VALOR DE FICHA INCORRETA', 'RATEIO DISTRIBUI VOLUMES INCORRETAMENTE', 'VALOR BASE ICMS INDEVIDA', 'VALORES INCORRETOS DESCONTO QUALIDADE', 'VALORES INCORRETOS NO CARDEX']
    },
    {
        origin: 'FICHA NAO APLICA',
        destinations: ['ADDRESS BLOQUEADO', 'ALTERACAO DA UNIDADE DE MEDIDA', 'BP CADASTRADA NA UDC 55BR BN', 'BP DA FICHA DIFERE DA BP DO CAK', 'CFOP NAO BATE COM O CONTRATO EXPORTACAO', 'CHAVE DE ACESSO COM CPF DO PRODUTOR', 'CHAVE DE ACESSO DUPLICADA', 'CNPJ INVALIDO', 'CONTRATO NAO APARECE NA TELA DE PRIORIDADE', 'CONTRATO PRESO EM TABELA TEMPORARIA', 'CONTRATO VINCULADO A FICHA', 'ERRO DE CONTABILIZACAO', 'ERRO NA SELECAO DE DADOS', 'FALTA CADASTRO DE AAI', 'FALTA INFORMACÕES FRETE', 'FICHA COM MENOS DE UM KG NAO APLICA', 'FICHA DIFERE DO CONTRATO', 'JOB EXECUTADO COM ERRO', 'LINHA 2000 DA FICHA DIFERE DO CAK', 'NF INFORMADA EM OUTRA FICHA', 'RATEIO - FICHA VEIO INCORRETA DO RDS', 'SALDO DA FICHA > QTD EM ABERTO DO CAK', 'STATUS DO CAK = C', 'SUPPLEMENTALDATA - CQ TOLERANCE', 'VALIDACAO DE CHAVE DE ACESSO', 'VOL DA FICHA EXCEDE PERMISSAO DO EXCESSO', 'VOLUME FORA DO RANGE CADASTRADO'],
        rules: [{1: 'FICHA', 2: 'ORIGINATION', 3: 'BRAZIL'}]
    },
    {
        origin: 'FICHA NAO REVERTE',
        destinations: ['APLICACAO JA FIXADA', 'CADASTRO AAI', 'ERRO SERIALIZACAO TABELAS', 'FICHA COM STATUS INCORRETO', 'LINHA O4 NAO DELETADA DA F4311 APOS REVERSAO', 'NOTA GERADA PARA A FICHA', 'STATUS DA FICHA NAO RETORNOU APÓS REVERSAO DA NOTA', 'NOTA COM 7 DIGITOS']
    },
    {
        origin: 'FICHA OCR REPORT',
        destinations: ['BALANCA OCR STOPPED FICHA OCR REPORT', 'OCR INTERFACE ISSAUTOMATIC PES FICHA OCR REPORT', 'TIBCO BALANCA OCR STOPPED FICHA OCR REPORT']
    },
    {
        origin: "FICHA OH",
        destinations: ['ANULACION', 'ASOCIAR A LOAD', 'FICHA SIN APLICAR']
    },
    {
        origin: 'FICHA SERVICIO E1',
        destinations: ['ANULACION DE FICHA RDS NO ANULA E1', 'ANULACION DE FICHA ERRO PARA ANULAR NO RDS', 'NO APLICADA A CONTRATO DE ARMAZENAGEM', 'NO GENERA FICHA EN E1', 'FICHA CON AB DEL CLIENTE INCORRECTO', 'FICHA BLOQUEADA', 'FECHA DE VENCIMIENTO DE LOTE INCORRECTA', 'FICHA DUPLICADA', 'FICHA FALTA LINHA (INCLUSION/ REVERSION) DA FICHA NO STOCK', 'DESAPLICACION DE FICHA', 'FICHA BLOQUEADA POR CONTRATO DE ANTICIPO'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'FICHA SERVICIO E1 - ERROR APLICACION',
        destinations: ['No tiene Tarifas en Catalogo de servicio', 'No hay KM Catastrados En la CATAC', 'BP / Procduto / Cosecha - No tiene catalogo standard cargado', 'No Tiene Certificación para esta ficha', 'Falta Boletin de Calidad de los rubros obligatorios de la ficha B2B', 'AB Bloqueado por Localidade', 'la ficha NO TIENE KM', 'FICHAS NO SE ASOCIAN A PACK CARGADO'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: "FIJACION DE PRECIO",
        destinations: ['ERROR CON PRECIO', 'NO APARECE PEDIDO']
    },
    {
        origin: 'FIXACAO MATA MATA',
        destinations: ['COMP LINHA AUSENTE EM F5543085', 'DECIMAIS DE PRECO UNITARIO INVALIDO', 'DESTINACAO E MODAL DIFEREM DO SLIP ORIGEM', 'EFETIVACAO COM ERRO DE VERSAO INVALIDA', 'ERRO AO EFETIVAR SLIP', 'ERRO ARREDONDAMENTO CUSTO UNITARIO', 'MATA MATA CANCELOU VOLUME MAIOR QUE DISPONIVEL', 'MATA MATA CONSUMIU LINHA JA FIXADA', 'MATA MATA CONSUMIU SALDO RESERVADO A SLIP PENDENTE', 'MATA MATA PARCIAL', 'NAO CRIADO SLIP DE CANCELAMENTO', 'QUANTIDADE SLIP ORIGEM INVALIDA', 'SALDO NAO RETORNOU DEPOIS DA REVERSAO', 'TIPO FIXACAO INCORRETO']
    },
    {
        origin: "FLETE",
        destinations: ['FACTURA DE FLETE (XZ)', 'FLETE ENGANCHADO', 'REVERSION PAGOS DE FLETE']
    },
    {
        origin: "FM",
        destinations: ['EXLUSAO CIGENCIA']
    },
    {
        origin: "FM - ACESSO BP",
        destinations: ['ERRO NA CHAVE SEFAZ']
    },
    {
        origin: "FM - CADASTRO",
        destinations: ['SUPORTE AO USER - CADASTRO']
    },
    {
        origin: "FM - CALCULO",
        destinations: ['ERRO DE CALCULO', 'LOAD NAO ESTORNA', 'LOCAL DE ENTREGA INCORRETO']
    },
    {
        origin: "FM - CLOSING CTE",
        destinations: ['DONT AUTOMATIC CLOSING', 'FALHA INTEGRACAO', 'ERROR SEND XML']
    },
    {
        origin: "FM - CONHECIMENTO",
        destinations: ['SEM LOAD']
    },
    {
        origin: "FM - CONTABILIDADE",
        destinations: ['INTERFACE']
    },
    {
        origin: "FM - CTE",
        destinations: ['ERRO IMPUT DOCUMENTO']
    },
    {
        origin: "FM - ERRO FRETE EXTRA",
        destinations: ['FRETE EXTRA']
    },
    {
        origin: "FM - EXCLUSAO CTE",
        destinations: ['DOC INVALIDO']
    },
    {
        origin: "FM - FATURA",
        destinations: ['FATURA SEM INTERFACE A9', 'INCORRECT VALIDATION OF FATURA', 'NO AUTOMATIC FATURA CT', 'WITH NO INTERFACE A9']
    },
    {
        origin: "FM - FREIGTH TABLE",
        destinations: ['UPLOAD FREIGHT TABLE']
    },
    {
        origin: "FM - FRETE EXTRA",
        destinations: ['DATA INICIO CTE > DATA DE EMISSAO', 'SEM PRE FATURA', 'UR-EXCLUSAO DE CONHECIMENTO', 'UR-EXCLUSAO DE DESPESA EXTRA', 'UR-INCLUSAO DE DESPESA EXTRA']
    },
    {
        origin: "FM - GENERATION CTE",
        destinations: ['CTE DATA VALIDATION']
    },
    {
        origin: "FM - INTERFACE",
        destinations: ['TIBCO FICHA INTERFACE', 'MASTERDATA - TW NOT ACCOUNTED', 'TIBCO LOAD INTERFACE', 'LOAD INTERFACE', 'INCORRECT NF VALUE', 'LOCAL DE COLETA BLANK', 'SUPPORT - NCM PARAMETERIZATION', 'CNPJ FORMATO INVALIDO', 'NF DUPLICATED FOR ANOTHER LOAD', 'ERRO ADDRESS LOCAL DE ENTREGA', 'LOAD WITH MORE 120 DAYS']
    },
    {
        origin: "FM - LOAD/CTE",
        destinations: ['SEM PRE FATURA']
    },
    {
        origin: 'FM - LOAD/FICHA',
        destinations: ['LOAD/FICHA NAO INTEGRADO', 'LOAD/FICHA NAO CALCULADO', 'LOAD/FICHA NAO ENVIADO AO CTMS', 'LOAD/FICHA COM INDICADOR DE QUEBRA INCORRETO', 'LOAD/FICHA INTEGRADO COM DADOS INCORRETOS', 'LOAD/FICHA INTEGRADO SEM DADOS DO TRANSPORTADOR', 'LOAD/FICHA INTEGRADO COM DADOS DE ORIGEM ICORRETO', 'LOAD/FICHA INTEGRADO COM DADOS DO DESTINO INCORRETO', 'LOAD/FICHA INTEGRADO COM PESO ORIGEM ERRADO', 'LOAD/FICHA INTEGRADO COM NOTA QUE JA EXISTE NO CTMS', 'LOAD/FICHA INTEGRADO SEM CONTA CONTABIL', 'LOAD/FICHA INTEGRADO SEM DADOS DE ORIGEM', 'LOAD/FICHA INTEGRADO SEM DADOS DO DESTINO', 'LOAD /FICHA INTEGRADO COM DADOS DO PRODUTO/NCM INCORRETO', 'LOAD/FICHA CANCELADO NO JDE', 'LOAD/FICHA  CANCELADO NO CTMS', 'LOAD/FICHA PROBLEMA TN', 'LOAD/FICHA PROBLEMA ORDEM DE COLETA', 'LOAD/FICHA PROBLEMA FOB', 'LOAD/FICHA PROBLEMA CIF', 'LOAD/FICHA  SOLICITAÇAO DE CANCELAMENTO', 'LOAD/FICHA SOLICITAÇAO DE EXCLUSAO', 'LOAD/FICHA - ERRO NAO CATALOGADO']
    },
    {
        origin: "FM - OH INTERFACE",
        destinations: ['FICHA ENVIADA NAO CHEGOU NO CTMS']
    },
    {
        origin: "FM - OH NOT SENT TO CTMS",
        destinations: ['FICHA APPLIED WRONGLY']
    },
    {
        origin: "FM - PESO DESTINO CT",
        destinations: ['INTERFACE']
    },
    {
        origin: "FM - PRE FATURA",
        destinations: ['INCORRECT DISCOUNT', 'JOB PRE-FATURA STOP', 'WITHOUT OCCURRENCE DATE', 'WD- PREFATURA WAS NOT CREATED AUTOMATICALLY']
    },
    {
        origin: "FM - RELATORIO ANALISTICO",
        destinations: ['SEM CTE']
    },
    {
        origin: "FM - REPOM",
        destinations: ['CHANGE LOAD PARAMETER REPOM = N']
    },
    {
        origin: "FM - REPORT",
        destinations: ['ERROR', 'REPORT CONTABIL', 'REPORT CONTABIL ERROR']
    },
    {
        origin: "FM - TDE",
        destinations: ['ERRO IMPORTACAO']
    },
    {
        origin: "FM - TN",
        destinations: ['ERRO AO ASSIGNAR']
    },
    {
        origin: "FREIGHT - TR",
        destinations: ['ERRORS IN TR-TW INTERFACE', 'TIBCO/ INTERFACE TR-TW', 'TR CANCELLED']
    },
    {
        origin: "FREIGHT -DIVERGENT",
        destinations: ['INCORRECT ACCOUNT NUMBER', 'APPLIED INCORRECTLY', 'INCORRECT DOCUMENT IN CARDEX']
    },
    {
        origin: 'FTS',
        destinations: ['CONTRATO NAO ENVIADO PARA A F5560101', 'CONTRATOS ENVIADOS DO FTS INCORRETAMETE', 'ESTORNO FTS INDEVIDO', 'PORTO INCORRETO', 'CONTRATO NAO ENVIADO PARA A F5560103'],
        rules: [{1: 'ACCOUNT', 2: 'ORIGINATION'}]
    },
    {
        origin: 'FTS',
        destinations: ['ILLPNU Y ILASID NO ESTAN SIENDO GRAVADOS EN CARDEX'],
        rules: [{1: 'PLANTS & OPERATIONS', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'FUNDEINFRA NÃO GERADO',
        destinations: ['VERSAO FUNDEINFRA GENERATE DE NOTAS']
    },
    {
        origin: 'FUNDERSUL- PROBLEMAS IMPOSTOS AGRICOLAS',
        destinations: ['RELATORIO COM DADOS DE BP INDEVIDA']
    },
    {
        origin: 'FUNRURAL - PROBLEMA IMPOSTOS AGRICOLAS',
        destinations: ['ALIQUOTA DESCONSIDERA LIMINAR', 'AVANCOU STATUS SEM GERAR FUNRURAL', 'CADASTRO INCORRETO/FALTA CADASTRO', 'FUNRURAL GERADO PARA COMPL. NOTA', 'FUNRURAL NAO AVANCOU STATUAS', 'LIMPEZA RELATORIO FUNRURAL', 'R5576030 GERACAO FUNRURAL SEM LIMINAR', 'VALOR DE IMPOSTO INCORRETO FIXACAO', 'VERSAO FUNRURAL GENERATE DE NOTAS']
    },
    {
        origin: 'GARANTIAS',
        destinations: ['ERRO COTACAO NAO ENCONTRADA']
    },
    {
        origin: "GDRWEB",
        destinations: ['II – GDR SLOWNESS', 'NEW BRANCH REGISTER']
    },
    {
        origin: "GENERATE REPORT",
        destinations: ['ERROR ON NEW TRADE ANALYTICAL']
    },
    {
        origin: 'GERACAO CONTRATO',
        destinations: ['ADDRESS DA FAZENDO INCORRETO', 'ADDRESS ERRO PARAMETRIZACAO', 'BP FALTA PARAMETRIZACAO', 'CONTRATO NAO ENVIADO POR EMAIL', 'FINALIDADE FISCAL INCORRETA', 'GERACAO DE CONTRATO INDEVIDO', 'MEDIA PONDERADA EM CUSTO NEGATIVO', 'NAO EXISTE LINHA DO PEDIDO NA F4311', 'NAO GERA CAK - FINALIDADE ERRADA', 'PEDIDO SUSPENSO', 'VALOR CPR DIFERENTE CONTRATO']
    },
    {
        origin: 'GERACAO DE PILHA',
        destinations: ['NAO GERA PILHA NOVA']
    },
    {
        origin: 'GERACAO DE ROYALTIE',
        destinations: ['USER - PARAMETRIZACAO DO JOB']
    },
    {
        origin: 'GERACAO NFE',
        destinations: ['ADDRESS BOOK - ADDRESS BLOQUEADO', 'ADDRESS BOOK - CAMPO C30 INCORRETO', 'AJUSTE VERSAO DO JOB', 'ALTERAR CST', 'CHAVE DE ACESSO COM PROBLEMAS', 'CRIACAO DE OW NAO ACEITA CPF', 'DATA DE EMISSAO MES ANTERIOR', 'DOCO = 0 F4311 TARE', 'EMITENTE INCORRETO', 'ENVIO DE EMAIL SERIE 51', 'ERRO:NF JA ESCRITURADA NOUTRO RECEBIMENT', 'FALTA INFOMACÕES COMPLEMENTARES', 'FALTA NOTA REFERENCIADA NAS INFOS COMPLEMENTARES', 'FINALIDADE INDEFINIDA BINM = BLANK', 'GERA CONTRA NOTA PARA PJ', 'GERACAO DE CONTRA NOTAS INDEVIDAS', 'GERACAO DE V8 - SERIE 51', 'GERACAO NOTA TRANSFERENCIA PRODUTOR', 'ICMS DVCP INCORRETO', 'LIMPEZA DE ERROS EM RELATORIO', 'MASTERDATA - NOTA NAO GERADO PARA FIXACAO - BP CATCODE38', 'NF COMPLEMENTO SEM CABECALHO', 'NF DE UMA CIA FISCAL COM CNPJ DE OUTRA', 'NF GERADA CIA INCORRETA', 'NF NAO GERA - CALCULO CDO PRODUTO ERRADO', 'NF NAO GERA - FALTA COMPLEMENTO', 'NF NAO GERA - FICHA EM APLICACAO', 'NF NAO GERA FALTA CADASTRO AAI', 'NF SEM NOTA REFERENCIADA', 'NF-E SEM DATA DE EMISSAO', 'NFP + 6 DIGITOS CORTANDO CONTRA NOTA', 'NFP GERADA NA NUMERACAO INCORRETA', 'NFP REFERENCIADA SEM O PRIMEIRO DIGITO', 'NOTA GERADA COM VALOR ZERO', 'NOTAS BONUS FUMACA NR INCORRETO', 'NOTAS DE RATEIO - CORTA PRIMEIRO DIGITO', 'O4 SEM DADOS NA F7601B', 'O4 SEM QUANTIDADE E VALOR 1 CENTAVO', 'PARAMETRO INCORRETO - R5576034', 'STATUS INCORRETO - F43121', 'STATUS INICIAL-NOTA/XML NAO GERADO', 'TAXSET - PARAMETRIZACAO DE IMPOSTOS', 'VERSAO - CRIACAO DE JOB', 'XML STOPPED IN INITIAL STATUS']
    },
    {
        origin: "GL",
        destinations: ['APB - DOCUMENTO SUMARIZADO SEM INTERFACE', 'CHANGE BATCH TYPE - KT DOC', 'DOC FLAGGED WITH INTERFACE JOB BUT DIDN’T ENTER ON A9', 'SUBACCOUNT BLANK OR INVALID', 'XA GENERATED WRONGLY']
    },
    {
        origin: 'HEDGE POSITION',
        destinations: ['SALDO DE TICKET FUTURO INDEVIDO']
    },
    {
        origin: 'Humedímetro',
        destinations: ['Alterar descrição do humedímetro', 'Configuração de string de humedímetro', 'Mudar humedímetro de PC', 'Não captura valores de humidade', 'Nova configuração de humedímetro', 'Problema de conexão física com humedímetro', 'Problema físico no humedímetro', 'Valores de humidade incorretos'],
        rules: [{1: 'Automação', 2: 'RDS WEB'}]
    },
    {
        origin: 'IMPRESSAO DE CONTRATO',
        destinations: ['ADITIVO ADTO C/JUROS - CAK FIXO EM REAIS NAO CADASTRADO', 'ALTERACAO DE CLAUSULAS', 'ANO INCORRETO PARA FIXACAO SPREAD', 'DESCONFIGURADO COM GRANDE ESPACAMENTO', 'LENTIDAO JOB', 'MASTER DATA - UDC AGRICULTURA FAMILIAR', 'NP NAO E IMPRESSA', 'VALOR EM EXTENSO INCOMPLETO']
    },
    {
        origin: 'IMPRESSAO DE CONTRATO COM ERRO',
        destinations: ['ADITIVO DE FIXACAO COM CIFRA INCORRETA', 'ADITIVO PRECO COM VOLUME INCORRETO', 'AREA DE FAZENDA INCORRETA CPR', 'DATA DE PAGAMENTO INCORRETO', 'DOCUSIGN - IMPRESSAO DO CAK INCORRETO', 'ERRO IMPRESSAO IMEDIATA', 'INTERVENIENTE GARANTIDOR CPR INCORRETO', 'NAO IMPRIME ADITIVO CUSTO', 'PRECO DO CONTRATO INCORRETO', 'PRECO UNITARIO DO SLIP NAO IMPRIMINDO EM REAIS', 'VALOR ADIANTAMENTO INCORRETO']
    },
    {
        origin: 'Impressora',
        destinations: ['Datamax - Configuração de nova impressora', 'Datamax - Impresora não compartilhada', 'Datamax - Impressora não funciona', 'Laser - Configuração de nova impressora', 'Laser - Impresora não compartilhada', 'Laser - Impressora não funciona'],
        rules: [{1: 'Automação', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'INCLUSAO AUTOMATICA',
        destinations: ['INTERFACE'],
        rules: [{1: 'CTMS'}]
    },
    {
        origin: 'INCONSISTENT DATA ON REPORT',
        destinations: ['DESTINATARIO INCORRETO', 'REPORT DE ANALISIS (FALHA SUBQUERY)', 'STOCK DIVERGENCE - ADJUSTS WITH INCORRECT'],
        rules: [{2: 'BOLTONS'}]
    },
    {
        origin: 'INCONSISTENT DATA ON REPORT',
        destinations: ['NO BAJABAN LAS LINEAS DE UN ID X1 SE REPETIAN'],
        rules: [{2: 'SAP BO - REPORTES'}]
    },
    {
        origin: 'INFRA',
        destinations: ['PERFORMANCE'],
        rules: [{1: 'MASTERSAF'}]
    },
    {
        origin: 'INSTALLATION AND CONFIGURATION',
        destinations: ['ADDRESSBOOK NOT INTERFACED RDS X JDE', 'ALLOW RDS OFFLINE', 'CFOP NOT PARAMETRIZED', 'CHANGE OF PARAMETER ON OPERATION TYPE', 'CHANGE PRINTER DEFAULT', 'CRYSTAL RPT N INSTALLED', 'DATETIME WRONG FORMAT', 'DEVICE SERVER PORT CONFIG', 'INCORRECT CONFIGURATION INTERFACE OFFILINE', 'INCORRECT DRIVER PRINTER', 'INCORRECT NUMBER FORMAT IN MACHINE', 'INCORRECT PRINTER CONFIGURATION', 'INCORRECT SETUP ON OPERATION TYPE', 'INCORRECT VERSION OF PP.EXE', 'INCORRECT VERSION ORACLE', 'INCORRECT VERSION RDS', 'INSTALL PANEL LOGISTICS', 'INSTALL RDS', 'MACHINE SHOWING SLOWNESS', 'NEW DEVICE GAC CONFIG', 'NEW WEIGHING MACHINE CONFIG', 'NO SUPPORT ACTION', 'NUMERATOR OUTDATED', 'PANEL DOES NOT SHOW EFFECT STEP.', 'PAPER TYPE AS LETTER INSTEAD OF A4', 'PRINTER DRIVER NOT CONFIGURATED', 'PRINTER NOT APPEAR IN CITRIX', 'QR CODE REGISTER', 'SLOWNWSS DUE TO NEGTIVE WEIGHING', 'STRING NEGATIVA', 'TNS CONFIG', 'USER PROCESS LOCK']
    },
    {
        origin: 'INSUMOS',
        destinations: ['FICHAS SIN CALIDAD', 'SALDO V$ PARA DESPACHO', 'VA NO GENERA V$ POR EL PENDIENTE DE REMITIR', 'VA NO GENERA V$ POR HACIENDA BLOQUEADA']
    },
    {
        origin: 'INTERFACE',
        destinations: ['DIFFERENT BP ON JDE'],
        rules: [{1: 'ARIBA'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'ADDRESS BOOK - ADDRESS NOT REGISTER',
            'ADDRESS IDENTIFIER IDENT_FIS_JUR INCORRECT',
            'ADDRESS IDENTIFIER IDENT_FIS_JUR INVALID',
            'AUTHORIZED FREIGHT NOT IN INT_TB',
            'CTRC CANCELLED IN CTMS',
            'EXPORT INVOICES NOT SENT TO MASTERSAF',
            'EXTRA INTERFACE CTMS X MSAF',
            'FISCAL - ACCOUNTING ACCOUNT REGISTRATION',
            'FISCAL - IMPORT CONFIGURATION',
            'IMPORT SAFX01',
            'INCORRECT USER VALIDATION',
            'IND_PROD NULL IN EXPORT INVOICES',
            'INTERFACE SAP X MSAF',
            'INVALID INVOICES',
            'INVOICES NOT FOUND ON JDE TEMP TABLES',
            'INVOICES NOT FOUND ON TEMP TABLES (SAP)',
            'INVOICES WITH DOCUMENT TYPE NULL (JDE)',
            'INVOICES WITH INCORRECT TAX PURPOSE',
            'INVOICES WITH INVALID CIA (SAP)',
            'JDE - UNDUE INVOICES',
            'MASTERDATA - ADDRESS WITH INCORRECT UF COD',
            'MASTERDATA - ADDRESS WITH RETROACTIVE DATE',
            'MASTERDATA - INVOICES WITH INVALID ADDRESS (SAP)',
            'NF ANNULLED IN CTMS',
            'NF CANCELLED IN CTMS',
            'NF CANCELLED IN JDE',
            'NF EXPORT - NO PRINT MEMORANDUM'
        ],
        rules: [{1: 'MASTERSAF'}]
    },
    
    {
        origin: 'INTERFACE',
        destinations: ['EMAIL'],
        rules: [{1: 'TIBCO', 2: ['INTERFACE TIBCO/DATA MIRROR', 'INTERFACE TIBCO/OPENTEXT']}]
    },
    {
        origin: 'INTERFACE',
        destinations: ['Carta porte - Carta Porte duplicada', 'Carta porte - Interveniente não cadastrado', 'Carta porte - Produto não cadastrado', 'Duplicidade de itens - Duplicidade de itens de produtos', 'Duplicidade de itens - Duplicidade de itens de qualidade', 'Duplicidade de itens - Duplicidade de produtos', 'Inciso incorreto'],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'INTERFACE',
        destinations: ['Erro de envio de peso ao E1 - Erro de dados', 'Erro de envio de peso ao E1 - Erro de preenchimento de ficha', 'Ficha não enviada ao E1', 'FICHA PROCESSADA NO RDS, MAS NÃO CARREGADA EM E1'],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'INTERFACE',
        destinations: ['FICHA PROCESSADA NO RDS, MAS NÃO CARREGADA EM FTS'],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: 'BOLIVIA'}]
    },
    {
        origin: 'INTERFACE - RG1620',
        destinations: ['MONITOREO DE ARCHIVOS'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS', 3: 'ARGENTINA'}]
    },
    {
        origin: 'INTERFACE A9',
        destinations: ['NAO GEROU F0911', 'OV COM VALOR INCORRETO NO A9']
    },
    {
        origin: 'INTERFACE AGROTOOL',
        destinations: ['ARCHIVO NO ENVIADO DE ORIGEM', 'PROBLEMAS CON MFT'],
        rules: [{1: 'ADDRES BOOK', 2: 'JDE A9 WS', 3: 'BRAZIL'}]
    },
    {
        origin: 'INTERFACE AP EN A9',
        destinations: ['EXECUCAO SIMULTANEA DE INTERFACE']
    },
    {
        origin: 'INTERFACE BANCO CITI',
        destinations: ['PROBLEMA MDW'],
        rules: [{1: 'ACCOUNTS PAYABLE', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'INTERFACE BANCOS',
        destinations: ['SLOWNESS']
    },
    {
        origin: 'INTERFACE CAMIONES',
        destinations: ['DOCUMENTOS CON ERROR EN LOS DATOS'],
        rules: [{1: 'ACCOUNTS PAYABLE', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'INTERFACE CARVAJAL',
        destinations: ['COMPLEMENTOS PENDIENTES DE TIMBRAR EN CARVAJAL'],
        rules: [{1: 'ACCOUNTS RECEIVABLE', 2: 'JDE A9 WS', 3: 'MEXICO'}]
    },
    {
        origin: 'INTERFACE CONCUR',
        destinations: ['DOCS NO LLEGARON EN JDE A9', 'PEDIDO DE INFORMACION']
    },
    {
        origin: 'Interface CPEAR',
        destinations: ['Não confirma CTG automaticamente'],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'Interface CEREALNET',
        destinations: ['Erro ou Lentidão na transmissão individual', 'Erro ou Lentidão na transmissão massiva'],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'INTERFACE CMM',
        destinations: ['ENVIO DE DATOS'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'INTERFACE CTMS',
        destinations: ['CONTABILIZACAO DE IMPOSTOS', 'DUPLICIDAD DE DOCUMENTO']
    },
    {
        origin: 'INTERFACE DE RETORNO',
        destinations: ['STATUS NAO RETORNOU JDE']
    },
    {
        origin: 'INTERFACE DETAIL',
        destinations: [
            'CTE WITH INCORRECT CITY',
            'FREIGHT WITH INCORRECT IND_FIS_JUR_TRANSP',
            'LINKING ASSETS CIAP',
            'MANUAL INCLUSION',
            'MASTERDATA - INVALID NCM ON ITEM',
            'MASTERDATA - INVALID PROD ON ITEM'
        ]
    },
    {
        origin: 'INTERFACE FIBI',
        destinations: ['PROBLEMA MDW'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS', 3: 'MEXICO'}]
    }, 
    {
        origin: 'INTERFACE FTS',
        destinations: ['DOCUMENTO RETENIDOS EN Z1'],
        rules: [{1: ['ACCOUNTING', 'ACCOUNTS PAYABLE', 'ACCOUNTS RECEIVABLE'], 2: 'JDE A9 WS'}]
    },
    {
        origin: 'INTERFACE GL EN A9',
        destinations: ['LINEAS PENDIENTES INTERFACE GL PARA A9']
    },
    {
        origin: 'INTERFACE JDE E1',
        destinations: ['FACTURAS SIN INTERFACE', 'SOLICITADO REENVIO'],
        rules: [{1: 'ACCOUNTING'}]
    },
    {
        origin: 'INTERFACE JDE E1',
        destinations: ['FACTURAS SIN INTERFACE'],
        rules: [{1: 'ACCOUNTS PAYABLE'}]
    },
    {
        origin: 'INTERFACE JDE E1',
        destinations: ['FACTURAS CON BOLETO INCORRECTO', 'FACTURAS SIN INTERFACE', 'FACTURAS RETENIDAS EN Z-FILE'],
        rules: [{1: 'ACCOUNTS RECEIVABLE'}]
    },
    {
        origin: 'INTERFACE JOB',
        destinations: ['JOB FAILURE', 'ME - Z-FILE MONITORING']
    },
    {
        origin: 'INTERFACE MASTERSAF',
        destinations: ['ENVIO DE DATOS']
    },
    {
        origin: 'INTERFACE NEOGRID X GDR',
        destinations: ['XML NOT RECEIVED TO GDR']
    },
    {
        origin: 'INTERFACE NIS',
        destinations: ['DATOS INCORRECTOS', 'DOCS NO LLEGARON EN JDE A9'],    
        rules: [{1: 'ACCOUNTS PAYABLE'}]
    },
    {
        origin: 'INTERFACE NOMINA',
        destinations: ['DATOS NO SE VEN EN JDE'],    
        rules: [{1: 'ACCOUNTING'}]
    },
    {
        origin: 'INTERFACE RDS',
        destinations: ['FICHA INTERFACEADA COM VALOR/QTDE INDEVIDA', 'NAO OCORRE INTERFACE DA FICHA']
    },
    {
        origin: 'Interface RDS - E1',
        destinations: ['Lentidão na interface com E1'],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'INTERFACE SOVI',
        destinations: ['LOTE DUPLICADO'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS', 3: 'PARAGUAY'}]
    },
    {
        origin: 'INTERFACE TAX MANAGER',
        destinations: ['PEDIDO DE INFORMACION'],
        rules: [{1: 'ACCOUNTS PAYABLE', 2: 'JDE A9 WS', 3: 'PARAGUAY'}]
    },
    {
        origin: 'INTERFACES SAP-TC2',
        destinations: ['DOCTOS NO SE VEN EN JDE'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'INTERFACES',
        destinations: ['REPROCESO DEL ARCHIVO FIBI'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS', 3: 'MEXICO'}]
    },
    {
        origin: 'INTERFAZ',
        destinations: ['ACCOUNT LOCKED', 'ADDRESS NOT UPDATED IN JDE', 'ADDRESS NOT UPDATED IN XE', 'CCT NOT INTERFACED TO JDE', 'DUPLICATED', 'INTERFACE JDE F5543030 STOPPED', 'INTERFACE PIPE', 'INTERFACE RDS X JDE STOPPED', 'JDE X RDS PRODUCTS ARE NOT INTERFACED', 'MASTERDATA CADASTRO DE PB', 'NEW ADDRESS NOT INTERFACED', 'NO SUPPORT ACTION', 'RUMO PAPERLESS X RDS', 'SAVIGENT X RDS INTEGRATION', 'STATUS QXFLAG STATUS 2', 'STATUS QXFLAG STATUS 3'],
        rules: [{1: 'RDS'}]
    },
    {
        origin: 'INTERFAZ',
        destinations: ['PIPE INTERFACE', 'PORTUS INTERFACE', 'RDS INTERFACE', 'RONDA INTERFACE', 'SERVICE INTERFACE RFB STOPPED', 'TIBCO INTERFACE RECINTO'],    
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'INTERFAZ',
        destinations: ['BOOMI INTERFACE', 'NO SUPPORT ACTION', 'PIPE INTERFACE', 'RDS INTERFACE', 'RECINTO INTERFAZ', 'RONDA INTERFACE', 'RTDUET INTERFACE', 'SERVICE INTERFAZ UNI STOPPED'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'INTERFAZ COBRANZAS',
        destinations: ['FALTA ACCESO A LIBRERIA'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS', 3: ['ARGENTINA', 'PARAGUAY']}]
    },
    {
        origin: 'INUTILIZACAO/CANCELAMENTO NF',
        destinations: ['CANCELAMENTO EXTEMPORÂNEO', 'CONFIRMADO RECEBIMENTO NF', 'INUTILIZACAO COM PAGAMENTO EFETUADO', 'NOTA FISCAL NAO FOI IMPRESSA', 'NOTA REVERTIDA, STATUS INCORRETO', 'REALIZAR INUTILIZACAO NO NEOGRID', 'STATUS CANCELAMENTO INCORRETO', 'NAO RETORNOU STATUS NF INUTILIZADA', 'USUARIO NAO TEM ACESSO']
    },
    {
        origin: 'INVALID BALANCE',
        destinations: ['INCORRECT VALUE IN INVENTORY']
    },
    {
        origin: 'INVALID BALANCE',
        destinations: ['INCORRECT ASSET STATUS'],
        rules: [{3: 'BRAZIL'}]
    },
    {
        origin: 'INVENTORY ITEM',
        destinations: [
            'ADDRESS IDENTIFIER IDENT_FIS_JUR INCORRECT',
            'ADDRESS IDENTIFIER IDENT_FIS_JUR NULL',
            'IMPORT SAFX52',
            'INCORRECT COUNT GROUP ON INVENTORY ITEM',
            'INCORRECT QUANTITY ON INVENTORY ITEM'
        ]
    },
    {
        origin: 'INVOICE',
        destinations: ['CAK E FINALIDADE', 'PROJETO V8 - PEDIDOS RELACIONADOS A ORIG', 'VERIFICAR SE NF REVERTIDA'],
        rules: [{1: 'REQUEST', 2: 'ORIGINATION', 3: 'BRAZIL'}]
    },
    {
        origin: 'INVOICE DIVERGENT',
        destinations: [
            'ACCOUNTING ACCOUNT INCORRECT',
            'AP- CST A NULL',
            'AP INCORRECT MOVTO E S',
            'CORRECT SEQUENCE ITENS',
            'CTMS - INVOICES WITH INCORRECT CFOP',
            'CTMS - INVOICES WITH INCORRECT CST ICMS',
            'CTMS - INVOICES WITH INCORRECT PIS COFINS - PARAM',
            'DETAIL WITHOUT INTERFACE JDE X MSAF',
            'INCORRECT COD_MUN AND UF ON INVOICES',
            'INCORRECT EMISSION DATE ON INVOICES',
            'INCORRECT EMISSION DATE (CTMS)',
            'INCORRECT EMISSION DATE (JDE)',
            'INCORRECT ICMS NO ESCR',
            'INCORRECT ICMS ST - FCP',
            'INVOICE WITH INCORRECT NORM DEV',
            'INVOICES CANCELLED',
            'INVOICES WITH BP INCORRECT',
            'INVOICES WITH INCORRECT ACCESS KEY',
            'INVOICES WITH INCORRECT ADDRESS',
            'INVOICES WITH INCORRECT CIA (JDE)',
            'INVOICES WITH INCORRECT BLOCK SER MERC - JDE PROP',
            'INVOICES WITH INCORRECT BLOCK SER MERC - JDE SALES',
            'INVOICES WITH INCORRECT BLOCK SER MERC - CTMS',
            'INVOICES WITH INCORRECT BLOCK SER MERC - SAP',
            'INVOICES WITH INCORRECT DOC TYPE',
            'INVOICES WITH INCORRECT IND NATUREZA BASE CRED (SAP)',
            'INVOICES WITH INCORRECT IPI BASE VALUE',
            'INVOICES WITH INCORRECT MODEL NF',
            'INVOICES WITH INCORRECT NCM ON ITEM (JDE)',
            'INVOICES WITH INCORRECT NUMBER - JDE',
            'INVOICES WITH INCORRECT SERIE - SAP',
            'INVOICES WITH INCORRECT SERIE - JDE',
            'INVOICES WITH INCORRECT TOTAL VALUE - JDE MSAF X NFE',
            'INVOICES WITH INCORRECT VALUE - SAP',
            'INVOICES WITH INCORRECT VALUE AND QUANTITY',
            'INVOICES WITH INCORRECT VALUE ICMS N DESTAC',
            'INVOICES WITHOUT ACCESS KEY',
            'ITEM QUANTITY WITH ZERO',
            'JDE - INVOICES WITH INCORRECT BASE ICMS',
            'JDE - INVOICES WITH INCORRECT CFOP',
            'JDE - INVOICES WITH INCORRECT CIA',
            'JDE - INVOICES WITH INCORRECT CST ICMS',
            'JDE - INVOICES WITH INCORRECT IPI',
            'JDE - INVOICES WITH INCORRECT PIS COFINS',
            'JDE - INVOICES WITH UNIT OF MEASUREMENT',
            'PIS COFINS OF ITEMS WITH A BLANK DATE',
            'SAP - INVOICES WITH INCORRECT CFOP',
            'SAP - INVOICES WITH INCORRECT CIA FISCAL',
            'SAP - INVOICES WITH INCORRECT DIF ALIQUOTA',
            'SAP - INVOICES WITH INCORRECT ICMS',
            'SAP - INVOICES WITH INCORRECT PIS COFINS'
        ]
    },
    {
        origin: 'ITAS',
        destinations: ['FICHA NAO INTERFACEIA PARA JDE']
    },
    {
        origin: 'JDE E1 LAYOUT',
        destinations: ['PROBLEM WITH ACCESS IN JDE E1']
    },
    {
        origin: 'JOBQ',
        destinations: ['CANCELACIÓN DE JOB']
    },
    {
        origin: 'JOBQ',
        destinations: ['LENTITUD'],
        rules: [{3: 'BRAZIL'}]
    },
    {
        origin: 'LANCAMENTO INCORRETO',
        destinations: ['LANCOU QUEBRA MAS NAO HA CADASTRO']
    },
    {
        origin: 'LAUDO DE VISTORIA',
        destinations: ['ARMAZEM NAO HOMOLOGADO']
    },
    {
        origin: 'LETTER OF CORRECTION',
        destinations: ['EI - SEFAZ INCONSISTENCY', 'INVOICE WITHOUT RETURN OF POR ARQUIVAR', 'JDE UPDATE', 'USED SPECIAL CARACTERS', 'CCE COM CHAVE INCORRETA', 'F5576512 IS WITH INVOICE REJECTION STATUS', 'INVOICE OUT OF SEQUENCE']
    },
    {
        origin: 'LIBERACAO DE PAGAMENTO',
        destinations: ['V4 NAO APARECE NA TELA DE LIBERACAO']
    },
    {
        origin: 'LIQUIDACAO DE CONTRATO',
        destinations: ['ADDRESS BLOQUEADO', 'ALTERACAO DE STATUS', 'ERRO NA LIQUIDACAO - ERRO DE CREDITO SUSP', 'LINHA DF INDEVIDA', 'X1 COM VALOR ABERTO INDEVIDO']
    },
    {
        origin: 'LIQUIDACION',
        destinations: ['INCLUSION DEL LA FATURA', 'PRE-LIQUIDACION']
    },
    {
        origin: 'LISTA DE PRECO',
        destinations: ['SISTEMA PUXANDO COTACAO INCORRETA']
    },
    {
        origin: 'LOAD',
        destinations: ['WRONG STATUS OF LOAD'],
        rules: [{1: ['LOGISTICS', 'TRANSPORTATION']}]
    },
    {
        origin: 'LOAD',
        destinations: ['ABP - FREIGHT FERROVIARIO - LOCAL DE COLETA', 'ADDRESS BOOK - NCM', 'INCORRECT VEHI', 'INVOICE OUT OF SEQUENCE', 'FBZ LOAD WITHOUT OC', 'CH - FREIGHT FERROVIARIO - LOCAL DE COLETA', 'COA - INACTIVE ACCOUNT', 'SERVER LAJDE01P DOWN', 'INVOICE AUTHORIZED AFTER LOAD SENT CTMS', 'PROCESSING OF JOB R5549200', 'FREIGHT FERROVIARIO', 'INCORRECT INVOICE LOAD SIMULATED', 'INCORRECT NUMBER OF OC', 'LOAD CANCELED CTMS', 'LOAD SENDED INCORRECTLY TO CTMS', 'WRONG OPERATION TYPE', 'INCORRECT ADDRESS'],
        rules: [{1: 'CTMS'}]
    },
    {
        origin: 'LOAD',
        destinations: ['PESO NO ENVIADO DE RDS A JDE', 'APB - LOAD CON LINEA INDEVIDA', 'CAMBIO DE DATOS DE TRANSPORTE', 'CAMBIO DE ORIGEN', 'CAMBIO DEL PRODUTOR', 'CREACION MASIVA', 'CTMS - RAMA DE ACTIVIDAD', 'ERROR EN SHIPMENT ESTADO 30', 'EXCESO DE CARGA EN LA CONFIRMACION', 'INPUT DE CALIDAD', 'INPUT DE PESAJE', 'LOAD B2B CAMBIO DE FICHA', 'NO ENVIADO A CTMS', 'PESO DESTINO - CONTRATO', 'RECEPCION', 'SIMULACION', 'UBICACION DE ITEM', 'VINCULACION TARDÍA'],
        rules: [{2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'LOAD',
        destinations: ['REASIGNACION'],
        rules: [{1: 'VENTAS'}]
    },
    {
        origin: 'LOAD',
        destinations: ['ANULACION'],
        rules: [{1: ['LOGISTICS', 'VENTAS']}]
    },
    {
        origin: 'LOAD',
        destinations: ['IMPRESSAO DE ORDENS DE CARREGAMENTO'],
        rules: [{1: 'CTMS'}]
    },
    {
        origin: 'LOAD',
        destinations: ['LOAD AT 80 BUT WITHOUT CONFIRMATION', 'RESTARTED A SERVICE IN RDS', 'AUTOMATIC JOB NOT RUNNING', 'MASTERDATA - COD CAT 10 TBO', 'ADVANCE STATUS TO 90 VE', 'WRONG STATUS OF ORDER', 'ERRO NA ATUAL DO DET DO PEDIDO', 'RDS SLOWNESS', 'INCORRECT WEIGHT', 'EXCESS OF WEIGHT NOT ALLOWED', 'USER DIDNT DO CONFIRMATION', 'BACK STATUS TO 20 TO CANCEL', 'CANCELAR LOAD', 'CHANGE STATUS TO 98', 'PUT ORDER IN STATUS OF ACCOUNTED', 'PUT ORDER IN STATUS OF CANCELATION', 'CANCELLED THE LOAD UNDULY', 'INCORRECT MENU', 'USER DIDNT USED THE MENU', 'BP - NEW REGISTRATION LOAD AUTOMATICO', 'CTMS OC INTERFACE FAILURE', 'MASTER DATA - ITEM', 'ORDER NOT SHOW TO BOARD', 'PLACA WITH INCORRECT INFORMATION', 'PROBLEMS IN LOAD AUTO GENERATION', 'SLOWNESS TO APPLY TN', 'LINE RELATED TO OTHER LOAD', 'ERROR Z5549091 - BALANCES CANNOT BE', 'ORDER LOCKED C1', 'SLOWNESS IN OC GENERATION', 'BACK TO STATUS 20 FOR USER CORRECT', 'EXISTS INCONSISTENCY - F5549001', 'INFORMED INCORRECT SERIES NUMBER', 'LOTE WITH WRONG NOTA', 'DONT HAVE INPUT OF WEIGHT OR QUALITY', 'INCORRECT BP OF DESTINATION', 'STATUS INCORRETO', 'LOTE BLANK', 'MASTER DATA - DAY OF SHELF NOT REGISTRED', 'MASTER DATA - LOCAL', 'MD - ERROR - AAI - PED SEM HEADER', 'PO ADJUSTMENT', 'LOAD CREATED INCORRECTLY', 'TRY TO RECEIVE CANCELED LOAD', 'FLAG Y ON F5549001', 'LOAD DONT HAVE WEIGHT WITH FLAG Y IN F5549001'],
        rules: [{2: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'LOAD - REPOM',
        destinations: ['LOGISTIC - INCORRECT DRIVER E-MAIL', 'INVALID CARD']
    },
    {
        origin: 'LOT AVAILABILITY',
        destinations: ['INCORRECT AVAILABILITY', 'MASTERDATA - TBO BP ORIGEM']
    },
    {
        origin: 'LOTE',
        destinations: ['EXCLUSAO DE LOTE'],
        rules: [{1: 'PILHA'}]
    },
    {
        origin: 'M - FATURA',
        destinations: ['RETENCAO DE IMPOSTO']
    },
    {
        origin: 'MANUTENCION MASSIVA',
        destinations: ['CAMBIO DE HACIENDA', 'NO PERMITE MODIFICAR ROL', 'ERROR E0 ASOCIADO', 'LENTITUD', 'NO PERMITE MODIFICAR BP COMERCIAL', 'NO PERMITE MODIFICAR CORREDOR', 'NO PERMITE MODIFICAR DATO AB VENDEDOR', 'NO PERMITE MODIFICAR HACIENDA'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'MANUTENCAO FRETE',
        destinations: ['ALTERACAO INDEVIDA COMPONENTE FRETE']
    },
    {
        origin: 'MASTERSAF',
        destinations: ['ADDRESS E CNPJ INCORRETOS', 'ADDRESS INCORRETO', 'ALTERAR DATA DE LANCAMENTO', 'CIA INCORRETA', 'CONSULTA DADOS NF NO BANCO DE DADOS', 'DCT EM BRANCO', 'DT EMISSAO ERRADA', 'EXCLUSAO DE NOTA MSAF', 'INCORRECT INVOICE NUMBER - MORE THAN 6 DIGITS', 'INTERFACEAR NOTAS ANTIGAS', 'JOB AGENDADO NAO CONSIDEROU TODAS NOTAS', 'NF COM SERIE INCORRETA', 'NF INTERFACEADA COM VALOR TOTAL INCORRETO', 'NF NAO INTERFACEADA - ADDRESS CRIADO DEPOIS DA NOTA', 'NF NAO INTERFACEADA - EMAIL INVALIDO', 'NF NAO INTERFACEADA - PERIODO LIVRO FECHADO', 'NOTAS AVULSAS NAO INTERFACEADAS', 'NOTAS COM COD MUN INCORRETO', 'NOTAS COM RATEIO NAO SOBEM', 'NOTAS NAO INTERFACEADAS PARA O MASTERSAF', 'NOTAS NAO INTERFACEADAS PARA O MASTERSAF - CAMPO UDF INCORRETO', 'NOTAS REVERTIDAS NAO FORAM AO MASTERSAF', 'TIPO INCORRETO', 'USER ERROR – TIPO DA NOTA INCORRETO'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'MASTERSAF',
        destinations: ['SIMULATED INVOICE IN NFE ON FHBD01', 'CH - EFD0500', 'MD - BP PARAMETERIZATION', 'FREIGHT ACCOUNTED IN INCORRECT BOOK'],
        rules: [{1:'INVOICE', 2: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'MATCHING',
        destinations: ['ADDRESS NAO PARAMETRIZADO PARA FUNRURAL', 'ATUALIZAR DATAS PARA PERMITIR REVERSAO', 'AW NOT APPEARING IN CONSULTA RAZAO DO DO', 'DESCONFORMAR X0', 'N5- NAO GERADO', 'NAO FOI EXECUTADO ROTINA DE GERACAO NFE', 'NAO GEROU X0 - ADDRESS BLOQUEADO', 'NAO GEROU X0 - ADDRESS FAZENDA INCORRETO', 'NAO GEROU X0 - APLICACAO PENDENTE', 'NAO GEROU X0 - FALTA COMPLEMENTO', 'NAO GEROU X0 - FIXACAO EM REAIS PENDENTE', 'NAO GEROU X0 - MOTIVO NAO INFORMADO', 'NAO GEROU X0 - PARAMETRIZACAO INCORRETA FUNRURAL', 'NAO GEROU X0 DEVIDO ERRO DE FUNRURAL', 'STATUS DO X0 INCORRETO MOTIVO NAO INFORMADO', 'USER - ANEXO DOCUMENTO', 'USER - PARAMETRIZACAO DO JOB', 'USR - USUARIO SEM ACESSO, SEM CONTATO COM O COMERCIAL', 'USR - X0 NAO GERADO', 'X0 DUPLICADO', 'X0 DUPLICADO - LENTIDAO JOB', 'X0 GERADO A MAIOR', 'X0 GERADO COM ADDRESS DIREFERENTES', 'X0 GERADO COM VALOR DIVERGENTE DE FIXACAO', 'X0 GERADO COM VALOR INCORRETO', 'X0 GERADO COM VALOR INCORRETO – FUNRURAL INCORRETO', 'X0 GERADO INCORRETO - VARIAS NOTAS', 'X0 GERADO NO EXCESSO SEM COMPLEMENTO', 'X0 MENOR FXR C SPLIT', 'X0 NAO GERADO COMPLEMENTO FALHA JOB', 'X0 NAO GERADO VALOR NEGATIVO F43121', 'X0 STATUS A - RPAAP NULO', 'X0S GERADOS INDEVIDAMENTE'],
        rules: [{1: 'FINANCE'}]
    },
    {
        origin: 'MATCHING',
        destinations: ['CAMPO CONDIC. DE PAGO EN ERROR', 'ORDEN YA MATCHEADA'],
        rules: [{1: 'ORDERS'}]
    },
    {
        origin: 'MCR',
        destinations: ['INSTALACION UDC'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS', 3: 'ARGENTINA'}]
    },
    {
        origin: 'MDFE',
        destinations: ['PROBLEM WITH TIBCO INTERFACE MDFE WITH STATUS A', 'MDFE REJECTED WITHOUT RETURN']
    },
    {
        origin: 'MENU JDE',
        destinations: ['CRIACAO DE MENU NO JDE - SECURITY OFFICE', 'NAO ESTA APARECENDO O MENU NO JDE']
    },
    {
        origin: 'MEZCLA',
        destinations: ['REVERSION', 'STOCK']
    },
    {
        origin: 'MIOLO',
        destinations: ['DATA CONTABIL EM BRANCO', 'DATA TRANSACAO/CONTABIL INCORRETA', 'DIFERENCA ENTRE RD E RELATORIO DE PDPV', 'DOCUMENTO DE FRETE SEM TIPO DE LINHA', 'DOCUMENTOS COM FLAG EM BRANCO F556001', 'ERRO TIPO DE LINHA F5560001', 'OV - OH SEM CUSTO', 'PRECO MEDIO INCORRETO', 'RD NAO LE CARDEX', 'REPROCESSAMENTO - VALOR MIOLO INCORRETO', 'SEGMENTACAO TR COMPRA E TRANSFERENCIA', 'USER - PARAMETRIZADO DOC PARA LEITURA RD']
    },
    {
        origin: 'MONITOREO',
        destinations: ['ADDRESS BROKER', 'BATCH NO CONTABILIZADO'],
        rules: [{1: 'FINANCE'}]
    },
    {
        origin: 'MONITOREO',
        destinations: ['BATCH COMPARTIDO CON X1 VIEJO', 'BATCH DB EN ERROR', 'BATCH IB APROBADO SIN POSTEAR', 'BATCH V APROBADO SIN POSTEAR', 'BATCH V EN ERROR', 'DOC AP PEND CONTAB', 'DOCUMENTO CON FECHA Y PERIODO CERRADOS', 'DOCUMENTO NO EXISTE EN LA TABLA F03B11', 'DOCUMENTO NO EXISTE EN LA TABLA F76A09-RECLASIFICACION DE TAX', 'NUMERACION DEL DOCUMENTO CERO EN EL GLDOC Y RZDOCG', 'REVERSION DEL PAGO CON FECHA MES ANTERIOR Y PERIODO CERRADO'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'MONITOREO',
        destinations: ['INCIDENTE TRUESIGHT'],
        rules: [{1: ['FINANCE', 'VENTAS']}]
    },
    {
        origin: 'MONITOREO',
        destinations: ['BITACORAS GL', 'ZFILE GL', 'BITACORAS AP', 'ZFILE AP', 'PAGOS_PEND_APROB_ INFO', 'PED_PEND_SALES_UPDATE', 'INTEGRIDAD AP', 'INTEGRIDAD AR', 'DOC AP PEND CONTAB', 'PAGOS NETTING SIN CONTAB', 'DOC AR SIN CONTAB', 'INTERFAZ GL', 'INTERFAZ AP'],
        rules: [{1: 'FINANCE', 2: 'JDE ENTERPRISE E1/JDE A9'}]

    },
    {
        origin: 'MONITORING',
        destinations: ['INTERFAZ', 'NO SUPPORT ACTION', 'SERVER DISC FULL', 'SERVER PROCESS FULL'],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'MONITORING',
        destinations: ['JOB INTERFAZ', 'NO SUPPORT ACTION', 'SERVER DISC FULL', 'SERVER PROCESS FULL'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'MONITORING',
        destinations: ['RESTART REPLICATIONS'],
        rules: [{1: 'INFOSPHERE'}]
    },
    {
        origin: 'MONITORING',
        destinations: ['INCORRECT COD_MUN AND UF ON INVOICES'],
        rules: [{1: 'MASTERSAF'}]
    },
    {
        origin: 'MONITORING',
        destinations: ['INTERFACE FICHA STOPPED', 'SERVER DISC FULL', 'SERVER PROCESS FULL'],
        rules: [{1: 'RDS'}]
    },
    {
        origin: 'MX',
        destinations: ['PARAMETRIZACAO DE ITEM', 'SALDO CONTRATOS DESATUALIZADO']
    },
    {
        origin: 'NAO ENVIADA AO SEFAZ',
        destinations: ['ADDRESS BOOK – LOGRADOURO', 'CADASTRO DE PLACAS - CAMPO UF COM *', 'CAMBIO ESTADO AUTOMATICO - COD RESP 217', 'CNPJ INVALIDO', 'CONTIGENCIA NA SEFAZ', 'ICMS NEGATIVO', 'LINHAS DUPLICADAS NA F5576505', 'NF MODELO 4 COM SERIE DIFERENTE DE 000/001', 'NF MS-SERIE 000/001/100-CAMPO NFNFEBSER INCORRRETO', 'NOTA REFERENCIADA COM DIGITO A MAIS', 'NOTAS JA UTILIZADAS - VISTO NO SIGNATURE', 'NOTAS MS - LINHAS DUPLICADAS NA F5576505', 'NP REFERENCIADA COM SERIE INVALIDA', 'NP REFERENCIADA COM TIPO INVALIDO', 'NRNFENRNP > 2 MILHÕES', 'SERIE 000 - NFP FORA DO RANGE'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NETTING',
        destinations: ['AUDITORIA DE APROVACAO DE PAGAMENTO', 'CAK EM PROCESSMENTO', 'DOCUMENTOS NAO APARECEM PARA NETTING', 'EXCLUSAO DE X1', 'FALTA CADASTRO DE AAI', 'LINHA AW EXCLUIDA', 'PROBLEMA NA TELA DE NETTING', 'REVERSAO DO X1 NAO RETORNOU SALDO', 'REVERSAO XI - DOC EM STATUS P', 'RM GENERADO SIN CORREDOR', 'USER - ACESSO PARA AVANCAR STATUS', 'USR - VOUCHAR PENDENTE PARA LIQUIDAR', 'VALIDACAO INCORRETA DO NETTING', 'X0 REVERTIDO MAS STATUS PD NAO REVETIDO', 'X1 COM STATUS INCORRETO', 'X1 CONTA CONTABIL INCORRETA', 'X1 GERADO COM ADDRESS BLOQUEADO', 'X1 GERADO COM VALOR INCORRETO', 'X1 NAO CONSUMIU AH EM ABERTO', 'X1 NAO GERADO NA F0911'],
        rules: [{1: 'FINANCE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NETTING',
        destinations: ['ERROR YQ718E054', 'EXISTE GRUPO DE PAGO ARMADO', 'PADRON FISCAL FALTANTE PARA AB-F5570120', 'USUARIO DE NETTING BLOQUEADO', 'ANULACION DE RU', 'ANULACION DE X1 CON ESTADO P', 'CAMPO SHBSC.F4201 CON ESPACIO ANTES DEL VALOR', 'DATOS INCORRECTOS EN LA PANTALLA', 'DOCUMENTO CON IMPORTE Y STATUS INCORRECTO', 'DOCUMENTO PENDIENTE DE FACTURACION', 'DOCUMENTO SIN CONTABILIZAR', 'DOCUMENTO SIN CORREDOR', 'ERROR AL ANULAR – NO CONTABILIZADO', 'ERROR AL GENERAR SPLIT', 'ERROR EJECUCION PROCESO DE PAGOS R04570', 'ERROR EM PERMUTA', 'ERROR NETTING', 'LIBERACION DE NETTING ID RETENIDO EN PANTALLA', 'MD - AB BLOQUEADO', 'MD - AB CON ERROR EN LA DETERMINACION IMPOSITVA', 'MD - AB CON RETENCION DE FACTURAS', 'MD - AB SIN CONFIGURACION IMPUESTOS FEDERALES', 'PASAR XZ A ESTADO CONFORME', 'X1 CON ESTADO X', 'X1 CON ESTADO Y', 'X1 NO SE MUESTRA EN PANTALLA DE NETTING'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'NETTING',
        destinations: ['CADASTRO FILIAL NETTING', 'INCORRECT VALUE DOC PL', 'STATUS CHANGING', 'REVERSION XD DOCUMENT'],
        rules: [{1: 'PROCUREMENT'}]
    },
    {
        origin: 'NEW TAX AREAS',
        destinations: ['CREACION NUEVA TAX AREA']
    },
    {
        origin: 'NEW TRADES',
        destinations: ['IMPROPER DELETION IN F5560104'],
        rules: [{2: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'NEW TRADES',
        destinations: ['ALTERACOES NAO SOBEM PRO NEW TRADES', 'CADASTRO INCORRETO/FALTA CADASTRO', 'CAK NAO APARECE NO CDP', 'CANCELAMENTO DE TC NAO SUBIU', 'CANCELAMENTO NOTA MES ANTERIOR', 'CBOT INCORRETO', 'CLASSIFICACAO INCORRETA NEW TRADES FUTURO', 'COMPONENTE DOLAR INCORRETO', 'COMPONENTES DUPLICADOS', 'COMPONENTES NAO GERADOS COMP ONLINE', 'CONTRATO DMS COM CBOT INCORRETO', 'CONTRATO INTERFACEADO COM FALTA DE DADOS', 'CONTRATOS DMS SEM FRETE', 'DATA de ENTREGA E REFERENCIA INCORRETOS', 'DATA DE ENTREGA VQ INCORRETA', 'DATA DE EXTRATO INCORRETA', 'DV SEM COMPONENTE', 'ERRO DE CANCELAMENTO DA NOTA', 'ESTORNO DE FIXACAO DUPLICADO', 'ESTORNO FIXACAO NAO SUBIU', 'ESTORNO SLIP PENDENTE NAO INTERFACEDO', 'FATOR DE CONVERSAO MARGEM FILIAL INDEVIDO', 'FIXACAO COM VOLUME POSITIVO', 'FIXACAO INDEVIDA', 'FIXACAO NAO CONSTA NO RELATORIO', 'JOB COM ERRO DE EXECUCAO DE CACHE', 'LINHA RCMER NO NT SEM ESTORNO', 'LINHAS DE COMPONENTES DUPLICADAS', 'MONITORAMENTO PRECO SLIP', 'PEDIDO DE EXPORTACAO COM VALOR BRUTO ZERADO', 'PEDIDO SA NAO CONSTA NO NT', 'PEDIDO SX OU VG SEM LINHA PREMIO', 'PEDIDO VENDA COM VOLUME VCM ALTERADO', 'PEDIDO VENDA NAO SUBIU PARA NT', 'PEDIDO VENDA PRECO DISTORCIDO', 'PREMIOAF SEM INTERFACE', 'REGISTROS ANTIGOS SENDO REENVIADOS INDEVIDAMENTE', 'REVERSAO DE COMPRA NAO SUBIU', 'REVERSAO DE SPLIT DMS COM DATA INCORRETA', 'RVVAT COMO FIXACAO', 'SLIP NAO INTERFACEADO', 'SLIP ORIGEM ANTIGO COM COMPONENTES INCORRETOS', 'SLIP PENDENTE NAO SOBE AO MODELO', 'SLIPS COM STATUS PENDENTE NAO SOBEM AO MODELO CONTABIL', 'SPLIT DE CONTRATO NAO CRIA COMPONENTES', 'SPREAD DE QUALIDADE BCY', 'SUP - AJUSTE INCORRETO', 'SUPPORT - REVERSOES  INDEVIDAS', 'TICKETS FUTUROS - DIVERGENCIA JPMORGAN', 'TICKETS FUTUROS - ERRO DESTINACAO CRUSH', 'TICKETS FUTUROS – INTERFACEADO COM DATA INCORRETA', 'TICKETS FUTUROS COM DADO DE EXPORTACAO INCORRETO', 'TICKETS FUTUROS COM DATA INCORRETA', 'TIPO DE OPERACAO SLIP ALTERACAO INCORRETO', 'REVERSAO INDEVIDA NO RELATORIO', 'VG COM VALOR INCORRETO', 'VOLUME COM ORDEM DE GRANDEZA ERRADA', 'VOLUME DIVERGENTE SLIP E F5543092', 'VOLUME EM CX NO CANCELAMENTO INCORRETO - ENVASADO', 'VOLUME VCM DIVERGENTE JDE E NEW TRADES', 'VOLUMES/VALORES INDEVIDOS NO RELATORIO', 'WD - VQ LINHA CP NAO SUBIU PARA NT'],
        rules: [{2: 'ORIGINATION'}]
    },
    {
        origin: 'NF - CANCEL',
        destinations: ['INCORRECT CNPJ IN XML', 'CANCELLATION IN JDE DOESNT SUCCEED', 'CANCELATION NOT SENT TO SEFAZ', 'INVOICE WITH CTE NOT CANCELED', 'NOT RETURN STATUS OF SIGNATURE', 'INVOICE NOT PRINTED', 'INVOICE NUMBER ZERO', 'SW - SLOWNESS TO RETURN STATUS', 'EXTEMPORANEO', 'CANCELLATION IN 605 STATUS', 'CANCELLATION OF SIMULATION INVOICE', 'EXTEMPORANEO CANCELLATION', 'INVOICE ALREADY ACCOUNTED', 'INVOICE CANCELLED INCORRECTLY', 'INVOICE WITH CTE NOT CANCELLED', 'REJECTED CANCELLATION', 'USER CANCEL NF WITHOUT SEFAZ RETURN', 'WRONG BP', 'WAD - CANCELLATION IN JDE DOESNT SUCCEED', 'UPDATED STATUS TO 980-999']
    },
    {
        origin: 'NF - DEVOLUTION',
        destinations: ['NF GENERATED', 'WRONG TAX']
    },
    {
        origin: 'NF - DIVERGENT',
        destinations: ['INVOICE WITH WRONG PIS/COFINS', 'BNNF ZERO / CANCEL NEW GENERATION', 'COMPLEMENTARY MESSAGE', 'MASTER DATA - COMPLEMENTARY MESSAGE', 'SP - INCORRECT ADJUSTMENT']
    },
    {
        origin: 'NF - DUPLICATED',
        destinations: ['FINAL INVOICE DUPLICATED']
    },
    {
        origin: 'NF - GENERATION',
        destinations: ['ADDRESS BOOK - HOLD INVOICES', 'OLD TEMPORARY INVOICES', 'INCORRECT ISSUE DATA INVOICE', 'JOB  R5776002 LABRSD100 LOCKED', 'OLD ORDERS SX GENERATE NEW INVOICES', 'ORDER WAS CREATED WRONG', 'WITHOUT ORDER DETAILS - F76422', 'INVOICE STOPPED IN STATUS 605', 'JDE UPDATE', 'TABLE LOCK', 'MASTER DATA - CAT COD 31', 'MASTER DATA - UDC 55 PY', 'NF GENERATE WITHOUT ACTION', 'SP - JOB DATA SELECTION', 'ONLY EXECUTE JOBS GENERATION AND PRINT', 'ORDER LOCKED C1 C2', 'PAYMENT CONDITION', 'NF GENERATED WITH 7 DIGITS']
    },
    {
        origin: 'NF - INUTILIZE',
        destinations: ['INCORRECT STATUS COMPLEMENTARY INVOICE', 'NOTE GENERATED AS SIMULATED', 'EI - SEFAZ DIDNT RETURN STATUS OF INUTILIZED', 'NOT RETURN STATUS OF INUTILIZE', 'SEQUEL JUMP', 'INUTILIZACAO DE NF SIMULADA', 'USER DIDN T TRY TO INUTILIZE', 'OLD TEMPORARY INVOICE']
    },
    {
        origin: 'NF - REJECTED',
        destinations: ['ADDRESS BOOK - IE SETUP', 'CIA FISCAL WRONG IN F7601B', 'CH - ERROR OF SCHEMA', 'EI - INVALID CERTIFICATE', 'EI - RECIPIENTS IE IS NOT ACTIVE IN THE UF', 'ERROR OF NCM', 'ERROR OF SCHEMA', 'MASTER DATA - CFOP', 'MASTER DATA - NCM', 'MASTERDATA - UDC 55BR ZN', 'PARAMETRIZATION OF NCM', 'TAXSET - ICMS ST', 'UA - WRONG TYPE IE', 'CODE: 529 - CST INCOMPATIBLE IN OPERATION', 'ERROR OF CFOP', 'UF DO EMITENTE DIFERE DA UF DO DESTINATARIO', 'WRONG ACCESS KEY', 'XML DA AREA DE DADOS COM CODIFICACAO DIFERENTE DE UTF-8']
    },
    {
        origin: 'NF - SEFAZ STOPPED',
        destinations: ['EI - SEFAZ MT']
    },
    {
        origin: 'NF - SLOWLY',
        destinations: ['SLOW TO RETURN STATUS OF AUTHORIZED', 'PROBLEM IN SIGNATURE', 'SLOWNESS TO GENERATE OR PRINT']
    },
    {
        origin: 'NF - STATUS',
        destinations: ['ELETRONIC INVOICE RESEND THE STATUS OF INVOICE', 'ELETRONIC INVOICE RESTARTS THE SERVICES', 'TIBCO TEAM RESTARTS THE SERVICES', 'UPDATE STATUS TO 617-620', 'UPDATE THE STATUS TO 598-617', 'UPDATE THE STATUS TO 620-630', 'RESEND BY P5576B24 - BIO COMBUSTIVEL', 'UPDATE STATUS NF ABLE']
    },
    {
        origin: 'NF COMPLEMENTAR',
        destinations: ['COMPLEMENTO DE FIXACAO COM VOLUME INDEVIDO', 'COMPLEMENTO NAO GERADO', 'COMPLEMENTO PRODUTOR BPJ', 'COMPLEMENTO PRODUTOR BPS', 'CONTRATO INEXISTENTE NA TABELA', 'DECLARACAO DE NAO EMISSAO INCORRETA', 'DECLARACAO NAO GERA', 'ERRO INCLUSAO NF COMPLEMENTAR', 'EV01 PREENCHIDO INDEVIDAMENTE', 'LENTIDAO - TELA JDE NOVO NF COMPLEMENTAR MT', 'LENTIDAO NOS SELECTS', 'NF COMPLEMENTAR NAO APARECE NA NOVA TELA', 'NF COMPLEMENTAR NAO GERA X0 DEVIDO LNTY != SF', 'NOTA COM STATUS INCORRETO', 'NX GERADA COM VALOR INCORRETO - RATEIO', 'NX NAO GERADA', 'O4 SERIE 90 FORA DA SEQ E REJEITADA', 'PARAMETRIZACAO DE CADASTRO', 'PARAR GERACAO DE NF COMPLEMENTO PARA ORIGEM ORIGEM FOB', 'VALOR A PAGAR NEGATIVO INDEVIDO', 'VALOR INDEVIDO NA TELA ATUAL', 'VALOR PAGAR DIFERENTE DE VALOR ABERTO', 'VALORES A COMPLEMENTAR NAO EXIBIDOS', 'X0 NAO GERADO'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NF DEVOLUCAO - D7',
        destinations: ['CANCELAMENTO DE NOTA', 'NAO LOCALIZA NOTA REFERENCIADA', 'NOTA CPF REFERENCIADA COMO PJ'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NF DEVOLUCAO - V8',
        destinations: ['FALHA CRIACAO - ADDRESS INVALIDO', 'NOTA REJEITADA - MS - SERIE 100'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NF REJEITADA',
        destinations: ['CAMPOS DO GRUPO FATURA NAO INFORMADOS', 'CDIGO :521 MOTIVO:REJEICAO: OPERACAO INTERNA E UF', 'CH - INVOICE REJECTED XML ERROR', 'CH - XML NOT SEND TO SEFAZ', 'CHAVE DE ACESSO COMPOSTA INVALIDA', 'CNPJ DA NF REF INVAL', 'CONTRANOTA DE PRODUTOR SO PODE REFERENCIAR NF', 'CONTRANOTA PRODUTOR SEM NF REFER', 'CST 51 DIFERE DO PRODUTO BC E ALIQUOTA', 'CST INCOMPATIVEL', 'CST NAO CORRESPONDE AO TIPO DE CODIGO DE BENEFICIO FISCAL', 'DUPL NFE - DIF C DE ACE', 'DUPLICIDADE NA 505', 'ERRO NA CHAVE DE ACESSO AAMM', 'ERROR ESQUEMA', 'FALHA NO SCHEMA XML', 'IE DA NF REF DO PROD', 'IE DEST NAO VINCULADA AO CPF', 'IE DO DESTINATARIO INVALIDA', 'IRREGULARIDADE FISCAL DO EMITENTE', 'MODELO NF REFERENCIADA INCORRETA', 'MONITORAMENTO NF ORIG', 'MUNICPIO DO DESTINATRIO: DIFERE DA UF DO DESTINATRIO', 'NCM INEXISTENTE', 'NF COM IE INEXISTENTE', 'NF REFER NAO CONSTA NO BD', 'NFE DEVOL NAO POSSUI DOC FISC REFER', 'NF-E JA ESTA INUTILIZ', 'NFP REFER C/IE NAO VINCULADA AO CNPJ/CPF INFORMADO', 'REJEICAO NF-E DEVOLUCA', 'REJEICAO VALOR DO ICMS', 'SEM NOTA REFERENCIADA NA 505', 'TOTAL DA BC ICMS DIFERE ITEN', 'TOTAL DA NF > LIMITE DA SEFAZ', 'TOTAL DA NOTA DIFERE', 'TOTAL ICMS DIFERE DO SOMATORIO DE ITENS', 'UF DESTINO DIFERE ORIGEM', 'UF DESTINO IGUAL UF EMITENTE', 'UF EMITENTE DIVERGE UF AUTOR', 'VALOR ICMS DESONERADO DEVE SER INFORMADO', 'VERSAO DO LAYOUT DA NF-E'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NF REVERSAO',
        destinations: ['ERRO REVERSAO', 'ERRO REVERSAO BPF C/DESCONTO', 'LANCAMENTO DE 2 NOTAS AO MESMO TEMPO', 'NF CANCELADA NAO MOSTRA STATUS', 'NF COM MATCHING GERADO', 'NF COMPLEMENTO COM FIXACAO REALIZADA', 'NF NO MES ANTERIOR', 'NOTA FISCAL NAO FOI IMPRESSA', 'NOTA INUTILIZADA', 'NOTA REVERTIDA COM X0 GERADO', 'PENDENTE DE REVERSAO DE MATCHING', 'REVERSAO NF > 6 DIGITOS NAO POSSIVEL', 'NAO EXECUTOU EM MODO FINAL', 'NOTA VINCULADA NO CEXP', 'USUARIO NAO ENCONTROU A NF'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NOTA DE CREDITO',
        destinations: ['CLIENTE ERRONEO', 'ERROR PEDIDO', 'MONTO ERRONEO', 'MONTO SUPERIOR A FACTURA']
    },
    {
        origin: 'NOTAS DE TRANSPORTE - TARE',
        destinations: ['ESTRACTA INTEGRATION', 'ESTRACTA NÃO RESPONDE'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NOVA FILIAL',
        destinations: ['INCLUSAO FILIAL']
    },
    {
        origin: 'OBTENCION COT/CTG',
        destinations: ['ANULACION', 'ERROR EN LA CORRECION', 'ERROR EN LA OBTENCION', 'PENDIENTE DE TRANSMISION'],
        rules: [{1: 'LOGISTICS'}]
    },
    {
        origin: 'OBTENCION CAE/COE',
        destinations: ['CAE MONITOR', 'INCIDENTE TRUESIGHT', 'PENDIENTES', 'RECHAZADO ET', 'SALTOS DE SECUENCIA', 'SIN RETORNO']
    },
    {
        origin: 'OCCUPACY TAX REPORT',
        destinations: ['CONTRATO EXP DIA STOPPED OCCUPACY TAX REPORT', 'REPORT DIVERGENT - INTERFACE FAILURES OCCUPACY TAX REPORT', 'TIBCO CONTRATO EXP DIA STOPPED OCCUPACY TAX REPORT']
    },
    {
        origin: 'OFFLINE INTERFACE',
        destinations: ['DNS SERVER OUT', 'ERROR TO RECEIVE BLOCKED ADDRESSES', 'FICHA SENT TO PRDSL WITH INCORRECT DATA', 'INTERFACE NOT EXECUTED', 'NO ADMIN RIGHTS PERMISSION', 'NO SUPPORT ACTION', 'ORACLE XE SERVICES DOWN', 'OUTDATED VERSION', 'PROXY CERTIFICATE ADDED', 'RDS_USR ACCOUNT LOCKED', 'REINSTALL INTERFACE', 'RESET TRANSMISSION IN FICHA', 'SYMANTEC CONFIGURATION INCORRECT', 'TIME OUT INTERFACEOFFLINE']
    },
    {
        origin: 'OH - FOB',
        destinations: ['RESEND FREIGHTS TO MSAF']
    },
    {
        origin: 'OH NOT SENT TO CTMS',
        destinations: ['FLAG 2 IN F5549713 WITHOUT OC', 'FICHA APPLIED WRONGLY']
    },
    {
        origin: 'OPEN SALES',
        destinations: ['ADDRESS NAO INTERFACEADO', 'CHAVE UNICA COM LINHAS DUPLICADAS', 'CONTRATO INDEVIDO NO OPEN SALES', 'CONTRATO VCM INDEVIDO NO OPEN SALES', 'INCLUIR DEVOLUCAO NO RELATORIO'],
        rules: [{1: 'ACCOUNT', 2: 'ORIGINATION'}]
    },
    {
        origin: 'OPERATIVO',
        destinations: ['ENVIAR A CTMS', 'TRANSPORTADOR']
    },
    {
        origin: 'ORDER',
        destinations: ['UBICACION DE ITEM'],
        rules: [{1: 'LOGISTICS'}]
    },
    {
        origin: 'ORDER',
        destinations: ['UPDATE ORDER STATUS TO 980/999'],
        rules: [{1: 'REQUEST'}]
    },
    {
        origin: 'ORDER',
        destinations: ['ORDER NOT ACCOUNTED IN PILHA'],
        rules: [{1: 'PILHA', 2: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'ORDER - CANCEL',
        destinations: ['BACK STATUS OF THE ORDER TO 520 521', 'I0 DOCUMENT NOT GENERATED IN CARDEX', 'ORDER IN STATUS OF GENERATION OF INVOICE', 'ORDER ALREADY ACCOUNTED', 'ORDER WAS JUST CANCELED', 'ORDER CANCELLED MANUALLY']
    },
    {
        origin: 'ORDER - CREATION',
        destinations: ['ADDRESS BOOK - CLIENT REGISTER', 'ADDRESS BOOK - CONTRAPARTCONTABIL DEAD', 'APB – INCORRECT VALUES ON Z1', 'CROP INPUT - OP DIDNT GENERATE AUTOMATICALLY', 'LOB DOES NOT SEEM AUTOMATIC', 'MASTER DATA - ADVANCE PRICING', 'ORDER CREATED INCORRECT', 'ORDER LOCKED', 'ORDER NOT RETAINED BY C1 C2', 'ORDER WITH DIVERGENT ADDRESS', 'PO PARAMETRIZATION']
    },
    {
        origin: 'ORDER - DIVERGENT',
        destinations: ['FIELD ILDGL BLANK IN CARDEX', 'ORDER ACCOUNT BUT INCORRECT STATUS', 'ORDER GENERATED WITH DUPLICATED LINES', 'ORDER NOT GENERATED CARDEX', 'CHANGED QUANTITY', 'DELETE ORDER IN CARDEX', 'ORDER CREATED WITH WRONG LINE OF BUSINESS']
    },
    {
        origin: 'OSGT - SAP EXPORT',
        destinations: ['ADD NEW ACCESS GROUP', 'AJUSTAR VIEW DINAMICA CST', 'DUE ARE REGISTERED IN SISCOMEX', 'ERROR TO GENERATE DUE IN SW', 'INCORRECT SELECT ON SINGLE WINDOW', 'MATERIAL WITHOUT LONG DESCRIPTION', 'NAMESPACE O504X WITH ERRORS']
    },
    {
        origin: 'PADRAO DE QUALIDADE',
        destinations: ['FALHA CÓPIA RANGES QUALIDADE']
    },
    {
        origin: "PADRONES NACIONALES Y PROVINCIALES",
        destinations: ['CONTROL']
    },
    {
        origin: 'PAF AUTOMATICO',
        destinations: ['ALTERAR FAZENDA', 'CANCELAMENTO DE CONTRATO PAF AUTOMATICO', 'EXISTE UM CONTRATO ABERTO', 'FINALIDADE DE PAF AUTOMATICO INCORRETA', 'NAO GERA PAF AUTOMATICO - CADASTRO', 'NAO GERA PAF EMBORA CADASTRO CORRETO', 'PAF AUTOMATICO EM SAFRA INCORRETA']
    },
    {
        origin: 'Página RDS-WEB',
        destinations: ['Link desatualizado', 'Link indisponível', 'Planta sem conexão à internet'],
        rules: [{1: 'Acesso ao RDS-WEB', 2: 'RDS WEB'}]
    },
    {
        origin: 'PASSO DE FICHA',
        destinations: ['ALTERAÇÃO DE PASSO', 'CONFIGURAR AVANÇO DE PASSO'],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'PAYMENT',
        destinations: ['INCORRECT DATA SELECTION']
    },
    {
        origin: 'PD/PV',
        destinations: ['BP DIVERGENTE DE CONTRATO', 'CONTRATO NAO PERTENCE AO PRODUTOR', 'DESABILITAR BONI 55BR/BZ', 'PD CRIADO COM INCORRETAMENTE', 'PD CRIADO COM VALOR POSITIVO INDEVIDAMENTE', 'PD/PV NAO APARECE NO RELATORIO DE AJUSTES', 'PD/PV SEM AAI CADASTRADO', 'PV/PD DE BONIFICACAO DESAGIO NAO GEROU', 'PV/PD NAO APARECE TELA LIBERACAO DE PAGAMENTO', 'PV/PD NAO FOI FOI INTERFACEADO AO A9', 'RELATORIO COM VALOR ABERTO DOBRADO', 'RESTRICAO DE CADASTRO NA APROVACAO', 'STATUS DO PV/PD INDEVIDO', 'USR - RELATORIO COM VALOR INCORRETO', 'VALOR EM ABERTO DOBRADO', 'VINCULADO NOTA FISCAL - PV EM ABERTO']
    },
    {
        origin: 'PEDIDO',
        destinations: ['BROKER', 'CANCELACION', 'ESTADO INCORRECTO', 'LINEA MERMA', 'NO CALCULA PRECIO FLETE', 'STOCK']
    },
    {
        origin: 'PEDIDO A# - DEVOLUCAO NF',
        destinations: ['AB - CADASTRO GERAL INVALIDO', 'CANCEL NOTA', 'INVALID NCM', 'TWO NOTAS FOR THE SAME ORDER']
    },
    {
        origin: 'PEDIDO D7 - DDEVOLUCAO NF',
        destinations: ['INVOICE AND ORDER CANCELLATION', 'SCHEMA ERROR - VALOR - PST NAO E VALIDO', 'STATUS CHANGE', 'TAX - INCORRECT CFOP']
    },
    {
        origin: 'PEDIDO E0',
        destinations: ['CANCELAMENTO DE NOTA', 'CANCELAMENTO E0', 'CONTA CORRETE DIVERGE DE CONTABIL', 'E0 NAO ENVIADO AO CONTA CORRENTE', 'LOTE EXPIRADO', 'NF GERADA COM SERIE INCORRETA', 'NOTA SAIDA NAO GERADA', 'TELA SOLICITANDO COMPLEMENTO INDEVIDO']
    },
    {
        origin: 'PEDIDO E1',
        destinations: ['ERRO AO CRIAR PEDIDO E1', 'ERRO CONTABILIZACAO', 'FALTA RANGE QUALIDADE CONTRATO', 'FICHA NAO APLICA', 'NOTA FISCAL COM MAIS DE 6 DIGITOS', 'REVERSAO DE E1 COM E4 GERADO', 'REVERSAO DE E1 EXIBINDO RELATORIO ZK', 'SEQUENCIA DE NUMERACAO DA NOTA', 'VOLUME DE DESCONTO INCORRETO']
    },
    {
        origin: 'PEDIDO E4',
        destinations: ['NAO GERA NOTAS']
    },
    {
        origin: 'PEDIDO OW',
        destinations: ['NOTA SAIDA NAO GERADA']
    },
    {
        origin: 'PEDIDO SH',
        destinations: ['CALC ARMAZENAGEM BRANCO', 'NUMERACAO DE NOTA DE SERVICO FORA DE SEQUENCIA']
    },
    {
        origin: 'PEDIDO ZK',
        destinations: ['NAO GERA ZK', 'ZK COM STATUS A INDEVIDO', 'ZK COM VALOR EM ABERTO INCORRETO', 'ZK GERADO COM STATUS INCORRETO', 'ZK GERADO INCORRETAMENTE', 'ZK GERADO INDEVIDAMENTE', 'ZK SAI ZERADO PARA IMPRESSAO']
    },
    {
        origin: 'Perfil de usuário',
        destinations: ['Criar perfil novo', 'Desbloquear acesso do usuário', 'Erro de acesso ao RDS-WEB', 'Incluir BP ao perfil do usuário', 'Remover BP ao perfil do usuário'],
        rules: [{1: 'Acesso ao RDS-WEB', 2: 'RDS WEB'}]
    },
    {
        origin: 'PENHOR',
        destinations: ['INPUT INCORRETO']
    },
    {
        origin: 'PERFIL IMPOSITIVO',
        destinations: ['CONDICION IVA E1-AFIP', 'CONTROL'],
        rules: [{1: 'TAX', 2 : 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'PILHA INDEVIDA',
        destinations: ['OH RECEBIDA EM PILHA INCORRETA', 'PILHAS COM LOTE DUPLICADO']
    },
    {
        origin: 'PLANEJAMENTO DE COMPRAS',
        destinations: ['CADASTRO- RELACAO DE LOCALIDADES', 'PREMIO NAO ATUALIZA NO PRE SLIP']
    },
    {
        origin: 'Plataforma',
        destinations: ['Alteração de descrição de plataforma', 'Cadastro de plataforma (silo/produto)', 'Configuração de nova plataforma', 'Erro de comunicação com plataforma', 'Plataforma não levanta barreira  - Erro no serviço de middleware', 'Plataforma não levanta barreira  - Problemas com PLC', 'Problema físico na leitora', 'RDS não aciona plataforma'],
        rules: [{1: 'Automação', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'Porta "COM"',
        destinations: ['Conexão incorreta à Porta "COM"', 'Driver desatualizado', 'Perda de configuração da porta "COM"', 'Porta "COM" com defeito', 'Porta "COM" indisponível', 'Porta "COM" não comunica com Balança Serial', 'Porta "COM" não comunica com humedímetro', 'Porta "COM" não comunica com PLC'],
        rules: [{1: 'Automação', 2: 'RDS WEB'}]
    },
    {
        origin: 'POSICAO DO TITULAR',
        destinations: ['CONTRATOS PAF ADTO LIQUIDADOS APARECENDO INDEVIDAMENTE', 'MODALIDADE INCORRETA', 'SALDO KILOS VOLUME INCORRETO', 'SLIP DUPLICADO']
    },
    {
        origin: 'PRE INDEX',
        destinations: ['ROBOT DELIVER ISSUES', 'DOC ALREADY INDEXED', 'INCLUDE USER EMAIL TO BP']
    },
    {
        origin: 'PRE SLIP',
        destinations: ['ALTERACAO INCORRETA DO CÂMBIO DE MERCADO', 'CADASTRO DE PREMIO NAO INSERE VALOR EM ALGUMAS REGIONAIS', 'CONTRATO EM ABERTO NAO TRAZ INFORMACÕES', 'CONTRATOS NAO PODEM SER EFETIVADOS', 'FIXACAO CAMBIO COM MERC - QTD FIX MERC INCORRETO', 'FIXACAO CAMBIO COM MERC - SALDO INCORRETO', 'FIXACAO FOB C/ FRETE EM BRANCO', 'FRETE FABRICA INCORRETO', 'FRETE NAO EXIBIDO VALOR PRE SLIP', 'NAO APARECE SALDO PARA FIXAR', 'SALDO DE FIXACAO SO APARECE BUSCANDO BP', 'SLIP GERADO NAO APARECE NO SISTEMA', 'USER - CADASTRO COMPONENTES']
    },
    {
        origin: 'PRESTAMO',
        destinations: ['ERROR PARA BP', 'DESAPLICACION PRESTAMO/FAZON'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'PRIORIDADE DE CONTRATO',
        destinations: ['APLICACAO NAO RESPEITA PRIORIDADE', 'CAK N APARECE POR ESTAR FECHADO', 'NAO E POSSIVEL COLOCAR A PRIORIDADE']
    },
    {
        origin: 'PROBLEMA EMBALAGEM DA PILHA',
        destinations: ['QUANTIDADE EMBALAGENS INDEVIDA']
    },
    {
        origin: 'PROBLEMAS COM LAYOUT',
        destinations: ['BPS EM CATEGORIA INCORRETA']
    },
    {
        origin: 'PROCESO CIERRE',
        destinations: ['COBRO CON AJUSTE DE DIFERENCIA MINIMA', 'DIFERENCIAS DE ASOF AR'],
        rules: [{1: 'FINANCE', 2: 'JDE ENTERPRISE E1/JDE A9', 3: 'ARGENTINA'}]
    },
    {
        origin: 'PROCESO DE PAGO',
        destinations: ['DOCUMENTO QUEDA EN #', 'GRUPO RETENIDO EN LA PANTALLA', 'NCE DE AÑOS ANTERIORES YA EXISTE', 'NO HUBO ESTORNO DEL VOUCHER - F0413 RMPAAP <> 0', 'P55AR020 - NO MUESTRA ERROR CUENTA BANCO CLIENTE']
    },
    {
        origin: 'PROCESO DE VOUCHERS',
        destinations: ['CAMBIO DE CUENTA CONTABLE', 'CAMBIO FACTURA', 'CAMBIO INSTRUMENTO DE PAGO', 'MONTO TOTAL Y ABIERTO DISTINTOS']
    },
    {
        origin: 'PROCESSO',
        destinations: ['ASSOCIACAO ITEM BRANCH', 'DELETAR LINHAS DA TABELA F5540518', 'INFORMACAO DE FUNCIONAMENTO DE PROCESSO']
    },
    {
        origin: 'PROJETOS',
        destinations: ['ALTERACAO DE PO', 'UPDATE NA BASE PARA DEBUG']
    },
    {
        origin: 'PROPOSTA COMERCIAL',
        destinations: ['ADDRESS INCORRETO', 'APLICACAO DE EXCESSO SEM FLAG ATIVA', 'DATAS CONFLITANTES', 'DECIMAIS DE QUANTIDADE INVALIDO', 'FINALIDADE INCORRETA', 'NUMERO DE CONTRATO EM BRANCO', 'PEDIDO SUSPENSO']
    },
    {
        origin: 'QUALIDADE PILHA',
        destinations: ['FALTA PARAMETROS']
    },
    {
        origin: 'QUEBRA DE SECAGEM',
        destinations: ['ERRO RELACIONADO AO HORARIO DE VERAO', 'NAO GEROU QUEBRA NO CARDEX', 'RETIRAR CADASTRO', 'UMIDADE INCORRETA AJUSTES SAIDAS']
    },
    {
        origin: 'QUEBRA TECNICA',
        destinations: ['GERACAO I3 INCORRETA', 'JOB DE QUEBRA TECNICA NAO EXECUTOU', 'LANCAMENTO DE ESTORNO INDEVIDO I3 NA PRIMEIRA QUEBRA', 'VERSAO AGENDADA NAO GERA I3']
    },
    {
        origin: "R5500004 – REPORT OF ROMANEIO DE CARGA",
        destinations: ['INCORRECT CREATION OF LOAD TRANSBORDO']
    },
    {
        origin: "R5549250 - OW X CTMS",
        destinations: ['INCORRECT DATA SELECTION', 'LOAD NAO APARECE NO REPORT']
    },
    {
        origin: 'RDS Captura',
        destinations: ['Configuração do arquivo "config"', 'Criar atalho para o RDS Captura', 'Falha de acesso à pasta do RDS Captura', 'Instalação de RDS Captura', 'RDS Captura não funciona'],
        rules: [{1: 'Automação', 2: 'RDS WEB'}]
    },
    {
        origin: 'RDS Integration',
        destinations: ['Problemas no JOB de Integração', 'Problemas no JOB de replicação', 'Problemas no PIPE'],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
    },
    {
        origin: 'RDXCP',
        destinations: ['FICHA APLICADA E REVERTIDA EM MESES DIFERENTES', 'FRETE ZERADO NA F5560005', 'REVERSAO DE FICHA INCORRETA', 'SALDO DOLAR INDEVIDO']
    },
    {
        origin: "RECEPCION DE FICHAS Y LOAD",
        destinations: ['FICHAS SIN KM', 'INTERFACE', 'OAD/FICHA ANULADO', 'TABLA FLETE EXCEL']
    },
    {
        origin: "RECEPTION",
        destinations: ['INCORRECT REVERSAL OV NUMBER', 'MD - MISSING AAI REGISTER', 'TOLERANCIA ERROR']
    },
    {
        origin: "RECIBOS",
        destinations: ['CONTABILIZACION']
    },
    {
        origin: 'RECINTO',
        destinations: ['REGISTRATION']
    },
    {
        origin: "RECUPERO DE IVA",
        destinations: ['ERROR EN CONTROL CONTRA LIBROS']
    },
    {
        origin: 'REL CONTRATOS FIXO EM ABERTO',
        destinations: ['SALDO A RECEBER INCORRETO']
    },
    {
        origin: 'REL COST CONVERSION',
        destinations: ['CONTRATO NAO APARECE']
    },
    {
        origin: 'RELATORIO COMPOSICAO DE FIXACAO',
        destinations: ['FIXACAO COM VALOR INCORRETO DE ICMS', 'RELATORIO NAO TRAZ VALORES']
    },
    {
        origin: 'RELATORIO CONTA CORRENTE',
        destinations: ['CLASSIFICACOES DE QUALIDADE EM BRANCO', 'CONTRATOS DUPLICADOS RELATÓRIO', 'EXTRACAO DADOS HISTORICOS', 'LENTIDAO', 'NF COMPLEMENTO INDEVIDO', 'PESO SECO RECEBIDO NULO', 'USR - NOTAS ERRADAS PARA PRODUTOR', 'WAD - MOTORISTA INCORRETO NO POSICAO RELATORIO'],
        rules: [{1: 'CONTRATO'}]
    },
    {
        origin: 'RELATORIO CONTA CORRENTE',
        destinations: ['E0 LINHAS NAO EXISTE E E1 COM SALDO ABERTO', 'E1 DUPLICADO RELATÓRIO', 'NOTA DE E0 NAO APARECE', 'NOTA DE E1 NAO APARECE'],
        rules: [{1: 'ARMAZENAGEM'}]
    },
    {
        origin: 'RELATORIO CONTAS A PAGAR',
        destinations: ['CAMPO URDT NAO PREENCHIDO', 'CONTRATO NAO APARECE NO RELATÓRIO', 'DESCONTO INDEVIDO - VALOR PARCIALMENTE FIXADO', 'FETHAB INDEVIDO - VALOR PARCIALMENTE FIXADO', 'VALOR EM ABERTO INDEVIDO', 'VALORES DIF REL DIARIO DE COMPRAS FX REAIS', 'VALORES FUNRURAL INDEVIDO', 'VALORES INDEVIDOS', 'X0 EM ABERTO NAO APARECE EM RELATORI']
    },
    {
        origin: 'RELATORIO CONTRATOS EM ABERTO',
        destinations: ['ALTERACAO DE BP APARECENDO INCORRETAMENTE', 'CONTRATO APARECE INCORRETO - LNIX 0 NA F5543081', 'CONTRATO NAO APARECE NO RELATORIO', 'CONTRATOS COM EXCESSO COM VOLUME NEGATIV', 'LINHA COMP APARECENDO COMO NPE', 'MODAL DESTINACAO INCORRETO', 'NAO APARECE OS COMPONENTES FIXOS', 'QUANTIDADE CANCELADA EM DUPLICIDADE', 'QUANTIDADE INCORRETA NO RELATORIO', 'USR - VOLUME INCORRETO']
    },
    {
        origin: 'RELATORIO CREDITO SUSPENSO',
        destinations: ['CAK NAO APARECE NO RELATORIO', 'NAO APARECE ICMS A DEVOLVER', 'REMOVER ICMS A DEVOLVER E A COMPLEMENTAR']
    },
    {
        origin: 'RELATORIO DE FICHAS',
        destinations: ['FICHA REVERTIDA CONSTA NO RELATÓRIO']
    },
    {
        origin: 'RELATORIO DE ROMANEIO',
        destinations: ['DESCONTO QUALIDADE DIVERGENTE RDS', 'ERRO PERCENTUAL UMIDADE E QUEBRA', 'FINALIDADE FISCAL BDM']
    },
    {
        origin: 'RELATORIO DECLARACAO DA FIXACAO',
        destinations: ['NAO CONSTA NA F5542800']
    },
    {
        origin: 'RELATORIO DEMONSTRATIVO DE OPERACOES',
        destinations: ['CONTRATO COM LINHA DUPLICADA', 'SLIPS SEM PRECO NEGOCIADO']
    },
    {
        origin: 'RELATORIO DESCONTO DE ROYALTIES',
        destinations: ['DIVERGENCIA COM REL DE FICHAS', 'IMPRESSAO CORTADA']
    },
    {
        origin: 'RELATORIO DIARIO DE COMPRAS',
        destinations: ['DOCUMENTOS COM VALOR/QTDE INDEVIDA', 'FICHA STATUS APLICADA S/ CONTRATO', 'INCORRETO PRECO AND SALDO A PAGAR', 'NF COM NUMERACAO ERRADA', 'NOTA INCORRETO NO RELATORIO', 'PRECO INCORRETO NO RELATORIO', 'VALOR DO ICMS DA FICHA NAO APARECE']
    },
    {
        origin: 'RELATORIO DIARIO DE COMPRAS FIXO',
        destinations: ['DESCONTO VALOR INCORRETO', 'FETHAB E FUNRURAL NAO APARECEM', 'FICHA NAO APARECE NO RELATORIO', 'NF COM + 6 DIGITOS NAO APARECE', 'VALOR DE PESO INCORRETO']
    },
    {
        origin: 'RELATORIO GERACAO NFE',
        destinations: ['CONTRA NOTA GERANDO INCORRETAMENTE', 'DADOS NF EM BRANCO', 'LENTIDAO', 'LIMPEZA DO RELATORIO GENERATE', 'NOTAS GERADAS EM DUPLICIDADE']
    },
    {
        origin: 'RELATORIO IMPRESSAO NFE',
        destinations: ['INCLUIR BP SELECAO DE DADOS', 'LENTIDAO', 'MENSAGEM COMPLEMENTAR NAO IMPRESSA', 'NOTA NAO IMPRESSA', 'TABLE LOCK F5576505 - JOB R5676001']
    },
    {
        origin: 'RELATORIO NOTA FISCAL ENTRADA',
        destinations: ['APRESENTANDO INFORMACAO INDEVIDA']
    },
    {
        origin: 'RELATORIO PRECO MEDIO',
        destinations: ['PRECO MEDIO INCORRETO']
    },
    {
        origin: 'RELATORIO REVALORIZACAO',
        destinations: ['CALCULO PMK INCORRETO', 'RELATORIO COM LENTIDAO', 'REVALORIZACAO TRAZENDO VALOR MESMO COM CARDEX ZERADO', 'VALORIZACAO DOLAR COM VALOR DISTORCIDO']
    },
    {
        origin: 'RELATORIO ROMANEIO POR FORNECEDOR',
        destinations: ['DUPLICIDADE DE NOTA FISCAL', 'FICHA COM PESO INCORRETO', 'FICHA NAO APARECE EM RELATORIO', 'LENTIDAO JOB', 'NOTA COM 8 DIGITOS', 'VALOR DESC QUAL INCORRETO', 'VALOR TOTAL DA NF INCORRETO']
    },
    {
        origin: 'RELATÓRIO SEM INFORMACAO',
        destinations: ['NAO APARECE UMIDADE PARA IA']
    },
    {
        origin: 'RELATORIOS',
        destinations: ['POSICAO DO TITULAR EXIBINDO CONTRATOS LIQUIDADOS', 'USR - RELATORIO ANALISE DE SILO E BALANCA INCORRETO'],
        rules: [{1: 'CACAU', 2: 'ORIGINATION'}]
    },
    {
        origin: 'RELATORIOS',
        destinations: ['SLIPS GERADOS DENTRO DE UM PERIODO'],
        rules: [{1: 'REQUEST', 2: 'ORIGINATION'}]
    },
    {
        origin: 'REPORT',
        destinations: ['LOG PESCADOR'],
        rules: [{1: 'CTMS'}]
    },
    {
        origin: 'REPORT',
        destinations: ['REPORT EXECUTION'],
        rules: [{1: 'FIXED ASSET'}]
    },
    {
        origin: 'REPORT',
        destinations: ['2+ WEIGHING LINES FICHAS WRONG WEIGHING', 'AUDITTING REPORT WRONG WEIGHING TYPE', 'DOBLE FICHA APPEARS IN PERFORMANCE REPORT', 'DUPLICATE LINE TO REPORT CONFERENCE', 'DUPLICATED LINE TO RELATORIO DE EXPEDICAO', 'EXCEL DATA REPORT', 'FEW FILTERS AT REPORT GENERATION', 'FICHA DO NOT APPEAR IN THE QUALITY AUDIT REPORT', 'FICHA NOT SYNCHRONIZED IN PRDSL', 'FICHA STEPS DATA REPORT', 'FICHA WITHOUT LOAD INFORMATION NO APPEAR IN REPORTS', 'LOCKED DRIVERS REPORT', 'MANUAL WEIGHING DOESNT APPEAR IN REPORT', 'NO DATA OF SACARIA TYPE', 'NO SUPPORT ACTION', 'REPORT NOT ASSOCIATED TO THE BRANCH', 'REPORT TOO LONG DOES NOT GENERATE', 'REPORT WITH WRONG VALUE TO RATEIO', 'USER NEEDS INCORRECT REPORT FORMAT', 'USER WAS INPUTING WRONG FILTER', 'WRONG FIELD TO BALANCA NAME', 'WRONG USER APPEAR IN DATA REPORT'],
        rules: [{1: 'RDS'}]
    },
    {
        origin: 'REPORT',
        destinations: ['DADOS TRANSACIONAIS'],
        rules: [{1: ['VENTAS', 'SAP BO']}]
    },
    {
        origin: 'REPORT',
        destinations: ['BANCO DE DADOS'],
        rules: [{1: 'SAP BO', 2: 'SAP BO - REPORTES'}]
    },
    {
        origin: 'REPORT',
        destinations: ['FICHAS WITHOUT NF NOT APPEAR IN REPORT', 'WIPRO - EXCEL REPORT CONFIG'],
        rules: [{1: 'RDS'}]
    },
    {
        origin: 'REPORT ASOF',
        destinations: ['NO GENERA DOCUMENTOS'],
        rules: [{1: 'ACCOUNTS PAYABLE', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'REPORTE DE INTEGRIDAD',
        destinations: ['DIFERENCIA F0902 X F1202'],
        rules: [{1: 'FIXED ASSET', 2: 'JDE A9 WS'}]
    }, 
    {
        origin: 'REPORTS',
        destinations: ['DATA IS MISSING IN THE REPORT', 'DIFFERENCE IN BALANCE', 'INCORRECT DATA IN THE REPORT', 'SLWONESS REPORT'],
        rules: [{1: 'ADE02'}]
    },
    {
        origin: 'REPORTS',
        destinations: ['DATA IS MISSING IN THE REPORT', 'DIFFERENCE IN BALANCE', 'INCORRECT DATA IN THE REPORT', 'SLWONESS REPORT'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'REPORTS GL',
        destinations: ['REDISTRIBUCION Y MONITOREO'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'REPORTES COMPRAS',
        destinations: ['CONTRATO MIGRADO', 'DETALLE DE COMPRAS', 'ERROR AMPLIACION', 'ERROR DESAPLICACION FICHA', 'FICHA OH DESAPLICADA NO EXISTE F554311H', 'FICHA OH DESAPLICADA NO EXISTE F5543027', 'CAPA SLIP ERROR', 'SLIP CANCELACION', 'ERROR LIQUIDACIONES', 'ERROR SLIP FIJACION', 'ERROR ESTADO SLIP', 'ERROR OPEN CONTRATO', 'ERROR MERMA', 'FICHA VOLUMEN DISTINTO STOCK', 'FIJACION REVERSADA', 'FICHA OH PARCIAL', 'ANULACION CONTRATO', 'AGING COMPRAS', 'OPEN COMPRAS', 'APLICACIONES COMPRAS'],
        rules: [{1: 'ACCOUNT MODEL', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'REPORTES INSUMOS',
        destinations: ['NEW TRADE VS MOVIM STOCK', 'P&L VS MOVIM STOCK', 'ERROR CONTRADOC ORDEN', 'ESTADO LOAD ERROR', 'FICHA DESAPLICADA PARCIAL', 'FICHA GL VALOR SIGNO INVERTIDO', 'LOAD SIN FECHA ADDJ Y FALTA I0', 'RM REVERSO ERROR', 'VOLUMEN INCORRECTO', 'DESPACHO SIN FECHA', 'FICHA INTERFASE FTS', 'CONTRATO INTERFASE FTS', 'ERROR INTERFASE FTS', 'FICHA SIN OP/O6', 'ERROR ESTADO LOAD', 'DEVOLUCION INCORRECTA', 'ANULACION LOAD INCORRECTO', 'CONTRADOC REFACTURADA', 'FICHA OH PARCIAL', 'FACTURA P# COMPRAS REVERSADA', 'TRANSITO TRANSFERENCIA', 'ERROR VALOR FACTURA RI/RM', 'ERROR FICHA DESAPLICADA', 'ERROR VOLUMEN F5641051', 'LIQUIDO PRODUCTO', 'NEW TRADES COMPRAS', 'NEW TRADES VENTAS', 'NEW TRADES FTS', 'SALDO INSUMOS', 'STOCK INSUMOS DATOS BLANCOS', 'STOCK INTERFACE FTS', 'P&L INSUMOS', 'CASH TRADES', 'AJUSTE H8'],
        rules: [{1: 'ACCOUNT MODEL', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'REPORTES SERVICIOS',
        destinations: ['APLICACIONES Y SALIDAS', 'P&L FLETES SERVICIOS'],
        rules: [{1: 'ACCOUNT MODEL', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'REPORTES VENTAS',
        destinations: ['CONTRATOS/OREDEN MIGRADOS', 'OPEN DE CONTRATOS ERROR', 'REASIGNACION CONTRATOS BLANCOS', 'ERROR MERMA', 'ERROR TIPO CONTRATO', 'TICKET FIJACION SIN DESPACHO', 'ERROR AMPLIACION', 'ERROR TOLERANCIA', 'PENDIENTE FACTURAR', 'ANULACION DESPACHO', 'ANULACION OPEN SIN SPLIT', 'AGING VENTAS', 'DETALLE VENTAS', 'APLICACIONES VENTAS', 'OPEN VENTAS'],
        rules: [{1: 'ACCOUNT MODEL', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'REPOSTEO DE ITENS',
        destinations: ['REPOSTEO DE ITEM LIBRO Y CUENTA'],
        rules: [{1: 'FIXED ASSET', 2: 'JDE A9 WS'}]
    }, 
    {
        origin: 'REPROCESSAMENTO RELATORIO',
        destinations: ['BREAK INCORRETO', 'BREAK INCORRETO - CUT OFF RETROATIVO', 'COLUNA MES E ANO INCORRETOS', 'QUEBRA NAO EXECUTOU AUTOMATICAMENTE']
    },
    {
        origin: 'REQUEST',
        destinations: ['AJUSTE CUSTO ALTERA B0'],
        rules: [{1: 'B0'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['CRIAR CONVENIO PARA CARTA DE PORTE'],
        rules: [{1: 'CARTA PORTE'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['CORRECAO DE CI'],
        rules: [{1: 'CI'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['DISPONIBILIZAR BASE COM OS DADOS COMPETENCIA MES ANTERIOR', 'PROCESSAMENTO COMO RISK COMPLIANCE - ALTERAR STATUS PARA INVALIDO', 'VERIFICAR STATUS (RELATORIO)'],
        rules: [{1: 'GDF'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['CHECK INVALID INVOICES ON MASTERSAF', 'EXCLUDE INVOICES FROM MASTERSAF', 'EXCLUDE INVOICES FROM TEMPORARY MASTERSAF', 'EXECUTE SCRIPTS ON PROD', 'EXTRACT DATA REPORT'],
        rules: [{1: 'MASTERSAF'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['ALTERACAO DE STATUS OP'],
        rules: [{1: 'OP'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['ADDRESS EXCLUSION', 'CHANGE SMARTCARD', 'DEPARTAMENT EXCLUSION', 'DESKTOP NAMES LIST', 'DRIVER HISTORY', 'ENABLE BALANCE MEASUREMENT SCREEN', 'LIST OF USERS REPORT', 'NO SUPPORT ACTION', 'REPORT WITH ALL NF AND FICHA', 'CHANGE FIELD NAME IN RDS', 'ADD PRODUCT DETAIL', 'CHANGE RANGE PRODUCTS', 'INFORMATION ABOUT REPORT', 'REPORT FOR AUDITING', 'REPORT OF FICHA FOR AN OPERATION TYPE', 'SMARTCARD LIST', 'CUSTOM REPORT'],
        rules: [{1: 'RDS'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['ACCESS FOLDERS'],
        rules: [{1: 'SAP BO'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['RUN EXTRA INTERFACE SCI'],
        rules: [{1: 'TIBCO'}]
    },
    {
        origin: 'REQUEST PARAMETERIZATION',
        destinations: ['FALTA PARAMETRIZACAO']
    },
    {
        origin: 'RESUMO DO CARDEX',
        destinations: ['OVERLAP ON BATCH R5541106C REPROC'],
        rules: [{1: 'COSTS AND INVENTORY'}]
    },
    {
        origin: 'RETENCION',
        destinations: ['B$ NO GENERADO EN F76A09']
    },
    {
        origin: 'RETENCIONES',
        destinations: ['BATCH QUEDA APROBADO Y NO CONTABILIZA', 'LINEAS RETENCIONES DUPLICADAS']
    },
    {
        origin: 'REVALORIZACAO',
        destinations: ['ET SEM BP NO CARDEX', 'PROCEDIMENTO DO USUARIO', 'VALORIZACAO DOLAR COM VALOR DISTORCIDO']
    },
    {
        origin: 'REVERSAO',
        destinations: ['ALTERACAO DA DATA DE REVERSAO NO CARDEX', 'FICHA APLICADA SEM CONTRATO', 'FICHA PARCIALMENTE REVERTIDA', 'FICHA REVERTIDA SEM REVERTER X0', 'LINHA DA REVERSAO COM PRECO INCORRETO', 'REVERSAO PARCIAL NAO DELETA LINHA OG/O9', 'REVESAO INDEVIDA']
    },
    {
        origin: 'REVERSAO X0',
        destinations: ['ERRO EXCLUSAO PARCIAL DO ZK']
    },
    {
        origin: 'RI - ACCOUNT',
        destinations: ['COA - ACCOUNT CONFIGURATION', 'MASTER DATA - AAI', 'ORDER WITH WRONG STATUS', 'DATE OF LAST MONTH', 'EXECUTED TAX-LINE AND SALES UPDATE', 'SUBACCOUNT BLANK OR INVALID']
    }, 
    {
        origin: 'RONDA',
        destinations: ['NO SUPPORT ACTION'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'RTDUET',
        destinations: ['NO SUPPORT ACTION'],
        rules: [{1: 'CORPORATE', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'SALDO',
        destinations: ['COLUNA DE SALDO ATUAL MES/DIA/ANO INDEVIDO', 'RD NAO TRAS LINHAS DE SALDO', 'REPROCESSAR RD', 'SALDO ANTERIOR INCORRETO', 'SALDO ARREDONTAMENTO', 'SALDO DOLAR INDEVIDO', 'PRECO MEDIO DE SAIDAS']
    },
    {
        origin: 'SALDO DE CUENTA DESBALANCEADO',
        destinations: ['FALTA LINEAS PARA LIBROS XA Y XT'],
        rules: [{1: 'FIXED ASSET', 2: 'JDE A9 WS'}]
    }, 
    {
        origin: 'SALES FORCE',
        destinations: ['MD - CUSTOMER X CIA', 'PESO NAO INTERFACEADO']
    },
    {
        origin: 'SALES MAP',
        destinations: ['ORDER WITH WRONG STATUS', 'SU - ORDER WITH INCORRECT STATUS', 'EXTEMPORANEO CANCELLATION', 'INVOICE CANCELLED INCORRECTLY', 'WRONG DATA SELECTION', 'CANCELA GERA NOVA NOTA IMPACTA MV', 'NOTA IS WITH STATUS 607 – 998', 'SIMULATED LOAD AND INVOICE']
    },
    {
        origin: 'SAP BO - REPORTE',
        destinations: ['REPORT ERROR']
    },
    {
        origin: 'SEQUENCE REPORT PGA',
        destinations: ['QUERY 218B TOO HEAVY SEQUENCE REPORT PGA']
    },
    {
        origin: 'SERVICES',
        destinations: ['INTEGRATOR SERVICE IN HANG STATUS'],
        rules: [{1: 'ONESOURCE'}]
    },
    {
        origin: 'SERVICES',
        destinations: ['ACTIVAR SH', 'ANULACION SH', 'DESAPLICACION PRESTAMO/FAZON', 'ERROR EN TRANSFERENCIA', 'ERROR FECHA VTO EN FACTURACION', 'FC INDEBIDAS PARA HUMEDAD Y SECADA', 'GENERACION SH', 'GLUCOVIL - SH DUPLICADAS', 'NO TRAE LOS PRECIOS DEL PACK DE SERVICIOS', 'UBICACION NO ESTA EN ARCH UBIC ARTICULO'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'SERVICO DE ARMAZENAGEM',
        destinations: ['ERRO ASSOCIACAO ITEM BRACH', 'HOMOLOGACAO NAO SEGUE FLUXO DE APROVACAO', 'VALORES EXIBIDOS RELATORIO INCORRETO']
    },
    {
        origin: 'Servidor de dados/aplicação',
        destinations: ['Atualização de certificado de servidor', 'Problemas de performance - Lentidão ao acionar barreiras', 'Problemas de performance - Lentidão ao capturar peso', 'Problemas de performance - Lentidão ao salvar ficha', 'Problemas de performance - Lentidão ao transmitir ficha', 'Problemas de performance - Lentidão generalizada do sistema', 'Servidor inacessível - Problemas com infraestrutura local', 'Servidor inacessível - Problemas com link de dados'],
        rules: [{1: 'Servidores', 2: 'RDS WEB'}]
    },
    {
        origin: 'Servidor de middleware',
        destinations: ['Atualização de certificado de servidor', 'Erro de comunicação com PLC - Erro de configuração de DNS', 'Erro de comunicação com PLC - Erro de mapeamento nos PC', 'Erro de comunicação com PLC - Problema de conexão física', 'Erro de comunicação com PLC - Problemas de rede local', 'Serviço inativo ou travado - Serviço inativo', 'Serviço inativo ou travado - Serviço travado'],
        rules: [{1: 'Servidores', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'SETTLEMENT/BORRADOR',
        destinations: ['ANULAR J7', 'CANTIDAD INCORRECTA A LIQUIDAR', 'DOCUMENTO EN ESTADO "4"', 'ELIMINAR l#', 'ELIMINAR X0', 'ERROR DE BORRADOR', 'ERROR LIQUIDACION', 'ERROR LOCALIDAD DE LOS L#', 'ERROR YQ718E054 – EN BORRADOR LIQUIDACION', 'FLETE ANTECIPADO', 'ID TRABADO EN LA PANTALLA DE BORRADOR', 'NO AJUSTA BORRADOR', 'NO ES POSIBLE GERAR LA PROFORMA FINAL', 'NO GENERA BORRADOR', 'RESERVADO PARA OTRO USER', 'X0 CON DIFERENCIA POR MERMA', 'X0 NO GENERADO - FALTA FIJACION'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'SET UP RETENCIONES IIBB',
        destinations: ['SUPPORT - PARAMETERIZACION DE IIBB']
    },
    {
        origin: 'SET UP UDC',
        destinations: ['SUPPORT - ANADIR CODIGO EN UDC']
    },
    {
        origin: 'SET UP VERSION',
        destinations: ['SUPPORT - CAMBIO SELECCION DE DATOS']
    },
    {
        origin: 'SETUP',
        destinations: ['CREAR DATA COMPLEMENTARIA', 'MODIFICAR'],
        rules: [{1: 'ADDRES BOOK', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'SETUP',
        destinations: ['INACTIVACION'],
        rules: [{1: 'ADDRES BOOK', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'SETUP',
        destinations: ['INACTIVACION MASIVA'],
        rules: [{1: 'ADDRES BOOK', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'SETUP',
        destinations: ['CONSTANTE BP'],
        rules: [{1: 'ORDERS', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'SETUP',
        destinations: ['BLOQUEIO AB', 'MD - CAMBIO UDC'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'SETUP',
        destinations: ['FLEXIBLE MAIL', 'INTEGRIDADES', 'ROBOT - NUEVO PROCESO', 'ROBOT - MODIFICACIÓN DE PROCESO', 'ROBOT - CANCELACIÓN DE PROCESO'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'SETUP',
        destinations: ['CAMBIO TAXAS DE FECHAMENTO'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS', 3: 'BRAZIL'}]
    },
    {
        origin: 'SETUP VERSION',
        destinations: ['CAMBIO SELECCION DATOS P09110Z'],
        rules: [{1: 'ACCOUNTING'}]
    },
    {
        origin: 'SHIPMENT BOARDING REPORT',
        destinations: ['FAILED ON SENDING SHIP INFORMATION SHIPMENT BOARDING REPORT', 'SEQUENCE COUNTER OUTDATED SHIPMENT BOARDING REPORT']
    },
    {
        origin: 'SHIPMENT MOVEMENT REPORTS',
        destinations: ['CONTRACT STILL ACTIVE SHIPMENT MOVEMENT REPORTS', 'DIVERGENCE IN GERENCIAL REPORT SHIPMENT MOVEMENT REPORTS']
    },
    {
        origin: 'SHIPMENT ORDER',
        destinations: ['SHIPMENT RECTIFICATION ERROR', 'UNAVAILABLE BALANCE'],
        rule: [{1: 'CORPORATE'}]
    },
    {
        origin: 'SLIP',
        destinations: ['INFORMACAO SOBRE ATUALIZACAO DE PREMIO']
    },
    {
        origin: 'SLIP DE ALTERACAO',
        destinations: ['ADDRESS FAZENDA INCORRETO', 'ALTERACAO ALTEROU COMPONENTES INDEVIDAMENTE', 'ALTERACAO FINALIDADE GEROU NOVO CONTRATO', 'ALTERACAO GEROU NUMERACAO DIFERENTE DE CONTRATO', 'ALTERACAO INCOMPLETA', 'ALTERACAO PRECO NAO ATUALIZOU COMPONENTES', 'ALTEROU FAZENDA NAO ATUALIZOU PROP COMERCIAL', 'ALTEROU O VALOR DE FRETE AUTOMATICAMENTE', 'CONTRATO DESTINO VOLUME INCORRETO', 'DESTINACAO INVALIDA', 'ERRO - ADIANTAMENTO NAO PERMITIDO', 'ERRO - HA FICHAS PENDENTES APLICAR', 'FALHA NA EFETIVACAO - FINALIDADE INCORRETA', 'GERADO CONTRATO DUPLICADO', 'LINHA NAO APARECENDO PARA ALTERACAO', 'NAO ALTERA DESTINACAO', 'NOTA PROMISSORIA NAO E IMPRESSA', 'OPERACAO NAO PERMITIDA AO USUARIO', 'RESTRICAO DE CADASTRO - BLACKLIST', 'SLIP EM USO', 'SLIP NAO ALTEROU BP', 'SLIP NAO CRIOU NOVO CONTRATO', 'USR - ALTERACAO DE PRECO INCORRETA']
    },
    {
        origin: 'SLIP DE CANCELAMENTO',
        destinations: ['NAO APARECE SALDO PARA CANCELAR', 'SLIP BLOQUEADO', 'SLIP COM SALDO MAIOR QUE CAK', 'USER ERROR - CANCELAMENTO INDEVIDO']
    },
    {
        origin: 'SLIP DE CONTRATO',
        destinations: ['ADDRESS BLOQUEADO', 'ADDRESS COM ERRO - GERENTE DE COBRANCA', 'CANCELAMENTO DE SLIP EFETIVADO', 'CANCELAMENTO DE SLIP PENDENTE', 'COMPONENTES STATUS S', 'DATA DE ENTREGA DO CONTRATO INCORRETA', 'ENVIO DE EMAIL', 'ERRO "SEM LIMITE RISCO MERCADO"', 'ERRO DESTINACAO INVALIDA', 'ERRO FINALIDADE FISCAL', 'ERRO VERSAO DO PROGRAMA INVALIDO', 'FALHA NA CRIACAO DO CONTRATO', 'FECHA ORDEN', 'JDE FORA DO AR', 'NAO GERADO F4311', 'SALDO COMP INCORRETO', 'SLIP CAI PARA APROVACAO ANTES DE HORARIO LIMITE', 'USR - CAK NAO SALVA DEVIDO PRECO']
    },
    {
        origin: 'SLIP DE FIXACAO',
        destinations: ['ALTERACAO DE BOLSA DE REFERENCIA', 'CAMBIO GERADO SEM BOLSA FIXADA', 'CANCELAMENTO DE SLIP PENDENTE', 'CBOT DIVERGENTE DE CAPA DO SLIP', 'COMP PREMIO AF NAO APARECE', 'COMPONENTES COM VALORES ERRADOS', 'CONTRATO COM NÚMERO INCORRETO', 'CUSTO TOTAL INCORRETO', 'ERRO - DATA LIMITE NAO ENCONTRADA', 'ERRO DE CADASTRO INVALIDO AO EFETIVAR', 'ERRO DE ETIQUETA', 'ERRO DE REVERSAO DEVIDO A NOTA GERADA', 'ERRO NA CONTABILIZACAO DE FIXACAO', 'FALHA DE PROCEDIMENTO', 'FICHA FOB SEM FRETE CALCULADO', 'FICHA REVERTIDA ANTES DE EFETIVACAO', 'FIXACAO COMP NAO GEROU LINHA DOLAR', 'FIXACAO DE MATA MATA COM ERRO', 'FIXACAO GERA SLIP 12', 'FIXACAO NAO CONTEMPLA CREDITO PIS', 'FIXACAO NAO SALVOU NA F5543081', 'FRETE FOB EM BRANCO', 'ITEM INCORRETO', 'L1 DE COMPLEMENTO INCORRETO NO CARDEX', 'LENTIDAO FIXACAO CACAU', 'LOCK TABELAS', 'MATA MATA NAO CANCELOU SALDO', 'NAO GEROU LINHA F4311', 'NAO GEROU TIPO DA LINHA', 'PRECO INCORRETO-CADASTRO', 'PRECO POR SACA INCORRETO APOS FIXAR CAMBIO', 'PROBLEMAS COM INTERFACE CMA', 'PROVISAO DE CAMBIO NAO ATUALIZOU SLIP', 'PROVISAO DE CAMBIO COM PTAX80 ATRASADA', 'QTDE INSUFICIENTE 2 SLIPS P', 'QUANTIDADE INSUFICIENTE', 'QUANTIDADE INSUFICIENTE - UOPN = 0', 'REVERSAO NAO RETORNOU SALDO EM CONTRATO', 'SAFRA FUTURA', 'SALDO INSUFICIENTE', 'SLIP ASSUMINDO PRECO INCORRETO APOS ROLAGEM', 'SLIP EFETIVADO PARCIALMENTE', 'STATUS DE SLIP INCORRETO', 'TOOLCOST REMOVIDO APOS FIXACAO', 'NAO ENCONTRADO PEDIDO PARA EFETIVACAO', 'USER NAO AUTORIZADO', 'VALOR FIXADO DIFERE DE CAPA DO SLIP', 'VOLUME NAO APARECE PARA FIXAR - SAFRA ERRADA']
    },
    {
        origin: 'SLIP DE REVERSAO',
        destinations: ['ALTERAR DATA DA FIXACAO', 'FALHA DE PROCEDIMENTO', 'FIXACAO COM APLICACAO', 'NAO REVERTEU F4311', 'STATUS INCORRETO EM F43121']
    },
    {
        origin: 'Solicitação',
        destinations: ['Alteração ou ajuste relatório', 'Gerar relatório manual', 'Relatório com dados duplicados'],
        rules: [{1: 'Relatório', 2: 'RDS WEB'}]
    },
    {
        origin: 'SOLICITACAO DE CREDITO',
        destinations: ['CADASTRO IMOVEL INCORRETO', 'CREDITO APROVADO EM ALCADA INCORRETA', 'ERRO AO TENTAR EXCLUR IMOVEL DE PRODUTOR', 'ERRO DE ACESSO', 'ERRO GERACAO ROTEIRO HOMOLOGACAO', 'OPCOES INVALIDAS NA CHECKLIST', 'ROTEIRO DE APROVACAO NAO CRIADO', 'STATUS DE HOMOLOGACAO INCORRETO', 'VALOR CREDITO/RISCO PROPOSTO INCORRETO']
    },
    {
        origin: 'SOLICITACAO DE USUARIO',
        destinations: ['USER - PARAMETRIZADO GERACAO DE B0-I3']
    },
    {
        origin: 'SOPORTE CONTABLE',
        destinations: ['APLICACIONES Y FIJACIONES FLETES', 'APLICACIONES Y FIJACIONES GRANOS', 'LIQUIDACIONES GRANOS', 'MOVIMIENTOS DETALLADOS STOCK', 'LISTA DE PRECIO'],
        rules: [{1: 'ACCOUNT MODEL', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },  
    {
        origin: 'SPLIT',
        destinations: ['DATA DE SPLIT DIFERENTE DE CONTRATO ORIGINAL', 'DUPLICIDADE SLIP 12 JA PAGO', 'SPLIT NAO CANCELA VOLUME', 'SPLIT UNP NAO COPIA FERRAMENTA']
    },
    {
        origin: 'STATUS INCORRETO',
        destinations: ['ALTERADO PARA W'],
        rules: [{2: 'ORIGINATION', 3: 'BRAZIL'}]
    },
    {
        origin: 'STOCK',
        destinations: ['BREAK BY DRY', 'PROBLEMA EN LOS DATOS', 'SOJA EPA', 'GENERACION DE AJUSTE'],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'STOCK',
        destinations: ['UMIDADE EM BRANCO NO CARDEX', 'STOCK G7 FECHAS'],
        rules: [{1: 'PLANTS & OPERATIONS'}]
    },
    {
        origin: 'STOCK MODULE',
        destinations: ['ADJUST TYPE INPUT STOCK MODULE', 'ON CANCELLING NFL - ENTRY INVOICES CONTINUES AS STOCK MODULE', 'ON RETENTION BALANCE - 1KG DIVERGENCE STOCK MODULE', 'INCORRECT QUANTITY TRANSACT TABLES X KARDEX']
    },
    {
        origin: 'STORAGE',
        destinations: ['LIBERAR SPACIO CUENTA'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS'}]
    }, 
    {
        origin: 'SWEEP',
        destinations: ['MESCLA DE COMPAÑIA'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS'}]
    }, 
    {
        origin: 'TAX',
        destinations: ['MSAF MONITORING N6'],
        rules: [{1: 'PROCUREMENT', 2: 'PROPERTY'}]
    }, 
    {
        origin: 'TAX AREAS',
        destinations: ['CREACION NUEVA TAX AREA']
    },
    {
        origin: 'TELA MANUTENCAO NFE',
        destinations: ['CNPJ INCORRETO', 'NF AUTORIZADA MAS FOI REVERTIDA', 'NF NAO APARECE NA TELA DE MANUTENCAO', 'SIGNATURE NAO RETORNOU STATUS', 'SOLICITACAO USUARIO PARA ALTERAR STATUS']
    },
    {
        origin: 'TICKET DE PRICING',
        destinations: ['CBOT NAO APARECE PARA FIXAR', 'ERRO PARA CRIAR TICKET - CAMPOS EM BRANCO']
    },
    {
        origin: 'TICKET FUTUROS',
        destinations: ['BMF CORN NAO SOBE PARA JDE']
    },
    {
        origin: 'TIPOS DE CÂMBIOS',
        destinations: ['MODIFICACIÓN DEL TIPO DE CÂMBIO'],
        rules: [{1: 'ACCOUNTS PAYABLE', 2: 'JDE A9 WS', 3: 'BRAZIL'}]
    },
    {
        origin: 'TOLFLUX BATELADAS',
        destinations: ['NOVO MODULO BALANCA TOLFLUX BATELADAS', 'WRONG PARAMETRIZATION TOLFLUX BATELADAS']
    },
    {
        origin: 'TOTEM',
        destinations: ['FICHA STEP', 'NO SUPPORT ACTION', 'SMS ERROS']
    },
    {
        origin: 'TRANSFER',
        destinations: ['QUEBRAS INDEVIDAS', 'REPORT WITHOUT FREIGTH VALUE', 'DATE OF ARRIVAL WRONG', 'ORDER AND LOADS CANCELLED', 'ORDER WITH DIVERGENT WEIGHT', 'ORDER WITH INCORRECT STATUS', 'SU - LOAD CANCELLED BY SUPPORT', 'INVOICE CANCELED IN SIGNATURE WRONGLY', 'LOAD CREATED WITH INCORRECT BP', 'REPORT GENERATION', 'VTS VALUE ADJUST']
    },
    {
        origin: 'TRANSFERENCIA',
        destinations: ['LOAD CANCELADO SIN PEDIDO REVERTIDO', 'ERROR-AAI PED SEM HEADER', 'RECEPCION', 'REVERSION DE RECEPCION']
    },
    {
        origin: 'TRANSFERENCIA DE DIVIDA',
        destinations: ['AW NO CAK DESTINO GERADO COM FALTA DE PARÂMETROS', 'PV COM FLAG INCORRETO A', 'REDUNDANTE LINHA V4 GERADO NO DESTINO CONTRATO', 'TRANSFERENCIA INCOMPLETA - NAO FOI P/ CAK DESTINO', 'AW REVERTIDA INCORRETAMENTE']
    },
    {
        origin: 'TRANSFERENCIA DE SALDO',
        destinations: ['EXCLUSAO INDEVIDA DE AW', 'PROBLEMA COM GERACAO DE AW - FALTA DE AAI']
    },
    {
        origin: 'TRANSLATION',
        destinations: ['CIERRE DEL MES', 'COA DUPLICIDADE EN LA CONFIGURACIÓN  DEL ID COMPUTADOR', 'CONFIGURACIÓN DE LA CUENTA', 'ELIMINAR DOCUMIENTOS JXS PARA REPROCESO', 'ELIMINAR REGISTROS LIBRO US', 'LIBRO UB', 'SALDO EN  CUENTA US', 'DUPLICIDADE DE LANZAMIENTOS'],
        rules: [{1: 'PROCESO CIERRE', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'TRANSIT',
        destinations: ['VALUES WITHOUT DESTINATION OF BP', 'PREVIOUS TRANSIT']
    },
    {
        origin: 'TRANSMISIONES DE COMPRAS RETENCIONES',
        destinations: ['CONTROL DE EJECUCIONES']
    },
    {
        origin: 'TRANSMISIONES DE VENTAS PERCEPCIONES',
        destinations: ['ARREGLOS PREVENTIVOS', 'CONTROL DE EJECUCIONES']
    },
    {
        origin: 'TROCA DE TITULARIDADE',
        destinations: ['COMPRA AUTOMATICA']
    },
    {
        origin: 'USER',
        destinations: ['ACCOUNT LOKED', 'CITRIX ACCESS', 'MAP CITRIX FOLDER', 'NO SUPPORT ACTION', 'USER ACCESS WRONG FILIAL', 'USER CANNOT ACCESS RDS LOCALLY', 'USER PROCESS WITHOUT UPDATE', 'USER WITHOUT ACCESS PERMISSION', 'WRONG CRACHA INPUT']
    },
    {
        origin: 'VALIDACION DOCUMENTOS DE VENTAS',
        destinations: ['ERROR AL FACTURAR', 'ERROR EN CALCULO DE IMPUESTOS']
    },
    {
        origin: 'VEHICLE ENTRANCE',
        destinations: ['FICHA IS NOT PRINTED AUTOMATICALLY', 'FS - SMARTCARD APPLICATION ERROR', 'INCORRECT PLATE ON FICHA CREATION', 'INCORRECT SETUP ON OPERATION TYPE', 'VEHICLE TYPE NOT INPUT', 'NEW REGISTER OF DRIVER LOCKED']
    },
    {
        origin: 'VEHICLE WEIGHING',
        destinations: ['FAILURE IN WIEGHING MODULE', 'TWO LINES IN FICHA BALANCA', '2 WEIGHING CANCELLED ONLY IN XE DB']
    },
    {
        origin: 'VERSAO',
        destinations: ['CRIACAO DE JOB']
    },
    {
        origin: 'VOLUME INCORRETO',
        destinations: ['AJUSTE DE CANCELAMENTO EM LINHA INCORRETA', 'AJUSTE LENDO VOLUME LOAD', 'AVARIADOS REGISTRO', 'CADASTRO QUALIDADE PADRAO', 'COMPRAS COM UMIDADE INCORRETA', 'DIVERGENTE COM DIARIO DE TRANSFERENCIA', 'DOCUMENTOS DV SEM UMIDADE', 'ERRO LEITURA AVARIADOS E IMPUREZAS AJUSTE', 'HORA DE DOC ANTERIOR A HORA CUT OFF', 'INDUSTRIALIZACAO COM UMIDADE INCORRETA', 'INSERIR LINHA DO CUT OFF', 'PARAMETRIZACAO DE HORA DESLIGADA', 'PEDIDOS INCORRETOS NO ESPELHO DO CARDEX', 'PO PREENCHIDA INCORRETAMENTE', 'SALDO INICIAL INDEVIDO', 'ENTRADA DE TRANSFERENCIA INCORRETO', 'UMIDADE INSERIDA INCORRETAMENTE', 'VALOR DBS COMTABIL (KG)', 'VALOR POTENCIAL TOTAL INCORRETO']
    },
    {
        origin: 'VOUCHER',
        destinations: ['STATUS CHANGE'],
        rules: [{1: 'PROCUREMENT'}]
    },
    {
        origin: 'WEIGHT AND PRODUCT',
        destinations: ['DISCOUNT DIVERGENT FROM ITEM FAIXA', 'DISCOUNT INCORRECT AFTER IMPUREZAS', 'ERROR IN PRODUCT DETAIL', 'FILIAL BUSINESS UNIT ADDED', 'GAC NOT COMMUNICATING', 'INCORRECT PRODUCT IN FICHA', 'INTERFACES BP PRODUCT NOT EXECUTED', 'ITEM MASTER IN JDE', 'KG NULL VALUE DISCOUNT NOT CALCULATED', 'LINEAR DISCOUNT PARAMETERIZATION', 'NO INPUT OF PRODUCT DETAILS', 'NO INPUT OF QUALITY DETAILS FICHA', 'NO SUPPORT ACTION', 'NULL CLASSIFICATION BUTTONS', 'PRODUCT RANGE VL UNIT', 'PRODUCT RANGE VL UNIT ALTERS AUTOMATICALLY', 'PRODUCT UNIT CD UM', 'QUALITY DATA ROUND', 'TRANSGENIC PARAMETERIZATION']
    },
    {
        origin: 'WORLD WRITER',
        destinations: ['BAJADA EXCEL'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'WORLD WRITER',
        destinations: ['CANCELACION'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'WORK ORDER CLOSURE',
        destinations: ['JOB WENT ZOMBIE'],
        rules: [{1: 'JOB COST', 2: 'PROPERTY'}]
    },
    {
        origin: 'X1 NAO SUBIU AO A9',
        destinations: ['ALFA NAO PODE ESTAR EM BRANCO', 'AREA DE IMPOSTO INVALIDA', 'X0 DE O4 NAO CONTABILIZOU NO X1', 'X1 ADDRESS PAGAMENTO SUSPENSO', 'X1 COM CONTA INATIVA', 'X1 COM ERRO DE DESBALANCE', 'X1 GERADO SEM O ADDRESS']
    },
    {
        origin: 'XML CANCELADO',
        destinations: ['CTE']
    },
    {
        origin: 'ZFILE AP',
        destinations: ['COD. DE RETENCION DE PAGOS ACTIVADO', 'DOCUMENTO RETENIDO FECHA LM DIFERENTE', 'ERROR TIPO BANCO NO VALIDO'],
        rules: [{1: 'FINANCE'}, {2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'ZFILE GL',
        destinations: ['DOCUMENTO RETENIDOS'],
        rules: [{1: 'FINANCE'}, {2: 'JDE ENTERPRISE E1/JDE A9'}]
    }
];

export default tier3Connections;