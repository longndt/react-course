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

```tsx
// App.tsx
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
```tsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

**NavLink with Active Styling:**
```tsx
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? 'blue' : 'black'
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

### URL Parameters

**Dynamic Routes:**
```tsx
// Define route with parameter
<Route path="/users/:userId" element={<UserProfile />} />
<Route path="/products/:category/:productId" element={<Product />} />

// Access parameters in component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();

  return <div>User ID: {userId}</div>;
}

function Product() {
  const { category, productId } = useParams();

  return (
    <div>
      <p>Category: {category}</p>
      <p>Product: {productId}</p>
    </div>
  );
}
```

### Query Parameters

```tsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get query parameters
  const query = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'date';

  // Update query parameters
  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: '1', sort });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: query, page: String(newPage), sort });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <p>Results for: {query}</p>
      <p>Page: {page}</p>
      <button onClick={() => handlePageChange(Number(page) + 1)}>
        Next Page
      </button>
    </div>
  );
}

// URL: /search?q=react&page=2&sort=date
```

### Programmatic Navigation

```tsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... login logic

    // Navigate after successful login
    navigate('/dashboard');

    // Navigate with replace (no back button)
    navigate('/dashboard', { replace: true });

    // Navigate with state
    navigate('/profile', { state: { from: 'login' } });

    // Go back
    navigate(-1);

    // Go forward
    navigate(1);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Nested Routes and Layouts

**Shared Layout Pattern:**
```tsx
import { Outlet } from 'react-router-dom';

// Layout component
function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        <Header />
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}

// App routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Nested routes with shared layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// URLs:
// /dashboard → Shows DashboardLayout + DashboardHome
// /dashboard/profile → Shows DashboardLayout + Profile
// /dashboard/settings → Shows DashboardLayout + Settings
```

---

## 3. Authentication Fundamentals

### What is Authentication?

**Authentication** = Verifying who you are
**Authorization** = Verifying what you can access

**Common Authentication Flow:**
```
1. User enters credentials (email, password)
2. Frontend sends to backend API
3. Backend validates credentials
4. Backend generates JWT token
5. Frontend stores token
6. Frontend sends token with each request
7. Backend verifies token for protected resources
```

### JWT (JSON Web Token)

**What is JWT?**
- Secure token format for authentication
- Contains user information (payload)
- Cryptographically signed by server
- Can be verified without database lookup

**JWT Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header.Payload.Signature
```

**Decoded JWT Payload:**
```json
{
  "sub": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}
```

### Token Storage Options

**1. localStorage (Common, Simple):**
```tsx
// Store token
localStorage.setItem('auth_token', token);

// Retrieve token
const token = localStorage.getItem('auth_token');

// Remove token
localStorage.removeItem('auth_token');

// Pros: Simple, persists across tabs
// Cons: Vulnerable to XSS attacks
```

**2. sessionStorage (Session-Only):**
```tsx
// Similar to localStorage but cleared when tab closes
sessionStorage.setItem('auth_token', token);
const token = sessionStorage.getItem('auth_token');

// Pros: Auto-clears on tab close
// Cons: Lost when user closes tab, still vulnerable to XSS
```

**3. HttpOnly Cookies (Most Secure):**
```tsx
// Set by server (cannot be accessed by JavaScript)
// Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict

// Pros: XSS protection, CSRF protection with SameSite
// Cons: Requires server configuration, more complex
```

---

## 4. Authentication Implementation

### Auth Context Setup

```tsx
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      verifyToken(token)
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('auth_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { token, user } = await response.json();
    localStorage.setItem('auth_token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Helper function
async function verifyToken(token: string): Promise<User> {
  const response = await fetch('/api/auth/verify', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Token verification failed');

  return response.json();
}
```

### Protected Routes

**Basic Protected Route:**
```tsx
// components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login, save intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
```

**Role-Based Protected Route:**
```tsx
interface RoleProtectedRouteProps {
  children: ReactNode;
  requiredRole: 'user' | 'admin';
}

function RoleProtectedRoute({ children, requiredRole }: RoleProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
```

### Login Component

```tsx
// pages/Login.tsx
import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);

      // Redirect to intended destination or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
```

### Complete App with Auth

```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes (any authenticated user) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/admin"
            element={
              <RoleProtectedRoute requiredRole="admin">
                <AdminPanel />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

---

## 5. Advanced Patterns

### Token Refresh Mechanism

```tsx
// hooks/useTokenRefresh.ts
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import jwtDecode from 'jwt-decode';

export function useTokenRefresh() {
  const { logout } = useAuth();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const expiresIn = decoded.exp * 1000 - Date.now();

        // Refresh if expires in less than 5 minutes
        if (expiresIn < 5 * 60 * 1000) {
          const response = await fetch('/api/auth/refresh', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const { token: newToken } = await response.json();
            localStorage.setItem('auth_token', newToken);
          } else {
            logout();
          }
        }

        // Set timer to check again
        const timer = setTimeout(checkAndRefreshToken, 60 * 1000);
        return () => clearTimeout(timer);
      } catch {
        logout();
      }
    };

    checkAndRefreshToken();
  }, [logout]);
}
```

### API Request Interceptor

```tsx
// utils/api.ts
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  // Handle unauthorized
  if (response.status === 401) {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

// Usage
const users = await apiRequest<User[]>('/api/users');
```

### Higher-Order Component (HOC) Pattern

```tsx
// hoc/withAuth.tsx
import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function withAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
}

export default withAuth;

// Usage
const ProtectedDashboard = withAuth(Dashboard);
<Route path="/dashboard" element={<ProtectedDashboard />} />
```

---

## 6. Security Best Practices

### Input Validation

```tsx
interface LoginFormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

function validateLoginForm(data: LoginFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
}

// In component
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  const errors = validateLoginForm({ email, password });

  if (Object.keys(errors).length > 0) {
    setValidationErrors(errors);
    return;
  }

  // Proceed with login
  login(email, password);
};
```

### HTTPS and Secure Cookies

```tsx
// Production configuration
const API_URL = import.meta.env.PROD
  ? 'https://api.example.com'  // Use HTTPS in production
  : 'http://localhost:3000';

// Cookie security settings (server-side)
res.cookie('token', token, {
  httpOnly: true,     // Cannot be accessed by JavaScript
  secure: true,       // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

### XSS Protection

```tsx
//  Dangerous: Direct HTML injection
function UserProfile({ bio }: { bio: string }) {
  return <div dangerouslySetInnerHTML={{ __html: bio }} />;
}

//  Safe: React automatically escapes content
function UserProfile({ bio }: { bio: string }) {
  return <div>{bio}</div>;
}

// If HTML is needed, sanitize it first
import DOMPurify from 'dompurify';

function UserProfile({ bio }: { bio: string }) {
  const sanitizedBio = DOMPurify.sanitize(bio);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedBio }} />;
}
```

---

## 7. Common Pitfalls and Solutions

### Problem 1: Full Page Reload

**Issue:**
```tsx
//  Wrong: Causes full page reload
<a href="/dashboard">Dashboard</a>
```

**Solution:**
```tsx
//  Correct: Client-side navigation
import { Link } from 'react-router-dom';
<Link to="/dashboard">Dashboard</Link>
```

### Problem 2: Protected Route Flashing

**Issue:** User briefly sees protected content before redirect

**Solution:**
```tsx
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
```

### Problem 3: Token Expiration

**Issue:** User suddenly logged out

**Solution:**
```tsx
// Implement token refresh before expiration
useEffect(() => {
  const interval = setInterval(async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = jwtDecode<{ exp: number }>(token);
      const timeUntilExpiry = decoded.exp * 1000 - Date.now();

      // Refresh if expires in < 5 minutes
      if (timeUntilExpiry < 5 * 60 * 1000) {
        await refreshToken();
      }
    }
  }, 60 * 1000); // Check every minute

  return () => clearInterval(interval);
}, []);
```

### Problem 4: Lost State After Refresh

**Issue:** Auth state lost on page reload

**Solution:**
```tsx
// Restore auth state on app initialization
useEffect(() => {
  const initializeAuth = async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const user = await verifyToken(token);
        setUser(user);
      } catch {
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  };

  initializeAuth();
}, []);
```

---

## Summary

**React Router Core Concepts:**
- Client-side routing eliminates full page reloads
- BrowserRouter provides routing context
- Routes and Route define path-to-component mapping
- Link and NavLink enable declarative navigation
- useNavigate for programmatic navigation
- useParams for URL parameters
- useSearchParams for query strings
- Nested routes with Outlet for shared layouts

**Authentication Essentials:**
- JWT tokens for secure, stateless authentication
- AuthContext for global auth state management
- Protected routes to restrict access
- Token storage (localStorage, sessionStorage, or HttpOnly cookies)
- Login/logout flows with proper redirects
- Token refresh for persistent sessions
- Role-based access control (RBAC)

**Security Best Practices:**
- Always validate on server, not just client
- Use HTTPS in production
- Sanitize user inputs to prevent XSS
- Store tokens securely (HttpOnly cookies preferred)
- Implement CSRF protection with SameSite cookies
- Use strong password requirements
- Add rate limiting to prevent brute force attacks

**Advanced Patterns:**
- Higher-Order Components (HOC) for reusable auth logic
- Custom hooks (useAuth, useTokenRefresh) for encapsulation
- API request interceptors for automatic token injection
- Centralized error handling for 401/403 responses

