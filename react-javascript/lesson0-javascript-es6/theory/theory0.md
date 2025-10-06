# Modern JavaScript (ES6+) for React - Theory

## Introduction

Modern JavaScript (ES6 and beyond) introduces features that make code more readable, maintainable, and powerful. These features are essential for React development.

**What you'll learn:**
- Modern syntax and features
- Asynchronous programming patterns
- Functional programming concepts
- Best practices for React development

---

## 1. Arrow Functions

### Basic Syntax

Arrow functions provide a shorter syntax for writing function expressions.

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};

// Implicit return (for single expressions)
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const greet = () => 'Hello!';
```

### Lexical `this` Binding

Unlike regular functions, arrow functions don't have their own `this` context. They inherit `this` from the surrounding scope.

```javascript
// Problem with regular functions
const timer = {
  seconds: 0,
  start: function() {
    setInterval(function() {
      this.seconds++; // 'this' is undefined or global object
      console.log(this.seconds);
    }, 1000);
  }
};

// Solution with arrow function
const timer = {
  seconds: 0,
  start: function() {
    setInterval(() => {
      this.seconds++; // 'this' refers to timer object
      console.log(this.seconds);
    }, 1000);
  }
};
```

### When to Use Arrow Functions

✅ **Use arrow functions for:**
- Callbacks and array methods
- Short function expressions
- When you want lexical `this` binding

❌ **Avoid arrow functions for:**
- Object methods (when you need `this` to refer to the object)
- Constructor functions
- Functions that need `arguments` object

---

## 2. Destructuring

Destructuring allows you to extract values from arrays or properties from objects into distinct variables.

### Object Destructuring

```javascript
const user = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john@example.com'
};

// Extract properties
const { firstName, lastName } = user;
console.log(firstName); // 'John'

// Rename variables
const { firstName: first, lastName: last } = user;
console.log(first); // 'John'

// Default values
const { country = 'USA' } = user;
console.log(country); // 'USA'

// Nested destructuring
const person = {
  name: 'Alice',
  address: {
    city: 'Boston',
    zip: '02101'
  }
};
const { address: { city, zip } } = person;
console.log(city); // 'Boston'
```

### Array Destructuring

```javascript
const colors = ['red', 'green', 'blue'];

// Extract elements
const [first, second, third] = colors;
console.log(first); // 'red'

// Skip elements
const [, , third] = colors;
console.log(third); // 'blue'

// Rest operator
const [primary, ...others] = colors;
console.log(primary); // 'red'
console.log(others); // ['green', 'blue']
```

### React Usage

```javascript
// Props destructuring in components
function UserCard({ name, age, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age} years old</p>
      <p>{email}</p>
    </div>
  );
}

// State destructuring with hooks
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## 3. Template Literals

Template literals allow embedded expressions and multi-line strings.

```javascript
const name = 'World';
const greeting = `Hello, ${name}!`;

// Multi-line strings
const message = `
  This is line 1
  This is line 2
  This is line 3
`;

// Expression evaluation
const a = 10;
const b = 20;
console.log(`Sum: ${a + b}`); // 'Sum: 30'

// In React JSX
function Welcome({ name }) {
  return <h1>{`Welcome, ${name}!`}</h1>;
}
```

---

## 4. Spread & Rest Operators

The `...` operator has two uses: spreading and gathering.

### Spread Operator

Expands an iterable into individual elements.

```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Object spreading
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
// { a: 1, b: 2, c: 3, d: 4 }

// Copying with modifications
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 };
// { name: 'John', age: 31 }
```

### Rest Parameters

Collects remaining elements into an array.

```javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4); // 10

// With other parameters
function introduce(greeting, ...names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

introduce('Hello', 'Alice', 'Bob'); // 'Hello, Alice and Bob!'
```

### React Usage

```javascript
// Spread props
function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

// Usage
<Button className="btn" onClick={handleClick}>
  Click me
</Button>

// Update state immutably
const [user, setUser] = useState({ name: '', age: 0 });
setUser({ ...user, age: 31 }); // Create new object

const [items, setItems] = useState([]);
setItems([...items, newItem]); // Create new array
```

---

## 5. Modules (Import/Export)

Modules allow you to split code into separate files.

### Named Exports

```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// app.js
import { PI, add, Calculator } from './math.js';
console.log(add(2, 3)); // 5
```

### Default Export

```javascript
// User.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// app.js
import User from './User.js';
const user = new User('John');
```

### React Component Example

```javascript
// Button.jsx
export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

// App.jsx
import Button from './Button';

function App() {
  const handleClick = () => alert('Clicked!');

  return <Button onClick={handleClick}>Click me</Button>;
}
```

---

## 6. Async/Await & Promises

### Promises

A Promise represents a value that may be available now, in the future, or never.

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Success!');
    } else {
      reject('Error!');
    }
  }, 1000);
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Async/Await

Async/await makes asynchronous code look and behave more like synchronous code.

```javascript
async function fetchUser() {
  try {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### React Data Fetching Example

```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to load user');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

---

## 7. Array Methods

Array methods are essential for working with data in React.

### map() - Transform

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8]

// In React
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

### filter() - Select

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]

// In React
function ActiveUsers({ users }) {
  const activeUsers = users.filter(user => user.active);

  return (
    <ul>
      {activeUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### reduce() - Accumulate

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, n) => total + n, 0);
// 10

// Calculate total price
const items = [
  { name: 'Book', price: 10 },
  { name: 'Pen', price: 5 }
];
const total = items.reduce((sum, item) => sum + item.price, 0);
// 15
```

---

## 8. Modern Features

### Optional Chaining (?.)

Safely access nested object properties.

```javascript
const user = {
  name: 'John',
  address: {
    city: 'NYC'
  }
};

// Without optional chaining (error if address is undefined)
const city = user.address.city;

// With optional chaining (returns undefined if any part is null/undefined)
const city = user?.address?.city; // 'NYC'
const zip = user?.address?.zip; // undefined (no error)

// In React
function UserAddress({ user }) {
  return <div>{user?.address?.city ?? 'No city'}</div>;
}
```

### Nullish Coalescing (??)

Returns right side only if left is `null` or `undefined`.

```javascript
const value1 = null ?? 'default'; // 'default'
const value2 = undefined ?? 'default'; // 'default'
const value3 = 0 ?? 'default'; // 0
const value4 = '' ?? 'default'; // ''

// vs OR operator
const a = 0 || 'default'; // 'default' (0 is falsy)
const b = 0 ?? 'default'; // 0 (0 is not null/undefined)

// In React
function Greeting({ name }) {
  return <h1>Hello, {name ?? 'Guest'}!</h1>;
}
```

---

## Best Practices for React

### 1. Use const/let instead of var

```javascript
// ❌ Don't use var
var count = 0;

// ✅ Use const for values that don't change
const MAX_COUNT = 100;

// ✅ Use let for values that change
let currentCount = 0;
```

### 2. Prefer arrow functions for callbacks

```javascript
// ❌ Avoid
<button onClick={function() { handleClick(); }}>

// ✅ Use arrow function
<button onClick={() => handleClick()}>
```

### 3. Use destructuring

```javascript
// ❌ Avoid
function Component(props) {
  return <div>{props.name} - {props.age}</div>;
}

// ✅ Use destructuring
function Component({ name, age }) {
  return <div>{name} - {age}</div>;
}
```

### 4. Use template literals

```javascript
// ❌ Avoid
const message = 'Hello, ' + name + '!';

// ✅ Use template literal
const message = `Hello, ${name}!`;
```

### 5. Use array methods instead of loops

```javascript
// ❌ Avoid
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// ✅ Use map
const doubled = numbers.map(n => n * 2);
```

---

## Summary

Modern JavaScript features make code:
- ✅ More readable and concise
- ✅ Easier to maintain
- ✅ Less error-prone
- ✅ Better suited for React development

**Key Takeaways:**
- Arrow functions provide cleaner syntax and lexical `this`
- Destructuring simplifies working with objects and arrays
- Spread/rest operators make copying and merging easier
- Async/await makes asynchronous code readable
- Array methods are essential for React rendering
- Optional chaining and nullish coalescing prevent errors

---

**[⬅ Back to Reference](../reference/reference0.md)** | **[➡ Next: Lab Exercises](../lab/lab0.md)**
