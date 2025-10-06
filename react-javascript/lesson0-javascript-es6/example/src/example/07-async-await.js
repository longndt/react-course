/**
 * Example 7: Async/Await
 * Modern way to handle asynchronous operations
 */

console.log('=== Example 7: Async/Await ===\n');

// ==================================================
// 1. What is Async/Await?
// ==================================================

console.log('1. What is Async/Await?');
console.log('  Modern syntax for working with Promises');
console.log('  Makes async code look synchronous');
console.log('  Cleaner than .then() chains');
console.log('  Built on top of Promises\n');

// ==================================================
// 2. Basic Async Function
// ==================================================

console.log('2. Basic Async Function:');

// Traditional Promise way
function fetchUserPromise(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 500);
  });
}

//  Async/await way
async function fetchUserAsync(id) {
  // Simulate API call
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 500);
  });

  const user = await promise;
  return user;
}

// Call async function
(async () => {
  console.log('  Fetching user...');
  const user = await fetchUserAsync(1);
  console.log('   User loaded:', user);
})();

// ==================================================
// 3. Error Handling - try/catch
// ==================================================

console.log('\n3. Error Handling with try/catch:');

async function fetchDataWithError(shouldFail) {
  try {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Network error'));
        } else {
          resolve('Data loaded successfully');
        }
      }, 500);
    });

    const data = await promise;
    console.log('   Success:', data);
    return data;
  } catch (error) {
    console.log('   Error caught:', error.message);
    throw error; // Re-throw if needed
  } finally {
    console.log('  🏁 Cleanup: Hide loading spinner');
  }
}

// Test success
(async () => {
  await fetchDataWithError(false);
})();

// Test error (after delay)
setTimeout(async () => {
  try {
    await fetchDataWithError(true);
  } catch (error) {
    console.log('  Handled in caller:', error.message);
  }
}, 1500);

// ==================================================
// 4. Sequential vs Parallel Execution
// ==================================================

console.log('\n4. Sequential vs Parallel Execution:');

function delay(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

//  Sequential (slower - 3 seconds total)
async function sequentialExample() {
  console.log('\n  Sequential (3 seconds):');
  const start = Date.now();

  const result1 = await delay(1000, 'First');
  const result2 = await delay(1000, 'Second');
  const result3 = await delay(1000, 'Third');

  const elapsed = Date.now() - start;
  console.log(`  Results: ${result1}, ${result2}, ${result3}`);
  console.log(`  Time: ${elapsed}ms`);
}

//  Parallel (faster - 1 second total)
async function parallelExample() {
  console.log('\n  Parallel (1 second):');
  const start = Date.now();

  const [result1, result2, result3] = await Promise.all([
    delay(1000, 'First'),
    delay(1000, 'Second'),
    delay(1000, 'Third')
  ]);

  const elapsed = Date.now() - start;
  console.log(`  Results: ${result1}, ${result2}, ${result3}`);
  console.log(`  Time: ${elapsed}ms`);
}

// Run after 2 seconds
setTimeout(() => {
  sequentialExample();
}, 2000);

setTimeout(() => {
  parallelExample();
}, 6000);

// ==================================================
// 5. Practical Example - API Calls
// ==================================================

console.log('\n5. Practical Example - API Calls:');

// Simulated API functions
async function fetchUser(id) {
  await delay(500);
  return { id, name: `User ${id}`, email: `user${id}@example.com` };
}

async function fetchPosts(userId) {
  await delay(500);
  return [
    { id: 1, title: 'Post 1', userId },
    { id: 2, title: 'Post 2', userId }
  ];
}

async function fetchComments(postId) {
  await delay(500);
  return [
    { id: 1, text: 'Great!', postId },
    { id: 2, text: 'Thanks!', postId }
  ];
}

// Load user data (sequential)
async function loadUserData(userId) {
  console.log('\n  Loading user data...');

  try {
    // Step 1: Get user
    const user = await fetchUser(userId);
    console.log('  → Got user:', user.name);

    // Step 2: Get user's posts
    const posts = await fetchPosts(user.id);
    console.log('  → Got posts:', posts.length);

    // Step 3: Get comments for first post
    const comments = await fetchComments(posts[0].id);
    console.log('  → Got comments:', comments.length);

    return { user, posts, comments };
  } catch (error) {
    console.log('   Error loading data:', error.message);
    throw error;
  }
}

// Run after 7 seconds
setTimeout(() => {
  loadUserData(1).then(data => {
    console.log('   All data loaded!');
  });
}, 7000);

// ==================================================
// 6. Parallel API Calls
// ==================================================

console.log('\n6. Parallel API Calls:');

async function loadMultipleUsers() {
  console.log('\n  Loading multiple users in parallel...');

  try {
    const users = await Promise.all([
      fetchUser(1),
      fetchUser(2),
      fetchUser(3)
    ]);

    console.log('   Loaded users:', users.map(u => u.name));
    return users;
  } catch (error) {
    console.log('   Error:', error.message);
  }
}

// Run after 9 seconds
setTimeout(() => {
  loadMultipleUsers();
}, 9000);

// ==================================================
// 7. Error Handling Patterns
// ==================================================

console.log('\n7. Error Handling Patterns:');

// Pattern 1: Try/catch per operation
async function pattern1() {
  let user, posts;

  try {
    user = await fetchUser(1);
  } catch (error) {
    console.log('Failed to fetch user:', error);
    return;
  }

  try {
    posts = await fetchPosts(user.id);
  } catch (error) {
    console.log('Failed to fetch posts:', error);
    // Continue with user data only
  }

  return { user, posts };
}

// Pattern 2: Single try/catch
async function pattern2() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.log('Operation failed:', error);
    throw error;
  }
}

// Pattern 3: With finally
async function pattern3() {
  let isLoading = true;

  try {
    const user = await fetchUser(1);
    return user;
  } catch (error) {
    console.log('Error:', error);
    return null;
  } finally {
    isLoading = false;
    console.log('  Cleanup completed');
  }
}

console.log('  Error handling patterns defined (see code)');

// ==================================================
// 8. Async Iteration
// ==================================================

console.log('\n8. Async Iteration:');

async function processUsers(userIds) {
  console.log('\n  Processing users sequentially:');

  for (const id of userIds) {
    const user = await fetchUser(id);
    console.log(`  → Processed: ${user.name}`);
  }

  console.log('   All users processed');
}

// Run after 10 seconds
setTimeout(() => {
  processUsers([1, 2, 3]);
}, 10000);

// ==================================================
// 9. Parallel Processing with map
// ==================================================

console.log('\n9. Parallel Processing with map:');

async function processUsersParallel(userIds) {
  console.log('\n  Processing users in parallel:');

  const users = await Promise.all(
    userIds.map(id => fetchUser(id))
  );

  console.log('   Processed:', users.map(u => u.name));
  return users;
}

// Run after 12 seconds
setTimeout(() => {
  processUsersParallel([1, 2, 3]);
}, 12000);

// ==================================================
// 10. Practical React Example
// ==================================================

console.log('\n10. Practical React Example (useEffect):');

console.log(`
  // In React component
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
`);

// ==================================================
// 11. Timeout Pattern
// ==================================================

console.log('\n11. Timeout Pattern:');

async function fetchWithTimeout(promise, timeoutMs) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeoutMs);
  });

  return Promise.race([promise, timeout]);
}

async function testTimeout() {
  console.log('\n  Testing timeout:');

  try {
    // This will succeed
    const result = await fetchWithTimeout(
      delay(500, 'Success'),
      1000
    );
    console.log('   Result:', result);
  } catch (error) {
    console.log('   Error:', error.message);
  }

  try {
    // This will timeout
    const result = await fetchWithTimeout(
      delay(2000, 'Too slow'),
      1000
    );
    console.log('   Result:', result);
  } catch (error) {
    console.log('   Timeout:', error.message);
  }
}

// Run after 13 seconds
setTimeout(() => {
  testTimeout();
}, 13000);

// ==================================================
// 12. Retry Pattern
// ==================================================

console.log('\n12. Retry Pattern:');

async function fetchWithRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`  Attempt ${i + 1}/${retries}...`);
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(1000); // Wait before retry
    }
  }
}

// ==================================================
// 13. Async Array Methods
// ==================================================

console.log('\n13. Async Array Methods:');

// Sequential map
async function asyncMap(array, asyncFn) {
  const results = [];
  for (const item of array) {
    results.push(await asyncFn(item));
  }
  return results;
}

// Parallel map
async function asyncMapParallel(array, asyncFn) {
  return Promise.all(array.map(asyncFn));
}

// Async filter
async function asyncFilter(array, asyncFn) {
  const results = await Promise.all(array.map(asyncFn));
  return array.filter((_, index) => results[index]);
}

console.log('  Async array utilities defined');

// ==================================================
// 14. Top-level await (ES2022)
// ==================================================

console.log('\n14. Top-level await (ES2022):');

console.log(`
  // In modern JavaScript modules
  const data = await fetch('/api/data').then(r => r.json());
  console.log(data);

  // No need for IIFE wrapper!
`);

// ==================================================
// 15. Common Mistakes
// ==================================================

console.log('\n15. Common Mistakes to Avoid:');

console.log(`
   Forgetting await:
  async function bad() {
    const data = fetchUser(1); // Returns Promise, not user!
    console.log(data.name); // Error!
  }

   Use await:
  async function good() {
    const data = await fetchUser(1);
    console.log(data.name); // Works!
  }

   Await in loop (slow):
  for (const id of ids) {
    await fetchUser(id); // Sequential!
  }

   Use Promise.all:
  await Promise.all(ids.map(id => fetchUser(id)));

   Not handling errors:
  async function bad() {
    await riskyOperation(); // Unhandled error!
  }

   Use try/catch:
  async function good() {
    try {
      await riskyOperation();
    } catch (error) {
      console.error(error);
    }
  }
`);

// ==================================================
// 16. Best Practices
// ==================================================

console.log('\n16. Best Practices:');
console.log('   Always use try/catch for error handling');
console.log('   Use Promise.all for parallel operations');
console.log('   Return early on errors');
console.log('   Use finally for cleanup');
console.log('   Add timeouts for network requests');
console.log('    Don\'t forget await keyword');
console.log('    Avoid await in loops (use Promise.all)');
console.log('    Handle all promise rejections');

console.log('\n=== End of Example 7 ===\n');
console.log(' Async/await is the PREFERRED way to handle promises in modern JavaScript!');
