# Theory - JavaScript ES6+ Prerequisites

> **Purpose of this file**: Explains **WHY** modern JavaScript features exist, **HOW** they work, and **WHEN** to use them in React. Code examples include comments to understand concepts.
> 
> **Use Reference0 when you need**: Quick ES6 syntax lookup, copy-paste ready code patterns.

---

## Table of Contents

1. [Why Modern JavaScript for React?](#1-why-modern-javascript-for-react)
2. [Arrow Functions & `this` Binding](#2-arrow-functions--this-binding)
3. [Destructuring & Spread Operator](#3-destructuring--spread-operator)
4. [Template Literals](#4-template-literals)
5. [Modules (Import/Export)](#5-modules-importexport)
6. [Array Methods & Functional Programming](#6-array-methods--functional-programming)
7. [Async/Await & Promises](#7-asyncawait--promises)
8. [JavaScript with React](#8-javascript-with-react)
9. [Common Mistakes](#9-common-mistakes)

---

## 1. Why Modern JavaScript for React?

### The Problem Old JavaScript Had

**Traditional JavaScript - Verbose and Error-Prone:**

```javascript
// Old JavaScript - Verbose and hard to read
function greetUser(user) {
  var greeting = 'Hello, ' + user.firstName + ' ' + user.lastName + '!';
  return greeting;
}

// Manual array operations
var numbers = [1, 2, 3, 4, 5];
var doubled = [];
for (var i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Callback hell with nested functions
getUserData(function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      // Nested callbacks - hard to read and maintain! 💥
    });
  });
});
```

**Modern JavaScript (ES6+) - Clean and Readable:**

```javascript
// ES6+ - Concise and expressive
const greetUser = ({ firstName, lastName }) => {
  return `Hello, ${firstName} ${lastName}!`;
};

// Array methods - declarative
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// Async/await - linear code flow
async function loadUserData() {
  const user = await getUserData();
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  // Clean and readable! ✅
}
```

**Key Insight**: Modern JavaScript features make code more readable, maintainable, and less error-prone - essential for React development.

### Why React + Modern JavaScript?

| Aspect | Old JavaScript | ES6+ JavaScript |
|--------|---------------|-----------------|
| **Code readability** | Verbose, hard to follow | Concise, expressive |
| **Array operations** | Manual loops | Functional methods (map, filter) |
| **Async code** | Callback hell | Async/await |
| **Object handling** | Manual property access | Destructuring |
| **String formatting** | Concatenation | Template literals |
| **Module system** | Global variables | Import/export |

**Industry Reality**: React heavily relies on ES6+ features. Modern JavaScript is essential for professional React development.

---

## 2. Arrow Functions & `this` Binding

### The Problem with Traditional Functions

**Traditional Functions - `this` Binding Issues:**

```javascript
// Traditional function - `this` is confusing
const obj = {
  name: 'John',
  greet: function() {
    // `this` depends on HOW the function is called
    setTimeout(function() {
      console.log(`Hello, ${this.name}!`);  // 💥 `this` is undefined or window
    }, 1000);
  }
};

obj.greet();  // "Hello, undefined!" - Wrong!

// Workaround needed
const obj2 = {
  name: 'John',
  greet: function() {
    const self = this;  // Save reference
    setTimeout(function() {
      console.log(`Hello, ${self.name}!`);  // Works but verbose
    }, 1000);
  }
};
```

**Arrow Functions - Lexical `this`:**

```javascript
// Arrow function - `this` is inherited from parent scope
const obj = {
  name: 'John',
  greet: function() {
    // Arrow function inherits `this` from `greet`
    setTimeout(() => {
      console.log(`Hello, ${this.name}!`);  // ✅ "Hello, John!"
    }, 1000);
  }
};

obj.greet();  // ✅ Works correctly!

// Arrow functions in React (common pattern)
function MyComponent() {
  const handleClick = () => {
    // `this` is not needed - arrow function handles it
    console.log('Button clicked');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### When to Use Arrow Functions

```javascript
// ✅ Use arrow functions for:
// 1. Event handlers
const handleClick = () => console.log('Clicked');

// 2. Array methods
const doubled = numbers.map(n => n * 2);

// 3. Callbacks
setTimeout(() => console.log('Done'), 1000);

// 4. Short functions
const add = (a, b) => a + b;

// ⚠️ Be careful with object methods
const obj = {
  name: 'John',
  // ❌ BAD: Arrow function here loses `this` context
  greet: () => console.log(this.name),  // `this` is window/undefined
  
  // ✅ GOOD: Regular function for object methods
  greetProper: function() {
    console.log(this.name);  // Works correctly
  }
};
```

**Rule of Thumb**: Use arrow functions for callbacks and short functions. Use regular functions for object methods that need `this`.

---

## 3. Destructuring & Spread Operator

### The Problem: Verbose Property Access

**Traditional Way - Repetitive:**

```javascript
// Traditional - Repetitive and error-prone
function processUser(user) {
  const name = user.name;
  const age = user.age;
  const email = user.email;
  const city = user.city || 'Unknown';
  
  // What if user is undefined? 💥
  return `${name} is ${age} years old`;
}

// Array access - verbose
const colors = ['red', 'green', 'blue'];
const first = colors[0];
const second = colors[1];
const rest = colors.slice(2);
```

**Destructuring - Clean and Safe:**

```javascript
// Object destructuring - Clean and safe
function processUser({ name, age, email, city = 'Unknown' }) {
  // Direct access to properties
  // Default value for city if missing
  return `${name} is ${age} years old`;
}

// Array destructuring - Elegant
const colors = ['red', 'green', 'blue'];
const [first, second, ...rest] = colors;
// first = 'red', second = 'green', rest = ['blue']

// Swapping variables - One line!
let a = 1, b = 2;
[a, b] = [b, a];  // ✅ a = 2, b = 1
```

### Spread Operator: Copying and Merging

**The Problem: Mutating Objects/Arrays:**

```javascript
// ❌ BAD: Mutating original object
const user = { name: 'John', age: 25 };
const updatedUser = user;
updatedUser.age = 26;  // 💥 Also changes `user`!

// ❌ BAD: Manual array copying
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = arr1.concat(arr2);  // Works but verbose
```

**Spread Operator - Immutable Updates:**

```javascript
// ✅ GOOD: Creating new object (immutable)
const user = { name: 'John', age: 25 };
const updatedUser = { ...user, age: 26 };  // New object, user unchanged

// ✅ GOOD: Spreading arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// ✅ GOOD: Merging objects
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { lang: 'vi' };
const settings = { ...defaults, ...userPrefs };  // { theme: 'light', lang: 'vi' }
```

**Why This Matters**: React requires immutable updates. Spread operator makes this easy and safe.

---

## 4. Template Literals

### The Problem: String Concatenation

**Traditional Way - Hard to Read:**

```javascript
// Traditional - Hard to read and error-prone
const name = 'John';
const age = 25;
const city = 'Hanoi';
const message = 'Hello, ' + name + '! You are ' + age + ' years old and live in ' + city + '.';

// Multi-line strings - Awkward
const html = '<div>\n' +
  '  <h1>Welcome, ' + name + '!</h1>\n' +
  '  <p>You are ' + age + ' years old.</p>\n' +
  '</div>';
```

**Template Literals - Clean and Readable:**

```javascript
// Template literals - Clean and readable
const name = 'John';
const age = 25;
const city = 'Hanoi';
const message = `Hello, ${name}! You are ${age} years old and live in ${city}.`;

// Multi-line strings - Natural
const html = `
  <div>
    <h1>Welcome, ${name}!</h1>
    <p>You are ${age} years old.</p>
  </div>
`;

// Expressions in template literals
const price = 19.99;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;

// Function calls
const user = { name: 'John', age: 25 };
const message = `Hello, ${user.name.toUpperCase()}! You are ${user.age} years old.`;
```

**Key Insight**: Template literals make string formatting readable and maintainable - essential for JSX and dynamic content.

---

## 5. Modules (Import/Export)

### The Problem: Global Variables

**Traditional Way - Global Namespace Pollution:**

```javascript
// ❌ BAD: Global variables - conflicts and bugs
var utils = {
  add: function(a, b) { return a + b; },
  subtract: function(a, b) { return a - b; }
};

// What if another script also defines `utils`? 💥
```

**ES6 Modules - Encapsulated Code:**

```javascript
// ✅ GOOD: Named exports
// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}

// ✅ GOOD: Default export
// Calculator.js
const Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
export default Calculator;

// ✅ GOOD: Importing
// app.js
import { PI, add } from './math.js';
import Calculator from './Calculator.js';

console.log(PI);  // 3.14159
console.log(add(1, 2));  // 3
console.log(Calculator.add(5, 3));  // 8
```

### React Component Example

```jsx
// Button.jsx
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;

// App.jsx
import React from 'react';
import Button from './Button';

function App() {
  return (
    <div>
      <Button onClick={() => alert('Clicked')}>Click me</Button>
    </div>
  );
}

export default App;
```

**Why This Matters**: Modules keep code organized, prevent conflicts, and enable tree-shaking for smaller bundles.

---

## 6. Array Methods & Functional Programming

### The Problem: Manual Loops

**Traditional Way - Imperative and Error-Prone:**

```javascript
// Traditional - Manual loops, easy to make mistakes
const numbers = [1, 2, 3, 4, 5];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Filtering - verbose
const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 17 }
];
const adults = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 18) {
    adults.push(users[i]);
  }
}
```

**Array Methods - Declarative and Safe:**

```javascript
// ✅ GOOD: map - transform each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]

// ✅ GOOD: filter - keep elements that match condition
const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 17 }
];
const adults = users.filter(user => user.age >= 18);

// ✅ GOOD: find - find first matching element
const john = users.find(user => user.name === 'John');

// ✅ GOOD: reduce - reduce array to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15
const totalAge = users.reduce((acc, user) => acc + user.age, 0);  // 72

// ✅ GOOD: forEach - execute function for each element
users.forEach(user => console.log(user.name));
```

### Method Chaining

```javascript
// Chain multiple methods for powerful transformations
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 35, active: true }
];

// Get sorted names of active users
const activeUserNames = users
  .filter(user => user.active)      // Keep only active users
  .map(user => user.name)            // Extract names
  .sort();                           // Sort alphabetically

console.log(activeUserNames);  // ['Bob', 'John']
```

**Why This Matters**: Array methods are the foundation of React - you'll use `map` constantly to render lists of components.

---

## 7. Async/Await & Promises

### The Problem: Callback Hell

**Traditional Way - Callback Hell:**

```javascript
// ❌ BAD: Callback hell - hard to read and maintain
getUserData(function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      getReplies(comments[0].id, function(replies) {
        // Nested callbacks - nightmare! 💥
        console.log(replies);
      });
    });
  });
});
```

**Promises - Better, But Still Verbose:**

```javascript
// ✅ BETTER: Promises - cleaner but still verbose
getUserData()
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => getReplies(comments[0].id))
  .then(replies => console.log(replies))
  .catch(error => console.error(error));
```

**Async/Await - Clean and Readable:**

```javascript
// ✅ BEST: Async/await - clean and readable
async function loadUserData() {
  try {
    const user = await getUserData();
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    const replies = await getReplies(comments[0].id);
    console.log(replies);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### React Example with Async/Await

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
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

  return <div>{user.name}</div>;
}
```

**Key Insight**: Async/await makes asynchronous code look synchronous - essential for API calls in React.

---

## 8. JavaScript with React

### Props: Destructuring in Components

**Without Destructuring:**

```jsx
// ❌ Verbose - accessing props manually
function Button(props) {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.label}
    </button>
  );
}
```

**With Destructuring:**

```jsx
// ✅ Clean - destructure props directly
function Button({ label, onClick, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// Usage
<Button label="Click" onClick={() => {}} />                    // ✅
<Button label="Click" onClick={() => {}} disabled={true} />     // ✅
```

### Event Handlers: Arrow Functions

```jsx
function Form() {
  // ✅ Arrow function - clean event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### State: Immutable Updates with Spread

```jsx
import { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  // ✅ GOOD: Immutable update with spread
  const updateAge = () => {
    setUser({ ...user, age: user.age + 1 });  // New object
  };
  
  // ❌ BAD: Mutating state directly
  // const updateAge = () => {
  //   user.age = user.age + 1;  // 💥 Don't do this!
  //   setUser(user);
  // };
  
  return (
    <div>
      <p>{user.name} is {user.age} years old</p>
      <button onClick={updateAge}>Age +1</button>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  
  // ✅ GOOD: Simple state update
  const increment = () => setCount(count + 1);
  
  return <div>{count}</div>;
}
```

### Array Rendering: Using `map`

```jsx
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

**Key Pattern**: React requires immutable updates. Always use spread operator and array methods that return new arrays.

---

## 9. Common Mistakes

### Mistake 1: Mutating State Directly

```javascript
// ❌ BAD: Mutating state directly
const [users, setUsers] = useState([]);

const addUser = (newUser) => {
  users.push(newUser);  // 💥 Mutating original array
  setUsers(users);      // React won't detect the change!
};

// ✅ GOOD: Creating new array
const addUser = (newUser) => {
  setUsers([...users, newUser]);  // New array with spread operator
};

// ✅ GOOD: Updating object in array
const updateUser = (userId, updates) => {
  setUsers(users.map(user => 
    user.id === userId ? { ...user, ...updates } : user
  ));
};
```

### Mistake 2: Missing Dependencies in useEffect

```javascript
// ❌ BAD: Missing dependencies
useEffect(() => {
  fetchUser(userId);
}, []);  // Missing userId dependency - won't update when userId changes!

// ✅ GOOD: Include all dependencies
useEffect(() => {
  fetchUser(userId);
}, [userId]);  // Correct - includes userId
```

### Mistake 3: Not Using Key Prop in Lists

```jsx
// ❌ BAD: Missing key prop
{users.map(user => (
  <li>{user.name}</li>  // 💥 React warning, performance issues
))}

// ✅ GOOD: Include key prop
{users.map(user => (
  <li key={user.id}>{user.name}</li>  // ✅ Unique key
))}
```

### Mistake 4: Using Arrow Functions Incorrectly in Objects

```javascript
// ❌ BAD: Arrow function loses `this` context
const obj = {
  name: 'John',
  greet: () => {
    console.log(this.name);  // `this` is window/undefined
  }
};

// ✅ GOOD: Regular function for object methods
const obj = {
  name: 'John',
  greet: function() {
    console.log(this.name);  // Works correctly
  }
};

// ✅ GOOD: Arrow function for React event handlers (no `this` needed)
function MyComponent() {
  const handleClick = () => {
    console.log('Clicked');  // No `this` needed
  };
  return <button onClick={handleClick}>Click</button>;
}
```

---

## Next Steps

You now understand:
- ✅ **Why** modern JavaScript features exist (readability, maintainability)
- ✅ **How** ES6+ features work (arrow functions, destructuring, async/await)
- ✅ **When** to use different patterns in React
- ✅ **How** to use modern JavaScript with React

**Practice**: Head to `lab0.md` for hands-on exercises!

**Quick Reference**: See `reference0.md` for syntax cheat sheets.
