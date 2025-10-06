# Lab 0 - JavaScript ES6+ Prerequisites# Lab 0 - TypeScript Prerequisites



## 📋 Overview## 📋 Overview



In this lab session, you'll practice modern JavaScript (ES6+) fundamentals through hands-on exercises. You'll work with variables, arrow functions, destructuring, array methods, promises, and more to build a solid foundation for React development.In this lab session, you'll practice TypeScript fundamentals through hands-on exercises. You'll work with types, interfaces, generics, and utility types to build a solid foundation for React development.



>  **Scope:** This lab focuses on JavaScript ES6+ basics - the foundation you need before diving into React.>  **Scope:** This lab focuses on TypeScript basics - the foundation you need before diving into React with TypeScript.



##  Learning Objectives##  Learning Objectives



By completing this lab, you will be able to:By completing this lab, you will be able to:

- Master modern variable declarations (`let`, `const`)- Master TypeScript type annotations and primitive types

- Write concise arrow functions- Create and use interfaces and type aliases

- Use destructuring for cleaner code- Implement generic functions and types

- Apply spread/rest operators effectively- Apply utility types for advanced type transformations

- Utilize essential array methods- Use type guards for type narrowing

- Handle asynchronous operations with promises and async/await- Build type-safe data management systems

- Organize code with ES6 modules

- Implement classes and OOP concepts##  Exercises

- Use modern JavaScript features (optional chaining, nullish coalescing)

- Exercise 1: Basic Types and Type Annotations

##  Exercises- Exercise 2: Interfaces and Type Aliases

- Exercise 3: Functions and Generics

- Exercise 1: Variables & Arrow Functions- Exercise 4: Utility Types and Type Guards

- Exercise 2: Destructuring & Spread/Rest- Exercise 5: Build a Type-Safe Data Manager

- Exercise 3: Array Methods

- Exercise 4: Promises & Async/Await##  Pre-Lab Checklist

- Exercise 5: Build a User Management System

- [ ] Node.js v18+ installed

##  Pre-Lab Checklist- [ ] TypeScript installed globally (`npm install -g typescript`)

- [ ] VS Code with TypeScript support

- [ ] Node.js v18+ installed- [ ] Basic understanding of JavaScript

- [ ] VS Code installed

- [ ] Basic understanding of JavaScript (ES5)---

- [ ] Completed reading theory0.md

## Exercise 1: Basic Types and Type Annotations

---

### Step 1: Project Setup

## Exercise 1: Variables & Arrow Functions

```bash

### Objective# Create project folder

Practice using `let`, `const`, and arrow functions to write modern JavaScript code.mkdir typescript-lab

cd typescript-lab

### Tasks

# Initialize npm project

#### Task 1.1: Variable Declarationsnpm init -y



Create a file `ex1-variables.js` and complete the following:# Install TypeScript

npm install --save-dev typescript

```javascript

// TODO: Declare constants for configuration# Create TypeScript config

// Create: API_URL, MAX_RETRIES, TIMEOUT_MSnpx tsc --init

//  Your code here

# Install ts-node for quick testing

npm install --save-dev ts-node @types/node

// TODO: Create a counter using let (should be reassignable)```

//  Your code here

### Step 2: Configure tsconfig.json



// TODO: Try to reassign a const and observe the error```json

//  Your code here{

  "compilerOptions": {

    "target": "ES2020",

// TODO: Demonstrate block scope with let    "module": "commonjs",

// Create a variable inside an if block and try to access it outside    "strict": true,

//  Your code here    "esModuleInterop": true,

```    "skipLibCheck": true,

    "forceConsistentCasingInFileNames": true,

**Expected Output:**    "outDir": "./dist",

```javascript    "rootDir": "./src"

const API_URL = "https://api.example.com";  },

const MAX_RETRIES = 3;  "include": ["src/**/*"],

const TIMEOUT_MS = 5000;  "exclude": ["node_modules"]

}

let counter = 0;```

counter++; // Works fine

### Step 3: Create src folder

// const PI = 3.14;

// PI = 3.14159; //  Error: Assignment to constant variable```bash

mkdir src

if (true) {```

  let blockVar = "I'm in a block";

  console.log(blockVar); //  Works### Task 1.1: Primitive Types

}

// console.log(blockVar); //  ReferenceErrorCreate `src/ex1-primitives.ts`:

```

```javascript

#### Task 1.2: Arrow Functions// TODO: Define variables with proper type annotations



Create a file `ex1-arrows.js`:// 1. Create a variable 'studentName' of type string

// Your code here

```javascript

// TODO: Convert these traditional functions to arrow functions// 2. Create a variable 'studentAge' of type number

// Your code here

// Traditional function

function add(a, b) {// 3. Create a variable 'isEnrolled' of type boolean

  return a + b;// Your code here

}

//  Arrow function:// 4. Create a variable 'grades' as an array of numbers

// Your code here



// Traditional function// 5. Create a variable 'subjects' as an array of strings

function square(n) {// Your code here

  return n * n;

}// Test your code

//  Arrow function:console.log("Student:", studentName, "Age:", studentAge);

console.log("Enrolled:", isEnrolled);

console.log("Grades:", grades);

// TODO: Create arrow functions with implicit returnconsole.log("Subjects:", subjects);

// 1. isEven(n) - returns true if n is even```

// 2. getFullName(firstName, lastName) - returns full name

//  Your code here** Solution:**



```javascript

// TODO: Fix the 'this' problem using arrow function// 1. Create a variable 'studentName' of type string

const user = {let studentName: string = "John Doe";

  name: "John",

  hobbies: ["reading", "coding"],// 2. Create a variable 'studentAge' of type number

  printHobbies: function() {let studentAge: number = 20;

    // Fix: Use arrow function in forEach

    this.hobbies.forEach(function(hobby) {// 3. Create a variable 'isEnrolled' of type boolean

      console.log(this.name + " likes " + hobby);let isEnrolled: boolean = true;

    });

  }// 4. Create a variable 'grades' as an array of numbers

};let grades: number[] = [85, 90, 88, 92];

//  Fixed code here

```// 5. Create a variable 'subjects' as an array of strings

let subjects: string[] = ["Math", "Physics", "Chemistry"];

**Expected Solution:**

```javascript// Test your code

// Arrow functionsconsole.log("Student:", studentName, "Age:", studentAge);

const add = (a, b) => a + b;console.log("Enrolled:", isEnrolled);

const square = n => n * n;console.log("Grades:", grades);

console.log("Subjects:", subjects);

// Implicit return```

const isEven = n => n % 2 === 0;

const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;### Task 1.2: Tuples and Enums



// Fixed this bindingCreate `src/ex1-tuples-enums.ts`:

const user = {

  name: "John",```javascript

  hobbies: ["reading", "coding"],// TODO: Work with tuples and enums

  printHobbies: function() {

    this.hobbies.forEach(hobby => {// 1. Create a tuple 'student' with [name: string, id: number, gpa: number]

      console.log(`${this.name} likes ${hobby}`);// Your code here

    });

  }// 2. Create an enum 'Role' with values: Student, Teacher, Admin

};// Your code here

```

// 3. Create a variable 'userRole' of type Role

#### Challenge 1.1: Temperature Converter// Your code here



Create `challenge1.js`:// Test your code

console.log("Student tuple:", student);

```javascriptconsole.log("User role:", userRole);

// TODO: Create arrow functions for temperature conversion```

// 1. celsiusToFahrenheit(celsius)

// 2. fahrenheitToCelsius(fahrenheit)** Solution:**

// Use implicit return

//  Your code here```javascript

// 1. Create a tuple 'student' with [name: string, id: number, gpa: number]

let student: [string, number, number] = ["Alice", 12345, 3.8];

// TODO: Test your functions

console.log(celsiusToFahrenheit(0));   // Should be 32// 2. Create an enum 'Role' with values: Student, Teacher, Admin

console.log(celsiusToFahrenheit(100)); // Should be 212enum Role {

console.log(fahrenheitToCelsius(32));  // Should be 0  Student,

console.log(fahrenheitToCelsius(212)); // Should be 100  Teacher,

```  Admin

}

---

// 3. Create a variable 'userRole' of type Role

## Exercise 2: Destructuring & Spread/Restlet userRole: Role = Role.Student;



### Objective// Test your code

Master destructuring and spread/rest operators for cleaner code.console.log("Student tuple:", student);

console.log("User role:", userRole);

### Tasksconsole.log("Role name:", Role[userRole]); // "Student"

```

#### Task 2.1: Object Destructuring

### Test Exercise 1

Create `ex2-destructuring.js`:

```bash

```javascript# Run with ts-node

// TODO: Destructure user objectnpx ts-node src/ex1-primitives.ts

const user = {npx ts-node src/ex1-tuples-enums.ts

  id: 1,

  name: "John Doe",# Or compile and run

  email: "john@example.com",npx tsc

  age: 25,node dist/ex1-primitives.js

  address: {node dist/ex1-tuples-enums.js

    city: "New York",```

    country: "USA"

  }---

};

## Exercise 2: Interfaces and Type Aliases

// Extract: name, email, age

//  Your code here### Task 2.1: Define User Interface



Create `src/ex2-interfaces.ts`:

// TODO: Rename while destructuring

// Extract name as userName, email as userEmail```javascript

//  Your code here// TODO: Create interfaces for a university system



// 1. Define interface 'Person' with properties:

// TODO: Nested destructuring//    - id: number

// Extract city and country from address//    - firstName: string

//  Your code here//    - lastName: string

//    - age: number (optional)

// Your code here

// TODO: Default values

// Extract role with default value "user"// 2. Define interface 'Student' that extends Person with:

//  Your code here//    - studentId: string

```//    - major: string

//    - gpa: number

**Expected Solution:**//    - courses: string[]

```javascript// Your code here

const { name, email, age } = user;

const { name: userName, email: userEmail } = user;// 3. Define interface 'Course' with:

const { address: { city, country } } = user;//    - code: string

const { role = "user" } = user;//    - name: string

```//    - credits: number

//    - instructor: string

#### Task 2.2: Array Destructuring// Your code here



```javascript// 4. Create a student object

// TODO: Array destructuring// Your code here

const colors = ["red", "green", "blue", "yellow"];

// 5. Create a course object

// Extract first three colors// Your code here

//  Your code here

// Test your code

console.log("Student:", student);

// Skip second elementconsole.log("Course:", course);

//  Your code here```



** Solution:**

// Rest pattern

//  Your code here```javascript

// 1. Define interface 'Person'

interface Person {

// TODO: Swap variables  id: number;

let a = 1;  firstName: string;

let b = 2;  lastName: string;

// Swap a and b using destructuring  age?: number;

//  Your code here}

```

// 2. Define interface 'Student' that extends Person

**Expected Solution:**interface Student extends Person {

```javascript  studentId: string;

const [first, second, third] = colors;  major: string;

const [primary, , tertiary] = colors;  gpa: number;

const [first, ...rest] = colors;  courses: string[];

}

[a, b] = [b, a]; // a = 2, b = 1

```// 3. Define interface 'Course'

interface Course {

#### Task 2.3: Spread & Rest Operators  code: string;

  name: string;

```javascript  credits: number;

// TODO: Array spread  instructor: string;

const arr1 = [1, 2, 3];}

const arr2 = [4, 5, 6];

// 4. Create a student object

// Combine arraysconst student: Student = {

//  Your code here  id: 1,

  firstName: "John",

  lastName: "Doe",

// Copy array  studentId: "S12345",

//  Your code here  major: "Computer Science",

  gpa: 3.8,

  courses: ["CS101", "CS102", "MATH201"]

// TODO: Object spread};

const defaults = { theme: "light", lang: "en" };

const userSettings = { theme: "dark", fontSize: 14 };// 5. Create a course object

const course: Course = {

// Merge objects (userSettings should override defaults)  code: "CS101",

//  Your code here  name: "Introduction to Programming",

  credits: 3,

  instructor: "Dr. Smith"

// TODO: Rest parameters};

// Create a function sum(...numbers) that sums all arguments

//  Your code here// Test your code

console.log("Student:", student);

console.log("Course:", course);

// Test: sum(1, 2, 3, 4, 5) should return 15```

```

### Task 2.2: Type Aliases and Union Types

**Expected Solution:**

```javascriptCreate `src/ex2-type-aliases.ts`:

const combined = [...arr1, ...arr2];

const copy = [...arr1];```javascript

// TODO: Work with type aliases and union types

const settings = { ...defaults, ...userSettings };

// { theme: "dark", lang: "en", fontSize: 14 }// 1. Create type alias 'ID' that can be string or number

// Your code here

const sum = (...numbers) => numbers.reduce((total, n) => total + n, 0);

```// 2. Create type alias 'Status' with literal types: 'pending' | 'approved' | 'rejected'

// Your code here

#### Challenge 2.1: Function with Destructured Parameters

// 3. Create type alias 'Point' as object with x and y coordinates (numbers)

```javascript// Your code here

// TODO: Create a function that accepts an object and uses destructuring

// function createUser({ name, email, age = 18, role = "user" })// 4. Create type alias 'Result' that can be string or number or boolean

// Return: { name, email, age, role, createdAt: new Date() }// Your code here

//  Your code here

// 5. Test your types

let userId: ID = "user123";

// Testlet orderId: ID = 12345;

const user1 = createUser({ name: "John", email: "john@example.com" });let orderStatus: Status = "pending";

const user2 = createUser({ name: "Jane", email: "jane@example.com", age: 25, role: "admin" });let coordinate: Point = { x: 10, y: 20 };

let apiResult: Result = "Success";

console.log(user1);

console.log(user2);console.log({ userId, orderId, orderStatus, coordinate, apiResult });

``````



---** Solution:**



## Exercise 3: Array Methods```javascript

// 1. Create type alias 'ID' that can be string or number

### Objectivetype ID = string | number;

Practice essential array methods (`map`, `filter`, `reduce`, `find`, etc.).

// 2. Create type alias 'Status' with literal types

### Taskstype Status = 'pending' | 'approved' | 'rejected';



#### Task 3.1: Map & Filter// 3. Create type alias 'Point' as object with x and y coordinates

type Point = {

Create `ex3-arrays.js`:  x: number;

  y: number;

```javascript};

const products = [

  { id: 1, name: "Laptop", price: 999, category: "electronics" },// 4. Create type alias 'Result' that can be string or number or boolean

  { id: 2, name: "Phone", price: 699, category: "electronics" },type Result = string | number | boolean;

  { id: 3, name: "Shirt", price: 29, category: "clothing" },

  { id: 4, name: "Headphones", price: 199, category: "electronics" },// 5. Test your types

  { id: 5, name: "Shoes", price: 89, category: "clothing" }let userId: ID = "user123";

];let orderId: ID = 12345;

let orderStatus: Status = "pending";

// TODO: Get all product nameslet coordinate: Point = { x: 10, y: 20 };

//  Your code herelet apiResult: Result = "Success";



console.log({ userId, orderId, orderStatus, coordinate, apiResult });

// TODO: Get products with price > 100```

//  Your code here

### Test Exercise 2



// TODO: Get electronics only```bash

//  Your code herenpx ts-node src/ex2-interfaces.ts

npx ts-node src/ex2-type-aliases.ts

```

// TODO: Apply 10% discount to all products (create new array)

//  Your code here---

```

## Exercise 3: Functions and Generics

**Expected Solution:**

```javascript### Task 3.1: Typed Functions

const names = products.map(p => p.name);

const expensive = products.filter(p => p.price > 100);Create `src/ex3-functions.ts`:

const electronics = products.filter(p => p.category === "electronics");

const discounted = products.map(p => ({ ...p, price: p.price * 0.9 }));```javascript

```// TODO: Create typed functions



#### Task 3.2: Reduce// 1. Create function 'calculateAverage' that takes array of numbers and returns number

// Your code here

```javascript

// TODO: Calculate total price of all products// 2. Create function 'greetUser' with required name (string) and optional greeting (string)

//  Your code here// Your code here



// 3. Create function 'combineStrings' using rest parameters

// TODO: Group products by category// Your code here

// Expected: { electronics: [...], clothing: [...] }

//  Your code here// 4. Create arrow function 'multiply' that takes two numbers and returns number

// Your code here



// TODO: Find most expensive product using reduce// Test functions

//  Your code hereconsole.log(calculateAverage([85, 90, 88, 92])); // Should print average

```console.log(greetUser("John"));

console.log(greetUser("Alice", "Hi"));

**Expected Solution:**console.log(combineStrings("Hello", "World", "!"));

```javascriptconsole.log(multiply(5, 3));

const total = products.reduce((sum, p) => sum + p.price, 0);```



const grouped = products.reduce((acc, p) => {** Solution:**

  if (!acc[p.category]) acc[p.category] = [];

  acc[p.category].push(p);```javascript

  return acc;// 1. Calculate average of numbers

}, {});function calculateAverage(numbers: number[]): number {

  const sum = numbers.reduce((total, num) => total + num, 0);

const mostExpensive = products.reduce((max, p) =>   return sum / numbers.length;

  p.price > max.price ? p : max}

);

```// 2. Greet user with optional greeting

function greetUser(name: string, greeting?: string): string {

#### Task 3.3: Find & Some/Every  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;

}

```javascript

const users = [// 3. Combine strings using rest parameters

  { id: 1, name: "John", age: 25, active: true },function combineStrings(...strings: string[]): string {

  { id: 2, name: "Jane", age: 22, active: false },  return strings.join(" ");

  { id: 3, name: "Bob", age: 30, active: true }}

];

// 4. Multiply two numbers (arrow function)

// TODO: Find user with id 2const multiply = (a: number, b: number): number => a * b;

//  Your code here

// Test functions

console.log(calculateAverage([85, 90, 88, 92])); // 88.75

// TODO: Check if any user is inactiveconsole.log(greetUser("John"));                   // Hello, John!

//  Your code hereconsole.log(greetUser("Alice", "Hi"));            // Hi, Alice!

console.log(combineStrings("Hello", "World", "!")); // Hello World !

console.log(multiply(5, 3));                      // 15

// TODO: Check if all users are adults (age >= 18)```

//  Your code here

```### Task 3.2: Generic Functions



**Expected Solution:**Create `src/ex3-generics.ts`:

```javascript

const user = users.find(u => u.id === 2);```javascript

const hasInactive = users.some(u => !u.active);// TODO: Create generic functions

const allAdults = users.every(u => u.age >= 18);

```// 1. Create generic function 'getFirstElement' that returns first element of array

// Your code here

#### Challenge 3.1: Method Chaining

// 2. Create generic function 'reverseArray' that reverses an array

```javascript// Your code here

// TODO: Using the products array from Task 3.1:

// 1. Filter electronics// 3. Create generic function 'createPair' that takes two values and returns tuple

// 2. Apply 20% discount// Your code here

// 3. Sort by price (ascending)

// 4. Get only names// 4. Create generic interface 'Container' with value property

// Do it all in one chain!// Your code here

//  Your code here

// Test generics

console.log(getFirstElement([1, 2, 3]));

console.log(result);console.log(getFirstElement(["a", "b", "c"]));

// Expected: Sorted electronics names with 20% offconsole.log(reverseArray([1, 2, 3, 4, 5]));

```console.log(createPair("name", "John"));

console.log(createPair(10, true));

**Expected Solution:**

```javascriptconst numberContainer: Container<number> = { value: 42 };

const result = productsconst stringContainer: Container<string> = { value: "Hello" };

  .filter(p => p.category === "electronics")console.log(numberContainer, stringContainer);

  .map(p => ({ ...p, price: p.price * 0.8 }))```

  .sort((a, b) => a.price - b.price)

  .map(p => p.name);** Solution:**

```

```javascript

---// 1. Get first element of array

function getFirstElement<T>(arr: T[]): T | undefined {

## Exercise 4: Promises & Async/Await  return arr[0];

}

### Objective

Handle asynchronous operations with promises and async/await.// 2. Reverse array

function reverseArray<T>(arr: T[]): T[] {

### Tasks  return [...arr].reverse();

}

#### Task 4.1: Basic Promises

// 3. Create pair (tuple)

Create `ex4-async.js`:function createPair<K, V>(key: K, value: V): [K, V] {

  return [key, value];

```javascript}

// TODO: Create a promise that resolves after 1 second

function delay(ms) {// 4. Generic container interface

  //  Your code hereinterface Container<T> {

}  value: T;

}

// Test

delay(1000).then(() => console.log("Done!"));// Test generics

console.log(getFirstElement([1, 2, 3]));           // 1

console.log(getFirstElement(["a", "b", "c"]));     // "a"

// TODO: Create a function that fetches user data (simulate with promise)console.log(reverseArray([1, 2, 3, 4, 5]));        // [5, 4, 3, 2, 1]

function fetchUser(id) {console.log(createPair("name", "John"));           // ["name", "John"]

  return new Promise((resolve, reject) => {console.log(createPair(10, true));                 // [10, true]

    setTimeout(() => {

      if (id === 1) {const numberContainer: Container<number> = { value: 42 };

        resolve({ id: 1, name: "John" });const stringContainer: Container<string> = { value: "Hello" };

      } else {console.log(numberContainer, stringContainer);

        reject("User not found");```

      }

    }, 1000);### Test Exercise 3

  });

}```bash

npx ts-node src/ex3-functions.ts

// Testnpx ts-node src/ex3-generics.ts

fetchUser(1)```

  .then(user => console.log(user))

  .catch(error => console.error(error));---

```

## Exercise 4: Utility Types and Type Guards

**Expected Solution:**

```javascript### Task 4.1: Utility Types

function delay(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));Create `src/ex4-utility-types.ts`:

}

``````javascript

// TODO: Practice utility types

#### Task 4.2: Async/Await

// Base interface

```javascriptinterface User {

// TODO: Convert promise chain to async/await  id: number;

// Original:  username: string;

fetchUser(1)  email: string;

  .then(user => console.log(user))  password: string;

  .catch(error => console.error(error));  age: number;

  isActive: boolean;

//  Async/await version:}

async function loadUser(id) {

  // Your code here// 1. Create 'PartialUser' using Partial<User>

}// Your code here



// 2. Create 'PublicUser' using Omit to exclude password

// TODO: Handle errors with try/catch// Your code here

async function loadUserSafely(id) {

  //  Your code here// 3. Create 'UserPreview' using Pick for id and username only

}// Your code here

```

// 4. Create 'ReadonlyUser' using Readonly<User>

**Expected Solution:**// Your code here

```javascript

async function loadUser(id) {// 5. Create 'UserRoles' using Record with admin, user, guest keys

  const user = await fetchUser(id);// Your code here

  console.log(user);

}// Test utility types

const updateData: PartialUser = { email: "newemail@example.com" };

async function loadUserSafely(id) {const publicProfile: PublicUser = {

  try {  id: 1,

    const user = await fetchUser(id);  username: "john",

    console.log(user);  email: "john@example.com",

    return user;  age: 25,

  } catch (error) {  isActive: true

    console.error("Failed:", error);};

    return null;const preview: UserPreview = { id: 1, username: "john" };

  }const immutableUser: ReadonlyUser = {

}  id: 1,

```  username: "john",

  email: "john@example.com",

#### Task 4.3: Promise.all  password: "secret",

  age: 25,

```javascript  isActive: true

// TODO: Load multiple users in parallel};

const userIds = [1, 2, 3];// immutableUser.email = "new@example.com"; // Should error



// Using Promise.allconsole.log({ updateData, publicProfile, preview });

async function loadAllUsers(ids) {```

  //  Your code here

}** Solution:**



// Test```javascript

loadAllUsers(userIds).then(users => console.log(users));// Base interface

```interface User {

  id: number;

**Expected Solution:**  username: string;

```javascript  email: string;

async function loadAllUsers(ids) {  password: string;

  const promises = ids.map(id => fetchUser(id).catch(e => null));  age: number;

  const users = await Promise.all(promises);  isActive: boolean;

  return users.filter(u => u !== null);}

}

```// 1. Partial - all properties optional

type PartialUser = Partial<User>;

#### Challenge 4.1: Retry Logic

// 2. Omit - exclude password

```javascripttype PublicUser = Omit<User, "password">;

// TODO: Create a function that retries failed requests

async function fetchWithRetry(url, maxRetries = 3) {// 3. Pick - only id and username

  //  Your code heretype UserPreview = Pick<User, "id" | "username">;

  // Hint: Use a loop, try/catch, and delay between retries

}// 4. Readonly - all properties read-only

type ReadonlyUser = Readonly<User>;

// Test

fetchWithRetry("https://api.example.com/data")// 5. Record - create object with specific keys

  .then(data => console.log(data))type UserRole = "admin" | "user" | "guest";

  .catch(error => console.error("All retries failed"));type UserRoles = Record<UserRole, string[]>;

```

const roles: UserRoles = {

---  admin: ["read", "write", "delete"],

  user: ["read", "write"],

## Exercise 5: Build a User Management System  guest: ["read"]

};

### Objective

Combine all learned concepts to build a complete user management system.// Test utility types

const updateData: PartialUser = { email: "newemail@example.com" };

### Requirementsconst publicProfile: PublicUser = {

  id: 1,

Create a `user-manager.js` file that implements the following:  username: "john",

  email: "john@example.com",

```javascript  age: 25,

// User Manager System  isActive: true

};

// TODO 1: Create UserManager classconst preview: UserPreview = { id: 1, username: "john" };

class UserManager {const immutableUser: ReadonlyUser = {

  // Private field for users array  id: 1,

    username: "john",

  constructor() {  email: "john@example.com",

    // Initialize empty users array  password: "secret",

  }  age: 25,

    isActive: true

  // Add user (use default parameters for role)};

  addUser({ name, email, age, role = "user" }) {

    // Create user with id, createdAtconsole.log({ updateData, publicProfile, preview, roles });

    // Add to array```

    // Return user

  }### Task 4.2: Type Guards

  

  // Get all usersCreate `src/ex4-type-guards.ts`:

  getUsers() {

    // Return copy of users array```javascript

  }// TODO: Create type guards

  

  // Find user by id// 1. Create function 'processValue' that handles string or number

  findUserById(id) {//    - If string: return uppercase

    // Use find method//    - If number: return squared

  }// Your code here

  

  // Get users by role// 2. Create interfaces and type guard for animals

  getUsersByRole(role) {interface Dog {

    // Use filter  breed: string;

  }  bark(): void;

  }

  // Update user

  updateUser(id, updates) {interface Cat {

    // Use map to update  color: string;

    // Return updated user  meow(): void;

  }}

  

  // Delete user// Create type guard 'isDog'

  deleteUser(id) {// Your code here

    // Use filter

    // Return deleted user// Create function 'makeSound' that uses type guard

  }// Your code here

  

  // Get statistics// Test type guards

  getStats() {console.log(processValue("hello"));

    // Return: { total, byRole: { ... }, averageAge }console.log(processValue(5));

    // Use reduce

  }const myDog: Dog = {

    breed: "Labrador",

  // Async: Simulate fetch users from API  bark() { console.log("Woof!"); }

  async fetchUsers() {};

    // Simulate API call with delay

    // Add fetched usersconst myCat: Cat = {

  }  color: "Orange",

}  meow() { console.log("Meow!"); }

};



// TODO 2: Test the UserManagermakeSound(myDog);

makeSound(myCat);

const manager = new UserManager();```



// Add users** Solution:**

manager.addUser({ name: "John", email: "john@example.com", age: 25 });

manager.addUser({ name: "Jane", email: "jane@example.com", age: 22, role: "admin" });```javascript

manager.addUser({ name: "Bob", email: "bob@example.com", age: 30 });// 1. Process value based on type

function processValue(value: string | number): string | number {

// Get all users  if (typeof value === "string") {

console.log("All users:", manager.getUsers());    return value.toUpperCase();

  } else {

// Find user    return value * value;

console.log("User #1:", manager.findUserById(1));  }

}

// Get by role

console.log("Admins:", manager.getUsersByRole("admin"));// 2. Type guards for animals

interface Dog {

// Update user  breed: string;

manager.updateUser(1, { age: 26, role: "admin" });  bark(): void;

}

// Delete user

manager.deleteUser(2);interface Cat {

  color: string;

// Statistics  meow(): void;

console.log("Stats:", manager.getStats());}



// Async operation// Type guard function

manager.fetchUsers().then(() => {function isDog(animal: Dog | Cat): animal is Dog {

  console.log("After fetch:", manager.getUsers());  return (animal as Dog).bark !== undefined;

});}

```

// Use type guard

### Expected Implementationfunction makeSound(animal: Dog | Cat): void {

  if (isDog(animal)) {

```javascript    console.log(`${animal.breed} says:`);

class UserManager {    animal.bark();

  #users = [];  } else {

  #nextId = 1;    console.log(`${animal.color} cat says:`);

      animal.meow();

  constructor() {  }

    this.#users = [];}

  }

  // Test type guards

  addUser({ name, email, age, role = "user" }) {console.log(processValue("hello"));  // "HELLO"

    const user = {console.log(processValue(5));        // 25

      id: this.#nextId++,

      name,const myDog: Dog = {

      email,  breed: "Labrador",

      age,  bark() { console.log("Woof!"); }

      role,};

      createdAt: new Date()

    };const myCat: Cat = {

    this.#users = [...this.#users, user];  color: "Orange",

    return user;  meow() { console.log("Meow!"); }

  }};

  

  getUsers() {makeSound(myDog);  // Labrador says: Woof!

    return [...this.#users];makeSound(myCat);  // Orange cat says: Meow!

  }```

  

  findUserById(id) {### Test Exercise 4

    return this.#users.find(u => u.id === id);

  }```bash

  npx ts-node src/ex4-utility-types.ts

  getUsersByRole(role) {npx ts-node src/ex4-type-guards.ts

    return this.#users.filter(u => u.role === role);```

  }

  ---

  updateUser(id, updates) {

    this.#users = this.#users.map(user =>## Exercise 5: Build a Type-Safe Data Manager

      user.id === id ? { ...user, ...updates } : user

    );### Final Project: Student Management System

    return this.findUserById(id);

  }Create `src/ex5-student-manager.ts`:

  

  deleteUser(id) {```javascript

    const user = this.findUserById(id);// Student Management System - Type-Safe Implementation

    this.#users = this.#users.filter(u => u.id !== id);

    return user;// 1. Define types and interfaces

  }interface Student {

    id: number;

  getStats() {  name: string;

    const byRole = this.#users.reduce((acc, user) => {  email: string;

      acc[user.role] = (acc[user.role] || 0) + 1;  major: string;

      return acc;  gpa: number;

    }, {});  enrolledCourses: string[];

    }

    const averageAge = this.#users.length > 0

      ? this.#users.reduce((sum, u) => sum + u.age, 0) / this.#users.lengthinterface Course {

      : 0;  code: string;

      name: string;

    return {  credits: number;

      total: this.#users.length,  capacity: number;

      byRole,  enrolled: number;

      averageAge: Math.round(averageAge * 10) / 10}

    };

  }type StudentUpdate = Partial<Omit<Student, "id">>;

  type CourseStatus = "available" | "full" | "closed";

  async fetchUsers() {

    // Simulate API call// 2. Create StudentManager class

    await new Promise(resolve => setTimeout(resolve, 1000));class StudentManager {

      private students: Student[] = [];

    const fetchedUsers = [  private nextId: number = 1;

      { name: "Alice", email: "alice@example.com", age: 28 },

      { name: "Charlie", email: "charlie@example.com", age: 35, role: "admin" }  // Add student

    ];  addStudent(student: Omit<Student, "id">): Student {

        const newStudent: Student = {

    fetchedUsers.forEach(user => this.addUser(user));      id: this.nextId++,

  }      ...student

}    };

```    this.students.push(newStudent);

    return newStudent;

---  }



##  Completion Checklist  // Get student by ID

  getStudent(id: number): Student | undefined {

- [ ] Exercise 1: Variables & Arrow Functions    return this.students.find(s => s.id === id);

  - [ ] Task 1.1: Variable Declarations  }

  - [ ] Task 1.2: Arrow Functions

  - [ ] Challenge 1.1: Temperature Converter  // Update student

  updateStudent(id: number, updates: StudentUpdate): Student | undefined {

- [ ] Exercise 2: Destructuring & Spread/Rest    const student = this.getStudent(id);

  - [ ] Task 2.1: Object Destructuring    if (student) {

  - [ ] Task 2.2: Array Destructuring      Object.assign(student, updates);

  - [ ] Task 2.3: Spread & Rest Operators      return student;

  - [ ] Challenge 2.1: Destructured Parameters    }

    return undefined;

- [ ] Exercise 3: Array Methods  }

  - [ ] Task 3.1: Map & Filter

  - [ ] Task 3.2: Reduce  // Delete student

  - [ ] Task 3.3: Find & Some/Every  deleteStudent(id: number): boolean {

  - [ ] Challenge 3.1: Method Chaining    const index = this.students.findIndex(s => s.id === id);

    if (index !== -1) {

- [ ] Exercise 4: Promises & Async/Await      this.students.splice(index, 1);

  - [ ] Task 4.1: Basic Promises      return true;

  - [ ] Task 4.2: Async/Await    }

  - [ ] Task 4.3: Promise.all    return false;

  - [ ] Challenge 4.1: Retry Logic  }



- [ ] Exercise 5: User Management System  // Get all students

  - [ ] Complete implementation  getAllStudents(): Readonly<Student[]> {

  - [ ] All tests passing    return this.students;

  }

---

  // Filter students by major

##  Submission Guidelines  getStudentsByMajor(major: string): Student[] {

    return this.students.filter(s => s.major === major);

1. **Code Quality:**  }

   - Use `const` by default, `let` when needed

   - Write descriptive variable names  // Get students with high GPA

   - Add comments for complex logic  getHighAchievers(minGpa: number = 3.5): Student[] {

   - Follow ES6+ best practices    return this.students.filter(s => s.gpa >= minGpa);

  }

2. **Testing:**

   - Test each function with console.log  // Calculate average GPA

   - Verify expected outputs  calculateAverageGPA(): number {

   - Handle edge cases    if (this.students.length === 0) return 0;

    const total = this.students.reduce((sum, s) => sum + s.gpa, 0);

3. **File Organization:**    return Number((total / this.students.length).toFixed(2));

   ```  }

   javascript-lab/}

   ├── ex1-variables.js

   ├── ex1-arrows.js// 3. Test the system

   ├── challenge1.jsconst manager = new StudentManager();

   ├── ex2-destructuring.js

   ├── ex3-arrays.js// Add students

   ├── ex4-async.jsconst student1 = manager.addStudent({

   ├── user-manager.js  name: "Alice Johnson",

   └── README.md (your notes)  email: "alice@university.edu",

   ```  major: "Computer Science",

  gpa: 3.8,

4. **Running Code:**  enrolledCourses: ["CS101", "MATH201"]

   ```bash});

   # Run individual files

   node ex1-variables.jsconst student2 = manager.addStudent({

   node ex1-arrows.js  name: "Bob Smith",

     email: "bob@university.edu",

   # Or run all tests  major: "Computer Science",

   node user-manager.js  gpa: 3.5,

   ```  enrolledCourses: ["CS101", "CS102"]

});

---

const student3 = manager.addStudent({

##  Next Steps  name: "Charlie Brown",

  email: "charlie@university.edu",

After completing this lab:  major: "Mathematics",

  gpa: 3.9,

1.  Review the theory0.md file for concepts  enrolledCourses: ["MATH201", "MATH301"]

2.  Complete all exercises and challenges});

3.  Take the quiz (quiz0.html)

4.  Keep reference0.md as a cheat sheetconsole.log("=== All Students ===");

5.  Move to Lesson 1: React Fundamentalsconsole.log(manager.getAllStudents());



**Congratulations!** You now have the JavaScript foundation needed for React! console.log("\n=== Computer Science Students ===");

console.log(manager.getStudentsByMajor("Computer Science"));

---

console.log("\n=== High Achievers (GPA >= 3.5) ===");

##  Tips & Tricksconsole.log(manager.getHighAchievers(3.5));



**Common Mistakes:**console.log("\n=== Average GPA ===");

- Using `var` instead of `let`/`const`console.log(manager.calculateAverageGPA());

- Forgetting `return` in arrow functions (when using `{}`)

- Mutating arrays/objects instead of creating new onesconsole.log("\n=== Update Student ===");

- Not handling promise rejectionsmanager.updateStudent(1, { gpa: 4.0 });

- Mixing traditional functions and arrow functions incorrectlyconsole.log(manager.getStudent(1));



**Best Practices:**console.log("\n=== Delete Student ===");

- Always use `const` unless reassignment is neededmanager.deleteStudent(2);

- Prefer arrow functions for callbacksconsole.log("Remaining students:", manager.getAllStudents().length);

- Use destructuring to extract values```

- Chain array methods for readability

- Use async/await instead of promise chains### Test Exercise 5

- Keep functions pure (no side effects)

```bash

**Debugging:**npx ts-node src/ex5-student-manager.ts

```javascript```

// Use console.log to debug

console.log('Value:', value);**Expected Output:**

```

// Use console.table for arrays/objects=== All Students ===

console.table(users);[

  { id: 1, name: 'Alice Johnson', ... },

// Use debugger statement  { id: 2, name: 'Bob Smith', ... },

debugger;  { id: 3, name: 'Charlie Brown', ... }

```]



---=== Computer Science Students ===

[ { id: 1, ... }, { id: 2, ... } ]

**Happy Coding!** 

=== High Achievers (GPA >= 3.5) ===
[ { id: 1, ... }, { id: 2, ... }, { id: 3, ... } ]

=== Average GPA ===
3.73

=== Update Student ===
{ id: 1, name: 'Alice Johnson', gpa: 4.0, ... }

=== Delete Student ===
Remaining students: 2
```

---

## Bonus Challenges 

### Challenge 1: Add Course Management

Extend the system with a `CourseManager` class that:
- Manages course enrollment
- Checks course capacity
- Returns course status (available/full/closed)

### Challenge 2: Add Data Validation

Create validation functions:
- Validate email format
- Validate GPA range (0.0 - 4.0)
- Validate course code format

### Challenge 3: Add Search Functionality

Implement advanced search:
- Search students by name (partial match)
- Filter by GPA range
- Sort students by various fields

---

## Lab Completion Checklist

- [ ] Exercise 1: Basic types completed
- [ ] Exercise 2: Interfaces and type aliases completed
- [ ] Exercise 3: Functions and generics completed
- [ ] Exercise 4: Utility types and type guards completed
- [ ] Exercise 5: Student manager system completed
- [ ] All code compiles without errors
- [ ] All tests produce expected output
- [ ] Bonus challenges attempted (optional)

---

## Key Takeaways

1.  **Type Safety**: TypeScript catches errors at compile time
2.  **IntelliSense**: Better IDE support and autocomplete
3.  **Interfaces**: Define clear contracts for objects
4.  **Generics**: Write reusable, type-safe code
5.  **Utility Types**: Transform types efficiently
6.  **Type Guards**: Safely narrow types at runtime

---

## Next Steps

1.  Review **Theory 0** for concepts you found challenging
2.  Take the **Quiz** to test your understanding
3.  Check out **Demo** examples for more patterns
4.  Move to **Lesson 1** - React with TypeScript

---
