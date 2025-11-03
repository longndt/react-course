# Reference - Components & Hooks Quick Lookup

> **Purpose of this file**: Quick hook syntax, patterns, copy-paste ready code. NO concept explanations.
>
> **Use Theory2 when you need**: Understanding WHY and HOW hooks work.

---

## Table of Contents

1. [Hook Imports](#hook-imports)
2. [useState Patterns](#usestate-patterns)
3. [useEffect Patterns](#useeffect-patterns)
4. [useRef Patterns](#useref-patterns)
5. [useContext Patterns](#usecontext-patterns)
6. [useReducer Patterns](#usereducer-patterns)
7. [Custom Hook Examples](#custom-hook-examples)
8. [Common Patterns](#common-patterns)

---

## Hook Imports

```jsx
import { 
  useState, 
  useEffect, 
  useRef, 
  useContext, 
  useReducer,
  useCallback,
  useMemo,
  createContext
} from 'react';
```

---

## useState Patterns

### Basic State

```jsx
// Single value
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);

// With type
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```

### Object State

```jsx
interface User {
  name: string;
  age: number;
  email: string;
}

const [user, setUser] = useState<User>({
  name: '',
  age: 0,
  email: ''
});

// Update single field
setUser({ ...user, name: 'John' });

// Update with function
setUser(prev => ({ ...prev, age: prev.age + 1 }));
```

### Array State

```jsx
const [items, setItems] = useState<string[]>([]);

// Add item
setItems([...items, 'new item']);

// Remove item
setItems(items.filter(item => item !== 'remove me'));

// Update item
setItems(items.map(item => 
  item.id === targetId ? { ...item, updated: true } : item
));

// Clear all
setItems([]);
```

### Multiple States

```jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={age} onChange={e => setAge(Number(e.target.value))} />
    </form>
  );
}
```

---

## useEffect Patterns

### Run Once on Mount

```jsx
useEffect(() => {
  console.log('Component mounted');
  
  // Cleanup
  return () => {
    console.log('Component unmounting');
  };
}, []);
```

### Run on Dependency Change

```jsx
useEffect(() => {
  console.log('userId changed:', userId);
}, [userId]);

// Multiple dependencies
useEffect(() => {
  console.log('name or email changed');
}, [name, email]);
```

### Data Fetching

```jsx
useEffect(() => {
  let cancelled = false;
  
  async function fetchData() {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      
      if (!cancelled) {
        setUser(data);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error.message);
      }
    }
  }
  
  fetchData();
  
  return () => {
    cancelled = true;
  };
}, [userId]);
```

### Timer/Interval

```jsx
// Timer
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Delayed action');
  }, 1000);
  
  return () => clearTimeout(timer);
}, []);

// Interval
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

### Event Listeners

```jsx
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth);
  }
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

---

## useRef Patterns

### DOM Reference

```jsx
// Input
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// Div
const divRef = useRef<HTMLDivElement>(null);
divRef.current?.scrollIntoView();

// Button
const buttonRef = useRef<HTMLButtonElement>(null);
buttonRef.current?.click();
```

### Persisting Values

```jsx
// Previous value
const prevValue = useRef<number>();

useEffect(() => {
  prevValue.current = value;
}, [value]);

// Interval ID
const intervalRef = useRef<NodeJS.Timeout | null>(null);

function startInterval() {
  intervalRef.current = setInterval(() => {}, 1000);
}

function stopInterval() {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
}

// Render count
const renderCount = useRef(0);
renderCount.current += 1;
```

---

## useContext Patterns

### Create Context

```jsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

### Provider

```jsx
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
```

### Consumer

```jsx
function ThemedButton() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  const { theme, toggleTheme } = context;
  
  return (
    <button 
      onClick={toggleTheme}
      style={{ background: theme === 'dark' ? '#333' : '#fff' }}
    >
      Toggle Theme
    </button>
  );
}
```

### Custom Hook for Context

```jsx
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function Component() {
  const { theme, toggleTheme } = useTheme();
}
```

---

## useReducer Patterns

### Basic Reducer

```jsx
interface State {
  count: number;
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### Complex Reducer

```jsx
interface State {
  items: Item[];
  total: number;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'ADD_ITEM'; item: Item }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.item],
        total: state.total + action.item.price
      };
    
    case 'REMOVE_ITEM':
      const item = state.items.find(i => i.id === action.id);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.id),
        total: state.total - (item?.price || 0)
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
    
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    total: 0,
    loading: false,
    error: null
  });
  
  return <div>{/* ... */}</div>;
}
```

---

## Custom Hook Examples

### useFetch

```jsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function Component() {
  const { data, loading, error } = useFetch<User[]>('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{data?.map(user => <div key={user.id}>{user.name}</div>)}</div>;
}
```

### useLocalStorage

```jsx
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
function Component() {
  const [name, setName] = useLocalStorage('name', '');
  
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

### useToggle

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
}

// Usage
function Component() {
  const modal = useToggle();
  
  return (
    <div>
      <button onClick={modal.toggle}>Toggle Modal</button>
      {modal.value && <div>Modal Content</div>}
    </div>
  );
}
```

### useDebounce

```jsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      // API call with debounced value
      fetch(`/api/search?q=${debouncedSearch}`);
    }
  }, [debouncedSearch]);
  
  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}
```

---

## Common Patterns

### Toggle Boolean

```jsx
const [isOpen, setIsOpen] = useState(false);

// Toggle
setIsOpen(!isOpen);
setIsOpen(prev => !prev);

// Set true/false
setIsOpen(true);
setIsOpen(false);
```

### Form Handling

```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### List Operations

```jsx
const [items, setItems] = useState<Item[]>([]);

// Add
const addItem = (item: Item) => {
  setItems([...items, item]);
};

// Remove
const removeItem = (id: number) => {
  setItems(items.filter(item => item.id !== id));
};

// Update
const updateItem = (id: number, updates: Partial<Item>) => {
  setItems(items.map(item =>
    item.id === id ? { ...item, ...updates } : item
  ));
};

// Sort
const sortItems = () => {
  setItems([...items].sort((a, b) => a.name.localeCompare(b.name)));
};

// Filter
const activeItems = items.filter(item => item.active);
```

### Conditional Rendering

```jsx
function Component() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Data | null>(null);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;
  
  return <div>{data.value}</div>;
}
```

### Previous Value

```jsx
function Component() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(0);
  
  useEffect(() => {
    prevCount.current = count;
  }, [count]);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount.current}</p>
    </div>
  );
}
```

---

## Hook Rules

1. **Only call at top level** (no loops, conditions, nested functions)
2. **Only call from React functions** (components or custom hooks)
3. **Custom hooks must start with "use"**
4. **Include all dependencies in useEffect**

---

## Quick Reference Table

| Hook | Purpose | Returns |
|------|---------|---------|
| `useState` | Manage state | `[value, setValue]` |
| `useEffect` | Side effects | `void` |
| `useRef` | DOM access / persist values | `{ current: value }` |
| `useContext` | Consume context | `contextValue` |
| `useReducer` | Complex state | `[state, dispatch]` |
| `useCallback` | Memoize function | `memoizedFn` |
| `useMemo` | Memoize value | `memoizedValue` |

---

**For concepts and explanations**: See `theory2.md`  
**For practice**: See `lab2.md`

