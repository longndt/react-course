# React Testing Strategies

## Overview

Comprehensive testing strategies for React applications, covering unit testing, integration testing, and end-to-end testing with modern tools and best practices.

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Unit Testing Patterns](#unit-testing-patterns)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Testing Custom Hooks](#testing-custom-hooks)
6. [Testing Context Providers](#testing-context-providers)
7. [Mock Strategies](#mock-strategies)
8. [Test Coverage Best Practices](#test-coverage-best-practices)
9. [CI/CD Testing](#cicd-testing)
10. [Testing Tools Setup](#testing-tools-setup)

---

## Testing Philosophy

### Testing Pyramid

```
    /\
   /  \     E2E Tests (Few)
  /____\    - User journeys
 /      \   - Critical paths
/________\  Integration Tests (Some)
          - Component interactions
          - Feature flows
          - API integrations
          Unit Tests (Many)
          - Individual functions
          - Small components
          - Pure logic
```

- **Unit Tests**: Fast, isolated, test small pieces of code.
- **Integration Tests**: Verify interactions between multiple units, closer to user behavior.
- **End-to-End (E2E) Tests**: Simulate real user scenarios across the entire application, including UI and backend.

### Guiding Principles

- **Test what the user sees and interacts with**: Focus on behavior, not implementation details.
- **Write maintainable tests**: Keep tests clean, readable, and independent.
- **Fast feedback**: Prioritize faster tests (unit) for quick development cycles.
- **High confidence**: E2E tests provide the highest confidence but are slower and more brittle.

---

## Unit Testing Patterns

### Testing Components with React Testing Library

React Testing Library (RTL) encourages testing components the way users interact with them.

```jsx
// src/components/Button.jsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// src/components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with children and handles click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Pure Functions

Use Jest for simple, pure JavaScript functions.

```javascript
// src/utils/math.js
export function add(a, b) {
  return a + b;
}

// src/utils/math.test.js
describe('add function', () => {
  it('adds two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
  });
});
```

---

## Integration Testing

### Testing Component Interactions

Verify how multiple components work together.

```jsx
// src/components/UserList.jsx
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// src/components/App.jsx (simplified)
function App() {
  const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
}

// src/components/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App integration', () => {
  it('renders user list within the app', () => {
    render(<App />);
    expect(screen.getByText(/users/i)).toBeInTheDocument();
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/bob/i)).toBeInTheDocument();
  });
});
```

### Testing API Integrations (Mocking)

Use `msw` (Mock Service Worker) or Jest mocks to simulate API calls.

```javascript
// src/api.js
export async function fetchProducts() {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

// src/api.test.js (using Jest mock)
describe('fetchProducts', () => {
  it('fetches products successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'Product A' }]),
      })
    );

    const products = await fetchProducts();
    expect(products).toEqual([{ id: 1, name: 'Product A' }]);
    expect(global.fetch).toHaveBeenCalledWith('/api/products');
  });
});
```

---

## End-to-End Testing

### Cypress / Playwright

Tools like Cypress or Playwright allow you to simulate full user journeys in a real browser.

```javascript
// cypress/e2e/login.cy.js
describe('Login Flow', () => {
  it('allows a user to log in and see products', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/products');
    cy.contains('Welcome, test@example.com').should('be.visible');
  });
});
```

---

## Testing Custom Hooks

Use `@testing-library/react-hooks` (or `@testing-library/react` with `renderHook` in React 18+).

```jsx
// src/hooks/useCounter.js
import { useState, useCallback } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(prev => prev + 1), []);
  const decrement = useCallback(() => setCount(prev => prev - 1), []);
  return { count, increment, decrement };
}

// src/hooks/useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should increment the counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('should decrement the counter', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });
});
```

---

## Testing Context Providers

Wrap components in your test with the actual context provider.

```jsx
// src/context/AuthContext.jsx (simplified)
import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// src/components/UserProfile.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  if (!user) return <div>Please log in.</div>;
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// src/components/UserProfile.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('displays user name and allows logout', () => {
    const mockUser = { name: 'Test User' };
    
    // Custom render function with context
    const renderWithAuth = (component, userValue = null) => {
      return render(
        <AuthContext.Provider value={{ user: userValue, login: jest.fn(), logout: jest.fn() }}>
          {component}
        </AuthContext.Provider>
      );
    };

    renderWithAuth(<UserProfile />, mockUser);

    expect(screen.getByText(/welcome, test user/i)).toBeInTheDocument();
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
});
```

---

## Mock Strategies

### Jest Mocks

Mock functions, modules, and timers.

```javascript
// Mocking a function
const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
global.fetch = mockFetch;

// Mocking a module
jest.mock('../api', () => ({
  fetchProducts: jest.fn(() => Promise.resolve([])),
}));

// Mocking timers
jest.useFakeTimers();
```

### Mock Service Worker (MSW)

Intercepts network requests at the service worker level, providing realistic API mocking.

```javascript
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json([{ id: 1, name: 'Mock Product' }]);
  }),
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json();
    if (username === 'user' && password === 'pass') {
      return HttpResponse.json({ token: 'mock-token' });
    }
    return new HttpResponse(null, { status: 401 });
  }),
];

// src/setupTests.js (for Jest)
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// In your test file, requests to /api/products will be intercepted.
```

---

## Test Coverage Best Practices

### Aim for High-Value Coverage

Focus on covering critical paths and complex logic rather than 100% line coverage.

### Tools

- **Jest Coverage**: Built-in coverage reporting.

```json
// package.json scripts
"test:coverage": "jest --coverage"
```

### Thresholds

Set coverage thresholds to enforce minimum quality.

```json
// jest.config.js
module.exports = {
  // ...
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

---

## CI/CD Testing

### Integrate Tests into CI Pipeline

Run unit, integration, and E2E tests automatically on every push or pull request.

```yaml
# .github/workflows/ci.yml (GitHub Actions example)
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run build
```

---

## Testing Tools Setup

### Jest

- **Installation**: `npm install --save-dev jest @testing-library/react @testing-library/jest-dom`
- **Configuration**: `jest.config.js`

### React Testing Library

- **Installation**: Included with `@testing-library/react`
- **Setup**: `setupTests.js` (for `@testing-library/jest-dom` matchers)

### Cypress / Playwright

- **Installation**: `npm install --save-dev cypress` or `npm install --save-dev playwright`
- **Configuration**: `cypress.config.js` or `playwright.config.js`

---

## Testing Checklist

### Unit Tests
- [ ] All utility functions tested
- [ ] All custom hooks tested
- [ ] Component rendering tested
- [ ] User interactions tested
- [ ] Error states tested
- [ ] Loading states tested

### Integration Tests
- [ ] Component interactions tested
- [ ] API integration tested
- [ ] Context providers tested
- [ ] Form submissions tested
- [ ] Navigation tested

### E2E Tests
- [ ] Critical user journeys tested
- [ ] Authentication flows tested
- [ ] Payment processes tested
- [ ] Error handling tested
- [ ] Cross-browser compatibility tested

### Test Quality
- [ ] Tests are independent
- [ ] Tests are deterministic
- [ ] Tests are fast
- [ ] Tests are maintainable
- [ ] Tests provide value
- [ ] Coverage meets requirements

---

**Remember**: Good tests are fast, reliable, and provide confidence in your code. Focus on testing behavior, not implementation details.
