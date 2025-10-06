import axios from 'axios';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

const API_BASE_URL = 'http://localhost:3000/api';

// API client with axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task API functions
export const taskApi = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data.data; // Return just the tasks array
  },

  // Get single task
  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data.data;
  },

  // Create new task
  createTask: async (taskData: CreateTaskInput): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data.data;
  },

  // Update task
  updateTask: async ({ id, ...taskData }: UpdateTaskInput): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data.data;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data.data;
  },
};

export default api;
