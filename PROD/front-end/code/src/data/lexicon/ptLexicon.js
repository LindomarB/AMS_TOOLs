const ptLexicon = {
    // back: "Voltar",
    copied: "Copiado",
    copy: "Copiar",
    country: "País",
    critical: "Crítica",
    date: "Data",
    extended: "Estendida",
    // finish: "Concluir",
    high: "Alta",
    hours: "horas",
    incidentSla: "SLA de Incidente",
    low: "Baixa",
    medium: "Média",
    minutes: "minutos",
    // next: "Próximo",
    no: "Não",
    optional: "opcional",
    priority: "Prioridade",
    progress: "Progresso",
    // reset: "Reiniciar",
    resolution: "Resolução",
    response: "Resposta",
    serviceRequestSla: "SLA de Service Request",
    yes: "Sim",
    routes: {
        home: {
            bannerTitle: 'Bem-Vindo ao',
            bannerText: 'O centro de informações do suporte.',
            welcome: "Bem-Vindo ao CTI Tool",
            introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla nulla enim sit vulputate id sit mi imperdiet. Nec velit tellus integer nulla nunc, volutpat neque. Viverra purus elit lacus, nisl. Convallis nulla arcu, odio quisque interdum nunc, suspendisse diam. Use the side menu to:",
            categorizationDesc: "Criar uma categorização para um incidente",
            nonResponseEmailDesc: "Criar um e-mail de \"Sem-Resposta\"",
            supportedApplicationsDesc: "Consultar as aplicações suportadas pela Wipro",
            slaInfoDesc: "Ver o SLA de resposta e resolução"
        }
    },
    theme: {
        about: {
            designerDeveloper: "Designer and Desenvolvedor",
            developedBy: "Desenvolvido por",
            projectManager: "Gerente de Projeto",
            rights: "Todos os Direitos Reservados",
            version: "Versão"
        },
        ctiTool: {
            bannerTitle: 'CTI Tool',
            bannerText: 'Categorize as resoluções de seus incidentes'
        },
        categorization: {
            breachReason: {
                description: "Forneça os detalhes sobre a perda do SLA",
                slaLost: "O SLA foi perdido?",
                breachWasWiproFault: "Foi culpa da Wipro?",
                breachReason: "Qual foi a razão?"
            },
            classification: {
                title: "Classificação",
                description: "Classifique o incidente utilizando a opção que melhor se adeque",
                inputLabel: "Como o incidente é classificado?"          
            },
            incidentInfo: {
                title: "Informações do Incidente",
                description: "Forneça as informações sobre o incidente resolvido",
                supportGroup: 'Grupo de suporte',
                supportGroupPlaceholder: 'Selecione o grupo de suporte da aplicação',
                application: 'Aplicação',
                applicationPlaceholder: 'Selecione o nome da aplicação',
                incident: "Incidente",
                incidentPlaceholder: "Número do Incidente (ex: INC000123456789)",
                countryPlaceholder: "Selecione o país do incidente",
                priorityPlaceholder: "Selecione a prioridade do incidente",
                pbiPlaceholder: "Número do PBI (ex: KBA000123456789)",
                kbaPlaceholder: "Número do KBA (ex: KBA000123456789)"
            },
            tiers: {
                description: "Categorize o incidente usando os tiers a seguir"
            },
            problem: {
                title: "Problema",
                description: "Descreva o problema detalhadamente",
                problem: "Qual foi o problema?",
                problemPlaceholder: "Forneça os detalhes do problema...",
                diagnosisMatchProblem: 'O diagnóstico corresponde com o problema reportado pelo usuário?',
                isReopening: "O incidente foi reaberto?",
                reopeningReason: "Por que o incidente foi reaberto?",
                reopeningReasonPlaceholder: "Forneça o motivo da reabertura...",
                rr01: 'Solução validada pelo usuário incorretamente',
                rr02: 'Usuário aumentou o escopo',
                rr03: 'O usuário aplicou incorretamente a solução',
                rr04: 'Reaberto após a confirmação do usuário',
                rr05: 'O usuário reabriu com perguntas',
                rr06: 'Reaberto pelo usuário solicitando o número do PBI',
                rr07: 'Reaberto pelo usuário para requisição do RCA',
                rr08: 'Resolvido através de "User Not Available Process" e "User Reopened"',
                rr09: 'Erro de processo do usuário',
                rr10: 'O analista reabriu o incidente para recuperar o SLA',
                rr11: 'Erro de procedimento do analista',
                rr12: 'Reaberto pelo suporte para corrigir a classificação do ticket',
                rr13: 'Solução aplicada para um escopo parcial',
                rr14: 'A solução proposta não foi eficaz',
                rr15: 'O usuário concordou em rebaixar a prioridade, mas o time de MI reabriu para aumenta-la',
            },
            solution: {
                title: "Solução",
                description: "Descreva a solução aplicada e os detalhes sobre o código SQL utilizado",
                solution: "Qual foi a solução?",
                solutionPlaceholder: "Forneça a solução...",
                usedSql: "Foi utilizado SQL na solução?",
                sqlCode: "Forneça o código SQL utilizado"
            },
            resolution: {
                title: "Resolução",
                // description: "Copie o texto abaixo e cole no campo 'Resolução' do incidente no Helix",
                description: 'Revise sua resolução antes de salvá-la',
                supportGroup: 'Grupo de suporte',
                application: 'Aplicação',
                incident: "Incidente",
                priority: "Prioridade",
                critical: "Crítica",
                extended: "Estendida",
                high: "Alta",
                low: "Baixa",
                medium: "Média",
                classification: "Classificação",
                country: "País",
                incClassification: "Classificação do INC",
                pbi: "PBI",
                kba: "KBA",
                tier1: "Tier 1",
                tier2: "Tier 2",
                tier3: "Tier 3",
                tier4: "Tier 4",
                tier5: "Tier 5",
                problem: "Problema",
                diagnosisMatchProblem: 'Diagnóstico corresponde com o problema',
                isReopening: "Reabertura",
                reopeningReason: "Motivo da Reabertura",
                solution: "Solução",
                usedSql: "Utilizado SQL",
                sqlCode: 'Código SQL',
                slaLost: "SLA perdido",
                breachWasWiproFault: "Culpa da Wipro",
                breachReason: "Breach Reason",
                generatedDate: "Texto gerado por CTI Tool em"
            }
        },
        form: {
            resetConfirmation: "Você realmente deseja iniciar uma nova categorização?"
        },
        navbar: {
            manageTeam: 'Gerenciar Time',
            tierTree: 'Árvore de Tiers',
            wipro: 'Wipro',
            expandMenu: 'Expandir Menu',
            collapseMenu: 'Recolher Menu',
        }  
    }
}

export default ptLexicon;


