/**
 * Example 2: Arrow Functions
 * Modern function syntax in JavaScript ES6+
 */

console.log('=== Example 2: Arrow Functions ===\n');

// ==================================================
// 1. Basic Syntax
// ==================================================

console.log('1. Basic Syntax:');

// Traditional function
function addTraditional(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

console.log('  Traditional:', addTraditional(2, 3));
console.log('  Arrow:', addArrow(2, 3));

// ==================================================
// 2. Variations
// ==================================================

console.log('\n2. Arrow Function Variations:');

// No parameters
const sayHello = () => 'Hello!';
console.log('  No params:', sayHello());

// One parameter (parentheses optional)
const double = x => x * 2;
console.log('  One param:', double(5));

// Multiple parameters (parentheses required)
const multiply = (a, b) => a * b;
console.log('  Multiple params:', multiply(3, 4));

// Multiple statements (need curly braces and return)
const greet = name => {
  const message = `Hello, ${name}!`;
  return message;
};
console.log('  Multiple statements:', greet('John'));

// Returning an object (need parentheses)
const createUser = (name, age) => ({ name, age });
console.log('  Return object:', createUser('John', 25));

// ==================================================
// 3. THIS Binding (Most Important Difference!)
// ==================================================

console.log('\n3. THIS Binding:');

const person = {
  name: 'John',
  age: 25,

  // Traditional function - 'this' is the object
  greetTraditional: function() {
    console.log(`  Traditional: My name is ${this.name}`);
  },

  // Arrow function - 'this' is from parent scope
  greetArrow: () => {
    //  'this' is NOT the person object!
    console.log(`  Arrow: My name is ${this.name}`);
  },

  // Correct usage in methods
  sayHello: function() {
    // Use traditional function for method
    setTimeout(function() {
      //  'this' is undefined/window
      // console.log(`Traditional timeout: ${this.name}`);
    }, 0);

    setTimeout(() => {
      //  Arrow function inherits 'this' from sayHello
      console.log(`  Arrow timeout: My name is ${this.name}`);
    }, 0);
  }
};

person.greetTraditional(); //  Works
person.greetArrow();        //  'this' is undefined
person.sayHello();          //  Arrow function in timeout works

// ==================================================
// 4. Use Cases
// ==================================================

console.log('\n4. Common Use Cases:');

// Array methods (most common use case!)
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log('  map:', doubled);

const evens = numbers.filter(n => n % 2 === 0);
console.log('  filter:', evens);

const sum = numbers.reduce((total, n) => total + n, 0);
console.log('  reduce:', sum);

// Event handlers (careful with 'this'!)
const button = {
  text: 'Click me',

  //  Use arrow function to preserve 'this'
  handleClick: () => {
    // In real DOM event, you'd do:
    // element.addEventListener('click', () => {
    //   console.log(this.text);
    // });
  }
};

// ==================================================
// 5. When NOT to use arrow functions
// ==================================================

console.log('\n5. When NOT to use arrow functions:');

const examples = {
  name: 'Examples',

  //  Object methods (need 'this')
  // method: () => {
  //   console.log(this.name); // Won't work!
  // },

  //  Use traditional function
  method: function() {
    console.log('  Method:', this.name);
  }
};

examples.method();

//  Don't use for constructors
// const Person = (name) => {
//   this.name = name; // Error: Arrow functions cannot be constructors
// };

//  Use class or traditional function
function Person(name) {
  this.name = name;
}

// ==================================================
// 6. Practical Examples
// ==================================================

console.log('\n6. Practical Examples:');

// API calls
const fetchUser = async (id) => {
  // Simulated API call
  return { id, name: 'John', email: 'john@example.com' };
};

// Event handlers
const users = ['John', 'Jane', 'Bob'];
const userElements = users.map((user, index) =>
  `<div key="${index}">${user}</div>`
);
console.log('  User elements:', userElements);

// Filtering and transforming data
const products = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Phone', price: 500, inStock: false },
  { name: 'Tablet', price: 300, inStock: true }
];

const availableProducts = products
  .filter(p => p.inStock)
  .map(p => p.name);
console.log('  Available products:', availableProducts);

// ==================================================
// 7. Best Practices
// ==================================================

console.log('\n7. Best Practices:');
console.log('   Use arrow functions for:');
console.log('    - Array methods (map, filter, reduce)');
console.log('    - Callbacks that need parent scope');
console.log('    - Short, simple functions');
console.log('   Avoid arrow functions for:');
console.log('    - Object methods (when you need this)');
console.log('    - Constructors');
console.log('    - Functions using arguments object');

console.log('\n=== End of Example 2 ===\n');
