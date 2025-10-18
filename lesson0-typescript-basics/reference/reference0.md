# Reference - TypeScript for React

> **Quick reference guide for TypeScript essentials in React development**

## Table of Contents
1. [Why TypeScript for React?](#why-typescript-for-react)
2. [Basic Types & Type Inference](#basic-types--type-inference)
3. [Functions](#functions)
4. [Arrays & Objects](#arrays--objects)
5. [Union Types & Type Aliases](#union-types--type-aliases)
6. [Generics](#generics)
7. [TypeScript with React (TSX)](#typescript-with-react-tsx)
8. [Quick Reference](#quick-reference)

---

## Why TypeScript for React?

### Benefits
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete, refactoring, navigation
- **Self-Documenting Code**: Types serve as documentation
- **Easier Refactoring**: Safe code changes across large codebases

### React + TypeScript = TSX
```tsx
// TypeScript + JSX = TSX
interface Props {
  name: string;
  age?: number;
}

function Welcome({ name, age }: Props) {
  return <h1>Hello, {name}!</h1>;
}
```

---

## Basic Types & Type Inference

### Primitive Types
```tsx
// Explicit typing
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;

// Type inference (recommended)
let name = "John";        // string
let age = 25;             // number
let isActive = true;      // boolean
```

### Arrays
```tsx
// Array of strings
let names: string[] = ["John", "Jane"];
// or
let names: Array<string> = ["John", "Jane"];

// Mixed arrays (avoid when possible)
let mixed: (string | number)[] = ["John", 25];
```

### Objects
```tsx
// Object type
let user: { name: string; age: number } = {
  name: "John",
  age: 25
};

// Interface (preferred)
interface User {
  name: string;
  age: number;
  email?: string; // optional
}

let user: User = { name: "John", age: 25 };
```

---

## Functions

### Function Types
```tsx
// Function with explicit types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const greet = (name: string): string => `Hello, ${name}!`;

// Function type
type GreetFunction = (name: string) => string;
```

### Optional Parameters
```tsx
function greet(name: string, age?: number): string {
  if (age) {
    return `Hello, ${name}! You are ${age} years old.`;
  }
  return `Hello, ${name}!`;
}
```

### Default Parameters
```tsx
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}
```

---

## Arrays & Objects

### Tuples
```tsx
// Fixed-length arrays with specific types
let coordinates: [number, number] = [10, 20];
let person: [string, number, boolean] = ["John", 25, true];
```

### Enums
```tsx
// String enum (preferred)
enum Status {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected"
}

// Numeric enum
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}
```

### Object Types
```tsx
// Index signatures
interface StringDictionary {
  [key: string]: string;
}

// Readonly properties
interface ReadonlyUser {
  readonly id: number;
  name: string;
}
```

---

## Union Types & Type Aliases

### Union Types
```tsx
// Union of string literals
type Status = "loading" | "success" | "error";

// Union of types
type ID = string | number;

// Function with union return
function getValue(): string | null {
  return Math.random() > 0.5 ? "success" : null;
}
```

### Type Aliases
```tsx
// Simple type alias
type UserID = string;
type UserName = string;

// Complex type alias
type User = {
  id: UserID;
  name: UserName;
  email: string;
  isActive: boolean;
};
```

### Discriminated Unions
```tsx
type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: any;
};

type ErrorState = {
  status: "error";
  error: string;
};

type AppState = LoadingState | SuccessState | ErrorState;
```

---

## Generics

### Basic Generics
```tsx
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let result = identity<string>("hello");
let number = identity<number>(42);
let inferred = identity("hello"); // TypeScript infers string
```

### Generic Interfaces
```tsx
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage
type UserResponse = ApiResponse<User>;
type ProductResponse = ApiResponse<Product[]>;
```

### Generic Constraints
```tsx
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Works with arrays, strings, etc.
logLength([1, 2, 3]);
logLength("hello");
```

---

## TypeScript with React (TSX)

### Component Props
```tsx
// Basic props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ children, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

### Event Handlers
```tsx
// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Handle form submission
};

// Input events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// Button events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked");
};
```

### State with TypeScript
```tsx
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // TypeScript knows user could be null
  if (!user) return <div>No user data</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

### Ref Types
```tsx
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

---

## Quick Reference

### Common TypeScript Types
```tsx
// React types
React.ReactNode          // Any renderable content
React.ReactElement       // JSX element
React.ComponentType<P>   // Component type
React.FC<P>              // Function component type

// Event types
React.ChangeEvent<HTMLInputElement>
React.MouseEvent<HTMLButtonElement>
React.FormEvent<HTMLFormElement>
React.KeyboardEvent<HTMLInputElement>

// Hook types
useState<string>(initialValue)
useRef<HTMLInputElement>(null)
useEffect(() => {}, [dependencies])
```

### Type Guards
```tsx
// Type guard function
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Usage
function processValue(value: string | number) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}
```

### Utility Types
```tsx
// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserName = Pick<User, 'name'>;

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;

// Record - create object type
type UserRoles = Record<string, string[]>;
```

---

## Next Steps

1. **Practice**: Build small React components with TypeScript
2. **Learn More**: Advanced TypeScript patterns and utility types
3. **Continue**: Move to [Lesson 1](../lesson1-fundamentals-setup/) for React fundamentals
4. **Resources**: Check [Theory Guide](./theory/theory0.md) for detailed explanations

> **💡 Tip**: Start with simple types and gradually add complexity. TypeScript is most valuable when it catches real bugs!