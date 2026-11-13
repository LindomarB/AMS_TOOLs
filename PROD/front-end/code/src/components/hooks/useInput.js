import {useEffect, useRef, useState} from 'react';

/*
    HOOK PROPS

    A single object must be passed with the follow keys:
    name (required): the name of the input.
    required (optional): if the value of the input is required to the the form (default: false).
    defaultValue (optional): a value that will be inserted into the input if no value is provided (default: '').
    errorChecker (optional): a function that will receive the input value and its dependencies values and must return an error message (string) if the value is invalid. If nothing is returned ('', null, false or undefined), the value will be consider valid.
    externalValidator (optional): an async function that will be executed after the error checker and receive the input value and must return an error message (string) if the value is invalid. If nothing is returned ('', null, false or undefined), the value will be consider valid.
    defaultErrorMessage (optional): a messagem that will be displayed if the input is invalid. These message will also be displayed if a validator do not return an invalid message when the input is invalid.
    dependencies (optional): an array of useInput hooks. The input is only valid if all its dependencies are.
    onChangeValue (optional): a function that will be executed when the input value is changed and receives an object with the keys name, value, isValid and errorMessage.
*/

function useInput(props) {
    const {name, required, defaultValue = '', initialValue, errorChecker, externalValidator, defaultErrorMessage, dependencies: dependenciesInputs = [], onChangeValue, confirmationOnly} = props;
    const [value, setNewValue] = useState(initialValue === undefined? defaultValue : initialValue);
    const [onChangeEvents, setOnChangeEvents] = useState({});
    const [onReset, setOnReset] = useState(() => props.onReset);
    const [dependents, setDependents] = useState([]);
    const [dependencies, setDependencies] = useState(dependenciesInputs);
    const [isValid, setIsValid] = useState(checkValidity(value, required, defaultErrorMessage, errorChecker, dependencies).isValid);
    const [errorMessage, setErrorMessage] = useState(checkValidity(value, required, defaultErrorMessage, errorChecker, dependencies).errorMessage);
    const [awaitingExternalValidation, setAwaitingExternalValidation] = useState(false);
    const firstRender = useRef(true);

    useEffect(() => {    
        dependencies.forEach(dependency => dependency.addDependent({name, updateDependency}));  
    }, []);

    useEffect(() => {  
        validateInput(value);
    }, [dependencies, required]);

    useEffect(() => {    
        if(!firstRender.current) {
            const args = {
                name,
                value,
                isValid,
                errorMessage,
                dependencies
            };

            onChangeValue && onChangeValue(args);

            for(let event in onChangeEvents) {
                onChangeEvents[event](args);
            }
        } else {
            firstRender.current = false;
        }
    }, [value, isValid]);

    const validateInput = async (value) => {     
        setIsValid(false);   
        let result = checkValidity(value, required, defaultErrorMessage, errorChecker, dependencies); 
        
        if(result.isValid && externalValidator) {
            setAwaitingExternalValidation(true);
            result = await externalValidator(value);
            setAwaitingExternalValidation(false);
        }

        setIsValid(result.isValid);
        setErrorMessage(result.errorMessage);
    }

    const setValue = (value) => {    
        validateInput(value);
        setNewValue(value);
        dependents.forEach(dependent => dependent.updateDependency(name, value));
    }

    const addOnChangeEvent = (key, newFunction) => {
        setOnChangeEvents(curSt => {
            const newState = structuredClone(curSt);
            newState[key] = newFunction;
            return newState;
        });
    }

    const updateDependency = (dependencyName, newValue) => {
        setDependencies(curSt => {
            const newDependencies = [...curSt];
            const dependency = newDependencies.find(dependency => dependency.name === dependencyName);
            dependency.value = newValue;
            return newDependencies;
        });
    }

    const addDependent = (newDependent) => {   
        setDependents(curSt => {
            const newDependents = [...curSt];
            const dependentAlreadyExists = newDependents.some(dependent => dependent.name === newDependent.name);

            if(!dependentAlreadyExists) {
                newDependents.push(newDependent);
            }

            return newDependents;
        });
    }

    const removeDependent = (dependentName) => {
        setDependents(curSt => curSt.filter(dependent => dependent.name !== dependentName));
    }

    const addDependency = (newDependency) => {
        setDependencies(curSt => {
            const newDependencies = [...curSt];
            const dependencyAlreadyExists = newDependencies.some(dependency => dependency.name === newDependency.name);

            if(!dependencyAlreadyExists) {
                newDependencies.push(newDependency);
            }

            return newDependencies;
        });

        validateInput(value);
        newDependency.addDependent({name, updateDependency});
    }

    const removeDependency = (dependencyName) => {
        const dependency = dependencies.find(dependency => dependency.name === dependencyName);
        setDependencies(curSt => curSt.filter(dependency => dependency.name !== dependencyName));
        validateInput(value);
        dependency.removeDependent(name);
    }

    const reset = () => {        
        setValue(defaultValue);
        onReset && onReset(defaultValue);
    }

    return {
        name,
        value,
        isValid,
        errorMessage,
        checkValidity: (value) => checkValidity(value, required, defaultErrorMessage, errorChecker, dependencies),
        validateInput: () => validateInput(value),
        setValue,
        addDependent,
        removeDependent,
        reset,
        errorChecker,
        externalValidator,
        addOnChangeEvent,
        addDependency,
        removeDependency,
        confirmationOnly,
        required,
        awaitingExternalValidation,
        setOnReset: (func) => setOnReset(() => func)
    }
}

function checkValidity(value, required, defaultErrorMessage, errorChecker, dependencies) {
    const result = {
        isValid: true,
        errorMessage: null
    };
    
    const emptyValue = !hasValue(value);

    if(!required && emptyValue) return result;

    if(errorChecker) {
        const dependencyValues = dependencies.reduce((values, input) => {
            values[input.name] = input.value;
            return values;
        }, {});
        const errorMessage = errorChecker(value, dependencyValues);

        if(errorMessage) {
            result.isValid = false;
            result.errorMessage = errorMessage;
        }
    } else {
        if(emptyValue) {
            result.isValid = false;
            result.errorMessage = defaultErrorMessage;
        }
    }      

    return result;
}

function hasValue(value) {
    if(!value) return false;

    if(typeof value === 'number') {
        return true;
    }

    if(typeof value === 'object') {
        return !!Object.keys(value).length;
    }

    return !!value;    
}

export default useInput;