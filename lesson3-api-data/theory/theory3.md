# Theory: API Integration & Data Management

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

## Understanding REST APIs with Node.js/MongoDB 📡

### From Database to API Response

```typescript
// Node.js/Express backend endpoint
app.get("/api/students", async (req, res) => {
  try {
    // 1. Query MongoDB database
    const students = await Student.find();

    // 2. Send JSON response to React
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### React Frontend Consumption

```tsx
// React component using the API
function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // 1. Send HTTP request to your Node.js backend
    const response = await fetch('http://localhost:5000/api/students');
    const data = await response.json();

    // 2. Update React state with database data
    setStudents(data);
  }, []);

  return (
    <div>
      {students.map(student => (
        <div key={student._id}>{student.name}</div>
      ))}
    </div>
  );
}
```

---

## Mapping Node.js Endpoints to React Functions

**Your Node.js API Structure:**

```typescript
// server/routes/students\.ts - Your backend API
const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

// GET /api/students - List all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// POST /api/students - Create student
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});
```

**React Frontend Implementation:**

```tsx
// React frontend calling your Node.js API
function useStudents() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (studentData) => {
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      const newStudent = await response.json();
      setStudents((prev) => [...prev, newStudent]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return { students, fetchStudents, addStudent };
}
```

---

## Professional Data Fetching with React Query 🔄

### Basic Setup

```tsx
// main\.tsx - Configure React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
```

### Query Implementation

```tsx
// components/StudentsList\.tsx - Using React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function StudentsList() {
  const queryClient = useQueryClient();

  // Fetch students with automatic caching and error handling
  const {
    data: students = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/students");
      if (!response.ok) throw new Error("Failed to fetch students");
      return response.json();
    },
  });

  // Create mutation for adding students
  const createMutation = useMutation({
    mutationFn: async (studentData) => {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });
      return response.json();
    },
    onSuccess: () => {
      // Automatically refetch students list
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  if (isLoading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {students.map((student) => (
        <div key={student._id}>
          {student.name} - {student.major}
        </div>
      ))}
      <button
        onClick={() =>
          createMutation.mutate({ name: "New Student", major: "CS" })
        }
      >
        Add Student {createMutation.isPending && "..."}
      </button>
    </div>
  );
}
```

---

## Advanced CRUD Operations with MongoDB 📝

### Search and Filtering

```tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent } from 'react';

interface Student {
  id: number;
  name: string;
  major: string;
}

function StudentSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [major, setMajor] = useState("");

  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ["students", { search: searchTerm, major }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (major) params.append("major", major);

      const response = await fetch(
        `http://localhost:5000/api/students?${params}`
      );
      return response.json();
    },
    enabled: searchTerm.length >= 2 || major !== "", // Only search when criteria met
  });

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        placeholder="Search students..."
      />
      <select value={major} onChange={(e: ChangeEvent<HTMLSelectElement>) => setMajor(e.target.value)}>
        <option value="">All Majors</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Information Technology">Information Technology</option>
      </select>
      {isLoading ? "Searching..." : students.length + " students found"}
    </div>
  );
}
```

### Update Operations

```tsx
interface Student {
  _id: string;
  name: string;
  email: string;
  major: string;
}

interface EditStudentProps {
  studentId: string;
}

interface UpdateData {
  id: string;
  data: Partial<Student>;
}

function EditStudent({ studentId }: EditStudentProps) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: UpdateData) => {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const handleUpdate = (updatedData) => {
    updateMutation.mutate({ id: studentId, data: updatedData });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleUpdate(Object.fromEntries(formData));
      }}
    >
      <input name="name" placeholder="Student name" />
      <input name="email" placeholder="Email" />
      <select name="major">
        <option value="Computer Science">Computer Science</option>
        <option value="Information Technology">IT</option>
      </select>
      <button type="submit" disabled={updateMutation.isPending}>
        {updateMutation.isPending ? "Updating..." : "Update Student"}
      </button>
    </form>
  );
}
```

### Delete Operations

```tsx
interface DeleteStudentProps {
  student: Student;
}

function DeleteStudent({ student }: DeleteStudentProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete student");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const handleDelete = () => {
    if (confirm(`Delete ${student.name}?`)) {
      deleteMutation.mutate(student._id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
      className="delete-btn"
    >
      {deleteMutation.isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
```

---

## Professional Error Handling & Loading States 🚨

### Error Boundaries for API Failures

```tsx
// components/ErrorBoundary\.tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("API Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong with the API</h2>
          <details>{this.state.error && this.state.error.toString()}</details>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Advanced Loading States

```tsx
function StudentDashboard() {
  const {
    data: students,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  if (isLoading) {
    return (
      <div className="loading-skeleton">
        <div className="skeleton-item"></div>
        <div className="skeleton-item"></div>
        <div className="skeleton-item"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Unable to load students</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      {isFetching && <div className="background-loading">Updating...</div>}
      <div className="students-grid">
        {students.map((student) => (
          <StudentCard key={student._id} student={student} />
        ))}
      </div>
    </div>
  );
}
```

---

## Best Practices for Production Apps 🏗️

### 1. Environment Configuration

```typescript
// config/api\.ts
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-api.com/api"
    : "http://localhost:5000/api";

export const apiClient = {
  get: (endpoint) => fetch(`${API_BASE_URL}${endpoint}`),
  post: (endpoint, data) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
```

### 2. Optimistic Updates

```tsx
function useOptimisticStudents() {
  const queryClient = useQueryClient();

  const addStudentMutation = useMutation({
    mutationFn: createStudent,
    onMutate: async (newStudent) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["students"] });

      // Snapshot previous value
      const previousStudents = queryClient.getQueryData(["students"]);

      // Optimistically update the cache
      queryClient.setQueryData(["students"], (old) => [
        ...old,
        { ...newStudent, _id: Date.now(), isOptimistic: true },
      ]);

      return { previousStudents };
    },
    onError: (err, newStudent, context) => {
      // Rollback on error
      queryClient.setQueryData(["students"], context.previousStudents);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return addStudentMutation;
}
```

### 3. Request Caching and Deduplication

```tsx
// Custom hook with intelligent caching
function useStudent(id) {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404s
      if (error.status === 404) return false;
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
}
```

---

## Lab Exercise Preview 🧪

**What You'll Build:**

1. **Node.js/Express API**

   - MongoDB connection with Mongoose
   - CRUD endpoints for tasks
   - Error handling middleware

2. **React Frontend Integration**

   - React Query setup
   - Task list with CRUD operations
   - Loading states and error handling

3. **Testing & Polish**
   - Test all functionality
   - Add optimistic updates

**Result:** A fully functional task management system with modern architecture!

---

## Next: Hands-On Practice 👨‍💻

Ready to put theory into practice? Let's build a real application that connects React to a Node.js/MongoDB backend!

**In the next session:**

- Set up your development environment
- Build API endpoints with Express/MongoDB
- Implement React Query for data management
- Add professional error handling and loading states


