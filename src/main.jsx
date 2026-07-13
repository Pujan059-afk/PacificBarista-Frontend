import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

window.addEventListener('error', (e) => {
  document.getElementById('app').innerHTML =
    '<pre style="color:red;padding:2rem;white-space:pre-wrap;">' +
    'ERROR: ' + e.message + '\nFile: ' + e.filename + '\nLine: ' + e.lineno + '\nCol: ' + e.colno +
    (e.error ? '\n\nStack: ' + e.error.stack : '') +
    '</pre>';
});

window.addEventListener('unhandledrejection', (e) => {
  document.getElementById('app').innerHTML =
    '<pre style="color:red;padding:2rem;white-space:pre-wrap;">' +
    'UNHANDLED PROMISE REJECTION: ' + (e.reason?.message || e.reason || 'Unknown') +
    (e.reason?.stack ? '\n\nStack: ' + e.reason.stack : '') +
    '</pre>';
});

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
