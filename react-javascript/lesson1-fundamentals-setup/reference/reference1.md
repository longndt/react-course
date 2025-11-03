# Reference - React Fundamentals Quick Lookup

> **Purpose of this file**: Quick setup commands, syntax patterns, copy-paste ready code. NO concept explanations.
>
> **Use Theory1 when you need**: Understanding WHY and HOW React works.

---

## Table of Contents

1. [Project Setup Commands](#project-setup-commands)
2. [Component Syntax](#component-syntax)
3. [TSX Rules Cheat Sheet](#tsx-rules-cheat-sheet)
4. [Props Patterns](#props-patterns)
5. [Styling Methods](#styling-methods)
6. [Event Handlers](#event-handlers)
7. [Common Patterns](#common-patterns)

---

## Project Setup Commands

### Create New Project

```bash
# Create React + TypeScript project
npm create vite@latest my-app -- --template react-ts

# Navigate
cd my-app

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Package Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
```

### Verify Installation

```bash
node --version    # Should be v18.0.0+
npm --version     # Should be v9.0.0+
```

---

## Component Syntax

### Basic Component

```jsx
function ComponentName() {
  return <div>Content</div>;
}

export default ComponentName;
```

### Component with Props

```jsx
interface Props {
  name: string;
  age: number;
  email?: string;  // Optional
}

function UserCard({ name, age, email }: Props) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {email && <p>Email: {email}</p>}
    </div>
  );
}

export default UserCard;
```

### Component with Children

```jsx
interface Props {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: Props) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Card;
```

### Component with Default Props

```jsx
interface Props {
  title: string;
  subtitle?: string;
  showIcon?: boolean;
}

function Header({ title, subtitle = "Default subtitle", showIcon = true }: Props) {
  return (
    <header>
      {showIcon && <span>🏠</span>}
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;
```

---

## TSX Rules Cheat Sheet

### Single Root Element

```jsx
// ❌ Wrong
function App() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}

// ✅ With div
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}

// ✅ With Fragment
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Text</p>
    </>
  );
}
```

### Embedding JavaScript

```jsx
function Profile() {
  const name = "Alice";
  const age = 25;
  const hobbies = ["Reading", "Gaming"];
  
  return (
    <div>
      {/* Variables */}
      <h1>{name}</h1>
      
      {/* Expressions */}
      <p>Age: {age + 1}</p>
      
      {/* Ternary */}
      <p>{age >= 18 ? "Adult" : "Minor"}</p>
      
      {/* Method calls */}
      <p>{name.toUpperCase()}</p>
      
      {/* Conditional rendering */}
      {age > 18 && <button>Access Granted</button>}
      
      {/* Lists */}
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
```

### TSX vs HTML Differences

```jsx
// className (not class)
<div className="container">

// htmlFor (not for)
<label htmlFor="name">Name:</label>

// Self-closing tags
<img src="photo.jpg" />
<input type="text" />
<br />

// Inline styles (object, not string)
<div style={{ color: 'red', fontSize: '16px' }}>

// Comments
{/* This is a comment */}

// camelCase event handlers
<button onClick={handleClick}>Click</button>
```

---

## Props Patterns

### Basic Props

```jsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// Usage
<Button label="Click Me" onClick={() => alert('Hi')} />
```

### Optional Props

```jsx
interface Props {
  name: string;
  age?: number;
}

function User({ name, age }: Props) {
  return (
    <div>
      <p>{name}</p>
      {age && <p>Age: {age}</p>}
    </div>
  );
}

// Usage
<User name="John" />
<User name="Jane" age={25} />
```

### Props with Default Values

```jsx
interface Props {
  title: string;
  color?: string;
  size?: number;
}

function Badge({ title, color = "blue", size = 16 }: Props) {
  return <span style={{ color, fontSize: size }}>{title}</span>;
}

// Usage
<Badge title="New" />
<Badge title="Sale" color="red" size={20} />
```

### Children Props

```jsx
interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props) {
  return <div className="container">{children}</div>;
}

// Usage
<Container>
  <h1>Title</h1>
  <p>Text</p>
</Container>
```

### Spread Props

```jsx
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

function Card({ title, ...rest }: Props) {
  return (
    <div {...rest}>
      <h2>{title}</h2>
    </div>
  );
}

// Usage
<Card title="Hello" className="custom" onClick={() => {}} />
```

---

## Styling Methods

### CSS File

```jsx
// Component.jsx
import './Component.css';

function Component() {
  return <div className="container">Content</div>;
}
```

```css
/* Component.css */
.container {
  padding: 20px;
  background-color: #f0f0f0;
}
```

### Inline Styles (Object)

```jsx
function Component() {
  const style = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    fontSize: '16px'
  };
  
  return <div style={style}>Content</div>;
}
```

### Inline Styles (Direct)

```jsx
function Component() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f0f0',
      fontSize: '16px'
    }}>
      Content
    </div>
  );
}
```

### Dynamic Styles

```jsx
interface Props {
  isActive: boolean;
}

function Button({ isActive }: Props) {
  return (
    <button
      className={isActive ? 'active' : 'inactive'}
      style={{
        backgroundColor: isActive ? 'green' : 'gray',
        color: 'white'
      }}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}
```

### Multiple CSS Classes

```jsx
function Component() {
  const isActive = true;
  const hasError = false;
  
  return (
    <div className={`
      base-class 
      ${isActive ? 'active' : ''} 
      ${hasError ? 'error' : ''}
    `}>
      Content
    </div>
  );
}
```

---

## Event Handlers

### Click Events

```jsx
function ClickDemo() {
  const handleClick = () => {
    alert('Clicked!');
  };
  
  const handleClickWithData = (id: number) => {
    console.log('Clicked item:', id);
  };
  
  return (
    <div>
      {/* Function reference */}
      <button onClick={handleClick}>Click Me</button>
      
      {/* Inline arrow function */}
      <button onClick={() => alert('Hi!')}>Say Hi</button>
      
      {/* With parameters */}
      <button onClick={() => handleClickWithData(123)}>Click Item</button>
    </div>
  );
}
```

### Form Events

```jsx
function FormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Common Event Types

```jsx
// Click events
onClick: (e: React.MouseEvent<HTMLButtonElement>) => void

// Form events
onSubmit: (e: React.FormEvent<HTMLFormElement>) => void

// Input events
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

// Keyboard events
onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void

// Focus events
onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
onBlur: (e: React.FocusEvent<HTMLInputElement>) => void

// Mouse events
onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void
onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void
```

---

## Common Patterns

### Conditional Rendering

```jsx
function User({ isLoggedIn }: { isLoggedIn: boolean }) {
  // If-else with ternary
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}
    </div>
  );
}

function Notification({ message }: { message?: string }) {
  // Render only if condition is true
  return (
    <div>
      {message && <div className="alert">{message}</div>}
    </div>
  );
}
```

### List Rendering

```jsx
function List() {
  const items = ['Apple', 'Banana', 'Cherry'];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// With objects
interface User {
  id: number;
  name: string;
}

function UserList() {
  const users: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Component Composition

```jsx
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <h1>Welcome</h1>
      <p>Content goes here</p>
    </Layout>
  );
}
```

### Fragments

```jsx
// Long form
<React.Fragment>
  <h1>Title</h1>
  <p>Text</p>
</React.Fragment>

// Short form
<>
  <h1>Title</h1>
  <p>Text</p>
</>

// With key (for lists)
items.map((item) => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </React.Fragment>
))
```

---

## Project Structure Template

```
my-app/
├── public/
│   └── assets/              # Images, fonts, etc.
├── src/
│   ├── components/          # Reusable components
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   ├── Card.jsx
│   │   └── Card.css
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── App.jsx             # Root component
│   ├── App.css
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Quick Syntax Table

| Pattern | Syntax |
|---------|--------|
| **Component** | `function Name() { return <div />; }` |
| **Props** | `function Name({ prop }: Props) {}` |
| **Fragment** | `<>...</>` or `<React.Fragment>` |
| **Embed JS** | `{expression}` |
| **Conditional** | `{condition && <Component />}` |
| **Ternary** | `{condition ? <A /> : <B />}` |
| **List** | `{arr.map(item => <li key={item.id} />)}` |
| **Event** | `onClick={() => {}}` |
| **Style (object)** | `style={{ color: 'red' }}` |
| **CSS class** | `className="container"` |
| **Comment** | `{/* comment */}` |

---

**For concepts and explanations**: See `theory1.md`  
**For practice**: See `lab1.md`

