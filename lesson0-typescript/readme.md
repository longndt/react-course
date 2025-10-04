# Lesson 0: TypeScript Prerequisites

> - 📜 Read [reference/](./reference/)*📚 Optional but Recommended**
> Review this lesson if you're new to TypeScript or need a refresher on modern TypeScript features.

---

## 🎯 Overview

This course teaches **React with TypeScript**. Before starting Lesson 1, you should be comfortable with TypeScript fundamentals. This lesson provides a quick review of essential TypeScript concepts you'll use throughout the course.

**Time Required:** 2-3 hours
**Difficulty:** Beginner to Intermediate

---

## 📁 Lesson Structure

```
lesson0-typescript/
├── reference/             # Quick reference guide with code snippets
│   └── reference0.md      # Quick reference for TypeScript essentials
├── theory/
│   └── theory0.md         # Comprehensive TypeScript fundamentals
├── lab/
│   └── lab0.md            # Hands-on exercises and projects
├── examples/
│   ├── src/
│   │   ├── index.ts
│   │   └── examples/      # 6 working examples
│   ├── package.json
│   └── tsconfig.json
└── quiz/
    └── quiz0.html         # Interactive quiz questions

```

---

## 🚀 Getting Started

### Option 1: Quick Start (5 minutes)
**New to TypeScript? Start here!**
- 📖 Read [reference/](./reference/)
- Get TypeScript running in 5 minutes
- Write your first TypeScript code

### Option 2: Full Course (2-3 hours)
**Want to master TypeScript fundamentals?**
1. 📚 Study [theory0.md](./theory/theory0.md) - Comprehensive guide
2. 💻 Complete [lab0.md](./lab/lab0.md) - Hands-on exercises
3. 🎮 Explore [examples/](./examples/) - Working examples
4. ✅ Take the [quiz](./quiz/quiz0.html) - Test your knowledge

### Option 3: Already Know TypeScript?
**Skip to the quiz!**
- ✅ Take the [quiz](./quiz/quiz0.html) to verify your knowledge
- If you score 80%+, proceed to Lesson 1
- Otherwise, review theory and lab sections

---

## Prerequisites

- Basic programming knowledge (variables, functions, loops, conditionals)
- Familiarity with HTML and CSS
- Understanding of modern JavaScript (ES6+)

---

## What You'll Review

### 1. TypeScript Basics
- ✅ Type annotations and inference
- ✅ Primitive types (string, number, boolean, etc.)
- ✅ Arrays and tuples
- ✅ Union and intersection types

### 2. Interfaces & Type Aliases
- ✅ Defining object shapes
- ✅ Optional and readonly properties
- ✅ Extending interfaces
- ✅ Type aliases vs interfaces

### 3. Functions & Generics
- ✅ Function type signatures
- ✅ Optional and default parameters
- ✅ Generic types and functions
- ✅ Generic constraints

### 4. Advanced Types
- ✅ Utility types (Partial, Pick, Omit, etc.)
- ✅ Type guards and narrowing
- ✅ Literal types
- ✅ Enums

---

## Quick Refresher

### 1. Type Annotations & Inference

```typescript
// Explicit type annotation
let username: string = "John Doe";
let age: number = 25;
let isActive: boolean = true;

// Type inference (TypeScript infers the type)
let city = "New York"; // inferred as string
let count = 42; // inferred as number

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// Tuples (fixed-length array with specific types)
let person: [string, number] = ["John", 30];

// Union types (multiple possible types)
let id: string | number = "ABC123";
id = 123; // Also valid

// Literal types
let status: "pending" | "approved" | "rejected" = "pending";
```

---

### 2. Interfaces & Type Aliases

```typescript
// Interface - defines the shape of an object
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Readonly property
}

// Using the interface
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};

// Extending interfaces
interface Admin extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}

const admin: Admin = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  createdAt: new Date(),
  role: "admin",
  permissions: ["read", "write", "delete"]
};

// Type alias (alternative to interface)
type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

// Type alias with union
type Status = "pending" | "processing" | "completed" | "failed";

// Type alias with intersection
type Employee = User & {
  department: string;
  salary: number;
};
```

**When to use Interface vs Type Alias:**
- **Interface:** Better for defining object shapes, can be extended/merged
- **Type Alias:** More flexible, can represent unions, intersections, primitives

---

### 3. Functions with TypeScript

```typescript
// Function with type annotations
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function with types
const add = (a: number, b: number): number => {
  return a + b;
};

// Optional parameters
function createUser(name: string, email: string, age?: number): User {
  return {
    id: Date.now(),
    name,
    email,
    age,
    createdAt: new Date()
  };
}

// Default parameters
function logMessage(message: string, level: string = "info"): void {
  console.log(`[${level.toUpperCase()}] ${message}`);
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Function as a type
type MathOperation = (a: number, b: number) => number;

const multiply: MathOperation = (a, b) => a * b;
const divide: MathOperation = (a, b) => a / b;
```

---

### 4. Generics

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

// Usage
const num = identity<number>(42);
const str = identity<string>("Hello");
const bool = identity(true); // Type inference works too

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage with specific type
const userResponse: ApiResponse<User> = {
  data: {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    createdAt: new Date()
  },
  status: 200,
  message: "Success"
};

// Generic array function
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirstItem([1, 2, 3]); // number | undefined
const firstName = getFirstItem(["Alice", "Bob"]); // string | undefined

// Generic with constraints
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Usage
const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", createdAt: new Date() },
  { id: 2, name: "Bob", email: "bob@example.com", createdAt: new Date() }
];

const user = findById(users, 1); // Type: User | undefined
```

---

### 5. Utility Types

```typescript
// Partial - makes all properties optional
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type PartialTodo = Partial<Todo>;
// Equivalent to:
// {
//   title?: string;
//   description?: string;
//   completed?: boolean;
// }

function updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
  return { ...todo, ...updates };
}

// Required - makes all properties required
type RequiredTodo = Required<PartialTodo>;

// Pick - selects specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;
// Equivalent to:
// {
//   title: string;
//   completed: boolean;
// }

// Omit - excludes specific properties
type TodoInfo = Omit<Todo, "completed">;
// Equivalent to:
// {
//   title: string;
//   description: string;
// }

// Readonly - makes all properties readonly
type ReadonlyTodo = Readonly<Todo>;
// Equivalent to:
// {
//   readonly title: string;
//   readonly description: string;
//   readonly completed: boolean;
// }

// Record - creates an object type with specific keys and values
type UserRoles = Record<string, string[]>;
const rolePermissions: UserRoles = {
  admin: ["read", "write", "delete"],
  user: ["read"],
  guest: []
};
```

---

### 6. Type Guards & Narrowing

```typescript
// typeof type guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}

// instanceof type guard
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function handlePet(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark();
  } else {
    pet.meow();
  }
}

// Custom type guard
interface Bird {
  type: "bird";
  fly: () => void;
}

interface Fish {
  type: "fish";
  swim: () => void;
}

function isBird(animal: Bird | Fish): animal is Bird {
  return animal.type === "bird";
}

function handleAnimal(animal: Bird | Fish) {
  if (isBird(animal)) {
    animal.fly(); // TypeScript knows it's Bird
  } else {
    animal.swim(); // TypeScript knows it's Fish
  }
}

// Discriminated unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; size: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.size ** 2;
  }
}
```

---

### 7. Enums

```typescript
// Numeric enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

const move = Direction.Up; // 1

// String enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

const primaryColor: Color = Color.Red;

// Const enum (more performant)
const enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

function handleResponse(status: HttpStatus) {
  switch (status) {
    case HttpStatus.OK:
      console.log("Success!");
      break;
    case HttpStatus.NotFound:
      console.log("Resource not found");
      break;
    default:
      console.log("Error occurred");
  }
}
```

---

## Array Methods Review

You'll use these frequently in React:

```typescript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter - select elements that match condition
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce - accumulate values
const sum = numbers.reduce((total, n) => total + n, 0); // 15

// find - get first matching element
const firstEven = numbers.find(n => n % 2 === 0); // 2

// some - check if any element matches
const hasNegative = numbers.some(n => n < 0); // false

// every - check if all elements match
const allPositive = numbers.every(n => n > 0); // true

// Working with objects
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1299, category: "Electronics" },
  { id: 2, name: "Mouse", price: 29, category: "Electronics" },
  { id: 3, name: "Desk", price: 399, category: "Furniture" }
];

// Get all product names
const productNames = products.map(p => p.name);
// ["Laptop", "Mouse", "Desk"]

// Filter by category
const electronics = products.filter(p => p.category === "Electronics");

// Calculate total price
const totalPrice = products.reduce((sum, p) => sum + p.price, 0); // 1727

// Find expensive items
const expensiveProducts = products.filter(p => p.price > 100);
```

---

## Destructuring & Spread Operator

```typescript
// Object destructuring
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};

const { id, name, email } = user;
console.log(name); // "Alice"

// Rename during destructuring
const { name: userName, email: userEmail } = user;

// With default values
const { age = 18 } = user;

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;

// Skip elements
const [primary, , tertiary] = colors;

// Rest operator
const [head, ...rest] = colors;
// head = "red"
// rest = ["green", "blue"]

// Spread operator with objects
const updatedUser = { ...user, age: 30 };

// Spread operator with arrays
const moreColors = [...colors, "yellow", "purple"];

// Combining objects
const admin: Admin = {
  ...user,
  role: "admin",
  permissions: ["read", "write"]
};
```

---

## Module System

```typescript
// Exporting
// user.types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRole = "admin" | "user" | "guest";

export const DEFAULT_ROLE: UserRole = "user";

// Default export
export default class UserService {
  getUsers(): User[] {
    return [];
  }
}

// Importing
// app.ts
import UserService, { User, UserRole, DEFAULT_ROLE } from './user.types';

// Import everything
import * as UserTypes from './user.types';

// Type-only imports (TypeScript 3.8+)
import type { User } from './user.types';
```

---

## Async/Await with TypeScript

```typescript
// Promise with generic type
function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then(response => response.json());
}

// Async/await
async function getUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const user: User = await response.json();
  return user;
}

// Error handling
async function getUserSafely(id: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

// Multiple parallel requests
async function fetchUsersAndProducts(): Promise<{
  users: User[];
  products: Product[];
}> {
  const [usersResponse, productsResponse] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/products')
  ]);

  const users: User[] = await usersResponse.json();
  const products: Product[] = await productsResponse.json();

  return { users, products };
}
```

---

## Self-Check Quiz

Before proceeding to Lesson 1, ensure you can:

- [ ] Define interfaces and type aliases
- [ ] Use type annotations for variables and functions
- [ ] Work with generic types
- [ ] Use utility types (Partial, Pick, Omit, etc.)
- [ ] Apply type guards and narrowing
- [ ] Use array methods (map, filter, reduce)
- [ ] Destructure objects and arrays
- [ ] Use spread operators
- [ ] Work with async/await and Promises
- [ ] Import/export modules

**✅ Test your knowledge:** Take the [interactive quiz](./quiz/quiz0.html)

---

## 📚 Additional Resources

### Official Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tools & Extensions
- [VS Code TypeScript Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions

### Practice Platforms
- [TypeScript Exercises](https://typescript-exercises.github.io/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

---

## 🎓 Ready for the Next Step?

If you're comfortable with these TypeScript concepts, you're ready to start learning React!

**→ [Lesson 1: React Fundamentals & Setup](../lesson1-fundamentals-setup/)**

In Lesson 1, you'll learn:
- 📌 React fundamentals with TypeScript
- 📌 Setting up a React project with Vite
- 📌 Creating typed components with props
- 📌 TSX syntax (TypeScript + JSX) and best practices

---

## 📖 Learning Path Recap

```
Lesson 0: TypeScript Fundamentals (You are here! ✅)
    ↓
Lesson 1: React Fundamentals & Setup
    ↓
Lesson 2: Components & Hooks
    ↓
Lesson 3: API & Data Handling
    ↓
Lesson 4: Routing & Authentication
    ↓
Lesson 5: Fullstack & Deployment
```

---

## 💡 Tips for Success

1. **Don't Skip the Basics**: TypeScript knowledge is crucial for React development
2. **Practice Regularly**: Complete all lab exercises
3. **Use the Quiz**: Test your understanding before moving on
4. **Explore Examples Code**: Learn from working examples
5. **Ask Questions**: Understanding beats memorization

---

## Notes

- This course uses **TypeScript exclusively** - all examples are in `.tsx` files
- We use **functional components** with TypeScript interfaces
- **Vite** is our build tool (faster than Create React App)
- All props are **strongly typed** for better developer experience

---

**Happy Learning! 🚀**
