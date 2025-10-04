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
- **[demo/](./demo/)** - Live code examples demonstrating hooks and components

### 🔬 Lab
- **[lab2.md](./lab/lab2.md)** - Hands-on exercises to build component libraries

### ⚡ Quick Start
- **[quickstart.md](./quickstart.md)** - Quick reference and code snippets

---

## Quick Examples

### Component with Props
```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}

function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

// Usage
<Button variant="secondary" onClick={() => alert('Clicked!')}>
  Click Me
</Button>
```

### useState - Managing State
```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### useEffect - Side Effects
```tsx
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

interface UserProfileProps {
  userId: number;
}

function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res\.tson())
      .then(data => setUser(data));
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

### Custom Hook - useLocalStorage
```tsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle Theme
  </button>;
}
```

---

## Common Pitfalls to Avoid

**Components:**
⚠️ **Don't:**
- Modify props (they're read-only)
- Forget to use `key` prop in lists
- Create too many levels of nesting

✅ **Do:**
- Keep components small and focused
- Use meaningful prop names
- Extract reusable logic into custom hooks

**Hooks:**
⚠️ **Don't:**
- Call hooks inside loops, conditions, or nested functions
- Mutate state directly (`state.value = 1`)
- Forget dependency arrays in useEffect
- Create infinite loops with useEffect

✅ **Do:**
- Call hooks at the top level of components
- Use functional updates for state (`setState(prev => prev + 1)`)
- Include all dependencies in useEffect arrays
- Clean up side effects (intervals, subscriptions)

---

## Lab Exercises

### Exercise 1: Component Library
Build reusable components:
- Button (multiple variants)
- Input (with validation)
- Card (with header/footer)
- Alert (success/warning/error)

### Exercise 2: Custom Hooks
Create custom hooks:
- `useForm` - Form state management
- `useFetch` - API data fetching
- `useToggle` - Boolean state toggling

### Exercise 3: Todo App
Build a complete todo application using:
- useState for state management
- useEffect for localStorage persistence
- Custom hooks for reusable logic

---

## Resources

### Official Documentation
- [React Hooks Reference](https://react.dev/reference/react) - Official docs
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning) - Important rules
- [Hooks FAQ](https://react.dev/learn#using-hooks) - Common questions

### Learning Resources
- [useHooks.com](https://usehooks.com/) - Custom hook recipes
- [React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/) - Quick reference

### Communities
- [React Discord](https://discord.gg/react) - Official community
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community

---

## Self-Assessment Checklist

Before moving to Lesson 3, ensure you can:

**Components (Must Know):**
- [ ] Create reusable components with props
- [ ] Use component composition
- [ ] Pass functions as props
- [ ] Handle events properly
- [ ] Use `key` prop in lists

**Hooks (Must Know):**
- [ ] Use useState for component state
- [ ] Use useEffect for side effects
- [ ] Understand dependency arrays
- [ ] Create custom hooks
- [ ] Avoid infinite re-render loops

**Advanced (Good to Know):**
- [ ] Use useReducer for complex state
- [ ] Use useContext for global state
- [ ] Optimize with useMemo/useCallback
- [ ] Implement compound components

**🎯 Target: Check at least 9/14 items before Lesson 3**

---

## Homework Assignment

Create a **Personal Dashboard** with:

1. **Component Library**
   - Reusable Button, Input, Card components
   - Multiple variants and sizes

2. **Custom Hooks**
   - `useLocalStorage` for persistence
   - `useFetch` for API calls
   - `useTheme` for dark/light mode

3. **Features**
   - Theme switcher (light/dark)
   - Todo list with persistence
   - Weather widget (API integration)
   - User profile card

**Deliverables:**
- Source code on GitHub
- Live demo (deploy to Netlify/Vercel)
- README with setup instructions

---

## Next Steps

✅ **Completed Lesson 2?** → Move to [Lesson 3: API Integration & Data Management](../lesson3-api-data/)

📚 **Need More Practice?** → Review [theory2.md](./theory/theory2.md) for detailed explanations

💻 **Want Examples?** → Check [demo/](./demo/) folder for working code

🔬 **Ready to Code?** → Start [lab2.md](./lab/lab2.md) exercises

**Migration Example:**

```tsx
// Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// Function Component with Hooks (Much simpler!)
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## Building Reusable Components

### Component Library Best Practices

1. **Keep components small and focused**
2. **Use TypeScript for type safety**
3. **Provide sensible defaults**
4. **Make components composable**
5. **Document usage examples**

### Example: Button Component

```tsx
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick
}) {
  return (
    <button
      className={`button button-${variant} button-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Usage
<Button variant="secondary" size="lg" onClick={() => alert("Clicked!")}>
  Click Me
</Button>
```

---

## Additional Resources 📚

### Official Documentation
- [React Hooks Documentation](https://react.dev/reference/react) - Official React Hooks reference
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning) - Understanding Hook rules
- [Hooks FAQ](https://react.dev/learn#using-hooks) - Common questions answered

### Video Tutorials
- [React Hooks Crash Course](https://www.youtube.com/watch?v=TNhaISOUy6Q) - Traversy Media
- [React Hooks Tutorial](https://www.youtube.com/watch?v=f687hBjwFcM) - Codevolution

### Interactive Learning
- [React Hooks Playground](https://codesandbox.io/s/react-hooks-playground) - Try hooks in the browser
- [useHooks.com](https://usehooks.com/) - Collection of custom hook recipes
- [React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/) - Quick reference

### Hook Libraries
- [react-use](https://github.com/streamich/react-use) - Collection of essential hooks
- [ahooks](https://ahooks\.ts.org/) - High-quality & reliable React hooks library
- [react-query](https://tanstack.com/query) - Powerful data fetching hooks

### Communities
- [React Discord](https://discord.gg/react) - Official React community
- [Reactiflux](https://www.reactiflux.com/) - React developers chat
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community

---

## 📊 **Final Knowledge Assessment**

Complete this self-assessment to check your readiness for lesson 3:

### **Component Architecture (Must Know)**

- [ ] I can create reusable components with props
- [ ] I understand when to break UI into smaller components
- [ ] I can pass functions as props for event handling
- [ ] I know how to use children prop for composition

### **State Management (Must Know)**

- [ ] I can use useState for component state
- [ ] I understand when and why to use useEffect
- [ ] I know how to prevent infinite re-render loops
- [ ] I can manage form state effectively

### **Advanced Patterns (Good to Know)**

- [ ] I can create and use custom hooks
- [ ] I understand React Context for sharing state
- [ ] I know how to optimize components with React.memo
- [ ] I can implement compound component patterns

### **Practical Skills (Must Demonstrate)**

- [ ] I built a component library with multiple variants
- [ ] I created custom hooks for reusable logic
- [ ] I implemented form handling with validation
- [ ] I can debug React applications using dev tools

**🎯 Goal: Check at least 12/16 items before moving to Lesson 3**

### **Self-Reflection Questions**

1. Which component pattern felt most natural to you?
2. What's the biggest difference between props and state?
3. How would you design components for a large application?

---

## 🎓 **Ready for Lesson 3?**

If you completed the assessment above and feel comfortable with component architecture, you're ready to move on to [Lesson 3: API Integration & Data Management](../lesson3-api-data/).

**Still need practice?** Consider:

- Building more complex component hierarchies
- Experimenting with different state management approaches
- Creating your own custom hooks
- Reviewing the patterns that felt challenging

## Homework

Create a mini design system including:

1. Component library

   - Typography components
   - Layout components
   - Form components
   - Interactive components

2. Theme system

   - Light/dark modes
   - Color variables
   - Spacing system
   - Typography scale

3. Documentation
   - Usage examples
   - Props documentation
   - Theme customization guide


