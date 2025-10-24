# Lab 4 - Exercise 2: Authentication Solution

## 📋 Overview

Complete solution demonstrating **React Router authentication**with **Context API** **Protected Routes** and **session management**

This solution showcases:
- AuthContext with React Context API
- Protected Route wrapper component
- Login page with form handling
- Session persistence with localStorage
- Protected pages (Dashboard, Profile, Settings)
- Conditional navigation based on auth state
- Redirect after login to intended page
- Mock authentication system

---

## Project Structure

```
exercise2-auth/
├── src/
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication context & provider
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation with auth state
│   │   ├── Navbar.css            # Navbar styling
│   │   └── ProtectedRoute.tsx    # Route protection wrapper
│   ├── pages/
│   │   ├── Home.tsx              # Public home page
│   │   ├── Login.tsx             # Login form
│   │   ├── Login.css             # Login page styling
│   │   ├── Dashboard.tsx         # Protected dashboard
│   │   ├── Profile.tsx           # Protected profile page
│   │   └── Settings.tsx          # Protected settings page
│   ├── App.tsx                   # Router with protected routes
│   ├── App.css                   # Application styles
│   ├── main.tsx                  # Entry point with AuthProvider
│   └── index.css                 # Global styles
├── package.json                  # Dependencies
└── readme.md                     # This file
```

---

## Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

App will start at: `http://localhost:5173`

---

## Key Concepts Explained

### 1. Authentication Context

**AuthContext.tsx**- Global authentication state:

```tsx
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    // Authenticate user...
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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

**Key Features:**
- `user` state holds current user data
- `isAuthenticated` computed from user existence
- `isLoading` prevents flicker during initialization
- Session persistence with localStorage
- Mock authentication for demo

---

### 2. Protected Route Component

**ProtectedRoute.tsx**- Wrapper to protect routes:

```tsx
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content
  return <>{children}</>;
}
```

**How It Works:**
1. Check `isLoading` - show spinner if still checking
2. Check `isAuthenticated` - redirect to login if false
3. Save current location in state for redirect after login
4. Render children if authenticated

---

### 3. Using Protected Routes

**App.tsx**- Wrap routes with ProtectedRoute:

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />

  {/* Protected Routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
</Routes>
```

---

### 4. Login Page with Redirect

**Login.tsx**- Handle login and redirect:

```tsx
export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page they were trying to access
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate(from, { replace: true });  // Redirect to intended page
    } catch (err) {
      setError(err.message);
    }
  };
}
```

**Login Flow:**
1. User tries to access `/dashboard`
2. ProtectedRoute redirects to `/login` with `state: { from: '/dashboard' }`
3. After successful login, navigate to `/dashboard`
4. If no `from` state, default to `/dashboard`

---

### 5. Conditional Navigation

**Navbar.tsx**- Show/hide links based on auth:

```tsx
export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>

        {/* Show only when authenticated */}
        {isAuthenticated && (
          <>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
          </>
        )}
      </ul>

      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}
```

---

## 🔐 Demo Credentials

```
Admin Account:
Username: admin
Password: admin123

User Account:
Username: user
Password: user123
```

---

## Features Implemented

### Authentication
- [x] Login form with validation
- [x] Mock authentication system
- [x] Error handling for failed login
- [x] Loading state during login
- [x] Session persistence with localStorage
- [x] Logout functionality
- [x] Auto-login from saved session

### Route Protection
- [x] ProtectedRoute component
- [x] Redirect to login when not authenticated
- [x] Save intended destination
- [x] Redirect to intended page after login
- [x] Loading state during auth check
- [x] Prevent access to protected pages

### UI/UX
- [x] Conditional navigation menu
- [x] User greeting in navbar
- [x] Login/Logout button states
- [x] Protected page content
- [x] Dashboard with stats
- [x] Profile page with user info
- [x] Settings page with toggles
- [x] Professional styling

---

## 🐛 Troubleshooting

### Issue: Redirects to login on refresh

**Cause:**localStorage not being read properly

**Solution:**Check AuthContext useEffect runs on mount:
```tsx
useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
  setIsLoading(false);  // Important!
}, []);
```

---

### Issue: Can't access protected routes after login

**Cause:**Not wrapping routes with ProtectedRoute

**Solution:**
```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

### Issue: useAuth() throws error

**Cause:**Component not wrapped in AuthProvider

**Solution:**Wrap App with AuthProvider in main.tsx:
```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

---

## Learning Objectives Achieved

 **Context API**
- Creating authentication context
- Providing global auth state
- Custom useAuth hook
- Context best practices

 **Protected Routes**
- Route protection patterns
- Conditional routing
- Redirect with location state
- Loading states

 **Authentication Flow**
- Login/logout functionality
- Session persistence
- Mock authentication
- Error handling

 **State Management**
- Global auth state
- LocalStorage integration
- Loading states
- User data management

---

## Next Steps

### Completed
- Authentication Context
- Protected Routes
- Login/Logout
- Session Persistence

### Bonus Challenges

1. **Remember Me**- Add checkbox to persist login longer
2. **Token Expiration**- Implement auto-logout after timeout
3. **Role-Based Access**- Different routes for admin vs user
4. **Password Reset**- Add forgot password flow
5. **Real API**- Connect to actual backend authentication

---

** Exercise 2 Complete!**You've mastered React Router authentication patterns used in production applications!
