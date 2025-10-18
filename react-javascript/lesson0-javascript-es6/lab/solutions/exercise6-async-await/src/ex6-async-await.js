// ============================================
// Exercise 6: Async/Await Solutions
// ============================================

console.log('=== Exercise 6.1: Simulated API Calls ===');

// Simulated API functions (already provided)
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User${id}`, email: `user${id}@example.com` });
        }, 1000);
    });
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Post 1', userId },
                { id: 2, title: 'Post 2', userId }
            ]);
        }, 1000);
    });
}

// Create async function to fetch user and their posts
async function getUserWithPosts(userId) {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(userId);
    return { user, posts };
}

// Create async function with error handling
async function safeGetUser(userId) {
    try {
        const user = await fetchUser(userId);
        return user;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

console.log('Fetching user...');
getUserWithPosts(1).then(result => {
    console.log('Result:', result);
});

console.log('\n=== Exercise 6.2: Parallel Requests ===');

// Fetch multiple users in parallel using Promise.all
async function getAllUsers() {
    const userPromises = [
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ];
    const users = await Promise.all(userPromises);
    return users;
}

console.log('Fetching all users...');
getAllUsers().then(users => {
    console.log('All users:', users);
});

// ============================================
// Additional Example and Learning Points
// ============================================

console.log('\n=== Additional Example ===');

// Sequential vs Parallel execution
async function sequentialRequests() {
    console.log('Starting sequential requests...');
    const startTime = Date.now();

    const user1 = await fetchUser(1);
    const user2 = await fetchUser(2);
    const user3 = await fetchUser(3);

    const endTime = Date.now();
    console.log('Sequential completed in:', endTime - startTime, 'ms');

    return [user1, user2, user3];
}

async function parallelRequests() {
    console.log('Starting parallel requests...');
    const startTime = Date.now();

    const [user1, user2, user3] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);

    const endTime = Date.now();
    console.log('Parallel completed in:', endTime - startTime, 'ms');

    return [user1, user2, user3];
}

// Run both approaches
setTimeout(() => {
    sequentialRequests();
    parallelRequests();
}, 3000);

// ============================================
// Error Handling Patterns
// ============================================

console.log('\n=== Error Handling Patterns ===');

// Function that sometimes fails
function fetchUserWithError(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 2) {
                reject(new Error(`User ${id} not found`));
            } else {
                resolve({ id, name: `User${id}`, email: `user${id}@example.com` });
            }
        }, 500);
    });
}

// Error handling with try/catch
async function getUserWithErrorHandling(id) {
    try {
        const user = await fetchUserWithError(id);
        console.log('User found:', user);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }
}

// Error handling with Promise.allSettled
async function getAllUsersWithErrorHandling() {
    const userPromises = [
        fetchUserWithError(1),
        fetchUserWithError(2), // This will fail
        fetchUserWithError(3)
    ];

    const results = await Promise.allSettled(userPromises);

    const successful = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

    const failed = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason);

    console.log('Successful users:', successful);
    console.log('Failed requests:', failed);

    return successful;
}

// Test error handling
setTimeout(() => {
    getUserWithErrorHandling(1);
    getUserWithErrorHandling(2);
    getAllUsersWithErrorHandling();
}, 5000);

// ============================================
// Advanced Async Patterns
// ============================================

console.log('\n=== Advanced Async Patterns ===');

// Async generator
async function* fetchUsersInBatches(batchSize = 2) {
    let currentId = 1;

    while (currentId <= 5) {
        const batch = [];
        for (let i = 0; i < batchSize && currentId <= 5; i++) {
            batch.push(fetchUser(currentId++));
        }

        const users = await Promise.all(batch);
        yield users;
    }
}

// Use async generator
async function processUsersInBatches() {
    console.log('Processing users in batches...');

    for await (const batch of fetchUsersInBatches(2)) {
        console.log('Batch:', batch);
        // Process each batch
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

setTimeout(() => {
    processUsersInBatches();
}, 7000);

// ============================================
// Practical Example
// ============================================

console.log('\n=== Practical Example ===');

// API client with retry logic
async function fetchWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Simulate API call
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.7) { // 30% chance of failure
                        reject(new Error('Network error'));
                    } else {
                        resolve({ data: `Data from ${url}` });
                    }
                }, 1000);
            });

            console.log(`Success on attempt ${attempt}`);
            return response;
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} attempts`);
            }
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

// Test retry logic
setTimeout(() => {
    fetchWithRetry('https://api.example.com/users')
        .then(response => console.log('Final result:', response))
        .catch(error => console.error('Final error:', error.message));
}, 9000);

// ============================================
// Common Pitfalls and Best Practices
// ============================================

console.log('\n=== Best Practices ===');

// Don't forget await in loops
async function processItems(items) {
    console.log('Processing items...');

    // Sequential processing (correct)
    for (const item of items) {
        const result = await fetchUser(item);
        console.log('Processed:', result.name);
    }

    // Parallel processing (also correct, but different)
    const results = await Promise.all(items.map(item => fetchUser(item)));
    console.log('All processed:', results.map(r => r.name));
}

// Test processing
setTimeout(() => {
    processItems([1, 2, 3]);
}, 11000);

console.log('\n✅ Exercise 6 completed! Check the results above.');
