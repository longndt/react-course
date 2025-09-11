# Lesson 3: API Integration & Data Management 🌐

## What Will You Learn? 🎯

After this lesson, you will:

- Connect React to your existing PHP/MySQL backends
- Implement proper API communication patterns
- Handle loading states and error scenarios professionally
- Build CRUD operations with real databases
- Understand data synchronization between frontend and backend
- Apply industry-standard data fetching patterns

---

## Why API Integration Matters for Your Projects? 🤔

**Real-World Context:**
```
Your PHP Project:
┌─────────────┐    ┌──────────┐    ┌─────────┐
│    PHP      │    │          │    │ MySQL   │
│  Backend    │────┤ Browser  │────┤Database │
│             │    │          │    │         │
└─────────────┘    └──────────┘    └─────────┘
     Mixed HTML/PHP + Database

Modern Full-Stack:
┌─────────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐
│   React     │    │   HTTP   │    │   PHP    │    │ MySQL   │
│  Frontend   │────┤   API    │────┤ Backend  │────┤Database │
│             │    │          │    │          │    │         │
└─────────────┘    └──────────┘    └──────────┘    └─────────┘
   Clean Separation + Better UX
```

**Benefits for Final Year Projects:**
- Professional architecture that impresses evaluators
- Better user experience (no page reloads)
- Easier to maintain and scale
- Modern industry standards
- Can reuse backend APIs for mobile apps

---

## Understanding HTTP Communication 📡

### Basic API Communication Pattern

```typescript
// What happens when you fetch data
const fetchStudents = async () => {
  // 1. Send HTTP request to your PHP backend
  const response = await fetch('http://localhost/api/students.php');

  // 2. Check if request was successful
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }

  // 3. Convert response to JSON
  const data = await response.json();

  // 4. Use data in your React app
  return data;
};
```

### Mapping PHP Endpoints to React Functions

**Your Existing PHP Structure:**
```php
// students.php - Your existing backend
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get all students
    $students = get_all_students(); // Your existing function
    echo json_encode($students);
}
?>
```

**React Integration:**
```typescript
// React frontend calling your PHP
const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost/api/students.php');
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return { students, loading, error };
};
```

---

## Professional Error Handling 🛡️

### The Three States Every API Call Should Handle

```typescript
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function StudentList() {
  const [apiState, setApiState] = useState<ApiState<Student[]>>({
    data: null,
    loading: true,
    error: null
  });

  // Always handle these three cases:
  if (apiState.loading) {
    return <LoadingSpinner message="Loading students..." />;
  }

  if (apiState.error) {
    return <ErrorMessage error={apiState.error} onRetry={fetchStudents} />;
  }

  if (!apiState.data || apiState.data.length === 0) {
    return <EmptyState message="No students found" />;
  }

  // Only render data when we have it
  return (
    <div className="student-list">
      {apiState.data.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
```

---

## Building CRUD Operations 🔄

### Create - Adding New Records

```typescript
// React Frontend
const createStudent = async (studentData: Omit<Student, 'id'>) => {
  const response = await fetch('http://localhost/api/students.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData)
  });

  if (!response.ok) {
    throw new Error('Failed to create student');
  }

  return response.json();
};

// Component Usage
function AddStudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    year: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newStudent = await createStudent(formData);
      // Update UI or redirect
      onStudentAdded(newStudent);
    } catch (error) {
      setError('Failed to add student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Read - Fetching Data with Filters

```typescript
// Advanced data fetching with search and filters
const useStudents = (filters: StudentFilters) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Build query string from filters
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.major) params.append('major', filters.major);
        if (filters.year) params.append('year', filters.year.toString());

        const response = await fetch(`http://localhost/api/students.php?${params}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [filters]); // Re-fetch when filters change

  return { students, loading };
};
```

### Update - Modifying Existing Records

```typescript
const updateStudent = async (id: number, updates: Partial<Student>) => {
  const response = await fetch(`http://localhost/api/students.php?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error('Failed to update student');
  }

  return response.json();
};

// Optimistic updates - Update UI immediately, rollback if fails
const handleUpdateStudent = async (id: number, updates: Partial<Student>) => {
  // Update UI immediately
  setStudents(prev => prev.map(student =>
    student.id === id ? { ...student, ...updates } : student
  ));

  try {
    await updateStudent(id, updates);
    // Success - no need to do anything
  } catch (error) {
    // Rollback the optimistic update
    setStudents(prev => prev.map(student =>
      student.id === id ? originalStudent : student
    ));
    setError('Failed to update student');
  }
};
```

### Delete - Removing Records

```typescript
const deleteStudent = async (id: number) => {
  const response = await fetch(`http://localhost/api/students.php?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
};

// Component with confirmation
function StudentCard({ student, onDelete }: StudentCardProps) {
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${student.name}?`)) {
      return;
    }

    try {
      await deleteStudent(student.id);
      onDelete(student.id); // Update parent component
    } catch (error) {
      alert('Failed to delete student');
    }
  };

  return (
    <div className="student-card">
      {/* Student details */}
      <button onClick={handleDelete} className="btn-delete">
        Delete
      </button>
    </div>
  );
}
```

---

## Advanced Data Management with React Query 🚀

### Why React Query for Final Year Projects?

React Query handles the complex parts of data fetching automatically:
- Caching (don't refetch data unnecessarily)
- Background updates
- Error retries
- Loading states
- Data synchronization

```bash
# Install React Query
npm install @tanstack/react-query
```

### Setup React Query

```typescript
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

### Using React Query for CRUD Operations

```typescript
// Custom hooks with React Query
export function useStudents(filters?: StudentFilters) {
  return useQuery({
    queryKey: ['students', filters],
    queryFn: () => fetchStudents(filters),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      // Invalidate and refetch students list
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Student> }) =>
      updateStudent(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

// Component usage
function StudentManagement() {
  const { data: students, isLoading, error } = useStudents();
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error.message} />;

  const handleCreateStudent = (studentData: Omit<Student, 'id'>) => {
    createMutation.mutate(studentData, {
      onSuccess: () => {
        alert('Student created successfully!');
      },
      onError: (error) => {
        alert(`Failed to create student: ${error.message}`);
      },
    });
  };

  return (
    <div>
      <AddStudentForm
        onSubmit={handleCreateStudent}
        isLoading={createMutation.isPending}
      />
      <StudentsList students={students} />
    </div>
  );
}
```

---

## Connecting to Your Existing PHP Backend 🔗

### Step 1: Enable CORS in Your PHP

Add this to the top of your PHP API files:

```php
<?php
// Enable CORS for React development
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
```

### Step 2: Structure Your PHP API

```php
<?php
// api/students.php - RESTful API structure
require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

switch ($method) {
    case 'GET':
        if ($id) {
            getStudent($id);
        } else {
            getStudents();
        }
        break;

    case 'POST':
        createStudent();
        break;

    case 'PUT':
        updateStudent($id);
        break;

    case 'DELETE':
        deleteStudent($id);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getStudents() {
    global $pdo;

    // Handle search and filters
    $search = $_GET['search'] ?? '';
    $major = $_GET['major'] ?? '';

    $sql = "SELECT * FROM students WHERE 1=1";
    $params = [];

    if ($search) {
        $sql .= " AND (name LIKE ? OR email LIKE ?)";
        $params[] = "%$search%";
        $params[] = "%$search%";
    }

    if ($major) {
        $sql .= " AND major = ?";
        $params[] = $major;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($students);
}

function createStudent() {
    global $pdo;

    $input = json_decode(file_get_contents('php://input'), true);

    // Validate input
    if (!$input['name'] || !$input['email']) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and email are required']);
        return;
    }

    $sql = "INSERT INTO students (name, email, major, year, gpa) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            $input['name'],
            $input['email'],
            $input['major'],
            $input['year'],
            $input['gpa']
        ]);

        $id = $pdo->lastInsertId();

        echo json_encode([
            'id' => $id,
            'message' => 'Student created successfully'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
```

### Step 3: Environment Configuration for Development

Create `.env.local` in your React project:

```bash
# Development API URL
VITE_API_BASE_URL=http://localhost/your-php-project/api

# Production API URL (for deployment)
VITE_API_BASE_URL_PROD=https://yoursite.com/api
```

Use in your React app:

```typescript
// config/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

export const apiClient = {
  get: (endpoint: string) => fetch(`${API_BASE_URL}${endpoint}`),
  post: (endpoint: string, data: any) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
  // ... other methods
};
```

---

## Real-Time Features with WebSockets 📡

For advanced final year projects, you might want real-time updates:

```typescript
// useWebSocket.ts - Custom hook for real-time data
export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setLastMessage(message);
    };

    setSocket(ws);

    return () => ws.close();
  }, [url]);

  const sendMessage = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  return { lastMessage, sendMessage };
}

// Usage in component
function LiveStudentDashboard() {
  const { lastMessage } = useWebSocket('ws://localhost:8080');
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (lastMessage?.type === 'student_updated') {
      setStudents(prev => prev.map(student =>
        student.id === lastMessage.student.id
          ? lastMessage.student
          : student
      ));
    }
  }, [lastMessage]);

  return (
    <div>
      <h2>Live Student Updates</h2>
      {/* Student list automatically updates */}
    </div>
  );
}
```

---

## Performance Optimization Tips 🚀

### 1. Implement Proper Loading States

```typescript
function OptimizedStudentList() {
  const { data: students, isLoading, isFetching } = useStudents();

  return (
    <div>
      {/* Show different loading indicators */}
      {isLoading && <div>Loading students for the first time...</div>}
      {isFetching && !isLoading && <div>Refreshing data...</div>}

      {students && (
        <div>
          {students.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### 2. Implement Virtual Scrolling for Large Lists

```typescript
import { FixedSizeList as List } from 'react-window';

function VirtualizedStudentList({ students }: { students: Student[] }) {
  const Row = ({ index, style }: any) => (
    <div style={style}>
      <StudentCard student={students[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={students.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

### 3. Implement Search Debouncing

```typescript
import { useDeferredValue } from 'react';

function SearchableStudentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { data: students } = useStudents({ search: deferredSearchTerm });

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search students..."
      />
      {/* Only searches after user stops typing */}
      <StudentList students={students} />
    </div>
  );
}
```

---

## Summary: Building Production-Ready API Integration 🎯

**Key Takeaways for Your Final Year Project:**

1. **Architecture**: Separate your frontend (React) from backend (PHP/Node.js) for better maintainability

2. **Error Handling**: Always handle loading, error, and empty states professionally

3. **Performance**: Use React Query for caching and optimistic updates

4. **Security**: Implement proper CORS, input validation, and authentication

5. **User Experience**: Provide immediate feedback for all user actions

6. **Code Quality**: Use TypeScript for better development experience and fewer bugs

**Next Steps:**
- In Lab 3, you'll build a complete CRUD interface connected to a real database
- Learn how to handle file uploads and media management
- Implement user authentication with JWT tokens
- Deploy your full-stack application to production

This foundation will serve you well in building sophisticated web applications for your final year project! 🚀
