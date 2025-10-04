# Reference - TypeScript Prerequisites

> **Quick reference guide for TypeScript essentials**

---

## Part 1: Setup TypeScript

### Install TypeScript Globally

```bash
# Install TypeScript compiler
npm install -g typescript

# Verify installation
tsc --version
```

### Create Your First TypeScript Project

```bash
# Create project folder
mkdir my-typescript-project
cd my-typescript-project

# Initialize npm project
npm init -y

# Install TypeScript locally
npm install --save-dev typescript

# Initialize TypeScript config
npx tsc --init
```

✅ You should see `tsconfig.json` created!

---

## Part 2: Write Your First TypeScript Code

### Create `hello.ts`

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message = greet("TypeScript");
console.log(message);

// This will cause an error:
// const error = greet(123); // ❌ Argument of type 'number' is not assignable to parameter of type 'string'
```

### Compile and Run

```bash
# Compile TypeScript to JavaScript
npx tsc hello.ts

# Run the generated JavaScript
node hello.js
```

**Output:**
```
Hello, TypeScript!
```

---

## Part 3: Basic Types

### Primitive Types

```typescript
// String
let userName: string = "John";

// Number
let age: number = 25;

// Boolean
let isStudent: boolean = true;

// Array
let scores: number[] = [90, 85, 88];
let names: Array<string> = ["Alice", "Bob"];

// Tuple
let person: [string, number] = ["John", 25];

// Any (avoid when possible)
let anything: any = "can be anything";
anything = 123;
anything = true;
```

### Object Types

```typescript
// Interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};

// Type Alias
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };
```

---

## Part 4: Functions

```typescript
// Function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// Default parameters
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}
```

---

## Part 5: Quick Reference

### Common Commands

```bash
# Compile single file
tsc filename.ts

# Compile all files in project
tsc

# Watch mode (auto-compile on save)
tsc --watch

# Compile and run immediately
ts-node filename.ts
```

### tsconfig.json Quick Settings

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## Common Errors & Quick Fixes

### Error: Cannot find name 'console'

**Fix:** Add type definitions
```bash
npm install --save-dev @types/node
```

### Error: Property does not exist on type

**Fix:** Define proper interface
```typescript
// ❌ Wrong
const user = {};
user.name = "John"; // Error!

// ✅ Correct
interface User {
  name: string;
}
const user: User = { name: "John" };
```

### Error: Type 'null' is not assignable

**Fix:** Use union types
```typescript
// Allow null values
let value: string | null = null;
value = "Hello";
```

---

## Next Steps

1. ✅ Complete **Theory 0** - Deep dive into TypeScript concepts
2. ✅ Do **Lab 0** - Practice exercises
3. ✅ Check **Demo** - See TypeScript in action
4. ✅ Take **Quiz** - Test your knowledge

---

## Useful Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions

---

**Ready to learn more?** Continue with the full theory and lab exercises! 🚀
