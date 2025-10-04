# Lesson 4: Routing & Authentication

## Overview

**Difficulty**: Intermediate to Advanced
**Prerequisites**: Lessons 1-3 completed, JWT basics helpful

This lesson covers creating multi-page React applications using React Router and implementing comprehensive authentication systems. You'll learn to build complete authentication workflows with protected routes, session management, and explore advanced React patterns used in production applications.

---

## Learning Objectives

After completing this lesson, you will be able to:

- ✅ Set up complex routing architectures with React Router v6
- ✅ Create protected routes with authentication guards
- ✅ Implement JWT-based authentication systems
- ✅ Manage user sessions and role-based access control (RBAC)
- ✅ Apply advanced React patterns (HOCs, Render Props, Compound Components)
- ✅ Implement global state management with Context API
- ✅ Build scalable authentication workflows
- ✅ Handle navigation and URL parameters
- ✅ Secure applications with proper authentication flow
- ✅ Debug routing and auth issues effectively

---

## Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
- ✅ React hooks (useState, useEffect, useContext)
- ✅ React Router basics or navigation concepts
- ✅ API integration and data fetching
- ✅ HTTP basics and status codes
- ✅ Completed Lessons 1-3

### Environment Setup
- ✅ Node.js 18+ installed
- ✅ React project with React Router installed
- ✅ Backend API with auth endpoints (or use mock)
- ✅ Understanding of JWT tokens

### Optional but Helpful
- Basic understanding of authentication flow
- Familiarity with localStorage/sessionStorage
- Knowledge of HTTP security concepts

> 💡 **Not ready?** → Review [Lesson 3](../lesson3-api-data/) for API integration

> 🔄 **Hooks Review**: This lesson relies heavily on `useState`, `useEffect`, and `useContext` for authentication state management. If you need to review these concepts, see [Lesson 2: React Hooks](../lesson2-component-hook/#2-react-hooks-essentials).

---

## What You'll Learn

### 1. React Router Fundamentals (1.5 hours)

**Core Concepts:**
- Client-side routing vs server-side routing
- BrowserRouter vs HashRouter vs MemoryRouter
- Routes, Route, and path matching
- Nested routes and route hierarchies
- Layout routes with Outlet

**Navigation Components:**
- Link and NavLink for navigation
- Active link styling with NavLink
- Programmatic navigation with useNavigate
- URL parameters with useParams
- Query strings with useSearchParams

**Advanced Routing:**
- Protected routes and route guards
- Lazy loading routes for performance
- 404 pages and error boundaries
- Route loaders and actions (React Router v6.4+)
- Index routes and default children

### 2. Authentication System

**Authentication Flow:**
- User registration with validation
- Login with credentials
- JWT token generation and storage
- Persistent authentication (localStorage/cookies)
- Logout and session cleanup
- Token refresh mechanisms

**Authorization:**
- Protected routes (auth required)
- Role-based access control (RBAC)
- Permission checking middleware
- Redirect after login (return URL)
- Conditional rendering based on permissions

**Security Best Practices:**
- Secure token storage (httpOnly cookies preferred)
- HTTPS requirements in production
- CORS configuration for API calls
- XSS and CSRF protection
- Password hashing and validation
- Rate limiting for login attempts

### 3. Advanced React Patterns (1.5 hours)

**Higher-Order Components (HOCs):**
- Concept and use cases
- Creating withAuth, withLogger HOCs
- Props manipulation and forwarding
- Component composition strategies
- When to use HOCs vs hooks

**Render Props:**
- Function as children pattern
- Sharing stateful logic between components
- Flexible component APIs
- Mouse tracker example
- When to use render props

**Compound Components:**
- Parent-child implicit communication
- Context for internal state sharing
- Flexible and composable APIs
- Tabs, Accordion, Modal examples
- Building reusable UI libraries

**Custom Hooks:**
- Extracting reusable authentication logic
- useAuth, useLocalStorage, useToggle
- Form validation hooks (useForm)
- Composition over inheritance
- Testing custom hooks

### 4. State Management

**Context API:**
- Global state without props drilling
- AuthContext, ThemeContext patterns
- Provider and Consumer pattern
- Performance optimization with memo
- When Context is enough vs Redux/Zustand

**Alternative State Management:**
- Zustand (lightweight, simple)
- Redux Toolkit (complex apps)
- Jotai/Recoil (atomic state)
- When to use each solution

---

## Quick Concept Preview

### Basic Routing Setup
```tsx
// App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Protected Route Component
```tsx
// components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login, save attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Usage in App
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Auth Context Setup
```tsx
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
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
      verifyToken(token).then(user => {
        setUser(user);
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem('token');
        setLoading(false);
      });
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

    if (!response.ok) throw new Error('Login failed');

    const { token, user } = await response.json();
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

### Nested Routes with Layout
```tsx
// Nested routes for dashboard
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>

// DashboardLayout.tsx
function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}
```

### Higher-Order Component Example
```tsx
// hoc/withAuth.tsx
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return <Component {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

> 💡 **More examples** → Check [reference/](./reference/) for complete patterns

---

## Getting Started

Follow this 4-step learning path:

### Step 1: Study the Theory
📖 Read [theory4.md](./theory/theory4.md) - Deep dive into:
- React Router architecture and concepts
- Authentication flow and security
- Advanced React patterns explained
- State management strategies
- Best practices and anti-patterns

**Time**: 60-90 minutes

### Step 2: Explore Reference Code
💻 Browse [reference/](./reference/) - Working examples:
- Complete routing setup with all features
- Full authentication system implementation
- Protected routes and guards
- Advanced patterns (HOC, Render Props, Compound)
- Context API examples

**Time**: 45-60 minutes

### Step 3: Build Example Projects
**🔨 Hands-On Practice:**

🔨 Follow [example/](./example/) - Build along:
- Multi-page app with React Router
- Complete auth system with JWT
- Protected admin dashboard
- Role-based access control
- Advanced pattern implementations

**Time**: 120-150 minutes

### Step 4: Complete Lab Exercises
🧪 Practice in [lab4.md](./lab/lab4.md) - Hands-on challenges:
- Level 1: Basic routing and navigation
- Level 2: Authentication system
- Level 3: Advanced patterns and RBAC

**Time**: 180-240 minutes

> 🎯 **Pro tip**: Test routing with React Router DevTools browser extension

---

## Key Takeaways

### 🎯 Core Concepts to Remember

1. **Client-side routing** doesn't reload the page
2. **Protected routes** check auth before rendering
3. **JWT tokens** should be stored securely
4. **Context API** solves props drilling for auth state
5. **HOCs wrap components** to add behavior
6. **Render props** share logic via function children
7. **Compound components** communicate via context
8. **Always validate auth** on both client and server

### 🔑 Most Important Skills

- Setting up React Router with nested routes
- Creating protected route components
- Managing authentication state globally
- Implementing secure login/logout flow
- Handling navigation and redirects
- Choosing the right pattern for your use case

### 💡 Common Realizations

- "Client-side routing is so much faster!"
- "Protected routes are just conditional rendering"
- "Context makes auth state management easy"
- "Always validate on the server, not just client"
- "Patterns are tools - use the right one for the job"

---

## Best Practices Summary

### ✅ Routing Best Practices

**DO:**
- ✅ Use meaningful, RESTful URL paths (`/users/:id`)
- ✅ Implement 404 catch-all routes (`path="*"`)
- ✅ Lazy load route components for better performance
- ✅ Group related routes with nested routing
- ✅ Use Link/NavLink, never `<a>` tags
- ✅ Handle loading states during navigation
- ✅ Preserve scroll position appropriately

**DON'T:**
- ❌ Use `<a>` tags (causes full page reload)
- ❌ Forget to add 404 pages
- ❌ Create overly deep route nesting (max 3-4 levels)
- ❌ Ignore accessibility in navigation
- ❌ Hardcode URLs everywhere (use constants)

### ✅ Authentication Best Practices

**DO:**
- ✅ Always validate auth on the server (never trust client)
- ✅ Use HTTPS in production (encrypt data in transit)
- ✅ Store tokens in httpOnly cookies (most secure) or secure localStorage
- ✅ Implement token refresh for better UX
- ✅ Add rate limiting to prevent brute force
- ✅ Hash passwords with bcrypt (never store plain text)
- ✅ Show clear error messages for failed auth
- ✅ Redirect users after login to intended page

**DON'T:**
- ❌ Store tokens in regular cookies (vulnerable to XSS)
- ❌ Trust client-side auth checks alone
- ❌ Store passwords in plain text
- ❌ Use weak password requirements
- ❌ Forget to handle token expiration
- ❌ Expose sensitive data in JWT payload
- ❌ Allow unlimited login attempts

### ✅ Pattern Selection Guide

**Use HOCs when:**
- ✅ Adding behavior to multiple components
- ✅ Component logic can be extracted and reused
- ✅ Need to enhance component props

**Use Render Props when:**
- ✅ Need flexible, runtime composition
- ✅ Sharing stateful logic with different UIs
- ✅ Want explicit control over rendering

**Use Compound Components when:**
- ✅ Building reusable UI libraries
- ✅ Need implicit parent-child communication
- ✅ Want flexible, declarative APIs

**Use Custom Hooks when:**
- ✅ Extracting stateful logic (most common)
- ✅ Sharing logic without affecting component tree
- ✅ Composing multiple hooks together

### ✅ Performance Tips

- Lazy load routes: `const Dashboard = lazy(() => import('./Dashboard'));`
- Memoize auth context value with useMemo
- Use React.memo for expensive components
- Debounce form validation
- Cache user data to avoid refetches

---

## Common Challenges & Solutions

### Challenge 1: Full Page Refresh on Navigation
**Problem:** Clicking links causes full page reload
```tsx
// ❌ Wrong - causes full reload
<a href="/dashboard">Dashboard</a>

// ✅ Correct - client-side navigation
<Link to="/dashboard">Dashboard</Link>
```

**Solution:** Always use React Router's Link or NavLink components

### Challenge 2: Token Expiration Without Warning
**Problem:** User gets logged out suddenly without notice
```tsx
// ✅ Solution - Check token expiration and refresh
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    const expiresIn = decoded.exp * 1000 - Date.now();

    if (expiresIn < 60000) { // Less than 1 minute
      refreshToken(); // Refresh before expiry
    }

    // Set timer to refresh token
    const timer = setTimeout(refreshToken, expiresIn - 60000);
    return () => clearTimeout(timer);
  }
}, []);
```

**Solution:** Implement token refresh logic, warn users before expiration

### Challenge 3: Protected Routes Allow Brief Access
**Problem:** Users see protected content briefly before redirect
```tsx
// ❌ Wrong - no loading state
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// ✅ Correct - handle loading state
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Checking authentication...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
}
```

**Solution:** Show loading state while verifying authentication

### Challenge 4: Context Causing Excessive Re-renders
**Problem:** Every component re-renders when auth state changes
```tsx
// ❌ Wrong - creates new object every render
<AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>

// ✅ Correct - memoize context value
const value = useMemo(
  () => ({ user, login, logout, isAuthenticated: !!user }),
  [user]
);
<AuthContext.Provider value={value}>
```

**Solution:** Memoize context value, split into multiple contexts if needed

### Challenge 5: Lost State After Refresh
**Problem:** User gets logged out on page refresh
```tsx
// ✅ Solution - Restore auth state on mount
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    // Verify token with backend
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(user => setUser(user))
      .catch(() => localStorage.removeItem('token'));
  }
}, []);
```

**Solution:** Check for existing token on app initialization

> 🔧 **More troubleshooting** → See [Troubleshooting Guide](../extra/troubleshooting.md)

---

## Progress Checklist

### React Router (Must Know)
- [ ] Set up BrowserRouter and define routes
- [ ] Create navigation with Link and NavLink
- [ ] Access URL parameters with useParams
- [ ] Navigate programmatically with useNavigate
- [ ] Implement nested routes with Outlet
- [ ] Create 404 catch-all routes
- [ ] Use query parameters with useSearchParams

### Authentication (Must Know)
- [ ] Build login and registration forms
- [ ] Store and manage JWT tokens securely
- [ ] Create protected route components
- [ ] Implement logout functionality
- [ ] Handle authentication errors gracefully
- [ ] Persist auth state across page refreshes
- [ ] Redirect after login to intended page

### Advanced Patterns (Should Know)
- [ ] Create a Higher-Order Component (HOC)
- [ ] Understand Render Props pattern
- [ ] Build a Compound Component
- [ ] Extract custom hooks for reusable logic
- [ ] Choose appropriate pattern for use case

### State Management (Should Know)
- [ ] Set up AuthContext provider
- [ ] Consume context with useContext
- [ ] Optimize context performance with memo
- [ ] Handle async authentication state
- [ ] Implement loading and error states

### Security (Good to Know)
- [ ] Validate auth on server side
- [ ] Use HTTPS in production
- [ ] Implement token refresh mechanism
- [ ] Add rate limiting for login
- [ ] Handle CORS properly

**🎯 Goal: Check at least 18/23 items before Lesson 5**

---

## Next Steps

### Ready to Continue?
✅ **Completed this lesson?** → Proceed to [Lesson 5: Full-Stack Integration & Deployment](../lesson5-fullstack-deployment/)

### Need More Practice?
📚 **Study theory** → [theory4.md](./theory/theory4.md) - Routing & auth deep dive
💻 **View examples** → [reference/](./reference/) - Complete implementations
🔨 **Build projects** → [example/](./example/) - Follow-along tutorials
🧪 **Practice exercises** → [lab4.md](./lab/lab4.md) - Auth challenges

### Additional Resources
🎓 **Quiz yourself** → [quiz/](./quiz/) - Test your knowledge
❓ **Having issues?** → [Troubleshooting Guide](../extra/troubleshooting.md)
🚀 **Learn deployment** → Preview [Lesson 5](../lesson5-fullstack-deployment/)

---

## Resources & References

### Official Documentation
- [React Router v6 Docs](https://reactrouter.com/) - Complete routing guide
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial) - Official tutorial
- [JWT Introduction](https://jwt.io/introduction) - Understanding JWT tokens
- [React Context API](https://react.dev/reference/react/useContext) - Official context guide

### Security Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Security vulnerabilities
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/) - Token security
- [Web Security Guide](https://web.dev/secure/) - Google's security guide
- [Auth0 Blog](https://auth0.com/blog/) - Authentication best practices

### React Patterns
- [React Patterns](https://reactpatterns.com/) - Pattern catalog
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - TS patterns
- [Kent C. Dodds Blog](https://kentcdodds.com/blog) - Advanced patterns

### Video Tutorials
- [React Router v6 Tutorial](https://www.youtube.com/watch?v=Ul3y1LXxzdU) - Web Dev Simplified
- [React Authentication](https://www.youtube.com/watch?v=X3qyxo_UTR4) - Dave Gray
- [Advanced React Patterns](https://www.youtube.com/watch?v=xa8lhVwQBw4) - Jack Herrington

### Tools & Extensions
- [React Router DevTools](https://github.com/remix-run/react-router/tree/main/packages/react-router-devtools) - Route debugging
- [jwt.io Debugger](https://jwt.io/) - Decode and verify JWT tokens
- [React DevTools](https://react.dev/learn/react-developer-tools) - Component inspection

### State Management Alternatives
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [Redux Toolkit](https://redux-toolkit.js.org/) - Redux made easier
- [Jotai](https://jotai.org/) - Atomic state management
- [Recoil](https://recoiljs.org/) - Facebook's state library

### Communities
- [React Router Discord](https://rmx.as/discord) - Official community
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community
- [Reactiflux](https://www.reactiflux.com/) - React developers chat
- [Stack Overflow - react-router](https://stackoverflow.com/questions/tagged/react-router) - Q&A

---
