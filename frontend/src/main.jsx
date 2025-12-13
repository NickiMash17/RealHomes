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
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.color = '#111827';
  
  // Remove any existing dark mode classes from all elements
  const removeDarkMode = () => {
    document.querySelectorAll('[class*="dark"]').forEach(el => {
      el.classList.remove('dark');
    });
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
  };
  
  removeDarkMode();
  
  // Prevent any dark mode class from being added
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        removeDarkMode();
      }
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.classList) {
            node.classList.remove('dark');
          }
        });
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
    childList: true,
    subtree: true
  });
  
  // Also watch for style changes
  const styleObserver = new MutationObserver(() => {
    if (document.documentElement.style.colorScheme !== 'light only') {
      document.documentElement.style.colorScheme = 'light only';
    }
    removeDarkMode();
  });
  
  styleObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style']
  });
  
  // Remove any theme toggle buttons that might be injected
  const removeThemeToggle = () => {
    const toggles = document.querySelectorAll('[class*="theme"], [class*="dark"], [aria-label*="theme"], [aria-label*="dark"], button[title*="dark"], button[title*="theme"]');
    toggles.forEach(toggle => {
      const text = toggle.textContent?.toLowerCase() || '';
      const ariaLabel = toggle.getAttribute('aria-label')?.toLowerCase() || '';
      const title = toggle.getAttribute('title')?.toLowerCase() || '';
      if (text.includes('dark') || text.includes('theme') || ariaLabel.includes('dark') || ariaLabel.includes('theme') || title.includes('dark') || title.includes('theme')) {
        toggle.remove();
      }
    });
  };
  
  // Run immediately and periodically
  removeThemeToggle();
  setInterval(removeThemeToggle, 1000);
  
  // Watch for new elements being added
  const bodyObserver = new MutationObserver(() => {
    removeThemeToggle();
    removeDarkMode();
  });
  
  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MockAuthProvider>
      <App />
    </MockAuthProvider>
  </React.StrictMode>
)
