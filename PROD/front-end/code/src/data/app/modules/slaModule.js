const slaModule = {
    name: 'sla time', 
    path: '/sla-time', 
    relativePath: 'sla-time',
    icon: 'sla time',
    isTool: true,
    defaultAccess: true,
    // accessAllowedTo: ['analyst', 'track leader', 'manager', 'administrator'],
    label: {
        en: 'SLA Time',
        es: 'Tiempo de SLA',
        pt: 'Tempo de SLA'
    },
    description: {
        en: 'Check the SLA time for incidents and service requests for each priority',
        es: 'Consulta el tiempo de SLA para incidencias y solicitudes de servicio para cada prioridad',
        pt: 'Confira o tempo de SLA para incidentes e solicitações de serviço para cada prioridade'
    }
    // description: {
    //     en: 'Each priority has your own SLA (Service Level Agreement) time for response and resolution.\nMeet this time limit characterizes the service as successful.',
    //     es: 'Cada prioridad tiene su propio tiempo de SLA (Service Level Agreement) para respuesta y resolución.\nEl cumplimiento de este marco de tiempo caracteriza el servicio como exitoso.',
    //     pt: 'Cada prioridade tem seu próprio tempo de SLA (Service Level Agreement) para resposta e resolução.\nAtender a esse prazo caracteriza o serviço como bem-sucedido.'
    // }
};

export default slaModule;