# Lesson 2: Working with React Components & State

## Overview
In this lesson, you'll learn how to create and manage React components, handle state, and build reusable component libraries. We'll focus on practical examples and best practices.

## Learning Objectives
After this lesson, you will be able to:
- Create complex React components
- Manage component state effectively
- Build reusable component libraries
- Use custom hooks for logic reuse
- Handle forms and user input

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
<UserCard
  name="John Doe"
  role="Developer"
  imageUrl="john.jpg"
/>
```

## 2. Managing State

### Using useState
```jsx
function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
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
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
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

## 3. Building Reusable Components

### 1. Button Component
```jsx
function Button({ children, variant = 'primary', onClick }) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Usage
<Button variant="secondary" onClick={() => alert('Clicked!')}>
  Click Me
</Button>
```

### 2. Input Component
```jsx
function Input({ label, type = 'text', value, onChange }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

// Usage
function Form() {
  const [name, setName] = useState('');

  return (
    <Input
      label="Your Name"
      value={name}
      onChange={setName}
    />
  );
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
      <div className="card-body">
        {content}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

// Usage
<Card
  title="Welcome"
  content={<p>This is a reusable card component.</p>}
  footer={<Button>Learn More</Button>}
/>
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
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
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
    setValues(prev => ({
      ...prev,
      [name]: event.target.value
    }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset };
}

// Usage
function SignupForm() {
  const { values, handleChange, reset } = useForm({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form values:', values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Username"
        value={values.username}
        onChange={handleChange('username')}
      />
      {/* More inputs */}
    </form>
  );
}
```

## Lab Exercises

### Exercise 1: Component Library (45 minutes)
Build a basic component library including:
1. Button (primary, secondary, danger variants)
2. Input (text, number, email types)
3. Card (with header, body, footer)
4. Alert (success, warning, error variants)

### Exercise 2: Form Builder (45 minutes)
Create a reusable form system with:
1. Form validation
2. Error messages
3. Submit handling
4. Reset functionality

### Exercise 3: Theme Switcher (30 minutes)
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
