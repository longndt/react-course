import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

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
    return response.data; // Return the tasks array directly
  },

  // Get single task
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  updateTask: async ({ id, ...taskData }) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    return;
  },
};

export default api;
