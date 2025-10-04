# Quick Start Guide - Lesson 4: Routing & Authentication

## Table of Contents
1. [React Router Setup](#1-react-router-setup)
2. [Basic Routing](#2-basic-routing)
3. [Authentication System](#3-authentication-system)
4. [Protected Routes](#4-protected-routes)
5. [Advanced Routing](#5-advanced-routing)
6. [Advanced Patterns](#6-advanced-patterns)
7. [Complete Examples](#7-complete-examples)

---

## 1. React Router Setup

### Install Dependencies

```bash
npm install react-router-dom
npm install jwt-decode # For JWT token handling
```

### Basic App Structure with Router

```tsx
// src/main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

## 2. Basic Routing

### Simple Routes Setup

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
```

### Navigation Links

```tsx
// src/components/Navbar.tsx
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'font-bold underline' : 'hover:underline'
          }
        >
          Home
        </NavLink>
        
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'font-bold underline' : 'hover:underline'
          }
        >
          About
        </NavLink>
        
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'font-bold underline' : 'hover:underline'
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
```

### Route Parameters

```tsx
// src/App.tsx
<Route path="/users/:id" element={<UserProfile />} />

// src/pages/UserProfile.tsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
    </div>
  );
}

export default UserProfile;
```

### Query Parameters

```tsx
// src/pages/SearchResults.tsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <p>Page: {page}</p>
      
      <button
        onClick={() => setSearchParams({ q: query!, page: String(Number(page) + 1) })}
      >
        Next Page
      </button>
    </div>
  );
}

export default SearchResults;
```

### Programmatic Navigation

```tsx
// src/pages/LoginSuccess.tsx
import { useNavigate } from 'react-router-dom';

function LoginSuccess() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goBack = () => {
    navigate(-1); // Go back one step
  };

  return (
    <div>
      <h1>Login Successful!</h1>
      <button onClick={goToDashboard}>Go to Dashboard</button>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default LoginSuccess;
```

### Nested Routes

```tsx
// src/App.tsx
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

// src/layouts/DashboardLayout.tsx
import { Outlet, Link } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          <Link to="/dashboard">Dashboard Home</Link>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/dashboard/settings">Settings</Link>
        </nav>
      </aside>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}

export default DashboardLayout;
```

---

## 3. Authentication System

### Authentication Context

```tsx
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Call your authentication API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### Login Component

```tsx
// src/pages/Login.tsx
import { useState } from 'react';
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

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
```

### Register Component

```tsx
// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
```

---

## 4. Protected Routes

### Basic Protected Route Component

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
```

### Role-Based Access Control

```tsx
// src/components/RoleProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: ('user' | 'admin')[];
}

function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

export default RoleProtectedRoute;

// Usage in App.tsx:
<Route
  path="/admin"
  element={
    <RoleProtectedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </RoleProtectedRoute>
  }
/>
```

### Using Protected Routes in App

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
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
            <RoleProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
```

---

## 5. Advanced Routing

### Lazy Loading Routes

```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

export default App;
```

### 404 Not Found Page

```tsx
// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

// In App.tsx:
<Route path="*" element={<NotFound />} />
```

### Redirect After Login

```tsx
// src/pages/Login.tsx - Enhanced version
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user tried to visit before login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async () => {
    const success = await login(email, password);
    
    if (success) {
      // Redirect to the page they tried to visit, or dashboard
      navigate(from, { replace: true });
    }
  };

  // ... rest of component
}
```

---

## 6. Advanced Patterns

### Higher-Order Component (HOC) for Authentication

```tsx
// src/hocs/withAuth.tsx
import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function withAuth<P extends object>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
}

export default withAuth;

// Usage:
import withAuth from '../hocs/withAuth';

function Dashboard() {
  return <div>Dashboard Content</div>;
}

export default withAuth(Dashboard);
```

### Custom Hook for Form Handling

```tsx
// src/hooks/useForm.ts
import { useState, ChangeEvent, FormEvent } from 'react';

interface UseFormReturn<T> {
  values: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (callback: () => void) => (e: FormEvent) => void;
  reset: () => void;
}

function useForm<T>(initialValues: T): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (callback: () => void) => (e: FormEvent) => {
    e.preventDefault();
    callback();
  };

  const reset = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleSubmit, reset };
}

export default useForm;

// Usage in Login component:
function Login() {
  const { values, handleChange, handleSubmit } = useForm({
    email: '',
    password: '',
  });

  const onSubmit = async () => {
    await login(values.email, values.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Compound Components Pattern

```tsx
// src/components/Tabs.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function Tabs({ children, defaultTab }: { children: ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="flex border-b">{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 ${isActive ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;

  if (activeTab !== id) return null;

  return <div>{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;

// Usage:
function Settings() {
  return (
    <Tabs defaultTab="profile">
      <Tabs.List>
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
        <Tabs.Tab id="security">Security</Tabs.Tab>
        <Tabs.Tab id="notifications">Notifications</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panels>
        <Tabs.Panel id="profile">
          <h2>Profile Settings</h2>
        </Tabs.Panel>
        <Tabs.Panel id="security">
          <h2>Security Settings</h2>
        </Tabs.Panel>
        <Tabs.Panel id="notifications">
          <h2>Notification Settings</h2>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

---

## 7. Complete Examples

### Complete Authentication Flow

```tsx
// src/main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

// src/App.tsx - Complete routing setup
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import Users from './pages/Users';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
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
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        
        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </RoleProtectedRoute>
          }
        />
        
        <Route
          path="/admin/users"
          element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <Users />
            </RoleProtectedRoute>
          }
        />
        
        {/* Error pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

### Layout with Navigation

```tsx
// src/layouts/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

// src/components/Navbar.tsx - With Auth
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'font-bold' : '')}
          >
            Home
          </NavLink>
          
          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'font-bold' : '')}
              >
                Dashboard
              </NavLink>
              
              {user.role === 'admin' && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? 'font-bold' : '')}
                >
                  Admin
                </NavLink>
              )}
            </>
          )}
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <Link to="/profile">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

---

## Quick Reference Commands

```bash
# Install React Router
npm install react-router-dom

# Install JWT handling
npm install jwt-decode

# Install TypeScript types (if needed)
npm install --save-dev @types/react-router-dom
```

---

## Common Patterns Summary

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| **Basic Routing** | Page navigation | `<Route path="/about" element={<About />} />` |
| **Protected Routes** | Authentication required | `<ProtectedRoute><Dashboard /></ProtectedRoute>` |
| **Role-Based Access** | Authorization | `<RoleProtectedRoute allowedRoles={['admin']}>` |
| **Nested Routes** | Layouts with sub-pages | Use `<Outlet />` in parent component |
| **Lazy Loading** | Code splitting | `lazy(() => import('./Page'))` |
| **Programmatic Nav** | Navigate from code | `navigate('/dashboard')` |
| **URL Parameters** | Dynamic routes | `useParams()` hook |
| **Query Parameters** | Search/filters | `useSearchParams()` hook |

---

**🎯 You now have all the code patterns for building authenticated React applications with routing!**
