# React Web Testing Guide

## 📋 Table of Contents

- [Overview](#overview)
- [Testing Philosophy](#testing-philosophy)
- [Testing Pyramid](#testing-pyramid)
- [Jest Fundamentals](#jest-fundamentals)
- [React Testing Library](#react-testing-library)
- [Testing Patterns](#testing-patterns)
- [Mocking](#mocking)
- [Integration Testing](#integration-testing)
- [E2E Testing with Playwright](#e2e-testing-with-playwright)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)
- [Resources](#resources)

---

## Overview

Testing ensures your React applications work correctly and continue to work as you make changes. This guide covers modern testing strategies for React applications.

**Why Test?**
- ✅ Catch bugs early (before production)
- ✅ Refactor with confidence
- ✅ Documentation through tests
- ✅ Better code design
- ✅ Faster development (long-term)

**Testing Stack**:
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW**: API mocking

---

## Testing Philosophy

### Test Behavior, Not Implementation

❌ **Bad**: Testing implementation details
```tsx
test('counter increments internal state', () => {
  const wrapper = shallow(<Counter />);
  expect(wrapper.state('count')).toBe(0);
  wrapper.instance().increment();
  expect(wrapper.state('count')).toBe(1);
});
```

✅ **Good**: Testing user-visible behavior
```tsx
test('counter increments when button clicked', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });

  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  fireEvent.click(button);

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### Write Tests Users Would Run

> *"The more your tests resemble the way your software is used, the more confidence they can give you."* - Kent C. Dodds

**Focus on**:
- What users see
- What users do
- What users expect

**Avoid**:
- Internal state
- Private methods
- Implementation details

---

## Testing Pyramid

```
        /\
       /  \
      / E2E \         <- Few (slow, expensive, brittle)
     /______\
    /        \
   / Integration \    <- Some (medium speed/cost)
  /____________  \
 /                \
/  Unit Tests      \  <- Many (fast, cheap, reliable)
____________________
```

### Unit Tests (70%)
- Individual components
- Utility functions
- Hooks
- Fast, isolated

### Integration Tests (20%)
- Multiple components working together
- API interactions
- User workflows
- Medium speed

### E2E Tests (10%)
- Full application flows
- Real browser
- Critical paths only
- Slow, expensive

---

## Jest Fundamentals

### Setup

```bash
# Create React App (pre-configured)
npx create-react-app my-app

# Vite + Jest
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**jest.config.js** (Vite):
```js
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
```

**src/setupTests.ts**:
```ts
import '@testing-library/jest-dom';
```

### Basic Test Structure

```tsx
import { describe, test, expect } from '@jest/globals';

describe('Calculator', () => {
  test('adds two numbers', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  test('subtracts two numbers', () => {
    const result = subtract(5, 3);
    expect(result).toBe(2);
  });
});
```

### Common Matchers

```tsx
// Equality
expect(value).toBe(4); // Exact equality (===)
expect(object).toEqual({ name: 'John' }); // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(0.3); // Floating point

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays
expect(array).toContain('item');
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty('key');
expect(object).toMatchObject({ name: 'John' });

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('Error message');
```

### Async Testing

```tsx
// Promises
test('fetches user data', async () => {
  const data = await fetchUser(1);
  expect(data.name).toBe('John');
});

// Callbacks
test('callback is called', (done) => {
  function callback(data) {
    expect(data).toBe('success');
    done();
  }

  fetchData(callback);
});
```

---

## React Testing Library

### Philosophy

**Guiding Principles**:
1. Test components like users use them
2. Avoid testing implementation details
3. Use accessible queries

### Setup

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
```

### Rendering Components

```tsx
import { render } from '@testing-library/react';

test('renders component', () => {
  const { container, getByText, debug } = render(<Button>Click me</Button>);

  // Debug: prints DOM to console
  debug();

  // Container: access to DOM node
  expect(container.firstChild).toHaveClass('button');
});
```

### Query Methods

**Priority Order** (use in this order):

#### 1. Accessible Queries (Preferred)

```tsx
// getByRole - Best for most elements
const button = screen.getByRole('button', { name: /submit/i });
const heading = screen.getByRole('heading', { level: 1 });
const textbox = screen.getByRole('textbox', { name: /email/i });

// getByLabelText - Forms
const input = screen.getByLabelText(/username/i);

// getByPlaceholderText - Only if no label
const search = screen.getByPlaceholderText(/search/i);

// getByText - Text content
const text = screen.getByText(/hello world/i);
```

#### 2. Semantic Queries

```tsx
// getByAltText - Images
const image = screen.getByAltText(/logo/i);

// getByTitle - Title attribute
const element = screen.getByTitle(/close/i);
```

#### 3. Test IDs (Last Resort)

```tsx
// getByTestId - Avoid if possible
const element = screen.getByTestId('custom-element');

// In component:
<div data-testid="custom-element">Content</div>
```

### Query Variants

```tsx
// getBy - Throws error if not found (for assertions)
const button = screen.getByRole('button');

// queryBy - Returns null if not found (for negation)
const error = screen.queryByText(/error/i);
expect(error).not.toBeInTheDocument();

// findBy - Async, waits for element (promises)
const message = await screen.findByText(/success/i);

// getAllBy, queryAllBy, findAllBy - Multiple elements
const items = screen.getAllByRole('listitem');
expect(items).toHaveLength(3);
```

---

## Testing Patterns

### Testing Components

#### Simple Component

```tsx
// Button.tsx
export function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Component with State

```tsx
// Counter.tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Counter.test.tsx
describe('Counter', () => {
  test('increments counter', () => {
    render(<Counter />);
    const button = screen.getByRole('button', { name: /increment/i });

    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });

  test('resets counter', () => {
    render(<Counter />);

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    fireEvent.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText('Count: 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
```

### User Events (Better than fireEvent)

```tsx
import userEvent from '@testing-library/user-event';

test('form submission', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<LoginForm onSubmit={handleSubmit} />);

  // Type in inputs
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');

  // Click button
  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});
```

### Testing Async Components

```tsx
// UserProfile.tsx
export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}

// UserProfile.test.tsx
test('loads and displays user', async () => {
  // Mock API call
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => ({ name: 'John Doe' }),
  });

  render(<UserProfile userId={1} />);

  // Loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for data to load
  const userName = await screen.findByText('John Doe');
  expect(userName).toBeInTheDocument();

  // Loading gone
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

### Testing Hooks

```tsx
// useCounter.ts
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// useCounter.test.ts
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  test('increments counter', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('starts with initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });
});
```

---

## Mocking

### Mocking Functions

```tsx
// Mock function
const mockFn = jest.fn();

// With return value
const mockFn = jest.fn(() => 'result');

// With different return values
const mockFn = jest.fn()
  .mockReturnValueOnce('first')
  .mockReturnValueOnce('second')
  .mockReturnValue('default');

// Async mock
const mockFn = jest.fn().mockResolvedValue('data');

// Check calls
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenLastCalledWith(arg);
```

### Mocking Modules

```tsx
// Mock entire module
jest.mock('./api', () => ({
  fetchUser: jest.fn(),
}));

// In test
import { fetchUser } from './api';

test('fetches user', async () => {
  fetchUser.mockResolvedValue({ name: 'John' });

  render(<UserProfile userId={1} />);

  expect(await screen.findByText('John')).toBeInTheDocument();
  expect(fetchUser).toHaveBeenCalledWith(1);
});
```

### Mocking API with MSW

```bash
npm install --save-dev msw
```

```tsx
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'John Doe',
    });
  }),

  http.post('/api/login', async ({ request }) => {
    const data = await request.json();

    if (data.email === 'test@example.com') {
      return HttpResponse.json({ token: 'abc123' });
    }

    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),
];

// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// src/setupTests.ts
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Mocking Timers

```tsx
test('calls callback after timeout', () => {
  jest.useFakeTimers();
  const callback = jest.fn();

  setTimeout(callback, 1000);

  expect(callback).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalled();

  jest.useRealTimers();
});
```

---

## Integration Testing

### Testing Component Integration

```tsx
// UserList.tsx
export function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}

// UserList.test.tsx
import { rest } from 'msw';
import { server } from './mocks/server';

test('displays list of users', async () => {
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res(ctx.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ]));
    })
  );

  render(<UserList />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  expect(await screen.findByText('John')).toBeInTheDocument();
  expect(screen.getByText('Jane')).toBeInTheDocument();

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

### Testing with React Router

```tsx
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
}

test('navigates to user profile', async () => {
  const user = userEvent.setup();

  renderWithRouter(<App />, { route: '/users' });

  const link = screen.getByRole('link', { name: /john/i });
  await user.click(link);

  expect(await screen.findByRole('heading', { name: /john's profile/i }))
    .toBeInTheDocument();
});
```

### Testing with Context

```tsx
// Test utilities
function renderWithProviders(ui, { theme = 'light', user = null } = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        {ui}
      </AuthProvider>
    </ThemeProvider>
  );
}

test('shows user dashboard when logged in', () => {
  renderWithProviders(<App />, {
    user: { name: 'John', role: 'admin' }
  });

  expect(screen.getByText(/welcome, john/i)).toBeInTheDocument();
});
```

---

## E2E Testing with Playwright

### Setup

```bash
npm init playwright@latest
```

### Basic Test

```tsx
// tests/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h1')).toContainText('Welcome');
});
```

### Page Object Model

```tsx
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async getErrorMessage() {
    return this.page.locator('.error-message').textContent();
  }
}

// login.spec.ts
test('invalid login shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('invalid@example.com', 'wrong');

  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Invalid credentials');
});
```

### Testing Critical User Flows

```tsx
test('complete checkout flow', async ({ page }) => {
  // Add item to cart
  await page.goto('/products');
  await page.click('text=Add to Cart');

  // View cart
  await page.click('text=Cart');
  await expect(page.locator('.cart-item')).toHaveCount(1);

  // Proceed to checkout
  await page.click('text=Checkout');

  // Fill shipping info
  await page.fill('[name="address"]', '123 Main St');
  await page.fill('[name="city"]', 'New York');

  // Complete payment
  await page.fill('[name="cardNumber"]', '4242424242424242');
  await page.click('text=Place Order');

  // Verify success
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page).toHaveURL(/order-confirmation/);
});
```

---

## Test Coverage

### Generating Coverage Reports

```json
// package.json
{
  "scripts": {
    "test:coverage": "jest --coverage"
  }
}
```

### Coverage Thresholds

```js
// jest.config.js
export default {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### What to Aim For

- **80-90%** overall coverage (good target)
- **100%** for critical paths (auth, payments)
- **60-70%** for UI components (acceptable)

**Don't obsess over 100%**:
- Focus on critical business logic
- Test user workflows, not every line
- Quality > quantity

---

## Best Practices

### 1. Arrange-Act-Assert Pattern

```tsx
test('user can submit form', async () => {
  // Arrange
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);

  // Act
  await userEvent.type(screen.getByLabelText(/name/i), 'John');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  // Assert
  expect(handleSubmit).toHaveBeenCalledWith({ name: 'John' });
});
```

### 2. Use data-testid Sparingly

```tsx
// ❌ Avoid
<div data-testid="user-card">...</div>

// ✅ Prefer accessible queries
<article aria-label="User card">...</article>

// Then query
screen.getByRole('article', { name: /user card/i });
```

### 3. Test One Thing Per Test

```tsx
// ❌ Bad: Multiple assertions
test('form validation', () => {
  // Tests 3 different things
  expect(email).toBeInvalid();
  expect(password).toBeInvalid();
  expect(submitButton).toBeDisabled();
});

// ✅ Good: Split into separate tests
test('email is invalid when empty', () => {
  expect(email).toBeInvalid();
});

test('password is invalid when too short', () => {
  expect(password).toBeInvalid();
});

test('submit button disabled when form invalid', () => {
  expect(submitButton).toBeDisabled();
});
```

### 4. Use Descriptive Test Names

```tsx
// ❌ Bad
test('it works', () => {});
test('test 1', () => {});

// ✅ Good
test('displays error when email is invalid', () => {});
test('disables submit button while loading', () => {});
```

### 5. Clean Up Side Effects

```tsx
afterEach(() => {
  jest.clearAllMocks();
  cleanup(); // RTL does this automatically
});
```

---

## Common Pitfalls

### Pitfall 1: Testing Implementation Details

❌ **Bad**:
```tsx
test('sets loading state to true', () => {
  const { result } = renderHook(() => useFetch());
  expect(result.current.loading).toBe(true);
});
```

✅ **Good**:
```tsx
test('shows loading indicator while fetching', () => {
  render(<UserList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
```

### Pitfall 2: Not Waiting for Async Updates

❌ **Bad**:
```tsx
test('displays user after fetch', () => {
  render(<UserProfile />);
  expect(screen.getByText('John')).toBeInTheDocument(); // Fails!
});
```

✅ **Good**:
```tsx
test('displays user after fetch', async () => {
  render(<UserProfile />);
  expect(await screen.findByText('John')).toBeInTheDocument();
});
```

### Pitfall 3: Overusing Snapshot Tests

❌ **Bad**:
```tsx
test('renders correctly', () => {
  const { container } = render(<ComplexComponent />);
  expect(container).toMatchSnapshot(); // Hard to review
});
```

✅ **Good**:
```tsx
test('displays user information', () => {
  render(<UserCard user={mockUser} />);
  expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', mockUser.avatar);
});
```

---

## Resources

### Documentation

- [Jest Docs](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Docs](https://playwright.dev/)
- [MSW (Mock Service Worker)](https://mswjs.io/)

### Learning Resources

- [Testing JavaScript (Kent C. Dodds)](https://testingjavascript.com/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [React Testing Library Examples](https://github.com/testing-library/react-testing-library/tree/main/examples)

### Tools

- [jest-axe](https://github.com/nickcolley/jest-axe) - Accessibility testing
- [jest-dom](https://github.com/testing-library/jest-dom) - Custom matchers
- [user-event](https://github.com/testing-library/user-event) - Realistic user interactions

---

## Quick Reference

### Common RTL Queries

```tsx
// By role (preferred)
getByRole('button', { name: /submit/i })
getByRole('heading', { level: 1 })

// By label
getByLabelText(/email/i)

// By text
getByText(/hello world/i)

// By test ID (last resort)
getByTestId('custom-element')

// Async
await findByText(/loaded/i)

// Multiple
getAllByRole('listitem')
```

### Common User Events

```tsx
const user = userEvent.setup();

await user.click(button);
await user.type(input, 'text');
await user.clear(input);
await user.selectOptions(select, 'option1');
await user.upload(fileInput, file);
await user.hover(element);
await user.tab();
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage

# Single file
npm test Button.test.tsx

# Update snapshots
npm test -- -u
```

---

**Remember**: Good tests give you confidence to refactor and ship features faster. Focus on testing behavior that matters to users.
