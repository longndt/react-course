import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// User interface
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Mock user database (for demo purposes)
const mockUsers: Record<string, { password: string; user: User }> = {
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
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
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
  const login = async (username: string, password: string): Promise<void> => {
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

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
