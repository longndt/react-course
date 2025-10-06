# Advanced State Management in React

## Overview

This guide covers various state management patterns and libraries for React applications, from built-in solutions to external libraries.

## Table of Contents

1. [Built-in State Management](#built-in-state-management)
2. [Context API Patterns](#context-api-patterns)
3. [Zustand - Lightweight State Manager](#zustand)
4. [Redux Toolkit - Enterprise Solution](#redux-toolkit)
5. [State Management Best Practices](#best-practices)

## Built-in State Management

### 1. Local Component State

```jsx
// Simple local state
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Complex local state with useReducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: "ADD_TODO", text });
  };

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
          onDelete={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
        />
      ))}
    </div>
  );
}
```

## Context API Patterns

### 1. Authentication Context

```jsx
// contexts/AuthContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";

// Types
const AuthActions = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  RESTORE_SESSION: "RESTORE_SESSION",
};

// Initial state
const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case AuthActions.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case AuthActions.LOGOUT:
      return {
        ...initialState,
      };

    case AuthActions.RESTORE_SESSION:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

// Context
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Actions
  const login = async (credentials) => {
    dispatch({ type: AuthActions.LOGIN_START });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { user, token } = await response.json();

      // Store token
      localStorage.setItem("authToken", token);

      dispatch({
        type: AuthActions.LOGIN_SUCCESS,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: AuthActions.LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: AuthActions.LOGOUT });
  };

  const restoreSession = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Verify token and get user data
      fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          dispatch({
            type: AuthActions.RESTORE_SESSION,
            payload: user,
          });
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    }
  };

  // Restore session on mount
  useEffect(() => {
    restoreSession();
  }, []);

  const value = {
    ...state,
    login,
    logout,
    restoreSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
```

### 2. Theme Context

```jsx
// contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = {
  light: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#ffffff",
    surface: "#f8f9fa",
    text: "#212529",
    textSecondary: "#6c757d",
    border: "#dee2e6",
  },
  dark: {
    primary: "#0d6efd",
    secondary: "#6c757d",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
    textSecondary: "#b3b3b3",
    border: "#333333",
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    availableThemes: Object.keys(themes),
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
```

## Zustand - Lightweight State Manager

### Installation

```bash
npm install zustand
```

### 1. Basic Store

```jsx
// stores/useCounterStore.js
import { create } from "zustand";

export const useCounterStore = create((set, get) => ({
  // State
  count: 0,

  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),

  // Computed values
  get isEven() {
    return get().count % 2 === 0;
  },
}));

// Usage in component
function Counter() {
  const { count, increment, decrement, reset, isEven } = useCounterStore();

  return (
    <div>
      <p>
        Count: {count} {isEven ? "(Even)" : "(Odd)"}
      </p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### 2. Complex Store with Persistence

```jsx
// stores/useAuthStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useAuthStore = create(
  persist(
    immer((set, get) => ({
      // State
      user: null,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) throw new Error("Login failed");

          const { user, token } = await response.json();

          set((state) => {
            state.user = user;
            state.isLoading = false;
          });

          localStorage.setItem("authToken", token);
        } catch (error) {
          set((state) => {
            state.error = error.message;
            state.isLoading = false;
          });
        }
      },

      logout: () => {
        localStorage.removeItem("authToken");
        set((state) => {
          state.user = null;
          state.error = null;
        });
      },

      updateProfile: (updates) => {
        set((state) => {
          if (state.user) {
            Object.assign(state.user, updates);
          }
        });
      },

      // Getters
      get isAuthenticated() {
        return !!get().user;
      },
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }), // Only persist user
    }
  )
);
```

### 3. Shopping Cart Store

```jsx
// stores/useCartStore.js
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useCartStore = create(
  immer((set, get) => ({
    // State
    items: [],
    isOpen: false,

    // Actions
    addItem: (product) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...product, quantity: 1 });
        }
      });
    },

    removeItem: (productId) => {
      set((state) => {
        state.items = state.items.filter((item) => item.id !== productId);
      });
    },

    updateQuantity: (productId, quantity) => {
      set((state) => {
        const item = state.items.find((item) => item.id === productId);
        if (item) {
          if (quantity <= 0) {
            state.items = state.items.filter((item) => item.id !== productId);
          } else {
            item.quantity = quantity;
          }
        }
      });
    },

    clearCart: () => {
      set((state) => {
        state.items = [];
      });
    },

    toggleCart: () => {
      set((state) => {
        state.isOpen = !state.isOpen;
      });
    },

    // Computed values
    get totalItems() {
      return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    get totalPrice() {
      return get().items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  }))
);

// Usage
interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}

function CartSummary() {
  const { totalItems, totalPrice } = useCartStore();

  return (
    <div className="cart-summary">
      <p>Items: {totalItems}</p>
      <p>Total: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}
```

## Redux Toolkit - Enterprise Solution

### Installation

```bash
npm install @reduxjs/toolkit react-redux
```

### 1. Store Setup

```jsx
// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import productsSlice from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Auth Slice

```jsx
// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("authToken");
  return null;
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateProfile: (state, action) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearError, updateProfile } = authSlice.actions;
export default authSlice.reducer;
```

### 3. Typed Hooks

```jsx
// hooks/redux.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 4. Usage in Components

```jsx
// components/LoginForm.jsx
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loginUser, clearError } from "../store/slices/authSlice";

function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error">
          {error}
          <button onClick={() => dispatch(clearError())}>×</button>
        </div>
      )}

      <input
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
        placeholder="Email"
      />

      <input
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
        placeholder="Password"
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

## Best Practices

### 1. Choose the Right Tool

| Tool          | Best For                  | Complexity | Learning Curve |
| ------------- | ------------------------- | ---------- | -------------- |
| useState      | Local component state     | Low        | Easy           |
| useReducer    | Complex local state       | Medium     | Medium         |
| Context API   | Occasional global state   | Medium     | Medium         |
| Zustand       | Frequent global state     | Low        | Easy           |
| Redux Toolkit | Complex apps, time travel | High       | Steep          |

### 2. State Structure Guidelines

```jsx
//  Bad - Nested state
const [state, setState] = useState({
  user: {
    profile: {
      name: "",
      settings: {
        theme: "light",
        notifications: true,
      },
    },
  },
});

//  Good - Flat state structure
const [userName, setUserName] = useState("");
const [theme, setTheme] = useState("light");
const [notifications, setNotifications] = useState(true);

// Or with Zustand
export const useUserStore = create((set) => ({
  name: "",
  theme: "light",
  notifications: true,
  updateName: (name) => set({ name }),
  updateTheme: (theme) => set({ theme }),
  toggleNotifications: () =>
    set((state) => ({
      notifications: !state.notifications,
    })),
}));
```

### 3. Performance Optimization

```jsx
// Use selectors to prevent unnecessary re-renders
const userName = useUserStore((state) => state.name);
const userEmail = useUserStore((state) => state.email);

// Better - use shallow comparison for multiple values
import { shallow } from "zustand/shallow";

const { name, email } = useUserStore(
  (state) => ({ name: state.name, email: state.email }),
  shallow
);

// Or create a selector
const useUserInfo = () =>
  useUserStore((state) => ({ name: state.name, email: state.email }), shallow);
```

### 4. Error Handling

```jsx
// Centralized error handling
export const useErrorStore = create((set) => ({
  errors: [],
  addError: (error) =>
    set((state) => ({
      errors: [...state.errors, { id: Date.now(), message: error }],
    })),
  removeError: (id) =>
    set((state) => ({
      errors: state.errors.filter((error) => error.id !== id),
    })),
  clearErrors: () => set({ errors: [] }),
}));

// Error boundary component
function ErrorDisplay() {
  const { errors, removeError } = useErrorStore();

  return (
    <div className="error-container">
      {errors.map((error) => (
        <div key={error.id} className="error-message">
          {error.message}
          <button onClick={() => removeError(error.id)}>×</button>
        </div>
      ))}
    </div>
  );
}
```

## Testing State Management

### 1. Testing Zustand Stores

```jsx
// stores/useCounter.test.js
import { renderHook, act } from "@testing-library/react";
import { useCounterStore } from "./useCounterStore";

describe("useCounterStore", () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  test("increments count", () => {
    const { result } = renderHook(() => useCounterStore());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

### 2. Testing Redux Slices

```jsx
// slices/authSlice.test.js
import authReducer, { loginUser } from "./authSlice";

describe("authSlice", () => {
  test("should handle login success", () => {
    const initialState = { user: null, isLoading: false, error: null };
    const user = { id: 1, name: "John" };

    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isLoading).toBe(false);
  });
});
```

## Migration Strategies

### From Context to Zustand

```jsx
// Before - Context API
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// After - Zustand
export const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));
```

### From Redux to Zustand

```jsx
// Before - Redux slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// After - Zustand store
export const useCounterStore = create((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
  decrement: () => set((state) => ({ value: state.value - 1 })),
}));
```

## Conclusion

Choose your state management solution based on:

1. **Application size and complexity**
2. **Team experience and preferences**
3. **Performance requirements**
4. **Long-term maintainability**
5. **Ecosystem and tooling needs**

Start simple with built-in solutions and migrate to more complex tools as your application grows.
