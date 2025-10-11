import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Task API functions
export const taskApi = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data; // Return the tasks array directly
  },

  // Get single task
  getTask: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData) => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  },

  // Update task
  updateTask: async ({ id, ...taskData }) => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    return;
  },
};

export default axios;
