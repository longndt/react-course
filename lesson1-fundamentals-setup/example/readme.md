# Lesson 1 Demo: React Fundamentals & Project Setup

This demo project showcases React fundamentals with TypeScript, demonstrating component creation, TSX syntax, styling, and event handling.

## Project Structure

```
example/
├── src/
│   ├── components/
│   │   ├── Welcome.tsx          # Basic component with props
│   │   ├── Counter.tsx          # State management with useState
│   │   ├── UserProfile.tsx      # Complex component with TypeScript
│   │   └── Button.tsx           # Reusable button component
│   ├── styles/
│   │   ├── App.css              # Global styles
│   │   └── components.css       # Component-specific styles
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── vite-env.d.ts           # Vite type definitions
├── public/
│   └── vite.svg                 # Vite logo
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
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

**Your app will open at:**`http://localhost:5173`

### 3. Build for Production

```bash
npm run build
npm run preview
```

## Example Demonstrated

### 1. Welcome Component
**File:**`src/components/Welcome.tsx`

- Basic component structure
- Props with TypeScript interfaces
- Conditional rendering
- Event handling

```tsx
interface WelcomeProps {
  name: string;
  age?: number;
  onGreet?: () => void;
}

function Welcome({ name, age, onGreet }: WelcomeProps) {
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
      {onGreet && (
        <button onClick={onGreet}>
          Say Hello
        </button>
      )}
    </div>
  );
}
```

### 2. Counter Component
**File:**`src/components/Counter.tsx`

- State management with `useState`
- Event handlers
- TypeScript state typing

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}
```

### 3. User Profile Component
**File:**`src/components/UserProfile.tsx`

- Complex component with multiple props
- Form handling
- TypeScript interfaces
- Conditional rendering

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

function UserProfile({ user, onUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
```

### 4. Reusable Button Component
**File:**`src/components/Button.tsx`

- Reusable component with variants
- TypeScript props interface
- CSS classes and styling

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
  disabled?: boolean;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}: ButtonProps) {
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

### TypeScript Integration
- Component props with interfaces
- State typing with `useState<T>`
- Event handler types
- Type safety throughout

### React Fundamentals
- Component structure and JSX/TSX
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
- TypeScript interfaces
- Event handling patterns

## Running Individual Example

Each component can be imported and used independently:

```tsx
// In App.tsx
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import UserProfile from './components/UserProfile';
import Button from './components/Button';

function App() {
  const handleGreet = () => alert('Hello!');
  const handleUpdate = (user: User) => console.log('Updated:', user);

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

1. **Practice** Modify the components and experiment with different props
2. **Learn More** Check [Reference Guide](./reference/reference1.md) for quick lookup
3. **Theory** Read [Theory Guide](./theory/theory1.md) for detailed explanations
4. **Continue** Move to [Lesson 2](../lesson2-component-hook/) for advanced components and hooks

> **💡 Tip** Open this project in VS Code for the best TypeScript and React experience with IntelliSense and error checking!