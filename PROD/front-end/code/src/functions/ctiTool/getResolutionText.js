import appLexicon from '../../data/lexicon/appLexicon';

function getResolutionText(resolutionData) {
    const lexicon = appLexicon.en;
    const formFields = structuredClone(resolutionData);

    formFields.incident = formFields.incident.toUpperCase();
    if(formFields.pbi) formFields.pbi = formFields.pbi.toUpperCase();
    if(formFields.kba) formFields.kba = formFields.kba.toUpperCase();

    const resolutionText = [];

    for(let key in formFields) {
        const value = formFields[key];

        if(value) {
            if(key === 'sqlCode' || key === '_id') continue;
            resolutionText.push(`${lexicon.theme.categorization.resolution[key].toUpperCase()}: ${value} |`);
        }
    }

    const timestamp = `${new Date().toLocaleString()}`;
    resolutionText.push(`\n${lexicon.theme.categorization.resolution.generatedDate}: ${timestamp} |`);

    return resolutionText.join('\n')
}

export default getResolutionText;