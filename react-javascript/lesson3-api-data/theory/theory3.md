# Theory - API Integration & Data Management

---

## Table of Contents

1. [Why API Integration Matters?](#why-api-integration-matters)
2. [Understanding REST APIs](#understanding-rest-apis)
3. [HTTP Methods & CRUD Operations](#http-methods--crud-operations)
4. [Data Fetching with Axios](#data-fetching-with-axios)
5. [Error Handling & Loading States](#error-handling--loading-states)
6. [React Query (Advanced)](#react-query-advanced)
7. [Common Mistakes](#common-mistakes)
8. [Next Steps](#next-steps)

---

## Why API Integration Matters?

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

## Understanding REST APIs

### What is a REST API?

REST (Representational State Transfer) is a way for your React app to communicate with a backend server.

**Simple Example:**
```
Frontend (React)  ←→  Backend (Node.js/Express)  ←→  Database (MongoDB)
     ↓                        ↓                           ↓
   User Interface         API Endpoints              Data Storage
```

### API Endpoints

```javascript
// File: services/api.js
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

## HTTP Methods & CRUD Operations

### CRUD Operations

```javascript
// Create (POST)
const createUser = async (userData) => {
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
const getUsers = async () => {
  const response = await fetch('/api/users');
  return response.json();
};

const getUser = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// Update (PUT)
const updateUser = async (id, userData) => {
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
const deleteUser = async (id) => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
```

### HTTP Status Codes

```javascript
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

## Data Fetching with Axios

### Setup Axios

```bash
npm install axios
```

### Basic Axios Usage

```javascript
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
const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// POST request
const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// PUT request
const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// DELETE request
const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};
```

### Axios with React

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/users');
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
```

---

## Error Handling & Loading States

### Comprehensive Error Handling

```javascript
const handleApiError = (error) => {
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
    const response = await axios.get('/api/users');
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

```javascript
function useApi(url) {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        const response = await axios.get(url);
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

## React Query (Advanced)

### Setup React Query

```bash
npm install @tanstack/react-query
```

### Basic Usage

```javascript
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
    queryFn: () => axios.get('/api/users').then(res => res.data),
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

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateUser() {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (userData) =>
      axios.post('/api/users', userData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (userData) => {
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

## Common Mistakes

### Mistake 1: Not handling loading states

```javascript
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

```javascript
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

```javascript
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

### Mistake 4: Not using proper error boundaries

```javascript
// ❌ Wrong - no error boundary
function App() {
  return <UserList />;
}

// ✅ Correct - with error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <UserList />
    </ErrorBoundary>
  );
}
```

---

## Next Steps

### What You Should Know After Lesson 3

**API Integration:**
- Understanding REST APIs and HTTP methods
- CRUD operations with proper error handling
- Axios for HTTP requests

**Data Management:**
- Loading states and error handling
- React Query for advanced data fetching
- Proper error boundaries and user feedback

**Best Practices:**
- Memory leak prevention
- Error handling patterns
- User experience considerations

### What's Coming in Lesson 4

🔜 **Routing**- Multi-page applications with React Router
🔜 **Authentication**- JWT tokens and protected routes
🔜 **State Management**- Global state with Context API
🔜 **Security**- CORS, XSS protection, and best practices

> **Advanced Topics** For advanced patterns, performance optimization, and complex examples, see [Advanced Patterns](../../extras/advanced_patterns.md) and [Performance Optimization](../../extras/performance_optimization.md)
