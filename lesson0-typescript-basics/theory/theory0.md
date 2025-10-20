# Theory - TypeScript Prerequisites

---

## Table of Contents

1. [Why TypeScript for React?](#why-typescript-for-react)
2. [Basic Types & Type Inference](#basic-types--type-inference)
3. [Functions](#functions)
4. [Arrays & Objects](#arrays--objects)
5. [Union Types & Type Aliases](#union-types--type-aliases)
6. [Generics](#generics)
7. [TypeScript with React](#typescript-with-react)
8. [Common Mistakes](#common-mistakes)
9. [Next Steps](#next-steps)

---

## Why TypeScript for React?

> 🗺️ **Visual Learning**: For a comprehensive understanding of the course roadmap, see [Course Roadmap Diagram](../../diagrams/course_roadmap.md)

**Building Better React Applications:**

- TypeScript catches errors before runtime
- Better IDE support with autocomplete and IntelliSense
- Easier to refactor and maintain large codebases
- Industry standard for professional React development
- Self-documenting code through type annotations

**Key Facts:**
- 80%+ of modern React projects use TypeScript
- Essential skill for professional development
- Reduces bugs in production significantly

---

## Basic Types & Type Inference

### Primitive Types

```typescript
// Basic types
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Type inference (JavaScript guesses the type)
let name = "John";        // Type: string
let age = 25;             // Type: number
let isActive = true;      // Type: boolean
```

### Type Annotations vs Inference

```typescript
// Explicit type annotation
let count: number = 0;

// Type inference (preferred when obvious)
let count = 0;  // JavaScript knows this is number

// When to use explicit types
let user: { name: string; age: number } = {
  name: "John",
  age: 25
};
```

---

## Functions

### Function Types

```typescript
// Function with parameter and return types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const greetArrow = (name: string): string => {
  return `Hello, ${name}!`;
};

// Optional parameters
function greetOptional(name: string, age?: number): string {
  if (age) {
    return `Hello, ${name}! You are ${age} years old.`;
  }
  return `Hello, ${name}!`;
}

// Default parameters
function greetDefault(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}
```

### Function Overloads

```typescript
// Function overloads
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
}
```

---

## Arrays & Objects

### Arrays

```typescript
// Array types
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["John", "Jane", "Bob"];

// Alternative syntax
let numbers2: Array<number> = [1, 2, 3, 4, 5];

// Mixed arrays (tuples)
let person: [string, number] = ["John", 25];

// Array methods with types
let doubled = numbers.map((n: number) => n * 2);
let filtered = numbers.filter((n: number) => n > 2);
```

### Objects & Interfaces

```typescript
// Object type
let user: { name: string; age: number; email?: string } = {
  name: "John",
  age: 25
};

// Interface (preferred)
interface User {
  name: string;
  age: number;
  email?: string;  // Optional property
}

let user2: User = {
  name: "John",
  age: 25
};

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

### Type vs Interface

```typescript
// Interface (preferred for objects)
interface User {
  name: string;
  age: number;
}

// Type (for unions, primitives, etc.)
type Status = 'loading' | 'success' | 'error';
type UserId = string | number;
```

---

## Union Types & Type Aliases

### Union Types

```typescript
// Union types
let id: string | number = "123";
id = 456;  // Also valid

// Union with functions
function formatId(id: string | number): string {
  return `ID: ${id}`;
}

// Type guards
function processId(id: string | number) {
  if (typeof id === 'string') {
    // TypeScript knows id is string here
    return id.toUpperCase();
  }
  // TypeScript knows id is number here
  return id.toString();
}
```

### Type Aliases

```typescript
// Type aliases
type UserId = string | number;
type Theme = 'light' | 'dark';
type Status = 'pending' | 'approved' | 'rejected';

// Using type aliases
function updateUser(id: UserId, theme: Theme, status: Status) {
  // Function implementation
}
```

---

## Generics

### Basic Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let stringResult = identity<string>("hello");  // Type: string
let numberResult = identity<number>(42);       // Type: number

// Type inference with generics
let inferred = identity("hello");  // TypeScript infers T as string
```

### Generic Interfaces

```typescript
// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Using generic interface
interface User {
  id: number;
  name: string;
}

let userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};
```

### Generic Constraints

```typescript
// Generic with constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");     // OK - string has length
logLength([1, 2, 3]);   // OK - array has length
// logLength(123);      // Error - number doesn't have length
```

---

## TypeScript with React

### Component Props

```typescript
// Component with typed props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ children, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Event Handlers

```typescript
// Typed event handlers
function Form() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Submit</button>
    </form>
  );
}
```

### State with Hooks

```typescript
import { useState, useEffect } from 'react';

// Typed useState
function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser().then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user found</div>;

  return <div>{user.name}</div>;
}
```

### Common React Types

```typescript
import { ReactNode, CSSProperties } from 'react';

// ReactNode for children
interface CardProps {
  children: ReactNode;
  title: string;
}

// CSSProperties for inline styles
interface BoxProps {
  style?: CSSProperties;
}

// Component type
type ComponentType<P = {}> = (props: P) => ReactNode;
```

---

## Common Mistakes

### Mistake 1: Using `any` too much

```typescript
// ❌ Wrong - defeats the purpose of TypeScript
function processData(data: any) {
  return data.someProperty;
}

// ✅ Correct - use proper types
function processData(data: { someProperty: string }) {
  return data.someProperty;
}
```

### Mistake 2: Not using type inference

```typescript
// ❌ Wrong - unnecessary type annotation
let count: number = 0;
let name: string = "John";

// ✅ Correct - let TypeScript infer
let count = 0;
let name = "John";
```

### Mistake 3: Forgetting optional properties

```typescript
// ❌ Wrong - will cause error if property doesn't exist
interface User {
  name: string;
  age: number;
  email: string;  // This might not always exist
}

// ✅ Correct - make optional if it might not exist
interface User {
  name: string;
  age: number;
  email?: string;  // Optional property
}
```

### Mistake 4: Not using union types

```typescript
// ❌ Wrong - too restrictive
function formatId(id: string) {
  return `ID: ${id}`;
}

// ✅ Correct - accept multiple types
function formatId(id: string | number) {
  return `ID: ${id}`;
}
```

---

## Next Steps

### What You Should Know After Lesson 0

**TypeScript Basics:**
- Basic types and type inference
- Functions with proper typing
- Objects and interfaces
- Arrays and tuples

**Advanced Concepts:**
- Union types and type aliases
- Generics for reusable code
- Type guards and narrowing

**React Integration:**
- Typed component props
- Event handler types
- State management with types
- Common React type patterns

### What's Coming in Lesson 1

🔜 **React Fundamentals** - Components, JSX, and basic patterns
🔜 **TSX Syntax** - TypeScript with JSX
🔜 **Component Architecture** - Building reusable components
🔜 **Styling** - CSS integration with React
