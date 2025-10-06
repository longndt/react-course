/**
 * main.js - Import Examples
 * Demonstrates all ways to import modules
 */

console.log('=== ES6 Modules Examples ===\n');

// ==================================================
// 1. Named Imports
// ==================================================

console.log('1. Named Imports:');

import { add, subtract, PI } from './utils.js';

console.log('  add(5, 3):', add(5, 3));
console.log('  subtract(10, 4):', subtract(10, 4));
console.log('  PI:', PI);

// ==================================================
// 2. Import with Rename
// ==================================================

console.log('\n2. Import with Rename:');

import { add as sum, multiply as times } from './utils.js';

console.log('  sum(2, 3):', sum(2, 3));
console.log('  times(4, 5):', times(4, 5));

// ==================================================
// 3. Default Import
// ==================================================

console.log('\n3. Default Import:');

import User from './User.js';

const user = new User('John Doe', 'john@example.com');
console.log('  User:', user.greet());

// Can rename default import
import MyUser from './User.js';
const user2 = new MyUser('Jane', 'jane@example.com');
console.log('  MyUser:', user2.greet());

// ==================================================
// 4. Mixed Imports (Default + Named)
// ==================================================

console.log('\n4. Mixed Imports:');

import api, { API_URL, buildURL } from './api.js';

console.log('  API_URL:', API_URL);
console.log('  buildURL:', buildURL('/users'));
api.get('/users');

// ==================================================
// 5. Import All (Namespace Import)
// ==================================================

console.log('\n5. Import All:');

import * as utils from './utils.js';
import * as constants from './constants.js';

console.log('  utils.add(1, 2):', utils.add(1, 2));
console.log('  utils.PI:', utils.PI);
console.log('  App name:', constants.APP_NAME);
console.log('  Primary color:', constants.COLORS.primary);

// ==================================================
// 6. Import from Index (Barrel)
// ==================================================

console.log('\n6. Import from Index:');

import { User as UserFromIndex, COLORS, apiClient } from './index.js';

const user3 = new UserFromIndex('Bob', 'bob@example.com');
console.log('  User from index:', user3.greet());
console.log('  Colors:', COLORS);
apiClient.post('/users', { name: 'New User' });

// ==================================================
// 7. Dynamic Import (ES2020)
// ==================================================

console.log('\n7. Dynamic Import:');

async function loadModule() {
  const { add, PI } = await import('./utils.js');
  console.log('  Dynamically loaded add(10, 5):', add(10, 5));
  console.log('  Dynamically loaded PI:', PI);
}

loadModule();

// ==================================================
// 8. Conditional Import
// ==================================================

console.log('\n8. Conditional Import:');

const isDevelopment = true;

if (isDevelopment) {
  import('./constants.js').then(({ APP_VERSION }) => {
    console.log('  Dev mode - App version:', APP_VERSION);
  });
}

// ==================================================
// 9. Practical Examples
// ==================================================

console.log('\n9. Practical Examples:');

// Example: User management
const users = [
  new User('Alice', 'alice@example.com'),
  new User('Bob', 'bob@example.com'),
  User.createGuest()
];

console.log('  Users:');
users.forEach(u => console.log('   -', u.greet()));

// Example: API calls
async function fetchData() {
  console.log('\n  API Operations:');
  await api.get('/users');
  await api.post('/users', { name: 'New User' });
  await api.put('/users/1', { name: 'Updated' });
  await api.delete('/users/1');
}

fetchData();

// Example: Using constants
console.log('\n  Routes:');
Object.entries(constants.ROUTES).forEach(([key, value]) => {
  console.log(`    ${key}: ${value}`);
});

// ==================================================
// 10. Best Practices
// ==================================================

console.log('\n10. Best Practices:');
console.log(`
   Use named exports for utilities
   Use default export for main class/component
   Use index.js to group related modules
   Use dynamic import for code splitting
   Always include .js extension in imports
    One default export per file
    Avoid circular dependencies
    Don't mix CommonJS and ES6 modules
`);

console.log('\n=== End of Module Examples ===\n');
