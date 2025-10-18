# Theory - JavaScript ES6+ Prerequisites

---

## Table of Contents

1. [Why Modern JavaScript for React?](#why-modern-javascript-for-react)
2. [Arrow Functions](#arrow-functions)
3. [Destructuring & Spread Operator](#destructuring--spread-operator)
4. [Template Literals](#template-literals)
5. [Modules (Import/Export)](#modules-importexport)
6. [Array Methods](#array-methods)
7. [Async/Await & Promises](#asyncawait--promises)
8. [Object Methods](#object-methods)
9. [JavaScript with React](#javascript-with-react)
10. [Common Mistakes](#common-mistakes)
11. [Next Steps](#next-steps)

---

## Why Modern JavaScript for React?

**Building Better React Applications:**

- Modern JavaScript features make React code cleaner and more readable
- ES6+ features are essential for React development
- Better performance with modern JavaScript engines
- Industry standard for professional development
- Easier to maintain and debug

**Key Facts:**
- React heavily relies on ES6+ features
- Essential skill for professional development
- Makes React code more concise and powerful

---

## Arrow Functions

### Basic Syntax

```javascript
// Traditional function
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Arrow function with implicit return
const greet = (name) => `Hello, ${name}!`;

// Arrow function with single parameter (no parentheses needed)
const greet = name => `Hello, ${name}!`;
```

### `this` Binding

```javascript
// Traditional function - `this` is dynamic
const obj = {
  name: 'John',
  greet: function() {
    console.log(`Hello, ${this.name}!`);  // `this` refers to obj
  }
};

// Arrow function - `this` is lexical (inherited from parent scope)
const obj2 = {
  name: 'John',
  greet: () => {
    console.log(`Hello, ${this.name}!`);  // `this` refers to global scope
  }
};

// Arrow function in React (common pattern)
const MyComponent = () => {
  const handleClick = () => {
    console.log('Button clicked');  // `this` is not needed
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

---

## Destructuring & Spread Operator

### Object Destructuring

```javascript
// Basic destructuring
const user = { name: 'John', age: 25, email: 'john@example.com' };
const { name, age } = user;
console.log(name); // 'John'
console.log(age);  // 25

// Destructuring with renaming
const { name: userName, age: userAge } = user;

// Destructuring with default values
const { name, age, city = 'Unknown' } = user;

// Destructuring in function parameters
function greetUser({ name, age }) {
  return `Hello, ${name}! You are ${age} years old.`;
}
```

### Array Destructuring

```javascript
// Basic array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first);  // 'red'
console.log(second); // 'green'

// Destructuring with rest operator
const [first, ...rest] = colors;
console.log(first); // 'red'
console.log(rest);  // ['green', 'blue']

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

### Spread Operator

```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Object spreading
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combined = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Overriding properties
const user = { name: 'John', age: 25 };
const updatedUser = { ...user, age: 26 }; // { name: 'John', age: 26 }
```

---

## Template Literals

### Basic Usage

```javascript
// Traditional string concatenation
const name = 'John';
const age = 25;
const message = 'Hello, ' + name + '! You are ' + age + ' years old.';

// Template literals
const message = `Hello, ${name}! You are ${age} years old.`;

// Multi-line strings
const html = `
  <div>
    <h1>Welcome, ${name}!</h1>
    <p>You are ${age} years old.</p>
  </div>
`;
```

### Advanced Features

```javascript
// Expressions in template literals
const price = 19.99;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;

// Function calls
const user = { name: 'John', age: 25 };
const message = `Hello, ${user.name.toUpperCase()}! You are ${user.age} years old.`;

// Conditional expressions
const isLoggedIn = true;
const message = `Welcome${isLoggedIn ? ', John' : ''}!`;
```

---

## Modules (Import/Export)

### Export

```javascript
// Named exports
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// Default export
const Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
export default Calculator;

// Mixed exports
export const VERSION = '1.0.0';
export default class User {
  constructor(name) {
    this.name = name;
  }
}
```

### Import

```javascript
// Named imports
import { PI, add } from './math.js';

// Default import
import Calculator from './calculator.js';

// Mixed imports
import User, { VERSION } from './user.js';

// Import everything
import * as math from './math.js';
console.log(math.PI, math.add(1, 2));

// Renaming imports
import { add as addNumbers } from './math.js';
```

### React Component Example

```javascript
// Button.jsx
import React from 'react';

export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;

// App.jsx
import React from 'react';
import Button, { Button as NamedButton } from './Button';

function App() {
  return (
    <div>
      <Button onClick={() => alert('Default')}>Default Button</Button>
      <NamedButton onClick={() => alert('Named')}>Named Button</NamedButton>
    </div>
  );
}
```

---

## Array Methods

### Essential Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];
const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 35 }
];

// map - transform each element
const doubled = numbers.map(n => n * 2);
const userNames = users.map(user => user.name);

// filter - keep elements that match condition
const evenNumbers = numbers.filter(n => n % 2 === 0);
const adults = users.filter(user => user.age >= 18);

// find - find first element that matches
const john = users.find(user => user.name === 'John');

// reduce - reduce array to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
const totalAge = users.reduce((acc, user) => acc + user.age, 0);

// forEach - execute function for each element
users.forEach(user => console.log(user.name));
```

### Chaining Array Methods

```javascript
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 35, active: true }
];

// Chain multiple methods
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name)
  .sort();

console.log(activeUserNames); // ['Bob', 'John']
```

---

## Async/Await & Promises

### Promises

```javascript
// Creating a promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully');
    }, 1000);
  });
};

// Using promises
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Async/Await

```javascript
// Async function
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Using async function
fetchUserData()
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

### React Example

```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}
```

---

## Object Methods

### Object Property Shorthand

```javascript
// Traditional way
const name = 'John';
const age = 25;
const user = {
  name: name,
  age: age,
  greet: function() {
    return `Hello, ${this.name}!`;
  }
};

// ES6 shorthand
const user = {
  name,
  age,
  greet() {
    return `Hello, ${this.name}!`;
  }
};
```

### Object Destructuring in Functions

```javascript
// Traditional way
function createUser(userData) {
  const name = userData.name;
  const age = userData.age;
  const email = userData.email;
  // ...
}

// ES6 way
function createUser({ name, age, email }) {
  // Direct access to properties
  console.log(name, age, email);
}

// With default values
function createUser({ name, age, email = 'no-email@example.com' }) {
  // email defaults to 'no-email@example.com' if not provided
}
```

---

## JavaScript with React

### Event Handlers

```javascript
// Traditional function
function handleClick() {
  console.log('Button clicked');
}

// Arrow function (common in React)
const handleClick = () => {
  console.log('Button clicked');
};

// Inline arrow function
<button onClick={() => console.log('Button clicked')}>
  Click me
</button>
```

### State Updates

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Traditional function
  const increment = () => {
    setCount(count + 1);
  };

  // Arrow function
  const decrement = () => {
    setCount(count - 1);
  };

  // Inline arrow function
  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Array Rendering

```javascript
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

---

## Common Mistakes

### Mistake 1: Not using arrow functions for event handlers

```javascript
// ❌ Wrong - `this` binding issues
class MyComponent extends React.Component {
  handleClick() {
    console.log(this); // `this` might be undefined
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}

// ✅ Correct - arrow function or bind
class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this); // `this` refers to component
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

### Mistake 2: Mutating state directly

```javascript
// ❌ Wrong - mutating state
const [users, setUsers] = useState([]);

const addUser = (newUser) => {
  users.push(newUser); // Mutating original array
  setUsers(users);
};

// ✅ Correct - creating new array
const addUser = (newUser) => {
  setUsers([...users, newUser]); // New array with spread operator
};
```

### Mistake 3: Missing dependencies in useEffect

```javascript
// ❌ Wrong - missing dependencies
useEffect(() => {
  fetchUser(userId);
}, []); // Missing userId dependency

// ✅ Correct - include all dependencies
useEffect(() => {
  fetchUser(userId);
}, [userId]); // Include userId
```

### Mistake 4: Not using key prop in lists

```javascript
// ❌ Wrong - missing key prop
{users.map(user => (
  <li>{user.name}</li>
))}

// ✅ Correct - include key prop
{users.map(user => (
  <li key={user.id}>{user.name}</li>
))}
```

---

## Next Steps

### What You Should Know After Lesson 0

**JavaScript ES6+ Features:**
- Arrow functions and `this` binding
- Destructuring and spread operator
- Template literals
- Modules (import/export)

**Array Methods:**
- map, filter, find, reduce, forEach
- Method chaining

**Async Programming:**
- Promises and async/await
- Error handling with try/catch

**React Integration:**
- Event handlers with arrow functions
- State updates with spread operator
- Array rendering with map

### What's Coming in Lesson 1

🔜 **React Fundamentals** - Components, JSX, and basic patterns
🔜 **JSX Syntax** - JavaScript with JSX
🔜 **Component Architecture** - Building reusable components
🔜 **Styling** - CSS integration with React