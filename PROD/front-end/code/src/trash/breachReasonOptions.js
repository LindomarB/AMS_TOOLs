const breachReasonOptions = {
    pt: [
        {
            value: "Complexity",
            description: "O incidente é complexo ou não temos o conhecimento para resolvê-lo (nestes casos deve-se documentar no KEDB)."
        },
        {
            value: "Cross-Team Collaboration",
            description: "O SLA foi violado devido a demora no atendimento de uma Task para fila Wipro."
        },
        {
            value: "Incident/Change Timing Misalignment",
            description: "O incidente ficou aguardando algum SQL ou CRQ."
        },
        {
            value: "Incorrect or Changed Priority",
            description: "A prioridade original foi aumentada e resultou na perda do SLA."
        },
        {
            value: "Interface Auto Resolved",
            description: "O incidente é um problema de interface e foi resolvido automaticamente."
        },
        {
            value: "Misrouted",
            description: "O incidente chegou para Wipro com o SLA perdido ou a demora no direcionamento impactou o tempo de atendimento."
        },
        {
            value: "Outside Support Hours",
            description: "A aplicação não é suportada 24 x 7 (somente 8 x 5)."
        },
        {
            value: "Paging Issues",
            description: "Não recebemos o pager de algum incidente Crítico ou High."
        },
        {
            value: "Process Non-Compliance",
            description: "O processo de resolução não foi seguido corretamente."
        },
        {
            value: "Service Desk Delay",
            description: "O Service Desk demorou para enviar o incidente para fila da Wipro."
        },
        {
            value: "Support Team Resource Issues",
            description: "Não foi possivel resolver dentro do SLA devido a um alto número de incidentes."
        },
        {
            value: "Underpinning Contract Misalignment",
            description: "A resolução depende da atuação de equipes que não são Wipro (MasterData, Neogrid, Homine, Trust, Address Book, etc.)"
        },
        {
            value: "Usupported Technology",
            description: "A Wipro não suporta a aplicação."
        },
        {
            value: "User Unavailable for Extended Time",
            description: "O usuário não está disponível para validar a resolução ou prover mais detalhes."
        }
        
    ],

    en: [
        {
            value: "Complexity",
            description: "The incident is complex or we don't have the knowledge to resolve it. In such cases, we need to document in KEDB."
        },
        {
            value: "Cross-Team Collaboration",
            description: "The SLA was breached due a delay in the delivery of a task in the Wipro queue."
        },
        {
            value: "Incident/Change Timing Misalignment",
            description: "The incident was waiting for an SQL or CRQ."
        },
        {
            value: "Incorrect or Changed Priority",
            description: "The original priority was raised resulting in the loss of the SLA."
        },
        {
            value: "Interface Auto Resolved",
            description: "The incident is an interface issue and has been automatically resolved."
        },
        {
            value: "Misrouted",
            description: "Wipro received the incident with the SLA missed or the routing delay impacted handle time."
        },
        {
            value: "Outside Support Hours",
            description: "The application is not supported 24 x 7 (only 8 x 5)."
        },
        {
            value: "Paging Issues",
            description: "We don't receive a pager for a Critical or High incident."
        },
        {
            value: "Process Non-Compliance",
            description: "The resolution process was not followed correctly."
        },
        {
            value: "Service Desk Delay",
            description: "The Service Desk took a long time to send the incident to the Wipro queue."
        },
        {
            value: "Support Team Resource Issues",
            description: "Was not possible to resolve within the SLA due to the high number of incidents."
        },
        {
            value: "Underpinning Contract Misalignment",
            description: "The resolution needs action from non-Wipro teams."
        },
        {
            value: "Usupported Technology",
            description: "Wipro does not support the application"
        },
        {
            value: "User Unavailable for Extended Time",
            description: "The user is not available to validate the resolution or to provide further details."
        }
    ],

    es: [
        {
            value: "Complexity",
            description: "El incidente es complejo o no tenemos el conocimiento para resolverlo (en estos casos se debe documentar en KEDB)."
        },
        {
            value: "Cross-Team Collaboration",
            description: "Se violó el SLA debido a un retraso en el servicio de una Tarea para la cola de Wipro."
        },
        {
            value: "Incident/Change Timing Misalignment",
            description: "El incidente estaba esperando algún SQL o CRQ."
        },
        {
            value: "Incorrect or Changed Priority",
            description: "La prioridad original se incrementó y resultó en la pérdida del SLA."
        },
        {
            value: "Interface Auto Resolved",
            description: "La incidencia es un problema de interfaz y se ha resuelto automáticamente."
        },
        {
            value: "Misrouted",
            description: "El incidente llegó a Wipro con el SLA perdido o el retraso en el enrutamiento afectó el tiempo de manejo."
        },
        {
            value: "Outside Support Hours",
            description: "La aplicación no es compatible 24x7 (solo 8x5)."
        },
        {
            value: "Paging Issues",
            description: "No hemos recibido un buscapersonas para ningún incidente crítico o alto."
        },
        {
            value: "Process Non-Compliance",
            description: "No se siguió correctamente el proceso de resolución."
        },
        {
            value: "Service Desk Delay",
            description: "El Service Desk tardó un poco en enviar el incidente a la cola de Wipro."
        },
        {
            value: "Support Team Resource Issues",
            description: "No fue posible resolver dentro del SLA debido a un alto número de incidentes."
        },
        {
            value: "Underpinning Contract Misalignment",
            description: "La resolución depende del rendimiento de los equipos que no son Wipro (MasterData, Neogrid, Homine, Trust, Address Book, etc.)"
        },
        {
            value: "Usupported Technology",
            description: "Wipro no admite la aplicación."
        },
        {
            value: "User Unavailable for Extended Time",
            description: "El usuario no está disponible para validar la resolución o proporcionar más detalles."
        }
    ]
}

export default breachReasonOptions;