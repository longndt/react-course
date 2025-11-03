# Reference - API & Data Management Quick Guide

> **⚡ Quick Lookup:** Syntax, patterns, and code snippets for API integration

---

## Table of Contents

1. [HTTP Methods Cheat Sheet](#http-methods-cheat-sheet)
2. [Axios API Reference](#axios-api-reference)
3. [Common Patterns](#common-patterns)
4. [Error Codes Reference](#error-codes-reference)
5. [TypeScript Types](#typescript-types)
6. [Troubleshooting Guide](#troubleshooting-guide)

> 💡 **For Concepts:** See [theory3.md](../theory/theory3.md) for detailed explanations

---

## HTTP Methods Cheat Sheet

### Quick Overview

| Method | Purpose | Idempotent | Safe | Request Body | Response Body |
|--------|---------|------------|------|--------------|---------------|
| GET | Read | ✅ | ✅ | ❌ | ✅ |
| POST | Create | ❌ | ❌ | ✅ | ✅ |
| PUT | Update | ✅ | ❌ | ✅ | ✅ |
| PATCH | Partial Update | ❌ | ❌ | ✅ | ✅ |
| DELETE | Remove | ✅ | ❌ | ❌ | ✅ |

### Status Codes

```typescript
// 2xx Success
200 OK              // General success
201 Created         // Resource created (POST)
204 No Content      // Success with no body (DELETE)

// 4xx Client Errors
400 Bad Request     // Invalid syntax
401 Unauthorized    // Not authenticated
403 Forbidden       // Authenticated but not allowed
404 Not Found       // Resource doesn't exist
422 Unprocessable   // Valid syntax but business logic error

// 5xx Server Errors
500 Internal Error  // Generic server error
502 Bad Gateway     // Upstream server error
503 Unavailable     // Server overloaded/down
```

---

## Axios API Reference

### Installation

```bash
npm install axios
```

### Basic Setup

```typescript
import axios from 'axios';

// Create instance
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Request Methods

```typescript
// GET - Fetch data
const response = await api.get('/users');
const response = await api.get('/users/123');
const response = await api.get('/users', { params: { role: 'admin' } });

// POST - Create data
const response = await api.post('/users', { name: 'John', email: 'john@example.com' });

// PUT - Update data (full)
const response = await api.put('/users/123', { name: 'John Doe', email: 'john@example.com' });

// PATCH - Update data (partial)
const response = await api.patch('/users/123', { name: 'John Doe' });

// DELETE - Remove data
const response = await api.delete('/users/123');
```

### Request Configuration

```typescript
await api.get('/users', {
  params: { page: 1, limit: 10 },           // Query parameters
  headers: { Authorization: 'Bearer token' }, // Custom headers
  timeout: 5000,                             // Request timeout
  responseType: 'json',                      // Response type
});
```

### Interceptors

```typescript
// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Error Handling

```typescript
try {
  const response = await api.get('/users');
} catch (error) {
  if (axios.isAxiosError(error)) {
    // Axios error
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Headers:', error.response?.headers);
  } else {
    // Non-Axios error
    console.error('Error:', error.message);
  }
}
```

---

## Advanced: React Query & Redux (Moved to Extras)

**React Query** (TanStack Query) and **Redux** are powerful but beyond core API basics:
- **React Query**: Advanced server state management (caching, refetching)
- **Redux**: Global client state management (complex UI state)

**For now, focus on**: `fetch`/`axios` + `useState` + `useEffect`

**When ready**: See `extras/state_management.md` for React Query, Redux, Zustand patterns

---

## Common Patterns

### API Service Layer

```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

export const userApi = {
  getAll: () => api.get('/users').then(res => res.data),
  getById: (id: string) => api.get(`/users/${id}`).then(res => res.data),
  create: (data: CreateUserData) => api.post('/users', data).then(res => res.data),
  update: (id: string, data: UpdateUserData) => api.put(`/users/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/users/${id}`).then(res => res.data),
};
```

### Custom Hooks

```typescript
// hooks/useUsers.ts
import { useState, useEffect } from 'react';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
}

export function useUser(id: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    api.get(`/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading, error };
}
```

### Component Usage

```typescript
// components/UserList.tsx
import { useUsers } from '../hooks/useUsers';

function UserList() {
  const { users, loading, error } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Error Codes Reference

### Network Errors

```typescript
// No internet connection
error.code === 'ERR_NETWORK'

// Request timeout
error.code === 'ECONNABORTED'

// DNS lookup failed
error.code === 'ENOTFOUND'
```

### Axios Error Properties

```typescript
if (axios.isAxiosError(error)) {
  error.message       // Error message
  error.code          // Error code
  error.response      // Response object (if server responded)
  error.request       // Request object (if no response)
  error.config        // Request configuration
}
```

### Handling Different Errors

```typescript
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          return 'Invalid request';
        case 401:
          return 'Please login';
        case 403:
          return 'Access denied';
        case 404:
          return 'Not found';
        case 500:
          return 'Server error';
        default:
          return 'Something went wrong';
      }
    } else if (error.request) {
      // No response received
      return 'Network error - check your connection';
    }
  }
  return 'Unknown error occurred';
};
```

---

## TypeScript Types

### Request/Response Types

```typescript
// User types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

// API Response wrapper
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Error response
interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string>;
}

// Pagination
interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
```

### Axios Types

```typescript
import type { AxiosError, AxiosResponse } from 'axios';

// Typed API calls
const getUsers = (): Promise<User[]> => {
  return api.get<User[]>('/users').then(res => res.data);
};

const createUser = (data: CreateUserData): Promise<User> => {
  return api.post<User>('/users', data).then(res => res.data);
};

// Error typing
try {
  await getUsers();
} catch (error) {
  if (axios.isAxiosError<ApiError>(error)) {
    console.error(error.response?.data.message);
  }
}
```

---

## Troubleshooting Guide

### Common Issues

#### CORS Errors

```typescript
// Error: "Access to XMLHttpRequest blocked by CORS policy"

// Solution 1: Configure backend (Express)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Solution 2: Use proxy in development (Vite)
// vite.config.ts
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
};
```

#### Request Timeout

```typescript
// Error: "timeout of 5000ms exceeded"

// Solution: Increase timeout
const api = axios.create({
  timeout: 30000, // 30 seconds
});
```

#### Memory Leaks

```typescript
// Problem: Setting state after unmount

// Solution: Cleanup in useEffect
useEffect(() => {
  let cancelled = false;

  fetchData().then(data => {
    if (!cancelled) {
      setData(data);
    }
  });

  return () => {
    cancelled = true;
  };
}, []);
```

#### Stale Data

```typescript
// Problem: Data doesn't update after changes

// Solution: Refetch after mutations
async function updateUser(id, data) {
  await api.put(`/users/${id}`, data);
  // Refetch to get fresh data
  const users = await api.get('/users');
  setUsers(users.data);
}
```

#### Type Errors

```typescript
// Problem: TypeScript errors with response data

// Solution: Type the response properly
interface ApiResponse<T> {
  data: T;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<ApiResponse<User[]>>('/users');
  return response.data.data; // Note: double .data
};
```

---

## Quick Commands

```bash
# Install dependencies
npm install axios

# Type definitions (if needed)
npm install -D @types/axios
```

## Resources

- **Axios Docs:** https://axios-http.com/docs/intro
- **MDN HTTP:** https://developer.mozilla.org/en-US/docs/Web/HTTP
- **fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

> 💡 **Need deeper understanding?** See [theory3.md](../theory/theory3.md) for concepts and explanations
