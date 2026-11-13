function createRemedyText(resolution) {
    const fieldsOrder = [
        // {
        //     section: 'incident',
        //     fields: [
        //         'incident',
        //         'priority',
        //         'country',
        //         'application',
        //         'support group'
        //     ]
        // },
        {
            section: 'classification',
            fields: [
                'classification'
            ]
        },
        {
            section: 'tiers',
            fields: [
                'tier 1',
                'tier 2',
                'tier 3',
                'tier 4',
                'tier 5'
            ]
        },
        {
            section: 'pbi',
            fields: [
                'number'
            ],
            fieldLabel: {
                number: 'PBI'
            }
        },
        {
            section: 'kba',
            fields: [
                'number'
            ],
            fieldLabel: {
                number: 'KBA'
            }
        },
        {
            section: 'problem',
            fields: [
                'problem',
                'diagnosis matches the problem',
                'is reopening',
                'reopening reason'
            ]
        },
        {
            section: 'solution',
            fields: [
                'solution',
                'main incident',
                'used sql',
                'was user guided'
            ]
        },
        {
            section: 'sla',
            fields: [
                'was lost',
                'wipro fault',
                'breach reason'
            ]
        },
    ];

    const resolutionText = fieldsOrder.map(order => {
        if(!resolution[order.section]) return;

        const text = order.fields.reduce((text, field) => {
            if(!resolution[order.section][field]) return text;

            const label = (order.fieldLabel && order.fieldLabel[field]) || field.toUpperCase();

            text.push(`${label}: ${resolution[order.section][field]} |`);
            return text;
        }, []);

        return text.join('\n');
    });

    resolutionText.push(`Resolution created in the CTI Tool on ${new Date(resolution.meta['created on']).toUTCString()}`);

    // const timestamp = `${new Date().toLocaleString()}`;
    // resolutionText.push(`\n${lexicon.theme.categorization.resolution.generatedDate}: ${timestamp} |`);

    return resolutionText.filter(text => text).join('\n');
}

export default createRemedyText;