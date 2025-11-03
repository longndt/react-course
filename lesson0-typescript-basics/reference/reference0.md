# Reference - TypeScript Quick Lookup

> **Purpose of this file**: Quick syntax lookup, patterns, copy-paste ready code. NO concept explanations.
>
> **Use Theory0 when you need**: Understanding WHY and HOW of TypeScript.

---

## Table of Contents

1. [Basic Types Cheat Sheet](#basic-types-cheat-sheet)
2. [Function Syntax](#function-syntax)
3. [Arrays & Objects](#arrays--objects)
4. [Union & Type Aliases](#union--type-aliases)
5. [Generics Patterns](#generics-patterns)
6. [React + TypeScript Patterns](#react--typescript-patterns)
7. [Common Type Utilities](#common-type-utilities)

---

## Basic Types Cheat Sheet

```typescript
// Primitives
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let nothing: null = null;
let undef: undefined = undefined;

// Type inference (let TypeScript figure it out)
let str = "hello";        // string
let num = 42;             // number
let bool = true;          // boolean

// Arrays
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ["a", "b"];

// Objects
let obj: { x: number; y: string } = { x: 1, y: "hi" };

// Any (avoid!) and unknown
let anything: any = "can be anything";
let safe: unknown = "must check before use";
```

---

## Function Syntax

```typescript
// Basic function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const add = (a: number, b: number): number => a + b;

// Optional parameters
function greet(name: string, age?: number): string {
  return age ? `${name}, ${age}` : name;
}

// Default parameters
function greet(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}`;
}

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// Function type
type MathOp = (a: number, b: number) => number;
const multiply: MathOp = (a, b) => a * b;

// Void return (no return value)
function log(msg: string): void {
  console.log(msg);
}

// Never return (throws or infinite loop)
function throwError(msg: string): never {
  throw new Error(msg);
}
```

---

## Arrays & Objects

### Arrays

```typescript
// Typed arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b"];

// Mixed types (use union)
let mixed: (string | number)[] = [1, "a", 2];

// Tuples (fixed length, specific types)
let tuple: [string, number] = ["age", 25];
let coords: [number, number, number] = [10, 20, 30];

// Readonly arrays
let readonly: readonly number[] = [1, 2, 3];
// readonly.push(4);  // Error
```

### Objects

```typescript
// Inline object type
let user: { name: string; age: number } = { name: "John", age: 25 };

// Interface (preferred)
interface User {
  name: string;
  age: number;
  email?: string;  // Optional
}

let user: User = { name: "John", age: 25 };

// Readonly properties
interface User {
  readonly id: number;
  name: string;
}

// Index signatures
interface StringMap {
  [key: string]: string;
}

let map: StringMap = { a: "1", b: "2" };

// Nested objects
interface Address {
  street: string;
  city: string;
}

interface User {
  name: string;
  address: Address;
}
```

---

## Union & Type Aliases

### Union Types

```typescript
// Basic union
let id: string | number;
id = "abc";  // OK
id = 123;    // OK

// Literal unions
type Status = "loading" | "success" | "error";
let status: Status = "loading";

// Union of objects
type Shape = Circle | Square;

// Type guards
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

### Type Aliases

```typescript
// Simple alias
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

// Object alias
type User = {
  id: ID;
  name: string;
  status: Status;
};

// Function alias
type Callback = (data: string) => void;

// Combined types
type Success = { status: "success"; data: string };
type Error = { status: "error"; error: string };
type Result = Success | Error;
```

### Interface vs Type

```typescript
// Interface - for objects, can extend
interface User {
  name: string;
}

interface Admin extends User {
  role: string;
}

// Type - for unions, computed types
type Status = "on" | "off";
type ID = string | number;
```

---

## Generics Patterns

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let str = identity("hello");      // string
let num = identity(42);           // number

// Generic interface
interface Box<T> {
  value: T;
}

let stringBox: Box<string> = { value: "hello" };
let numberBox: Box<number> = { value: 42 };

// Multiple generics
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

let p = pair("hello", 42);  // [string, number]

// Generic constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");      // string has length
logLength([1, 2, 3]);    // array has length
// logLength(42);        // Error: number has no length

// Generic React component
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: Props<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
```

---

## React + TypeScript Patterns

### Component Props

```tsx
// Basic props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// With children
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return <div><h2>{title}</h2>{children}</div>;
}

// Extending HTML props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}
```

### Event Handlers

```tsx
// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// Input events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

// Button/click events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("clicked");
};

// Keyboard events
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") { }
};

// Select events
const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(e.target.value);
};
```

### Hooks

```tsx
import { useState, useEffect, useRef, useCallback } from 'react';

// useState
const [count, setCount] = useState(0);                    // number
const [name, setName] = useState("");                     // string
const [user, setUser] = useState<User | null>(null);      // User or null

// useState with interface
interface User {
  id: number;
  name: string;
}
const [user, setUser] = useState<User | null>(null);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);

// useRef for mutable value
const countRef = useRef<number>(0);

// useEffect (types inferred)
useEffect(() => {
  // effect
  return () => {
    // cleanup
  };
}, [deps]);

// useCallback
const handleClick = useCallback((id: number) => {
  console.log(id);
}, []);

// Custom hook
function useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```

### Context

```tsx
import { createContext, useContext } from 'react';

// Define context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    // login logic
  };
  
  const logout = () => setUser(null);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
}
```

---

## Common Type Utilities

```typescript
// Partial - all properties optional
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

// Required - all properties required
type RequiredUser = Required<PartialUser>;

// Pick - select specific properties
type UserName = Pick<User, "name">;
// { name: string; }

type UserInfo = Pick<User, "name" | "email">;
// { name: string; email: string; }

// Omit - exclude specific properties
type UserWithoutEmail = Omit<User, "email">;
// { name: string; age: number; }

// Record - create object type with specific keys
type Roles = "admin" | "user" | "guest";
type Permissions = Record<Roles, boolean>;
// { admin: boolean; user: boolean; guest: boolean; }

type StringMap = Record<string, string>;
// { [key: string]: string; }

// Readonly - all properties readonly
type ReadonlyUser = Readonly<User>;

// ReturnType - extract return type of function
function getUser() {
  return { name: "John", age: 25 };
}
type User = ReturnType<typeof getUser>;
// { name: string; age: number; }

// Parameters - extract parameter types
function greet(name: string, age: number) {}
type GreetParams = Parameters<typeof greet>;
// [string, number]

// Awaited - unwrap Promise type
type Response = Promise<{ data: string }>;
type Data = Awaited<Response>;
// { data: string; }

// NonNullable - remove null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string
```

---

## Quick Syntax Table

| Pattern | Syntax |
|---------|--------|
| **Optional property** | `age?: number` |
| **Optional parameter** | `function(age?: number)` |
| **Default parameter** | `function(age = 18)` |
| **Union type** | `string \| number` |
| **Intersection** | `A & B` |
| **Literal type** | `"yes" \| "no"` |
| **Array** | `string[]` or `Array<string>` |
| **Tuple** | `[string, number]` |
| **Function type** | `(a: number) => string` |
| **Generic** | `Array<T>`, `Promise<T>` |
| **Readonly** | `readonly number[]` |
| **Type assertion** | `value as Type` |
| **Non-null assertion** | `value!` |
| **Optional chaining** | `obj?.prop?.nested` |
| **Nullish coalescing** | `value ?? defaultValue` |

---

## Type Guards Reference

```typescript
// typeof guard
if (typeof value === "string") { }
if (typeof value === "number") { }
if (typeof value === "boolean") { }

// instanceof guard
if (value instanceof Date) { }
if (value instanceof Error) { }

// in operator
if ("property" in object) { }

// Array check
if (Array.isArray(value)) { }

// Custom type guard
function isUser(obj: any): obj is User {
  return obj && typeof obj.name === "string";
}

// Discriminated union
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  return shape.size ** 2;
}
```

---

## Common React Types

```tsx
React.ReactNode          // Any renderable content
React.ReactElement       // JSX element
React.FC<Props>          // Function component (not recommended)
React.ComponentType<P>   // Component type
React.CSSProperties      // Style object

// HTML element types
React.InputHTMLAttributes<HTMLInputElement>
React.ButtonHTMLAttributes<HTMLButtonElement>
React.FormHTMLAttributes<HTMLFormElement>
React.HTMLAttributes<HTMLDivElement>

// Event types
React.ChangeEvent<HTMLInputElement>
React.FormEvent<HTMLFormElement>
React.MouseEvent<HTMLButtonElement>
React.KeyboardEvent<HTMLInputElement>
React.FocusEvent<HTMLInputElement>

// Ref types
React.RefObject<HTMLInputElement>
React.MutableRefObject<number>
```

---

**For concepts and explanations**: See `theory0.md`
**For practice**: See `lab0.md`
