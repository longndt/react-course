# Common Issues & Troubleshooting Guide

---

## 📋 Table of Contents

1. [Environment Setup Errors](#1-environment-setup-errors)
2. [JavaScript Errors](#2-javascript-errors)
3. [React Common Errors](#3-react-common-errors)
4. [Build & Bundler Errors](#4-build--bundler-errors)
5. [API & Network Errors](#5-api--network-errors)
6. [Deployment Errors](#6-deployment-errors)
7. [Styling & CSS Issues](#7-styling--css-issues)
8. [Performance Issues](#8-performance-issues)

---

## 1. Environment Setup Errors

### Problem: "npm command not found"

**Cause:** Node.js is not installed or not in PATH **Solution:**

1. Download and install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your terminal/command prompt
3. Verify installation: `node --version` and `npm --version`

### Problem: "Permission denied" when running npm commands

**Symptoms:**

```bash
C:\> node --version
'node' is not recognized as an internal or external command
```

**Cause:**
- Node.js not installed
- Node.js not in PATH environment variable

**Solution:**

1. **Check installation:**
   - Download Node.js LTS from [nodejs.org](https://nodejs.org)
   - Run installer and **check**"Automatically install necessary tools"

2. **Restart terminal:**
   - Close all terminal windows
   - Open new terminal
   - Try again `node --version`

3. **Check PATH (if still failing):**
   - Windows: Search "Environment Variables" → System Properties → Path
   - Check if `C:\Program Files\nodejs\` exists
   - Add if missing, restart terminal **Prevention:**
- Always download from official nodejs.org
- Use LTS version, not Current
- Restart computer after installation

### Problem: Project won't start - "Port 3000 already in use"

**Cause:** Another application is using the same port **Solution:**

```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

---

## 2. JavaScript Errors

### Error: `Cannot read property of undefined`

**Symptoms:**

```javascript
const user = null;
console.log(user.name); // TypeError: Cannot read property 'name' of null
```

**Cause:**
Trying to access properties of undefined or null values **Solution:**

```javascript
// Wrong - might crash if user is undefined
function UserProfile({ user }) {
  return <div>{user.name}</div>; // Error if user is undefined
}

// Correct - with optional chaining
function UserProfile({ user }) {
  return <div>{user?.name || "Guest"}</div>;
}

// Even safer - with conditional rendering
function UserProfile({ user }) {
  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

---

### Error: `ReferenceError: variable is not defined`

**Symptoms:**

```javascript
console.log(myVariable); // ReferenceError: myVariable is not defined
```

**Cause:**
Variable used before declaration or outside its scope **Solution:**

```javascript
// Wrong - using before declaration
console.log(myVariable); // Error
let myVariable = "Hello";

// Correct - declare before use
let myVariable = "Hello";
console.log(myVariable); // Works

// Wrong - variable out of scope
if (true) {
  let myVariable = "Hello";
}
console.log(myVariable); // Error - out of scope

// Correct - declare in proper scope
let myVariable;
if (true) {
  myVariable = "Hello";
}
console.log(myVariable); // Works
```

---

### Error: `TypeError: Cannot read property 'map' of undefined`

**Symptoms:**

```javascript
const users = null;
users.map(user => user.name); // TypeError: Cannot read property 'map' of null
```

**Cause:**
Trying to call array methods on non-array values **Solution:**

```javascript
// Wrong - no null check
function UserList({ users }) {
  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}

// Correct - with null check
function UserList({ users }) {
  if (!users || !Array.isArray(users)) {
    return <div>No users available</div>;
  }

  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}

// Or with default value
function UserList({ users = [] }) {
  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

---

## 3. React Common Errors

### Error: `React Hook "useState" is called conditionally`

**Symptoms:**

```jsx
import { useState } from 'react';

function MyComponent({ isActive }) {
  if (isActive) {
    const [count, setCount] = useState(0); // Error!
  }

  return <div>Component</div>;
}
```

**Cause:**
Violating Rules of Hooks - hooks must be called unconditionally **Solution:**

```jsx
// Solution: Move hook to top level
function MyComponent({ isActive }) {
  const [count, setCount] = useState(0); // Correct

  if (!isActive) {
    return null; // Conditional return
  }

  return <div>Count: {count}</div>;
}
```

**Rules of Hooks:**
1. Only call at top level (not in loops, conditions, nested functions)
2. Only call in React function components or custom hooks
3. Hooks must be called in the same order every render

---

### Error: `Objects are not valid as a React child`

**Symptoms:**

```jsx
function UserProfile() {
  const user = { name: 'John', age: 25 };
  return <div>{user}</div>; // Error: Objects are not valid as a React child
}
```

**Cause:**
React cannot render objects directly, only strings, numbers, arrays of JSX **Solution:**

```jsx
// Solution 1: Render object properties
function UserProfile() {
  const user = { name: 'John', age: 25 };
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

// Solution 2: Convert to string (for debugging)
function UserProfile() {
  const user = { name: 'John', age: 25 };
  return <div>{JSON.stringify(user)}</div>;
}
```

---

### Error: Infinite re-render loop

**Symptoms:**
```
Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
```

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Causes infinite loop!
  setCount(count + 1);

  return <div>{count}</div>;
}
```

**Cause:**
`setCount` is called directly in render, causing re-render → calls setCount again → infinite loop **Solution:**

```jsx
import { useState, useEffect } from 'react';

// Solution 1: Call in event handler
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}

// Solution 2: useEffect with dependencies
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Only runs when needed
    const timer = setTimeout(() => setCount(c => c + 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return <div>{count}</div>;
}
```

---

### Error: `Can't perform a React state update on an unmounted component`

**Symptoms:**

```
Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
```

**Cause:**
Component unmounted before async operation (fetch, setTimeout) completes **Solution:**

```jsx
import { useState, useEffect } from 'react';

// Solution: Cleanup with flag
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true; // Cleanup flag

    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (isMounted) { // Only update if still mounted
          setUser(data);
        }
      });

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  return <div>{user?.name}</div>;
}

// Alternative: AbortController
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/user', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    });

  return () => controller.abort();
}, []);
```

---

### Error: `Missing dependencies in useEffect`

**Symptoms:**

```jsx
import { useState, useEffect } from 'react';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(query).then(setResults);
  }, []); // Warning: React Hook useEffect has a missing dependency: 'query'

  return <div>{results}</div>;
}
```

**Solution:**

```jsx
// Solution: Add missing dependency
useEffect(() => {
  fetchResults(query).then(setResults);
}, [query]); // Include 'query'

// Now effect runs when query changes
```

** When to ignore warning?**
- NEVER! Always fix dependencies
- If you really want to run once, move logic outside component

---

### Error: `Each child in a list should have a unique "key" prop`

**Symptoms:**

```jsx
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <div>{user.name}</div> // Warning: missing "key"
      ))}
    </div>
  );
}
```

**Solution:**

```jsx
// Solution: Add unique key
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// NEVER use index as key (for dynamic lists)
{users.map((user, index) => (
  <div key={index}>{user.name}</div> // BAD for add/remove/reorder
))}

// Use stable unique ID
{users.map(user => (
  <div key={user.id}>{user.name}</div> // GOOD
))}
```

---

### Problem: "Component is not defined" error

**Cause:** Forgot to import the component **Solution:**

```jsx
// Wrong - missing import
function App() {
  return <MyComponent />; // Error!
}

// Correct - with import
import MyComponent from "./MyComponent";

function App() {
  return <MyComponent />; // Works!
}
```

---

### Problem: Components not re-rendering when data changes

**Cause:** Mutating state directly instead of creating new state **Solution:**

```jsx
// Wrong - mutating existing array
const [items, setItems] = useState([]);

const addItem = (newItem) => {
  items.push(newItem); // This won't trigger re-render!
  setItems(items);
};

// Correct - creating new array
const addItem = (newItem) => {
  setItems([...items, newItem]); // This will trigger re-render
};
```

---

## 4. Build & Bundler Errors

### Error: `Failed to resolve import`

**Symptoms:**

```bash
[vite] Failed to resolve import "./components/Button" from "src/App.jsx"
```

**Cause:**
- File doesn't exist
- Wrong path
- Missing extension

**Solution:**

```jsx
// Wrong
import Button from './components/Button'; // Missing .jsx

// Correct
import Button from './components/Button.jsx';

// Or check file exists:
// components/Button.jsx ← must have this file!
```

**Checklist:**
- [ ] File path correct? (case-sensitive!)
- [ ] Extension correct? (.jsx, .js)
- [ ] File exists? (check in VS Code explorer)
- [ ] Export correct? (export default or named export)

---

### Error: `Module not found: Can't resolve 'react'`

**Symptoms:**

```bash
Module not found: Error: Can't resolve 'react' in 'C:\project\src'
```

**Solution:**

```bash
# 1. Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# 2. Reinstall dependencies
npm install

# 3. Restart dev server
npm run dev
```

**If still failing:**

```bash
# Check package.json has dependencies:
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}

# Reinstall React
npm install react react-dom
```

---

## 5. API & Network Errors

### Error: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Symptoms:**

```
Access to fetch at 'http://localhost:5000/api/users' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**Cause:**
Backend doesn't allow requests from frontend origin **Backend Solution (Express):**

```javascript
// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));

// Or allow all origins (development only!)
app.use(cors());

app.listen(5000);
```

**Frontend Solution (Vite Proxy):**

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
};

// Now use relative URLs in fetch
fetch('/api/users') // Instead of http://localhost:5000/api/users
```

---

### Error: `Failed to fetch` / Network request failed

**Symptoms:**

```jsx
fetch('/api/users')
  .then(res => res.json())
  .catch(err => console.error(err)); // TypeError: Failed to fetch
```

**Checklist:**
- [ ] Backend server running? (`npm run server`)
- [ ] Port correct? (5000, 3000, etc.)
- [ ] URL correct? (typo in endpoint?)
- [ ] Network tab in DevTools showing anything?

**Solution:**

```jsx
// Add better error handling
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);
    // Check if server is running
    // Check network tab in DevTools
    throw error;
  }
}
```

---

### Problem: Data not showing up from API

**Cause:** Not handling async operations properly **Solution:**

```jsx
// Wrong - not handling async properly
function UserList() {
  const [users, setUsers] = useState([]);

  fetch("/api/users")
    .then((res) => res.json())
    .then(setUsers); // This runs but component may not re-render correctly

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// Correct - using useEffect
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

---

## 6. Deployment Errors

### Error: 404 on refresh (React Router on Netlify/Vercel)

**Symptoms:**
- App works fine: `yoursite.com`
- Refresh on route: `yoursite.com/about` → 404

**Cause:**
Server doesn't know React Router, need to redirect all routes to index.html **Netlify Solution:**

```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel Solution:**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

### Error: Environment variables not working in production

**Symptoms:**

```jsx
console.log(import.meta.env.VITE_API_URL); // undefined in production
```

**Solution:**

1. **Check naming:** Must start with `VITE_`
   ```env
   # Wrong
   API_URL=http://localhost:5000

   # Correct
   VITE_API_URL=http://localhost:5000
   ```

2. **Add to platform:**
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment Variables
   - Railway: Variables tab

3. **Rebuild app** after adding env vars

---

## 7. Styling & CSS Issues

### Problem: CSS classes not applying

**Cause:** Using `class` instead of `className` or incorrect CSS import **Solution:**

```jsx
// Wrong - 'class' doesn't work in React
<div class="container">Content</div>

// Correct - use 'className'
<div className="container">Content</div>
```

```jsx
// Make sure to import your CSS
import "./MyComponent.css";

function MyComponent() {
  return <div className="my-style">Content</div>;
}
```

---

### Problem: Styles not loading

**Cause:** CSS file not imported or incorrect path **Solution:**

```jsx
// Import CSS at the top of your component file
import "./styles/MyComponent.css";
import "../shared/global.css";

// Or import in main.jsx for global styles
// main.jsx
import "./index.css";
```

---

## 8. Performance Issues

### Problem: App is slow when typing in forms

**Cause:** Re-rendering entire component tree on every keystroke **Solution:**

```jsx
// Inefficient - recreating function on every render
function SearchForm() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)} // New function every render
    />
  );
}

// Efficient - stable function reference
import { useCallback } from 'react';

function SearchForm() {
  const [query, setQuery] = useState("");

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  return <input value={query} onChange={handleChange} />;
}
```

---

### Problem: Components are getting too large and complex

**Cause:** Trying to do too much in one component **Solution:**

```jsx
// Bad - one giant component
function StudentDashboard() {
  // 200+ lines of code handling:
  // - User authentication
  // - Data fetching
  // - Form handling
  // - Display logic
  // This is too much!
}

// Good - broken into smaller components
function StudentDashboard() {
  return (
    <div>
      <Header />
      <StudentList />
      <AddStudentForm />
      <Statistics />
    </div>
  );
}
```

---

### Problem: Hard to manage data between components

**Cause:** Passing props through too many levels **Solution:**

```jsx
// Prop drilling - passing props through many levels
<App>
  <Dashboard user={user} />
    <Sidebar user={user} />
      <UserProfile user={user} />

// Context API - share data across components
import { createContext, useContext } from 'react';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user } = useContext(UserContext);
  return <div>{user?.name}</div>;
}
```

---

## 🆘 When All Else Fails

### Debugging Steps:

1. **Check the browser console** for error messages
2. **Read the error message carefully** - it usually tells you what's wrong
3. **Use console.log()** to check if your data is what you expect
4. **Check your component props** with React Developer Tools
5. **Search the exact error message** on Google or Stack Overflow
6. **Ask for help** - show your code and the error message

### Helpful Browser Extensions:

- **React Developer Tools** - Inspect React components

- **Redux DevTools** - Debug state management

- **JSON Formatter** - View API responses nicely

### Online Resources:

- [React Documentation](https://react.dev/) - Official docs
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - JavaScript reference
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs) - Community help
- [React subreddit](https://reddit.com/r/reactjs) - Discussion and help
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript reference

---

## Quick Reference Cheat Sheet

### Most Common React Patterns:

```jsx
import { useState, useEffect } from 'react';

// Component with props
function MyComponent({ title, children }) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

// Component with state
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Component with effect
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}

// List rendering
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Remember:

- **Always use `key` props** when rendering lists

- **Start component names with capital letters**

- **Use `className` not `class`**

- **Import components before using them**

- **Use `useEffect` for side effects** (API calls, subscriptions)

- **Don't mutate state directly** - always create new objects/arrays

- **Use optional chaining (`?.`)** to safely access object properties

- **Always check for null/undefined** before calling array methods

---
