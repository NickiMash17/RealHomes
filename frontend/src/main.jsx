import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MockAuthProvider } from './context/MockAuthContext.jsx'

// Force light mode on mount - prevent any dark mode
if (typeof document !== 'undefined') {
  // Set color scheme immediately
  document.documentElement.style.colorScheme = 'light only';
  document.documentElement.classList.remove('dark');
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.color = '#111827';
  
  // Prevent any dark mode class from being added
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
  
  // Also watch for style changes
  const styleObserver = new MutationObserver(() => {
    if (document.documentElement.style.colorScheme !== 'light only') {
      document.documentElement.style.colorScheme = 'light only';
    }
  });
  
  styleObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style']
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MockAuthProvider>
      <App />
    </MockAuthProvider>
  </React.StrictMode>
)
