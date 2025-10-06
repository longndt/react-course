# Lesson 0: Modern JavaScript (ES6+) Prerequisites

## Overview

This course teaches **React with JavaScript**. Before diving into React, you need a solid understanding of modern JavaScript (ES6+) features. This lesson covers essential JavaScript concepts that you'll use extensively in React development.

**Duration**: 2-3 hours
**Difficulty**: Beginner to Intermediate

---

## Learning Objectives

By the end of this lesson, you will be able to:

- ✅ Use arrow functions and understand their benefits
- ✅ Apply destructuring for cleaner code
- ✅ Work with template literals for string manipulation
- ✅ Use spread and rest operators effectively
- ✅ Understand modules (import/export)
- ✅ Write asynchronous code with Promises and async/await
- ✅ Use array methods (map, filter, reduce)
- ✅ Work with default parameters and optional chaining

---

## What You'll Learn

### Part 1: Arrow Functions & This Binding
- Arrow function syntax
- Implicit return
- Lexical `this` binding
- When to use arrow functions vs regular functions

### Part 2: Destructuring & Spread Operator
- Object destructuring
- Array destructuring
- Spread operator for objects and arrays
- Rest parameters

### Part 3: Template Literals & String Methods
- Multi-line strings
- String interpolation
- Tagged templates
- String methods (includes, startsWith, endsWith)

### Part 4: Modules (Import/Export)
- Named exports and imports
- Default exports and imports
- Re-exporting modules
- Dynamic imports

### Part 5: Async/Await & Promises
- Understanding Promises
- async/await syntax
- Error handling with try/catch
- Promise.all and Promise.race

### Part 6: Array Methods
- map() - Transform arrays
- filter() - Filter arrays
- reduce() - Reduce to single value
- find() and findIndex()
- some() and every()

### Part 7: Modern Features
- Optional chaining (?.)
- Nullish coalescing (??)
- Default parameters
- Short-circuit evaluation

---

## Lesson Structure

```
lesson0-javascript-es6/
├──  reference/          # Quick reference guide for JavaScript ES6+ syntax
├──  example/            # Working code examples
├──  theory/             # Comprehensive documentation
├──  lab/                # Hands-on exercises
└──  quiz/               # Knowledge assessment quiz
```

---

## 📚 Learning Path

### **Step 1: Quick Reference** (15 min)
 **[Go to Reference Guide](./reference/reference0.md)**
- Skim through all ES6+ features
- Get familiar with syntax
- Bookmark for later reference

### **Step 2: Explore Examples** (30 min)
 **[Go to Example Code](./example/)**
- Run the examples
- Experiment with the code
- See concepts in action

### **Step 3: Deep Dive Theory** (60 min)
 **[Go to Theory Documentation](./theory/theory0.md)**
- Read sections as needed
- Focus on concepts you don't understand
- Use as reference while coding

### **Step 4: Practice Lab** (60 min)
 **[Go to Lab Exercises](./lab/lab0.md)**
- Complete all exercises
- Type code yourself (no copy-paste!)
- Test your understanding

### **Step 5: Take Quiz** (15 min)
 **[Go to Quiz](./quiz/)**
- Test your knowledge
- Identify weak areas
- Review if score < 80%

---

## Prerequisites

- **Required**: Basic JavaScript knowledge (variables, functions, loops, objects)
- **Required**: Understanding of programming fundamentals
- **Optional**: Familiarity with ES5 JavaScript (helpful for comparison)

---

## Resources

### **Official Documentation**
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info - Modern JavaScript Tutorial](https://javascript.info/)
- [ES6 Features Overview](http://es6-features.org/)

### **Interactive Learning**
- [JavaScript Playground](https://playcode.io/javascript)
- [CodeSandbox](https://codesandbox.io/)
- [Replit](https://replit.com/)

### **Video Tutorials**
- [JavaScript ES6, ES7, ES8 - Traversy Media](https://www.youtube.com/watch?v=nZ1DMMsyVyI)
- [Modern JavaScript From The Beginning - Brad Traversy](https://www.youtube.com/watch?v=BI1o2H9z9fo)

---

## Common Pitfalls to Avoid

### ❌ **Arrow Functions with `this`**
```javascript
// Wrong - arrow function doesn't have its own 'this'
const obj = {
  name: 'John',
  greet: () => {
    console.log(this.name); // 'this' is undefined
  }
};

// Correct - use regular function for methods
const obj = {
  name: 'John',
  greet() {
    console.log(this.name); // Works correctly
  }
};
```

### ❌ **Destructuring with Wrong Names**
```javascript
// Wrong - property doesn't exist
const { fullName } = { name: 'John' }; // fullName is undefined

// Correct - use existing property names
const { name } = { name: 'John' };
// Or rename: const { name: fullName } = { name: 'John' };
```

### ❌ **Async/Await without Error Handling**
```javascript
// Wrong - no error handling
async function fetchData() {
  const data = await fetch('/api/data'); // Might throw error
  return data;
}

// Correct - with try/catch
async function fetchData() {
  try {
    const data = await fetch('/api/data');
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

---

## Quick Start

### **Option 1: Start with Reference**
If you're already familiar with JavaScript and just need a quick refresher:

```bash
cd lesson0-javascript-es6/reference
# Read reference0.md
```

### **Option 2: Start with Examples**
If you learn best by seeing code in action:

```bash
cd lesson0-javascript-es6/example
# Run and experiment with examples
```

### **Option 3: Start with Theory**
If you prefer comprehensive explanations:

```bash
cd lesson0-javascript-es6/theory
# Read theory0.md thoroughly
```

---

## Next Steps

After completing this lesson, you'll be ready for:

 **[Lesson 1: React Fundamentals & Project Setup](../lesson1-fundamentals-setup/readme.md)**
- Setting up React with Vite
- Creating your first components
- Understanding JSX

---

## Need Help?

- **Stuck on a concept?** → Check the theory documentation
- **Code not working?** → Compare with example code
- **General questions?** → Review the reference guide
- **Still confused?** → [Check Troubleshooting Guide](../../extra/troubleshooting-guide.md)

---

## Summary

This lesson provides the essential JavaScript foundation for React development. Master these concepts before moving to Lesson 1.

**Key Takeaways:**
- Modern JavaScript makes code cleaner and more readable
- Arrow functions, destructuring, and spread operators are heavily used in React
- Understanding async/await is crucial for API calls in React
- Array methods like map() and filter() are fundamental for rendering lists in React

**Completion Criteria:**
- ✅ Completed all lab exercises
- ✅ Scored 80%+ on quiz
- ✅ Comfortable with all ES6+ features covered
- ✅ Ready to start learning React!

---

 **[⬆ Back to Course Overview](../README.md)** | **[➡ Next: Lesson 1 - React Fundamentals](../lesson1-fundamentals-setup/readme.md)**
