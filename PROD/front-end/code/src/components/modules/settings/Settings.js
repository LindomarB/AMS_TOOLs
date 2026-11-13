import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import modules from '../../../data/app/modules';
import UserContext from '../../context/userContext/UserContext';
import Page from '../../Interface/page/Page';
import Applications from './routes/ctiTool/applications/Applications';
import Accountables from './routes/account/accountables/Accountables';
import Password from './routes/account/password/Password';
import Profile from './routes/account/profile/Profile';
import Role from './routes/account/role/Role';
import Requests from './routes/account/requests/Requests';
import SupportGroups from './routes/ctiTool/supportGroups/SupportGroups';
import AwayMode from './routes/general/awayMode/AwayMode';
import Language from './routes/general/language/Language';
import About from './routes/about/About';
import RoutesMenu from '../../Interface/navigation/routesMenu/RoutesMenu';
import Tools from './routes/account/tools/Tools';
import NoDataFound from '../../Interface/noDataFound/NoDataFound';
import style from './Settings.module.css';

function Settings(props) {
    const userCtx = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const user = userCtx.user;
    const settings = modules('account settings');

    useEffect(() => {
        if(location.pathname === settings.path) {
            navigate(settings.getRoute('general').routes[0].path);
        }
    },[]);

    const isNotAdministrator = user.profile.role !== 'administrator';

    const defaultRoute = (
        <Route 
            index
            path='*'
            element={<NoDataFound icon='list'>Use the side menu to navigate between sections</NoDataFound>}
        />
    );

    return (
        <Page 
            doubleContainer
            rightContainer={{
                id: 'setting-container',
                className: style.settingContainer
            }}
        >
            <RoutesMenu user={user} routes={settings.routes}/>
            <>
                <Routes>
                    <Route path='general'>
                        {/* <Route 
                            path='away-mode'
                            element={<AwayMode user={user} refreshUser={userCtx.refresh}/>} 
                        /> */}
                        <Route 
                            path='language'
                            element={<Language user={user} refreshUser={userCtx.refresh}/>} 
                        />
                        {defaultRoute}
                    </Route>
                    <Route path='account'>
                        <Route 
                            path='tools'
                            element={<Tools user={user} refreshUser={userCtx.refresh}/>} 
                        />
                        {isNotAdministrator &&
                            <Route 
                                path='accountables'
                                element={<Accountables user={user} refreshUser={userCtx.refresh}/>} 
                            />
                        }
                        <Route 
                            path='password'
                            element={<Password user={user}/>} 
                        />
                        <Route 
                            path='profile'
                            element={<Profile user={user}/>} 
                        />
                        {/* <Route 
                            path='role'
                            element={<Role user={user} refreshUser={userCtx.refresh}/>} 
                        /> */}
                        {defaultRoute}
                    </Route>
                    {user.accesses.includes('cti tool') && 
                        <Route path='cti-tool'>
                            <Route 
                                path='applications'
                                element={<Applications user={user} refreshUser={userCtx.refresh}/>} 
                            />
                            <Route 
                                path='support-groups'
                                element={<SupportGroups user={user} refreshUser={userCtx.refresh}/>} 
                            />
                            {defaultRoute}
                        </Route>
                    }
                    <Route 
                        path='requests'
                        element={<Requests user={user}/>} 
                    />
                    <Route 
                        path='about'
                        element={<About/>} 
                    />
                    {defaultRoute}
                </Routes>
            </>
        </Page>
    );
}

export default Settings;