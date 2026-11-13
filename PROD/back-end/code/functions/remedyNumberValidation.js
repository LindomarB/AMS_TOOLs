function remedyNumberValidation(prefix, value) {
    if(!value) return false;

    const length = prefix.toLowerCase() === 'kba'? 11 : 15;

    const isValid = (
        value.length === length && 
        value.slice(0, 3).toLowerCase() === prefix.toLowerCase() &&
        !isNaN(value.slice(3))
    );

    return isValid;
}


module.exports = remedyNumberValidation;