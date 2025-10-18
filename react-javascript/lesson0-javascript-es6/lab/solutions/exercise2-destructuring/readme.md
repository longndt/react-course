# Exercise 2: Destructuring - Solutions

## Overview

This exercise covers destructuring in JavaScript ES6+, including:
- Object destructuring
- Array destructuring
- Nested destructuring
- Default values and renaming

## Solutions

### Task 2.1: Object Destructuring

```javascript
const user = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john@example.com',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Extract firstName and lastName
const { firstName, lastName } = user;

// Extract nested city
const { address: { city } } = user;

// Rename email to userEmail
const { email: userEmail } = user;

// Default value for phone
const { phone = 'N/A' } = user;
```

### Task 2.2: Array Destructuring

```javascript
const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

// First two colors
const [first, second] = colors;

// Skip first two, get third
const [, , third] = colors;

// First and rest
const [primary, ...rest] = colors;
```

## Key Learning Points

1. **Object Destructuring**: Extract properties from objects using `{ }`
2. **Array Destructuring**: Extract elements from arrays using `[ ]`
3. **Nested Destructuring**: Access nested properties/arrays
4. **Renaming**: Use `oldName: newName` syntax
5. **Default Values**: Use `= defaultValue` syntax
6. **Rest Pattern**: Use `...rest` to collect remaining items

## Running the Solution

```bash
cd exercise2-destructuring
npm install
npm start
```

## Expected Output

```
=== Exercise 2.1 ===
Name: John Doe
City: New York
Email: john@example.com
Phone: N/A
=== Exercise 2.2 ===
First two: red green
Third: blue
Primary: red
Rest: ['green', 'blue', 'yellow', 'orange']
```
