/**
 * api.js - Mixed Exports (Default + Named)
 * Common pattern for API clients
 */

// Named exports
export const API_URL = 'https://api.example.com';
export const API_VERSION = 'v1';
export const TIMEOUT = 5000;

// Helper function
export function buildURL(endpoint) {
  return `${API_URL}/${API_VERSION}${endpoint}`;
}

// Main API object as default export
const api = {
  async get(endpoint) {
    const url = buildURL(endpoint);
    console.log(`GET ${url}`);
    // Simulated fetch
    return { data: [] };
  },

  async post(endpoint, data) {
    const url = buildURL(endpoint);
    console.log(`POST ${url}`, data);
    // Simulated fetch
    return { success: true };
  },

  async put(endpoint, data) {
    const url = buildURL(endpoint);
    console.log(`PUT ${url}`, data);
    return { success: true };
  },

  async delete(endpoint) {
    const url = buildURL(endpoint);
    console.log(`DELETE ${url}`);
    return { success: true };
  }
};

export default api;
