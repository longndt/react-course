# Theory - React Fundamentals & Project Setup

> **Prerequisites** Make sure you've completed the [Environment Setup Guide](../../extras/environment_setup.md) before starting this lesson.

---

## Table of Contents

**Chapter 1:** [What is React?](#1-what-is-react)
**Chapter 2:** [TypeScript with React (TSX)](#2-typescript-with-react-tsx)
**Chapter 3:** [Project Setup with Vite](#3-project-setup-with-vite)
**Chapter 4:** [Component Basics](#4-component-basics)
**Chapter 5:** [TSX Syntax Rules](#5-tsx-syntax-rules)
**Chapter 6:** [Styling Components](#6-styling-components)
**Chapter 7:** [Event Handling Basics](#7-event-handling-basics)
**Chapter 8:** [Common Mistakes](#8-common-mistakes)
**Chapter 9:** [Next Steps](#9-next-steps)

---

## 1. What is React?

> 🗺️ **Visual Learning** For a comprehensive understanding of the course roadmap, see [Course Roadmap Diagram](../../diagrams/course_roadmap.md)

**React** is a JavaScript library for building user interfaces, created and maintained by Meta (Facebook).

### Key Concepts

- **Component-Based** Build encapsulated components that manage their own state

- **Declarative** Design views for each state, React efficiently updates the right components

- **Learn Once, Write Anywhere** Can be used for web, mobile (React Native), desktop, and more

### Why React?

- Most popular frontend library (used by Facebook, Instagram, Netflix, Airbnb)
- Large ecosystem and community support
- Excellent developer experience with modern tools
- Perfect for building dynamic, interactive user interfaces

---

## 2. TypeScript with React (TSX)

In this course, we use **TypeScript** for all React components (.tsx files).

### What is TSX?

**TSX = TypeScript + JSX**

- **JSX** JavaScript XML - HTML-like syntax in JavaScript

- **TSX** TypeScript XML - HTML-like syntax in TypeScript with type safety
- File extension: `.tsx` (not `.ts` or `.jsx`)

### Why TSX?

- Type-safe components and props
- Catch errors during development (not at runtime)
- Better IDE support (autocomplete, IntelliSense)
- Self-documenting code
- Easier refactoring

### Basic TypeScript Patterns

**Component Props with Interface**

```typescript
// File: components/UserCard.tsx
import React from 'react';

// Define props type
interface UserCardProps {
  name: string;
  email: string;
  age?: number;  // Optional prop
}

// Component using the props
function UserCard({ name, email, age }: UserCardProps) {
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

**Event Handlers with Types**

```typescript
// File: components/auth/LoginForm.tsx
import React from 'react';

function LoginForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

> **Complete TypeScript Guide** For comprehensive TypeScript review, see [Lesson 0: TypeScript Prerequisites](../../lesson0-typescript-basics/)

---

## 3. Project Setup with Vite

**Vite** is the modern, fast build tool we use for React projects.

### Create New Project

```bash
# Create new TypeScript React project
npm create vite@latest my-app -- --template react-ts

# Navigate to project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

> 📁 **Visual Learning** For a comprehensive understanding of React project structure, see [React Project Structure Diagram](../../diagrams/react_project_structure.md)

```
my-app/
├── node_modules/      # Dependencies
├── public/            # Static assets
├── src/
│   ├── App.tsx        # Main component
│   ├── main.tsx       # Entry point
│   ├── App.css        # Styles
│   └── index.css      # Global styles
├── index.html         # HTML template
├── package.json       # Project config
├── tsconfig.json      # TypeScript config
└── vite.config.ts     # Vite config
```

### Understanding Key Files

**`main.tsx` - Application Entry Point**

```typescript
// File: src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**`App.tsx` - Main Component**

```typescript
// File: src/App.tsx
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

## 4. Component Basics

### What is a Component?

A component is a reusable piece of UI. Think of it as a function that returns HTML.

**Functional Component (Modern React):**

```typescript
// File: components/Greeting.tsx
function Greeting() {
  return <h1>Hello, World!</h1>;
}
```

### Key Points

- Components are TypeScript functions
- Component names must start with a capital letter
- Components return TSX (looks like HTML)
- Can be reused multiple times in your app

### Creating Custom Components

**Step 1:** Create a new file `src/components/Welcome.tsx`

```typescript
// src/components/Welcome.tsx
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

**Step 2:** Use it in `src/App.tsx`

```typescript
// File: src/App.tsx
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

## 5. TSX Syntax Rules

**TSX** (TypeScript XML) allows you to write HTML-like code in TypeScript.

### Basic Rules

1. **Must return a single parent element**
   ```typescript
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
   ```typescript
   // File: src/components/Container.tsx
   function Container() {
     return <div className="container">Content</div>;
   }
   ```

3. **Close all tags**
   ```typescript
   // File: src/components/ImageInput.tsx
   function ImageInput() {
     return (
       <>
         <img src="logo.png" alt="Logo" />
         <input type="text" />
       </>
     );
   }
   ```

4. **Embed TypeScript with `{}`**
   ```typescript
   // File: src/components/Greeting.tsx
   function Greeting() {
     const name = "Student";
     return <h1>Hello, {name}!</h1>;
   }

   export default Greeting;
   ```

### Embedding TypeScript in TSX

You can embed any TypeScript expression inside TSX using curly braces `{}`.

**Example:**

```typescript
// File: components/Profile.tsx
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
- Use `{}` for TypeScript expressions
- Can use variables, calculations, function calls
- Cannot use statements (if/else, for loops) - use expressions instead
- Always add `key` prop when rendering lists

---

## 6. Styling Components

**Three common approaches:**

### 1. CSS Files (Recommended for beginners)

```typescript
// File: src/App.tsx
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

```typescript
// File: src/App.tsx
function App() {
  const style = {
    padding: '20px',
    backgroundColor: '#f0f0f0'
  };

  return <div style={style}>Content</div>;
}
```

### 3. Direct Inline (for quick styling)

```typescript
// File: src/App.tsx
function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      Content
    </div>
  );
}
```

---

## 7. Event Handling Basics

In Lesson 1, we only cover simple event handling with alerts.

**Common Events:**

```typescript
// File: components/EventDemo.tsx
function EventDemo() {
  // Event handler functions
  const handleClick = () => {
    alert('Button clicked!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

> **Note** Advanced event handling with state will be covered in Lesson 2

---

## 8. Common Mistakes

### Mistake 1: Lowercase component names
```typescript
// File: components/MyComponent.tsx
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
```typescript
// File: src/App.tsx
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
```typescript
// File: components/Container.tsx
// ❌ Wrong
<div class="container">Content</div>

// ✅ Correct
<div className="container">Content</div>
```

### Mistake 4: Forgetting to close tags
```typescript
// File: components/ImageInput.tsx
// ❌ Wrong
<img src="logo.png">
<input type="text">

// ✅ Correct
<img src="logo.png" />
<input type="text" />
```

---

## 9. Next Steps

### What You Should Know After Lesson 1

**Fundamentals:**
- What React is and why we use it
- How to create a React project with Vite
- Basic TSX syntax and rules

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

> **Advanced Topics** For advanced TypeScript patterns, performance optimization, and complex examples, see [Advanced Patterns](../../extras/advanced_patterns.md) and [Performance Optimization](../../extras/performance_optimization.md)
