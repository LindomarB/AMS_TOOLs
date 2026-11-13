function emailValidation(email, domain) {
    const atIndex = email.indexOf('@');

    if(atIndex === -1) return false;

    if(!domain) return true;

    const usedDomain = email.slice(atIndex);

    if(typeof domain === 'object') {
        return domain.find(domain => usedDomain === domain);
    }

    return usedDomain === domain;
}

export default emailValidation;