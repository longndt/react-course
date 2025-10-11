# Lesson 3: API Integration & Data Management

## Overview

**Difficulty**: Intermediate
**Prerequisites**: Lessons 1-2 completed, async/await knowledge

This lesson covers integrating React applications with backend APIs and managing data effectively. You'll learn REST API integration, data fetching with Axios, error handling, and advanced data management with React Query.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand REST API concepts and HTTP methods (GET, POST, PUT, DELETE)
- Integrate React with backend APIs using Axios
- Handle loading states, errors, and edge cases professionally
- Build complete CRUD operations with proper error handling
- Use React Query for advanced data management (optional)
- Implement search and filtering functionality
- Debug API integration issues effectively

---

## Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
- React fundamentals and hooks (useState, useEffect)
- JavaScript async/await and Promises
- HTTP basics (requests, responses, status codes)
- JSON data format
- Completed Lessons 1 and 2

### Environment Setup
- Node.js 18+ installed
- React project set up (Vite recommended)
- Code editor (VS Code recommended)
- API testing tool (Postman or Thunder Client)

### Optional but Helpful
- Basic understanding of REST APIs
- Familiarity with Express.js
- Knowledge of databases (MongoDB, PostgreSQL)

>  **Not ready?** → Review [Lesson 2](../lesson2-component-hook/) for hooks mastery

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

### 2. Data Fetching with Axios

**Why Axios over Fetch:**
- Cleaner syntax and automatic JSON parsing
- Better error handling
- Request/response interceptors
- Automatic request cancellation
- Built-in timeout support

**Basic CRUD Operations:**
- GET requests for fetching data
- POST requests for creating resources
- PUT requests for updating resources
- DELETE requests for removing resources

### 3. Error Handling & Loading States

**Proper Error Handling:**
- Network errors vs server errors
- User-friendly error messages
- Retry mechanisms
- Error boundaries

**Loading States:**
- Loading indicators
- Skeleton screens
- Disabled states during requests
- Success/error feedback

### 4. React Query (Advanced)

**Why React Query is Better:**
- Automatic caching (no refetching same data)
- Background updates
- Built-in loading and error states
- Optimistic updates
- Automatic retries
- Request deduplication

**When to Use:**
- Complex data fetching requirements
- Need for caching and background updates
- Multiple components using same data
- Optimistic updates for better UX

---

## Quick Concept Preview

### Basic Axios Example
```tsx
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/tasks');
        setTasks(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### API Service Organization
```tsx
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
});

export const taskApi = {
  getAll: () => api.get('/tasks'),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (data: CreateTaskInput) => api.post('/tasks', data),
  update: (id: string, data: UpdateTaskInput) => api.put(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};
```

### React Query Example (Advanced)
```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function TaskManager() {
  const queryClient = useQueryClient();

  // Fetch tasks with automatic caching
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskApi.getAll().then(res => res.data),
  });

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: (taskData: CreateTaskInput) => taskApi.create(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
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
- REST API concepts and HTTP methods
- Axios vs Fetch comparison
- Error handling techniques
- React Query benefits (advanced)

**Time**: 45-60 minutes

### Step 2: Explore Reference Code
Browse [reference/](./reference/) - Working examples:
- API client setup with Axios
- All CRUD operations with TypeScript
- Error handling patterns
- React Query setup (advanced)

**Time**: 30-45 minutes

### Step 3: Build Example Projects
**🔨 Hands-On Practice:**

🔨 Follow [example/](./example/) - Build along:
- Task Manager with Axios
- Full CRUD operations
- Error handling and loading states
- React Query integration (optional)

### Step 4: Complete Lab Exercises
Practice in [lab3.md](./lab/lab3.md) - Hands-on challenges:
- Level 1: Basic API integration with Axios
- Level 2: Full CRUD operations
- Level 3: React Query implementation (advanced)

>  **Pro tip**: Start with Axios, then explore React Query when you need advanced features

---

## Key Takeaways

### Core Concepts to Remember

1. **Use Axios** - Better than fetch for API calls
2. **Handle all states** - loading, success, error, empty
3. **Separate API logic** - Create service modules
4. **Validate responses** - Check for errors before using data
5. **Use TypeScript** - Type safety for API responses
6. **React Query is advanced** - Use when you need caching and optimization
7. **Always clean up** - Cancel pending requests on unmount

### Most Important Skills

- Making HTTP requests with Axios
- Managing loading and error states
- Implementing CRUD operations
- Handling forms and validation
- Debugging API integration issues

### Common Realizations

- "Axios is much cleaner than fetch!"
- "React Query makes complex data fetching easier"
- "Always handle loading and error states"
- "Separate API logic from components"
- "TypeScript helps catch API response errors"

---

## Best Practices Summary

### API Integration Best Practices

**DO:**
- Use Axios for HTTP requests
- Create centralized API service modules
- Implement proper error handling with try/catch
- Show clear loading and error states to users
- Use environment variables for API URLs
- Validate API responses with TypeScript types

**DON'T:**
- Hardcode API URLs in components
- Ignore error responses from API
- Make API calls in render function
- Forget to handle loading states
- Use fetch when Axios is available

### React Query Best Practices (Advanced)

**DO:**
- Use React Query for complex data fetching
- Use query keys consistently
- Invalidate queries after mutations
- Implement optimistic updates for better UX
- Configure stale time appropriately

**DON'T:**
- Use React Query for simple one-time requests
- Forget to invalidate related queries
- Ignore mutation error handling
- Over-fetch data (use pagination)

---

## Progress Checklist

### REST API Fundamentals (Must Know)
- [ ] Understand HTTP methods (GET, POST, PUT, DELETE)
- [ ] Know common status codes (200, 201, 400, 404, 500)
- [ ] Make API requests using Axios
- [ ] Handle JSON responses correctly
- [ ] Work with async/await patterns

### React Integration (Must Know)
- [ ] Fetch data in useEffect hook
- [ ] Manage loading, error, and success states
- [ ] Display API data in components
- [ ] Handle form submissions to API
- [ ] Cancel requests on component unmount

### CRUD Operations (Must Know)
- [ ] Create resources with POST requests
- [ ] Read/List resources with GET requests
- [ ] Update resources with PUT requests
- [ ] Delete resources with DELETE requests
- [ ] Handle success/error feedback properly

### React Query (Advanced - Optional)
- [ ] Set up QueryClient provider
- [ ] Use useQuery for data fetching
- [ ] Use useMutation for create/update/delete
- [ ] Invalidate queries after mutations
- [ ] Implement optimistic updates

**Goal: Check at least 12/15 items before Lesson 4**

---

## Next Steps

### Ready to Continue?
**Completed this lesson?** → Proceed to [Lesson 4: Routing & Authentication](../lesson4-routing-auth/)

### Need More Practice?
**Study theory** → [theory3.md](./theory/theory3.md) - API integration deep dive
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
- [Axios Documentation](https://axios-http.com/) - Popular HTTP client
- [React Query (TanStack Query)](https://tanstack.com/query/latest) - Advanced data fetching
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Native fetch reference
- [REST API Tutorial](https://restfulapi.net/) - REST principles

### HTTP & REST
- [HTTP Status Codes](https://httpstatuses.com/) - Complete status code reference
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) - GET, POST, PUT, DELETE
- [REST API Design Best Practices](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design) - Microsoft guide

### React Query Resources
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools) - Debugging tool
- [React Query Examples](https://tanstack.com/query/latest/docs/react/examples/simple) - Official examples
- [TkDodo's Blog](https://tkdodo.eu/blog/practical-react-query) - React Query best practices

### Video Tutorials
- [Axios Crash Course](https://www.youtube.com/watch?v=6LyagkoRWYA) - Traversy Media
- [React Query Tutorial](https://www.youtube.com/watch?v=r8Dg0KVnfMA) - Codevolution
- [REST API Crash Course](https://www.youtube.com/watch?v=Q-BpqyOT3a8) - Traversy Media

### Testing APIs
- [Postman](https://www.postman.com/) - API testing tool
- [Thunder Client](https://www.thunderclient.com/) - VS Code extension
- [Insomnia](https://insomnia.rest/) - Alternative to Postman

### Communities
- [React Query Discord](https://discord.com/invite/tanstack) - Official community
- [r/reactjs](https://www.reddit.com/r/reactjs/) - Reddit discussions
- [Stack Overflow - react-query](https://stackoverflow.com/questions/tagged/react-query) - Q&A

---