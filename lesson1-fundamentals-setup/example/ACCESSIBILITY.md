# Accessibility Guide for Lab 1

## Overview

This guide demonstrates accessibility best practices implemented in the Lab 1 examples. These patterns ensure your React applications are usable by everyone, including users with disabilities.

## Key Accessibility Features

### 1. Semantic HTML Structure

```tsx
// ✅ Good: Semantic HTML with proper roles
<header role="banner">
  <h1>React Fundamentals Demo</h1>
</header>

<main role="main">
  <section aria-labelledby="welcome-heading">
    <h2 id="welcome-heading">1. Welcome Component</h2>
  </section>
</main>

<footer role="contentinfo">
  <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
</footer>
```

### 2. ARIA Labels and Descriptions

```tsx
// ✅ Good: Descriptive ARIA labels
<Button 
  onClick={handleClick}
  ariaLabel="Primary action button"
  ariaDescribedBy="button-description"
>
  Primary Button
</Button>

<div id="button-description">
  This button performs the main action on the page
</div>
```

### 3. Form Accessibility

```tsx
// ✅ Good: Proper form labeling
<div className="form-group">
  <label htmlFor="username">Username:</label>
  <input
    type="text"
    id="username"
    name="username"
    aria-required="true"
    aria-describedby="username-help"
  />
  <div id="username-help">
    Enter your username (3-20 characters)
  </div>
</div>
```

### 4. Button Accessibility

```tsx
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  // Accessibility props
  ariaLabel?: string;
  ariaDescribedBy?: string;
  type?: 'button' | 'submit' | 'reset';
  role?: string;
}

function Button({ 
  children, 
  onClick, 
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  type = 'button',
  role 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
```

## ARIA Attributes Reference

### Common ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Provides accessible name | `aria-label="Close dialog"` |
| `aria-labelledby` | References element that labels this one | `aria-labelledby="section-title"` |
| `aria-describedby` | References element that describes this one | `aria-describedby="help-text"` |
| `aria-required` | Indicates required form field | `aria-required="true"` |
| `aria-disabled` | Indicates disabled state | `aria-disabled="true"` |
| `aria-expanded` | Indicates expandable state | `aria-expanded="false"` |
| `aria-hidden` | Hides decorative elements | `aria-hidden="true"` |

### Semantic Roles

| Role | Purpose | Example |
|------|---------|---------|
| `banner` | Main site header | `<header role="banner">` |
| `main` | Main content area | `<main role="main">` |
| `contentinfo` | Site footer | `<footer role="contentinfo">` |
| `navigation` | Navigation menu | `<nav role="navigation">` |
| `complementary` | Sidebar content | `<aside role="complementary">` |
| `group` | Related form controls | `<div role="group">` |

## Testing Accessibility

### 1. Keyboard Navigation
- Tab through all interactive elements
- Ensure focus is visible
- Check tab order is logical

### 2. Screen Reader Testing
- Use browser dev tools accessibility panel
- Test with actual screen readers (NVDA, JAWS, VoiceOver)
- Verify all content is announced correctly

### 3. Color Contrast
- Ensure sufficient contrast ratios (4.5:1 for normal text)
- Don't rely solely on color to convey information

### 4. Automated Testing
```bash
# Install accessibility testing tools
npm install --save-dev @testing-library/jest-axe

# Add to your test files
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Common Accessibility Mistakes

### ❌ Bad Examples

```tsx
// Bad: No accessible name
<button onClick={handleClick}>
  <span className="icon">×</span>
</button>

// Bad: Missing form labels
<input type="text" name="email" />

// Bad: No semantic structure
<div>
  <div>Header</div>
  <div>Content</div>
</div>
```

### ✅ Good Examples

```tsx
// Good: Accessible button with label
<button 
  onClick={handleClick}
  aria-label="Close dialog"
>
  <span className="icon" aria-hidden="true">×</span>
</button>

// Good: Proper form labeling
<label htmlFor="email">Email:</label>
<input 
  type="email" 
  id="email" 
  name="email" 
  required 
/>

// Good: Semantic structure
<header>
  <h1>Page Title</h1>
</header>
<main>
  <section>
    <h2>Content Section</h2>
  </section>
</main>
```

## Resources

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility Documentation](https://reactjs.org/docs/accessibility.html)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [axe-core Testing Library](https://github.com/dequelabs/axe-core)

## Next Steps

1. Apply these patterns to your own components
2. Test with keyboard navigation
3. Use browser accessibility tools
4. Consider users with different abilities
5. Make accessibility a habit, not an afterthought

Remember: **Accessibility is not optional**- it's a fundamental requirement for creating inclusive web applications.
