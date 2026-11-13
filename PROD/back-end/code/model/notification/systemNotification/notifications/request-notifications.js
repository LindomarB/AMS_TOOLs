const requestNotifications = {
    'request-new-tool': ({requester, access}) => ({
        type: 'request',
        badge: 'tools',
        title: {
            en: 'New Team Request'
        },
        text: {
            en: `${requester} is requesting access to ${access}.`
        }
    }),
    'request-new-cti application permission': ({requester, application}) => ({
        type: 'request',
        badge: 'cti tool',
        title: {
            en: 'New Team Request'
        },
        text: {
            en: `${requester} is requesting permission to create resolutions for ${application.name || application}.`
        }
    }),
    'request-new-cti support group access': ({requester, supportGroup}) => ({
        type: 'request',
        badge: 'cti tool',
        title: {
            en: 'New Team Request'
        },
        text: {
            en: `${requester} is requesting permission to create resolutions for all ${supportGroup.name || supportGroup} applications.`
        }
    }),
    'request-new-new accountable': ({requester}) => ({
        type: 'request',
        badge: 'new accountable',
        title: {
            en: 'New Accountable Request'
        },
        text: {
            en: `${requester} is requesting you as new accountable.`
        }
    }),
    'request-new-accountable change': ({requester, newAccountable}) => ({
        type: 'request',
        badge: 'accountable change',
        title: {
            en: 'New Team Request'
        },
        text: {
            en: `${requester} is requesting change of accountable to ${newAccountable.name || newAccountable}.`
        }
    }),
    'request-new-accountable removal': ({requester}) => ({
        type: 'request',
        badge: 'accountable removal',
        title: {
            en: 'New Team Request'
        },
        text: {
            en: `${requester} is requesting your removal as accountable.`
        }
    }),
    'request-new-role change': ({requester, newRole}) => ({
        type: 'request',
        badge: 'role change',
        title: {
            en: 'New Team Request'
        },
        text: {
            en: `${requester} is requesting change of role to ${newRole}.`
        }
    }),
    'request-new-account': ({requester}) => ({
        type: 'request',
        badge: 'new account',
        title: {
            en: 'New Account Request'
        },
        text: {
            en: `${requester} is requesting an account in AMS Tools.`
        }
    }),
    'request-cancel': ({requester, type}) => ({
        type: 'request',
        badge: 'canceled',
        title: {
            en: 'Canceled Request'
        },
        text: {
            en: `${requester} cancel the request for ${type}.`
        }
    }),
    'request-response-approval in progress': ({type, approver}) => ({
        type: 'request',
        badge: 'approval in progress',
        title: {
            en: 'Request Update'
        },
        text: {
            en: `Your request for ${type} has been approve by ${approver}.`
        }
    }),
    'request-response-approved': ({type, approver}) => ({
        type: 'request',
        badge: 'approved',
        title: {
            en: 'Request Approved'
        },
        text: {
            en: `${approver} has approved your request for ${type}.`
        }
    }),
    'request-response-refused': ({type, approver}) => ({
        type: 'request',
        badge: 'refused',
        title: {
            en: 'Request Refused'
        },
        text: {
            en: `${approver} has refused your request for ${type}.`
        }
    }),
    'request-requester-expiration-warning': ({type, remainingDays}) => ({
        type: 'request',
        badge: 'alert',
        title: {
            en: 'Request Expiration'
        },
        text: {
            en: `Your request for ${type} will expire ${remainingDays > 1? `in ${remainingDays} days` : `today`}.`
        }
    }),
    'request-requester-expiration': ({type}) => ({
        type: 'request',
        badge: 'expired',
        title: {
            en: 'Request Expiration'
        },
        text: {
            en: `Your request for ${type} has expired.`
        }
    }),
    'request-new-expiration-warning': ({requester, type, remainingDays}) => ({
        type: 'request',
        badge: 'alert',
        title: {
            en: 'Request Expiration'
        },
        text: {
            en: `${requester} request for ${type} will expire ${remainingDays > 1? `in ${remainingDays} days` : `today`}. Go to Team Requests on Team Manager to respond to it.`
        }
    }),
    'request-new-expiration': ({requester, type}) => ({
        type: 'request',
        badge: 'expired',
        title: {
            en: 'Request Expiration'
        },
        text: {
            en: `${requester} request for ${type} has expired.`
        }
    })
};

module.exports = requestNotifications;