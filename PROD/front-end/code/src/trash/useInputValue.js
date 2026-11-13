import {useEffect, useRef, useState} from "react";

/*
    HOOK PROPS

    A single object must be passed with the follow keys:
    inputName (required): the name of the input.
    required (optional): if the value of the input is required to the the form (default: false).
    defaultValue (optional): a value that will be inserted into the input if no value is provided (default: '').
    **validators (optional): an array of functions (a validator) that will receive the input value and its dependencies values and must return an object with two keys:
        isValid: true or false indicating whether the input is valid or not;
        invalidMessage: a message that will be displayed if the input is invalid;
    ***defaultInvalidMessage (optional): a messagem that will be displayed if the input is invalid. These message will also be displayed if a validator do not return an invalid message when the input is invalid.
    dependencies (optional): an array of useInputValue hooks. The input is only valid if all its dependencies are.
    onChangeValue (optional): a function that will be executed when the input value is changed and receives an object with the keys inputName, value, isValid and invalidMessage.

    **ALTERAR COMO O VALIDATOR FUNCIONA. DEVE RETORNAR A MENSAGEM DE INVÁLIDO JUNTO COM A RESPOSTA DA VALIDAÇÃO E NÃO SER UMA PROPRIEDADE A PARTE
    ***ALTERAR ESSE COMPORTAMENTO DO VALIDATOR. COLOCAR UMA MENSAGEM PADRÃO SE O INPUT FOR INVÁLIDO OU DEIXAR SEM???
*/

function useInputValue({inputName, required, defaultValue = "", initialValue, validators, defaultInvalidMessage, dependencies = [], onChangeValue}) {
    const [value, setNewValue] = useState(initialValue === undefined? defaultValue : initialValue);
    const [dependents, setDependents] = useState([]);
    const [dependencyValues, setDependencyValues] = useState({});
    const [isValid, setIsValid] = useState(checkValidity(value, required, defaultInvalidMessage, validators, dependencyValues).isValid);
    const [invalidMessage, setinvalidMessage] = useState(checkValidity(value, required, defaultInvalidMessage, validators, dependencyValues).invalidMessage);
    const firstRender = useRef(true);

    useEffect(() => {
        dependencies.forEach(dependency => dependency.addDependent({value, setValue, updateDependency}));
    }, []);

    useEffect(() => {
        const result = checkValidity(value, required, defaultInvalidMessage, validators, dependencyValues);                
        setIsValid(result.isValid);
        setinvalidMessage(result.invalidMessage);
    }, [dependencyValues]);

    useEffect(() => {
        if(!firstRender.current) {
            onChangeValue && onChangeValue({
                    inputName,
                    value,
                    isValid,
                    invalidMessage
            });
        } else {
            firstRender.current = false;
        }
    }, [value]);

    const setValue = (value) => {
        const result = checkValidity(value, required, defaultInvalidMessage, validators, dependencyValues);                
        setNewValue(value);
        setIsValid(result.isValid);
        setinvalidMessage(result.invalidMessage);
        dependents.forEach(dependent => dependent.updateDependency(inputName, value));
    }

    const updateDependency = (inputName1, value) => {
        setDependencyValues(curSt => ({...curSt, [inputName1]: value}));
    }

    const addDependent = (dependent) => {
        setDependents(curSt => [...curSt, dependent]);
        dependent.updateDependency(inputName, value);
    }

    const reset = () => {        
        setValue(defaultValue);
    }

    return {
        inputName,
        value,
        isValid,
        invalidMessage,
        checkValidity: (value) => checkValidity(value, required, defaultInvalidMessage, validators, dependencyValues),
        setValue,
        addDependent,
        reset
    }
}

function checkValidity(value, required, defaultInvalidMessage, validators, dependencyValues) {
    const result = {
        isValid: true,
        invalidMessage: null
    };

    if(required || value) {
        if(!validators) {
            if(typeof value !== "number") {
                result.isValid = !!value;
                if(!result.isValid) {
                    result.invalidMessage = defaultInvalidMessage;
                }
            }
        } else {
            for(let validator of validators) {
                if(!validator.validator(value, dependencyValues)) {
                    result.isValid = false;
                    result.invalidMessage = validator.invalidMessage;
                    break;
                }
            }
        }        
    }    

    return result;
}

export default useInputValue;