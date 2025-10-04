# Lesson 1: React Fundamentals & TypeScript Setup

## Overview

This lesson introduces React fundamentals with modern development practices. You'll set up a professional development environment### Component Naming
❌ `function button()` - lowercase
✅ `function Button()` - uppercase (PascalCase)

### TSX Attributes
❌ `<div class="container">` - HTML attribute
✅ `<div className="container">` - TSX attribute

### Self-Closing Tagsttributes
❌ `<div class="container">` - HTML attribute
✅ `<div className="container">` - TSX attribute

### Self-Closing Tagserstand React's core concepts, and build components with TypeScript fr🔬

**Ready for practice?** → Begin [lab1.md](./lab/lab1.md) exercises

---

## Learning Objectives

By the end of this lesson, you will be able to:

- ✅ Understand what React is and why it's useful
- ✅ Set up a modern React development environment with Vite and TypeScript
- ✅ Understand TSX syntax basics (TypeScript + JSX)
- ✅ Create your first simple functional component with TypeScript
- ✅ Run and view a React application in the browser

## Prerequisites

- Solid understanding of HTML, CSS, and TypeScript basics
- Experience with TypeScript features (types, interfaces, generics)
- Basic familiarity with command line operations
- Understanding of programming fundamentals

**📚 Need a refresher?** Complete [Lesson 0: TypeScript Review](../lesson0-typescript/) first.

---

## What You'll Learn

### 1. React Fundamentals

**Core Concepts:**
- What is React and why use it?
- Component-based architecture
- Virtual DOM and reconciliation
- Declarative vs imperative programming
- TSX syntax (TypeScript + JSX)

### 2. Development Setup

**Tools & Environment:**
- Node.js and npm
- Vite build tool
- TypeScript configuration
- VS Code setup and extensions
- Project structure understanding

### 3. Your First Component

**Component Basics:**
- What is a component?
- Creating a simple functional component
- TSX syntax basics (TypeScript + JSX)
- Rendering your first component
- Basic styling with CSS

> 💡 **Note:** Advanced topics like props, composition, and reusable patterns will be covered in Lesson 2.

---

## Lesson Structure

### 📚 Theory
- **[theory1.md](./theory/theory1.md)** - Comprehensive React fundamentals and concepts

### 💻 Demo
- **[examples/](./examples/)** - Live code examples and project setups

### 🔬 Lab
- **[lab1.md](./lab/lab1.md)** - Hands-on exercises and projects

### ⚡ Quick Start
- **[reference/](./reference/)** - Fast setup guide and code snippets

---

## Quick Concept Preview

### React vs Traditional JavaScript

```tsx
// Traditional DOM manipulation (Vanilla JS)
const button = document.getElementById("myButton");
button.textContent = "Hello World";

// React with TypeScript - declarative approach
function HelloWorld() {
  return <button>Hello World</button>;
}
```

### Your First Simple Component

```tsx
function Welcome() {
  return (
    <div>
      <h1>Welcome to React!</h1>
      <p>This is your first component.</p>
    </div>
  );
}
```

> 💡 **Want to start coding immediately?** Jump to [reference/](./reference/) for step-by-step setup instructions.
>
> 📚 **Note:** Component props, interfaces, and advanced patterns are covered in [Lesson 2: Components & Hooks](../lesson2-component-hook/)

---

## Environment Setup Checklist

Before starting, ensure you have:

- [ ] Node.js v18.0.0 or higher installed
- [ ] npm v9.0.0 or higher installed
- [ ] Git installed and configured
- [ ] VS Code installed with extensions
- [ ] Terminal/Command Prompt access

**Quick verification:**
```bash
node --version    # v18.0.0+
npm --version     # v9.0.0+
git --version     # Any version
```

> 📋 **Detailed setup guide:** See [../extras/environment-setup.md](../extras/environment-setup.md)

---

## Key Concepts Summary

### React Principles

**Declarative Programming:**
- Describe WHAT you want, not HOW to do it
- React handles DOM updates efficiently
- Easier to understand and debug

**Component-Based:**
- UI built from independent pieces called components
- Each component is like a JavaScript function
- Components can be reused (details in Lesson 2)

**Virtual DOM:**
- React creates an in-memory representation of the DOM
- Calculates minimal changes needed
- Updates real DOM efficiently

### TypeScript Benefits

✅ **Type Safety:** Catch errors before runtime
✅ **Better Autocomplete:** IDE helps you write code
✅ **Self-Documentation:** Code is easier to understand

> 📚 **Advanced TypeScript patterns** for React components are covered in Lesson 2.

---

## Practice Exercises

### Level 1: Setup & First Component
- Install required tools (Node.js, npm, VS Code)
- Create new React project with Vite
- Run development server
- Create a simple "Hello World" component
- Modify the default App component

### Level 2: Basic TSX Practice
- Create a Welcome component with text
- Add some basic HTML elements (h1, p, div)
- Apply simple inline styles
- Add a className for CSS styling

### Level 3: Simple Page
Create a basic landing page with:
- Header with your name
- Introduction paragraph
- Simple footer

> 🔬 **Detailed exercises:** See [lab1.md](./lab/lab1.md)
>
> 💡 **Note:** Advanced exercises with props, state, and multiple components are in Lesson 2's lab.

---

## Common Pitfalls to Avoid

### Component Naming
❌ `function button()` - lowercase
✅ `function Button()` - uppercase (PascalCase)

### JSX Attributes
❌ `<div class="container">` - HTML attribute
✅ `<div className="container">` - JSX attribute

### Self-Closing Tags
❌ `<img src="photo.jpg">` - not closed
✅ `<img src="photo.jpg" />` - properly closed

### Return Statement
❌ Multi-line TSX without parentheses
✅ Wrap multi-line TSX in parentheses

---

## Learning Resources

### Official Documentation
- [React Documentation](https://react.dev) - Official React docs
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TS guide
- [Vite Guide](https://vitejs.dev/guide/) - Build tool docs

### Video Tutorials
- [React Tutorial for Beginners](https://www.youtube.com/watch?v=SqcY0GlETPk) - Programming with Mosh
- [React Course 2024](https://www.youtube.com/watch?v=bMknfKXIFA8) - freeCodeCamp

### Interactive Learning
- [React.dev Tutorial](https://react.dev/learn) - Official interactive tutorial
- [TypeScript Playground](https://www.typescriptlang.org/play) - Try TypeScript online

### Communities
- [React Discord](https://discord.gg/react) - Official community
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs) - Q&A
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community

---

## Self-Assessment Checklist

Before moving to Lesson 2, ensure you can:

### Setup & Tools (Must Know)
- [ ] Create new React project with Vite
- [ ] Start development server (`npm run dev`)
- [ ] Understand basic project folder structure
- [ ] Know where to write component code

### React Basics (Must Know)
- [ ] Explain what React is in simple terms
- [ ] Understand what a component is
- [ ] Write basic TSX syntax with TypeScript
- [ ] Create a simple functional component
- [ ] Apply basic CSS styling

### Understanding (Must Know)
- [ ] Know why React is useful
- [ ] Understand declarative vs imperative programming
- [ ] Know what the Virtual DOM is (basic concept)

**🎯 Goal: Check at least 8/10 items before Lesson 2**

> 💡 **Ready for more?** Lesson 2 covers props, state, hooks, and building reusable component libraries!

---

## Next Steps

✅ **Completed this lesson?** → Proceed to [Lesson 2: Components & Hooks](../lesson2-component-hook/)

📚 **Need detailed explanations?** → Study [theory1.md](./theory/theory1.md)

💻 **Want to start coding now?** → Follow [reference/](./reference/)

🔬 **Ready for practice?** → Begin [lab1.md](./lab/lab1.md) exercises

---


