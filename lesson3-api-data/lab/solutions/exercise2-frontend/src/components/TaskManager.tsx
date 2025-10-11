import { useState, useEffect } from 'react';
import { taskApi } from '../services/api';
import type { Task, CreateTaskInput } from '../types/task';
import './TaskManager.css';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<CreateTaskInput>({
    title: '',
    description: '',
    priority: 'medium',
  });

  // ============================================
  // FETCH TASKS with Axios
  // ============================================
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // CREATE TASK with Axios
  // ============================================
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const createdTask = await taskApi.createTask(newTask);
      setTasks(prev => [...prev, createdTask]);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
      });
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task');
    }
  };

  // ============================================
  // UPDATE TASK with Axios
  // ============================================
  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await taskApi.updateTask({ id, ...updates });
      setTasks(prev => prev.map(task =>
        task._id === id ? updatedTask : task
      ));
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  // ============================================
  // DELETE TASK with Axios
  // ============================================
  const deleteTask = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
    }
  };

  // ============================================
  // TOGGLE TASK STATUS
  // ============================================
  const toggleTaskStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    updateTask(id, { status: newStatus });
  };

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => {
    fetchTasks();
  }, []);

  // ============================================
  // RENDER
  // ============================================
  if (loading) {
    return (
      <div className="task-manager">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-manager">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchTasks}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      {/* Create Task Form */}
      <form onSubmit={createTask} className="task-form">
        <h2>Add New Task</h2>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter task description"
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={newTask.priority}
            onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Task
        </button>
      </form>

      {/* Tasks List */}
      <div className="tasks-section">
        <h2>Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p>No tasks found. Create your first task!</p>
        ) : (
          <div className="tasks">
            {tasks.map(task => (
              <div key={task._id} className={`task-card ${task.status}`}>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className={`priority priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    <span className="status">
                      {task.status}
                    </span>
                    <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>

                <div className="task-actions">
                  <button
                    onClick={() => toggleTaskStatus(task._id, task.status)}
                    className={`btn ${task.status === 'pending' ? 'btn-success' : 'btn-warning'}`}
                  >
                    {task.status === 'pending' ? 'Complete' : 'Reopen'}
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}