# React Course Project Templates

## Overview

This document outlines three project templates of increasing complexity for students to practice React concepts learned throughout the course.

## Project 1: Todo Application (Beginner)

### 🎯 Learning Goals

- Component creation and composition
- Local state management with useState
- Event handling and form submission
- Array manipulation and rendering lists
- Basic styling and responsive design

### 📋 Project Requirements

#### Core Features

1. **Add New Tasks**

   - Input field to enter task description
   - Add button to submit new tasks
   - Clear input after submission

2. **Display Task List**

   - Show all tasks in a list format
   - Display task description and status
   - Show creation timestamp

3. **Mark Tasks Complete**

   - Toggle task completion status
   - Visual indication of completed tasks
   - Strikethrough text for completed items

4. **Delete Tasks**

   - Remove tasks from the list
   - Confirmation dialog (optional)

5. **Filter Tasks**
   - Show all tasks
   - Show only active tasks
   - Show only completed tasks

#### Bonus Features

- Task counter (active/total)
- Edit existing tasks
- Task priorities (high, medium, low)
- Local storage persistence
- Drag and drop reordering

### 🏗️ Implementation Guide

#### 1. Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── TodoApp.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoFilter.jsx
│   ├── hooks/
│   │   └── useTodos.js
│   ├── styles/
│   │   └── TodoApp.css
│   └── utils/
│       └── helpers.js
```

#### 2. Component Breakdown

```jsx
// components/TodoApp.jsx
import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
}

export default TodoApp;
```

#### 3. Custom Hook Example

```jsx
// hooks/useTodos.js
import { useState, useEffect } from "react";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save to localStorage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const stats = {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
  };
}
```

### 📚 Concepts Practiced

- Functional components and JSX
- State management with useState
- Event handling and forms
- Conditional rendering
- List rendering with keys
- Props passing and composition
- CSS styling and classes

---

## Project 2: E-commerce Store (Intermediate)

### 🎯 Learning Goals

- Complex state management
- API integration with React Query
- Routing with React Router
- Authentication and protected routes
- Context API for global state
- Form validation and error handling

### 📋 Project Requirements

#### Core Features

1. **Product Catalog**

   - Display products in grid layout
   - Product search and filtering
   - Category-based navigation
   - Product detail pages

2. **Shopping Cart**

   - Add/remove products
   - Update quantities
   - Cart persistence
   - Total calculation

3. **User Authentication**

   - Registration and login forms
   - JWT token management
   - Protected routes
   - User profile page

4. **Checkout Process**
   - Order form with validation
   - Order confirmation
   - Order history

#### Bonus Features

- Product reviews and ratings
- Wishlist functionality
- Responsive design
- Loading states and skeletons
- Error boundaries

### 🏗️ Implementation Guide

#### 1. Project Structure

```
ecommerce-store/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── products/
│   │   ├── cart/
│   │   └── auth/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   └── CheckoutPage.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useProducts.js
│   ├── services/
│   │   └── api.js
│   └── utils/
│       ├── validation.js
│       └── helpers.js
```

#### 2. API Integration Example

```jsx
// services/api.js
const API_BASE = "https://your-mock-api.com/api";

export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) throw new Error("Product not found");
    return response.json();
  },

  // Auth
  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },

  // Orders
  createOrder: async (orderData) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Order creation failed");
    return response.json();
  },
};
```

#### 3. Cart Context Implementation

```jsx
// context/CartContext.jsx
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
```

### 📚 Concepts Practiced

- React Router navigation
- Context API for global state
- React Query for API management
- Form validation and error handling
- Authentication and protected routes
- Complex state management patterns

---

## Project 3: Social Media Dashboard (Advanced)

### 🎯 Learning Goals

- Real-time data with WebSockets
- Advanced state management (Redux/Zustand)
- Performance optimization
- Testing implementation
- Deployment and CI/CD
- Advanced React patterns

### 📋 Project Requirements

#### Core Features

1. **Real-time Feed**

   - Live post updates
   - Real-time notifications
   - Infinite scrolling
   - Like and comment functionality

2. **User Management**

   - User profiles and settings
   - Follow/unfollow system
   - Profile customization
   - Activity tracking

3. **Content Creation**

   - Rich text editor
   - Image/video uploads
   - Post scheduling
   - Draft management

4. **Analytics Dashboard**
   - Engagement metrics
   - User activity charts
   - Performance insights
   - Export functionality

#### Bonus Features

- Dark/light theme system
- PWA capabilities
- Push notifications
- Advanced search with filters
- Admin panel
- Moderation tools

### 🏗️ Implementation Guide

#### 1. Project Structure

```
social-dashboard/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── feed/
│   │   ├── profile/
│   │   ├── analytics/
│   │   └── admin/
│   ├── pages/
│   ├── store/
│   │   ├── slices/
│   │   └── index.js
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── types/
│   └── __tests__/
```

#### 2. WebSocket Integration

```jsx
// hooks/useWebSocket.js
import { useEffect, useRef, useState } from "react";

export function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const reconnectTimeoutRef = useRef();

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        setIsConnected(true);
        setSocket(ws);
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setLastMessage(message);
      };

      ws.onclose = () => {
        setIsConnected(false);
        setSocket(null);
        console.log("WebSocket disconnected, attempting to reconnect...");

        // Reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    }
  };

  return { socket, isConnected, lastMessage, sendMessage };
}
```

#### 3. Performance Optimization Example

```jsx
// components/VirtualizedFeed.jsx
import { FixedSizeList as List } from "react-window";
import { memo } from "react";

const PostItem = memo(({ index, style, data }) => (
  <div style={style}>
    <Post post={data[index]} />
  </div>
));

function VirtualizedFeed({ posts }) {
  return (
    <List height={600} itemCount={posts.length} itemSize={200} itemData={posts}>
      {PostItem}
    </List>
  );
}

export default VirtualizedFeed;
```

### 📚 Concepts Practiced

- Advanced state management
- Real-time data handling
- Performance optimization
- Testing strategies
- Deployment pipelines
- Advanced React patterns

---

## Getting Started

### Choose Your Project Level

1. **Beginner**: Start with the Todo Application
2. **Intermediate**: Move to the E-commerce Store
3. **Advanced**: Challenge yourself with the Social Media Dashboard

### Setup Instructions

```bash
# Create new React project
npm create vite@latest my-project -- --template react

# Navigate to project
cd my-project

# Install additional dependencies (as needed)
npm install react-router-dom @tanstack/react-query

# Start development server
npm run dev
```

### Submission Guidelines

Each project should include:

1. **Complete source code** with proper file organization
2. **README.md** with setup instructions and feature list
3. **Live demo** deployed to Netlify/Vercel
4. **Test coverage** for critical components
5. **Documentation** of key decisions and challenges

### Evaluation Criteria

- **Functionality**: All core features working correctly
- **Code Quality**: Clean, readable, and well-organized code
- **Best Practices**: Following React conventions and patterns
- **User Experience**: Intuitive and responsive design
- **Documentation**: Clear setup and usage instructions
