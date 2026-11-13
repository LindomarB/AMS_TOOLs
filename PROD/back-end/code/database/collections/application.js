const schema = {
    $jsonSchema: {
        bsonType: 'object',
        required: [
            'region',
            'name',
            'group',
            'country',
            'business unit',
            'technology',
            'interfaces',
            'support group',
            'coverage',
            'app owner',
            'sdm',
            'app lead',
            'track lead',
            'shifts',
            'description'
        ]
    }
};

module.exports = schema;