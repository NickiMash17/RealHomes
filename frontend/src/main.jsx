import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MockAuthProvider } from './context/MockAuthContext.jsx'

// Force light mode on mount - prevent any dark mode
if (typeof document !== 'undefined') {
  // Set color scheme immediately - BEFORE React renders
  document.documentElement.style.colorScheme = 'light only';
  document.documentElement.classList.remove('dark');
  if (document.body) {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#111827';
  }
  
  // Simple function to remove dark class only (not classes containing "dark")
  const removeDarkClass = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
  };
  
  removeDarkClass();
  
  // Lightweight observer - only watch html element for dark class
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        removeDarkClass();
      }
    });
  });
  
  // Only observe the html element, not the entire tree
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
  
  // Ensure color scheme stays light
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
