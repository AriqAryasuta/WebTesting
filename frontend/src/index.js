import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/loading.css'
import App from './App';

import reportWebVitals from './reportWebVitals';

import DisplayContextProvider from './context/DisplayContext';
import FacilitesContextProvider from './context/FacilityContext';
import CategoriesContextProvider from './context/CategoryContext';
import AuthContextProvider from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <DisplayContextProvider>
      <AuthContextProvider>
        <CategoriesContextProvider>
          <FacilitesContextProvider>
            <App />
          </FacilitesContextProvider>
        </CategoriesContextProvider>
      </AuthContextProvider>
    </DisplayContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
