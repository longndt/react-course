# Lab: Authentication & Protected Routes

## Overview

In this focused lab exercise, you'll implement essential authentication features including protected routes and user session management. This demonstrates core authentication patterns used in modern web applications.

_For detailed learning objectives and concepts, see [../readme.md](../readme.md)_

## Exercises

- Authentication Setup
- Protected Routes Implementation
- User Session Management

## Pre-Lab Setup

_For detailed development environment setup, see [Complete Environment Setup Guide](../../extras/environment-setup.md)_

## Exercises

### Exercise 1: Basic Routing Setup

**Quick Setup Reference:**

```bash
# Install React Router (if not already installed)
npm install react-router-dom
```

1. Set up basic routing:

```tsx
// src/App\.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

3. Create a navigation component:

```tsx
// src/components/Navbar\.tsx
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MyApp
      </Link>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

### Exercise 2: Route Parameters and Dynamic Routing

1. Create a products list and detail view:

```tsx
// src/pages/Products\.tsx
function Products() {
  const products = [
    { id: 1, name: "Product 1", price: 99.99 },
    { id: 2, name: "Product 2", price: 149.99 },
    { id: 3, name: "Product 3", price: 199.99 },
  ];

  return (
    <div className="products">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="product-card"
          >
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

2. Create a product detail component:

```tsx
// src/pages/ProductDetail\.tsx
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulate product fetch
  const product = {
    id,
    name: `Product ${id}`,
    price: 99.99,
    description: "Product description...",
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{product.name}</h1>
      <p className="price">${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
```

### Exercise 3: Protected Routes

1. Create an auth context:

```tsx
// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  username: string;
}

interface Credentials {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = (credentials: Credentials): Promise<void> => {
    // Simulate authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({
          id: 1,
          username: credentials.username,
        });
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
```

2. Create a protected route component:

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
```

3. Implement login page:

```tsx
// src/pages/Login\.tsx
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await login({
      username: formData.get("username"),
      password: formData.get("password"),
    });
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input name="username" type="text" placeholder="Username" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
```

### Exercise 4: Nested Routes

Create a dashboard with nested routes:

```tsx
// src/pages/Dashboard/index\.tsx
import { Outlet, NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="settings">Settings</NavLink>
          <NavLink to="notifications">Notifications</NavLink>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

// Update App\.tsx routes
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
  <Route path="notifications" element={<Notifications />} />
</Route>;
```

## Bonus Tasks

### 1. Implement Search Params

Create a filtered products list:

```tsx
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => {
          setSearchParams({ filter: e.target.value });
        }}
        placeholder="Filter products..."
      />
      {/* Products list filtered by search param */}
    </div>
  );
}
```

### 2. Add Loading States

Implement loading states for route transitions:

```tsx
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>{/* Routes configuration */}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

## Submission Requirements

1. GitHub repository containing:

   - Complete application code
   - README with setup instructions
   - Screenshots of different routes
   - Documentation of routing structure

2. Your implementation should demonstrate:
   - Basic routing setup
   - Protected routes
   - Nested routes
   - Route parameters
   - Navigation state management

## Grading Criteria

- Routing Implementation (30%)
- Protected Routes (25%)
- Navigation & State Management (25%)
- Code Quality (10%)
- Documentation (10%)

## Modern UI/UX Enhancements

### Professional Design System

This lab features an enhanced design system with:

1. **Glass Morphism Navigation**: Semi-transparent navbar with backdrop blur
2. **Enhanced Typography**: Improved font sizing and spacing
3. **Modern Button Styles**: Professional button designs with hover effects
4. **Gradient Backgrounds**: Beautiful color gradients throughout the app
5. **Improved Layout**: Desktop-optimized spacing and typography

### CSS Design Features

```css
/* Glass morphism navbar */
.navbar {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Enhanced logo with hover effect */
.logo:hover {
  transform: scale(1.05);
}

/* Professional form styling */
input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

/* Modern page layouts */
body {
  background: linear-gradient(135deg, #f9fafb 0%, #e2e8f0 100%);
  scroll-behavior: smooth;
}
```

### User Experience Improvements

- Smooth scroll behavior
- Enhanced focus states
- Better visual hierarchy
- Improved readability
- Professional color palette

## Additional Resources

- [React Router Documentation](https://reactrouter.com/)
- [Protected Routes Guide](https://reactrouter.com/docs/en/v6/examples/auth)
- [Navigation State Management](https://reactrouter.com/docs/en/v6/hooks/use-navigate)
- [Nested Routes Tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial#nested-routes)

## Final Project Structure

After completing all exercises in this lab, your project structure should look like:

```
lab4-routing-auth/
├── index.html
├── package.json
├── readme.md
├── vite.config\.ts
├── src/
│   ├── App\.tsx                    # Main app with routing setup
│   ├── App.css                   # Global styles with auth UI
│   ├── index.css                 # Base styles
│   ├── main\.tsx                  # App entry point
│   ├── components/
│   │   ├── Navbar\.tsx           # Navigation with auth state
│   │   ├── Navbar.css           # Navigation styling
│   │   ├── ProtectedRoute\.tsx   # Route protection wrapper
│   │   ├── LoginForm\.tsx        # User login form
│   │   └── UserProfile\.tsx      # User profile display
│   ├── context/
│   │   └── AuthContext\.tsx      # Authentication state management
│   └── pages/
│       ├── Home\.tsx             # Public home page
│       ├── About\.tsx            # Public about page
│       ├── Contact\.tsx          # Public contact page
│       ├── Dashboard\.tsx        # Protected dashboard page
│       ├── Profile\.tsx          # Protected user profile page
│       └── Settings\.tsx         # Protected settings page
```

### Key Features Implemented

1. **Routing System**
   - React Router v6 setup
   - Public and protected routes
   - Navigation with active states
   - Route parameters and nested routing

2. **Authentication Features**
   - User login/logout functionality
   - Authentication context management
   - Session persistence with localStorage
   - Protected route wrapper component

3. **User Interface**
   - Responsive navigation bar
   - Login form with validation
   - User profile display
   - Auth-aware conditional rendering

4. **State Management**
   - Authentication context provider
   - User session management
   - Login/logout state handling
   - Route protection logic

This structure provides a solid foundation for authentication-based React applications with proper routing and state management patterns.



