# JavaScript ES6+ Quick Reference# Reference - TypeScript Prerequisites



> **Quick reference guide for modern JavaScript features used in React development**> **Quick reference guide for TypeScript essentials**



---## Table of Contents

1. [Setup TypeScript](#part-1-setup-typescript)

## Variables2. [Write Your First TypeScript Code](#part-2-write-your-first-typescript-code)

3. [Basic Types](#part-3-basic-types)

```javascript4. [Functions](#part-4-functions)

// const (default)5. [Quick Reference](#part-5-quick-reference)

const API_URL = "https://api.example.com";

const user = { name: "John" };---



// let (when reassignment needed)## Part 1: Setup TypeScript

let counter = 0;

counter++;### Install TypeScript Globally



//  var (avoid)```bash

var oldStyle = "don't use";# Install TypeScript compiler

```npm install -g typescript



---# Verify installation

tsc --version

## Arrow Functions```



```javascript### Create Your First TypeScript Project

// Basic

const add = (a, b) => a + b;```bash

const square = n => n * n;# Create project folder

const random = () => Math.random();mkdir my-typescript-project

cd my-typescript-project

// Multiple statements

const greet = name => {# Initialize npm project

  const message = `Hello ${name}`;npm init -y

  return message;

};# Install TypeScript locally

npm install --save-dev typescript

// Object return

const makePerson = (name, age) => ({ name, age });# Initialize TypeScript config

```npx tsc --init

```

---

 You should see `tsconfig.json` created!

## Template Literals

---

```javascript

const name = "John";## Part 2: Write Your First TypeScript Code

const age = 25;

### Create `hello.ts`

const message = `Hello ${name}, you are ${age} years old`;

```javascript

const html = `// hello.ts

  <div>function greet(name: string): string {

    <h1>${name}</h1>  return `Hello, ${name}!`;

  </div>}

`;

```const message = greet("TypeScript");

console.log(message);

---

// This will cause an error:

## Destructuring// const error = greet(123); //  Argument of type 'number' is not assignable to parameter of type 'string'

```

```javascript

// Object### Compile and Run

const { name, age } = user;

const { name: userName } = user; // Rename```bash

const { role = "user" } = user; // Default# Compile TypeScript to JavaScript

const { address: { city } } = user; // Nestednpx tsc hello.ts



// Array# Run the generated JavaScript

const [first, second] = colors;node hello.js

const [first, , third] = colors; // Skip```

const [first, ...rest] = colors; // Rest

**Output:**

// Swap```

[a, b] = [b, a];Hello, TypeScript!

```

// Function params

function greet({ name, age }) { }---

```

## Part 3: Basic Types

---

### Primitive Types

## Spread & Rest

```javascript

```javascript// String

// Spreadlet userName: string = "John";

const combined = [...arr1, ...arr2];

const copy = [...arr1];// Number

const updated = { ...user, age: 26 };let age: number = 25;



// Rest// Boolean

function sum(...numbers) {let isStudent: boolean = true;

  return numbers.reduce((a, b) => a + b, 0);

}// Array

let scores: number[] = [90, 85, 88];

const [first, ...rest] = [1, 2, 3, 4];let names: Array<string> = ["Alice", "Bob"];

const { name, ...other} = user;

```// Tuple

let person: [string, number] = ["John", 25];

---

// Any (avoid when possible)

## Array Methodslet anything: any = "can be anything";

anything = 123;

```javascriptanything = true;

// map```

const doubled = numbers.map(n => n * 2);

### Object Types

// filter

const evens = numbers.filter(n => n % 2 === 0);```javascript

// Interface

// reduceinterface User {

const sum = numbers.reduce((total, n) => total + n, 0);  id: number;

  name: string;

// find  email: string;

const user = users.find(u => u.id === 2);  age?: number; // Optional property

}

// some / every

const hasEven = numbers.some(n => n % 2 === 0);const user: User = {

const allPositive = numbers.every(n => n > 0);  id: 1,

  name: "John Doe",

// sort  email: "john@example.com"

const sorted = [...numbers].sort((a, b) => a - b);};



// Chaining// Type Alias

const result = numberstype Point = {

  .filter(n => n % 2 === 0)  x: number;

  .map(n => n * 2)  y: number;

  .reduce((sum, n) => sum + n, 0);};

```

const point: Point = { x: 10, y: 20 };

---```



## Promises---



```javascript## Part 4: Functions

// Create

const promise = new Promise((resolve, reject) => {```javascript

  if (success) resolve("Done");// Function with typed parameters and return type

  else reject("Error");function add(a: number, b: number): number {

});  return a + b;

}

// Use

promise// Arrow function

  .then(result => console.log(result))const multiply = (a: number, b: number): number => a * b;

  .catch(error => console.error(error))

  .finally(() => console.log("Finished"));// Optional parameters

function greet(name: string, greeting?: string): string {

// Promise.all  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;

Promise.all([p1, p2, p3])}

  .then(([r1, r2, r3]) => { });

// Default parameters

// Promise.racefunction power(base: number, exponent: number = 2): number {

Promise.race([p1, p2])  return Math.pow(base, exponent);

  .then(first => { });}

``````



------



## Async/Await## Part 5: Quick Reference



```javascript### Common Commands

// Basic

async function fetchUser(id) {```bash

  const response = await fetch(`/api/users/${id}`);# Compile single file

  const user = await response.json();tsc filename.ts

  return user;

}# Compile all files in project

tsc

// Error handling

async function fetchSafely(id) {# Watch mode (auto-compile on save)

  try {tsc --watch

    const data = await fetchUser(id);

    return data;# Compile and run immediately

  } catch (error) {ts-node filename.ts

    console.error(error);```

    return null;

  }### tsconfig.json Quick Settings

}

```json

// Parallel{

const [user, posts] = await Promise.all([  "compilerOptions": {

  fetchUser(1),    "target": "ES2020",

  fetchPosts(1)    "module": "commonjs",

]);    "strict": true,

```    "esModuleInterop": true,

    "skipLibCheck": true,

---    "forceConsistentCasingInFileNames": true,

    "outDir": "./dist",

## Modules    "rootDir": "./src"

  },

```javascript  "include": ["src/**/*"],

// Export  "exclude": ["node_modules"]

export const PI = 3.14;}

export function add(a, b) { return a + b; }```

export default class User { }

---

// Import

import { PI, add } from './utils.js';## Common Errors & Quick Fixes

import User from './User.js';

import * as utils from './utils.js';### Error: Cannot find name 'console'



// Dynamic**Fix:** Add type definitions

const module = await import('./module.js');```bash

```npm install --save-dev @types/node

```

---

### Error: Property does not exist on type

## Classes

**Fix:** Define proper interface

```javascript```javascript

class User {//  Wrong

  #balance = 0; // Privateconst user = {};

  user.name = "John"; // Error!

  constructor(name) {

    this.name = name;//  Correct

  }interface User {

    name: string;

  greet() {}

    return `Hello, ${this.name}`;const user: User = { name: "John" };

  }```

  

  static createGuest() {### Error: Type 'null' is not assignable

    return new User("Guest");

  }**Fix:** Use union types

  ```javascript

  get fullName() {// Allow null values

    return `${this.firstName} ${this.lastName}`;let value: string | null = null;

  }value = "Hello";

}```



class Admin extends User {---

  constructor(name, role) {

    super(name);## Next Steps

    this.role = role;

  }1.  Complete **Theory 0** - Deep dive into TypeScript concepts

}2.  Do **Lab 0** - Practice exercises

```3.  Check **Demo** - See TypeScript in action

4.  Take **Quiz** - Test your knowledge

---

---

## Modern Features

## Useful Resources

```javascript

// Optional chaining- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

const city = user?.address?.city;- [TypeScript Playground](https://www.typescriptlang.org/play)

const result = obj?.method?.();- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions



// Nullish coalescing---

const port = config.port ?? 3000;

const username = user?.name ?? 'Guest';**Ready to learn more?** Continue with the full theory and lab exercises! 


// Logical assignment
value ||= 'default';
obj.name &&= obj.name.toUpperCase();
config.port ??= 3000;

// Array.at
arr.at(-1);  // Last element

// Object.hasOwn
Object.hasOwn(obj, 'name');
```

---

## React Patterns

```javascript
// Component
function Button({ onClick, children, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Hooks
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);

// Immutable updates
setUsers([...users, newUser]); // Add
setUsers(users.filter(u => u.id !== id)); // Remove
setUsers(users.map(u => u.id === id ? {...u, name} : u)); // Update

// Conditional rendering
{user && <Profile user={user} />}
{loading ? <Spinner /> : <Content />}

// List rendering
{users.map(user => (
  <UserCard key={user.id} {...user} />
))}

// useEffect with async
useEffect(() => {
  async function load() {
    const data = await fetchData();
    setData(data);
  }
  load();
}, []);
```

---

## Best Practices

```javascript
//  Good
const isActive = true;
const users = [...originalUsers];
const updated = { ...user, age: 26 };

//  Bad
var x = true;
originalUsers.push(newUser); // Mutation
user.age = 26; // Mutation

//  Pure functions
const add = (a, b) => a + b;
const double = n => n * 2;

//  Side effects
let total = 0;
const add = n => { total += n; }; // Impure
```

---

**Quick Reference - Keep this handy!** 
