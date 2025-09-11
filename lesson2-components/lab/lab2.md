# Lab 2: Advanced React Components and Composition

## Overview

In this lab, you'll apply component composition patterns and architecture concepts covered in the lesson. Focus on hands-on implementation of reusable component systems.

_For learning objectives and prerequisites, see [../README.md](../README.md)_

## Exercises

### Exercise 1: Component Composition

Create a Card component system using composition:

```jsx
// src/components/Card/Card.jsx
function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

// Card subcomponents
Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
};

Card.Footer = function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>;
};

export default Card;
```

Usage example:

```jsx
<Card className="product-card">
  <Card.Header>
    <h2>Product Title</h2>
  </Card.Header>
  <Card.Body>
    <p>Product description goes here...</p>
    <span className="price">$99.99</span>
  </Card.Body>
  <Card.Footer>
    <Button text="Add to Cart" />
  </Card.Footer>
</Card>
```

### Exercise 2: Higher-Order Components

1. Create a withLoading HOC:

```jsx
// src/hoc/withLoading.jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
}

export default withLoading;
```

2. Create a LoadingSpinner component:

```jsx
// src/components/LoadingSpinner/LoadingSpinner.jsx
function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="spinner-inner"></div>
    </div>
  );
}

export default LoadingSpinner;
```

3. Apply the HOC:

```jsx
// src/components/ProductList/ProductList.jsx
const ProductListWithLoading = withLoading(ProductList);

function ProductListContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return <ProductListWithLoading isLoading={isLoading} products={products} />;
}
```

### Exercise 3: Custom Hooks

1. Create a useForm hook:

```jsx
// src/hooks/useForm.js
function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validate()) {
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
```

2. Create a Form component using the hook:

```jsx
// src/components/Form/Form.jsx
function RegistrationForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = (formData) => {
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="Username"
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

### Exercise 4: Context API

1. Create a Theme Context:

```jsx
// src/context/ThemeContext.jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
```

2. Implement theme-aware components:

```jsx
// src/components/ThemedButton/ThemedButton.jsx
function ThemedButton({ children }) {
  const { theme } = useTheme();

  return <button className={`button ${theme}`}>{children}</button>;
}

// src/App.jsx
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />
        <ThemedButton>Click me</ThemedButton>
      </div>
    </ThemeProvider>
  );
}
```

## Bonus Tasks

### 1. Implement Error Boundaries

Create an ErrorBoundary component to handle component errors gracefully:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 2. Create a Portal Modal

Implement a modal component using React Portals:

```jsx
// src/components/Modal/Modal.jsx
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
```

## Submission Requirements

1. GitHub repository containing:

   - Complete source code
   - README.md with setup instructions
   - Component documentation
   - Screenshots/GIFs of components in action

2. Your implementation should demonstrate:
   - Proper component composition
   - Effective use of hooks
   - Context API implementation
   - Error handling
   - Responsive design

## Grading Criteria

- Component Architecture (25%)
- Hook Implementation (25%)
- Context Usage (20%)
- Code Quality (20%)
- Documentation (10%)

## Additional Resources

- [React Composition Docs](https://react.dev/learn/passing-props-to-a-component)
- [React Hooks Guide](https://react.dev/reference/react)
- [Context API Reference](https://react.dev/learn/passing-data-deeply-with-context)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
