# Theory - TypeScript Fundamentals for React Development

---

## Why TypeScript for React? 🎯

**Building Better React Applications:**

- TypeScript catches errors before runtime
- Better IDE support with autocomplete and IntelliSense
- Easier to refactor and maintain large codebases
- Industry standard for professional React development
- Self-documenting code through type annotations

**Academic and Career Benefits:**

- 80%+ of modern React projects use TypeScript
- Essential skill for professional development
- Shows understanding of type safety and software engineering
- Makes debugging easier and faster
- Reduces bugs in production

---

## TypeScript vs JavaScript

| JavaScript                    | TypeScript                         |
| ----------------------------- | ---------------------------------- |
| Dynamically typed             | Statically typed                   |
| Errors at runtime             | Errors at compile time             |
| No IDE type checking          | Full IntelliSense support          |
| Flexible but error-prone      | Strict but reliable                |
| No interface/type definitions | First-class type system            |

**Key Advantage:**
- TypeScript = JavaScript + Type Safety
- All JavaScript code is valid TypeScript
- TypeScript compiles to clean, readable JavaScript

---

## 1. Basic Types

### Primitive Types

```typescript
// String
let userName: string = "John Doe";
let email: string = 'john@example.com';

// Number (integers and decimals)
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xf00d;

// Boolean
let isActive: boolean = true;
let hasPermission: boolean = false;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;

// Symbol (ES6)
let uniqueId: symbol = Symbol("id");

// BigInt (ES2020)
let bigNumber: bigint = 100n;
```

### Type Inference

```typescript
// TypeScript can infer types automatically
let message = "Hello"; // inferred as string
let count = 42;        // inferred as number
let active = true;     // inferred as boolean

// message = 123;      // ❌ Error: Type 'number' is not assignable to type 'string'
```

### Any Type (Use Sparingly!)

```typescript
// Any disables type checking
let data: any = "string";
data = 123;           // OK
data = true;          // OK
data = { x: 10 };     // OK

// ⚠️ Avoid 'any' when possible - defeats the purpose of TypeScript!
```

---

## 2. Arrays and Tuples

### Arrays

```typescript
// Array of numbers
let scores: number[] = [90, 85, 88, 92];
let grades: Array<number> = [3.8, 3.5, 4.0];

// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];
let fruits: Array<string> = ["Apple", "Banana"];

// Array of mixed types (Union)
let mixed: (string | number)[] = ["Alice", 25, "Bob", 30];

// Array of objects
interface Student {
  name: string;
  grade: number;
}
let students: Student[] = [
  { name: "Alice", grade: 90 },
  { name: "Bob", grade: 85 }
];

// Multidimensional arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6]
];
```

### Tuples

```typescript
// Fixed-length array with known types
let person: [string, number] = ["John", 25];
let coordinate: [number, number] = [10, 20];

// Named tuples (TypeScript 4.0+)
let user: [name: string, age: number, active: boolean] = ["Alice", 30, true];

// Optional tuple elements
let response: [string, number?] = ["Success"];
response = ["Error", 404];

// Rest elements in tuples
let data: [string, ...number[]] = ["Scores", 90, 85, 88];
```

---

## 3. Objects and Interfaces

### Object Type Annotations

```typescript
// Inline object type
let user: { name: string; age: number; email: string } = {
  name: "John",
  age: 25,
  email: "john@example.com"
};

// Optional properties
let person: { name: string; age?: number } = {
  name: "Alice"
};
person = { name: "Bob", age: 30 }; // Also valid
```

### Interfaces

```typescript
// Define structure of objects
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;           // Optional
  readonly createdAt: Date; // Read-only
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
};

// user.createdAt = new Date(); // ❌ Error: Cannot assign to 'createdAt'

// Interface with methods
interface Product {
  id: number;
  name: string;
  price: number;
  calculateDiscount(percent: number): number;
}

const product: Product = {
  id: 1,
  name: "Laptop",
  price: 1000,
  calculateDiscount(percent: number): number {
    return this.price * (percent / 100);
  }
};
```

### Extending Interfaces

```typescript
// Base interface
interface Person {
  name: string;
  age: number;
}

// Extended interface
interface Student extends Person {
  studentId: string;
  gpa: number;
}

const student: Student = {
  name: "Alice",
  age: 20,
  studentId: "S12345",
  gpa: 3.8
};

// Multiple inheritance
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

interface Document extends Printable, Saveable {
  title: string;
  content: string;
}
```

---

## 4. Type Aliases

### Basic Type Aliases

```typescript
// Simple alias
type ID = string | number;
type Point = { x: number; y: number };

let userId: ID = "user123";
userId = 12345; // Also valid

let coordinate: Point = { x: 10, y: 20 };
```

### Union Types

```typescript
// Variable can be one of several types
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending";
// orderStatus = "shipped"; // ❌ Error

type Result = string | number | boolean;
let value: Result = "success";
value = 200;
value = true;

// Function with union parameters
function display(value: string | number): void {
  console.log(value);
}
display("Hello");
display(42);
```

### Intersection Types

```typescript
// Combine multiple types
type Person = { name: string; age: number };
type Employee = { employeeId: string; department: string };

type Worker = Person & Employee;

const worker: Worker = {
  name: "John",
  age: 30,
  employeeId: "E12345",
  department: "IT"
};
```

### Interface vs Type Alias

```typescript
// Interfaces - better for objects
interface UserInterface {
  name: string;
  email: string;
}

// Type aliases - more flexible
type UserType = {
  name: string;
  email: string;
};

// Type aliases can do unions and intersections
type ID = string | number; // Union
type Combined = TypeA & TypeB; // Intersection

// Interfaces can be extended and merged
interface User {
  name: string;
}
interface User {
  email: string; // Declaration merging
}
```

---

## 5. Functions

### Function Type Annotations

```typescript
// Named function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Function expression
const divide: (a: number, b: number) => number = function(a, b) {
  return a / b;
};
```

### Optional and Default Parameters

```typescript
// Optional parameters (must come after required ones)
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

greet("John");              // "Hello, John!"
greet("John", "Hi");        // "Hi, John!"

// Default parameters
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}

power(5);      // 25
power(5, 3);   // 125
```

### Rest Parameters

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3);           // 6
sum(10, 20, 30, 40);    // 100
```

### Function Overloading

```typescript
// Overload signatures
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

// Implementation
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("Invalid arguments");
}

combine("Hello", "World");  // "HelloWorld"
combine(10, 20);            // 30
```

---

## 6. Generics

### Basic Generics

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

identity<string>("Hello");   // Returns string
identity<number>(42);        // Returns number
identity(true);              // Type inferred as boolean

// Generic array function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

getFirstElement([1, 2, 3]);           // Returns number
getFirstElement(["a", "b", "c"]);     // Returns string
```

### Generic Interfaces

```typescript
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "Hello" };

// Generic interface with multiple types
interface Pair<K, V> {
  key: K;
  value: V;
}

const pair: Pair<string, number> = { key: "age", value: 25 };
```

### Generic Classes

```typescript
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  removeItem(item: T): void {
    this.data = this.data.filter(i => i !== item);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
textStorage.addItem("World");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
```

### Generic Constraints

```typescript
// Constrain generic type
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("Hello");        // 5
logLength([1, 2, 3]);      // 3
// logLength(123);         // ❌ Error: number doesn't have length
```

---

## 7. Utility Types

### Partial<T>

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Make all properties optional
type PartialUser = Partial<User>;

const updateUser: PartialUser = {
  name: "John" // Only updating name
};
```

### Required<T>

```typescript
interface Config {
  host?: string;
  port?: number;
}

// Make all properties required
type RequiredConfig = Required<Config>;

const config: RequiredConfig = {
  host: "localhost",
  port: 3000 // Both are now required
};
```

### Readonly<T>

```typescript
interface Point {
  x: number;
  y: number;
}

const point: Readonly<Point> = { x: 10, y: 20 };
// point.x = 30; // ❌ Error: Cannot assign to 'x'
```

### Pick<T, K>

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Pick specific properties
type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
  id: 1,
  name: "John"
};
```

### Omit<T, K>

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Omit specific properties
type PublicUser = Omit<User, "password">;

const publicUser: PublicUser = {
  id: 1,
  name: "John",
  email: "john@example.com"
  // No password property
};
```

### Record<K, T>

```typescript
// Create object type with specific keys and value types
type Roles = "admin" | "user" | "guest";
type Permissions = Record<Roles, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};
```

---

## 8. Type Guards and Narrowing

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

### instanceof Guards

```typescript
class Dog {
  bark(): void {
    console.log("Woof!");
  }
}

class Cat {
  meow(): void {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

### Custom Type Guards

```typescript
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

// Type predicate
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
```

---

## 9. TypeScript with React - Essential Concepts

> 💡 **Why this matters**: Understanding how TypeScript works with React is crucial before you start Lesson 1.

### What is TSX?

**TSX (TypeScript + JSX)** is the file extension for React components written in TypeScript.

- **JSX** = JavaScript XML (HTML-like syntax in JavaScript)
- **TSX** = TypeScript XML (HTML-like syntax in TypeScript)
- TSX files use `.tsx` extension (not `.ts`)

**Example Comparison:**

```typescript
// Regular TypeScript (.ts file)
function greet(name: string): string {
  return `Hello, ${name}`;
}

// React with TSX (.tsx file)
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;  // ← This is TSX syntax
}
```

### Why Use TypeScript with React?

**Type Safety for Components:**

```typescript
// Without TypeScript - Runtime errors possible ❌
function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
  // What if onClick is undefined? What if label is a number?
}

// With TypeScript - Compile-time safety ✅
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
// TypeScript ensures you pass correct props!
```

### React Component Types

**1. Functional Components with Props**

```typescript
// Define props interface
interface WelcomeProps {
  name: string;
  age: number;
  isStudent?: boolean;  // Optional prop
}

// Component with typed props
function Welcome({ name, age, isStudent = true }: WelcomeProps) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Age: {age}</p>
      {isStudent && <span>Student</span>}
    </div>
  );
}

// Usage - TypeScript checks the props!
<Welcome name="John" age={20} />  // ✅ Valid
<Welcome name={123} age="20" />   // ❌ Type error!
```

**2. Event Handlers**

```typescript
// Click events
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log('Button clicked!', event.currentTarget);
}

// Input change events
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log('Input value:', event.target.value);
}

// Form submit events
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  console.log('Form submitted!');
}

// Component using events
function EventExample() {
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <input onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

**3. State Types (Preview - Lesson 2)**

```typescript
import { useState } from 'react';

// Simple state
function Counter() {
  const [count, setCount] = useState<number>(0);  // Type: number
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Object state
interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);  // Type: User or null

  // TypeScript knows user can be null!
  return (
    <div>
      {user ? <p>{user.name}</p> : <p>Loading...</p>}
    </div>
  );
}

// Array state
function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);  // Type: array of strings

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
```

**4. Children Props**

```typescript
import { ReactNode } from 'react';

// Component that accepts children
interface CardProps {
  title: string;
  children: ReactNode;  // Can be any valid React content
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
<Card title="Profile">
  <p>Name: John</p>
  <p>Age: 20</p>
</Card>
```

### Common React TypeScript Patterns

**1. Optional Props with Defaults**

```typescript
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';  // Optional with union type
  disabled?: boolean;
}

function Button({
  label,
  variant = 'primary',  // Default value
  disabled = false
}: ButtonProps) {
  return (
    <button className={`btn-${variant}`} disabled={disabled}>
      {label}
    </button>
  );
}
```

**2. Component Props with Callbacks**

```typescript
interface SearchProps {
  onSearch: (query: string) => void;  // Function that takes string, returns nothing
  placeholder?: string;
}

function SearchBar({ onSearch, placeholder = "Search..." }: SearchProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input name="query" placeholder={placeholder} />
      <button type="submit">Search</button>
    </form>
  );
}
```

**3. Generic Components (Advanced)**

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage with different types
<List
  items={[1, 2, 3]}
  renderItem={(num) => <span>{num * 2}</span>}
/>

<List
  items={['a', 'b', 'c']}
  renderItem={(str) => <span>{str.toUpperCase()}</span>}
/>
```

### React-Specific Type Utilities

```typescript
import { FC, ReactNode, CSSProperties } from 'react';

// 1. FC (FunctionComponent) - alternative syntax
const Button: FC<{ label: string }> = ({ label }) => {
  return <button>{label}</button>;
};

// 2. ReactNode - for children
interface Props {
  children: ReactNode;
}

// 3. CSSProperties - for inline styles
interface StyledDivProps {
  style?: CSSProperties;
}

function StyledDiv({ style }: StyledDivProps) {
  return <div style={style}>Content</div>;
}

// 4. HTMLAttributes - for extending native HTML elements
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function CustomInput({ label, ...inputProps }: CustomInputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
}
```

### Key Takeaways for React + TypeScript

✅ **Components:**
- Use `.tsx` extension for React components
- Always define prop interfaces/types
- Use `ReactNode` for children

✅ **Events:**
- `React.MouseEvent<HTMLElement>` for clicks
- `React.ChangeEvent<HTMLInputElement>` for inputs
- `React.FormEvent<HTMLFormElement>` for forms

✅ **State (Lesson 2):**
- `useState<Type>()` for typed state
- Handle nullable/undefined with `Type | null`
- Use interfaces for complex state objects

✅ **Props:**
- Define interfaces for all component props
- Use optional (`?`) for non-required props
- Provide default values in destructuring

> 💡 **Next Steps**: These concepts will be used extensively in Lessons 1-5. You'll see them in action starting with Lesson 1!

---

## 10. Best Practices

### ✅ Do's

```typescript
// ✅ Use explicit types for function parameters
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ✅ Use interfaces for object shapes
interface User {
  name: string;
  email: string;
}

// ✅ Use union types for multiple possibilities
type Status = "pending" | "success" | "error";

// ✅ Use optional chaining
const email = user?.profile?.email;

// ✅ Use nullish coalescing
const port = config.port ?? 3000;
```

### ❌ Don'ts

```typescript
// ❌ Avoid 'any' type
let data: any = "string"; // Bad!

// ❌ Don't ignore TypeScript errors
// @ts-ignore  // Bad practice!

// ❌ Don't use 'Function' type
let callback: Function; // Use specific function signature

// ❌ Don't duplicate type definitions
// Define types once and reuse them
```

---

## Key Takeaways

1. **Type Safety**: Catch errors at compile time, not runtime
2. **Better IDE Support**: IntelliSense and autocomplete
3. **Self-Documenting**: Types serve as documentation
4. **Refactoring**: Easier to change code with confidence
5. **Scalability**: Essential for large applications

---

## Next Steps

1. ✅ Practice with **Lab 0** exercises
2. ✅ Explore **Demo** examples
3. ✅ Take the **Quiz** to test understanding
4. ✅ Move to **Lesson 1** - React with TypeScript

---

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

---

**Ready to practice?** Head to Lab 0! 🚀
