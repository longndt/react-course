# Lab 0 - TypeScript Prerequisites

## 📋 Overview

In this lab session, you'll practice TypeScript fundamentals through hands-on exercises. You'll work with types, interfaces, generics, and utility types to build a solid foundation for React development.

> **Scope:** This lab focuses on TypeScript basics - the foundation you need before diving into React with TypeScript.

##  Learning Objectives

By completing this lab, you will be able to:
- Master TypeScript type annotations and primitive types
- Create and use interfaces and type aliases
- Implement generic functions and types
- Apply utility types for advanced type transformations
- Use type guards for type narrowing
- Build type-safe data management systems

##  Exercises

- Exercise 1: Basic Types and Type Annotations
- Exercise 2: Interfaces and Type Aliases
- Exercise 3: Functions and Generics
- Exercise 4: Utility Types and Type Guards
- Exercise 5: Build a Type-Safe Data Manager

##  Pre-Lab Checklist

- [ ] Node.js v18+ installed
- [ ] TypeScript installed globally (`npm install -g typescript`)
- [ ] VS Code with TypeScript support
- [ ] Basic understanding of JavaScript
- [ ] Review [TypeScript Execution Guide](./solutions/execution_guide.md) for running TypeScript files

---

## Exercise 1: Basic Types and Type Annotations

### Step 1: Project Setup

```bash
# Create project folder
mkdir typescript-lab
cd typescript-lab

# Initialize npm project
npm init -y

# Install TypeScript
npm install --save-dev typescript

# Create TypeScript config
npx tsc --init

# Install ts-node for quick testing
npm install --save-dev ts-node @types/node
```

### Step 2: Configure tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Step 3: Create src folder

```bash
mkdir src
```

### Task 1.1: Primitive Types

Create `src/ex1-primitives.ts`:

```typescript
// TODO: Define variables with proper type annotations

// 1. Create a variable 'studentName' of type string
// Your code here

// 2. Create a variable 'studentAge' of type number
// Your code here

// 3. Create a variable 'isEnrolled' of type boolean
// Your code here

// 4. Create a variable 'grades' as an array of numbers
// Your code here

// 5. Create a variable 'subjects' as an array of strings
// Your code here

// Test your code
console.log("Student:", studentName, "Age:", studentAge);
console.log("Enrolled:", isEnrolled);
console.log("Grades:", grades);
console.log("Subjects:", subjects);
```

**Solution:**

```typescript
// 1. Create a variable 'studentName' of type string
let studentName: string = "John Doe";

// 2. Create a variable 'studentAge' of type number
let studentAge: number = 20;

// 3. Create a variable 'isEnrolled' of type boolean
let isEnrolled: boolean = true;

// 4. Create a variable 'grades' as an array of numbers
let grades: number[] = [85, 90, 88, 92];

// 5. Create a variable 'subjects' as an array of strings
let subjects: string[] = ["Math", "Physics", "Chemistry"];

// Test your code
console.log("Student:", studentName, "Age:", studentAge);
console.log("Enrolled:", isEnrolled);
console.log("Grades:", grades);
console.log("Subjects:", subjects);
```

### Task 1.2: Tuples and Enums

Create `src/ex1-tuples-enums.ts`:

```typescript
// TODO: Work with tuples and enums

// 1. Create a tuple 'student' with [name: string, id: number, gpa: number]
// Your code here

// 2. Create an enum 'Role' with values: Student, Teacher, Admin
// Your code here

// 3. Create a variable 'userRole' of type Role
// Your code here

// Test your code
console.log("Student tuple:", student);
console.log("User role:", userRole);
```

**Solution:**

```typescript
// 1. Create a tuple 'student' with [name: string, id: number, gpa: number]
let student: [string, number, number] = ["Alice", 12345, 3.8];

// 2. Create an enum 'Role' with values: Student, Teacher, Admin
enum Role {
  Student,
  Teacher,
  Admin
}

// 3. Create a variable 'userRole' of type Role
let userRole: Role = Role.Student;

// Test your code
console.log("Student tuple:", student);
console.log("User role:", userRole);
console.log("Role name:", Role[userRole]); // "Student"
```

### Test Exercise 1

```bash
# Run with ts-node
npx ts-node src/ex1-primitives.ts
npx ts-node src/ex1-tuples-enums.ts

# Or compile and run
npx tsc
node dist/ex1-primitives.js
node dist/ex1-tuples-enums.js
```

---

## Exercise 2: Interfaces and Type Aliases

### Task 2.1: Define User Interface

Create `src/ex2-interfaces.ts`:

```typescript
// TODO: Create interfaces for a university system

// 1. Define interface 'Person' with properties:
//    - id: number
//    - firstName: string
//    - lastName: string
//    - age: number (optional)
// Your code here

// 2. Define interface 'Student' that extends Person with:
//    - studentId: string
//    - major: string
//    - gpa: number
//    - courses: string[]
// Your code here

// 3. Define interface 'Course' with:
//    - code: string
//    - name: string
//    - credits: number
//    - instructor: string
// Your code here

// 4. Create a student object
// Your code here

// 5. Create a course object
// Your code here

// Test your code
console.log("Student:", student);
console.log("Course:", course);
```

**Solution:**

```typescript
// 1. Define interface 'Person'
interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
}

// 2. Define interface 'Student' that extends Person
interface Student extends Person {
  studentId: string;
  major: string;
  gpa: number;
  courses: string[];
}

// 3. Define interface 'Course'
interface Course {
  code: string;
  name: string;
  credits: number;
  instructor: string;
}

// 4. Create a student object
const student: Student = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  studentId: "S12345",
  major: "Computer Science",
  gpa: 3.8,
  courses: ["CS101", "CS102", "MATH201"]
};

// 5. Create a course object
const course: Course = {
  code: "CS101",
  name: "Introduction to Programming",
  credits: 3,
  instructor: "Dr. Smith"
};

// Test your code
console.log("Student:", student);
console.log("Course:", course);
```

### Task 2.2: Type Aliases and Union Types

Create `src/ex2-type-aliases.ts`:

```typescript
// TODO: Work with type aliases and union types

// 1. Create type alias 'ID' that can be string or number
// Your code here

// 2. Create type alias 'Status' with literal types: 'pending' | 'approved' | 'rejected'
// Your code here

// 3. Create type alias 'Point' as object with x and y coordinates (numbers)
// Your code here

// 4. Create type alias 'Result' that can be string or number or boolean
// Your code here

// 5. Test your types
let userId: ID = "user123";
let orderId: ID = 12345;
let orderStatus: Status = "pending";
let coordinate: Point = { x: 10, y: 20 };
let apiResult: Result = "Success";

console.log({ userId, orderId, orderStatus, coordinate, apiResult });
```

**Solution:**

```typescript
// 1. Create type alias 'ID' that can be string or number
type ID = string | number;

// 2. Create type alias 'Status' with literal types
type Status = 'pending' | 'approved' | 'rejected';

// 3. Create type alias 'Point' as object with x and y coordinates
type Point = {
  x: number;
  y: number;
};

// 4. Create type alias 'Result' that can be string or number or boolean
type Result = string | number | boolean;

// 5. Test your types
let userId: ID = "user123";
let orderId: ID = 12345;
let orderStatus: Status = "pending";
let coordinate: Point = { x: 10, y: 20 };
let apiResult: Result = "Success";

console.log({ userId, orderId, orderStatus, coordinate, apiResult });
```

### Test Exercise 2

```bash
npx ts-node src/ex2-interfaces.ts
npx ts-node src/ex2-type-aliases.ts
```

---

## Exercise 3: Functions and Generics

### Task 3.1: Typed Functions

Create `src/ex3-functions.ts`:

```typescript
// TODO: Create typed functions

// 1. Create function 'calculateAverage' that takes array of numbers and returns number
// Your code here

// 2. Create function 'greetUser' with required name (string) and optional greeting (string)
// Your code here

// 3. Create function 'combineStrings' using rest parameters
// Your code here

// 4. Create arrow function 'multiply' that takes two numbers and returns number
// Your code here

// Test functions
console.log(calculateAverage([85, 90, 88, 92])); // Should print average
console.log(greetUser("John"));
console.log(greetUser("Alice", "Hi"));
console.log(combineStrings("Hello", "World", "!"));
console.log(multiply(5, 3));
```

**Solution:**

```typescript
// 1. Calculate average of numbers
function calculateAverage(numbers: number[]): number {
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}

// 2. Greet user with optional greeting
function greetUser(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// 3. Combine strings using rest parameters
function combineStrings(...strings: string[]): string {
  return strings.join(" ");
}

// 4. Multiply two numbers (arrow function)
const multiply = (a: number, b: number): number => a * b;

// Test functions
console.log(calculateAverage([85, 90, 88, 92])); // 88.75
console.log(greetUser("John"));                   // Hello, John!
console.log(greetUser("Alice", "Hi"));            // Hi, Alice!
console.log(combineStrings("Hello", "World", "!")); // Hello World !
console.log(multiply(5, 3));                      // 15
```

### Task 3.2: Generic Functions

Create `src/ex3-generics.ts`:

```typescript
// TODO: Create generic functions

// 1. Create generic function 'getFirstElement' that returns first element of array
// Your code here

// 2. Create generic function 'reverseArray' that reverses an array
// Your code here

// 3. Create generic function 'createPair' that takes two values and returns tuple
// Your code here

// 4. Create generic interface 'Container' with value property
// Your code here

// Test generics
console.log(getFirstElement([1, 2, 3]));
console.log(getFirstElement(["a", "b", "c"]));
console.log(reverseArray([1, 2, 3, 4, 5]));
console.log(createPair("name", "John"));
console.log(createPair(10, true));

const numberContainer: Container<number> = { value: 42 };
const stringContainer: Container<string> = { value: "Hello" };
console.log(numberContainer, stringContainer);
```

**Solution:**

```typescript
// 1. Get first element of array
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 2. Reverse array
function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

// 3. Create pair (tuple)
function createPair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// 4. Generic container interface
interface Container<T> {
  value: T;
}

// Test generics
console.log(getFirstElement([1, 2, 3]));           // 1
console.log(getFirstElement(["a", "b", "c"]));     // "a"
console.log(reverseArray([1, 2, 3, 4, 5]));        // [5, 4, 3, 2, 1]
console.log(createPair("name", "John"));           // ["name", "John"]
console.log(createPair(10, true));                 // [10, true]

const numberContainer: Container<number> = { value: 42 };
const stringContainer: Container<string> = { value: "Hello" };
console.log(numberContainer, stringContainer);
```

### Test Exercise 3

```bash
npx ts-node src/ex3-functions.ts
npx ts-node src/ex3-generics.ts
```

---

## Exercise 4: Utility Types and Type Guards

### Task 4.1: Utility Types

Create `src/ex4-utility-types.ts`:

```typescript
// TODO: Practice utility types

// Base interface
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  age: number;
  isActive: boolean;
}

// 1. Create 'PartialUser' using Partial<User>
// Your code here

// 2. Create 'PublicUser' using Omit to exclude password
// Your code here

// 3. Create 'UserPreview' using Pick for id and username only
// Your code here

// 4. Create 'ReadonlyUser' using Readonly<User>
// Your code here

// 5. Create 'UserRoles' using Record with admin, user, guest keys
// Your code here

// Test utility types
const updateData: PartialUser = { email: "newemail@example.com" };
const publicProfile: PublicUser = {
  id: 1,
  username: "john",
  email: "john@example.com",
  age: 25,
  isActive: true
};
const preview: UserPreview = { id: 1, username: "john" };
const immutableUser: ReadonlyUser = {
  id: 1,
  username: "john",
  email: "john@example.com",
  password: "secret",
  age: 25,
  isActive: true
};
// immutableUser.email = "new@example.com"; // Should error

console.log({ updateData, publicProfile, preview });
```

**Solution:**

```typescript
// Base interface
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  age: number;
  isActive: boolean;
}

// 1. Partial - all properties optional
type PartialUser = Partial<User>;

// 2. Omit - exclude password
type PublicUser = Omit<User, "password">;

// 3. Pick - only id and username
type UserPreview = Pick<User, "id" | "username">;

// 4. Readonly - all properties read-only
type ReadonlyUser = Readonly<User>;

// 5. Record - create object with specific keys
type UserRole = "admin" | "user" | "guest";
type UserRoles = Record<UserRole, string[]>;

const roles: UserRoles = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// Test utility types
const updateData: PartialUser = { email: "newemail@example.com" };
const publicProfile: PublicUser = {
  id: 1,
  username: "john",
  email: "john@example.com",
  age: 25,
  isActive: true
};
const preview: UserPreview = { id: 1, username: "john" };
const immutableUser: ReadonlyUser = {
  id: 1,
  username: "john",
  email: "john@example.com",
  password: "secret",
  age: 25,
  isActive: true
};

console.log({ updateData, publicProfile, preview, roles });
```

### Task 4.2: Type Guards

Create `src/ex4-type-guards.ts`:

```typescript
// TODO: Create type guards

// 1. Create function 'processValue' that handles string or number
//    - If string: return uppercase
//    - If number: return squared
// Your code here

// 2. Create interfaces and type guard for animals
interface Dog {
  breed: string;
  bark(): void;
}

interface Cat {
  color: string;
  meow(): void;
}

// Create type guard 'isDog'
// Your code here

// Create function 'makeSound' that uses type guard
// Your code here

// Test type guards
console.log(processValue("hello"));
console.log(processValue(5));

const myDog: Dog = {
  breed: "Labrador",
  bark() { console.log("Woof!"); }
};

const myCat: Cat = {
  color: "Orange",
  meow() { console.log("Meow!"); }
};

makeSound(myDog);
makeSound(myCat);
```

**Solution:**

```typescript
// 1. Process value based on type
function processValue(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value * value;
  }
}

// 2. Type guards for animals
interface Dog {
  breed: string;
  bark(): void;
}

interface Cat {
  color: string;
  meow(): void;
}

// Type guard function
function isDog(animal: Dog | Cat): animal is Dog {
  return (animal as Dog).bark !== undefined;
}

// Use type guard
function makeSound(animal: Dog | Cat): void {
  if (isDog(animal)) {
    console.log(`${animal.breed} says:`);
    animal.bark();
  } else {
    console.log(`${animal.color} cat says:`);
    animal.meow();
  }
}

// Test type guards
console.log(processValue("hello"));  // "HELLO"
console.log(processValue(5));        // 25

const myDog: Dog = {
  breed: "Labrador",
  bark() { console.log("Woof!"); }
};

const myCat: Cat = {
  color: "Orange",
  meow() { console.log("Meow!"); }
};

makeSound(myDog);  // Labrador says: Woof!
makeSound(myCat);  // Orange cat says: Meow!
```

### Test Exercise 4

```bash
npx ts-node src/ex4-utility-types.ts
npx ts-node src/ex4-type-guards.ts
```

---

## Exercise 5: Build a Type-Safe Data Manager

### Final Project: Student Management System

Create `src/ex5-student-manager.ts`:

```typescript
// Student Management System - Type-Safe Implementation

// 1. Define types and interfaces
interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  gpa: number;
  enrolledCourses: string[];
}

interface Course {
  code: string;
  name: string;
  credits: number;
  capacity: number;
  enrolled: number;
}

type StudentUpdate = Partial<Omit<Student, "id">>;
type CourseStatus = "available" | "full" | "closed";

// 2. Create StudentManager class
class StudentManager {
  private students: Student[] = [];
  private nextId: number = 1;

  // Add student
  addStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = {
      id: this.nextId++,
      ...student
    };
    this.students.push(newStudent);
    return newStudent;
  }

  // Get student by ID
  getStudent(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  // Update student
  updateStudent(id: number, updates: StudentUpdate): Student | undefined {
    const student = this.getStudent(id);
    if (student) {
      Object.assign(student, updates);
      return student;
    }
    return undefined;
  }

  // Delete student
  deleteStudent(id: number): boolean {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get all students
  getAllStudents(): Readonly<Student[]> {
    return this.students;
  }

  // Filter students by major
  getStudentsByMajor(major: string): Student[] {
    return this.students.filter(s => s.major === major);
  }

  // Get students with high GPA
  getHighAchievers(minGpa: number = 3.5): Student[] {
    return this.students.filter(s => s.gpa >= minGpa);
  }

  // Calculate average GPA
  calculateAverageGPA(): number {
    if (this.students.length === 0) return 0;
    const total = this.students.reduce((sum, s) => sum + s.gpa, 0);
    return Number((total / this.students.length).toFixed(2));
  }
}

// 3. Test the system
const manager = new StudentManager();

// Add students
const student1 = manager.addStudent({
  name: "Alice Johnson",
  email: "alice@university.edu",
  major: "Computer Science",
  gpa: 3.8,
  enrolledCourses: ["CS101", "MATH201"]
});

const student2 = manager.addStudent({
  name: "Bob Smith",
  email: "bob@university.edu",
  major: "Computer Science",
  gpa: 3.5,
  enrolledCourses: ["CS101", "CS102"]
});

const student3 = manager.addStudent({
  name: "Charlie Brown",
  email: "charlie@university.edu",
  major: "Mathematics",
  gpa: 3.9,
  enrolledCourses: ["MATH201", "MATH301"]
});

console.log("=== All Students ===");
console.log(manager.getAllStudents());

console.log("\n=== Computer Science Students ===");
console.log(manager.getStudentsByMajor("Computer Science"));

console.log("\n=== High Achievers (GPA >= 3.5) ===");
console.log(manager.getHighAchievers(3.5));

console.log("\n=== Average GPA ===");
console.log(manager.calculateAverageGPA());

console.log("\n=== Update Student ===");
manager.updateStudent(1, { gpa: 4.0 });
console.log(manager.getStudent(1));

console.log("\n=== Delete Student ===");
manager.deleteStudent(2);
console.log("Remaining students:", manager.getAllStudents().length);
```

### Test Exercise 5

```bash
npx ts-node src/ex5-student-manager.ts
```

**Expected Output:**
```
=== All Students ===
[
  { id: 1, name: 'Alice Johnson', ... },
  { id: 2, name: 'Bob Smith', ... },
  { id: 3, name: 'Charlie Brown', ... }
]

=== Computer Science Students ===
[ { id: 1, ... }, { id: 2, ... } ]

=== High Achievers (GPA >= 3.5) ===
[ { id: 1, ... }, { id: 2, ... }, { id: 3, ... } ]

=== Average GPA ===
3.73

=== Update Student ===
{ id: 1, name: 'Alice Johnson', gpa: 4.0, ... }

=== Delete Student ===
Remaining students: 2
```

---

## Bonus Challenges

### Challenge 1: Add Course Management

Extend the system with a `CourseManager` class that:
- Manages course enrollment
- Checks course capacity
- Returns course status (available/full/closed)

### Challenge 2: Add Data Validation

Create validation functions:
- Validate email format
- Validate GPA range (0.0 - 4.0)
- Validate course code format

### Challenge 3: Add Search Functionality

Implement advanced search:
- Search students by name (partial match)
- Filter by GPA range
- Sort students by various fields

---

## Lab Completion Checklist

- [ ] Exercise 1: Basic types completed
- [ ] Exercise 2: Interfaces and type aliases completed
- [ ] Exercise 3: Functions and generics completed
- [ ] Exercise 4: Utility types and type guards completed
- [ ] Exercise 5: Student manager system completed
- [ ] All code compiles without errors
- [ ] All tests produce expected output
- [ ] Bonus challenges attempted (optional)

---

## 🚀 Quick Reference: Running TypeScript Files

### Method 1: Compile First (Traditional)
```bash
# Compile TypeScript to JavaScript
tsc filename.ts

# Run the compiled JavaScript
node filename.js
```

### Method 2: Direct Execution (Modern)
```bash
# Using ts-node (recommended)
ts-node filename.ts

# Using tsx (faster alternative)
tsx filename.ts

# Using npx (no global installation)
npx ts-node filename.ts
```

### Watch Mode (Auto-recompile)
```bash
# Watch mode with ts-node
ts-node --watch filename.ts

# Watch mode with tsc
tsc --watch filename.ts
```

### Example Usage
```bash
# Try the example file
cd solutions
ts-node typescript-execution-example.ts
# or
tsc typescript-execution-example.ts && node typescript-execution-example.js
```

📖 **Detailed Guide**: See [execution_guide.md](./solutions/execution_guide.md) for comprehensive instructions.

---

## Key Takeaways

1.  **Type Safety**: TypeScript catches errors at compile time
2.  **IntelliSense**: Better IDE support and autocomplete
3.  **Interfaces**: Define clear contracts for objects
4.  **Generics**: Write reusable, type-safe code
5.  **Utility Types**: Transform types efficiently
6.  **Type Guards**: Safely narrow types at runtime

---

## Next Steps

1.  Review **Theory 0** for concepts you found challenging
2.  Take the **Quiz** to test your understanding
3.  Check out **Demo** examples for more patterns
4.  Move to **Lesson 1** - React with TypeScript

---
