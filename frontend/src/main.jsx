import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MockAuthProvider } from './context/MockAuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MockAuthProvider>
      <App />
    </MockAuthProvider>
  </React.StrictMode>
)
