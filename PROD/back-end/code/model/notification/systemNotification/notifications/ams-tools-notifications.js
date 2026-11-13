const amsToolsNotifications = {
    'ams tools-tool-add': ({accountable, access}) => ({
        type: 'tools',
        badge: 'approved',
        title: {
            en: 'New Access'
        },
        text: {
            en: `${accountable} has gave to you access to ${access}.`
        }
    }),
    'ams tools-tool-remove': ({accountable, access}) => ({
        type: 'tools',
        badge: 'refused',
        title: {
            en: 'Access Removed'
        },
        text: {
            en: `${accountable} has removed your access to ${access}.`
        }
    }),
    'ams tools-patch release': ({version}) => ({
        type: 'system',
        badge: 'patch release',
        title: {
            en: `New patch ${version} available!`
        },
        text: {
            en: `Click here see what is new in patch ${version}.`
        }
    }),
    'ams tools-maintenance': ({date, start, end}) => ({
        type: 'system',
        badge: 'maintenance',
        title: {
            en: `Maintenance scheduled for ${date}`
        },
        text: {
            en: `We will perform maintenance on AMS Tools servers. During this period, the application will be unavailable.\n
            Start: ${start}
            End: ${end}`
        }
    })
};

module.exports = amsToolsNotifications;