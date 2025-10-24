# Lab 4 - Routing & Authentication

## 📋 Overview

In this lab, you'll build a **complete authentication system**with **React Router**and **protected routes** You'll learn how to implement user login, session management, route protection, and navigation patterns used in production web applications.

### What You'll Build

A multi-page React application with:
- **Public pages**(Home, About, Contact) - accessible to everyone
- **Protected pages**(Dashboard, Profile, Settings) - requires authentication
- **Login system**with session management
- **Route guards**to protect authenticated content
- **Navigation**with active link highlighting
- **Auth Context**for global authentication state

### Why This Matters

- **Essential Pattern** 90% of web applications require authentication
- **Route Protection** Learn to control access based on user state
- **State Management** Share authentication state across components
- **Professional Navigation** Implement navigation patterns users expect
- **Security Best Practices** Understand client-side authentication patterns

---

## Learning Objectives

By the end of this lab, you will:

### Routing Skills
- Set up React Router v6 with multiple routes
- Implement navigation with `Link` and `NavLink`
- Use route parameters for dynamic routing
- Create nested routes and layouts
- Navigate programmatically with `useNavigate`

### Authentication Skills
- Build an authentication context with React Context API
- Implement login and logout functionality
- Create protected route wrapper components
- Persist user sessions with `localStorage`
- Redirect users based on authentication state

### State Management
- Use Context API for global state
- Create custom authentication hooks
- Handle authentication state across the application
- Manage navigation state and redirects

---

## Pre-Lab Checklist

### Required Software
- [ ] **Node.js**(v18+) installed
- [ ] **npm**or **yarn**package manager
- [ ] **VS Code**or preferred code editor
- [ ] **Browser**(Chrome, Firefox, Safari, Edge)

### Verification Commands
```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 9.0.0 or higher
```

### Required Knowledge
- [ ] React fundamentals (components, props, state)
- [ ] React Hooks (`useState`, `useEffect`, `useContext`)
- [ ] TypeScript basics (interfaces, types)
- [ ] ES6+ features (arrow functions, destructuring, async/await)
- [ ] Completion of Labs 1-3

### Project Setup
```bash
# Create Vite + React + TypeScript project
npm create vite@latest lab4-routing-auth -- --template react-ts
cd lab4-routing-auth
npm install
npm install react-router-dom
```

---

## Exercises

---

### Exercise 1: Basic Routing Setup (40% Practice)

**Goal** Set up React Router with basic navigation and multiple pages.

#### Task 1.1: Install and Configure React Router (Guided)

**Step 1: Install React Router**
```bash
npm install react-router-dom
```

**Step 2: Create Basic Page Components**

Create three simple page components first:

```tsx
// src/pages/Home.tsx
export default function Home() {
  return (
    <div className="page-container">
      <h1>Welcome Home</h1>
      <p>This is the home page accessible to everyone.</p>
    </div>
  );
}

// src/pages/About.tsx
export default function About() {
  return (
    <div className="page-container">
      <h1>About Us</h1>
      <p>Learn more about our application.</p>
    </div>
  );
}

// src/pages/Contact.tsx
export default function Contact() {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <p>Get in touch with our team.</p>
    </div>
  );
}
```

**Step 3: Setup Router in App.tsx**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

**Test** Run `npm run dev`, manually navigate to:
- `http://localhost:5173/` → Home page
- `http://localhost:5173/about` → About page
- `http://localhost:5173/contact` → Contact page

---

#### Task 1.2: Create Navigation Bar (40% TODO)

**🔨 TODO** Create a navigation component with route links.

**Requirements**
1. Create `src/components/Navbar.tsx`
2. Use `Link` component for the logo/brand
3. Use `NavLink` components for navigation items (Home, About, Contact)
4. Apply `active` class to currently active links
5. Add the Navbar to `App.tsx` above the `<Routes>`

**Hints**

```tsx
// Import the routing components
import { Link, NavLink } from 'react-router-dom';

// NavLink provides an isActive prop in its className function
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  About
</NavLink>

// Add Navbar above Routes in App.tsx
<BrowserRouter>
  <Navbar />  {/* Add here */}
  <Routes>
    {/* routes */}
  </Routes>
</BrowserRouter>
```

**Navbar Structure Hint**
```tsx
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">MyApp</Link>
      <ul className="nav-links">
        <li><NavLink to="/" /* ... */>Home</NavLink></li>
        {/* Add other links */}
      </ul>
    </nav>
  );
}
```

**Expected Outcome**
- Navigation bar appears on all pages
- Logo/brand links to home page
- Nav links highlight when active
- Clicking links changes pages without full reload

**Solution** See `solutions/exercise1-routing/`

---

#### Task 1.3: Add Route Parameters (50% TODO)

**🔨 TODO** Create a products page with dynamic routing using URL parameters.

**Requirements**
1. Create `src/pages/Products.tsx` - displays list of products
2. Create `src/pages/ProductDetail.tsx` - displays single product details
3. Each product in the list should link to `/products/:id`
4. Use `useParams()` hook to get the `id` from URL
5. Use `useNavigate()` hook to add a "Back" button
6. Add Products link to Navbar

**Hints**

```tsx
// Products page with links
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product 1', price: 99.99 },
  { id: 2, name: 'Product 2', price: 149.99 },
  { id: 3, name: 'Product 3', price: 199.99 },
];

// Link to dynamic route
<Link to={`/products/${product.id}`}>
  {product.name}
</Link>

// ProductDetail page - extract ID from URL
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // Get :id from URL
  const navigate = useNavigate();

  // Find product by id...

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {/* Product details */}
    </div>
  );
}

// Add routes in App.tsx
<Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetail />} />
```

**Product Data Hint** Use the array provided above or create your own

**Expected Outcome**
- Products page shows list of clickable products
- Clicking a product navigates to `/products/1` (or 2, 3)
- Product detail page displays the correct product info
- Back button navigates to previous page
- URL changes reflect the current product

**Solution** See `solutions/exercise1-routing/`

---

### Exercise 2: Authentication Context (70% Practice)

**Goal** Build a complete authentication system using React Context API.

#### Task 2.1: Create Auth Context (Guided)

**Step 1: Create AuthContext File**

```tsx
// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types
interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Restore user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: 1,
          username,
          email: `${username}@example.com`,
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Step 2: Wrap App with AuthProvider**

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
```

**Test** No visible changes yet, but AuthContext is ready to use!

---

#### Task 2.2: Create Login Page (70% TODO)

**🔨 TODO** Build a login form that uses the AuthContext.

**Requirements**
1. Create `src/pages/Login.tsx`
2. Create a form with username and password fields
3. Use `useAuth()` hook to access the `login` function
4. Handle form submission and call `login(username, password)`
5. Show loading state while logging in
6. After successful login, redirect to `/dashboard` using `useNavigate()`
7. If user is already logged in, redirect to dashboard automatically
8. Add Login link to Navbar (show only when NOT logged in)

**Hints**

```tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
```

**Conditional Navbar Hint**
```tsx
// In Navbar component
const { isAuthenticated, user, logout } = useAuth();

{!isAuthenticated ? (
  <NavLink to="/login">Login</NavLink>
) : (
  <div>
    <span>Welcome, {user?.username}</span>
    <button onClick={logout}>Logout</button>
  </div>
)}
```

**Expected Outcome**
- Login form displays with username and password fields
- Submitting form shows loading state
- After login, redirects to dashboard
- Navbar shows "Login" link when logged out
- Navbar shows username and "Logout" when logged in
- Test credentials: any username/password works (simulated auth)

**Solution** See `solutions/exercise2-auth/`

---

#### Task 2.3: Create Protected Route Component (80% TODO)

**🔨 TODO** Build a wrapper component that protects routes from unauthenticated users.

**Requirements**
1. Create `src/components/ProtectedRoute.tsx`
2. Use `useAuth()` to check if user is authenticated
3. If authenticated, render the `children` components
4. If NOT authenticated, redirect to `/login` page
5. Use `useLocation()` to save the attempted URL
6. Pass the location to Login so it can redirect back after login

**Hints**

```tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, save attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render protected content
  return <>{children}</>;
}

export default ProtectedRoute;
```

**Using Location State in Login**(Update Login component):
```tsx
// In Login.tsx
const location = useLocation();
const from = location.state?.from?.pathname || '/dashboard';

// After login
navigate(from, { replace: true });
```

**Expected Outcome**
- Protected routes are inaccessible without login
- Attempting to access redirects to login
- After login, redirects back to attempted page
- Logged-in users can access protected routes

**Solution** See `solutions/exercise2-auth/`

---

#### Task 2.4: Create Protected Pages (90% TODO)

**🔨 TODO** Create Dashboard, Profile, and Settings pages, then protect them with authentication.

**Requirements**
1. Create `src/pages/Dashboard.tsx` - welcome message with user's name
2. Create `src/pages/Profile.tsx` - display user profile information
3. Create `src/pages/Settings.tsx` - user settings page
4. Wrap these routes with `<ProtectedRoute>` in App.tsx
5. Add navigation links to these pages in Navbar (only when authenticated)
6. Each page should display the current user's information from `useAuth()`

**Hints**

```tsx
// Example Dashboard page
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.username}!</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

// Wrapping routes in App.tsx
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

// Add to Navbar
{isAuthenticated && (
  <>
    <NavLink to="/dashboard">Dashboard</NavLink>
    <NavLink to="/profile">Profile</NavLink>
    <NavLink to="/settings">Settings</NavLink>
  </>
)}
```

**Profile Page Hint** Display user's id, username, email, and a sample bio

**Settings Page Hint** Create a form to "update" username (just update state, no backend)

**Expected Outcome**
- Dashboard, Profile, Settings pages created
- All three pages require authentication
- Trying to access while logged out redirects to login
- Pages display current user's information
- Navbar shows these links only when logged in
- Logout clears user and redirects to home

**Solution** See `solutions/exercise2-auth/`

---

### Exercise 3: Advanced Routing Patterns (85% Practice)

**Goal** Implement nested routes and programmatic navigation patterns.

#### Task 3.1: Nested Routes with Outlet (85% TODO)

**🔨 TODO** Convert Dashboard into a layout with nested routes.

**Requirements**
1. Update Dashboard to use `<Outlet />` for nested content
2. Create nested routes: `/dashboard/overview`, `/dashboard/stats`, `/dashboard/activity`
3. Create three sub-components: Overview, Stats, Activity
4. Add sidebar navigation within Dashboard
5. Default to Overview when visiting `/dashboard`

**Hints**

```tsx
// Dashboard as layout
import { Outlet, NavLink } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <nav>
          <NavLink to="/dashboard/overview">Overview</NavLink>
          <NavLink to="/dashboard/stats">Statistics</NavLink>
          <NavLink to="/dashboard/activity">Activity</NavLink>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet /> {/* Nested routes render here */}
      </main>
    </div>
  );
}

// In App.tsx - nested route structure
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
  <Route index element={<Overview />} />  {/* Default route */}
  <Route path="overview" element={<Overview />} />
  <Route path="stats" element={<Stats />} />
  <Route path="activity" element={<Activity />} />
</Route>
```

**Sub-components Hint**
```tsx
// src/pages/Dashboard/Overview.tsx
function Overview() {
  return <div><h1>Overview</h1><p>Dashboard overview...</p></div>;
}
```

**Expected Outcome**
- Dashboard has sidebar with sub-navigation
- Clicking sidebar links changes content area
- URL changes to `/dashboard/overview`, `/dashboard/stats`, etc.
- Default shows Overview when visiting `/dashboard`
- Main navbar still visible

**Solution** See `solutions/exercise3-advanced/`

---

## Bonus Challenges

### Bonus 1: Remember Me Functionality (Advanced)

**Challenge** Add "Remember Me" checkbox to login that persists authentication for 7 days.

**Hints**
- Add checkbox to login form
- Store timestamp along with user data
- Check timestamp on app load
- Auto-logout if expired

**Expected** Login persists across browser sessions when "Remember Me" is checked

---

### Bonus 2: User Role-Based Access (Advanced)

**Challenge** Add user roles (admin, user) and restrict certain routes based on role.

**Hints**
- Add `role` property to User interface
- Create `AdminRoute` component similar to `ProtectedRoute`
- Check `user.role === 'admin'` before rendering
- Create an Admin page accessible only to admins

**Expected** Admin routes only accessible to users with admin role

---

### Bonus 3: 404 Not Found Page (Medium)

**Challenge** Create a custom 404 page for invalid routes.

**Hints**
```tsx
// Add as last route in App.tsx
<Route path="*" element={<NotFound />} />
```

**Expected** Navigating to invalid URL shows custom 404 page with link to home

---

### Bonus 4: Loading Bar During Navigation (Advanced)

**Challenge** Show a loading bar at the top when navigating between routes.

**Hints**
- Use `useNavigation()` hook from React Router
- Create a `<NavigationBar />` component
- Show progress bar when `navigation.state === 'loading'`

**Expected** Visual feedback during route transitions

---

## Key Takeaways

### Routing Concepts
- React Router uses declarative routing with `<Route>` components
- `BrowserRouter` enables client-side routing
- `Link` and `NavLink` provide navigation without page reload
- Route parameters (`:id`) enable dynamic routing
- `useParams()` accesses URL parameters
- `useNavigate()` enables programmatic navigation
- Nested routes use `<Outlet />` for child rendering

### Authentication Patterns
- Context API provides global authentication state
- Custom hooks (`useAuth`) simplify context access
- Protected routes wrap components to control access
- `localStorage` persists user sessions
- Redirect logic preserves intended destinations
- Conditional rendering based on auth state

### State Management
- Context Provider wraps entire app
- Multiple consumers access same state
- State updates trigger re-renders in all consumers
- Custom hooks encapsulate context logic

---

## 🐛 Troubleshooting Guide

### Issue: "Cannot read property of undefined" when using useAuth

**Cause** Component not wrapped in `AuthProvider`

**Solution** Ensure `<AuthProvider>` wraps your `<App />` in `main.tsx`

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

---

### Issue: Protected routes redirect even when logged in

**Cause** User state not persisting or localStorage not loading

**Solution** Check `useEffect` in AuthContext is restoring user from localStorage

```tsx
useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);
```

---

### Issue: NavLink active class not working

**Cause** Using `className` as string instead of function

**Solution** Use function form:
```tsx
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
```

---

### Issue: Outlet not rendering nested routes

**Cause** Forgot to add child routes or missing `index` route

**Solution** Check route structure:
```tsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Overview />} />  {/* Add index! */}
  <Route path="stats" element={<Stats />} />
</Route>
```

---

## Self-Assessment Checklist

Before moving to Lab 5, ensure you can:

### Routing
- [ ] Set up React Router with `BrowserRouter`
- [ ] Create multiple routes with `<Route>`
- [ ] Navigate with `Link` and `NavLink`
- [ ] Access URL parameters with `useParams()`
- [ ] Navigate programmatically with `useNavigate()`
- [ ] Implement nested routes with `<Outlet>`

### Authentication
- [ ] Create a Context Provider for authentication
- [ ] Build a custom hook (`useAuth`) for context access
- [ ] Implement login and logout functions
- [ ] Persist user data with `localStorage`
- [ ] Protect routes based on authentication state
- [ ] Redirect users based on login status

### State Management
- [ ] Use Context API for global state
- [ ] Consume context in multiple components
- [ ] Update context state from any component
- [ ] Handle side effects with `useEffect`

### Best Practices
- [ ] TypeScript interfaces for type safety
- [ ] Error handling for login failures
- [ ] Loading states during async operations
- [ ] Conditional rendering based on state
- [ ] Clean component organization

---

## 📖 Additional Resources

### Official Documentation
- [React Router v6 Docs](https://reactrouter.com/)
- [React Context API](https://react.dev/reference/react/useContext)
- [TypeScript with React](https://react.dev/learn/typescript)

### Tutorials
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Authentication Patterns](https://reactrouter.com/en/main/start/overview#authentication)
- [Protected Routes Guide](https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5)

### Advanced Topics
- JWT authentication with real backends
- Refresh token patterns
- OAuth integration
- Session management best practices

---

## What's Next?

### Lab 5 Preview: Performance & Deployment
In the next lab, you'll learn:
- Code splitting and lazy loading
- Performance optimization with React.memo
- Virtual lists for large datasets
- Production build and deployment
- Environment configuration

### Continue Building Your Skills
- Add real backend API authentication
- Implement password reset flow
- Add multi-factor authentication
- Create user registration flow
- Build role-based admin panel

---


---

## ✅ Success Criteria Checklist

Before moving to Lesson 5, verify you can:

### **React Router**
- [ ] Set up BrowserRouter and Routes
- [ ] Create Route components with paths
- [ ] Use Link and NavLink for navigation
- [ ] Implement nested routes
- [ ] Handle route parameters and search params

### **Authentication Flow**
- [ ] Create login/signup forms
- [ ] Handle JWT token storage
- [ ] Implement logout functionality
- [ ] Manage authentication state globally
- [ ] Persist login across page refreshes

### **Protected Routes**
- [ ] Create ProtectedRoute component
- [ ] Redirect unauthenticated users
- [ ] Handle role-based access control
- [ ] Show loading states during auth checks
- [ ] Implement unauthorized page

### **Context API**
- [ ] Create AuthContext with createContext
- [ ] Build AuthProvider component
- [ ] Create custom useAuth hook
- [ ] Manage global authentication state
- [ ] Handle authentication errors

### **Advanced Features**
- [ ] Implement automatic token refresh
- [ ] Add password strength validation
- [ ] Create user profile management
- [ ] Handle authentication errors gracefully
- [ ] Implement remember me functionality

**Goal: Check at least 18/20 items before Lesson 5**

---

