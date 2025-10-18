// ============================================
// Bonus Challenge: UserManager - Tests
// ============================================

const UserManager = require('./UserManager');

// Simple test framework for demonstration
function runTests() {
  let passed = 0;
  let failed = 0;

  function test(name, condition) {
    if (condition) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  }

  console.log('=== Running Bonus Challenge Tests ===\n');

  // Test basic functionality
  console.log('--- Basic Functionality ---');
  
  const manager = new UserManager();
  
  // Test addUser
  manager.addUser({ id: 1, name: 'Alice', active: true, role: 'admin' });
  test('addUser adds user', manager.getUserCount() === 1);
  test('addUser creates copy', manager.getUser(1) !== { id: 1, name: 'Alice', active: true, role: 'admin' });

  // Test getUser
  const user = manager.getUser(1);
  test('getUser returns correct user', user && user.name === 'Alice');
  test('getUser returns undefined for non-existent', manager.getUser(999) === undefined);

  // Test updateUser
  manager.updateUser(1, { name: 'Alice Smith' });
  const updatedUser = manager.getUser(1);
  test('updateUser updates user', updatedUser.name === 'Alice Smith');
  test('updateUser preserves other properties', updatedUser.active === true);

  // Test getActiveUsers
  manager.addUser({ id: 2, name: 'Bob', active: false });
  const activeUsers = manager.getActiveUsers();
  test('getActiveUsers returns only active users', activeUsers.length === 1 && activeUsers[0].name === 'Alice Smith');

  // Test getUserSummaries
  const summaries = manager.getUserSummaries();
  test('getUserSummaries returns correct format', summaries.length === 2 && summaries[0].includes('Active'));

  // Test additional methods
  console.log('\n--- Additional Methods ---');
  
  // Test deleteUser
  manager.deleteUser(2);
  test('deleteUser removes user', manager.getUserCount() === 1);

  // Test getUsersByRole
  manager.addUser({ id: 3, name: 'Charlie', active: true, role: 'user' });
  const admins = manager.getUsersByRole('admin');
  test('getUsersByRole filters by role', admins.length === 1 && admins[0].name === 'Alice Smith');

  // Test getUserStats
  const stats = manager.getUserStats();
  test('getUserStats returns correct stats', stats.total === 2 && stats.active === 2);

  // Test searchUsers
  const searchResults = manager.searchUsers('alice');
  test('searchUsers finds users', searchResults.length === 1 && searchResults[0].name === 'Alice Smith');

  // Test edge cases
  console.log('\n--- Edge Cases ---');
  
  // Test with empty manager
  const emptyManager = new UserManager();
  test('empty manager has 0 users', emptyManager.getUserCount() === 0);
  test('empty manager has no active users', emptyManager.getActiveUsers().length === 0);

  // Test with null/undefined values
  manager.addUser({ id: 4, name: null, active: true });
  const nullSearch = manager.searchUsers(null);
  test('searchUsers handles null query', nullSearch.length >= 0);

  // Test pagination
  const page1 = manager.getUsersPaginated(1, 1);
  test('pagination returns correct structure', page1.users.length === 1 && page1.pagination.page === 1);

  // Test export
  const exported = manager.exportUsers();
  test('exportUsers returns correct format', Array.isArray(exported) && exported.length === 3);

  // Test clearUsers
  manager.clearUsers();
  test('clearUsers removes all users', manager.getUserCount() === 0);

  // Test hasUser
  manager.addUser({ id: 1, name: 'Test' });
  test('hasUser returns true for existing user', manager.hasUser(1) === true);
  test('hasUser returns false for non-existing user', manager.hasUser(999) === false);

  // Test addMultipleUsers
  const multipleUsers = [
    { id: 2, name: 'User2' },
    { id: 3, name: 'User3' }
  ];
  manager.addMultipleUsers(multipleUsers);
  test('addMultipleUsers adds all users', manager.getUserCount() === 3);

  // Summary
  console.log('\n=== Test Summary ===');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check your implementation.');
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  runTests();
} else {
  // Browser environment - expose test function
  window.runTests = runTests;
  console.log('Tests loaded. Run runTests() in console to execute tests.');
}
