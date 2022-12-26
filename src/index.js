import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './app/store';
import { StateContext } from './context/StateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <StateContext>
        <App />
      </StateContext>
    </Provider>
  </BrowserRouter>,
);
