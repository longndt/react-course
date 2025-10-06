# Lesson 2: React Components & Hooks

## Overview

**Difficulty**: Intermediate
**Prerequisites**: Lesson 1 completed, JavaScript ES6+ basics

This lesson covers React component architecture and hooks - the foundation of modern React development. You'll learn to build reusable components, manage state effectively, and create custom hooks for shared logic using modern JavaScript and PropTypes.

---

## Learning Objectives

After completing this lesson, you will be able to:

-  Build reusable component libraries
-  Master component composition and props patterns
-  Apply essential React Hooks (useState, useEffect, useRef, useContext, useReducer)
-  Create custom hooks for reusable business logic
-  Handle side effects and lifecycle events properly
-  Avoid common Hook mistakes and anti-patterns
-  Debug components with React DevTools
-  Optimize component performance

---

## 📚 What's Next

### Additional Resources
-  **Quiz yourself** → [quiz/](./quiz/) - Test your knowledge
-  **Having issues?** → [Troubleshooting Guide](../extra/troubleshooting.md)
-  **Advanced patterns** → [Advanced Patterns](../extra/advanced-patterns.md)
-  **More solutions** → See [Troubleshooting Guide](../extra/troubleshooting.md)

---

## Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
-  React fundamentals (JSX, component basics)
-  JavaScript ES6+ (arrow functions, destructuring, spread/rest, modules)
-  PropTypes for runtime type checking
-  Completed Lesson 1 setup

### Environment Setup
-  Node.js and npm installed
-  VS Code with React extensions
-  React project created (Vite recommended)

### Verification
```bash
# Check your setup
node --version  # Should be 18+
npm --version   # Should be 9+
```

>  **Not ready?** → Review [Lesson 0: JavaScript ES6+](../lesson0-javascript-es6/) and [Lesson 1](../lesson1-fundamentals-setup/) first

---

## What You'll Learn

### 1. Component Architecture (1.5 hours)

**Component Patterns:**
- Function vs Class components (modern vs legacy)
- Props and composition principles
- Reusable component design patterns
- Component hierarchy and organization

**Building Blocks:**
- **Atomic components** - Button, Input, Icon, Badge
- **Molecule components** - SearchBox, Card, FormField
- **Organism components** - Header, DataTable, Modal, Sidebar
- **Page components** - Dashboard, Profile, Settings

**Key Skills:**
- Designing component APIs with PropTypes
- Props validation and default values
- Component composition vs inheritance
- When to split components

### 2. React Hooks Essentials

**Core Hooks:**
- **useState** - Manage component state and updates
- **useEffect** - Handle side effects (API calls, subscriptions, timers)
- **useRef** - Access DOM elements and persist values without re-renders
- **useContext** - Share data across components without prop drilling
- **useReducer** - Manage complex state logic (Redux pattern)

**Advanced Concepts:**
- Hook rules and the "Rules of Hooks"
- Dependency arrays in useEffect
- Cleanup functions and memory leak prevention
- Avoiding infinite render loops
- When to use each hook (decision tree)

### 3. Custom Hooks (1.5 hours)

**Why Custom Hooks:**
- Extract reusable stateful logic
- Simplify components
- Share logic across components
- Better separation of concerns

**Common Custom Hooks:**
- `useForm` - Form handling and validation
- `useLocalStorage` - Persist state to localStorage
- `useFetch` - Data fetching with loading/error states
- `useWindowSize` - Responsive window dimensions
- `useDebounce` - Debounce user input
- `useToggle` - Boolean state toggling

**Best Practices:**
- Naming convention (always start with `use`)
- Hook composition (combine multiple hooks)
- Testing custom hooks
- PropTypes for hook parameters when needed

---

## Quick Concept Preview

### Component with PropTypes
```jsx
import PropTypes from 'prop-types';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  disabled: false
};

// Usage
<Button variant="primary" size="lg" onClick={() => console.log('Clicked!')}>
  Click Me
</Button>
```

### useState Hook
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Functional update (preferred for updates based on previous state)
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### useEffect Hook
```jsx
import PropTypes from 'prop-types';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        if (!cancelled) setUser(data);
      } catch (error) {
        if (!cancelled) console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUser();

    // Cleanup function
    return () => { cancelled = true; };
  }, [userId]); // Re-run when userId changes

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired
};
```

### Custom Hook Example
```jsx
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

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

>  **Want more examples?** Check [reference/](./reference/) for ready-to-use code snippets

---

## Getting Started

Follow this 4-step learning path:

### Step 1: Study the Theory
📖 Read [theory2.md](./theory/theory2.md) - Detailed explanations of:
- Component lifecycle and rendering
- How hooks work internally
- Common patterns and anti-patterns
- Performance optimization techniques

**Time**: 45-60 minutes

### Step 2: Explore Code Examples
 Browse [reference/](./reference/) - Working code for:
- Component patterns (composition, render props, HOC)
- All essential hooks with examples
- Custom hook implementations
- Real-world use cases

**Time**: 30-45 minutes

### Step 3: Build Examples
**🔨 Hands-On Practice:**

🔨 Follow [example/](./example/) - Build:
- Reusable component library
- Todo app with hooks
- Data fetching with custom hooks
- Form handling with validation

**Time**: 90-120 minutes

### Step 4: Complete Lab Exercises
 Practice in [lab2.md](./lab/lab2.md) - Hands-on exercises:
- Level 1: Build UI component library
- Level 2: Create custom hooks
- Level 3: Complete Todo application with persistence

**Time**: 120-180 minutes

>  **Pro tip**: Complete examples before attempting lab exercises

---

## Key Takeaways

###  Core Concepts to Remember

1. **Components are functions** that return JSX
2. **Props flow down** (one-way data flow)
3. **State is local** to each component
4. **Hooks enable state** in function components
5. **useEffect runs after render** (not during)
6. **Dependency arrays control** when effects run
7. **Custom hooks share logic** without sharing state
8. **Always clean up** side effects (intervals, subscriptions)

###  Most Important Skills

- Creating reusable components with PropTypes validation
- Managing state with useState
- Handling side effects with useEffect
- Building custom hooks for shared logic
- Avoiding infinite render loops
- Cleaning up resources properly

###  Common Realizations

- "Components are just JavaScript functions!"
- "Hooks are composable building blocks"
- "Custom hooks make code so much cleaner"
- "Dependency arrays are crucial for performance"
- "PropTypes catch bugs early in development"

---

## Best Practices Summary

###  Component Best Practices

**DO:**
-  Keep components small and focused (single responsibility)
-  Use PropTypes for all component props
-  Extract reusable logic into custom hooks
-  Use meaningful component and prop names
-  Provide default prop values when optional
-  Use children prop for composition
-  Add key prop for list items

**DON'T:**
-  Modify props (they're read-only)
-  Forget `key` prop in lists
-  Create too many nesting levels (max 5)
-  Mix business logic with UI rendering
-  Use index as key in dynamic lists
-  Create giant "god components"

###  Hooks Best Practices

**DO:**
-  Call hooks at the top level (not in loops/conditions)
-  Include all dependencies in useEffect arrays
-  Use functional updates: `setState(prev => prev + 1)`
-  Clean up side effects (intervals, subscriptions, listeners)
-  Use multiple useEffect for different concerns
-  Create custom hooks for reusable logic
-  Name custom hooks starting with "use"

**DON'T:**
-  Call hooks inside loops, conditions, or nested functions
-  Mutate state directly: `state.value = 1`
-  Forget dependency arrays (causes bugs)
-  Create infinite loops with useEffect
-  Ignore ESLint exhaustive-deps warnings
-  Overuse useEffect (prefer derived state)

###  PropTypes Best Practices

**DO:**
-  Define PropTypes for all components
-  Mark required props with `.isRequired`
-  Use specific PropTypes (not just `PropTypes.any`)
-  Provide defaultProps for optional props
-  Use shape() for object props
-  Use oneOf() for enum-like values

**DON'T:**
-  Skip PropTypes validation
-  Use PropTypes.any (defeats the purpose)
-  Forget .isRequired for mandatory props
-  Mix PropTypes with default values inconsistently

###  Performance Tips

- Use React.memo for expensive components
- Memoize callbacks with useCallback
- Memoize expensive calculations with useMemo
- Split state to avoid unnecessary re-renders
- Lazy load heavy components with React.lazy

>  **Detailed patterns** → See [theory2.md](./theory/theory2.md)

---

## Common Challenges & Solutions

### Challenge 1: Infinite Re-render Loop
**Problem:** Component keeps re-rendering forever
```jsx
//  Wrong - creates new array reference every render
useEffect(() => {
  doSomething();
}, [someArray]);

//  Correct - stable reference
useEffect(() => {
  doSomething();
}, [someArray.join(',')]);
```

**Solution:** Check dependency arrays, use functional updates, avoid object/array literals

### Challenge 2: Stale Closure in useEffect
**Problem:** Effect uses old state values
```jsx
//  Wrong - count is stale
useEffect(() => {
  setInterval(() => console.log(count), 1000);
}, []);

//  Correct - include dependency
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, [count]);
```

**Solution:** Include all used variables in dependency array

### Challenge 3: Memory Leaks
**Problem:** Subscriptions/timers not cleaned up
```jsx
//  Wrong - interval never cleared
useEffect(() => {
  setInterval(() => console.log('tick'), 1000);
}, []);

//  Correct - cleanup function
useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(id);
}, []);
```

**Solution:** Always return cleanup function from useEffect

### Challenge 4: Props Not Updating
**Problem:** Component doesn't re-render when props change
```jsx
//  Wrong - only runs on mount
const [data, setData] = useState(props.initialData);

//  Correct - syncs with props
useEffect(() => {
  setData(props.initialData);
}, [props.initialData]);
```

**Solution:** Use useEffect to sync with prop changes, or use props directly

### Challenge 5: Too Many Re-renders
**Problem:** setState called during render phase
```jsx
//  Wrong - setState during render
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); //  Causes infinite loop
  return <div>{count}</div>;
}

//  Correct - setState in event handler or useEffect
function Component() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, []);
  return <div>{count}</div>;
}
```

**Solution:** Only call setState in event handlers or useEffect

> **More solutions** → See [Troubleshooting Guide](../extra/troubleshooting.md)

---

## Progress Checklist

### Components (Must Know)
- [ ] Create reusable components with PropTypes
- [ ] Use component composition and children prop
- [ ] Pass functions as props for event handling
- [ ] Understand when to break UI into smaller components
- [ ] Apply proper prop validation with PropTypes

### Hooks (Must Know)
- [ ] Use useState for component state management
- [ ] Use useEffect for side effects (API calls, timers)
- [ ] Understand dependency arrays and cleanup functions
- [ ] Avoid infinite re-render loops
- [ ] Use useRef for DOM access and persistent values

### Custom Hooks (Should Know)
- [ ] Create custom hooks to extract reusable logic
- [ ] Use custom hooks across multiple components
- [ ] Follow hooks naming convention (use*)
- [ ] Combine multiple hooks in custom hooks

### Advanced (Good to Know)
- [ ] Use useReducer for complex state logic
- [ ] Use useContext for sharing state
- [ ] Optimize with React.memo and useMemo
- [ ] Debug components with React DevTools
- [ ] Handle async operations in useEffect properly

**Goal: Check at least 12/14 items before Lesson 3**

---

## Next Steps

### Ready to Continue?
 **Completed this lesson?** → Proceed to [Lesson 3: API Integration & Data Management](../lesson3-api-data/)

### Need More Practice?
 **Study theory** → [theory2.md](./theory/theory2.md) - Deep dive into concepts
 **View examples** → [reference/](./reference/) - Ready-to-use code snippets
🔨 **Build projects** → [example/](./example/) - Follow-along tutorials
 **Practice exercises** → [lab2.md](./lab/lab2.md) - Hands-on challenges

### Additional Resources
 **Quiz yourself** → [quiz/](./quiz/) - Test your knowledge
❓ **Having issues?** → [Troubleshooting Guide](../extra/troubleshooting.md)
 **Advanced patterns** → [Advanced Patterns](../extra/advanced-patterns.md)

---

## Resources & References

### Course Guides
- [Advanced Patterns](../extra/advanced-patterns.md) - Advanced component patterns and techniques
- [State Management Guide](../extra/state-management.md) - Managing state in React applications
- [Web Testing Guide](../extra/web-testing.md) - Testing React components

### Official Documentation
- [React Hooks Reference](https://react.dev/reference/react) - Official API docs
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning) - Important rules
- [React Dev Tools](https://react.dev/learn/react-developer-tools) - Debugging tools
- [Thinking in React](https://react.dev/learn/thinking-in-react) - Component design

### PropTypes & Validation
- [PropTypes Documentation](https://reactjs.org/docs/typechecking-with-proptypes.html) - Official guide
- [PropTypes NPM Package](https://www.npmjs.com/package/prop-types) - Package reference

### Custom Hook Libraries
- [useHooks.com](https://usehooks.com/) - Custom hook recipes
- [react-use](https://github.com/streamich/react-use) - Essential hooks collection
- [ahooks](https://ahooks.js.org/) - High-quality hooks library

### Video Tutorials
- [React Hooks Crash Course](https://www.youtube.com/watch?v=TNhaISOUy6Q) - Traversy Media
- [React Hooks Full Course](https://www.youtube.com/watch?v=f687hBjwFcM) - Codevolution
- [Custom Hooks Explained](https://www.youtube.com/watch?v=6ThXsUwLWvc) - Web Dev Simplified

### Articles & Guides
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) - Dan Abramov
- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback) - Kent C. Dodds
- [React Hooks Cheat Sheet](https://react-hooks-cheatsheet.com/) - Quick reference

### Communities
- [React Discord](https://discord.gg/react) - Official community
- [Reactiflux](https://www.reactiflux.com/) - React developers chat
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community
- [Stack Overflow - reactjs](https://stackoverflow.com/questions/tagged/reactjs) - Q&A

---

**Happy coding! **
