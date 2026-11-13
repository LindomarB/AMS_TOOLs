const teamManagerNotifications = {
    'team manager-member-add': ({accountable}, lang) => ({
        type: 'team manager',
        badge: 'add user',
        title: {
            en: 'Welcome to a new team'
        },
        text: {
            en: `${accountable} added you to the team.`
        }
    }),
    'team manager-member-remove': ({accountable}, lang) => ({
        type: 'team manager',
        badge: 'remove user',
        title: {
            en: 'You left a team'
        },
        text: {
            en: `${accountable} removed you from the team.`
        }
    }),
    'team manager-accountable-direct member change': ({member, accountable}, lang) => ({
        type: 'team manager',
        badge: 'directly member',
        title: {
            en: 'Changes in your team'
        },
        text: {
            en: `${member} was added to ${accountable}'s team and is no longer your direct member.`
        }
    }),
    'team manager-accountable-indirect member change': ({member, accountable}, lang) => ({
        type: 'team manager',
        badge: 'directly accountable',
        title: {
            en: 'Changes in your team'
        },
        text: {
            en: `${accountable} is no longer ${member}'s direct accountable. Due to this change, you became his direct accountable.`
        }
    }),
    'team manager-member-direct accountable change': ({accountable}, lang) => ({
        type: 'team manager',
        badge: 'accountable change',
        title: {
            en: 'Changes in your team'
        },
        text: {
            en: `Due to changes in the structure of your team, ${accountable} is no longer one of your direct accountables.`
        }
    }),
    'team manager-member-indirect accountable change': ({accountable}, lang) => ({
        type: 'team manager',
        badge: 'accountable change',
        title: {
            en: 'Changes in your team'
        },
        text: {
            en: `Due to changes in the structure of your team, ${accountable} is now your direct accountable.`
        }
    })
};

module.exports = teamManagerNotifications;