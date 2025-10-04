# Lesson 2: Component Architecture & Advanced State

## Overview

In this lesson, you'll master React component patterns, advanced state management, and build reusable component libraries. We'll cover modern component composition patterns, custom hooks, and form handling techniques used in professional React applications.

## Learning Objectives

After this lesson, you will be able to:

- Design scalable component architectures
- Master advanced state management patterns (useState, useReducer, Context)
- Create custom hooks for reusable business logic
- Build complex forms with validation
- Implement component composition patterns
- Handle performance optimization techniques

## 1. Understanding Components & Props

### Component Types

1. Function Components (Recommended)

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

2. Class Components (Legacy)

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Props

Props are like arguments for components:

```jsx
// Component definition
function UserCard({ name, role, imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

// Using the component
<UserCard name="John Doe" role="Developer" imageUrl="john.jpg" />;
```

## 🔍 **Knowledge Checkpoint 1**

Before continuing, make sure you understand:

1. **What's the difference between function and class components?**
2. **How do you pass multiple props to a component?**
3. **Can props be modified inside a component? Why or why not?**

_💡 Props are read-only - think of them as the "settings" for your component._

---

## 2. Managing State

### Using useState

```jsx
function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Using useEffect

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when userId changes
    // Mock API for testing: https://dummyjson.com/users/${userId}
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## 🔍 **Knowledge Checkpoint 2**

Test your understanding of state management:

1. **When should you use useState vs useEffect?**
2. **What happens if you forget the dependency array in useEffect?**
3. **Why is it important to not mutate state directly?**

_💡 State changes trigger re-renders, but only if React detects the change!_

---

## 3. Building Reusable Components

### 1. Button Component

```jsx
function Button({ children, variant = "primary", onClick }) {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

// Usage
<Button variant="secondary" onClick={() => alert("Clicked!")}>
  Click Me
</Button>;
```

### 2. Input Component

```jsx
function Input({ label, type = "text", value, onChange }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Usage
function Form() {
  const [name, setName] = useState("");

  return <Input label="Your Name" value={name} onChange={setName} />;
}
```

### 3. Card Component

```jsx
function Card({ title, content, footer }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">{content}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Usage
<Card
  title="Welcome"
  content={<p>This is a reusable card component.</p>}
  footer={<Button>Learn More</Button>}
/>;
```

## 4. Creating Custom Hooks

### 1. useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  // Get stored value or initial value
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // Update stored value when state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### 2. useForm

```jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name) => (event) => {
    setValues((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset };
}

// Usage
function SignupForm() {
  const { values, handleChange, reset } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form values:", values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Username"
        value={values.username}
        onChange={handleChange("username")}
      />
      {/* More inputs */}
    </form>
  );
}
```

## Lab Exercises

### Exercise 1: Component Library

Build a basic component library including:

1. Button (primary, secondary, danger variants)
2. Input (text, number, email types)
3. Card (with header, body, footer)
4. Alert (success, warning, error variants)

### Exercise 2: Form Builder

Create a reusable form system with:

1. Form validation
2. Error messages
3. Submit handling
4. Reset functionality

### Exercise 3: Theme Switcher

Build a theme switching system using:

1. Custom hooks
2. Local storage
3. CSS variables
4. Smooth transitions

## Additional Resources

- [React Components](https://react.dev/reference/react/components)
- [React Hooks](https://react.dev/reference/react/hooks)
- [React Patterns](https://reactpatterns.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)

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

If you completed the assessment above and feel comfortable with component architecture, you're ready to move on to [Lesson 3: API Integration & Data Management](../lesson3-data/).

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
