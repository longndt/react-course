# Lesson 1: React Fundamentals & Setup

## Overview

**Difficulty**: Beginner
**Prerequisites**: Basic JavaScript/TypeScript knowledge, HTML/CSS basics

This lesson covers React fundamentals and modern development setup. You'll learn JSX syntax, component basics, state management with hooks, and how to set up a professional React development environment with Vite, TypeScript, and essential tooling.

---

## Learning Objectives

After completing this lesson, you will be able to:

-  Set up a modern React development environment with Vite and TypeScript
-  Understand JSX syntax and how it differs from HTML
-  Create functional components and understand component lifecycle
-  Use React hooks (useState, useEffect) for state management
-  Handle events and user interactions in React
-  Apply styling with CSS modules and modern CSS techniques
-  Debug React applications with browser DevTools
-  Structure React projects following best practices
-  Use ESLint and Prettier for code quality

---

## Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
- JavaScript ES6+ features (arrow functions, destructuring, modules)
- HTML and CSS fundamentals
- Basic understanding of DOM manipulation
- Node.js and npm basics

### Environment Setup
- Node.js 18+ installed
- VS Code with React extensions
- Git installed and configured
- Modern web browser (Chrome, Firefox, Safari)

### Verification
```bash
# Check your setup
node --version  # Should be 18+
npm --version   # Should be 9+
```

>  **Not ready?** → Review [Lesson 0: TypeScript Prerequisites](../lesson0-typescript/) first

---

## What You'll Learn

### 1. React Development Environment

**Modern Tooling:**
- Vite vs Create React App (why Vite is better)
- TypeScript integration and configuration
- ESLint and Prettier setup for code quality
- VS Code extensions for React development
- Hot Module Replacement (HMR) for fast development

**Project Structure:**
- Folder organization and naming conventions
- Component file structure
- Asset management (images, fonts, styles)
- Environment variables and configuration
- Build and deployment preparation

**Key Skills:**
- Setting up new React projects
- Configuring TypeScript for React
- Setting up development tools
- Understanding build processes

### 2. JSX and Component Basics

**JSX Fundamentals:**
- What is JSX and how it works
- JSX vs HTML differences and similarities
- Embedding JavaScript expressions in JSX
- Conditional rendering patterns
- List rendering with keys
- Event handling in JSX

**Component Architecture:**
- Function components vs Class components (modern approach)
- Component composition and reusability
- Props and prop types with TypeScript
- Children prop and component composition
- Component naming conventions

**Key Skills:**
- Writing clean, readable JSX
- Creating reusable components
- Understanding component hierarchy
- Using TypeScript with components

### 3. State Management with Hooks

**useState Hook:**
- Managing component state
- State updates and re-rendering
- Functional vs direct state updates
- State initialization patterns
- Common state management patterns

**useEffect Hook:**
- Side effects in React components
- Component lifecycle with useEffect
- Dependency arrays and when to use them
- Cleanup functions for preventing memory leaks
- Common useEffect patterns

**Key Skills:**
- Managing component state effectively
- Handling side effects properly
- Avoiding common hook mistakes
- Understanding when components re-render

### 4. Event Handling and User Interactions

**Event Handling:**
- Synthetic events in React
- Event handler patterns and best practices
- Form handling and controlled components
- Preventing default behavior
- Event delegation and performance

**User Interactions:**
- Input handling (text, select, checkbox, radio)
- Form validation and error handling
- Button interactions and loading states
- Keyboard and mouse events
- Accessibility considerations

**Key Skills:**
- Creating interactive user interfaces
- Handling form submissions
- Managing user input state
- Implementing proper event handling

### 5. Styling and CSS Integration

**CSS in React:**
- CSS modules and scoped styling
- Styled-components vs CSS modules
- Global vs component-specific styles
- CSS-in-JS patterns and when to use them
- Responsive design with React

**Modern CSS Techniques:**
- CSS Grid and Flexbox with React
- CSS custom properties (variables)
- Animation and transitions
- Dark mode implementation
- Mobile-first responsive design

**Key Skills:**
- Styling React components effectively
- Creating responsive layouts
- Managing CSS organization
- Implementing modern CSS patterns

---

## Quick Concept Preview

### Basic Component with JSX
```tsx
interface WelcomeProps {
  name: string;
  age?: number;
}

function Welcome({ name, age }: WelcomeProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Welcome, ${name}!`;
  }, [name]);

  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}

// Usage
<Welcome name="Alice" age={25} />
```

### State Management with Hooks
```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Effect runs when count or step changes
  useEffect(() => {
    console.log(`Count is now: ${count}`);
  }, [count, step]);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);

  return (
    <div>
      <p>Count: {count}</p>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <button onClick={increment}>+{step}</button>
      <button onClick={decrement}>-{step}</button>
    </div>
  );
}
```

### Form Handling
```tsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

### CSS Modules Example
```tsx
// Welcome.module.css
.welcome {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: #ff5252;
}

// Welcome.tsx
import styles from './Welcome.module.css';

function Welcome({ name }: { name: string }) {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.title}>Welcome, {name}!</h1>
      <button className={styles.button}>Get Started</button>
    </div>
  );
}
```

>  **Want more examples?** Check [reference/](./reference/) for ready-to-use code snippets

---

## Getting Started

Follow this 4-step learning path:

### Step 1: Study the Theory
📖 Read [theory1.md](./theory/theory1.md) - Detailed explanations of:
- React fundamentals and virtual DOM
- JSX syntax and best practices
- Component lifecycle and rendering
- Hooks and state management patterns
- Modern development tooling


### Step 2: Explore Code Examples
 Browse [reference/](./reference/) - Working code for:
- Component patterns and best practices
- State management examples
- Event handling patterns
- Styling approaches
- Real-world use cases


### Step 3: Build Examples
**🔨 Hands-On Practice:**

🔨 Follow [example/](./example/) - Build:
- Modern React project setup
- Interactive component library
- Form handling with validation
- Styling with CSS modules


### Step 4: Complete Lab Exercises
 Practice in [lab1.md](./lab/lab1.md) - Hands-on exercises:
- Level 1: Basic component creation
- Level 2: State management and events
- Level 3: Complete interactive application


>  **Pro tip**: Complete examples before attempting lab exercises

---

## Key Takeaways

###  Core Concepts to Remember

1. **Components are functions** that return JSX
2. **JSX is JavaScript** with HTML-like syntax
3. **State is local** to each component
4. **Hooks enable state** in function components
5. **Props flow down** (one-way data flow)
6. **Effects handle side effects** (API calls, timers, subscriptions)
7. **Keys are required** for list items
8. **Always clean up** side effects to prevent memory leaks

###  Most Important Skills

- Creating and composing React components
- Managing state with useState and useEffect
- Handling user interactions and events
- Writing clean, readable JSX
- Setting up modern development environments
- Debugging React applications

###  Common Realizations

- "Components are just JavaScript functions!"
- "JSX makes building UIs so much easier"
- "Hooks are much simpler than class components"
- "State updates are asynchronous"
- "Always check the console for errors"

---

## Best Practices Summary

###  Component Best Practices

**DO:**
-  Keep components small and focused (single responsibility)
-  Use descriptive component and prop names
-  Extract reusable logic into custom hooks
-  Use TypeScript for better development experience
-  Follow consistent file naming conventions
-  Add PropTypes or TypeScript interfaces for props
-  Use meaningful variable names in JSX

**DON'T:**
-  Create components that are too large or complex
-  Mix business logic with presentation logic
-  Use array index as key in dynamic lists
-  Forget to handle loading and error states
-  Mutate props directly (they're read-only)
-  Use inline styles for complex styling

###  State Management Best Practices

**DO:**
-  Use useState for simple state
-  Use useEffect for side effects
-  Include all dependencies in useEffect arrays
-  Use functional updates: `setState(prev => prev + 1)`
-  Clean up side effects (intervals, subscriptions, listeners)
-  Use multiple useState calls for unrelated state

**DON'T:**
-  Call hooks inside loops, conditions, or nested functions
-  Mutate state directly: `state.value = 1`
-  Forget dependency arrays (causes bugs)
-  Create infinite loops with useEffect
-  Ignore ESLint exhaustive-deps warnings
-  Overuse useEffect (prefer derived state)

###  JSX Best Practices

**DO:**
-  Use meaningful JSX element names
-  Extract complex JSX into separate components
-  Use conditional rendering appropriately
-  Always provide keys for list items
-  Use fragments (`<>`) to avoid unnecessary divs
-  Keep JSX readable and well-formatted

**DON'T:**
-  Put complex logic directly in JSX
-  Use array index as key in dynamic lists
-  Forget to close self-closing tags
-  Mix HTML and React event handlers
-  Use `dangerouslySetInnerHTML` unless absolutely necessary

###  Performance Tips

- Use React.memo for expensive components
- Memoize callbacks with useCallback
- Memoize expensive calculations with useMemo
- Split state to avoid unnecessary re-renders
- Use lazy loading for heavy components

>  **Detailed patterns** → See [theory1.md](./theory/theory1.md)

---

## Common Challenges & Solutions

### Challenge 1: "Cannot read property of undefined"
**Problem:** Trying to access properties of undefined objects
```tsx
//  Wrong - user might be undefined
function UserProfile({ user }) {
  return <div>{user.name}</div>;
}

//  Correct - handle undefined case
function UserProfile({ user }) {
  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

**Solution:** Always check for undefined/null before accessing properties

### Challenge 2: Infinite Re-render Loop
**Problem:** Component keeps re-rendering forever
```tsx
//  Wrong - creates new object reference every render
useEffect(() => {
  fetchData({ filter: 'active' });
}, [{ filter: 'active' }]);

//  Correct - stable dependencies
const filter = 'active';
useEffect(() => {
  fetchData({ filter });
}, [filter]);
```

**Solution:** Use primitive values in dependencies, or useMemo for objects

### Challenge 3: State Not Updating
**Problem:** State doesn't update after setState call
```tsx
//  Wrong - state updates are asynchronous
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Still shows old value
};

//  Correct - use functional update or useEffect
const handleClick = () => {
  setCount(prev => prev + 1);
};

// Or use useEffect to react to state changes
useEffect(() => {
  console.log(count);
}, [count]);
```

**Solution:** Remember that state updates are asynchronous, use functional updates

### Challenge 4: Event Handler Not Working
**Problem:** onClick or other events not firing
```tsx
//  Wrong - calling function immediately
<button onClick={handleClick()}>Click me</button>

//  Correct - pass function reference
<button onClick={handleClick}>Click me</button>

//  Or use arrow function
<button onClick={() => handleClick()}>Click me</button>
```

**Solution:** Pass function reference, not function call

### Challenge 5: Styling Not Applied
**Problem:** CSS styles not showing up
```tsx
//  Wrong - className instead of class
<div class="container">

//  Correct - use className in JSX
<div className="container">

//  For CSS modules
import styles from './Component.module.css';
<div className={styles.container}>
```

**Solution:** Use `className` instead of `class`, import CSS modules properly

>  **More solutions** → See [Troubleshooting Guide](../extra/troubleshooting.md)

---

## Progress Checklist

### React Fundamentals (Must Know)
- [ ] Create functional components with JSX
- [ ] Use props to pass data between components
- [ ] Handle events with onClick, onChange, onSubmit
- [ ] Understand component re-rendering
- [ ] Use conditional rendering (if, &&, ternary)
- [ ] Render lists with proper keys

### State Management (Must Know)
- [ ] Use useState for component state
- [ ] Use useEffect for side effects
- [ ] Understand dependency arrays
- [ ] Avoid infinite re-render loops
- [ ] Clean up side effects properly
- [ ] Use functional state updates

### Development Setup (Must Know)
- [ ] Set up React project with Vite
- [ ] Configure TypeScript for React
- [ ] Use ESLint and Prettier
- [ ] Debug with React DevTools
- [ ] Structure project files properly
- [ ] Use environment variables

### Styling (Should Know)
- [ ] Apply CSS classes with className
- [ ] Use CSS modules for scoped styles
- [ ] Create responsive layouts
- [ ] Handle hover and focus states
- [ ] Use CSS custom properties
- [ ] Implement basic animations

### Forms and Input (Should Know)
- [ ] Create controlled form inputs
- [ ] Handle form submission
- [ ] Validate user input
- [ ] Show loading states
- [ ] Display error messages
- [ ] Reset forms after submission

**Goal: Check at least 18/24 items before Lesson 2**

---

## Next Steps

### Ready to Continue?
 **Completed this lesson?** → Proceed to [Lesson 2: React Components & Hooks](../lesson2-component-hook/)

### Need More Practice?
 **Study theory** → [theory1.md](./theory/theory1.md) - Deep dive into concepts
 **View examples** → [reference/](./reference/) - Ready-to-use code snippets
🔨 **Build projects** → [example/](./example/) - Follow-along tutorials
 **Practice exercises** → [lab1.md](./lab/lab1.md) - Hands-on challenges

### Additional Resources
 **Quiz yourself** → [quiz/](./quiz/) - Test your knowledge
❓ **Having issues?** → [Troubleshooting Guide](../extra/troubleshooting.md)
 **Learn components** → Preview [Lesson 2](../lesson2-component-hook/)

---

## Resources & References

### Course Guides
- **[Web Accessibility Guide](../extra/web-accessibility.md)** - Build accessible React components with ARIA, keyboard navigation, and semantic HTML
- [Advanced Patterns](../extra/advanced-patterns.md) - Advanced component patterns and techniques

### Official Documentation
- [React Documentation](https://react.dev/) - Official React docs
- [JSX Introduction](https://react.dev/learn/writing-markup-with-jsx) - JSX syntax guide
- [Hooks Reference](https://react.dev/reference/react) - All React hooks
- [Thinking in React](https://react.dev/learn/thinking-in-react) - Component design

### Development Tools
- [Vite Documentation](https://vitejs.dev/) - Build tool and dev server
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [ESLint Rules](https://eslint.org/docs/rules/) - Code quality rules
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html) - Code formatting

### React DevTools
- [React Developer Tools](https://react.dev/learn/react-developer-tools) - Browser extension
- [Profiler Guide](https://react.dev/learn/react-developer-tools#profiler) - Performance profiling
- [Component Tree](https://react.dev/learn/react-developer-tools#components) - Component inspection

### Video Tutorials
- [React Crash Course](https://www.youtube.com/watch?v=w7ejDZ8SWv8) - Traversy Media
- [React Hooks Tutorial](https://www.youtube.com/watch?v=TNhaISOUy6Q) - Traversy Media
- [Vite + React Setup](https://www.youtube.com/watch?v=89NJdbYTgC8) - The Net Ninja

### Articles & Guides
- [React Patterns](https://reactpatterns.com/) - Common patterns
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - TS patterns
- [JSX in Depth](https://react.dev/learn/writing-markup-with-jsx) - Deep JSX guide

### Communities
- [React Discord](https://discord.gg/react) - Official community
- [Reactiflux](https://www.reactiflux.com/) - React developers chat
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit community
- [Stack Overflow - reactjs](https://stackoverflow.com/questions/tagged/reactjs) - Q&A

---