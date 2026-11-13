const slaData = {
    incident: {
        critical: {
            response: {
                time: 15,
                unity: 'minutes'
            },
            resolution: {
                time: 4,
                unity: 'hours'
            },
            target: '90%'
        },
        high: {
            response: {
                time: 1,
                unity: 'hours'
            },
            resolution: {
                time: 8,
                unity: 'hours'
            },
            target: '90%'
        },
        medium: {
            response: {
                time: 24,
                unity: 'hours'
            },
            resolution: {
                time: 72,
                unity: 'hours'
            },
            target: '90%'
        },
        low: {
            response: {
                time: 48,
                unity: 'hours'
            },
            resolution: {
                time: 120,
                unity: 'hours'
            },
            target: '90%'
        },
        extended: {}
    },
    'service request': {
        critical: {
            response: {
                time: 1,
                unity: 'hour'
            },
            resolution: {
                time: 6,
                unity: 'hours'
            },
            target: '90%'
        },
        high: {
            response: {
                time: 1,
                unity: 'hours'
            },
            resolution: {
                time: 4,
                unity: 'days'
            },
            target: '90%'
        },
        medium: {
            response: {
                time: 24,
                unity: 'hours'
            },
            resolution: {
                time: 7,
                unity: 'days'
            },
            target: '90%'
        },
        low: {
            response: {
                time: 48,
                unity: 'hours'
            },
            resolution: {
                time: 14,
                unity: 'days'
            },
            target: '90%'
        },
        extended: {
            response: {
                time: 7,
                unity: 'days'
            },
            resolution: {
                time: 21,
                unity: 'days'
            },
            target: '90%'
        }
    }
}

export default slaData;