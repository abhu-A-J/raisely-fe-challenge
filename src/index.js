import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import App from './App';

const ALERT_CONFIG_OPTIONS = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}


ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...ALERT_CONFIG_OPTIONS}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

