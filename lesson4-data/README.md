# Lesson 4: Advanced Data Handling & API Integration

## Overview

This lesson covers modern approaches to data fetching, caching, and real-time updates in React applications.

## Prerequisites

- Completion of Lessons 1-3
- Understanding of REST APIs
- Basic knowledge of WebSocket
- Familiarity with GraphQL concepts

## Theory (45 minutes)

### 1. React Query Fundamentals

- Query basics
- Mutations
- Query invalidation
- Infinite queries
- Optimistic updates

### 2. Real-time Data

- WebSocket integration
- Server-Sent Events
- Real-time updates
- Data synchronization

### 3. Error Handling

- Error boundaries
- Network errors
- Retry mechanisms
- Fallback UI

### 4. Data Caching

- Browser cache
- Local storage
- IndexedDB
- Service workers

## Demo (45 minutes)

### 1. React Query Setup

```tsx
// QueryClient setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 3,
    },
  },
});

// App.tsx
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}
```

### 2. Data Fetching Hooks

```tsx
// useProducts.ts
interface Product {
  id: string;
  name: string;
  price: number;
}

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

// Using optimistic updates
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Product) => {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(product),
      });
      return response.json();
    },
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old: Product[]) =>
        old.map((p) => (p.id === newProduct.id ? newProduct : p))
      );

      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      queryClient.setQueryData(["products"], context.previousProducts);
    },
  });
};
```

### 3. WebSocket Integration

```tsx
// useWebSocket.ts
export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: any) => {
    ws.current?.send(JSON.stringify(message));
  }, []);

  return { messages, sendMessage };
};
```

## Lab Exercises (90 minutes)

### Exercise 1: React Query Implementation (30 mins)

1. Set up React Query in your application
2. Create queries for:
   - Product list
   - User profile
   - Order history
3. Implement mutations
4. Add optimistic updates

### Exercise 2: Real-time Features (30 mins)

1. Implement WebSocket connection
2. Create real-time chat
3. Add live notifications
4. Handle connection errors

### Exercise 3: Error Handling & Caching (30 mins)

1. Implement error boundaries
2. Add retry logic
3. Create fallback UI
4. Set up data persistence

## Project Structure

```
src/
├── queries/
│   ├── useProducts.ts
│   ├── useOrders.ts
│   └── useProfile.ts
├── realtime/
│   ├── useWebSocket.ts
│   └── NotificationSystem.tsx
├── errors/
│   ├── ErrorBoundary.tsx
│   └── FallbackUI.tsx
└── cache/
    ├── localStorage.ts
    └── indexedDB.ts
```

## Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Error Boundary Pattern](https://reactjs.org/docs/error-boundaries.html)
- [Browser Storage Guide](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)

## Homework

1. Build a real-time dashboard
2. Implement infinite scrolling
3. Add offline support
4. Create a caching strategy
5. Write tests for queries
