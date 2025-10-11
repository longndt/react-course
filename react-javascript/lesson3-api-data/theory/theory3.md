# Theory - API Integration & Data Management

---

##  Table of Contents

1. [Why API Integration Matters?](#why-api-integration-matters-)
2. [Understanding REST APIs](#understanding-rest-apis)
3. [HTTP Methods & CRUD Operations](#http-methods--crud-operations)
4. [Data Fetching with Axios](#data-fetching-with-axios)
5. [Error Handling & Loading States](#error-handling--loading-states)
6. [React Query (Advanced)](#react-query-advanced)
7. [Best Practices](#best-practices)

---

## Why API Integration Matters? 🤔

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
- **Scalability**: Each layer scales independently
- **Maintainability**: Clear frontend/backend separation
- **Team Collaboration**: Independent development workflows
- **Modern UX**: Real-time updates without page refreshes

---

## Understanding REST APIs 📡

### What is a REST API?

REST (Representational State Transfer) is a way for your React app to communicate with a backend server.

**Simple Example:**
```
Frontend (React)  ←→  Backend (Node.js/Express)  ←→  Database (MongoDB)
     ↓                        ↓                           ↓
   User Interface         API Endpoints              Data Storage
```

### Basic API Structure

```javascript
// Backend API endpoints
GET    /api/tasks     → Get all tasks
POST   /api/tasks     → Create new task  
PUT    /api/tasks/:id → Update task
DELETE /api/tasks/:id → Delete task
```

**Why APIs Matter:**
- **Separation**: Frontend and backend work independently
- **Reusability**: Same API can serve web, mobile, desktop apps
- **Scalability**: Each part can scale separately

---

## HTTP Methods & CRUD Operations

### CRUD Operations Explained

| Operation | HTTP Method | Description | Example |
|-----------|-------------|-------------|---------|
| **Create** | POST | Add new data | Create new task |
| **Read** | GET | Retrieve data | Get all tasks |
| **Update** | PUT | Modify existing data | Update task status |
| **Delete** | DELETE | Remove data | Delete task |

### Backend API Example

```javascript
// Node.js/Express backend
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});
```

---

## Data Fetching with Axios

### Why Axios? (vs Fetch)

**Fetch API (Native - Older Method):**
```javascript
// Fetch - more verbose, manual error handling
const response = await fetch('/api/tasks');
if (!response.ok) {
  throw new Error('Network response was not ok');
}
const data = await response.json();
```

**Axios (Recommended - Modern Method):**
```javascript
// Axios - cleaner, automatic JSON parsing, better error handling
const response = await axios.get('/api/tasks');
const data = response.data; // Already parsed JSON
```

### Axios Setup

```javascript
// Install: npm install axios
import axios from 'axios';

// Simple configuration
const API_BASE_URL = 'http://localhost:3001/api';
```

### Basic CRUD with Axios

```javascript
// GET - Fetch all tasks
const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// POST - Create new task
const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// PUT - Update task
const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// DELETE - Remove task
const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
```

### Using Axios in React Components

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/tasks');
        setTasks(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Error Handling & Loading States

### Proper Error Handling

```javascript
const handleApiCall = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await api.get('/tasks');
    setTasks(response.data);
  } catch (error) {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      setError(`Server Error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response
      setError('Network Error: No response from server');
    } else {
      // Something else happened
      setError('Error: ' + error.message);
    }
  } finally {
    setLoading(false);
  }
};
```

### Loading States

```javascript
function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTask = async (taskData) => {
    setLoading(true);
    try {
      const response = await api.post('/tasks', taskData);
      setTasks(prev => [...prev, response.data]);
    } catch (error) {
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <div>Adding task...</div>}
      {error && <div className="error">{error}</div>}
      {/* Rest of component */}
    </div>
  );
}
```

---

## React Query (Advanced) 🚀

### Why React Query is Better Than Axios Alone?

**Problems with Basic Axios:**
- ❌ Manual loading states for every request
- ❌ No automatic caching (refetch same data repeatedly)
- ❌ No background updates
- ❌ Complex error handling for each component
- ❌ No automatic retries
- ❌ Manual state synchronization

**React Query Benefits:**
- ✅ **Automatic Caching**: Never refetch the same data unnecessarily
- ✅ **Background Updates**: Keep data fresh automatically
- ✅ **Loading States**: Built-in loading, error, and success states
- ✅ **Optimistic Updates**: UI updates immediately, syncs with server
- ✅ **Automatic Retries**: Retry failed requests intelligently
- ✅ **Deduplication**: Multiple components requesting same data = single request

### React Query Setup

```bash
# Install React Query
npm install @tanstack/react-query
```

```javascript
// main.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskManager />
    </QueryClientProvider>
  );
}
```

### React Query Implementation

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function TaskManager() {
  const queryClient = useQueryClient();

  // Fetch tasks with automatic caching and error handling
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks');
      return response.data;
    },
  });

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: async (taskData) => {
      const response = await api.post('/tasks', taskData);
      return response.data;
    },
    onSuccess: () => {
      // Automatically refetch tasks after creating
      queryClient.invalidateQueries(['tasks']);
    },
  });

  // Update task mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, ...taskData }) => {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  // Delete task mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => updateMutation.mutate({ id: task._id, status: 'completed' })}>
            Complete
          </button>
          <button onClick={() => deleteMutation.mutate(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

### React Query vs Basic Axios Comparison

| Feature | Basic Axios | React Query |
|---------|-------------|-------------|
| **Caching** | Manual | Automatic |
| **Loading States** | Manual for each request | Built-in |
| **Error Handling** | Manual | Built-in |
| **Background Updates** | Manual | Automatic |
| **Optimistic Updates** | Complex to implement | Easy |
| **Code Complexity** | High | Low |
| **Performance** | Poor (refetch everything) | Excellent (smart caching) |

---

## Best Practices

### 1. API Service Organization

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
});

export const taskApi = {
  getAll: () => api.get('/tasks'),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
};
```

### 2. Error Boundaries

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong with API calls.</h1>;
    }
    return this.props.children;
  }
}
```

### 3. Environment Variables

```javascript
// .env
REACT_APP_API_URL=http://localhost:3001/api

// api.js
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
```

### 4. PropTypes for Type Safety

```javascript
import PropTypes from 'prop-types';

function TaskItem({ task, onUpdate, onDelete }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onUpdate(task._id)}>Update</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
```

---

## Summary

**What You've Learned:**
- ✅ REST APIs and HTTP methods
- ✅ Axios for data fetching (recommended)
- ✅ Error handling and loading states
- ✅ React Query for advanced data management
- ✅ Best practices for API integration

**Next Steps:**
- Practice with the lab exercises
- Build the Task Manager application
- Try both Axios and React Query approaches
- Focus on Axios first, then explore React Query

**Key Takeaway:**
Start with Axios for basic API calls, then upgrade to React Query when you need advanced features like caching, background updates, and optimistic updates.