import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Auth0Provider } from "@auth0/auth0-react"
import { MantineProvider } from '@mantine/core'; // Import MantineProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-yw3o8hhq24xtipij.us.auth0.com'
      clientId='aQ0jwHG3mB0pty0DzIJpAYOKCLEwPcAo'
      authorizationParams={{
        redirect_uri: "https://realhomes-estate.vercel.app"
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
)
