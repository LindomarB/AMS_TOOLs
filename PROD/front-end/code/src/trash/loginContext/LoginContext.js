import React, { createContext, useContext, useEffect, useState } from 'react';
import useBrowserStorage from '../../components/hooks/useBrowserStorage';
import FetcherContext from '../../components/context/fetcherContext/FetcherContext';

const LoginContext = createContext({
    rememberToken: false,
    setRememberToken: () => {},
    token: null,
    logIn: async () => {},
    logOut: () => {},
    user: {},
    refreshUser: async () => {},
    isLogged: false
});

function LoginContextProvider(props) {
    const [rememberToken, setRememberToken] = useBrowserStorage({
        key: 'rememberToken',
        initialValue: false
    });
    const [user, setUser] = useState(null);
    const [token, setToken, tokenStorageType, setTokenStorageType] = useBrowserStorage({
        key: 'token',
        initialValue: null
    });

    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        if(rememberToken) {
            setTokenStorageType('local');
        } else {
            setTokenStorageType('session');
        }
    }, [rememberToken]);

    const logIn = async (credentials) => {
        if(credentials) {
            const response = await fetcher.logInWithCredentials(credentials);

            if(!response.ok) return response;

            setToken(response.data.token);
            setUser(response.data.userData);
            fetcher.setToken(response.data.token);
        } else {
            const response = await fetcher.logInWithToken(token);
            if(!response.ok) {    
                logOut();
                return response;
            }

            setUser(response.data.userData);
        }

        return {ok: true};
    }

    const logOut = () => {
        setToken(null);
        setUser(null);
        fetcher.setToken(null);
    }

    const refreshUser = async () => {
        const response = await fetcher.logIn();
        setUser(response.data.userData);
        return {ok: true};
    }

    const value = {
        rememberToken,
        setRememberToken,
        token,
        logIn,
        logOut,
        user,
        refreshUser,
        isLogged: !!token && !!user
    };

    return (
        <LoginContext.Provider value={value}>
            {props.children}
        </LoginContext.Provider>
    );
}

export default LoginContext;
export {LoginContextProvider};
