# Theory - Routing & Authentication

---

##  Table of Contents

1. [Core Concepts](#1-core-concepts)
2. [React Router Fundamentals](#2-react-router-fundamentals)
3. [Navigation Components](#3-navigation-components)
4. [Route Parameters & Query Strings](#4-route-parameters--query-strings)
5. [Nested Routes & Layouts](#5-nested-routes--layouts)
6. [Protected Routes](#6-protected-routes)
7. [Authentication Fundamentals](#7-authentication-fundamentals)
8. [JWT Authentication](#8-jwt-authentication)
9. [Auth Context & State Management](#9-auth-context--state-management)
10. [Login & Registration Flow](#10-login--registration-flow)
11. [Role-Based Access Control (RBAC)](#11-role-based-access-control-rbac)
12. [Session Management](#12-session-management)
13. [Security Best Practices](#13-security-best-practices)
14. [Common Authentication Patterns](#14-common-authentication-patterns)
15. [Debugging Auth Issues](#15-debugging-auth-issues)

---

## 1. Core Concepts

### Why Client-Side Routing?

**Traditional Multi-Page Applications:**
- Each link causes full page reload
- Server sends entire HTML page
- Slow user experience
- State is lost between pages

**Single-Page Applications (SPA) with Routing:**
- No page reloads, instant navigation
- Only content changes, not entire page
- Smooth, app-like experience
- State persists across navigation

**Real-World Benefits:**
```
Traditional: Click → Server Request → Full Page Load (2-3s)
React Router: Click → Update DOM → Instant (< 100ms)
```

### Understanding React Router

**React Router v6** is the standard routing library for React applications.

**Key Components:**
- `BrowserRouter` - Router using HTML5 history API
- `Routes` - Container for all route definitions
- `Route` - Individual route configuration
- `Link` / `NavLink` - Navigation components
- `Navigate` - Programmatic navigation
- `Outlet` - Placeholder for nested routes

---

## 2. React Router Fundamentals

### Installation and Setup

```bash
npm install react-router-dom
```

### Basic Router Configuration

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Navigation Components

**Link Component:**
```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

**NavLink Component (with active styling):**
```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? 'active-link' : 'normal-link'
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'blue'
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      await loginUser(credentials);
      navigate('/dashboard'); // Navigate after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <form onSubmit={handleLogin}>
      {/* form fields */}
      <button type="submit">Login</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}
```

---

## 3. Route Parameters & Query Strings

### Dynamic Routes with Parameters

```jsx
// Route definition
<Route path="/user/:id" element={<UserProfile />} />
<Route path="/posts/:category/:id" element={<PostDetail />} />

// Accessing parameters
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  
  return <div>User ID: {id}</div>;
}

function PostDetail() {
  const { category, id } = useParams();
  
  return (
    <div>
      <h1>Post {id} in {category}</h1>
    </div>
  );
}
```

### Query String Parameters

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  
  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: '1' });
  };
  
  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <p>Page: {page}</p>
    </div>
  );
}

// URL: /search?q=react&page=2
```

---

## 4. Nested Routes & Layouts

### Layout Components

```jsx
// Layout.jsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="app-layout">
      <header>
        <h1>My App</h1>
        <Navigation />
      </header>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

// App.jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Nested Route Structure

```jsx
// Complex nested routes
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="dashboard" element={<Dashboard />}>
      <Route index element={<DashboardHome />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
    </Route>
    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<UserManagement />} />
    </Route>
  </Route>
</Routes>
```

---

## 5. Protected Routes

### Basic Protected Route Component

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isAuthenticated={user}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Advanced Protected Route with Redirect

```jsx
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, isAuthenticated, requiredRole }) {
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}
```

---

## 6. Authentication Fundamentals

### What is Authentication?

**Authentication** verifies who a user is, while **Authorization** determines what they can do.

**Common Authentication Methods:**
- Username/Password
- Social Login (Google, Facebook, GitHub)
- Multi-Factor Authentication (MFA)
- Biometric authentication
- Single Sign-On (SSO)

### Authentication Flow

```
1. User enters credentials
2. Frontend sends to backend
3. Backend validates credentials
4. Backend returns JWT token
5. Frontend stores token
6. Frontend includes token in API requests
7. Backend validates token for protected routes
```

---

## 7. JWT Authentication

### What is JWT?

**JSON Web Token (JWT)** is a compact, URL-safe way to represent claims between parties.

**JWT Structure:**
```
header.payload.signature
```

**Example JWT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### JWT Implementation

```jsx
// auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
```

### Token Storage

```jsx
// tokenStorage.js
const TOKEN_KEY = 'auth_token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = jwt.decode(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};
```

---

## 8. Auth Context & State Management

### Authentication Context

```jsx
// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken, isTokenValid } from './tokenStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = getToken();
    if (token && isTokenValid(token)) {
      const userData = jwt.decode(token);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const { token, user } = await response.json();
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Using Auth Context

```jsx
// App.jsx
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* routes */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// LoginForm.jsx
import { useAuth } from './contexts/AuthContext';

function LoginForm() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

---

## 9. Login & Registration Flow

### Login Component

```jsx
import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Registration Component

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

---

## 10. Role-Based Access Control (RBAC)

### User Roles and Permissions

```jsx
// roles.js
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
};

export const PERMISSIONS = {
  READ_USERS: 'read:users',
  WRITE_USERS: 'write:users',
  DELETE_USERS: 'delete:users',
  READ_POSTS: 'read:posts',
  WRITE_POSTS: 'write:posts',
  DELETE_POSTS: 'delete:posts'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.READ_USERS,
    PERMISSIONS.WRITE_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.READ_POSTS,
    PERMISSIONS.WRITE_POSTS,
    PERMISSIONS.DELETE_POSTS
  ],
  [ROLES.MODERATOR]: [
    PERMISSIONS.READ_USERS,
    PERMISSIONS.READ_POSTS,
    PERMISSIONS.WRITE_POSTS,
    PERMISSIONS.DELETE_POSTS
  ],
  [ROLES.USER]: [
    PERMISSIONS.READ_POSTS,
    PERMISSIONS.WRITE_POSTS
  ]
};
```

### Permission Checking

```jsx
// usePermissions.js
import { useAuth } from './contexts/AuthContext';
import { ROLE_PERMISSIONS } from './roles';

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  return {
    hasPermission,
    hasRole,
    hasAnyRole
  };
}

// Usage
function UserManagement() {
  const { hasPermission } = usePermissions();

  if (!hasPermission('read:users')) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      {/* User management UI */}
    </div>
  );
}
```

---

## 11. Session Management

### Token Refresh

```jsx
// useTokenRefresh.js
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';

export function useTokenRefresh() {
  const { user, login } = useAuth();

  useEffect(() => {
    if (!user) return;

    const refreshToken = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });

        if (response.ok) {
          const { token } = await response.json();
          setToken(token);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    };

    // Refresh token every 30 minutes
    const interval = setInterval(refreshToken, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user]);
}
```

### Auto Logout on Token Expiry

```jsx
// useAutoLogout.js
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';

export function useAutoLogout() {
  const { logout } = useAuth();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = getToken();
      if (token && !isTokenValid(token)) {
        logout();
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60000);
    
    return () => clearInterval(interval);
  }, [logout]);
}
```

---

## 12. Security Best Practices

### Secure Token Storage

```jsx
// Secure token storage with httpOnly cookies (preferred)
// Backend sets httpOnly cookie
app.post('/api/auth/login', (req, res) => {
  const token = generateToken(user);
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
  res.json({ user });
});

// Frontend doesn't need to handle token storage
```

### Input Validation

```jsx
// Frontend validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[0-9]/.test(password);
};

// Always validate on backend too!
```

### CORS Configuration

```javascript
// Backend CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 13. Common Authentication Patterns

### Higher-Order Component for Auth

```jsx
// withAuth.jsx
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function withAuth(WrappedComponent, requiredRole = null) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const AdminPanel = withAuth(AdminPanel, 'admin');
```

### Custom Hook for Route Protection

```jsx
// useRouteGuard.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export function useRouteGuard(requiredRole = null) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      navigate('/unauthorized', { replace: true });
    }
  }, [isAuthenticated, user, requiredRole, navigate, location]);
}

// Usage in component
function AdminPage() {
  useRouteGuard('admin');
  
  return <div>Admin content</div>;
}
```

---

## 14. Debugging Auth Issues

### Common Problems and Solutions

**Problem: Token not being sent with requests**
```jsx
// Solution: Add token to axios interceptor
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Problem: User logged out unexpectedly**
```jsx
// Solution: Check token expiry
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};
```

**Problem: Redirect loop after login**
```jsx
// Solution: Use replace instead of push
navigate('/dashboard', { replace: true });
```

### Debugging Tools

```jsx
// Auth debug component
function AuthDebug() {
  const { user, isAuthenticated } = useAuth();
  const token = getToken();

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, background: 'white', padding: '10px' }}>
      <h4>Auth Debug</h4>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <p>User: {user ? user.name : 'None'}</p>
      <p>Token: {token ? 'Present' : 'Missing'}</p>
      <p>Token Valid: {isTokenValid(token) ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

---

## Summary

**Routing Fundamentals:**
- React Router v6 provides declarative routing for SPAs
- Use `BrowserRouter`, `Routes`, `Route` for basic routing
- `Link` and `NavLink` for navigation
- `useNavigate` for programmatic navigation
- `useParams` and `useSearchParams` for dynamic routes

**Authentication Patterns:**
- JWT tokens for stateless authentication
- Context API for global auth state management
- Protected routes with redirect logic
- Role-based access control (RBAC)
- Secure token storage and refresh

**Security Best Practices:**
- Validate input on both frontend and backend
- Use httpOnly cookies when possible
- Implement proper CORS configuration
- Handle token expiry gracefully
- Use HTTPS in production

**Common Patterns:**
- Higher-Order Components for route protection
- Custom hooks for reusable auth logic
- Centralized error handling
- Automatic token refresh
- Debug tools for development

**Key Takeaways:**
- Authentication is about verifying identity
- Authorization controls access to resources
- Always validate on the backend
- Use secure storage methods
- Handle edge cases and errors gracefully
- Test authentication flows thoroughly

---

---

---