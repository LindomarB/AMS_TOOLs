const ctiToolNotifications = {
    'cti tool-application permission-add': ({accountable, application}) => ({
        type: 'cti tool',
        badge: 'approved',
        title: {
            en: 'Application Permission Added'
        },
        text: {
            en: `${accountable} has gave to you permission to create resolutions for ${application}.`
        }
    }),
    'cti tool-application permission-remove': ({accountable, application}) => ({
        type: 'cti tool',
        badge: 'refused',
        title: {
            en: 'Application Permission Removed'
        },
        text: {
            en: `${accountable} has removed your permission to create resolutions for ${application}.`
        }
    }),
    'cti tool-application permission-accountable access removed': ({application}) => ({
        type: 'cti tool',
        badge: 'refused',
        title: {
            en: 'Application Permission Removed'
        },
        text: {
            en: `Due to changes in your accountable's access, you are no longer allowed to create resolutions for ${application}.`
        }
    }),
    'cti tool-support group access-add': ({accountable, supportGroup}) => ({
        type: 'cti tool',
        badge: 'approved',
        title: {
            en: 'Support Group Access Added'
        },
        text: {
            en: `${accountable} has gave to you permission to create resolutions for all ${supportGroup} applications.`
        }
    }),
    'cti tool-support group access-remove': ({accountable, supportGroup}) => ({
        type: 'cti tool',
        badge: 'refused',
        title: {
            en: 'Support Group Access Removed'
        },
        text: {
            en: `${accountable} has removed your permission to create resolutions for all ${supportGroup} applications.`
        }
    }),
    'cti tool-resolution expiration-warning': ({incident, remainingDays}) => ({
        type: 'cti tool',
        badge: 'alert',
        title: {
            en: 'Resolution Expiration'
        },
        text: {
            en: `You have a resolution in progress for the incident ${incident} that will expire ${remainingDays > 1? `in ${remainingDays} days` : `today`}.`
        }
    }),
    'cti tool-resolution expiration': ({incident}) => ({
        type: 'cti tool',
        badge: 'expired',
        title: {
            en: 'Resolution Expiration'
        },
        text: {
            en: `Your resolution in progress for the incident ${incident} has expired.`
        }
    })
};

module.exports = ctiToolNotifications;