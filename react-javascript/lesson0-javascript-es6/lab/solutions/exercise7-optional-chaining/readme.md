# Exercise 7: Optional Chaining & Nullish Coalescing - Solutions

## Overview

This exercise covers optional chaining and nullish coalescing in JavaScript ES6+, including:
- Safe property access
- Default value assignment
- Null/undefined handling
- Modern JavaScript safety features

## Solutions

### Task 7.1: Safe Property Access

```javascript
const data = {
  user: {
    name: 'John',
    profile: {
      bio: 'Developer'
    }
  }
};

// Safely access nested properties
const bio = data?.user?.profile?.bio; // Should be 'Developer'
const age = data?.user?.age; // Should be undefined (use optional chaining)
const city = data?.user?.address?.city ?? 'Unknown'; // Should be 'Unknown' (use ?? operator)
```

### Task 7.2: Default Values

```javascript
function displayUser(user) {
  // Use nullish coalescing for defaults
  const name = user?.name ?? 'Guest';
  const role = user?.role ?? 'User';
  const status = user?.status ?? 'Offline';

  return `${name} (${role}) - ${status}`;
}
```

## Key Learning Points

1. **Optional Chaining (`?.`)** Safely access nested properties
2. **Nullish Coalescing (`??`)** Provide default values for null/undefined
3. **Safe Method Calls** Use `?.()` for method calls
4. **Array Access** Use `?.[]` for array element access
5. **Combined Usage** Chain both operators for robust code

## Running the Solution

```bash
cd exercise7-optional-chaining
npm install
npm start
```

## Expected Output

```
=== Exercise 7.1 ===
Bio: Developer
Age: undefined
City: Unknown
=== Exercise 7.2 ===
Alice (Admin) - Offline
Bob (User) - Offline
Guest (User) - Offline
```
