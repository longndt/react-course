# Theory - Routing & Authentication

> **Purpose of this file**: Explains **WHY** routing and authentication patterns exist, **HOW** they work under the hood, and **WHEN** to use each approach. Code examples include explanatory comments.
>
> **Use Reference4 when you need**: Quick routing/auth syntax, patterns, copy-paste ready code.

---

## Table of Contents

1. [Why SPAs Need Routing](#1-why-spas-need-routing)
2. [How Client-Side Routing Works](#2-how-client-side-routing-works)
3. [React Router: Declarative Routing](#3-react-router-declarative-routing)
4. [Navigation Patterns](#4-navigation-patterns)
5. [Understanding Authentication](#5-understanding-authentication)
6. [JWT Tokens Explained](#6-jwt-tokens-explained)
7. [Protected Routes Pattern](#7-protected-routes-pattern)
8. [Global Auth State with Context](#8-global-auth-state-with-context)
9. [Common Mistakes](#9-common-mistakes)

---

## 1. Why SPAs Need Routing

### The Traditional Web Problem

```
User clicks link → Browser requests HTML → Server generates page → Full page reload
```

**Problems:**
- 🐌 Slow (full page reload every time)
- 🔄 Loses UI state (scroll position, form data)
- 💾 More bandwidth (re-downloads CSS/JS)
- 😵 Poor UX (flash of white, jarring transitions)

### SPA Solution: Client-Side Routing

```
User clicks link → JavaScript updates URL → React renders new component → Same page!
```

**Benefits:**
- ⚡ Fast (no page reload)
- 🎨 Smooth transitions
- 💾 Less bandwidth (only data transfers)
- 📱 App-like experience

```jsx
// ❌ Traditional: Full page reload
<a href="/about">About</a>

// ✅ SPA: No reload, instant transition
<Link to="/about">About</Link>
```

---

## 2. How Client-Side Routing Works

### The Browser History API

```typescript
// What React Router uses under the hood:

// Push new URL to history
window.history.pushState({}, '', '/about');

// Listen for back/forward button
window.addEventListener('popstate', () => {
  // Update UI based on new URL
});

// React Router abstracts this complexity for you!
```

### URL vs UI State

```jsx
// URL changes = UI updates
// /users        → Shows UserList component
// /users/123    → Shows UserProfile component
// /users?page=2 → Shows UserList page 2

// React Router keeps URL and UI in sync automatically!
```

**Why this matters**: URLs are bookmarkable and shareable. User refreshes = same view.

---

## 3. React Router: Declarative Routing

### What is Declarative Routing?

```jsx
// ❌ Imperative (manual DOM manipulation)
if (url === '/') {
  document.getElementById('root').innerHTML = '<Home />';
} else if (url === '/about') {
  document.getElementById('root').innerHTML = '<About />';
}

// ✅ Declarative (describe what you want)
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

**Key Insight**: Just describe the URL→Component mapping. React Router handles the rest.

### Route Matching

```jsx
<Routes>
  {/* Exact match */}
  <Route path="/" element={<Home />} />
  
  {/* Dynamic parameter */}
  <Route path="/users/:id" element={<UserProfile />} />
  
  {/* Wildcard (catch-all) */}
  <Route path="*" element={<NotFound />} />
</Routes>

// URL: /users/123
// Matches: /users/:id
// Component: <UserProfile /> (with id="123")
```

---

## 4. Navigation Patterns

### Link vs Anchor Tag

```jsx
// ❌ Regular anchor - FULL PAGE RELOAD
<a href="/about">About</a>

// ✅ React Router Link - NO RELOAD
<Link to="/about">About</Link>

// Why? <Link> prevents default browser behavior and uses pushState
```

### When to Use Programmatic Navigation

```jsx
// ❌ Don't force programmatic navigation for simple links
function BadButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/about')}>About</button>;
  // Just use <Link to="/about">About</Link>!
}

// ✅ Use programmatic navigation after actions
function GoodLoginForm() {
  const navigate = useNavigate();
  
  async function handleSubmit(credentials) {
    await login(credentials);  // Wait for async operation
    navigate('/dashboard');    // THEN navigate
  }
}

// ✅ Use for conditional navigation
function CheckAuthButton() {
  const navigate = useNavigate();
  
  function handleClick() {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }
}
```

---

## 5. Understanding Authentication

### Authentication vs Authorization

```typescript
// Authentication: "WHO are you?"
// User proves identity with credentials (email/password)

// Authorization: "WHAT can you do?"
// Server checks user's permissions (admin, user, guest)

// Example:
// Authentication: John logs in ✓
// Authorization: Is John allowed to delete posts? (Check role)
```

### Stateless vs Stateful Authentication

**Stateful (Session-based):**

```
1. User logs in
2. Server creates session, stores in database
3. Server sends session ID cookie to client
4. Client sends cookie with every request
5. Server looks up session in database

❌ Problem: Server must store all sessions (doesn't scale!)
```

**Stateless (JWT-based):**

```
1. User logs in
2. Server creates JWT token (self-contained)
3. Server sends token to client
4. Client stores token, sends with every request
5. Server verifies token signature (no database lookup!)

✅ Benefit: Scales horizontally (no shared session storage needed)
```

---

## 6. JWT Tokens Explained

### What is a JWT?

**JWT = JSON Web Token = Base64-encoded JSON**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkpvaG4iLCJpYXQiOjE2MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

       HEADER                                      PAYLOAD                                            SIGNATURE
```

**Decoded:**

```json
// HEADER (algorithm)
{ "alg": "HS256", "typ": "JWT" }

// PAYLOAD (user data)
{ "userId": 123, "name": "John", "role": "admin", "iat": 1616239022 }

// SIGNATURE (verification)
HMACSHA256(header + payload, SECRET_KEY)
```

### Why JWT is Secure

```typescript
// ❌ User tries to tamper with token
const token = "header.payload.signature";
const [header, payload, sig] = token.split('.');

// User changes payload: { userId: 123 } → { userId: 456 }
const tamperedPayload = btoa(JSON.stringify({ userId: 456 }));
const tamperedToken = `${header}.${tamperedPayload}.${sig}`;

// Server verifies:
const expectedSig = HMAC(header + tamperedPayload, SECRET_KEY);
if (expectedSig !== sig) {
  // ❌ Signatures don't match! Token rejected!
}
```

**Key Point**: Without the secret key, user cannot create valid signatures!

### JWT Storage: localStorage vs Cookie

```typescript
// Option 1: localStorage (common in SPAs)
localStorage.setItem('token', token);
// ✅ Simple, works with CORS
// ❌ Vulnerable to XSS (JavaScript can access)

// Option 2: httpOnly cookie (more secure)
// Server sets: Set-Cookie: token=...; HttpOnly; Secure
// ✅ JavaScript cannot access (XSS protection)
// ❌ Requires same origin or CORS configuration

// Best Practice: Use httpOnly cookies when possible
```

---

## 7. Protected Routes Pattern

### Why Protected Routes?

```jsx
// ❌ Without protection: Anyone can access admin panel!
<Route path="/admin" element={<AdminPanel />} />

// User types /admin → Sees admin panel (bad!)
```

### How Protected Routes Work

```jsx
// ✅ Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, show the protected content
  return <>{children}</>;
}

// Usage
<Route path="/admin" element={
  <ProtectedRoute>
    <AdminPanel />
  </ProtectedRoute>
} />
```

**Flow:**

```
1. User navigates to /admin
2. ProtectedRoute checks authentication
3a. Authenticated? → Show AdminPanel
3b. Not authenticated? → Redirect to /login
```

### Role-Based Protection

```jsx
// Check both authentication AND authorization
function AdminRoute({ children }) {
  const { user } = useAuth();
  
  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Logged in but not admin
  if (user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }
  
  // Admin user - show content
  return <>{children}</>;
}
```

---

## 8. Global Auth State with Context

### The Prop Drilling Problem

```jsx
// ❌ Passing user through every component!
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  return <div>{user.name}</div>;  // Finally used here!
}
```

### Context API Solution

```jsx
// ✅ Create context once
const AuthContext = createContext();

// Provider at top level
function App() {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Layout />
    </AuthContext.Provider>
  );
}

// Consume anywhere (no prop passing!)
function UserMenu() {
  const { user } = useContext(AuthContext);
  return <div>{user?.name}</div>;
}
```

### Auth Context Pattern

```jsx
// Complete auth context with login/logout
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    const { token, user } = await response.json();
    localStorage.setItem('token', token);
    setUser(user);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  const isAuthenticated = user !== null;
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easier access
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be inside AuthProvider');
  return context;
}
```

---

## 9. Common Mistakes

### Mistake 1: Using `<a>` Instead of `<Link>`

```jsx
// ❌ Full page reload!
<a href="/about">About</a>

// ✅ Client-side navigation
<Link to="/about">About</Link>
```

### Mistake 2: Not Handling Token Expiration

```jsx
// ❌ Token expires, user sees errors
function BadComponent() {
  const token = localStorage.getItem('token');
  // Doesn't check if token is expired!
}

// ✅ Check expiration, refresh if needed
function GoodComponent() {
  const token = localStorage.getItem('token');
  
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      // Token expired - log out
      logout();
    }
  }
}
```

### Mistake 3: Storing Sensitive Data in JWT

```jsx
// ❌ BAD: JWT payload is visible to anyone!
const token = {
  userId: 123,
  password: 'secret123',      // DON'T!
  creditCard: '1234-5678',    // DON'T!
  ssn: '123-45-6789'          // DON'T!
};

// ✅ GOOD: Only non-sensitive data
const token = {
  userId: 123,
  email: 'john@example.com',  // OK
  role: 'user',               // OK
  iat: 1616239022             // OK
};
```

### Mistake 4: Not Handling Navigation State

```jsx
// ❌ User redirected to login, then back to home (lost original destination)
function Bad() {
  if (!isAuthenticated) {
    navigate('/login');
  }
}

// ✅ Remember where user wanted to go
function Good() {
  const location = useLocation();
  
  if (!isAuthenticated) {
    navigate('/login', { state: { from: location } });
  }
}

// In Login component:
function Login() {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  async function handleLogin() {
    await login();
    navigate(from);  // Go back to original destination
  }
}
```

---

## Next Steps

You now understand:
- ✅ **Why** SPAs use client-side routing (performance, UX)
- ✅ **How** React Router works (declarative routing, history API)
- ✅ **Why** JWT is used (stateless, scalable)
- ✅ **How** to protect routes (auth checks, role-based access)
- ✅ **When** to use Context (global auth state)

**Practice**: Head to `lab4.md` for hands-on exercises!

**Quick Reference**: See `reference4.md` for routing/auth syntax and patterns.

