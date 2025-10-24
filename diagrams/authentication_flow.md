# Authentication & Authorization Flow Diagrams

## 1. Complete Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant React
    participant API
    participant Backend
    participant Database

    rect rgb(255, 255, 200)
        Note over User,Database: REGISTRATION FLOW
        User->>Browser: Fill registration form
        Browser->>React: Submit form
        React->>API: POST /api/auth/register<br/>{email, password, name}
        API->>Backend: Validate data
        Backend->>Backend: Hash password (bcrypt)
        Backend->>Database: Save user
        Database-->>Backend: User created
        Backend->>Backend: Generate JWT token
        Backend-->>API: {token, user}
        API-->>React: Store token
        React->>Browser: Redirect to dashboard
    end

    rect rgb(200, 255, 200)
        Note over User,Database: LOGIN FLOW
        User->>Browser: Enter credentials
        Browser->>React: Submit login
        React->>API: POST /api/auth/login<br/>{email, password}
        API->>Backend: Find user by email
        Backend->>Database: Query user
        Database-->>Backend: User data
        Backend->>Backend: Compare password hash

        alt Credentials Valid
            Backend->>Backend: Generate JWT token
            Backend-->>API: {token, user}
            API->>Browser: Store token (localStorage/cookie)
            API-->>React: Update auth state
            React->>Browser: Redirect to dashboard
        else Invalid Credentials
            Backend-->>API: 401 Unauthorized
            API-->>React: Show error
            React->>Browser: Display error message
        end
    end

    rect rgb(255, 200, 200)
        Note over User,Database: LOGOUT FLOW
        User->>Browser: Click logout
        Browser->>React: Trigger logout
        React->>Browser: Clear token from storage
        React->>React: Reset auth state
        React->>Browser: Redirect to login
    end
```

---

## 2. JWT Token Lifecycle

```mermaid
stateDiagram-v2
    [*] --> NoToken: User not logged in

    NoToken --> Login: User logs in
    Login --> TokenCreated: Server creates JWT

    TokenCreated --> TokenStored: Store in localStorage/cookie
    TokenStored --> TokenActive: Token valid & active

    TokenActive --> TokenRefresh: Token near expiry
    TokenRefresh --> TokenActive: New token issued

    TokenActive --> TokenExpired: Time passes (24h)
    TokenExpired --> Login: Must re-login

    TokenActive --> Logout: User logs out
    Logout --> TokenCleared: Clear from storage
    TokenCleared --> NoToken

    TokenActive --> [*]: Session ends

    note right of TokenCreated
        JWT contains:
        - User ID
        - Email
        - Roles
        - Issued At (iat)
        - Expires At (exp)
    end note

    note right of TokenActive
        Every API request:
        Authorization: Bearer <token>
    end note
```

---

## 3. Protected Route Flow

```mermaid
flowchart TD
    Start[User navigates to /dashboard] --> Check{Auth<br/>token<br/>exists?}

    Check -->|No| Redirect1[Redirect to /login]
    Check -->|Yes| Validate{Token<br/>valid?}

    Validate -->|Expired| Refresh{Refresh<br/>token<br/>available?}
    Validate -->|Invalid| Redirect2[Redirect to /login]
    Validate -->|Valid| Authorize{Has<br/>permission?}

    Refresh -->|Yes| GetNew[Get new token]
    Refresh -->|No| Redirect3[Redirect to /login]

    GetNew --> Success{Success?}
    Success -->|Yes| Authorize
    Success -->|No| Redirect4[Redirect to /login]

    Authorize -->|Yes| Render[✅ Render Dashboard]
    Authorize -->|No| Forbidden[❌ 403 Forbidden page]

    style Render fill:#d4edda
    style Redirect1 fill:#ffe1e1
    style Redirect2 fill:#ffe1e1
    style Redirect3 fill:#ffe1e1
    style Redirect4 fill:#ffe1e1
    style Forbidden fill:#fff3cd
```

**Code Example**
```typescript
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## 4. Auth Context Provider Pattern

```mermaid
graph TD
    App[App Root] --> AuthProvider[AuthProvider Component]

    AuthProvider --> State1[State: user]
    AuthProvider --> State2[State: token]
    AuthProvider --> State3[State: loading]

    AuthProvider --> Method1[login method]
    AuthProvider --> Method2[logout method]
    AuthProvider --> Method3[register method]

    AuthProvider --> Children[Component Tree]

    Children --> Login[Login Component<br/>useAuth]
    Children --> Dashboard[Dashboard<br/>useAuth]
    Children --> Profile[Profile<br/>useAuth]

    Login --> Method1
    Dashboard --> State1
    Profile --> State1
    Profile --> Method2

    style AuthProvider fill:#e1f5e1
    style Login fill:#cce5ff
    style Dashboard fill:#cce5ff
    style Profile fill:#cce5ff
```

**Code Example**
```typescript
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verify token on mount
    if (token) {
      verifyToken(token)
        .then(user => setUser(user))
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const register = async (data: RegisterData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Registration failed');

    const result = await response.json();
    setToken(result.token);
    setUser(result.user);
    localStorage.setItem('token', result.token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

---

## 5. API Request with Auth Token

```mermaid
sequenceDiagram
    participant Component
    participant AuthContext
    participant API
    participant Backend

    Component->>AuthContext: Get token
    AuthContext-->>Component: Return token

    Component->>API: fetch('/api/protected')<br/>Authorization: Bearer <token>

    API->>Backend: Forward request
    Backend->>Backend: Verify JWT signature
    Backend->>Backend: Check expiration
    Backend->>Backend: Extract user info

    alt Token Valid
        Backend->>Backend: Process request
        Backend-->>API: 200 OK + data
        API-->>Component: Return data
    else Token Expired
        Backend-->>API: 401 Unauthorized<br/>{message: "Token expired"}
        API-->>Component: Error
        Component->>AuthContext: logout()
        AuthContext->>Component: Redirect to login
    else Token Invalid
        Backend-->>API: 401 Unauthorized<br/>{message: "Invalid token"}
        API-->>Component: Error
        Component->>AuthContext: logout()
    end
```

**Code Example**
```typescript
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  return response;
}

// Usage
const data = await fetchWithAuth('/api/protected-data');
```

---

## 6. Role-Based Access Control (RBAC)

```mermaid
graph TD
    User[User Object] --> Roles[User Roles]

    Roles --> Admin[Admin Role]
    Roles --> Editor[Editor Role]
    Roles --> Viewer[Viewer Role]

    Admin --> P1[Can create users]
    Admin --> P2[Can delete anything]
    Admin --> P3[Can edit everything]
    Admin --> P4[Can view all]

    Editor --> P3
    Editor --> P4
    Editor --> P5[Can edit own content]

    Viewer --> P4

    Resource[Protected Resource] --> Check{User has<br/>required<br/>role?}

    Check -->|Yes| Grant[✅ Grant Access]
    Check -->|No| Deny[❌ Deny Access]

    style Admin fill:#ffe1e1
    style Editor fill:#fff3cd
    style Viewer fill:#e1f5e1
    style Grant fill:#d4edda
    style Deny fill:#ffe1e1
```

**Code Example**
```typescript
// Backend: Middleware to check roles
function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // From JWT verification

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const hasRole = allowedRoles.some(role => user.roles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
}

// Usage in routes
app.delete('/api/users/:id', requireRole('admin'), deleteUser);
app.post('/api/posts', requireRole('admin', 'editor'), createPost);
app.get('/api/posts', requireRole('admin', 'editor', 'viewer'), getPosts);
```

**Frontend: Role-based component**
```typescript
function RequireRole({
  roles,
  children,
  fallback = null
}: {
  roles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) return fallback;

  const hasRole = roles.some(role => user.roles.includes(role));

  return hasRole ? <>{children}</> : <>{fallback}</>;
}

// Usage
<RequireRole roles={['admin']}>
  <DeleteButton />
</RequireRole>

<RequireRole roles={['admin', 'editor']} fallback={<ReadOnlyView />}>
  <EditForm />
</RequireRole>
```

---

## 7. Token Refresh Flow

```mermaid
sequenceDiagram
    participant Component
    participant API
    participant Backend
    participant TokenService

    Component->>API: Request with access token
    API->>Backend: Validate access token

    alt Access Token Valid
        Backend-->>API: 200 OK + data
        API-->>Component: Return data
    else Access Token Expired
        Backend-->>API: 401 Token Expired
        API->>TokenService: Request token refresh

        TokenService->>Backend: POST /api/auth/refresh<br/>refresh_token

        alt Refresh Token Valid
            Backend->>Backend: Verify refresh token
            Backend->>Backend: Generate new access token
            Backend-->>TokenService: New access token
            TokenService->>API: Retry original request<br/>with new token
            API->>Backend: Retry request
            Backend-->>API: 200 OK + data
            API-->>Component: Return data
        else Refresh Token Expired
            Backend-->>TokenService: 401 Refresh Failed
            TokenService->>Component: Redirect to login
        end
    end
```

**Code Example**
```typescript
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Refresh failed');
  }

  const { accessToken } = await response.json();
  localStorage.setItem('token', accessToken);
  return accessToken;
}

async function fetchWithTokenRefresh(url: string, options: RequestInit = {}) {
  try {
    return await fetchWithAuth(url, options);
  } catch (error) {
    if (error.status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;

        // Retry failed requests
        failedQueue.forEach(({ resolve }) => resolve(newToken));
        failedQueue = [];

        // Retry original request
        return await fetchWithAuth(url, options);
      } catch (refreshError) {
        isRefreshing = false;
        failedQueue.forEach(({ reject }) => reject(refreshError));
        failedQueue = [];

        // Redirect to login
        window.location.href = '/login';
        throw refreshError;
      }
    }

    throw error;
  }
}
```

---

## 8. Social OAuth Flow (Google/GitHub)

```mermaid
sequenceDiagram
    participant User
    participant App
    participant OAuth
    participant Backend
    participant Database

    User->>App: Click "Login with Google"
    App->>OAuth: Redirect to Google<br/>with client_id & redirect_uri

    OAuth->>User: Google login page
    User->>OAuth: Enter credentials
    OAuth->>User: "Allow app to access?"
    User->>OAuth: Click "Allow"

    OAuth->>App: Redirect back with code
    App->>Backend: POST /api/auth/google<br/>{code}

    Backend->>OAuth: Exchange code for tokens
    OAuth-->>Backend: access_token, id_token

    Backend->>OAuth: Get user profile
    OAuth-->>Backend: User data (email, name, picture)

    Backend->>Database: Find or create user
    Database-->>Backend: User record

    Backend->>Backend: Generate JWT token
    Backend-->>App: {token, user}

    App->>App: Store token
    App->>User: Redirect to dashboard
```

**Code Example**
```typescript
// Frontend: Initiate OAuth
function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const clientId = 'YOUR_GOOGLE_CLIENT_ID';
    const redirectUri = 'http://localhost:5173/auth/callback/google';
    const scope = 'openid email profile';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope,
    })}`;

    window.location.href = url;
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
}

// Frontend: Handle callback
function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        })
        .catch(err => {
          console.error('OAuth error:', err);
          navigate('/login');
        });
    }
  }, [searchParams]);

  return <LoadingSpinner />;
}

// Backend: Handle OAuth callback
app.post('/api/auth/google', async (req, res) => {
  const { code } = req.body;

  // Exchange code for tokens
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'http://localhost:5173/auth/callback/google',
      grant_type: 'authorization_code',
    }),
  });

  const tokens = await tokenResponse.json();

  // Get user profile
  const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  const profile = await profileResponse.json();

  // Find or create user
  let user = await User.findOne({ email: profile.email });
  if (!user) {
    user = await User.create({
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: 'google',
    });
  }

  // Generate JWT
  const jwt = generateToken(user);

  res.json({ token: jwt, user });
});
```

---

## 9. Password Reset Flow

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Backend
    participant Email
    participant Database

    User->>App: Click "Forgot Password"
    App->>User: Show email input form
    User->>App: Enter email

    App->>Backend: POST /api/auth/forgot-password<br/>{email}
    Backend->>Database: Find user by email

    alt User Exists
        Database-->>Backend: User found
        Backend->>Backend: Generate reset token<br/>(expires in 1 hour)
        Backend->>Database: Save reset token
        Backend->>Email: Send reset email<br/>with token link
        Email->>User: Receive email
        Backend-->>App: Success message

        User->>Email: Click reset link
        Email->>App: Open /reset-password?token=XXX

        App->>User: Show new password form
        User->>App: Enter new password

        App->>Backend: POST /api/auth/reset-password<br/>{token, newPassword}
        Backend->>Database: Validate token & expiry

        alt Token Valid
            Backend->>Backend: Hash new password
            Backend->>Database: Update password
            Backend->>Database: Invalidate reset token
            Backend-->>App: Success
            App->>User: Redirect to login
        else Token Invalid/Expired
            Backend-->>App: Error
            App->>User: Show error message
        end
    else User Not Found
        Database-->>Backend: Not found
        Backend-->>App: Success message<br/>(security: don't reveal)
    end
```

---

## 10. Session Management Comparison

```mermaid
graph LR
    subgraph Cookie-Based Sessions
        A1[User Login] --> A2[Server creates session]
        A2 --> A3[Store in DB/Memory]
        A3 --> A4[Send session ID cookie]
        A4 --> A5[Cookie auto-sent<br/>with every request]
    end

    subgraph Token-Based JWT
        B1[User Login] --> B2[Server creates JWT]
        B2 --> B3[No server storage]
        B3 --> B4[Send token to client]
        B4 --> B5[Client manually adds<br/>to each request]
    end

    style A3 fill:#ffe1e1
    style B3 fill:#d4edda
```

**Comparison**

| Feature | Cookie Sessions | JWT Tokens |
|---------|----------------|------------|
| Storage | Server-side (DB/Redis) | Client-side (localStorage) |
| Scalability | Harder (session store) | Easier (stateless) |
| Security | More secure (httpOnly) | Less secure (XSS risk) |
| Size | Small cookie | Larger payload |
| Revocation | Easy (delete session) | Hard (needs blacklist) |
| CORS | Tricky | Easy |

---

**Created** October 6, 2025
**For** React Course - LongNDT
**Topic** Authentication & Authorization
**Related Lessons** Lesson 4
