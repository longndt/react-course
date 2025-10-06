import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create context
const AuthContext = createContext(undefined);

// Mock user database (for demo purposes)
const mockUsers = {
  'admin': {
    password: 'admin123',
    user: { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' }
  },
  'user': {
    password: 'user123',
    user: { id: 2, username: 'user', email: 'user@example.com', role: 'user' }
  },
};

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function with mock authentication
  const login = async (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user exists and password matches
        const mockUser = mockUsers[username];

        if (mockUser && mockUser.password === password) {
          const user = mockUser.user;
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          resolve();
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
