# Theory - TypeScript Prerequisites

> **Purpose of this file**: Explains **WHY** use TypeScript, **HOW** types work, and **WHEN** to use them. Code examples include comments to understand concepts.
> 
> **Use Reference0 when you need**: Quick syntax lookup, copy-paste ready code patterns.

---

## Table of Contents

1. [Why TypeScript for React?](#1-why-typescript-for-react)
2. [Basic Types & Type Inference](#2-basic-types--type-inference)
3. [Functions](#3-functions)
4. [Arrays & Objects](#4-arrays--objects)
5. [Union Types & Type Aliases](#5-union-types--type-aliases)
6. [Generics](#6-generics)
7. [TypeScript with React](#7-typescript-with-react)
8. [Common Mistakes](#8-common-mistakes)

---

## 1. Why TypeScript for React?

### The Core Problem TypeScript Solves

**JavaScript's Flexibility = Hidden Bugs:**

```javascript
// JavaScript - This compiles fine but crashes at runtime
function greet(user) {
  return `Hello, ${user.name.toUpperCase()}!`;
}

greet({ name: 123 });        // 💥 Runtime error: toUpperCase is not a function
greet({ username: "John" }); // 💥 Runtime error: Cannot read property 'toUpperCase' of undefined
greet();                     // 💥 Runtime error: Cannot read property 'name' of undefined
```

**TypeScript Catches These BEFORE Runtime:**

```typescript
// TypeScript - Errors shown in your editor immediately
interface User {
  name: string;
}

function greet(user: User): string {
  return `Hello, ${user.name.toUpperCase()}!`;
}

// ❌ Error: Type 'number' is not assignable to type 'string'
// greet({ name: 123 });

// ❌ Error: Property 'name' is missing
// greet({ username: "John" });

// ❌ Error: Expected 1 arguments, but got 0
// greet();

// ✅ Correct usage
greet({ name: "John" });
```

**Key Insight**: TypeScript shifts errors from **runtime** (when users see them) to **compile time** (when developers see them).

### Why React + TypeScript?

| Aspect | JavaScript | TypeScript |
|--------|-----------|------------|
| **Props validation** | Runtime (PropTypes) | Compile time |
| **IDE autocomplete** | Limited | Full IntelliSense |
| **Refactoring** | Manual find-replace | Safe auto-refactor |
| **Documentation** | Separate docs needed | Self-documenting types |
| **Team collaboration** | Need to read code | Types show contract |

**Industry Reality**: 80%+ of professional React projects use TypeScript.

---

## 2. Basic Types & Type Inference

### The Magic of Type Inference

**You Don't Always Need Explicit Types:**

```typescript
// ❌ Redundant - TypeScript already knows!
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;

// ✅ Better - Let TypeScript infer obvious types
let name = "John";        // Type: string (inferred)
let age = 25;             // Type: number (inferred)
let isActive = true;      // Type: boolean (inferred)

// ✅ Use explicit types when it's NOT obvious
let userId: string | number;        // Could be either
let user: { name: string; age: number } = {
  name: "John",
  age: 25
};
```

**Rule of Thumb**: Let TypeScript infer when obvious, annotate when you need to enforce a contract.

### How Type Checking Prevents Bugs

```typescript
// JavaScript - Silent failures
let count = "5";
count = count + 1;       // "51" (string concatenation!) 🐛
```

```typescript
// TypeScript - Caught immediately
let count = 5;           // Type: number (inferred)
count = "hello";         // ❌ Error: Type 'string' is not assignable to type 'number'
count = count + 1;       // ✅ 6 (correct math)
```

**Why This Matters**: Type errors account for ~15% of all JavaScript bugs in production (Microsoft research).

---

## 3. Functions

### Why Function Types Matter

**The Problem:**

```javascript
// JavaScript - Function can break in multiple ways
function calculateDiscount(price, discountPercent) {
  return price - (price * discountPercent / 100);
}

calculateDiscount(100, 20);           // ✅ 80
calculateDiscount("100", "20");       // ❌ Weird string math
calculateDiscount(100);               // ❌ NaN (undefined * number)
calculateDiscount(100, 20, "extra");  // ✅ Works but ignores extra param (bug?)
```

**The Solution:**

```typescript
// TypeScript - Contract is clear and enforced
function calculateDiscount(price: number, discountPercent: number): number {
  return price - (price * discountPercent / 100);
}

// calculateDiscount("100", "20");       // ❌ Compile error
// calculateDiscount(100);               // ❌ Missing argument
// calculateDiscount(100, 20, "extra");  // ❌ Too many arguments
calculateDiscount(100, 20);              // ✅ Only this works
```

### Optional vs Default Parameters

```typescript
// Optional parameter - might be undefined
function greet(name: string, age?: number): string {
  // Must handle undefined case!
  if (age !== undefined) {
    return `Hello, ${name}! You are ${age} years old.`;
  }
  return `Hello, ${name}!`;
}

greet("John");      // ✅ "Hello, John!"
greet("John", 25);  // ✅ "Hello, John! You are 25 years old."

// Default parameter - never undefined
function greetWithDefault(name: string, greeting: string = "Hello"): string {
  // greeting is always a string, no need to check!
  return `${greeting}, ${name}!`;
}

greetWithDefault("John");           // ✅ "Hello, John!"
greetWithDefault("John", "Hi");     // ✅ "Hi, John!"
```

**When to use which?**
- **Optional (`?`)**: When value being missing is meaningful (different behavior)
- **Default (`=`)**: When you just want a fallback value

---

## 4. Arrays & Objects

### Why Type Arrays?

```javascript
// JavaScript - Mixed types cause runtime errors
let userIds = [1, 2, 3];
userIds.push("new-id");              // Allowed!
userIds.forEach(id => {
  console.log(id.toFixed(2));        // 💥 Crashes on "new-id"
});
```

```typescript
// TypeScript - Consistency enforced
let userIds: number[] = [1, 2, 3];
// userIds.push("new-id");           // ❌ Error: Argument of type 'string' is not assignable
userIds.push(4);                     // ✅ Works
userIds.forEach(id => {
  console.log(id.toFixed(2));        // ✅ Safe - id is always number
});
```

### Interfaces: Contracts for Objects

**Why Interfaces?**

```typescript
// Without interface - Typos and mistakes slip through
function renderUser(user) {
  return `${user.nam} - ${user.emial}`;  // Typos! But JavaScript won't tell you
}

// With interface - Caught immediately
interface User {
  name: string;
  email: string;
  age?: number;  // Optional property
}

function renderUserTyped(user: User): string {
  // return `${user.nam} - ${user.emial}`;  // ❌ Error: Property 'nam' does not exist
  return `${user.name} - ${user.email}`;     // ✅ Autocomplete helps you!
}
```

**When to use Interface vs Type?**

```typescript
// ✅ Use Interface for objects (can be extended)
interface User {
  name: string;
  email: string;
}

interface Admin extends User {
  role: string;  // Extends User
}

// ✅ Use Type for unions, primitives, computed types
type Status = 'loading' | 'success' | 'error';
type ID = string | number;
type UserOrAdmin = User | Admin;
```

---

## 5. Union Types & Type Aliases

### Union Types: "This OR That"

**The Problem They Solve:**

```javascript
// JavaScript - Function accepts anything, chaos ensues
function formatId(id) {
  return `ID: ${id}`;
}

formatId(123);           // "ID: 123"
formatId("abc");         // "ID: abc"
formatId({ x: 1 });      // "ID: [object Object]" 🐛
formatId(null);          // "ID: null" 🐛
```

**TypeScript Solution:**

```typescript
// Explicitly: "id can ONLY be string or number"
function formatId(id: string | number): string {
  return `ID: ${id}`;
}

formatId(123);           // ✅
formatId("abc");         // ✅
// formatId({ x: 1 });   // ❌ Error
// formatId(null);       // ❌ Error
```

### Type Guards: Working with Unions

```typescript
function processValue(value: string | number) {
  // TypeScript doesn't know which type yet
  // value.toUpperCase();  // ❌ Error: toUpperCase doesn't exist on number
  // value.toFixed(2);     // ❌ Error: toFixed doesn't exist on string
  
  // Type guard narrows the type
  if (typeof value === 'string') {
    // TypeScript KNOWS value is string here
    return value.toUpperCase();  // ✅
  } else {
    // TypeScript KNOWS value is number here
    return value.toFixed(2);     // ✅
  }
}
```

**Why This Matters**: Type guards let TypeScript understand your runtime logic and provide better autocomplete.

### Type Aliases: Reusable Type Names

```typescript
// Without type alias - repetitive and error-prone
function setStatus(status: 'loading' | 'success' | 'error') { }
function getStatus(): 'loading' | 'success' | 'error' { return 'loading'; }

// With type alias - DRY and maintainable
type Status = 'loading' | 'success' | 'error';

function setStatusTyped(status: Status) { }
function getStatusTyped(): Status { return 'loading'; }
```

---

## 6. Generics

### Why Generics? Avoid Type Duplication

**The Problem:**

```typescript
// Without generics - Need separate functions for each type!
function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstUser(arr: User[]): User {
  return arr[0];
}
// ... need infinite functions for every type! 😱
```

**The Solution - Generics:**

```typescript
// One function that works for ANY type!
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

let firstString = getFirst(["a", "b"]);     // Type: string (inferred!)
let firstNumber = getFirst([1, 2, 3]);      // Type: number (inferred!)
let firstUser = getFirst([user1, user2]);   // Type: User (inferred!)
```

**How to Read Generics:**
- `<T>` = "This function works with a type I'll call T"
- `T[]` = "An array of T"
- `: T` = "Returns a T"

### Real-World Example: API Responses

```typescript
// Generic interface for API responses
interface ApiResponse<T> {
  data: T;           // The actual data (type varies!)
  status: number;
  message: string;
}

// Now works for any data type!
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// Type-safe responses for different data
type UserResponse = ApiResponse<User>;       // data is User
type ProductResponse = ApiResponse<Product>; // data is Product
type UsersResponse = ApiResponse<User[]>;    // data is User[]

// Usage
async function fetchUser(): Promise<UserResponse> {
  const response = await fetch('/api/user');
  return response.json();  // TypeScript knows this should match UserResponse
}
```

**Why This Matters**: Write once, use everywhere. Type safety + reusability.

---

## 7. TypeScript with React

### Props: The Component Contract

**Without TypeScript:**

```jsx
// JavaScript - Props are a mystery
function Button({ label, onClick, disabled }) {
  // What type is label? string? ReactNode?
  // Is onClick required? Does it receive arguments?
  // What about typos? <Button lable="..." />
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
```

**With TypeScript:**

```tsx
// TypeScript - Clear contract
interface ButtonProps {
  label: string;               // Must be string
  onClick: () => void;         // Required function
  disabled?: boolean;          // Optional boolean
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  // TypeScript enforces the contract!
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// Usage
<Button label="Click" onClick={() => {}} />                    // ✅
// <Button lable="Click" onClick={() => {}} />                 // ❌ Typo caught!
// <Button label={123} onClick={() => {}} />                   // ❌ Wrong type!
// <Button label="Click" />                                    // ❌ Missing onClick!
```

### Event Handlers: Type-Safe Events

```tsx
function Form() {
  // ✅ Typed event - full autocomplete for event properties
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // ✅ TypeScript knows preventDefault exists
    // e.target.value    // ❌ TypeScript knows FormEvent doesn't have value
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);  // ✅ TypeScript knows this is valid
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Why Type Events?** IDE autocomplete shows you exactly what properties are available!

### State: Type-Safe useState

```tsx
import { useState } from 'react';

interface User {
  id: number;
  name: string;
}

function UserProfile() {
  // TypeScript infers: user is User | null
  const [user, setUser] = useState<User | null>(null);
  
  // ✅ TypeScript forces you to handle null case
  if (!user) {
    return <div>No user</div>;
  }
  
  // After null check, TypeScript knows user is NOT null
  return <div>{user.name}</div>;  // ✅ Safe!
}

function Counter() {
  // TypeScript infers: count is number
  const [count, setCount] = useState(0);
  
  // setCount("hello");  // ❌ Error: string not assignable to number
  setCount(count + 1);   // ✅ Works
  
  return <div>{count}</div>;
}
```

**Key Pattern**: Use `Type | null` for async data, let TypeScript infer for simple values.

---

## 8. Common Mistakes

### Mistake 1: Using `any` (Defeating TypeScript)

```typescript
// ❌ BAD: Using 'any' removes all type safety
function processData(data: any) {
  return data.nonExistentProperty;  // No error, but will crash!
}

// ✅ GOOD: Use proper types
interface Data {
  value: string;
}

function processDataTyped(data: Data) {
  // return data.nonExistentProperty;  // ❌ Caught!
  return data.value;                   // ✅ Safe
}

// ✅ GOOD: If you really don't know the type, use 'unknown'
function processUnknown(data: unknown) {
  // Must check type before using
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as Data).value;
  }
}
```

### Mistake 2: Not Handling Optional Properties

```typescript
interface User {
  name: string;
  email?: string;  // Optional!
}

// ❌ BAD: Assuming optional property exists
function sendEmail(user: User) {
  return user.email.toLowerCase();  // 💥 Crash if email is undefined!
}

// ✅ GOOD: Always check optional properties
function sendEmailSafe(user: User) {
  if (user.email) {
    return user.email.toLowerCase();  // Safe
  }
  return null;
}

// ✅ GOOD: Use optional chaining
function sendEmailChain(user: User) {
  return user.email?.toLowerCase() ?? null;  // Safe + concise
}
```

### Mistake 3: Type Assertions Without Validation

```typescript
// ❌ BAD: Blindly asserting types
const data = JSON.parse(response) as User;  // What if it's not actually a User?
console.log(data.name.toUpperCase());       // 💥 Might crash!

// ✅ GOOD: Validate before asserting
function isUser(obj: any): obj is User {
  return obj && typeof obj.name === 'string' && typeof obj.email === 'string';
}

const data = JSON.parse(response);
if (isUser(data)) {
  console.log(data.name.toUpperCase());  // ✅ Safe!
} else {
  console.error('Invalid user data');
}
```

---

## Next Steps

You now understand:
- ✅ **Why** TypeScript prevents bugs
- ✅ **How** types work (inference, unions, generics)
- ✅ **When** to use explicit types vs inference
- ✅ **How** to use TypeScript with React

**Practice**: Head to `lab0.md` for hands-on exercises!

**Quick Reference**: See `reference0.md` for syntax cheat sheets.
