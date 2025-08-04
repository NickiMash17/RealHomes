import React, { createContext, useContext, useState, useEffect } from 'react';

const MockAuthContext = createContext();

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};

export const MockAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const loginWithRedirect = async () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const mockUser = {
        sub: 'mock-user-id',
        name: 'Demo User',
        email: 'demo@realhomes.com',
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email_verified: true
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mockUser');
  };

  const getAccessTokenSilently = async () => {
    // Return a mock token
    return 'mock-access-token-' + Date.now();
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}; 