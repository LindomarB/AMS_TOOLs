import remedyNumberValidation from "../../../../../../functions/inputValidation/remedyNumberValidation";

function pbiKbaValidator({type, number, path, tiersTree}) {
    const isFormatValid = remedyNumberValidation(type, number);

    if(!isFormatValid) {
        return {
            isValid: false,
            error: `The ${type.toUpperCase()} number is not in a valid format`
        };
    } else if(!path) {
        return {isValid: true};
    }

    let relatedTiers = tiersTree.getPaths(number);

    if(!relatedTiers.length) {
        return {isValid: true};
    }
    
    relatedTiers = relatedTiers.map(path => {
        return path.filter(vertex => !vertex.startsWith(type.toUpperCase()));
    });

    const relatedNumbers = {
        relatedPbi: [], 
        relatedKba: []
    }

    relatedTiers.reduce((relatedNumbers, path) => {
        const destinations = tiersTree.getDestinations(path);

        if(type === 'kba') {
            const pbi = destinations.filter(vertex => vertex.startsWith('PBI'));
            relatedNumbers.relatedPbi.push(...pbi);
        } else if(type === 'pbi') {
            const kba = destinations.filter(vertex => vertex.startsWith('KBA'));
            relatedNumbers.relatedKba.push(...kba);
        }

        return relatedNumbers;
    }, relatedNumbers);
    
    const areTiersRelatedToNumber = relatedTiers.some(relatedPath => 
        relatedPath.every((vertex, index) => path[index] === vertex)
    );

    if(areTiersRelatedToNumber) {
        return {isValid: true};
    }

    const result = {
        isValid: false,
        error: `This ${type.toUpperCase()} is already associated with other tiers`,
        relatedTiers: relatedTiers
    };

    if(type === 'pbi' && relatedNumbers.relatedKba.length) {
        result.relatedKba = relatedNumbers.relatedKba;
    } else if(type === 'kba' && relatedNumbers.relatedPbi.length) {
        result.relatedPbi = relatedNumbers.relatedPbi;
    }

    return result;
}

export default pbiKbaValidator;