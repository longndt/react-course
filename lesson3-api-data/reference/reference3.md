# Reference - API & Data Management

> **Quick reference guide for API integration and data management**

## Table of Contents
1. [Why API Integration Matters?](#why-api-integration-matters)
2. [Understanding REST APIs](#understanding-rest-apis)
3. [HTTP Methods & CRUD Operations](#http-methods--crud-operations)
4. [Data Fetching with Axios](#data-fetching-with-axios)
5. [Error Handling & Loading States](#error-handling--loading-states)
6. [React Query (Advanced)](#react-query-advanced)
7. [Common Patterns](#common-patterns)
8. [Best Practices](#best-practices)

---

## Why API Integration Matters?

### Real-World Applications
- **Dynamic Content** Data from databases, external services

- **User Interactions** Forms, real-time updates

- **Third-Party Services** Payment, maps, social media

### Common Use Cases
- **E-commerce** Product catalogs, user accounts, orders

- **Social Media** Posts, comments, user profiles

- **Dashboard** Analytics, reports, real-time data

---

## Understanding REST APIs

### What is REST?
- **Representational State Transfer**

- **Stateless** communication

- **HTTP methods** for different operations

- **JSON** as data format

### API Endpoints
```typescript
// File: services/api.ts
// Base URL
const API_BASE = 'https://api.example.com';

// Endpoints
GET    /api/users          // Get all users
GET    /api/users/123      // Get user by ID
POST   /api/users          // Create new user
PUT    /api/users/123      // Update user
DELETE /api/users/123      // Delete user
```

### HTTP Status Codes
```typescript
// Success
200 OK           // Request successful
201 Created      // Resource created
204 No Content   // Success, no data returned

// Client Error
400 Bad Request  // Invalid request
401 Unauthorized // Authentication required
403 Forbidden    // Access denied
404 Not Found    // Resource not found

// Server Error
500 Internal Server Error // Server error
```

---

## HTTP Methods & CRUD Operations

### CRUD Operations
```typescript
// Create (POST)
const createUser = async (userData: User) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Read (GET)
const getUsers = async () => {
  const response = await fetch('/api/users');
  return response.json();
};

const getUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// Update (PUT)
const updateUser = async (id: string, userData: User) => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Delete (DELETE)
const deleteUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE'
  });
  return response.ok;
};
```

---

## Data Fetching with Axios

### Setup
```bash
npm install axios
```

### Basic Configuration
```typescript
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
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
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Basic Usage
```typescript
// GET request
const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// POST request
const createUser = async (userData: User) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// PUT request
const updateUser = async (id: string, userData: User) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// DELETE request
const deleteUser = async (id: string) => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
```

---

## Error Handling & Loading States

### Error Handling
```typescript
interface ApiError {
  message: string;
  status: number;
  code?: string;
}

const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.message || 'Server error',
      status: error.response.status,
      code: error.response.data.code
    };
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error - please check your connection',
      status: 0,
      code: 'NETWORK_ERROR'
    };
  } else {
    // Other error
    return {
      message: error.message || 'Unknown error occurred',
      status: 0,
      code: 'UNKNOWN_ERROR'
    };
  }
};
```

### Loading States
```typescript
import { useState, useEffect } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(apiCall: () => Promise<T>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Usage
function UserList() {
  const { data: users, loading, error, refetch } = useApi(() => api.get('/users'));

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users) return <div>No users found</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## React Query (Advanced)

### Setup
```bash
npm install @tanstack/react-query
```

### Configuration
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}
```

### Basic Usage
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data
function UserList() {
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(res => res.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Mutate data
function CreateUser() {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (userData: User) => api.post('/users', userData),
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (userData: User) => {
    createUserMutation.mutate(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={createUserMutation.isPending}>
        {createUserMutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

---

## Common Patterns

### API Service Layer
```typescript
// services/userService.ts
class UserService {
  private api = axios.create({
    baseURL: '/api/users',
    headers: { 'Content-Type': 'application/json' }
  });

  async getUsers(): Promise<User[]> {
    const response = await this.api.get('/');
    return response.data;
  }

  async getUser(id: string): Promise<User> {
    const response = await this.api.get(`/${id}`);
    return response.data;
  }

  async createUser(userData: CreateUserData): Promise<User> {
    const response = await this.api.post('/', userData);
    return response.data;
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    const response = await this.api.put(`/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.api.delete(`/${id}`);
  }
}

export const userService = new UserService();
```

### Custom Hooks
```typescript
// hooks/useUsers.ts
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

---

## Best Practices

### Error Handling
```typescript
// Centralized error handling
const handleError = (error: any) => {
  if (error.response?.status === 401) {
    // Redirect to login
    window.location.href = '/login';
  } else if (error.response?.status === 403) {
    // Show access denied message
    toast.error('Access denied');
  } else {
    // Show generic error
    toast.error('Something went wrong');
  }
};
```

### Loading States
```typescript
// Consistent loading UI
function LoadingSpinner() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="error">
      <p>Error: {error}</p>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
}
```

### Type Safety
```typescript
// Define API response types
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Use typed API calls
const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await api.get<ApiResponse<User[]>>('/users');
  return response.data;
};
```

---

## Next Steps

1. **Practice** Build components that fetch and display data
2. **Learn More** Check [Theory Guide](./theory/theory3.md) for detailed explanations
3. **Continue** Move to [Lesson 4](../lesson4-routing-auth/) for routing and authentication
4. **Resources** Explore [Advanced Patterns](../../extras/advanced_patterns.md) for complex patterns

> **💡 Tip** Start with simple GET requests, then gradually add POST, PUT, DELETE operations. Always handle loading and error states!