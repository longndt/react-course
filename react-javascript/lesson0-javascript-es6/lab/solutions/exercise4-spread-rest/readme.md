# Exercise 4: Spread & Rest Operators - Solutions

## Overview

This exercise covers spread and rest operators in JavaScript ES6+, including:
- Array spreading
- Object spreading
- Rest parameters
- Function arguments handling

## Solutions

### Task 4.1: Spread Operator

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays using spread
const combined = [...arr1, ...arr2];

// Create array with 0 at start, arr1, then 7 at end
const extended = [0, ...arr1, 7];

const user = { name: 'John', age: 30 };
const updates = { age: 31, city: 'NYC' };

// Merge objects (updates should override user)
const updatedUser = { ...user, ...updates };
```

### Task 4.2: Rest Parameters

```javascript
// Create function that accepts any number of arguments
// and returns their average
function calculateAverage(...numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((total, n) => total + n, 0);
  return sum / numbers.length;
}

// Create function with first parameter as greeting
// and rest as names, return greeting with all names
function greetAll(greeting, ...names) {
  if (names.length === 0) return greeting;
  if (names.length === 1) return `${greeting}, ${names[0]}!`;
  const lastPerson = names.pop();
  return `${greeting}, ${names.join(', ')}, and ${lastPerson}!`;
}
```

## Key Learning Points

1. **Spread Operator**: Use `...` to expand arrays/objects
2. **Array Spreading**: Combine arrays, add elements
3. **Object Spreading**: Merge objects, override properties
4. **Rest Parameters**: Collect remaining arguments into array
5. **Function Arguments**: Handle variable number of parameters

## Running the Solution

```bash
cd exercise4-spread-rest
npm install
npm start
```

## Expected Output

```
=== Exercise 4.1 ===
Combined: [1, 2, 3, 4, 5, 6]
Extended: [0, 1, 2, 3, 7]
Updated user: { name: 'John', age: 31, city: 'NYC' }
=== Exercise 4.2 ===
Average: 3
Hello, Alice, Bob, and Charlie!
```
