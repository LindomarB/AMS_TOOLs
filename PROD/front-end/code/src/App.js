import React, { useContext, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Portal from './components/pages/portal/Portal';
import AMSTools from './components/pages/amsTools/AMSTools';
import UserContext from './components/context/userContext/UserContext';
import FetcherContext from './components/context/fetcherContext/FetcherContext';
// import ComponentsLibrary from './components/modules/developer/componentsLibrary/ComponentsLibary';
import modules from './data/app/modules';

function App() {
  const fetcher = useContext(FetcherContext);
  const userCtx = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const goingToRoute = useRef(null);

  useEffect(() => {
    if(location.pathname === '/portal/reset-password') {
      userCtx.logOut();
    } else if(fetcher.token) {
      userCtx.logIn();
    }  

    goingToRoute.current = modules(location.pathname)? `${location.pathname}${location.search || ''}` : modules('home').path;
  }, []);

  useEffect(() => {
    if(location.pathname === '/portal/reset-password') {
      return;
    } 

    if(userCtx.isLogged) {
      if(
          !goingToRoute.current || 
          goingToRoute.current.split('/')[1] === 'portal' ||
          !modules(goingToRoute.current).userHaveAccess(userCtx.user)
        ) {
        navigate(modules('home').path);
        return;
      } else {
        navigate(goingToRoute.current);
      }

      goingToRoute.current = null;
    } else if(!fetcher.token) {
      navigate('portal');
    }
  }, [userCtx.isLogged, fetcher.token]);

  return (
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='portal/*' element={<Portal />} />
      {userCtx.isLogged &&
        <Route path='/*' element={<AMSTools />} />
      }
      {/* <Route path={'components-library'} element={<ComponentsLibrary />} /> */}
    </Routes>
  );
}

export default App;
