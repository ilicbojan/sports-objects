import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import { BrowserRouter } from 'react-router-dom';

// ! added for history object in all components
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
