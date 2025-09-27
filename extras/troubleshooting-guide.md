# Common Issues & Troubleshooting Guide

## Quick Solutions for Students

This guide addresses the most common problems students encounter when learning React. Keep this handy as you work through the course!

## 🚨 **Setup & Installation Issues**

### Problem: "npm command not found"

**Cause:** Node.js is not installed or not in PATH

**Solution:**

1. Download and install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your terminal/command prompt
3. Verify installation: `node --version` and `npm --version`

### Problem: "Permission denied" when running npm commands

**Cause:** Insufficient permissions (common on Mac/Linux)
**Solution:**

```bash
# Option 1: Use npx instead of npm
npx create-vite@latest my-app

# Option 2: Fix npm permissions (Mac/Linux)
sudo chown -R $(whoami) ~/.npm
```

### Problem: Project won't start - "Port 3000 already in use"

**Cause:** Another application is using the same port

**Solution:**

```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

## 💻 **React Development Issues**

### Problem: "Component is not defined" error

**Cause:** Forgot to import the component

**Solution:**

```jsx
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

### Problem: "Cannot read property of undefined"

**Cause:** Trying to access props that don't exist

**Solution:**

```jsx
// ❌ Dangerous - might crash if user is undefined
function UserProfile({ user }) {
  return <div>{user.name}</div>; // Error if user is undefined
}

// ✅ Safe - with default values and checks
function UserProfile({ user = {} }) {
  return <div>{user.name || "Guest"}</div>;
}

// ✅ Even safer - with conditional rendering
function UserProfile({ user }) {
  if (!user) return <div>Loading...</div>;

  return <div>{user.name}</div>;
}
```

### Problem: Components not re-rendering when data changes

**Cause:** Mutating state directly instead of creating new state

**Solution:**

```jsx
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

## 🎨 **Styling & CSS Issues**

### Problem: CSS classes not applying

**Cause:** Using `class` instead of `className` or incorrect CSS import

**Solution:**

```jsx
// ❌ Wrong - 'class' doesn't work in React
<div class="container">Content</div>

// ✅ Correct - use 'className'
<div className="container">Content</div>
```

```jsx
// Make sure to import your CSS
import "./MyComponent.css";

function MyComponent() {
  return <div className="my-style">Content</div>;
}
```

### Problem: Styles not loading

**Cause:** CSS file not imported or incorrect path

**Solution:**

```jsx
// ✅ Import CSS at the top of your component file
import "./styles/MyComponent.css";
import "../shared/global.css";

// ✅ Or import in main.jsx for global styles
// main.jsx
import "./index.css";
```

## ⚡ **Performance Issues**

### Problem: App is slow when typing in forms

**Cause:** Re-rendering entire component tree on every keystroke

**Solution:**

```jsx
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
function SearchForm() {
  const [query, setQuery] = useState("");

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  return <input value={query} onChange={handleChange} />;
}
```

## 🔧 **TypeScript Issues**

### Problem: "Type 'X' is not assignable to type 'Y'"

**Cause:** TypeScript type mismatch

**Solution:**

```tsx
// ❌ Wrong - string passed to number prop
interface Props {
  age: number;
}

<MyComponent age="25" /> // Error: string not assignable to number

// ✅ Correct - proper type
<MyComponent age={25} /> // Works: number

// ✅ Or convert string to number
<MyComponent age={parseInt("25")} />
```

### Problem: "Property does not exist on type"

**Cause:** Missing or incorrect interface definition

**Solution:**

```tsx
// ❌ Wrong - incomplete interface
interface User {
  name: string;
}

function UserCard({ user }: { user: User }) {
  return <div>{user.email}</div>; // Error: email doesn't exist on User
}

// ✅ Correct - complete interface
interface User {
  name: string;
  email: string;
}
```

## 🌐 **API & Data Fetching Issues**

### Problem: "CORS error" when calling APIs

**Cause:** Browser blocking cross-origin requests

**Solutions:**

```javascript
// Solution 1: Use a proxy in development
// In vite.config.js
export default {
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};

// Solution 2: Enable CORS on your backend
// In Express.js backend
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app URL
  })
);
```

### Problem: Data not showing up from API

**Cause:** Not handling async operations properly

**Solution:**

```jsx
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

## 🎯 **Project-Specific Issues**

### Problem: Components are getting too large and complex

**Cause:** Trying to do too much in one component

**Solution:**

```jsx
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

### Problem: Hard to manage data between components

**Cause:** Passing props through too many levels

**Solution:**

```jsx
// ❌ Prop drilling - passing props through many levels
<App>
  <Dashboard user={user} />
    <Sidebar user={user} />
      <UserProfile user={user} />

// ✅ Context API - share data across components
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

## 🆘 **When All Else Fails**

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
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs) - Community help
- [React subreddit](https://reddit.com/r/reactjs) - Discussion and help
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript reference

## 📝 **Quick Reference Cheat Sheet**

### Most Common React Patterns:

```jsx
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

---

_💡 Keep this guide bookmarked - you'll likely need it throughout your React learning journey!_
