# Lesson 0: TypeScript Prerequisites

## Overview

**Difficulty**: Beginner to Intermediate
**Status**:  Optional but Recommended

This course teaches **React with TypeScript**. Before starting Lesson 1, you should be comfortable with TypeScript fundamentals. This lesson provides a quick review of essential TypeScript concepts you'll use throughout the course.

---

## Learning Objectives

After completing this lesson, you will be able to:

-  Use type annotations and type inference effectively
-  Define interfaces and type aliases for object shapes
-  Work with generic types and functions
-  Apply utility types (Partial, Pick, Omit, etc.)
-  Use type guards and narrowing techniques
-  Work with array methods (map, filter, reduce)
-  Use async/await with proper typing
-  Import and export TypeScript modules

---

## Prerequisites

- Basic programming knowledge (variables, functions, loops, conditionals)
- Familiarity with HTML and CSS
- Understanding of modern JavaScript (ES6+)
- Node.js installed on your system

---

## What You'll Learn

### 1. TypeScript Basics
**Core Concepts:**
- Type annotations and inference
- Primitive types (string, number, boolean, etc.)
- Arrays and tuples
- Union and intersection types
- Literal types

### 2. Interfaces & Type Aliases
**Object Typing:**
- Defining object shapes
- Optional and readonly properties
- Extending interfaces
- Type aliases vs interfaces
- When to use each

### 3. Functions & Generics
**Function Typing:**
- Function type signatures
- Optional and default parameters
- Rest parameters
- Generic types and functions
- Generic constraints

### 4. Advanced Types
**Advanced Features:**
- Utility types (Partial, Pick, Omit, Required, Readonly, Record)
- Type guards and narrowing
- Discriminated unions
- Enums (numeric and string)

---

## Quick Concept Preview

### Type Annotations
```typescript
// Explicit type annotations
let username: string = "John Doe";
let age: number = 25;
let isActive: boolean = true;

// Arrays and tuples
let numbers: number[] = [1, 2, 3];
let person: [string, number] = ["Alice", 30];

// Union types
let id: string | number = "ABC123";
```

### Interfaces
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional
  readonly createdAt: Date; // Readonly
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};
```

### Generics
```typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);
const str = identity<string>("Hello");
```

---

## Getting Started

**Learning Path:**

1. **Start with [Reference Guide](./reference/)** - Quick TypeScript syntax reference (5-10 minutes)
2. **Read [Theory Guide](./theory/theory0.md)** - Comprehensive TypeScript fundamentals (1-2 hours)
3. **Explore [Examples](./example/)** - Working TypeScript examples
4. **Complete [Lab Exercises](./lab/lab0.md)** - Hands-on practice (1-2 hours)

**Prerequisites Checklist:**
- [ ] Node.js v18+ installed
- [ ] VS Code with TypeScript extension
- [ ] Basic JavaScript knowledge (ES6+)
- [ ] Understanding of functions and objects

---

## Key Takeaways

- **TypeScript adds static typing** to JavaScript, catching errors at compile time
- **Interfaces and types** define the shape of objects and data structures
- **Generics** allow reusable, type-safe components
- **Utility types** provide powerful type transformations
- **Type guards** enable type narrowing for safer code
- **Array methods** (map, filter, reduce) are essential for React
- **Async/await** with proper typing handles asynchronous operations

---

## Best Practices Summary

 **DO:**
- Use type inference when obvious, explicit types when needed
- Prefer interfaces for object shapes (can be extended)
- Use generics for reusable, type-safe functions
- Enable strict mode in tsconfig.json
- Use utility types instead of manual type manipulation

 **DON'T:**
- Overuse `any` type - it defeats the purpose of TypeScript
- Create overly complex types - keep them simple and readable
- Forget optional chaining (`?.`) and nullish coalescing (`??`)
- Ignore TypeScript errors - they catch real bugs
- Mix naming conventions (use PascalCase for types/interfaces)

---

## Common Challenges & Solutions

**Challenge 1: "Property does not exist on type"**
- **Cause:** TypeScript doesn't know about the property
- **Solution:** Define interface or type with all properties, or use type assertion

**Challenge 2: "Type 'null' is not assignable to type 'X'"**
- **Cause:** Strict null checking enabled
- **Solution:** Use union type `X | null` or optional chaining `?.`

**Challenge 3: "Cannot find module or its type declarations"**
- **Cause:** Missing type definitions for library
- **Solution:** Install `@types/package-name` or declare module types

**Challenge 4: Complex generic types**
- **Cause:** Too many type parameters
- **Solution:** Break into smaller types, use utility types, add constraints

---

## Progress Checklist

- [ ] Completed reading theory guide
- [ ] Ran and understood all examples
- [ ] Finished lab exercises
- [ ] Passed the quiz (80%+)
- [ ] Can explain interfaces vs type aliases
- [ ] Can use generics confidently
- [ ] Understand utility types (Partial, Pick, Omit)

**Test your knowledge:** Take the [interactive quiz](./quiz/quiz0.html)

---

## Next Steps

 **Ready for React?** → Proceed to [Lesson 1: React Fundamentals & Setup](../lesson1-fundamentals-setup/)

**If you scored below 80% on the quiz:**
- Review [theory guide](./theory/theory0.md) sections you struggled with
- Practice more with [lab exercises](./lab/lab0.md)
- Explore [example](./example/) to see concepts in action

**Additional Learning:**
- TypeScript official documentation
- TypeScript playground for practice
- React TypeScript cheatsheet

---

## Resources & References

**Official Documentation:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

**Tools & Extensions:**
- [VS Code TypeScript Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions repository

**Practice Platforms:**
- [TypeScript Exercises](https://typescript-exercises.github.io/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

**Community Resources:**
- [TypeScript Discord](https://discord.gg/typescript)
- [Stack Overflow TypeScript Tag](https://stackoverflow.com/questions/tagged/typescript)

---

**Note:** All code examples in this course use TypeScript. Understanding these fundamentals will make learning React much easier!
