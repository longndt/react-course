// ============================================
// Exercise 1: Arrow Functions Solutions
// ============================================

console.log('=== Exercise 1.1: Basic Arrow Functions ===');

// Solution 1.1: Convert traditional functions to arrow functions
const greet = (name) => `Hello, ${name}!`;
const add = (a, b) => a + b;
const square = x => x * x;

console.log(greet('Alice')); // Hello, Alice!
console.log(add(5, 3)); // 8
console.log(square(4)); // 16

console.log('\n=== Exercise 1.2: Arrow Functions with Arrays ===');

// Solution 1.2: Use arrow functions with array methods
const numbers = [1, 2, 3, 4, 5];

// Map with arrow function
const doubled = numbers.map(n => n * 2);

// Filter with arrow function
const evens = numbers.filter(n => n % 2 === 0);

// Reduce with arrow function
const sum = numbers.reduce((total, n) => total + n, 0);

console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]
console.log('Evens:', evens); // [2, 4]
console.log('Sum:', sum); // 15

// ============================================
// Additional Example and Learning Points
// ============================================

console.log('\n=== Additional Example ===');

// Multiple parameters need parentheses
const multiply = (a, b) => a * b;

// No parameters need empty parentheses
const getCurrentTime = () => new Date().toISOString();

// Multiple statements need curly braces and explicit return
const complexOperation = (x, y) => {
    const result = x * y;
    console.log(`Calculating ${x} * ${y} = ${result}`);
    return result;
};

// Arrow functions with objects (need parentheses around object literal)
const createUser = (name, age) => ({ name, age, isActive: true });

console.log('Multiply:', multiply(3, 4)); // 12
console.log('Current time:', getCurrentTime());
console.log('Complex operation:', complexOperation(5, 6)); // 30
console.log('Create user:', createUser('John', 25));

// ============================================
// this Binding Example
// ============================================

console.log('\n=== this Binding Example ===');

// Traditional function has its own 'this'
const obj1 = {
    name: 'Object 1',
    traditionalMethod: function () {
        console.log('Traditional method this:', this.name);
    },
    arrowMethod: () => {
        console.log('Arrow method this:', this.name); // 'this' refers to global scope
    }
};

obj1.traditionalMethod(); // "Object 1"
obj1.arrowMethod(); // undefined (or global name if defined)

// Arrow functions inherit 'this' from surrounding scope
const obj2 = {
    name: 'Object 2',
    traditionalMethod: function () {
        console.log('Traditional method this:', this.name);

        // Traditional function creates new 'this' context
        setTimeout(function () {
            console.log('Traditional setTimeout this:', this.name); // undefined
        }, 100);

        // Arrow function inherits 'this' from surrounding scope
        setTimeout(() => {
            console.log('Arrow setTimeout this:', this.name); // "Object 2"
        }, 200);
    }
};

obj2.traditionalMethod();

console.log('\n✅ Exercise 1 completed! Check the results above.');
