const roles = require("../roles");

const faq = [
    {
        subject: 'Account Settings',
        question: 'How do I recover my password?',
        answer: `Go to 'Forgot your password?' on the login screen and enter your email or ID. Your accountables will be notified and will be able to generate a link that allows you to reset your password.\n
            *This is a temporary process while AMS Tools is not enabled to send emails.`,
        keywords: ['account', 'reset', 'forgot', 'recovery', 'password']
    },
    {
        subject: 'Account Settings',
        question: 'What are the types of users (roles)?',
        answer: `There are four types of users in AMS Tools:\n
            Analyst
            ${roles.analyst.description}\n
            Track Leader
            ${roles['track leader'].description}\n
            Manager
            ${roles.manager.description}\n
            Administrator
            ${roles.administrator.description}\n`,
        keywords: ['account', 'user', 'users', 'role', 'type', 'track', 'leader', 'analyst', 'manager', 'administrator', 'roles']
    },
    {
        subject: 'Account Settings',
        question: 'Where do I check my requests?',
        answer: `You can view your requests in the 'Requests' section in your account settings.`,
        keywords: ['account', 'request', 'requests']
    },
    {
        subject: 'Account Settings',
        question: 'How to add, remove or replace an accountable?',
        answer: `You can manage your accountables by accessing the 'Accountables' option in your account settings.`,
        keywords: ['account', 'add', 'remove', 'replace', 'accountable']
    },
    {
        subject: 'Account Settings',
        question: `I can't remove an accountable.`,
        answer: 'The removal option will only be available if you have more than one direct accountable.',
        keywords: ['account', 'remove', 'accountable']
    },
    {
        subject: 'Account Settings',
        question: 'What is the difference between a direct and an indirect accountable?',
        answer: `The direct accountables for a user are the people who manages it within AMS Tools. They can share access, respond to requests and has access to your information.
            The indirect accountables are the people who manages the user's direct accountables. They main function is to help the direct accountables to manage their team, approving requests and granting or removing access. They cannot provide other accesses that the direct accountables of the members do not have.`,
        keywords: ['account', 'direct', 'indirect', 'accountable']
    },
    {
        subject: 'Account Settings',
        question: `I can't find the accountable I want to add.`,
        answer: `If you can't find the accountable you want to add, check that he is not already one of your indirect accountables. Also remember that there is a hierarchy of users within the team (Administrator -> Manager -> Track Leader -> Analyst) and the accountable options will vary according to your type of user.`,
        keywords: ['account', 'add', 'accountable']
    },
    {
        subject: 'Account Settings',
        question: 'How do I request access to a tool?',
        answer: `Go to the 'Tools' option in your account settings to request access to a tool. The available options will vary according to the access of your accountables.`,
        keywords: ['account', 'request', 'access', 'tool', 'tools']
    },
    {
        subject: 'Account Settings',
        question: 'How do I change my user type?',
        answer: 'It is currently not possible to change user type. We are working to implement this feature.',
        keywords: ['account', 'user', 'type', 'role', 'change']
    },
    {
        subject: 'Application Catalog',
        question: 'How do I add an application to the catalog?',
        answer: `At the moment, we have not yet implemented the interface for creating or editing applications in the catalog. Please contact us at _grimm@crgl-thirdparty.com if you need to create or edit an application.`,
        keywords: ['add', 'edit', 'application', 'catalog']
    },
    {
        subject: 'CTI Tool',
        question: 'How do I request access to an application?',
        answer: `Go to the 'Applications' option in your account settings to request access to an application (the option is only available if you have access to the CTI Tool). The available options will vary according to the access of your accountables.`,
        keywords: ['cti', 'application', 'access', 'request']
    },
    {
        subject: 'CTI Tool',
        question: 'What is the difference between requesting access to an application and a support group?',
        answer: `A support group can hold one or more applications. Therefore, when requesting access to a support group you will be requesting access to all of its applications.`,
        keywords: ['cti', 'application', 'access', 'support group', 'request']
    },
    {
        subject: 'CTI Tool',
        question: `I can't find the application or support group I need to request access.`,
        answer: `Application options and support groups are taken from the application catalog. If you are not finding the option you need, check if the application exists in the catalogue. Also remember that the options available depend on the access of your accountables.`,
        keywords: ['cti', 'application', 'access', 'support group', 'request']
    },
    {
        subject: 'CTI Tool',
        question: `I can't find the application I need when I'm creating a resolution.`,
        answer: `You can only create resolutions for applications that you have access to. You can check your access on the CTI Tool home screen or by accessing your account settings.`,
        keywords: ['cti', 'application', 'resolution', 'create', 'creating']
    },
    {
        subject: 'CTI Tool',
        question: 'How do I create a new tier?',
        answer: `At the moment, we have not yet implemented the interface for creating or editing tiers. Please contact us at dereck_grimm@crgl-thirdparty.com if you need to create or edit a tier.`,
        keywords: ['cti', 'tier', 'tiers', 'new', 'edit', 'create', 'delete']
    },
    {
        subject: 'CTI Tool',
        question: 'How do I link a PBI or KBA to a set of tiers?',
        answer: `At the moment, we have not yet implemented the interface for creating or editing PBIs and KBAs. Please contact us at dereck_grimm@crgl-thirdparty.com if you need to create or edit a PBI or KBA.`,
        keywords: ['cti', 'pbi', 'kba', 'new', 'edit', 'create', 'delete']
    },
    {
        subject: 'CTI Tool',
        question: 'How do I edit a resolution?',
        answer: `You can only edit resolutions created for applications that you have access to. To do this, search for the resolution and access the 'edit' option above your information.`,
        keywords: ['cti', 'edit', 'resolution']
    },
    {
        subject: 'CTI Tool',
        question: 'How do I delete a resolution?',
        answer: `You can only delete resolutions created for applications that you have access to. To do this, search for the resolution and access the 'edit' option above your information. When the form appears, you will see the delete option next to the save option. This feature is not available for analyst type users.`,
        keywords: ['cti', 'delete', 'resolution']
    },
    {
        subject: 'SLA Time',
        question: 'I found an error with the SLA data. How do I fix it?',
        answer: `At the moment, we have not yet implemented the interface for editing SLA data. Please contact us at dereck_grimm@crgl-thirdparty.com if you find an error in the data so we can fix it.`,
        keywords: ['sla', 'error', 'wrong', 'change', 'data']
    },
    {
        subject: 'Team Manager',
        question: 'How do I add a member to my team?',
        answer: `To add a member to your team, go to 'Manage Team' and click on 'Add member'. New member options will vary depending on your user type.`,
        keywords: ['manager', 'new', 'add', 'member', 'team', 'user']
    },
    {
        subject: 'Team Manager',
        question: 'How do I remove a member from my team?',
        answer: `To remove a member from your team, go to the member's settings and choose the 'Remove member' option. Keep in mind that there are certain conditions where removal is not possible and in these cases the reason will be shown.`,
        keywords: ['manager', 'remove', 'delete', 'user', 'member', 'team']
    },
    {
        subject: 'Team Manager',
        question: 'What is the difference between a direct and an indirect member?',
        answer: `The direct members of your team are all those who have you as their direct accountable. You can only share your access with your direct members.
            The indirect members of your team are all those who not have you as their direct accountable. If a direct member of yours has a team, all members of that team will be your indirect members.
            Indirect members are connected with their direct accountable, and therefore do not share access with you and cannot be removed from the team. They will only be removed if their directly accountable is removed.`,
        keywords: ['team', 'manager', 'direct', 'indirect', 'member']
    },
];

module.exports = faq;