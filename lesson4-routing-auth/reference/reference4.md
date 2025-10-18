# Reference - Routing & Authentication

> **Quick reference guide for React Router and authentication**

## Table of Contents
1. [Why Routing & Authentication?](#why-routing--authentication)
2. [React Router Fundamentals](#react-router-fundamentals)
3. [Navigation & Links](#navigation--links)
4. [Route Parameters & Query Strings](#route-parameters--query-strings)
5. [Authentication Concepts](#authentication-concepts)
6. [JWT Tokens](#jwt-tokens)
7. [Protected Routes](#protected-routes)
8. [Context API for Auth](#context-api-for-auth)
9. [Common Patterns](#common-patterns)

---

## Why Routing & Authentication?

### Single Page Applications (SPAs)
- **Client-side routing** - No page refreshes
- **Multiple views** in one application
- **URL-based navigation** - Bookmarkable pages
- **Better user experience** - Faster navigation

### Authentication in SPAs
- **User sessions** - Login/logout functionality
- **Protected content** - User-specific data
- **Security** - Prevent unauthorized access
- **State management** - User context across routes

---

## React Router Fundamentals

### Setup
```bash
npm install react-router-dom
npm install @types/react-router-dom  # TypeScript
```

### Basic Setup
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Router Types
```tsx
// BrowserRouter - Uses HTML5 history API
<BrowserRouter>
  <App />
</BrowserRouter>

// HashRouter - Uses hash (#) in URL
<HashRouter>
  <App />
</HashRouter>

// MemoryRouter - For testing
<MemoryRouter>
  <App />
</MemoryRouter>
```

---

## Navigation & Links

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

### NavLink Component
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
        className={({ isActive }) => isActive ? 'active' : ''}
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

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate('/dashboard'); // Navigate after login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
    </form>
  );
}
```

---

## Route Parameters & Query Strings

### Route Parameters
```tsx
// Route definition
<Route path="/users/:id" element={<UserProfile />} />

// Component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams<{ id: string }>();

  return <div>User ID: {id}</div>;
}
```

### Query Strings
```tsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  const updateSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: '1' });
  };

  return (
    <div>
      <input
        value={query || ''}
        onChange={(e) => updateSearch(e.target.value)}
        placeholder="Search..."
      />
      <p>Page: {page}</p>
    </div>
  );
}
```

### Nested Routes
```tsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />}>
            <Route index element={<UserList />} />
            <Route path=":id" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <Navigation />
      <Outlet /> {/* Renders child routes */}
    </div>
  );
}
```

---

## Authentication Concepts

### Authentication vs Authorization
- **Authentication**: "Who are you?" (Login)
- **Authorization**: "What can you do?" (Permissions)

### Common Auth Methods
- **JWT Tokens** - Stateless, scalable
- **Session Cookies** - Server-side sessions
- **OAuth** - Third-party authentication
- **API Keys** - Simple authentication

### Auth Flow
```tsx
// 1. User submits credentials
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem('token', token);
      setUser(user);
      navigate('/dashboard');
    }
  } catch (error) {
    setError('Login failed');
  }
};
```

---

## JWT Tokens

### What is JWT?
- **JSON Web Token** - Compact, URL-safe token
- **Self-contained** - Contains user info
- **Stateless** - No server-side storage needed
- **Signed** - Tamper-proof

### JWT Structure
```
header.payload.signature
```

### JWT Implementation
```tsx
// Login and store token
const login = async (credentials: LoginCredentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  if (response.ok) {
    const { token, user } = await response.json();
    localStorage.setItem('token', token);
    return { user, token };
  }
  throw new Error('Login failed');
};

// Include token in requests
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Protected Routes

### Protected Route Component
```tsx
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}

function ProtectedRoute({
  children,
  isAuthenticated,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />;
}

// Usage
function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={!!user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

### Role-based Protection
```tsx
interface RoleProtectedRouteProps {
  children: React.ReactNode;
  user: User | null;
  requiredRole: string;
  redirectTo?: string;
}

function RoleProtectedRoute({
  children,
  user,
  requiredRole,
  redirectTo = '/unauthorized'
}: RoleProtectedRouteProps) {
  const hasRole = user?.role === requiredRole;

  return hasRole ? <>{children}</> : <Navigate to={redirectTo} />;
}

// Usage
<Route
  path="/admin"
  element={
    <RoleProtectedRoute user={user} requiredRole="admin">
      <AdminPanel />
    </RoleProtectedRoute>
  }
/>
```

---

## Context API for Auth

### Auth Context
```tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { token, user: userData } = await response.json();
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Using Auth Context
```tsx
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Common Patterns

### Route Guards
```tsx
function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
}
```

### Redirect After Login
```tsx
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials.email, credentials.password);
      navigate(from, { replace: true });
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Login form */}
    </form>
  );
}
```

### Loading States
```tsx
function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Next Steps

1. **Practice**: Build protected routes and authentication flows
2. **Learn More**: Check [Theory Guide](./theory/theory4.md) for detailed explanations
3. **Continue**: Move to [Lesson 5](../lesson5-fullstack-deployment/) for full-stack development
4. **Resources**: Explore [Advanced Patterns](../../extras/advanced_patterns.md) for complex patterns

> **💡 Tip**: Start with simple routing, then add authentication. Always handle loading states and error cases!