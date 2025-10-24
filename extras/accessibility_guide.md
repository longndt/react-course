# React Accessibility Guide

## Overview

Accessibility (a11y) ensures your React applications are usable by everyone, including people with disabilities. This guide covers essential accessibility patterns and best practices for React development.

## Table of Contents

1. [ARIA Attributes & Roles](#aria-attributes--roles)
2. [Keyboard Navigation](#keyboard-navigation)
3. [Screen Reader Compatibility](#screen-reader-compatibility)
4. [Focus Management](#focus-management)
5. [Color & Contrast](#color--contrast)
6. [Semantic HTML](#semantic-html)
7. [Testing Accessibility](#testing-accessibility)
8. [Common Patterns](#common-patterns)
9. [Tools & Resources](#tools--resources)

---

## ARIA Attributes & Roles

### Basic ARIA Implementation

```tsx
// Accessible button with proper ARIA
function AccessibleButton({ children, onClick, disabled, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
}

// Accessible form with proper labeling
function AccessibleForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <form>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={error ? "email-error" : undefined}
          aria-invalid={!!error}
        />
        {error && (
          <div id="email-error" role="alert" aria-live="polite">
            {error}
          </div>
        )}
      </div>
    </form>
  );
}
```

### ARIA Live Regions

```tsx
// Announce dynamic content changes
function NotificationBanner({ message, type }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`notification ${type}`}
    >
      {message}
    </div>
  );
}

// Status updates
function StatusUpdate({ status }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {status}
    </div>
  );
}
```

---

## Keyboard Navigation

### Focus Management

```tsx
import { useRef, useEffect } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement>(null);
  const lastFocusableRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus first element when modal opens
      firstFocusableRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab: focus previous element
        if (document.activeElement === firstFocusableRef.current) {
          lastFocusableRef.current?.focus();
          e.preventDefault();
        }
      } else {
        // Tab: focus next element
        if (document.activeElement === lastFocusableRef.current) {
          firstFocusableRef.current?.focus();
          e.preventDefault();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      className="modal"
    >
      <button
        ref={firstFocusableRef}
        onClick={onClose}
        aria-label="Close modal"
      >
        ×
      </button>
      {children}
      <button
        ref={lastFocusableRef}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
```

### Custom Hook for Focus Management

```tsx
function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}
```

---

## Screen Reader Compatibility

### Proper Labeling

```tsx
// Good: Explicit labeling
function SearchInput() {
  return (
    <div>
      <label htmlFor="search">Search products</label>
      <input
        id="search"
        type="search"
        placeholder="Enter search term"
        aria-describedby="search-help"
      />
      <div id="search-help">
        Search by product name, category, or description
      </div>
    </div>
  );
}

// Good: Implicit labeling
function SearchInputImplicit() {
  return (
    <label>
      Search products
      <input
        type="search"
        placeholder="Enter search term"
        aria-describedby="search-help"
      />
      <div id="search-help">
        Search by product name, category, or description
      </div>
    </label>
  );
}
```

### Descriptive Text

```tsx
// Provide context for screen readers
function ProductCard({ product }) {
  return (
    <article>
      <h3>{product.name}</h3>
      <img
        src={product.image}
        alt={`${product.name} - ${product.description}`}
      />
      <p>{product.description}</p>
      <div>
        <span className="sr-only">Price: </span>
        <span aria-label={`${product.price} dollars`}>
          ${product.price}
        </span>
      </div>
      <button
        aria-label={`Add ${product.name} to cart`}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </article>
  );
}
```

---

## Focus Management

### Focus Restoration

```tsx
function useFocusRestoration() {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const saveFocus = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  };

  const restoreFocus = () => {
    previousFocusRef.current?.focus();
  };

  return { saveFocus, restoreFocus };
}

// Usage in modal
function Modal({ isOpen, onClose, children }) {
  const { saveFocus, restoreFocus } = useFocusRestoration();

  useEffect(() => {
    if (isOpen) {
      saveFocus();
    } else {
      restoreFocus();
    }
  }, [isOpen, saveFocus, restoreFocus]);

  // ... rest of modal implementation
}
```

---

## Color & Contrast

### Color Contrast Guidelines

```tsx
// Ensure sufficient color contrast
function AccessibleButton({ variant, children }) {
  const styles = {
    primary: {
      backgroundColor: '#2563eb', // Blue with 4.5:1 contrast
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#f3f4f6', // Light gray
      color: '#1f2937', // Dark gray with 4.5:1 contrast
    },
    danger: {
      backgroundColor: '#dc2626', // Red with 4.5:1 contrast
      color: '#ffffff',
    }
  };

  return (
    <button
      style={styles[variant]}
      className="accessible-button"
    >
      {children}
    </button>
  );
}
```

### Don't Rely on Color Alone

```tsx
// Bad: Only using color to convey information
function BadStatusIndicator({ status }) {
  return (
    <span style={{ color: status === 'error' ? 'red' : 'green' }}>
      {status}
    </span>
  );
}

// Good: Using multiple indicators
function GoodStatusIndicator({ status }) {
  const isError = status === 'error';
  
  return (
    <span
      style={{ 
        color: isError ? '#dc2626' : '#059669',
        fontWeight: 'bold'
      }}
      aria-label={`Status: ${status}`}
    >
      {isError ? '❌' : '✅'} {status}
    </span>
  );
}
```

---

## Semantic HTML

### Proper HTML Structure

```tsx
// Use semantic HTML elements
function ArticlePage({ article }) {
  return (
    <article>
      <header>
        <h1>{article.title}</h1>
        <time dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
        <address>
          By <a href={`/author/${article.author.id}`}>
            {article.author.name}
          </a>
        </address>
      </header>
      
      <main>
        <section>
          <h2>Summary</h2>
          <p>{article.summary}</p>
        </section>
        
        <section>
          <h2>Content</h2>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </section>
      </main>
      
      <aside>
        <h3>Related Articles</h3>
        <nav aria-label="Related articles">
          <ul>
            {article.related.map(related => (
              <li key={related.id}>
                <a href={`/article/${related.id}`}>
                  {related.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      <footer>
        <p>Published on {formatDate(article.publishedAt)}</p>
      </footer>
    </article>
  );
}
```

---

## Testing Accessibility

### Using React Testing Library

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('modal is accessible', async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  
  render(
    <Modal isOpen={true} onClose={onClose}>
      <h2>Test Modal</h2>
      <p>Modal content</p>
    </Modal>
  );

  // Check if modal is announced to screen readers
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  
  // Check if modal is modal
  expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  
  // Test keyboard navigation
  await user.keyboard('{Escape}');
  expect(onClose).toHaveBeenCalled();
  
  // Test focus management
  const closeButton = screen.getByLabelText('Close modal');
  expect(closeButton).toHaveFocus();
});
```

### Using axe-core

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Common Patterns

### Accessible Data Table

```tsx
function AccessibleDataTable({ data, columns }) {
  return (
    <table role="table" aria-label="Product data">
      <caption>Product information table</caption>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key} scope="col">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id}>
            {columns.map(column => (
              <td key={column.key}>
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Accessible Form Validation

```tsx
function AccessibleForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    if (name === 'email' && !value.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    } else {
      delete newErrors.email;
    }
    
    setErrors(newErrors);
  };

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            validateField('email', e.target.value);
          }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <div id="email-error" role="alert">
            {errors.email}
          </div>
        )}
      </div>
    </form>
  );
}
```

---

## Tools & Resources

### Development Tools

1. **axe DevTools**- Browser extension for accessibility testing
2. **WAVE**- Web accessibility evaluation tool
3. **Lighthouse**- Built-in Chrome accessibility audit
4. **React Testing Library**- Accessible testing utilities
5. **jest-axe**- Automated accessibility testing

### Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility Documentation](https://reactjs.org/docs/accessibility.html)
- [WebAIM Resources](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

### Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Focus indicators are visible
- [ ] Form labels are properly associated
- [ ] ARIA attributes are used correctly
- [ ] Page has proper heading structure
- [ ] Dynamic content changes are announced
- [ ] No content relies solely on color
- [ ] Screen reader testing completed

---

**Remember** Accessibility is not optional - it's a fundamental requirement for creating inclusive web applications that everyone can use.
