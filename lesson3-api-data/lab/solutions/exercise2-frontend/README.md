# Lab 3 - Exercise 2: Frontend Solution with React Query

## 📋 Overview

Complete frontend solution demonstrating **React Query** (TanStack Query) for server state management with the Task Manager API.

This solution showcases:
-  React Query setup and configuration
-  Data fetching with `useQuery`
-  Data mutations with `useMutation` (Create, Update, Delete)
-  Automatic cache invalidation and refetching
-  Loading and error states
-  Optimistic UI updates
-  React Query DevTools integration
-  TypeScript integration throughout

---

##  Project Structure

```
exercise2-frontend/
├── src/
│   ├── components/
│   │   ├── TaskManager.tsx       # Main component with React Query
│   │   └── TaskManager.css       # Styling
│   ├── services/
│   │   └── api.ts                # Axios API client
│   ├── types/
│   │   └── task.ts               # TypeScript interfaces
│   ├── App.tsx                   # Root component
│   ├── App.css                   # App styles
│   ├── main.tsx                  # Entry point with QueryProvider
│   └── index.css                 # Global styles
├── package.json                  # Dependencies
└── readme.md                     # This file
```

---

##  Installation & Setup

### Prerequisites
- **Backend API** running on `http://localhost:3000`
- Complete Exercise 1 (Backend) first

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `react` & `react-dom` - React library
- `@tanstack/react-query` - React Query for server state
- `@tanstack/react-query-devtools` - DevTools for debugging
- `axios` - HTTP client
- `typescript` & `vite` - Build tools

### Step 2: Start the Development Server

```bash
npm run dev
```

App will start at: `http://localhost:5173`

### Step 3: Verify Backend Connection

1. Ensure backend is running: `http://localhost:3000/api/tasks`
2. Check browser console for any CORS errors
3. If CORS error: Verify backend has `cors()` middleware enabled

---

##  Key Concepts Explained

### 1. React Query Setup

**main.tsx** - QueryClient configuration:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // Refetch when window regains focus
      retry: 1, // Retry failed requests once
      staleTime: 1000 * 60, // Data stays fresh for 1 minute
    },
  },
});

// Wrap app with provider
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

**Benefits:**
- Global configuration for all queries
- Automatic background refetching
- Retry logic for failed requests
- Stale-time management

---

### 2. Data Fetching with useQuery

```tsx
const {
  data: tasks,
  isLoading,
  isError,
  error,
} = useQuery<Task[]>({
  queryKey: ['tasks'],
  queryFn: taskApi.getAllTasks,
  staleTime: 1000 * 60, // 1 minute
});
```

**What Happens:**
1. React Query calls `taskApi.getAllTasks()`
2. Caches result with key `['tasks']`
3. Returns `data`, `isLoading`, `isError` states
4. Automatically refetches on:
   - Component mount
   - Window focus
   - Network reconnect
   - Manual invalidation

**Query Key:**
- `['tasks']` - unique identifier for this query
- Used for caching and invalidation
- Can include parameters: `['tasks', { filter: 'completed' }]`

---

### 3. Data Mutations with useMutation

#### Create Task Mutation

```tsx
const createMutation = useMutation({
  mutationFn: taskApi.createTask,
  onSuccess: () => {
    // Invalidate queries to refetch fresh data
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    // Reset form
    setNewTask({ title: '', description: '', priority: 'medium' });
  },
  onError: (error) => {
    alert(`Error: ${error.message}`);
  },
});

// Trigger mutation
createMutation.mutate(newTask);
```

#### Update Task Mutation

```tsx
const updateMutation = useMutation({
  mutationFn: taskApi.updateTask,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
});

// Toggle completion
updateMutation.mutate({
  id: task._id,
  completed: !task.completed,
});
```

#### Delete Task Mutation

```tsx
const deleteMutation = useMutation({
  mutationFn: taskApi.deleteTask,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
});

// Delete task
deleteMutation.mutate(taskId);
```

**Mutation Lifecycle:**
1. Call `mutation.mutate(data)`
2. React Query calls `mutationFn`
3. On success: Call `onSuccess` callback
4. Invalidate related queries
5. React Query refetches invalidated queries
6. UI updates with fresh data

---

### 4. Cache Invalidation

**Why Invalidate?**
- After mutation, cache is stale
- Need to refetch to show updated data
- React Query handles refetching automatically

**How It Works:**

```tsx
// After creating a task
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['tasks'] });
  // React Query automatically refetches all queries with key ['tasks']
}
```

**Alternative: Optimistic Updates** (Bonus Challenge):

```tsx
onMutate: async (newTask) => {
  // Cancel outgoing refetches
  await queryClient.cancelQueries({ queryKey: ['tasks'] });

  // Snapshot current data
  const previousTasks = queryClient.getQueryData(['tasks']);

  // Optimistically update cache
  queryClient.setQueryData(['tasks'], (old) => [...old, newTask]);

  return { previousTasks }; // Context for rollback
},
onError: (err, newTask, context) => {
  // Rollback on error
  queryClient.setQueryData(['tasks'], context.previousTasks);
},
```

---

### 5. Loading and Error States

**Conditional Rendering:**

```tsx
if (isLoading) {
  return <LoadingSpinner />;
}

if (isError) {
  return <ErrorMessage error={error} />;
}

// Render data
return <TaskList tasks={data} />;
```

**Mutation Loading States:**

```tsx
<button disabled={createMutation.isPending}>
  {createMutation.isPending ? 'Creating...' : 'Create Task'}
</button>
```

---

## 🔌 API Service Layer

**services/api.ts** - Axios client:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const taskApi = {
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data.data; // Extract data array
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data.data;
  },

  // ... other methods
};
```

**Benefits:**
- Centralized API logic
- Consistent error handling
- Easy to mock for testing
- TypeScript type safety

---

##  Component Structure

### TaskManager Component

**Responsibilities:**
1. Fetch tasks with `useQuery`
2. Create tasks with `useMutation`
3. Update task completion
4. Delete tasks
5. Handle loading/error states
6. Manage form state

**State Management:**

```tsx
const [newTask, setNewTask] = useState({
  title: '',
  description: '',
  priority: 'medium',
});
```

**React Query Hooks:**
- `useQuery` - Fetch tasks
- `useMutation` (3x) - Create, Update, Delete
- `useQueryClient` - Access query client for invalidation

---

##  Features Implemented

###  Core Features
- [x] Fetch and display all tasks
- [x] Create new tasks with form
- [x] Toggle task completion (checkbox)
- [x] Delete tasks with confirmation
- [x] Loading spinner during fetch
- [x] Error messages with fallback UI
- [x] Automatic refetching on success
- [x] Form validation and reset

###  UX Enhancements
- [x] Priority badges (high/medium/low)
- [x] Strikethrough completed tasks
- [x] Disabled buttons during mutations
- [x] Empty state message
- [x] Responsive design
- [x] Smooth animations and transitions

###  Developer Experience
- [x] TypeScript for type safety
- [x] React Query DevTools
- [x] Organized file structure
- [x] Clean component architecture
- [x] Comprehensive comments

---

## 🐛 Troubleshooting

### Issue: "Network Error" or CORS error

**Cause:** Backend not running or CORS not enabled

**Solution:**
1. Start backend: `cd exercise1-backend && npm run dev`
2. Verify CORS enabled: `app.use(cors())` in `index.js`
3. Check backend URL in `api.ts` matches your backend port

---

### Issue: Tasks not updating after create/delete

**Cause:** Query not being invalidated

**Solution:** Ensure `onSuccess` calls `invalidateQueries`:
```tsx
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['tasks'] });
}
```

---

### Issue: React Query DevTools not showing

**Cause:** DevTools only work in development mode

**Solution:**
- Run `npm run dev` (not `npm run build`)
- Look for floating icon in bottom-right corner
- Click icon to open DevTools panel

---

### Issue: TypeScript errors in api.ts

**Cause:** Missing type annotations

**Solution:** Import types from `types/task.ts`:
```typescript
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

getAllTasks: async (): Promise<Task[]> => {
  // ...
}
```

---

##  React Query Concepts Summary

### Query States
- **Fresh:** Data is up-to-date (within `staleTime`)
- **Stale:** Data might be outdated, will refetch in background
- **Fetching:** Currently fetching data
- **Idle:** Not fetching

### Key Features
- **Automatic Caching:** Queries cached by query key
- **Background Refetching:** Updates data when stale
- **Deduplication:** Prevents duplicate requests
- **Retry Logic:** Automatically retries failed requests
- **Garbage Collection:** Removes unused cache entries
- **Pagination & Infinite Scroll:** Built-in support
- **Optimistic Updates:** Update UI before server response

### useQuery vs useMutation

| Feature | useQuery | useMutation |
|---------|----------|-------------|
| Purpose | Fetch data | Modify data (POST/PUT/DELETE) |
| Trigger | Automatically | Manually with `.mutate()` |
| Caching | Yes | No |
| Refetching | Automatic | No |
| Use Cases | GET requests | POST/PUT/DELETE requests |

---

##  Learning Objectives Achieved

After completing this exercise, you should understand:

 **React Query Basics**
- Setting up QueryClient and Provider
- Using useQuery for data fetching
- Using useMutation for data modifications
- Query keys and caching

 **State Management**
- Server state vs client state
- Automatic cache management
- Cache invalidation strategies
- Optimistic updates (bonus)

 **Best Practices**
- Separation of concerns (API layer)
- TypeScript for type safety
- Error handling patterns
- Loading states and UX

 **Advanced Patterns**
- Query invalidation
- Mutation side effects
- DevTools for debugging
- Stale-time configuration

---

##  Next Steps

### Completed
-  Basic CRUD with React Query
-  Loading and error states
-  Cache invalidation

### Bonus Challenges (Try These!)

1. **Priority Filter** - Add buttons to filter by priority
```tsx
const { data } = useQuery({
  queryKey: ['tasks', { priority: selectedPriority }],
  queryFn: () => taskApi.getTasksByPriority(selectedPriority),
});
```

2. **Optimistic Updates** - Update UI before server responds
```tsx
onMutate: async (newTask) => {
  await queryClient.cancelQueries({ queryKey: ['tasks'] });
  const previous = queryClient.getQueryData(['tasks']);
  queryClient.setQueryData(['tasks'], (old) => [...old, newTask]);
  return { previous };
},
```

3. **Search Functionality** - Search tasks by title
4. **Task Statistics** - Count total, completed, pending tasks
5. **Edit Task** - Inline editing instead of just toggle completion

---

## 📖 Additional Resources

### Official Documentation
- [React Query Docs](https://tanstack.com/query/latest)
- [React Query Tutorial](https://tanstack.com/query/latest/docs/react/quick-start)
- [Axios Documentation](https://axios-http.com/docs/intro)

### Video Tutorials
- [React Query in 100 Seconds](https://www.youtube.com/watch?v=novnyCaa7To)
- [React Query Complete Guide](https://www.youtube.com/watch?v=8K1N3fE-cDs)

### Advanced Topics
- [Pagination with React Query](https://tanstack.com/query/latest/docs/react/guides/paginated-queries)
- [Infinite Queries](https://tanstack.com/query/latest/docs/react/guides/infinite-queries)
- [Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)

---

** Frontend Solution Complete!** You've mastered React Query for server state management. This pattern is used in production apps by companies like Google, Microsoft, and Netflix!
