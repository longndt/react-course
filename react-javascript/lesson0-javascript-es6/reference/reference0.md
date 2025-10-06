# JavaScript ES6+ Quick Reference

## 1. Arrow Functions

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

**Use Cases:**
- Callbacks and array methods
- Short function expressions
- When you don't need `this` binding

---

## 2. Destructuring

### Object Destructuring
```javascript
const user = { name: 'John', age: 30, city: 'NYC' };

// Extract properties
const { name, age } = user;

// Rename variables
const { name: userName, age: userAge } = user;

// Default values
const { country = 'USA' } = user;

// Nested destructuring
const person = {
  name: 'Alice',
  address: { city: 'Boston', zip: '02101' }
};
const { address: { city } } = person;
```

### Array Destructuring
```javascript
const colors = ['red', 'green', 'blue'];

// Extract elements
const [first, second] = colors;

// Skip elements
const [, , third] = colors;

// Rest operator
const [primary, ...others] = colors;

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];
```

---

## 3. Template Literals

```javascript
const name = 'World';
const greeting = `Hello, ${name}!`;

// Multi-line strings
const message = `
  This is a
  multi-line
  string
`;

// Expression evaluation
const price = 19.99;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<strong>${values[i] || ''}</strong>`;
  }, '');
}
const product = 'Book';
const tagged = highlight`Buy this ${product} now!`;
```

---

## 4. Spread & Rest Operators

### Spread Operator (...)
```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// Object spreading
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };

// Copy with modifications
const original = { name: 'John', age: 30 };
const updated = { ...original, age: 31 };

// Function arguments
const numbers = [1, 2, 3, 4, 5];
Math.max(...numbers);
```

### Rest Parameters
```javascript
// Collect remaining arguments
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

// With other parameters
function greet(greeting, ...names) {
  return `${greeting}, ${names.join(' and ')}!`;
}
greet('Hello', 'Alice', 'Bob'); // "Hello, Alice and Bob!"
```

---

## 5. Default Parameters

```javascript
// Simple defaults
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

// Expression as default
function createUser(name, role = name.includes('admin') ? 'admin' : 'user') {
  return { name, role };
}

// Using previous parameters
function calculatePrice(price, tax = price * 0.1) {
  return price + tax;
}
```

---

## 6. Modules (Import/Export)

### Named Exports
```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export class Calculator {
  // ...
}

// Importing
import { PI, add, Calculator } from './math.js';
// Or rename
import { add as sum } from './math.js';
// Or import all
import * as Math from './math.js';
```

### Default Export
```javascript
// User.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Importing
import User from './User.js';
// Can use any name
import MyUser from './User.js';
```

### Re-exporting
```javascript
// components/index.js
export { Button } from './Button.js';
export { Input } from './Input.js';
export { default as Card } from './Card.js';

// Usage
import { Button, Input, Card } from './components';
```

---

## 7. Promises

```javascript
// Creating a Promise
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

// Using Promises
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));

// Chaining
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Promise.all
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results));

// Promise.race
Promise.race([promise1, promise2])
  .then(result => console.log('First to resolve:', result));
```

---

## 8. Async/Await

```javascript
// Basic async function
async function fetchUser() {
  const response = await fetch('/api/user');
  const data = await response.json();
  return data;
}

// Error handling
async function getData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Multiple awaits
async function getMultipleData() {
  // Sequential
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);

  // Parallel (faster)
  const [user2, posts2] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
}

// Async arrow functions
const loadData = async () => {
  const data = await fetch('/api/data');
  return data.json();
};
```

---

## 9. Array Methods

### map() - Transform
```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8]

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
const names = users.map(user => user.name);
// ['John', 'Jane']
```

### filter() - Select
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]

const users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
];
const activeUsers = users.filter(user => user.active);
```

### reduce() - Accumulate
```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, n) => total + n, 0);
// 10

const items = [
  { name: 'Book', price: 10 },
  { name: 'Pen', price: 5 }
];
const total = items.reduce((sum, item) => sum + item.price, 0);
// 15
```

### find() & findIndex()
```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];
const user = users.find(u => u.id === 2);
// { id: 2, name: 'Jane' }

const index = users.findIndex(u => u.name === 'Jane');
// 1
```

### some() & every()
```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.some(n => n > 3); // true
numbers.every(n => n > 0); // true
numbers.every(n => n > 3); // false
```

---

## 10. Optional Chaining & Nullish Coalescing

### Optional Chaining (?.)
```javascript
const user = {
  name: 'John',
  address: {
    city: 'NYC'
  }
};

// Safe property access
const city = user?.address?.city; // 'NYC'
const zip = user?.address?.zip; // undefined (no error)

// Safe method call
const userName = user?.getName?.(); // undefined if method doesn't exist

// Safe array access
const firstItem = items?.[0];
```

### Nullish Coalescing (??)
```javascript
// Returns right side only if left is null or undefined
const value1 = null ?? 'default'; // 'default'
const value2 = undefined ?? 'default'; // 'default'
const value3 = 0 ?? 'default'; // 0 (not null/undefined)
const value4 = '' ?? 'default'; // '' (not null/undefined)

// vs OR operator (||)
const a = 0 || 'default'; // 'default' (0 is falsy)
const b = 0 ?? 'default'; // 0 (0 is not null/undefined)

// With optional chaining
const userName = user?.name ?? 'Guest';
```

---

## 11. Object & Array Shortcuts

### Object Property Shorthand
```javascript
const name = 'John';
const age = 30;

// Old way
const user1 = { name: name, age: age };

// Shorthand
const user2 = { name, age };
```

### Computed Property Names
```javascript
const key = 'name';
const obj = {
  [key]: 'John',
  ['age']: 30,
  [`${key}Count`]: 1
};
// { name: 'John', age: 30, nameCount: 1 }
```

### Method Shorthand
```javascript
// Old way
const obj1 = {
  greet: function() {
    return 'Hello';
  }
};

// Shorthand
const obj2 = {
  greet() {
    return 'Hello';
  }
};
```

---

## 12. Classes

```javascript
class User {
  // Constructor
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet() {
    return `Hello, I'm ${this.name}`;
  }

  // Getter
  get info() {
    return `${this.name} (${this.age})`;
  }

  // Setter
  set updateAge(newAge) {
    this.age = newAge;
  }

  // Static method
  static create(name, age) {
    return new User(name, age);
  }
}

// Inheritance
class Admin extends User {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  greet() {
    return `${super.greet()} - I'm an admin`;
  }
}
```

---

## React-Specific Usage Examples

### Component with Destructuring
```javascript
// Props destructuring
function UserCard({ name, age, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}
```

### Array Methods in JSX
```javascript
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

### Async Data Fetching
```javascript
import { useState, useEffect } from 'react';

function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return <div>{data?.message ?? 'Loading...'}</div>;
}
```

### Spread for Props
```javascript
function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

// Usage
<Button className="btn" onClick={handleClick}>
  Click me
</Button>
```

---

## Common Patterns in React

### State Updates with Spread
```javascript
// Update object state
const [user, setUser] = useState({ name: '', age: 0 });
setUser({ ...user, age: 31 });

// Update array state
const [items, setItems] = useState([]);
setItems([...items, newItem]);
```

### Conditional Rendering
```javascript
// Using && (short-circuit)
{isLoggedIn && <UserProfile />}

// Using ternary
{isLoading ? <Spinner /> : <Content />}

// Using nullish coalescing
<div>{userName ?? 'Guest'}</div>
```

### Event Handlers
```javascript
// Arrow function in JSX
<button onClick={() => handleClick(id)}>Click</button>

// Method reference
<button onClick={handleClick}>Click</button>

// With event object
const handleSubmit = (e) => {
  e.preventDefault();
  // ...
};
```

---

## Browser Console Testing

Try these in your browser console:

```javascript
// Arrow functions
const greet = name => `Hello, ${name}!`;
console.log(greet('World'));

// Destructuring
const { log } = console;
log('Using destructured log');

// Template literals
const name = 'JavaScript';
log(`Learning ${name}`);

// Array methods
[1, 2, 3, 4, 5]
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

// Async/await
async function test() {
  const response = await fetch('https://api.github.com/users/github');
  const data = await response.json();
  return data;
}
test().then(console.log);
```

---

## Practice Exercises

### Exercise 1: Refactor to ES6+
```javascript
// Old ES5 code - refactor this!
var numbers = [1, 2, 3, 4, 5];
var doubled = [];
for (var i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

function greet(name) {
  if (name === undefined) {
    name = 'Guest';
  }
  return 'Hello, ' + name + '!';
}

var user = { name: 'John', age: 30 };
var userName = user.name;
var userAge = user.age;
```

### Exercise 2: Async Data Processing
```javascript
// Fetch data from multiple APIs and combine results
// Use async/await, Promise.all, and array methods
```

### Exercise 3: Object Manipulation
```javascript
// Create functions using destructuring, spread, and shortcuts
// - mergeUsers(user1, user2)
// - updateUser(user, updates)
// - getUserInfo({ name, age, email })
```

---

**[⬅ Back to Lesson Overview](../readme.md)** | **[➡ Next: Theory Documentation](../theory/theory0.md)**
