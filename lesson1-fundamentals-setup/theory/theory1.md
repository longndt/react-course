# Theory - React Fundamentals & Project Setup

> **Prerequisites**: Make sure you've completed the [Environment Setup Guide](../../extras/environment-setup.md) before starting this lesson.

---

## 📚 Table of Contents

1. [What is React?](#what-is-react-)
2. [React vs Traditional Web Development](#react-vs-traditional-web-development)
3. [TypeScript with React (TSX)](#typescript-with-react-tsx)
4. [Setting Up React Projects](#setting-up-react-projects)
5. [React Project Structure](#react-project-structure)
6. [Creating Your First Component](#creating-your-first-component)
7. [JSX/TSX Syntax Rules](#jsxtsx-syntax-rules)
8. [Styling React Components](#styling-react-components)
9. [Component Best Practices](#component-best-practices)
10. [Common Beginner Mistakes](#common-beginner-mistakes)
11. [Development Workflow](#development-workflow)
12. [Debugging React Applications](#debugging-react-applications)
13. [Next Steps](#next-steps)

---

## What is React? 🎯

**React** is a JavaScript library for building user interfaces, created and maintained by Meta (Facebook).

**Key Concepts:**

- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Design views for each state, React efficiently updates the right components
- **Learn Once, Write Anywhere**: Can be used for web, mobile (React Native), desktop, and more

**Why React?**

- Most popular frontend library (used by Facebook, Instagram, Netflix, Airbnb)
- Large ecosystem and community support
- Excellent developer experience with modern tools
- Perfect for building dynamic, interactive user interfaces

---

## React vs Traditional Web Development

| Traditional Web Apps   | React Apps             |
| ---------------------- | ---------------------- |
| Server-side rendering  | Client-side rendering  |
| Full page refreshes    | Dynamic component updates |
| Mixed HTML/Server code | Separated concerns (components) |
| jQuery DOM manipulation| Virtual DOM for efficiency |

**Example Comparison:**

**Traditional (with jQuery):**
```javascript
// Update DOM directly
$('#username').text('John Doe');
$('#welcome-msg').show();
```

**React (Declarative):**
```typescript
// Describe what UI should look like
function Welcome({ username }: { username: string }) {
  return (
    <div>
      <h1 id="username">{username}</h1>
      <p id="welcome-msg">Welcome!</p>
    </div>
  );
}
```

---

## TypeScript with React (TSX)

In this course, we use **TypeScript** for all React components (.tsx files).

### What is TSX?

**TSX = TypeScript + JSX**

- **JSX**: JavaScript XML - HTML-like syntax in JavaScript
- **TSX**: TypeScript XML - HTML-like syntax in TypeScript with type safety
- File extension: `.tsx` (not `.ts` or `.jsx`)

**Why TSX?**
- ✅ Type-safe components and props
- ✅ Catch errors during development (not at runtime)
- ✅ Better IDE support (autocomplete, IntelliSense)
- ✅ Self-documenting code
- ✅ Easier refactoring

### TSX vs JSX Comparison

```javascript
// JSX (JavaScript) - No type safety ❌
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
  // What if props.name is undefined? Runtime error!
}
```

```typescript
// TSX (TypeScript) - Type safe ✅
interface WelcomeProps {
  name: string;
  age: number;
}

function Welcome({ name, age }: WelcomeProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}
// TypeScript ensures name and age are provided with correct types!
```

### Basic TypeScript Patterns for React

**1. Component Props with Interface**

```typescript
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

// Usage - TypeScript checks types!
<UserCard name="John" email="john@example.com" />  // ✅
<UserCard name={123} email="john@example.com" />   // ❌ Error: name must be string
```

**2. Event Handlers with Types**

```typescript
function LoginForm() {
  // Typed event handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Submit</button>
    </form>
  );
}
```

**3. Array Rendering with Type Safety**

```typescript
// Define data type
interface Student {
  id: number;
  name: string;
  major: string;
}

function StudentList() {
  // Typed array
  const students: Student[] = [
    { id: 1, name: "John", major: "CS" },
    { id: 2, name: "Jane", major: "IT" },
  ];

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          {student.name} - {student.major}
        </li>
      ))}
    </ul>
  );
}
```

### Common TypeScript React Types

```typescript
import { ReactNode, CSSProperties } from 'react';

// 1. ReactNode - for children prop
interface CardProps {
  children: ReactNode;  // Can be text, elements, components, etc.
  title: string;
}

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// 2. CSSProperties - for inline styles
interface BoxProps {
  style?: CSSProperties;
}

function Box({ style }: BoxProps) {
  return <div style={style}>Content</div>;
}

// 3. Union types for limited options
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';  // Only these 3 values allowed
  label: string;
}

function Button({ variant, label }: ButtonProps) {
  return <button className={`btn-${variant}`}>{label}</button>;
}
```

### TypeScript Benefits in Practice

**Example: Type-Safe Component**

```typescript
// Define strict prop types
interface ProfileProps {
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
  joinDate: Date;
}

function Profile({ username, email, role, isActive, joinDate }: ProfileProps) {
  return (
    <div className="profile">
      <h2>{username}</h2>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <p>Joined: {joinDate.toLocaleDateString()}</p>
    </div>
  );
}

// Usage - TypeScript enforces all required props
<Profile
  username="johndoe"
  email="john@example.com"
  role="admin"
  isActive={true}
  joinDate={new Date()}
/>  // ✅ All props provided with correct types

<Profile
  username="johndoe"
  email="john@example.com"
/>  // ❌ Error: missing required props!
```

> 💡 **Complete TypeScript Guide**: For a comprehensive TypeScript review, see [Lesson 0: TypeScript Prerequisites](../../lesson0-typescript/)

> 💡 **Advanced Patterns**: State management, hooks, and advanced TypeScript patterns are covered in [Lesson 2: Components & Hooks](../../lesson2-component-hook/)

---

## Understanding React Components

**What is a Component?**

A component is a reusable piece of UI. Think of it as a function that returns HTML.

**Functional Component (Modern React):**

```typescript
function Greeting() {
  return <h1>Hello, World!</h1>;
}
```

**Key Points:**
- Components are JavaScript/TypeScript functions
- Component names must start with a capital letter
- Components return JSX/TSX (looks like HTML)
- Can be reused multiple times in your app

---

## JSX/TSX Syntax Basics

**JSX** (JavaScript XML) allows you to write HTML-like code in JavaScript.
**TSX** (TypeScript XML) is the TypeScript version.

**Basic Rules:**

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
   <div className="container">Content</div>
   ```

3. **Close all tags**
   ```typescript
   <img src="logo.png" alt="Logo" />
   <input type="text" />
   ```

4. **Embed JavaScript with `{}`**
   ```typescript
   function Greeting() {
     const name = "Student";
     return <h1>Hello, {name}!</h1>;
   }
   ```

---

## Creating Your First React App with Vite

**Vite** is the modern, fast build tool we use for React projects.

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

**Project Structure:**

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

---

## Understanding the Default Vite Project

**1. `main.tsx` - Application Entry Point**

```typescript
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

**2. `App.tsx` - Main Component**

```typescript
function App() {
  return (
    <div className="App">
      <h1>Hello React!</h1>
    </div>
  );
}

export default App;
```

**3. `index.html` - HTML Template**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Embedding JavaScript in TSX

You can embed any JavaScript expression inside TSX using curly braces `{}`.

**Examples:**

```typescript
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

## Basic Styling in React

**Three common approaches:**

**1. CSS Files (Recommended for beginners)**

```typescript
// App.tsx
import './App.css';

function App() {
  return <div className="container">Content</div>;
}
```

```css
/* App.css */
.container {
  padding: 20px;
  background-color: #f0f0f0;
}
```

**2. Inline Styles**

```typescript
function App() {
  const style = {
    padding: '20px',
    backgroundColor: '#f0f0f0'
  };

  return <div style={style}>Content</div>;
}
```

**3. Direct Inline (for quick styling)**

```typescript
function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      Content
    </div>
  );
}
```

---

## Component Organization Best Practices

**Recommended folder structure for Lesson 1:**

```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Welcome.tsx
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

**Example Component:**

```typescript
// src/components/Header.tsx
function Header() {
  return (
    <header className="header">
      <h1>My React App</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
}

export default Header;
```

**Using the Component:**

```typescript
// src/App.tsx
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <p>Main content here</p>
      </main>
    </div>
  );
}

export default App;
```

---

## Basic Event Handling (No State Yet)

In Lesson 1, we only cover simple event handling with alerts.

**Common Events:**

```typescript
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

> 💡 **Note**: Advanced event handling with state will be covered in Lesson 2

---

## Complete Example: Simple Welcome Page

```typescript
// src/components/Welcome.tsx
function Welcome() {
  const appName = "My React App";
  const year = new Date().getFullYear();
  const features = ["Fast", "Modern", "Type-Safe"];

  const handleLearnMore = () => {
    alert('Check out React documentation at react.dev');
  };

  return (
    <div className="welcome">
      <h1>Welcome to {appName}!</h1>
      <p>Built with React + TypeScript + Vite</p>

      <h2>Features:</h2>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <button onClick={handleLearnMore}>Learn More</button>

      <footer>© {year}</footer>
    </div>
  );
}

export default Welcome;
```

```css
/* Welcome.css */
.welcome {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.welcome h1 {
  color: #61dafb;
}

.welcome ul {
  list-style: none;
  padding: 0;
}

.welcome li {
  padding: 10px;
  margin: 5px 0;
  background: #f0f0f0;
  border-radius: 5px;
}

.welcome button {
  padding: 10px 20px;
  background: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.welcome button:hover {
  background: #4fa8c5;
}
```

---

## What You Should Know After Lesson 1

✅ **Fundamentals:**
- What React is and why we use it
- Difference between React and traditional web development
- How to create a React project with Vite

✅ **TSX Syntax:**
- Basic TSX syntax and rules
- Embedding JavaScript in TSX with `{}`
-ClassName, self-closing tags, single parent rule

✅ **Components:**
- Creating functional components
- Exporting and importing components
- Component file organization

✅ **Styling:**
- Using CSS files with className
- Inline styles
- Basic styling approaches

✅ **Events (Basic):**
- onClick, onSubmit, onChange
- Alert-based event handling
- preventDefault for forms

---

## What's Coming in Lesson 2

🔜 **Props** - Passing data between components
🔜 **State** - Managing dynamic data with useState
🔜 **Hooks** - useEffect, custom hooks
🔜 **Forms** - Controlled components and validation
🔜 **Component Patterns** - Composition and reusability

> 💡 Lesson 1 focuses on **fundamentals only**. Advanced features like props, state, and hooks are covered in [Lesson 2: Components & Hooks](../../lesson2-component-hook/)

---

## Best Practices for Lesson 1

1. ✅ **Component Naming**: Always use PascalCase (e.g., `MyComponent`)
2. ✅ **File Extension**: Use `.tsx` for components with TypeScript
3. ✅ **Single Responsibility**: One component per file
4. ✅ **Clean Code**: Use meaningful variable and function names
5. ✅ **Comments**: Add comments for complex logic

---

## Common Mistakes to Avoid

❌ **Mistake 1: Lowercase component names**
```typescript
// ❌ Wrong
function myComponent() {
  return <div>Hello</div>;
}

// ✅ Correct
function MyComponent() {
  return <div>Hello</div>;
}
```

❌ **Mistake 2: Multiple root elements**
```typescript
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

❌ **Mistake 3: Using `class` instead of `className`**
```typescript
// ❌ Wrong
<div class="container">Content</div>

// ✅ Correct
<div className="container">Content</div>
```

❌ **Mistake 4: Forgetting to close tags**
```typescript
// ❌ Wrong
<img src="logo.png">
<input type="text">

// ✅ Correct
<img src="logo.png" />
<input type="text" />
```

---

## Practice Exercise

**Create a Student Profile Card:**

Requirements:
- Display student name, age, major
- List 3 hobbies
- Add a contact button (alert with email)
- Style with CSS file

```typescript
// StudentProfile.tsx
function StudentProfile() {
  const student = {
    name: "John Doe",
    age: 20,
    major: "Computer Science",
    email: "john@example.com",
    hobbies: ["Coding", "Reading", "Gaming"]
  };

  const handleContact = () => {
    alert(`Email: ${student.email}`);
  };

  return (
    <div className="student-card">
      <h2>{student.name}</h2>
      <p>Age: {student.age}</p>
      <p>Major: {student.major}</p>

      <h3>Hobbies:</h3>
      <ul>
        {student.hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <button onClick={handleContact}>Contact</button>
    </div>
  );
}

export default StudentProfile;
```

> 💡 **Challenge**: Try styling this component to make it look professional!

---

## Summary

**Core React Fundamentals:**
- React is a component-based library for building dynamic user interfaces
- Components are reusable, self-contained pieces of UI
- TSX provides type safety for React components
- Vite is the modern, fast build tool for React projects

**Key Concepts Covered:**
- Creating React projects with Vite
- Basic TSX syntax and JSX rules
- Component structure and organization
- Embedding JavaScript expressions in TSX
- Styling approaches (inline, CSS modules, external)
- Basic event handling with onClick

**TypeScript with React:**
- Use `.tsx` extension for React component files
- Define interfaces for component props
- Leverage type safety for better developer experience
- Catch errors at compile time, not runtime

**Project Structure:**
- `/src` - All source code
- `/src/components` - Reusable components
- `/src/pages` - Page-level components
- `/public` - Static assets
- `index.html` - Entry HTML file
- `main.tsx` - React app entry point

---

## Additional Resources

**Official Documentation:**
- [React Documentation](https://react.dev) - Official React docs
- [Vite Documentation](https://vitejs.dev) - Vite build tool guide
- [TypeScript Handbook](https://www.typescriptlang.org/docs) - TypeScript reference

**Learning Resources:**
- [MDN Web Docs](https://developer.mozilla.org) - JavaScript and web API reference
- [React Tutorial](https://react.dev/learn) - Interactive React tutorial


