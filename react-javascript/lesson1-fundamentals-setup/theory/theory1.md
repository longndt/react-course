# Theory - React Fundamentals & Project Setup

> **Prerequisites**: Make sure you have basic JavaScript ES6+ knowledge before starting this lesson.

---

## Table of Contents

1. [What is React?](#what-is-react)
2. [JavaScript with React (JSX)](#javascript-with-react-jsx)
3. [Project Setup with Vite](#project-setup-with-vite)
4. [Component Basics](#component-basics)
5. [JSX Syntax Rules](#jsx-syntax-rules)
6. [Styling Components](#styling-components)
7. [Event Handling Basics](#event-handling-basics)
8. [Common Mistakes](#common-mistakes)
9. [Next Steps](#next-steps)

---

## What is React?

> 🗺️ **Visual Learning**: For a comprehensive understanding of the course roadmap, see [Course Roadmap Diagram](../../diagrams/course_roadmap.md)

**React** is a JavaScript library for building user interfaces, created and maintained by Meta (Facebook).

### Key Concepts

- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Design views for each state, React efficiently updates the right components
- **Learn Once, Write Anywhere**: Can be used for web, mobile (React Native), desktop, and more

### Why React?

- Most popular frontend library (used by Facebook, Instagram, Netflix, Airbnb)
- Large ecosystem and community support
- Excellent developer experience with modern tools
- Perfect for building dynamic, interactive user interfaces

---

## JavaScript with React (JSX)

In this course, we use **JavaScript** for all React components (.jsx files).

### What is JSX?

**JSX = JavaScript + XML**

- **JSX**: JavaScript XML - HTML-like syntax in JavaScript
- File extension: `.jsx` (not `.js`)
- Allows you to write HTML-like code in JavaScript

### Why JSX?

- Intuitive HTML-like syntax
- Component-based architecture
- Easy to learn and use
- Great for building user interfaces

### Basic JavaScript Patterns

**Component Props**

```javascript
// File: components/UserCard.jsx
import React from 'react';

// Component using props
function UserCard({ name, email, age }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>{email}</p>
      {age && <p>Age: {age}</p>}
    </div>
  );
}

export default UserCard;
```

**Event Handlers**

```javascript
// File: components/auth/LoginForm.jsx
import React from 'react';

function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const handleInputChange = (event) => {
    console.log('Input value:', event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
```

> **Complete JavaScript Guide**: For comprehensive JavaScript ES6+ review, see [Lesson 0: JavaScript Prerequisites](../lesson0-javascript-es6/)

---

## Project Setup with Vite

**Vite** is the modern, fast build tool we use for React projects.

### Create New Project

```bash
# Create new React project
npm create vite@latest my-app -- --template react

# Navigate to project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

> 📁 **Visual Learning**: For a comprehensive understanding of React project structure, see [React Project Structure Diagram](../../diagrams/react_project_structure.md)

```
my-app/
├── node_modules/      # Dependencies
├── public/            # Static assets
├── src/
│   ├── App.jsx        # Main component
│   ├── main.jsx       # Entry point
│   ├── App.css        # Styles
│   └── index.css      # Global styles
├── index.html         # HTML template
├── package.json       # Project config
└── vite.config.js     # Vite config
```

### Understanding Key Files

**`main.jsx` - Application Entry Point**

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**`App.jsx` - Main Component**

```javascript
// File: src/App.jsx
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello React!</h1>
    </div>
  );
}

export default App;
```

---

## Component Basics

### What is a Component?

A component is a reusable piece of UI. Think of it as a function that returns HTML.

**Functional Component (Modern React):**

```javascript
// File: components/Greeting.jsx
function Greeting() {
  return <h1>Hello, World!</h1>;
}
```

### Key Points

- Components are JavaScript functions
- Component names must start with a capital letter
- Components return JSX (looks like HTML)
- Can be reused multiple times in your app

### Creating Custom Components

**Step 1:** Create a new file `src/components/Welcome.jsx`

```javascript
// src/components/Welcome.jsx
function Welcome() {
  return (
    <div>
      <h1>Welcome to React!</h1>
      <p>This is your first custom component.</p>
    </div>
  );
}

export default Welcome;
```

**Step 2:** Use it in `src/App.jsx`

```javascript
// File: src/App.jsx
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <Welcome />
    </div>
  );
}

export default App;
```

---

## JSX Syntax Rules

**JSX** (JavaScript XML) allows you to write HTML-like code in JavaScript.

### Basic Rules

1. **Must return a single parent element**
   ```javascript
   // ✅ Good - wrapped in div
   function App() {
     return (
       <div>
         <h1>Title</h1>
         <p>Paragraph</p>
       </div>
     );
   }

   // ❌ Bad - multiple root elements
   function App() {
     return (
       <h1>Title</h1>
       <p>Paragraph</p>
     );
   }
   ```

2. **Use `className` instead of `class`**
   ```javascript
   <div className="container">Content</div>
   ```

3. **Close all tags**
   ```javascript
   <img src="logo.png" alt="Logo" />
   <input type="text" />
   ```

4. **Embed JavaScript with `{}`**
   ```javascript
   function Greeting() {
     const name = "Student";
     return <h1>Hello, {name}!</h1>;
   }
   ```

### Embedding JavaScript in JSX

You can embed any JavaScript expression inside JSX using curly braces `{}`.

**Example:**

```javascript
// File: components/Profile.jsx
function Profile() {
  const name = "John Doe";
  const age = 20;
  const hobbies = ["Reading", "Gaming", "Coding"];

  return (
    <div className="profile">
      {/* Variables */}
      <h1>{name}</h1>
      <p>Age: {age}</p>

      {/* Expressions */}
      <p>Next year: {age + 1}</p>

      {/* Method calls */}
      <p>Uppercase: {name.toUpperCase()}</p>

      {/* Arrays with map */}
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      {/* Conditional rendering */}
      {age >= 18 ? <p>Adult</p> : <p>Minor</p>}
    </div>
  );
}
```

**Key Rules:**
- Use `{}` for JavaScript expressions
- Can use variables, calculations, function calls
- Cannot use statements (if/else, for loops) - use expressions instead
- Always add `key` prop when rendering lists

---

## Styling Components

**Three common approaches:**

### 1. CSS Files (Recommended for beginners)

```javascript
// File: src/App.jsx
import './App.css';

function App() {
  return <div className="container">Content</div>;
}
```

```css
/* File: src/App.css */
.container {
  padding: 20px;
  background-color: #f0f0f0;
}
```

### 2. Inline Styles

```javascript
// File: src/App.jsx
function App() {
  const style = {
    padding: '20px',
    backgroundColor: '#f0f0f0'
  };

  return <div style={style}>Content</div>;
}
```

### 3. Direct Inline (for quick styling)

```javascript
// File: src/App.jsx
function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      Content
    </div>
  );
}
```

---

## Event Handling Basics

In Lesson 1, we only cover simple event handling with alerts.

**Common Events:**

```javascript
// File: components/EventDemo.jsx
function EventDemo() {
  // Event handler functions
  const handleClick = () => {
    alert('Button clicked!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  const handleInput = (e) => {
    console.log('Input value:', e.target.value);
  };

  return (
    <div>
      {/* onClick */}
      <button onClick={handleClick}>Click Me</button>

      {/* Inline handler */}
      <button onClick={() => alert('Hello!')}>Say Hello</button>

      {/* Form submit */}
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

> **Note**: Advanced event handling with state will be covered in Lesson 2

---

## Common Mistakes

### Mistake 1: Lowercase component names
```javascript
// File: components/MyComponent.jsx
// ❌ Wrong
function myComponent() {
  return <div>Hello</div>;
}

// ✅ Correct
function MyComponent() {
  return <div>Hello</div>;
}
```

### Mistake 2: Multiple root elements
```javascript
// File: src/App.jsx
// ❌ Wrong
function App() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}

// ✅ Correct
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}
```

### Mistake 3: Using `class` instead of `className`
```javascript
// File: components/Container.jsx
// ❌ Wrong
<div class="container">Content</div>

// ✅ Correct
<div className="container">Content</div>
```

### Mistake 4: Forgetting to close tags
```javascript
// File: components/ImageInput.jsx
// ❌ Wrong
<img src="logo.png">
<input type="text">

// ✅ Correct
<img src="logo.png" />
<input type="text" />
```

---

## Next Steps

### What You Should Know After Lesson 1

**Fundamentals:**
- What React is and why we use it
- How to create a React project with Vite
- Basic JSX syntax and rules

**Components:**
- Creating functional components
- Exporting and importing components
- Component file organization

**Styling:**
- Using CSS files with className
- Inline styles
- Basic styling approaches

**Events (Basic):**
- onClick, onSubmit, onChange
- Alert-based event handling
- preventDefault for forms

### What's Coming in Lesson 2

🔜 **Props** - Passing data between components
🔜 **State** - Managing dynamic data with useState
🔜 **Hooks** - useEffect, custom hooks
🔜 **Forms** - Controlled components and validation
🔜 **Component Patterns** - Composition and reusability

> **Advanced Topics**: For advanced patterns, performance optimization, and complex examples, see [Advanced Patterns](../../extras/advanced_patterns.md) and [Performance Optimization](../../extras/performance_optimization.md)
