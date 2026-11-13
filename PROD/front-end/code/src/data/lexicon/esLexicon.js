const esLexicon = {
    // back: "Regresar",
    copied: "Copiado",
    copy: "Copiar",
    country: "País",
    critical: "Crítica",
    date: "Fecha",
    extended: "Extendida",
    // finish: "Concluir",
    high: "Alta",
    hours: "horas",
    incidentSla: "SLA de Incidente",
    low: "Baja",
    medium: "Media",
    minutes: "minutos",
    // next: "Siguiente",
    no: "No",
    optional: "opcional",
    priority: "Prioridad",
    progress: "Progreso",
    // reset: "Reiniciar",
    resolution: "Resolución",
    response: "Respuesta",
    serviceRequestSla: "SLA de Service Request",
    yes: "Sí",
    routes: {
        home: {
            bannerTitle: 'Bienvenido al',
            bannerText: 'El centro de información de soporte.',
            welcome: "Bienvenido al CTI Tool",
            introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla nulla enim sit vulputate id sit mi imperdiet. Nec velit tellus integer nulla nunc, volutpat neque. Viverra purus elit lacus, nisl. Convallis nulla arcu, odio quisque interdum nunc, suspendisse diam. Use the side menu to:",
            categorizationDesc: "Crear una categorización para un incidente",
            nonResponseEmailDesc: "Crear un e-mail de \"Sin respuesta\"",
            supportedApplicationsDesc: "Consulta las aplicaciones soportadas por Wipro",
            slaInfoDesc: "Ver SLA de respuesta y resolución"
        }
    },
    theme: {
        about: {
            designerDeveloper: "Designer y Desarrollador",
            developedBy: "Desarrollado por",
            projectManager: "Gerente de Proyecto",
            rights: "Reservados Todos los Derechos",
            version: "Versión"
        },
        ctiTool: {
            bannerTitle: 'CTI Tool',
            bannerText: 'Categorice sus resoluciones de incidentes'
        },
        categorization: {
            breachReason: {
                description: "Proporcione los detalles sobre la pérdida de SLA",
                slaLost: "¿SLA se perdió?",
                breachWasWiproFault: "¿Fue culpa de Wipro?",
                breachReason: "¿Cuál es la razón?"
            },
            classification: {
                title: "Clasificación",
                description: "Clasifica la incidencia utilizando la opción que más te convenga",
                inputLabel: "¿Cómo se clasifica el incidente?"            
            },
            incidentInfo: {
                title: "Informacion del Incidente",
                description: "Proporcionar la información sobre la incidencia resuelta",
                supportGroup: 'Grupo de apoyo',
                supportGroupPlaceholder: 'Seleccione el grupo de soporte de la aplicación',
                application: 'Aplicación',
                applicationPlaceholder: 'Seleccione el nombre de la aplicación',
                incident: "Incidente",
                incidentPlaceholder: "Número de incidente (ex: INC000123456789)",
                countryPlaceholder: "Seleccione el país del incidente",
                priorityPlaceholder: "Seleccione la prioridad del incidente",
                pbiPlaceholder: "Número de PBI (ex: KBA000123456789)",
                kbaPlaceholder: "Número de KBA (ex: KBA000123456789)",
            },
            tiers: {
                description: "Categorizar el incidente usando los siguientes tiers"
            },
            problem: {
                title: "Problema",
                description: "Describa el problema en detalle",
                problem: "¿Cuál es el problema?",
                problemPlaceholder: "Proporcione los detalles del problema...",
                diagnosisMatchProblem: '¿Coincide el diagnóstico con el problema informado por el usuario?',
                isReopening: "¿Se ha reabierto el incidente?",
                reopeningReason: "¿Por qué se reabrió el incidente?",
                reopeningReasonPlaceholder: "Indique el motivo de la reapertura...",
                rr01: 'User Validated Solution Incorrectly',
                rr02: 'User increased the scope',
                rr03: 'User applied incorrectly solution proposed',
                rr04: 'Reopened after OK from user',
                rr05: 'User Reopened with questions',
                rr06: 'Reopen by user requesting PBI number',
                rr07: 'Reopened by user to request RCA',
                rr08: 'Resolved through User Not Available Process and User Reopened',
                rr09: 'User Process Error',
                rr10: 'Analyst reopened incident to recover SLA',
                rr11: 'Analyst wrong Procedure',
                rr12: 'Reopened by Support to fix Ticket Classification',
                rr13: 'Solution applied for partial scope',
                rr14: 'Solution proposed not effective',
                rr15: 'User agreed to Downgrade Priority but MI team reopen to increase priority',
            },
            resolution: {
                title: "Resolución",
                // description: "Copie el texto a continuación y péguelo en el campo 'Resolución' del incidente en Helix",
                description: 'Revisa tu resolución antes de guardarla',
                supportGroup: 'Grupo de apoyo',
                application: 'Aplicación',
                incident: "Incidente",
                priority: "Prioridad",
                critical: "Crítica",
                extended: "Extendida",
                high: "Alta",
                low: "Baja",
                medium: "Media",
                classification: "Clasificación",
                country: "País",
                incClassification: "Clasificación de INC",
                pbi: "PBI",
                kba: "KBA",
                tier1: "Tier 1",
                tier2: "Tier 2",
                tier3: "Tier 3",
                tier4: "Tier 4",
                tier5: "Tier 5",
                problem: "Problema",
                diagnosisMatchProblem: 'El diagnóstico coincide con el problema',
                isReopening: "Reapertura",
                reopeningReason: "Motivo de la Reapertura",
                solution: "Solución",
                usedSql: "Se usó SQL",
                sqlCode: 'Código SQL',
                slaLost: "SLA perdió",
                breachWasWiproFault: "Culpa de Wipro",
                breachReason: "Breach Reason",
                generatedDate: "Texto generado por CTI Tool en"
            },
            solution: {
                title: "Solución",
                description: "Describir la solución aplicada y detalles sobre el código SQL utilizado",
                solution: "¿Cuál fue la solución?",
                solutionPlaceholder: "Proporcione la solución...",
                usedSql: "¿Se usó SQL en la solución?",
                sqlCode: "Proporcione el código SQL utilizado"
            }
        },
        form: {
            resetConfirmation: "¿De verdad quieres empezar una nueva categorización?"
        },
        navbar: {
            manageTeam: 'Gestionar Equipo',
            tierTree: 'Árbol de Tiers',
            wipro: 'Wipro',
            expandMenu: 'Expandir Menú',
            collapseMenu: 'Colapsar Menú',
        }  
    }
}

export default esLexicon;
