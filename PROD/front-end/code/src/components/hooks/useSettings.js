import { useContext} from 'react';
import UserContext from '../context/userContext/UserContext';
import useNewBrowserStorage from './useNewBrowserStorage';

function useSettings({key, initialValue = {}, storageType, useStoredValue = true}) {
    const user = useContext(UserContext).user;
    const storage = useNewBrowserStorage({
        key: user && user._id,
        initialValue,
        storageType,
        useStoredValue
    });

    const get = (setting) => {
        try {
            const storageValue = storage.getValue()[key];

            if(!setting) {
                return storageValue;
            } else {
                return storageValue[setting];
            }
        } catch {
            return undefined;
        }
    }

    const set = (setting, value) => {
        const storageValue = storage.getValue() || {};

        if(!storageValue[key]) {
            storageValue[key] = {};
        }
        
        try {
            storageValue[key][setting] = value;
            storage.setValue(storageValue);
        } catch {
            storage.setValue(
                {
                    [key]: {
                        [setting]: storageValue
                    }
                }
            );
        }
    }

    const update = (settings) => {
        const storageValue = storage.getValue();

        try {
            if(!storageValue[key]) {
                storageValue[key] = {};
            }

            storageValue[key] = settings;
            storage.setValue(storageValue);
        } catch {
            storage.setValue({
                [key]: settings
            });
        }

    }

    const clear = () => {
        const storageValue = storage.getValue();

        try {
            delete storageValue[key];
            storage.setValue(storageValue);
        } catch {
            return;
        }
    }

    const reset = () => {
        const storageValue = storage.getValue();

        try {
            storageValue[key] = initialValue;
            storage.setValue(storageValue);
        } catch {
            storage.setValue({
                [key]: initialValue
            });
        }
    }

    return {
        get,
        set,
        update,
        clear,
        reset,
        useStoredValue,
        key,
        storageType
    };
}

export default useSettings;