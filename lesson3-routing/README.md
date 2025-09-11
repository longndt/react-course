# Lesson 3: React Router & Authentication

## Overview

This lesson covers modern routing in React applications, authentication patterns, and securing routes.

## Prerequisites

- Completion of Lessons 1 & 2
- Understanding of React hooks
- Basic knowledge of JWT
- Familiarity with REST APIs

## Theory (45 minutes)

### 1. React Router 6

- New features and changes
- Route configuration
- Navigation and history
- Route parameters
- Nested routes
- Outlet component

### 2. Authentication Patterns

- JWT authentication
- OAuth 2.0 flows
- Social login integration
- Token management
- Refresh token patterns

### 3. Protected Routes

- Route guards
- Role-based access
- Permission management
- Authentication state

## Demo (45 minutes)

### 1. Router Setup

```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### 2. Authentication Implementation

```tsx
// useAuth.ts
interface AuthState {
  user: User | null;
  token: string | null;
}

const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: localStorage.getItem("token"),
  });

  const login = async (credentials: Credentials) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    setAuth(data);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("token");
  };

  return { ...auth, login, logout };
};
```

### 3. Protected Route Component

```tsx
// ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

## Lab Exercises (90 minutes)

### Exercise 1: Router Setup (30 mins)

1. Create a multi-page application with:
   - Home page
   - Dashboard
   - Profile page
   - Settings
2. Implement nested routes
3. Add navigation guards

### Exercise 2: Authentication System (30 mins)

1. Implement JWT authentication
2. Create login/register forms
3. Handle token storage
4. Implement refresh token logic

### Exercise 3: Protected Routes (30 mins)

1. Create protected route component
2. Implement role-based access
3. Add permission checks
4. Handle unauthorized access

## Project Structure

```
src/
├── auth/
│   ├── useAuth.ts
│   ├── AuthContext.tsx
│   └── ProtectedRoute.tsx
├── pages/
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   └── Login.tsx
└── components/
    ├── Navigation.tsx
    └── Layout.tsx
```

## Additional Resources

- [React Router Documentation](https://reactrouter.com)
- [JWT.io](https://jwt.io)
- [OAuth 2.0 Simplified](https://www.oauth.com)
- [Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react)

## Homework

1. Add social login (Google, GitHub)
2. Implement remember me functionality
3. Add password reset flow
4. Create role-based dashboard
5. Add session management
