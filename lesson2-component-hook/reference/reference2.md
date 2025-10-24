# Reference - Components & Hooks

> **Quick reference guide for React components and hooks**

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

---

## Core Concepts

### What are Components?
- **Reusable UI pieces**that return JSX
- **Function components**(modern approach)
- **Class components**(legacy, not covered here)

### What are Hooks?
- **Functions**that let you use state and lifecycle features
- **Start with "use"**(useState, useEffect, etc.)
- **Only work in function components**

---

## Function Components

### Basic Component
```tsx
// Simple component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// With props
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

### Component with State
```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

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

---

## React Hooks Overview

### Built-in Hooks
- **useState**- Manage component state
- **useEffect**- Handle side effects
- **useRef**- Access DOM elements
- **useContext**- Consume context
- **useReducer**- Complex state management

### Custom Hooks
- **useLocalStorage**- Persist state
- **useFetch**- Data fetching
- **useToggle**- Boolean state
- **useDebounce**- Delay execution

---

## useState Hook

### Basic Usage
```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
      <button onClick={() => setCount(count - 1)}>
        -
      </button>
    </div>
  );
}
```

### Multiple State Variables
```tsx
function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
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
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

### Object State
```tsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateUser = (field: string, value: string | number) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => updateUser('age', Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

---

## useEffect Hook

### Basic Usage
```tsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs after every render
    console.log('Component rendered');
  });

  useEffect(() => {
    // This runs only once after mount
    fetchData();
  }, []);

  useEffect(() => {
    // This runs when 'data' changes
    if (data) {
      console.log('Data updated:', data);
    }
  }, [data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

### Cleanup
```tsx
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

### DOM Reference
```tsx
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

### Mutable Values
```tsx
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

### Context Setup
```tsx
import { createContext, useContext } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
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

// Custom hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Using Context
```tsx
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

// App component
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

---

## useReducer Hook

### Basic Usage
```tsx
import { useReducer } from 'react';

interface State {
  count: number;
  loading: boolean;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setLoading'; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: 0 };
    case 'setLoading':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    loading: false
  });

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

### useLocalStorage
```tsx
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

### useFetch
```tsx
import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
function UserList() {
  const { data: users, loading, error, refetch } = useFetch<User[]>('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Hook Rules & Best Practices

### Rules of Hooks
1. **Only call hooks at the top level**- Don't call inside loops, conditions, or nested functions
2. **Only call hooks from React functions**- Not from regular JavaScript functions

### Best Practices
```tsx
// ✅ Good - Custom hook
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// ✅ Good - Using custom hook
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// ❌ Bad - Calling hooks conditionally
function BadComponent() {
  if (someCondition) {
    const [count, setCount] = useState(0); // Don't do this!
  }

  return <div>Bad example</div>;
}
```

### Performance Optimization
```tsx
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, filter }) {
  // Memoize expensive calculations
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  // Memoize functions to prevent unnecessary re-renders
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

---

## Next Steps

1. **Practice** Build components using different hooks
2. **Learn More** Check [Theory Guide](./theory/theory2.md) for detailed explanations
3. **Continue** Move to [Lesson 3](../lesson3-api-data/) for API integration
4. **Resources** Explore [Advanced Patterns](../../extras/advanced_patterns.md) for complex patterns

> **💡 Tip** Start with useState and useEffect, then gradually learn other hooks. Custom hooks are powerful for reusing logic!