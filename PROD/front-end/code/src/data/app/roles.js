const roles = {};

roles.analyst = {
    allowedAccesses: ['cti tool'],
    defaultAccesses: ['application catalog', 'sla time'],
    accountableRole: ['track leader', 'manager', 'administrator'],
    description: 'Analysts can have access to operacional tools as CTI Tool and Application Catalog, but cannot change their settings. They can be managed by Track Leaders, Managers and Administratores.\nAnalysts can only be part of one team and cannot have their own team.'
};

roles['track leader'] = {
    allowedAccesses: [],
    defaultAccesses: [...roles.analyst.defaultAccesses, roles.analyst.allowedAccesses, 'team manager'],
    accountableRole: ['manager', 'administrator'],
    description: `Track leaders have access to all operacional tools and some of their settings. They can have a team of analysts and manage their account and accesses.
        Only Managers and Administrators can be accountable for Track Leaders.
        * Track Leaders can only access settings that do not affect the tool's processes permanently.`
};

roles.manager = {
    allowedAccesses: [],
    defaultAccesses: [...roles['track leader'].defaultAccesses],
    accountableRole: ['administrator'],
    description: `Managers have access to all operacional tools and some of their settings. Their team can be composed by Track Leaders and Analysts.
        Only Administrators can be accountable for Managers.
        * The settings available for Managers can permanently change the tool's data.`
};

roles.administrator = {
    allowedAccesses: [],
    defaultAccesses: [...roles.manager.defaultAccesses, 'administrator console'],
    accountableRole: ['administrator'],
    description: `Administrators have access to all operacional tools and their settings. Their team can be composed by Managers, Track Leaders and Analysts.
        Administrators do not have an accountable, but some of their actions must be approved by other Administrators.
        * Administrators have access to settings that can permanently change the tools processes and data, as well as user access.`
};

export default roles;