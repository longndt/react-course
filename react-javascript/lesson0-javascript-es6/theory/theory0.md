# Theory - JavaScript ES6+ Prerequisites

---

##  Table of Contents

1. [Why Modern JavaScript for React?](#why-modern-javascript-for-react-)
2. [JavaScript ES6+ Overview](#javascript-es6-overview)
3. [Variables & Scope](#1-variables--scope)
4. [Arrow Functions](#2-arrow-functions)
5. [Destructuring](#3-destructuring)
6. [Spread & Rest Operators](#4-spread--rest-operators)
7. [Array Methods](#5-array-methods)
8. [Promises & Async/Await](#6-promises--asyncawait)
9. [ES6 Modules](#7-es6-modules)
10. [Classes & OOP](#8-classes--oop)
11. [Modern Features (ES2020+)](#9-modern-features-es2020)
12. [Best Practices](#10-best-practices)

---

## Why Modern JavaScript for React?

**Building Better React Applications:**
- Modern JavaScript (ES6+) provides cleaner, more readable code
- Essential features like arrow functions, destructuring are used extensively in React
- Async/await makes API calls straightforward
- Modules enable better code organization
- Industry standard for React development

**Key Facts:**
- React heavily relies on ES6+ features
- Understanding modern JavaScript is prerequisite for React
- Improves code quality and maintainability
- Makes learning React much easier

**What You'll Learn:**
- ES6+ syntax and features used in React
- Functional programming concepts
- Asynchronous JavaScript patterns
- Module system and code organization

---

## JavaScript ES6+ Overview

**Evolution Timeline:**
- **ES5 (2009):** Traditional JavaScript
- **ES6/ES2015 (2015):** Major update - classes, modules, arrow functions
- **ES2016-ES2020:** Yearly updates with new features
- **ES2021-2025:** Latest features - optional chaining, nullish coalescing, etc.

**Key ES6+ Features:**

| Feature | Before ES6 | After ES6 |
|---------|------------|-----------|
| Variables | `var` | `let`, `const` |
| Functions | `function() {}` | `() => {}` |
| Modules | CommonJS/AMD | `import`/`export` |
| Classes | Prototype | `class` keyword |
| Strings | Concatenation | Template literals |
| Objects | Verbose syntax | Shorthand, destructuring |

---

## 1. Variables & Scope

###  var vs let vs const

**The Problem with `var`:**
```javascript
// var is function-scoped and hoisted
function example() {
  console.log(x); // undefined (hoisted)
  var x = 10;
  
  if (true) {
    var x = 20; // Same variable!
    console.log(x); // 20
  }
  
  console.log(x); // 20 (modified by if block)
}
```

**The Solution: `let` and `const`:**
```javascript
// let and const are block-scoped
function example() {
  // console.log(x); //  ReferenceError (TDZ)
  let x = 10;
  
  if (true) {
    let x = 20; // Different variable
    console.log(x); // 20
  }
  
  console.log(x); // 10 (not affected)
}

// const prevents reassignment
const PI = 3.14159;
// PI = 3.14; //  Error: Assignment to constant variable

// const objects can be modified (not reassigned)
const user = { name: "John" };
user.name = "Jane"; //  OK
user.age = 25;      //  OK
// user = {}; //  Error: Assignment to constant variable
```

### Block Scope

```javascript
// Block scope with let/const
{
  let blockVar = "I'm in a block";
  const blockConst = "Me too";
  console.log(blockVar); //  OK
}
// console.log(blockVar); //  Error: blockVar is not defined

// Loop variables
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
  // Prints: 0, 1, 2 (each iteration has own i)
}

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
  // Prints: 3, 3, 3 (all share same i)
}
```

### Best Practices

```javascript
//  Use const by default
const API_URL = "https://api.example.com";
const users = ["John", "Jane"];

//  Use let only when reassignment is needed
let counter = 0;
counter++;

//  Avoid var
var oldStyle = "Don't use this";

//  Descriptive names
const isUserLoggedIn = true;
const maxRetries = 3;

//  Single letter (except loops)
const u = "user"; // Bad
const i = 0; // OK in loops
```

---

## 2. Arrow Functions

###  Traditional vs Arrow Functions

**Traditional Function:**
```javascript
// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const subtract = function(a, b) {
  return a - b;
};
```

**Arrow Function:**
```javascript
// Arrow function
const add = (a, b) => {
  return a + b;
};

// Implicit return (one expression)
const subtract = (a, b) => a - b;

// Single parameter (no parentheses)
const square = x => x * x;

// No parameters
const getRandomNumber = () => Math.random();
```

### The `this` Keyword Difference

**Problem with Traditional Functions:**
```javascript
const user = {
  name: "John",
  hobbies: ["reading", "coding"],
  
  printHobbies: function() {
    this.hobbies.forEach(function(hobby) {
      //  this is undefined (or window in non-strict mode)
      console.log(this.name + " likes " + hobby);
    });
  }
};
```

**Solution with Arrow Functions:**
```javascript
const user = {
  name: "John",
  hobbies: ["reading", "coding"],
  
  printHobbies: function() {
    this.hobbies.forEach(hobby => {
      //  this refers to user object
      console.log(`${this.name} likes ${hobby}`);
    });
  }
};
```

### When to Use Arrow Functions

```javascript
//  Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

//  Callbacks
setTimeout(() => {
  console.log("Delayed");
}, 1000);

//  Promise chains
fetch("/api/users")
  .then(response => response.json())
  .then(data => console.log(data));

//  Don't use for methods (need dynamic this)
const calculator = {
  value: 0,
  add: (n) => {
    this.value += n; //  this is undefined
  }
};

//  Use traditional function for methods
const calculator = {
  value: 0,
  add(n) {
    this.value += n; //  this refers to calculator
  }
};
```

---

## 3. Destructuring

### Object Destructuring

**Before ES6:**
```javascript
const user = {
  name: "John",
  age: 25,
  email: "john@example.com"
};

const name = user.name;
const age = user.age;
const email = user.email;
```

**With ES6:**
```javascript
const user = {
  name: "John",
  age: 25,
  email: "john@example.com"
};

// Basic destructuring
const { name, age, email } = user;

// Rename variables
const { name: userName, age: userAge } = user;

// Default values
const { name, country = "USA" } = user;

// Nested destructuring
const user = {
  name: "John",
  address: {
    city: "New York",
    zip: "10001"
  }
};
const { address: { city, zip } } = user;
```

### Array Destructuring

```javascript
const colors = ["red", "green", "blue"];

// Basic destructuring
const [first, second, third] = colors;

// Skip elements
const [primary, , tertiary] = colors;

// Rest pattern
const [first, ...rest] = colors;
// first = "red"
// rest = ["green", "blue"]

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

### Function Parameters

```javascript
// Object destructuring in parameters
function greet({ name, age }) {
  console.log(`Hello ${name}, you are ${age} years old`);
}
greet({ name: "John", age: 25 });

// With defaults
function createUser({ name, age = 18, role = "user" }) {
  return { name, age, role };
}

// Array destructuring in parameters
function getCoordinates([x, y]) {
  console.log(`X: ${x}, Y: ${y}`);
}
getCoordinates([10, 20]);
```

### React Use Cases

```javascript
// Component props
function UserCard({ name, email, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// useState hook
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);

// Event handlers
function handleSubmit({ target }) {
  const { name, value } = target;
  console.log(name, value);
}
```

---

## 4. Spread & Rest Operators

### Spread Operator (`...`)

**Array Spread:**
```javascript
// Copy arrays
const original = [1, 2, 3];
const copy = [...original];

// Concatenate arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Add elements
const numbers = [2, 3, 4];
const withEnds = [1, ...numbers, 5]; // [1, 2, 3, 4, 5]

// Function arguments
const numbers = [5, 10, 15];
Math.max(...numbers); // 15
```

**Object Spread:**
```javascript
// Copy objects
const user = { name: "John", age: 25 };
const userCopy = { ...user };

// Merge objects
const defaults = { theme: "light", lang: "en" };
const userSettings = { theme: "dark" };
const settings = { ...defaults, ...userSettings };
// { theme: "dark", lang: "en" }

// Add/override properties
const user = { name: "John" };
const updatedUser = { ...user, age: 25, name: "Jane" };
// { name: "Jane", age: 25 }
```

### Rest Operator (`...`)

**Function Parameters:**
```javascript
// Collect arguments
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4, 5); // 15

// Mix with regular parameters
function greet(greeting, ...names) {
  return `${greeting} ${names.join(", ")}!`;
}
greet("Hello", "John", "Jane", "Bob");
// "Hello John, Jane, Bob!"
```

**Array/Object Rest:**
```javascript
// Array rest
const [first, ...rest] = [1, 2, 3, 4, 5];
// first = 1
// rest = [2, 3, 4, 5]

// Object rest
const { name, age, ...otherInfo } = {
  name: "John",
  age: 25,
  email: "john@example.com",
  phone: "123-456"
};
// name = "John"
// age = 25
// otherInfo = { email: "john@example.com", phone: "123-456" }
```

### React Use Cases

```javascript
// Component props
function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
<Button onClick={handleClick} className="btn" disabled>
  Click Me
</Button>

// State updates (immutability)
const [users, setUsers] = useState([]);
setUsers([...users, newUser]); // Add
setUsers(users.filter(u => u.id !== id)); // Remove
setUsers(users.map(u => u.id === id ? { ...u, name: "New Name" } : u)); // Update
```

---

## 5. Array Methods

### Essential Methods for React

**`map()` - Transform Arrays:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// React: Render lists
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];
const userElements = users.map(user => (
  <div key={user.id}>{user.name}</div>
));
```

**`filter()` - Filter Arrays:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// React: Filter data
const activeUsers = users.filter(user => user.isActive);
```

**`reduce()` - Aggregate Values:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, n) => total + n, 0);
// 15

const max = numbers.reduce((max, n) => n > max ? n : max);
// 5

// Object from array
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];
const userMap = users.reduce((map, user) => {
  map[user.id] = user;
  return map;
}, {});
// { 1: { id: 1, name: "John" }, 2: { id: 2, name: "Jane" } }
```

**`find()` & `findIndex()`:**
```javascript
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" }
];

const user = users.find(u => u.id === 2);
// { id: 2, name: "Jane" }

const index = users.findIndex(u => u.id === 2);
// 1
```

**`some()` & `every()`:**
```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.some(n => n > 3);   // true
numbers.every(n => n > 3);  // false

// React: Validation
const hasErrors = fields.some(field => !field.valid);
const allComplete = tasks.every(task => task.completed);
```

**`sort()`:**
```javascript
const numbers = [3, 1, 4, 1, 5, 9];
numbers.sort((a, b) => a - b); // Ascending
numbers.sort((a, b) => b - a); // Descending

// Sort objects
const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 22 },
  { name: "Bob", age: 30 }
];
users.sort((a, b) => a.age - b.age); // Sort by age
```

### Method Chaining

```javascript
const users = [
  { id: 1, name: "John", age: 25, active: true },
  { id: 2, name: "Jane", age: 22, active: false },
  { id: 3, name: "Bob", age: 30, active: true }
];

// Get names of active users, sorted
const activeNames = users
  .filter(u => u.active)
  .map(u => u.name)
  .sort();
// ["Bob", "John"]

// Complex transformation
const result = users
  .filter(u => u.age > 23)
  .map(u => ({ ...u, category: "senior" }))
  .sort((a, b) => b.age - a.age);
```

---

## 6. Promises & Async/Await

### Promises

**Basic Promise:**
```javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed!");
    }
  }, 1000);
});

// Using promise
promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

**Promise Chaining:**
```javascript
fetch("/api/user/1")
  .then(response => response.json())
  .then(user => fetch(`/api/posts?userId=${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

**Promise Methods:**
```javascript
// Promise.all - Wait for all
const promise1 = fetch("/api/users");
const promise2 = fetch("/api/posts");
const promise3 = fetch("/api/comments");

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    console.log("All loaded!");
  })
  .catch(error => console.error("One failed:", error));

// Promise.race - First to finish
Promise.race([promise1, promise2, promise3])
  .then(result => console.log("First result:", result));

// Promise.allSettled - Wait for all (ignore errors)
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach(result => {
      if (result.status === "fulfilled") {
        console.log("Success:", result.value);
      } else {
        console.log("Failed:", result.reason);
      }
    });
  });
```

### Async/Await

**Basic Async/Await:**
```javascript
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user;
}

// Using async function
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

**Error Handling:**
```javascript
async function fetchUserSafely(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
```

**Sequential vs Parallel:**
```javascript
// Sequential (slow - waits for each)
async function loadSequential() {
  const user = await fetch("/api/user").then(r => r.json());
  const posts = await fetch("/api/posts").then(r => r.json());
  const comments = await fetch("/api/comments").then(r => r.json());
  return { user, posts, comments };
}

// Parallel (fast - runs simultaneously)
async function loadParallel() {
  const [user, posts, comments] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/comments").then(r => r.json())
  ]);
  return { user, posts, comments };
}
```

### React Use Cases

```javascript
// useEffect with async
useEffect(() => {
  async function loadData() {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  loadData();
}, []);

// Event handlers
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error("Failed to create user");
    
    const user = await response.json();
    setUsers([...users, user]);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
```

---

## 7. ES6 Modules

### Export Syntax

**Named Exports:**
```javascript
// utils.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export class Calculator {
  // ...
}

// Alternative syntax
const PI = 3.14159;
function add(a, b) { return a + b; }
class Calculator { /* ... */ }

export { PI, add, Calculator };
```

**Default Export:**
```javascript
// User.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Or
class User {
  constructor(name) {
    this.name = name;
  }
}
export default User;

// For functions
export default function greet(name) {
  return `Hello, ${name}!`;
}
```

**Mixed Exports:**
```javascript
// api.js
export const API_URL = "https://api.example.com";
export const TIMEOUT = 5000;

export default {
  get(url) { /* ... */ },
  post(url, data) { /* ... */ }
};
```

### Import Syntax

**Named Imports:**
```javascript
// Import specific exports
import { PI, add } from './utils.js';

// Import with rename
import { add as sum } from './utils.js';

// Import all
import * as utils from './utils.js';
// Usage: utils.PI, utils.add()
```

**Default Import:**
```javascript
// Can use any name
import User from './User.js';
import MyUser from './User.js'; // Same thing
```

**Mixed Imports:**
```javascript
import api, { API_URL, TIMEOUT } from './api.js';
```

**Dynamic Import:**
```javascript
// Load module conditionally
if (condition) {
  const module = await import('./module.js');
  module.doSomething();
}

// Code splitting in React
const LazyComponent = lazy(() => import('./Component.jsx'));
```

### Best Practices

```javascript
//  Use index.js for barrel exports
// components/index.js
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';

// Usage
import { Button, Input, Card } from './components';

//  Group related modules
// utils/
//   - math.js
//   - string.js
//   - date.js
//   - index.js (re-exports all)

//  One default export per file
//  Multiple default exports not allowed

//  Use named exports for utilities
//  Use default export for main class/component
```

---

## 8. Classes & OOP

### Class Basics

```javascript
class User {
  // Constructor
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }
  
  // Methods
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  getInfo() {
    return {
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
  
  // Static methods
  static createGuest() {
    return new User("Guest", "guest@example.com");
  }
}

// Usage
const user = new User("John", "john@example.com");
console.log(user.greet());

const guest = User.createGuest();
```

### Inheritance

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  // Override method
  speak() {
    return `${this.name} barks`;
  }
  
  // New method
  fetch() {
    return `${this.name} fetches the ball`;
  }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak()); // "Rex barks"
console.log(dog.fetch()); // "Rex fetches the ball"
```

### Getters & Setters

```javascript
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  // Getter
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  // Setter
  set fullName(name) {
    const [first, last] = name.split(' ');
    this.firstName = first;
    this.lastName = last;
  }
}

const user = new User("John", "Doe");
console.log(user.fullName); // "John Doe"
user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
```

### Private Fields (ES2022)

```javascript
class BankAccount {
  #balance = 0; // Private field
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
// console.log(account.#balance); //  Error: Private field
```

---

## 9. Modern Features (ES2020+)

### Optional Chaining (`?.`)

**The Problem:**
```javascript
// Without optional chaining
const user = { /* ... */ };
const city = user && user.address && user.address.city;

// Checking nested properties
if (user && user.settings && user.settings.theme) {
  console.log(user.settings.theme);
}
```

**The Solution:**
```javascript
// With optional chaining
const city = user?.address?.city;

// Method calls
const result = obj?.method?.();

// Array access
const firstItem = array?.[0];

// React examples
const username = userData?.user?.profile?.name ?? 'Anonymous';
const isAdmin = user?.roles?.includes('admin') ?? false;
```

### Nullish Coalescing (`??`)

```javascript
// The difference between || and ??
const value1 = 0 || 'default';  // 'default' (0 is falsy)
const value2 = 0 ?? 'default';  // 0 (0 is not null/undefined)

const value3 = '' || 'default'; // 'default' ('' is falsy)
const value4 = '' ?? 'default'; // '' ('' is not null/undefined)

// Use cases
const port = process.env.PORT ?? 3000;
const username = user?.name ?? 'Guest';
const items = data?.items ?? [];
```

### Logical Assignment Operators

```javascript
// OR assignment (||=)
let value = null;
value ||= 'default'; // value = 'default'

// AND assignment (&&=)
let obj = { name: 'John' };
obj.name &&= obj.name.toUpperCase(); // obj.name = 'JOHN'

// Nullish assignment (??=)
let config = { port: 3000 };
config.host ??= 'localhost'; // config.host = 'localhost'
config.port ??= 8080;        // config.port = 3000 (not null)
```

### Other Modern Features

**`Array.at()` (ES2022):**
```javascript
const arr = [1, 2, 3, 4, 5];
arr.at(0);   // 1 (first)
arr.at(-1);  // 5 (last)
arr.at(-2);  // 4 (second to last)

// Before: arr[arr.length - 1]
// After: arr.at(-1)
```

**`Object.hasOwn()` (ES2022):**
```javascript
const obj = { name: 'John' };

// Before
Object.prototype.hasOwnProperty.call(obj, 'name'); // true

// After
Object.hasOwn(obj, 'name'); // true
```

**Promise.any() (ES2021):**
```javascript
// Returns first fulfilled promise
Promise.any([
  fetch('/api/server1'),
  fetch('/api/server2'),
  fetch('/api/server3')
])
.then(response => console.log('First success!'))
.catch(error => console.log('All failed!'));
```

---

## 10. Best Practices

### Code Organization

```javascript
//  Use meaningful variable names
const isUserAuthenticated = true;
const maxLoginAttempts = 3;
const userProfileData = { /* ... */ };

//  Avoid cryptic names
const a = true;
const x = 3;
const d = { /* ... */ };

//  Use const by default, let when needed
const API_URL = "https://api.example.com";
let counter = 0;

//  Don't use var
var oldStyle = "no";

//  One variable per line
const firstName = "John";
const lastName = "Doe";
const age = 25;

//  Don't chain declarations
const firstName = "John", lastName = "Doe", age = 25;
```

### Function Best Practices

```javascript
//  Pure functions (no side effects)
const add = (a, b) => a + b;
const double = (n) => n * 2;

//  Impure functions
let total = 0;
const add = (n) => { total += n; }; // Modifies external state

//  Single responsibility
const getFullName = (user) => `${user.firstName} ${user.lastName}`;
const formatDate = (date) => date.toISOString().split('T')[0];

//  Multiple responsibilities
const processUser = (user) => {
  // Validates, formats, saves - too much!
};

//  Descriptive function names
const isUserAdmin = (user) => user.role === 'admin';
const hasPermission = (user, permission) => { /* ... */ };

//  Unclear names
const check = (user) => user.role === 'admin';
const do = (u, p) => { /* ... */ };
```

### Array/Object Immutability

```javascript
//  Don't mutate original arrays
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // Creates new array

//  Avoid mutation
const numbers = [1, 2, 3];
numbers.push(4); // Mutates original

//  Don't mutate objects
const user = { name: "John", age: 25 };
const updated = { ...user, age: 26 }; // Creates new object

//  Avoid mutation
const user = { name: "John", age: 25 };
user.age = 26; // Mutates original

//  Array operations (immutable)
const add = [...arr, newItem];
const remove = arr.filter(item => item.id !== id);
const update = arr.map(item => item.id === id ? updated : item);

//  Object operations (immutable)
const add = { ...obj, newKey: value };
const remove = { ...obj }; delete remove.key;
const update = { ...obj, key: newValue };
```

### Async Best Practices

```javascript
//  Always handle errors
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
}

//  Use Promise.all for parallel operations
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

//  Don't await sequentially when not needed
const users = await fetchUsers();    // Waits
const posts = await fetchPosts();    // Waits
const comments = await fetchComments(); // Waits

//  Clean up in finally
async function loadData() {
  setLoading(true);
  try {
    const data = await fetchData();
    setData(data);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false); // Always runs
  }
}
```

### Modern Syntax Patterns

```javascript
//  Template literals
const message = `Hello ${name}, you have ${count} messages`;

//  String concatenation
const message = "Hello " + name + ", you have " + count + " messages";

//  Destructuring
const { name, age } = user;
const [first, second] = array;

//  Manual extraction
const name = user.name;
const age = user.age;
const first = array[0];
const second = array[1];

//  Optional chaining
const city = user?.address?.city;

//  Manual checking
const city = user && user.address && user.address.city;

//  Nullish coalescing
const port = config.port ?? 3000;

//  OR operator (treats 0, '' as null)
const port = config.port || 3000;
```

### React-Specific Patterns

```javascript
//  Functional components with hooks
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}

//  Destructure props
function Button({ onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

//  Use array methods for rendering
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

//  Conditional rendering
function Dashboard({ user }) {
  return (
    <div>
      {user?.isAdmin && <AdminPanel />}
      {user ? <WelcomeMessage user={user} /> : <LoginPrompt />}
    </div>
  );
}
```

---

## Summary

### What You've Learned

**Core ES6+ Features:**
-  Variables: `let`, `const` (block scope)
-  Arrow functions: `() => {}`
-  Destructuring: `{ name, age }`, `[first, second]`
-  Spread/Rest: `...array`, `...object`
-  Template literals: `` `Hello ${name}` ``
-  Array methods: `map`, `filter`, `reduce`, `find`
-  Promises & Async/Await
-  ES6 Modules: `import`/`export`
-  Classes: `class`, `extends`, `super`
-  Modern features: `?.`, `??`, `??=`

**Why This Matters for React:**
- React components use arrow functions extensively
- Props and state use destructuring
- Spread operator for immutable updates
- Array methods for rendering lists
- Async/await for API calls
- Modules for code organization
- Optional chaining for safe property access

### Next Steps

1. **Practice these concepts** with the example files
2. **Complete the lab exercises** to reinforce learning
3. **Move to Lesson 1** to start building React applications
4. **Keep this as reference** when learning React

### Key Takeaways

```javascript
// Modern JavaScript enables cleaner React code
function UserProfile({ user }) {
  const { name, email, avatar } = user;
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    };
    
    loadPosts();
  }, [user.id]);
  
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}
```

**Remember:**
- Use `const` by default, `let` when needed, never `var`
- Arrow functions for callbacks and array methods
- Destructure props and state
- Use spread for immutability
- Array methods instead of loops
- Async/await for API calls
- Optional chaining for safety

---

**Ready for React!** 

You now have the JavaScript foundation needed to build modern React applications. Let's move to Lesson 1!
