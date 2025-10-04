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

## Component Fundamentals 🧩

### 1. What is a Component?

A **component** is a reusable, self-contained piece of UI that combines structure (HTML), behavior (JavaScript), and styling (CSS). Think of components as LEGO blocks that you can combine to build complex applications.

**Key Characteristics:**
- **Reusable** - Write once, use everywhere
- **Independent** - Has its own logic and state
- **Composable** - Can be nested inside other components
- **Encapsulated** - Internal logic is hidden from outside

**Simple Analogy:**
```
Website = LEGO Castle
Components = Individual LEGO Blocks
  ├── Header (Roof block)
  ├── Navigation (Wall blocks)
  ├── Content (Room blocks)
  └── Footer (Foundation block)
```

---

### 2. Function Components (Modern Way ⭐ Recommended)

**Function components** are JavaScript functions that return JSX. This is the **modern and preferred** way to write React components.

#### Basic Example - Greeting Component

```tsx
function Greeting() {
  return <h1>Hello, Welcome to React!</h1>;
}

// Usage
<Greeting />
```

#### With Props - Making it Dynamic

```tsx
interface GreetingProps {
  name: string;
  age?: number; // Optional prop
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
}

// Usage
<Greeting name="Alice" age={25} />
<Greeting name="Bob" />
```

#### Real-World Example - Product Card

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>

      {product.inStock ? (
        <button onClick={() => onAddToCart(product.id)}>
          Add to Cart
        </button>
      ) : (
        <p className="out-of-stock">Out of Stock</p>
      )}
    </div>
  );
}

// Usage
const handleAddToCart = (productId: number) => {
  console.log(`Added product ${productId} to cart`);
};

<ProductCard
  product={{
    id: 1,
    name: "Wireless Mouse",
    price: 29.99,
    image: "/images/mouse.jpg",
    inStock: true
  }}
  onAddToCart={handleAddToCart}
/>
```

**✅ Advantages of Function Components:**
- Simple and concise syntax
- Easier to read and understand
- Better performance
- Can use Hooks for state and side effects
- No `this` keyword confusion
- Better TypeScript support

**When to Use Function Components:**
- **Always!** This is the modern standard (2019+)
- For new projects and components
- When using React Hooks

---

### 3. Class Components (Legacy Way 📜 Older Approach)

**Class components** are ES6 classes that extend `React.Component`. They were the standard before React 16.8 (2019) introduced Hooks.

#### Basic Example - Greeting Component

```tsx
import React from 'react';

class Greeting extends React.Component {
  render() {
    return <h1>Hello, Welcome to React!</h1>;
  }
}

// Usage
<Greeting />
```

#### With Props

```tsx
interface GreetingProps {
  name: string;
  age?: number;
}

class Greeting extends React.Component<GreetingProps> {
  render() {
    const { name, age } = this.props;

    return (
      <div>
        <h1>Hello, {name}!</h1>
        {age && <p>You are {age} years old.</p>}
      </div>
    );
  }
}

// Usage
<Greeting name="Alice" age={25} />
```

#### With State - Counter Example

```tsx
interface CounterState {
  count: number;
}

class Counter extends React.Component<{}, CounterState> {
  // Constructor to initialize state
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0
    };

    // Bind methods (required for event handlers)
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}
```

#### Real-World Example - User Profile with Lifecycle

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserProfileProps {
  userId: number;
}

interface UserProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null
    };
  }

  // Runs after component is mounted to DOM
  componentDidMount() {
    this.fetchUser();
  }

  // Runs when props change
  componentDidUpdate(prevProps: UserProfileProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  // Cleanup before component unmounts
  componentWillUnmount() {
    // Cancel any pending requests, clear timers, etc.
    console.log('Component unmounting...');
  }

  async fetchUser() {
    try {
      this.setState({ loading: true, error: null });

      const response = await fetch(
        `https://api.example.com/users/${this.props.userId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const user = await response.json();
      this.setState({ user, loading: false });

    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false
      });
    }
  }

  render() {
    const { user, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found</div>;

    return (
      <div className="user-profile">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    );
  }
}

// Usage
<UserProfile userId={123} />
```

**❌ Disadvantages of Class Components:**
- More boilerplate code
- Need to bind `this` for event handlers
- Confusing `this` keyword
- Harder to share stateful logic (need HOCs or Render Props)
- More complex lifecycle methods
- Larger bundle size

**When to Use Class Components:**
- Legacy codebases (pre-2019)
- Maintaining old projects
- When working with older libraries that don't support Hooks
- **Not recommended for new development**

---

### 4. Function vs Class Components - Detailed Comparison

| Aspect | Function Component | Class Component |
|--------|-------------------|-----------------|
| **Syntax** | Simple function | ES6 class with `render()` |
| **State Management** | `useState()` Hook | `this.state` and `this.setState()` |
| **Lifecycle** | `useEffect()` Hook | `componentDidMount`, `componentDidUpdate`, etc. |
| **Props Access** | Direct parameter | `this.props` |
| **Performance** | Slightly faster | Slightly slower |
| **Learning Curve** | Easier | Steeper (need to understand `this`) |
| **Code Size** | Smaller | More boilerplate |
| **Reusability** | Custom Hooks | HOCs, Render Props |
| **React Recommendation** | ✅ **Recommended** | ⚠️ Legacy |
| **First Introduced** | React 0.14 (2015), Hooks in 16.8 (2019) | React 0.13 (2015) |

#### Side-by-Side Comparison - Same Component

```tsx
// ✅ MODERN: Function Component with Hooks
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return <div>Seconds: {seconds}</div>;
}

// ❌ LEGACY: Class Component
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}
```

**Result:** Function component is **7 lines**, class component is **18 lines** for the same functionality!

---

### 5. Props & Component Composition

**Props** (short for "properties") are how you pass data from parent to child components. Think of props as function arguments.

#### Basic Props Example

```tsx
// Child Component
interface ButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}

function Button({ text, color, onClick }: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// Parent Component
function App() {
  const handleClick = () => alert('Button clicked!');

  return (
    <div>
      <Button text="Save" color="green" onClick={handleClick} />
      <Button text="Delete" color="red" onClick={handleClick} />
      <Button text="Cancel" color="gray" onClick={handleClick} />
    </div>
  );
}
```

#### Composition - Children Prop

```tsx
// Reusable Card Component
interface CardProps {
  children: React.ReactNode;
  title?: string;
}

function Card({ children, title }: CardProps) {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage - Composing Multiple Cards
function Dashboard() {
  return (
    <div>
      <Card title="User Stats">
        <p>Total Users: 1,234</p>
        <p>Active Today: 456</p>
      </Card>

      <Card title="Revenue">
        <p>This Month: $12,345</p>
        <p>Growth: +23%</p>
      </Card>

      <Card>
        <h4>Custom Content</h4>
        <p>Any JSX can go here!</p>
      </Card>
    </div>
  );
}
```

#### Advanced Composition - Layout Pattern

```tsx
// Layout Components
interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer>&copy; 2025 My Company</footer>;
}

// Usage
function HomePage() {
  return (
    <PageLayout>
      <h2>Welcome to Home Page</h2>
      <p>This is the main content</p>
    </PageLayout>
  );
}

function AboutPage() {
  return (
    <PageLayout>
      <h2>About Us</h2>
      <p>This is the about page content</p>
    </PageLayout>
  );
}
```

**Key Principles:**
- Props flow **one way** - from parent to child (unidirectional data flow)
- Props are **read-only** - child cannot modify them
- Use **composition** to build complex UIs from simple components
- Keep components **small and focused** on a single responsibility

---

### 6. Best Practices Summary

**✅ DO:**
- Use **Function Components** for all new code
- Break UI into small, reusable components
- Use TypeScript interfaces for props
- Use descriptive component names (`UserProfile`, not `Component1`)
- Keep components focused on one responsibility
- Extract repeated logic into custom hooks

**❌ DON'T:**
- Don't use Class Components for new projects
- Don't create overly large components (>300 lines)
- Don't modify props inside components
- Don't forget to add key props in lists
- Don't mix business logic with UI rendering too much

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
```tsx
const [state, setState] = useState(initialValue);
```

**Basic Example:**
```tsx
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
```tsx
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
```tsx
useEffect(() => {
  // Effect logic
  return () => {
    // Cleanup logic (optional)
  };
}, [dependencies]);
```

**Example 1: Timer**
```tsx
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
```tsx
interface User {
   id: number;
   name: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   async function fetchUsers() {
     try {
       setLoading(true);
       const response = await fetch(
         "https://67e57e8618194932a5864d8b.mockapi.io/users"  //Mock API
       );

       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }

       const data = await response.json();
       setUsers(data);
     } catch (err) {
       setError(err instanceof Error ? err.message : "An error occurred");
     } finally {
       setLoading(false);
     }
   }

   fetchUsers();
 }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
         <li key={user.id}>{user.id} - {user.name}</li>
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
```tsx
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
```tsx
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
```tsx
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
```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**Example: Todo List**
```tsx
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
```tsx
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
```tsx
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
```tsx
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
        const json = await response\.tson();
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
interface UserProfileProps {
  userId: number;
}

interface User {
  id: number;
  name: string;
}

function UserProfile({ userId }: UserProfileProps) {
  const { data: user, loading, error } = useFetch<User>(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Hello, {user.name}!</div>;
}
```

---

### 4. Hook Rules & Best Practices

**Rules of Hooks:**

1. **Only Call Hooks at the Top Level**
   ```tsx
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
   ```tsx
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
   ```tsx
   // ✅ Good
   function useFormValidation() { }
   function useAuth() { }

   // ❌ Bad
   function formValidation() { }
   function getAuth() { }
   ```

2. **Keep useEffect dependencies accurate**
   ```tsx
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
   ```tsx
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
```tsx
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
```tsx
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
```tsx
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

```tsx
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
- [ahooks](https://ahooks\.ts.org/) - High-quality & reliable React hooks library
- [react-query](https://tanstack.com/query) - Powerful data fetching hooks

### Communities
- [React Discord](https://discord.gg/react) - Official React community
- [Reactiflux](https://www.reactiflux.com/) - React developers chat
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community


