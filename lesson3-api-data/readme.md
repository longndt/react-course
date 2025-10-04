# Lesson 3: API Integration & Data Management

## Overview

This lesson covers integrating React applications with backend APIs and managing data effectively. You'll learn REST API integration, data fetching patterns, error handling, and state management for complex data workflows with React Query.

## Learning Objectives

After this lesson, you will be able to:

- ✅ Understand REST API concepts and HTTP methods (GET, POST, PUT, DELETE)
- ✅ Integrate React with Node.js/Express backends and MongoDB
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

### 📚 [Theory Guide](./theory/theory3.md)
Comprehensive explanations of REST APIs, data fetching patterns, React Query, state management strategies, and error handling best practices.

### 💻 [Demo Application](./demo/)
Live task management application demonstrating full CRUD operations with Node.js backend, MongoDB integration, and React Query implementation.

### 🔬 [Lab Exercise](./lab/lab3.md)
Build a complete student management system with API integration, featuring CRUD operations, search, filtering, and pagination.

### ⚡ [Quick Start Guide](./quickstart.md)
Copy-paste ready code examples for Express backend, React Query setup, API client patterns, and common data fetching scenarios.

---

## Getting Started

**Prerequisites:**
- Completed Lesson 1 (React Setup) and Lesson 2 (Components & Hooks)
- Node.js and npm installed
- Basic understanding of async/await and promises
- Familiarity with HTTP concepts

**Learning Path:**
1. Start with **[Quick Start Guide](./quickstart.md)** to set up a working API connection
2. Read **[Theory Guide](./theory/theory3.md)** for in-depth understanding
3. Explore **[Demo Application](./demo/)** to see patterns in action
4. Complete **[Lab Exercise](./lab/lab3.md)** to build your own application

---

## Key Takeaways

After completing this lesson, you will master:

**API Integration:**
- Connect React frontend to Node.js/Express backend
- Make HTTP requests using fetch API and axios
- Handle JSON responses and error states professionally
- Implement proper request/response patterns

**Data Management:**
- Use React Query for server state management
- Implement automatic caching and background updates
- Handle loading states and error recovery
- Optimize data fetching with query invalidation

**CRUD Operations:**
- Create resources with POST requests
- Read data with GET requests and query parameters
- Update records with PUT/PATCH methods
- Delete resources with proper confirmation

**Advanced Features:**
- Implement search and filtering (client-side and server-side)
- Add pagination for large datasets
- Build optimistic UI updates for better UX
- Handle file uploads and media management

---

## Best Practices Summary

### API Integration ✅
- Use centralized API client for all HTTP requests
- Implement proper error handling with try/catch blocks
- Always check `response.ok` before parsing JSON
- Show clear loading and error states to users

### Performance Optimization ⚡
- Cache API responses with React Query
- Debounce search inputs to reduce API calls
- Implement pagination for large datasets
- Use React.memo for expensive components

### Code Quality 🏗️
- Separate API logic from UI components
- Create reusable custom hooks for data fetching
- Use TypeScript for type safety
- Implement error boundaries for graceful failures

### Security 🔒
- Store API keys in environment variables
- Validate and sanitize all user inputs
- Always use HTTPS in production
- Configure CORS properly on backend

---

## Common Challenges & Solutions

**Challenge: Infinite re-renders with useEffect**
- ✅ Solution: Properly specify dependency array
- ✅ Use useCallback for function dependencies

**Challenge: Stale data after mutations**
- ✅ Solution: Invalidate queries with React Query
- ✅ Implement optimistic updates for better UX

**Challenge: Race conditions in async requests**
- ✅ Solution: Use AbortController to cancel requests
- ✅ Check component mounted state before setState

**Challenge: Poor error messages**
- ✅ Solution: Map API errors to user-friendly messages
- ✅ Provide actionable next steps in error UI

---

## Progress Checklist

Before moving to Lesson 4, ensure you can:

**REST API Fundamentals**
- [ ] Understand HTTP methods (GET, POST, PUT, DELETE)
- [ ] Make API requests using fetch or axios
- [ ] Handle JSON responses and errors
- [ ] Work with async/await patterns

**React Integration**
- [ ] Fetch data in useEffect
- [ ] Manage loading and error states
- [ ] Display data in components
- [ ] Handle form submissions to API

**React Query**
- [ ] Set up QueryClient provider
- [ ] Use useQuery for data fetching
- [ ] Use useMutation for updates
- [ ] Invalidate queries after mutations

**CRUD Operations**
- [ ] Create resources (POST)
- [ ] Read/List resources (GET)
- [ ] Update resources (PUT/PATCH)
- [ ] Delete resources (DELETE)

**Advanced Features**
- [ ] Implement search functionality
- [ ] Add pagination to lists
- [ ] Handle file uploads
- [ ] Manage complex state

---

## What's Next?

**Ready for Lesson 4?**

After mastering API integration, you'll learn:
- Client-side routing with React Router
- Protected routes and navigation guards
- User authentication and authorization
- Session management with JWT tokens

**Continue Learning:**
- 📖 Read the [Theory Guide](./theory/theory3.md) for deep understanding
- 💻 Study the [Demo Application](./demo/) for real-world patterns
- 🔬 Complete the [Lab Exercise](./lab/lab3.md) to build your own app
- ⚡ Bookmark the [Quick Start Guide](./quickstart.md) for future reference

---

## Resources & References

**Official Documentation:**
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Query - TanStack](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [REST API Tutorial](https://restfulapi.net/)

**Additional Learning:**
- [HTTP Status Codes](https://httpstatuses.com/)
- [JSON API Specification](https://jsonapi.org/)
- [API Design Best Practices](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

---

**🎓 Happy Learning! Build amazing full-stack applications with React!**


