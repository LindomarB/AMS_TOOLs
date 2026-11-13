import {useState, useEffect, useRef} from "react";

function useBrowserStorage({key, initialValue, useStoredValue = true, storageType = "local"}) {
    const [type, setType] = useState(storageType);
    const storage = useRef((type === "local")? localStorage : sessionStorage);
    const [value, setValue] = useState((useStoredValue && JSON.parse(storage.current.getItem(key))) || initialValue);

    useEffect(() => {
        storage.current.removeItem(key);

        if(type === 'local') {
            storage.current = localStorage;
        } else if(type === 'session') {
            storage.current = sessionStorage;
        }

        storage.current.setItem(key, JSON.stringify(value));
    }, [type]);

    useEffect(() => {
        storage.current.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return {
        value, 
        setValue, 
        storageType: type, 
        setStorageType: setType
    };
}

export default useBrowserStorage;