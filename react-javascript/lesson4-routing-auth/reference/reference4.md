# Reference - Routing & Authentication Quick Lookup

> **Purpose of this file**: Quick routing and auth syntax, patterns, copy-paste ready code. NO concept explanations.
>
> **Use Theory4 when you need**: Understanding WHY and HOW routing/auth works.

---

## Table of Contents

1. [React Router Setup](#react-router-setup)
2. [Basic Routing](#basic-routing)
3. [Navigation](#navigation)
4. [Route Parameters](#route-parameters)
5. [Protected Routes](#protected-routes)
6. [Auth Context Pattern](#auth-context-pattern)
7. [JWT Handling](#jwt-handling)
8. [Common Patterns](#common-patterns)

---

## React Router Setup

### Installation

```bash
npm install react-router-dom
```

### Basic Setup

```tsx
// src/main.tsx or src/index.tsx
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

## Basic Routing

### Simple Routes

```tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### Nested Routes with Layout

```tsx
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <nav>{/* Navigation */}</nav>
      <main>
        <Outlet />  {/* Child routes render here */}
      </main>
      <footer>{/* Footer */}</footer>
    </div>
  );
}
```

### Multiple Nested Levels

```tsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    
    <Route path="users" element={<UsersLayout />}>
      <Route index element={<UserList />} />
      <Route path=":id" element={<UserProfile />} />
      <Route path=":id/edit" element={<UserEdit />} />
    </Route>
  </Route>
</Routes>
```

---

## Navigation

### Link Component

```tsx
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

### NavLink (Active Styling)

```tsx
import { NavLink } from 'react-router-dom';

function Navigation() {
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

### Programmatic Navigation

```tsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
    
    // Navigate after action
    navigate('/dashboard');
    
    // Navigate with replace (no back button)
    navigate('/dashboard', { replace: true });
    
    // Navigate back
    navigate(-1);
    
    // Navigate forward
    navigate(1);
  };
  
  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

---

## Route Parameters

### URL Parameters

```tsx
// Route definition
<Route path="/users/:id" element={<UserProfile />} />
<Route path="/posts/:postId/comments/:commentId" element={<Comment />} />

// Component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  
  return <div>User ID: {id}</div>;
}

function Comment() {
  const { postId, commentId } = useParams<{ postId: string; commentId: string }>();
  
  return <div>Post: {postId}, Comment: {commentId}</div>;
}
```

### Query Parameters

```tsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get values
  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'name';
  
  // Set values
  const updateFilters = (newSearch: string) => {
    setSearchParams({ search: newSearch, page: '1', sort });
  };
  
  // Update single param
  const nextPage = () => {
    setSearchParams(prev => {
      prev.set('page', String(Number(page) + 1));
      return prev;
    });
  };
  
  return (
    <div>
      <input 
        value={search} 
        onChange={e => updateFilters(e.target.value)} 
      />
      <button onClick={nextPage}>Next Page</button>
    </div>
  );
}
```

### Location State

```tsx
import { useNavigate, useLocation } from 'react-router-dom';

// Pass state during navigation
function ProductList() {
  const navigate = useNavigate();
  
  const viewProduct = (product) => {
    navigate('/product/123', { 
      state: { from: '/products', product } 
    });
  };
}

// Access state in destination
function ProductDetail() {
  const location = useLocation();
  const { from, product } = location.state || {};
  
  return <div>Came from: {from}</div>;
}
```

---

## Protected Routes

### Basic Protected Route

```tsx
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### With Auth Context

```tsx
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}
```

### Role-Based Protection

```tsx
interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
}

// Usage
<Route path="/admin" element={
  <RoleProtectedRoute allowedRoles={['admin']}>
    <AdminPanel />
  </RoleProtectedRoute>
} />
```

### Remember Original Destination

```tsx
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}

// In Login component
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  const handleLogin = async () => {
    await login();
    navigate(from, { replace: true });
  };
}
```

---

## Auth Context Pattern

### Auth Context Setup

```tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser().then(setUser).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  
  const login = async (credentials: LoginCredentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const { token, user } = await response.json();
    localStorage.setItem('token', token);
    setUser(user);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  const isAuthenticated = user !== null;
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
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
```

### Using Auth Context

```tsx
// In App.tsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>{/* ... */}</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// In any component
function Dashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## JWT Handling

### Login with JWT

```tsx
async function login(credentials: { email: string; password: string }) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  const { token, user } = await response.json();
  
  // Store token
  localStorage.setItem('token', token);
  
  return { token, user };
}
```

### Axios Interceptor for JWT

```tsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Decode JWT

```bash
npm install jwt-decode
```

```tsx
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userId: number;
  email: string;
  role: string;
  exp: number;
}

function checkTokenExpiration() {
  const token = localStorage.getItem('token');
  
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const now = Date.now() / 1000;
    
    if (decoded.exp < now) {
      // Token expired
      localStorage.removeItem('token');
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}
```

---

## Common Patterns

### Loading State

```tsx
function App() {
  const { loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return <Routes>{/* ... */}</Routes>;
}
```

### Redirect After Login

```tsx
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleSubmit = async (credentials) => {
    await login(credentials);
    navigate(from, { replace: true });
  };
}
```

### Logout Confirmation

```tsx
function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

### Active Link Styling

```tsx
<NavLink
  to="/dashboard"
  className={({ isActive }) => 
    `nav-link ${isActive ? 'active' : ''}`
  }
>
  Dashboard
</NavLink>
```

### 404 Not Found

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  
  {/* Catch all unmatched routes */}
  <Route path="*" element={<NotFound />} />
</Routes>

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
```

---

## Quick Reference Table

| Hook/Component | Purpose |
|----------------|---------|
| `<BrowserRouter>` | Root router component |
| `<Routes>` | Container for routes |
| `<Route>` | Define path → component mapping |
| `<Link>` | Navigate without reload |
| `<NavLink>` | Link with active state |
| `<Navigate>` | Programmatic redirect |
| `<Outlet>` | Render child routes |
| `useNavigate()` | Get navigate function |
| `useParams()` | Get URL parameters |
| `useSearchParams()` | Get/set query strings |
| `useLocation()` | Get current location |

---

**For concepts and explanations**: See `theory4.md`  
**For practice**: See `lab4.md`
