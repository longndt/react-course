# Theory 2: React Components & Hooks

---

## Why Component Architecture Matters? 🤔

Professional applications need:
- **Admin Dashboards** → Reusable data tables, forms, modals
- **User Interfaces** → Consistent buttons, inputs, navigation
- **Complex Features** → Multi-step forms, data visualization, file uploads

**Real-World Example - E-commerce Admin Panel:**
```
E-commerce Dashboard
├── Sidebar Navigation (Reusable)
│   ├── Navigation Item (Atomic)
│   └── User Profile (Compound)
├── Main Content Area
│   ├── Stats Cards (Reusable Grid)
│   ├── Data Table (Complex Component)
│   │   ├── Table Header (Sortable)
│   │   ├── Table Row (Actions)
│   │   └── Pagination (Stateful)
│   └── Modal Forms (Overlay)
└── Footer (Static)
```

**Building Blocks Approach:**
- **Atomic Components**: Button, Input, Icon
- **Molecule Components**: SearchBox, Card, FormField
- **Organism Components**: Header, ProductList, DataTable
- **Page Components**: Dashboard, ProductManagement, UserProfile

> 💡 **Note:** For practical component examples and hands-on practice, refer to [quickstart.md](../quickstart.md) and [demo/](../demo/) folder.

---

## React Hooks – Deep Dive 🎣

### 1. What are Hooks?

**Hooks** are special functions in React that let you "hook into" React features like state, lifecycle, context, and more directly from function components.

**Why Hooks Matter:**
- Write cleaner, more concise code
- Separate logic from UI, making testing easier
- No need for classes, avoiding `this` binding issues
- Reuse stateful logic across components

**The Two Golden Rules of Hooks:**
1. Only call Hooks at the top level (not inside loops, conditions, or nested functions)
2. Only call Hooks from React function components or custom Hooks

---

### 2. Essential Built-in Hooks

#### a. useState – Managing Local Component State

**Purpose:** Add state variables to function components

**Syntax:**
```jsx
const [state, setState] = useState(initialValue);
```

**Basic Example:**
```jsx
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

**Advanced Example - Managing Complex State:**
```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateField = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => updateField('age', parseInt(e.target.value))}
        placeholder="Age"
      />
    </div>
  );
}
```

**Key Points:**
- State updates are asynchronous
- Use functional updates when new state depends on previous state: `setState(prev => prev + 1)`
- Don't mutate state directly, always create new objects/arrays

---

#### b. useEffect – Handling Side Effects

**Purpose:** Perform side effects (data fetching, subscriptions, manual DOM manipulation, timers)

**Syntax:**
```jsx
useEffect(() => {
  // Effect logic
  return () => {
    // Cleanup logic (optional)
  };
}, [dependencies]);
```

**Example 1: Timer**
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function - runs when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty array = run once on mount

  return <div>Time elapsed: {seconds}s</div>;
}
```

**Example 2: Fetching Data**
```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // Run once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Dependency Array Patterns:**
- `[]` - Run once on mount
- `[dep1, dep2]` - Run when dep1 or dep2 changes
- No array - Run after every render (usually avoid this)

---

#### c. useRef – Persisting Values Without Re-renders

**Purpose:**
- Access DOM elements directly
- Store mutable values that don't trigger re-renders
- Persist values across renders

**Example 1: Focus Management**
```jsx
function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

**Example 2: Storing Previous Value**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Key Difference: useRef vs useState**
- `useState`: Triggers re-render when updated
- `useRef`: Does NOT trigger re-render when `.current` changes

---

#### d. useContext – Consuming Context

**Purpose:** Access context values without prop drilling

**Example: Theme Context**
```jsx
// 1. Create Context
const ThemeContext = React.createContext('light');

// 2. Provider Component
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consumer Component
function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

---

#### e. useReducer – Managing Complex State Logic

**Purpose:** Alternative to useState for complex state logic with multiple sub-values or state transitions

**When to use useReducer:**
- Complex state logic with multiple sub-values
- Next state depends on previous state
- Want to optimize performance by passing dispatch down instead of callbacks

**Syntax:**
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**Example: Todo List**
```jsx
const initialState = { todos: [], filter: 'all' };

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 3. Custom Hooks – Reusable Logic

**Purpose:** Extract and reuse component logic

**Naming Convention:** Always start with "use" (e.g., `useWindowWidth`, `useLocalStorage`)

**Example 1: Window Dimensions**
```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
```

**Example 2: Local Storage**
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

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

**Example 3: Fetch Hook**
```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Hello, {user.name}!</div>;
}
```

---

### 4. Hook Rules & Best Practices

**Rules of Hooks:**

1. **Only Call Hooks at the Top Level**
   ```jsx
   // ❌ Wrong - inside condition
   if (condition) {
     const [value, setValue] = useState(0);
   }

   // ✅ Correct
   const [value, setValue] = useState(0);
   if (condition) {
     setValue(10);
   }
   ```

2. **Only Call Hooks from React Functions**
   ```jsx
   // ❌ Wrong - regular function
   function calculateTotal() {
     const [total, setTotal] = useState(0);
   }

   // ✅ Correct - React component
   function Calculator() {
     const [total, setTotal] = useState(0);
   }
   ```

**Best Practices:**

1. **Name custom Hooks starting with "use"**
   ```jsx
   // ✅ Good
   function useFormValidation() { }
   function useAuth() { }

   // ❌ Bad
   function formValidation() { }
   function getAuth() { }
   ```

2. **Keep useEffect dependencies accurate**
   ```jsx
   // ❌ Missing dependency
   useEffect(() => {
     console.log(count);
   }, []); // count is missing!

   // ✅ Correct
   useEffect(() => {
     console.log(count);
   }, [count]);
   ```

3. **Split unrelated logic into multiple useEffect**
   ```jsx
   // ❌ Mixing concerns
   useEffect(() => {
     fetchUserData();
     subscribeToNotifications();
   }, []);

   // ✅ Separate effects
   useEffect(() => {
     fetchUserData();
   }, []);

   useEffect(() => {
     subscribeToNotifications();
   }, []);
   ```

---

### 5. Common Mistakes & Solutions

**Mistake 1: Stale Closures**
```jsx
// ❌ Problem
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // Always uses initial count (0)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;
}

// ✅ Solution: Use functional update
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1); // Uses current count
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;
}
```

**Mistake 2: Infinite Loops**
```jsx
// ❌ Infinite loop - missing dependency array
useEffect(() => {
  setCount(count + 1);
}); // Runs after every render!

// ✅ Solution
useEffect(() => {
  setCount(1);
}, []); // Run once
```

**Mistake 3: Not Cleaning Up**
```jsx
// ❌ Memory leak
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);
  // No cleanup!
}, []);

// ✅ Proper cleanup
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

---

### 6. Hooks vs Class Components

| Feature | Class Component | Function Component + Hooks |
|---------|----------------|---------------------------|
| State | `this.state`, `this.setState()` | `useState()` |
| Lifecycle (mount) | `componentDidMount()` | `useEffect(() => {}, [])` |
| Lifecycle (update) | `componentDidUpdate()` | `useEffect(() => {})` |
| Lifecycle (unmount) | `componentWillUnmount()` | `useEffect(() => { return cleanup })` |
| Context | `static contextType` or Consumer | `useContext()` |
| Refs | `React.createRef()` | `useRef()` |
| Complex State | `this.setState()` | `useReducer()` |
| Code Reuse | HOCs, Render Props | Custom Hooks |
| Boilerplate | More verbose | Concise |
| `this` binding | Required | Not needed |

**Migration Example:**

```jsx
// Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// Function Component with Hooks (Much simpler!)
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## Additional Resources 📚

### Official Documentation
- [React Hooks Documentation](https://react.dev/reference/react) - Official React Hooks reference
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning) - Understanding Hook rules
- [Hooks FAQ](https://react.dev/learn#using-hooks) - Common questions answered

### Video Tutorials
- [React Hooks Crash Course](https://www.youtube.com/watch?v=TNhaISOUy6Q) - Traversy Media
- [React Hooks Tutorial](https://www.youtube.com/watch?v=f687hBjwFcM) - Codevolution

### Interactive Learning
- [React Hooks Playground](https://codesandbox.io/s/react-hooks-playground) - Try hooks in the browser
- [useHooks.com](https://usehooks.com/) - Collection of custom hook recipes
- [React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/) - Quick reference

### Hook Libraries
- [react-use](https://github.com/streamich/react-use) - Collection of essential hooks
- [ahooks](https://ahooks.js.org/) - High-quality & reliable React hooks library
- [react-query](https://tanstack.com/query) - Powerful data fetching hooks

### Communities
- [React Discord](https://discord.gg/react) - Official React community
- [Reactiflux](https://www.reactiflux.com/) - React developers chat
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community
