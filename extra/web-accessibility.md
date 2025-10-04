# Web Accessibility Guide for React

## 📋 Table of Contents

- [Overview](#overview)
- [Why Accessibility Matters](#why-accessibility-matters)
- [WCAG Guidelines](#wcag-guidelines)
- [Semantic HTML](#semantic-html)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast & Visual Design](#color-contrast--visual-design)
- [Form Accessibility](#form-accessibility)
- [Testing Tools](#testing-tools)
- [React-Specific Patterns](#react-specific-patterns)
- [Common Issues & Solutions](#common-issues--solutions)
- [Resources](#resources)

---

## Overview

Web accessibility ensures that your React applications are usable by **everyone**, including people with disabilities. This guide covers essential accessibility practices for React developers.

**Target Audience**: ~15-20% of global population has some form of disability
- Visual impairments (blindness, low vision, color blindness)
- Motor impairments (difficulty using mouse/keyboard)
- Hearing impairments
- Cognitive impairments

**Business Benefits**:
- ✅ Larger user base (15-20% more potential users)
- ✅ Legal compliance (ADA, Section 508, WCAG)
- ✅ Better SEO (semantic HTML)
- ✅ Improved UX for everyone

---

## Why Accessibility Matters

### Legal Requirements

**United States**:
- ADA (Americans with Disabilities Act)
- Section 508 for government websites

**Europe**:
- European Accessibility Act (EAA)
- EN 301 549 standard

**Penalties**: Lawsuits, fines up to $75,000+ per violation

### Ethical Responsibility

> *"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect."* - Tim Berners-Lee

### Business Impact

- **Domino's Pizza**: Lost $4M+ in accessibility lawsuit
- **Target**: Paid $6M settlement for inaccessible website
- **Netflix**: Settled for undisclosed amount + committed to captions

---

## WCAG Guidelines

### WCAG 2.1 Levels

**Level A** (Minimum):
- Basic web accessibility
- Must meet for legal compliance

**Level AA** (Standard):
- Recommended for most websites
- Industry standard for compliance

**Level AAA** (Enhanced):
- Highest level of accessibility
- Not required for all content

### Four Principles (POUR)

#### 1. Perceivable
Information must be presentable to users in ways they can perceive.

**Examples**:
- Provide text alternatives for images
- Provide captions for videos
- Ensure sufficient color contrast
- Make content adaptable (responsive)

#### 2. Operable
Interface components must be operable.

**Examples**:
- Keyboard accessible
- Enough time to read/use content
- Don't cause seizures (no flashing > 3 times/sec)
- Navigable (skip links, clear focus)

#### 3. Understandable
Information and UI operation must be understandable.

**Examples**:
- Readable text (language specified)
- Predictable behavior
- Input assistance (error messages)
- Clear labels

#### 4. Robust
Content must be robust enough for assistive technologies.

**Examples**:
- Valid HTML
- Compatible with assistive tech
- Proper ARIA usage

---

## Semantic HTML

### Why Semantic HTML Matters

✅ **Screen readers** understand structure
✅ **Search engines** better indexing
✅ **Keyboard navigation** works automatically
✅ **Default accessibility** features built-in

### Semantic Elements in React

#### ✅ Good: Semantic HTML

```tsx
function Article() {
  return (
    <article>
      <header>
        <h1>Article Title</h1>
        <time dateTime="2025-10-05">October 5, 2025</time>
      </header>

      <section>
        <h2>Section Heading</h2>
        <p>Paragraph content...</p>
      </section>

      <footer>
        <p>Author: John Doe</p>
      </footer>
    </article>
  );
}
```

#### ❌ Bad: Divs for Everything

```tsx
function Article() {
  return (
    <div> {/* Should be <article> */}
      <div> {/* Should be <header> */}
        <div>Article Title</div> {/* Should be <h1> */}
      </div>
      <div>Content...</div> {/* Should be <section> */}
    </div>
  );
}
```

### Common Semantic Elements

| Element | Purpose | When to Use |
|---------|---------|-------------|
| `<header>` | Page/section header | Top of page, article header |
| `<nav>` | Navigation links | Main menu, breadcrumbs |
| `<main>` | Main content | Primary content (one per page) |
| `<article>` | Self-contained content | Blog post, news article |
| `<section>` | Thematic grouping | Chapter, tab panel |
| `<aside>` | Related content | Sidebar, callout |
| `<footer>` | Footer content | Bottom of page/article |
| `<button>` | Clickable action | Actions, form submits |
| `<a>` | Navigation link | Navigate to another page |

---

## ARIA Attributes

### When to Use ARIA

**Rule #1**: Don't use ARIA if you can use semantic HTML
**Rule #2**: Use ARIA when semantic HTML isn't enough
**Rule #3**: Test with actual screen readers

### Essential ARIA Attributes

#### aria-label

Provides accessible name when visible text isn't sufficient.

```tsx
function SearchButton() {
  return (
    <button aria-label="Search products">
      <SearchIcon /> {/* Icon only, no text */}
    </button>
  );
}
```

#### aria-labelledby

References another element for labeling.

```tsx
function Modal({ title, children }) {
  const titleId = useId();

  return (
    <div role="dialog" aria-labelledby={titleId}>
      <h2 id={titleId}>{title}</h2>
      {children}
    </div>
  );
}
```

#### aria-describedby

Provides additional description.

```tsx
function PasswordInput() {
  const hintId = useId();

  return (
    <>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        aria-describedby={hintId}
      />
      <p id={hintId}>Must be at least 8 characters</p>
    </>
  );
}
```

#### aria-live (Live Regions)

Announces dynamic content changes.

```tsx
function Notifications() {
  const [message, setMessage] = useState('');

  return (
    <div
      role="status"
      aria-live="polite" // or "assertive" for urgent
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
```

**aria-live values**:
- `off` - No announcement (default)
- `polite` - Wait for user to finish
- `assertive` - Interrupt immediately

#### aria-expanded

Indicates if element is expanded or collapsed.

```tsx
function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div>{content}</div>}
    </div>
  );
}
```

#### aria-hidden

Hides content from screen readers (use sparingly!).

```tsx
function Card({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      {/* Decorative icon, hide from screen readers */}
      <span aria-hidden="true">✨</span>
    </div>
  );
}
```

### ARIA Roles

#### Common Roles

```tsx
// Navigation
<nav role="navigation">...</nav>

// Search landmark
<div role="search">
  <input type="search" />
</div>

// Alert
<div role="alert">Error: Invalid input</div>

// Tab interface
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab">Tab 2</button>
</div>
<div role="tabpanel">Content for Tab 1</div>
```

---

## Keyboard Navigation

### Why Keyboard Accessibility

**Users who need keyboard access**:
- Motor disabilities (can't use mouse)
- Blind users (screen reader users)
- Power users (prefer keyboard efficiency)

### Essential Keyboard Patterns

#### Focus Management

```tsx
function Modal({ isOpen, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Save previously focused element
      const previousFocus = document.activeElement;

      // Focus first element in modal
      modalRef.current?.focus();

      // Restore focus on close
      return () => {
        (previousFocus as HTMLElement)?.focus();
      };
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {/* Modal content */}
    </div>
  );
}
```

#### Focus Trap

```tsx
import { useRef, useEffect } from 'react';

function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }

    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  }, [isActive]);

  return containerRef;
}

// Usage
function Dialog({ isOpen }) {
  const trapRef = useFocusTrap(isOpen);
  return <div ref={trapRef}>{/* content */}</div>;
}
```

#### Skip Links

```tsx
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 999
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '0';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px';
      }}
    >
      Skip to main content
    </a>
  );
}

function App() {
  return (
    <>
      <SkipToContent />
      <nav>{/* Navigation */}</nav>
      <main id="main-content">{/* Main content */}</main>
    </>
  );
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift + Tab` | Move focus backward |
| `Enter` | Activate button/link |
| `Space` | Activate button, checkbox |
| `Escape` | Close dialog, cancel |
| `Arrow keys` | Navigate lists, tabs, menus |
| `Home` | Move to first item |
| `End` | Move to last item |

---

## Screen Reader Support

### Testing with Screen Readers

**Popular Screen Readers**:
- **NVDA** (Windows, free) - Download from nvaccess.org
- **JAWS** (Windows, paid) - Industry standard
- **VoiceOver** (macOS/iOS, built-in) - Cmd+F5 to enable
- **TalkBack** (Android, built-in)

### Screen Reader Announcements

#### Proper Heading Structure

```tsx
// ✅ Good: Logical heading hierarchy
function Page() {
  return (
    <>
      <h1>Page Title</h1>

      <section>
        <h2>Section 1</h2>
        <h3>Subsection 1.1</h3>
        <h3>Subsection 1.2</h3>
      </section>

      <section>
        <h2>Section 2</h2>
      </section>
    </>
  );
}

// ❌ Bad: Skipping levels
function BadPage() {
  return (
    <>
      <h1>Title</h1>
      <h4>Should be h2</h4> {/* Skips h2, h3 */}
    </>
  );
}
```

#### Accessible Forms

```tsx
function AccessibleForm() {
  return (
    <form>
      {/* Always use labels */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        required
        aria-required="true"
        aria-invalid={hasError}
      />

      {/* Error messages */}
      {hasError && (
        <span role="alert" className="error">
          Please enter a valid email
        </span>
      )}

      {/* Fieldset for related inputs */}
      <fieldset>
        <legend>Contact Preferences</legend>
        <label>
          <input type="checkbox" name="email-pref" />
          Email updates
        </label>
        <label>
          <input type="checkbox" name="sms-pref" />
          SMS updates
        </label>
      </fieldset>
    </form>
  );
}
```

#### Image Alt Text

```tsx
// ✅ Good: Descriptive alt text
<img
  src="chart.png"
  alt="Bar chart showing 50% increase in sales from 2024 to 2025"
/>

// ✅ Good: Decorative images
<img src="decoration.png" alt="" /> {/* Empty alt for decorative */}

// ❌ Bad: No alt text
<img src="important.png" /> {/* Screen reader says "image" */}

// ❌ Bad: Useless alt text
<img src="chart.png" alt="image" /> {/* Not helpful */}
```

---

## Color Contrast & Visual Design

### WCAG Contrast Requirements

**Level AA** (Minimum):
- Normal text: 4.5:1 ratio
- Large text (18pt+): 3:1 ratio

**Level AAA** (Enhanced):
- Normal text: 7:1 ratio
- Large text: 4.5:1 ratio

### Testing Contrast

```tsx
// ✅ Good: High contrast
<button style={{
  backgroundColor: '#0066CC', // Dark blue
  color: '#FFFFFF' // White
}}>
  Click Me {/* Ratio: 8.59:1 ✅ */}
</button>

// ❌ Bad: Low contrast
<button style={{
  backgroundColor: '#FFCCCC', // Light pink
  color: '#FFFFFF' // White
}}>
  Click Me {/* Ratio: 1.36:1 ❌ Fails AA */}
</button>
```

### Tools

- **WebAIM Contrast Checker**: webaim.org/resources/contrastchecker
- **Coolors Contrast Checker**: coolors.co/contrast-checker
- **Browser DevTools**: Built-in contrast checker

### Color Blindness Considerations

**Don't rely on color alone**:

```tsx
// ❌ Bad: Color-only indication
<button style={{ backgroundColor: isError ? 'red' : 'green' }}>
  Submit
</button>

// ✅ Good: Color + icon + text
<button className={isError ? 'error' : 'success'}>
  {isError ? (
    <>
      <XIcon /> Error
    </>
  ) : (
    <>
      <CheckIcon /> Success
    </>
  )}
</button>
```

**Types of color blindness**:
- Deuteranopia (red-green, most common)
- Protanopia (red-green)
- Tritanopia (blue-yellow)
- Achromatopsia (total color blindness, rare)

---

## Form Accessibility

### Form Labels

```tsx
// ✅ Method 1: htmlFor
<label htmlFor="username">Username</label>
<input id="username" type="text" />

// ✅ Method 2: Wrapper
<label>
  Email
  <input type="email" />
</label>

// ❌ Bad: Placeholder as label
<input type="text" placeholder="Enter your name" />
```

### Error Handling

```tsx
function LoginForm() {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <form>
      {/* Error summary */}
      {errors.length > 0 && (
        <div role="alert" className="error-summary">
          <h2>There are {errors.length} errors in this form:</h2>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Field with inline error */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={emailError ? 'true' : 'false'}
          aria-describedby={emailError ? 'email-error' : undefined}
        />
        {emailError && (
          <span id="email-error" role="alert" className="error">
            {emailError}
          </span>
        )}
      </div>
    </form>
  );
}
```

### Required Fields

```tsx
<label htmlFor="name">
  Name <span aria-label="required">*</span>
</label>
<input
  id="name"
  type="text"
  required
  aria-required="true"
/>
```

---

## Testing Tools

### Automated Testing

#### eslint-plugin-jsx-a11y

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

```json
// .eslintrc.json
{
  "extends": [
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["jsx-a11y"]
}
```

#### axe-core

```bash
npm install --save-dev @axe-core/react
```

```tsx
// index.tsx (development only)
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

#### React Testing Library

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button is accessible', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Browser DevTools

**Chrome DevTools**:
1. Open DevTools (F12)
2. Lighthouse tab
3. Run accessibility audit
4. Check Accessibility tree

**Firefox DevTools**:
1. Open DevTools
2. Accessibility tab
3. Check contrast, structure

### Manual Testing

**Keyboard Testing Checklist**:
- [ ] Tab through all interactive elements
- [ ] Activate with Enter/Space
- [ ] Close dialogs with Escape
- [ ] Navigate dropdowns with arrows
- [ ] Visible focus indicators
- [ ] No keyboard traps

**Screen Reader Testing**:
- [ ] All images have alt text
- [ ] Forms have labels
- [ ] Headings in logical order
- [ ] Links make sense out of context
- [ ] Dynamic content announces

---

## React-Specific Patterns

### Accessible Modal/Dialog

```tsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="modal"
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </>,
    document.body
  );
}
```

### Accessible Dropdown Menu

```tsx
function Dropdown({ trigger, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </button>

      {isOpen && (
        <div ref={menuRef} role="menu">
          {items.map((item, index) => (
            <button
              key={index}
              role="menuitem"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Accessible Data Table

```tsx
function DataTable({ data, columns }) {
  return (
    <table>
      <caption>User Data Table</caption>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} scope="col">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## Common Issues & Solutions

### Issue 1: Non-Interactive Elements as Buttons

❌ **Problem**:
```tsx
<div onClick={handleClick}>Click me</div>
```

✅ **Solution**:
```tsx
<button onClick={handleClick}>Click me</button>
```

### Issue 2: Missing Form Labels

❌ **Problem**:
```tsx
<input type="text" placeholder="Email" />
```

✅ **Solution**:
```tsx
<label htmlFor="email">Email</label>
<input id="email" type="text" />
```

### Issue 3: Poor Focus Indicators

❌ **Problem**:
```css
button:focus { outline: none; } /* Removes focus indicator */
```

✅ **Solution**:
```css
button:focus {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

button:focus-visible { /* Only for keyboard */
  outline: 2px solid #0066CC;
}
```

### Issue 4: Images Without Alt Text

❌ **Problem**:
```tsx
<img src="logo.png" />
```

✅ **Solution**:
```tsx
<img src="logo.png" alt="Company Logo" />
{/* Or for decorative: */}
<img src="decoration.png" alt="" />
```

### Issue 5: Inaccessible Custom Components

❌ **Problem**:
```tsx
<div className="checkbox" onClick={toggle}>
  {checked && <span>✓</span>}
</div>
```

✅ **Solution**:
```tsx
<label>
  <input
    type="checkbox"
    checked={checked}
    onChange={toggle}
  />
  <span className="custom-checkbox" aria-hidden="true">
    {checked && '✓'}
  </span>
</label>
```

---

## Resources

### Official Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [React Accessibility Docs](https://react.dev/learn/accessibility)

### Tools & Extensions

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Testing

- [NVDA Screen Reader](https://www.nvaccess.org/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

### Learning Resources

- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [Deque University](https://dequeuniversity.com/)

### Communities

- [A11y Slack](https://web-a11y.slack.com/)
- [Twitter #a11y](https://twitter.com/hashtag/a11y)
- [r/accessibility](https://www.reddit.com/r/accessibility/)

---

## Quick Reference Checklist

### Before Launch

- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Color contrast meets AA (4.5:1)
- [ ] Keyboard accessible (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Heading hierarchy logical
- [ ] ARIA used correctly (not overused)
- [ ] Skip links present
- [ ] Error messages clear
- [ ] Tested with screen reader
- [ ] Tested with keyboard only
- [ ] Lighthouse accessibility score 90+
- [ ] No automated violations (axe)

---

**Remember**: Accessibility is not a feature—it's a fundamental part of good web development. Build it in from the start, not as an afterthought.
