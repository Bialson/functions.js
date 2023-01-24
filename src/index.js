import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/themeSwitcher';
import App from './App';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);