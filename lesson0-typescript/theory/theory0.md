# Theory - TypeScript Prerequisites

---

##  Table of Contents

1. [Why TypeScript for React?](#why-typescript-for-react-)
2. [TypeScript vs JavaScript Overview](#typescript-vs-javascript-overview)
3. [Basic Types & Type Inference](#1-basic-types--type-inference)
4. [Arrays & Objects](#2-arrays--objects)
5. [Functions](#3-functions)
6. [Union Types & Type Aliases](#4-union-types--type-aliases)
7. [Generics](#5-generics)
8. [Type Guards & Narrowing](#6-type-guards--narrowing)
9. [TypeScript with React](#7-typescript-with-react)
10. [Utility Types](#8-utility-types)
11. [Best Practices](#9-best-practices)
12. [Summary](#10-summary)

---

## Why TypeScript for React?

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

## TypeScript vs JavaScript Overview

| JavaScript | TypeScript |
|------------|------------|
| Dynamically typed | Statically typed |
| Errors at runtime | Errors at compile time |
| No IDE type checking | Full IntelliSense support |
| Flexible but error-prone | Strict but reliable |

**Key Advantage:** TypeScript = JavaScript + Type Safety

---

## 1. Basic Types & Type Inference

###  JavaScript vs TypeScript

**JavaScript:**
```javascript
let userName = "John";
let age = 25;
userName = 123; //  Allowed, but may cause bugs

function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(123); //  Runtime error: name.toUpperCase is not a function
```

**TypeScript:**
```typescript
let userName: string = "John";
let age: number = 25;
userName = 123; //  Compile error: Type 'number' is not assignable to type 'string'

function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}
greet(123); //  Compile error caught immediately
```

### Type Inference

```typescript
// TypeScript can infer types automatically
let message = "Hello"; // inferred as string
let count = 42;        // inferred as number
let active = true;     // inferred as boolean

// Complex type inference
let user = {
  name: "John",
  age: 25
}; // inferred as { name: string; age: number; }

// Array inference
let numbers = [1, 2, 3]; // inferred as number[]
let mixed = [1, "two", 3]; // inferred as (string | number)[]
```

### Primitive Types Reference

```typescript
// String, Number, Boolean
let userName: string = "John Doe";
let age: number = 25;
let isActive: boolean = true;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;
```

### Any Type (Use Sparingly!)

```typescript
// Any disables type checking - avoid it!
let data: any = "string";
data = 123;   // OK but defeats TypeScript's purpose
```

---

## 2. Arrays & Objects

###  JavaScript vs TypeScript

**JavaScript Arrays:**
```javascript
let scores = [90, 85, 88];
scores.push("A+"); //  Allowed, but causes bugs
```

**TypeScript Arrays:**
```typescript
let scores: number[] = [90, 85, 88];
scores.push("A+"); //  Compile error
scores.push(92);   //  OK

// Alternative syntax
let grades: Array<number> = [3.8, 3.5, 4.0];

// Array of specific values (tuple-like)
let rgb: [number, number, number] = [255, 0, 128];
```

### Tuples

```typescript
// Fixed-length array with known types
let person: [string, number] = ["John", 25];
let coordinate: [number, number] = [10, 20];

// Accessing tuple elements
let name = person[0];  // string
let age = person[1];   // number
// let invalid = person[2]; //  Error: Tuple has only 2 elements
```

### Objects & Interfaces

**JavaScript:**
```javascript
let user = {
  name: "John",
  age: 25
};
user.emial = "john@example.com"; //  Typo creates new property!
```

**TypeScript:**
```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

let user: User = {
  name: "John",
  age: 25,
  email: "john@example.com"
};
user.emial = "new@example.com"; //  Compile error: Property 'emial' does not exist
```

**Key Benefits:**
- Interfaces define clear contracts
- Typos are caught immediately
- Missing properties cause compile errors

### Optional & Readonly Properties

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;      // Optional property
  readonly createdAt: Date;  // Read-only property
}

const product: Product = {
  id: 1,
  name: "Laptop",
  price: 999,
  createdAt: new Date()
};

// product.createdAt = new Date(); //  Error: Cannot assign to read-only property
product.description = "Gaming laptop"; //  OK (optional property)
```

### Extending Interfaces

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

const employee: Employee = {
  name: "Alice",
  age: 30,
  employeeId: "E12345",
  department: "Engineering"
};
```

---

## 3. Functions

###  JavaScript vs TypeScript

**JavaScript:**
```javascript
function add(a, b) {
  return a + b;
}
add(5, 10);     // 15 
add("5", "10"); // "510"  String concatenation!
add(5);         // NaN 
```

**TypeScript:**
```typescript
function add(a: number, b: number): number {
  return a + b;
}
add(5, 10);     // 15 
add("5", "10"); //  Compile error
add(5);         //  Compile error: Expected 2 arguments
```

### Optional Parameters

```typescript
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

greet("John");        //  OK - "Hello, John!"
greet("John", "Hi");  //  OK - "Hi, John!"
```

### Default Parameters

```typescript
function createUser(name: string, role: string = "user"): void {
  console.log(`${name} - ${role}`);
}

createUser("Alice");           // "Alice - user"
createUser("Bob", "admin");    // "Bob - admin"
```

### Rest Parameters

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3);        // 6
sum(10, 20, 30, 40); // 100
```

### Arrow Functions

```typescript
// Arrow function with type annotations
const multiply = (a: number, b: number): number => a * b;

// Arrow function with object return
const createUser = (name: string, age: number): { name: string; age: number } => ({
  name,
  age
});
```

---

## 4. Union Types & Type Aliases

### Union Types

```typescript
// Variable can be one of several types
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending";
// orderStatus = "shipped"; //  Error

type Result = string | number;
let value: Result = "success"; // 
value = 200;                   // 
```

### Type Aliases

```typescript
type User = {
  name: string;
  age: number;
  email: string;
};

type ID = string | number;

// Type alias for function signature
type CalculateFunction = (x: number, y: number) => number;

const add: CalculateFunction = (x, y) => x + y;
const subtract: CalculateFunction = (x, y) => x - y;
```

### Intersection Types

```typescript
// Combine multiple types
type Person = {
  name: string;
  age: number;
};

type Contact = {
  email: string;
  phone: string;
};

type Employee = Person & Contact;

const employee: Employee = {
  name: "John",
  age: 30,
  email: "john@example.com",
  phone: "123-456-7890"
};
```

---

## 5. Generics

###  JavaScript vs TypeScript

**JavaScript:**
```javascript
function getFirstElement(arr) {
  return arr[0];
}
const first = getFirstElement([1, 2, 3]); // Type unknown
```

**TypeScript:**
```typescript
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
const first = getFirstElement([1, 2, 3]);     // first is number
const name = getFirstElement(["a", "b"]);     // name is string
```

**Key Benefit:** Generics preserve type information in reusable functions.

### Generic Interfaces

```typescript
// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

// TypeScript knows the exact type of data
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};

const userName = userResponse.data.name; //  string
```

### Generic Arrays

```typescript
// Array utility with generics
function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterArray(numbers, num => num % 2 === 0); // number[]

const names = ["Alice", "Bob", "Charlie"];
const shortNames = filterArray(names, name => name.length < 5); // string[]
```

---

## 6. Type Guards & Narrowing

### typeof Guards

```typescript
function process(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's string
  } else {
    return value.toFixed(2);    // TypeScript knows it's number
  }
}
```

### Truthiness Narrowing

```typescript
function printName(name: string | null | undefined) {
  if (name) {
    console.log(name.toUpperCase()); // name is string here
  } else {
    console.log("No name provided");
  }
}
```

### instanceof Guards

```typescript
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

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

---

## 7. TypeScript with React

### Component Props

**JavaScript (.jsx):**
```javascript
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}

//  No type checking
<UserCard nam="John" age="25" /> // Typo and wrong type - no warning!
```

**TypeScript (.tsx):**
```typescript
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  phone?: string; // Optional
}

function UserCard({ name, age, email, phone }: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      {phone && <p>Phone: {phone}</p>}
    </div>
  );
}

//  Compile errors prevent mistakes
<UserCard nam="John" age="25" email="john@example.com" /> // Error: 'nam' doesn't exist
<UserCard name="John" age={25} email="john@example.com" /> //  Correct
```

### useState Hook

**JavaScript:**
```javascript
const [count, setCount] = useState(0);
setCount("hello"); //  Runtime error
```

**TypeScript:**
```typescript
const [count, setCount] = useState<number>(0);
setCount("hello"); //  Compile error
setCount(count + 1); //  OK
```

### Event Handlers

**TypeScript:**
```typescript
function SearchBar() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return <input onChange={handleChange} />;
}
```

**Common React Types:**
- `React.ChangeEvent<HTMLInputElement>` - for input changes
- `React.FormEvent<HTMLFormElement>` - for form submissions
- `React.MouseEvent<HTMLButtonElement>` - for button clicks
- `React.ReactNode` - for children props

### Children Props

```typescript
interface CardProps {
  title: string;
  children: React.ReactNode; // Can be anything React can render
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="Welcome">
  <p>This is the card content</p>
  <button>Click me</button>
</Card>
```

### useEffect Hook

```typescript
import { useEffect } from 'react';

function UserProfile({ userId }: { userId: number }) {
  useEffect(() => {
    fetchUser(userId);
    return () => {
      // Cleanup logic
    };
  }, [userId]);

  return <div>User Profile</div>;
}
```

### Component with Callbacks

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

---

## 8. Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Make all properties optional
type PartialUser = Partial<User>;

// Pick specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit specific properties
type PublicUser = Omit<User, "password">;

// Make all properties read-only
type ReadonlyUser = Readonly<User>;

// Required - opposite of Partial
type RequiredUser = Required<User>;

// Record - create object type with specific keys
type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, string[]>;

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};
```

### Practical Example with Utility Types

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

// For product updates - all fields optional
type ProductUpdate = Partial<Product>;

function updateProduct(id: number, updates: ProductUpdate) {
  // Only update provided fields
}

// For product display - only show specific fields
type ProductPreview = Pick<Product, "id" | "name" | "price">;

function displayProducts(products: ProductPreview[]) {
  // Display without description
}
```

---

## 9. Best Practices

###  DO:
```typescript
// Use explicit types for function parameters
function calculate(x: number, y: number): number {
  return x + y;
}

// Define interfaces for objects
interface Product {
  id: number;
  name: string;
  price: number;
}

// Use type inference for simple variables
let message = "Hello"; // Type inferred as string
```

###  DON'T:
```typescript
// Don't use 'any' unless absolutely necessary
let data: any; // Defeats purpose of TypeScript

// Don't over-specify when inference works
let message: string = "Hello"; // Redundant type annotation

// Don't use 'Function' type
let callback: Function; // Use specific signature: () => void
```

### Common Patterns

```typescript
//  Explicit return types for public APIs
export function calculateTotal(items: Product[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

//  Const assertions for type safety
const STATUS = {
  SUCCESS: 200,
  ERROR: 500
} as const;

//  Discriminated unions for state
type RequestState =
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string };

function handleState(state: RequestState) {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>{state.data.name}</div>;
    case 'error':
      return <div>Error: {state.error}</div>;
  }
}
```

---

## 10. Summary

### Development Workflow Comparison

**JavaScript:**
```
Write Code → Run Application → Find Bug at Runtime → Debug → Fix → Repeat
```

**TypeScript:**
```
Write Code → See Errors in Editor → Fix Immediately → Run Application → Success
```

### Real-World Impact

| Aspect | JavaScript | TypeScript |
|--------|-----------|------------|
| **Error Detection** | Runtime (production) | Compile-time (development) |
| **Debugging Time** | Hours searching | Seconds - error shown |
| **Refactoring** | Risky | Safe - compiler catches issues |
| **IDE Support** | Basic | Full IntelliSense |
| **Production Bugs** | More frequent | Significantly reduced |

### Core Concepts Covered

1. **Basic Types** - string, number, boolean with type safety and inference
2. **Arrays & Objects** - Type-safe collections, interfaces, tuples
3. **Functions** - Typed parameters, return values, optional and rest parameters
4. **Union Types & Intersection Types** - Multiple type possibilities and combinations
5. **Generics** - Reusable type-safe code with generic functions and interfaces
6. **Type Guards** - Runtime type checking with typeof, instanceof, and custom guards
7. **React Integration** - Props, state, event handlers, hooks, and children
8. **Utility Types** - Partial, Pick, Omit, Readonly, Record for type transformations
9. **Best Practices** - Patterns for writing clean, type-safe TypeScript

### Key Takeaways for React Development

**Type Safety Prevents Bugs:**
```typescript
//  JavaScript - Bug discovered at runtime
function UserProfile({ user }) {
  return <h1>{user.nmae}</h1>; // Typo - no warning!
}

//  TypeScript - Bug caught immediately
interface UserProfileProps {
  user: { name: string; email: string };
}
function UserProfile({ user }: UserProfileProps) {
  return <h1>{user.nmae}</h1>; //  Compile error: Property 'nmae' does not exist
}
```

**IntelliSense Boosts Productivity:**
- Autocomplete shows available properties and methods
- Inline documentation for functions and types
- Quick fixes for common errors
- Refactoring with confidence

**Self-Documenting Code:**
```typescript
// TypeScript interfaces serve as documentation
interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
// No separate documentation needed - types tell you everything!
```

### Why TypeScript Matters

 **Fewer Bugs** - Catch errors before code runs
 **Better DX** - IntelliSense, autocomplete, instant feedback
 **Easier Maintenance** - Self-documenting code
 **Team Collaboration** - Clear contracts and interfaces
 **Production Ready** - Industry standard for serious projects

**Bottom Line:** TypeScript adds minimal syntax but prevents countless bugs and saves hours of debugging.

---

## Additional Resources

**Official Documentation:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

**Next Step:** Complete [Lab 0](../lab/lab0.md) to practice these concepts hands-on.

---
