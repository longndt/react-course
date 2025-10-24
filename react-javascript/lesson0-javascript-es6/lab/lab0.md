# Lab 0: JavaScript ES6+ Practical Exercises

## Overview

**Duration** 60-90 minutes
**Difficulty** Beginner to Intermediate
**Goal** Practice essential JavaScript ES6+ features used in React development

## Prerequisites

Before starting this lab, make sure you have:

- **Node.js v18+**installed ([Download here](https://nodejs.org/))
- **A modern web browser**(Chrome, Firefox, Safari, Edge)
- **A code editor**(VS Code recommended)
- **Basic understanding of JavaScript fundamentals**

Check your setup:
```bash
node --version  # Should be 18+ recommended
npm --version   # Should be 9+
```

---

## Setup

### Option 1: Browser-based Setup (Easiest)

1. Create a new folder for your exercises:
```bash
mkdir js-es6-practice
cd js-es6-practice
```

2. Create `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JS ES6+ Practice</title>
</head>
<body>
  <h1>JavaScript ES6+ Exercises</h1>
  <p>Open browser console (F12) to see results</p>
  <script src="exercises.js"></script>
</body>
</html>
```

3. Create `exercises.js` and complete the exercises below

### Option 2: Node.js Setup (Recommended)

1. Create project folder and initialize:
```bash
mkdir js-es6-practice
cd js-es6-practice
npm init -y
npm install -D nodemon
```

2. Create `exercises.js` and run with:
```bash
# Run once
node exercises.js

# Run with auto-reload
npx nodemon exercises.js
```

📖 **For detailed execution instructions, see the [JavaScript Execution Guide](#-javascript-execution-guide) below.**

---

## Exercise 1: Arrow Functions (10 min)

### Task 1.1: Basic Arrow Functions

Convert these traditional functions to arrow functions:

```javascript
// TODO: Convert to arrow function
function greet(name) {
  return `Hello, ${name}!`;
}

// TODO: Convert to arrow function with implicit return
function add(a, b) {
  return a + b;
}

// TODO: Convert to arrow function
function square(x) {
  return x * x;
}

// Test your functions
console.log('=== Exercise 1.1 ===');
console.log(greet('Alice')); // Should print: Hello, Alice!
console.log(add(5, 3)); // Should print: 8
console.log(square(4)); // Should print: 16
```

### Task 1.2: Arrow Functions with Arrays

```javascript
// TODO: Use arrow function with map
const numbers = [1, 2, 3, 4, 5];
const doubled = // your code here

// TODO: Use arrow function with filter
const evens = // your code here

// TODO: Use arrow function with reduce
const sum = // your code here

console.log('=== Exercise 1.2 ===');
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]
console.log('Evens:', evens); // [2, 4]
console.log('Sum:', sum); // 15
```

**Expected Output:**
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

---

## Exercise 2: Destructuring (10 min)

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

// TODO: Extract firstName and lastName using destructuring
const { /* your code */ } = user;

// TODO: Extract city from nested address
const { /* your code */ } = user;

// TODO: Rename email to userEmail
const { /* your code */ } = user;

// TODO: Add default value for phone (should be 'N/A')
const { /* your code */ } = user;

console.log('=== Exercise 2.1 ===');
console.log('Name:', firstName, lastName);
console.log('City:', city);
console.log('Email:', userEmail);
console.log('Phone:', phone);
```

### Task 2.2: Array Destructuring

```javascript
const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

// TODO: Extract first and second colors
const [/* your code */] = colors;

// TODO: Skip first two, get third
const [/* your code */] = colors;

// TODO: Get first color and rest in separate array
const [/* your code */] = colors;

console.log('=== Exercise 2.2 ===');
console.log('First two:', first, second);
console.log('Third:', third);
console.log('Primary:', primary);
console.log('Rest:', rest);
```

**Expected Output:**
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

---

## Exercise 3: Template Literals (10 min)

### Task 3.1: String Interpolation

```javascript
const product = {
  name: 'Laptop',
  brand: 'TechBrand',
  price: 999.99,
  discount: 0.1
};

// TODO: Create product description using template literal
const description = /* your code */;
// Should include: name, brand, and original price

// TODO: Calculate and display final price
const finalPrice = /* your code */;
const priceMessage = /* your code */;
// Format: "Final price: $899.99 (10% off)"

console.log('=== Exercise 3.1 ===');
console.log(description);
console.log(priceMessage);
```

### Task 3.2: Multi-line Strings

```javascript
const userData = {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'Developer'
};

// TODO: Create multi-line email template
const emailTemplate = /* your code */;
/*
Should look like:
Dear Alice,

Welcome to our platform!

Your account details:
- Email: alice@example.com
- Role: Developer

Best regards,
The Team
*/

console.log('=== Exercise 3.2 ===');
console.log(emailTemplate);
```

**Expected Output:**
```
=== Exercise 3.1 ===
TechBrand Laptop - $999.99
Final price: $899.99 (10% off)
=== Exercise 3.2 ===
Dear Alice,

Welcome to our platform!

Your account details:
- Email: alice@example.com
- Role: Developer

Best regards,
The Team
```

---

## Exercise 4: Spread & Rest Operators (15 min)

### Task 4.1: Spread Operator

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// TODO: Combine arrays using spread
const combined = /* your code */;

// TODO: Create array with 0 at start, arr1, then 7 at end
const extended = /* your code */;

const user = { name: 'John', age: 30 };
const updates = { age: 31, city: 'NYC' };

// TODO: Merge objects (updates should override user)
const updatedUser = /* your code */;

console.log('=== Exercise 4.1 ===');
console.log('Combined:', combined);
console.log('Extended:', extended);
console.log('Updated user:', updatedUser);
```

### Task 4.2: Rest Parameters

```javascript
// TODO: Create function that accepts any number of arguments
// and returns their average
function calculateAverage(/* your code */) {
  /* your code */
}

// TODO: Create function with first parameter as greeting
// and rest as names, return greeting with all names
function greetAll(/* your code */) {
  /* your code */
}

console.log('=== Exercise 4.2 ===');
console.log('Average:', calculateAverage(1, 2, 3, 4, 5)); // 3
console.log(greetAll('Hello', 'Alice', 'Bob', 'Charlie'));
// "Hello, Alice, Bob, and Charlie!"
```

**Expected Output:**
```
=== Exercise 4.1 ===
Combined: [1, 2, 3, 4, 5, 6]
Extended: [0, 1, 2, 3, 7]
Updated user: { name: 'John', age: 31, city: 'NYC' }
=== Exercise 4.2 ===
Average: 3
Hello, Alice, Bob, and Charlie!
```

---

## Exercise 5: Array Methods (20 min)

### Task 5.1: Working with User Data

```javascript
const users = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
  { id: 4, name: 'David', age: 28, active: true },
  { id: 5, name: 'Eve', age: 32, active: false }
];

// TODO: Get array of just the names
const names = /* your code */;

// TODO: Get only active users
const activeUsers = /* your code */;

// TODO: Find user with id 3
const user3 = /* your code */;

// TODO: Check if any user is over 30
const hasOldUsers = /* your code */;

// TODO: Check if all users are active
const allActive = /* your code */;

// TODO: Calculate average age of all users
const averageAge = /* your code */;

console.log('=== Exercise 5.1 ===');
console.log('Names:', names);
console.log('Active users:', activeUsers.map(u => u.name));
console.log('User 3:', user3.name);
console.log('Has users over 30?', hasOldUsers);
console.log('All active?', allActive);
console.log('Average age:', averageAge);
```

### Task 5.2: Shopping Cart

```javascript
const cart = [
  { name: 'Book', price: 12.99, quantity: 2 },
  { name: 'Pen', price: 1.99, quantity: 5 },
  { name: 'Notebook', price: 3.99, quantity: 3 }
];

// TODO: Calculate total price (price * quantity for each item)
const total = /* your code */;

// TODO: Get items with quantity > 2
const bulkItems = /* your code */;

// TODO: Create array of item summaries: "Book x2: $25.98"
const summaries = /* your code */;

console.log('=== Exercise 5.2 ===');
console.log('Total:', `$${total.toFixed(2)}`);
console.log('Bulk items:', bulkItems.map(i => i.name));
console.log('Summaries:', summaries);
```

**Expected Output:**
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

---

## Exercise 6: Async/Await (15 min)

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

// TODO: Create async function to fetch user and their posts
async function getUserWithPosts(userId) {
  /* your code */
}

// TODO: Create async function with error handling
async function safeGetUser(userId) {
  try {
    /* your code */
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Test
console.log('=== Exercise 6.1 ===');
console.log('Fetching user...');
getUserWithPosts(1).then(result => {
  console.log('Result:', result);
});
```

### Task 6.2: Parallel Requests

```javascript
// TODO: Fetch multiple users in parallel using Promise.all
async function getAllUsers() {
  /* your code */
}

console.log('=== Exercise 6.2 ===');
console.log('Fetching all users...');
getAllUsers().then(users => {
  console.log('All users:', users);
});
```

**Expected Output:**
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

---

## Exercise 7: Optional Chaining & Nullish Coalescing (10 min)

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

// TODO: Safely access nested properties
const bio = /* your code */; // Should be 'Developer'
const age = /* your code */; // Should be undefined (use optional chaining)
const city = /* your code */; // Should be 'Unknown' (use ?? operator)

console.log('=== Exercise 7.1 ===');
console.log('Bio:', bio);
console.log('Age:', age);
console.log('City:', city);
```

### Task 7.2: Default Values

```javascript
function displayUser(user) {
  // TODO: Use nullish coalescing for defaults
  const name = /* user.name or 'Guest' */;
  const role = /* user.role or 'User' */;
  const status = /* user.status or 'Offline' */;

  return `${name} (${role}) - ${status}`;
}

console.log('=== Exercise 7.2 ===');
console.log(displayUser({ name: 'Alice', role: 'Admin' }));
console.log(displayUser({ name: 'Bob' }));
console.log(displayUser({}));
```

**Expected Output:**
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

---

## Bonus Challenge: Combine All Concepts (15 min)

Create a mini user management system:

```javascript
// TODO: Implement UserManager class
class UserManager {
  constructor() {
    this.users = [];
  }

  // Add user (use spread to copy)
  addUser(user) {
    /* your code */
  }

  // Get user by id (use find)
  getUser(id) {
    /* your code */
  }

  // Update user (use spread, destructuring)
  updateUser(id, updates) {
    /* your code */
  }

  // Get active users (use filter)
  getActiveUsers() {
    /* your code */
  }

  // Get user summary (use map, template literal)
  getUserSummaries() {
    /* your code */
  }
}

// Test
const manager = new UserManager();
manager.addUser({ id: 1, name: 'Alice', active: true });
manager.addUser({ id: 2, name: 'Bob', active: false });
manager.updateUser(1, { name: 'Alice Smith' });

console.log('=== Bonus Challenge ===');
console.log('All users:', manager.users);
console.log('User 1:', manager.getUser(1));
console.log('Active users:', manager.getActiveUsers());
console.log('Summaries:', manager.getUserSummaries());
```

---

## Submission Checklist

✅ **Completed all 7 exercises**
✅ **All console outputs match expected results**
✅ **Code uses ES6+ features (no var, no traditional functions where arrow functions are better)**
✅ **Bonus challenge completed**(optional)
✅ **Code is clean and well-commented**

---

## Solutions

Solutions are provided in the `example/` folder. Try to complete exercises first before checking solutions!

---

## 🚀 JavaScript Execution Guide

This guide demonstrates different ways to run JavaScript files for development and learning.

### Method 1: Browser Console (Easiest for Learning)

#### Step 1: Open Browser Developer Tools
```bash
# Open your HTML file in browser
# Press F12 or right-click → Inspect → Console tab
```

#### Step 2: Run JavaScript Code
```javascript
// Copy and paste your JavaScript code directly into console
// Or use the exercises.js file loaded in your HTML
```

**Pros** Immediate feedback, no setup required
**Cons** Limited for complex projects, no file system access

### Method 2: Node.js (Recommended for Development)

#### Step 1: Install Node.js
```bash
# Download from https://nodejs.org/
# Or use package manager:
# Windows: choco install nodejs
# macOS: brew install node
# Linux: sudo apt install nodejs npm
```

#### Step 2: Run JavaScript Files
```bash
# Navigate to your project folder
cd js-es6-practice

# Run JavaScript file directly
node exercises.js

# Run with specific options
node --experimental-modules exercises.js
```

#### Step 3: Watch Mode (Auto-reload)
```bash
# Install nodemon for auto-reload
npm install -g nodemon

# Run with watch mode
nodemon exercises.js

# Or use npx (no global install)
npx nodemon exercises.js
```

### Method 3: Modern Development Setup

#### Step 1: Initialize Project
```bash
# Create project folder
mkdir my-js-project
cd my-js-project

# Initialize npm project
npm init -y

# Install development dependencies
npm install -D nodemon
```

#### Step 2: Configure package.json
```json
{
  "name": "my-js-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node exercises.js",
    "dev": "nodemon exercises.js",
    "watch": "nodemon --watch . --ext js exercises.js"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

#### Step 3: Development Workflow
```bash
# For development (auto-reload on changes)
npm run dev

# For production
npm start

# Watch specific files
npm run watch
```

### Method 4: Online Development Environments

#### Option A: CodePen
- Visit [codepen.io](https://codepen.io)
- Create new pen
- Paste your HTML, CSS, and JavaScript
- See results instantly

#### Option B: JSFiddle
- Visit [jsfiddle.net](https://jsfiddle.net)
- Use the JavaScript panel
- Click "Run" to execute

#### Option C: Replit
- Visit [replit.com](https://replit.com)
- Create new Node.js repl
- Write and run JavaScript files

### Advanced Usage

#### ES Modules Support
```bash
# Enable ES modules in Node.js
node --experimental-modules exercises.js

# Or use .mjs extension
mv exercises.js exercises.mjs
node exercises.mjs
```

#### Debugging
```bash
# Run with debugger
node --inspect exercises.js

# Then open Chrome DevTools at chrome://inspect
```

#### Performance Profiling
```bash
# Profile performance
node --prof exercises.js

# Generate readable profile
node --prof-process isolate-*.log > profile.txt
```

### Troubleshooting

#### Common Issues and Solutions

**1. Module Import Errors**
```bash
# Error: Cannot use import statement outside a module
# Solution: Add "type": "module" to package.json or use .mjs extension
```

**2. Permission Errors**
```bash
# Error: Permission denied
# Solution: Use npx instead of global installation
npx nodemon exercises.js
```

**3. File Not Found**
```bash
# Error: Cannot find module
# Solution: Check file path and working directory
pwd  # Check current directory
ls   # List files
```

**4. Syntax Errors**
```bash
# Error: Unexpected token
# Solution: Check JavaScript syntax, use online validator
# Visit: https://jshint.com/ or https://eslint.org/demo/
```

### Performance Comparison

| Method | Speed | Setup | Best For |
|--------|-------|-------|----------|
| **Browser Console**| Instant | None | Learning, quick tests |
| **Node.js**| Fast | Minimal | Development, scripts |
| **Nodemon**| Fast | Easy | Development with auto-reload |
| **Online IDEs**| Medium | None | Sharing, demos |

### Best Practices

1. **Use Node.js for development**- Better tooling and debugging
2. **Use nodemon for active development**- Auto-reload saves time
3. **Use browser console for quick tests**- Immediate feedback
4. **Use online IDEs for sharing**- Easy to share with others
5. **Enable ES modules**- Modern JavaScript features
6. **Use proper error handling**- Better debugging experience

### Quick Reference

```bash
# Run JavaScript file
node filename.js

# Run with auto-reload
nodemon filename.js

# Run with ES modules
node --experimental-modules filename.js

# Debug mode
node --inspect filename.js

# Run with npx (no global install)
npx nodemon filename.js
```

### Example Usage

```bash
# Try the exercises
cd js-es6-practice
node exercises.js

# Or with auto-reload
npx nodemon exercises.js
```

---

**[⬅ Back to Theory](../theory/theory0.md)**| **[➡ Next: Take Quiz](../quiz/)**
