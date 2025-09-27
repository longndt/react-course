# Lab 1: Building Your First Professional React Application

## Overview

In this lab session, you'll create a Student Dashboard application using TypeScript and React. This project demonstrates building a professional management system with multiple views and data handling.

## Exercises

- Exercise 1: Project Setup
- Exercise 2: TypeScript Components
- Exercise 3: Interactive Dashboard
- Exercise 4: Advanced Features

## Pre-Lab Checklist

- [ ] Node.js v18+ installed
- [ ] VS Code with React extensions installed
- [ ] Basic understanding of JavaScript ES6+
- [ ] Familiarity with HTML/CSS

---

## Exercise 1: Professional Project Setup

### Step 1: Create TypeScript React Project

```bash
# Create new project with TypeScript template
npm create vite@latest student-dashboard -- --template react-ts

# Navigate to project
cd student-dashboard

# Install dependencies
npm install

# Install additional useful libraries
npm install lucide-react  # For icons
npm install clsx          # For conditional classes

# Start development server
npm run dev
```

### Step 2: Understand Project Structure

```
student-dashboard/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Project configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite build configuration
```

### Step 3: Configure Development Environment

**📚 Learning Note:** TypeScript configuration can seem complex, but these settings enable better development experience with stricter type checking and path aliases.

Update your `tsconfig.json` for better development experience:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Important:** If you encounter TypeScript errors about project references, update your `tsconfig.node.json` to enable proper project composition:

```json
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": [],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": false,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

---

## Exercise 2: Building TypeScript Components

### Step 1: Define Data Types

Create `src/types/Student.ts`:

```typescript
export interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  year: number;
  gpa: number;
  isActive: boolean;
  enrollmentDate: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  instructor: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  averageGPA: number;
  totalCourses: number;
}
```

### Step 2: Create Student Card Component

**💡 Architecture Note:** Notice that we define component-specific interfaces (like `StudentCardProps`) inside the component file, while domain types (`Student`, `Course`) are in separate files. This separates UI concerns from business logic.

Create `src/components/StudentCard.tsx`:

```typescript
import { Student } from "../types/Student";
import { User, Mail, Calendar } from "lucide-react";

interface StudentCardProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (studentId: number) => void;
}

export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(student);
    }
  };

  const handleDelete = () => {
    if (
      onDelete &&
      confirm(`Are you sure you want to delete ${student.name}?`)
    ) {
      onDelete(student.id);
    }
  };

  return (
    <div className="student-card">
      <div className="student-header">
        <User size={24} />
        <h3>{student.name}</h3>
        <span className={`status ${student.isActive ? "active" : "inactive"}`}>
          {student.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="student-info">
        <div className="info-item">
          <Mail size={16} />
          <span>{student.email}</span>
        </div>
        <div className="info-item">
          <Calendar size={16} />
          <span>
            Year {student.year} • {student.major}
          </span>
        </div>
        <div className="info-item">
          <span>GPA: {student.gpa.toFixed(2)}</span>
        </div>
      </div>

      <div className="student-actions">
        <button onClick={handleEdit} className="btn-edit">
          Edit
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}
```

### Step 3: Create Stats Card Component

Create `src/components/StatsCard.tsx`:

```typescript
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {  // The ? makes this property optional
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="stats-card">
      <div className="stats-header">
        <div className="stats-icon">{icon}</div>
        <div className="stats-info">
          <h3>{title}</h3>
          <p className="stats-value">{value}</p>
        </div>
      </div>
      {/* Only show trend if it exists (conditional rendering) */}
      {trend && (
        <div
          className={`stats-trend ${
            trend.isPositive ? "positive" : "negative"
          }`}
        >
          {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
}
```

---

## Exercise 3: Interactive Dashboard

### Step 1: Create Sample Data

First, create the data directory and file:

```bash
# Create the data directory
mkdir src/data
```

Then create `src/data/mockData.ts`:

```typescript
import { Student, Course, DashboardStats } from "../types/Student";

export const sampleStudents: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    major: "Computer Science",
    year: 3,
    gpa: 3.8,
    isActive: true,
    enrollmentDate: "2022-09-01",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    major: "Information Technology",
    year: 4,
    gpa: 3.6,
    isActive: true,
    enrollmentDate: "2021-09-01",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@university.edu",
    major: "Software Engineering",
    year: 2,
    gpa: 3.9,
    isActive: false,
    enrollmentDate: "2023-09-01",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@university.edu",
    major: "Computer Science",
    year: 3,
    gpa: 3.4,
    isActive: true,
    enrollmentDate: "2022-09-01",
  },
];

export const sampleCourses: Course[] = [
  {
    id: 1,
    name: "React Development",
    code: "CS301",
    credits: 3,
    instructor: "Dr. Johnson",
  },
  {
    id: 2,
    name: "Database Systems",
    code: "CS302",
    credits: 4,
    instructor: "Prof. Smith",
  },
  {
    id: 3,
    name: "Software Engineering",
    code: "CS401",
    credits: 3,
    instructor: "Dr. Brown",
  },
];

export function calculateStats(students: Student[]): DashboardStats {
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.isActive).length;
  const averageGPA =
    students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;

  return {
    totalStudents,
    activeStudents,
    averageGPA: Math.round(averageGPA * 100) / 100,
    totalCourses: sampleCourses.length,
  };
}
```

### Step 2: Create Main Dashboard Component

Update `src/App.tsx`:

```typescript
import { useState } from "react";
import { StudentCard } from "./components/StudentCard";
import { StatsCard } from "./components/StatsCard";
import { Student, DashboardStats } from "./types/Student";
import { sampleStudents, calculateStats } from "./data/mockData";
import { Users, UserCheck, GraduationCap, BookOpen } from "lucide-react";
import "./App.css";

function App() {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  const stats: DashboardStats = calculateStats(students);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActive === null || student.isActive === filterActive;

    return matchesSearch && matchesFilter;
  });

  const handleEditStudent = (student: Student) => {
    console.log("Edit student:", student);
    // TODO: Implement edit functionality
  };

  const handleDeleteStudent = (studentId: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Dashboard</h1>
        <p>Manage your student records efficiently</p>
      </header>

      <div className="dashboard-stats">
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

      <div className="dashboard-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <button
            onClick={() => setFilterActive(null)}
            className={`filter-btn ${filterActive === null ? "active" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterActive(true)}
            className={`filter-btn ${filterActive === true ? "active" : ""}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterActive(false)}
            className={`filter-btn ${filterActive === false ? "active" : ""}`}
          >
            Inactive
          </button>
        </div>
      </div>

      <div className="students-grid">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
          />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="no-results">
          <p>No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

---

## Exercise 4: Professional Styling

Update `src/index.css` with professional styles:

```css
/* Modern CSS Variables for Design System */
:root {
  /* Color Palette */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;

  --success-50: #f0fdf4;
  --success-500: #22c55e;
  --success-600: #16a34a;

  --danger-50: #fef2f2;
  --danger-500: #ef4444;
  --danger-600: #dc2626;

  /* Typography */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;

  /* Spacing Scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}

/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-primary);
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--primary-50) 100%);
  color: var(--gray-900);
  line-height: 1.6;
  min-height: 100vh;
}

.app {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-6);
  min-height: 100vh;
}

/* Header with modern gradient and typography */
.app-header {
  text-align: center;
  margin-bottom: var(--space-12);
  padding: var(--space-8) 0;
}

.app-header h1 {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-3);
  letter-spacing: -0.025em;
}

.app-header p {
  color: var(--gray-600);
  font-size: 1.2rem;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
}

/* Enhanced Dashboard Stats Grid */
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

.stats-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
}

.stats-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-200);
}

.stats-header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.stats-icon {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  color: white;
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
}

.stats-info {
  flex: 1;
}

.stats-info h3 {
  font-size: 0.875rem;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-2);
  font-weight: 600;
}

.stats-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--gray-900);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.stats-trend {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.875rem;
  font-weight: 600;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
}

.stats-trend.positive {
  background: var(--success-50);
  color: var(--success-600);
}

.stats-trend.negative {
  background: var(--danger-50);
  color: var(--danger-600);
}

/* Modern Dashboard Controls */
.dashboard-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-10);
  flex-wrap: wrap;
  gap: var(--space-4);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  padding: var(--space-5);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-md);
}

.search-container {
  flex: 1;
  max-width: 450px;
  position: relative;
}

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  padding-left: var(--space-10);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  background: white;
  transition: all var(--transition-normal);
  font-family: var(--font-primary);
}

.search-input::placeholder {
  color: var(--gray-400);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 4px var(--primary-50);
  transform: translateY(-1px);
}

.search-container::before {
  content: '🔍';
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--gray-400);
  pointer-events: none;
}

.filter-container {
  display: flex;
  gap: var(--space-2);
  background: var(--gray-100);
  padding: var(--space-1);
  border-radius: var(--radius-lg);
}

.filter-btn {
  padding: var(--space-2) var(--space-4);
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  color: var(--gray-600);
  position: relative;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  color: var(--gray-800);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: var(--primary-500);
  color: white;
  box-shadow: var(--shadow-md);
}

/* Modern Students Grid with Masonry Layout */
.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-6);
  align-items: start;
}

/* Premium Student Card Design */
.student-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.student-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-500), var(--success-500));
}

.student-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-200);
}

.student-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--gray-100);
}

.student-header h3 {
  margin: 0;
  flex: 1;
  color: var(--gray-900);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.status {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-lg);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.status.active {
  background: linear-gradient(135deg, var(--success-50), var(--success-100));
  color: var(--success-600);
  border: 1px solid var(--success-200);
}

.status.inactive {
  background: linear-gradient(135deg, var(--danger-50), var(--gray-100));
  color: var(--danger-600);
  border: 1px solid var(--danger-200);
}

.status.active::before {
  content: '●';
  color: var(--success-500);
}

.status.inactive::before {
  content: '●';
  color: var(--danger-500);
}

.student-info {
  margin-bottom: var(--space-6);
  space-y: var(--space-3);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  color: var(--gray-600);
  font-size: 0.9rem;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.info-item:hover {
  background: var(--gray-50);
  color: var(--gray-800);
}

.student-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: auto;
}

.btn-edit,
.btn-delete {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.btn-edit {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-edit:hover {
  background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-edit:active {
  transform: translateY(0);
}

.btn-delete {
  background: linear-gradient(135deg, var(--danger-500), var(--danger-600));
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-delete:hover {
  background: linear-gradient(135deg, var(--danger-600), #b91c1c);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-delete:active {
  transform: translateY(0);
}

/* Enhanced No Results State */
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-16) var(--space-6);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-2xl);
  border: 2px dashed var(--gray-300);
  margin: var(--space-8) 0;
}

.no-results p {
  font-size: 1.25rem;
  color: var(--gray-500);
  margin-bottom: var(--space-4);
  font-weight: 500;
}

.no-results::before {
  content: '🔍';
  font-size: 4rem;
  display: block;
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

/* Advanced Responsive Design */
@media (max-width: 1024px) {
  .dashboard-stats {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
  }

  .students-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .app {
    padding: var(--space-4);
  }

  .app-header {
    margin-bottom: var(--space-8);
    padding: var(--space-6) 0;
  }

  .app-header h1 {
    font-size: 2.5rem;
  }

  .dashboard-controls {
    flex-direction: column;
    align-items: stretch;
    padding: var(--space-4);
  }

  .search-container {
    max-width: none;
    margin-bottom: var(--space-3);
  }

  .filter-container {
    justify-content: center;
  }

  .students-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .dashboard-stats {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .stats-card {
    padding: var(--space-4);
  }

  .student-card {
    padding: var(--space-4);
  }
}

@media (max-width: 480px) {
  .app {
    padding: var(--space-3);
  }

  .app-header h1 {
    font-size: 2rem;
  }

  .stats-value {
    font-size: 2rem;
  }

  .student-actions {
    flex-direction: column;
  }

  .btn-edit,
  .btn-delete {
    flex: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --gray-50: #0f172a;
    --gray-100: #1e293b;
    --gray-200: #334155;
    --gray-900: #f8fafc;
  }

  body {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .stats-card,
  .student-card,
  .dashboard-controls {
    border: 2px solid var(--gray-800);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Learning Outcomes Assessment

After completing this lab, you should be able to:

**✅ Technical Skills:**

- [ ] Set up a TypeScript React project with Vite
- [ ] Define TypeScript interfaces for complex data structures
- [ ] Create reusable, typed React components
- [ ] Implement event handling and state management
- [ ] Apply conditional rendering and list rendering
- [ ] Style components with modern CSS techniques

**✅ Professional Skills:**

- [ ] Structure a project like a real-world application
- [ ] Use meaningful component names and organization
- [ ] Implement user-friendly interfaces with loading states
- [ ] Apply responsive design principles
- [ ] Handle user interactions gracefully

**✅ Professional Development Skills:**

- [ ] Understand how to build admin dashboards
- [ ] Know how to manage lists of data (students, products, users)
- [ ] Experience with search and filtering functionality
- [ ] Foundation for integrating with backend APIs

## Final Project Structure 📁

After completing all exercises in Lab 1, your project should have the following structure:

```
student-dashboard/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.css
│   │   ├── StudentCard/
│   │   │   ├── StudentCard.tsx
│   │   │   └── StudentCard.css
│   │   ├── StudentList/
│   │   │   ├── StudentList.tsx
│   │   │   └── StudentList.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchBar.css
│   │   ├── FilterButtons/
│   │   │   ├── FilterButtons.tsx
│   │   │   └── FilterButtons.css
│   │   ├── StatsCard/
│   │   │   ├── StatsCard.tsx
│   │   │   └── StatsCard.css
│   │   └── LoadingSpinner/
│   │       ├── LoadingSpinner.tsx
│   │       └── LoadingSpinner.css
│   ├── data/
│   │   └── students.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── readme.md
```

### Key Features Implemented:
- ✅ **Modern React with TypeScript**: Type-safe components and interfaces
- ✅ **Component Architecture**: Modular, reusable components
- ✅ **CSS Styling**: Professional UI with responsive design
- ✅ **State Management**: useState for search, filters, and data management
- ✅ **Interactive Features**: Search, filtering, and dynamic content
- ✅ **Data Handling**: TypeScript interfaces and mock data
- ✅ **Professional Structure**: Organized folders and clean code

### Expected Functionality:
1. **Dashboard Overview**: Statistics cards showing student counts
2. **Student Management**: List view with search and filter capabilities
3. **Interactive UI**: Hover effects, smooth transitions, loading states
4. **Responsive Design**: Works on desktop, tablet, and mobile devices
5. **Type Safety**: All components properly typed with TypeScript

## Next Steps

In the next lesson, you'll learn how to:

- Create more complex component hierarchies
- Manage state across multiple components
- Handle forms and user input validation
- Connect your React frontend to real APIs (like your Node.js backends)

## Troubleshooting Common Issues

**TypeScript Errors:**

- Make sure all interfaces are properly imported
- Check that all required props are passed to components
- Verify that event handler types match expected signatures

**TypeScript Configuration Issues:**

- If you see errors like "Referenced project must have setting 'composite': true":
  - Add `"composite": true` to your `tsconfig.node.json` compilerOptions
  - Change `"noEmit": true` to `"noEmit": false` in `tsconfig.node.json`
- These errors occur when using project references in TypeScript configurations
- The fix ensures proper project composition and allows referenced projects to emit files when needed

**Styling Issues:**

- Ensure CSS classes match between components and stylesheets
- Check that Lucide React icons are properly installed
- Verify that responsive breakpoints work on different screen sizes

**Build Errors:**

- Clear node_modules and reinstall if dependencies seem corrupted
- Check that all imports have correct file extensions
- Ensure TypeScript configuration matches project structure
