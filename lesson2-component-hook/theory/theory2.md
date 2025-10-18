# Theory - Component Architecture & React Hooks

---

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Function Components](#function-components)
3. [React Hooks Overview](#react-hooks-overview)
4. [useState Hook](#usestate-hook)
5. [useEffect Hook](#useeffect-hook)
6. [useRef Hook](#useref-hook)
7. [useContext Hook](#usecontext-hook)
8. [useReducer Hook](#usereducer-hook)
9. [Custom Hooks](#custom-hooks)
10. [Hook Rules & Best Practices](#hook-rules--best-practices)
11. [Common Mistakes](#common-mistakes)
12. [Next Steps](#next-steps)

---

## Core Concepts

### Why Component Architecture?

Modern applications require modular, reusable UI building blocks. Components enable:

- **Reusability** - Write once, use everywhere
- **Maintainability** - Isolated, testable code units
- **Scalability** - Compose complex UIs from simple pieces
- **Collaboration** - Teams work on independent components

### Component Hierarchy Example

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

---

## Function Components

### Modern React Components

**Function components** are the modern way to write React components. They're simpler, more readable, and work perfectly with hooks.

```typescript
// File: components/SimpleComponent.tsx
// Simple function component
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// With TypeScript interface
interface WelcomeProps {
  name: string;
  age?: number;
}

function Welcome({ name, age }: WelcomeProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
    </div>
  );
}
```

### Component Composition

```typescript
// File: components/App.tsx
// Parent component
function App() {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

// Child components
function Header() {
  return <header>My App</header>;
}

function MainContent() {
  return <main>Content goes here</main>;
}

function Footer() {
  return <footer>© 2025 My App</footer>;
}
```

---

## React Hooks Overview

**Hooks** are functions that let you use state and other React features in function components.

### Why Hooks?

- **Simpler Logic**: No need for class components
- **Reusable State Logic**: Custom hooks for shared logic
- **Better Performance**: Optimized re-rendering
- **Easier Testing**: Function components are easier to test

### Hook Rules

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call hooks from React function components or custom hooks

---

## useState Hook

**useState** lets you add state to function components.

### Basic Usage

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Multiple State Variables

```typescript
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
        type="number"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </div>
  );
}
```

### State with Objects

```typescript
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const handleChange = (field: string, value: string | number) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="Email"
      />
      <input
        value={user.age}
        onChange={(e) => handleChange('age', Number(e.target.value))}
        placeholder="Age"
        type="number"
      />
    </div>
  );
}
```

---

## useEffect Hook

**useEffect** lets you perform side effects in function components.

### Basic Usage

```typescript
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs after every render
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []); // Empty dependency array = run once

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

### Effect with Dependencies

```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This runs when userId changes
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(setUser);
  }, [userId]); // Runs when userId changes

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

### Cleanup Function

```typescript
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  return <div>Timer: {seconds}s</div>;
}
```

---

## useRef Hook

**useRef** lets you access DOM elements and persist values across renders.

### DOM Reference

```typescript
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

### Persisting Values

```typescript
function Counter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current += 1;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## useContext Hook

**useContext** lets you consume context values without prop drilling.

### Creating Context

```typescript
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook for using context
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Using Context

```typescript
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Toggle Theme
    </button>
  );
}
```

---

## useReducer Hook

**useReducer** is an alternative to useState for complex state logic.

### Basic Usage

```typescript
import { useReducer } from 'react';

interface State {
  count: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
  );
}
```

---

## Custom Hooks

**Custom hooks** let you extract component logic into reusable functions.

### Basic Custom Hook

```typescript
// Custom hook for form handling
function useForm(initialValues: Record<string, string>) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (field: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const reset = () => {
    setValues(initialValues);
  };

  return { values, handleChange, reset };
}

// Using the custom hook
function LoginForm() {
  const { values, handleChange, reset } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
}
```

### Custom Hook with useEffect

```typescript
// Custom hook for data fetching
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
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

// Using the custom hook
function UserList() {
  const { data: users, loading, error } = useApi<User[]>('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Hook Rules & Best Practices

### 1. Always Call Hooks at the Top Level

```typescript
// ❌ Wrong - conditional hook call
function BadComponent({ shouldUseEffect }: { shouldUseEffect: boolean }) {
  if (shouldUseEffect) {
    useEffect(() => {
      // This is wrong!
    }, []);
  }
}

// ✅ Correct - always call hooks
function GoodComponent({ shouldUseEffect }: { shouldUseEffect: boolean }) {
  useEffect(() => {
    if (shouldUseEffect) {
      // Do something
    }
  }, [shouldUseEffect]);
}
```

### 2. Use Dependency Arrays Correctly

```typescript
// ❌ Wrong - missing dependencies
function BadComponent({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`).then(setUser);
  }, []); // Missing userId dependency

  return <div>{user?.name}</div>;
}

// ✅ Correct - include all dependencies
function GoodComponent({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`).then(setUser);
  }, [userId]); // Include userId

  return <div>{user?.name}</div>;
}
```

### 3. Use Custom Hooks for Reusable Logic

```typescript
// ✅ Good - extract reusable logic
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

---

## Common Mistakes

### Mistake 1: Stale Closures

```typescript
// ❌ Wrong - stale closure
function BadCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // Always uses initial count value
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;
}

// ✅ Correct - use functional update
function GoodCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1); // Uses current count value
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;
}
```

### Mistake 2: Missing Dependencies

```typescript
// ❌ Wrong - missing dependencies
function BadComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    document.title = `${name} clicked ${count} times`;
  }, []); // Missing count and name

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}

// ✅ Correct - include all dependencies
function GoodComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    document.title = `${name} clicked ${count} times`;
  }, [count, name]); // Include all dependencies

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
```

---

## Next Steps

### What You Should Know After Lesson 2

**Components:**
- Function components with TypeScript
- Component composition and reusability
- Props and prop types

**Hooks:**
- useState for state management
- useEffect for side effects
- useRef for DOM references
- useContext for global state
- useReducer for complex state
- Custom hooks for reusable logic

**Best Practices:**
- Hook rules and dependency arrays
- Avoiding common mistakes
- Performance considerations

### What's Coming in Lesson 3

🔜 **API Integration** - Fetching data from servers
🔜 **Data Management** - Handling loading states and errors
🔜 **React Query** - Advanced data fetching and caching
🔜 **CRUD Operations** - Create, Read, Update, Delete

> **Advanced Topics**: For advanced patterns, performance optimization, and complex examples, see [Advanced Patterns](../../extras/advanced_patterns.md) and [Performance Optimization](../../extras/performance_optimization.md)
