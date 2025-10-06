# Lesson 0: Modern JavaScript (ES6+) Prerequisites# Lesson 0: TypeScript Prerequisites



## Overview## Overview



**Difficulty**: Beginner to Intermediate  **Difficulty**: Beginner to Intermediate

**Status**:  **Recommended** - Nên học trước Lesson 1**Status**:  Optional but Recommended



This course teaches **React with JavaScript**. Before starting Lesson 1, you should be comfortable with modern JavaScript (ES6+) features. This lesson provides a comprehensive review of essential JavaScript concepts you'll use throughout the React course.This course teaches **React with TypeScript**. Before starting Lesson 1, you should be comfortable with TypeScript fundamentals. This lesson provides a quick review of essential TypeScript concepts you'll use throughout the course.



------



## Learning Objectives## Learning Objectives



After completing this lesson, you will be able to:After completing this lesson, you will be able to:



-  Use `let` and `const` instead of `var`-  Use type annotations and type inference effectively

-  Write and use arrow functions-  Define interfaces and type aliases for object shapes

-  Apply destructuring for objects and arrays-  Work with generic types and functions

-  Use spread and rest operators effectively-  Apply utility types (Partial, Pick, Omit, etc.)

-  Work with template literals-  Use type guards and narrowing techniques

-  Understand and use Promises-  Work with array methods (map, filter, reduce)

-  Write asynchronous code with async/await-  Use async/await with proper typing

-  Use ES6 modules (import/export)-  Import and export TypeScript modules

-  Work with ES6 classes

-  Apply array methods (map, filter, reduce, find, etc.)---

-  Use optional chaining and nullish coalescing

## Prerequisites

---

- Basic programming knowledge (variables, functions, loops, conditionals)

## Prerequisites- Familiarity with HTML and CSS

- Understanding of modern JavaScript (ES6+)

- Basic programming knowledge (variables, functions, loops, conditionals)- Node.js installed on your system

- Familiarity with HTML and CSS

- Understanding of basic JavaScript---

- Node.js installed on your system

## What You'll Learn

---

### 1. TypeScript Basics

## What You'll Learn**Core Concepts:**

- Type annotations and inference

### 1. Variables & Scope- Primitive types (string, number, boolean, etc.)

**Modern Variable Declarations:**- Arrays and tuples

- `let` vs `const` vs `var`- Union and intersection types

- Block scope vs function scope- Literal types

- Hoisting behavior

- Best practices### 2. Interfaces & Type Aliases

**Object Typing:**

**Example:**- Defining object shapes

```javascript- Optional and readonly properties

//  Old way (ES5)- Extending interfaces

var name = 'John';- Type aliases vs interfaces

var age = 25;- When to use each



//  Modern way (ES6+)### 3. Functions & Generics

const name = 'John';  // Cannot be reassigned**Function Typing:**

let age = 25;         // Can be reassigned- Function type signatures

- Optional and default parameters

age = 26;  //  OK- Rest parameters

// name = 'Jane';  //  Error: Assignment to constant variable- Generic types and functions

```- Generic constraints



---### 4. Advanced Types

**Advanced Features:**

### 2. Arrow Functions- Utility types (Partial, Pick, Omit, Required, Readonly, Record)

**Concise Function Syntax:**- Type guards and narrowing

- Arrow function syntax- Discriminated unions

- Implicit return- Enums (numeric and string)

- `this` binding differences

- When to use arrow functions---



**Example:**## Quick Concept Preview

```javascript

//  Traditional function### Type Annotations

function add(a, b) {```javascript

  return a + b;// Explicit type annotations

}let username: string = "John Doe";

let age: number = 25;

//  Arrow functionlet isActive: boolean = true;

const add = (a, b) => a + b;

// Arrays and tuples

// With single parameter (no parentheses needed)let numbers: number[] = [1, 2, 3];

const double = x => x * 2;let person: [string, number] = ["Alice", 30];



// With no parameters// Union types

const sayHello = () => console.log('Hello!');let id: string | number = "ABC123";

```

// With multiple statements (need curly braces)

const greet = name => {### Interfaces

  const message = `Hello, ${name}!`;```javascript

  return message;interface User {

};  id: number;

```  name: string;

  email: string;

---  age?: number; // Optional

  readonly createdAt: Date; // Readonly

### 3. Template Literals}

**String Interpolation:**

- Backtick syntaxconst user: User = {

- Embedded expressions  id: 1,

- Multi-line strings  name: "Alice",

- Tagged templates  email: "alice@example.com",

  createdAt: new Date()

**Example:**};

```javascript```

//  String concatenation (ES5)

const name = 'John';### Generics

const age = 25;```javascript

const message = 'My name is ' + name + ' and I am ' + age + ' years old.';function identity<T>(value: T): T {

  return value;

//  Template literals (ES6+)}

const message = `My name is ${name} and I am ${age} years old.`;

const num = identity<number>(42);

// Multi-line stringsconst str = identity<string>("Hello");

const html = ````

  <div>

    <h1>${name}</h1>---

    <p>Age: ${age}</p>

  </div>## Getting Started

`;

**Learning Path:**

// Expressions in templates

const price = 100;1. **Start with [Reference Guide](./reference/)** - Quick TypeScript syntax reference (5-10 minutes)

const tax = 0.1;2. **Read [Theory Guide](./theory/theory0.md)** - Comprehensive TypeScript fundamentals (1-2 hours)

const total = `Total: $${price * (1 + tax)}`;  // Total: $1103. **Explore [Examples](./example/)** - Working TypeScript examples

```4. **Complete [Lab Exercises](./lab/lab0.md)** - Hands-on practice (1-2 hours)



---**Prerequisites Checklist:**

- [ ] Node.js v18+ installed

### 4. Destructuring- [ ] VS Code with TypeScript extension

**Extract Values from Objects and Arrays:**- [ ] Basic JavaScript knowledge (ES6+)

- Object destructuring- [ ] Understanding of functions and objects

- Array destructuring

- Nested destructuring---

- Default values

- Rest pattern## Key Takeaways



**Object Destructuring:**- **TypeScript adds static typing** to JavaScript, catching errors at compile time

```javascript- **Interfaces and types** define the shape of objects and data structures

//  Old way- **Generics** allow reusable, type-safe components

const user = { name: 'John', age: 25, email: 'john@example.com' };- **Utility types** provide powerful type transformations

const name = user.name;- **Type guards** enable type narrowing for safer code

const age = user.age;- **Array methods** (map, filter, reduce) are essential for React

const email = user.email;- **Async/await** with proper typing handles asynchronous operations



//  Destructuring---

const { name, age, email } = user;

## Best Practices Summary

// With different variable names

const { name: userName, age: userAge } = user; **DO:**

- Use type inference when obvious, explicit types when needed

// With default values- Prefer interfaces for object shapes (can be extended)

const { name, age, country = 'USA' } = user;- Use generics for reusable, type-safe functions

- Enable strict mode in tsconfig.json

// Nested destructuring- Use utility types instead of manual type manipulation

const student = {

  name: 'John', **DON'T:**

  grades: { math: 90, english: 85 }- Overuse `any` type - it defeats the purpose of TypeScript

};- Create overly complex types - keep them simple and readable

const { name, grades: { math, english } } = student;- Forget optional chaining (`?.`) and nullish coalescing (`??`)

```- Ignore TypeScript errors - they catch real bugs

- Mix naming conventions (use PascalCase for types/interfaces)

**Array Destructuring:**

```javascript---

//  Old way

const colors = ['red', 'green', 'blue'];## Common Challenges & Solutions

const first = colors[0];

const second = colors[1];**Challenge 1: "Property does not exist on type"**

- **Cause:** TypeScript doesn't know about the property

//  Destructuring- **Solution:** Define interface or type with all properties, or use type assertion

const [first, second, third] = colors;

**Challenge 2: "Type 'null' is not assignable to type 'X'"**

// Skip elements- **Cause:** Strict null checking enabled

const [first, , third] = colors;- **Solution:** Use union type `X | null` or optional chaining `?.`



// With default values**Challenge 3: "Cannot find module or its type declarations"**

const [first, second, third, fourth = 'yellow'] = colors;- **Cause:** Missing type definitions for library

- **Solution:** Install `@types/package-name` or declare module types

// Rest pattern

const [first, ...rest] = colors;  // rest = ['green', 'blue']**Challenge 4: Complex generic types**

```- **Cause:** Too many type parameters

- **Solution:** Break into smaller types, use utility types, add constraints

---

---

### 5. Spread & Rest Operators

**The `...` Operator:**## Progress Checklist

- Spread syntax for arrays

- Spread syntax for objects- [ ] Completed reading theory guide

- Rest parameters in functions- [ ] Ran and understood all examples

- Use cases and best practices- [ ] Finished lab exercises

- [ ] Passed the quiz (80%+)

**Spread Operator:**- [ ] Can explain interfaces vs type aliases

```javascript- [ ] Can use generics confidently

// Arrays- [ ] Understand utility types (Partial, Pick, Omit)

const arr1 = [1, 2, 3];

const arr2 = [4, 5, 6];** Test your knowledge:** Take the [interactive quiz](./quiz/quiz0.html)

const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

---

// Copy arrays

const original = [1, 2, 3];## Next Steps

const copy = [...original];

 **Ready for React?** → Proceed to [Lesson 1: React Fundamentals & Setup](../lesson1-fundamentals-setup/)

// Objects

const user = { name: 'John', age: 25 };**If you scored below 80% on the quiz:**

const updatedUser = { ...user, age: 26 };  // { name: 'John', age: 26 }- Review [theory guide](./theory/theory0.md) sections you struggled with

- Practice more with [lab exercises](./lab/lab0.md)

// Merge objects- Explore [example](./example/) to see concepts in action

const defaults = { theme: 'light', lang: 'en' };

const userPrefs = { lang: 'vi' };**Additional Learning:**

const config = { ...defaults, ...userPrefs };  // { theme: 'light', lang: 'vi' }- TypeScript official documentation

```- TypeScript playground for practice

- React TypeScript cheatsheet

**Rest Parameters:**

```javascript---

// Collect remaining arguments

function sum(...numbers) {## Resources & References

  return numbers.reduce((total, num) => total + num, 0);

}**Official Documentation:**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

sum(1, 2, 3, 4, 5);  // 15- [TypeScript Playground](https://www.typescriptlang.org/play)

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

// Combine with regular parameters

function multiply(multiplier, ...numbers) {**Tools & Extensions:**

  return numbers.map(num => num * multiplier);- [VS Code TypeScript Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)

}- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions repository



multiply(2, 1, 2, 3);  // [2, 4, 6]**Practice Platforms:**

```- [TypeScript Exercises](https://typescript-exercises.github.io/)

- [Type Challenges](https://github.com/type-challenges/type-challenges)

---

**Community Resources:**

### 6. Array Methods- [TypeScript Discord](https://discord.gg/typescript)

**Functional Programming with Arrays:**- [Stack Overflow TypeScript Tag](https://stackoverflow.com/questions/tagged/typescript)

- `map()` - Transform elements

- `filter()` - Select elements---

- `reduce()` - Aggregate values

- `find()` - Find single element**Note:** All code examples in this course use TypeScript. Understanding these fundamentals will make learning React much easier!

- `findIndex()` - Find element index
- `some()` - Test if any element matches
- `every()` - Test if all elements match

**Examples:**
```javascript
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 35, active: true }
];

// map() - Transform array
const names = users.map(user => user.name);
// ['John', 'Jane', 'Bob']

// filter() - Select elements
const activeUsers = users.filter(user => user.active);
// [{ id: 1, ... }, { id: 3, ... }]

// reduce() - Aggregate values
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
// 90

// find() - Find first matching element
const jane = users.find(user => user.name === 'Jane');
// { id: 2, name: 'Jane', age: 30, active: false }

// some() - Check if any element matches
const hasActiveUsers = users.some(user => user.active);
// true

// every() - Check if all elements match
const allActive = users.every(user => user.active);
// false

// Chaining methods
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);
// ['John', 'Bob']
```

---

### 7. Promises & Async/Await
**Asynchronous JavaScript:**
- Understanding Promises
- Promise states (pending, fulfilled, rejected)
- Promise chaining
- async/await syntax
- Error handling
- Parallel execution

**Promises:**
```javascript
// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'John' };
      resolve(data);  // Success
      // reject(new Error('Failed'));  // Failure
    }, 1000);
  });
};

// Using Promises
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));

// Promise chaining
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(users => users.filter(u => u.active))
  .then(activeUsers => console.log(activeUsers))
  .catch(error => console.error(error));
```

**Async/Await:**
```javascript
//  Modern way (cleaner)
async function getUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Using async function
const user = await getUser(1);
console.log(user);

// Parallel execution
async function getMultipleUsers() {
  try {
    const [user1, user2, user3] = await Promise.all([
      getUser(1),
      getUser(2),
      getUser(3)
    ]);
    return [user1, user2, user3];
  } catch (error) {
    console.error(error);
  }
}
```

---

### 8. ES6 Modules
**Import and Export:**
- Named exports
- Default exports
- Import syntax variations
- Re-exporting

**Named Exports:**
```javascript
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// OR
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
export { add, subtract };

// Importing
import { add, subtract } from './utils.js';
import { add as sum } from './utils.js';  // Rename
import * as utils from './utils.js';  // Import all
```

**Default Exports:**
```javascript
// User.js
const User = {
  create(name) {
    return { name, created: new Date() };
  }
};
export default User;

// Importing
import User from './User.js';
import MyUser from './User.js';  // Can use any name
```

**Mixing Named and Default:**
```javascript
// api.js
export const API_URL = 'https://api.example.com';
export const fetchUsers = () => fetch(`${API_URL}/users`);

const api = {
  get: (endpoint) => fetch(`${API_URL}${endpoint}`),
  post: (endpoint, data) => fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export default api;

// Importing
import api, { API_URL, fetchUsers } from './api.js';
```

---

### 9. ES6 Classes
**Object-Oriented Programming:**
- Class syntax
- Constructor
- Methods
- Inheritance
- Static methods
- Getters and setters

**Example:**
```javascript
// Basic class
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  // Method
  greet() {
    return `Hello, I'm ${this.name}`;
  }

  // Getter
  get age() {
    const now = new Date();
    const years = now.getFullYear() - this.createdAt.getFullYear();
    return years;
  }

  // Setter
  set email(newEmail) {
    if (newEmail.includes('@')) {
      this._email = newEmail;
    } else {
      throw new Error('Invalid email');
    }
  }

  // Static method
  static createGuest() {
    return new User('Guest', 'guest@example.com');
  }
}

// Usage
const user = new User('John', 'john@example.com');
console.log(user.greet());  // Hello, I'm John

// Inheritance
class Admin extends User {
  constructor(name, email, role) {
    super(name, email);  // Call parent constructor
    this.role = role;
  }

  // Override method
  greet() {
    return `${super.greet()} - I'm an admin`;
  }

  // New method
  deleteUser(userId) {
    console.log(`Deleting user ${userId}`);
  }
}

const admin = new Admin('Jane', 'jane@example.com', 'super-admin');
console.log(admin.greet());  // Hello, I'm Jane - I'm an admin
```

---

### 10. Modern JavaScript Features
**ES2020+ Features:**
- Optional chaining (`?.`)
- Nullish coalescing (`??`)
- Logical assignment operators
- Array methods (flat, flatMap)

**Optional Chaining:**
```javascript
const user = {
  name: 'John',
  address: {
    city: 'Hanoi'
    // No 'street' property
  }
};

//  Old way - can cause errors
const street = user.address && user.address.street;

//  Optional chaining
const street = user.address?.street;  // undefined (no error)
const country = user.address?.country?.name;  // undefined

// With arrays
const firstUser = users?.[0];

// With functions
const result = user.getName?.();  // Call only if method exists
```

**Nullish Coalescing:**
```javascript
// ?? returns right side only if left side is null or undefined
// Different from || which returns right side for any falsy value

const port = 0;

//  Using || (wrong for 0, '', false)
const serverPort = port || 3000;  // 3000 (wrong! port is 0)

//  Using ?? (correct)
const serverPort = port ?? 3000;  // 0 (correct!)

// Example
const config = {
  theme: '',  // Empty string (intentional)
  debug: false  // Explicitly false
};

const theme = config.theme ?? 'dark';  // '' (keeps empty string)
const debug = config.debug ?? true;    // false (keeps false)
```

---

## Course Structure

### Theory
📖 **[theory0.md](./theory/theory0.md)**
Detailed explanations of all JavaScript ES6+ concepts with examples.

### Examples
 **[example/](./example/)**
Runnable code examples for each concept:
- `01-variables-scope.js` - let, const, var
- `02-arrow-functions.js` - Arrow functions
- `03-destructuring.js` - Object & array destructuring
- `04-spread-rest.js` - Spread & rest operators
- `05-array-methods.js` - map, filter, reduce, etc.
- `06-promises.js` - Promises basics
- `07-async-await.js` - Async/await
- `08-modules/` - ES6 modules examples
- `09-classes.js` - ES6 classes
- `10-modern-features.js` - Optional chaining, nullish coalescing

### Lab Exercises
 **[lab/lab0.md](./lab/lab0.md)**
Hands-on practice exercises with solutions.

### Quiz
 **[quiz/quiz0.html](./quiz/quiz0.html)**
Interactive quiz to test your knowledge (20 questions).

### Reference
 **[reference/reference0.md](./reference/reference0.md)**
Quick reference guide and cheat sheet.

---

## Time Estimate

- **Theory Reading**: 2-3 hours
- **Examples Practice**: 2-3 hours
- **Lab Exercises**: 3-4 hours
- **Quiz**: 30 minutes
- **Total**: 8-11 hours

---

## How to Study This Lesson

### Step 1: Read Theory (2-3 hours)
Read `theory/theory0.md` carefully. Don't rush - understanding these concepts is crucial for React.

### Step 2: Run Examples (2-3 hours)
```bash
cd lesson0-javascript/example
npm install
npm start
```

Go through each example file and experiment with the code.

### Step 3: Complete Lab (3-4 hours)
Work through `lab/lab0.md` exercises. Try to solve them yourself before checking solutions.

### Step 4: Take Quiz (30 min)
Open `quiz/quiz0.html` in your browser and test your knowledge.

### Step 5: Review Reference (ongoing)
Bookmark `reference/reference0.md` for quick lookup during the course.

---

## Why These Concepts Matter for React

### Arrow Functions
```javascript
// React event handlers
<button onClick={() => console.log('Clicked!')}>Click Me</button>

// Array methods in JSX
{users.map(user => <div key={user.id}>{user.name}</div>)}
```

### Destructuring
```javascript
// Component props
function UserCard({ name, email, avatar }) {
  return <div>{name}</div>;
}

// useState hook
const [count, setCount] = useState(0);
```

### Spread Operator
```javascript
// Updating state immutably
setUser({ ...user, age: 26 });

// Passing props
<Component {...props} />
```

### Array Methods
```javascript
// Rendering lists
{users.map(user => <UserCard key={user.id} {...user} />)}
{users.filter(u => u.active).map(u => <div>{u.name}</div>)}
```

### Async/Await
```javascript
// Fetching data in useEffect
useEffect(() => {
  async function fetchUsers() {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  }
  fetchUsers();
}, []);
```

### ES6 Modules
```javascript
// Component imports
import React, { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import { fetchUsers } from './api/users';
```

---

## Additional Resources

### Official Documentation
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [ES6 Features](http://es6-features.org/)

### Video Tutorials
- [JavaScript ES6+ Crash Course](https://www.youtube.com/results?search_query=javascript+es6+crash+course)
- [Async JavaScript](https://www.youtube.com/results?search_query=async+javascript+tutorial)

### Practice
- [JavaScript Exercises](https://www.w3schools.com/js/js_exercises.asp)
- [Codewars JavaScript](https://www.codewars.com/)
- [LeetCode JavaScript](https://leetcode.com/)

---

## Next Steps

Once you're comfortable with these JavaScript concepts, you're ready to start:

**➡ [Lesson 1: React Fundamentals & Setup](../lesson1-fundamentals-setup/)**

---

## Need Help?

- Review the theory if something is unclear
- Run the examples and modify them
- Complete the lab exercises
- Ask questions in the discussion forum
- Review the reference guide

**Remember**: These JavaScript fundamentals are essential for React. Take your time to understand them well!

---

**Previous**: Setup
**Next**: [Lesson 1: React Fundamentals & Setup](../lesson1-fundamentals-setup/)
