# Lesson 4: Routing, Authentication & Advanced Patterns

## Overview

This lesson covers creating multi-page React applications using React Router and implementing comprehensive authentication systems. You'll learn to build complete authentication workflows with protected routes and explore advanced React patterns used in enterprise applications.

## Learning Objectives

After this lesson, you will be able to:

- ✅ Set up complex routing architectures with React Router
- ✅ Create protected routes with authentication guards
- ✅ Implement JWT-based authentication systems
- ✅ Manage user sessions and role-based access control (RBAC)
- ✅ Apply advanced React patterns (HOCs, Render Props, Compound Components)
- ✅ Implement global state management with Context API and Zustand
- ✅ Build scalable authentication workflows

---

## What You'll Learn

### 1. React Router Fundamentals

**Core Concepts:**
- Client-side routing vs server-side routing
- BrowserRouter vs HashRouter
- Routes, Route, and path matching
- Nested routes and layouts

**Navigation:**
- Link and NavLink components
- Programmatic navigation with useNavigate
- URL parameters and query strings
- Route parameters with useParams

**Advanced Routing:**
- Protected routes and route guards
- Lazy loading routes for performance
- 404 pages and error boundaries
- Outlet for nested routes

### 2. Authentication System

**Authentication Flow:**
- User registration and login
- JWT token management
- Persistent authentication (localStorage/cookies)
- Logout and session expiration

**Authorization:**
- Protected routes (auth required)
- Role-based access control (RBAC)
- Permission checking
- Redirect after login

**Security Best Practices:**
- Secure token storage
- HTTPS requirements
- CORS configuration
- XSS and CSRF protection

### 3. Advanced React Patterns

**Higher-Order Components (HOCs):**
- Reusable component logic
- withAuth, withLogger HOCs
- Props manipulation
- Component composition

**Render Props:**
- Function as children pattern
- Sharing stateful logic
- Flexible component APIs
- Mouse tracker example

**Compound Components:**
- Parent-child communication
- Implicit state sharing
- Flexible component APIs
- Tabs, Accordion examples

**Custom Hooks:**
- Extracting reusable logic
- useAuth, useLocalStorage
- useForm validation
- Composition over inheritance

### 4. State Management

**Context API:**
- Global state without props drilling
- AuthContext, ThemeContext
- Provider pattern
- Performance considerations

**Zustand (Lightweight State Management):**
- Simple global state
- No boilerplate
- TypeScript support
- DevTools integration

---

## Lesson Structure

### 📚 Theory
- **[theory4.md](./theory/theory4.md)** - Comprehensive guide to routing, authentication, and advanced patterns

### 💻 Demo
- **[demo/](./demo/)** - Live authentication and routing examples

### 🔬 Lab
- **[lab4.md](./lab/lab4.md)** - Build a complete authenticated application with routing

### ⚡ Quick Start
- **[quickstart.md](./quickstart.md)** - Quick reference for routing and auth setup

---

## Quick Examples

### Basic Routing Setup
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Navigation Links
```tsx
import { Link, NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}
```

### URL Parameters
```tsx
import { useParams, useNavigate } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product {id}</h1>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
}
```

### Authentication Context
```tsx
import { createContext, useState, ReactNode, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    const response: AuthResponse = await api.post('/auth/login', { email, password });
    setUser(response.user);
    localStorage.setItem('token', response.token);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### Protected Route
```tsx
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Role-Based Access Control
```tsx
interface AdminRouteProps {
  children: ReactNode;
}

function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/unauthorized" />;

  return <>{children}</>;
}
```

### Higher-Order Component (HOC)
```tsx
import React from 'react';

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

---

## Best Practices

### 🎯 Routing
- **Use meaningful paths**: `/users/:id` not `/u/:i`
- **Implement 404 pages**: Always have a catch-all route
- **Lazy load routes**: Improve initial load performance
- **Organize routes**: Group related routes together

### 🔒 Authentication
- **Validate on backend**: Never trust frontend-only checks
- **Use HTTPS**: Always encrypt data in transit
- **Store tokens securely**: HttpOnly cookies or secure localStorage
- **Implement token refresh**: Don't force re-login frequently

### ⚡ Performance
- **Lazy load protected routes**: Load auth pages only when needed
- **Memoize auth context**: Prevent unnecessary re-renders
- **Debounce form inputs**: Reduce validation API calls
- **Cache user data**: Don't refetch on every route change

### 🏗️ Architecture
- **Separate concerns**: Keep auth logic in context/hooks
- **Use custom hooks**: Extract reusable logic
- **Type everything**: Use TypeScript for auth types
- **Handle edge cases**: Loading, errors, network failures

---

## Common Pitfalls

### ❌ Routing Mistakes
- **Forgetting BrowserRouter**: Routes won't work without it
- **Wrong route order**: Specific routes before generic ones
- **Using \<a\> instead of \<Link\>**: Causes full page reload
- **Not handling 404**: Missing catch-all route

### ❌ Authentication Issues
- **Storing sensitive data in localStorage**: Use HttpOnly cookies for tokens
- **No token expiration**: Implement refresh token logic
- **Frontend-only validation**: Always validate on backend
- **Exposing credentials**: Never commit tokens to Git

### ❌ State Management Problems
- **Too much in Context**: Only global state belongs there
- **Creating too many contexts**: One per concern is enough
- **Not memoizing context values**: Causes excessive re-renders
- **Forgetting loading states**: Handle async operations properly

---

## Knowledge Checkpoint

Before proceeding, ensure you understand:

### React Router
- [ ] Difference between client-side and server-side routing
- [ ] How to set up nested routes
- [ ] Using Link vs NavLink vs useNavigate
- [ ] Accessing URL parameters and query strings

### Authentication
- [ ] JWT token lifecycle (login, storage, refresh, logout)
- [ ] Protected route implementation
- [ ] Role-based access control (RBAC)
- [ ] Redirect after login pattern

### Advanced Patterns
- [ ] When to use HOCs vs Render Props vs Hooks
- [ ] Compound components pattern
- [ ] Context API performance implications
- [ ] Custom hook best practices

### State Management
- [ ] When to use Context vs external library
- [ ] Context provider patterns
- [ ] Avoiding Context re-render issues
- [ ] Zustand basics (if using)

**🎯 Goal: Understand all concepts before building the lab application**

---

## Self-Assessment

Rate your confidence (1-5) in these areas:

**React Router** ⭐⭐⭐⭐⭐
- [ ] Setting up routes and navigation
- [ ] Working with route parameters
- [ ] Implementing nested routes
- [ ] Creating 404 and error pages

**Authentication System** ⭐⭐⭐⭐⭐
- [ ] Building login/register forms
- [ ] Managing JWT tokens
- [ ] Implementing protected routes
- [ ] Role-based access control

**Advanced Patterns** ⭐⭐⭐⭐⭐
- [ ] Creating Higher-Order Components
- [ ] Using Render Props pattern
- [ ] Building Compound Components
- [ ] Extracting custom hooks

**State Management** ⭐⭐⭐⭐⭐
- [ ] Using Context API effectively
- [ ] Setting up global auth state
- [ ] Managing loading/error states
- [ ] Using Zustand (optional)

**Target Score: 16/20 (4+ average) to build production-ready apps**

---

## What's Next?

After completing this lesson, you'll be able to:

1. **Build Multi-Page Apps**: Create complex SPAs with seamless navigation
2. **Secure Your Applications**: Implement professional authentication systems
3. **Apply Advanced Patterns**: Use HOCs, Render Props, and Compound Components
4. **Manage Global State**: Use Context API and Zustand effectively

**🎓 You're now ready for full-stack integration in Lesson 5!**

---

## Additional Resources

- 📖 [React Router Documentation](https://reactrouter.com/)
- 📖 [JWT.io - Learn about JSON Web Tokens](https://jwt.io/)
- 📖 [React Patterns](https://reactpatterns.com/)
- 💻 [Auth0 Blog - Authentication Best Practices](https://auth0.com/blog/)
- 📚 [Context API Deep Dive](./theory/theory4.md#context-api)
- 🔒 [OWASP Security Guidelines](https://owasp.org/)



