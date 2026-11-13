import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './components/context/appContext/AppContext';
import { FetcherContextProvider } from './components/context/fetcherContext/FetcherContext';
import { UserContextProvider } from './components/context/userContext/UserContext';
import { ModalContextProvider } from './components/context/modalContext/ModalContext';

const root = ReactDOM.createRoot(.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <FetcherContextProvider>
        <UserContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </UserContextProvider>
      </FetcherContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);

