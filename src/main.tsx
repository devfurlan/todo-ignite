import React from 'react';
import ReactDOM from 'react-dom/client';
import {Index} from './pages/Index';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Index/>
  </React.StrictMode>
);
