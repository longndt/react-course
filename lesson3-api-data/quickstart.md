# Quick Start Guide - Lesson 3

## Connect React to Node\.ts API

### 1. Setup Backend API

Create a simple Express server in a new terminal:

```bash
# In a new directory or subfolder
mkdir lesson3-api && cd lesson3-api

# Initialize and install dependencies
npm init -y
npm install express mongoose cors dotenv

# Create server\.ts
```

Create `server\.ts`:

```typescript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data (we'll use MongoDB later)
let tasks = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build API", completed: true },
  { id: 3, title: "Connect Frontend", completed: false },
];

// Routes
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = req.body.completed;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. Start Your Backend

```bash
# Start the API server
node server\.ts
# Should show: Server running on port 5000
```

### 3. Setup Frontend with React Query

In your React app directory:

```bash
# Install React Query and Axios
npm install @tanstack/react-query axios

# Start your React app (in another terminal)
npm run dev
```

### 4. Create API Service

Create `src/services/api\.ts`:

```typescript
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const api = {
  // Get all tasks
  getTasks: () => axios.get(`${API_BASE}/tasks`).then((res) => res.data),

  // Create new task
  createTask: (taskData) =>
    axios.post(`${API_BASE}/tasks`, taskData).then((res) => res.data),

  // Update task
  updateTask: (id, updates) =>
    axios.put(`${API_BASE}/tasks/${id}`, updates).then((res) => res.data),

  // Delete task
  deleteTask: (id) =>
    axios.delete(`${API_BASE}/tasks/${id}`).then((res) => res.data),
};
```

### 5. Setup React Query Provider

Update `src/main\.tsx`:

```typescript
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App\.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
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

### 6. Create Task Component

Create `src/components/TaskManager\.tsx`:

```typescript
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

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
    queryFn: api.getTasks,
  });

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setNewTaskTitle("");
    },
  });

  // Update task mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) => api.updateTask(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Delete task mutation
  const deleteMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      createMutation.mutate({ title: newTaskTitle });
    }
  };

  const toggleTask = (task) => {
    updateMutation.mutate({
      id: task.id,
      updates: { completed: !task.completed },
    });
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px" }}>
      <h2>Task Manager</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task"
          style={{
            padding: "8px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "300px",
          }}
        />
        <button
          type="submit"
          disabled={createMutation.isPending}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {createMutation.isPending ? "Adding..." : "Add Task"}
        </button>
      </form>

      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #eee",
              borderRadius: "4px",
              marginBottom: "5px",
              backgroundColor: task.completed ? "#f0f8f0" : "white",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
              style={{ marginRight: "10px" }}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteMutation.mutate(task.id)}
              disabled={deleteMutation.isPending}
              style={{
                padding: "4px 8px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
```

### 7. Use TaskManager in App

Update `src/App\.tsx`:

```typescript
import TaskManager from "./components/TaskManager";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>React + Node\.ts Integration</h1>
      <TaskManager />
    </div>
  );
}

export default App;
```

## 🎉 Congratulations!

You now have:

- ✅ A working Node\.ts Express API
- ✅ React frontend consuming the API
- ✅ React Query for professional data management
- ✅ Full CRUD operations working
- ✅ Real-time updates with optimistic UI

## Test Your Setup

1. Open your React app (http://localhost:5173)
2. Add some tasks - they should appear instantly
3. Toggle task completion - updates immediately
4. Delete tasks - removes from list
5. Refresh page - data persists (stored in server memory)

## Next Steps

1. Read the full [Lesson 3 README](./readme.md)
2. Replace mock data with MongoDB
3. Add error handling and loading states
4. Complete the lab exercises

## Need Help?

- Make sure both servers are running (React on 5173, API on 5000)
- Check browser network tab for API calls
- Verify CORS is working (no console errors)


