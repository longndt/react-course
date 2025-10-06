# Reference - API Integration & Data Management

## Table of Contents
1. [Express Backend Setup](#1-express-backend-setup)
2. [React Query Setup](#2-react-query-setup)
3. [API Client Patterns](#3-api-client-patterns)
4. [Data Fetching Components](#4-data-fetching-components)
5. [CRUD Operations](#5-crud-operations)
6. [Advanced Patterns](#6-advanced-patterns)
7. [Error Handling](#7-error-handling)
8. [Complete Examples](#8-complete-examples)

---

## 1. Express Backend Setup

### Basic Express Server with CORS

```javascript
// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data (replace with MongoDB later)
let students = [
  { id: 1, name: 'John Doe', email: 'john@example.com', grade: 'A' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: 'B' },
];

// GET - Fetch all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// GET - Fetch single student
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// POST - Create student
app.post('/api/students', (req, res) => {
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    grade: req.body.grade || 'N/A',
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT - Update student
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// DELETE - Remove student
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: 'Student deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Express Server with MongoDB

```javascript
// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  grade: { type: String, default: 'N/A' },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 2. React Query Setup

### Install Dependencies

```bash
npm install @tanstack/react-query axios
npm install @tanstack/react-query-devtools --save-dev
```

### Setup QueryClient Provider

```jsx
// src/main.jsx
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
```

---

## 3. API Client Patterns

### Basic Fetch API Client

```javascript
// src/services/api.js
const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Generic request handler
  async request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  // GET
  get(endpoint) {
    return this.request(endpoint);
  },

  // POST
  post(endpoint, data) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // DELETE
  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  },
};
```

### Axios API Client

```javascript
// src/services/api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: (url) => axiosInstance.get(url).then(res => res.data),
  post: (url, data) => axiosInstance.post(url, data).then(res => res.data),
  put: (url, data) => axiosInstance.put(url, data).then(res => res.data),
  delete: (url) => axiosInstance.delete(url).then(res => res.data),
};
```

### Type-Safe API Client

```javascript
// src/services/studentApi.js
import { api } from './api';
import PropTypes from 'prop-types';

// Student shape: { id, name, email, grade }
// CreateStudentDto: { name, email, grade? }
// UpdateStudentDto: { name?, email?, grade? }

export const studentApi = {
  getAll: () => api.get('/students'),

  getById: (id) => api.get(`/students/${id}`),

  create: (data) => api.post('/students', data),

  update: (id, data) =>
    api.put(`/students/${id}`, data),

  delete: (id) => api.delete(`/students/${id}`),
};
```

---

## 4. Data Fetching Components

### Basic useQuery Hook

```jsx
// src/components/StudentList.jsx
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';

function StudentList() {
  const { data: students, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: studentApi.getAll,
  });

  if (isLoading) return <div>Loading students...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students?.map(student => (
          <li key={student.id}>
            {student.name} - {student.email} - Grade: {student.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
```

### useQuery with Loading Skeleton

```jsx
// src/components/StudentListWithSkeleton.jsx
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';

function StudentSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-200 h-16 rounded"></div>
      ))}
    </div>
  );
}

function StudentListWithSkeleton() {
  const { data: students, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: studentApi.getAll,
  });

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded">
        <p className="text-red-600">Failed to load students: {error.message}</p>
        <button className="mt-2 text-red-700 underline">Retry</button>
      </div>
    );
  }

  if (isLoading) return <StudentSkeleton />;

  if (!students || students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No students found. Add your first student!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {students.map(student => (
        <div key={student.id} className="bg-white border p-4 rounded shadow-sm">
          <h3 className="font-semibold">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.email}</p>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Grade: {student.grade}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StudentListWithSkeleton;
```

### Custom Hook for Data Fetching

```jsx
// src/hooks/useStudents.js
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';

export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: studentApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useStudent(id) {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => studentApi.getById(id),
    enabled: !!id, // Only run if id exists
  });
}

// Usage in component:
function StudentComponent() {
  const { data: students, isLoading, error, refetch } = useStudents();

  // Component logic...
}
```

---

## 5. CRUD Operations

### Create Operation with useMutation

```jsx
// src/components/CreateStudent.jsx
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';
import PropTypes from 'prop-types';

function CreateStudent() {
  const [formData, setFormData] = useState<CreateStudentDto>({
    name: '',
    email: '',
    grade: 'A',
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: studentApi.create,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['students'] });

      // Reset form
      setFormData({ name: '', email: '', grade: 'A' });

      // Show success message
      alert('Student created successfully!');
    },
    onError: (error: Error) => {
      alert(`Failed to create student: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Grade</label>
        <select
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          className="mt-1 block w-full border rounded px-3 py-2"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {createMutation.isPending ? 'Creating...' : 'Create Student'}
      </button>
    </form>
  );
}

export default CreateStudent;
```

### Update Operation

```jsx
// src/components/EditStudent.jsx
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';
import PropTypes from 'prop-types';

function EditStudent({ studentId, onClose }) {
  const queryClient = useQueryClient();

  // Fetch student data
  const { data: student } = useQuery({
    queryKey: ['students', studentId],
    queryFn: () => studentApi.getById(studentId),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '',
  });

  // Update form when student data loads
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        grade: student.grade,
      });
    }
  }, [student]);

  const updateMutation = useMutation({
    mutationFn: (data) => studentApi.update(studentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['students', studentId] });
      alert('Student updated successfully!');
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Edit Student</h3>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Grade</label>
        <select
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          className="mt-1 block w-full border rounded px-3 py-2"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {updateMutation.isPending ? 'Updating...' : 'Update'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditStudent;
```

### Delete Operation with Confirmation

```jsx
// src/components/DeleteStudent.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';
import PropTypes from 'prop-types';

function DeleteStudent({ studentId, studentName }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => studentApi.delete(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      alert('Student deleted successfully!');
    },
    onError: (error) => {
      alert(`Failed to delete: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${studentName}?`)) {
      deleteMutation.mutate();
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-gray-400"
    >
      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}

DeleteStudent.propTypes = {
  studentId: PropTypes.number.isRequired,
  studentName: PropTypes.string.isRequired
};

export default DeleteStudent;
```

---

## 6. Advanced Patterns

### Optimistic Updates

```jsx
// src/hooks/useOptimisticStudent.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';

export function useOptimisticUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      studentApi.update(id, data),

    // Optimistic update
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['students'] });

      // Snapshot previous value
      const previousStudents = queryClient.getQueryData(['students']);

      // Optimistically update
      queryClient.setQueryData(['students'], (old) =>
        old?.map(student =>
          student.id === id ? { ...student, ...data } : student
        )
      );

      // Return context with snapshot
      return { previousStudents };
    },

    // Rollback on error
    onError: (err, variables, context) => {
      if (context?.previousStudents) {
        queryClient.setQueryData(['students'], context.previousStudents);
      }
    },

    // Refetch after success or error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}
```

### Pagination with useInfiniteQuery

```jsx
// src/components/InfiniteStudentList.jsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

/**
 * @typedef {Object} PaginatedResponse
 * @property {Student[]} data - Array of students
 * @property {number|null} nextPage - Next page number or null
 * @property {boolean} hasMore - Whether there are more pages
 */

const fetchStudents = async ({ pageParam = 1 }) => {
  const response = await fetch(`http://localhost:5000/api/students?page=${pageParam}&limit=10`);
  return response.json();
};

function InfiniteStudentList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['students', 'infinite'],
    queryFn: fetchStudents,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const observerTarget = useRef(null);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map(student => (
            <div key={student.id} className="border p-4 mb-2">
              {student.name} - {student.email}
            </div>
          ))}
        </div>
      ))}

      <div ref={observerTarget} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  );
}

export default InfiniteStudentList;
```

### Search and Filter

```jsx
// src/components/SearchableStudentList.jsx
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';

function SearchableStudentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: studentApi.getAll,
  });

  const filteredStudents = useMemo(() => {
    if (!students) return [];

    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;

      return matchesSearch && matchesGrade;
    });
  }, [students, searchTerm, gradeFilter]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />

        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Grades</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        Showing {filteredStudents.length} of {students?.length} students
      </div>

      <div className="space-y-2">
        {filteredStudents.map(student => (
          <div key={student.id} className="border p-3 rounded">
            <h3 className="font-semibold">{student.name}</h3>
            <p className="text-sm text-gray-600">{student.email}</p>
            <span className="text-xs bg-blue-100 px-2 py-1 rounded">
              Grade: {student.grade}
            </span>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No students found matching your criteria
        </div>
      )}
    </div>
  );
}

export default SearchableStudentList;
```

---

## 7. Error Handling

### Global Error Boundary

```jsx
// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-700 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node
};

export default ErrorBoundary;
```

### Retry Logic with React Query

```jsx
// src/hooks/useStudentsWithRetry.ts
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';

export function useStudentsWithRetry() {
  return useQuery({
    queryKey: ['students'],
    queryFn: studentApi.getAll,
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    staleTime: 5 * 60 * 1000,
  });
}
```

---

## 8. Complete Examples

### Full CRUD Component

```jsx
// src/components/StudentManager.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../services/studentApi';

function StudentManager() {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: 'A',
  });

  const queryClient = useQueryClient();

  // Fetch students
  const { data: students, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: studentApi.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: studentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setFormData({ name: '', email: '', grade: 'A' });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      studentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setEditingId(null);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: studentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleUpdate = (student) => {
    if (editingId === student.id) {
      updateMutation.mutate({ id: student.id, data: formData });
    } else {
      setEditingId(student.id);
      setFormData({
        name: student.name,
        email: student.email,
        grade: student.grade,
      });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (error) return <div className="text-red-600">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Student Manager</h1>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={editingId ? '' : formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={editingId !== null}
            className="border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={editingId ? '' : formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={editingId !== null}
            className="border rounded px-3 py-2"
          />
          <select
            value={editingId ? '' : formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            disabled={editingId !== null}
            className="border rounded px-3 py-2"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={createMutation.isPending || editingId !== null}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {createMutation.isPending ? 'Creating...' : 'Add Student'}
        </button>
      </form>

      {/* Student List */}
      <div className="bg-white rounded shadow">
        <h2 className="text-xl font-semibold p-6 border-b">Students</h2>
        {isLoading ? (
          <div className="p-6">Loading...</div>
        ) : (
          <div className="divide-y">
            {students?.map(student => (
              <div key={student.id} className="p-4 hover:bg-gray-50">
                {editingId === student.id ? (
                  <div className="grid grid-cols-4 gap-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border rounded px-2 py-1"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border rounded px-2 py-1"
                    />
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="border rounded px-2 py-1"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(student)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                        Grade: {student.grade}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(student)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id, student.name)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentManager;
```

---

## Quick Reference Commands

```bash
# Start Express Backend
cd server
node server.js

# Start React Frontend
npm run dev

# Install React Query
npm install @tanstack/react-query

# Install Axios
npm install axios

# Install React Query Devtools
npm install @tanstack/react-query-devtools --save-dev
```

---

## Common Patterns Summary

| Pattern | Use Case | Tool |
|---------|----------|------|
| **Basic Fetch** | Simple GET requests | useQuery |
| **Mutations** | Create/Update/Delete | useMutation |
| **Optimistic Updates** | Instant UI feedback | onMutate |
| **Infinite Scroll** | Large lists | useInfiniteQuery |
| **Polling** | Real-time updates | refetchInterval |
| **Dependent Queries** | Sequential requests | enabled option |
| **Parallel Queries** | Multiple endpoints | Multiple useQuery |

---

** You now have a complete reference for building React applications with API integration!**
