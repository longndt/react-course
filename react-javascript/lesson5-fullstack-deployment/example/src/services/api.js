import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear localStorage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) =>
    api.post('/auth/register', userData),

  login: (credentials) =>
    api.post('/auth/login', credentials),

  getMe: () => api.get('/auth/me'),

  updateProfile: (userData) =>
    api.put('/auth/profile', userData),
};

// Dashboard API
export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard'),

  updateDashboard: (data) => api.put('/dashboard', data),

  addActivity: (activity) =>
    api.post('/dashboard/activity', activity),

  getAnalytics: () => api.get('/dashboard/analytics'),
};

// Users API (Admin only)
export const usersAPI = {
  getUsers: (page = 1, limit = 10) =>
    api.get(`/users?page=${page}&limit=${limit}`),

  getUser: (id) => api.get(`/users/${id}`),

  updateUser: (id, userData) =>
    api.put(`/users/${id}`, userData),

  deleteUser: (id) => api.delete(`/users/${id}`),

  getUserStats: () => api.get('/users/stats/overview'),
};

export default api;
