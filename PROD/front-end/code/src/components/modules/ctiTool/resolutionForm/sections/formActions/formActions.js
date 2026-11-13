import classifications from "../../../data/classifications";

function resetTiers(form, classification) {
    const tiersUpdate = [1, 2, 3, 4].map(num => ({
        section: 'tiers',
        input: `tier ${num}`,
        value: '',
        isValid: false
    }));

    const isApplicationBug = (classification || form.get('classification', 'classification').value) === 'Application Bug';

    form.update(
        ...tiersUpdate,    
        {
            section: 'pbi',
            input: `number`,
            value: '',
            isValid: !isApplicationBug
        },
        {
            section: 'kba',
            input: `number`,
            value: '',
            isValid: true
        }
    );
}

function getTiers(form) {
    const inputs = [
        form.get('incident', 'country'),
        form.get('tiers', 'tier 1'),
        form.get('tiers', 'tier 2'),
        form.get('tiers', 'tier 3'),
        form.get('tiers', 'tier 4')
    ];

    return inputs.map((input, index) => {
        if(input) {
            return index === 0? input.value.toUpperCase() : input.value;
        } else {
            return null;
        }
    });
}

function changeClassification(form, newClassification) {
    const classificationData = classifications.find(classification => classification.name === newClassification);

    form.update(
        {
            section: 'classification',
            input: 'classification',
            value: newClassification,
            isValid: true
        },
        {
            section: 'classification',
            input: 'description',
            value: classificationData? classificationData.description : '',
            isValid: true
        }
    );
}

const formActions = {
    resetTiers,
    getTiers,
    changeClassification
};

export default formActions;