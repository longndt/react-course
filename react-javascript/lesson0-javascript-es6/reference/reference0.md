# Reference - JavaScript ES6+ Quick Lookup

> **Purpose of this file**: Quick ES6 syntax lookup, patterns, copy-paste ready code. NO concept explanations.
>
> **Use Theory0 when you need**: Understanding WHY and HOW ES6 features work.

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
9. [JavaScript with React (JSX)](#javascript-with-react-jsx)
10. [Quick Reference](#quick-reference)

---

## Why Modern JavaScript for React?

### Benefits
- **Cleaner Syntax** More concise and readable code

- **Better Performance** Modern features are optimized

- **React Compatibility** JSX and React work best with ES6+

- **Industry Standard** What you'll see in production code

### ES6+ Features Used in React
- **Arrow Functions** - Event handlers, array methods

- **Destructuring** - Props, state, and object properties

- **Template Literals** - Dynamic strings and JSX

- **Modules** - Import/export components and utilities

- **Async/Await** - Data fetching and side effects

---

## Arrow Functions

### Basic Syntax
```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter (parentheses optional)
const square = x => x * x;

// With no parameters
const greet = () => console.log('Hello!');

// With block body (explicit return needed)
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
```

### In React Components
```javascript
// Event handlers
function Button() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}

// Array methods
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### This Binding
```javascript
// Traditional function - 'this' is bound to the object
const obj = {
  name: 'John',
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};

// Arrow function - 'this' is inherited from parent scope
const obj2 = {
  name: 'John',
  greet: () => {
    console.log(`Hello, ${this.name}`); // 'this' is not obj2
  }
};
```

---

## Destructuring & Spread Operator

### Object Destructuring
```javascript
// Basic destructuring
const user = { name: 'John', age: 30, email: 'john@example.com' };
const { name, age } = user;
console.log(name); // 'John'
console.log(age);  // 30

// With default values
const { name, age, city = 'Unknown' } = user;

// Renaming variables
const { name: userName, age: userAge } = user;

// Nested destructuring
const user = {
  name: 'John',
  address: {
    city: 'New York',
    country: 'USA'
  }
};
const { address: { city, country } } = user;
```

### Array Destructuring
```javascript
// Basic array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first);  // 'red'
console.log(second); // 'green'

// Skipping elements
const [first, , third] = colors;

// Rest operator
const [first, ...rest] = colors;
console.log(rest); // ['green', 'blue']

// With default values
const [first = 'default', second] = colors;
```

### In React
```javascript
// Props destructuring
function UserCard({ name, age, email, onEdit }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}

// State destructuring
function Counter() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Spread Operator
```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Object spreading
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 }; // { name: 'John', age: 31 }

// In React
function UserProfile({ user, additionalProps }) {
  return (
    <div {...additionalProps}>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
}
```

---

## Template Literals

### Basic Syntax
```javascript
// Traditional string concatenation
const name = 'John';
const age = 30;
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

### In React
```javascript
// Dynamic class names
function Button({ variant, size, children }) {
  const className = `btn btn-${variant} btn-${size}`;
  return <button className={className}>{children}</button>;
}

// Dynamic URLs
function Image({ src, alt, width, height }) {
  const imageUrl = `https://example.com/images/${src}?w=${width}&h=${height}`;
  return <img src={imageUrl} alt={alt} />;
}

// Conditional rendering
function UserGreeting({ user, isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? `Welcome back, ${user.name}!` : 'Please log in.'}
    </div>
  );
}
```

---

## Modules (Import/Export)

### Export
```javascript
// Named exports
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Default export
const Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
export default Calculator;

// Mixed exports
export const PI = 3.14159;
export default class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  area() {
    return PI * this.radius * this.radius;
  }
}
```

### Import
```javascript
// Named imports
import { add, subtract } from './math.js';

// Default import
import Calculator from './calculator.js';

// Mixed imports
import Circle, { PI } from './circle.js';

// Import all
import * as math from './math.js';
console.log(math.add(2, 3));

// Renaming
import { add as addNumbers } from './math.js';
```

### In React
```javascript
// Component imports
import React from 'react';
import { useState, useEffect } from 'react';
import Button from './Button';
import { Header, Footer } from './Layout';

// Utility imports
import { formatDate, validateEmail } from './utils';
import { API_BASE_URL } from './config';

// CSS imports
import './App.css';
import styles from './Button.module.css';
```

---

## Array Methods

### Map
```javascript
// Transform array elements
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// In React
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

### Filter
```javascript
// Filter array elements
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]

// In React
function ActiveUsers({ users }) {
  const activeUsers = users.filter(user => user.isActive);

  return (
    <div>
      <h3>Active Users ({activeUsers.length})</h3>
      {activeUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Reduce
```javascript
// Reduce array to single value
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// In React
function ShoppingCart({ items }) {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h3>Shopping Cart</h3>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
```

### Find
```javascript
// Find first matching element
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Jane' }

// In React
function UserProfile({ userId, users }) {
  const user = users.find(u => u.id === userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

---

## Async/Await & Promises

### Promises
```javascript
// Basic promise
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
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Using async/await
async function loadUser() {
  try {
    const user = await fetchUserData(123);
    console.log(user);
  } catch (error) {
    console.error('Failed to load user:', error);
  }
}
```

### In React
```javascript
// Data fetching in useEffect
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

---

## Object Methods

### Object.keys()
```javascript
const user = { name: 'John', age: 30, email: 'john@example.com' };
const keys = Object.keys(user);
console.log(keys); // ['name', 'age', 'email']

// In React
function UserForm({ user, onChange }) {
  return (
    <form>
      {Object.keys(user).map(key => (
        <input
          key={key}
          name={key}
          value={user[key]}
          onChange={e => onChange(key, e.target.value)}
        />
      ))}
    </form>
  );
}
```

### Object.values()
```javascript
const user = { name: 'John', age: 30, email: 'john@example.com' };
const values = Object.values(user);
console.log(values); // ['John', 30, 'john@example.com']
```

### Object.entries()
```javascript
const user = { name: 'John', age: 30, email: 'john@example.com' };
const entries = Object.entries(user);
console.log(entries); // [['name', 'John'], ['age', 30], ['email', 'john@example.com']]

// In React
function UserDetails({ user }) {
  return (
    <dl>
      {Object.entries(user).map(([key, value]) => (
        <div key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
```

---

## JavaScript with React (JSX)

### JSX Fundamentals
```javascript
// Basic JSX
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// JSX with expressions
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// JSX with attributes
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
```

### Event Handling
```javascript
// Event handlers
function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```

### Conditional Rendering
```javascript
function UserProfile({ user, isLoggedIn }) {
  if (!isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      {user.isAdmin && <p>Admin privileges</p>}
    </div>
  );
}
```

---

## Quick Reference

### Common Patterns
```javascript
// Destructuring props
function Component({ prop1, prop2, ...rest }) {
  // Component logic
}

// Array methods
const processedData = data
  .filter(item => item.active)
  .map(item => ({ ...item, processed: true }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Async data fetching
useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  }
  fetchData();
}, []);
```

### ES6+ Features Summary
- **Arrow Functions** `() => {}` for concise function syntax

- **Destructuring** `{ name, age } = user` for extracting values

- **Spread** `...array` and `...object` for copying/merging

- **Template Literals** `` `Hello ${name}!` `` for string interpolation

- **Modules** `import/export` for code organization

- **Async/Await** `async/await` for handling promises

- **Array Methods** `map`, `filter`, `reduce`, `find` for data manipulation

---

## Next Steps

1. **Practice** Build React components using modern JavaScript
2. **Learn More** Check [Theory Guide](./theory/theory0.md) for detailed explanations
3. **Continue** Move to [Lesson 1](../lesson1-fundamentals-setup/) for React fundamentals
4. **Resources** Explore [Advanced Patterns](../../extras/advanced_patterns.md) for complex patterns

> **💡 Tip** Start with arrow functions and destructuring, then gradually learn other features. Modern JavaScript makes React development much more enjoyable!
