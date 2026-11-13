class InputValidators {
    

    static conditionalRequired(value, isRequired) {
        if(isRequired) {
            return !!value;
        } else return true;
    }
};

export default InputValidators;