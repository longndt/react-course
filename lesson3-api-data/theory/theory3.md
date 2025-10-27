# Theory - API Integration & Data Management

---

## Table of Contents

**Chapter 1:** [Why API Integration Matters?](#1-why-api-integration-matters)
**Chapter 2:** [Understanding REST APIs](#2-understanding-rest-apis)
**Chapter 3:** [HTTP Methods & CRUD Operations](#3-http-methods--crud-operations)
**Chapter 4:** [Data Fetching with Axios](#4-data-fetching-with-axios)
**Chapter 5:** [Error Handling & Loading States](#5-error-handling--loading-states)
**Chapter 6:** [React Query (Advanced)](#6-react-query-advanced)
**Chapter 7:** [Common Mistakes](#7-common-mistakes)
**Chapter 8:** [Next Steps](#8-next-steps)

---

## 1. Why API Integration Matters?

> 📊 **Visual Learning** For a comprehensive understanding of API data flow, see [API Data Flow Diagram](../../diagrams/api_data_flow.md)

**Modern Full-Stack Architecture:**

```
Your Modern Stack:
┌─────────────┐    ┌──────────┐    ┌─────────────┐    ┌─────────┐
│   React     │    │   HTTP   │    │ Node.js     │    │ MongoDB │
│ (Frontend)  │◄──►│   API    │◄──►│ Express     │◄──►│         │
│             │    │          │    │ (Backend)   │    │         │
└─────────────┘    └──────────┘    └─────────────┘    └─────────┘
   Clean Separation of Concerns
```

**Key Benefits:**
- **Scalability** Each layer scales independently

- **Maintainability** Clear frontend/backend separation

- **Team Collaboration** Independent development workflows

- **Modern UX** Real-time updates without page refreshes

---

## 2. Understanding REST APIs

### What is a REST API?

REST (Representational State Transfer) is a way for your React app to communicate with a backend server.

**Simple Example:**
```
Frontend (React)  ←→  Backend (Node.js/Express)  ←→  Database (MongoDB)
     ↓                        ↓                           ↓
   User Interface         API Endpoints              Data Storage
```

### API Endpoints

```typescript
// File: services/api.ts
// Common API endpoints
const API_BASE_URL = 'http://localhost:3001/api';

// GET - Fetch data
GET /api/users          // Get all users
GET /api/users/123      // Get user with ID 123

// POST - Create data
POST /api/users         // Create new user

// PUT - Update data
PUT /api/users/123      // Update user with ID 123

// DELETE - Remove data
DELETE /api/users/123   // Delete user with ID 123
```

---

## 3. HTTP Methods & CRUD Operations

### CRUD Operations

```typescript
// File: services/api.ts
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

// Create (POST)
const createUser = async (userData: CreateUserData): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Read (GET)
const getUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  return response.json();
};

const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// Update (PUT)
const updateUser = async (id: string, userData: UpdateUserData): Promise<User> => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Delete (DELETE)
const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
export type { User, CreateUserData, UpdateUserData };
```

### HTTP Status Codes

```typescript
// Common status codes
200 - OK              // Success
201 - Created         // Resource created
400 - Bad Request     // Client error
401 - Unauthorized    // Authentication required
403 - Forbidden       // Access denied
404 - Not Found       // Resource not found
500 - Internal Server Error // Server error
```

---

## 4. Data Fetching with Axios

### Setup Axios

```bash
npm install axios
```

### Basic Axios Usage

```typescript
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET request
const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

// POST request
const createUser = async (userData: CreateUserData): Promise<User> => {
  const response = await api.post('/users', userData);
  return response.data;
};

// PUT request
const updateUser = async (id: string, userData: UpdateUserData): Promise<User> => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// DELETE request
const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
```

### Axios with React

```typescript
// File: components/UserList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<User[]>('/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}

export default UserList;
```

---

## 5. Error Handling & Loading States

### Comprehensive Error Handling

```typescript
interface ApiError {
  message: string;
  status: number;
  code?: string;
}

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
      code: error.code,
    };
  }

  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
};

// Using error handling
const fetchUsers = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await axios.get<User[]>('/api/users');
    setUsers(response.data);
  } catch (err) {
    const apiError = handleApiError(err);
    setError(apiError.message);
  } finally {
    setLoading(false);
  }
};
```

### Loading States

```typescript
interface LoadingState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

function useApi<T>(url: string) {
  const [state, setState] = useState<LoadingState>({
    isLoading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        const response = await axios.get<T>(url);
        setState({ isLoading: false, error: null, data: response.data });
      } catch (err) {
        setState({ isLoading: false, error: 'Failed to fetch data', data: null });
      }
    };

    fetchData();
  }, [url]);

  return state;
}
```

---

## 6. React Query (Advanced)

### Setup React Query

```bash
npm install @tanstack/react-query
```

### Basic Usage

```typescript
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Mutations with React Query

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateUser() {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (userData: CreateUserData) =>
      axios.post('/api/users', userData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (userData: CreateUserData) => {
    createUserMutation.mutate(userData);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({ name: 'John', email: 'john@example.com' });
    }}>
      <button type="submit" disabled={createUserMutation.isPending}>
        {createUserMutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

---

## 7. Common Mistakes

### Mistake 1: Not handling loading states

```typescript
// ❌ Wrong - no loading state
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

// ✅ Correct - with loading state
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

### Mistake 2: Not handling errors

```typescript
// ❌ Wrong - no error handling
useEffect(() => {
  fetchUsers().then(setUsers);
}, []);

// ✅ Correct - with error handling
useEffect(() => {
  fetchUsers()
    .then(setUsers)
    .catch(error => {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    });
}, []);
```

### Mistake 3: Memory leaks with cleanup

```typescript
// ❌ Wrong - potential memory leak
useEffect(() => {
  let isMounted = true;

  fetchUsers().then(data => {
    if (isMounted) {
      setUsers(data);
    }
  });

  return () => {
    isMounted = false;
  };
}, []);
```

### Mistake 4: Not using proper TypeScript types

```typescript
// ❌ Wrong - using any
const fetchUsers = async (): Promise<any> => {
  const response = await axios.get('/api/users');
  return response.data;
};

// ✅ Correct - proper typing
interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>('/api/users');
  return response.data;
};
```

---

## 8. Next Steps

### What You Should Know After Lesson 3

**API Integration:**
- Understanding REST APIs and HTTP methods
- CRUD operations with proper TypeScript typing
- Axios for HTTP requests

**Data Management:**
- Loading states and error handling
- React Query for advanced data fetching
- Proper error boundaries and user feedback

**Best Practices:**
- TypeScript integration with APIs
- Memory leak prevention
- Error handling patterns

### What's Coming in Lesson 4

🔜 **Routing** - Multi-page applications with React Router
🔜 **Authentication** - JWT tokens and protected routes
🔜 **State Management** - Global state with Context API
🔜 **Security** - CORS, XSS protection, and best practices

> **Advanced Topics** For advanced patterns, performance optimization, and complex examples, see [Advanced Patterns](../../extras/advanced_patterns.md) and [Performance Optimization](../../extras/performance_optimization.md)
