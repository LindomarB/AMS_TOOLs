const userNotifications = {
    'user-away mode-set': ({startDate, endDate, timezoneOffset, temporaryAccountable}, lang) => {
        const start = this.getUTCDate(startDate, timezoneOffset).toLocaleDateString(lang);
        const end = this.getUTCDate(endDate, timezoneOffset).toLocaleDateString(lang);

        return {
            type: 'away',
            text: {
                en: `I will be away from ${start} to ${end}.${temporaryAccountable? `\nDuring this period I will be covered by ${temporaryAccountable}` : ''}`
            }
        };
    },
    'user-away mode-active': ({startDate, endDate, timezoneOffset, temporaryAccountable}, lang) => {
        const start = this.getUTCDate(startDate, timezoneOffset).toLocaleDateString(lang);
        const end = this.getUTCDate(endDate, timezoneOffset).toLocaleDateString(lang);
    
        return {
            type: 'away',
            text: {
                en: `I am away from ${start} to ${end}.${temporaryAccountable? `\nDuring this period I am being covered by ${temporaryAccountable}` : ''}`
            }
        };
    },
    'user-password reset-request': ({name, id}) => ({
        type: 'password',
        badge: 'alert',
        title: {
            en: `Password reset`
        },
        text: {
            en: `${name} is requesting a password reset.`
        },
        user: id
    }),
    'user-password reset-completed': ({name}) => ({
        type: 'password',
        badge: 'approved',
        title: {
            en: `Password reset`
        },
        text: {
            en: `${name} completed password reset.`
        }
    })
};

module.exports = userNotifications;