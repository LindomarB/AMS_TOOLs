const tier3Connections = [  
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
        destinations: ['LIBRARY', 'PROBLEMAS DE ACESSO'],
        rules: [{1: 'TECHNICAL SERVICES'}]
    },
    {
        origin: 'ACTUALIZADOR PADRON',
        destinations: ['ERROR O DEMORA EN PROCESO']
    },
    {
        origin: 'ADE02',
        destinations: [
            'Barcaça não migrou para o ADE',
            'Ficha sem interface para o ADE',
            'Problemas com o serviço do PIPE',
            'Problemas no PIPE'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
    }, 
    {
        origin: 'ADDRESSBOOK',
        destinations: ['EXCLUIR ADDRESS DUPLICADO'],
        rules: [{1: 'GDR'}]
    }, 
    {
        origin: 'ADIANTAMENTO',
        destinations: [
            'AAI NAO CADASTRADO',
            'ADDRESS BOOK-ADDRESS BLOQUEADO',
            'AH FECHA VCTO',
            'AH LIQUIDADO INDEVIDAMENTE',
            'AH LIQUIDADO INDEVIDAMENTE EM X0',
            'AH NAO GERADO',
            'AH NAO TRANSFERADO',
            'ALTERACAO DESCRICAO UDC',
            'ATUALIZAR DDJ PARA PERMITIR EXCLUIR V4',
            'AVANCAR STATUS V4',
            'CHECKLIST NAO GERADO PARA V4',
            'CONFIGURACAO EM FALTA ITEM 90067 X BP',
            'CONGELAMENTO VAR CAMBIAL - FERRAMENTA ULTRA PISO',
            'CONGELAR JUROS E VC',
            'CREDITO DISPONIVEL ZERADO',
            'ERRO ADIANTAMENTO CACAU CAK SEM SLIP 12',
            'EXCLUIR V4 - CONTRATO EM STATUS C',
            'EXCLUIR V4 DE PERIODO FISCAL ANTERIO',
            'EXCLUSAO V4 USUARIO SEM ACESSO',
            'FALHA AO GERAR ADIANTAMENTO CACAU',
            'FALHA DE PROCEDIMENTO',
            'MASTER DATA - CADASTRO UDC 55BR RE',
            'NAO PERMITE CONGELAR JUROS',
            'QUANTIDADE INVALIDA DO CONTRATO',
            'RELATORIO ADIANTAMENTO ABERTO',
            'RELATORIO ADIANTAMENTO ABERTO - TOTAL EM REAL NAO EXIBE',
            'RELATORIO ADIANTAMENTO ABERTO -TAXA INCORRETA',
            'RELATORIO ADIANTAMENTO ABERTO-TAXA INCORRETA',
            'RELATORIO ADIANTAMENTO NAO GERA PDF',
            'REVERSAO ADIANTAMENTO - PROBLEMAS P/ REVERTER',
            'REVERSAO V4',
            'REVERSAO V4 - AH GERADA',
            'SALDO NAO RETORNADO ADTO',
            'SOLICITACAO DE CREDITO EXPIRADA',
            'TAXA DE CAMBIO INCORRETA',
            'TRAVAR VARIACAO CAMBIAL',
            'USUARIO NAO CONSEGUE GERAR V4',
            'V4 DE CANCELADO S$ EM INTERFACE COM A9',
            'V4 DIVERGENTE DO VALOR NA PROP COMERCIAL',
            'V4 DUPLICADO',
            'V4 NAO GERADA - PLANNING PO DEPOT',
            'V4 NAO GERADO'
        ]
    },
    {
        origin: 'AGRICULTURA FAMILIAR',
        destinations: ['DUPLICIDADE NO ANALITICO AG FAMILIA - F5543049']
    },
    {
        origin: 'AJUSTES',
        destinations: [
            'AJUSTE CRIADO COM DATA INCORRETA',
            'ERRO LOTE EM LANCAMENTO DE AJUSTES'
        ],
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
        destinations: [
            'DESVINCULAR ANTICIPO', 
            'FECHA VENCIMIENTO INCORRECTA', 
            'NO EXISTE SALDO SUFICIENTE',
            'NO GENERA V4 DESDE LA PROPUESTA COMERCIAL',
            'PEDIDO EN ERROR', 
            'PROBLEMAS EN DIF TIPO CAMBIO GENERADAS',
            'V4 CON FECHA CONTABLE DISTINTA DEL PERIODO',
            'UE - ANULACION DE SLIP QUE SE EFECTIVO',
            'UE - USUARIO DESCONOCE ANULACION DE ANTICIPO'
        ]
    },
    {
        origin: 'ANULAÇÃO DE FICHA',
        destinations: [
            'Ficha anulada, mas segue ativa',
            'Ficha aplicada em E1 não permite anular no RDS',
            'Problemas para anular ficha',
            'Solicitação de ajuda para anular ficha'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'AP',
        destinations: [
            'ACCOUNTING DATE CANT VARIATE', 
            'APB - INVALID DOLLAR TAX', 
            'ERROR ON FILE PROCESSING A9',
            'FATURA DUPLICADA',
            'INACTIVE ADDRESS',
            'TAX LINE NOT INTERFACED', 
            'TAX RETAINED INCORRECTLY'
        ]
    },
    {
        origin: 'ACESSO', 
        destinations: [
            'Acesso com certificado digital', 'Criar acesso ao “Recintos Cargill”', 'Criar acesso ao “Recintos RFB”'
        ],
        rules: [{1: 'ADE RECINTOS', 2: 'ADE02'}]
    },
    {
        origin: 'APLICAÇÃO',
        destinations: [
            'Conta bloqueada',
            'Entrada de crachá errada',
            'Instalação do RDS local',
            'O usuário não pode acessar o RDS localmente',
            'Usuário sem permissão de acesso'
        ],
        rules: [{1: 'ACESSO', 2: 'RDS (.Net)'}]
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
        origin: 'APONTAMENTO',
        destinations: ['LISTA DE MATERIAIS NOT REGISTERED'],
        rules: [{1: 'COSTS AND INVENTORY', 2: 'PROPERTY'}]
    }, 
    {
        origin: 'APPROVAL',
        destinations: ['INVALID ADDRESS', 'ORDER STUCK IN APPROVAL SCREEN'],
        rules: [{1: 'PROCUREMENT', 2: 'PROPERTY'}]
    },
    {
        origin: 'AR',
        destinations: ['DOCUMENT RESENDING'],
        rules: [{1: 'PLANTS & OPERATIONS', 2: 'PROPERTY'}]
    },
    {
        origin: 'AR',
        destinations: ['AR MONITORING'],
        rules: [{1: 'OW7A8'}]
    },
    {
        origin: 'ARIBA',
        destinations: ['BATCH EN ERROR POR CUENTA CONTABLE INCORRECTA'],
        rules: [{1: 'ORDERS', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'AS OF',
        destinations: ['CAMPO ESTOURADO', 'DIF ASOF X CARDEX', 'INCORRECT BALANCE FORWARD'],
        rules: [{1: 'COSTS AND INVENTORY', 2: 'PROPERTY'}]
    }, 
    {
        origin: 'ASSET CREATION',
        destinations: ['APB - ASSET NUMBER DIVERGENCY ON AA/XA'],
        rules: [{1: 'JOB COST'}]
    },
    {
        origin: 'ASSET CREATION',
        destinations: ['BLOCKED DOCUMENT'],
        rules: [{1: 'FIXED ASSET'}]
    },
    {
        origin: 'ASSET CREATION',
        destinations: ['INVALID ASSET CREATION'],
        rules: [{1: 'FIXED ASSET', 2: 'PROPERTY'}]
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
        origin: 'BALANÇA',
        destinations: [
            'Alteração de descrição da balança',
            'Caminhão anterior travado na tela',
            'Conexão incorreta à porta “COM”',
            'Configuração de nova balança',
            'Falha ao ler "peso zero"',
            'Leitura de valores incorreta',
            'Mudar balança de PC',
            'Não captura peso',
            'Perda de configuração da porta “COM”',
            'Porta “COM” com defeito',
            'Porta “COM” indisponível',
            'Porta “COM” não comunica com balança',
            'Problema de conexão física com balança',
            'Problema físico na balança',
            'Problemas de rede',
            'Problemas no módulo',
            'Variação na leitura de peso'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'BALANÇA ASSISTIDA',
        destinations: [
            'Alteração de descrição da balança',
            'Caminhão anterior travado na tela',
            'Conexão incorreta à porta “COM”',
            'Configuração de nova balança',
            'Configuração de string',
            'Driver desatualizado',
            'Falha ao ler "peso zero"',
            'Leitura de valores incorreta',
            'Mudar balança de PC',
            'Não captura peso',
            'Perda de configuração da porta “COM”',
            'Porta “COM” com defeito',
            'Porta “COM” indisponível',
            'Porta “COM” não comunica com balança',
            'Porta “COM” não comunica com Humedímetro',
            'Porta “COM” não comunica com PLC',
            'Problema de conexão física com balança',
            'Problema físico na balança',
            'Problemas com Middleware',
            'Problemas com o módulo',
            'Problemas de rede',
            'Variação na leitura de peso'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB'}]
    },
    {
        origin: 'BALANÇA AUTOMATIZADA',
        destinations: [
            'Alteração de descrição da balança',
            'Caminhão anterior travado na tela',
            'Conexão incorreta à porta “COM”',
            'Configuração de string',
            'Driver desatualizado',
            'Erro em fotocélula',
            'Falha ao ler "peso zero"',
            'Falha de comunicação com PLC - PLC travado',
            'Falha de comunicação com PLC - problemas com serviço de Middleware',
            'Falha de comunicação com PLC - problemas de rede',
            'Falha de comunicação com PLC - problemas físicos de conexão',
            'Mudar balança de PC',
            'Não captura peso',
            'Perda de configuração da porta “COM”',
            'Porta “COM” com defeito',
            'Porta “COM” indisponível',
            'Porta “COM” não comunica com balança serial',
            'Porta “COM” não comunica com Humedímetro',
            'Porta “COM” não comunica com PLC',
            'Problema de conexão física com balança',
            'Problema físico na balança',
            'Variação na leitura de peso'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB'}]
    },
    {
        origin: 'BALANÇA AUTOMATIZADA',
        destinations: [
            'Erro de "sequência" no PLC - sequência 1, 2 ou 3',
            'Erro de "sequência" no PLC - sequência 4',
            'Erro de "sequência" no PLC - sequência 5, 6, 7, 8, 9 ou 10'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'BALANÇA AUTOMATIZADA',
        destinations: [
            'Câmera fora da rede',
            'Cancela não levanta - problema físico com a cancela',
            'Configuração nova câmera',
            'EKI sem rede',
            'Problemas com display',
            'Problemas e conexão com leitor RFID',
            'Problemas modulo',
            'Troca do display',
            'Troca/atualização EKI'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB', 3: 'BRAZIL'}]
    },
    {
        origin: 'BALANÇA DE FLUXO', 
        destinations: [
            'Acionar o vendor', 'Batelada migrou duplicada', 'Bateladas não estão migrando'
        ],
        rules: [{1: 'BALANCE', 2: 'CORPORATE'}]
    },
    {
        origin: 'BASE DE DADOS XE',
        destinations: [
            'Atualização do processo de ciclo de vida', 'Banco de dados XE full', 'Conexão com o banco de dados perdida', 'Data de expiração do limite de usuário do perfil', 'Lançamento', 'Lentidão na rede', 'Network TNSNAME', 'Reconstruir índices', 'Reinstalação e reconfiguração do banco de dados', 'Versão final máxima errada Oracle'
        ],
        rules: [{1: 'DATABASE', 2: 'RDS (.Net)'}]
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
        destinations: ['APB - DUPLICATED REGISTER BLOCO K', 'CLEANING ON TABLE F5576599', 'MS DATA INSERT']
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
        destinations: ['BOLETO NAO SAI NA IMPRESSORA', 'INSTRUCAO DE PAGTO INCORRETA']
    },
    {
        origin: 'BOOMI INTERFACE',
        destinations: [
            'Atualização de data para reenvio', 'Interface parada'
        ],
        rules: [{1: 'INTERFACE', 2: 'CORPORATE'}]
    },
    {
        origin: 'BOT DE ENVIOS A CAMARA',
        destinations: [
            'Envio do e-mail'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
    },
    {
        origin: 'CADASTRO',
        destinations: [
            'Alteração de BP',
            'Alteração cadastro de filial',
            'Cadastro de Cotas',
            'Cadastro de filial',
            'Cadastro de motorista',
            'Cadastro de operação',
            'Cadastro de produto',
            'Cadastro de qualidade',
            'Cadastro de safra',
            'Cadastro de tolerâncias',
            'Cadastro de unidade de conversão'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'CADASTRO',
        destinations: [
            'Habilitar soja epa'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'CADASTRO',
        destinations: [
            'Habilitar “Soja EUDR”'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: 'BRAZIL'}]
    },
    {
        origin: 'CADASTROS',
        destinations: ['COTACAO ROLAGE REMOVIDA', 'ERRO COTACAO DE PRECO']
    },
    {
        origin: 'CALADA / BARREIRAS',
        destinations: [
            'Barreira não levanta - problema físico com a barreira',
            'Barreira não levanta - problemas com fotocélula',
            'Barreira não levanta - problemas com software terceiro (ex. Tesla)',
            'Barreira não levanta - problemas no PLC',
            'Caminhão anterior travado na tela',
            'Erro ao acionar barreira',
            'Erro de captura de dados da calada',
            'Problema físico na leitora de badge',
            'Problemas com serviço de Middleware'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'CALCULO DE IMPUESTOS',
        destinations: ['REVISIÓN DE IMPUESTOS CALCULADOS'],
        rules: [{1: 'TAX', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'CALCULO DE RETENCIONES',
        destinations: [
            'CAMBIO DE PORCENTAJES',
            'CONSIGNATARIOS Y ACOPIADORES', 
            'REVISION DE CALCULO'
        ],
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
        destinations: ['BROKEN COST', 'INCLUDE ILKIT', 'MISSING AAI REGISTER', `USER DIDN'T TRY THE PROCESS`],
        rules: [{1: 'COSTS AND INVENTORY'}]
    },
    {
        origin: 'CARDEX',
        destinations: ['AJUSTE LANCADO INCORRETO', 'DATA DOCUMENTO INCORRETO NO CARDEX', 'LENTIDAO TELA CARDEX', 'USER - PARAMETRIZADO GERACAO DE B0-I3', 'VALOR INDEVIDO NO CARDEX', 'VQ COM NOTA AUTORIZADA CONSTA COMO CANCELADO'],
        rules: [{1: 'RD'}]
    },
    {
        origin: 'CARDEX',
        destinations: [`IM DIDN'T GENERATE`],
        rules: [{1: 'MANUFACTURING'}]
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
        origin: 'CERTIFICACION AFIP',
        destinations: [
            'AF QUEDAN CON FECHA DE VENCIMIENTO ERRONEOS',
            'ANULAR COE',
            'ANULAR RT',
            'COE CRUZADO',
            'COE - H7 ERROR EN MONUTRIBUTISTAS',
            'COE - ITEMS DEL AJUSTE INCONSISTENTE',
            'ERROR 1520',
            'ERROR CONFIRMA',
            'ERROR EN CERTIFICACION DE LPG',
            'ERROR ESQUEMA',
            'ERROR SIO GRANO',
            'ERROR SIO FIJACIONES',
            'FICHA NO CERTIFICA',
            'REPROCESAR E0',
            'REPROCESAR RT'
        ],
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
        origin: 'CHILD ASSET',
        destinations: ['CHILD ASSET CREATION'],
        rules: [{1: 'FIXED ASSET', 2: 'PROPERTY', 3: 'BRAZIL'}]
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
        origin: 'CITRIX',
        destinations: [
            'Date/Time incorretos',
            'Impressão incorreta PDF',
            'Mapear pasta Citrix'
        ],
        rules: [{1: 'ACESSO', 2: 'RDS (.Net)'}]
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
        destinations: [
            'ANULACION DE V$',
            'ANULACION DE VA',
            'CONTRADOCUMENTACION NO PERMITIDA',
            'D# CANCELADO IMPACTA EN SALDO VA',
            'ERROR EN CONTRADOCUMENTACION VA Y D#',
            'ERRO EN SALDO DESPACHO VA',
            'FALLA EN LA REVERSION OH',
            'FALTA LINEA POR EXCEDENTE FACTURADO',
            'MD - CONFIGURACION BP VIRTUAL',
            'MD - HACIENDA BLOQUEADA',
            'MULTIPLICIDAD AL GENERAR VAS',
            'NO GENERA MATCHING W8',
            'NO GENERA PEDIDO VA ERROR DE AB',
            'PEDIDO ‘ON’ NO VOLVIÓ SALDO AL ANULAR O6',
            'SALDO INCORRETO VA (F5542072)',
            'SALDO INCORRETO VA Y V$ (F5542072)',
            'V$ DUPLICADA',
            'VA SIN CANTIDAD DESPACHO',
            'VA SIN SIGNO DE DESPACHO',
            'VOLVER SALDO DESPACHO VP NN',
            'VP CON ESTADO INCORRECTO'
        ],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'CONFIGURAÇÃO',
        destinations: [
            'A impressora não aparece no Citrix', 'Alteração de parâmetro no tipo de operação', 'Alterar padrão da impressora', 'CFOP não parametrizado', 'Configuração da porta do servidor de dispositivos', 'Configuração de TNS', 'Configuração incorreta da impressora', 'Configuração incorreta no tipo de operação', 'Driver de impressora não configurado', 'Formato de número incorreto na máquina', 'Formato incorreto de data e hora', 'Habilitar RDS offline', 'Impressora de driver incorreto', 'Interface de configuração incorreta offline', 'Numerador desatualizado', 'Tipo de papel incorreto', 'Versão incorreta do Oracle'
        ],
        rules: [{1: 'INSTALAÇÃO E CONFIGURAÇÃO', 2: 'RDS (.Net)'}]
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
        destinations: [
            'AB - CLIENTE INHABILITADO',
            'BATCH EN ESTADO APROBADO SIN CONTABILIZAR',
            'BATCH FUERA DE BALANCE',
            'DIFERENCIA DE INTEGRIDAD ENTRE EL MODULO Y CONTABILIDAD',
            'DOCUMENTO BORRADOR ASOCIADO NETTING CON ERROR',
            'DOCUMENTOS DE COBRO CON PROBLEMA EN LA CONTABILIZACION',
            'DOCUMENTOS DE COBRO REVERSADO CUANDO RECHAZA CHEQUE',
            'DOCUMENTOS ELIMINADOS DEL MODULO PERO NO DE LA CONTABILIADAD',
            'DOCUMENTOS QUE NO TERMINARON DE FACTURAR',
            'NO GENERA H#',
            'Q4 SIN CONTABILIZAR POR ERROR CAMPOS RPCRRM Y RPCRCD',
            'Q4 SIN CONTABILIZAR POR ERROR EN LA F0911',
            'REVERSION CON FECHA Y PERIODO CONTABLE CERRADOS'
        ],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'CONTABILIZACION',
        destinations: ['CONTABILIZACION REVERSION DOCUMENTOS B$'],
        rules: [{1: 'FINANCE', 2: 'JDE ENTERPRISE E1/JDE A9'}]
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
        destinations: [
            'ANTICIPO MAL GENERADO',
            'ANULAR SLIP CONTRATO',
            'CAMBIO DE FIJACION INCORRECTO',
            'CAMBIO DE PRIORIDAD DEL CONTRATO',
            'CAMBIO ESTADO FIRMA',
            'CAMBIO IMPORTES SELLADOS',
            'CAMBIO SIOGRANOS REASIGNACIÓN',
            'CONTRATO DUPLICADO',
            'CONTRATO FUE BORRADO DE LAS TABLAS 50 / 51',
            'CONTRATO NO APLICA TOLERANCIA',
            'COSECHA INCORRECTA',
            'DEPURAR CONTRATO',
            'ERRO IMPRESSION CONTRATOS',
            'ERROR DE PERMISO',
            'ERROR PARA EFETIVAR SLIP',
            'FLATEO DE CONTRATO',
            'IMPRESION DE CONTRATO - CREADO EN PESOS SALE COMO USD EN LO PDF',
            'IMPRESION DE CONTRATO - NO EJECUTA JOB DE IMPRESION',
            'INGRESO CONTRATO EN MONITOR DE SIO',
            'JOB Check_CMA_Data_Recording_f5540029 LENTITUD',
            'MASSIVA APROBA SLIP 12',
            'NO GENERA INTERES DE $',
            'NO PERMITE REVERTIR FLATEO',
            'PRECIO DE PARITARIAS',
            'REASIG DE CTO NO TRAE TILDE DE CARTA OFERTA',
            'SIOGRANOS MAL CADASTRADO EN BOLETOS MONITOR',
            'SLIP DE ALTERACION NO GENERA CONTRATO',
            'SLIP FIJACION CON FECHA OPERACION Y LINEA EN BLANCO'
        ],
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
        origin: 'CORPORATE',
        destinations: [
            'Ficha alterada no RDS e não fez interface',
            'Ficha sem interface para o Corporate',
            'Problemas com o serviço do PIPE',
            'Problemas no PIPE',
            'Reenvio de ficha'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
    },
    {
        origin: 'CORREÇÃO',
        destinations: [
            'Dados incorretos no relatório',
            'Erro ao gerar relatório',
            'Merlhoria de Performance do relatório',
            'Problemas gerais com performance',
            'Relatório gerado em branco'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'RDS WEB'}]
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
        destinations: [
            'ACCOUNT PARAMETERIZATION',
            'CROP INPUT - USER ERROR',
            'CROP INPUT - VINCULO OR',
            'INCORRECT ADDRESS',
            'INVALID APPROVAL ROUTE',
            'MISSING SETUP - ITEM X BP',
            'NATUREZA E SUFIXO INCORRETOS',
            'SO - USER HAS NO ACCESS'
        ]
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
        destinations: [
            'CRIACAO DE OH VIA ORCH',
            'ERRO ETIQUETA CRIACAO FICHA MANUAL',
            'FALHA NA CRIACAO DE FICHA',
            'FALTA CADASTRO RANGE DE VALORES',
            'FICHA OH NÃO INSERE LINHA 1000 NA F7611B',
            'LENTIDAO CRIACAO OH',
            'MESMO Nº NOTA FISCAL',
            'SERIE EM BRANCO',
            'TIPO DE PESO INCORRETO'
        ]
    },
    {
        origin: 'CROP INPUT',
        destinations: [
            'ASSINATURA DE CONTRATO NAO RETORNOU DO DS',
            'ENCERRA SALDO NAO CONTEMPLA BARTER',
            'ERRO AO VINCULAR O SLIP',
            'ERRO AO PROCESSAR O NETTING',
            'ERROR OF ETIQUETA - CANCEL VH',
            'INCORRECT AB VENDOR',
            'INCORRECT ADDRESS',
            'INCORRECT OPERATION TYPE',
            'OLD ORDERS WITH PROBLEMS IN COMISSION',
            'OP DIDNT VINCULATED TO VQ',
            'ORDER V0 WITHOUT F5542048',
            'PESO DUPLICADO NO VP',
            'PROBLEMS IN HISTORY PRICE',
            'USER DIDNT DO THE CONFIRMATION IN SALESFORCE',
            'WEIGHT DIDNT RETURN TO B2B',
            'WEIGHT DIDNT RETURN TO POSITION'
        ]
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
        destinations: [
            'ACTUALIZACION DE NUEVA TASA DE CAMBIO',
            'AGREGAR CORREDOR EN DOCUMENTO',
            'CONCEPTO DEL DOCTO INCORRETO',
            'DATOS INCORRECTOS EN LA PANTALLA',
            'DOCUMENTOS QUE NO APARECEN EN PANTALLA',
            'FALLA DESCARGA DE DOCUMENTOS',
            'FECHA DE VENCIMIENTO DEL DOCTO INCORRECTA',
            'IMAGEN NO DISPONIBLE',
            'L# NO SE VISUALIZA',
            'MDM - NO APARECE EL AB EN LA BUSQUEDA POR NOMBRE',
            'PROBLEMAS EN LA IMPRESION DE LOS COMPROBANTES',
            'SALDOS INCORRECTOS'
        ],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'CUENTA CORRIENTE KGS',
        destinations: [
            'APARECE LIQUIDACION PEND DE COE Y YA FUE PAGA',
            'CAMBIO CLAUSULA DE CONTRATO',
            'CAMBIO EN MANUTENCION MASIVA NO REFLEJA EN LA PANTALLA',
            'CONTRACTO MAL GENERADO CUENTA CORRIENTE',
            'DUPLICIDAD DE KGS DESPUES DE TRANSFERIR SIN MOV FISICO',
            'ERROR EN RETIRO CONSUMO',
            'ERROR SALIDAS POR TRANSFERENCIA',
            'FECHA MAL CARGADA',
            'FICHAS SERVICIO NO TRAEN CANTIDAD EN ENTRADA SERVICIOS',
            'FICHAS SERVICIOS SIN APLICAR',
            'FLAT NO GENERA X0',
            'L# ANULADOS AUN ESTAN EN CTA CTE KGS',
            'LA CANTIDAD DE LA FICHA QUEDA MAL EN ENTRADA SERVICIOS',
            'LIQUIDACION ANTECIPADA NO TRAE INFORMACION CORRECTA',
            'MERCADERIA A LIQUIDAR EN NEGATIVO',
            'MOV MOLIENDA NO APARECEN EN LA PANTALLA',
            'MOV ELEVACION NO APARECEN EN LA PANTALLA',
            'NO APARECEN FICHAS APLICADAS',
            'NO COINCIDE COMPRADO CON FLATEADO',
            'REASIGNACION DE BP QUEDA CON LA LINEA EN ABIERTO',
            'RETIRO CONSUMO NO APARECEN EN LA PANTALLA',
            'SLIP ALTERACION NO ACTUALIZA EN LA PANTALLA'
        ]
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
        destinations: [
            'Acionar o vendor', 'Dados faltando', 'Dados incorretos', 'Diferença de balança', 'Diferença fisco fiscal', 'Exportador duplicado'
        ],
        rules: [{1: 'LAUDO', 2: 'CORPORATE'}]
    },
    {
        origin: 'DADOS',
        destinations: [
            'Dados incorretos - alteração order type',
            'Dados incorretos - BU default incorreta',
            'Dados incorretos - dados duplicados',
            'Dados incorretos - dados incorretos',
            'Dados incorretos - excesso de caracteres no campo "observação"',
            'Dados incorretos - filial destino / descarga incorreta',
            'Dados incorretos - placa / motorista incorretos',
            'Dados incorretos - problemas de cache',
            'Dados incorretos - safra incorreta',
            'Load com dados inválidos',
            'Não permite alterar dados da ficha',
            'Usuário orientado a informar dados corretos',
            'Vincular/alterar load/QR code a ficha'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'DADOS',
        destinations: [
            'Alterar ficha para rechaçada',
            'Dados incorretos - CTG utilizado anteriormente'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'DADOS',
        destinations: [
            'Dados incorretos - não traz valores de CUPOS',
            'Número de remito inválido',
            'Número de remito já utilizado'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: ['ARGENTINA', 'BOLIVIA']}]
    },
    {
        origin: 'DASHBOARD',
        destinations: ['EXECUTION - EMAIL - MONITORING'],
        rules: [{1: 'FINANCE', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'DATA SELECTION',
        destinations: ['DATA SELECTION UPDATE'],
        rules: [{1: 'COSTS AND INVENTORY', 2: 'PROPERTY'}]
    },
    {
        origin: 'DATA TRANSFER',
        destinations: ['CONSULTA EXTRACCIÓN DE DATOS VIA DATA TRANSFER'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'DBLINK',
        destinations: [
            'Erro na interface local x central', 'Erro na migração central x local', 'Informações não estão migrando', 'Serviço interface uni parado'
        ],
        rules: [{1: 'INTERFACE', 2: 'CORPORATE'}]
    },
    {
        origin: 'DDJJ DE STOCK',
        destinations: ['ALTA DE CENTROS EMISORES', 'ERROR EN MAPEO DE PLANTAS', 'ERROR EN NUMERO DE SLIP', 'ERROR EN XML DDJJ LA PAMPA']
    },
    {
        origin: 'DEPRECIATION',
        destinations: ['APB - ASSET DEPRECIATION VALUE UNBALANCED', 'INVALID DEPRECIATION DATE', 'SLOWNESS - DP JOB EXECUTION'],
        rules: [{1: 'FIXED ASSET', 2: 'PROPERTY'}]
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
        destinations: [
            'NAO MOSTRA DESCONTO DE QUALIDADE DE ENTRADAS INTERCOMPANY',
            'NUMERO DOCUMENTO INCORRETO ESPELHO'
        ]
    },
    {
        origin: 'DIFERENCIA',
        destinations: ['DESBALANCE DE COMPROBACION DETALLADO', 'DESBALANCEO ENTRE CIAS', 'DIFERENCIA EN REPORTE DE INTEGRIDADES', 'DIFERENCIA ENTRE ASOF Y LA CONTABILIDAD', 'DIFERENCIA EN BALANCETE'],
        rules: [{1: 'PROCESO CIERRE', 2: 'JDE A9 WS'}]
    },
    {
        origin: 'DIFERIDO',
        destinations: [
            'Alteração do valor do peso da ficha original',
            'Diferido Express - desabilitar Diferido Express',
            'Diferido Express - habilitar Diferido Express',
            'Não carrega dados da ficha original',
            'Não carrega itens de qualidade',
            'Não grava pesagem na ficha por diferido',
            'Não permite alterar dados de diferido'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: ['ARGENTINA', 'BOLIVIA']}]
    },
    {
        origin: 'DIRF',
        destinations: ['EXCLUSÃO DE DADOS'],
        rules: [{1: 'PROCUREMENT'}]
    },
    {
        origin: 'DOCSIGN',
        destinations: [
            'CARACTER E-MAIL CADASTRADO INCORRECTO', 
            'ERROR DOCSIGN',
            'PROBLEMA PERFORMANCE ORCHESTRATOR'
        ],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
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
        origin: 'DOOTAX',
        destinations: [
            'ERROR CREATING ORDER',
            'INCORRECT STATUS', 
            'INVALID ACCOUNT',
            'MISSING DATA AT F5543040', 
            'NOTA FISCAL JÁ FECHADA', 
            'VALOR EXCEDE TOLERANCIA',
            'VOUCHER MATCHING',
        ],
        rules: [{1: 'PROCUREMENT'}]
    },
    {
        origin: 'DW',
        destinations: [
            'APPLICATION SLOWN',
            'APPLICATION ACCESS',
            'CONNECTION',
            'EFD CONTRIBUTIONS',
            'EQUALIZATION ERROR',
            'ERROR SCREEN',
            'ICMS VERIFICATION',
            'REINF',
            'REPORT ERROR',
            'SLOW APPLICATION',
            'SLOW IMPORT TABLE'
        ]
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
        origin: 'ENTRADA DE VEÍCULO',
        destinations: [
            'A ficha não é impressa automaticamente', 'Configuração incorreta no tipo de operação', 'FS - Erro de aplicação de “Smart Card”', 'Novo registro de driver bloqueado', 'Placa incorreta na criação da ficha', 'Tipo de veículo não entrada'
        ],
        rules: [{1: 'FICHA', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'ERRO DE DADOS', 
        destinations: [
            'Dados faltando em relatório', 'Dados incorretos no relatório', 'Diferença de balança'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'ADE02'}]
    },
    {
        origin: 'ERRO DE DADOS', 
        destinations: [
            'Dados faltando em relatório', 'Dados incorretos no relatório', 'Diferença de balança'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'CORPORATE'}]
    },
    {
        origin: 'ERRO EM MONITOR CTG / COT',
        destinations: [
            'Fichas travadas no monitor COT',
            'Fichas travadas no monitor CTG',
            'Monitor COT não funciona',
            'Monitor CTG não funciona'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
    },
    {
        origin: 'ERRO NA PÁGINA ARBA/ARCA/AFIP',
        destinations: [
            'Página ARCA inacessível',
            'Página AFIP inacessível', 
            'Página ARBA inacessível'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
    },
    {
        origin: 'ERRO NA GERACAO ROYATIES',
        destinations: ['ADDRESS BOOK - CADASTRO CP CR', 'GERACAO DE RELATORIO COM BP INCORRETA']
    },
    {
        origin: 'EXCLUIR INDEX DO GDR',
        destinations: ['DOCUMENT SENT TO THE WRONG ERP'],
        rules: [{1: 'GDR'}]
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
        origin: 'EXTRACTION',
        destinations: ['DATA BASE EXTRACTION'],
        rules: [{1: 'COSTS AND INVENTORY', 2: 'PROPERTY'}]
    }, 
    {
        origin: 'EXTRACTION',
        destinations: ['DATA EXTRACT'],
        rules: [{1: 'PROCUREMENT', 2: 'PROPERTY'}]
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
        origin: 'FACTURACION ELECTRONICA - FCE',
        destinations: [
            'ARCHIVOS DE NOVEDAD LLEGARON FUERA DEL HORARIO',
            'CAMPO RPURC1 CON VALOR INCORRECTO'
        ]
    },
    {
        origin: 'FACTURACION ELECTRONICA - SETUP',
        destinations: ['CAMBIO DE LA FACTURA', 'CAMBIO PERIODO P55AR385-P55AR386-P55AR387-P55AR388']
    },
    {
        origin: 'FALHA DE ACESSO',
        destinations: [
            'Alteração de dados cadastrais', 'Certificado pessoal expirado', 'Certificado web expirado', 'Usuário Cargill não registrado', 'Usuário RFB não cadastrado'
        ],
        rules: [{1: 'ACESSO', 2: 'ADE02'}]
    },
    {
        origin: 'FALHA DE ACESSO', 
        destinations: [
            'Certificado web expirado', 'Portal Corporate fora do ar', 'Serviço web IIS', 'Usuário Cargill não registrado', 'Usuário de processo expirado'
        ],
        rules: [{1: 'ACESSO', 2: 'CORPORATE'}]
    },
    {
        origin: 'FALHA OU ERRO',
        destinations: [
            '2+ linhas de pesagem fichas pesagem errada', 'A pesagem manual não aparece no relatório', 'Campo errado para o nome da balança', 'Doble ficha aparece em relatório de desempenho', 'Duplicado linha para relatório de expedição', 'Duplicar linha para relatar conferência', 'Ficha não consta do relatório de auditoria de qualidade', 'Ficha não sincronizada no PRDSL', 'Ficha sem informações de carregamento não aparecem nos relatórios', 'Ficha steps relatório de dados', 'Fichas sem NF não aparecem no relatório', 'O usuário estava inserindo o filtro errado', 'O usuário precisa de um formato de relatório incorreto', 'Poucos filtros na geração de relatórios', 'Relatório de auditoria tipo de pesagem errado', 'Relatório de dados do Excel', 'Relatório de drivers bloqueados', 'Relatório muito longo - não gera', 'Relatório não associado à filial', 'Reporte com valor errado para rateio', 'Sem dados do tipo de sacaria', 'Usuário errado aparece no relatório de dados', 'Wipro - configuração de relatório do Excel'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'RDS (.Net)'}]
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
        origin: 'FICHA - PROCESO DE COMPRA',
        destinations: [
            'CORREDOR/BROKER INVÁLIDO',
            'FICHA CON LOTE VENCIDO',
            'FICHA APLICADA A COMPRA EN LA EJECUCION MASIVA',
            'LENTITUD EN EL JOB COMPRA - R554314A',
            'LOCAL INCORRECTO F4111',
            'LOTE DUPLICADO',
            'NO COMPRA - CONTRATO NO ESTA EN VIGENCIA',
            'NO COMPRA - FICHA O CONTRATO NO SUSTENTABLE',
            'NO COMPRA - Ficha no creada. Doc Retiro Cancelado',
            'NO COMPRA - EJECUCION DEL BATCH MANUALMENTE',
            'NO COMPRA - Ficha OH no creada. Doc Retiro E0 cancelado',
            'NO COMPRA - BP Compra distinto de la ficha',
            'NO COMPRA - BP RELACIONADA',
            'NO COMPRA - Cliente bloqueado para aplicar',
            'NO COMPRA - Contrato NPE sin Precio Fijado',
            'NO COMPRA - CosechaTp Vend/Trans Invalidos',
            'NO COMPRA - Ficha bloqueada para aplicar',
            'NO COMPRA - Ficha Comprometida Anticipo / Retiro',
            'NO COMPRA - Ficha E1 sin Calidad y Boletin',
            'NO COMPRA - FICHA X CONTRATO SUSTENTABLE',
            'NO COMPRA - Nenhum contrato para aplicar',
            'NO COMPRA - Vendedor con AB Bloqueado',
            'OH GERADA PERO NO APLICA',
            'SUPPORT - RELACIONAR BPS DE DESCARGA'
        ]
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
        origin: 'FICHA EXPEDIÇÃO',
        destinations: [
            '“PA” incorreto na carga', '2+ linhas de carga no mesmo relatório ficha', 'Associado de número de carga incorreto', 'Carregar dados não aparecem automaticamente', 'Erro na restrição de integridade de exclusão', 'Estado de carga 90', 'Ficha finalizada sem segunda linha de peso', 'Ficha sem “Smart Card”', 'Ficha sem carga', 'Ficha sem detalhe de carga', 'Ficha tem valores de desconto incorretos', 'Ficha travada em passo de segunda pesagem', 'Não é possível editar ficha sem carregar', 'Não mostra número de ficha na entrada do veículo', 'Pedido de cancelamento de carga', 'Token tem “valor líquido úmido” errado'
        ],
        rules: [{1: 'FICHA', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'FICHA FOB',
        destinations: [
            'Despacho ficha sem linha de peso', 'Etapa da fazenda FOB não executada'
        ],
        rules: [{1: 'FICHA', 2: 'RDS (.Net)'}]
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
        origin: 'FICHA RECEPÇÃO',
        destinations: [
            'As fichas não podem ser excluídas', 'Catálogo de endereços - endereço bloqueado no JDE', 'Catálogo de endereços - endereço pai sem filho', 'Conhecimento de frete entrada errada', 'Conta bloqueada', 'Data de emissão de NFE entrada errada', 'Endereço com dois pais diferentes', 'Entrada de endereço incorreta', 'Ficha com valor “discont = 0”', 'Ficha date as null value', 'Ficha do não interfaceado para OW', 'Ficha modificada no RDS não faz interface', 'Ficha não avança passo', 'Ficha não está sendo enviada para interface', 'Ficha não gera OH com reinterface', 'Ficha sem QRCODE', 'NF como medida unitária de tonelada', 'NFE DANFE não informado', 'Repartição de peso incorecta', 'Tipo de frete ausente nos dados do documento', 'Valor zero do endereço pai', 'Valores de NFE registrados incorretamente', 'Veículo inativo', 'Vinculação tardia não interface fichas'
        ],
        rules: [{1: 'FICHA', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'FICHA NAO REVERTE',
        destinations: ['APLICACAO JA FIXADA', 'CADASTRO AAI', 'ERRO SERIALIZACAO TABELAS', 'FICHA COM STATUS INCORRETO', 'LINHA O4 NAO DELETADA DA F4311 APOS REVERSAO', 'NOTA GERADA PARA A FICHA', 'STATUS DA FICHA NAO RETORNOU APÓS REVERSAO DA NOTA', 'NOTA COM 7 DIGITOS']
    },
    {
        origin: "FICHA OH",
        destinations: ['ANULACION', 'ASOCIAR A LOAD', 'FICHA SIN APLICAR']
    },
    {
        origin: 'FICHA SERVICIO E1',
        destinations: ['ANULACION DE FICHA RDS NO ANULA E1', 'ANULACION DE FICHA ERRO PARA ANULAR NO RDS', 'NO APLICADA A CONTRATO DE ARMAZENAGEM', 'NO GENERA FICHA EN E1', 'FICHA CON AB DEL CLIENTE INCORRECTO', 'FICHA BLOQUEADA', 'FECHA DE VENCIMIENTO DE LOTE INCORRECTA', 'FICHA DUPLICADA', 'FICHA FALTA LINHA (INCLUSION/ REVERSION) DA FICHA NO STOCK', 'DESAPLICACION DE FICHA', 'FICHA BLOQUEADA POR CONTRATO DE ANTICIPO', 'NO HAY FLETE DEFINIDO EN LA FICHA'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'FICHA SERVICIO E1 - ERROR APLICACION',
        destinations: ['No tiene Tarifas en Catalogo de servicio', 'No hay KM Catastrados En la CATAC', 'BP / Procduto / Cosecha - No tiene catalogo standard cargado', 'No Tiene Certificación para esta ficha', 'Falta Boletin de Calidad de los rubros obligatorios de la ficha B2B', 'AB Bloqueado por Localidade', 'la ficha NO TIENE KM', 'FICHAS NO SE ASOCIAN A PACK CARGADO'],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'FIJACION DE PRECIO',
        destinations: ['ERROR CON PRECIO', 'NO APARECE PEDIDO']
    },
    {
        origin: 'FIXACAO MATA MATA',
        destinations: ['COMP LINHA AUSENTE EM F5543085', 'DECIMAIS DE PRECO UNITARIO INVALIDO', 'DESTINACAO E MODAL DIFEREM DO SLIP ORIGEM', 'EFETIVACAO COM ERRO DE VERSAO INVALIDA', 'ERRO AO EFETIVAR SLIP', 'ERRO ARREDONDAMENTO CUSTO UNITARIO', 'MATA MATA CANCELOU VOLUME MAIOR QUE DISPONIVEL', 'MATA MATA CONSUMIU LINHA JA FIXADA', 'MATA MATA CONSUMIU SALDO RESERVADO A SLIP PENDENTE', 'MATA MATA PARCIAL', 'NAO CRIADO SLIP DE CANCELAMENTO', 'QUANTIDADE SLIP ORIGEM INVALIDA', 'SALDO NAO RETORNOU DEPOIS DA REVERSAO', 'SLIP DE FIXACAO MM PENDENTE', 'TIPO FIXACAO INCORRETO']
    },
    {
        origin: 'FLETE',
        destinations: ['FACTURA DE FLETE (XZ)', 'FLETE ENGANCHADO', 'REVERSION PAGOS DE FLETE']
    },
    {
        origin: 'FM',
        destinations: ['EXLUSAO CIGENCIA']
    },
    {
        origin: 'FM - ACESSO BP',
        destinations: ['ERRO NA CHAVE SEFAZ']
    },
    {
        origin: 'FM - CADASTRO',
        destinations: ['SUPORTE AO USER - CADASTRO']
    },
    {
        origin: 'FM - CALCULO',
        destinations: ['ERRO DE CALCULO', 'LOAD NAO ESTORNA', 'LOCAL DE ENTREGA INCORRETO']
    },
    {
        origin: 'FM - CLOSING CTE',
        destinations: ['DONT AUTOMATIC CLOSING', 'FALHA INTEGRACAO', 'ERROR SEND XML']
    },
    {
        origin: 'FM - CONHECIMENTO',
        destinations: ['SEM LOAD', 'CANCELADO EM CT / NAO CANCELADO EM FM', 'CANCELADO INDEVIDAMENTE', 'CANCELADO NA SEFAZ', 'DIVERGENTE DO PRE-CALCULO', 'DOCUMENTO COM DADOS INCORRETOS', 'NAO CONTABILZADO (PROVISAO)', 'NAO CONTABILIZADO (QUEBRA)', 'NAO INTEGRADO NO CTMS', 'NAO VINCULADO AO LOAD/FICHA', 'NAO VICULADO A DESPESA EXTRA', 'NAO VINCULADO A UM PRE-CALCULO', 'SEM QUEBRA CALCULADA', 'VALOR DO CTE/ NFS DIVERGENTE DO PRE-CALCULO', 'VINCULADO A LOAD/ FICHA INCORRETO', 'VINCULADO A PRE-FATURA OU FATURA INEXISTENTE', 'ERRO NAO CATALOGADO']
    },
    {
        origin: 'FM - CONTABILIDADE',
        destinations: ['INTERFACE']
    },
    {
        origin: 'FM - CTE',
        destinations: ['ERRO IMPUT DOCUMENTO']
    },
    {
        origin: 'FM - ERRO FRETE EXTRA',
        destinations: ['FRETE EXTRA']
    },
    {
        origin: 'FM - EXCLUSAO CTE',
        destinations: ['DOC INVALIDO']
    },
    {
        origin: 'FM - FATURA',
        destinations: ['FATURA SEM INTERFACE A9', 'INCORRECT VALIDATION OF FATURA', 'NO AUTOMATIC FATURA CT', 'WITH NO INTERFACE A9']
    },
    {
        origin: 'FM - FREIGTH TABLE',
        destinations: ['UPLOAD FREIGHT TABLE']
    },
    {
        origin: 'FM - FRETE EXTRA',
        destinations: ['DATA INICIO CTE > DATA DE EMISSAO', 'SEM PRE FATURA', 'UR-EXCLUSAO DE CONHECIMENTO', 'UR-EXCLUSAO DE DESPESA EXTRA', 'UR-INCLUSAO DE DESPESA EXTRA']
    },
    {
        origin: 'FM - GENERATION CTE',
        destinations: ['CTE DATA VALIDATION']
    },
    {
        origin: 'FM - INTERFACE',
        destinations: ['TIBCO FICHA INTERFACE', 'MASTERDATA - TW NOT ACCOUNTED', 'TIBCO LOAD INTERFACE', 'LOAD INTERFACE', 'INCORRECT NF VALUE', 'LOCAL DE COLETA BLANK', 'SUPPORT - NCM PARAMETERIZATION', 'CNPJ FORMATO INVALIDO', 'NF DUPLICATED FOR ANOTHER LOAD', 'ERRO ADDRESS LOCAL DE ENTREGA', 'LOAD WITH MORE 120 DAYS']
    },
    {
        origin: 'FM - LOAD/CTE',
        destinations: ['SEM PRE FATURA']
    },
    {
        origin: 'FM - LOAD/FICHA',
        destinations: ['LOAD/FICHA NAO INTEGRADO', 'LOAD/FICHA NAO CALCULADO', 'LOAD/FICHA NAO ENVIADO AO CTMS', 'LOAD/FICHA COM INDICADOR DE QUEBRA INCORRETO', 'LOAD/FICHA INTEGRADO COM DADOS INCORRETOS', 'LOAD/FICHA INTEGRADO SEM DADOS DO TRANSPORTADOR', 'LOAD/FICHA INTEGRADO COM DADOS DE ORIGEM ICORRETO', 'LOAD/FICHA INTEGRADO COM DADOS DO DESTINO INCORRETO', 'LOAD/FICHA INTEGRADO COM PESO ORIGEM ERRADO', 'LOAD/FICHA INTEGRADO COM NOTA QUE JA EXISTE NO CTMS', 'LOAD/FICHA INTEGRADO SEM CONTA CONTABIL', 'LOAD/FICHA INTEGRADO SEM DADOS DE ORIGEM', 'LOAD/FICHA INTEGRADO SEM DADOS DO DESTINO', 'LOAD /FICHA INTEGRADO COM DADOS DO PRODUTO/NCM INCORRETO', 'LOAD/FICHA CANCELADO NO JDE', 'LOAD/FICHA CANCELADO NO CTMS', 'LOAD/FICHA PROBLEMA TN', 'LOAD/FICHA PROBLEMA ORDEM DE COLETA', 'LOAD/FICHA PROBLEMA FOB', 'LOAD/FICHA PROBLEMA CIF', 'LOAD/FICHA SOLICITAÇAO DE CANCELAMENTO', 'LOAD/FICHA SOLICITAÇAO DE EXCLUSAO', 'LOAD/FICHA - ERRO NAO CATALOGADO']
    },
    {
        origin: 'FM - OH INTERFACE',
        destinations: ['FICHA ENVIADA NAO CHEGOU NO CTMS']
    },
    {
        origin: 'FM - OH NOT SENT TO CTMS',
        destinations: ['FICHA APPLIED WRONGLY']
    },
    {
        origin: 'FM - PESO DESTINO CT',
        destinations: ['INTERFACE']
    },
    {
        origin: 'FM - PRE FATURA',
        destinations: ['INCORRECT DISCOUNT', 'JOB PRE-FATURA STOP', 'WITHOUT OCCURRENCE DATE', 'WD- PREFATURA WAS NOT CREATED AUTOMATICALLY']
    },
    {
        origin: 'FM - RELATORIO ANALISTICO',
        destinations: ['SEM CTE']
    },
    {
        origin: 'FM - REPOM',
        destinations: ['CHANGE LOAD PARAMETER REPOM = N']
    },
    {
        origin: 'FM - REPORT',
        destinations: ['ERROR', 'REPORT CONTABIL', 'REPORT CONTABIL ERROR']
    },
    {
        origin: 'FM - TDE',
        destinations: ['ERRO IMPORTACAO']
    },
    {
        origin: 'FM - TN',
        destinations: ['ERRO AO ASSIGNAR']
    },
    {
        origin: 'FREIGHT - TR',
        destinations: ['ERRORS IN TR-TW INTERFACE', 'TIBCO/ INTERFACE TR-TW', 'TR CANCELLED']
    },
    {
        origin: 'FREIGHT -DIVERGENT',
        destinations: [
            'APPLIED INCORRECTLY', 
            'CTe NÃO ENCONTRADO',
            'FLAG CFSTA EM S NO JDE, FICHA NÃO INTEGRA NO CTMS',
            'INCORRECT ACCOUNT NUMBER', 
            'INCORRECT DOCUMENT IN CARDEX',
            'ORDEM DE COLETA NÃO VINCULADA'
        ]
    },
    {
        origin: 'FTS',
        destinations: ['CONTRATO NAO ENVIADO PARA A F5560101', 'CONTRATOS ENVIADOS DO FTS INCORRETAMETE', 'ESTORNO FTS INDEVIDO', 'PORTO INCORRETO', 'CONTRATO NAO ENVIADO PARA A F5560103'],
        rules: [{1: 'ACCOUNT', 2: 'ORIGINATION'}]
    },
    {
        origin: 'FTS',
        destinations: ['G6 GENERADO MAL', 'INCORRECT ADDRESS', 'ILLPNU Y ILASID NO ESTAN SIENDO GRAVADOS EN CARDEX', 'MISSING LOCAL REGISTER'],
        rules: [{1: 'PLANTS & OPERATIONS', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'FTS AP',
        destinations: [`VOUCHER DIDN'T GENERATE IN JDE`],
        rules: [{1: 'OW7A8', 2: 'PROPERTY'}]
    },  
    {
        origin: 'FTS GL',
        destinations: [`TEMPORARY TABLE - CLEANING`],
        rules: [{1: 'OW7A8', 2: 'PROPERTY'}]
    },  
    {
        origin: 'FUNDEINFRA NÃO GERADO',
        destinations: ['VERSAO FUNDEINFRA GENERATE DE NOTAS']
    },
    {
        origin: 'FUNDERSUL- PROBLEMAS IMPOSTOS AGRICOLAS',
        destinations: ['IMPOSTO COM VALOR INDEVIDO', 'RELATORIO COM DADOS DE BP INDEVIDA']
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
        destinations: ['II – GDR SLOWNESS', 'NEW BRANCH REGISTER', 'ALTERAR EMAIL DO USUARIO NO GDR']
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
        origin: 'GL',
        destinations: [
            'APB - DOCUMENTO SUMARIZADO SEM INTERFACE',
            'BATCH POSTING',
            'CHANGE BATCH TYPE - KT DOC',
            'DOC FLAGGED WITH INTERFACE JOB BUT DIDN’T ENTER ON A9',
            'SUBACCOUNT BLANK OR INVALID',
            'XA GENERATED WRONGLY'
        ]
    },
    {
        origin: 'HEDGE POSITION',
        destinations: ['SALDO DE TICKET FUTURO INDEVIDO']
    },
    {
        origin: 'HUMEDÍMETRO',
        destinations: [
            'Alterar descrição do Humedímetro',
            'Configuração de string de Humedímetro',
            'Defeito na Porta “COM”',
            'Mudar Humedímetro de PC',
            'Não captura valores de humidade',
            'Nova configuração de Humedímetro',
            'Problema de conexão física com Humedímetro',
            'Problema físico no Humedímetro',
            'Valores de humidade incorretos'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB'}]
    },
    {
        origin: 'HUMEDIMETRO E PRODUTO',
        destinations: [
            '“Product range VL unit”',
            '“Product range VL unit” muda automaticamente',
            'Botões de classificação nula',
            'Desconto de valor nulo kg não calculado',
            'Desconto divergente do item faixa',
            'Desconto incorreto após impurezas',
            'Erro no detalhe do produto',
            'GAC não está se comunicando',
            'Interfaces produto BP não executado',
            'Mestre de itens no JDE',
            'Parametrização de desconto linear',
            'Parametrização de transgénicos',
            'Produto incorreto na ficha',
            'Rodada de dados de qualidade',
            'Sem entrada de detalhes de qualidade ficha',
            'Sem entrada de detalhes do produto',
            'Unidade de negócios filial adicionada',
            'Unidade de produto “CD = 1”'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'INDUSTRIALIZACAO',
        destinations: ['LINHA IM LANCADA COM DATA INCORRETA'],
        rules: [{1: 'PILHA', 2: 'ORIGINATION'}]
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
        origin: 'IMPRESSORA',
        destinations: [
            'Laser - configuração de nova impressora', 
            'Laser - impressora não compartilhada', 
            'Laser - impressora não funciona'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB'}]
    },
    {
        origin: 'IMPRESSORA',
        destinations: [
            'Datamax - configuração de nova impressora',
            'Datamax - impressora não compartilhada',
            'Datamax - impressora não funciona'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'IMPRESSORA',
        destinations: [
            'Adicionar computador para impressão automaticamente',
            'Impressora com problemas rede',
            'Impressora térmica - configuração de nova impressora',
            'Impressora térmica - impressora não compartilhada',
            'Impressora térmica - impressora não funciona',
            'Instalação impressora no servidor'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB', 3: 'BRAZIL'}]
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
        origin: 'INCORPORATION',
        destinations: ['APB - INVALID DISPOSAL STATUS', 'LIBERATION OF INCORPORATION'],
        rules: [{1: 'JOB COST', 2: 'PROPERTY', 3: 'BRAZIL'}]
    }, 
    {
        origin: 'INFRA',
        destinations: ['PERFORMANCE'],
        rules: [{1: 'MASTERSAF'}]
    },
    {
        origin: 'INSTALAÇÃO',
        destinations: [
            'Instalar "Painel Logístico"', 'Instalar Crystal Report', 'Instalar RDS', 'Nova configuração da balança', 'Nova configuração do GAC do dispositivo', 'String negativo', 'Versão incorreta do "PP.EXE"', 'Versão incorreta RDS'
        ],
        rules: [{1: 'INSTALAÇÃO E CONFIGURAÇÃO', 2: 'RDS (.Net)'}]
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
            'Banco Toflux down', 'Problema no DB-Link'
        ],
        rules: [{1: 'BALANCE', 2: 'CORPORATE'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'ADDRESS BOOK - ADDRESS NOT REGISTER',
            'ADDRESS IDENTIFIER IDENT_FIS_JUR INCORRECT',
            'ADDRESS IDENTIFIER IDENT_FIS_JUR INVALID',
            'ASSET REGISTER',
            'AUTHORIZED FREIGHT NOT IN INT_TB',
            'CTRC CANCELLED IN CTMS',
            'EXPORT INVOICES NOT SENT TO MASTERSAF',
            'EXTRA INTERFACE CTMS X MSAF',
            'FISCAL - ACCOUNTING ACCOUNT REGISTRATION',
            'FISCAL - IMPORT CONFIGURATION',
            'IMPORT SAFX01',
            'INCORRECT FISCAL DATE ON INVOICES - SAP',
            'INCORRECT ORIGIN IDENTIFIER ON THE PRODUCT',
            'INCORRECT USER VALIDATION',
            'IND_PROD NULL IN EXPORT INVOICES',
            'INTERFACE ADDITIONAL NOTES - C197',
            'INTERFACE SAP X MSAF',
            'INVALID INVOICES',
            'INVOICES NOT FOUND ON JDE TEMP TABLES',
            'INVOICES NOT FOUND ON TEMP TABLES (JDE)',
            'INVOICES NOT FOUND ON TEMP TABLES (SAP)',
            'INVOICES WITH DOCUMENT TYPE NULL (JDE)',
            'INVOICES WITH ERROR IN TEMP TABLE',
            'INVOICES WITH INCORRECT DATE',
            'INVOICES WITH INCORRECT COD_MUN AND UF',
            'INVOICES WITH INCORRECT TAX PURPOSE',
            'INVOICES WITH INVALID CIA (SAP)',
            'INVOICES WITHOUT EXECUTION OF R5576036 - STATUS',
            'JDE - UNDUE INVOICES',
            'MASTERDATA - ADDRESS WITH INCORRECT UF COD',
            'MASTERDATA - ADDRESS WITH RETROACTIVE DATE',
            'MASTERDATA - INVOICES WITH INVALID ADDRESS (SAP)',
            'NF ANNULLED IN CTMS',
            'NF CANCELLED IN CTMS',
            'NF CANCELLED IN JDE',
            'NF EXPORT - NO PRINT MEMORANDUM',
        ],
        rules: [{1: 'MASTERSAF'}]
    },
    
    {
        origin: 'INTERFACE',
        destinations: ['EMAIL'],
        rules: [{1: 'TIBCO', 2: ['INTERFACE TIBCO/DATA MIRROR', 'INTERFACE TIBCO/OPENTEXT']}]
    },
    {
        origin: 'INTERFACES',
        destinations: [
             'DB-Link travado', 'Informações não migram para o central', 'Integra RDS com erro', 'INTERFACE BOOMI', 'Interface PIPE'
        ],
        rules: [{1: 'DATABASE', 2: 'CORPORATE'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'Interface parada',
            'Problemas com performance'
        ],
        rules: [{1: 'MONITORAMENTO', 2: 'ADE02'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'Interface parada', 'Problemas com performance'
        ],
        rules: [{1: 'MONITORAMENTO', 2: 'CORPORATE'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'Interface parada', 'Problemas com performance'
        ],
        rules: [{1: 'MONITORAMENTO', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'Interface parada', 'Problemas com performance'
        ],
        rules: [{1: 'MONITORAMENTO', 2: 'RDS WEB'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'Duplicidade de itens - duplicidade de itens de produtos', 
            'Duplicidade de itens - duplicidade de itens de qualidade', 
            'Duplicidade de itens - duplicidade de produtos'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'FICHA PROCESSADA NO RDS, MAS NÃO CARREGADA EM FTS'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: 'BOLIVIA'}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'Carta porte - carta porte duplicada',
            'Carta porte - interveniente não cadastrado',
            'Carta porte - produto não cadastrado',
            'Inciso incorreto'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: ['ARGENTINA', 'BOLIVIA']}]
    },
    {
        origin: 'INTERFACE',
        destinations: [
            'Erro de envio de peso ao E1 - erro de dados',
            'Erro de envio de peso ao E1 - erro de preenchimento de ficha',
            'Erro sem descrição no E1',
            'Ficha alterada no RDS e não faz interface para o E1',
            'Ficha não enviada ao E1',
            'Ficha processada no RDS, mas não carregada em E1'
        ],
        rules: [{1: 'FICHA', 2: 'RDS WEB', 3: ['ARGENTINA', 'BRAZIL']}]
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
        origin: 'INTERFACE CORPORATE',
        destinations: [
            'Eventos de navio não enviados',
            'INTERFACE BOOMI'
        ],
        rules: [{1: 'INTERFACE', 2: 'ADE02'}]
    },
    {
        origin: 'INTERFACE CPEAR',
        destinations: [
            'Não confirma CTG automaticamente',
            'INTERFACE INATIVA',
            'Lentidão na interface',
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
    },
    {
        origin: 'INTERFACE CEREALNET',
        destinations: [
            'Erro ou Lentidão na transmissão individual', 
            'Erro ou Lentidão na transmissão massiva',
            'INTERFACE INATIVA',
            'Lentidão na interface',
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
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
            'ACCOUNTING ACCOUNT INCORRECT IN TEMP TABLE',
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
        origin: 'INTERFACE GDR X SAP',
        destinations: ['XML NOT RECEIVED TO SAP'],
        rules: [{1: 'GDR'}]
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
        origin: 'INTERFACE MASTER',
        destinations: [
            'CCT não interfaceado com JDE', 'Conta bloqueada', 'Duplicado', 'Endereço não atualizado no JDE', 'Endereço não atualizado no XE', 'Interface JDE F5543030 interrompida', 'Interface RDS x JDE parado', 'Masterdata cadastro de PB', 'Novo endereço sem interface', 'Os produtos JDE x RDS não têm interface', 'Tubo de interface'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS (.Net)'}]
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
        origin: 'INTERFACE NEOGRID X GDR / GDF',
        destinations: ['XML NOT RECEIVED TO GDR / GDF']
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
        origin: 'INTERFACE PDUAL X ADE',
        destinations: [
            'Evento duplicado', 'Evento não enviado ao ade', 'Evento não enviado ao PDUAL', 'Evento recusado', 'Interface PIPE parada'
        ],
        rules: [{1: 'INTERFACE', 2: 'ADE02'}]
    },
    {
        origin: 'INTERFACE RDS',
        destinations: [
            'Interface de PIPE parada', 'Reenviados eventos de barcaça', 'Reenviados eventos de caminhões', 'Reenviados eventos de vagões'
        ],
        rules: [{1: 'INTERFACE', 2: 'ADE02'}]
    },
    {
        origin: 'INTERFACE RDS', 
        destinations: [
            'Ficha não migrou', 'Fichas de barcaça não migraram', 'Interface de PIPE parada/travada', 'Reenvio de ficha'
        ],
        rules: [{1: 'FICHA', 2: 'CORPORATE'}]
    },
    {
        origin: 'INTERFACE RDS',
        destinations: [
            'Ficha não migrou', 'Fichas de barcaça não migraram', 'Interface de PIPE parada', 'Reenvio de ficha'
        ],
        rules: [{1: 'INTERFACE', 2: 'CORPORATE'}]
    },
    {
        origin: 'INTERFACE RDS',
        destinations: ['FICHA INTERFACEADA COM VALOR/QTDE INDEVIDA', 'NAO OCORRE INTERFACE DA FICHA']
    },
    {
        origin: 'INTERFACE RDS - E1',
        destinations: [
            'Lentidão na interface com E1', 
            
            'Job travado'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB', 3: ['ARGENTINA', 'BRAZIL']}]
    },
    {
        origin: 'INTERFACE RFB',
        destinations: [
            'Certificado digital vencido', 'RFB com problemas', 'Serviço parado', 'Servidor indisponível'
        ],
        rules: [{1: 'INTERFACE', 2: 'ADE02'}]
    },
    {
        origin: 'INTERFACE RONDA',
        destinations: [
            'Evento de acesso de pessoas', 'Evento não entregue no PDUAL', 'Evento não enviado', 'Evento recusado'
        ],
        rules: [{1: 'INTERFACE', 2: 'ADE02'}]
    },
    {
        origin: 'INTERFACE RTDUET X ADE',
        destinations: [
            'Interface BOOMI parada', 'PIPE parado/travado', 'Serviço PIPE desligado'
        ],
        rules: [{1: 'INTERFACE', 2: 'ADE02'}]
    },
    {
        origin: 'INTERFACE RUMO',
        destinations: ['STOP TIBICAL INTERFACE'],
        rules: [{1: 'NFE CARGILL', 2: 'BOLTONS', 3: 'BRAZIL'}]
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
        origin: 'INTERFACES', 
        destinations: [
            'Eventos não migraram para o ade', 'Interface BOOMI travada', 'Reenvio de evento'
        ],
        rules: [{1: 'AGENDAMENTO NAVIO', 2: 'CORPORATE'}]
    },
    {
        origin: 'INTERFACES',
        destinations: ['REPROCESO DEL ARCHIVO FIBI'],
        rules: [{1: 'TECHNICAL SERVICES', 2: 'JDE A9 WS', 3: 'MEXICO'}]
    },
    {
        origin: 'INTERFACES SAP-TC2',
        destinations: ['DOCTOS NO SE VEN EN JDE'],
        rules: [{1: 'ACCOUNTING', 2: 'JDE A9 WS'}]
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
        destinations: ['INCORRECT ASSET STATUS', 'INCORRECT VALUE IN INVENTORY'],
        rules: [{1: 'JOB COST', 2: 'PROPERTY', 3: 'BRAZIL'}]
    }, 
    {
        origin: 'INVALID BALANCE',
        destinations: ['INCORRECT VALUE IN INVENTORY', 'INVALID ASSET BALANCE - DP'],
        rules: [{1: 'FIXED ASSET', 2: 'PROPERTY', 3: 'BRAZIL'}]
    },
    {
        origin: 'INVENTORY ITEM',
        destinations: [
            'ADDRESS IDENTIFIER IDENT_FIS_JUR INCORRECT',
            'ADDRESS IDENTIFIER IDENT_FIS_JUR NULL',
            'COST CENTER IN BLANK ON INVENTORY ITEM',
            'IMPORT SAFX52',
            'INCORRECT COUNT GROUP ON INVENTORY ITEM',
            'INCORRECT FLAG IND REG ESPECIAL',
            'INCORRECT QUANTITY ON INVENTORY ITEM',
            'INVENTORY ITEM WITH IND_PRODUTO INCORRECT',
            'INVOICES OBS WITH INCORRECT COD OBS',
            'INVOICES NOT FOUND ON TEMP TABLES (JDE)',
            'INVOICES WITH INCORRECT IND NATUREZA FRETE',
            'INVENTORY ITEM  WITH IND_PRODUTO INCORRECT',
            'PRODUCT IDENTIFIER IND_PRODUTO INCORRECT',
            'REGISTER BENEFICIARY CODE',
            'SAP - INVOICES WITH INCORRECT IPI',
            'WAREHOUSE CODE NOT REGISTERED'
        ]
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
            'INCORRECT_IDENT_CLASSE_CONSUMO',
            'INCORRECT COD_MUN AND UF ON INVOICES',
            'INCORRECT DAT_FAT_GERADOR',
            'INCORRECT EMISSION DATE ON INVOICES',
            'INCORRECT EMISSION DATE (CTMS)',
            'INCORRECT EMISSION DATE (JDE)',
            'INCORRECT FLAG IND REG ESPECIAL',
            'INCORRECT ICMS NO ESCR',
            'INCORRECT ICMS ST - FCP',
            'INVOICE WITH INCORRECT NORM DEV',
            'INVOICES CANCELLED',
            'INVOICES CIA 50361 WITH INCORRECT VLR DESCONTO VLR CONTAB ITEM (JDE)',
            'INVOICES WITH ACCOUNTING CIA INCORRECT',
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
            'INVOICES WITH INCORRECT IND NATUREZA FRETE',
            'INVOICES WITH INCORRECT INSS',
            'INVOICES WITH INCORRECT IPI BASE VALUE',
            'INVOICES WITH INCORRECT MODEL NF',
            'INVOICES WITH INCORRECT NCM ON ITEM (JDE)',
            'INVOICES WITH INCORRECT NUMBER - JDE',
            'INVOICES WITH INCORRECT PIS COFINS - CTMS CT',
            'INVOICES WITH INCORRECT SERIE - SAP',
            'INVOICES WITH INCORRECT SERIE - JDE',
            'INVOICES WITH INCORRECT TOTAL VALUE - JDE MSAF X NFE',
            'INVOICES WITH INCORRECT VALUE - SAP',
            'INVOICES WITH INCORRECT VALUE AND QUANTITY',
            'INVOICES WITH INCORRECT VALUE ICMS N DESTAC',
            'INVOICES OBS WITH INCORRECT COD OBS',
            'INCORRECT FLAG IND CANCELLED INVOICE',
            'INVOICES WITH INCORRECT CIA (CTMS)',
            'FUNDEMS VALUES ADJUSTMENT',
            'INCORRECT FISCAL DATE ON INVOICES',
            'INVOICES WITHOUT ACCESS KEY',
            'ITEM QUANTITY WITH ZERO',
            'JDE - INVOICES WITH INCORRECT BASE ICMS',
            'JDE - INVOICES WITH INCORRECT CFOP',
            'JDE - INVOICES WITH INCORRECT CIA',
            'JDE - INVOICES WITH INCORRECT CST ICMS',
            'JDE - INVOICES WITH INCORRECT IPI',
            'JDE - INVOICES WITH INCORRECT PIS COFINS',
            'JDE - INVOICES WITH UNIT OF MEASUREMENT',
            'NOTE ITEMS WITH INCORRECT SERVICE TYPE',
            'PIS COFINS OF ITEMS WITH A BLANK DATE',
            'SAP - INVOICES WITH INCORRECT CFOP',
            'SAP - INVOICES WITH INCORRECT CIA FISCAL',
            'SAP - INVOICES WITH INCORRECT DIF ALIQUOTA',
            'SAP - INVOICES WITH INCORRECT ICMS',
            'SAP - INVOICES WITH INCORRECT PIS COFINS',
            'SAP - INVOICES WITH INCORRECT IPI',
            'SAP - INVOICES WITH INCORRECT INSS'
        ]
    },
    {
        origin: 'ITAS',
        destinations: ['FICHA NAO INTERFACEIA PARA JDE']
    },
    {
        origin: 'JDE - EXPORT',
        destinations: [
            'EMBARQUE COTTON',
            'PAINEL DE CHECAGEM NOTAS INCORRETAS',
            'PAINEL DE CHECAGEM ATUALIZACAO CARDEX',
            'PAINEL DE CHECAGEM CARDEX DUPLICADO',
            'PAINEL DE CHECAGEM COTTON',
            'PAINEL DE CHECAGEM INTERFACE',
            'PAINEL DE CHECAGEM XML',
            'PAINEL CCT',
            'PERFORMANCE',
            'INTERFACE BOOMI',
            'INTERFACE CCT',
            'INTERFACE CEXP',
            'INTERFACE JDE X OSGT',
            'INTERFACE PRODUTOS',
            'INTERFACE PARCEIROS',
            'REJEIÇÃO DE NOTA',
            'REQUEST',
            'STATUS OSGT',
            'STATUS CCT',
            'XML'
        ]
    },
    {
        origin: 'JDE - IMPORT',
        destinations: ['BP DOESNT HAVE THE INTERFACE', 'MATERIAL DOESNT HAVE THE INTERFACE', 'MATERIAL WITHOUT LONG DESCRIPTION', 'PARTNER DOESNT HAVE THE INTERFACE']
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
        origin: 'LIFE TIME',
        destinations: ['UPDATE LIFE TIME'],
        rules: [{1: 'FIXED ASSET', 2: 'PROPERTY'}]
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
        destinations: ['FICHA RDS WEB COM O LOAD INCORRETO', 'WRONG STATUS OF LOAD'],
        rules: [{1: ['LOGISTICS', 'TRANSPORTATION']}]
    },
    {
        origin: 'LOAD',
        destinations: ['APB - ANULACION LOAD CON PEDIDO LX'],
        rules: [{1: 'LOGISTICS'}]
    },
    {
        origin: 'LOAD',
        destinations: [
            'ABP - FREIGHT FERROVIARIO - LOCAL DE COLETA',
            'ADDRESS BOOK - NCM',
            'CH - FREIGHT FERROVIARIO - LOCAL DE COLETA',
            'COA - INACTIVE ACCOUNT',
            'FBZ LOAD WITHOUT OC',
            'FREIGHT FERROVIARIO',
            'IMPRESSAO DE ORDENS DE CARREGAMENTO',
            'INCORRECT ADDRESS',
            'INCORRECT INVOICE LOAD SIMULATED',
            'INCORRECT NUMBER OF OC',
            'INCORRECT VEHI',
            'INVOICE AUTHORIZED AFTER LOAD SENT CTMS',
            'INVOICE OUT OF SEQUENCE',
            'LOAD CANCELED CTMS',
            'LOAD SENDED INCORRECTLY TO CTMS',
            'PROCESSING OF JOB R5549020',
            'PROCESSING OF JOB R5549200',
            'SERVER LAJDE01P DOWN',
            'SUPPLEMENTAL CTMS EF',
            'WRONG OPERATION TYPE'
        ],
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
        destinations: [
            'LOAD AT 80 BUT WITHOUT CONFIRMATION',
            'RESTARTED A SERVICE IN RDS',
            'AUTOMATIC JOB NOT RUNNING',
            'MASTERDATA - COD CAT 10 TBO',
            'ADVANCE STATUS TO 90 VE',
            'WRONG STATUS OF ORDER',
            'ERRO NA ATUAL DO DET DO PEDIDO',
            'RDS SLOWNESS',
            'INCORRECT WEIGHT',
            'EXCESS OF WEIGHT NOT ALLOWED',
            'USER DIDNT DO CONFIRMATION',
            'BACK STATUS TO 20 TO CANCEL',
            'CANCELAR LOAD',
            'CHANGE STATUS TO 98',
            'GERACAO NF DE O7',
            'PUT ORDER IN STATUS OF ACCOUNTED',
            'PUT ORDER IN STATUS OF CANCELATION',
            'CANCELLED THE LOAD UNDULY',
            'INCORRECT MENU',
            'USER DIDNT USED THE MENU',
            'BP - NEW REGISTRATION LOAD AUTOMATICO',
            'CTMS OC INTERFACE FAILURE',
            'MASTER DATA - ITEM',
            'ORDER NOT SHOW TO BOARD',
            'PLACA WITH INCORRECT INFORMATION',
            'PROBLEMS IN LOAD AUTO GENERATION',
            'SLOWNESS TO APPLY TN',
            'LINE RELATED TO OTHER LOAD',
            'ERROR Z5549091 - BALANCES CANNOT BE',
            'ORDER LOCKED C1',
            'SLOWNESS IN OC GENERATION',
            'BACK TO STATUS 20 FOR USER CORRECT',
            'EXISTS INCONSISTENCY - F5549001',
            'INFORMED INCORRECT SERIES NUMBER',
            'LOTE WITH WRONG NOTA',
            'DONT HAVE INPUT OF WEIGHT OR QUALITY',
            'INCORRECT BP OF DESTINATION',
            'STATUS INCORRETO',
            'LOTE BLANK',
            'MASTER DATA - DAY OF SHELF NOT REGISTRED',
            'MASTER DATA - LOCAL',
            'MD - ERROR - AAI - PED SEM HEADER',
            'PO ADJUSTMENT',
            'TRY TO RECEIVE CANCELED LOAD',
            'FLAG Y ON F5549001',
            'NF VINCULADA AO OSGT',
            'LOAD DONT HAVE WEIGHT WITH FLAG Y IN F5549001',
            'BLOQUEADO SINCRONISMO',
            'VINCULACAO TARDIA - PEDIDO OW'
        ],
        rules: [{2: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'LOAD - REPOM',
        destinations: ['LOGISTIC - INCORRECT DRIVER E-MAIL', 'INVALID CARD', 'PROBLEMS IN REPOM INTERFACES']
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
        origin: 'MDFE - CTMS',
        destinations: ['MDFE ANTERIOR NAO ENCERRADO', 'MDFE NAO ENCERRADO', 'MDFE REJEITADO', 'MDFE NAO AUTORIZADO', 'MDFE AGRUPADO', 'MDFE ERRO NAO CATALOGADO']
    },
    {
        origin: 'MANIFESTO DO DESTINATÁRIO',
        destinations: ['DESCONHECIMENTO DA OPERAÇÃO'],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION', 3: 'BRAZIL'}]
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
        destinations: [
            'ADDRESS NAO PARAMETRIZADO PARA FUNRURAL',
            'ATUALIZAR DATAS PARA PERMITIR REVERSAO',
            'AW NOT APPEARING IN CONSULTA RAZAO DO DO',
            'DESCONFORMAR X0',
            'N5- NAO GERADO',
            'NAO FOI EXECUTADO ROTINA DE GERACAO NFE',
            'NAO GEROU X0 - ADDRESS BLOQUEADO',
            'NAO GEROU X0 - ADDRESS FAZENDA INCORRETO',
            'NAO GEROU X0 - APLICACAO PENDENTE',
            'NAO GEROU X0 - FALTA COMPLEMENTO',
            'NAO GEROU X0 - FIXACAO EM REAIS PENDENTE',
            'NAO GEROU X0 - MOTIVO NAO INFORMADO',
            'NAO GEROU X0 - PARAMETRIZACAO INCORRETA FUNRURAL',
            'NAO GEROU X0 DEVIDO ERRO DE FUNRURAL',
            'STATUS DO X0 INCORRETO MOTIVO NAO INFORMADO',
            'USER - ANEXO DOCUMENTO',
            'USER - PARAMETRIZACAO DO JOB',
            'USR - USUARIO SEM ACESSO, SEM CONTATO COM O COMERCIAL',
            'USR - X0 NAO GERADO',
            'X0 A MENOR - COMPLEMENTO NÃO LANÇADO',
            'X0 DUPLICADO',
            'X0 DUPLICADO - LENTIDAO JOB',
            'X0 GERADO A MAIOR',
            'X0 GERADO COM ADDRESS DIREFERENTES',
            'X0 GERADO COM VALOR DIVERGENTE DE FIXACAO',
            'X0 GERADO COM VALOR INCORRETO',
            'X0 GERADO COM VALOR INCORRETO - ERRO DESCONTO QUALIDADE',
            'X0 GERADO COM VALOR INCORRETO – FUNRURAL INCORRETO',
            'X0 GERADO INCORRETO - VARIAS NOTAS',
            'X0 GERADO NO EXCESSO SEM COMPLEMENTO',
            'X0 MENOR FXR C SPLIT',
            'X0 NAO GERADO COMPLEMENTO FALHA JOB',
            'X0 NAO GERADO VALOR NEGATIVO F43121',
            'X0 STATUS A - RPAAP NULO',
            'X0S GERADOS INDEVIDAMENTE'
        ],
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
        destinations: [
            'PROBLEM WITH TIBCO INTERFACE MDFE WITH STATUS A', 
            'MDFE REJECTED WITHOUT RETURN', 
            'NF DO COMPOIO SEM AUTORIZACAO',
            'UDC 55BR DK E DJ'
        ]
    },
    {
        origin: 'MEZCLA',
        destinations: ['IC DUPLICADO', 'MEZCLA NO GENERO IM', 'REVERSION', 'STOCK']
    },
    {
        origin: 'MIOLO',
        destinations: ['DATA CONTABIL EM BRANCO', 'DATA TRANSACAO/CONTABIL INCORRETA', 'DIFERENCA ENTRE RD E RELATORIO DE PDPV', 'DOCUMENTO DE FRETE SEM TIPO DE LINHA', 'DOCUMENTOS COM FLAG EM BRANCO F556001', 'ERRO TIPO DE LINHA F5560001', 'OV - OH SEM CUSTO', 'PRECO MEDIO INCORRETO', 'RD NAO LE CARDEX', 'REPROCESSAMENTO - VALOR MIOLO INCORRETO', 'SEGMENTACAO TR COMPRA E TRANSFERENCIA', 'USER - PARAMETRIZADO DOC PARA LEITURA RD']
    },
    {
        origin: 'MONITOR DE INTERFACE', 
        destinations: [
            'Cliente/emitente incorreto', 'Erro de reprocessamento', 'Ficha com erro de digitação', 'Ficha excluída indevidamente', 'Interface “NFS Terceiros” parada', 'Peso fiscal lançado errado', 'Usuário sem permissão'
        ],
        rules: [{1: 'FICHA', 2: 'CORPORATE'}]
    },
    {
        origin: 'MONITOREO',
        destinations: [
            'ADDRESS BROKER', 
            'BATCH NO CONTABILIZADO',
            'COBRO NETTING SIN CONTAB',
            'COBROS_PEND_CONTAB'
        ],
        rules: [{1: 'FINANCE'}]
    },
    {
        origin: 'MONITOREO',
        destinations: [
            'BATCH COMPARTIDO CON X1 VIEJO',
            'BATCH DB EN ERROR',
            'BATCH IB APROBADO SIN POSTEAR',
            'BATCH SIN ENCABEZADO',
            'BATCH V APROBADO SIN POSTEAR',
            'BATCH V EN ERROR',
            'DOC AP PEND CONTAB',
            'DOCUMENTO CON FECHA Y PERIODO CERRADOS',
            'DOCUMENTO EN LOOP ID INEXISTENTE',
            'DOCUMENTO NO EXISTE EN LA TABLA F03B11',
            'DOCUMENTO NO EXISTE EN LA TABLA F76A09-RECLASIFICACION DE TAX',
            'DOCUMENTOS NO ESTAN EN NETTING - NETST = 0',
            'ERROR DE INTEGRIDAD CON DOCUMENTO ASOCIADO A NETTING ID',
            'ERROR REVERSO DE RECIBOS CON CHEQUE RECHAZADO EN DISTINTO PERIODO',
            'NUMERACION DEL DOCUMENTO CERO EN EL GLDOC Y RZDOCG',
            'REPORTE NETTING PENDIENTE - R5509050',
            'REVERSION DEL PAGO CON FECHA MES ANTERIOR Y PERIODO CERRADO'
        ],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'MONITOREO',
        destinations: ['INCIDENTE TRUESIGHT'],
        rules: [{1: ['FINANCE', 'VENTAS']}]
    },
    {
        origin: 'MONITOREO',
        destinations: [
            'BITACORAS GL',
            'BITACORAS AP',
            'DOC AP PEND CONTAB',
            'DOC AR SIN CONTAB',
            'INTEGRIDAD AP',
            'INTEGRIDAD AR',
            'INTERFAZ AP',
            'INTERFAZ GL',
            'PAGOS NETTING SIN CONTAB',
            'PAGOS_PEND_APROB_ INFO',
            'PED_PEND_SALES_UPDATE',
            'ZFILE AP',
            'ZFILE GL',
        ],
        rules: [{1: 'FINANCE', 2: 'JDE ENTERPRISE E1/JDE A9'}]

    },
    {
        origin: 'MONITOREO',
        destinations: ['INCIDENTE TRUESIGHT'],
        rules: [{1: 'LOGISTICS', 2: 'JDE ENTERPRISE E1/JDE A9'}]

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
        origin: 'MX',
        destinations: ['PARAMETRIZACAO DE ITEM', 'SALDO CONTRATOS DESATUALIZADO']
    },
    {
        origin: 'NAO ENVIADA AO SEFAZ',
        destinations: [
            'ADDRESS BOOK – LOGRADOURO',
            'CADASTRO DE PLACAS - CAMPO UF COM *',
            'CAMBIO ESTADO AUTOMATICO - COD RESP 217',
            'CNPJ INVALIDO',
            'CONTIGENCIA NA SEFAZ',
            'ICMS NEGATIVO',
            'LINHAS DUPLICADAS NA F5576505',
            'NF MODELO 4 COM SERIE DIFERENTE DE 000/001',
            'NF MS-SERIE 000/001/100-CAMPO NFNFEBSER INCORRRETO',
            'NOTA REFERENCIADA COM DIGITO A MAIS',
            'NOTAS JA UTILIZADAS - VISTO NO SIGNATURE',
            'NOTAS MS - LINHAS DUPLICADAS NA F5576505',
            'NP REFERENCIADA COM SERIE INVALIDA',
            'NP REFERENCIADA COM TIPO INVALIDO',
            'NRNFENRNP > 2 MILHÕES',
            'SERIE 000 - NFP FORA DO RANGE'
        ],
        rules: [{1: 'INVOICE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NETTING',
        destinations: [
            'AUDITORIA DE APROVACAO DE PAGAMENTO',
            'CAK EM PROCESSMENTO',
            'DOCUMENTOS NAO APARECEM PARA NETTING',
            'EXCLUSAO DE X1',
            'FALTA CADASTRO DE AAI',
            'LINHA AW EXCLUIDA',
            'PROBLEMA NA TELA DE NETTING',
            'REVERSAO DO X1 NAO RETORNOU SALDO',
            'REVERSAO XI - DOC EM STATUS P',
            'RM GENERADO SIN CORREDOR',
            'USER - ACESSO PARA AVANCAR STATUS',
            'USR - VOUCHAR PENDENTE PARA LIQUIDAR',
            'VALIDACAO INCORRETA DO NETTING',
            'X0 REVERTIDO MAS STATUS PD NAO REVETIDO',
            'X1 COM STATUS INCORRETO',
            'X1 CONTA CONTABIL INCORRETA',
            'X1 GERADO COM ADDRESS BLOQUEADO',
            'X1 GERADO COM VALOR INCORRETO',
            'X1 NAO CONSUMIU AH EM ABERTO',
            'X1 NAO GERADO NA F0911'
        ],
        rules: [{1: 'FINANCE', 2: 'ORIGINATION'}]
    },
    {
        origin: 'NETTING',
        destinations: [
            'AJUSTE SUPERO EL LIMITE MAX PERMITIDO',
            'ANULACION DE RU',
            'ANULACION DE X1 CON ESTADO P',
            'ANULACIÓN DOCUMENTO AJUSTE MINIMO',
            'CAMBIO DE BENEFICIARIO',
            'CAMPO SHBSC.F4201 CON ESPACIO ANTES DEL VALOR',
            'CONTABILIZACION DE LOTE DB/RU',
            'DATOS DE RECIBOS INCORRECTOS EN LA PANTALLA DEL P57A8000',
            'DATOS INCORRECTOS EN LA PANTALLA',
            'DOCUMENTO CON IMPORTE Y STATUS INCORRECTO',
            'DOCUMENTO CON NUMERACION EN EL NETTCID Y SALDO EN ABIERTO',
            'DOCUMENTO PENDIENTE DE FACTURACION',
            'DOCUMENTO SIN CONTABILIZAR',
            'DOCUMENTO SIN CORREDOR',
            'DOCUMENTO SIN POSTEAR EN NETTING',
            'ERROR AL ANULAR – NO CONTABILIZADO',
            'ERROR AL GENERAR SPLIT',
            'ERROR EJECUCION PROCESO DE PAGOS R04570',
            'ERROR EM PERMUTA',
            'ERROR EN NUMERO DE DIRECCION',
            'ERROR YQ718E054',
            'EXISTE GRUPO DE PAGO ARMADO',
            'LIBERACION DE NETTING ID RETENIDO EN PANTALLA',
            'MD - AB BLOQUEADO',
            'MD - AB BLOQUEADO APOCRIFO',
            'MD - AB CON ERROR EN LA DETERMINACION IMPOSITVA',
            'MD - AB CON RETENCION DE FACTURAS',
            'MD - AB CON RETENCION DE PAGOS',
            'MD - AB SIN CONFIGURACION CIA 51240 EN AR',
            'MD - AB SIN CONFIGURACION IMPUESTOS FEDERALES',
            'MD - CONDICION DE IVA DISTINTA ENTRE E1 Y AFIP',
            'MD - CONFIGURACION CALENDARIO DIAS HABILES - P00071',
            'MD - CONFIGURACION CUENTA BANCARIA',
            'MD - CONFIGURACION INSTRUMENTO DE PAGO',
            'MONTO EN ABIERTO ARS-USD NO COINCIDEN',
            'NETTING ESTADO X - MONTO MAYOR',
            'NUMERO DE DIRECCION – NO ES VALIDO',
            'PADRON FISCAL FALTANTE PARA AB-F5570120',
            'PASAR XZ A ESTADO CONFORME',
            'TIPO LETRA FISCAL DISTINTO DOCUMENTO ORIGINAL',
            'UE - DOCUMENTO CONSUMIDO EN TOTALIDAD',
            'UE - DOCUMENTO NO APARECE EN LA PANTALLA DE NETTING',
            'UE - ERROR YQ718E071 POR PAGO NEGATIVO',
            'UE - X1 CON ESTADO X - SOLAMENTE DOCS CC NO RESULTA EN CERO',
            'X1 CON ESTADO X - EJECUCION DEL DRIVER',
            'X1 CON ESTADO X - ERROR LOTE CONTABLE',
            'X1 CON ESTADO X - ERROR Z55LA245: GENERACIÓN FACTURA ESTADO INCORRECTO',
            'X1 CON ESTADO Y',
            'X1 CON ESTADO Y - POR FALLA EN LA FINALIZACION DEL DRIVER',
            'X1 NO SE MUESTRA EN PANTALLA DE NETTING'           
        ],
        rules: [{1: 'ORIGINATION', 2: 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'NETTING',
        destinations: [
            'APB - NETTING WITHOUT FILIAL REGISTER',
            'CADASTRO FILIAL NETTING','INCORRECT VALUE DOC PL',
            'APB - PL OUT OF COMPOSITION OP/P0',
            'STATUS CHANGING',
            'REPORT',
            'REVERSION XD DOCUMENT'
        ],
        rules: [{1: 'PROCUREMENT'}]
    },
    {
        origin: 'NEW TAX AREAS',
        destinations: ['CREACION NUEVA TAX AREA']
    },
    {
        origin: 'NEW TRADES',
        destinations: [
            'COMPONENTS WITH DIVERGENT DATA', 
            'IMPROPER DELETION IN F5560104', 
            'PEDIDO CANCELADO INSERIDO NO NT',
            'SPLIT DE LINHA ATIVO NO JDE'
        ],
        rules: [{2: 'SALES / TRANSPORTATION'}]
    },
    {
        origin: 'NEW TRADES',
        destinations: ['ALTERACOES NAO SOBEM PRO NEW TRADES', 'CADASTRO INCORRETO/FALTA CADASTRO', 'CAK NAO APARECE NO CDP', 'CANCELAMENTO DE TC NAO SUBIU', 'CANCELAMENTO NOTA MES ANTERIOR', 'CBOT INCORRETO', 'CLASSIFICACAO INCORRETA NEW TRADES FUTURO', 'COMPONENTE DOLAR INCORRETO', 'COMPONENTES DUPLICADOS', 'COMPONENTES NAO GERADOS COMP ONLINE', 'CONTRATO DMS COM CBOT INCORRETO', 'CONTRATO INTERFACEADO COM FALTA DE DADOS', 'CONTRATOS DMS SEM FRETE', 'DATA de ENTREGA E REFERENCIA INCORRETOS', 'DATA DE ENTREGA VQ INCORRETA', 'DATA DE EXTRATO INCORRETA', 'DV SEM COMPONENTE', 'ERRO DE CANCELAMENTO DA NOTA', 'ESTORNO DE FIXACAO DUPLICADO', 'ESTORNO FIXACAO NAO SUBIU', 'ESTORNO SLIP PENDENTE NAO INTERFACEDO', 'FATOR DE CONVERSAO MARGEM FILIAL INDEVIDO', 'FIXACAO COM VOLUME POSITIVO', 'FIXACAO INDEVIDA', 'FIXACAO NAO CONSTA NO RELATORIO', 'JOB COM ERRO DE EXECUCAO DE CACHE', 'LINHA RCMER NO NT SEM ESTORNO', 'LINHAS DE COMPONENTES DUPLICADAS', 'MARGENS FILIAIS E COMERCIAIS INCORRETAS', 'MONITORAMENTO PRECO SLIP', 'PEDIDO DE EXPORTACAO COM VALOR BRUTO ZERADO', 'PEDIDO SA NAO CONSTA NO NT', 'PEDIDO SX OU VG SEM LINHA PREMIO', 'PEDIDO VENDA COM VOLUME VCM ALTERADO', 'PEDIDO VENDA NAO SUBIU PARA NT', 'PEDIDO VENDA PRECO DISTORCIDO', 'PREMIOAF SEM INTERFACE', 'REGISTROS ANTIGOS SENDO REENVIADOS INDEVIDAMENTE', 'REVERSAO DE COMPRA NAO SUBIU', 'REVERSAO DE SPLIT DMS COM DATA INCORRETA', 'RVVAT COMO FIXACAO', 'SLIP NAO INTERFACEADO', 'SLIP ORIGEM ANTIGO COM COMPONENTES INCORRETOS', 'SLIP PENDENTE NAO SOBE AO MODELO', 'SLIPS COM STATUS PENDENTE NAO SOBEM AO MODELO CONTABIL', 'SPLIT DE CONTRATO NAO CRIA COMPONENTES', 'SPREAD DE QUALIDADE BCY', 'SUP - AJUSTE INCORRETO', 'SUPPORT - REVERSOES  INDEVIDAS', 'TICKETS FUTUROS - DIVERGENCIA JPMORGAN', 'TICKETS FUTUROS - ERRO DESTINACAO CRUSH', 'TICKETS FUTUROS – INTERFACEADO COM DATA INCORRETA', 'TICKETS FUTUROS COM DADO DE EXPORTACAO INCORRETO', 'TICKETS FUTUROS COM DATA INCORRETA', 'TIPO DE OPERACAO SLIP ALTERACAO INCORRETO', 'REVERSAO INDEVIDA NO RELATORIO', 'VG COM VALOR INCORRETO', 'VOLUME COM ORDEM DE GRANDEZA ERRADA', 'VOLUME DIVERGENTE SLIP E F5543092', 'VOLUME EM CX NO CANCELAMENTO INCORRETO - ENVASADO', 'VOLUME VCM DIVERGENTE JDE E NEW TRADES', 'VOLUMES/VALORES INDEVIDOS NO RELATORIO', 'WD - VQ LINHA CP NAO SUBIU PARA NT'],
        rules: [{2: 'ORIGINATION'}]
    },
    {
        origin: 'NF - CANCEL',
        destinations: [
            'CANCELLATION COMMAND NOT MADE',
            'CANCELLATION IN JDE DOESNT SUCCEED',
            'CANCELLATION IN 605 STATUS',
            'CANCELLATION NOT SENT TO SEFAZ',
            'CANCELLATION OF SIMULATION INVOICE',
            'EXTEMPORANEO',
            'EXTEMPORANEO CANCELLATION',
            'INCORRECT CNPJ IN XML',
            'INVOICE ALREADY ACCOUNTED',
            'INVOICE CANCELLED INCORRECTLY',
            'INVOICE NOT PRINTED',
            'INVOICE NUMBER ZERO',
            'INVOICE WITH CTE NOT CANCELED',
            'NOT RETURN STATUS OF SIGNATURE',
            'REJECTED CANCELLATION',
            'SW - SLOWNESS TO RETURN STATUS',
            'UPDATED STATUS TO 980-999',
            'USER CANCEL NF WITHOUT SEFAZ RETURN',
            'WAD - CANCELLATION IN JDE DOESNT SUCCEED',
            'WRONG BP'
        ]
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
        destinations: [
            'ADDRESS BOOK - HOLD INVOICES',
            'INCORRECT ISSUE DATA INVOICE',
            'INVOICE STOPPED IN STATUS 605',
            'JDE UPDATE',
            'JOB  R5776002 LABRSD100 LOCKED',
            'MASTER DATA - CAT COD 31',
            'MASTER DATA - UDC 55 PY',
            'NF GENERATE WITHOUT ACTION',
            'NF GENERATED WITH 7 DIGITS',
            'OLD ORDERS SX GENERATE NEW INVOICES',
            'OLD TEMPORARY INVOICES',
            'ONLY EXECUTE JOBS GENERATION AND PRINT',
            'ORDER LOCKED C1 C2',
            'ORDER WAS CREATED WRONG',
            'PAYMENT CONDITION',
            'SP - JOB DATA SELECTION',
            'TABLE LOCK',
            'WITHOUT ORDER DETAILS - F76422',
            'XMLS INDEVIDOS NA PASTA DE RETORNO DE AUTORIZAÇÃO'
        ]
    },
    {
        origin: 'NF - INUTILIZE',
        destinations: ['INCORRECT STATUS COMPLEMENTARY INVOICE', 'NOTE GENERATED AS SIMULATED', 'EI - SEFAZ DIDNT RETURN STATUS OF INUTILIZED', 'NOT RETURN STATUS OF INUTILIZE', 'SEQUEL JUMP', 'INUTILIZACAO DE NF SIMULADA', 'USER DIDN T TRY TO INUTILIZE', 'OLD TEMPORARY INVOICE']
    },
    {
        origin: 'NF - REJECTED',
        destinations: [
            '696 – DESTINATARIO ISENTO',
            'ADDRESS BOOK - IE SETUP',
            'CIA FISCAL WRONG IN F7601B',
            'CH - ERROR OF SCHEMA',
            'CHAVE DE ACESSO DUPLICADA',
            'CODE: 529 - CST INCOMPATIBLE IN OPERATION',
            'EI - INVALID CERTIFICATE',
            'EI - RECIPIENTS IE IS NOT ACTIVE IN THE UF',
            'ERROR OF CFOP',
            'ERROR OF NCM',
            'ERROR OF SCHEMA',
            'MASTER DATA - CFOP',
            'MASTER DATA - NCM',
            'MASTERDATA - UDC 55BR ZN',
            'PARAMETRIZATION OF NCM',
            'TAXSET - ICMS ST',
            'UA - WRONG TYPE IE',
            'UF DO EMITENTE DIFERE DA UF DO DESTINATARIO',
            'WITHOUT CBENEF',
            'WRONG ACCESS KEY',
            'XML DA AREA DE DADOS COM CODIFICACAO DIFERENTE DE UTF-8'
        ]
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
        destinations: [
            'ESTRACTA INTEGRATION', 
            'ESTRACTA NÃO RESPONDE',
            'NOTAS NÃO EMITIDAS'
        ],
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
        origin: 'OFFLINE INTERFACE',
        destinations: ['DNS SERVER OUT', 'ERROR TO RECEIVE BLOCKED ADDRESSES', 'FICHA SENT TO PRDSL WITH INCORRECT DATA', 'INTERFACE NOT EXECUTED', 'NO ADMIN RIGHTS PERMISSION', 'NO SUPPORT ACTION', 'ORACLE XE SERVICES DOWN', 'OUTDATED VERSION', 'PROXY CERTIFICATE ADDED', 'RDS_USR ACCOUNT LOCKED', 'REINSTALL INTERFACE', 'RESET TRANSMISSION IN FICHA', 'SYMANTEC CONFIGURATION INCORRECT', 'TIME OUT INTERFACEOFFLINE']
    },
    {
        origin: 'OFFLINE INTERFACE',
        destinations: [
            'Certificado proxy adicionado', 'Configuração da Symantec incorreta', 'Conta bloqueada de usuário no RDS', 'Erro ao receber endereços bloqueados', 'Ficha enviada para PRDSL com dados incorretos', 'Interface não executada', 'Interface Reinstalada', 'Redefinir transmissão na ficha', 'Saída do servidor DNS', 'Sem permissão de direitos de administrador', 'Serviços Oracle XE inativos', 'Tempo limite de interface offline', 'Versão desatualizada'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS (.Net)'}]
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
        origin: 'OOS',
        destinations: ['OUT OF SCOPE'],
        rules: [{1: 'PLANTS & OPERATIONS'}]
    },
    {
        origin: 'OOS',
        destinations: ['ITEM REGISTER', 'MASTER DATA', 'USER PROFILE'],
        rules: [{1: 'PROCUREMENT'}]
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
        destinations: [
            'ADDRESS BOOK - CLIENT REGISTER',
            'ADDRESS BOOK - CONTRAPARTCONTABIL DEAD',
            'APB – INCORRECT VALUES ON Z1',
            'CROP INPUT - OP DIDNT GENERATE AUTOMATICALLY',
            'LOB DOES NOT SEEM AUTOMATIC',
            'MASTER DATA - ADVANCE PRICING',
            'ORDER CREATED INCORRECT',
            'ORDER LOCKED',
            'ORDER NOT RETAINED BY C1 C2',
            'ORDER WITH DIVERGENT ADDRESS',
            'PO PARAMETRIZATION',
            'TAX SYSTEM – PARAMETRO DE FINALIDADE'
        ]
    },
    {
        origin: 'ORDER - DIVERGENT',
        destinations: ['FIELD ILDGL BLANK IN CARDEX', 'ORDER ACCOUNT BUT INCORRECT STATUS', 'ORDER GENERATED WITH DUPLICATED LINES', 'ORDER NOT GENERATED CARDEX', 'CHANGED QUANTITY', 'DELETE ORDER IN CARDEX', 'ORDER CREATED WITH WRONG LINE OF BUSINESS']
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
        origin: 'PÁGINA RDS-WEB',
        destinations: [
            'Link desatualizado',
            'Link indisponível',
            'Planta sem conexão à internet',
            'Problema com navegador'
        ],
        rules: [{1: 'ACESSO AO RDS-WEB', 2: 'RDS WEB'}]
    },
    {
        origin: 'PÁGINA RDS-WEB',
        destinations: [
            'Idioma RDS-WEB incorreto'
        ],
        rules: [{1: 'ACESSO AO RDS-WEB', 2: 'RDS WEB', 3: ['ARGENTINA', 'BOLIVIA']}]
    },
    {
        origin: 'PÁGINA RDS-WEB',
        destinations: [
            'Liberar tela de automação'
        ],
        rules: [{1: 'ACESSO AO RDS-WEB', 2: 'RDS WEB', 3: 'BRAZIL'}]
    },
    {
        origin: 'PASSO DE FICHA',
        destinations: [
            'Alteração de passo',
            'Configurar avanço de passo',
            'Passo incorreto na operação',
            'Usuário instruído no processo',
            'Voltar passo indevido'
        ],
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
        destinations: ['BROKER', 'CANCELACION', 'ESTADO INCORRECTO', 'GENERACION', 'LINEA MERMA', 'NO CALCULA PRECIO FLETE', 'STOCK']
    },
    {
        origin: 'PEDIDO DE EMBARQUE',
        destinations: [
            'Alteração de produto', 'Erro ao inserir exportador', 'Erro de digitação pedido de embarque', 'Erro na remoção de exportador', 'Pedido de embarque com produto errado', 'Produto não cadastrado', 'Programação navio não aparece no pedido de embarque'
        ],
        rules: [{1: 'AGENDAMENTO NAVIO', 2: 'CORPORATE'}]
    },
    {
        origin: 'PEDIDO DE EMBARQUE',
        destinations: [
            'Módulo de agendamento bateladas', 'Ordem do módulo de nomeação incorporado', 'Pedido em branco no módulo de agendamento', 'Produto errado no pedido de embarque'
        ],
        rules: [{1: 'BALANCE', 2: 'CORPORATE'}]
    },
    {
        origin: 'PEDIDO DE EMBARQUE', 
        destinations: [
            'Acionar o vendor', 'Alteração de produto', 'Erro ao inserir exportador', 'Erro na liberação do navio', 'Erro na remoção de exportador', 'Laudo zerado', 'Pedido de embarque com exportador errado', 'Pedido de embarque com produto errado', 'Produto não cadastrado'
        ],
        rules: [{1: 'LAUDO', 2: 'CORPORATE'}]
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
        destinations: [
            'NOTA SAIDA NAO GERADA',
            'PEDIDO CRIADO COM DADOS INCORRETOS'
        ]
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
        origin: 'PEDIDOS DIVERSOS – DEVOLUCAO',
        destinations: [
            'AB - CADASTRO GERAL INVALIDO', 
            'CANCEL NOTA',
            'CODIGO SUSPENSAO C1',
            'CREDIT ROUTINE EXECUTION',
            'INCORRECT BP',
            'INVALID ADDRESS',
            'INVALID INVOICE DATA',
            'INVALID NCM',
            'INVOICE AND ORDER CANCELLATION',
            'MISSING LOAD CONFIRMARTION',
            'SCHEMA ERROR - VALOR - PST NAO E VALIDO',
            'STATUS CHANGE',
            'STATUS CORRECTION',
            'TAX - INCORRECT CFOP',
            'TWO INVOICES FOR THE SAME ORDER'
        ]
    },
    {
        origin: 'PEDIDOS DIVERSOS – TRANSFERÊNCIA',
        destinations: ['CANCEL NOTA', 'INVALID NCM']
    },
    {
        origin: 'PERFIL DE USUÁRIO',
        destinations: [
            'Erro de acesso ao RDS-WEB',
            'Alteração de perfil', 
            'Criação de novo perfil',
            'Desbloqueio de conta',
            'Incluir BP no perfil',
            'Remover BP do perfil'          
        ],
        rules: [{1: 'ACESSO AO RDS-WEB', 2: 'RDS WEB'}]
    },
    {
        origin: 'PERFIL DE USUÁRIO',
        destinations: [
            'Acesso do usuário filial errado',
            'Usuário sem permissão de acesso'
        ],
        rules: [{1: 'ACESSO', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'PERFORMANCE',
        destinations: [
            'Certificado digital vencido', 'Interface RFB parada', 'Lentidão durante o uso do portal ADE', 'Lentidão interface para receita', 'Lentidão para acessar o portal ADE', 'Link indisponível', 'Servidor down', 'Table locked'
        ],
        rules: [{1: 'ADE PORTAL', 2: 'ADE02'}]
    },
    {
        origin: 'PERFORMANCE', 
        destinations: [
            'Informações não migraram', 'Lentidão para geração de relatório', 'Link externo indisponível', 'Link interno indisponível'
        ],
        rules: [{1: 'ADE RECINTOS', 2: 'ADE02'}]
    },
    {
        origin: 'PERFORMANCE', 
        destinations: [
            'Lentidão ao gerar relatório', 'Relatório superior a 1 ano'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'ADE02'}]
    },
    {
        origin: 'PERFORMANCE',
        destinations: [
            'Server full', 'Serviço parado', 'Servidor down' 
        ],
        rules: [{1: 'INTERFACE', 2: 'ADE02'}]
    },
    {
        origin: 'PERFORMANCE',
        destinations: [
            'Banco de dados inativo', 'Base de dados full', 'Deadlock de banco de dados', 'Ficha com erro de digitação', 'Lentidão para geração de relatórios', 'Servidor com disco cheio', 'Servidor down'
        ],
        rules: [{1: 'DATABASE', 2: 'CORPORATE'}]
    },
    {
        origin: 'PERFORMANCE',
        destinations: [
            'Server full', 'Serviço parado', 'Servidor down'
        ],
        rules: [{1: 'INTERFACE', 2: 'CORPORATE'}]
    },
    {
        origin: 'PERFORMANCE', 
        destinations: [
            'Dados não migraram para o central', 'Falha em relatório superior a 1 ano', 'Lentidão para geração do relatório'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'CORPORATE'}]
    },
    {
        origin: 'PERFORMANCE',
        destinations: [
            '"Deadlock" de banco de dados', 'Banco de dados inativo', 'Base de dados full', 'Ficha com erro de digitação', 'Lentidão para geração de relatórios', 'Servidor com disco cheio', 'Servidor down'
        ],
        rules: [{1: 'DATABASE', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'PERMISSÃO DE USUARIO', 
        destinations: [
            'Alteração de perfil', 'Permissão para adição equipamentos', 'Permissão para edição de eventos'
        ],
        rules: [{1: 'ACESSO', 2: 'ADE02'}]
    },
    {
        origin: 'PERMISSÃO DE USUARIO', 
        destinations: [
            'Orientação para permissão de usuário', 'Usuário sem permissão'
        ],
        rules: [{1: 'ACESSO', 2: 'CORPORATE'}]
    },
    {
        origin: 'PENDING LIST',
        destinations: [
            'ERRO NA EXECUÇÃO'
        ],
        rules: [{1: 'ROYALTIES'}]
    },
    {
        origin: 'PENHOR',
        destinations: ['INPUT INCORRETO']
    },
    {
        origin: 'PERFIL IMPOSITIVO',
        destinations: ['CONDICION IVA E1-AFIP', 'CONTROL', 'REVISIÓN DE PERFIL'],
        rules: [{1: 'TAX', 2 : 'JDE ENTERPRISE E1/JDE A9'}]
    },
    {
        origin: 'PESAGEM DE FLUXO',
        destinations: [
            'Acionar o vendor', 'Batelada migrou duplicada', 'Bateladas não estão migrando'
        ],
        rules: [{1: 'AGENDAMENTO NAVIO', 2: 'CORPORATE'}]
    },
    {
        origin: 'PESAGEM DE FLUXO', 
        destinations: [
            'Batelada migrou duplicada', 'Bateladas não estão migrando', 'Usuário orientado a acionar o vendor' 
        ],
        rules: [{1: 'LAUDO', 2: 'CORPORATE'}]
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
        origin: 'PLATAFORMA',
        destinations: [
            'Alteração de descrição de plataforma',
            'Cadastro de plataforma (silo/produto)',
            'Configuração de nova plataforma',
            'Erro de comunicação com plataforma',
            'Plataforma não levanta barreira - erro no serviço de Middleware',
            'Plataforma não levanta barreira - problemas com PLC',
            'Problema físico na leitora',
            'RDS não aciona plataforma'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB', 3: 'ARGENTINA'}]
    },
    {
        origin: 'PORTAL RUMO',
        destinations: ['APPLICATION STOPED'],
        rules: [{1: 'NFE CARGILL', 2: 'BOLTONS', 3: 'BRAZIL'}]
    },
    {
        origin: 'POSICAO DO TITULAR',
        destinations: ['CONTRATOS PAF ADTO LIQUIDADOS APARECENDO INDEVIDAMENTE', 'MODALIDADE INCORRETA', 'SALDO KILOS VOLUME INCORRETO', 'SLIP DUPLICADO']
    },
    {
        origin: 'PRE INDEX',
        destinations: [
            'CNPJ/CFOP NÃO CADASTRADOS',
            'DOC ALREADY INDEXED', 
            'INCLUDE USER EMAIL TO BP',
            'ROBOT DELIVER ISSUES'
        ]
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
        origin: 'PRINT',
        destinations: ['JOB WENT ZOMBIE'],
        rules: [{1: 'PROCUREMENT', 2: 'PROPERTY'}]
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
        origin: 'PROBLEMAS COM CÂMERAS',
        destinations: [
             'Acesso para registro de câmera', 'Câmera inacessível', 'Configuração de equipamentos', 'Evento de câmera não enviado', 'Evento de câmera recusado'
        ],
        rules: [{1: 'CCTV', 2: 'ADE02'}]
    },
    {
        origin: 'PROBLEMAS COM LAYOUT',
        destinations: ['BPS EM CATEGORIA INCORRETA']
    },
    {
        origin: 'PROBLEMAS COM PORTAL ADE', 
        destinations: [
            'Evento não enviado a receita', 'Eventos recusados', 'Portal ADE indisponível', 'Usuário RFB com problemas'
        ],
        rules: [{1: 'ADE PORTAL', 2: 'ADE02'}]
    },
    {
        origin: 'PROCESO CIERRE',
        destinations: ['COBRO CON AJUSTE DE DIFERENCIA MINIMA', 'DIFERENCIAS DE ASOF AR'],
        rules: [{1: 'FINANCE', 2: 'JDE ENTERPRISE E1/JDE A9', 3: 'ARGENTINA'}]
    },
    {
        origin: 'PROCESO CONTABLE - ORIG',
        destinations: [
            'COBROS PENDIENTE CONTABILIZACION - STATUS H',
            'DOCUMENTO DESQUADRADO - PENDIENTE EN F0911',
            'DOCUMENTO POSTADO MANUAL',
            'DOCUMENTO PENDIENTE E1 VS STATUS M',
            'INTEGRIDAD AR – LOTE DB',
            'INTEGRIDAD AR – LOTE IB',
            'INTEGRIDAD AR – LOTE RB',
            'REVERSION INDEBIDA DOC - REPORTE TRANSITO DE ANTECIPOS Y ASOF'
        ],
        rules: [{1: 'FINANCE', 2: 'JDE ENTERPRISE E1/JDE A9', 3: 'ARGENTINA'}]
    },
    {
        origin: 'PROCESO DE PAGO',
        destinations: [
            'DOCUMENTO QUEDA EN #',
            'GRUPO RETENIDO EN LA PANTALLA',
            'NCE DE AÑOS ANTERIORES YA EXISTE',
            'NO HUBO ESTORNO DEL VOUCHER - F0413 RMPAAP <> 0',
            'P55AR020 - NO MUESTRA ERROR CUENTA BANCO CLIENTE',
            'R55PY60 - LISTADO DE PAGO DEL DIA'
        ]
    },
    {
        origin: 'PROCESO DE VOUCHERS',
        destinations: ['CAMBIO DE CUENTA CONTABLE', 'CAMBIO FACTURA', 'CAMBIO INSTRUMENTO DE PAGO', 'MONTO TOTAL Y ABIERTO DISTINTOS']
    },
    {
        origin: 'PROGRAMAÇÃO NAVIO',
        destinations: [
            'Erro na liberação do navio', 'Erro na remoção de exportador', 'Laudo zerado'
        ],
        rules: [{1: 'AGENDAMENTO NAVIO', 2: 'CORPORATE'}]
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
        destinations: ['ERRO RELACIONADO AO HORARIO DE VERAO', 'NAO GEROU QUEBRA NO CARDEX', 'QUEBRA ACUMULADA ZERADA NO BREAK', 'RETIRAR CADASTRO', 'UMIDADE INCORRETA AJUSTES SAIDAS']
    },
    {
        origin: 'QUEBRA TECNICA',
        destinations: ['GERACAO I3 INCORRETA', 'JOB DE QUEBRA TECNICA NAO EXECUTOU', 'LANCAMENTO DE ESTORNO INDEVIDO I3 NA PRIMEIRA QUEBRA', 'VERSAO AGENDADA NAO GERA I3']
    },
    {
        origin: 'R5500004 – REPORT OF ROMANEIO DE CARGA',
        destinations: ['INCORRECT ADJUSTMENT OF AVAILABILITY', 'INCORRECT CREATION OF LOAD TRANSBORDO']
    },
    {
        origin: 'R5549250 - OW X CTMS',
        destinations: ['INCORRECT DATA SELECTION', 'LOAD NAO APARECE NO REPORT']
    },
    {
        origin: 'RDS CAPTURA',
        destinations: [
            'Atualização do certificado',
            'Atualização do RDS captura',
            'Configuração do arquivo "config"',
            'Criar atalho para o RDS captura',
            'Falha de acesso à pasta do RDS captura',
            'Instalação de RDS captura',
            'RDS captura não funciona'
        ],
        rules: [{1: 'AUTOMAÇÃO', 2: 'RDS WEB'}]
    },
    {
        origin: 'RDS INTEGRATION',
        destinations: [
            'Problemas no JOB de Integração', 
            'Problemas no JOB de replicação', 
            'Problemas no PIPE'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS WEB'}]
    },
    {
        origin: 'RDS X CORPORATE', 
        destinations: [
            'Dados discrepantes', 'Erro ao gerar o relatório', 'Ficha alterada não reflete no relatório', 'Lentidão para geração do relatório', 'Relatório em branco'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'CORPORATE'}]
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
        origin: 'RECEPTION',
        destinations: [
            `FZ DIDN'T GENERATE VOUCHER`,
            'GRA - CHANGER ORDER STATUS',
            'INCORRECT RECEPTION',
            'INCORRECT REVERSAL OV NUMBER',
            'INCORRECT TAX RETENTION',
            'MD - MISSING AAI REGISTER',
            'RECEPTION REVERSAL',
            'TOLERANCIA ERROR'
        ]
    },
    {
        origin: "RECIBOS",
        destinations: ['CONTABILIZACION']
    },
    {
        origin: "RECUPERO DE IVA",
        destinations: ['ERROR EN CONTROL CONTRA LIBROS']
    },
    {
        origin: 'REINF',
        destinations: ['ERROR ADDING EVENT', 'ERROR REOPEN BOOK', 'LISENCING']
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
        destinations: [
            'E0 LINHAS NAO EXISTE E E1 COM SALDO ABERTO', 
            'E1 DUPLICADO RELATÓRIO', 
            'NOTA DE E0 NAO APARECE', 
            'NOTA DE E1 NAO APARECE',
            'PESO OH INCORRETO'
        ],
        rules: [{1: 'ARMAZENAGEM'}]
    },
    {
        origin: 'RELATORIO CONTAS A PAGAR',
        destinations: ['CAMPO URDT NAO PREENCHIDO', 'CONTRATO NAO APARECE NO RELATÓRIO', 'DESCONTO INDEVIDO - VALOR PARCIALMENTE FIXADO', 'FETHAB INDEVIDO - VALOR PARCIALMENTE FIXADO', 'VALOR EM ABERTO INDEVIDO', 'VALORES DIF REL DIARIO DE COMPRAS FX REAIS', 'VALORES FUNRURAL INDEVIDO', 'VALORES INDEVIDOS', 'X0 EM ABERTO NAO APARECE EM RELATORI']
    },
    {
        origin: 'RELATORIO CONTRATOS EM ABERTO',
        destinations: ['ALTERACAO DE BP APARECENDO INCORRETAMENTE', 'CONTRATO APARECE INCORRETO - LNIX 0 NA F5543081', 'CONTRATO NAO APARECE NO RELATORIO', 'CONTRATOS COM EXCESSO COM VOLUME NEGATIV', 'LINHA COMP APARECENDO COMO NPE', 'MODAL DESTINACAO INCORRETO', 'NAO APARECE OS COMPONENTES FIXOS', 'QUANTIDADE CANCELADA EM DUPLICIDADE', 'QUANTIDADE INCORRETA NO RELATORIO', 'USR - VOLUME INCORRETO', 'VOL INCORRETO DEVIDO AO DISTINCT']
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
        destinations: ['DADOS TRANSACIONAIS'],
        rules: [{1: ['VENTAS', 'SAP BO']}]
    },
    {
        origin: 'REPORT',
        destinations: ['BANCO DE DADOS'],
        rules: [{1: 'SAP BO', 2: 'SAP BO - REPORTES'}]
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
        origin: 'REPORTE GENERAL',
        destinations: [
            'REPORTE 107OR MERA COMPRA', 
            'REPORTE FCE PAGOS'
        ],
        rules: [{1: 'TAX', 2: 'JDE ENTERPRISE E1/JDE A9'}]
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
        destinations: [
            'CHECK INVALID INVOICES ON MASTERSAF',
            'DELETION OF FUNRURAL INFORMATION',
            'EXCLUDE INVOICES FROM MASTERSAF',
            'EXCLUDE INVOICES FROM TEMPORARY MASTERSAF',
            'EXECUTE SCRIPTS ON PROD',
            'EXTRACT DATA REPORT',
            'EXCLUDE INVENTORY ITENS FROM MASTERSAF',
        ],
        rules: [{1: 'MASTERSAF'}]
    },
    {
        origin: 'REQUEST',
        destinations: ['ALTERACAO DE STATUS OP'],
        rules: [{1: 'OP'}]
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
        destinations: [
            'ALTERACAO DA DATA DE REVERSAO NO CARDEX',
            'FICHA APLICADA SEM CONTRATO',
            'FICHA PARCIALMENTE REVERTIDA',
            'FICHA REVERTIDA SEM REVERTER X0',
            'LINHA DA REVERSAO COM PRECO INCORRETO',
            'REVERSAO PARCIAL NAO DELETA LINHA OG/O9',
            'REVESAO INDEVIDA'
        ],
        rules: [{1: 'FICHA', 2: 'ORIGINATION'}]
    },
    {
        origin: 'REVERSAO',
        destinations: ['QUANTITY NOT VOUCHERED'],
        rules: [{1: 'TRANSPORTATION', 2: 'SALES / TRANSPORTATION', 3: 'BRAZIL'}]
    },  
    {
        origin: 'REVERSAO X0',
        destinations: ['ERRO EXCLUSAO PARCIAL DO ZK']
    },
    {
        origin: 'RI - ACCOUNT',
        destinations: [
            'COA - ACCOUNT CONFIGURATION',
            'DOCUMENT INTERFACED TWO DIFFERENT TIME',
            'MASTER DATA - AAI',
            'ORDER WITH WRONG STATUS',
            'DATE OF LAST MONTH',
            'EXECUTED TAX-LINE AND SALES UPDATE',
            'SUBACCOUNT BLANK OR INVALID',
            'SPECIAL CHARACTER ON RPRYIN IN F03B11'
        ]
    }, 
    {
        origin: 'ROADNET',
        destinations: ['ERRO NA INTERFACE INBOUND E OUTBOUND'],
        rules: [{1: 'TRANSPORTATION'}]
    }, 
    {
        origin: 'RONDA',
        destinations: [
            'Usuário orientado a contactar o time de RONDA'
        ],
        rules: [{1: 'INTERFACE', 2: 'CORPORATE'}]
    }, 
    {
        origin: 'RTDUET',
        destinations: [
            'Usuário orientado a contactar o time de RTDUET'
        ],
        rules: [{1: 'INTERFACE', 2: 'CORPORATE'}]
    }, 
    {
        origin: 'RUMO PAPERLESS / SAVIGENT X RDS',
        destinations: [
            'Certificado proxy adicionado', 'Configuração da Symantec incorreta', 'Conta bloqueada de usuário no RDS', 'Erro ao receber endereços bloqueados', 'Ficha enviada para PRDSL com dados incorretos', 'Interface não executada', 'Interface Reinstalada', 'Redefinir transmissão na ficha', 'Saída do servidor DNS', 'Sem permissão de direitos de administrador', 'Serviços Oracle XE inativos', 'Tempo limite de interface offline', 'Versão desatualizada'
        ],
        rules: [{1: 'INTERFACE', 2: 'RDS (.Net)'}]
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
        destinations: ['DUPLICATE SF ORDER ON JDE', 'MD - CUSTOMER X CIA', 'ORDER INSERTED WITH DATA DIVERGENCE', 'PESO NAO INTERFACEADO']
    },
    {
        origin: 'SALES MAP',
        destinations: ['ORDER WITH WRONG STATUS', 'SU - ORDER WITH INCORRECT STATUS', 'EXTEMPORANEO CANCELLATION', 'INVOICE CANCELLED INCORRECTLY', 'WRONG DATA SELECTION', 'CANCELA GERA NOVA NOTA IMPACTA MV', 'NOTA IS WITH STATUS 607 – 998', 'SIMULATED LOAD AND INVOICE']
    },
    {
        origin: 'SAP - EXPORT',
        destinations: ['BILLING DOESNT HAVE THE INTERFACE', 'INVOICE DOESNT GENERATE', 'MATERIAL WITHOUT LONG DESCRIPTION', 'NF DOESNT HAVE THE INTERFACE', 'PARTNER DOESNT HAVE THE INTERFACE', 'PLANT DOESNT HAVE LINES IN OSGT DE-PARA']
    },
    {
        origin: 'SAP - IMPORT',
        destinations: ['ADD NEW ACCESS GROUP', 'AJUSTAR VIEW DINAMICA CST', 'DUE ARE REGISTERED IN SISCOMEX', 'ERROR TO GENERATE DUE IN SW', 'INCORRECT SELECT ON SINGLE WINDOW', 'NAMESPACE O504X WITH ERRORS', 'FREIGHT DUPLICATED IN CONDITIONS', 'INCORRECT COMPLEMENTARY CFOP', 'INCORRECT ICMS IN NF', 'INCORRECT PLANT IN OSGT', 'INCORRECT TAXES IN INVOICE', 'MATERIAL WITHOUT LONG DESCRIPTION', 'NAMESPACE O302X WITH ERRORS', 'PARTNER DOESNT HAVE THE INTERFACE', 'PLANT DOESNT HAVE LINES IN OSGT DE-PARA', 'ZMIGO WITH INCORRECT SHELF LIFE']
    },
    {
        origin: 'SAP BO - REPORTE',
        destinations: ['REPORT ERROR']
    },
    {
        origin: 'SERVICES',
        destinations: ['INTEGRATOR SERVICE IN HANG STATUS', 'INTEGRATOR SERVICE OFF'],
        rules: [{1: 'ONESOURCE'}]
    },
    {
        origin: 'SERVICES',
        destinations: [
            'ACTIVAR SH', 
            'ANULACION SH', 
            'DESAPLICACION PRESTAMO/FAZON', 
            'ERROR EN TRANSFERENCIA', 
            'ERROR FECHA VTO EN FACTURACION', 
            'FC INDEBIDAS PARA HUMEDAD Y SECADA', 
            'GENERACION FATURADO DUPLICADA SH',
            'GENERACION SH', 
            'GLUCOVIL - SH DUPLICADAS', 
            'NO TRAE LOS PRECIOS DEL PACK DE SERVICIOS', 
            'RETIRO E0 COM ERROR',
            'UBICACION NO ESTA EN ARCH UBIC ARTICULO'
        ],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'SERVICO DE ARMAZENAGEM',
        destinations: [
            'ERRO ASSOCIACAO ITEM BRACH', 
            'HOMOLOGACAO NAO SEGUE FLUXO DE APROVACAO', 
            'VALORES EXIBIDOS RELATORIO INCORRETO'
        ]
    },
    {
        origin: 'SERVIDOR',
        destinations: [
            'Consumo de CPU acima do limite',
            'Consumo de DISCO acima do limite',
            'Consumo de MEMÓRIA acima do limite',
            'Problema com processos do sistema',
            'Problemas com performance'
        ],
        rules: [{1: 'MONITORAMENTO', 2: 'ADE02'}]
    },
    {
        origin: 'SERVIDOR',
        destinations: [
            'Consumo de CPU acima do limite',
            'Consumo de DISCO acima do limite',
            'Consumo de MEMÓRIA acima do limite',
            'Problema com processos do sistema',
            'Problemas com performance'
        ],
        rules: [{1: 'MONITORAMENTO', 2: 'CORPORATE'}]
    },
    {
        origin: 'SERVIDOR',
        destinations: [
            'Consumo de CPU acima do limite',
            'Consumo de DISCO acima do limite',
            'Consumo de MEMÓRIA acima do limite',
            'Problema com processos do sistema',
            'Problemas com performance'
        ],
        rules: [{1: 'MONITORAMENTO', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'SERVIDOR',
        destinations: [
            'Consumo de CPU acima do limite',
            'Consumo de DISCO acima do limite',
            'Consumo de MEMÓRIA acima do limite',
            'Problema com processos do sistema',
            'Problemas com performance'
        ],
        rules: [{1: 'MONITORAMENTO', 2: 'RDS WEB'}]
    },
    {
        origin: 'SERVIDOR DE DADOS/APLICAÇÃO',
        destinations: [
            'Consumo de CPU acima do limite',
            'Consumo de DISCO acima do limite',
            'Consumo de MEMÓRIA acima do limite',
            'Problemas de performance - lentidão ao capturar peso',
            'Problemas de performance - lentidão ao salvar ficha',
            'Problemas de performance - lentidão ao transmitir ficha',
            'Problemas de performance - lentidão generalizada do sistema',
            'Servidor inacessível - problemas com infraestrutura local',
            'Servidor inacessível - problemas com link de dados'
        ],
        rules: [{1: 'SERVIDORES', 2: 'RDS WEB'}]
    },
    {
        origin: 'SERVIDOR DE DADOS/APLICAÇÃO',
        destinations: [
            'Problemas de performance - lentidão ao acionar cancela'
        ],
        rules: [{1: 'SERVIDORES', 2: 'RDS WEB', 3: 'BRAZIL'}]
    },
    {
        origin: 'SERVIDOR DE DADOS/APLICAÇÃO',
        destinations: [
            'Problemas de performance - lentidão ao acionar barreiras'
        ],
        rules: [{1: 'SERVIDORES', 2: 'RDS WEB', 3: ['ARGENTINA', 'BOLIVIA']}]
    },
    {
        origin: 'SERVIDOR DE MIDDLEWARE',
        destinations: [
            'Atualização de certificado de servidor',
            'Erro de comunicação com PLC - erro de configuração de DNS',
            'Erro de comunicação com PLC - erro de mapeamento nos PC',
            'Erro de comunicação com PLC - problema de conexão física',
            'Erro de comunicação com PLC - problemas de rede local',
            'Serviço inativo ou travado - serviço inativo',
            'Serviço inativo ou travado - serviço travado'
        ],
        rules: [{1: 'SERVIDORES', 2: 'RDS WEB'}]
    },
    {
        origin: 'SETTLEMENT/BORRADOR',
        destinations: [
            'ANULAR J7',
            'CAMBIO DE COE DE LIQUIDACION CONTABILIZADA',
            'CANTIDAD INCORRECTA A LIQUIDAR',
            'DOCUMENTO EN ESTADO "4"',
            'ELIMINAR l#',
            'ELIMINAR X0',
            'ERROR CONTADOR KG BORRADOR',
            'ERROR DE BORRADOR',
            'ERROR LIQUIDACION',
            'ERROR LOCALIDAD DE LOS L#',
            'ERROR SELLADO NK EN LIQUIDACION',
            'ERROR YQ718E054 – EN BORRADOR LIQUIDACION',
            'FLETE ANTECIPADO',
            'ID TRABADO EN LA PANTALLA DE BORRADOR',
            'LIQUIDACION CON ERROR DE C.U.I.T. COMPRADOR',
            'MD - CONFIGURACION CALENDARIO',
            'NO AJUSTA BORRADOR',
            'NO ES POSIBLE GERAR LA PROFORMA FINAL',
            'NO GENERA BORRADOR',
            'NO GENERA BORRADOR FALTA FACTURAR SERVICIOS',
            'REGISTROS LIQUIDAÇÃO ESTADO 4 NAO ENVIADOS AO MONITOR',
            'RESERVADO PARA OTRO USER',
            'RETIRAR LÍNEA DE SELLADO (NK) DEL L#',
            'X0 CON DIFERENCIA POR MERMA',
            'X0 NO GENERADO - FALTA FIJACION'
        ],
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
        origin: 'SISTEMA E1 / OPCION FINANCE',
        destinations: ['CONSULTA REFINANCIACION'],
        rules: [{1: 'FINANCE', 2: 'JDE ENTERPRISE E1/JDE A9', 3: 'ARGENTINA'}]
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
        origin: 'SOLICITAÇÃO', 
        destinations: [
            'Registro ade portal' 
        ],
        rules: [{1: 'ADE PORTAL', 2: 'ADE02'}]
    },
    {
        origin: 'SOLICITAÇÃO',
        destinations: [
            'Certificado digital vencido', 'Configuração de equipamentos', 'Instalação de equipamentos', 'Manutenção de equipamentos', 'Substituição de equipamento'
        ],
        rules: [{1: 'CCTV', 2: 'ADE02'}]
    },
    {
        origin: 'SOLICITAÇÃO',
        destinations: [
            'Alteração ou ajuste relatório', 
            'Gerar relatório manual', 
            'Relatório com dados duplicados'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'RDS WEB'}]
    },
    {
        origin: 'SOLICITAÇÃO',
        destinations: [
            'A ficha não é impressa automaticamente', 'Catálogo de endereços registrado incorretamente', 'Dois servidores de dispositivos abertos', 'Erro de aplicação de “Smart Card”', 'Erro na criação de ficha', 'Excluir ficha', 'Modelo de veículo registado incorretamente', 'Motorista incorreto registrado', 'Motorista sem telefone', 'Placa incorreta na criação da ficha', 'Produto incorreto na ficha', 'Registo de condutor bloqueado', 'Sacaria entrada errada adicionada', 'Servidor de dispositivo fechado', 'Tipo de operação errado', 'Unidade de negócios errada'
        ],
        rules: [{1: 'FICHA', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'SOLICITAÇÃO',
        destinations: [
            'Adicionar detalhes do produto', 'Alterar “Smart Card”', 'Alterar gama de produtos', 'Alterar o nome do campo no RDS', 'Ativar tela de medição de balança', 'Exclusão de departamento', 'Exclusão de endereço', 'Histórico do motorista', 'Informações sobre o relatório', 'Lista de cartões inteligentes', 'Lista de nomes de desktop', 'Relatório de ficha para um tipo de operação', 'Relatório de lista de usuários', 'Relatório para auditoria', 'Relatório personalizado', 'Reporte com todos os NF e ficha'
        ],
        rules: [{1: 'RELATÓRIO', 2: 'RDS (.Net)'}]
    },
    {
        origin: 'SOLICITAÇÃO DE ACESSO', 
        destinations: [
            'Criar acesso ao portal ADE RFB', 'Criar acesso ao portal ADE usuário Cargill', 'Permissão edição no portal'  
        ],
        rules: [{1: 'ACESSO', 2: 'ADE02'}]
    },
    {
        origin: 'SOLICITAÇÃO DE ACESSO', 
        destinations: [
            'Criação de acesso', 'Orientação solicitação de acesso', 'Troca de perfil', 'Usuário de processo'  
        ],
        rules: [{1: 'ACESSO', 2: 'CORPORATE'}]
    },
    {
        origin: 'SOLICITACAO DE CREDITO',
        destinations: ['CADASTRO IMOVEL INCORRETO', 'CREDITO APROVADO EM ALCADA INCORRETA', 'ERRO AO TENTAR EXCLUR IMOVEL DE PRODUTOR', 'ERRO DE ACESSO', 'ERRO GERACAO ROTEIRO HOMOLOGACAO', 'OPCOES INVALIDAS NA CHECKLIST', 'ROTEIRO DE APROVACAO NAO CRIADO', 'STATUS DE HOMOLOGACAO INCORRETO', 'VALOR CREDITO/RISCO PROPOSTO INCORRETO']
    },
    {
        origin: 'SOLICITAÇÃO DE DESPACHO DE INSUMOS',
        destinations: ['ANULAÇÃO', 'APB – ERRO DE DISPONIBILIDADE NA TELA COM DEVOLUCAO', 'CAMBIO DE ESTADO'],
        rules: [{1: 'LOGISTICS', 2: 'JDE ENTERPRISE E1/JDE A9', 3: 'ARGENTINA'}]
    },  
    {
        origin: 'SOLICITACAO DE USUARIO',
        destinations: ['USER - PARAMETRIZADO GERACAO DE B0-I3']
    },
    {
        origin: 'SOPORTE CONTABLE',
        destinations: [
            'APLICACIONES Y FIJACIONES FLETES', 
            'APLICACIONES Y FIJACIONES GRANOS', 
            'LIQUIDACIONES GRANOS', 
            'LISTA DE PRECIO',
            'MOVIMIENTOS DETALLADOS STOCK', 
            'REPORTE DE NETTING'
        ],
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
        destinations: [
            'BREAK BY DRY', 
            'ERROR CUT-OFF',
            'GENERACION DE AJUSTE', 
            'PROBLEMA EN LOS DATOS', 
            'SOJA EPA'
        ],
        rules: [{1: 'ORIGINATION'}]
    },
    {
        origin: 'STOCK',
        destinations: ['FECHA INCORRECTA', 'UMIDADE EM BRANCO NO CARDEX', 'STOCK G7 FECHAS'],
        rules: [{1: 'PLANTS & OPERATIONS'}]
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
        origin: 'SYSTEM',
        destinations: [
            'LENTITUD EN JDE A9'
        ],
        rules: [{1: 'TECHNICAL SERVICES'}, {2: 'JDE A9 WS'}]
    },
    {
        origin: 'TAX',
        destinations: ['MISSING SETUP - COD EMPRESA MSAF', 'MSAF MONITORING N6'],
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
        destinations: [
            'CONTROL DE EJECUCIONES',
            'ERROR INTEGRATION CON TAX SYSTEM - A003103'
        ]
    },
    {
        origin: 'TRANSMISIONES DE VENTAS PERCEPCIONES',
        destinations: [
            'ARREGLOS PREVENTIVOS', 
            'CONTROL DE EJECUCIONES',
            'ERROR INTEGRATION CON TAX SYSTEM - A003103'
        ]
    },
    {
        origin: 'TROCA DE TITULARIDADE',
        destinations: ['COMPRA AUTOMATICA']
    },
    {
        origin: 'VALIDACION DOCUMENTOS DE VENTAS',
        destinations: ['ERROR AL FACTURAR', 'ERROR EN CALCULO DE IMPUESTOS']
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
        destinations: ['AAI REGISTER', 'INCORRECT TAX RETENTION', 'STATUS CHANGE', 'VOUCHER REVERSAL'],
        rules: [{1: 'PROCUREMENT'}]
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

module.exports = tier3Connections;