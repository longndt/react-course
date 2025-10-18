# Lesson 1 Demo: React Fundamentals & Project Setup

This demo project showcases React fundamentals with JavaScript, demonstrating component creation, JSX syntax, styling, and event handling.

## Project Structure

```
example/
├── src/
│   ├── components/
│   │   ├── Welcome.jsx          # Basic component with props
│   │   ├── Counter.jsx          # State management with useState
│   │   ├── UserProfile.jsx      # Complex component with JavaScript
│   │   └── Button.jsx           # Reusable button component
│   ├── styles/
│   │   ├── App.css              # Global styles
│   │   └── components.css       # Component-specific styles
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Application entry point
│   └── vite-env.d.ts           # Vite type definitions
├── public/
│   └── vite.svg                 # Vite logo
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── readme.md                   # This file
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

**Your app will open at:** `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
npm run preview
```

## Example Demonstrated

### 1. Welcome Component
**File:** `src/components/Welcome.jsx`

- Basic component structure
- Props with JavaScript objects
- Conditional rendering
- Event handling

```jsx
function Welcome({ name, age, onGreet }) {
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
      {onGreet && (
        <button onClick={onGreet} className="btn btn-primary">
          Say Hello
        </button>
      )}
    </div>
  );
}
```

### 2. Counter Component
**File:** `src/components/Counter.jsx`

- State management with `useState`
- Event handlers
- JavaScript state handling

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div className="buttons">
        <button onClick={decrement} className="btn btn-secondary">
          -
        </button>
        <button onClick={reset} className="btn btn-danger">
          Reset
        </button>
        <button onClick={increment} className="btn btn-primary">
          +
        </button>
      </div>
    </div>
  );
}
```

### 3. User Profile Component
**File:** `src/components/UserProfile.jsx`

- Complex component with multiple props
- Form handling
- JavaScript objects
- Conditional rendering

```jsx
import { useState } from 'react';

function UserProfile({ user, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong>
            <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </p>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
```

### 4. Reusable Button Component
**File:** `src/components/Button.jsx`

- Reusable component with variants
- JavaScript props handling
- CSS classes and styling

```jsx
function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}) {
  const className = `btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

## Key Learning Points

### JavaScript Integration
- Component props with JavaScript objects
- State management with `useState`
- Event handler functions
- JavaScript expressions in JSX

### React Fundamentals
- Component structure and JSX
- Props and state management
- Event handling patterns
- Conditional rendering

### Styling
- CSS classes and modules
- Component-specific styles
- Responsive design basics
- CSS-in-JS alternatives

### Best Practices
- Component composition
- Reusable components
- JavaScript object handling
- Event handling patterns

## Running Individual Example

Each component can be imported and used independently:

```jsx
// In App.jsx
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import UserProfile from './components/UserProfile';
import Button from './components/Button';

function App() {
  const handleGreet = () => alert('Hello!');
  const handleUpdate = (user) => console.log('Updated:', user);

  return (
    <div className="app">
      <Welcome name="John" age={25} onGreet={handleGreet} />
      <Counter />
      <UserProfile user={userData} onUpdate={handleUpdate} />
      <Button onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </div>
  );
}
```

## Next Steps

1. **Practice**: Modify the components and experiment with different props
2. **Learn More**: Check [Reference Guide](./reference/reference1.md) for quick lookup
3. **Theory**: Read [Theory Guide](./theory/theory1.md) for detailed explanations
4. **Continue**: Move to [Lesson 2](../lesson2-component-hook/) for advanced components and hooks

> **💡 Tip**: Open this project in VS Code for the best JavaScript and React experience with IntelliSense and error checking!