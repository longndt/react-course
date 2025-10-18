// ============================================
// Bonus Challenge: UserManager - Main Demo
// ============================================

const UserManager = require('./UserManager');

console.log('=== Bonus Challenge: UserManager ===');

// Create UserManager instance
const manager = new UserManager();

// Add users
manager.addUser({ id: 1, name: 'Alice', active: true, role: 'admin', age: 25, email: 'alice@example.com' });
manager.addUser({ id: 2, name: 'Bob', active: false, role: 'user', age: 30, email: 'bob@example.com' });
manager.addUser({ id: 3, name: 'Charlie', active: true, role: 'moderator', age: 35, email: 'charlie@example.com' });

console.log('Initial users:', manager.users);

// Update user
manager.updateUser(1, { name: 'Alice Smith' });
console.log('After updating user 1:', manager.getUser(1));

// Get active users
const activeUsers = manager.getActiveUsers();
console.log('Active users:', activeUsers);

// Get user summaries
const summaries = manager.getUserSummaries();
console.log('User summaries:', summaries);

// ============================================
// Additional Features Demo
// ============================================

console.log('\n=== Additional Features Demo ===');

// Get user statistics
const stats = manager.getUserStats();
console.log('User statistics:', stats);

// Search users
const searchResults = manager.searchUsers('alice');
console.log('Search results for "alice":', searchResults);

// Get users by role
const admins = manager.getUsersByRole('admin');
console.log('Admin users:', admins);

// Pagination
const page1 = manager.getUsersPaginated(1, 2);
console.log('Page 1 (limit 2):', page1);

// Export users
const exportedUsers = manager.exportUsers();
console.log('Exported users:', exportedUsers);

// ============================================
// Advanced Operations Demo
// ============================================

console.log('\n=== Advanced Operations Demo ===');

// Add multiple users
const newUsers = [
  { id: 4, name: 'David', active: true, role: 'user', age: 28, email: 'david@example.com' },
  { id: 5, name: 'Eve', active: false, role: 'user', age: 32, email: 'eve@example.com' }
];

manager.addMultipleUsers(newUsers);
console.log('After adding multiple users:', manager.getUserCount());

// Delete user
manager.deleteUser(2);
console.log('After deleting user 2:', manager.getUserCount());

// Check if user exists
console.log('User 1 exists:', manager.hasUser(1));
console.log('User 2 exists:', manager.hasUser(2));

// ============================================
// Error Handling and Edge Cases
// ============================================

console.log('\n=== Error Handling and Edge Cases ===');

// Try to get non-existent user
const nonExistentUser = manager.getUser(999);
console.log('Non-existent user:', nonExistentUser);

// Try to update non-existent user
manager.updateUser(999, { name: 'Updated' });
console.log('After trying to update non-existent user:', manager.getUserCount());

// Search with empty query
const emptySearch = manager.searchUsers('');
console.log('Empty search results:', emptySearch.length);

// Search with null/undefined
const nullSearch = manager.searchUsers(null);
console.log('Null search results:', nullSearch.length);

// ============================================
// Performance Test
// ============================================

console.log('\n=== Performance Test ===');

// Add many users for performance testing
const startTime = Date.now();
const manyUsers = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 100,
  name: `User${i}`,
  active: i % 2 === 0,
  role: i % 3 === 0 ? 'admin' : 'user',
  age: 20 + (i % 50),
  email: `user${i}@example.com`
}));

manager.addMultipleUsers(manyUsers);
const endTime = Date.now();

console.log(`Added 1000 users in ${endTime - startTime}ms`);
console.log('Total users:', manager.getUserCount());

// Test search performance
const searchStartTime = Date.now();
const searchResults2 = manager.searchUsers('user500');
const searchEndTime = Date.now();

console.log(`Search completed in ${searchEndTime - searchStartTime}ms`);
console.log('Search results count:', searchResults2.length);

// ============================================
// Final State
// ============================================

console.log('\n=== Final State ===');
console.log('Total users:', manager.getUserCount());
console.log('Active users:', manager.getActiveUsers().length);
console.log('User statistics:', manager.getUserStats());

console.log('\n✅ Bonus Challenge completed! Check the results above.');
