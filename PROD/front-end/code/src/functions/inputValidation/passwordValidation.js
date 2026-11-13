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
    return result;
}

export default passwordValidation;