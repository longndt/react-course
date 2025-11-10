# Theory - React Fundamentals & Project Setup

> **Purpose of this file**: Explains **WHY** React works the way it does, **HOW** components and JSX function, and **WHEN** to use different patterns. Code examples include explanatory comments.
>
> **Use Reference1 when you need**: Quick setup commands, syntax lookup, copy-paste ready code.

---

## Table of Contents

1. [What is React and Why Use It?](#1-what-is-react-and-why-use-it)
2. [Understanding JSX](#2-understanding-jsx)
3. [Project Setup with Vite](#3-project-setup-with-vite)
4. [Components: The Building Blocks](#4-components-the-building-blocks)
5. [JSX Rules and Why They Exist](#5-jsx-rules-and-why-they-exist)
6. [Styling Approaches](#6-styling-approaches)
7. [Event Handling Basics](#7-event-handling-basics)
8. [Common Mistakes](#8-common-mistakes)

---

## 1. What is React and Why Use It?

### The Problem React Solves

**Traditional JavaScript:**

```javascript
// Vanilla JS - Manual DOM manipulation (error-prone and verbose)
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
  const counter = document.getElementById('counter');
  const currentValue = parseInt(counter.textContent);
  counter.textContent = currentValue + 1;
  
  // What if counter doesn't exist? What if textContent is not a number?
  // Easy to make mistakes, hard to maintain!
});
```

**React Approach:**

```jsx
// React - Declarative: describe WHAT you want, React handles HOW
function Counter() {
  const [count, setCount] = useState(0);
  
  // Just describe what the UI should look like
  // React handles updating the DOM efficiently
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Why React?

| Aspect | Traditional JS | React |
|--------|---------------|-------|
| **DOM Updates** | Manual (`getElementById`, `innerHTML`) | Automatic (just change state) |
| **Code Style** | Imperative (tell HOW to do it) | Declarative (describe WHAT you want) |
| **Reusability** | Hard (copy-paste code) | Easy (reusable components) |
| **Maintainability** | Difficult (scattered logic) | Better (encapsulated components) |
| **Performance** | Manual optimization needed | Virtual DOM handles it |

**Key Insight**: React lets you focus on *what* the UI should look like for each state, not *how* to transition between states.

### React's Core Philosophy: Components

**Think of components as LEGO blocks:**
- Each block (component) is self-contained
- You can combine blocks to build complex structures
- Blocks are reusable across different projects

```jsx
// Small, reusable components
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Compose them into larger UIs
function Dashboard() {
  return (
    <div>
      <Card title="User Profile">
        <p>Welcome back!</p>
        <Button label="Logout" onClick={() => {}} />
      </Card>
      
      <Card title="Settings">
        <Button label="Edit Profile" onClick={() => {}} />
      </Card>
    </div>
  );
}
```

---

## 2. Understanding JSX

### What is JSX and Why Use It?

**JSX = JavaScript + XML (JavaScript XML)**

```jsx
// This looks like HTML, but it's actually JavaScript!
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Babel/Vite transforms this to:
function Welcome() {
  return React.createElement('h1', null, 'Hello, World!');
}
```

**Why JSX looks like HTML:**
- **Readability**: UI code looks like what it produces
- **Familiarity**: Web developers already know HTML
- **Expressiveness**: Write UI declaratively instead of imperatively

### JSX is NOT HTML

```jsx
// ❌ HTML - This won't work in React
<div class="container">
  <img src="logo.png">
  <label for="name">Name:</label>
  <input type="text">
</div>

// ✅ JSX - React version
<div className="container">
  <img src="logo.png" />
  <label htmlFor="name">Name:</label>
  <input type="text" />
</div>
```

**Why the differences?**
- `className` instead of `class`: `class` is a reserved keyword in JavaScript
- Self-closing tags: JSX is JavaScript, needs valid syntax
- `htmlFor` instead of `for`: `for` is a reserved keyword

---

## 3. Project Setup with Vite

### Why Vite (Not Create React App)?

**Vite is FASTER:**

| Feature | Create React App | Vite |
|---------|-----------------|------|
| **Cold start** | 10-30 seconds | 1-3 seconds |
| **Hot reload** | 2-5 seconds | Instant (~100ms) |
| **Build tool** | Webpack | esbuild + Rollup |
| **Modern?** | Dated (2016) | Modern (2020+) |

**Key Benefit**: Vite uses native ES modules, so it doesn't bundle during development. Only changed files are updated.

### Understanding the Setup

```bash
# This command creates a new React project with JavaScript
npm create vite@latest my-app -- --template react

# What happens:
# 1. Downloads Vite project template
# 2. Sets up JavaScript configuration
# 3. Installs React + React DOM
# 4. Configures development server
```

### Project Structure Explained

```
my-app/
├── node_modules/          # Third-party packages (don't edit)
├── public/                # Static files (copied as-is)
│   └── vite.svg
├── src/                   # 👈 Your code lives here
│   ├── main.jsx          # Entry point (React mounts here)
│   ├── App.jsx           # Root component
│   ├── App.css           # Component styles
│   └── index.css         # Global styles
├── index.html            # HTML template (has <div id="root">)
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

**The Flow:**
1. Browser loads `index.html` (has `<div id="root">`)
2. HTML loads `src/main.jsx` (entry point)
3. `main.jsx` renders `<App />` into `#root`
4. Your React app is running!

---

## 4. Components: The Building Blocks

### What Makes a Component?

**A component is just a function that returns JSX:**

```jsx
// This is a valid React component!
function Greeting() {
  return <h1>Hello!</h1>;
}
```

**Component Rules:**
1. **Name MUST start with capital letter** (so React knows it's a component, not HTML tag)
2. **Must return JSX** (or `null`)
3. **Can accept props** (inputs)

### Why Capital Letters Matter

```jsx
// ✅ Component - Capital letter
function Button() {
  return <button>Click me</button>;
}

// Usage:
<Button />  // React knows this is YOUR component

// ❌ lowercase - React thinks it's HTML!
function button() {
  return <button>Click me</button>;
}

// Usage:
<button />  // React looks for HTML <button> tag, not your function!
```

### Props: Component Inputs

**Problem: Hard-coded components aren't reusable**

```jsx
// ❌ Not reusable - always says "John"
function Greeting() {
  return <h1>Hello, John!</h1>;
}

<Greeting />  // Always "Hello, John!"
```

**Solution: Use props to make components dynamic**

```jsx
// ✅ Reusable - name can change
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

<Greeting name="John" />   // "Hello, John!"
<Greeting name="Alice" />  // "Hello, Alice!"
```

**Props are like function parameters:**

```jsx
// Regular JavaScript function
function add(a, b) {
  return a + b;
}
add(2, 3);  // 5

// React component (also a function!)
function AddDisplay({ a, b }) {
  return <p>{a} + {b} = {a + b}</p>;
}
<AddDisplay a={2} b={3} />  // "2 + 3 = 5"
```

---

## 5. JSX Rules and Why They Exist

### Rule 1: Single Root Element

```jsx
// ❌ ERROR: Can't return multiple elements
function App() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}

// ✅ Solution 1: Wrap in div
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Solution 2: Use Fragment (no extra DOM node)
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}
```

**Why this rule?** A function can only return ONE value. JSX is transformed to function calls:

```jsx
// JSX
<div><h1>Hi</h1></div>

// Transforms to
React.createElement('div', null, React.createElement('h1', null, 'Hi'))

// Multiple elements would be:
<h1>Hi</h1>
<p>Text</p>

// Invalid JavaScript - can't return two things!
return React.createElement('h1', null, 'Hi'), React.createElement('p', null, 'Text')
```

### Rule 2: Embed JavaScript with `{}`

```jsx
function Profile() {
  const name = "Alice";
  const age = 25;
  
  return (
    <div>
      {/* ✅ Embed variables */}
      <h1>{name}</h1>
      
      {/* ✅ Embed expressions */}
      <p>Age: {age}</p>
      <p>Next year: {age + 1}</p>
      
      {/* ✅ Ternary operator */}
      <p>{age >= 18 ? "Adult" : "Minor"}</p>
      
      {/* ✅ Method calls */}
      <p>{name.toUpperCase()}</p>
      
      {/* ❌ Can't use statements (if/for/while) */}
      {/* { if (age > 18) { return "Adult" } } */}
    </div>
  );
}
```

**Why `{}`?** JSX needs to know when you're switching from "template" mode to "JavaScript" mode.

### Rule 3: `className` not `class`

```jsx
// ❌ Wrong - 'class' is JavaScript keyword
<div class="container">

// ✅ Correct - use className
<div className="container">
```

**Why?** `class` is reserved in JavaScript for defining classes. React uses `className` to avoid conflicts.

---

## 6. Styling Approaches

### Three Common Methods

**1. CSS Files (Recommended for beginners)**

```jsx
// App.jsx
import './App.css';  // Import CSS file

function App() {
  return <div className="container">Content</div>;
}
```

```css
/* App.css */
.container {
  padding: 20px;
  background: #f0f0f0;
}
```

**Pros**: Familiar, separate concerns, good for larger projects
**Cons**: Global scope (can have naming conflicts)

**2. Inline Styles**

```jsx
function App() {
  const containerStyle = {
    padding: '20px',      // Note: string values, camelCase properties
    backgroundColor: '#f0f0f0'
  };
  
  return <div style={containerStyle}>Content</div>;
}
```

**Pros**: Scoped to component, dynamic based on props/state
**Cons**: No pseudo-classes (:hover), no media queries, harder to maintain

**3. Direct Inline**

```jsx
function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      Content
    </div>
  );
}
```

**Pros**: Quick for simple styles
**Cons**: Double curly braces confusing, not reusable

### CSS Property Names in JSX

```jsx
// ❌ CSS property names - DON'T work in JSX
{ 'background-color': 'red', 'font-size': '16px' }

// ✅ camelCase - CORRECT for JSX
{ backgroundColor: 'red', fontSize: '16px' }

// Why? JSX style is a JavaScript object, not CSS
```

---

## 7. Event Handling Basics

### How Events Work in React

```jsx
// Vanilla JS - imperative
const button = document.getElementById('btn');
button.addEventListener('click', () => alert('Clicked!'));

// React - declarative
function App() {
  return <button onClick={() => alert('Clicked!')}>Click Me</button>;
}
```

**Key Differences:**
- React: `onClick` (camelCase), not `onclick`
- React: Pass function reference, not string
- React: Synthetic events (cross-browser compatible)

### Event Types

```jsx
function EventDemo() {
  // onClick - button clicks
  const handleClick = () => {
    alert('Button clicked!');
  };
  
  // onChange - input changes
  const handleChange = (e) => {
    console.log('Input value:', e.target.value);
  };
  
  // onSubmit - form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page reload
    alert('Form submitted!');
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <input onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

**Why event handlers?**
- React provides synthetic events (cross-browser compatible)
- Event object has standard properties like `target.value`
- Always call `e.preventDefault()` for form submissions to prevent page reload

---

## 8. Common Mistakes

### Mistake 1: Forgetting to Export Component

```jsx
// ❌ Component defined but not exported
function Welcome() {
  return <h1>Hello</h1>;
}

// Other files can't import it!
```

```jsx
// ✅ Export so other files can use it
function Welcome() {
  return <h1>Hello</h1>;
}

export default Welcome;  // Default export

// Or
export { Welcome };  // Named export
```

### Mistake 2: Calling Functions in JSX Instead of Passing Them

```jsx
// ❌ BAD: Calls function immediately (infinite loop!)
<button onClick={handleClick()}>Click</button>

// ✅ GOOD: Pass function reference
<button onClick={handleClick}>Click</button>

// ✅ GOOD: Wrap in arrow function if you need parameters
<button onClick={() => handleClick(123)}>Click</button>
```

**Why it matters:**
```jsx
// onClick={handleClick()} → Executes immediately during render!
// onClick={handleClick}   → Executes when user clicks
```

### Mistake 3: Using `class` Instead of `className`

```jsx
// ❌ Won't work - 'class' is reserved
<div class="container">

// ✅ Use className
<div className="container">
```

### Mistake 4: Forgetting Keys in Lists

```jsx
// ❌ No key - React can't track items efficiently
{items.map((item) => <li>{item}</li>)}

// ✅ With key - React knows which items changed
{items.map((item, index) => <li key={index}>{item}</li>)}

// ✅ Better - use unique ID if available
{items.map((item) => <li key={item.id}>{item.name}</li>)}
```

**Why keys?** React uses keys to identify which items changed/added/removed. Without keys, React re-renders everything (slow!).

### Mistake 5: Multiple Root Elements

```jsx
// ❌ Can't return multiple roots
function App() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}

// ✅ Use Fragment
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Text</p>
    </>
  );
}
```

---

## Next Steps

You now understand:
- ✅ **Why** React exists and what problems it solves
- ✅ **How** components work (functions that return JSX)
- ✅ **Why** JSX has specific rules (single root, className, etc.)
- ✅ **When** to use different styling approaches

**Practice**: Head to `lab1.md` for hands-on exercises!

**Quick Reference**: See `reference1.md` for setup commands and syntax.

