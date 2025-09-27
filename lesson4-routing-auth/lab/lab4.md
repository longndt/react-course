# Lab 4: Authentication & Protected Routes

## Overview

In this focused lab exercise, you'll implement essential authentication features including protected routes and user session management. This demonstrates core authentication patterns used in modern web applications.

_For detailed learning objectives and concepts, see [../README.md](../README.md)_

## Exercises

- Authentication Setup
- Protected Routes Implementation
- User Session Management

## Pre-Lab Setup

_For detailed development environment setup, see [Complete Environment Setup Guide](../../setup/environment-setup.md)_

## Exercises

### Exercise 1: Basic Routing Setup

**Quick Setup Reference:**

```bash
# Install React Router (if not already installed)
npm install react-router-dom
```

1. Set up basic routing:

```jsx
// src/App.jsx
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

```jsx
// src/components/Navbar.jsx
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

```jsx
// src/pages/Products.jsx
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

```jsx
// src/pages/ProductDetail.jsx
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

```jsx
// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (credentials) => {
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
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
```

2. Create a protected route component:

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
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

```jsx
// src/pages/Login.jsx
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

```jsx
// src/pages/Dashboard/index.jsx
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

// Update App.jsx routes
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

```jsx
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

```jsx
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

## Additional Resources

- [React Router Documentation](https://reactrouter.com/)
- [Protected Routes Guide](https://reactrouter.com/docs/en/v6/examples/auth)
- [Navigation State Management](https://reactrouter.com/docs/en/v6/hooks/use-navigate)
- [Nested Routes Tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial#nested-routes)
