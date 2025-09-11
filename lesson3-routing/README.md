# Lesson 3: Routing & Authentication in React

## Overview
In this lesson, you'll learn how to create multi-page React applications using React Router and implement user authentication. We'll build a complete authentication system with protected routes.

## Learning Objectives
After this lesson, you will be able to:
- Set up routing in React applications
- Create protected routes
- Implement user authentication
- Manage user sessions
- Handle navigation guards

## 1. Understanding React Router

### Basic Routing
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Basic route */}
        <Route path="/" element={<Home />} />

        {/* Route with parameter */}
        <Route path="/product/:id" element={<Product />} />

        {/* Nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Navigation Components
```jsx
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link to="/">Home</Link>

      {/* Link with active state */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? 'active' : ''
        }
      >
        Dashboard
      </NavLink>
    </nav>
  );
}
```

### Using Route Parameters
```jsx
import { useParams, useNavigate } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product {id}</h1>
      <button onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}
```

## 2. Implementing Authentication

### 1. Authentication Context
```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext(null);

// Create provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth
export function useAuth() {
  return useContext(AuthContext);
}
```

### 2. Login Form
```jsx
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}
```

### 3. Protected Route Component
```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />;
  }

  return children;
}

// Usage in App.jsx
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

## Lab Exercises

### Exercise 1: Basic Routing (30 minutes)
Create a multi-page application with:
1. Home page
2. About page
3. Contact page
4. Navigation menu
5. 404 page

### Exercise 2: User Authentication (45 minutes)
Implement a complete authentication system:
1. Login form
2. Registration form
3. Password reset
4. Remember me functionality
5. Error handling

### Exercise 3: Protected Dashboard (45 minutes)
Build a protected dashboard area:
1. Protected routes
2. User profile page
3. Settings page
4. Admin section
5. Role-based access

## Project Structure
```
src/
├── components/
│   ├── Navigation.jsx
│   ├── ProtectedRoute.jsx
│   └── Layout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard/
│       ├── index.jsx
│       ├── Profile.jsx
│       └── Settings.jsx
├── context/
│   └── AuthContext.jsx
└── services/
    └── auth.js
```

## Additional Resources
- [React Router Documentation](https://reactrouter.com/)
- [JWT Authentication Guide](https://jwt.io/introduction)
- [Protected Routes Tutorial](https://reactrouter.com/docs/en/v6/examples/auth)
- [Authentication Best Practices](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing)

## Homework
Create a complete authentication system with:
1. Social login integration (Google/GitHub)
2. Email verification
3. Password reset flow
4. Session management
5. Remember me functionality
