# Exercise 6: Async/Await - Solutions

## Overview

This exercise covers async/await in JavaScript ES6+, including:
- Promise handling
- Error handling with try/catch
- Parallel vs sequential execution
- Modern async patterns

## Solutions

### Task 6.1: Simulated API Calls

```javascript
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
```

### Task 6.2: Parallel Requests

```javascript
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
```

## Key Learning Points

1. **`async`** Mark function as asynchronous
2. **`await`** Wait for Promise to resolve
3. **Error Handling** Use try/catch with async/await
4. **Parallel Execution** Use `Promise.all()` for concurrent requests
5. **Sequential vs Parallel** Understand when to use each approach

## Running the Solution

```bash
cd exercise6-async-await
npm install
npm start
```

## Expected Output

```
=== Exercise 6.1 ===
Fetching user...
(after 2 seconds)
Result: {
  user: { id: 1, name: 'User1', email: 'user1@example.com' },
  posts: [
    { id: 1, title: 'Post 1', userId: 1 },
    { id: 2, title: 'Post 2', userId: 1 }
  ]
}
=== Exercise 6.2 ===
Fetching all users...
(after 1 second)
All users: [
  { id: 1, name: 'User1', email: 'user1@example.com' },
  { id: 2, name: 'User2', email: 'user2@example.com' },
  { id: 3, name: 'User3', email: 'user3@example.com' }
]
```
