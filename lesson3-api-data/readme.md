# Lesson 3: API Integration & Data Management

## Overview

This lesson covers integrating React applications with backend APIs and managing data effectively. You'll learn REST API integration, data fetching patterns, error handling, and state management for complex data workflows with React Query.

## Learning Objectives

After this lesson, you will be able to:

- ✅ Understand REST API concepts and HTTP methods (GET, POST, PUT, DELETE)
- ✅ Integrate React with Node\.ts/Express backends and MongoDB
- ✅ Implement data fetching patterns with fetch API and React Query
- ✅ Handle loading states, errors, and edge cases professionally
- ✅ Build complete CRUD operations with optimistic updates
- ✅ Manage complex application state with data synchronization
- ✅ Implement search, filtering, sorting, and pagination
- ✅ Handle file uploads and media management

---

## What You'll Learn

### 1. REST API Fundamentals

**HTTP Methods:**
- **GET** - Retrieve data from server
- **POST** - Create new resources
- **PUT** - Update existing resources
- **DELETE** - Remove resources

**Key Concepts:**
- Status codes (200, 201, 400, 404, 500)
- Request headers and body
- Response handling
- Error codes and messages

**API Design:**
- RESTful endpoints (`/api/users`, `/api/users/:id`)
- Query parameters for filtering/sorting
- Pagination strategies
- API authentication (JWT tokens)

### 2. Data Fetching Patterns

**Native Fetch API:**
- Making HTTP requests
- Handling JSON responses
- Error handling with try/catch
- Async/await patterns

**React Query (TanStack Query):**
- Automatic caching and background updates
- Loading and error states management
- Optimistic updates
- Query invalidation and refetching

**Best Practices:**
- Separate API logic from components
- Create reusable API client
- Handle network errors gracefully
- Implement retry mechanisms

### 3. State Management for Data

**Local Component State:**
- useState for simple data
- useReducer for complex state
- Derived state patterns
- State normalization

**Global State with Context:**
- When to use global vs local state
- AuthContext for user data
- DataContext for shared resources
- Performance considerations

**React Query State:**
- Server state vs client state
- Cache management
- Background synchronization
- Stale-while-revalidate pattern

### 4. CRUD Operations

**Create:**
- Form handling and validation
- POST requests with data
- Success/error feedback
- Optimistic UI updates

**Read:**
- GET requests with parameters
- List and detail views
- Loading skeletons
- Empty states

**Update:**
- PUT/PATCH requests
- Inline editing patterns
- Conflict resolution
- Optimistic updates

**Delete:**
- DELETE requests
- Confirmation dialogs
- Undo functionality
- Cascade deletes

### 5. Advanced Features

**Search & Filtering:**
- Client-side vs server-side filtering
- Debounced search input
- Filter combinations
- Clear filters functionality

**Pagination:**
- Page-based pagination
- Cursor-based pagination
- Infinite scroll
- Load more pattern

**Sorting:**
- Single and multi-column sort
- Ascending/descending order
- Server-side vs client-side sorting

---

## Lesson Structure

### 📚 Theory
- **[theory3.md](./theory/theory3.md)** - Comprehensive guide to API integration and data management

### 💻 Demo
- **[demo/](./demo/)** - Live task management application with full CRUD

### 🔬 Lab
- **[lab3.md](./lab/lab3.md)** - Build a complete API-integrated application

### ⚡ Quick Start
- **[quickstart.md](./quickstart.md)** - Quick reference for API patterns

---

## Quick Examples

### Basic GET Request
```typescript
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) throw new Error('Failed to fetch');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### POST Request with Data
```typescript
async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}
```

### React Component with Fetch
```typescript
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### React Query Example
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Users() {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => createMutation.mutate({ name: 'John' })}>
        Add User
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### API Client Pattern
```typescript
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

const api = new ApiClient('https://api.example.com');
```

---

## Best Practices

### 🎯 API Integration
- **Use API client class**: Centralize all API calls
- **Handle errors properly**: User-friendly error messages
- **Show loading states**: Skeleton screens or spinners
- **Validate data**: Both client and server-side

### ⚡ Performance
- **Cache API responses**: Use React Query or manual caching
- **Debounce search inputs**: Reduce API calls
- **Implement pagination**: Don't load all data at once
- **Optimize re-renders**: Memoize components when needed

### 🏗️ Code Organization
- **Separate concerns**: API logic separate from UI
- **Use custom hooks**: Encapsulate data fetching logic
- **Type your data**: Use TypeScript or PropTypes
- **Error boundaries**: Catch and handle errors gracefully

### 🔒 Security
- **Never expose API keys**: Use environment variables
- **Validate inputs**: Sanitize user data
- **Use HTTPS**: Always in production
- **Implement CORS**: Configure properly on backend

---

## Common Pitfalls

### ❌ API Mistakes
- **Forgetting error handling**: Always use try/catch
- **Not checking response.ok**: Check before parsing JSON
- **Missing loading states**: Users need feedback
- **Infinite loops**: useEffect dependency errors

### ❌ State Management Issues
- **Over-fetching data**: Request only what you need
- **Stale data**: Implement proper cache invalidation
- **Race conditions**: Cancel previous requests
- **Memory leaks**: Clean up in useEffect return

### ❌ UX Problems
- **No empty states**: Show message when no data
- **Poor error messages**: Be specific and helpful
- **Missing confirmation**: Confirm destructive actions
- **No offline handling**: Detect and handle network issues

---

## Knowledge Checkpoint

Before proceeding, ensure you understand:

### REST API Basics
- [ ] HTTP methods (GET, POST, PUT, DELETE) and when to use each
- [ ] Status codes (200, 201, 400, 404, 500) and their meanings
- [ ] Request headers and how to send data in body
- [ ] Error handling and retry strategies

### Data Fetching
- [ ] Using fetch API with async/await
- [ ] Handling loading and error states
- [ ] React Query basics (useQuery, useMutation)
- [ ] Cache invalidation and refetching

### CRUD Operations
- [ ] Creating resources with POST requests
- [ ] Reading data with GET requests
- [ ] Updating with PUT/PATCH requests
- [ ] Deleting with DELETE requests

### Advanced Features
- [ ] Implementing search and filtering
- [ ] Adding pagination to lists
- [ ] Optimistic UI updates
- [ ] File upload handling

**🎯 Goal: Understand all concepts before starting the lab**

---

## Self-Assessment

Rate your confidence (1-5) in these areas:

**REST API Integration** ⭐⭐⭐⭐⭐
- [ ] Making GET requests to fetch data
- [ ] Sending POST requests with data
- [ ] Handling errors with try/catch
- [ ] Understanding status codes

**Data Management** ⭐⭐⭐⭐⭐
- [ ] Managing API data in React state
- [ ] Using useEffect for data fetching
- [ ] Implementing CRUD operations
- [ ] Form submission to APIs

**React Query** ⭐⭐⭐⭐⭐
- [ ] Setting up React Query
- [ ] Using useQuery for fetching
- [ ] Using useMutation for updates
- [ ] Cache invalidation

**Advanced Features** ⭐⭐⭐⭐⭐
- [ ] Search and filtering
- [ ] Pagination implementation
- [ ] Optimistic updates
- [ ] Error recovery

**Target Score: 16/20 (4+ average) to build production-ready apps**

---

## What's Next?

After completing this lesson, you'll be able to:

1. **Connect to APIs**: Fetch and send data to backend services
2. **Manage Complex Data**: Handle loading, errors, and caching
3. **Build CRUD Apps**: Create full-featured data-driven applications
4. **Optimize UX**: Implement search, pagination, and smooth updates

**🎓 You're now ready for Lesson 4: Routing & Authentication!**

---

## Additional Resources

- 📖 [API Integration Guide](./theory/theory3.md)
- 💻 [Demo Application](./demo/)
- 🔬 [Lab Exercises](./lab/lab3.md)
- ⚡ [Quick Reference](./quickstart.md)
- 📚 [React Query Docs](https://tanstack.com/query/latest)
- 🌐 [REST API Tutorial](https://restfulapi.net/)
- 🔧 [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)


