class InputValidators {
    static remedyNumber(prefix, value) {
        if(!value) return false;

        if(value) {
            return (
                value.length === 15 && 
                value.slice(0, 3).toLowerCase() === prefix &&
                !isNaN(value.slice(3))
            );
        } else return false;
    }

    static conditionalRequired(value, isRequired) {
        if(isRequired) {
            return !!value;
        } else return true;
    }
};

export default InputValidators;