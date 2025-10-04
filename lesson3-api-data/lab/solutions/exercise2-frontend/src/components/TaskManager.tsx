import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../services/api';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import './TaskManager.css';

export default function TaskManager() {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState<CreateTaskInput>({
    title: '',
    description: '',
    priority: 'medium',
  });

  // ============================================
  // FETCH TASKS with useQuery
  // ============================================
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: taskApi.getAllTasks,
    staleTime: 1000 * 60, // Data stays fresh for 1 minute
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  // ============================================
  // CREATE TASK with useMutation
  // ============================================
  const createMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      // Reset form
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
      });
    },
    onError: (error: any) => {
      alert(`Error creating task: ${error.response?.data?.message || error.message}`);
    },
  });

  // ============================================
  // UPDATE TASK with useMutation
  // ============================================
  const updateMutation = useMutation({
    mutationFn: taskApi.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      alert(`Error updating task: ${error.response?.data?.message || error.message}`);
    },
  });

  // ============================================
  // DELETE TASK with useMutation
  // ============================================
  const deleteMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      alert(`Error deleting task: ${error.response?.data?.message || error.message}`);
    },
  });

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert('Title and description are required!');
      return;
    }
    createMutation.mutate(newTask);
  };

  const handleToggleComplete = (task: Task) => {
    updateMutation.mutate({
      id: task._id,
      completed: !task.completed,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(taskId);
    }
  };

  // ============================================
  // LOADING & ERROR STATES
  // ============================================
  if (isLoading) {
    return (
      <div className="task-manager">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="task-manager">
        <div className="error">
          <h2>❌ Error Loading Tasks</h2>
          <p>{(error as Error).message}</p>
          <p>Make sure the backend server is running on http://localhost:3000</p>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER UI
  // ============================================
  return (
    <div className="task-manager">
      <header>
        <h1>📝 Task Manager</h1>
        <p>Full-stack app with React Query + Express + MongoDB</p>
      </header>

      {/* CREATE TASK FORM */}
      <section className="create-task-section">
        <h2>➕ Create New Task</h2>
        <form onSubmit={handleCreateTask} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title..."
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              placeholder="Enter task description..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })
              }
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? 'Creating...' : '➕ Create Task'}
          </button>
        </form>
      </section>

      {/* TASK LIST */}
      <section className="task-list-section">
        <h2>📋 Tasks ({tasks?.length || 0})</h2>

        {tasks && tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Create your first task above!</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks?.map((task) => (
              <div
                key={task._id}
                className={`task-card ${task.completed ? 'completed' : ''} priority-${task.priority}`}
              >
                <div className="task-header">
                  <div className="task-checkbox">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      disabled={updateMutation.isPending}
                    />
                  </div>
                  <div className="task-content">
                    <h3 className={task.completed ? 'strikethrough' : ''}>
                      {task.title}
                    </h3>
                    <p>{task.description}</p>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(task._id)}
                      disabled={deleteMutation.isPending}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="task-footer">
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority === 'high' && '🔴'}
                    {task.priority === 'medium' && '🟡'}
                    {task.priority === 'low' && '🟢'}
                    {' '}{task.priority}
                  </span>
                  <span className="task-date">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
