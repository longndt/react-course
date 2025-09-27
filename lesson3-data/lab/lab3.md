# Lab 3: API Integration & CRUD Operations

## Overview

In this focused lab exercise, you'll build essential API integration features by connecting a React frontend to a Node.js/Express/MongoDB backend. This demonstrates core full-stack patterns used in modern web development.

_For detailed learning objectives and concepts, see [../README.md](../README.md)_

## Exercises

- Setup & API Connection
- CRUD Operations Implementation
- Testing & Validation

---

## Pre-Lab Setup

### Quick Reference

_For detailed development environment setup, see [Complete Environment Setup Guide](../../setup/environment-setup.md)_

### Required Software (Quick Check)

- [ ] Node.js (v18+) installed
- [ ] MongoDB (local or Atlas account)
- [ ] VS Code with recommended extensions
- [ ] Thunder Client or Postman for API testing

### Verify Setup

```bash
node --version    # Should be v18+
npm --version     # Should be 8+
mongod --version  # Local MongoDB (or Atlas connection string ready)
```

npm --version # Should be v8+
mongod --version # If using local MongoDB

````

---

## Exercise: Quick API Integration

### Step 1: Backend Setup

Create a simple Express server with MongoDB connection:

```javascript
// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
.connect("mongodb://localhost:27017/student_management")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Task model (simplified for the lab)
const TaskSchema = new mongoose.Schema(
{
 title: { type: String, required: true },
 completed: { type: Boolean, default: false },
 priority: { type: String, default: "medium" },
},
{ timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

// Basic CRUD Routes
app.get("/api/tasks", async (req, res) => {
try {
 const tasks = await Task.find();
 res.json(tasks);
} catch (error) {
 res.status(500).json({ error: error.message });
}
});

app.post("/api/tasks", async (req, res) => {
try {
 const task = new Task(req.body);
 const savedTask = await task.save();
 res.status(201).json(savedTask);
} catch (error) {
 res.status(400).json({ error: error.message });
}
});

app.put("/api/tasks/:id", async (req, res) => {
try {
 const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
   new: true,
 });
 res.json(task);
} catch (error) {
 res.status(400).json({ error: error.message });
}
});

app.delete("/api/tasks/:id", async (req, res) => {
try {
 await Task.findByIdAndDelete(req.params.id);
 res.json({ message: "Task deleted" });
} catch (error) {
 res.status(500).json({ error: error.message });
}
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
````

**Quick Start Commands:**

```bash
npm init -y
npm install express mongoose cors
# Create server/index.js with code above
node server/index.js
```

### Step 2: React Integration

Install React Query and Axios:

```bash
npm install @tanstack/react-query axios
```

First, setup React Query provider in your App.jsx:

```jsx
// src/App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskManager from "./components/TaskManager";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>Task Management App</h1>
        <TaskManager />
      </div>
    </QueryClientProvider>
  );
}

export default App;
```

Now create the TaskManager component:

```jsx
// src/components/TaskManager.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

function TaskManager() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const queryClient = useQueryClient();

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => axios.get(`${API_BASE}/tasks`).then((res) => res.data),
  });

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: (taskData) => axios.post(`${API_BASE}/tasks`, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setNewTaskTitle("");
    },
  });

  // Update task mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => axios.put(`${API_BASE}/tasks/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Delete task mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API_BASE}/tasks/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      createMutation.mutate({ title: newTaskTitle });
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task"
          required
        />
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Adding..." : "Add Task"}
        </button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
            <div className="task-actions">
              <button
                onClick={() =>
                  updateMutation.mutate({
                    id: task._id,
                    completed: !task.completed,
                  })
                }
                disabled={updateMutation.isPending}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => deleteMutation.mutate(task._id)}
                disabled={deleteMutation.isPending}
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

export default TaskManager;
```

### Step 3: Testing & Validation

1. **Start your servers**:

   ```bash
   # Terminal 1: Backend
   node server/index.js

   # Terminal 2: Frontend
   npm run dev
   ```

2. **Test the functionality**:

   - Add new tasks
   - Mark tasks as completed
   - Delete tasks
   - Check browser network tab for API calls

3. **Verify MongoDB**:
   ```bash
   # Connect to MongoDB and check data
   mongo student_management
   db.tasks.find().pretty()
   ```

## Key Concepts Demonstrated

✅ **Node.js/Express Backend**: RESTful API with proper error handling
✅ **MongoDB Integration**: Mongoose schemas and CRUD operations
✅ **React Query**: Data fetching, caching, and mutations
✅ **Error Handling**: Loading states and error boundaries
✅ **CORS Configuration**: Cross-origin request handling

## Troubleshooting

- **MongoDB connection issues**: Check if MongoDB service is running
- **CORS errors**: Verify backend allows frontend origin
- **Network errors**: Ensure both servers are running on correct ports
- **Data not updating**: Check React Query cache invalidation

## Next Steps

- Add form validation
- Implement pagination
- Add authentication
- Deploy to production

---
