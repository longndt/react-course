# Theory 2: Advanced Component Patterns & State Management

---

## Why Component Architecture Matters? 🤔

**Think Beyond Simple Components:**

Modern React applications need:

- **Reusable Components** → Consistent UI across pages
- **Scalable Architecture** → Easy to maintain and extend
- **Professional Patterns** → Industry-standard approaches

---

## Why Component Architecture Matters for Your Projects? 🤔

**Think Beyond Simple Components:**

Professional applications need:
- **Admin Dashboards** → Reusable data tables, forms, modals
- **User Interfaces** → Consistent buttons, inputs, navigation
- **Complex Features** → Multi-step forms, data visualization, file uploads

**Real-World Example - E-commerce Admin Panel:**
```

E-commerce Dashboard
├── Sidebar Navigation (Reusable)
│ ├── Navigation Item (Atomic)
│ └── User Profile (Compound)
├── Main Content Area
│ ├── Stats Cards (Reusable Grid)
│ ├── Data Table (Complex Component)
│ │ ├── Table Header (Sortable)
│ │ ├── Table Row (Actions)
│ │ └── Pagination (Stateful)
│ └── Modal Forms (Overlay)
└── Footer (Static)

````

**Building Blocks Approach:**
- **Atomic Components**: Button, Input, Icon
- **Molecule Components**: SearchBox, Card, FormField
- **Organism Components**: Header, ProductList, DataTable
- **Page Components**: Dashboard, ProductManagement, UserProfile

---

## Advanced State Management Patterns 🧠

### 1. Local Component State (useState)

**Best for:** Component-specific data that doesn't need to be shared

```typescript
// Simple counter - perfect for local state
function Counter() {
  const [count, setCount] = useState(0);
  const [isEven, setIsEven] = useState(true);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setIsEven(newCount % 2 === 0);
  };

  return (
    <div>
      <span>Count: {count} ({isEven ? 'Even' : 'Odd'})</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

// Complex form state - still local but more sophisticated
function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courses: [],
    preferences: {
      notifications: true,
      theme: 'light'
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
````

### 2. useReducer for Complex State Logic

**Best for:** Complex state updates, multiple related state variables

```typescript
// State management for a shopping cart
interface CartState {
  items: CartItem[];
  total: number;
  discounts: Discount[];
  isLoading: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "APPLY_DISCOUNT"; payload: Discount }
  | { type: "SET_LOADING"; payload: boolean };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: calculateTotal(state.items),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: calculateTotal([...state.items, action.payload]),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: calculateTotal(
          state.items.filter((item) => item.id !== action.payload)
        ),
      };

    default:
      return state;
  }
}

// Usage in component
function ShoppingCart() {
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    discounts: [],
    isLoading: false,
  });

  const addToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    });
  };

  return <div>{/* Cart UI */}</div>;
}
```

```jsx
function Counter() {
  // count is the memory (state)
  // setCount is how we change it
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Add One</button>
    </div>
  );
}
```

### When to Use State?

Use state when something needs to change:

- Counter numbers
- Form inputs
- Toggle switches
- Lists that change
- User preferences

## Working with Forms 📝

### Simple Form Example:
```jsx
function SignupForm() {
  // Store form data in state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    alert(`Hello ${name}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name Input */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email Input */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
````

### Form Styling:

```css
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
```

---

## Making Components Work Together 🤝

### Passing Data Between Components:

```jsx
// Parent Component
function Parent() {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>Game Score: {score}</h1>

      {/* Pass score to child */}
      <ScoreDisplay score={score} />

      {/* Pass function to child */}
      <ScoreButtons onScore={setScore} />
    </div>
  );
}

// Child Components
function ScoreDisplay({ score }) {
  return <div className="score">Points: {score}</div>;
}

function ScoreButtons({ onScore }) {
  return (
    <div>
      <button onClick={() => onScore((prev) => prev + 1)}>Add Point</button>
      <button onClick={() => onScore((prev) => prev - 1)}>Remove Point</button>
    </div>
  );
}
```

## Common Mistakes to Avoid ⚠️

### 1. Changing State Directly

```jsx
// ❌ Wrong
const [score, setScore] = useState(0);
score = 10; // Don't do this!

// ✅ Correct
setScore(10);
```

### 2. Forgetting State Updates Are Async

```jsx
// ❌ Wrong
setCount(count + 1);
setCount(count + 1); // Won't work as expected

// ✅ Correct
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

### 3. Complex State Updates

```jsx
// ❌ Wrong - too complex
const [user, setUser] = useState({
  name: 'John',
  scores: [1, 2, 3],
  settings: { theme: 'dark' }
});

// ✅ Better - split into smaller states
const [name, setName] = useState('John');
const [scores, setScores] = useState([1, 2, 3]);
const [theme, setTheme] = useState('dark');
```

## Practice Time! 💪

### Exercise 1: Todo List App
Create a simple todo list:
1. Add new todos
2. Mark todos as complete
3. Delete todos

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        text: input,
        done: false
      }]);
      setInput(''); // Clear input
    }
  };

  return (
    <div className="todo-app">
      {/* Add Todo Form */}
      <div className="add-todo">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => {
                const newTodos = [...todos];
                newTodos[index].done = !todo.done;
                setTodos(newTodos);
              }}
            />
            <span style={{
              textDecoration: todo.done ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
````

### Exercise 2: Theme Switcher

Create a button that switches between light and dark theme:

```jsx
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : "light"}>
      <h1>My App</h1>
      <button onClick={() => setIsDark(!isDark)}>
        Switch to {isDark ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}
```

---

## React Hooks – Deep Dive 🎣

### 1. What are Hooks?

**Hooks** are special functions in React that let you "hook into" React features like state, lifecycle, context, and more directly from function components. Before Hooks, these features were only available in class components.

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

**Example 3: Dependency Array**
```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Runs whenever 'query' changes
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]); // Re-run when query changes

  return <div>{/* Display results */}</div>;
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

**Example 3: Avoiding Stale Closures**
```jsx
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef();

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
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

**Example: Auth Context**
```jsx
const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Login logic
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function UserProfile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <p>Welcome, {user.username}!</p>
      <button onClick={logout}>Logout</button>
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
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    
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

#### f. Custom Hooks – Reusable Logic

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

**Example 4: Online Status**
```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Usage
function App() {
  const isOnline = useOnlineStatus();

  return (
    <div>
      <h1>Network Status</h1>
      <p>You are {isOnline ? 'online' : 'offline'}</p>
    </div>
  );
}
```

---

### 3. Hook Rules & Best Practices

**Rules of Hooks (Enforced by ESLint):**

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

   // ✅ Correct - custom Hook
   function useCalculator() {
     const [total, setTotal] = useState(0);
     return total;
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

### 4. Common Mistakes & Solutions

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

// ✅ Solution 1: Use functional update
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

// ✅ Solution 2: Include in dependencies
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]); // Re-create interval when count changes

  return <div>{count}</div>;
}
```

**Mistake 2: Infinite Loops**
```jsx
// ❌ Infinite loop - missing dependency array
useEffect(() => {
  setCount(count + 1);
}); // Runs after every render!

// ❌ Infinite loop - dependency causes re-render
useEffect(() => {
  setData({ value: 1 });
}, [data]); // data changes → effect runs → data changes → ...

// ✅ Solution
useEffect(() => {
  setData({ value: 1 });
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

**Mistake 4: Calling Hooks Conditionally**
```jsx
// ❌ Wrong
function Component({ isEnabled }) {
  if (isEnabled) {
    const [value, setValue] = useState(0);
  }
}

// ✅ Correct
function Component({ isEnabled }) {
  const [value, setValue] = useState(0);
  
  if (!isEnabled) {
    return null;
  }
  
  return <div>{value}</div>;
}
```

---

### 5. Hooks vs Class Components

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

// Function Component with Hooks
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

## Practical Exercises 💪

### Exercise 1: Multi-Step Form with Hooks

Create a multi-step registration form using hooks:

**Requirements:**
- Step 1: Personal info (name, email)
- Step 2: Address (street, city, zip)
- Step 3: Review and submit
- Use useState to manage form data and current step
- Validate each step before proceeding

**Starter Code:**
```jsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    zip: ''
  });

  // TODO: Implement step navigation
  // TODO: Implement validation
  // TODO: Implement form submission

  return (
    <div>
      {/* Your implementation here */}
    </div>
  );
}
```

---

### Exercise 2: Real-time Search with Debouncing

Build a search component that fetches results as user types, with debouncing:

**Requirements:**
- Input field for search query
- Debounce API calls (wait 500ms after user stops typing)
- Show loading state
- Display results
- Use custom hook `useDebounce`

**Starter Code:**
```jsx
function useDebounce(value, delay) {
  // TODO: Implement debounce logic
}

function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  
  // TODO: Fetch results when debouncedQuery changes
  // TODO: Display results

  return (
    <div>
      {/* Your implementation here */}
    </div>
  );
}
```

---

### Exercise 3: Dark Mode Toggle with Context

Implement a theme switcher using Context API:

**Requirements:**
- Create ThemeContext
- ThemeProvider component
- Toggle button to switch themes
- Apply theme to multiple components
- Persist theme in localStorage

**Starter Code:**
```jsx
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  // TODO: Implement theme state and toggle function
  // TODO: Persist to localStorage
}

function App() {
  // TODO: Wrap app with ThemeProvider
  // TODO: Create components that use theme
}
```

---

### Exercise 4: Shopping Cart with useReducer

Build a shopping cart using useReducer:

**Requirements:**
- Add/remove items
- Update quantity
- Calculate total
- Apply discount codes
- Clear cart

**Starter Code:**
```jsx
const initialState = {
  items: [],
  total: 0,
  discount: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // TODO
    case 'REMOVE_ITEM':
      // TODO
    case 'UPDATE_QUANTITY':
      // TODO
    case 'APPLY_DISCOUNT':
      // TODO
    case 'CLEAR_CART':
      // TODO
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // TODO: Implement cart UI and actions
}
```

---

### Exercise 5: Custom Hook - useAsync

Create a reusable hook for handling async operations:

**Requirements:**
- Track loading, error, and data states
- Handle promise execution
- Support cancellation
- Return execute function

**Starter Code:**
```jsx
function useAsync(asyncFunction) {
  // TODO: Implement async state management
  // TODO: Handle loading, error, success states
  // TODO: Return { execute, loading, error, data }
}

// Usage example
function UserProfile({ userId }) {
  const { execute, loading, error, data } = useAsync(
    () => fetch(`/api/users/${userId}`).then(r => r.json())
  );

  useEffect(() => {
    execute();
  }, [userId]);

  // TODO: Render UI based on loading, error, data
}
```

---

### Exercise 6: Form Validation Hook

Create a custom hook for form validation:

**Requirements:**
- Accept validation rules
- Validate on change and on submit
- Return field values, errors, handlers
- Support async validation

**Starter Code:**
```jsx
function useFormValidation(initialValues, validationRules) {
  // TODO: Implement form state
  // TODO: Implement validation logic
  // TODO: Return { values, errors, handleChange, handleSubmit, isValid }
}

// Usage
function SignupForm() {
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    { email: '', password: '' },
    {
      email: (value) => {
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
      },
      password: (value) => {
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be 8+ characters';
      }
    }
  );

  // TODO: Render form
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
- [Custom Hooks Explained](https://www.youtube.com/watch?v=6ThXsUwLWvc) - Web Dev Simplified

### Interactive Learning
- [React Hooks Playground](https://codesandbox.io/s/react-hooks-playground) - Try hooks in the browser
- [useHooks.com](https://usehooks.com/) - Collection of custom hook recipes
- [React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/) - Quick reference

### Articles & Guides
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) - Dan Abramov
- [When to useReducer vs useState](https://kentcdodds.com/blog/should-i-usestate-or-usereducer) - Kent C. Dodds
- [Custom Hooks Best Practices](https://blog.logrocket.com/react-custom-hooks-best-practices/)

### Hook Libraries
- [react-use](https://github.com/streamich/react-use) - Collection of essential hooks
- [ahooks](https://ahooks.js.org/) - High-quality & reliable React hooks library
- [react-query](https://tanstack.com/query) - Powerful data fetching hooks

### Practice & Challenges
- [React Coding Challenges](https://github.com/alexgurr/react-coding-challenges)
- [Frontend Mentor](https://www.frontendmentor.io/) - Real-world projects
- [Exercism React Track](https://exercism.org/tracks/javascript) - Practice exercises

### Communities
- [React Discord](https://discord.gg/react) - Official React community
- [Reactiflux](https://www.reactiflux.com/) - React developers chat
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community

---

## Need Help? 🆘

### Common Problems:

1. Component not updating?

   - Check if you're using setState
   - Make sure props are passed correctly
   - Check for typos in prop names

2. Form not working?

   - Add event.preventDefault()
   - Check your onChange handlers
   - Verify state updates

3. List items not showing?
   - Make sure to add 'key' prop
   - Check if array is empty
   - Verify map function

### Where to Get Help:

- [React Documentation](https://react.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)