import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import FetcherContext from '../fetcherContext/FetcherContext';
import useServerData from '../../hooks/useServerData';
import AppContext from '../appContext/AppContext';

const UserContext = createContext({
    logIn: async () => {},
    logOut: () => {},
    user: {},
    refresh: async () => {},
    lastUserUpdate: null,
    notifications: {
        lastUpdate: new Date(),
        groups: {},
        new: {}
    },
    hasNewNotifications: false,
    updateLastSeenNotifications: async (group) => {},
    getCTIApplication: (applicationName, supportGroup) => {},
    isLogged: false
});

function UserContextProvider(props) {
    const [user, setUser] = useState(null);
    const [lastUserUpdate, setLastUserUpdate] = useState(null);
    const [newNotifications, setNewNotifications] = useState({
        lastUpdate: null,
        new: {}
    });
    const [hasNewNotifications, setHasNewNotifications] = useState(false);
    const [ctiApplications, setCtiApplications] = useState([]);
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);
    const autoRefreshTimer = useRef(null);

    const serverDataSettings = {
        fetcher: {
            method: 'getUserNotifications'
        },
        querySettings: {
            projection: {
                addressee: 0,
                group: 0
            },
            sort: {
                date: -1
            }
        }
    };

    const globalNotifications = useServerData({
        ...serverDataSettings,
        query: {
            group: 'global'
        }
    });

    const systemNotifications = useServerData({
        ...serverDataSettings,
        query: {
            group: 'system'
        }
    });

    const groups = {
        global: globalNotifications,
        system: systemNotifications
    };

    useEffect(() => {
        clearTimeout(autoRefreshTimer.current);

        if(!fetcher.token) {
            setUser(null);
            setLastUserUpdate(null);
        } else {          
            autoRefreshTimer.current = setTimeout(refresh, 600000);
        }
    }, [fetcher.token]);

    useEffect(() => {
        if(lastUserUpdate && fetcher.token) {
            getNotifications();
            updateCTIApplications();
        } else {
            Object.keys(groups).forEach(group => groups[group].clear());

            setNewNotifications({
                lastUpdate: null,
                new: {}
            });
            setCtiApplications([]);
        }
    }, [lastUserUpdate, fetcher.token]);

    useEffect(() => {
        let newNotificationsCount = 0;

        for(let group in newNotifications.new) {
            newNotificationsCount += newNotifications.new[group] || 0;
        }

        setHasNewNotifications(newNotificationsCount);
    }, [newNotifications]);

    useEffect(() => {
        if(hasNewNotifications) {
            appCtx.notify({
                message: `You have ${hasNewNotifications} ${hasNewNotifications > 1? 'new notifications' : 'new notification'}`,
                settings: {
                    bgColor: 'blue',
                    color: 'white',
                    icon: {
                        name: 'new notification',
                        color: 'white',
                        filled: true
                    }
                },
                priority: -10
            });
        }
    }, [hasNewNotifications]);

    const logIn = async (credentials) => {
        let res = null;

        if(credentials) {
            res = await fetcher.logInWithCredentials(credentials);
            if(!res.ok) return res;
        } else {
            res = await fetcher.logInWithToken();

            if(!res.ok) {    
                logOut();
                return res;
            }
        }

        setUser(res.data.userData);
        setLastUserUpdate(new Date());
        // checkLocalStorage(res.data.userData._id);

        return {ok: true};
    }

    const logOut = () => {
        fetcher.cleanToken();
    }

    const checkLocalStorage = (userId) => {
        const lastUser = localStorage.getItem('userId');
        
        if(lastUser !== userId) {
            const rememberToken = localStorage.getItem('rememberToken');

            localStorage.clear();
            localStorage.setItem('userId', userId);
            localStorage.setItem('rememberToken', rememberToken);
        }
    }

    const refresh = async () => {
        const res = await fetcher.logInWithToken({showErrorNotification: false});

        if(res.ok) {
            setUser(res.data.userData);
            setLastUserUpdate(new Date());
        }

        autoRefreshTimer.current = setTimeout(refresh, 600000);

        return {ok: res.ok};
    }

    const getNotifications = async () => {
        //quando tiver o grupo de leaders disponível \/
        // if(user.profile.role !== 'analyst') {
        //     groups.leaders = leadersNotifications;
        // }
  
        const newNotifications = {
            new: {}
        };

        for(let group in groups) {
            let res = null;

            if(groups[group].data && groups[group].data.length) {
                res = await groups[group].refresh();
            } else {
                res = await groups[group].get();
            }

            if(!res.ok) break;

            newNotifications.new[group] = 0;

            for(let notification of res.newData) {
                const notificationDate = new Date(notification.date).getTime();
                const lastSeen = new Date(user.settings.notifications.lastSeen[group] || user.meta.createdOn).getTime();

                if(notificationDate > lastSeen) {
                    newNotifications.new[group]++;
                } else break;

                if(newNotifications.new[group] > 9) break;
            }
        }

        newNotifications.lastUpdate = new Date();
        setNewNotifications(newNotifications);
    }

    const updateLastSeenNotifications = async (group) => {
        const res = await fetcher.updateLastSeenNotifications({[group]: newNotifications.lastUpdate});

        if(res.ok) {
            setNewNotifications(curSt => {
                const newState = {...curSt};
                newState.new[group] = 0;
                return newState;
            });

            setUser(curSt => {
                const newState = structuredClone(curSt);
                newState.settings.notifications.lastSeen[group] = newNotifications.lastUpdate;
                return newState;
            });
        }
    }

    const updateCTIApplications = async () => {
        const res = await fetcher.getUserCTIApplications();
        if(res.ok) setCtiApplications(res.data)
    }

    const getCTIApplication = (applicationName, supportGroup) => {
        let application = null;

        if(!applicationName) {
            if(!supportGroup) {
                application = ctiApplications;
            } else {
                application = ctiApplications.filter(application => 
                    application['support group'] === supportGroup
                );
            }
        } else {
            application = ctiApplications.find(application => 
                application.name === applicationName && (supportGroup? application['support group'] === supportGroup : true)
            );
        }

        return structuredClone(application);
    }

    const notifications = {
        ...newNotifications,
        groups
    };

    const value = {
        logIn,
        logOut,
        user,
        refresh,
        lastUserUpdate,
        notifications,
        hasNewNotifications,
        updateLastSeenNotifications,
        getCTIApplication,
        isLogged: !!fetcher.token && !!user
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;
export {UserContextProvider};
