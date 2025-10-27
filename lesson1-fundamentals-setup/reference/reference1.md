# Reference - React Fundamentals & Project Setup

> **Quick reference guide for React fundamentals**

## Table of Contents
1. [Project Setup](#part-1-project-setup)
2. [Understanding Project Structure](#part-2-understanding-project-structure)
3. [Your First Component](#part-3-your-first-component)
4. [Basic TSX Syntax](#part-4-basic-tsx-syntax)
5. [Adding Styles](#part-5-adding-styles)
6. [Simple Interactive Example](#part-6-simple-interactive-example)
7. [Complete Starter Example](#part-7-complete-starter-example)

---

## Part 1: Project Setup

### Create New React + TypeScript Project

```bash
# Create new project with TypeScript template
npm create vite@latest my-first-react-app -- --template react-ts

# Navigate to project
cd my-first-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

**Your app will open at:**`http://localhost:5173`

### Verify Installation

```bash
# Check versions (make sure these work)
node --version    # Should be v18.0.0+
npm --version     # Should be v9.0.0+
```

 If you see the default Vite + React page, you're ready!

---

## Part 2: Understanding Project Structure

```
my-first-react-app/
├── node_modules/     # Dependencies (auto-generated)
├── public/           # Static files
├── src/              # 👈 Your code goes here
│   ├── App.tsx       # Main component
│   ├── App.css       # Styles for App
│   ├── main.tsx      # Entry point
│   └── index.css     # Global styles
├── package.json      # Project config
├── tsconfig.json     # TypeScript config
└── vite.config.ts    # Vite config
```

** Focus on `src/` folder** - this is where you'll write your code

---

## Part 3: Your First Component

### Understanding the Default App

Open `src/App.tsx`:

```tsx
function App() {
  return (
    <div className="App">
      <h1>Hello React!</h1>
    </div>
  );
}

export default App;
```

**Key concepts:**
- `function App()` - This is a component (like a TypeScript function)
- `return (...)` - Returns TSX (looks like HTML)
- `<div>`, `<h1>` - TSX elements (similar to HTML tags)
- `export default App` - Makes component available for import

### Create Your First Custom Component

**Step 1:** Create a new file `src/components/Welcome.tsx`

```tsx
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

```tsx
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

**Step 3:** Save and check your browser - you should see your Welcome component!

---

## Part 4: Basic TSX Syntax

### TSX Rules

```tsx
import React from 'react';

function MyComponent() {
  return (
    //  Correct - wrapped in one parent element
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>

    //  Wrong - multiple elements without parent
    // <h1>Title</h1>
    // <p>Paragraph</p>
  );
}

export default MyComponent;
```

### TSX vs HTML Differences

```tsx
//  HTML attribute
<div class="container">

//  TSX attribute
<div className="container">

//  Not closed
<img src="photo.jpg">

//  Self-closing
<img src="photo.jpg" />

//  Inline style as string
<div style="color: red">

//  Inline style as object
<div style={{ color: 'red' }}>
```

### Embedding TypeScript in TSX

```tsx
import React from 'react';

function Greeting() {
  const name = "John";
  const age = 25;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      <p>Next year you'll be {age + 1}.</p>
    </div>
  );
}

export default Greeting;
```

**Key:** Use `{}` to embed TypeScript expressions in TSX.

---

## Part 5: Adding Styles

### Option 1: CSS File (Recommended for beginners)

**Create `src/components/Welcome.css`:**
```css
.welcome-container {
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
}

.welcome-title {
  color: #333;
  font-size: 2rem;
}
```

**Use in `src/components/Welcome.tsx`:**
```tsx
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to React!</h1>
      <p>This is styled with CSS.</p>
    </div>
  );
}

export default Welcome;
```

### Option 2: Inline Styles

```tsx
import React from 'react';

function Welcome() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f0f0f0'
    }}>
      <h1 style={{ color: '#333', fontSize: '2rem' }}>
        Welcome to React!
      </h1>
    </div>
  );
}

export default Welcome;
```

---

## Part 6: Simple Interactive Example

```tsx
import React from 'react';

function ClickDemo() {
  function handleClick() {
    alert('Button clicked!');
  }

  return (
    <div>
      <h2>Click Demo</h2>
      <button onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
}

export default ClickDemo;
```

>  **Note:** State management (making the UI update) is covered in Lesson 2 with `useState` hook.

---

## Part 7: Complete Starter Example

**src/App.tsx** - A simple landing page:

```tsx
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header>
        <h1>My First React App</h1>
        <p>Built with React + TypeScript + Vite</p>
      </header>

      {/* Main Content */}
      <main>
        <section>
          <h2>About This Project</h2>
          <p>
            This is a simple React application created with Vite.
            It demonstrates basic component structure and TSX syntax.
          </p>
        </section>

        <section>
          <h2>Technologies Used</h2>
          <ul>
            <li>React 18</li>
            <li>TypeScript</li>
            <li>Vite</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>© 2025 My React App</p>
      </footer>
    </div>
  );
}

export default App;
```

**src/App.css** - Basic styles:

```css
.App {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  text-align: center;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 30px;
}

main {
  line-height: 1.6;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  color: #666;
}

ul {
  list-style-position: inside;
}
```

---

## Common Issues & Solutions

### Issue: Port 5173 is already in use
```bash
# Kill the process using port 5173
# Windows: Open Task Manager and end Node.js process
# Mac/Linux:
lsof -ti:5173 | xargs kill
```

### Issue: Module not found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: Changes not showing
- Make sure dev server is running (`npm run dev`)
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check browser console for errors (F12)

---

## Next Steps

**Completed setup?** Great! You now have:
- A working React development environment
- Understanding of basic TSX syntax
- Your first custom component **Want deeper understanding?** Read [theory1.md](./theory/theory1.md)

 ** Ready to practice?** Try [lab1.md](./lab/lab1.md) exercises **Ready for more features?** Continue to [Lesson 2: Components & Hooks](../lesson2-component-hook/) to learn:
- Props and component communication
- State management with hooks
- Building reusable component libraries
- Event handling patterns

---
