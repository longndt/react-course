/**
 * Example 3: Destructuring
 * Extract values from objects and arrays
 */

console.log('=== Example 3: Destructuring ===\n');

// ==================================================
// 1. Object Destructuring - Basics
// ==================================================

console.log('1. Object Destructuring - Basics:');

const user = {
  name: 'John Doe',
  age: 25,
  email: 'john@example.com',
  city: 'Hanoi'
};

//  Old way
const name1 = user.name;
const age1 = user.age;
const email1 = user.email;

//  Destructuring
const { name, age, email } = user;
console.log('  Name:', name);
console.log('  Age:', age);
console.log('  Email:', email);

// ==================================================
// 2. Renaming Variables
// ==================================================

console.log('\n2. Renaming Variables:');

const product = {
  id: 1,
  name: 'Laptop',
  price: 1000
};

// Rename during destructuring
const { name: productName, price: productPrice } = product;
console.log('  Product Name:', productName);
console.log('  Price:', productPrice);

// ==================================================
// 3. Default Values
// ==================================================

console.log('\n3. Default Values:');

const settings = {
  theme: 'dark',
  language: 'en'
};

// Provide default if property doesn't exist
const { theme, language, fontSize = 14 } = settings;
console.log('  Theme:', theme);
console.log('  Language:', language);
console.log('  Font Size (default):', fontSize);

// ==================================================
// 4. Nested Destructuring
// ==================================================

console.log('\n4. Nested Destructuring:');

const student = {
  id: 1,
  name: 'Alice',
  grades: {
    math: 90,
    english: 85,
    science: 92
  },
  address: {
    street: '123 Main St',
    city: 'Hanoi',
    country: 'Vietnam'
  }
};

// Destructure nested objects
const {
  name: studentName,
  grades: { math, english },
  address: { city: studentCity }
} = student;

console.log('  Student:', studentName);
console.log('  Math Grade:', math);
console.log('  English Grade:', english);
console.log('  City:', studentCity);

// ==================================================
// 5. Array Destructuring - Basics
// ==================================================

console.log('\n5. Array Destructuring - Basics:');

const colors = ['red', 'green', 'blue', 'yellow'];

//  Old way
const first1 = colors[0];
const second1 = colors[1];

//  Destructuring
const [first, second, third] = colors;
console.log('  First:', first);
console.log('  Second:', second);
console.log('  Third:', third);

// ==================================================
// 6. Skipping Elements
// ==================================================

console.log('\n6. Skipping Elements:');

const numbers = [1, 2, 3, 4, 5];

// Skip elements with commas
const [firstNum, , thirdNum, , fifthNum] = numbers;
console.log('  First:', firstNum);
console.log('  Third:', thirdNum);
console.log('  Fifth:', fifthNum);

// ==================================================
// 7. Rest Pattern (...)
// ==================================================

console.log('\n7. Rest Pattern:');

const [head, ...tail] = [1, 2, 3, 4, 5];
console.log('  Head:', head);
console.log('  Tail:', tail);

// With objects
const { name: userName, ...otherInfo } = user;
console.log('  User Name:', userName);
console.log('  Other Info:', otherInfo);

// ==================================================
// 8. Function Parameters
// ==================================================

console.log('\n8. Function Parameters:');

// Destructure in function parameters
function displayUser({ name, age, city = 'Unknown' }) {
  console.log(`  ${name}, ${age} years old, from ${city}`);
}

displayUser(user);
displayUser({ name: 'Jane', age: 30 }); // city uses default

// Array destructuring in parameters
function sum([a, b]) {
  return a + b;
}

console.log('  Sum [10, 20]:', sum([10, 20]));

// ==================================================
// 9. Swapping Variables
// ==================================================

console.log('\n9. Swapping Variables:');

let x = 1;
let y = 2;

console.log('  Before swap: x =', x, ', y =', y);

//  Old way (need temp variable)
// let temp = x;
// x = y;
// y = temp;

//  Destructuring swap
[x, y] = [y, x];

console.log('  After swap: x =', x, ', y =', y);

// ==================================================
// 10. Practical Examples - React Hooks
// ==================================================

console.log('\n10. Practical Examples - React Hooks:');

// Simulating useState
function useState(initial) {
  const state = initial;
  const setState = (newState) => {
    console.log('    State updated to:', newState);
  };
  return [state, setState];
}

//  Destructuring array from hook
const [count, setCount] = useState(0);
console.log('  Initial count:', count);
setCount(1);

// Simulating useContext
function useAuth() {
  return {
    user: { name: 'John', role: 'admin' },
    login: () => console.log('    Logging in...'),
    logout: () => console.log('    Logging out...')
  };
}

//  Destructuring object from hook
const { user: currentUser, login, logout } = useAuth();
console.log('  Current user:', currentUser.name);
login();

// ==================================================
// 11. Practical Examples - API Data
// ==================================================

console.log('\n11. Practical Examples - API Data:');

// Simulated API response
const apiResponse = {
  data: {
    users: [
      { id: 1, name: 'John', active: true },
      { id: 2, name: 'Jane', active: false }
    ],
    total: 2
  },
  status: 200,
  message: 'Success'
};

// Extract what you need
const {
  data: { users: apiUsers, total },
  status,
  message
} = apiResponse;

console.log('  Status:', status);
console.log('  Message:', message);
console.log('  Total users:', total);
console.log('  First user:', apiUsers[0].name);

// ==================================================
// 12. Practical Examples - Props in Components
// ==================================================

console.log('\n12. Practical Examples - Component Props:');

// React component props destructuring
function UserCard({ name, email, avatar = 'default.jpg' }) {
  return `
    <div>
      <img src="${avatar}" />
      <h2>${name}</h2>
      <p>${email}</p>
    </div>
  `;
}

const props = { name: 'John', email: 'john@example.com' };
console.log('  Component output:', UserCard(props).trim());

// ==================================================
// 13. Practical Examples - Array Methods
// ==================================================

console.log('\n13. Practical Examples - Array Methods:');

const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 35 }
];

// Destructure in map
const userNames = users.map(({ name }) => name);
console.log('  User names:', userNames);

// Destructure in filter
const youngUsers = users.filter(({ age }) => age < 30);
console.log('  Young users:', youngUsers.map(u => u.name));

// ==================================================
// 14. Advanced: Computed Property Names
// ==================================================

console.log('\n14. Advanced - Computed Property Names:');

const key = 'username';
const obj = { username: 'john_doe', password: 'secret' };

// Destructure with computed property name
const { [key]: value } = obj;
console.log(`  ${key}:`, value);

// ==================================================
// 15. Common Pitfalls
// ==================================================

console.log('\n15. Common Pitfalls:');

//  Destructuring undefined/null
try {
  const { prop } = null; // Error!
} catch (e) {
  console.log('  Error: Cannot destructure null');
}

//  Safe destructuring with default
const data = null;
const { prop = 'default' } = data || {};
console.log('  Safe destructure:', prop);

//  Must wrap object destructuring in statement
// { x, y } = { x: 1, y: 2 }; // Syntax error!
({ x, y } = { x: 1, y: 2 }); //  OK
console.log('  Wrapped destructuring: x =', x, ', y =', y);

// ==================================================
// Best Practices
// ==================================================

console.log('\n16. Best Practices:');
console.log('   Use destructuring for cleaner code');
console.log('   Destructure function parameters');
console.log('   Use default values when appropriate');
console.log('   Rename variables for clarity');
console.log('    Don\'t over-destructure (keep it readable)');
console.log('    Handle undefined/null cases');

console.log('\n=== End of Example 3 ===\n');
