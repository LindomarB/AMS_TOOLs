import React from 'react';

function useForm(...inputs) {
    // const [inputs, setInputs] = useState(formInputs);

    // const addInput = (newInput) => {
    //     const newInputIndex = inputs.findIndex(input => input.name === newInput.name);

    //     setInputs(curSt => {
    //         const newState = [];
    //         curSt.forEach(input => newState.push(input));

    //         if(newInputIndex >= 0) {
    //             newState[newInputIndex] = newInput;
    //         } else {
    //             newState.push(newInput)
    //         }

    //         return newState
    //     });
    // }

    // const removeInput = (inputName) => {
    //     setInputs(curSt => curSt.filter(input => input.name !== inputName));
    // }

    const getInputNames = () => {
        return inputs.map(input => input.name);
    }

    const getValues = () => {
       return inputs.reduce((obj, input) => {
            obj[input.name] = input.value;
            return obj;
        }, {});
    }

    const isValid = () => {
        return inputs.every(input => input.isValid);
    }

    return {
        inputs,
        // addInput,
        // removeInput,
        getInputNames,
        getValues,
        isValid
    };
}

export default useForm;