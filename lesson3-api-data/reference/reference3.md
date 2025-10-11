# Reference - API Integration & Data Management

## Table of Contents
1. [Express Backend Setup](#1-express-backend-setup)
2. [Axios Setup & Configuration](#2-axios-setup--configuration)
3. [API Client Patterns with Axios](#3-api-client-patterns-with-axios)
4. [Data Fetching Components](#4-data-fetching-components)
5. [CRUD Operations with Axios](#5-crud-operations-with-axios)
6. [Error Handling & Loading States](#6-error-handling--loading-states)
7. [React Query (Advanced)](#7-react-query-advanced)
8. [Complete Examples](#8-complete-examples)

---

## 1. Express Backend Setup

### Basic Express Server with CORS

```typescript
// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data (replace with MongoDB later)
let tasks = [
  { id: 1, title: 'Learn React', description: 'Study React fundamentals', status: 'pending' },
  { id: 2, title: 'Build API', description: 'Create REST API with Express', status: 'completed' },
];

// GET - Fetch all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET - Fetch single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// POST - Create new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT - Update task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
});

// DELETE - Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 2. Axios Setup & Configuration

### Installation and Basic Setup

```typescript
// Install dependencies
npm install axios

// services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
      headers: {
        'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Advanced Axios Configuration

```typescript
// services/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

    this.setupInterceptors();
  }

  private setupInterceptors() {
// Request interceptor
    this.client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
    this.client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient('http://localhost:3001/api');
```

---

## 3. API Client Patterns with Axios

### Task API Service

```typescript
// services/taskApi.ts
import api from './api';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
}

export const taskApi = {
  // Get all tasks
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  // Get single task
  getById: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  create: async (data: CreateTaskInput): Promise<Task> => {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },

  // Update task
  update: async (id: number, data: UpdateTaskInput): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  // Delete task
  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
```

### Generic API Service Pattern

```typescript
// services/baseApi.ts
import api from './api';

export class BaseApiService<T> {
  constructor(private endpoint: string) {}

  async getAll(): Promise<T[]> {
    const response = await api.get<T[]>(`/${this.endpoint}`);
    return response.data;
  }

  async getById(id: number): Promise<T> {
    const response = await api.get<T>(`/${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data: Partial<T>): Promise<T> {
    const response = await api.post<T>(`/${this.endpoint}`, data);
    return response.data;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const response = await api.put<T>(`/${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/${this.endpoint}/${id}`);
  }
}

// Usage
export const taskService = new BaseApiService<Task>('tasks');
export const userService = new BaseApiService<User>('users');
```

---

## 4. Data Fetching Components

### Basic Data Fetching with Axios

```typescript
// components/TaskList.tsx
import { useState, useEffect } from 'react';
import { taskApi, Task } from '../services/taskApi';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await taskApi.getAll();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No tasks found. Create your first task!</p>
      ) : (
        <div className="tasks">
          {tasks.map(task => (
            <div key={task.id} className={`task-card ${task.status}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
```

### Custom Hook for Data Fetching

```typescript
// hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { taskApi, Task } from '../services/taskApi';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
  };
};
```

---

## 5. CRUD Operations with Axios

### Create Operation

```typescript
// components/TaskForm.tsx
import { useState } from 'react';
import { taskApi, CreateTaskInput } from '../services/taskApi';

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm = ({ onTaskCreated }: TaskFormProps) => {
  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await taskApi.create({
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
      
      // Reset form
      setFormData({ title: '', description: '' });
      
      // Notify parent component
      onTaskCreated();
      
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows={3}
          disabled={loading}
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
      </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
```

### Update Operation

```typescript
// components/TaskCard.tsx
import { useState } from 'react';
import { taskApi, Task, UpdateTaskInput } from '../services/taskApi';

interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void;
}

const TaskCard = ({ task, onTaskUpdated }: TaskCardProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusToggle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      await taskApi.update(task.id, { status: newStatus });
      
      onTaskUpdated();
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await taskApi.delete(task.id);
      onTaskUpdated();
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
      </div>

      <div className="task-actions">
        <button
          onClick={handleStatusToggle}
          disabled={loading}
          className={`btn ${task.status === 'pending' ? 'btn-success' : 'btn-warning'}`}
        >
          {task.status === 'pending' ? 'Complete' : 'Undo'}
        </button>
        
        <button
          onClick={handleDelete}
          disabled={loading}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
```

---

## 6. Error Handling & Loading States

### Comprehensive Error Handling

```typescript
// utils/errorHandler.ts
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
      code: error.response.data?.code,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
      code: 'NETWORK_ERROR',
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
    };
  }
};

// Usage in component
const handleError = (error: any) => {
  const apiError = handleApiError(error);
  
  if (apiError.status === 401) {
    // Redirect to login
    window.location.href = '/login';
  } else if (apiError.status === 403) {
    // Show permission denied message
    setError('You do not have permission to perform this action');
  } else {
    // Show generic error message
    setError(apiError.message);
  }
};
```

### Loading States with Skeleton

```typescript
// components/SkeletonLoader.tsx
const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-description"></div>
          <div className="skeleton-line skeleton-meta"></div>
          </div>
        ))}
    </div>
  );
};

// CSS for skeleton
const skeletonStyles = `
.skeleton-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.skeleton-card {
  background: #f0f0f0;
  border-radius: 6px;
  padding: 1rem;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-line {
  height: 1rem;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-title {
  width: 70%;
}

.skeleton-description {
  width: 100%;
}

.skeleton-meta {
  width: 40%;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
`;

export default SkeletonLoader;
```

---

## 7. React Query (Advanced)

### React Query Setup

```typescript
// Install dependencies
npm install @tanstack/react-query

// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Data Fetching with React Query

```typescript
// hooks/useTasksQuery.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi, Task, CreateTaskInput, UpdateTaskInput } from '../services/taskApi';

export const useTasksQuery = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskInput }) =>
      taskApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
```

### Component with React Query

```typescript
// components/TaskListQuery.tsx
import { useTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation } from '../hooks/useTasksQuery';

const TaskListQuery = () => {
  const { data: tasks = [], isLoading, error } = useTasksQuery();
  const updateMutation = useUpdateTaskMutation();
  const deleteMutation = useDeleteTaskMutation();

  const handleStatusToggle = (task: Task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    updateMutation.mutate({ id: task.id, data: { status: newStatus } });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
  return (
      <div className="error">
        <p>Failed to load tasks</p>
        <button onClick={() => window.location.reload()}>Retry</button>
        </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No tasks found. Create your first task!</p>
      ) : (
        <div className="tasks">
          {tasks.map(task => (
            <div key={task.id} className={`task-card ${task.status}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
              <div className="task-actions">
                      <button
                  onClick={() => handleStatusToggle(task)}
                  disabled={updateMutation.isPending}
                  className={`btn ${task.status === 'pending' ? 'btn-success' : 'btn-warning'}`}
                      >
                  {task.status === 'pending' ? 'Complete' : 'Undo'}
                      </button>
                      <button
                  onClick={() => handleDelete(task.id)}
                  disabled={deleteMutation.isPending}
                  className="btn btn-danger"
                      >
                  Delete
                      </button>
                    </div>
                  </div>
          ))}
                    </div>
      )}
    </div>
  );
};

export default TaskListQuery;
```

---

## 8. Complete Examples

### Full Task Manager with Axios

```typescript
// App.tsx
import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    setRefreshKey(prev => prev + 1);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager (Axios)</h1>
        <p>Learn API integration with Axios - the most popular HTTP client</p>
                      <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
                      >
          {showForm ? 'Hide Form' : 'Add New Task'}
                      </button>
      </header>

      <main className="app-main">
        {showForm && (
          <div className="form-section">
            <TaskForm onTaskCreated={handleTaskCreated} />
                  </div>
                )}

        <div className="tasks-section">
          <TaskList key={refreshKey} />
              </div>
      </main>
    </div>
  );
}

export default App;
```

### Full Task Manager with React Query

```typescript
// AppQuery.tsx
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskListQuery from './components/TaskListQuery';
import TaskFormQuery from './components/TaskFormQuery';
import './App.css';

const queryClient = new QueryClient();

function AppQuery() {
  const [showForm, setShowForm] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <h1>Task Manager (React Query)</h1>
          <p>Advanced data management with caching and optimization</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Hide Form' : 'Add New Task'}
          </button>
        </header>

        <main className="app-main">
          {showForm && (
            <div className="form-section">
              <TaskFormQuery onSuccess={() => setShowForm(false)} />
            </div>
          )}

          <div className="tasks-section">
            <TaskListQuery />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default AppQuery;
```

### Comparison: Axios vs React Query

| Feature | Axios | React Query |
|---------|-------|-------------|
| **Learning Curve** | Easy | Moderate |
| **Bundle Size** | Small | Larger |
| **Caching** | Manual | Automatic |
| **Background Updates** | Manual | Automatic |
| **Optimistic Updates** | Manual | Built-in |
| **Error Handling** | Manual | Built-in |
| **Loading States** | Manual | Built-in |
| **Use Case** | Simple API calls | Complex data management |

### When to Use What

**Use Axios when:**
- Simple API calls
- Small applications
- Learning API integration
- Need full control over requests

**Use React Query when:**
- Complex data management
- Need caching and background updates
- Multiple components using same data
- Want optimistic updates
- Building large applications

---

## Best Practices Summary

### Axios Best Practices
1. **Create centralized API client** with interceptors
2. **Handle errors consistently** with proper error messages
3. **Show loading states** for better UX
4. **Use TypeScript** for type safety
5. **Implement retry logic** for failed requests

### React Query Best Practices
1. **Use consistent query keys** for cache management
2. **Invalidate queries** after mutations
3. **Implement optimistic updates** for better UX
4. **Configure stale time** appropriately
5. **Use error boundaries** for error handling

### General Best Practices
1. **Separate API logic** from components
2. **Handle all states** (loading, error, success, empty)
3. **Validate data** before using
4. **Implement proper error boundaries**
5. **Test API integration** thoroughly