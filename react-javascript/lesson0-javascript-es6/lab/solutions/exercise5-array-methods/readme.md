# Exercise 5: Array Methods - Solutions

## Overview

This exercise covers essential array methods in JavaScript ES6+, including:
- `map`, `filter`, `reduce`, `find`
- `some`, `every`
- Chaining array methods
- Performance considerations

## Solutions

### Task 5.1: Working with User Data

```javascript
const users = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
  { id: 4, name: 'David', age: 28, active: true },
  { id: 5, name: 'Eve', age: 32, active: false }
];

// Get array of just the names
const names = users.map(u => u.name);

// Get only active users
const activeUsers = users.filter(u => u.active);

// Find user with id 3
const user3 = users.find(u => u.id === 3);

// Check if any user is over 30
const hasOldUsers = users.some(u => u.age > 30);

// Check if all users are active
const allActive = users.every(u => u.active);

// Calculate average age of all users
const averageAge = users.reduce((sum, u) => sum + u.age, 0) / users.length;
```

### Task 5.2: Shopping Cart

```javascript
const cart = [
  { name: 'Book', price: 12.99, quantity: 2 },
  { name: 'Pen', price: 1.99, quantity: 5 },
  { name: 'Notebook', price: 3.99, quantity: 3 }
];

// Calculate total price (price * quantity for each item)
const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// Get items with quantity > 2
const bulkItems = cart.filter(item => item.quantity > 2);

// Create array of item summaries: "Book x2: $25.98"
const summaries = cart.map(item =>
  `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`
);
```

## Key Learning Points

1. **`map`**: Transform each element, returns new array
2. **`filter`**: Keep elements that match condition
3. **`reduce`**: Accumulate values into single result
4. **`find`**: Find first element that matches condition
5. **`some`**: Check if any element matches condition
6. **`every`**: Check if all elements match condition

## Running the Solution

```bash
cd exercise5-array-methods
npm install
npm start
```

## Expected Output

```
=== Exercise 5.1 ===
Names: ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
Active users: ['Alice', 'Charlie', 'David']
User 3: Charlie
Has users over 30? true
All active? false
Average age: 30
=== Exercise 5.2 ===
Total: $47.92
Bulk items: ['Pen', 'Notebook']
Summaries: ['Book x2: $25.98', 'Pen x5: $9.95', 'Notebook x3: $11.97']
```
