# Lab 2: Advanced React Components and Composition

## Overview

In this lab, you'll apply component composition patterns and architecture concepts covered in the lesson. Focus on hands-on implementation of reusable component systems.

_For learning objectives and prerequisites, see [../readme.md](../readme.md)_

## Pre-Lab Checklist

- [ ] Lab 1 completed successfully
- [ ] Node.js v18+ and npm installed
- [ ] VS Code with React extensions
- [ ] Basic TypeScript understanding
- [ ] React hooks knowledge from previous lessons

## Exercises

### Exercise 1: Component Composition

**💡 Architecture Note:** We'll use TypeScript for better development experience and type safety, consistent with Lab 1.

Create a Card component system using composition:

```tsx
// src/components/Card/Card.tsx
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardSubComponentProps {
  children: ReactNode;
}
function Card({ children, className = "" }: CardProps) {
  return <div className={`card ${className}`}>{children}</div>;
}

// Card subcomponents with TypeScript
Card.Header = function CardHeader({ children }: CardSubComponentProps) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }: CardSubComponentProps) {
  return <div className="card-body">{children}</div>;
};

Card.Footer = function CardFooter({ children }: CardSubComponentProps) {
  return <div className="card-footer">{children}</div>;
};

export default Card;
```

Usage example:

```tsx
<Card className="product-card">
  <Card.Header>
    <h2>Product Title</h2>
  </Card.Header>
  <Card.Body>
    <p>Product description goes here...</p>
    <span className="price">$99.99</span>
  </Card.Body>
  <Card.Footer>
    <ThemedButton onClick={() => alert("Add to Cart clicked!")}>
      Add to Cart
    </ThemedButton>
  </Card.Footer>
</Card>
```

### Exercise 2: Higher-Order Components

1. Create a withLoading HOC:

```tsx
// src/hoc/withLoading.tsx
import React from 'react';

interface WithLoadingProps {
  isLoading: boolean;
}

function withLoading<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithLoadingComponent({ isLoading, ...props }: WithLoadingProps & P) {
    if (isLoading) {
      return (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      );
    }
    return <WrappedComponent {...props as P} />;
  };
}

export default withLoading;
```

2. Create a LoadingSpinner component:

```tsx
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

```tsx
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

```tsx
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

```tsx
// src/components/Form/Form.tsx
import useForm from "../../hooks/useForm";
import { ThemedButton } from "../ThemedComponents/ThemedComponents";

function RegistrationForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = (formData: Record<string, string>) => {
    console.log("Form submitted:", formData);
    alert("Registration successful!");
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

      <ThemedButton onClick={handleSubmit(onSubmit)}>
        Register
      </ThemedButton>
    </form>
  );
}

// Example ProductList with ThemedButton
interface Product {
  id: number;
  name: string;
  price: number;
}

function ProductList() {
  const products: Product[] = [
    { id: 1, name: "Product 1", price: 99.99 },
    { id: 2, name: "Product 2", price: 149.99 },
  ];

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <ThemedButton onClick={() => handleAddToCart(product)}>
            Add to Cart
          </ThemedButton>
        </div>
      ))}
    </div>
  );
}
```

### Exercise 4: Context API

1. Create a Theme Context:

```tsx
// src/context/ThemeContext.tsx
import { createContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>("light");

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

```tsx
// src/components/ThemedComponents/ThemedComponents.tsx
import { ReactNode } from "react";
import { useTheme } from "../../context/ThemeContext";

interface ThemedButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export function ThemedButton({ children, onClick }: ThemedButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      className={`theme-button ${theme}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

// src/App.tsx
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />
        <ThemedButton onClick={() => alert("Button clicked!")}>
          Click me
        </ThemedButton>
      </div>
    </ThemeProvider>
  );
}
```

## Bonus Tasks

### 1. Implement Error Boundaries

Create an ErrorBoundary component to handle component errors gracefully:

```tsx
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

```tsx
// src/components/Modal/Modal.tsx
import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
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

## Modern CSS Styling Guidelines

### Enhanced Visual Design

This lab features modern CSS with the following improvements:

1. **Gradient Backgrounds**: Beautiful gradient backgrounds for headers and cards
2. **Glass Morphism Effects**: Semi-transparent backgrounds with backdrop filters
3. **Enhanced Shadows**: Multi-layered shadows for depth and dimension
4. **Smooth Animations**: Cubic-bezier transitions for professional feel
5. **Improved Typography**: Better font sizing and spacing for readability
6. **Dark Mode Support**: Complete theme switching with consistent styling across all components

### Key CSS Features

```css
/* Modern gradient header */
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Glass morphism cards */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

/* Demo sections with backdrop blur */
.demo-section {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Theme-aware buttons */
.theme-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-button.light {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.theme-button.dark {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  color: #e2e8f0;
}

/* Dark mode support for custom buttons */
.theme-dark .btn-primary {
  background: #4299e1;
  color: white;
}

.theme-dark .btn-secondary {
  background: #4a5568;
  color: #e2e8f0;
}
```

### Responsive Design

The layout is optimized for desktop computers with:
- Larger max-width (1400px)
- Enhanced spacing and padding
- Improved grid layouts
- Better hover effects
- Professional color schemes

## Final Project Structure 📁

After completing all exercises in Lab 2, your project should have the following structure:

```
advanced-components/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.css
│   │   ├── ErrorBoundary/
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── ErrorBoundary.css
│   │   ├── Form/
│   │   │   ├── RegistrationForm.tsx
│   │   │   └── RegistrationForm.css
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.css
│   │   ├── ThemedComponents/
│   │   │   ├── ThemedButton.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── ThemedComponents.css
│   │   └── ProductList/
│   │       ├── ProductList.tsx
│   │       ├── ProductItem.tsx
│   │       └── ProductList.css
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── hoc/
│   │   └── withLoading.tsx
│   ├── hooks/
│   │   ├── useForm.ts
│   │   ├── useLocalStorage.ts
│   │   └── useToggle.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── readme.md
```

### Key Features Implemented:

#### **Component Composition Patterns:**
- ✅ **Card System**: Compound components (Card.Header, Card.Body, Card.Footer)
- ✅ **Modal Portal**: Using React Portals for overlay rendering
- ✅ **Flexible Layout**: Composable components with children props

#### **Advanced State Management:**
- ✅ **Context API**: Theme management with ThemeProvider and useTheme hook
- ✅ **Custom Hooks**: Reusable logic for forms, localStorage, and toggles
- ✅ **Higher-Order Components**: withLoading HOC for loading states

#### **Professional Patterns:**
- ✅ **Error Boundaries**: Graceful error handling and recovery
- ✅ **Type Safety**: Comprehensive TypeScript interfaces
- ✅ **Modern CSS**: Glass morphism effects, gradients, and animations

#### **Interactive Features:**
- ✅ **Theme Switching**: Light/dark mode with context persistence and complete UI consistency
- ✅ **Form Validation**: Custom useForm hook with error handling
- ✅ **Modal Management**: Portal-based modals with backdrop click handling
- ✅ **Loading States**: HOC pattern for async operations
- ✅ **Clickable Buttons**: All buttons fully functional with onClick handlers
- ✅ **Product Interactions**: Add to Cart functionality with alerts and console logging

### Expected Functionality:
1. **Component Showcase**: Interactive demos of all component patterns
2. **Theme System**: Seamless light/dark mode switching across ALL components (including buttons)
3. **Form Handling**: Registration form with validation and error states
4. **Modal Interactions**: Product details modal with smooth animations
5. **Error Recovery**: Error boundaries with retry functionality
6. **Professional UI**: Modern design with glass morphism and smooth transitions
7. **Button Interactivity**: All buttons respond to clicks with appropriate actions

## Common Issues and Solutions 🔧

### Issue 1: Buttons Not Clickable
**Problem**: Buttons don't respond to clicks
**Solution**: Ensure all button components have `onClick` props properly defined
```tsx
// ❌ Wrong
<ThemedButton>Click me</ThemedButton>

// ✅ Correct
<ThemedButton onClick={() => alert("Clicked!")}>Click me</ThemedButton>
```

### Issue 2: Theme Not Applying to All Components
**Problem**: Some buttons don't change color when switching themes
**Solution**: Use `ThemedButton` component instead of plain buttons with className
```tsx
// ❌ Wrong - won't switch themes automatically
<button className="btn-primary">Add to Cart</button>

// ✅ Correct - theme-aware component
<ThemedButton onClick={handleClick}>Add to Cart</ThemedButton>
```

### Issue 3: Import Path Errors
**Problem**: Module not found errors for hooks or context
**Solution**: Use correct relative paths based on file structure
```tsx
// From: src/components/Form/Form.tsx
import useForm from "../../hooks/useForm";  // ✅ Correct
import useForm from "../hooks/useForm";     // ❌ Wrong

// From: src/components/ThemedComponents/ThemedComponents.tsx
import { useTheme } from "../../context/ThemeContext";  // ✅ Correct
import { useTheme } from "../context/ThemeContext";     // ❌ Wrong
```

### Issue 4: Missing Configuration Files
**Problem**: TypeScript or Vite errors on startup
**Solution**: Ensure you have all required config files:
- `vite.config.ts` - Vite configuration with React plugin
- `tsconfig.json` - TypeScript compiler options
- `tsconfig.node.json` - TypeScript config for Node environment

### Issue 5: Dark Mode CSS Not Working
**Problem**: Custom buttons (btn-primary, btn-secondary) don't change in dark mode
**Solution**: Add dark mode CSS rules
```css
.theme-dark .btn-primary {
  background: #4299e1;
  color: white;
}

.theme-dark .btn-secondary {
  background: #4a5568;
  color: #e2e8f0;
}
```

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

