# Routing & Authentication

## Lesson 3 - Navigation and Security

---

### Learning Objectives

By the end of this lesson, you will be able to:

- Implement React Router v6
- Create protected routes
- Handle authentication
- Manage user sessions

---

### React Router Setup

```typescript
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />}>
            <Route path=":id" element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

### Authentication Context

```typescript
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: Credentials) => {
    // Implementation
  };

  const logout = () => {
    // Implementation
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

### Protected Routes

```typescript
function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
}
```

---

### Route Types

1. Public Routes

   - Home
   - About
   - Products

2. Protected Routes

   - Profile
   - Dashboard
   - Settings

3. Special Routes
   - 404 Not Found
   - Error Pages
   - Maintenance

---

### Authentication Flow

1. User Login
2. Token Storage
3. Protected Routes
4. Token Refresh
5. Logout

---

### Best Practices

1. Routing

   - Clear Route Structure
   - Nested Routes
   - Route Parameters
   - Loading States

2. Authentication
   - Secure Token Storage
   - Token Refresh
   - Error Handling
   - Session Management

---

### Common Pitfalls

1. Routing Issues

   - Missing Routes
   - Improper Nesting
   - Navigation State Loss

2. Auth Issues
   - Token Exposure
   - Session Handling
   - Race Conditions

---

### Practical Exercise

Create an Auth Flow:

```typescript
function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials: Credentials) => {
    await auth.login(credentials);
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    // Login form implementation
  );
}
```

---

### Additional Resources

- [React Router Documentation](https://reactrouter.com)
- [Auth Best Practices](https://auth0.com/blog/complete-guide-to-react-user-authentication/)
- [JWT Security](https://jwt.io/introduction)
