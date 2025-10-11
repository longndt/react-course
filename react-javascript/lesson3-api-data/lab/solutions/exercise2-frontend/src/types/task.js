/**
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} title
 * @property {string} description
 * @property {'pending' | 'completed'} status
 * @property {'low' | 'medium' | 'high'} priority
 * @property {string | null} [dueDate]
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} CreateTaskInput
 * @property {string} title
 * @property {string} description
 * @property {'low' | 'medium' | 'high'} [priority]
 * @property {string} [dueDate]
 */

/**
 * @typedef {Object} UpdateTaskInput
 * @property {string} id
 * @property {string} [title]
 * @property {string} [description]
 * @property {'low' | 'medium' | 'high'} [priority]
 * @property {string} [dueDate]
 * @property {'pending' | 'completed'} [status]
 */

// Export empty object to make this a valid ES module
export { };
