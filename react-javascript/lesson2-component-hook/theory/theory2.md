# Theory - Component Architecture & React Hooks

> **Purpose of this file**: Explains **WHY** hooks exist, **HOW** component state and lifecycle work, and **WHEN** to use each hook. Code examples include explanatory comments.
>
> **Use Reference2 when you need**: Quick hook syntax, patterns, copy-paste ready code.

---

## Table of Contents

1. [Why Component Architecture?](#1-why-component-architecture)
2. [Understanding State: The Core Problem](#2-understanding-state-the-core-problem)
3. [useState: Managing Component State](#3-usestate-managing-component-state)
4. [useEffect: Side Effects and Lifecycle](#4-useeffect-side-effects-and-lifecycle)
5. [useRef: Direct DOM Access and Persistent Values](#5-useref-direct-dom-access-and-persistent-values)
6. [useContext: Avoiding Prop Drilling](#6-usecontext-avoiding-prop-drilling)
7. [useReducer: Complex State Logic](#7-usereducer-complex-state-logic)
8. [Custom Hooks: Reusable Logic](#8-custom-hooks-reusable-logic)
9. [Hook Rules and Why They Exist](#9-hook-rules-and-why-they-exist)
10. [Common Mistakes](#10-common-mistakes)

---

## 1. Why Component Architecture?

### The Problem: Monolithic UI

```jsx
// ❌ All logic in one massive component - hard to maintain!
function EntireApp() {
  // 500 lines of mixed concerns:
  // - User authentication
  // - Product list
  // - Shopping cart
  // - Checkout form
  // - Navigation
  // ...impossible to test, reuse, or understand!
}
```

### The Solution: Component Composition

```jsx
// ✅ Break down into focused, reusable pieces
function App() {
  return (
    <div>
      <Navigation />
      <ProductList />
      <ShoppingCart />
      <Footer />
    </div>
  );
}

// Each component handles ONE responsibility
function ProductList() {
  const [products, setProducts] = useState([]);
  // Only product-related logic here
}
```

**Key Benefits:**
- **Testable**: Test one component at a time
- **Reusable**: Use `<Button />` everywhere
- **Maintainable**: Bug in cart? Only check `ShoppingCart.jsx`
- **Collaborative**: Team members work on different components

---

## 2. Understanding State: The Core Problem

### What is State?

**State = Data that changes over time and triggers re-renders**

```jsx
// NOT state - never changes
const APP_NAME = "My App";

// IS state - changes and updates UI
  const [count, setCount] = useState(0);
```

### Why Can't We Use Regular Variables?

```jsx
// ❌ This WON'T work - UI won't update!
function BrokenCounter() {
  let count = 0;  // Regular variable
  
  function increment() {
    count = count + 1;  // Changes variable
    console.log(count); // Logs correctly
    // But UI still shows 0! React doesn't know to re-render
  }

  return (
    <div>
      <p>Count: {count}</p>  {/* Always shows 0 */}
      <button onClick={increment}>+</button>
    </div>
  );
}
```

```jsx
// ✅ This WORKS - UI updates!
function WorkingCounter() {
  const [count, setCount] = useState(0);  // React state
  
  function increment() {
    setCount(count + 1);  // Tells React to re-render
  }
  
  return (
    <div>
      <p>Count: {count}</p>  {/* Updates when state changes */}
      <button onClick={increment}>+</button>
    </div>
  );
}
```

**Key Insight**: React components re-render when state changes. Regular variables don't trigger re-renders.

---

## 3. useState: Managing Component State

### How useState Works

```jsx
const [value, setValue] = useState(initialValue);
//     ^       ^           ^
//     |       |           └── Initial value (only used on first render)
//     |       └── Function to update value (triggers re-render)
//     └── Current value
```

### State is Asynchronous

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // ❌ This doesn't work as expected!
    setCount(count + 1);  // count is still 0 here
    setCount(count + 1);  // count is still 0 here
    setCount(count + 1);  // count is still 0 here
    // Result: count becomes 1 (not 3!)
  }
  
  function handleClickCorrect() {
    // ✅ Use updater function for sequential updates
    setCount(prev => prev + 1);  // prev is 0, sets to 1
    setCount(prev => prev + 1);  // prev is 1, sets to 2
    setCount(prev => prev + 1);  // prev is 2, sets to 3
    // Result: count becomes 3 ✓
  }
  
  return <button onClick={handleClickCorrect}>+3</button>;
}
```

**Why?** React batches state updates for performance. Multiple `setState` calls = one re-render.

### Object State: Immutability is Key

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 25,
    email: 'john@example.com'
  });
  
  // ❌ WRONG: Mutating state directly
  function updateNameWrong() {
    user.name = 'Jane';  // Modifies object in place
    setUser(user);       // React doesn't detect change! (same object reference)
  }
  
  // ✅ CORRECT: Create new object
  function updateNameCorrect() {
    setUser({
      ...user,           // Copy all existing properties
      name: 'Jane'       // Override just name
    });
  }
  
  // ✅ BETTER: Functional update (safer)
  function updateAge() {
    setUser(prev => ({
      ...prev,
      age: prev.age + 1
    }));
  }

  return (
    <div>
      <p>{user.name} - {user.age}</p>
      <button onClick={updateNameCorrect}>Change Name</button>
      <button onClick={updateAge}>Birthday</button>
    </div>
  );
}
```

**Key Rule**: Never mutate state. Always create new objects/arrays.

---

## 4. useEffect: Side Effects and Lifecycle

### What are Side Effects?

**Side Effect = Code that interacts with the outside world**

Examples:
- Fetching data from API
- Setting up timers/intervals
- Subscribing to events
- Manually changing DOM
- Logging to console

```jsx
// Without useEffect - runs on EVERY render (bad!)
function BadExample() {
  fetch('/api/data');  // 💥 Infinite loop! Fetch triggers re-render → fetch again → ...
  return <div>Data</div>;
}

// With useEffect - controlled execution
function GoodExample() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);  // Empty array = run once on mount
  
  return <div>{data}</div>;
}
```

### Dependency Array: The Most Important Part

```jsx
function EffectDemo({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // No dependencies - runs after EVERY render (rare!)
  useEffect(() => {
    console.log('Rendered');
  });
  
  // Empty dependencies - runs ONCE on mount
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  // With dependencies - runs when userId changes
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);  // Re-run when userId changes
  
  // Multiple dependencies - runs when ANY change
  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.id}/posts`)
        .then(res => res.json())
        .then(setPosts);
    }
  }, [user]);  // Re-run when user changes
}
```

**Critical Rule**: Include ALL values from component scope that the effect uses. ESLint will warn you!

### Cleanup: Preventing Memory Leaks

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Start interval
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // ✅ Cleanup function - runs when component unmounts
    return () => {
      clearInterval(intervalId);  // Stop interval
      console.log('Timer cleanup');
    };
  }, []);

  return <div>Timer: {seconds}s</div>;
}

// When Timer is removed from DOM:
// 1. Cleanup function runs
// 2. Interval is cleared
// 3. No memory leak!
```

**When cleanup runs:**
- Component unmounts (removed from DOM)
- Before effect runs again (if dependencies changed)

---

## 5. useRef: Direct DOM Access and Persistent Values

### Two Use Cases for useRef

**1. Accessing DOM Elements**

```jsx
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus();  // Direct DOM access
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}
```

**2. Persisting Values Without Re-rendering**

```jsx
// useState vs useRef comparison
function StateVsRef() {
  const [stateCount, setStateCount] = useState(0);  // Re-renders
  const refCount = useRef(0);                        // No re-render
  
  function incrementState() {
    setStateCount(stateCount + 1);  // Triggers re-render
  }
  
  function incrementRef() {
    refCount.current = refCount.current + 1;  // NO re-render
    console.log('Ref count:', refCount.current);  // Updates, but UI doesn't
  }

  return (
    <div>
      <p>State: {stateCount}</p>  {/* Shows updates */}
      <p>Ref: {refCount.current}</p>  {/* Doesn't update on screen! */}
      <button onClick={incrementState}>State +1</button>
      <button onClick={incrementRef}>Ref +1 (silent)</button>
    </div>
  );
}
```

**When to use useRef:**
- ✅ Accessing DOM elements (focus, scroll, measure)
- ✅ Storing values that don't affect UI (previous value, timers, external library instances)
- ❌ Don't use for values that should trigger re-renders (use `useState` instead)

---

## 6. useContext: Avoiding Prop Drilling

### The Prop Drilling Problem

```jsx
// ❌ Props passed through 5 levels!
function App() {
  const user = { name: 'John', role: 'admin' };
  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <Menu user={user} />;
}

function Menu({ user }) {
  return <MenuItem user={user} />;
}

function MenuItem({ user }) {
  return <span>{user.name}</span>;  // Finally used here!
}
```

### Context: Global State

```jsx
// ✅ Create context once
const UserContext = createContext(undefined);

// Provider at top level
function App() {
  const user = { name: 'John', role: 'admin' };

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

// Consume anywhere in tree (no prop passing!)
function MenuItem() {
  const user = useContext(UserContext);
  
  if (!user) return null;
  
  return <span>{user.name}</span>;  // Direct access!
}
```

**When to use Context:**
- ✅ Theme (dark/light mode)
- ✅ Authentication (current user)
- ✅ Language/i18n
- ✅ Global settings
- ❌ Don't overuse! Frequent updates = all consumers re-render

---

## 7. useReducer: Complex State Logic

### When useState Gets Messy

```jsx
// ❌ Multiple related state updates - hard to manage!
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  function addItem(item) {
    setItems([...items, item]);
    setTotal(total + item.price);
    // Easy to forget to update related state!
  }
}
```

### useReducer: Centralized State Logic

```jsx
// ✅ All state updates in one place
interface State {
  items: Item[];
  total: number;
  discount: number;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'ADD_ITEM'; item: Item }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'APPLY_DISCOUNT'; percent: number }
  | { type: 'SET_ERROR'; error: string };

function cartReducer(state: State, action: Action): State {
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
    
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.percent,
        total: state.total * (1 - action.percent / 100)
      };
    
    case 'SET_ERROR':
      return { ...state, error: action.error };
    
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    discount: 0,
    loading: false,
    error: null
  });
  
  function addItem(item: Item) {
    dispatch({ type: 'ADD_ITEM', item });  // One action updates multiple fields!
  }

  return (
    <div>
      <p>Total: ${state.total}</p>
      <button onClick={() => addItem(newItem)}>Add Item</button>
    </div>
  );
}
```

**When to use useReducer:**
- ✅ Multiple state values that change together
- ✅ Complex state transitions
- ✅ Next state depends on previous state
- ❌ Simple counter? Use `useState`

---

## 8. Custom Hooks: Reusable Logic

### Why Custom Hooks?

```jsx
// ❌ Duplicated logic in multiple components
function ComponentA() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/data').then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);
}

function ComponentB() {
  // Same logic repeated! 😢
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/other').then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);
}
```

### Extract to Custom Hook

```jsx
// ✅ Reusable custom hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
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

// Use everywhere!
function ComponentA() {
  const { data, loading } = useFetch('/api/data');
  if (loading) return <div>Loading...</div>;
  return <div>{data}</div>;
}

function ComponentB() {
  const { data, loading } = useFetch('/api/other');
  if (loading) return <div>Loading...</div>;
  return <div>{data}</div>;
}
```

**Custom Hook Rules:**
- ✅ Name MUST start with `use`
- ✅ Can use other hooks inside
- ✅ Returns anything you want (values, functions, etc.)
- ✅ Share stateful logic, NOT state itself (each component gets independent state)

---

## 9. Hook Rules and Why They Exist

### Rule 1: Only Call Hooks at Top Level

```jsx
// ❌ WRONG: Conditional hook
function Bad({ show }) {
  if (show) {
    const [count, setCount] = useState(0);  // 💥 Error!
  }
}

// ❌ WRONG: Hook in loop
function Bad() {
  for (let i = 0; i < 3; i++) {
    const [count, setCount] = useState(0);  // 💥 Error!
  }
}

// ✅ CORRECT: Always at top level
function Good({ show }) {
  const [count, setCount] = useState(0);  // Always called
  
  if (!show) return null;
  
  return <div>{count}</div>;
}
```

**Why?** React relies on hook call order to track state. Conditional hooks break this order.

```jsx
// React tracks hooks by order:
// Render 1:         Render 2:
useState('name')    useState('name')    // ✅ Same order
useState(0)         useState(0)         // ✅ Same order
useState(false)     useState(false)     // ✅ Same order

// With conditional:
// Render 1:         Render 2:
useState('name')    useState('name')    // ✅
if (show) {         // show is false!
  useState(0)       // 💥 SKIPPED!
}
useState(false)     useState(false)     // 💥 Now in position 2, was position 3!
```

### Rule 2: Only Call Hooks from React Functions

```jsx
// ❌ WRONG: Regular JavaScript function
function regularFunction() {
  const [count, setCount] = useState(0);  // 💥 Error!
}

// ✅ CORRECT: React component
function MyComponent() {
  const [count, setCount] = useState(0);  // ✅
}

// ✅ CORRECT: Custom hook
function useCustomHook() {
  const [count, setCount] = useState(0);  // ✅
}
```

---

## 10. Common Mistakes

### Mistake 1: Forgetting Dependencies in useEffect

```jsx
// ❌ BAD: Missing dependency
function Bad({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)  // Uses userId
      .then(res => setUser(res));
  }, []);  // 💥 Empty array! Won't update when userId changes
}

// ✅ GOOD: Include all dependencies
function Good({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => setUser(res));
  }, [userId]);  // ✅ Re-runs when userId changes
}
```

### Mistake 2: Mutating State

```jsx
// ❌ BAD: Mutating array
function Bad() {
  const [items, setItems] = useState([1, 2, 3]);
  
  function addItem() {
    items.push(4);  // Mutates array!
    setItems(items);  // React doesn't detect change
  }
}

// ✅ GOOD: Create new array
function Good() {
  const [items, setItems] = useState([1, 2, 3]);
  
  function addItem() {
    setItems([...items, 4]);  // New array
  }
}
```

### Mistake 3: Using State Value Immediately After Setting

```jsx
function Bad() {
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
    console.log(count);  // 💥 Still 0! State updates are async
  }
}

// ✅ Use useEffect to react to state changes
function Good() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count updated:', count);  // Runs after state updates
  }, [count]);
}
```

---

## Next Steps

You now understand:
- ✅ **Why** hooks exist (state management without classes)
- ✅ **How** each hook works (useState, useEffect, useRef, useContext, useReducer)
- ✅ **When** to use each hook (state, side effects, DOM access, global data, complex logic)
- ✅ **How** to create custom hooks (reusable logic)

**Practice**: Head to `lab2.md` for hands-on exercises!

**Quick Reference**: See `reference2.md` for hook syntax and patterns.

