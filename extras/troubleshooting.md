# Common Errors & Troubleshooting Guide# Common Issues & Troubleshooting Guide



> 🎯 **Purpose:** Help students independently resolve common React errors, saving time for both students and instructors.## Quick Solutions for Students



---This guide addresses the most common problems students encounter when learning React. Keep this handy as you work through the course!



## 📋 Table of Contents## 🚨 **Setup & Installation Issues**



1. [Environment Setup Errors](#1-environment-setup-errors)### Problem: "npm command not found"

2. [TypeScript Errors](#2-typescript-errors)

3. [React Common Errors](#3-react-common-errors)**Cause:** Node.js is not installed or not in PATH

4. [Build & Bundler Errors](#4-build--bundler-errors)

5. [API & Network Errors](#5-api--network-errors)**Solution:**

6. [Deployment Errors](#6-deployment-errors)

7. [Styling & CSS Issues](#7-styling--css-issues)1. Download and install Node.js from [nodejs.org](https://nodejs.org/)

8. [Performance Issues](#8-performance-issues)2. Restart your terminal/command prompt

3. Verify installation: `node --version` and `npm --version`

---

### Problem: "Permission denied" when running npm commands

## 1. Environment Setup Errors

**Cause:** Insufficient permissions (common on Mac/Linux)

### ❌ Error: `'node' is not recognized as an internal or external command`**Solution:**



**Symptoms:**```bash

```bash# Option 1: Use npx instead of npm

C:\> node --versionnpx create-vite@latest my-app

'node' is not recognized as an internal or external command

```# Option 2: Fix npm permissions (Mac/Linux)

sudo chown -R $(whoami) ~/.npm

**Cause:**```

- Node.js not installed

- Node.js not in PATH environment variable### Problem: Project won't start - "Port 3000 already in use"



**Solution:****Cause:** Another application is using the same port

1. **Check installation:**

   - Download Node.js LTS from [nodejs.org](https://nodejs.org)**Solution:**

   - Run installer and **check** "Automatically install necessary tools"

```bash

2. **Restart terminal:**# Kill the process using port 3000

   - Close all terminal windowsnpx kill-port 3000

   - Open new terminal

   - Try again `node --version`# Or use a different port

npm run dev -- --port 3001

3. **Check PATH (if still failing):**```

   - Windows: Search "Environment Variables" → System Properties → Path

   - Check if `C:\Program Files\nodejs\` exists## 💻 **React Development Issues**

   - Add if missing, restart terminal

### Problem: "Component is not defined" error

**Prevention:**

- Always download from official nodejs.org**Cause:** Forgot to import the component

- Use LTS version, not Current

- Restart computer after installation**Solution:**



---```jsx

// ❌ Wrong - missing import

### ❌ Error: `npm: command not found` (Mac/Linux)function App() {

  return <MyComponent />; // Error!

**Symptoms:**}

```bash

$ npm --version// ✅ Correct - with import

npm: command not foundimport MyComponent from "./MyComponent";

```

function App() {

**Cause:**  return <MyComponent />; // Works!

- npm not installed with Node.js}

- Permission issues```

- PATH not updated

### Problem: "Cannot read property of undefined"

**Solution:**

**Cause:** Trying to access props that don't exist

**Mac:**

```bash**Solution:**

# 1. Install Homebrew (if not installed)

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```tsx

interface User {

# 2. Install Node.js via Homebrew  name: string;

brew install node}



# 3. Verifyinterface UserProfileProps {

node --version  user?: User;

npm --version}

```

// ❌ Dangerous - might crash if user is undefined

**Linux (Ubuntu/Debian):**function UserProfile({ user }: UserProfileProps) {

```bash  return <div>{user?.name}</div>; // Error if user is undefined

# 1. Update package manager}

sudo apt update

// ✅ Safe - with default values and checks

# 2. Install Node.js & npmfunction UserProfile({ user }: UserProfileProps) {

sudo apt install nodejs npm  return <div>{user?.name || "Guest"}</div>;

}

# 3. Verify

node --version// ✅ Even safer - with conditional rendering

npm --versionfunction UserProfile({ user }: UserProfileProps) {

```  if (!user) return <div>Loading...</div>;



---  return <div>{user.name}</div>;

}

### ❌ Error: `Permission denied` when installing packages```



**Symptoms:**### Problem: Components not re-rendering when data changes

```bash

$ npm install -g create-vite**Cause:** Mutating state directly instead of creating new state

npm ERR! Error: EACCES: permission denied

```**Solution:**



**Solution:**```jsx

// ❌ Wrong - mutating existing array

**❌ DO NOT use sudo!** (will cause issues later)const [items, setItems] = useState([]);



**✅ Fix npm folder permissions:**const addItem = (newItem) => {

```bash  items.push(newItem); // This won't trigger re-render!

# 1. Create directory for global packages  setItems(items);

mkdir ~/.npm-global};



# 2. Configure npm// ✅ Correct - creating new array

npm config set prefix '~/.npm-global'const addItem = (newItem) => {

  setItems([...items, newItem]); // This will trigger re-render

# 3. Add to PATH (add to ~/.bashrc or ~/.zshrc)};

echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc```

source ~/.bashrc

## 🎨 **Styling & CSS Issues**

# 4. Try again (no sudo needed)

npm install -g create-vite### Problem: CSS classes not applying

```

**Cause:** Using `class` instead of `className` or incorrect CSS import

---

**Solution:**

### ❌ Problem: "Port 3000 already in use"

```jsx

**Cause:** Another application is using the same port// ❌ Wrong - 'class' doesn't work in React

<div class="container">Content</div>

**Solution:**

// ✅ Correct - use 'className'

```bash<div className="container">Content</div>

# Kill the process using port 3000```

npx kill-port 3000

```jsx

# Or use a different port// Make sure to import your CSS

npm run dev -- --port 3001import "./MyComponent.css";

```

function MyComponent() {

---  return <div className="my-style">Content</div>;

}

## 2. TypeScript Errors```



### ❌ Error: `Type 'string' is not assignable to type 'number'`### Problem: Styles not loading



**Symptoms:****Cause:** CSS file not imported or incorrect path

```tsx

interface User {**Solution:**

  age: number;

}```jsx

// ✅ Import CSS at the top of your component file

const user: User = {import "./styles/MyComponent.css";

  age: "25" // ❌ Error: Type 'string' is not assignable to type 'number'import "../shared/global.css";

}

```// ✅ Or import in main.jsx for global styles

// main.jsx

**Cause:**import "./index.css";

TypeScript type mismatch - expecting number but receiving string```



**Solution:**## ⚡ **Performance Issues**

```tsx

// ✅ Solution 1: Fix type### Problem: App is slow when typing in forms

const user: User = {

  age: 25 // Number, no quotes**Cause:** Re-rendering entire component tree on every keystroke

}

**Solution:**

// ✅ Solution 2: Convert string to number

const user: User = {```jsx

  age: parseInt("25")// ❌ Inefficient - recreating function on every render

}function SearchForm() {

  const [query, setQuery] = useState("");

// ✅ Solution 3: Update interface (if you really want string)

interface User {  return (

  age: string; // Change to string    <input

}      value={query}

```      onChange={(e) => setQuery(e.target.value)} // New function every render

    />

**Prevention:**  );

- Always check types when defining interfaces}

- Use TypeScript IntelliSense (Ctrl + Space)

- Enable strict mode in tsconfig.json// ✅ Efficient - stable function reference

function SearchForm() {

---  const [query, setQuery] = useState("");



### ❌ Error: `Property 'X' does not exist on type '{}'`  const handleChange = useCallback((e) => {

    setQuery(e.target.value);

**Symptoms:**  }, []);

```tsx

const [user, setUser] = useState({});  return <input value={query} onChange={handleChange} />;

}

// ❌ Error: Property 'name' does not exist on type '{}'```

console.log(user.name);

```## 🔧 **TypeScript Issues**



**Cause:**### Problem: "Type 'X' is not assignable to type 'Y'"

TypeScript doesn't know the shape of the object

**Cause:** TypeScript type mismatch

**Solution:**

```tsx**Solution:**

// ✅ Solution: Define interface

interface User {```tsx

  name: string;// ❌ Wrong - string passed to number prop

  email: string;interface Props {

}  age: number;

}

const [user, setUser] = useState<User>({

  name: '',<MyComponent age="25" /> // Error: string not assignable to number

  email: ''

});// ✅ Correct - proper type

<MyComponent age={25} /> // Works: number

console.log(user.name); // ✅ Works!

```// ✅ Or convert string to number

<MyComponent age={parseInt("25")} />

**Or:**```

```tsx

// If initial value can be null### Problem: "Property does not exist on type"

const [user, setUser] = useState<User | null>(null);

**Cause:** Missing or incorrect interface definition

// Access with optional chaining

console.log(user?.name);**Solution:**

```

```tsx

---// ❌ Wrong - incomplete interface

interface User {

### ❌ Error: `Parameter 'event' implicitly has an 'any' type`  name: string;

}

**Symptoms:**

```tsxfunction UserCard({ user }: { user: User }) {

function handleChange(event) { // ❌ Error: implicitly has 'any' type  return <div>{user.email}</div>; // Error: email doesn't exist on User

  console.log(event.target.value);}

}

```// ✅ Correct - complete interface

interface User {

**Solution:**  name: string;

```tsx  email: string;

// ✅ Type the event parameter}

import { ChangeEvent } from 'react';```



function handleChange(event: ChangeEvent<HTMLInputElement>) {## 🌐 **API & Data Fetching Issues**

  console.log(event.target.value);

}### Problem: "CORS error" when calling APIs



// Common event types:**Cause:** Browser blocking cross-origin requests

// - ChangeEvent<HTMLInputElement> - for inputs

// - ChangeEvent<HTMLTextAreaElement> - for textarea**Solutions:**

// - MouseEvent<HTMLButtonElement> - for buttons

// - FormEvent<HTMLFormElement> - for forms```javascript

```// Solution 1: Use a proxy in development

// In vite.config.js

---export default {

  server: {

## 3. React Common Errors    proxy: {

      "/api": "http://localhost:3000",

### ❌ Error: `React Hook "useState" is called conditionally`    },

  },

**Symptoms:**};

```tsx

import { useState } from 'react';// Solution 2: Enable CORS on your backend

// In Express.js backend

interface MyComponentProps {const cors = require("cors");

  isActive: boolean;app.use(

}  cors({

    origin: "http://localhost:5173", // Your React app URL

function MyComponent({ isActive }: MyComponentProps) {  })

  if (isActive) {);

    const [count, setCount] = useState(0); // ❌ Error!```

  }

  return <div>Component</div>;### Problem: Data not showing up from API

}

```**Cause:** Not handling async operations properly



**Cause:****Solution:**

Violating Rules of Hooks - hooks must be called unconditionally

```jsx

**Solution:**// ❌ Wrong - not handling async properly

```tsxfunction UserList() {

import { useState } from 'react';  const [users, setUsers] = useState([]);



interface MyComponentProps {  fetch("/api/users")

  isActive: boolean;    .then((res) => res.json())

}    .then(setUsers); // This runs but component may not re-render correctly



// ✅ Solution: Move hook to top level  return (

function MyComponent({ isActive }: MyComponentProps) {    <div>

  const [count, setCount] = useState(0); // ✅ Correct      {users.map((user) => (

        <div key={user.id}>{user.name}</div>

  if (!isActive) {      ))}

    return null; // Conditional return    </div>

  }  );

}

  return <div>Count: {count}</div>;

}// ✅ Correct - using useEffect

```function UserList() {

  const [users, setUsers] = useState([]);

**Rules of Hooks:**  const [loading, setLoading] = useState(true);

1. ✅ Only call at top level (not in loops, conditions, nested functions)

2. ✅ Only call in React function components or custom hooks  useEffect(() => {

3. ✅ Hooks must be called in the same order every render    fetch("/api/users")

      .then((res) => res.json())

---      .then((data) => {

        setUsers(data);

### ❌ Error: `Objects are not valid as a React child`        setLoading(false);

      })

**Symptoms:**      .catch((error) => {

```tsx        console.error("Error fetching users:", error);

interface User {        setLoading(false);

  name: string;      });

  age: number;  }, []); // Empty dependency array means this runs once

}

  if (loading) return <div>Loading...</div>;

function UserProfile() {

  const user: User = { name: 'John', age: 25 };  return (

  return <div>{user}</div>; // ❌ Error: Objects are not valid as a React child    <div>

}      {users.map((user) => (

```        <div key={user.id}>{user.name}</div>

      ))}

**Cause:**    </div>

React cannot render objects directly, only strings, numbers, arrays of JSX  );

}

**Solution:**```

```tsx

interface User {## 🎯 **Project-Specific Issues**

  name: string;

  age: number;### Problem: Components are getting too large and complex

}

**Cause:** Trying to do too much in one component

// ✅ Solution 1: Render object properties

function UserProfile() {**Solution:**

  const user: User = { name: 'John', age: 25 };

  return (```jsx

    <div>// ❌ Bad - one giant component

      <p>Name: {user.name}</p>function StudentDashboard() {

      <p>Age: {user.age}</p>  // 200+ lines of code handling:

    </div>  // - User authentication

  );  // - Data fetching

}  // - Form handling

  // - Display logic

// ✅ Solution 2: Convert to string (for debugging)  // This is too much!

function UserProfile() {}

  const user: User = { name: 'John', age: 25 };

  return <div>{JSON.stringify(user)}</div>;// ✅ Good - broken into smaller components

}function StudentDashboard() {

```  return (

    <div>

---      <Header />

      <StudentList />

### ❌ Error: Infinite re-render loop      <AddStudentForm />

      <Statistics />

**Symptoms:**    </div>

```  );

Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.}

``````



```tsx### Problem: Hard to manage data between components

import { useState } from 'react';

**Cause:** Passing props through too many levels

function Counter() {

  const [count, setCount] = useState(0);**Solution:**



  // ❌ Causes infinite loop!```jsx

  setCount(count + 1);// ❌ Prop drilling - passing props through many levels

<App>

  return <div>{count}</div>;  <Dashboard user={user} />

}    <Sidebar user={user} />

```      <UserProfile user={user} />



**Cause:**// ✅ Context API - share data across components

`setCount` is called directly in render, causing re-render → calls setCount again → infinite loopconst UserContext = createContext();



**Solution:**function App() {

```tsx  const [user, setUser] = useState(null);

import { useState, useEffect } from 'react';

  return (

// ✅ Solution 1: Call in event handler    <UserContext.Provider value={{ user, setUser }}>

function Counter() {      <Dashboard />

  const [count, setCount] = useState(0);    </UserContext.Provider>

  );

  const handleClick = () => {}

    setCount(count + 1);

  };function UserProfile() {

  const { user } = useContext(UserContext);

  return <button onClick={handleClick}>{count}</button>;  return <div>{user?.name}</div>;

}}

```

// ✅ Solution 2: useEffect with dependencies

function Counter() {## 🆘 **When All Else Fails**

  const [count, setCount] = useState(0);

### Debugging Steps:

  useEffect(() => {

    // Only runs when needed1. **Check the browser console** for error messages

    const timer = setTimeout(() => setCount(c => c + 1), 1000);2. **Read the error message carefully** - it usually tells you what's wrong

    return () => clearTimeout(timer);3. **Use console.log()** to check if your data is what you expect

  }, [count]);4. **Check your component props** with React Developer Tools

5. **Search the exact error message** on Google or Stack Overflow

  return <div>{count}</div>;6. **Ask for help** - show your code and the error message

}

```### Helpful Browser Extensions:



---- **React Developer Tools** - Inspect React components

- **Redux DevTools** - Debug state management

### ❌ Error: `Can't perform a React state update on an unmounted component`- **JSON Formatter** - View API responses nicely



**Symptoms:**### Online Resources:

```

Warning: Can't perform a React state update on an unmounted component.- [React Documentation](https://react.dev/) - Official docs

This is a no-op, but it indicates a memory leak in your application.- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs) - Community help

```- [React subreddit](https://reddit.com/r/reactjs) - Discussion and help

- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript reference

**Cause:**

Component unmounted before async operation (fetch, setTimeout) completes## 📝 **Quick Reference Cheat Sheet**



**Solution:**### Most Common React Patterns:

```tsx

import { useState, useEffect } from 'react';```tsx

import { useState, useEffect, ReactNode } from 'react';

interface User {

  name: string;// Component with props

}interface MyComponentProps {

  title: string;

// ✅ Solution: Cleanup with flag  children: ReactNode;

function UserProfile() {}

  const [user, setUser] = useState<User | null>(null);

function MyComponent({ title, children }: MyComponentProps) {

  useEffect(() => {  return (

    let isMounted = true; // Cleanup flag    <div>

      <h1>{title}</h1>

    fetch('/api/user')      {children}

      .then(res => res.json())    </div>

      .then(data => {  );

        if (isMounted) { // Only update if still mounted}

          setUser(data);

        }// Component with state

      });function Counter() {

  const [count, setCount] = useState(0);

    return () => {  return <button onClick={() => setCount(count + 1)}>{count}</button>;

      isMounted = false; // Cleanup}

    };

  }, []);// Component with effect

interface User {

  return <div>{user?.name}</div>;  id: number;

}  name: string;

}

// ✅ Alternative: AbortController

useEffect(() => {interface UserProfileProps {

  const controller = new AbortController();  userId: number;

}

  fetch('/api/user', { signal: controller.signal })

    .then(res => res.json())function UserProfile({ userId }: UserProfileProps) {

    .then(data => setUser(data))  const [user, setUser] = useState<User | null>(null);

    .catch(err => {

      if (err.name !== 'AbortError') {  useEffect(() => {

        console.error(err);    fetchUser(userId).then(setUser);

      }  }, [userId]);

    });

  return user ? <div>{user.name}</div> : <div>Loading...</div>;

  return () => controller.abort();}

}, []);

```// List rendering

interface UserListProps {

---  users: User[];

}

### ❌ Error: `Missing dependencies in useEffect`

function UserList({ users }: UserListProps) {

**Symptoms:**  return (

```tsx    <ul>

import { useState, useEffect } from 'react';      {users.map((user) => (

        <li key={user.id}>{user.name}</li>

interface SearchResultsProps {      ))}

  query: string;    </ul>

}  );

}

interface Result {```

  id: number;

  title: string;### Remember:

}

- **Always use `key` props** when rendering lists

function SearchResults({ query }: SearchResultsProps) {- **Start component names with capital letters**

  const [results, setResults] = useState<Result[]>([]);- **Use `className` not `class`**

- **Import components before using them**

  useEffect(() => {- **Use `useEffect` for side effects** (API calls, subscriptions)

    fetchResults(query).then(setResults);- **Don't mutate state directly** - always create new objects/arrays

  }, []); // ⚠️ Warning: React Hook useEffect has a missing dependency: 'query'

---

  return <div>{results}</div>;

}_💡 Keep this guide bookmarked - you'll likely need it throughout your React learning journey!_

```

**Solution:**
```tsx
// ✅ Solution: Add missing dependency
useEffect(() => {
  fetchResults(query).then(setResults);
}, [query]); // Include 'query'

// Now effect runs when query changes
```

**When to ignore warning?**
- NEVER! Always fix dependencies
- If you really want to run once, move logic outside component

---

### ❌ Error: `Each child in a list should have a unique "key" prop`

**Symptoms:**
```tsx
interface User {
  id: number;
  name: string;
}

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  return (
    <div>
      {users.map(user => (
        <div>{user.name}</div> // ⚠️ Warning: missing "key"
      ))}
    </div>
  );
}
```

**Solution:**
```tsx
interface User {
  id: number;
  name: string;
}

interface UserListProps {
  users: User[];
}

// ✅ Solution: Add unique key
function UserList({ users }: UserListProps) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// ❌ NEVER use index as key (for dynamic lists)
{users.map((user, index) => (
  <div key={index}>{user.name}</div> // BAD for add/remove/reorder
))}

// ✅ Use stable unique ID
{users.map(user => (
  <div key={user.id}>{user.name}</div> // GOOD
))}
```

---

### ❌ Problem: "Component is not defined" error

**Cause:** Forgot to import the component

**Solution:**

```tsx
// ❌ Wrong - missing import
function App() {
  return <MyComponent />; // Error!
}

// ✅ Correct - with import
import MyComponent from "./MyComponent";

function App() {
  return <MyComponent />; // Works!
}
```

---

### ❌ Problem: Components not re-rendering when data changes

**Cause:** Mutating state directly instead of creating new state

**Solution:**

```tsx
// ❌ Wrong - mutating existing array
const [items, setItems] = useState([]);

const addItem = (newItem) => {
  items.push(newItem); // This won't trigger re-render!
  setItems(items);
};

// ✅ Correct - creating new array
const addItem = (newItem) => {
  setItems([...items, newItem]); // This will trigger re-render
};
```

---

## 4. Build & Bundler Errors

### ❌ Error: `Failed to resolve import`

**Symptoms:**
```bash
[vite] Failed to resolve import "./components/Button" from "src/App.tsx"
```

**Cause:**
- File doesn't exist
- Wrong path
- Missing extension

**Solution:**
```tsx
// ❌ Wrong
import Button from './components/Button'; // Missing .tsx

// ✅ Correct
import Button from './components/Button.tsx';

// Or check file exists:
// components/Button.tsx ← must have this file!
```

**Checklist:**
- [ ] File path correct? (case-sensitive!)
- [ ] Extension correct? (.tsx, .ts, .jsx, .js)
- [ ] File exists? (check in VS Code explorer)
- [ ] Export correct? (export default or named export)

---

### ❌ Error: `Module not found: Can't resolve 'react'`

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

### ❌ Error: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Symptoms:**
```
Access to fetch at 'http://localhost:5000/api/users' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**Cause:**
Backend doesn't allow requests from frontend origin

**Backend Solution (Express):**
```javascript
// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));

// Or allow all origins (development only!)
app.use(cors());

app.listen(5000);
```

**Frontend Solution (Vite Proxy):**
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});

// Now use relative URLs in fetch
fetch('/api/users') // Instead of http://localhost:5000/api/users
```

---

### ❌ Error: `Failed to fetch` / Network request failed

**Symptoms:**
```tsx
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
```tsx
// ✅ Add better error handling
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

### ❌ Problem: Data not showing up from API

**Cause:** Not handling async operations properly

**Solution:**

```tsx
// ❌ Wrong - not handling async properly
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

// ✅ Correct - using useEffect
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

### ❌ Error: 404 on refresh (React Router on Netlify/Vercel)

**Symptoms:**
- App works fine: `yoursite.com` ✅
- Refresh on route: `yoursite.com/about` → 404 ❌

**Cause:**
Server doesn't know React Router, need to redirect all routes to index.html

**Netlify Solution:**
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

### ❌ Error: Environment variables not working in production

**Symptoms:**
```tsx
console.log(import.meta.env.VITE_API_URL); // undefined in production
```

**Solution:**
1. **Check naming:** Must start with `VITE_`
   ```env
   # ❌ Wrong
   API_URL=http://localhost:5000

   # ✅ Correct
   VITE_API_URL=http://localhost:5000
   ```

2. **Add to platform:**
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment Variables
   - Railway: Variables tab

3. **Rebuild app** after adding env vars

---

## 7. Styling & CSS Issues

### ❌ Problem: CSS classes not applying

**Cause:** Using `class` instead of `className` or incorrect CSS import

**Solution:**

```tsx
// ❌ Wrong - 'class' doesn't work in React
<div class="container">Content</div>

// ✅ Correct - use 'className'
<div className="container">Content</div>
```

```tsx
// Make sure to import your CSS
import "./MyComponent.css";

function MyComponent() {
  return <div className="my-style">Content</div>;
}
```

---

### ❌ Problem: Styles not loading

**Cause:** CSS file not imported or incorrect path

**Solution:**

```tsx
// ✅ Import CSS at the top of your component file
import "./styles/MyComponent.css";
import "../shared/global.css";

// ✅ Or import in main.jsx for global styles
// main.jsx
import "./index.css";
```

---

## 8. Performance Issues

### ❌ Problem: App is slow when typing in forms

**Cause:** Re-rendering entire component tree on every keystroke

**Solution:**

```tsx
// ❌ Inefficient - recreating function on every render
function SearchForm() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)} // New function every render
    />
  );
}

// ✅ Efficient - stable function reference
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

### ❌ Problem: Components are getting too large and complex

**Cause:** Trying to do too much in one component

**Solution:**

```tsx
// ❌ Bad - one giant component
function StudentDashboard() {
  // 200+ lines of code handling:
  // - User authentication
  // - Data fetching
  // - Form handling
  // - Display logic
  // This is too much!
}

// ✅ Good - broken into smaller components
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

### ❌ Problem: Hard to manage data between components

**Cause:** Passing props through too many levels

**Solution:**

```tsx
// ❌ Prop drilling - passing props through many levels
<App>
  <Dashboard user={user} />
    <Sidebar user={user} />
      <UserProfile user={user} />

// ✅ Context API - share data across components
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

1. ✅ **Check the browser console** for error messages
2. ✅ **Read the error message carefully** - it usually tells you what's wrong
3. ✅ **Use console.log()** to check if your data is what you expect
4. ✅ **Check your component props** with React Developer Tools
5. ✅ **Search the exact error message** on Google or Stack Overflow
6. ✅ **Ask for help** - show your code and the error message

### Helpful Browser Extensions:

- **React Developer Tools** - Inspect React components
- **Redux DevTools** - Debug state management
- **JSON Formatter** - View API responses nicely

### Online Resources:

- [React Documentation](https://react.dev/) - Official docs
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript reference
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs) - Community help
- [React subreddit](https://reddit.com/r/reactjs) - Discussion and help
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript reference

---

## 📝 Quick Reference Cheat Sheet

### Most Common React Patterns:

```tsx
import { useState, useEffect, ReactNode } from 'react';

// Component with props
interface MyComponentProps {
  title: string;
  children: ReactNode;
}

function MyComponent({ title, children }: MyComponentProps) {
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
interface User {
  id: number;
  name: string;
}

interface UserProfileProps {
  userId: number;
}

function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}

// List rendering
interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
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

- ✅ **Always use `key` props** when rendering lists
- ✅ **Start component names with capital letters**
- ✅ **Use `className` not `class`**
- ✅ **Import components before using them**
- ✅ **Use `useEffect` for side effects** (API calls, subscriptions)
- ✅ **Don't mutate state directly** - always create new objects/arrays
- ✅ **Add proper TypeScript types** to all props and state

---

_💡 Keep this guide bookmarked - you'll likely need it throughout your React learning journey!_

**Last Updated:** October 4, 2025
