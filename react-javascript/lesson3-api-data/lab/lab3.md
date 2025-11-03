# Lab 3 - API Integration & Data Management

## 📚 Overview

Welcome to Lab 3! In this hands-on lab, you'll build a complete full-stack Task Manager application by connecting a React frontend to a Node.js/Express/MongoDB backend. You'll master essential API integration patterns using **Axios** - the most popular HTTP client for React applications.

**What You'll Build:**
- RESTful API with Node.js and Express
- MongoDB database with Mongoose ODM
- React frontend with Axios for API calls
- Complete CRUD operations (Create, Read, Update, Delete)
- Professional error handling and loading states

**Why This Matters:**
Most modern web applications require backend communication for data persistence. Axios is the most popular HTTP client for React applications, providing clean syntax, automatic JSON parsing, and excellent error handling. This lab teaches you the essential patterns used in production applications.

_For detailed concepts and theory, see [../readme.md](../readme.md)_

---

## Learning Objectives

By the end of this lab, you will be able to:

1. **Backend Development**
   - Create RESTful APIs with Express.js
   - Connect to MongoDB using Mongoose
   - Implement CRUD operations
   - Handle errors and validate data

2. **API Integration**
   - Fetch data from APIs using React Query
   - Implement mutations (create, update, delete)
   - Handle loading and error states
   - Manage cache invalidation

3. **Full-Stack Communication**
   - Configure CORS for cross-origin requests
   - Structure API endpoints properly
   - Handle async operations in React
   - Separate server state from client state

4. **Advanced Patterns**
   - Create custom hooks for API calls
   - Implement proper error boundaries
   - Handle loading states professionally
   - Optimize API calls and performance

---

## Pre-Lab Checklist

Before starting, ensure you have:

### Required Software

- [ ] **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- [ ] **MongoDB** - Choose one:
  - Local MongoDB Community Server, OR
  - MongoDB Atlas account (free cloud database)
- [ ] **VS Code** with extensions:
  - ESLint
  - Prettier
  - Thunder Client (or use Postman)
- [ ] **Git** for version control

### Verify Installation

```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 8.0.0 or higher
mongod --version  # For local MongoDB (or have Atlas URI ready)
```

### Knowledge Prerequisites

- [ ] Understand React components and hooks (from Labs 1-2)
- [ ] Basic understanding of REST APIs (GET, POST, PUT, DELETE)
- [ ] Familiarity with async/await in JavaScript
- [ ] Basic command line usage

### Project Setup

**Quick Setup:**
```bash
# Create project directory
mkdir task-manager-app
cd task-manager-app

# Create frontend (Vite + React + TypeScript)
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install @tanstack/react-query axios
cd ..

# Create backend directory
mkdir backend
cd backend
npm init -y
npm install express mongoose cors
npm install --save-dev typescript @types/express @types/node ts-node nodemon
```

_For detailed setup instructions, see [Complete Environment Setup Guide](../../setup/environment-setup.md)_

---

## Exercise 1: Backend Setup (30% Practice)

### Concept Review

A **RESTful API** follows REST principles for building web services:
- **Resources** are accessed via URLs (e.g., `/api/tasks`)

- **HTTP Methods** indicate actions:
  - `GET` - Read/Retrieve data
  - `POST` - Create new data
  - `PUT/PATCH` - Update existing data
  - `DELETE` - Remove data
- **Stateless** - Each request contains all needed information

**MongoDB** is a NoSQL database that stores data as JSON-like documents.

**Mongoose** is an ODM (Object Data Modeling) library that provides schema validation and easier interaction with MongoDB.

### Goals

- Set up Express server with TypeScript
- Connect to MongoDB database
- Create Mongoose schema for Tasks
- Implement basic CRUD API endpoints
- Test API with Thunder Client/Postman

---

### Task 1.1: Initialize Backend Project (Guided)

**Step 1:** Create backend structure
```bash
cd backend
mkdir src
mkdir src/models
mkdir src/routes
```

**Step 2:** Configure TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**Step 3:** Add scripts to `package.json`
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

### Task 1.2: Create Task Model (Your Turn - 40% TODO)

**🔨 TODO: Create Mongoose Schema**

Create file: `backend/src/models/Task.ts`

**Requirements:**
- Define `ITask` interface with fields:
  - `title`: string, required
  - `completed`: boolean, default false
  - `priority`: string enum ('low', 'medium', 'high'), default 'medium'
  - `createdAt`: Date
  - `updatedAt`: Date
- Create Mongoose schema with validation
- Add timestamps option
- Export Task model

**Hints:**
```javascript
import mongoose, { Schema, Document } from 'mongoose';

// 1. Define interface
interface ITask extends Document {
  title: string;
  // Add other fields...
}

// 2. Create schema
const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  // Add other fields with validation...
}, { timestamps: true });

// 3. Export model
export default mongoose.model<ITask>('Task', TaskSchema);
```

**Expected Outcome:**
- TypeScript interface defines task structure
- Mongoose schema with validation
- Model exported for use in routes

**Solution:** See `solutions/exercise1-backend/models/Task.ts`

---

### Task 1.3: Create Express Server (Your Turn - 50% TODO)

**🔨 TODO: Set Up Express Server with MongoDB**

Create file: `backend/src/index.ts`

**Requirements:**
- Import express, mongoose, cors
- Create Express app
- Configure middleware:
  - CORS (allow all origins for development)
  - JSON body parser
- Connect to MongoDB
  - Use connection string: `mongodb://localhost:27017/task_manager`
  - OR use Atlas URI if using cloud
- Add error handling for database connection
- Start server on port 5000
- Log server status

**Hints:**
```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('YOUR_CONNECTION_STRING')
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error(' MongoDB error:', err));

// TODO: Add routes here later

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
```

**Expected Outcome:**
- Server starts successfully
- MongoDB connection established
- CORS enabled for frontend requests
- Console shows success messages

**Solution:** See `solutions/exercise1-backend/index.ts`

---

### Task 1.4: Implement CRUD API Endpoints (Your Turn - 60% TODO)

**🔨 TODO: Create RESTful API Routes**

Add routes to `backend/src/index.ts` (after MongoDB connection)

**Requirements:**

**1. GET /api/tasks** - Fetch all tasks
- Use `Task.find()`
- Return array of tasks
- Handle errors with 500 status

**2. POST /api/tasks** - Create new task
- Extract data from `req.body`
- Create new Task instance
- Save to database
- Return saved task with 201 status
- Handle errors with 400 status

**3. PUT /api/tasks/:id** - Update task
- Extract id from params
- Use `Task.findByIdAndUpdate()`
- Set `{ new: true }` to return updated task
- Return updated task
- Handle errors with 400 status

**4. DELETE /api/tasks/:id** - Delete task
- Extract id from params
- Use `Task.findByIdAndDelete()`
- Return success message
- Handle errors with 500 status

**Hints:**
```javascript
import Task from './models/Task';

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST new task
app.post('/api/tasks', async (req, res) => {
  try {
    // TODO: Create and save new task
    // Return 201 status
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    // TODO: Find and update task
    // Return updated task
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    // TODO: Find and delete task
    // Return success message
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
```

**Expected Outcome:**
- All 4 CRUD endpoints working
- Proper HTTP status codes
- Error handling in place
- Data persists in MongoDB

---

### Task 1.5: Test API Endpoints (Testing)

**Testing Checklist:**

**Start Backend:**
```bash
cd backend
npm run dev
# Should see: " Connected to MongoDB" and " Server running..."
```

**Test with Thunder Client (or Postman):**

1. **GET /api/tasks**
   - Method: GET
   - URL: `http://localhost:5000/api/tasks`
   - Expected: `[]` (empty array initially)

2. **POST /api/tasks**
   - Method: POST
   - URL: `http://localhost:5000/api/tasks`
   - Body (JSON):
     ```json
     {
       "title": "Learn React Query",
       "priority": "high"
     }
     ```
   - Expected: Task object with `_id`, `createdAt`, `updatedAt`

3. **PUT /api/tasks/:id**
   - Method: PUT
   - URL: `http://localhost:5000/api/tasks/[TASK_ID]`
   - Body (JSON):
     ```json
     {
       "completed": true
     }
     ```
   - Expected: Updated task with `completed: true`

4. **DELETE /api/tasks/:id**
   - Method: DELETE
   - URL: `http://localhost:5000/api/tasks/[TASK_ID]`
   - Expected: Success message

**Verify in MongoDB:**
```bash
# Connect to MongoDB shell
mongosh
use task_manager
db.tasks.find().pretty()
```

**Exercise 1 Complete When:**
- [ ] Backend server runs without errors
- [ ] MongoDB connection successful
- [ ] All 4 API endpoints respond correctly
- [ ] Data persists in database
- [ ] Can create, read, update, delete tasks via API

---

## Exercise 2: Frontend Integration with React Query (70% Practice)

### Concept Review

**React Query (TanStack Query)** is a powerful library for managing server state in React applications:

- **Automatic Caching** Stores fetched data to avoid redundant requests

- **Background Updates** Refreshes data automatically

- **Optimistic Updates** Updates UI before server confirms

- **Error Handling** Built-in error states and retry logic

- **Loading States** Automatic loading state management

**Key Concepts:**
- **Query** Read operation (GET) - uses `useQuery`

- **Mutation** Write operation (POST, PUT, DELETE) - uses `useMutation`

- **Query Key** Unique identifier for cached data

- **Query Client** Manages all queries and cache

### Goals

- Set up React Query in React app
- Fetch data with `useQuery`
- Create mutations for POST, PUT, DELETE
- Handle loading and error states
- Invalidate cache after mutations

---

### Task 2.1: Setup React Query (Guided)

**Step 1:** Install dependencies (already done in setup)
```bash
cd frontend
npm install @tanstack/react-query axios
```

**Step 2:** Create API service file

Create `frontend/src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const taskApi = {
  getTasks: () => axios.get(`${API_BASE}/tasks`).then(res => res.data),
  createTask: (data) => axios.post(`${API_BASE}/tasks`, data).then(res => res.data),
  updateTask: (id, data) => axios.put(`${API_BASE}/tasks/${id}`, data).then(res => res.data),
  deleteTask: (id) => axios.delete(`${API_BASE}/tasks/${id}`).then(res => res.data),
};
```

**Step 3:** Setup QueryClient in `App.jsx`
```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskManager from './components/TaskManager';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>Task Manager</h1>
        <TaskManager />
      </div>
    </QueryClientProvider>
  );
}

export default App;
```

---

### Task 2.2: Fetch Tasks with useQuery (Your Turn - 70% TODO)

**🔨 TODO: Implement Data Fetching**

Create `frontend/src/components/TaskManager.jsx`

**Requirements:**
- Import `useQuery` from React Query
- Import `taskApi` from services
- Use `useQuery` to fetch tasks:
  - Query key: `['tasks']`
  - Query function: `taskApi.getTasks`
- Destructure: `data`, `isLoading`, `error`
- Display loading state
- Display error state
- Map through tasks and display them

**Hints:**
```jsx
import { useQuery } from '@tanstack/react-query';
import { taskApi, Task } from '../services/api';

function TaskManager() {
  // TODO: Use useQuery to fetch tasks
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getTasks,
  });

  // TODO: Handle loading state
  if (isLoading) return <div>Loading tasks...</div>;

  // TODO: Handle error state
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="task-manager">
      <h2>My Tasks</h2>
      <div className="task-list">
        {tasks?.map((task) => (
          <div key={task._id} className="task-item">
            <span>{task.title}</span>
            <span>Priority: {task.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
```

**Expected Outcome:**
- Tasks fetch automatically on component mount
- Loading state shows while fetching
- Error state shows if API fails
- Tasks display in a list

**Solution:** See `solutions/exercise2-frontend/TaskManager-basic.js`

---

### Task 2.3: Create Task with useMutation (Your Turn - 80% TODO)

**🔨 TODO: Implement Task Creation**

**Requirements:**
- Add state for new task input
- Import `useMutation` and `useQueryClient`
- Create mutation for adding tasks:
  - Mutation function: `taskApi.createTask`
  - On success: invalidate 'tasks' query
  - Clear input after success
- Add form with input and submit button
- Handle mutation loading state (disable button)

**Hints:**
```jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../services/api';

function TaskManager() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const queryClient = useQueryClient();

  // Existing useQuery...
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getTasks,
  });

  // TODO: Create mutation
  const createMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNewTaskTitle('');
    },
  });

  // TODO: Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      createMutation.mutate({ title: newTaskTitle });
    }
  };

  // Loading/error handling...

  return (
    <div className="task-manager">
      <h2>My Tasks</h2>

      {/* TODO: Add task form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task..."
          required
        />
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {/* Existing task list... */}
    </div>
  );
}
```

**Expected Outcome:**
- Form input captures task title
- Submit creates new task in database
- UI updates automatically with new task
- Input clears after submission
- Button disabled while creating

**Solution:** See `solutions/exercise2-frontend/TaskManager-create.js`

---

### Task 2.4: Update and Delete Tasks (Your Turn - 90% TODO)

**🔨 TODO: Implement Update and Delete**

**Requirements:**

**Update Mutation:**
- Create mutation for toggling task completion
- Mutation function: `taskApi.updateTask`
- Pass task ID and updated data
- Invalidate cache on success
- Add "Complete/Undo" button for each task

**Delete Mutation:**
- Create mutation for deleting tasks
- Mutation function: `taskApi.deleteTask`
- Invalidate cache on success
- Add "Delete" button for each task
- Handle pending states (disable buttons)

**Hints:**
```jsx
function TaskManager() {
  // Existing code...

  // TODO: Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      taskApi.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // TODO: Delete mutation
  const deleteMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <div className="task-manager">
      {/* Form... */}

      <div className="task-list">
        {tasks?.map((task) => (
          <div key={task._id} className="task-item">
            <span className={task.completed ? 'completed' : ''}>
              {task.title}
            </span>
            <div className="task-actions">
              {/* TODO: Toggle complete button */}
              <button
                onClick={() =>
                  updateMutation.mutate({
                    id: task._id,
                    data: { completed: !task.completed },
                  })
                }
                disabled={updateMutation.isPending}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>

              {/* TODO: Delete button */}
              <button
                onClick={() => deleteMutation.mutate(task._id)}
                disabled={deleteMutation.isPending}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Expected Outcome:**
- Click "Complete" toggles task completion
- Completed tasks show strikethrough
- Click "Delete" removes task
- UI updates automatically
- Buttons disable during mutations

**Solution:** See `solutions/exercise2-frontend/TaskManager-full.js`

---

### Task 2.5: Add CSS Styling (Optional)

Create `frontend/src/components/TaskManager.css`:

```css
.task-manager {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.task-manager h2 {
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.task-manager form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.task-manager input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
}

.task-manager button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.task-manager button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.task-manager button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
  transition: transform 0.2s;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.task-item.completed {
  opacity: 0.6;
}

.task-item span.completed {
  text-decoration: line-through;
  color: #718096;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.task-actions button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.delete-btn {
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%) !important;
}
```

**Exercise 2 Complete When:**
- [ ] Tasks fetch and display automatically
- [ ] Can add new tasks via form
- [ ] Can toggle task completion
- [ ] Can delete tasks
- [ ] UI updates automatically after mutations
- [ ] Loading states work correctly
- [ ] Error handling in place

---

## Bonus Challenges (Advanced - Optional)

### Challenge 1: Add Task Priority Filter

**🔨 TODO: Filter Tasks by Priority**

**Requirements:**
- Add state for selected priority filter
- Add dropdown/buttons to select priority
- Filter tasks array before mapping
- Show all tasks by default

**Hint:**
```jsx
const [priorityFilter, setPriorityFilter] = useState('all');

const filteredTasks = tasks?.filter(task =>
  priorityFilter === 'all' || task.priority === priorityFilter
);
```

### Challenge 2: Optimistic Updates

**🔨 TODO: Implement Optimistic UI Updates**

Update mutations to show changes immediately before server confirms:

```jsx
const updateMutation = useMutation({
  mutationFn: taskApi.updateTask,
  onMutate: async (newTask) => {
    // Cancel queries
    await queryClient.cancelQueries({ queryKey: ['tasks'] });

    // Snapshot previous value
    const previousTasks = queryClient.getQueryData(['tasks']);

    // Optimistically update
    queryClient.setQueryData(['tasks'], (old) =>
      old.map(task => task._id === newTask.id ? { ...task, ...newTask.data } : task)
    );

    return { previousTasks };
  },
  onError: (err, newTask, context) => {
    // Rollback on error
    queryClient.setQueryData(['tasks'], context?.previousTasks);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
});
```

### Challenge 3: Search Functionality

**🔨 TODO: Add Task Search**

- Add search input
- Filter tasks by title
- Combine with priority filter

### Challenge 4: Task Statistics

**🔨 TODO: Display Task Stats**

- Count total tasks
- Count completed tasks
- Count pending tasks
- Calculate completion percentage

---

## Key Takeaways

You've completed Lab 3! Here's what you've mastered:

### Backend Skills
- **Express Server** RESTful API with proper routing

- **MongoDB Integration** Mongoose schemas and CRUD operations

- **Error Handling** Try-catch blocks and proper status codes

- **CORS Configuration** Cross-origin request handling

### Frontend Skills
- **React Query** useQuery for data fetching

- **Mutations** useMutation for create/update/delete

- **Cache Management** Automatic caching and invalidation

- **Loading States** Built-in pending states

- **Error Handling** Error boundaries and user feedback

### Full-Stack Patterns
- **API Design** RESTful endpoints with proper HTTP methods

- **Data Flow** Frontend ↔ Backend communication

- **State Management** Server state vs client state

- **TypeScript** Type-safe API communication

---

## Next Steps

**Ready for more?** Continue to [Lab 4 - Routing & Authentication](../../lesson4-routing-auth/lab/lab4.md) to learn:

- **React Router** Client-side routing and navigation

- **Protected Routes** Authentication-based access control

- **Auth Context** Global authentication state

- **Login/Signup** User authentication flow

- **JWT Tokens** Secure API authentication

- **Route Guards** Protecting private routes

**Before starting Lab 4:**
- [ ] All Lab 3 features work correctly
- [ ] Backend API tested and working
- [ ] React Query patterns understood
- [ ] CRUD operations clear
- [ ] Can explain useQuery vs useMutation
- [ ] Error handling makes sense

---

## Additional Resources

**Official Documentation:**
- [React Query Docs](https://tanstack.com/query/latest) - Complete guide
- [Express.js Guide](https://expressjs.com/en/guide/routing.html) - API routing
- [Mongoose Docs](https://mongoosejs.com/docs/guide.html) - MongoDB ODM
- [Axios Docs](https://axios-http.com/docs/intro) - HTTP client

**Video Tutorials:**
- [React Query Tutorial](https://www.youtube.com/results?search_query=react+query+tutorial) - Video guides
- [Express + MongoDB](https://www.youtube.com/results?search_query=express+mongodb+tutorial) - Backend tutorials

**Best Practices:**
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query) - Tips from maintainer
- [REST API Design](https://restfulapi.net/) - API design guide

---

## Troubleshooting Guide

### Backend Issues

**"MongoDB connection failed"**
- **Solution** Check if MongoDB service is running
  ```bash
  # Windows
  net start MongoDB

  # Mac/Linux
  brew services start mongodb-community

  # Or use MongoDB Atlas cloud database
  ```

**"Port 5000 already in use"**
- **Solution** Change port in `index.ts` or kill process using port
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID [process_id] /F

  # Mac/Linux
  lsof -i :5000
  kill -9 [PID]
  ```

**"Cannot POST /api/tasks"**
- **Solution** Check `express.json()` middleware is enabled
- Verify route is defined correctly

### Frontend Issues

**"CORS error"**
- **Solution** Ensure backend has CORS middleware
  ```javascript
  app.use(cors());
  ```

**"Network Error"**
- **Solution**
  - Check backend server is running
  - Verify API_BASE URL is correct
  - Check browser console for exact error

**"Query not updating"**
- **Solution** Ensure `queryClient.invalidateQueries()` is called
  ```javascript
  queryClient.invalidateQueries({ queryKey: ['tasks'] });
  ```

**"Tasks not displaying"**
- **Solution**
  - Check browser console for errors
  - Verify data structure matches Task interface
  - Use React DevTools to inspect state

### Database Issues

**"Validation error"**
- **Solution** Check data matches Mongoose schema
  - All required fields present
  - Correct data types
  - Valid enum values for priority

**"Cannot find task"**
- **Solution** Verify task ID is correct ObjectId format
  - Use MongoDB Compass to view actual IDs
  - Check if task exists in database

---

## Self-Assessment Checklist

Before moving to Lab 4, you should be able to:

**Backend:**
- [ ] Create Express server with TypeScript
- [ ] Connect to MongoDB database
- [ ] Define Mongoose schemas and models
- [ ] Implement RESTful API endpoints
- [ ] Handle errors properly
- [ ] Test APIs with Thunder Client

**Frontend:**
- [ ] Set up React Query in app
- [ ] Fetch data with useQuery
- [ ] Create mutations with useMutation
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Invalidate cache after mutations

**Full-Stack:**
- [ ] Understand REST principles
- [ ] Know when to use GET/POST/PUT/DELETE
- [ ] Configure CORS correctly
- [ ] Separate server state from client state
- [ ] Type-safe API communication

**React Query Concepts:**
- [ ] Know what a query key is
- [ ] Understand query caching
- [ ] Know when cache invalidates
- [ ] Can explain optimistic updates
- [ ] Understand background refetching **If you can confidently do all above, you're ready for Lab 4!**

---

## ✅ Success Criteria Checklist

Before moving to Lesson 4, verify you can:

### **REST API Fundamentals**
- [ ] Understand HTTP methods (GET, POST, PUT, DELETE)
- [ ] Know common status codes (200, 201, 400, 404, 500)
- [ ] Make API requests using fetch or axios
- [ ] Handle JSON responses correctly
- [ ] Work with async/await patterns

### **React Integration**
- [ ] Fetch data in useEffect hook
- [ ] Manage loading, error, and success states
- [ ] Display API data in components
- [ ] Handle form submissions to API
- [ ] Cancel requests on component unmount

### **React Query (TanStack Query)**
- [ ] Set up QueryClient provider
- [ ] Use useQuery for data fetching
- [ ] Use useMutation for create/update/delete
- [ ] Invalidate queries after mutations
- [ ] Implement optimistic updates

### **CRUD Operations**
- [ ] Create resources with POST requests
- [ ] Read/List resources with GET requests
- [ ] Update resources with PUT/PATCH requests
- [ ] Delete resources with DELETE requests
- [ ] Handle success/error feedback properly

### **Advanced Features**
- [ ] Implement debounced search functionality
- [ ] Add pagination to large lists
- [ ] Handle file uploads with FormData
- [ ] Manage complex state with useReducer
- [ ] Debug API calls with DevTools **Goal: Check at least 16/20 items before Lesson 4**

---

