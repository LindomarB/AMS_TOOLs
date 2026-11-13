const stampData = {
    active: {
        icon: {
            name: 'successful',
            color: 'green',
            weight: 400
        },
        text: 'Active'
    },
    approved: {
        icon: {
            type: 'outlined',
            name: 'check_circle',
            color: 'green'
        },
        text: 'Approved'
    },
    decommissioned: {
        icon: {
            name: 'code_off',
            color: 'red',
            weight: 400
        },
        text: 'Decommissioned'
    },
    locked: {
        icon: {
            name: 'lock',
            color: 'red'
        },
        text: 'Locked'
    },
    'not supported by Wipro': {
        icon: {
            name: 'close',
            color: 'red',
            weight: 500
        },
        text: 'Not supported by Wipro'
    },
    pending: {
        icon: {
            type: 'outlined',
            name: 'pending',
            color: 'blue'
        },
        text: 'Awaiting Approval'
    },
    refused: {
        icon: {
            name: 'do_disturb_alt',
            color: 'red'
        },
        text: 'Refused'
    }
};

export default stampData;