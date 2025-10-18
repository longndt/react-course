// ============================================
// Exercise 6: Async/Await - Tests
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

    console.log('=== Running Exercise 6 Tests ===\n');

    // Test 6.1: Simulated API Calls
    console.log('--- Simulated API Calls ---');

    function fetchUser(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ id, name: `User${id}`, email: `user${id}@example.com` });
            }, 100);
        });
    }

    function fetchPosts(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, title: 'Post 1', userId },
                    { id: 2, title: 'Post 2', userId }
                ]);
            }, 100);
        });
    }

    async function getUserWithPosts(userId) {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(userId);
        return { user, posts };
    }

    async function safeGetUser(userId) {
        try {
            const user = await fetchUser(userId);
            return user;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    // Test async functions
    getUserWithPosts(1).then(result => {
        test('getUserWithPosts returns correct structure',
            result && result.user && result.posts && result.user.id === 1);
        test('getUserWithPosts includes posts', result.posts.length === 2);
    });

    safeGetUser(1).then(user => {
        test('safeGetUser returns user', user && user.id === 1);
    });

    // Test 6.2: Parallel Requests
    console.log('\n--- Parallel Requests ---');

    async function getAllUsers() {
        const userPromises = [
            fetchUser(1),
            fetchUser(2),
            fetchUser(3)
        ];
        const users = await Promise.all(userPromises);
        return users;
    }

    getAllUsers().then(users => {
        test('getAllUsers returns array of users', Array.isArray(users) && users.length === 3);
        test('all users have correct structure', users.every(u => u.id && u.name && u.email));
    });

    // Test additional examples
    console.log('\n--- Additional Examples ---');

    // Sequential vs Parallel timing
    async function sequentialTest() {
        const start = Date.now();
        await fetchUser(1);
        await fetchUser(2);
        const end = Date.now();
        return end - start;
    }

    async function parallelTest() {
        const start = Date.now();
        await Promise.all([fetchUser(1), fetchUser(2)]);
        const end = Date.now();
        return end - start;
    }

    Promise.all([sequentialTest(), parallelTest()]).then(([seqTime, parTime]) => {
        test('parallel is faster than sequential', parTime < seqTime);
    });

    // Error handling test
    function fetchUserWithError(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id === 2) {
                    reject(new Error('User not found'));
                } else {
                    resolve({ id, name: `User${id}` });
                }
            }, 50);
        });
    }

    async function testErrorHandling() {
        try {
            await fetchUserWithError(2);
            return false;
        } catch (error) {
            return error.message === 'User not found';
        }
    }

    testErrorHandling().then(result => {
        test('error handling works correctly', result);
    });

    // Test edge cases
    console.log('\n--- Edge Cases ---');

    // Empty Promise.all
    Promise.all([]).then(result => {
        test('Promise.all with empty array', Array.isArray(result) && result.length === 0);
    });

    // Promise.allSettled
    Promise.allSettled([
        fetchUser(1),
        fetchUserWithError(2),
        fetchUser(3)
    ]).then(results => {
        const fulfilled = results.filter(r => r.status === 'fulfilled');
        const rejected = results.filter(r => r.status === 'rejected');
        test('Promise.allSettled handles mixed results',
            fulfilled.length === 2 && rejected.length === 1);
    });

    // Summary
    setTimeout(() => {
        console.log('\n=== Test Summary ===');
        console.log(`Passed: ${passed}`);
        console.log(`Failed: ${failed}`);
        console.log(`Total: ${passed + failed}`);

        if (failed === 0) {
            console.log('🎉 All tests passed!');
        } else {
            console.log('⚠️  Some tests failed. Check your implementation.');
        }
    }, 1000);
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
