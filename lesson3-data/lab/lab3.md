# Lab 3: Building a Full-Stack Student Management System

## Overview
In this lab, you'll build a complete student management system that connects a React frontend to a PHP/MySQL backend. This simulates the kind of full-stack application you'll build for your final year project.

**Time Allocation:**
- Exercise 1: PHP API Setup (45 minutes)
- Exercise 2: React API Integration (60 minutes)
- Exercise 3: CRUD Operations (75 minutes)
- Exercise 4: Advanced Features (60 minutes)

**Learning Objectives:**
- Connect React to existing PHP/MySQL backends
- Implement professional API communication patterns
- Handle real-world scenarios (errors, loading, validation)
- Build production-ready CRUD operations

---

## Pre-Lab Setup

### Required Software
- [ ] XAMPP/WAMP/MAMP (for PHP and MySQL)
- [ ] Previous React project or new Vite project
- [ ] VS Code with PHP and React extensions
- [ ] Thunder Client or Postman for API testing

### Database Preparation
Run this SQL to create your database:

```sql
CREATE DATABASE IF NOT EXISTS student_management;
USE student_management;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    major VARCHAR(50) NOT NULL,
    year TINYINT NOT NULL,
    gpa DECIMAL(3,2),
    is_active BOOLEAN DEFAULT 1,
    enrollment_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    credits TINYINT NOT NULL,
    instructor VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    grade VARCHAR(2),
    semester VARCHAR(20),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO students (name, email, major, year, gpa, enrollment_date) VALUES
('Alice Johnson', 'alice.johnson@university.edu', 'Computer Science', 3, 3.8, '2022-09-01'),
('Bob Smith', 'bob.smith@university.edu', 'Information Technology', 4, 3.6, '2021-09-01'),
('Carol Davis', 'carol.davis@university.edu', 'Software Engineering', 2, 3.9, '2023-09-01'),
('David Wilson', 'david.wilson@university.edu', 'Computer Science', 3, 3.4, '2022-09-01'),
('Eva Brown', 'eva.brown@university.edu', 'Data Science', 1, 3.7, '2024-09-01');

INSERT INTO courses (name, code, credits, instructor) VALUES
('React Development', 'CS301', 3, 'Dr. Johnson'),
('Database Systems', 'CS302', 4, 'Prof. Smith'),
('Software Engineering', 'CS401', 3, 'Dr. Brown'),
('Data Structures', 'CS201', 4, 'Prof. Wilson'),
('Web Development', 'CS300', 3, 'Dr. Davis');

INSERT INTO enrollments (student_id, course_id, grade, semester) VALUES
(1, 1, 'A', 'Fall 2024'),
(1, 2, 'B+', 'Fall 2024'),
(2, 1, 'A-', 'Fall 2024'),
(2, 3, 'B', 'Fall 2024'),
(3, 4, 'A', 'Fall 2024');
```

---

## Exercise 1: Building a Professional PHP API (45 minutes)

### Step 1: Database Configuration

Create `config/database.php`:

```php
<?php
class Database {
    private $host = 'localhost';
    private $db_name = 'student_management';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

// Global database connection
$database = new Database();
$pdo = $database->getConnection();
?>
```

### Step 2: CORS and Headers Configuration

Create `config/cors.php`:

```php
<?php
// Allow requests from React development server
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
```

### Step 3: Student API Endpoint

Create `api/students.php`:

```php
<?php
require_once '../config/cors.php';
require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

try {
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
            if (!$id) {
                throw new Exception('ID is required for updates');
            }
            updateStudent($id);
            break;

        case 'DELETE':
            if (!$id) {
                throw new Exception('ID is required for deletion');
            }
            deleteStudent($id);
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getStudents() {
    global $pdo;

    // Handle search and filters
    $search = $_GET['search'] ?? '';
    $major = $_GET['major'] ?? '';
    $year = $_GET['year'] ?? '';
    $active = $_GET['active'] ?? '';

    $sql = "SELECT * FROM students WHERE 1=1";
    $params = [];

    if ($search) {
        $sql .= " AND (name LIKE ? OR email LIKE ? OR major LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    if ($major) {
        $sql .= " AND major = ?";
        $params[] = $major;
    }

    if ($year) {
        $sql .= " AND year = ?";
        $params[] = $year;
    }

    if ($active !== '') {
        $sql .= " AND is_active = ?";
        $params[] = $active === 'true' ? 1 : 0;
    }

    $sql .= " ORDER BY name ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convert boolean fields
    foreach ($students as &$student) {
        $student['is_active'] = (bool)$student['is_active'];
        $student['gpa'] = (float)$student['gpa'];
        $student['year'] = (int)$student['year'];
        $student['id'] = (int)$student['id'];
    }

    echo json_encode($students);
}

function getStudent($id) {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM students WHERE id = ?");
    $stmt->execute([$id]);
    $student = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$student) {
        http_response_code(404);
        echo json_encode(['error' => 'Student not found']);
        return;
    }

    // Convert types
    $student['is_active'] = (bool)$student['is_active'];
    $student['gpa'] = (float)$student['gpa'];
    $student['year'] = (int)$student['year'];
    $student['id'] = (int)$student['id'];

    echo json_encode($student);
}

function createStudent() {
    global $pdo;

    $input = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    $required = ['name', 'email', 'major', 'year', 'enrollment_date'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['error' => ucfirst($field) . ' is required']);
            return;
        }
    }

    // Validate email format
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        return;
    }

    // Validate year range
    if ($input['year'] < 1 || $input['year'] > 4) {
        http_response_code(400);
        echo json_encode(['error' => 'Year must be between 1 and 4']);
        return;
    }

    // Validate GPA if provided
    if (isset($input['gpa']) && ($input['gpa'] < 0 || $input['gpa'] > 4)) {
        http_response_code(400);
        echo json_encode(['error' => 'GPA must be between 0 and 4']);
        return;
    }

    $sql = "INSERT INTO students (name, email, major, year, gpa, is_active, enrollment_date)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['name'],
            $input['email'],
            $input['major'],
            $input['year'],
            $input['gpa'] ?? null,
            $input['is_active'] ?? true,
            $input['enrollment_date']
        ]);

        $id = $pdo->lastInsertId();

        // Return the created student
        $stmt = $pdo->prepare("SELECT * FROM students WHERE id = ?");
        $stmt->execute([$id]);
        $student = $stmt->fetch(PDO::FETCH_ASSOC);

        // Convert types
        $student['is_active'] = (bool)$student['is_active'];
        $student['gpa'] = (float)$student['gpa'];
        $student['year'] = (int)$student['year'];
        $student['id'] = (int)$student['id'];

        http_response_code(201);
        echo json_encode($student);

    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry
            http_response_code(409);
            echo json_encode(['error' => 'Email already exists']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
}

function updateStudent($id) {
    global $pdo;

    $input = json_decode(file_get_contents('php://input'), true);

    // Check if student exists
    $stmt = $pdo->prepare("SELECT id FROM students WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Student not found']);
        return;
    }

    // Build dynamic update query
    $updateFields = [];
    $params = [];

    $allowedFields = ['name', 'email', 'major', 'year', 'gpa', 'is_active'];

    foreach ($allowedFields as $field) {
        if (isset($input[$field])) {
            $updateFields[] = "$field = ?";
            $params[] = $input[$field];
        }
    }

    if (empty($updateFields)) {
        http_response_code(400);
        echo json_encode(['error' => 'No valid fields to update']);
        return;
    }

    $sql = "UPDATE students SET " . implode(', ', $updateFields) . " WHERE id = ?";
    $params[] = $id;

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        // Return updated student
        getStudent($id);

    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already exists']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
}

function deleteStudent($id) {
    global $pdo;

    // Check if student exists
    $stmt = $pdo->prepare("SELECT id FROM students WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Student not found']);
        return;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM students WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(['message' => 'Student deleted successfully']);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
```

### Step 4: Test Your API

Create a simple HTML file to test your API:

```html
<!-- test_api.html -->
<!DOCTYPE html>
<html>
<head>
    <title>API Test</title>
</head>
<body>
    <h1>Student API Test</h1>
    <button onclick="testAPI()">Test Get Students</button>
    <div id="result"></div>

    <script>
        async function testAPI() {
            try {
                const response = await fetch('http://localhost/your-project/api/students.php');
                const data = await response.json();
                document.getElementById('result').innerHTML =
                    '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
                document.getElementById('result').innerHTML = 'Error: ' + error.message;
            }
        }
    </script>
</body>
</html>
```

---

## Exercise 2: React API Integration Setup (60 minutes)

### Step 1: Install Required Dependencies

```bash
# In your React project directory
npm install @tanstack/react-query axios
npm install @types/node  # If using TypeScript
```

### Step 2: Create API Configuration

Create `src/config/api.ts`:

```typescript
import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/student-management/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access - redirect to login');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.log('Server error - show user-friendly message');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### Step 3: Create Type Definitions

Update `src/types/Student.ts`:

```typescript
export interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  year: number;
  gpa: number;
  is_active: boolean;
  enrollment_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  instructor: string;
  created_at?: string;
}

export interface Enrollment {
  id: number;
  student_id: number;
  course_id: number;
  grade?: string;
  semester: string;
  enrolled_at?: string;
}

export interface StudentFilters {
  search?: string;
  major?: string;
  year?: number;
  active?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  averageGPA: number;
  totalCourses: number;
}
```

### Step 4: Create API Service Functions

Create `src/services/studentService.ts`:

```typescript
import apiClient from '../config/api';
import { Student, StudentFilters, ApiResponse } from '../types/Student';

export const studentService = {
  // Get all students with optional filters
  async getStudents(filters?: StudentFilters): Promise<Student[]> {
    const params = new URLSearchParams();

    if (filters?.search) params.append('search', filters.search);
    if (filters?.major) params.append('major', filters.major);
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.active !== undefined) params.append('active', filters.active.toString());

    const response = await apiClient.get(`/students.php?${params}`);
    return response.data;
  },

  // Get single student by ID
  async getStudent(id: number): Promise<Student> {
    const response = await apiClient.get(`/students.php?id=${id}`);
    return response.data;
  },

  // Create new student
  async createStudent(studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>): Promise<Student> {
    const response = await apiClient.post('/students.php', studentData);
    return response.data;
  },

  // Update existing student
  async updateStudent(id: number, updates: Partial<Student>): Promise<Student> {
    const response = await apiClient.put(`/students.php?id=${id}`, updates);
    return response.data;
  },

  // Delete student
  async deleteStudent(id: number): Promise<void> {
    await apiClient.delete(`/students.php?id=${id}`);
  },

  // Get available majors (for filter dropdown)
  async getMajors(): Promise<string[]> {
    const students = await this.getStudents();
    const majors = [...new Set(students.map(s => s.major))];
    return majors.sort();
  }
};
```

### Step 5: Setup React Query

Update `src/main.tsx`:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Show React Query dev tools in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
);
```

---

## Exercise 3: Building CRUD Operations (75 minutes)

### Step 1: Create Custom Hooks for API Operations

Create `src/hooks/useStudents.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentService } from '../services/studentService';
import { Student, StudentFilters } from '../types/Student';

// Custom hook for fetching students
export function useStudents(filters?: StudentFilters) {
  return useQuery({
    queryKey: ['students', filters],
    queryFn: () => studentService.getStudents(filters),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

// Custom hook for fetching single student
export function useStudent(id: number) {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => studentService.getStudent(id),
    enabled: !!id, // Only run if ID is provided
  });
}

// Custom hook for creating students
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studentService.createStudent,
    onSuccess: (newStudent) => {
      // Add the new student to the cache
      queryClient.setQueryData(['students'], (oldData: Student[] | undefined) => {
        return oldData ? [...oldData, newStudent] : [newStudent];
      });

      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error: any) => {
      console.error('Failed to create student:', error.response?.data?.error || error.message);
    },
  });
}

// Custom hook for updating students
export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Student> }) =>
      studentService.updateStudent(id, updates),
    onSuccess: (updatedStudent) => {
      // Update the student in the cache
      queryClient.setQueryData(['student', updatedStudent.id], updatedStudent);

      // Update the student in the students list
      queryClient.setQueryData(['students'], (oldData: Student[] | undefined) => {
        return oldData?.map(student =>
          student.id === updatedStudent.id ? updatedStudent : student
        );
      });

      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

// Custom hook for deleting students
export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studentService.deleteStudent,
    onSuccess: (_, deletedId) => {
      // Remove the student from the cache
      queryClient.setQueryData(['students'], (oldData: Student[] | undefined) => {
        return oldData?.filter(student => student.id !== deletedId);
      });

      // Remove the individual student query
      queryClient.removeQueries({ queryKey: ['student', deletedId] });
    },
  });
}

// Custom hook for getting available majors
export function useMajors() {
  return useQuery({
    queryKey: ['majors'],
    queryFn: studentService.getMajors,
    staleTime: 30 * 60 * 1000, // 30 minutes (majors don't change often)
  });
}
```

### Step 2: Create Enhanced Components

Create `src/components/LoadingSpinner.tsx`:

```typescript
interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LoadingSpinner({ message = 'Loading...', size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 ${sizeClasses[size]}`}></div>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
}
```

Create `src/components/ErrorMessage.tsx`:

```typescript
interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Something went wrong</div>
      <p className="text-red-700 mb-4">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
```

Create `src/components/StudentForm.tsx`:

```typescript
import React, { useState, useEffect } from 'react';
import { Student } from '../types/Student';
import { useMajors } from '../hooks/useStudents';

interface StudentFormProps {
  student?: Student | null;
  onSubmit: (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function StudentForm({ student, onSubmit, onCancel, isLoading }: StudentFormProps) {
  const { data: majors = [] } = useMajors();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    year: 1,
    gpa: 0,
    is_active: true,
    enrollment_date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        major: student.major,
        year: student.year,
        gpa: student.gpa,
        is_active: student.is_active,
        enrollment_date: student.enrollment_date
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.major.trim()) {
      newErrors.major = 'Major is required';
    }

    if (formData.year < 1 || formData.year > 4) {
      newErrors.year = 'Year must be between 1 and 4';
    }

    if (formData.gpa < 0 || formData.gpa > 4) {
      newErrors.gpa = 'GPA must be between 0 and 4';
    }

    if (!formData.enrollment_date) {
      newErrors.enrollment_date = 'Enrollment date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 :
              type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {student ? 'Edit Student' : 'Add New Student'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter student name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="student@university.edu"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Major */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Major *
            </label>
            <select
              name="major"
              value={formData.major}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.major ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a major</option>
              {majors.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.major && <p className="mt-1 text-sm text-red-500">{errors.major}</p>}
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Year *
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.year ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
            {errors.year && <p className="mt-1 text-sm text-red-500">{errors.year}</p>}
          </div>

          {/* GPA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GPA
            </label>
            <input
              type="number"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              min="0"
              max="4"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.gpa ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="3.50"
            />
            {errors.gpa && <p className="mt-1 text-sm text-red-500">{errors.gpa}</p>}
          </div>

          {/* Enrollment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enrollment Date *
            </label>
            <input
              type="date"
              name="enrollment_date"
              value={formData.enrollment_date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.enrollment_date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.enrollment_date && <p className="mt-1 text-sm text-red-500">{errors.enrollment_date}</p>}
          </div>
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">
            Student is currently active
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
}
```

---

## Exercise 4: Advanced Features & Complete Integration (60 minutes)

### Step 1: Create Advanced Search and Filtering

Create `src/components/StudentFilters.tsx`:

```typescript
import React from 'react';
import { StudentFilters } from '../types/Student';
import { useMajors } from '../hooks/useStudents';

interface StudentFiltersProps {
  filters: StudentFilters;
  onFiltersChange: (filters: StudentFilters) => void;
  onReset: () => void;
}

export function StudentFiltersComponent({ filters, onFiltersChange, onReset }: StudentFiltersProps) {
  const { data: majors = [] } = useMajors();

  const handleFilterChange = (field: keyof StudentFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [field]: value === '' ? undefined : value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filter Students</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Name, email, or major..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Major Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Major
          </label>
          <select
            value={filters.major || ''}
            onChange={(e) => handleFilterChange('major', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Majors</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={filters.year || ''}
            onChange={(e) => handleFilterChange('year', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.active === undefined ? '' : filters.active.toString()}
            onChange={(e) => handleFilterChange('active', e.target.value === '' ? undefined : e.target.value === 'true')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Students</option>
            <option value="true">Active Only</option>
            <option value="false">Inactive Only</option>
          </select>
        </div>
      </div>
    </div>
  );
}
```

### Step 2: Create Complete Main Application

Update `src/App.tsx`:

```typescript
import { useState } from 'react';
import { StudentCard } from './components/StudentCard';
import { StatsCard } from './components/StatsCard';
import { StudentForm } from './components/StudentForm';
import { StudentFiltersComponent } from './components/StudentFilters';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent
} from './hooks/useStudents';
import { Student, StudentFilters, DashboardStats } from './types/Student';
import { Users, UserCheck, GraduationCap, BookOpen, Plus } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<StudentFilters>({});
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // API hooks
  const { data: students = [], isLoading, error, refetch } = useStudents(filters);
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const deleteMutation = useDeleteStudent();

  // Calculate stats
  const stats: DashboardStats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.is_active).length,
    averageGPA: students.length > 0
      ? Math.round((students.reduce((sum, s) => sum + s.gpa, 0) / students.length) * 100) / 100
      : 0,
    totalCourses: 5 // This would come from a courses API
  };

  const handleCreateStudent = (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    createMutation.mutate(studentData, {
      onSuccess: () => {
        setShowForm(false);
        alert('Student created successfully!');
      },
      onError: (error: any) => {
        alert(`Failed to create student: ${error.response?.data?.error || error.message}`);
      },
    });
  };

  const handleUpdateStudent = (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingStudent) return;

    updateMutation.mutate(
      { id: editingStudent.id, updates: studentData },
      {
        onSuccess: () => {
          setEditingStudent(null);
          setShowForm(false);
          alert('Student updated successfully!');
        },
        onError: (error: any) => {
          alert(`Failed to update student: ${error.response?.data?.error || error.message}`);
        },
      }
    );
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDeleteStudent = (studentId: number) => {
    deleteMutation.mutate(studentId, {
      onSuccess: () => {
        alert('Student deleted successfully!');
      },
      onError: (error: any) => {
        alert(`Failed to delete student: ${error.response?.data?.error || error.message}`);
      },
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const resetFilters = () => {
    setFilters({});
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading student data..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <ErrorMessage
          error={error.message || 'Failed to load students'}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Student Management System
          </h1>
          <p className="text-xl text-gray-600">
            Full-Stack React + PHP Application
          </p>
        </header>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<Users size={24} />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Students"
            value={stats.activeStudents}
            icon={<UserCheck size={24} />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Average GPA"
            value={stats.averageGPA}
            icon={<GraduationCap size={24} />}
            trend={{ value: 3, isPositive: false }}
          />
          <StatsCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={<BookOpen size={24} />}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <StudentFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            onReset={resetFilters}
          />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-700">
            {students.length} student{students.length !== 1 ? 's' : ''} found
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <StudentForm
                student={editingStudent}
                onSubmit={editingStudent ? handleUpdateStudent : handleCreateStudent}
                onCancel={handleFormCancel}
                isLoading={createMutation.isPending || updateMutation.isPending}
              />
            </div>
          </div>
        )}

        {/* Students Grid */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
                isDeleting={deleteMutation.isPending}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No students found
            </h3>
            <p className="text-gray-500 mb-6">
              {Object.keys(filters).length > 0
                ? 'Try adjusting your filters or add some students to get started.'
                : 'Get started by adding your first student.'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add First Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

### Step 3: Create Environment Configuration

Create `.env.local`:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost/student-management/api

# Development Settings
VITE_APP_ENV=development
VITE_APP_NAME=Student Management System
VITE_APP_VERSION=1.0.0
```

---

## Assessment and Next Steps

### ✅ What You've Accomplished

**Technical Skills:**
- [ ] Built a complete full-stack application with React + PHP + MySQL
- [ ] Implemented professional API communication patterns
- [ ] Created robust error handling and loading states
- [ ] Used React Query for advanced data management
- [ ] Built responsive, accessible user interfaces
- [ ] Implemented real-time CRUD operations

**Professional Skills:**
- [ ] Structured code like a production application
- [ ] Used modern development tools and patterns
- [ ] Implemented proper form validation and user feedback
- [ ] Created reusable components and custom hooks
- [ ] Applied TypeScript for better code quality

### 🚀 Enhancements for Your Final Year Project

1. **Authentication & Authorization**
   - Add JWT-based login system
   - Implement role-based access control
   - Add password reset functionality

2. **Advanced Features**
   - File upload for student photos
   - Export data to Excel/PDF
   - Email notifications
   - Real-time updates with WebSockets

3. **Performance Optimization**
   - Implement virtual scrolling for large datasets
   - Add search debouncing
   - Optimize database queries with pagination

4. **Production Deployment**
   - Set up CI/CD pipeline
   - Configure environment variables
   - Implement proper logging and monitoring

### 📝 Common Issues & Solutions

**CORS Errors:**
- Ensure your PHP API includes proper CORS headers
- Check that the API URL in your React app is correct
- Verify your local server is running

**Database Connection Issues:**
- Check MySQL service is running
- Verify database credentials in `config/database.php`
- Ensure database and tables exist

**Type Errors:**
- Make sure all interfaces match your API response structure
- Check that all required props are passed to components
- Verify API responses match expected TypeScript types

This lab provides a solid foundation for building sophisticated web applications. The patterns and techniques you've learned here can be applied to any full-stack project! 🎯
