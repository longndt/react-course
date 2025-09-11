# Quick Start Guide - Lesson 4

## Add Routing and Authentication

### 1. Setup Dependencies

```bash
# Install React Router and auth dependencies
npm install react-router-dom jwt-decode

# Continue with your existing React app
npm run dev
```

### 2. Create Authentication Context

Create `src/contexts/AuthContext.jsx`:

```javascript
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const authData = JSON.parse(stored);
        setUser(authData.user);
      } catch (error) {
        localStorage.removeItem("auth");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, this would call your API
    if (email && password) {
      const userData = {
        id: 1,
        name: email.split("@")[0],
        email,
        role: email.includes("admin") ? "admin" : "user",
      };

      const authData = { user: userData, token: "mock-jwt-token" };
      localStorage.setItem("auth", JSON.stringify(authData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### 3. Create Protected Route Component

Create `src/components/ProtectedRoute.jsx`:

```javascript
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <div>Access denied. Admin only.</div>;
  }

  return children;
}

export default ProtectedRoute;
```

### 4. Create Login Page

Create `src/pages/Login.jsx`:

```javascript
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (login(email, password)) {
      // Redirect handled by Navigate above
    } else {
      setError("Invalid credentials. Try any email and password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Login</h2>

      <div
        style={{
          backgroundColor: "#e7f3ff",
          padding: "10px",
          borderRadius: "4px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <strong>Demo Login:</strong>
        <br />
        • Use any email and password
        <br />
        • Use email with "admin" for admin access
        <br />• Example: admin@test.com / any password
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter any email"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter any password"
          />
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
```

### 5. Create Dashboard and Admin Pages

Create `src/pages/Dashboard.jsx`:

```javascript
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Dashboard</h1>
        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Welcome, {user.name}!</h3>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h4>Your Tasks</h4>
          <p>Manage your personal tasks and projects.</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h4>Profile Settings</h4>
          <p>Update your profile information.</p>
        </div>

        {user.role === "admin" && (
          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#fff3cd",
            }}
          >
            <h4>Admin Panel</h4>
            <p>Access administrative features.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
```

Create `src/pages/AdminPanel.jsx`:

```javascript
import { useAuth } from "../contexts/AuthContext";

function AdminPanel() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <p>Hello {user.name}, you have admin access!</p>

      <div style={{ display: "grid", gap: "20px", marginTop: "30px" }}>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>User Management</h3>
          <p>View and manage all users in the system.</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>System Settings</h3>
          <p>Configure application-wide settings.</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>Analytics</h3>
          <p>View system usage and performance metrics.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
```

### 6. Setup Routing in App

Update `src/main.jsx`:

```javascript
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
```

### 7. Update App with Routes

Update `src/App.jsx`:

```javascript
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <nav
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          My App
        </Link>

        {user && (
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/dashboard">Dashboard</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <span>Hello, {user.name}</span>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
```

## 🎉 Congratulations!

You now have:

- ✅ Client-side routing with React Router
- ✅ Authentication system with context
- ✅ Protected routes with role-based access
- ✅ Login/logout functionality
- ✅ Navigation between pages

## Test Your Setup

1. Visit your app - should redirect to login
2. Try login with any email/password - should work
3. Try admin@test.com for admin access
4. Navigate between Dashboard and Admin (if admin)
5. Logout and notice redirect to login

## Next Steps

1. Read the full [Lesson 4 README](./README.md)
2. Add real JWT authentication
3. Implement more advanced routing patterns
4. Complete the lab exercises

## Need Help?

- Check browser console for any routing errors
- Make sure all imports are correct
- Try different user roles to test access control
