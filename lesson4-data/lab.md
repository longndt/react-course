# Lab 4: Data Management in React

## Overview

In this lab, you'll learn different approaches to managing data in React applications, including state management with useState and useReducer, data fetching with React Query, and working with forms.

## Exercises

### Exercise 1: Custom Data Fetching Hook (45 minutes)

1. Create a useFetch hook:

```jsx
// src/hooks/useFetch.js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}
```

2. Use the hook in a component:

```jsx
// src/components/UserList.jsx
function UserList() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-list">
      {data?.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### Exercise 2: React Query Implementation (45 minutes)

1. Set up React Query:

```bash
npm install @tanstack/react-query
```

2. Configure React Query:

```jsx
// src/main.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

3. Create a custom hook for todos:

```jsx
// src/hooks/useTodos.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    error: todosQuery.error,
    addTodo: addTodoMutation.mutate,
    isAdding: addTodoMutation.isLoading,
  };
}

export default useTodos;
```

4. Use the todos hook in a component:

```jsx
// src/components/TodoList.jsx
import useTodos from "../hooks/useTodos";

function TodoList() {
  const { todos, isLoading, isError, error, addTodo, isAdding } = useTodos();

  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    addTodo({
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          disabled={isAdding}
        />
        <button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Todo"}
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Exercise 3: Complex State Management with useReducer (45 minutes)

1. Create a shopping cart reducer:

```jsx
// src/reducers/cartReducer.js
const initialState = {
  items: [],
  total: 0,
};

function cartReducer(state, action) {
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
          total: state.total + action.payload.price,
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };

    case "REMOVE_ITEM":
      const item = state.items.find((item) => item.id === action.payload);

      if (item.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          total: state.total - item.price,
        };
      }

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - item.price,
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export { initialState, cartReducer };
```

2. Create a shopping cart context:

```jsx
// src/context/CartContext.jsx
import { cartReducer, initialState } from "../reducers/cartReducer";

const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
```

3. Create cart components:

```jsx
// src/components/Cart/CartItem.jsx
function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}

// src/components/Cart/CartSummary.jsx
function CartSummary({ items, total }) {
  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      <p>Total Items: {items.length}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}

// src/components/Cart/Cart.jsx
function Cart() {
  const { items, total, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <button className="clear-cart" onClick={clearCart}>
        Clear Cart
      </button>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeItem} />
        ))}
      </div>

      <CartSummary items={items} total={total} />
    </div>
  );
}
```

## Bonus Tasks

### 1. Implement Optimistic Updates

Add optimistic updates to the todo list:

```jsx
const addTodoMutation = useMutation({
  mutationFn: async (newTodo) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });
    return response.json();
  },
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });

    const previousTodos = queryClient.getQueryData(["todos"]);

    queryClient.setQueryData(["todos"], (old) => [
      ...old,
      { id: Date.now(), ...newTodo },
    ]);

    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(["todos"], context.previousTodos);
  },
});
```

### 2. Add Infinite Loading

Implement infinite scroll for a list of items:

```jsx
function InfiniteList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  return (
    <div>
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </React.Fragment>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
}
```

## Submission Requirements

1. GitHub repository containing:

   - Complete application code
   - README with setup instructions
   - Data management architecture documentation
   - Examples of state updates and data fetching

2. Your implementation should demonstrate:
   - Custom hooks for data fetching
   - React Query integration
   - Complex state management
   - Error handling
   - Loading states

## Grading Criteria

- Data Fetching Implementation (25%)
- State Management (25%)
- React Query Usage (25%)
- Error Handling (15%)
- Code Quality (10%)

## Additional Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [useReducer Hook](https://react.dev/reference/react/useReducer)
- [Custom Hooks Guide](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Data Fetching Best Practices](https://tanstack.com/query/latest/docs/react/guides/important-defaults)
