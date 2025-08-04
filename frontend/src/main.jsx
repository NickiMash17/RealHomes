import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MockAuthProvider } from './context/MockAuthContext.jsx'
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MockAuthProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </MockAuthProvider>
  </React.StrictMode>
)
