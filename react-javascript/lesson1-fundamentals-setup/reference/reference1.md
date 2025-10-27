# Reference - React Fundamentals & Project Setup

> **Quick reference guide for React fundamentals**

## Table of Contents
1. [What is React?](#what-is-react)
2. [JavaScript with React (JSX)](#javascript-with-react-jsx)
3. [Project Setup with Vite](#project-setup-with-vite)
4. [Component Basics](#component-basics)
5. [JSX Syntax Rules](#jsx-syntax-rules)
6. [Styling Components](#styling-components)
7. [Event Handling Basics](#event-handling-basics)
8. [Common Patterns](#common-patterns)

---

## What is React?

### Key Concepts
- **Component-based** - Build UI with reusable components

- **Declarative** - Describe what you want, not how to get it

- **Virtual DOM** - Efficient updates and rendering

- **Unidirectional Data Flow** - Data flows down, events flow up

### Why React?
- **Reusable Components** - Build once, use anywhere

- **Efficient Updates** - Only re-render what changed

- **Rich Ecosystem** - Huge community and tooling

- **Industry Standard** - Used by major companies

---

## JavaScript with React (JSX)

### JSX Fundamentals
```jsx
// Basic JSX
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// JSX with expressions
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// JSX with attributes
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
```

### JSX vs HTML
```jsx
// HTML
<div class="container">
  <h1>Hello World</h1>
  <button onclick="handleClick()">Click me</button>
</div>

// JSX
<div className="container">
  <h1>Hello World</h1>
  <button onClick={handleClick}>Click me</button>
</div>
```

### Embedding JavaScript in JSX
```jsx
function UserProfile({ user, isLoggedIn }) {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Current time: {currentTime}</p>
      {isLoggedIn && <p>You are logged in</p>}
      {user.age >= 18 ? <p>Adult user</p> : <p>Minor user</p>}
    </div>
  );
}
```

---

## Project Setup with Vite

### Create New Project
```bash
# Create new React project
npm create vite@latest my-react-app -- --template react

# Navigate to project
cd my-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure
```
my-react-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── Button.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
})
```

---

## Component Basics

### Function Components
```jsx
// Simple component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Component with props
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
    </div>
  );
}

// Component with children
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
```

### Component Usage
```jsx
function App() {
  return (
    <div>
      <Welcome />
      <Greeting name="John" age={25} />
      <Card title="User Info">
        <p>This is the card content</p>
        <button>Click me</button>
      </Card>
    </div>
  );
}
```

### Props
```jsx
// Props destructuring
function UserCard({ name, email, age, isActive }) {
  return (
    <div className={`user-card ${isActive ? 'active' : 'inactive'}`}>
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}

// Default props
function Button({ children, variant = 'primary', size = 'md' }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
}
```

---

## JSX Syntax Rules

### Single Root Element
```jsx
// ❌ Wrong - Multiple root elements
function Component() {
  return (
    <h1>Title</h1>
    <p>Content</p>
  );
}

// ✅ Correct - Single root element
function Component() {
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
}

// ✅ Correct - React Fragment
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}
```

### Self-Closing Tags
```jsx
// ❌ Wrong - Not self-closing
function Component() {
  return <img src="image.jpg" alt="Image"></img>;
}

// ✅ Correct - Self-closing
function Component() {
  return <img src="image.jpg" alt="Image" />;
}

// Other self-closing tags
function Component() {
  return (
    <div>
      <img src="image.jpg" alt="Image" />
      <br />
      <hr />
      <input type="text" />
    </div>
  );
}
```

### JavaScript Expressions
```jsx
function Calculator({ a, b }) {
  const sum = a + b;
  const product = a * b;

  return (
    <div>
      <p>Sum: {sum}</p>
      <p>Product: {product}</p>
      <p>Is sum even? {sum % 2 === 0 ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

---

## Styling Components

### CSS Classes
```jsx
// CSS file
// styles.css
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background-color: #007bff;
  color: white;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

// Component
function Button({ children, variant = 'primary' }) {
  return (
    <button className={`button ${variant}`}>
      {children}
    </button>
  );
}
```

### Inline Styles
```jsx
function ColoredBox({ color, children }) {
  const style = {
    backgroundColor: color,
    padding: '20px',
    borderRadius: '8px',
    color: 'white'
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
}
```

### CSS Modules
```jsx
// Button.module.css
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background-color: #007bff;
  color: white;
}

// Component
import styles from './Button.module.css';

function Button({ children, variant = 'primary' }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

---

## Event Handling Basics

### Click Events
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```

### Form Events
```jsx
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Event Object
```jsx
function Button() {
  const handleClick = (e) => {
    console.log('Button clicked');
    console.log('Event:', e);
    console.log('Target:', e.target);
    console.log('Current target:', e.currentTarget);
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

---

## Common Patterns

### Conditional Rendering
```jsx
function UserProfile({ user, isLoggedIn }) {
  if (!isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      {user.isAdmin && <p>Admin privileges</p>}
    </div>
  );
}

// Ternary operator
function Message({ isError, message }) {
  return (
    <div className={isError ? 'error' : 'success'}>
      {isError ? 'Error: ' : 'Success: '}{message}
    </div>
  );
}
```

### List Rendering
```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

// With conditional rendering
function TodoList({ todos }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Component Composition
```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Card title="User Info">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </Card>

      <Card title="Actions">
        <button>Edit</button>
        <button>Delete</button>
      </Card>
    </div>
  );
}
```

---

## Next Steps

1. **Practice** Build simple React components
2. **Learn More** Check [Theory Guide](./theory/theory1.md) for detailed explanations
3. **Continue** Move to [Lesson 2](../lesson2-component-hook/) for advanced components and hooks
4. **Resources** Explore [Advanced Patterns](../../extras/advanced_patterns.md) for complex patterns

> **💡 Tip** Start with simple components, then gradually add interactivity. JSX is just JavaScript, so you can use all your JavaScript knowledge!