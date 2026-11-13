const breachReasons = [
    {
        name: "Complexity",
        description: {
            en: "The incident is complex or we don't have the knowledge to resolve it. In such cases, we need to document in KEDB.",
            es: "El incidente es complejo o no tenemos el conocimiento para resolverlo (en estos casos se debe documentar en KEDB).",
            pt: "O incidente é complexo ou não temos o conhecimento para resolvê-lo (nestes casos deve-se documentar no KEDB)."
        },
        exception: 'no'
    },
    {
        name: "Cross-Team Collaboration",
        description: {
            en: "The SLA was breached due a delay in the delivery of a task in the Wipro queue.",
            es: "Se violó el SLA debido a un retraso en el servicio de una Tarea para la cola de Wipro.",
            pt: "O SLA foi violado devido a demora no atendimento de uma Task para fila Wipro."
        },
        exception: 'no'
    },
    {
        name: "Incident/Change Timing Misalignment",
        description: {
            en: "The incident was waiting for an SQL or CRQ.",
            es: "El incidente estaba esperando algún SQL o CRQ.",
            pt: "O incidente ficou aguardando algum SQL ou CRQ."
        },
        exception: 'yes'
    },
    {
        name: "Incorrect or Changed Priority",
        description: {
            en: "The original priority was raised resulting in the loss of the SLA.",
            es: "La prioridad original se incrementó y resultó en la pérdida del SLA.",
            pt: "A prioridade original foi aumentada e resultou na perda do SLA."
        },
        exception: 'yes'
    },
    {
        name: "Interface Auto Resolved",
        description: {
            en: "The incident is an interface issue and has been automatically resolved.",
            es: "La incidencia es un problema de interfaz y se ha resuelto automáticamente.",
            pt: "O incidente é um problema de interface e foi resolvido automaticamente."
        },
        exception: 'no'
    },
    {
        name: "Misrouted",
        description: {
            en: "Wipro received the incident with the SLA missed or the routing delay impacted handle time.",
            es: "El incidente llegó a Wipro con el SLA perdido o el retraso en el enrutamiento afectó el tiempo de manejo.",
            pt: "O incidente chegou para Wipro com o SLA perdido ou a demora no direcionamento impactou o tempo de atendimento."
        },
        exception: 'yes'
    },
    {
        name: "Outside Support Hours",
        description: {
            en: "The application is not supported 24 x 7 (only 8 x 5).",
            es: "La aplicación no es compatible 24x7 (solo 8x5).",
            pt: "A aplicação não é suportada 24 x 7 (somente 8 x 5)."
        },
        exception: 'yes'
    },
    {
        name: "Paging Issues",
        description: {
            en: "We don't receive a pager for a Critical or High incident.",
            es: "No hemos recibido un buscapersonas para ningún incidente crítico o alto.",
            pt: "Não recebemos o pager de algum incidente Crítico ou High."
        },
        exception: 'yes'
    },
    {
        name: "Process Non-Compliance",
        description: {
            en: "The resolution process was not followed correctly.",
            es: "No se siguió correctamente el proceso de resolución.",
            pt: "O processo de resolução não foi seguido corretamente."
        },
        exception: 'no'
    },
    {
        name: "Service Desk Delay",
        description: {
            en: "The Service Desk took a long time to send the incident to the Wipro queue.",
            es: "El Service Desk tardó un poco en enviar el incidente a la cola de Wipro.",
            pt: "O Service Desk demorou para enviar o incidente para fila da Wipro."
        },
        exception: 'yes'
    },
    {
        name: "Support Team Resource Issues",
        description: {
            en: "Was not possible to resolve within the SLA due to the high number of incidents.",
            es: "No fue posible resolver dentro del SLA debido a un alto número de incidentes.",
            pt: "Não foi possivel resolver dentro do SLA devido a um alto número de incidentes."
        },
        exception: 'no'
    },
    {
        name: "Underpinning Contract Misalignment",
        description: {
            en: "The resolution needs action from non-Wipro teams.",
            es: "La resolución depende del rendimiento de los equipos que no son Wipro (MasterData, Neogrid, Homine, Trust, Address Book, etc.)",
            pt: "A resolução depende da atuação de equipes que não são Wipro (MasterData, Neogrid, Homine, Trust, Address Book, etc.)"
        },
        exception: 'yes'
    },
    {
        name: "Usupported Technology",
        description: {
            en: "Wipro does not support the application",
            es: "Wipro no admite la aplicación.",
            pt: "A Wipro não suporta a aplicação."
        },
        exception: 'yes'
    },
    {
        name: "User Unavailable for Extended Time",
        description: {
            en: "The user is not available to validate the resolution or to provide further details.",
            es: "El usuario no está disponible para validar la resolución o proporcionar más detalles.",
            pt: "O usuário não está disponível para validar a resolução ou prover mais detalhes."
        },
        exception: 'yes'
    }
    
];

export default breachReasons;