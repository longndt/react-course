# Theory - React Fundamentals & Project Setup

> **Prerequisites**: Make sure you've completed the [Environment Setup Guide](../../setup/environment-setup.md) before starting this lesson.

---

##  Table of Contents

1. [What is React?](#what-is-react-)
2. [React vs Traditional Web Development](#react-vs-traditional-web-development)
3. [JavaScript with React (JSX)](#javascript-with-react-jsx)
4. [Setting Up React Projects](#setting-up-react-projects)
5. [React Project Structure](#react-project-structure)
6. [Creating Your First Component](#creating-your-first-component)
7. [JSX Syntax Rules](#jsx-syntax-rules)
8. [Styling React Components](#styling-react-components)
9. [Component Best Practices](#component-best-practices)
10. [Common Beginner Mistakes](#common-beginner-mistakes)
11. [Development Workflow](#development-workflow)
12. [Debugging React Applications](#debugging-react-applications)
13. [Next Steps](#next-steps)

---

## What is React? 

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
```javascript
// Describe what UI should look like
function Welcome({ username }) {
  return (
    <div>
      <h1 id="username">{username}</h1>
      <p id="welcome-msg">Welcome!</p>
    </div>
  );
}
```

---

## JavaScript with React (JSX)

In this course, we use **JavaScript ES6+** for all React components (.jsx files).

### What is JSX?

**JSX = JavaScript XML**

- **JSX**: JavaScript XML - HTML-like syntax in JavaScript
- File extension: `.jsx` (for components) or `.js` (both work with proper Vite config)

**Why JSX?**
-  Declarative and intuitive UI code
-  Great IDE support (autocomplete, IntelliSense)
-  Combines markup and logic in one place
-  Faster development with less boilerplate
-  Easy to learn and read

### Runtime Type Checking with PropTypes

While JavaScript doesn't have built-in type checking, we use **PropTypes** for runtime validation:

```javascript
import PropTypes from 'prop-types';

// Component with PropTypes validation
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

// PropTypes provide runtime type checking
Welcome.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

export default Welcome;
```

### Basic JavaScript Patterns for React

**1. Component Props with PropTypes**

```javascript
import PropTypes from 'prop-types';

// Component using the props
function UserCard({ name, email, age }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>{email}</p>
      {age && <p>Age: {age}</p>}
    </div>
  );
}

// PropTypes validation
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number  // Optional prop
};

export default UserCard;

// Usage
<UserCard name="John" email="john@example.com" />  //  Valid
<UserCard name={123} email="john@example.com" />   //  Warning in console: name should be string
```

**2. Event Handlers**

```javascript
function LoginForm() {
  // Event handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const handleInputChange = (event) => {
    console.log('Input value:', event.target.value);
  };

  const handleButtonClick = (event) => {
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

**3. Array Rendering**

```javascript
import PropTypes from 'prop-types';

function StudentList() {
  // Data array
  const students = [
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

export default StudentList;
```

### Common PropTypes Patterns

```javascript
import PropTypes from 'prop-types';

// 1. Basic types
function Example1({ name, age, isActive, data }) {
  return <div>{name}</div>;
}

Example1.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isActive: PropTypes.bool,
  data: PropTypes.object
};

// 2. Array and shape
function Example2({ items, user }) {
  return (
    <div>
      <p>{user.name}</p>
      <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

Example2.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
};

// 3. Enum (oneOf) for limited options
function Button({ variant, label }) {
  return <button className={`btn-${variant}`}>{label}</button>;
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']).isRequired,
  label: PropTypes.string.isRequired
};

// 4. Children prop
function Card({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node  // Can be text, elements, components, etc.
};
```

### PropTypes vs TypeScript

**PropTypes (Runtime Checking):**
-  Works with JavaScript (no compiler needed)
-  Warnings appear in browser console
-  Easier to learn for beginners
-  Only checks at runtime (not during development)
-  No IDE autocomplete for props

**TypeScript (Compile-time Checking):**
-  Errors caught before running code
-  Better IDE support and autocomplete
-  Self-documenting code
-  Requires learning TypeScript
-  Additional build step (compilation)

> **For this course**: We use PropTypes for simplicity. If you want type safety, consider learning TypeScript after mastering React fundamentals.

> **Complete JavaScript ES6+ Guide**: For a comprehensive JavaScript review, see [Lesson 0: JavaScript ES6+ Prerequisites](../lesson0-javascript-es6/)

> **Advanced Patterns**: State management, hooks, and advanced patterns are covered in [Lesson 2: Components & Hooks](../lesson2-component-hook/)

---

## Understanding React Components

**What is a Component?**

A component is a reusable piece of UI. Think of it as a function that returns HTML.

**Functional Component (Modern React):**

```javascript
function Greeting() {
  return <h1>Hello, World!</h1>;
}

export default Greeting;
```

**Key Points:**
- Components are JavaScript functions
- Component names must start with a capital letter
- Components return JSX (looks like HTML)
- Can be reused multiple times in your app

---

## JSX Syntax Basics

**JSX** (JavaScript XML) allows you to write HTML-like code in JavaScript.

**Basic Rules:**

1. **Must return a single parent element**
   ```javascript
   //  Good - wrapped in div
   function App() {
     return (
       <div>
         <h1>Title</h1>
         <p>Paragraph</p>
       </div>
     );
   }

   //  Bad - multiple root elements
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

---

## Creating Your First React App with Vite

**Vite** is the modern, fast build tool we use for React projects.

```bash
# Create new JavaScript React project
npm create vite@latest my-app -- --template react

# Navigate to project
cd my-app

# Install dependencies
npm install

# Install PropTypes for type checking
npm install prop-types

# Start development server
npm run dev
```

**Project Structure:**

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

---

## Understanding the Default Vite Project

**1. `main.jsx` - Application Entry Point**

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

**2. `App.jsx` - Main Component**

```javascript
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
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## Embedding JavaScript in JSX

You can embed any JavaScript expression inside JSX using curly braces `{}`.

**Examples:**

```javascript
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

```javascript
// App.jsx
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

```javascript
function App() {
  const style = {
    padding: '20px',
    backgroundColor: '#f0f0f0'
  };

  return <div style={style}>Content</div>;
}
```

**3. Direct Inline (for quick styling)**

```javascript
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
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Welcome.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

**Example Component:**

```javascript
// src/components/Header.jsx
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

```javascript
// src/App.jsx
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

```javascript
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

## Complete Example: Simple Welcome Page

```javascript
// src/components/Welcome.jsx
function Welcome() {
  const appName = "My React App";
  const year = new Date().getFullYear();
  const features = ["Fast", "Modern", "Easy to Learn"];

  const handleLearnMore = () => {
    alert('Check out React documentation at react.dev');
  };

  return (
    <div className="welcome">
      <h1>Welcome to {appName}!</h1>
      <p>Built with React + JavaScript + Vite</p>

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

 **Fundamentals:**
- What React is and why we use it
- Difference between React and traditional web development
- How to create a React project with Vite

 **JSX Syntax:**
- Basic JSX syntax and rules
- Embedding JavaScript in JSX with `{}`
- className, self-closing tags, single parent rule

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

---

## What's Coming in Lesson 2

🔜 **Props** - Passing data between components
🔜 **State** - Managing dynamic data with useState
🔜 **Hooks** - useEffect, custom hooks
🔜 **Forms** - Controlled components and validation
🔜 **Component Patterns** - Composition and reusability

>  Lesson 1 focuses on **fundamentals only**. Advanced features like props, state, and hooks are covered in [Lesson 2: Components & Hooks](../../lesson2-component-hook/)

---

## Best Practices for Lesson 1

1.  **Component Naming**: Always use PascalCase (e.g., `MyComponent`)
2.  **File Extension**: Use `.jsx` for components with React
3.  **Single Responsibility**: One component per file
4.  **Clean Code**: Use meaningful variable and function names
5.  **Comments**: Add comments for complex logic

---

## Common Mistakes to Avoid

 **Mistake 1: Lowercase component names**
```javascript
//  Wrong
function myComponent() {
  return <div>Hello</div>;
}

//  Correct
function MyComponent() {
  return <div>Hello</div>;
}
```

 **Mistake 2: Multiple root elements**
```javascript
//  Wrong
function App() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}

//  Correct
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}
```

 **Mistake 3: Using `class` instead of `className`**
```javascript
//  Wrong
<div class="container">Content</div>

//  Correct
<div className="container">Content</div>
```

 **Mistake 4: Forgetting to close tags**
```javascript
//  Wrong
<img src="logo.png">
<input type="text">

//  Correct
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

```javascript
// StudentProfile.jsx
import PropTypes from 'prop-types';

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

> **Challenge**: Try styling this component to make it look professional!

---

## Summary

**Core React Fundamentals:**
- React is a component-based library for building dynamic user interfaces
- Components are reusable, self-contained pieces of UI
- JSX provides declarative syntax for React components
- Vite is the modern, fast build tool for React projects

**Key Concepts Covered:**
- Creating React projects with Vite
- Basic JSX syntax and rules
- Component structure and organization
- Embedding JavaScript expressions in JSX
- Styling approaches (inline, CSS files)
- Basic event handling with onClick

**JavaScript with React:**
- Use `.jsx` extension for React component files
- Use PropTypes for runtime prop validation
- Leverage ES6+ features for cleaner code
- Console warnings for prop type mismatches

**Project Structure:**
- `/src` - All source code
- `/src/components` - Reusable components
- `/src/pages` - Page-level components
- `/public` - Static assets
- `index.html` - Entry HTML file
- `main.jsx` - React app entry point

---

## Additional Resources

**Official Documentation:**
- [React Documentation](https://react.dev) - Official React docs
- [Vite Documentation](https://vitejs.dev) - Vite build tool guide
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - JavaScript reference
- [PropTypes Documentation](https://www.npmjs.com/package/prop-types) - PropTypes guide

**Learning Resources:**
- [MDN Web Docs](https://developer.mozilla.org) - JavaScript and web API reference
- [React Tutorial](https://react.dev/learn) - Interactive React tutorial


