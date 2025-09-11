# Data Management

## Lesson 4 - API Integration & State Management

---

### Learning Objectives

By the end of this lesson, you will be able to:

- Integrate with REST APIs
- Handle errors effectively
- Manage application state
- Implement real-time updates

---

### API Client Setup

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### Custom API Hook

```typescript
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T>(url);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

---

### Error Handling

```typescript
class ApiError extends Error {
  constructor(message: string, public status: number, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

function ErrorBoundary({ children }: PropsWithChildren) {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return children;
}
```

---

### State Management

1. Local State (useState)
2. Context API
3. Custom Hooks
4. External Libraries

---

### Real-time Updates

```typescript
function useWebSocket<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<"connecting" | "connected" | "closed">(
    "connecting"
  );

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setStatus("connected");
    ws.onclose = () => setStatus("closed");
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    return () => ws.close();
  }, [url]);

  return { data, status };
}
```

---

### Best Practices

1. API Integration

   - Error Handling
   - Loading States
   - Data Caching
   - Request Cancellation

2. State Management
   - Single Source of Truth
   - Immutable Updates
   - Optimistic Updates
   - State Normalization

---

### Common Pitfalls

1. API Issues

   - Missing Error Handling
   - Race Conditions
   - Memory Leaks

2. State Issues
   - State Duplication
   - Unnecessary Updates
   - Complex State Logic

---

### Practical Exercise

Create a Data Table with API:

```typescript
function UserTable() {
  const { data, loading, error } = useApi<User[]>("/users");

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <DataTable
      data={data || []}
      columns={[
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
      ]}
    />
  );
}
```

---

### Additional Resources

- [Axios Documentation](https://axios-http.com)
- [React Query](https://tanstack.com/query/latest)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
