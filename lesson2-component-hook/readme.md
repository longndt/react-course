# Lesson 2: React Components & Hooks

## Overview

This lesson covers React component architecture and hooks - the foundation of modern React development. You'll learn to build reusable components, manage state effectively, and create custom hooks for shared logic.

## Learning Objectives

After this lesson, you will be able to:

- ✅ Build reusable component libraries
- ✅ Understand component composition and props
- ✅ Apply essential React Hooks (useState, useEffect, useRef, useContext, useReducer)
- ✅ Create custom hooks for reusable business logic
- ✅ Handle side effects and lifecycle events properly
- ✅ Avoid common Hook mistakes and anti-patterns

---

## What You'll Learn

### 1. Component Architecture

**Component Patterns:**
- Function vs Class components
- Props and composition
- Reusable component design
- Component hierarchy

**Building Blocks:**
- Atomic components (Button, Input, Icon)
- Molecule components (SearchBox, Card, FormField)
- Organism components (Header, DataTable, Modal)
- Page components (Dashboard, Profile)

### 2. React Hooks Essentials

**Core Hooks:**
- **useState** - Manage component state
- **useEffect** - Handle side effects (API calls, subscriptions, timers)
- **useRef** - Access DOM elements and persist values without re-renders
- **useContext** - Share data without prop drilling
- **useReducer** - Manage complex state logic

**Key Concepts:**
- Hook rules and best practices
- Dependency arrays in useEffect
- Avoiding infinite loops and memory leaks
- When to use each hook

### 3. Custom Hooks

Learn to create custom hooks for:
- Form handling (`useForm`)
- Local storage (`useLocalStorage`)
- Data fetching (`useFetch`)
- Window dimensions (`useWindowSize`)

---

## Lesson Structure

### 📚 Theory
- **[theory2.md](./theory/theory2.md)** - Comprehensive guide to React Hooks and component patterns

### 💻 Demo
- **[examples/](./examples/)** - Live code examples demonstrating hooks and components

### 🔬 Lab
- **[lab2.md](./lab/lab2.md)** - Hands-on exercises to build component libraries

### ⚡ Quick Start
- **[reference/](./reference/)** - Quick reference and code snippets

---

## Quick Concept Preview

### Component with Props
```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return <button className={`btn-${variant}`} onClick={onClick}>{children}</button>;
}
```

### Hook Example - useState
```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

> 💡 **Want more examples?** Check [reference/](./reference/) for ready-to-use code and [theory2.md](./theory/theory2.md) for detailed explanations.

---

## Key Concepts Summary

### Components Best Practices

✅ **DO:**
- Keep components small and focused (single responsibility)
- Use TypeScript interfaces for props
- Extract reusable logic into custom hooks
- Use meaningful component and prop names

⚠️ **DON'T:**
- Modify props (they're read-only)
- Forget `key` prop in lists
- Create too many nesting levels (>5)
- Mix too much business logic with UI

### Hooks Best Practices

✅ **DO:**
- Call hooks at the top level of components
- Include all dependencies in useEffect arrays
- Use functional updates for state: `setState(prev => prev + 1)`
- Clean up side effects (intervals, subscriptions)

⚠️ **DON'T:**
- Call hooks inside loops, conditions, or nested functions
- Mutate state directly: `state.value = 1` ❌
- Forget dependency arrays in useEffect
- Create infinite loops with useEffect

> 📚 **Detailed explanations** → See [theory2.md](./theory/theory2.md)

---

## Practice Exercises

### Level 1: Component Library
Build reusable UI components:
- Button (variants: primary, secondary, danger)
- Input (with validation feedback)
- Card (with header/footer slots)
- Alert (types: success, warning, error)

### Level 2: Custom Hooks
Create reusable logic hooks:
- `useForm` - Form state management
- `useFetch` - API data fetching with loading/error states
- `useToggle` - Boolean state toggling
- `useLocalStorage` - Persist state to localStorage

### Level 3: Complete Application
Build a **Todo App** featuring:
- Component composition
- State management with useState
- Persistence with useEffect + localStorage
- Custom hooks for reusable logic

> 🔬 **Start practicing** → Go to [lab2.md](./lab/lab2.md)

---

## Learning Resources

### Official Documentation
- [React Hooks Reference](https://react.dev/reference/react) - Official API docs
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning) - Important rules
- [React Dev Tools](https://react.dev/learn/react-developer-tools) - Debugging tools

### Custom Hook Libraries
- [useHooks.com](https://usehooks.com/) - Custom hook recipes
- [react-use](https://github.com/streamich/react-use) - Essential hooks collection
- [ahooks](https://ahooks.js.org/) - High-quality hooks library

### Video Tutorials
- [React Hooks Crash Course](https://www.youtube.com/watch?v=TNhaISOUy6Q) - Traversy Media
- [React Hooks Full Course](https://www.youtube.com/watch?v=f687hBjwFcM) - Codevolution

### Communities
- [React Discord](https://discord.gg/react) - Official community
- [Reactiflux](https://www.reactiflux.com/) - React developers chat
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community

---

## Self-Assessment Checklist

Before moving to Lesson 3, ensure you can:

### Components (Must Know)
- [ ] Create reusable components with TypeScript props
- [ ] Use component composition and children prop
- [ ] Pass functions as props for event handling
- [ ] Understand when to break UI into smaller components

### Hooks (Must Know)
- [ ] Use useState for component state management
- [ ] Use useEffect for side effects (API calls, timers)
- [ ] Understand dependency arrays and cleanup functions
- [ ] Avoid infinite re-render loops

### Custom Hooks (Should Know)
- [ ] Create custom hooks to extract reusable logic
- [ ] Use custom hooks across multiple components
- [ ] Follow hooks naming convention (use*)

### Advanced (Good to Know)
- [ ] Use useReducer for complex state logic
- [ ] Use useContext for sharing state
- [ ] Optimize with React.memo and useMemo
- [ ] Debug components with React DevTools

**🎯 Goal: Check at least 10/14 items before Lesson 3**

---

## Next Steps

✅ **Completed this lesson?** → Proceed to [Lesson 3: API Integration & Data Management](../lesson3-api-data/)

📚 **Need detailed explanations?** → Study [theory2.md](./theory/theory2.md)

💻 **Want code examples?** → Check [reference/](./reference/) and [examples/](./examples/)

🔬 **Ready to practice?** → Start [lab2.md](./lab/lab2.md) exercises

---


