const roles = {};

roles.analyst = {
    allowedAccesses: ['cti tool'],
    defaultAccesses: ['application catalog', 'sla time'],
    accountableRoles: ['track leader', 'manager', 'administrator'],
    description: `Analysts can have access to operacional tools such as CTI Tool and Application Catalog, but cannot change their settings.
        They can be managed by Track Leaders, Managers and Administratores.\n
        Analysts can only be part of one team and cannot have their own team.`
};

roles['track leader'] = {
    allowedAccesses: [],
    defaultAccesses: [...roles.analyst.defaultAccesses, ...roles.analyst.allowedAccesses, 'team manager'],
    accountableRoles: ['manager', 'administrator'],
    description: `Track leaders have access to all operacional tools and some of their settings.\n
        They can have a team of analysts and manage their account. Only Managers and Administrators can be accountable for Track Leaders.`
};

roles.manager = {
    allowedAccesses: [],
    defaultAccesses: [...roles['track leader'].defaultAccesses],
    accountableRoles: ['administrator'],
    description: `Managers have access to all operacional tools and most of their settings.\n
        Their team can be composed by Track Leaders and Analysts. Only Administrators can be accountable for Managers.`
};

roles.administrator = {
    allowedAccesses: [],
    defaultAccesses: [...roles.manager.defaultAccesses],
    accountableRoles: [],
    description: `Administrators have access to all operacional tools and all their settings.\n
        Their team can be composed by Managers, Track Leaders and Analysts. Administrators do not have an accountable, but some of their actions must be approved by other Administrators.`
};

module.exports = roles;