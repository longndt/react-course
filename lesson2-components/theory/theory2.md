# Th## Theory 2: Advanced Component Patterns & State Management

_For detailed learning objectives and prerequisites, see [readme.md](../readme.md)_ory 2: Component Architecture & Advanced State Management 🛡️

## Quick Reference 📋

*For detailed learning objectives and prerequisites, see [README.md](../README.md)*

---

## Why Component Architecture Matters? 🤔

**Think Beyond Simple Components:**

Modern React applications need:

- **Reusable Components** → Consistent UI across pages
- **Scalable Architecture** → Easy to maintain and extend
- **Professional Patterns** → Industry-standard approaches

**Visual Example - E-commerce Dashboard:**

## What Will You Learn? 🎯

After this lesson, you will:

- Master advanced component patterns used in production applications
- Build complex state management systems for modern applications
- Create reusable component libraries
- Implement forms and validation like industry standards
- Design scalable component architectures
- Apply patterns used by companies like Facebook, Netflix, and Airbnb

---

## Why Component Architecture Matters for Your Projects? 🤔

**Think Beyond Simple Components:**

Professional applications need:
- **Admin Dashboards** → Reusable data tables, forms, modals
- **User Interfaces** → Consistent buttons, inputs, navigation
- **Complex Features** → Multi-step forms, data visualization, file uploads

**Real-World Example - E-commerce Admin Panel:**
```

E-commerce Dashboard �
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

````

---

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

````jsx
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

---

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
- Ask your teacher!

## Homework 📝

### Create a Mini Shopping Cart

Build a simple shopping cart with:

1. Product list
2. Add to cart button
3. Cart total
4. Remove from cart

Tips:

- Start small
- Test each feature
- Style it nicely
- Ask for help when stuck!
