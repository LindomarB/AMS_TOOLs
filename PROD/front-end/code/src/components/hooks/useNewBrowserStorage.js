function useNewBrowserStorage({key, initialValue = null, useStoredValue = true, storageType = 'local'}) {
    if(!key) return {};

    const storage = storageType === 'local'? localStorage : sessionStorage;

    const setValue = (value) => {
        storage.setItem(key, JSON.stringify(value));
    }

    const getValue = () => {
        const value = storage.getItem(key)
        return value && JSON.parse(value);
    }

    const setStorageType = (type) => {
        const currentValue = JSON.parse(storage.getItem(key));
        storage.removeItem(key);

        if(type === 'local') {
            storage.current = localStorage;
        } else if(type === 'session') {
            storage.current = sessionStorage;
        }

        storage.setItem(key, JSON.stringify(currentValue));
    }

    const clear = () => {
        storage.removeItem(key);
    }

    const reset = () => {
        setValue(initialValue);
    }

    if(key) {
        if(useStoredValue) {
            const storedValue = storage.getItem(key);
            if(!storedValue && initialValue) setValue(initialValue);
        } else {
            storage.removeItem(key);
            initialValue && setValue(initialValue);
        }
    }

    return {
        key,
        getValue, 
        setValue, 
        clear,
        reset,
        storageType, 
        setStorageType,
        useStoredValue
    };
}

export default useNewBrowserStorage;