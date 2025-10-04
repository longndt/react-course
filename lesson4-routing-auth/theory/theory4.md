# Theory 4: Navigation, Authentication & Advanced Patterns

---

## Why Do We Need Navigation? 🤔

Think of a website like a book:

- Each page has different content
- You can move between pages
- Some pages are public
- Some pages need permission to view

**Website Structure Example:**

```
📱 My Website
├── 🏠 Home Page (public)
├── ℹ️ About Page (public)
├── 👤 Profile Page (private)
└── ⚙️ Settings Page (private)
```

---

## Setting Up Navigation 🛠️

### 1. Install React Router

```bash
npm install react-router-dom
```

### 2. Basic Setup

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* All your routes go here */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />

        {/* About page */}
        <Route path="/about" element={<AboutPage />} />

        {/* Contact page */}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. Creating Navigation Links

```tsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

// Style your navigation
const styles = `
.nav {
  background: #f8f9fa;
  padding: 1rem;
}

.nav a {
  margin-right: 1rem;
  color: #333;
  text-decoration: none;
}

.nav a:hover {
  color: #007bff;
}
`;
```

````

---

## User Login System 🔐

### 1. User State Management
```tsx
function App() {
  // Store user info
  const [user, setUser] = useState(null);

  // Login function
  const login = (username, password) => {
    // In real app, check with server
    if (username === "test" && password === "test") {
      setUser({ username });
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <LoginPage onLogin={login} />
        }/>
      </Routes>
    </BrowserRouter>
  );
}
````

### 2. Login Form

````tsx
import { useState, FormEvent } from 'react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

---

## Protecting Private Pages 🔒

### Protected Route Component
```tsx
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role?: string;
}

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useUser(); // Get user from context/state

  // If not logged in, go to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If logged in, show the page
  return <>{children}</>;
}

// Using Protected Route
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Private pages */}
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }/>

        <Route path="/settings" element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
````

## Common Mistakes to Avoid ⚠️

### 1. Forgetting to Use BrowserRouter

````tsx
// ❌ Wrong - No BrowserRouter
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

// ✅ Correct - With BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

---

## Practice Time! 💪

### Exercise: Build a Mini Blog
Create a simple blog with:
1. Home page (list of posts)
2. Single post page
3. Admin page (protected)
4. Login page

```tsx
// Example Structure
function BlogApp() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/admin">Admin</Link>
            <button onClick={() => setUser(null)}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
````

## Need Help? 🆘

### Common Problems:

1. Page not found?

   - Check route path spelling
   - Make sure component exists
   - Verify BrowserRouter is used

2. Can't access private page?
   - Check if user is logged in
   - Verify PrivateRoute setup
   - Check navigation logic

### Useful Resources:

- [React Router Guide](https://reactrouter.com/en/main/start/tutorial)
- [Navigation Examples](https://reactrouter.com/en/main/start/examples)
- Ask your teacher!

## Homework 📝

### Create a Simple Shop

Build an online shop with:

1. Product list page (public)
2. Product detail page (public)
3. Shopping cart (private)
4. Checkout page (private)

Tips:

- Start with public pages
- Add navigation
- Then add protected pages
- Finally add login system


