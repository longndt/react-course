# Exercise 1: Arrow Functions - Solutions

## Overview

This exercise covers the fundamentals of arrow functions in JavaScript ES6+, including:
- Basic arrow function syntax
- Implicit vs explicit returns
- Arrow functions with array methods
- `this` binding differences

## Solutions

### Task 1.1: Basic Arrow Functions

```javascript
// Traditional function to arrow function
const greet = (name) => `Hello, ${name}!`;

// Arrow function with implicit return
const add = (a, b) => a + b;

// Arrow function (single parameter doesn't need parentheses)
const square = x => x * x;
```

### Task 1.2: Arrow Functions with Arrays

```javascript
const numbers = [1, 2, 3, 4, 5];

// Map with arrow function
const doubled = numbers.map(n => n * 2);

// Filter with arrow function
const evens = numbers.filter(n => n % 2 === 0);

// Reduce with arrow function
const sum = numbers.reduce((total, n) => total + n, 0);
```

## Key Learning Points

1. **Syntax**: Arrow functions use `=>` instead of `function` keyword
2. **Implicit Return**: Single expressions can omit `return` and `{}`
3. **Parameters**: Single parameters don't need parentheses
4. **Array Methods**: Arrow functions work great with `map`, `filter`, `reduce`
5. **`this` Binding**: Arrow functions don't have their own `this` context

## Running the Solution

```bash
cd exercise1-arrow-functions
npm install
npm start
```

## Expected Output

```
=== Exercise 1.1 ===
Hello, Alice!
8
16
=== Exercise 1.2 ===
Doubled: [2, 4, 6, 8, 10]
Evens: [2, 4]
Sum: 15
```
