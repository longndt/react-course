# Theory - Routing & Authentication

---

## Table of Contents

1. [Why Routing & Authentication?](#why-routing--authentication)
2. [React Router Fundamentals](#react-router-fundamentals)
3. [Navigation & Links](#navigation--links)
4. [Route Parameters & Query Strings](#route-parameters--query-strings)
5. [Authentication Concepts](#authentication-concepts)
6. [JWT Tokens](#jwt-tokens)
7. [Protected Routes](#protected-routes)
8. [Context API for Auth](#context-api-for-auth)
9. [Common Mistakes](#common-mistakes)
10. [Next Steps](#next-steps)

---

## Why Routing & Authentication?

> 🔐 **Visual Learning**: For a comprehensive understanding of authentication flow, see [Authentication Flow Diagram](../../diagrams/authentication_flow.md)

**Modern Web Applications Need:**

- **Multi-page Navigation** - Users expect different pages/views
- **User Authentication** - Secure access to protected content
- **State Management** - Global user state across components
- **Security** - Protect sensitive routes and data

**Key Benefits:**
- **Better UX** - Smooth navigation without page refreshes
- **Security** - Protected routes and user sessions
- **Scalability** - Organized code structure
- **Professional** - Industry-standard patterns

---

## React Router Fundamentals

> 🛣️ **Visual Learning**: For a comprehensive understanding of routing flow, see [Routing Flow Diagram](../../diagrams/routing_flow.md)

### Setup React Router

```bash
# File: setup.sh
npm install react-router-dom
```

### Basic Router Setup

```typescript
// File: src/App.tsx
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

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}
```

### Router with Layout

```typescript
// File: src/App.tsx
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
```

---

## Navigation & Links

### Using Link Component

```typescript
// File: components/layout/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
}

export default Navigation;
```

### Programmatic Navigation

```typescript
// File: components/auth/LoginForm.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Credentials {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async (credentials: Credentials) => {
    try {
      // await login(credentials);
      navigate('/dashboard'); // Navigate after successful login
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

export default LoginForm;
```

### Active Link Styling

```typescript
// File: components/layout/Navigation.tsx
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav>
      <Link
        to="/"
        className={location.pathname === '/' ? 'active' : ''}
      >
        Home
      </Link>
      <Link
        to="/about"
        className={location.pathname === '/about' ? 'active' : ''}
      >
        About
      </Link>
    </nav>
  );
}
```

---

## Route Parameters & Query Strings

### Route Parameters

```typescript
// File: src/App.tsx
// Route definition
<Route path="/users/:id" element={<UserProfile />} />

// Component using parameter
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      fetchUser(id).then(setUser);
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return <div>User: {user.name}</div>;
}
```

### Query Strings

```typescript
// File: components/SearchPage.tsx
import { useSearchParams } from 'react-router-dom';

function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);

  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    fetchUsers({ search, page }).then(setUsers);
  }, [search, page]);

  const handleSearch = (newSearch: string) => {
    setSearchParams({ search: newSearch, page: '1' });
  };

  return (
    <div>
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search users..."
      />
      {/* User list */}
    </div>
  );
}
```

### Nested Routes

```typescript
// File: src/App.tsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
      <nav>Navigation</nav>
      <Outlet /> {/* Renders child routes */}
    </div>
  );
}
```

---

## Authentication Concepts

### What is Authentication?

Authentication is the process of verifying who a user is, while authorization is the process of verifying what they have access to.

**Common Authentication Methods:**
- **Username/Password** - Traditional login
- **JWT Tokens** - Stateless authentication
- **OAuth** - Third-party authentication
- **Session-based** - Server-side sessions

### Authentication Flow

```
1. User enters credentials
2. Server validates credentials
3. Server returns JWT token
4. Client stores token
5. Client sends token with requests
6. Server validates token
7. Server returns protected data
```

---

## JWT Tokens

### What is JWT?

JWT (JSON Web Token) is a compact, URL-safe way of representing claims to be transferred between two parties.

**JWT Structure:**
```
header.payload.signature
```

### JWT Implementation

```typescript
// File: services/auth.ts
// Login function
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  // Store token in localStorage
  localStorage.setItem('token', data.token);

  return data;
};

// Token validation
const validateToken = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};
```

### Axios with JWT

```typescript
// File: services/api.ts
import axios from 'axios';

// Create axios instance with auth
const api = axios.create({
  baseURL: '/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
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
```

---

## Protected Routes

### Route Protection Component

```typescript
// File: components/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Usage
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

### Role-based Protection

```typescript
// File: components/auth/ProtectedRoute.tsx
interface RoleProtectedRouteProps {
  children: React.ReactNode;
  user: User | null;
  requiredRole: string;
}

function RoleProtectedRoute({ children, user, requiredRole }: RoleProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Usage
<RoleProtectedRoute user={user} requiredRole="admin">
  <AdminPanel />
</RoleProtectedRoute>
```

---

## Context API for Auth

### Auth Context

```typescript
// File: context/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Auth Provider

```typescript
// File: context/AuthContext.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && validateToken(token)) {
      fetchUserProfile().then(setUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Using Auth Context

```typescript
// File: components/auth/LoginForm.tsx
function LoginForm() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Common Mistakes

### Mistake 1: Not handling authentication state

```typescript
// File: src/App.tsx (Wrong Example)
// ❌ Wrong - no auth state management
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

// ✅ Correct - with auth state
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

### Mistake 2: Storing sensitive data in localStorage

```typescript
// File: services/auth.ts (Wrong Example)
// ❌ Wrong - storing sensitive data
localStorage.setItem('password', password);
localStorage.setItem('creditCard', creditCardNumber);

// ✅ Correct - only store tokens
localStorage.setItem('token', jwtToken);
```

### Mistake 3: Not validating tokens

```typescript
// File: components/auth/ProtectedRoute.tsx (Wrong Example)
// ❌ Wrong - not validating token
const isAuthenticated = !!localStorage.getItem('token');

// ✅ Correct - validate token
const isAuthenticated = validateToken(localStorage.getItem('token'));
```

### Mistake 4: Not handling token expiration

```typescript
// File: context/AuthContext.tsx (Wrong Example)
// ❌ Wrong - no token expiration handling
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setUser(userData);
  }
}, []);

// ✅ Correct - handle token expiration
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token && validateToken(token)) {
    setUser(userData);
  } else {
    localStorage.removeItem('token');
  }
}, []);
```

---

## Next Steps

### What You Should Know After Lesson 4

**Routing:**
- React Router setup and configuration
- Navigation with Link and useNavigate
- Route parameters and query strings
- Nested routes and layouts

**Authentication:**
- JWT token implementation
- Protected routes and role-based access
- Context API for global auth state
- Security best practices

**State Management:**
- Global authentication state
- Token storage and validation
- Error handling and user feedback

> 🔄 **Visual Learning**: For a comprehensive understanding of state management patterns, see [State Management Flow Diagram](../../diagrams/state_management_flow.md)

### What's Coming in Lesson 5

🔜 **Full-Stack Development** - Backend integration with Express.js
🔜 **Database Operations** - MongoDB with Mongoose
🔜 **File Uploads** - Media management and cloud storage
🔜 **Deployment** - Production deployment and CI/CD

> **Advanced Topics**: For advanced patterns, performance optimization, and complex examples, see [Advanced Patterns](../../extras/advanced_patterns.md) and [Performance Optimization](../../extras/performance_optimization.md)
