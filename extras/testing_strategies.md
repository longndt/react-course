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
          - API integration
          Unit Tests (Many)
          - Individual functions
          - Component rendering
          - Hook behavior
```

### What to Test

**Unit Tests (70%)**
- Individual functions and utilities
- Component rendering
- Hook behavior
- Pure functions

**Integration Tests (20%)**
- Component interactions
- API integration
- Context providers
- Form submissions

**E2E Tests (10%)**
- Critical user journeys
- Authentication flows
- Payment processes
- Complete workflows

---

## Unit Testing Patterns

### Component Testing

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
```

### Form Testing

```tsx
// LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    
    render(<LoginForm onSubmit={onSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);
    
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<LoginForm onSubmit={onSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Utility Function Testing

```tsx
// utils.test.ts
import { formatCurrency, validateEmail, debounce } from './utils';

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });
});

describe('validateEmail', () => {
  it('validates correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('@domain.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  it('calls function after delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets delay on multiple calls', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    jest.advanceTimersByTime(50);
    debouncedFn();
    jest.advanceTimersByTime(50);
    
    expect(fn).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
```

---

## Integration Testing

### Component Integration

```tsx
// ProductList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { ProductList } from './ProductList';
import { ProductProvider } from './ProductContext';

const mockProducts = [
  { id: '1', name: 'Product 1', price: 100 },
  { id: '2', name: 'Product 2', price: 200 }
];

const renderWithProvider = (component) => {
  return render(
    <ProductProvider>
      {component}
    </ProductProvider>
  );
};

describe('ProductList Integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts)
      })
    );
  });

  it('loads and displays products', async () => {
    renderWithProvider(<ProductList />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API Error')));
    
    renderWithProvider(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading products/i)).toBeInTheDocument();
    });
  });
});
```

### API Integration Testing

```tsx
// api.test.ts
import { fetchProducts, createProduct, updateProduct } from './api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchProducts', () => {
    it('fetches products successfully', async () => {
      const mockProducts = [{ id: '1', name: 'Product 1' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      });

      const result = await fetchProducts();
      expect(result).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith('/api/products');
    });

    it('handles API errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(fetchProducts()).rejects.toThrow('500 Internal Server Error');
    });
  });

  describe('createProduct', () => {
    it('creates product with correct data', async () => {
      const productData = { name: 'New Product', price: 100 };
      const createdProduct = { id: '1', ...productData };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdProduct
      });

      const result = await createProduct(productData);
      
      expect(result).toEqual(createdProduct);
      expect(fetch).toHaveBeenCalledWith('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
    });
  });
});
```

---

## End-to-End Testing

### Playwright Setup

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('user sees error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
  });

  test('user can logout', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');
    
    await expect(page).toHaveURL('/login');
  });
});
```

```typescript
// e2e/shopping-cart.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('user can add product to cart', async ({ page }) => {
    await page.goto('/products');
    
    const productCard = page.locator('[data-testid="product-card"]').first();
    await productCard.locator('[data-testid="add-to-cart-button"]').click();
    
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });

  test('user can view cart and remove items', async ({ page }) => {
    // Add items to cart
    await page.goto('/products');
    await page.locator('[data-testid="add-to-cart-button"]').first().click();
    await page.locator('[data-testid="add-to-cart-button"]').nth(1).click();
    
    // Go to cart
    await page.click('[data-testid="cart-icon"]');
    
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(2);
    
    // Remove item
    await page.locator('[data-testid="remove-item-button"]').first().click();
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);
  });

  test('user can proceed to checkout', async ({ page }) => {
    // Add item and go to cart
    await page.goto('/products');
    await page.locator('[data-testid="add-to-cart-button"]').first().click();
    await page.click('[data-testid="cart-icon"]');
    
    // Proceed to checkout
    await page.click('[data-testid="checkout-button"]');
    
    await expect(page).toHaveURL('/checkout');
    await expect(page.locator('[data-testid="checkout-form"]')).toBeVisible();
  });
});
```

---

## Testing Custom Hooks

### useCounter Hook Test

```tsx
// useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('resets count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});
```

### useApi Hook Test

```tsx
// useApi.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

// Mock fetch
global.fetch = jest.fn();

describe('useApi', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const { result } = renderHook(() => useApi('/api/test'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useApi('/api/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(new Error('Network error'));
  });
});
```

---

## Testing Context Providers

### AuthContext Test

```tsx
// AuthContext.test.tsx
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Test component that uses the context
function TestComponent() {
  const { user, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="user">{user?.name || 'Not logged in'}</div>
      <button onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

const renderWithAuth = (component) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('AuthContext', () => {
  it('provides initial state', () => {
    renderWithAuth(<TestComponent />);
    
    expect(screen.getByTestId('user')).toHaveTextContent('Not logged in');
  });

  it('handles login', async () => {
    renderWithAuth(<TestComponent />);
    
    // Mock successful login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: { name: 'Test User' } })
      })
    );

    screen.getByText('Login').click();
    
    await screen.findByText('Test User');
  });

  it('handles logout', () => {
    renderWithAuth(<TestComponent />);
    
    screen.getByText('Logout').click();
    
    expect(screen.getByTestId('user')).toHaveTextContent('Not logged in');
  });
});
```

---

## Mock Strategies

### API Mocking

```tsx
// __mocks__/api.ts
export const mockApi = {
  getProducts: jest.fn(() => Promise.resolve([
    { id: '1', name: 'Product 1', price: 100 }
  ])),
  createProduct: jest.fn(() => Promise.resolve({
    id: '2', name: 'New Product', price: 200
  })),
  updateProduct: jest.fn(() => Promise.resolve({
    id: '1', name: 'Updated Product', price: 150
  })),
  deleteProduct: jest.fn(() => Promise.resolve())
};

// In tests
jest.mock('../api', () => mockApi);
```

### Module Mocking

```tsx
// Mock external libraries
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/test' })
}));

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  process.env = {
    ...originalEnv,
    REACT_APP_API_URL: 'http://localhost:3001'
  };
});

afterEach(() => {
  process.env = originalEnv;
});
```

### Component Mocking

```tsx
// Mock heavy components
jest.mock('./HeavyComponent', () => {
  return function MockHeavyComponent({ children }) {
    return <div data-testid="mock-heavy-component">{children}</div>;
  };
});

// Mock with props
jest.mock('./ExpensiveComponent', () => ({
  ExpensiveComponent: ({ data, onComplete }) => {
    // Simulate async operation
    setTimeout(() => onComplete(data), 0);
    return <div>Mocked expensive component</div>;
  }
}));
```

---

## Test Coverage Best Practices

### Coverage Configuration

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --watchAll=false"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts",
      "!src/index.tsx",
      "!src/setupTests.ts"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### Coverage Analysis

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
npx jest --coverage --coverageReporters=html
open coverage/lcov-report/index.html
```

### Coverage Best Practices

1. **Aim for 80%+ coverage** on critical paths
2. **Focus on business logic** over implementation details
3. **Test edge cases** and error conditions
4. **Don't test third-party libraries** unless you're extending them
5. **Use coverage to find untested code**, not as a goal

---

## CI/CD Testing

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:ci
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

### Test Scripts

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test:unit && npm run test:integration && npm run test:e2e",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

---

## Testing Tools Setup

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/index.tsx'
  ]
};
```

### Testing Library Setup

```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

### Playwright Setup

```typescript
// tests/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Setup test data
  await page.goto('http://localhost:3000/setup');
  await page.click('[data-testid="setup-test-data"]');
  
  await browser.close();
}

export default globalSetup;
```

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
