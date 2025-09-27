# Quick Start Guide - Lesson 2

## Build Your First Component Library

### 1. Setup From Previous Lesson

```bash
# Continue with your React app from Lesson 1 or create new
cd my-react-app  # or create new with: npm create vite@latest

# Make sure you're running
npm run dev
```

### 2. Create a Button Component

Create `src/components/Button.jsx`:

```javascript
import { useState } from "react";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    if (onClick) onClick();
  };

  return (
    <button
      className={`btn btn-${variant} btn-${size} ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
```

### 3. Add Button Styles

Create `src/components/Button.css`:

```css
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.clicked {
  transform: scale(0.98);
}

/* Variants */
.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

/* Sizes */
.btn-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.btn-large {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
```

### 4. Create a Form Component

Create `src/components/UserForm.jsx`:

```javascript
import { useState } from "react";
import Button from "./Button";

function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "developer",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
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
    if (onSubmit) {
      onSubmit(formData);
    }

    // Reset form
    setFormData({ name: "", email: "", role: "developer" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "20px" }}>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            border: errors.name ? "2px solid red" : "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.name && (
          <span style={{ color: "red", fontSize: "0.8em" }}>{errors.name}</span>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            border: errors.email ? "2px solid red" : "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.email && (
          <span style={{ color: "red", fontSize: "0.8em" }}>
            {errors.email}
          </span>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
          <option value="student">Student</option>
        </select>
      </div>

      <Button type="submit" variant="primary" size="large">
        Add User
      </Button>
    </form>
  );
}

export default UserForm;
```

### 5. Use Components in App

Update `src/App.jsx`:

```javascript
import { useState } from "react";
import Button from "./components/Button";
import UserForm from "./components/UserForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = (userData) => {
    setUsers((prev) => [...prev, { ...userData, id: Date.now() }]);
    setShowForm(false);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="App">
      <h1>User Management System</h1>

      <div style={{ marginBottom: "20px" }}>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add New User"}
        </Button>
      </div>

      {showForm && <UserForm onSubmit={handleAddUser} />}

      <div style={{ marginTop: "30px" }}>
        <h2>Users ({users.length})</h2>
        {users.length === 0 ? (
          <p>No users yet. Add some!</p>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{user.name}</strong> ({user.email})
                  <br />
                  <small>Role: {user.role}</small>
                </div>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

## 🎉 Congratulations!

You now have:

- ✅ A reusable Button component with variants
- ✅ A UserForm component with validation
- ✅ Component composition patterns
- ✅ Form handling with controlled inputs
- ✅ State management with arrays

## Next Steps

1. Read the full [Lesson 2 README](./readme.md)
2. Complete the lab exercises
3. Try building more complex forms

## Need Help?

- Check the demo code in `./demo/` folder
- Review component patterns in the README
- Experiment with different component props!
