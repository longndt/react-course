/**
 * Example 6: Promises
 * Understanding Asynchronous JavaScript with Promises
 */

console.log('=== Example 6: Promises ===\n');

// ==================================================
// 1. What is a Promise?
// ==================================================

console.log('1. What is a Promise?');
console.log('  A Promise represents a future value');
console.log('  States: pending → fulfilled or rejected');
console.log('  Used for async operations (API calls, timers, file I/O)\n');

// ==================================================
// 2. Creating a Promise
// ==================================================

console.log('2. Creating a Promise:');

const simplePromise = new Promise((resolve, reject) => {
  // Async operation
  const success = true;

  if (success) {
    resolve('Operation successful!');
  } else {
    reject('Operation failed!');
  }
});

console.log('  Promise created (check console for result)\n');

// ==================================================
// 3. Using Promises - then/catch
// ==================================================

console.log('3. Using Promises - then/catch:');

simplePromise
  .then(result => {
    console.log('   Success:', result);
  })
  .catch(error => {
    console.log('   Error:', error);
  });

// ==================================================
// 4. Practical Example - Simulated API Call
// ==================================================

console.log('\n4. Simulated API Call:');

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      if (id > 0) {
        resolve({
          id,
          name: `User ${id}`,
          email: `user${id}@example.com`
        });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

console.log('  Fetching user...');
fetchUser(1)
  .then(user => {
    console.log('   User loaded:', user);
  })
  .catch(error => {
    console.log('   Error:', error.message);
  });

// ==================================================
// 5. Promise Chaining
// ==================================================

console.log('\n5. Promise Chaining:');

function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: 'John' });
    }, 500);
  });
}

function getPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId },
        { id: 2, title: 'Post 2', userId }
      ]);
    }, 500);
  });
}

function getComments(postId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Great post!', postId },
        { id: 2, text: 'Thanks!', postId }
      ]);
    }, 500);
  });
}

console.log('  Chaining operations...');
getUser(1)
  .then(user => {
    console.log('  → Got user:', user.name);
    return getPosts(user.id);
  })
  .then(posts => {
    console.log('  → Got posts:', posts.length);
    return getComments(posts[0].id);
  })
  .then(comments => {
    console.log('  → Got comments:', comments.length);
    console.log('   All data loaded!');
  })
  .catch(error => {
    console.log('   Error in chain:', error);
  });

// ==================================================
// 6. Promise.all() - Parallel Execution
// ==================================================

console.log('\n6. Promise.all() - Run in parallel:');

const promise1 = fetchUser(1);
const promise2 = fetchUser(2);
const promise3 = fetchUser(3);

console.log('  Fetching multiple users in parallel...');
Promise.all([promise1, promise2, promise3])
  .then(users => {
    console.log('   All users loaded:', users.map(u => u.name));
  })
  .catch(error => {
    console.log('   One failed:', error.message);
  });

// ==================================================
// 7. Promise.race() - First to Complete
// ==================================================

console.log('\n7. Promise.race() - First to finish wins:');

const slow = new Promise(resolve => {
  setTimeout(() => resolve('Slow response'), 2000);
});

const fast = new Promise(resolve => {
  setTimeout(() => resolve('Fast response'), 500);
});

Promise.race([slow, fast])
  .then(result => {
    console.log('   Winner:', result);
  });

// ==================================================
// 8. Promise.allSettled() - Wait for All
// ==================================================

console.log('\n8. Promise.allSettled() - Wait for all (no matter what):');

const promises = [
  Promise.resolve('Success 1'),
  Promise.reject('Error 1'),
  Promise.resolve('Success 2')
];

Promise.allSettled(promises)
  .then(results => {
    console.log('  Results:');
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`    ${index}: `, result.value);
      } else {
        console.log(`    ${index}: `, result.reason);
      }
    });
  });

// ==================================================
// 9. Promise.any() - First Success
// ==================================================

console.log('\n9. Promise.any() - First successful promise:');

const promises2 = [
  Promise.reject('Error 1'),
  new Promise(resolve => setTimeout(() => resolve('Success!'), 1000)),
  Promise.reject('Error 2')
];

Promise.any(promises2)
  .then(result => {
    console.log('   First success:', result);
  })
  .catch(error => {
    console.log('   All failed:', error);
  });

// ==================================================
// 10. Error Handling
// ==================================================

console.log('\n10. Error Handling:');

function unreliableAPI() {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random > 0.5) {
        resolve('Data loaded');
      } else {
        reject(new Error('Network error'));
      }
    }, 500);
  });
}

unreliableAPI()
  .then(data => {
    console.log('  ', data);
  })
  .catch(error => {
    console.log('   Caught error:', error.message);
  })
  .finally(() => {
    console.log('  🏁 Cleanup: Hide loading spinner');
  });

// ==================================================
// 11. Practical Example - Fetch API
// ==================================================

console.log('\n11. Practical Example - Fetch API:');

// Note: This is how you'd use fetch in a browser or Node.js
console.log('  Example code (won\'t run in this environment):');
console.log(`
  fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => {
      console.log('Users:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
`);

// ==================================================
// 12. Creating Delays
// ==================================================

console.log('\n12. Creating Delays with Promises:');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('  Starting delay...');
delay(1000)
  .then(() => {
    console.log('   1 second passed!');
    return delay(1000);
  })
  .then(() => {
    console.log('   2 seconds passed!');
  });

// ==================================================
// 13. Retry Logic
// ==================================================

console.log('\n13. Retry Logic:');

function fetchWithRetry(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      console.log(`  Attempt ${4 - n}...`);

      // Simulated fetch
      const success = Math.random() > 0.7;

      if (success) {
        resolve('Data loaded');
      } else if (n === 0) {
        reject(new Error('Max retries exceeded'));
      } else {
        setTimeout(() => attempt(n - 1), 500);
      }
    };

    attempt(retries);
  });
}

fetchWithRetry('https://api.example.com/data')
  .then(data => console.log('  ', data))
  .catch(error => console.log('  ', error.message));

// ==================================================
// 14. Promise Patterns
// ==================================================

console.log('\n14. Common Promise Patterns:');

// Pattern 1: Sequential execution
function sequential() {
  return getUser(1)
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id));
}

// Pattern 2: Parallel execution
function parallel() {
  return Promise.all([
    getUser(1),
    getUser(2),
    getUser(3)
  ]);
}

// Pattern 3: Conditional chaining
function conditional(needsPosts) {
  return getUser(1)
    .then(user => {
      if (needsPosts) {
        return getPosts(user.id);
      }
      return user;
    });
}

console.log('  Pattern functions created (see code)');

// ==================================================
// 15. Converting Callbacks to Promises
// ==================================================

console.log('\n15. Converting Callbacks to Promises:');

// Old callback style
function oldStyleAsync(callback) {
  setTimeout(() => {
    callback(null, 'Done');
  }, 500);
}

// Convert to Promise
function newStyleAsync() {
  return new Promise((resolve, reject) => {
    oldStyleAsync((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

newStyleAsync()
  .then(result => console.log('   Converted:', result));

// ==================================================
// 16. Promise Anti-Patterns
// ==================================================

console.log('\n16. Promise Anti-Patterns to Avoid:');

console.log(`
   Nesting promises (promise hell):
  promise1.then(data1 => {
    promise2.then(data2 => {
      promise3.then(data3 => {
        // Too nested!
      });
    });
  });

   Chain instead:
  promise1
    .then(data1 => promise2)
    .then(data2 => promise3)
    .then(data3 => {
      // Clean!
    });

   Not returning in then:
  promise.then(data => {
    doSomething(data); // Forgot to return!
  });

   Always return:
  promise.then(data => {
    return doSomething(data);
  });
`);

// ==================================================
// 17. Best Practices
// ==================================================

console.log('\n17. Best Practices:');
console.log('   Always handle errors with .catch()');
console.log('   Return promises from .then()');
console.log('   Use Promise.all() for parallel operations');
console.log('   Use .finally() for cleanup');
console.log('   Prefer async/await over .then() chains');
console.log('    Don\'t nest promises');
console.log('    Don\'t forget error handling');
console.log('    Don\'t mix callbacks and promises');

console.log('\n=== End of Example 6 ===\n');
console.log('Note: async/await (Example 7) is the modern way to work with Promises!');
