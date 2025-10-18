// ============================================
// Exercise 7: Optional Chaining & Nullish Coalescing - Tests
// ============================================

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

  console.log('=== Running Exercise 7 Tests ===\n');

  // Test 7.1: Safe Property Access
  console.log('--- Safe Property Access ---');

  const data = {
    user: {
      name: 'John',
      profile: {
        bio: 'Developer'
      }
    }
  };

  const bio = data?.user?.profile?.bio;
  const age = data?.user?.age;
  const city = data?.user?.address?.city ?? 'Unknown';

  test('safe property access - bio', bio === 'Developer');
  test('safe property access - age', age === undefined);
  test('nullish coalescing - city', city === 'Unknown');

  // Test 7.2: Default Values
  console.log('\n--- Default Values ---');

  function displayUser(user) {
    const name = user?.name ?? 'Guest';
    const role = user?.role ?? 'User';
    const status = user?.status ?? 'Offline';
    return `${name} (${role}) - ${status}`;
  }

  test('displayUser with full data', displayUser({ name: 'Alice', role: 'Admin' }) === 'Alice (Admin) - Offline');
  test('displayUser with partial data', displayUser({ name: 'Bob' }) === 'Bob (User) - Offline');
  test('displayUser with empty object', displayUser({}) === 'Guest (User) - Offline');

  // Test additional examples
  console.log('\n--- Additional Example ---');

  // Optional chaining with method calls
  const api = {
    users: {
      get: (id) => ({ id, name: `User${id}` })
    }
  };

  const user = api?.users?.get?.(1);
  test('optional chaining with method calls', user && user.id === 1 && user.name === 'User1');

  // Optional chaining with arrays
  const users = [
    { name: 'Alice', posts: [{ title: 'Post 1' }] },
    { name: 'Bob', posts: [] },
    { name: 'Charlie' }
  ];

  const firstPost = users[0]?.posts?.[0]?.title ?? 'No posts';
  const secondPost = users[1]?.posts?.[0]?.title ?? 'No posts';
  const thirdPost = users[2]?.posts?.[0]?.title ?? 'No posts';

  test('optional chaining with arrays - first user', firstPost === 'Post 1');
  test('optional chaining with arrays - second user', secondPost === 'No posts');
  test('optional chaining with arrays - third user', thirdPost === 'No posts');

  // Test edge cases
  console.log('\n--- Edge Cases ---');

  // Null and undefined handling
  const nullObject = null;
  const undefinedObject = undefined;
  const emptyObject = {};

  test('null object access', nullObject?.property === undefined);
  test('undefined object access', undefinedObject?.property === undefined);
  test('empty object access', emptyObject?.property === undefined);

  // Nullish coalescing with falsy values
  const falsyValues = {
    zero: 0,
    emptyString: '',
    false: false,
    null: null,
    undefined: undefined
  };

  test('nullish coalescing with 0', (falsyValues.zero ?? 'default') === 0);
  test('nullish coalescing with empty string', (falsyValues.emptyString ?? 'default') === '');
  test('nullish coalescing with false', (falsyValues.false ?? 'default') === false);
  test('nullish coalescing with null', (falsyValues.null ?? 'default') === 'default');
  test('nullish coalescing with undefined', (falsyValues.undefined ?? 'default') === 'default');

  // Nested optional chaining
  const nested = {
    level1: {
      level2: {
        level3: {
          value: 'Deep value'
        }
      }
    }
  };

  const deepValue = nested?.level1?.level2?.level3?.value ?? 'Not found';
  const missingValue = nested?.level1?.level2?.level3?.missing?.value ?? 'Not found';

  test('nested optional chaining - existing', deepValue === 'Deep value');
  test('nested optional chaining - missing', missingValue === 'Not found');

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
