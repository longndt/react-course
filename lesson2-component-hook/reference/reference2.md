# Reference - Component Architecture & React Hook

## Table of Contents
1. [Basic Components 🚀](#part-1-basic-components-)
2. [React Hooks Patterns 🎣](#part-2-react-hooks-patterns-)
3. [Custom Hooks 🔧](#part-3-custom-hooks-)
4. [Complete Component Library 📦](#part-4-complete-component-library-)
5. [Complete Form Example 📝](#part-5-complete-form-example-)
6. [Complete App Example 🎯](#part-6-complete-app-example-)

---

## Part 1: Basic Components 🚀

### 1. Simplest Component

```tsx
// src/components/Hello.tsx
function Hello() {
  return <h1>Hello, World!</h1>;
}

export default Hello;
```

---

### 2. Component with Props

```tsx
// src/components/Greeting.tsx
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
    </div>
  );
}

export default Greeting;
```

**Usage:**
```tsx
<Greeting name="Alice" age={25} />
<Greeting name="Bob" />
```

---

### 3. Component with State

```tsx
// src/components/Counter.tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
```

---

### 4. Component with Event Handlers

```tsx
// src/components/ProductCard.tsx
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onBuy: (id: number) => void;
}

function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>

      {product.inStock ? (
        <button onClick={() => onBuy(product.id)}>Buy Now</button>
      ) : (
        <p className="out-of-stock">Out of Stock</p>
      )}
    </div>
  );
}

export default ProductCard;
```

---

## Part 2: React Hooks Patterns 🎣

### useState Examples

```tsx
// Simple types
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);

// Object state
const [user, setUser] = useState({
  name: '',
  email: '',
  age: 0
});

// Update object
setUser(prev => ({ ...prev, name: 'Alice' }));

// Array state
const [items, setItems] = useState<string[]>([]);

// Add item
setItems(prev => [...prev, 'new item']);

// Remove item (by index)
setItems(prev => prev.filter((_, i) => i !== index));

// Update item
setItems(prev => prev.map((item, i) => i === index ? 'updated' : item));
```

---

### useEffect Examples

```tsx
// Run once on mount
useEffect(() => {
  console.log('Component mounted');
}, []);

// Run when dependency changes
useEffect(() => {
  console.log(`Count is now: ${count}`);
}, [count]);

// With cleanup
useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);
  return () => clearInterval(timer);
}, []);
```

---

### Complete Data Fetching Component

```tsx
// src/components/UserList.tsx
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/users');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}

export default UserList;
```

---

## Part 3: Custom Hooks 🔧

### useToggle Hook

```tsx
// src/hooks/useToggle.ts
import { useState } from 'react';

function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

export default useToggle;
```

**Usage:**
```tsx
const { value: isOpen, toggle } = useToggle(false);
<button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</button>
```

---

### useLocalStorage Hook

```tsx
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
```

**Usage:**
```tsx
const [theme, setTheme] = useLocalStorage('theme', 'light');

<button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
  Current: {theme}
</button>
```

---

### useFetch Hook

```tsx
// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
```

**Usage:**
```tsx
const { data, loading, error, refetch } = useFetch<User[]>('/api/users');

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

return (
  <>
    {data?.map(user => <div key={user.id}>{user.name}</div>)}
    <button onClick={refetch}>Refresh</button>
  </>
);
```

---

## Part 4: Complete Component Library 📦

### Button Component

```tsx
// src/components/Button.tsx
import { CSSProperties } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick
}: ButtonProps) {
  const baseStyles: CSSProperties = {
    padding: size === 'small' ? '6px 12px' : size === 'large' ? '12px 24px' : '8px 16px',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontWeight: 500,
  };

  const variantStyles: Record<string, CSSProperties> = {
    primary: { background: '#007bff', color: 'white' },
    secondary: { background: '#6c757d', color: 'white' },
    danger: { background: '#dc3545', color: 'white' },
    success: { background: '#28a745', color: 'white' },
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
```

**Usage:**
```tsx
<Button variant="primary" size="large" onClick={() => alert('Clicked!')}>
  Click Me
</Button>
```

---

### Input Component

```tsx
// src/components/Input.tsx
import { CSSProperties } from 'react';

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  error?: string;
  required?: boolean;
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required = false
}: InputProps) {
  const inputStyles: CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '16px',
    border: `2px solid ${error ? '#dc3545' : '#ddd'}`,
    borderRadius: '4px',
    outline: 'none',
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyles}
        required={required}
      />

      {error && (
        <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
```

**Usage:**
```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<Input
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  placeholder="Enter your email"
  error={error}
  required
/>
```

---

### Card Component

```tsx
// src/components/Card.tsx
import { CSSProperties, ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

function Card({ title, children, footer }: CardProps) {
  const cardStyles: CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={cardStyles}>
      {title && (
        <h3 style={{ marginTop: 0, marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
          {title}
        </h3>
      )}

      <div>{children}</div>

      {footer && (
        <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
```

**Usage:**
```tsx
<Card
  title="User Profile"
  footer={<Button>Edit Profile</Button>}
>
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>
```

---

## Part 5: Complete Form Example 📝

```tsx
// src/components/UserForm.tsx
import { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface FormData {
  name: string;
  email: string;
  age: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
}

interface UserFormProps {
  onSubmit: (data: FormData) => void;
}

function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 0)) {
      newErrors.age = 'Age must be a positive number';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);

    // Reset form
    setFormData({ name: '', email: '', age: '' });
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <Input
        label="Name"
        value={formData.name}
        onChange={(value) => updateField('name', value)}
        placeholder="Enter your name"
        error={errors.name}
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => updateField('email', value)}
        placeholder="Enter your email"
        error={errors.email}
        required
      />

      <Input
        label="Age"
        type="number"
        value={formData.age}
        onChange={(value) => updateField('age', value)}
        placeholder="Enter your age (optional)"
        error={errors.age}
      />

      <Button variant="primary" size="large">
        Submit
      </Button>
    </form>
  );
}

export default UserForm;
```

---

## Part 6: Complete App Example 🎯

```tsx
// src/App.tsx
import { useState } from 'react';
import UserForm from './components/UserForm';
import Card from './components/Card';
import Button from './components/Button';
import useLocalStorage from './hooks/useLocalStorage';

interface User {
  id: number;
  name: string;
  email: string;
  age: string;
}

function App() {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser = { ...userData, id: Date.now() };
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>User Management System</h1>

      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New User'}
        </Button>
      </div>

      {showForm && (
        <Card title="Add New User">
          <UserForm onSubmit={handleAddUser} />
        </Card>
      )}

      <div style={{ marginTop: '30px' }}>
        <h2>Users ({users.length})</h2>

        {users.length === 0 ? (
          <p>No users yet. Add some above!</p>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {users.map(user => (
              <Card
                key={user.id}
                title={user.name}
                footer={
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                }
              >
                <p><strong>Email:</strong> {user.email}</p>
                {user.age && <p><strong>Age:</strong> {user.age}</p>}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```


