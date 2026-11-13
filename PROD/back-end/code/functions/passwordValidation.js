function passwordValidation(password) {
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const whiteSpace = /\s/;

    const result = {
        length: password.length > 7,
        uppercase: upperCase.test(password),
        lowercase: lowerCase.test(password),
        number: number.test(password),
        'special characters': specialCharacters.test(password),
        'white space': !whiteSpace.test(password)
    }

    let isValid = true;

    for(let condition in result) {
        if(!result[condition]) {
            isValid = false;
            break;
        }
    }

    result.isValid = isValid;

    if(!isValid) {
        return {
            ok: false,
            status: 400,
            json: {
                message: 'The password does not meet the requirements',
                result
            }
        };
    }

    return {ok: true};
}

module.exports = passwordValidation;