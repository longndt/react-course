# Lesson 3: API Integration & Data Management

## Overview

**Difficulty**: Intermediate to Advanced
**Prerequisites**: Lessons 1-2 completed, async/await knowledge

This lesson covers integrating React applications with backend APIs and managing data effectively. You'll learn REST API integration, data fetching patterns, error handling, and state management for complex data workflows with React Query/TanStack Query.

---

## Learning Objectives

After completing this lesson, you will be able to:

-  Understand REST API concepts and HTTP methods (GET, POST, PUT, DELETE)
-  Integrate React with Node.js/Express backends and databases
-  Implement data fetching patterns with fetch API and React Query
-  Handle loading states, errors, and edge cases professionally
-  Build complete CRUD operations with optimistic updates
-  Manage complex application state with data synchronization
-  Implement search, filtering, sorting, and pagination
-  Handle file uploads and media management
-  Secure API calls with authentication tokens
-  Debug API integration issues effectively

---

## Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
-  React fundamentals and hooks (useState, useEffect)
-  JavaScript async/await and Promises
-  HTTP basics (requests, responses, status codes)
-  JSON data format
-  Completed Lessons 1 and 2

### Environment Setup
-  Node.js 18+ installed
-  React project set up (Vite recommended)
-  Code editor (VS Code recommended)
-  API testing tool (Postman or Thunder Client)

### Optional but Helpful
- Basic understanding of REST APIs
- Familiarity with Express.js
- Knowledge of databases (MongoDB, PostgreSQL)

>  **Not ready?** → Review [Lesson 2](../lesson2-component-hook/) for hooks mastery

>  **Hooks Review**: This lesson uses `useState` and `useEffect` extensively for data fetching and state management. If you need a refresher on React Hooks, review [Lesson 2: React Hooks](../lesson2-component-hook/#2-react-hooks-essentials) before proceeding.

---

## What You'll Learn

### 1. REST API Fundamentals

**HTTP Methods:**
- **GET** - Retrieve data from server (read operations)
- **POST** - Create new resources (create operations)
- **PUT/PATCH** - Update existing resources (update operations)
- **DELETE** - Remove resources (delete operations)

**Key Concepts:**
- Status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error)
- Request headers (Content-Type, Authorization)
- Request body and query parameters
- Response handling and parsing
- Error codes and messages

**API Design Patterns:**
- RESTful endpoints structure (`/api/users`, `/api/users/:id`)
- Query parameters for filtering/sorting (`?search=john&sort=name`)
- Pagination strategies (page-based, cursor-based)
- API versioning (`/api/v1/users`)
- Authentication patterns (JWT tokens, API keys)

### 2. Data Fetching Patterns (1.5 hours)

**Native Fetch API:**
- Making HTTP requests with fetch()
- Handling JSON responses
- Error handling with try/catch
- Async/await patterns
- Request configuration (headers, method, body)

**Axios Library:**
- Installation and setup
- Request/response interceptors
- Automatic JSON parsing
- Better error handling
- Request cancellation

**React Query (TanStack Query):**
- Automatic caching and background updates
- Loading and error states management
- Optimistic updates for better UX
- Query invalidation and refetching
- Infinite queries for pagination

**Best Practices:**
- Separate API logic from components
- Create reusable API client module
- Handle network errors gracefully
- Implement retry mechanisms
- Use environment variables for API URLs

### 3. State Management for Data (1.5 hours)

**Local Component State:**
- useState for simple data
- useReducer for complex state logic
- Derived state patterns
- State normalization techniques

**Global State with Context:**
- When to use global vs local state
- AuthContext for user authentication
- DataContext for shared resources
- Performance considerations with Context
- Avoiding unnecessary re-renders

**React Query State:**
- Server state vs client state separation
- Cache management and invalidation
- Background synchronization
- Stale-while-revalidate pattern
- Query keys and organization

### 4. CRUD Operations

**Create (POST):**
- Form handling and validation
- POST requests with request body
- Success/error feedback to users
- Optimistic UI updates
- Redirect after creation

**Read (GET):**
- GET requests with query parameters
- List views and detail views
- Loading skeletons for better UX
- Empty states when no data
- Refresh and refetch patterns

**Update (PUT/PATCH):**
- PUT (full update) vs PATCH (partial update)
- Inline editing patterns
- Conflict resolution strategies
- Optimistic updates
- Undo/redo functionality

**Delete (DELETE):**
- DELETE requests with confirmation
- Confirmation dialogs for safety
- Undo functionality for better UX
- Cascade deletes for related data
- Soft delete vs hard delete

### 5. Advanced Features (1-2 hours)

**Search & Filtering:**
- Client-side vs server-side filtering
- Debounced search input (reduce API calls)
- Multiple filter combinations
- Filter persistence in URL
- Clear/reset filters functionality

**Pagination:**
- Page-based pagination (page numbers)
- Cursor-based pagination (infinite scroll)
- Infinite scroll with React Query
- "Load more" button pattern
- Total count and page info display

**Sorting:**
- Single-column and multi-column sort
- Ascending/descending toggle
- Server-side vs client-side sorting
- Sort persistence in URL
- Default sort orders

**File Uploads:**
- FormData API for file uploads
- Image preview before upload
- Progress indicators
- File size and type validation
- Multiple file uploads

---

## Quick Concept Preview

### Basic Fetch Example
```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://api.example.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

### API Client Module
```jsx
// api/client.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

// Usage
export const userApi = {
  getAll: () => apiRequest<User[]>('/users'),
  getById: (id: string) => apiRequest<User>(`/users/${id}`),
  create: (user: Partial<User>) =>
    apiRequest<User>('/users', { method: 'POST', body: JSON.stringify(user) }),
  update: (id: string, user: Partial<User>) =>
    apiRequest<User>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) }),
  delete: (id: string) =>
    apiRequest<void>(`/users/${id}`, { method: 'DELETE' }),
};
```

### React Query Example
```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserList() {
  const queryClient = useQueryClient();

  // Fetch users with automatic caching
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => userApi.getAll(),
  });

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: (newUser: Partial<User>) => userApi.create(newUser),
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Delete user mutation with optimistic update
  const deleteMutation = useMutation({
    mutationFn: (id: string) => userApi.delete(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['users'] });

      // Snapshot previous value
      const previous = queryClient.getQueryData(['users']);

      // Optimistically update
      queryClient.setQueryData(['users'], (old: User[]) =>
        old.filter(user => user.id !== id)
      );

      return { previous };
    },
    onError: (err, id, context) => {
      // Rollback on error
      queryClient.setQueryData(['users'], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => deleteMutation.mutate(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Search with Debounce
```jsx
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function SearchableUserList() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: users } = useQuery({
    queryKey: ['users', debouncedSearch],
    queryFn: () => userApi.search(debouncedSearch),
    enabled: debouncedSearch.length > 2, // Only search if 3+ characters
  });

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />
      {users?.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

>  **More examples** → Check [reference/](./reference/) for complete patterns

---

## Getting Started

Follow this 4-step learning path:

### Step 1: Study the Theory
📖 Read [theory3.md](./theory/theory3.md) - Deep dive into:
- REST API architecture and design
- HTTP protocol and status codes
- Data fetching strategies
- State management patterns
- Error handling techniques

**Time**: 60-90 minutes

### Step 2: Explore Reference Code
 Browse [reference/](./reference/) - Working examples:
- API client setup and configuration
- All CRUD operations with PropTypes validation
- React Query setup and patterns
- Search, filter, pagination examples
- Error handling and loading states

**Time**: 45-60 minutes

### Step 3: Build Example Projects
**🔨 Hands-On Practice:**

🔨 Follow [example/](./example/) - Build along:
- Simple API integration with fetch
- Full CRUD app with React Query
- Search and filter functionality
- Pagination and infinite scroll
- File upload with progress

**Time**: 120-150 minutes

### Step 4: Complete Lab Exercises
 Practice in [lab3.md](./lab/lab3.md) - Hands-on challenges:
- Level 1: Basic API integration
- Level 2: Full CRUD operations
- Level 3: Advanced features (search, pagination, uploads)

**Time**: 180-240 minutes

>  **Pro tip**: Test APIs with Postman before integrating with React

---

## Key Takeaways

###  Core Concepts to Remember

1. **Separate concerns** - API logic separate from UI components
2. **Handle all states** - loading, success, error, empty
3. **Cache intelligently** - React Query handles this automatically
4. **Validate user input** - both client-side and server-side
5. **Use PropTypes** - runtime validation for API responses
6. **Debounce searches** - reduce unnecessary API calls
7. **Optimistic updates** - update UI before API confirms
8. **Always clean up** - cancel pending requests on unmount

###  Most Important Skills

- Making HTTP requests with fetch/axios
- Managing loading and error states
- Using React Query for server state
- Implementing CRUD operations
- Handling forms and validation
- Debugging API integration issues

###  Common Realizations

- "Server state is different from client state!"
- "React Query makes data fetching so much easier"
- "Always check response.ok before parsing JSON"
- "Debouncing is essential for search inputs"
- "Optimistic updates create better UX"

---

## Best Practices Summary

###  API Integration Best Practices

**DO:**
-  Use centralized API client for all HTTP requests
-  Implement proper error handling with try/catch
-  Always check `response.ok` before parsing JSON
-  Show clear loading and error states to users
-  Use environment variables for API URLs
-  Add request/response interceptors for auth
-  Validate API responses with PropTypes

**DON'T:**
-  Hardcode API URLs in components
-  Ignore error responses from API
-  Parse JSON without checking response status
-  Make API calls in render function
-  Store sensitive data in localStorage
-  Forget to handle network failures

###  React Query Best Practices

**DO:**
-  Use query keys consistently
-  Invalidate queries after mutations
-  Implement optimistic updates for better UX
-  Configure stale time appropriately
-  Use enabled option to control query execution
-  Handle loading and error states
-  Cancel queries when component unmounts

**DON'T:**
-  Use useState for server data
-  Forget to invalidate related queries
-  Ignore mutation error handling
-  Over-fetch data (use pagination)
-  Cache sensitive data too long

###  Performance Optimization

**DO:**
-  Debounce search inputs (500ms recommended)
-  Implement pagination for large datasets
-  Use React Query's automatic caching
-  Lazy load heavy components
-  Cancel pending requests on navigation
-  Use optimistic updates to reduce perceived latency

**DON'T:**
-  Fetch all data at once (use pagination)
-  Make API calls on every keystroke
-  Load large images without optimization
-  Re-fetch unchanged data repeatedly

###  Security Best Practices

**DO:**
-  Store API keys in environment variables
-  Validate and sanitize all user inputs
-  Use HTTPS in production
-  Implement proper CORS configuration
-  Add authentication tokens to requests
-  Handle 401/403 responses (unauthorized)

**DON'T:**
-  Store tokens in localStorage (use httpOnly cookies)
-  Send passwords in URL parameters
-  Expose API keys in frontend code
-  Trust user input without validation

---

## Common Challenges & Solutions

### Challenge 1: Infinite Re-renders with useEffect
**Problem:** Component keeps re-rendering and making API calls
```jsx
//  Wrong - creates new object reference every render
useEffect(() => {
  fetchUsers({ filter: 'active' });
}, [{ filter: 'active' }]); // New object every render

//  Correct - stable dependencies
const filter = 'active';
useEffect(() => {
  fetchUsers({ filter });
}, [filter]);
```

**Solution:** Use primitive values in dependencies, or useMemo for objects

### Challenge 2: Stale Data After Mutations
**Problem:** List doesn't update after creating/deleting item
```jsx
//  Wrong - no refetch after mutation
const createUser = async (user) => {
  await api.createUser(user);
  // List still shows old data
};

//  Correct - invalidate query
const createMutation = useMutation({
  mutationFn: api.createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

**Solution:** Invalidate queries with React Query after mutations

### Challenge 3: Race Conditions
**Problem:** Fast typing causes out-of-order responses
```jsx
//  Wrong - no cancellation
useEffect(() => {
  fetch(`/api/search?q=${query}`)
    .then(res => res.json())
    .then(setResults);
}, [query]);

//  Correct - use AbortController
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(res => res.json())
    .then(setResults)
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err);
    });

  return () => controller.abort();
}, [query]);
```

**Solution:** Use AbortController or React Query (handles this automatically)

### Challenge 4: Poor Error Messages
**Problem:** Generic errors don't help users
```jsx
//  Wrong - unclear error
catch (error) {
  setError('Something went wrong');
}

//  Correct - specific, actionable errors
catch (error) {
  if (error.status === 404) {
    setError('User not found. Please check the ID.');
  } else if (error.status === 401) {
    setError('Please log in to continue.');
  } else {
    setError(`Failed to load user: ${error.message}`);
  }
}
```

**Solution:** Map API errors to user-friendly, actionable messages

### Challenge 5: Too Many API Calls
**Problem:** Search makes API call on every keystroke
```jsx
//  Wrong - API call on every keystroke
<input onChange={(e) => searchUsers(e.target.value)} />

//  Correct - debounced search
const debouncedSearch = useDebounce(search, 500);
useEffect(() => {
  if (debouncedSearch) searchUsers(debouncedSearch);
}, [debouncedSearch]);
```

**Solution:** Debounce user input (500ms typical), or use React Query with enabled option

>  **More troubleshooting** → See [Troubleshooting Guide](../extra/troubleshooting.md)

---

## Progress Checklist

### REST API Fundamentals (Must Know)
- [ ] Understand HTTP methods (GET, POST, PUT, DELETE)
- [ ] Know common status codes (200, 201, 400, 404, 500)
- [ ] Make API requests using fetch or axios
- [ ] Handle JSON responses correctly
- [ ] Work with async/await patterns

### React Integration (Must Know)
- [ ] Fetch data in useEffect hook
- [ ] Manage loading, error, and success states
- [ ] Display API data in components
- [ ] Handle form submissions to API
- [ ] Cancel requests on component unmount

### React Query (Should Know)
- [ ] Set up QueryClient provider
- [ ] Use useQuery for data fetching
- [ ] Use useMutation for create/update/delete
- [ ] Invalidate queries after mutations
- [ ] Implement optimistic updates

### CRUD Operations (Must Know)
- [ ] Create resources with POST requests
- [ ] Read/List resources with GET requests
- [ ] Update resources with PUT/PATCH requests
- [ ] Delete resources with DELETE requests
- [ ] Handle success/error feedback properly

### Advanced Features (Good to Know)
- [ ] Implement debounced search functionality
- [ ] Add pagination to large lists
- [ ] Handle file uploads with FormData
- [ ] Manage complex state with useReducer
- [ ] Debug API calls with DevTools

** Goal: Check at least 16/20 items before Lesson 4**

---

## Next Steps

### Ready to Continue?
 **Completed this lesson?** → Proceed to [Lesson 4: Routing & Authentication](../lesson4-routing-auth/)

### Need More Practice?
 **Study theory** → [theory3.md](./theory/theory3.md) - REST API deep dive
 **View examples** → [reference/](./reference/) - Complete API patterns
🔨 **Build projects** → [example/](./example/) - Follow-along tutorials
 **Practice exercises** → [lab3.md](./lab/lab3.md) - CRUD challenges

### Additional Resources
 **Quiz yourself** → [quiz/](./quiz/) - Test your API knowledge
❓ **Having issues?** → [Troubleshooting Guide](../extra/troubleshooting.md)
🔐 **Learn auth next** → Preview [Lesson 4](../lesson4-routing-auth/)

---

## Resources & References

### Official Documentation
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Native fetch reference
- [React Query (TanStack Query)](https://tanstack.com/query/latest) - Official docs
- [Axios Documentation](https://axios-http.com/) - Popular HTTP client
- [REST API Tutorial](https://restfulapi.net/) - REST principles

### HTTP & REST
- [HTTP Status Codes](https://httpstatuses.com/) - Complete status code reference
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) - GET, POST, PUT, DELETE
- [JSON API Specification](https://jsonapi.org/) - API design standard
- [REST API Design Best Practices](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design) - Microsoft guide

### React Query Resources
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools) - Debugging tool
- [React Query Examples](https://tanstack.com/query/latest/docs/react/examples/simple) - Official examples
- [TkDodo's Blog](https://tkdodo.eu/blog/practical-react-query) - React Query best practices

### Video Tutorials
- [React Query Tutorial](https://www.youtube.com/watch?v=r8Dg0KVnfMA) - Codevolution
- [Fetch API Crash Course](https://www.youtube.com/watch?v=cuEtnrL9-H0) - Traversy Media
- [REST API Crash Course](https://www.youtube.com/watch?v=Q-BpqyOT3a8) - Traversy Media

### Testing APIs
- [Postman](https://www.postman.com/) - API testing tool
- [Thunder Client](https://www.thunderclient.com/) - VS Code extension
- [Insomnia](https://insomnia.rest/) - Alternative to Postman
- [HTTPie](https://httpie.io/) - Command-line HTTP client

### Communities
- [React Query Discord](https://discord.com/invite/tanstack) - Official community
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit discussions
- [Stack Overflow - react-query](https://stackoverflow.com/questions/tagged/react-query) - Q&A

---
