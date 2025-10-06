# Lesson 1: React Fundamentals & Setup

## Overview

**Difficulty**: Beginner
**Prerequisites**: Lesson 0 (JavaScript ES6+)

This lesson introduces React fundamentals with modern development practices. You'll set up a professional development environment, understand React's core concepts, and build your first components with JavaScript.

---

## Learning Objectives

After completing this lesson, you will be able to:

-  Understand what React is and why it's useful for building UIs
-  Set up a modern React development environment with Vite
-  Understand JSX syntax and its rules
-  Create functional components with JavaScript
-  Understand component-based architecture
-  Apply basic CSS styling to React components
-  Run and debug React applications in the browser

---

## Prerequisites

- Solid understanding of HTML, CSS, and JavaScript
- JavaScript ES6+ fundamentals (arrow functions, destructuring, modules)
- Basic command line operations
- Understanding of programming fundamentals

**Need a refresher?** Complete [Lesson 0: JavaScript ES6+ Review](../lesson0-javascript-es6/) first.

**Technical Requirements:**
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- VS Code with extensions
- Modern web browser

---

## What You'll Learn

### 1. React Fundamentals

**Core Concepts:**
- What is React and why use it?
- Component-based architecture
- Virtual DOM and reconciliation
- Declarative vs imperative programming
- Single Page Applications (SPAs)

**React Philosophy:**
- UI as a function of state
- Composability and reusability
- Unidirectional data flow

### 2. Development Environment Setup

**Tools & Configuration:**
- Node.js and npm package manager
- Vite build tool (modern alternative to CRA)
- ESLint configuration for code quality
- VS Code extensions and settings
- Project folder structure

**Development Workflow:**
- Creating new projects
- Running development server
- Hot Module Replacement (HMR)
- Building for production

### 3. JSX Syntax & Components

**JSX Basics:**
- JSX syntax fundamentals
- Embedding JavaScript expressions
- Component naming conventions (PascalCase)
- Self-closing tags
- Fragments

**Your First Component:**
- Functional component structure
- Return statements
- Multi-line JSX with parentheses
- Props concept (detailed in Lesson 2)
- Basic styling with CSS

>  **Note:** Advanced topics like props, state, hooks, and component composition are covered in Lesson 2.

---

## Quick Concept Preview

### React vs Traditional JavaScript

```jsx
// Traditional DOM manipulation (Vanilla JS)
const button = document.getElementById("myButton");
button.textContent = "Hello World";
button.addEventListener("click", () => alert("Clicked!"));

// React with JavaScript - declarative approach
function HelloWorld() {
  const handleClick = () => alert("Clicked!");
  return <button onClick={handleClick}>Hello World</button>;
}
```

### Your First Component

```jsx
// Simple functional component
function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to React!</h1>
      <p>This is your first component.</p>
    </div>
  );
}
```

### Component with Styling

```jsx
function Card() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Card Title</h2>
      <p>Card content goes here</p>
    </div>
  );
}
```

---

## Getting Started

**Learning Path:**

1. **Start with [Reference Guide](./reference/)** - Quick setup and code snippets (15-30 min)
2. **Read [Theory Guide](./theory/theory1.md)** - Comprehensive React fundamentals (2-3 hours)
3. **Explore [Examples](./example/)** - Working React applications
4. **Complete [Lab Exercise](./lab/lab1.md)** - Build your first React app (3-4 hours)

**Prerequisites Checklist:**
- [ ] Node.js v18.0.0+ installed (`node --version`)
- [ ] npm v9.0.0+ installed (`npm --version`)
- [ ] VS Code with React extensions
- [ ] Git installed and configured
- [ ] Completed Lesson 0 (JavaScript ES6+ fundamentals)
- [ ] Understanding of HTML, CSS, JavaScript

---

## Key Takeaways

- **React is a JavaScript library** for building user interfaces using components
- **Components are reusable UI pieces** that work like JavaScript functions
- **JSX combines JavaScript and HTML** for declarative UI development
- **Virtual DOM** makes React fast by minimizing real DOM manipulations
- **Declarative programming** describes WHAT you want, not HOW to do it
- **Vite is the modern build tool** replacing Create React App (CRA)
- **Functional components** are the standard in modern React (not classes)

---

## Best Practices Summary

 **DO:**
- Use PascalCase for component names (`Button`, not `button`)
- Use `className` instead of `class` for CSS classes
- Close all JSX tags (self-closing for empty elements)
- Wrap multi-line JSX in parentheses
- Keep components small and focused
- Use PropTypes for runtime type checking

 **DON'T:**
- Use lowercase for component names
- Forget to close JSX tags
- Use `class` attribute (it's `className`)
- Modify props (they're read-only)
- Create components inside other components
- Ignore ESLint warnings without fixing them

---

## Common Challenges & Solutions

**Challenge 1: "SyntaxError: Unexpected token <"**
- **Cause:** Using JSX in .js file instead of .jsx
- **Solution:** Rename file to .jsx or ensure Vite is configured

**Challenge 2: "Warning: Each child in a list should have a unique 'key' prop"**
- **Cause:** Rendering arrays without key prop
- **Solution:** Will be covered in Lesson 2 (lists and keys)

**Challenge 3: "Cannot find module 'react'"**
- **Cause:** Dependencies not installed
- **Solution:** Run `npm install` in project directory

**Challenge 4: Component not showing in browser**
- **Cause:** Component not imported/rendered in App.jsx
- **Solution:** Import and use component in App component

**Challenge 5: Styles not applying**
- **Cause:** Using `class` instead of `className`, or CSS file not imported
- **Solution:** Use `className` and import CSS file in component

---

## Progress Checklist

**Setup & Environment:**
- [ ] Created React project with Vite
- [ ] Started development server successfully
- [ ] Understand project folder structure
- [ ] Installed recommended VS Code extensions

**React Fundamentals:**
- [ ] Can explain what React is in simple terms
- [ ] Understand component-based architecture
- [ ] Know what Virtual DOM does
- [ ] Understand declarative vs imperative programming

**JSX & Components:**
- [ ] Can write basic JSX syntax
- [ ] Created a simple functional component
- [ ] Applied CSS styling (inline and className)
- [ ] Understand JSX rules (PascalCase, self-closing, etc.)

**Lab Completion:**
- [ ] Completed lab exercises
- [ ] Built a simple landing page
- [ ] Successfully ran the project

**Goal: Complete 12/14 items before Lesson 2**

---

## Next Steps

 **Completed this lesson?** → Proceed to [Lesson 2: Components & Hooks](../lesson2-component-hook/)

**In Lesson 2, you'll learn:**
- Props and component composition
- State management with useState
- React Hooks (useEffect, useRef, useContext)
- Building reusable component libraries
- Form handling and validation

**Need more practice?**
- Build more components with different layouts
- Try creating a simple portfolio page
- Experiment with different CSS styling approaches

---

## Resources & References

**Official Documentation:**
- [React Documentation](https://react.dev) - Official React docs (highly recommended)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - JavaScript reference
- [Vite Guide](https://vitejs.dev/guide/) - Build tool documentation

**Video Tutorials:**
- [React Tutorial for Beginners](https://www.youtube.com/watch?v=SqcY0GlETPk) - Programming with Mosh
- [React Course 2024](https://www.youtube.com/watch?v=bMknfKXIFA8) - freeCodeCamp

**Interactive Learning:**
- [React.dev Tutorial](https://react.dev/learn) - Official interactive tutorial
- [CodeSandbox](https://codesandbox.io/s/react) - Try React online

**Community & Support:**
- [React Discord](https://discord.gg/react) - Official community
- [Stack Overflow - React](https://stackoverflow.com/questions/tagged/reactjs)
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community

**Tools:**
- [React DevTools](https://react.dev/learn/react-developer-tools) - Browser extension
- [Vite Templates](https://github.com/vitejs/vite/tree/main/packages/create-vite) - Starter templates

---

**Remember:** React is about building UIs with components. Master the basics in this lesson, then move to Lesson 2 for props, state, and hooks!
