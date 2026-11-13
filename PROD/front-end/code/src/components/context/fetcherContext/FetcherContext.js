import React, { createContext, useContext, useEffect, useState } from 'react';
import AppContext from '../appContext/AppContext';
import useNewBrowserStorage from '../../hooks/useNewBrowserStorage';

const value = {
    token: '',
    awaitingResponse: false,
    awaiting: {},
    setToken: token => {},
    cleanToken: () => {},
    fetch: async (url, options, {showErrorNotification = true, showSuccessfulNotification = true}) => {},
    logInWithCredentials: async (credentials, settings) => {},
    logInWithToken: async (settings) => {},
    requestPasswordReset: async (data, settings) => {},
    verifyPasswordReset: async (data, settings) => {},
    confirmPasswordReset: async (data, settings) => {},
    getCtiApplicationOptionsForNewAccount: async (query, settings) => {},
    getAccountableOptionsForNewAccount: async (query, settings) => {},
    validateEmail: async (query, settings) => {},
    validateId: async (query, settings) => {},
    sendAccountRequest: async (data, settings) => {},
    sendRequest: async (data, settings) => {},
    getRequests: async (query, settings) => {},
    updateRequest: async (data, settings) => {},
    updateUserAccess: async (data, settings) => {},
    updateUserPassword: async (currentPassword, newPassword, settings) => {},
    updateUserStatus: async (data, settings) => {},
    updateCTIApplicationPermissions: async (data, settings) => {},
    setAwayMode: async (data, settings) => {},
    unsetAwayMode: async (data, settings) => {},
    updateLastSeenNotifications: async (notification, settings) => {},
    getRoles: async (query, settings) => {},
    getAccountablesFor: async (query, settings) => {},
    getAccountableOptions: async (query, settings) => {},
    getToolOptions: async (query, settings) => {},
    getRolesFor: async (query, settings) => {},
    getUsers: async (query, settings) => {},
    getUserNotifications: async (action, settings) => {},
    getUserNotificationsOld: async (action, settings) => {},
    getApplicationCatalog: async (query, settings) => {},
    getApplicationCatalogFilters: async (query, settings) => {},
    exportApplicationCatalogData: async (query, settings) => {},
    getSupportGroups: async (query, settings) => {},
    getTeamMember: async (query, settings) => {},
    getTeamMembers: async (query, settings) => {},
    getNewMemberOptions: async (query, settings) => {},
    getMemberApplicationOptions: async (query, settings) => {},
    getMemberSupportGroupOptions: async (query, settings) => {},
    generateMemberPasswordResetLink: async (data, settings) => {},
    updateMemberCtiApplications: async (data, settings) => {},
    updateMemberAccess: async (data, settings) => {},
    addMember: async (data, settings) => {},
    removeMember: async (data, settings) => {},
    getTeamStats: async (module, query, settings) => {},
    getOrgChart: async (query, settings) => {},
    getUserFilters: async (query, settings) => {},
    getRequestFilters: async (query, settings) => {},
    getResolutions: async (query, settings) => {},
    getResolutionsInProgress: async (query, settings) => {},
    saveResolution: async (data, settings) => {},
    saveResolutionProgress: async (data, settings) => {},
    editResolution: async (query, settings) => {},
    updateResolutionProgress: async (query, settings) => {},
    deleteResolution: async (query, settings) => {},
    deleteResolutionProgress: async (query, settings) => {},
    getResolutionFilters: async (query, settings) => {},
    updateFavoriteResolutions: async (data, settings) => {},
    exportResolutionData: async (query, settings) => {},
    getTiers: async (query, settings) => {},
    getTiersStatus: async (query, settings) => {},
    exportTiers: async (query, settings) => {},
    getNotifications: async (query, settings) => {},
    getPatchs: async (query, settings) => {},
    getCTIDashboard: async (dashboard, query, settings) => {},
    getCtiApplicationOptions: async (query, settings) => {},
    getCtiSupportGroupOptions: async (query, settings) => {},
    getUserCTIApplications: async (query, settings) => {},
    getFaq: async (query, settings) => {},
    getUserGuide: async (query, settings) => {},
    newSupportMessage: async (data, settings) => {}
};

const FetcherContext = createContext(value);

export function FetcherContextProvider(props) {
    const appCtx = useContext(AppContext);
    const token = useNewBrowserStorage({
        key: 'token',
        storageType: appCtx.rememberToken? 'local' : 'session'
    });
    const [server, setServer] = useState(process.env.REACT_APP_BACKEND_SERVER);
    const [authorization, setAuthorization] = useState(token.getValue() && `Bearer ${token.getValue()}`);
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [awaiting, setAwaiting] = useState({});

    useEffect(() => {
        if(appCtx.rememberToken) {
            token.setStorageType('local');
        } else {
            token.setStorageType('session');
        }
    }, [appCtx.rememberToken]);

    const setToken = (newToken) => {
        token.setValue(newToken);
        setAuthorization(newToken && `Bearer ${newToken}`);
    }

    const cleanToken = () => {
        setToken(null);
    }

    const mountQuery = (query) => {
        if(!query) return '';

        let queryString = '?';

        for(let key in query) {
            if(typeof query[key] === 'object') {
                queryString += `${key}=${JSON.stringify(query[key])}&`;
            } else {
                queryString += `${key}=${query[key]}&`;
            }
        }

        queryString = queryString.slice(0, queryString.length - 1);
        return queryString;
    }
    
    const fetch = async (url, options, settings = {}) => {
        [
            'showErrorNotification', 
            'showSuccessfulNotification', 
            'lockScreen'
        ].forEach(setting => {
            if(settings[setting] !== false) {
                settings[setting] = true;
            }
        });

        const {showErrorNotification, errorNotification, showSuccessfulNotification, successfulNotification} = settings;

        const endFetch = startFetch(settings);

        const response = await window.fetch(
            `${server}/${url}`, 
            options
        ).catch(err => {
            endFetch();
            return {
                ok: false,
                fecthError: true,
                error: err.message
            }
        });

        if(!response) {
            showErrorNotification && appCtx.notify({
                type: 'error',
                message: errorNotification || 'Server communication failure!'
            });

            endFetch();
            return {
                ok: false,
                error: errorNotification || 'server communication failure'
            };
        }

        if(!response.ok) {
            if(response.fecthError) {
                showErrorNotification && appCtx.notify({
                    type: response.status === 499? 'warning' : 'error',
                    message: errorNotification || response.error
                });

                endFetch();
                return response;
            } else {
                try {
                    const data = await response.json();

                    if(data.userLocked) {
                        setToken(null);
                        endFetch();
                        return;
                    }
                    
                    showErrorNotification && appCtx.notify({
                        type: response.status === 499? 'warning' : 'error',
                        message: errorNotification || data.message
                    });
    
                    endFetch();
                    return {
                        ok: false,
                        status: response.status,
                        data,
                        error: data.message
                    };
                } catch(err) {
                    endFetch();
                    return {
                        ok: false
                    };
                }
            }
        }

        try {
            const data = await response.json();
    
            if(data.message && showSuccessfulNotification) {
                appCtx.notify({
                    type: 'successful',
                    message: successfulNotification || data.message
                });
            }

            endFetch();

            return {
                ok: true,
                data
            };
        } catch(err) {
            appCtx.notify({
                type: 'error',
                message: 'Error when trying to convert JSON (invalid format)'
            });

            endFetch();

            return {
                ok: false
            };
        }
    }

    const startFetch = (settings) => {
        if(settings.lockScreen) appCtx.lockScreen();
        
        if(settings.awaitingFlag) {
            setAwaiting(curSt => ({...curSt, [settings.awaitingFlag]: true}));
        }

        setAwaitingResponse(true);

        return () => endFetch(settings);
    }

    const endFetch = (settings) => {
        if(settings.awaitingFlag) {
            setAwaiting(curSt => {
                const newState = {...curSt};
                delete newState[settings.awaitingFlag];
                return newState;
            });
        }
        appCtx.unlockScreen();
        setAwaitingResponse(false);
    }

    const download = async (url, options, settings) => {
        const endFetch = startFetch(settings);

        const response = await window.fetch(
            `${server}/${url}`, 
            options
        ).catch(err => {
            endFetch();
            return {
                ok: false,
                fecthError: true,
                error: err.message
            }
        });

        if(!response) {
            appCtx.notify({
                type: 'error',
                message: 'Server communication failure!'
            });

            endFetch();
            return {
                ok: false,
                error: 'server communication failure'
            };
        }

        if(!response.ok) {
            if(response.fecthError) {
                appCtx.notify({
                    type: response.status === 499? 'warning' : 'error',
                    message: response.error
                });

                endFetch();
                return response;
            } else {
                const data = await response.json();

                if(data.userLocked) {
                    setToken(null);
                    endFetch();
                    return;
                }
                
                appCtx.notify({
                    type: response.status === 499? 'warning' : 'error',
                    message: data.message
                });

                endFetch();
                return {
                    ok: false,
                    status: response.status,
                    data,
                    error: data.message
                };
            }
        }

        let fileName = settings.fileName;

        if(!fileName) {
            const fileNameFormHeader = response.headers.get('Content-Disposition').split(';').map(string => string.trim()).find(string => string.startsWith('filename='));

            if(fileNameFormHeader) {
                fileName = fileNameFormHeader.replace('filename=', '');
            }
        }

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
 
        endFetch();
        return {ok: true};
    }
    
    const logInWithCredentials = async (credentials, settings = {}) => {
        const res = await fetch(
            `log-in`, 
            {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            settings
        );

        if(res.ok) {
            setToken(res.data.token);
        }

        return res;
    }

    const logInWithToken = async (settings = {}) => {
        return await fetch(
            `log-in`,
            {
                method: 'POST',
                headers: {
                    authorization
                }
            },
            settings
        );
    }

    const requestPasswordReset = async (data, settings = {}) => {
        return await fetch(
            `log-in/password-reset/request`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'requestPasswordReset',
                ...settings
            }
        );
    }

    const verifyPasswordReset = async (data, settings = {}) => {
        return await fetch(
            `log-in/password-reset/verify`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'verifyPasswordReset',
                ...settings
            }
        );
    }

    const confirmPasswordReset = async (data, settings = {}) => {
        return await fetch(
            `log-in/password-reset/confirm`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'confirmPasswordReset',
                ...settings
            }
        );
    }

    const getCtiApplicationOptionsForNewAccount = async (query, settings) => {
        return fetch(
            `account-request/cti-application-options/${mountQuery(query)}`,
            {
                method: 'GET',
            },
            {
                awaitingFlag: 'getCtiApplicationOptionsForNewAccount',
                ...settings
            }
        );
    }

    const getAccountableOptionsForNewAccount = async (query, settings) => {
        return fetch(
            `account-request/accountable-options/${mountQuery(query)}`,
            {
                method: 'GET',
            },
            {
                awaitingFlag: 'getAccountableOptionsForNewAccount',
                ...settings
            }
        );
    }

    const getToolOptions = async (query, settings) => {
        return fetch(
            `users/access/options/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getToolOptions',
                ...settings
            }
        );
    }

    const validateEmail = async (query, settings) => {
        return fetch(
            `account-request/validate-email/${mountQuery(query)}`,
            {
                method: 'GET',
            },
            {
                awaitingFlag: 'validateEmail',
                ...settings
            }
        );
    }

    const validateId = async (query, settings) => {
        return fetch(
            `account-request/validate-id/${mountQuery(query)}`,
            {
                method: 'GET',
            },
            {
                awaitingFlag: 'validateId',
                ...settings
            }
        );
    }

    const sendAccountRequest = async (data, settings) => {
        return await fetch(
            'account-request',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'sendAccountRequest',
                ...settings
            }
        );
    }

    const sendRequest = async (data, settings = {}) => {
        return await fetch(
            'requests',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'sendRequest',
                ...settings
            }
        );
    }

    const getRequests = async (query, settings = {}) => {
        return await fetch(
            `requests/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getRequests',
                ...settings
            }
        );
    }

    const getRequestFilters = async (query, settings = {}) => {
        return await fetch(
            `requests/filters/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getRequestFilters',
                ...settings
            }
        );
    }

    const updateRequest = async (data, settings = {}) => {
        return await fetch(
            'requests',
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateRequest',
                ...settings
            }
        );
    }

    const updateUserAccess = async (data, settings = {}) => {
        return await fetch(
            'users/access',
            {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateUserAccess',
                ...settings
            }
        );
    }

    const updateUserPassword = async (currentPassword, newPassword, settings = {}) => {
        return await fetch(
            'users/password',
            {
                method: "PATCH",
                body: JSON.stringify({currentPassword, newPassword}),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateUserPassword',
                ...settings
            }
        );
    }

    const updateUserStatus = async (data, settings = {}) => {
        return await fetch(
            'users/status',
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateUserStatus',
                ...settings
            }
        );
    }

    const updateCTIApplicationPermissions = async (data, settings = {}) => {
        return await fetch(
            'users/cti-tool/applications/',
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateCTIApplicationPermissions',
                ...settings
            }
        );
    }

    const setAwayMode = async (data, settings = {}) => {
        return await fetch(
            'users/set-away-mode',
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'setAwayMode',
                ...settings
            }
        );
    }

    const unsetAwayMode = async (data, settings = {}) => {
        return await fetch(
            'users/unset-away-mode',
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'unsetAwayMode',
                ...settings
            }
        );
    }

    const updateLastSeenNotifications = async (notifications, settings = {}) => {
        return await fetch(
            'users/settings/notifications/last-seen',
            {
                method: 'PATCH',
                body: JSON.stringify(notifications),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateLastSeenNotifications',
                showSuccessfulNotification: false,
                showErrorNotification: false,
                ...settings
            }
        );
    }

    const getRoles = async (query, settings = {}) => {
        return await fetch(
            `roles/${mountQuery(query)}`,
            {
                method: 'GET'
            },
            settings
        );
    }
    
    const getAccountablesFor = async (query, settings = {}) => {
        return await fetch(
            `account-request/accountable-options/${mountQuery(query)}`,
            {
                method: 'GET'
            },
            {
                awaitingFlag: 'getAccountablesFor',
                ...settings
            }
        );
    }

    const getAccountableOptions = async (query, settings = {}) => {
        return await fetch(
            `users/accountables/options/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getAccountableOptions',
                ...settings
            }
        );
    }

    const getRolesFor = async (query, settings = {}) => {
        return await fetch(
            `requests/get-roles/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            settings
        );
    }

    const getUsers = async (query, settings = {}) => {
        return await fetch(
            `users/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            settings
        );
    }

    const getUserNotifications = async (query, settings = {}) => {
        return await fetch(
            `users/notifications/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getUserNotifications',
                ...settings
            }
        );
    }

    const getUserNotificationsOld = async (action, settings = {}) => {
        return await fetch(
            `users/notificationsOld/${mountQuery({query: {action}})}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getUserNotificationsOld',
                ...settings
            }
        );
    }

    const getApplicationCatalog = async (query, settings = {}) => {
        return await fetch(
            `application-catalog/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            settings
        );
    }

    const getApplicationCatalogFilters = async (query, settings = {}) => {
        return await fetch(
            `application-catalog/filters/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            settings
        );
    }

    const exportApplicationCatalogData = async (query, settings = {}) => {
        return download(
            `application-catalog/export/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'exportApplicationCatalogData',
                ...settings
            }
        );
    }

    const getSupportGroups = async (query, settings ={}) => {
        return await fetch(
            `application-catalog/support-groups/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            settings
        );
    }

    const getTeamMember = async (query, settings = {}) => {
        return await fetch(
            `team-manager/team-member/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getTeamMember',
                ...settings
            }
        );
    } 

    const getTeamMembers = async (query, settings = {}) => {
        return await fetch(
            `team-manager/team-members/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getTeamMembers',
                ...settings
            }
        );
    }  

    const getNewMemberOptions = async (query, settings = {}) => {
        return await fetch(
            `team-manager/new-member-options/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getNewMemberOptions',
                ...settings
            }
        );
    }  

    const getMemberApplicationOptions = async (query, settings = {}) => {
        return await fetch(
            `team-manager/member-application-options/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getMemberApplicationOptions',
                ...settings
            }
        );
    }

    const getMemberSupportGroupOptions = async (query, settings = {}) => {
        return await fetch(
            `team-manager/member-support-group-options/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getMemberApplicationOptions',
                ...settings
            }
        );
    }

    const generateMemberPasswordResetLink = async (data, settings = {}) => {
        return await fetch(
            `team-manager/member/password-reset`,
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'generateMemberPasswordResetLink',
                ...settings
            }
        );
    }

    const updateMemberCtiApplications = async (data, settings = {}) => {
        return await fetch(
            `team-manager/member/cti-tool/applications/permissions`,
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateMemberCtiApplications',
                ...settings
            }
        );
    }  

    const updateMemberAccess = async (data, settings = {}) => {
        return await fetch(
            `team-manager/member/access`,
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateMemberAccess',
                ...settings
            }
        );
    }  

    const addMember = async (data, settings = {}) => {
        return await fetch(
            `team-manager/member/add`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'addMember',
                ...settings
            }
        );
    }  

    const removeMember = async (data, settings = {}) => {
        return await fetch(
            `team-manager/member/remove`,
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'removeMember',
                ...settings
            }
        );
    }  

    const getTeamStats = async (module, query, settings) => {
        return fetch(
            `team-manager/stats/${module}/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: `getTeamStats-${module}`,
                ...settings
            }
        );
    }

    const getOrgChart = async (query, settings) => {
        return fetch(
            `team-manager/org-chart/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getOrgChart',
                ...settings
            }
        );
    }

    const getUserFilters = async (query, settings = {}) => {
        return await fetch(
            `users/filters/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getUserFilters',
                ...settings
            }
        );
    }

    const getResolutions = async (query, settings = {}) => {
        return fetch(
            `cti-tool/resolutions/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getResolutions',
                ...settings
            }
        );
    }

    const getResolutionsInProgress = async (query, settings = {}) => {
        return fetch(
            `cti-tool/resolutions/in-progress/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getResolutionsInProgress',
                ...settings
            }
        );
    }

    const saveResolution = async (data, settings = {}) => {
        return fetch(
            'cti-tool/resolutions',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'saveResolution',
                ...settings
            }
        );
    }

    const saveResolutionProgress = async (data, settings = {}) => {
        return fetch(
            'cti-tool/resolutions/in-progress',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'saveResolutionProgress',
                ...settings
            }
        );

    }

    const editResolution = async (data, settings = {}) => {
        return fetch(
            'cti-tool/resolutions/edit',
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'editResolution',
                ...settings
            }
        );
    }

    const updateResolutionProgress = async (data, settings = {}) => {
        return fetch(
            'cti-tool/resolutions/in-progress/update',
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateResolutionProgress',
                ...settings
            }
        );
    }

    const deleteResolution = async (query, settings = {}) => {
        return fetch(
            `cti-tool/resolutions/delete/${mountQuery(query)}`,
            {
                method: 'PATCH',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'deleteResolution',
                ...settings
            }
        );
    }

    const deleteResolutionProgress = async (query, settings = {}) => {
        return fetch(
            `cti-tool/resolutions/in-progress/delete/${mountQuery(query)}`,
            {
                method: 'PATCH',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'deleteResolutionProgress',
                ...settings
            }
        );
    }

    const getResolutionFilters = async (query, settings = {}) => {
        return fetch(
            `cti-tool/resolutions/filters/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getResolutionFilters',
                ...settings
            }
        );
    }
    
    const exportResolutionData = async (query, settings = {}) => {
        return download(
            `cti-tool/resolutions/export/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'exportResolutionData',
                ...settings
            }
        );
    }

    const getTiers = async (query, settings = {}) => {
        return fetch(
            `cti-tool/tiers/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getTiers',
                ...settings
            }
        );
    }

    const getTiersStatus = async (query, settings = {}) => {
        return fetch(
            `cti-tool/tiers/status/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getTiersStatus',
                ...settings
            }
        );
    }

    const exportTiers = async (query, settings = {}) => {
        return download(
            `cti-tool/tiers/export/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'exportTiers',
                ...settings
            }
        );
    }
    
    const updateFavoriteResolutions = async (data, settings = {}) => {
        return fetch(
            'cti-tool/resolutions/favorites',
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    authorization,
                    'Content-Type': 'application/json'
                }
            },
            {
                awaitingFlag: 'updateFavoriteResolutions',
                ...settings
            }
        );
    }

    const getNotifications = async(query, settings = {}) => {
        return fetch(
            `notifications/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getNotifications',
                ...settings
            }
        );
    }

    const getPatchs = async (query, settings) => {
        return fetch(
            `patchs/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getPatchs',
                ...settings
            }
        );
    }

    const getCTIDashboard = async (dashboard, query, settings) => {
        return fetch(
            `cti-tool/dashboards/${dashboard}/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: `getCTIDashboard-${dashboard}`,
                ...settings
            }
        );
    }

    const getCtiApplicationOptions = async (query, settings) => {
        return fetch(
            `cti-tool/applications/options/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getCtiApplicationOptions',
                ...settings
            }
        );
    }

    const getCtiSupportGroupOptions = async (query, settings) => {
        return fetch(
            `cti-tool/applications/support-group/options/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getCtiSupportGroupOptions',
                ...settings
            }
        );
    }

    const getUserCTIApplications = async (query, settings) => {
        return fetch(
            `cti-tool/applications/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getUserCTIApplications',
                ...settings
            }
        );
    }

    const getFaq = async (query, settings) => {
        return fetch(
            `support/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getFaq',
                ...settings
            }
        );
    }

    const getUserGuide = async (query, settings) => {
        return download(
            `support/user-guide/${mountQuery(query)}`,
            {
                method: 'GET',
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'getUserGuide',
                ...settings
            }
        );
    }

    const newSupportMessage = async (formData, settings) => {
        return fetch(
            `support/message`,
            {
                method: 'POST',
                body: formData,
                headers: {
                    authorization
                }
            },
            {
                awaitingFlag: 'newSupportMessage',
                ...settings
            }
        );
    }

    const value = {
        token: authorization && token.getValue(),
        setToken: setToken,
        awaitingResponse,
        awaiting,
        cleanToken,
        fetch,
        logInWithCredentials,
        logInWithToken,
        requestPasswordReset,
        verifyPasswordReset,
        confirmPasswordReset,
        getCtiApplicationOptionsForNewAccount,
        getAccountableOptionsForNewAccount,
        validateEmail,
        validateId,
        sendAccountRequest,
        sendRequest,
        getRequests,
        getRequestFilters,
        updateRequest,
        updateUserAccess,
        updateUserPassword,
        updateUserStatus,
        updateCTIApplicationPermissions,
        setAwayMode,
        unsetAwayMode,
        updateLastSeenNotifications,
        getRoles,
        getAccountablesFor,
        getAccountableOptions,
        getToolOptions,
        getRolesFor,
        getUsers,
        getUserNotifications,
        getUserNotificationsOld,
        getApplicationCatalog,
        getApplicationCatalogFilters,
        exportApplicationCatalogData,
        getSupportGroups,
        getTeamMember,
        getTeamMembers,
        getNewMemberOptions,
        getMemberApplicationOptions,
        getMemberSupportGroupOptions,
        generateMemberPasswordResetLink,
        updateMemberCtiApplications,
        updateMemberAccess,
        addMember,
        removeMember,
        getTeamStats,
        getOrgChart,
        getUserFilters,
        getResolutions,
        getResolutionsInProgress,
        saveResolution,
        saveResolutionProgress,
        editResolution,
        updateResolutionProgress,
        deleteResolution,
        deleteResolutionProgress,
        getResolutionFilters,
        updateFavoriteResolutions,
        exportResolutionData,
        getTiers,
        getTiersStatus,
        exportTiers,
        getNotifications,
        getPatchs,
        getCTIDashboard,
        getCtiApplicationOptions,
        getCtiSupportGroupOptions,
        getUserCTIApplications,
        getFaq,
        getUserGuide,
        newSupportMessage
    };

    return (
        <FetcherContext.Provider value={value}>
            {props.children}
        </FetcherContext.Provider>
    );
}

export default FetcherContext;