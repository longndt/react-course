# Lab 1: Building Your First Professional React Application

## Overview
In this lab session, you'll create a Student Dashboard application using TypeScript and React. This project simulates the kind of interface you might build for your final year project - a management system with multiple views and data handling.

**Time Allocation:**
- Exercise 1: Project Setup (30 minutes)
- Exercise 2: TypeScript Components (45 minutes)
- Exercise 3: Interactive Dashboard (60 minutes)
- Exercise 4: Advanced Features (45 minutes)

## Pre-Lab Checklist
- [ ] Node.js v18+ installed
- [ ] VS Code with React extensions installed
- [ ] Basic understanding of JavaScript ES6+
- [ ] Familiarity with HTML/CSS

---

## Exercise 1: Professional Project Setup (30 minutes)

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
│   └── vite-env.d.ts    # TypeScript definitions
├── public/              # Static assets
├── package.json         # Project configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite build configuration
```

### Step 3: Configure Development Environment

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

---

## Exercise 2: Building TypeScript Components (45 minutes)

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

Create `src/components/StudentCard.tsx`:

```typescript
import { Student } from '../types/Student';
import { User, Mail, Calendar } from 'lucide-react';

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
    if (onDelete && confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student.id);
    }
  };

  return (
    <div className="student-card">
      <div className="student-header">
        <User size={24} />
        <h3>{student.name}</h3>
        <span className={`status ${student.isActive ? 'active' : 'inactive'}`}>
          {student.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="student-info">
        <div className="info-item">
          <Mail size={16} />
          <span>{student.email}</span>
        </div>
        <div className="info-item">
          <Calendar size={16} />
          <span>Year {student.year} • {student.major}</span>
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
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
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
      {trend && (
        <div className={`stats-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
          {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
}
```

---

## Exercise 3: Interactive Dashboard (60 minutes)

### Step 1: Create Sample Data

Create `src/data/mockData.ts`:

```typescript
import { Student, Course, DashboardStats } from '../types/Student';

export const sampleStudents: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    major: "Computer Science",
    year: 3,
    gpa: 3.8,
    isActive: true,
    enrollmentDate: "2022-09-01"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    major: "Information Technology",
    year: 4,
    gpa: 3.6,
    isActive: true,
    enrollmentDate: "2021-09-01"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@university.edu",
    major: "Software Engineering",
    year: 2,
    gpa: 3.9,
    isActive: false,
    enrollmentDate: "2023-09-01"
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@university.edu",
    major: "Computer Science",
    year: 3,
    gpa: 3.4,
    isActive: true,
    enrollmentDate: "2022-09-01"
  }
];

export const sampleCourses: Course[] = [
  {
    id: 1,
    name: "React Development",
    code: "CS301",
    credits: 3,
    instructor: "Dr. Johnson"
  },
  {
    id: 2,
    name: "Database Systems",
    code: "CS302",
    credits: 4,
    instructor: "Prof. Smith"
  },
  {
    id: 3,
    name: "Software Engineering",
    code: "CS401",
    credits: 3,
    instructor: "Dr. Brown"
  }
];

export function calculateStats(students: Student[]): DashboardStats {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.isActive).length;
  const averageGPA = students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;

  return {
    totalStudents,
    activeStudents,
    averageGPA: Math.round(averageGPA * 100) / 100,
    totalCourses: sampleCourses.length
  };
}
```

### Step 2: Create Main Dashboard Component

Update `src/App.tsx`:

```typescript
import { useState } from 'react';
import { StudentCard } from './components/StudentCard';
import { StatsCard } from './components/StatsCard';
import { Student, DashboardStats } from './types/Student';
import { sampleStudents, calculateStats } from './data/mockData';
import { Users, UserCheck, GraduationCap, BookOpen } from 'lucide-react';
import './App.css';

function App() {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  const stats: DashboardStats = calculateStats(students);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.major.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterActive === null || student.isActive === filterActive;

    return matchesSearch && matchesFilter;
  });

  const handleEditStudent = (student: Student) => {
    console.log('Edit student:', student);
    // TODO: Implement edit functionality
  };

  const handleDeleteStudent = (studentId: number) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
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
            className={`filter-btn ${filterActive === null ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterActive(true)}
            className={`filter-btn ${filterActive === true ? 'active' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterActive(false)}
            className={`filter-btn ${filterActive === false ? 'active' : ''}`}
          >
            Inactive
          </button>
        </div>
      </div>

      <div className="students-grid">
        {filteredStudents.map(student => (
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

## Exercise 4: Professional Styling (45 minutes)

Update `src/index.css` with professional styles:

```css
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: #f7fafc;
  color: #2d3748;
  line-height: 1.6;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* Header */
.app-header {
  text-align: center;
  margin-bottom: 32px;
}

.app-header h1 {
  font-size: 2.5rem;
  color: #1a202c;
  margin-bottom: 8px;
}

.app-header p {
  color: #718096;
  font-size: 1.1rem;
}

/* Dashboard Stats */
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stats-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border: 1px solid #e2e8f0;
}

.stats-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stats-icon {
  background: #ebf8ff;
  color: #3182ce;
  padding: 12px;
  border-radius: 8px;
}

.stats-info h3 {
  font-size: 0.875rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.stats-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
}

.stats-trend {
  margin-top: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.stats-trend.positive {
  color: #38a169;
}

.stats-trend.negative {
  color: #e53e3e;
}

/* Dashboard Controls */
.dashboard-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.search-container {
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

.filter-container {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #f7fafc;
}

.filter-btn.active {
  background: #3182ce;
  color: white;
  border-color: #3182ce;
}

/* Students Grid */
.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Student Card Styles */
.student-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.student-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.student-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.student-header h3 {
  margin: 0;
  flex: 1;
  color: #1a202c;
  font-size: 1.125rem;
}

.status {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status.active {
  background: #c6f6d5;
  color: #22543d;
}

.status.inactive {
  background: #fed7d7;
  color: #742a2a;
}

.student-info {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #4a5568;
  font-size: 0.875rem;
}

.student-actions {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #3182ce;
  color: white;
}

.btn-edit:hover {
  background: #2c5aa0;
}

.btn-delete {
  background: #e53e3e;
  color: white;
}

.btn-delete:hover {
  background: #c53030;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 64px 24px;
  color: #718096;
}

.no-results p {
  font-size: 1.125rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app {
    padding: 16px;
  }

  .app-header h1 {
    font-size: 2rem;
  }

  .dashboard-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    max-width: none;
  }

  .students-grid {
    grid-template-columns: 1fr;
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

**✅ Preparation for Final Year Project:**
- [ ] Understand how to build admin dashboards
- [ ] Know how to manage lists of data (students, products, users)
- [ ] Experience with search and filtering functionality
- [ ] Foundation for integrating with backend APIs

## Next Steps

In the next lesson, you'll learn how to:
- Create more complex component hierarchies
- Manage state across multiple components
- Handle forms and user input validation
- Connect your React frontend to real APIs (like your PHP backends)

## Troubleshooting Common Issues

**TypeScript Errors:**
- Make sure all interfaces are properly imported
- Check that all required props are passed to components
- Verify that event handler types match expected signatures

**Styling Issues:**
- Ensure CSS classes match between components and stylesheets
- Check that Lucide React icons are properly installed
- Verify that responsive breakpoints work on different screen sizes

**Build Errors:**
- Clear node_modules and reinstall if dependencies seem corrupted
- Check that all imports have correct file extensions
- Ensure TypeScript configuration matches project structure
