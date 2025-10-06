# Reference - Component Architecture & React Hook

## Table of Contents
1. [Basic Components ](#part-1-basic-components-)
2. [React Hooks Patterns 🎣](#part-2-react-hooks-patterns-)
3. [Custom Hooks ](#part-3-custom-hooks-)
4. [Complete Component Library ](#part-4-complete-component-library-)
5. [Complete Form Example ](#part-5-complete-form-example-)
6. [Complete App Example ](#part-6-complete-app-example-)

---

## Part 1: Basic Components

### 1. Simplest Component

```jsx
// src/components/Hello.jsx
function Hello() {
  return <h1>Hello, World!</h1>;
}

export default Hello;
```

---

### 2. Component with Props

```jsx
// src/components/Greeting.jsx
import PropTypes from 'prop-types';

function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
    </div>
  );
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};

export default Greeting;
```

**Usage:**
```jsx
import React from 'react';
import Greeting from './Greeting';

function App() {
  return (
    <div>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" />
    </div>
  );
}

export default App;
```

---

### 3. Component with State

```jsx
// src/components/Counter.jsx
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

```jsx
// src/components/ProductCard.jsx
import PropTypes from 'prop-types';

// Product shape: { id, name, price, inStock }

function ProductCard({ product, onBuy }) {
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

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inStock: PropTypes.bool.isRequired
  }).isRequired,
  onBuy: PropTypes.func.isRequired
};

export default ProductCard;
```

---

## Part 2: React Hooks Patterns 🎣

### useState Examples

```jsx
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
const [items, setItems] = useState([]);

// Add item
setItems(prev => [...prev, 'new item']);

// Remove item (by index)
setItems(prev => prev.filter((_, i) => i !== index));

// Update item
setItems(prev => prev.map((item, i) => i === index ? 'updated' : item));
```

---

### useEffect Examples

```jsx
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

```jsx
// src/components/UserList.jsx
import { useState, useEffect } from 'react';

// User shape: { id, name, email }

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

## Part 3: Custom Hooks

### useToggle Hook

```jsx
// src/hooks/useToggle.js
import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

export default useToggle;
```

**Usage:**
```jsx
import React from 'react';
import useToggle from '../hooks/useToggle';

function ToggleDemo() {
  const { value: isOpen, toggle } = useToggle(false);

  return (
    <button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</button>
  );
}

export default ToggleDemo;
```

---

### useLocalStorage Hook

```jsx
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
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

  return [value, setValue];
}

export default useLocalStorage;
```

**Usage:**
```jsx
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}

export default ThemeToggle;
```

---

### useFetch Hook

```jsx
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

// Returns: { data, loading, error, refetch }

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
```jsx
import React from 'react';
import useFetch from '../hooks/useFetch';

function UserList() {
  const { data, loading, error, refetch } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {data?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={refetch}>Refresh</button>
    </>
  );
}

export default UserList;
```

---

## Part 4: Complete Component Library

### Button Component

```jsx
// src/components/Button.jsx
import PropTypes from 'prop-types';

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick
}) {
  const baseStyles = {
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false
};

export default Button;
```

**Usage:**
```jsx
import React from 'react';
import Button from './Button';

function ButtonDemo() {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Clicked!')}>
      Click Me
    </Button>
  );
}

export default ButtonDemo;
```

---

### Input Component

```jsx
// src/components/Input.jsx
import PropTypes from 'prop-types';

function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required = false
}) {
  const inputStyles = {
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

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool
};

Input.defaultProps = {
  type: 'text',
  required: false
};

export default Input;
```

**Usage:**
```jsx
import React, { useState } from 'react';
import Input from './Input';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={setEmail}
      placeholder="Enter your email"
      error={error}
      required
    />
  );
}

export default EmailForm;
```

---

### Card Component

```jsx
// src/components/Card.jsx
import PropTypes from 'prop-types';

function Card({ title, children, footer }) {
  const cardStyles = {
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

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
};

export default Card;
```

**Usage:**
```jsx
import React from 'react';
import Card from './Card';
import Button from './Button';

function ProfileCard() {
  return (
    <Card
      title="User Profile"
      footer={<Button>Edit Profile</Button>}
    >
      <p>Name: John Doe</p>
      <p>Email: john@example.com</p>
    </Card>
  );
}

export default ProfileCard;
```

---

## Part 5: Complete Form Example

```jsx
// src/components/UserForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';

// FormData shape: { name, email, age }
// FormErrors shape: { name?, email?, age? }

function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

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

  const handleSubmit = (e) => {
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

  const updateField = (field, value) => {
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

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default UserForm;
```

---

## Part 6: Complete App Example

```jsx
// src/App.jsx
import { useState } from 'react';
import UserForm from './components/UserForm';
import Card from './components/Card';
import Button from './components/Button';
import useLocalStorage from './hooks/useLocalStorage';

// User shape: { id, name, email, age }

function App() {
  const [users, setUsers] = useLocalStorage('users', []);
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const handleDeleteUser = (id) => {
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


