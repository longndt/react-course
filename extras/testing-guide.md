# Testing React Components Guide

## Overview

This guide covers comprehensive testing strategies for React applications, including unit tests, integration tests, and end-to-end testing.

## Testing Philosophy

### Testing Pyramid

```
        E2E Tests
      ─────────────
     Integration Tests
    ────────────────────
         Unit Tests
   ───────────────────────
```

- **Unit Tests (70%)**: Test individual components in isolation
- **Integration Tests (20%)**: Test component interactions
- **E2E Tests (10%)**: Test complete user workflows

## Setup Testing Environment

### 1. Install Testing Dependencies

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### 2. Configure Jest (package.json)

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
    "moduleNameMapping": {
      "\\.(css|less|scss)$": "identity-obj-proxy"
    }
  }
}
```

### 3. Setup Test Configuration

```javascript
// src/setupTests.js
import "@testing-library/jest-dom";

// Mock console methods to reduce noise
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
```

## Testing Strategies

### 1. Testing Component Rendering

```javascript
// components/Button.test.jsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  test("renders button with text", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test("applies correct variant class", () => {
    render(<Button variant="secondary">Test</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("button-secondary");
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Test</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
```

### 2. Testing User Interactions

```javascript
// components/Counter.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter Component", () => {
  test("increments count when increment button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const count = screen.getByText(/count: 0/i);

    await user.click(incrementButton);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  test("decrements count when decrement button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={5} />);

    const decrementButton = screen.getByRole("button", { name: /decrement/i });

    await user.click(decrementButton);

    expect(screen.getByText(/count: 4/i)).toBeInTheDocument();
  });
});
```

### 3. Testing Forms

```javascript
// components/ContactForm.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm Component", () => {
  test("submits form with correct data", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<ContactForm onSubmit={mockSubmit} />);

    // Fill out form
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello world");

    // Submit form
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello world",
    });
  });

  test("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```

### 4. Testing Hooks

```javascript
// hooks/useCounter.test.js
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter Hook", () => {
  test("initializes with default value", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  test("initializes with custom value", () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  test("increments count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("decrements count", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });
});
```

### 5. Testing API Integration

```javascript
// components/UserList.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserList } from "./UserList";

// Mock the API
jest.mock("../services/api", () => ({
  fetchUsers: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("UserList Component", () => {
  test("displays loading state", () => {
    const { fetchUsers } = require("../services/api");
    fetchUsers.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<UserList />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays users when data is loaded", async () => {
    const { fetchUsers } = require("../services/api");
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];

    fetchUsers.mockResolvedValue(mockUsers);

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  test("displays error message when fetch fails", async () => {
    const { fetchUsers } = require("../services/api");
    fetchUsers.mockRejectedValue(new Error("Failed to fetch"));

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
    });
  });
});
```

### 6. Testing Context Providers

```javascript
// context/AuthContext.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "./AuthContext";

// Test component that uses the context
const TestComponent = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <span>Welcome {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login({ name: "John Doe" })}>Login</button>
      )}
    </div>
  );
};

describe("AuthContext", () => {
  test("provides authentication functionality", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially not logged in
    expect(screen.getByText(/login/i)).toBeInTheDocument();

    // Login
    await user.click(screen.getByText(/login/i));
    expect(screen.getByText(/welcome john doe/i)).toBeInTheDocument();

    // Logout
    await user.click(screen.getByText(/logout/i));
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
```

## Advanced Testing Patterns

### 1. Page Object Model

```javascript
// test-utils/PageObjects.js
export class LoginPage {
  constructor(user) {
    this.user = user;
  }

  async fillUsername(username) {
    const input = screen.getByLabelText(/username/i);
    await this.user.clear(input);
    await this.user.type(input, username);
  }

  async fillPassword(password) {
    const input = screen.getByLabelText(/password/i);
    await this.user.clear(input);
    await this.user.type(input, password);
  }

  async submit() {
    const button = screen.getByRole("button", { name: /login/i });
    await this.user.click(button);
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }
}
```

### 2. Custom Test Utilities

```javascript
// test-utils/index.js
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export const renderWithProviders = (ui, options = {}) => {
  const {
    initialEntries = ["/"],
    queryClient = createTestQueryClient(),
    ...renderOptions
  } = options;

  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything
export * from "@testing-library/react";
export { renderWithProviders as render };
```

### 3. Mock Strategies

```javascript
// __mocks__/localStorage.js
export const localStorageMock = (() => {
  let store = {};

  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
```

## Test Organization

### 1. File Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.test.jsx
│   │   └── Button.stories.jsx
├── hooks/
│   ├── useAuth.js
│   └── useAuth.test.js
├── __mocks__/
│   ├── localStorage.js
│   └── api.js
└── test-utils/
    ├── index.js
    └── PageObjects.js
```

### 2. Test Naming Conventions

```javascript
describe("ComponentName", () => {
  describe("when prop is provided", () => {
    test("should render correctly", () => {
      // Test implementation
    });
  });

  describe("when user interaction occurs", () => {
    test("should call callback function", () => {
      // Test implementation
    });
  });
});
```

## Performance Testing

### 1. Testing Render Performance

```javascript
// performance/RenderPerformance.test.jsx
import { render } from "@testing-library/react";
import { performance } from "perf_hooks";
import { HeavyComponent } from "../components/HeavyComponent";

describe("HeavyComponent Performance", () => {
  test("renders within acceptable time limit", () => {
    const start = performance.now();

    render(<HeavyComponent data={largeMockData} />);

    const end = performance.now();
    const renderTime = end - start;

    expect(renderTime).toBeLessThan(100); // 100ms threshold
  });
});
```

## Best Practices

### 1. Test Behavior, Not Implementation

```javascript
// ❌ Bad - Testing implementation details
test("calls setState when button is clicked", () => {
  const spy = jest.spyOn(Component.prototype, "setState");
  // ...
});

// ✅ Good - Testing behavior
test("displays updated count when increment button is clicked", () => {
  // Test what the user sees, not how it's implemented
});
```

### 2. Use Descriptive Test Names

```javascript
// ❌ Bad
test("button test", () => {});

// ✅ Good
test("disables submit button when form is invalid", () => {});
```

### 3. Arrange, Act, Assert Pattern

```javascript
test("submits form with correct data", async () => {
  // Arrange
  const user = userEvent.setup();
  const mockSubmit = jest.fn();
  render(<Form onSubmit={mockSubmit} />);

  // Act
  await user.type(screen.getByLabelText(/name/i), "John");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  // Assert
  expect(mockSubmit).toHaveBeenCalledWith({ name: "John" });
});
```

## Continuous Integration

### 1. GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage --watchAll=false

      - name: Upload coverage
        uses: codecov/codecov-action@v1
```

## Common Testing Pitfalls

### 1. Testing Implementation Details

- Don't test internal state directly
- Focus on user interactions and outcomes

### 2. Not Testing Error States

- Always test loading, success, and error states
- Test edge cases and error boundaries

### 3. Overusing Mocks

- Mock external dependencies, not internal logic
- Use real implementations when possible

### 4. Not Testing Accessibility

- Use semantic queries (getByRole, getByLabelText)
- Test keyboard navigation and screen reader support

## Tools and Resources

### Testing Libraries

- **Jest**: JavaScript testing framework
- **React Testing Library**: Simple and complete testing utilities
- **MSW**: Mock Service Worker for API mocking
- **Cypress**: E2E testing framework

### Helpful Extensions

- **Jest Runner**: VS Code extension for running tests
- **Coverage Gutters**: Show test coverage in editor
- **React Developer Tools**: Browser extension for debugging

### Learning Resources

- [Testing Library Documentation](https://testing-library.com/)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Patterns](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
