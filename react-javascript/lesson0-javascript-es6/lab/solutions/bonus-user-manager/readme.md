# Bonus Challenge: User Manager - Solutions

## Overview

This exercise combines all JavaScript ES6+ concepts learned in the previous exercises:
- Arrow functions
- Destructuring
- Template literals
- Spread & rest operators
- Array methods
- Async/await
- Optional chaining & nullish coalescing

## Solutions

### UserManager Class

```javascript
class UserManager {
  constructor() {
    this.users = [];
  }

  // Add user (use spread to copy)
  addUser(user) {
    this.users = [...this.users, { ...user }];
  }

  // Get user by id (use find)
  getUser(id) {
    return this.users.find(u => u.id === id);
  }

  // Update user (use spread, destructuring)
  updateUser(id, updates) {
    this.users = this.users.map(u =>
      u.id === id ? { ...u, ...updates } : u
    );
  }

  // Get active users (use filter)
  getActiveUsers() {
    return this.users.filter(u => u.active);
  }

  // Get user summary (use map, template literal)
  getUserSummaries() {
    return this.users.map(u =>
      `${u.name} (${u.active ? 'Active' : 'Inactive'})`
    );
  }
}
```

## Key Learning Points

1. **Class Syntax**: Modern JavaScript class syntax
2. **Method Implementation**: Using ES6+ features in methods
3. **Data Manipulation**: Immutable operations with spread operator
4. **Integration**: Combining all learned concepts
5. **Best Practices**: Clean, maintainable code

## Running the Solution

```bash
cd bonus-user-manager
npm install
npm start
```

## Expected Output

```
=== Bonus Challenge: UserManager ===
All users: [
  { id: 1, name: 'Alice Smith', active: true },
  { id: 2, name: 'Bob', active: false }
]
User 1: { id: 1, name: 'Alice Smith', active: true }
Active users: [{ id: 1, name: 'Alice Smith', active: true }]
Summaries: ['Alice Smith (Active)', 'Bob (Inactive)']
```
