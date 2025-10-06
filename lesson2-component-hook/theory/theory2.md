# Theory - Component Architecture & React Hook

---

##  Table of Contents

1. [Core Concepts](#1-core-concepts)
2. [Function Components](#2-function-components)
3. [React Hooks Overview](#3-react-hooks-overview)
4. [useState Hook](#4-usestate-hook)
5. [useEffect Hook](#5-useeffect-hook)
6. [useRef Hook](#6-useref-hook)
7. [useContext Hook](#7-usecontext-hook)
8. [useReducer Hook](#8-usereducer-hook)
9. [Custom Hooks](#9-custom-hooks)
10. [Advanced Patterns](#10-advanced-patterns)
11. [Performance Optimization](#11-performance-optimization)
12. [Hook Rules & Best Practices](#12-hook-rules--best-practices)
13. [Common Mistakes](#13-common-mistakes)
14. [Debugging Hooks](#14-debugging-hooks)

---

## 1. Core Concepts

### Why Component Architecture?

Modern applications require modular, reusable UI building blocks. Components enable:
- **Reusability** - Write once, use everywhere
- **Maintainability** - Isolated, testable code units
- **Scalability** - Compose complex UIs from simple pieces
- **Collaboration** - Teams work on independent components

**Component Hierarchy Example:**
```
E-commerce App
├── Header
│   ├── Logo
│   ├── SearchBar
│   └── UserMenu
├── ProductList
│   └── ProductCard (× many)
│       ├── Image
│       ├── Title
│       ├── Price
│       └── AddToCartButton
└── Footer
```

**Atomic Design Pattern:**
- **Atoms**: Button, Input, Icon (smallest units)
- **Molecules**: SearchBox, FormField (simple groups)
- **Organisms**: Header, ProductGrid (complex sections)
- **Templates**: PageLayout (structure)
- **Pages**: Homepage, ProductPage (final)

---

## 2. Function Components

### Basic Structure

Function components are JavaScript functions that return JSX:

```tsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

### Props (Properties)

Props pass data from parent to child components:

```tsx
interface WelcomeProps {
  name: string;
  age?: number;
}

function Welcome({ name, age }: WelcomeProps) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
}

// Usage
<Welcome name="Alice" age={25} />
```

### Destructuring Props

```tsx
//  Without destructuring
function Card(props) {
  return <div>{props.title} - {props.description}</div>;
}

//  With destructuring (cleaner)
function Card({ title, description }) {
  return <div>{title} - {description}</div>;
}

//  With default values
function Card({ title, description = 'No description' }) {
  return <div>{title} - {description}</div>;
}
```

### Children Prop

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
<Card title="User Profile">
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>
```

### Component Composition

```tsx
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />;
}

function UserInfo({ user }) {
  return (
    <div>
      <Avatar src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="card">
      <UserInfo user={user} />
      <button>View Profile</button>
    </div>
  );
}
```

---

## 3. React Hooks

### useState - State Management

**Basic Usage:**
```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

**Multiple State Variables:**
```tsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, agreed });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <label>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        I agree to terms
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Object State:**
```tsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (name: string) => {
    setUser({ ...user, name }); // Spread operator preserves other fields
  };

  const updateEmail = (email: string) => {
    setUser(prev => ({ ...prev, email })); // Functional update
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
      />
      <input
        value={user.email}
        onChange={(e) => updateEmail(e.target.value)}
      />
    </div>
  );
}
```

**Array State:**
```tsx
function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, input]);
    setInput('');
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => removeTodo(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### useEffect - Side Effects

**Basic Usage:**
```tsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty array = run once on mount

  return <div>Seconds: {seconds}</div>;
}
```

**Dependency Array:**
```tsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://api.example.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Re-run when userId changes

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

**Multiple Effects:**
```tsx
function Dashboard() {
  const [data, setData] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

  // Effect 1: Fetch data
  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(setData);
  }, []);

  // Effect 2: Network status
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      <p>Status: {online ? 'Online' : 'Offline'}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

---

### useRef - DOM References

**Accessing DOM Elements:**
```tsx
import { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

**Storing Mutable Values:**
```tsx
function PreviousValue({ value }) {
  const prevValueRef = useRef<number>();

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return (
    <div>
      <p>Current: {value}</p>
      <p>Previous: {prevValueRef.current}</p>
    </div>
  );
}
```

---

### useContext - Global State

**Creating Context:**
```tsx
import { createContext, useContext, useState } from 'react';

interface Theme {
  color: string;
  background: string;
}

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | undefined>(undefined);

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const theme: Theme = isDark
    ? { color: '#fff', background: '#333' }
    : { color: '#000', background: '#fff' };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      style={{ color: theme.color, background: theme.background }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

---

### useReducer - Complex State Logic

```tsx
import { useReducer } from 'react';

interface State {
  count: number;
  step: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { ...state, count: 0 };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <input
        type="number"
        value={state.step}
        onChange={(e) => dispatch({
          type: 'setStep',
          payload: Number(e.target.value)
        })}
      />
    </div>
  );
}
```

---

### useMemo - Performance Optimization

```tsx
import { useState, useMemo } from 'react';

function ExpensiveList({ items }) {
  const [filter, setFilter] = useState('');

  // Memoize expensive calculation
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // Only recalculate when items or filter changes

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <ul>
        {filteredItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### useCallback - Memoize Functions

```tsx
import { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Memoize callback
  const handleClick = useCallback(() => {
    console.log('Button clicked');
    setCount(c => c + 1);
  }, []); // Function never changes

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={handleClick} />
      <button onClick={() => setOtherState(s => s + 1)}>
        Other State: {otherState}
      </button>
    </div>
  );
}

// Child won't re-render unnecessarily
const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Increment Parent</button>;
});
```

---

## 4. Custom Hooks

### Creating Custom Hooks

```tsx
// useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('username', '');

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

**useFetch Hook:**
```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data, loading, error } = useFetch<User[]>('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {data?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

---

## 5. Best Practices

### Component Organization

```tsx
//  Good: One component per file
// Button.tsx
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

//  Bad: Multiple unrelated components in one file
function Button() { ... }
function Input() { ... }
function Form() { ... }
```

### Props Validation with TypeScript

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Button({
  variant,
  size = 'md',
  disabled = false,
  onClick,
  children
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Conditional Rendering

```tsx
//  Good: Ternary for simple conditions
function Status({ isOnline }) {
  return (
    <div>
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}

//  Good: && for rendering or nothing
function Notification({ message }) {
  return (
    <div>
      {message && <div className="alert">{message}</div>}
    </div>
  );
}

//  Good: Early return for complex conditions
function UserProfile({ user }) {
  if (!user) return <div>Loading...</div>;
  if (user.banned) return <div>Account suspended</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### State Management Rules

```tsx
//  Good: Lift state up to common parent
function Parent() {
  const [sharedData, setSharedData] = useState('');

  return (
    <div>
      <ChildA data={sharedData} onChange={setSharedData} />
      <ChildB data={sharedData} />
    </div>
  );
}

//  Bad: Prop drilling too deep
function GrandParent() {
  const [data, setData] = useState('');
  return <Parent data={data} setData={setData} />;
}
function Parent({ data, setData }) {
  return <Child data={data} setData={setData} />;
}
function Child({ data, setData }) {
  return <GrandChild data={data} setData={setData} />;
}
// Use Context instead for deep props
```

---

## 6. Common Pitfalls

### Problem 1: Stale Closure

```tsx
//  Wrong
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // Always uses initial count (0)
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Empty deps = count is stale

  return <div>{count}</div>;
}

//  Correct
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1); // Functional update
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;
}
```

### Problem 2: Infinite Loop

```tsx
//  Wrong: Infinite loop
function BadComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData); // Updates state → triggers effect → infinite loop
  }); // No dependency array!

  return <div>{data.length}</div>;
}

//  Correct
function GoodComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []); // Runs once on mount

  return <div>{data.length}</div>;
}
```

### Problem 3: Direct State Mutation

```tsx
//  Wrong: Mutating state directly
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    todos.push(todo); // Mutation!
    setTodos(todos); // React won't detect change
  };

  return <div>...</div>;
}

//  Correct: Create new array
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]); // New array
  };

  return <div>...</div>;
}
```

---

## Summary

**Component Fundamentals:**
- Components are reusable, self-contained UI building blocks
- Function components are the modern standard (use these)
- Props pass data from parent to child (immutable)
- Children prop allows flexible component composition
- TypeScript interfaces define clear component contracts

**Essential Hooks:**
- `useState` - Manage component state
- `useEffect` - Handle side effects (API calls, subscriptions, timers)
- `useRef` - Access DOM elements and store mutable values
- `useContext` - Share data across component tree
- `useReducer` - Complex state logic with actions
- `useMemo` - Memoize expensive calculations
- `useCallback` - Memoize callback functions

**Custom Hooks:**
- Reusable stateful logic across components
- Must start with "use" prefix
- Can use other hooks inside
- Common patterns: useFetch, useLocalStorage, useDebounce

**Best Practices:**
- One component per file for maintainability
- TypeScript for type safety and better DX
- Lift state to common parent when sharing
- Use Context for deep prop drilling
- Functional updates for state based on previous value
- Always include cleanup in useEffect
- Memoize expensive operations with useMemo/useCallback

**Common Mistakes to Avoid:**
- Mutating state directly (always create new objects/arrays)
- Missing dependency arrays in useEffect (causes bugs or infinite loops)
- Stale closures (use functional updates)
- Over-optimization with useMemo/useCallback
- Prop drilling too many levels (use Context)
