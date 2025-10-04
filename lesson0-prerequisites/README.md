# Lesson 0: Prerequisites & JavaScript ES6+ Refresher

## Overview

This optional lesson provides a comprehensive review of JavaScript ES6+ features essential for React development. If you're comfortable with modern JavaScript concepts, you can skip to Lesson 1. If you need a refresher or want to ensure you're ready for React, work through this lesson first.

## Quick Self-Assessment

Before starting the React course, you should be comfortable with these concepts:

**✅ Check your knowledge:**

- [ ] Arrow functions and `this` binding
- [ ] Destructuring objects and arrays
- [ ] Template literals and string interpolation
- [ ] Promises and async/await
- [ ] ES6 modules (import/export)
- [ ] Array methods (map, filter, reduce)
- [ ] Spread operator and rest parameters

**If you checked fewer than 6 items, spend time on this lesson first.**

## Essential JavaScript ES6+ Features for React

### 1. Arrow Functions

React uses arrow functions extensively for event handlers and functional components:

```typescript
// Traditional function
function handleClick() {
  console.log("Button clicked");
}

// Arrow function (preferred in React)
const handleClick = () => {
  console.log("Button clicked");
};

// Arrow function with parameters
const greetUser = (name) => {
  return `Hello, ${name}!`;
};

// Concise arrow function
const greetUser = (name) => `Hello, ${name}!`;
```

### 2. Destructuring

Essential for working with React props and state:

```typescript
// Object destructuring
const student = {
  name: "Alice",
  age: 21,
  major: "Computer Science",
};

const { name, age, major } = student;
console.log(name); // 'Alice'

// Array destructuring
const scores = [85, 92, 78, 96];
const [first, second, ...rest] = scores;
console.log(first); // 85
console.log(rest); // [78, 96]

// Function parameter destructuring (very common in React)
const displayStudent = ({ name, age }) => {
  return `${name} is ${age} years old`;
};
```

### 3. Template Literals

For dynamic strings in React components:

```typescript
const name = "Sarah";
const grade = "A";

// Old way
const message = "Student " + name + " received grade " + grade;

// Template literal (preferred)
const message = `Student ${name} received grade ${grade}`;

// Multi-line strings
const htmlTemplate = `
  <div>
    <h2>Welcome ${name}</h2>
    <p>Your grade: ${grade}</p>
  </div>
`;
```

### 4. Array Methods

Critical for rendering lists in React:

```typescript
const students = [
  { id: 1, name: "Alice", grade: 85 },
  { id: 2, name: "Bob", grade: 92 },
  { id: 3, name: "Charlie", grade: 78 },
];

// map() - transform array (most important for React)
const studentNames = students.map((student) => student.name);
// ['Alice', 'Bob', 'Charlie']

// filter() - create subset
const highPerformers = students.filter((student) => student.grade >= 85);
// [{ id: 1, name: 'Alice', grade: 85 }, { id: 2, name: 'Bob', grade: 92 }]

// find() - get single item
const alice = students.find((student) => student.name === "Alice");

// reduce() - calculate single value
const averageGrade =
  students.reduce((sum, student) => sum + student.grade, 0) / students.length;
```

### 5. Spread Operator

For copying and merging objects/arrays:

```typescript
// Array spreading
const fruits = ["apple", "banana"];
const moreFruits = ["orange", "grape"];
const allFruits = [...fruits, ...moreFruits];
// ['apple', 'banana', 'orange', 'grape']

// Object spreading (very important for React state)
const student = { name: "Alice", age: 21 };
const updatedStudent = { ...student, grade: "A" };
// { name: 'Alice', age: 21, grade: 'A' }

// Function arguments
const numbers = [1, 2, 3];
const max = Math.max(...numbers); // same as Math.max(1, 2, 3)
```

### 6. Promises and Async/Await

For API calls in React:

```typescript
// Promise-based API call
fetch("/api/students")
  .then((response) => response.json())
  .then((students) => {
    console.log(students);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Async/await version (cleaner)
const fetchStudents = async () => {
  try {
    const response = await fetch("/api/students");
    const students = await response.json();
    console.log(students);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 7. ES6 Modules

How React components are organized:

```typescript
// math-utils.js - Export functions
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Or default export
const Calculator = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
};

export default Calculator;

// main.js - Import functions
import Calculator, { add, multiply } from "./math-utils.js";
import { add as addition } from "./math-utils.js"; // renamed import
```

## Practice Exercises

### Exercise 1: Array Transformation

Given this student data:

```typescript
const students = [
  { id: 1, name: "Alice Johnson", subjects: ["Math", "Physics"], gpa: 3.8 },
  { id: 2, name: "Bob Smith", subjects: ["Chemistry", "Biology"], gpa: 3.2 },
  {
    id: 3,
    name: "Charlie Brown",
    subjects: ["Math", "Computer Science"],
    gpa: 3.9,
  },
];
```

**Tasks:**

1. Create an array of just the names
2. Find students with GPA > 3.5
3. Create a new array with full name and honor status (GPA > 3.7 = "Honor Roll")

### Exercise 2: Object Manipulation

```typescript
const course = {
  id: "CS101",
  title: "Introduction to Programming",
  credits: 3,
  instructor: "Dr. Smith",
};
```

**Tasks:**

1. Create a new course object with an additional `semester: 'Fall 2025'` property
2. Extract `title` and `instructor` using destructuring
3. Create a function that takes course details and returns a formatted string

### Exercise 3: Async Data Fetching

Write an async function that:

1. Fetches data from a mock API endpoint
2. Handles errors gracefully
3. Returns processed data

**Practice Template:**

```typescript
const fetchCourseData = async (courseId) => {
  // Your implementation here
  try {
    // Fetch course data
    // Process the response
    // Return formatted data
  } catch (error) {
    // Handle errors
  }
};
```

## Common Gotchas for Students

### 1. `this` in Arrow Functions

```typescript
// Traditional function - `this` changes
const obj = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, ${this.name}`); // Works
  },
};

// Arrow function - `this` is inherited
const obj2 = {
  name: "Bob",
  greet: () => {
    console.log(`Hello, ${this.name}`); // `this` is not obj2!
  },
};
```

### 2. Array Methods Return New Arrays

```typescript
const numbers = [1, 2, 3];

// ❌ Wrong - doesn't modify original array
numbers.map((n) => n * 2);
console.log(numbers); // Still [1, 2, 3]

// ✅ Correct - capture returned array
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6]
```

### 3. Async/Await Error Handling

```typescript
// ❌ Unhandled errors will crash your app
const fetchData = async () => {
  const response = await fetch("/api/data");
  return response.json();
};

// ✅ Always use try/catch
const fetchData = async () => {
  try {
    const response = await fetch("/api/data");
    return response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null; // or throw error
  }
};
```

## Ready for React?

If you're comfortable with all these concepts, you're ready to start Lesson 1! These JavaScript features form the foundation of modern React development.

**Next Steps:**

- Proceed to [Lesson 1: React Fundamentals & TypeScript Setup](../lesson1-setup/)
- Keep this reference handy as you learn React
- Don't hesitate to revisit these concepts as needed

## Additional Resources

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info - Modern JavaScript Tutorial](https://javascript.info/)
- [ES6 Features Overview](https://github.com/lukehoban/es6features)

