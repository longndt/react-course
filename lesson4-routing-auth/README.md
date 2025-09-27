# Lesson 4: Routing, Authentication & Advanced Patterns

## Overview

In this lesson, you'll learn how to create multi-page React applications using React Router and implement comprehensive authentication systems. We'll build complete authentication workflows with protected routes and explore advanced React patterns used in enterprise applications.

## Learning Objectives

After this lesson, you will be able to:

- Set up complex routing architectures with React Router
- Create protected routes with authentication guards
- Implement JWT-based authentication systems
- Manage user sessions and role-based access control
- Apply advanced React patterns (HOCs, Render Props, Compound Components)
- Implement global state management with Context API and Zustand
- Build scalable authentication workflows

## 1. Understanding React Router

### Basic Routing

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

## 🔍 **Knowledge Checkpoint 1**

Before building complex routing, ensure you understand:

1. **What's the difference between client-side and server-side routing?**
2. **When would you use nested routes vs separate routes?**
3. **How do you access URL parameters in a React component?**
4. **Why do we need a "catch-all" route?**

_💡 Single Page Applications (SPAs) handle navigation differently than traditional websites!_

---

### Navigation Components

```jsx
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link to="/">Home</Link>

      {/* Link with active state */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}
```

### Using Route Parameters

```jsx
import { useParams, useNavigate } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product {id}</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
```

## 2. Implementing Authentication

### 1. Authentication Context

```jsx
import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext(null);

// Create provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
    return <Navigate to="/login" state={{ from: location }} replace />;
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

### Exercise 1: Basic Routing

Create a multi-page application with:

1. Home page
2. About page
3. Contact page
4. Navigation menu
5. 404 page

### Exercise 2: User Authentication

Implement a complete authentication system:

1. Login form with JWT integration
2. Registration form with validation
3. Password reset functionality
4. Remember me functionality
5. Comprehensive error handling

### Exercise 3: Protected Dashboard

Build a protected dashboard area:

1. Protected routes with authentication guards
2. User profile page
3. Settings page
4. Admin section with role-based access
5. Session management

### Exercise 4: Advanced React Patterns

Implement advanced patterns:

1. Higher-Order Components (HOCs) for authentication
2. Render Props pattern for data sharing
3. Compound Components for reusable UI
4. Custom hooks for authentication logic
5. Context API for global state management

## 4. Advanced React Patterns

### Higher-Order Components (HOCs)

```jsx
// HOC for authentication
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();

    if (loading) {
      return <LoadingSpinner />;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedProfile = withAuth(ProfilePage);
```

### Render Props Pattern

```jsx
// Authentication render prop component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {typeof children === "function" ? children({ user, loading }) : children}
    </AuthContext.Provider>
  );
}

// Usage
function App() {
  return (
    <AuthProvider>
      {({ user, loading }) =>
        loading ? <LoadingSpinner /> : user ? <Dashboard /> : <LoginPage />
      }
    </AuthProvider>
  );
}
```

### Compound Components

```jsx
// Modal compound component
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">{children}</div>
    </div>
  );
};

Modal.Header = ({ children }) => <div className="modal-header">{children}</div>;

Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;

Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;

// Usage
function LoginModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <h2>Login Required</h2>
      </Modal.Header>
      <Modal.Body>
        <LoginForm />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose}>Cancel</button>
      </Modal.Footer>
    </Modal>
  );
}
```

### State Management with Zustand

```jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Auth store
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          const response = await authAPI.login(credentials);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
          });
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates },
        }));
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

// Usage in components
function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  return {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading: user === null && isAuthenticated,
  };
}
```

## Additional Resources

- [React Router Documentation](https://reactrouter.com/)
- [JWT Authentication Guide](https://jwt.io/introduction)
- [Protected Routes Tutorial](https://reactrouter.com/docs/en/v6/examples/auth)
- [Authentication Best Practices](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing)

## 📊 **Final Knowledge Assessment**

Complete this self-assessment to check your routing and authentication skills:

### **React Router Basics (Must Know)**

- [ ] I can set up basic routes with React Router
- [ ] I understand how to use Link and NavLink components
- [ ] I can access URL parameters with useParams
- [ ] I know how to implement nested routes

### **Authentication Implementation (Must Know)**

- [ ] I understand JWT tokens and how they work
- [ ] I can implement login and logout functionality
- [ ] I know how to store and retrieve user sessions
- [ ] I can create protected routes that require authentication

### **Advanced Patterns (Good to Know)**

- [ ] I can implement role-based access control
- [ ] I understand React Context for global state management
- [ ] I know how to use Zustand for complex state management
- [ ] I can create custom hooks for authentication logic

### **Security Considerations (Important to Know)**

- [ ] I understand token storage best practices
- [ ] I know how to handle token expiration
- [ ] I can implement automatic logout on token expiry
- [ ] I understand basic security principles for SPAs

**🎯 Goal: Check at least 12/16 items before moving to Lesson 5**

### **Self-Reflection Questions**

1. How would you handle user authentication in a large application?
2. What are the security risks of storing tokens in localStorage?
3. When would you choose Context API over Zustand for state management?

---

## 🎓 **Ready for Lesson 5?**

If you completed the assessment above and feel comfortable with routing and authentication, you're ready to move on to [Lesson 5: Full-Stack Integration & Production Deployment](../lesson5-fullstack/).

**Still need practice?** Consider:

- Building more complex routing scenarios
- Implementing additional authentication providers
- Experimenting with different state management patterns
- Adding role-based access control to your applications

## Homework

Create a complete authentication system with:

1. Social login integration (Google/GitHub)
2. Email verification
3. Password reset flow
4. Session management
5. Remember me functionality
