# Theory - API Integration & Data Management

> **🎯 Learning Focus:** Understanding the WHY and HOW behind API integration, data fetching patterns, and state management in modern React applications.

---

## Table of Contents

1. [The Evolution of Web Applications](#1-the-evolution-of-web-applications)
2. [REST API Architecture](#2-rest-api-architecture)
3. [HTTP Protocol Deep Dive](#3-http-protocol-deep-dive)
4. [Data Fetching Strategies](#4-data-fetching-strategies)
5. [State Management Patterns](#5-state-management-patterns)
6. [Error Handling Philosophy](#6-error-handling-philosophy)
7. [Performance & Optimization](#7-performance--optimization)
8. [Security Considerations](#8-security-considerations)

> 📖 **For Quick Reference:** See [reference3.md](../reference/reference3.md) for syntax and code examples

---

## 1. The Evolution of Web Applications

### Traditional Web (Server-Side Rendering)

**How it worked:**
```
User clicks link → Browser requests HTML → Server generates full page → Browser displays
```

**Problems:**
- 🐌 **Slow:** Every interaction requires full page reload
- 💰 **Expensive:** Server renders everything
- 📱 **Poor UX:** No smooth transitions
- 🔄 **No Real-time:** Can't update dynamically

### Modern Single Page Applications (SPAs)

**How it works now:**
```
User interacts → JS fetches JSON → React updates UI → Fast, smooth experience
```

**Benefits:**
- ⚡ **Fast:** Only data transfers, not full HTML
- 🎨 **Rich UX:** Smooth transitions and animations
- 📱 **App-like:** Feels like native mobile app
- 🔄 **Real-time:** Can update without page refresh

### Why Separation of Concerns Matters

```typescript
// ❌ Old Way: Mixing everything
function UserPage() {
  // HTML generation, database queries, business logic - all in one place!
}

// ✅ Modern Way: Clear separation
Frontend (React)      ←→  API (Express)      ←→  Database (MongoDB)
- UI Logic only          - Business Logic        - Data Storage
- User interactions      - Validation            - Persistence
- Presentation           - Authentication        - Queries
```

**Why this is better:**
1. **Scalability:** Each layer can scale independently
2. **Maintenance:** Changes in UI don't affect backend
3. **Team Efficiency:** Frontend and backend teams work in parallel
4. **Testing:** Each layer can be tested separately
5. **Flexibility:** Can swap React for Vue, or MongoDB for PostgreSQL

---

## 2. REST API Architecture

### REST Principles Explained

**REST = Representational State Transfer**

Think of it like a library:
- **Resources** = Books (users, products, posts)
- **HTTP Methods** = Actions (borrow, return, search)
- **URLs** = Addresses (where to find books)

### Resource-Based URLs

```typescript
// ❌ RPC-style (Remote Procedure Call)
GET  /getUserById?id=123
POST /createNewUser
POST /updateUserEmail
GET  /getAllActiveUsers

// ✅ REST-style (Resource-oriented)
GET    /users/123          // Get user by ID
POST   /users              // Create new user
PUT    /users/123          // Update user
GET    /users?status=active // Get active users
```

**Why REST is better:**
- 📝 **Predictable:** Consistent patterns
- 🔍 **Self-documenting:** URLs describe resources
- 🔒 **Cacheable:** Easy to cache responses
- 🌐 **Standard:** Everyone understands it

### Stateless Communication

**What does "stateless" mean?**

```typescript
// ❌ Stateful (Bad)
// Request 1
POST /login
// Server remembers you're logged in

// Request 2
GET /profile
// Server knows who you are from previous request

// ❌ Problem: If server restarts, you're logged out!


// ✅ Stateless (Good)
// Every request contains all needed information
GET /profile
Headers: {
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
}

// ✅ Benefit: Any server can handle any request
```

### HTTP Methods Semantics

**Understanding Idempotency:**

```typescript
// Idempotent = Can repeat safely without side effects

GET  /users/123    // Idempotent: Reading doesn't change anything
PUT  /users/123    // Idempotent: Same result if called multiple times
DELETE /users/123  // Idempotent: Deleting twice = same as once

POST /users        // NOT Idempotent: Creates new user each time!
```

**Safe Methods:**
- `GET` - Safe & Idempotent (only reads)
- `HEAD` - Safe & Idempotent (like GET but no body)
- `OPTIONS` - Safe & Idempotent (asks what's allowed)

**Unsafe Methods:**
- `POST` - Creates (not idempotent)
- `PUT` - Updates (idempotent)
- `PATCH` - Partial update (not idempotent)
- `DELETE` - Removes (idempotent)

---

## 3. HTTP Protocol Deep Dive

### Request-Response Cycle

```typescript
// What happens when you make an API call:

1. Client (React) creates HTTP request
   ├─ Method: GET
   ├─ URL: https://api.example.com/users
   ├─ Headers: { Authorization: "Bearer token" }
   └─ Body: (empty for GET)

2. DNS Resolution
   └─ Converts api.example.com to IP address

3. TCP Connection
   └─ Three-way handshake to establish connection

4. TLS Handshake (for HTTPS)
   └─ Encrypts communication

5. Server receives request
   ├─ Routes to correct handler
   ├─ Authenticates user
   ├─ Queries database
   └─ Prepares response

6. Server sends response
   ├─ Status: 200 OK
   ├─ Headers: { Content-Type: "application/json" }
   └─ Body: { users: [...] }

7. Client receives response
   └─ React updates UI
```

### HTTP Headers Explained

**Request Headers:**
```typescript
// Authentication
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// ↑ Who you are

// Content Type
Content-Type: application/json
// ↑ What format you're sending

// Accept
Accept: application/json
// ↑ What format you want back

// CORS
Origin: https://myapp.com
// ↑ Where request is coming from

// Caching
If-None-Match: "abc123"
// ↑ "Only send if changed"
```

**Response Headers:**
```typescript
// Status
HTTP/1.1 200 OK
// ↑ Request succeeded

// Content
Content-Type: application/json
// ↑ Response format

// Caching
Cache-Control: max-age=3600
// ↑ "Can cache for 1 hour"

// CORS
Access-Control-Allow-Origin: *
// ↑ "Any site can access"

// Security
X-Content-Type-Options: nosniff
// ↑ Security headers
```

### Status Codes Philosophy

```typescript
// 2xx - Success
200 OK              // "Here's your data"
201 Created         // "Resource created successfully"
204 No Content      // "Success, but nothing to return"

// 3xx - Redirection
301 Moved Permanently  // "Resource moved, update bookmark"
304 Not Modified      // "Use your cached version"

// 4xx - Client Error
400 Bad Request     // "Your request is invalid"
401 Unauthorized    // "You need to login"
403 Forbidden       // "You're logged in but not allowed"
404 Not Found       // "Resource doesn't exist"
422 Unprocessable   // "Valid format but business logic failed"

// 5xx - Server Error
500 Internal Error  // "We messed up"
502 Bad Gateway     // "Upstream server failed"
503 Service Unavailable // "We're down for maintenance"
```

---

## 4. Data Fetching Strategies

### The Problem with useEffect

```typescript
// ❌ The Classic Mistake
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []); // 🚨 Empty dependency array

  return <ul>{users.map(...)}</ul>;
}

// Problems:
// 1. No loading state
// 2. No error handling
// 3. Memory leak if component unmounts during fetch
// 4. Race condition if triggered multiple times
// 5. No caching - refetches on every mount
```

### Proper Implementation

```typescript
// ✅ Complete Solution
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false; // Prevent memory leaks

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers();
        
        if (!cancelled) {  // Only update if not unmounted
          setUsers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;  // Cleanup function
    };
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return <UserListUI users={users} />;
}
```

### Why React Query?

**The Problem:**
```typescript
// Managing server state with useState is hard:
// - Caching: Where to store cache?
// - Stale data: When to refetch?
// - Deduplication: Avoid duplicate requests
// - Background updates: Keep data fresh
// - Optimistic updates: Update UI before server responds
// - Pagination: Handle large datasets
// - Mutations: Update cache after POST/PUT/DELETE
```

**React Query solves this:**
```typescript
// Simple, powerful, automatic
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // React Query handles:
  // ✅ Automatic caching
  // ✅ Background refetching
  // ✅ Deduplication
  // ✅ Loading states
  // ✅ Error handling
  // ✅ Retry logic
  // ✅ Garbage collection
}
```

### Server State vs Client State

```typescript
// Client State - Lives in browser only
const [isDarkMode, setIsDarkMode] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(true);
// ↑ UI preferences, temporary data

// Server State - Truth lives on server
const { data: users } = useQuery(['users'], fetchUsers);
const { data: profile } = useQuery(['profile'], fetchProfile);
// ↑ Synced with backend, needs refresh

// Mixing them is a mistake!
// ❌ Don't use useState for server data
const [users, setUsers] = useState([]);  // Wrong!

// ✅ Use React Query for server state
const { data: users } = useQuery(['users'], fetchUsers);  // Right!
```

---

## 5. State Management Patterns

### Optimistic Updates Explained

**Concept:** Update UI immediately, rollback if fails

```typescript
// Why optimistic updates?
// Traditional: Click → Wait → Update (feels slow)
// Optimistic: Click → Update immediately → Rollback if error (feels instant)

const updateUser = useMutation({
  mutationFn: api.updateUser,
  
  // 1. Before API call - update UI optimistically
  onMutate: async (newUser) => {
    // Cancel ongoing queries
    await queryClient.cancelQueries(['users']);
    
    // Snapshot current value (for rollback)
    const previousUsers = queryClient.getQueryData(['users']);
    
    // Optimistically update cache
    queryClient.setQueryData(['users'], (old) => 
      old.map(user => user.id === newUser.id ? newUser : user)
    );
    
    return { previousUsers }; // Return snapshot
  },
  
  // 2. If API call fails - rollback
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['users'], context.previousUsers);
    toast.error('Update failed');
  },
  
  // 3. After everything - refetch to be sure
  onSettled: () => {
    queryClient.invalidateQueries(['users']);
  },
});
```

### Cache Invalidation Strategy

```typescript
// When to invalidate cache?

// 1. After mutations
createUser.mutate(userData, {
  onSuccess: () => {
    queryClient.invalidateQueries(['users']); // Refetch users list
  }
});

// 2. Time-based (staleTime)
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
});

// 3. Manual refetch
const { refetch } = useQuery(['users'], fetchUsers);
<button onClick={() => refetch()}>Refresh</button>

// 4. On focus/reconnect
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,  // Refetch when tab becomes active
      refetchOnReconnect: true,    // Refetch when internet reconnects
    },
  },
});
```

---

## 6. Error Handling Philosophy

### Error Categories

```typescript
// 1. Network Errors
try {
  await fetchData();
} catch (error) {
  if (error.code === 'ERR_NETWORK') {
    // No internet connection
    showRetryButton();
  }
}

// 2. HTTP Errors
if (response.status >= 400) {
  if (response.status === 401) {
    // Unauthorized - redirect to login
    redirectToLogin();
  } else if (response.status === 404) {
    // Not found - show 404 page
    show404Page();
  } else if (response.status >= 500) {
    // Server error - show error page
    showServerErrorPage();
  }
}

// 3. Business Logic Errors
if (response.data.error) {
  // Server returned error (e.g., "Email already exists")
  showFieldError(response.data.error);
}

// 4. Validation Errors
if (!isValidEmail(email)) {
  // Client-side validation
  showValidationError("Invalid email");
}
```

### Error Recovery Strategies

```typescript
// 1. Automatic Retry
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  retry: 3,                 // Retry 3 times
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  // ↑ Exponential backoff: 1s, 2s, 4s, 8s, ...max 30s
});

// 2. Fallback Data
const { data, error } = useQuery(['users'], fetchUsers);
const users = data || fallbackUsers;  // Use cached/default data on error

// 3. Error Boundaries
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## 7. Performance & Optimization

### Request Deduplication

```typescript
// Problem: Multiple components request same data

function UserProfile() {
  const { data } = useQuery(['user', userId], () => fetchUser(userId));
  // ...
}

function UserAvatar() {
  const { data } = useQuery(['user', userId], () => fetchUser(userId));
  // ...
}

// Without React Query: 2 API calls
// With React Query: 1 API call (automatically deduplicated!)
```

### Pagination Strategies

```typescript
// 1. Offset-based (Traditional)
// Page 1: /users?offset=0&limit=10
// Page 2: /users?offset=10&limit=10
// ❌ Problems: Items can shift if data changes

// 2. Cursor-based (Better)
// Page 1: /users?limit=10
//         Returns: { data: [...], nextCursor: "abc123" }
// Page 2: /users?cursor=abc123&limit=10
// ✅ Benefits: Consistent, works with real-time updates

// 3. Infinite Scroll (Best UX)
const {
  data,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: ['users'],
  queryFn: ({ pageParam = 0 }) => fetchUsers(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
```

### Prefetching

```typescript
// Prefetch data before needed

// 1. On hover
<Link 
  to="/user/123"
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      queryKey: ['user', '123'],
      queryFn: () => fetchUser('123'),
    });
  }}
>
  View Profile
</Link>

// 2. On route change
useEffect(() => {
  // Prefetch next page data
  queryClient.prefetchQuery(['users', page + 1], () => fetchUsers(page + 1));
}, [page]);

// 3. During idle time
useEffect(() => {
  const idleCallback = requestIdleCallback(() => {
    queryClient.prefetchQuery(['reports'], fetchReports);
  });
  return () => cancelIdleCallback(idleCallback);
}, []);
```

---

## 8. Security Considerations

### Authentication Flow

```typescript
// 1. User logs in
POST /auth/login
Body: { email, password }
Response: { token: "eyJhbGciOiJIUzI1..." }

// 2. Store token securely
// ❌ Bad: localStorage (vulnerable to XSS)
localStorage.setItem('token', token);

// ✅ Better: httpOnly cookie (set by server)
Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict

// 3. Include in requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 4. Handle expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - refresh or logout
      refreshToken() || logout();
    }
    return Promise.reject(error);
  }
);
```

### CORS Explained

```typescript
// Why CORS exists:
// Without CORS, evil.com could make requests to yourbank.com
// and steal your data!

// CORS prevents this by:
// 1. Browser checks if server allows cross-origin requests
// 2. Server responds with Access-Control headers
// 3. Only then browser allows the request

// Preflight Request (for non-simple requests)
OPTIONS /api/users
Origin: https://myapp.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Authorization

// Server Response
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 86400  // Cache preflight for 24 hours
```

### Input Validation

```typescript
// Validate on BOTH client and server

// Client-side (UX)
const validate = (data) => {
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return 'Invalid email';
  }
  if (data.password.length < 8) {
    return 'Password too short';
  }
  // ... more checks
};

// Server-side (Security)
// NEVER trust client input!
app.post('/users', async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  
  // Sanitize input
  const cleanData = sanitize(value);
  
  // Process...
});
```

---

## Key Takeaways

### Conceptual Understanding

1. **Modern Web Architecture**
   - SPAs separate frontend and backend
   - APIs enable flexible, scalable architecture
   - Clear separation of concerns

2. **REST Principles**
   - Resource-based URLs
   - Stateless communication
   - Proper HTTP method semantics

3. **State Management**
   - Distinguish server state from client state
   - Use React Query for server state
   - Implement proper caching strategies

4. **Error Handling**
   - Categorize errors properly
   - Implement retry strategies
   - Provide good user feedback

5. **Performance**
   - Deduplication and caching
   - Prefetching and pagination
   - Optimistic updates for better UX

6. **Security**
   - Proper authentication flow
   - CORS understanding
   - Input validation

### Next Steps

Continue to [Lab 3](../lab/lab3.md) to apply these concepts in practice!

> 📚 **Quick Reference:** For syntax and code snippets, see [reference3.md](../reference/reference3.md)
