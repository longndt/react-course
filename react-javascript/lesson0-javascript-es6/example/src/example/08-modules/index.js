/**
 * index.js - Re-exporting Pattern
 * Barrel file - single entry point for related modules
 */

// Re-export everything from utils
export * from './utils.js';

// Re-export default as named export
export { default as User } from './User.js';

// Re-export specific items
export { API_URL, TIMEOUT } from './api.js';
export { COLORS, ROUTES } from './constants.js';

// Re-export default with new name
export { default as apiClient } from './api.js';

// Now users can import everything from one place:
// import { add, User, COLORS, apiClient } from './08-modules/index.js';
