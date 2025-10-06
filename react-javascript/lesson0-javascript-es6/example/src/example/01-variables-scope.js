/**
 * Example 1: Variables and Scope
 * Modern JavaScript variable declarations: let, const, var
 */

console.log('=== Example 1: Variables and Scope ===\n');

// ==================================================
// 1. VAR (Old way - avoid in modern JavaScript)
// ==================================================

console.log('1. VAR (function-scoped):');

function testVar() {
  var x = 1;

  if (true) {
    var x = 2; // Same variable! (function-scoped)
    console.log('  Inside block:', x); // 2
  }

  console.log('  Outside block:', x); // 2 (modified!)
}

testVar();

// Hoisting with var
console.log('\n  Hoisting with var:');
console.log('  Before declaration:', typeof varVariable); // undefined (not error!)
var varVariable = 'I am hoisted';
console.log('  After declaration:', varVariable);

// ==================================================
// 2. LET (Block-scoped)
// ==================================================

console.log('\n2. LET (block-scoped):');

function testLet() {
  let x = 1;

  if (true) {
    let x = 2; // Different variable! (block-scoped)
    console.log('  Inside block:', x); // 2
  }

  console.log('  Outside block:', x); // 1 (not modified)
}

testLet();

// Let can be reassigned
console.log('\n  Let can be reassigned:');
let count = 0;
console.log('  Initial:', count);
count = 1;
console.log('  After reassignment:', count);

// ==================================================
// 3. CONST (Block-scoped, immutable binding)
// ==================================================

console.log('\n3. CONST (block-scoped, cannot reassign):');

const PI = 3.14159;
console.log('  PI:', PI);

//  Cannot reassign
// PI = 3.14; // Error: Assignment to constant variable

//  BUT: Object properties CAN be modified
const user = { name: 'John', age: 25 };
console.log('  Original user:', user);

user.age = 26; //  OK - modifying property
user.city = 'Hanoi'; //  OK - adding property
console.log('  Modified user:', user);

//  Cannot reassign entire object
// user = { name: 'Jane' }; // Error

// Same with arrays
const colors = ['red', 'green'];
console.log('\n  Original colors:', colors);

colors.push('blue'); //  OK - modifying array
console.log('  After push:', colors);

//  Cannot reassign entire array
// colors = ['yellow']; // Error

// ==================================================
// 4. Temporal Dead Zone (TDZ)
// ==================================================

console.log('\n4. Temporal Dead Zone:');

//  Using let/const before declaration
// console.log(letVariable); // ReferenceError
// let letVariable = 'value';

console.log('  Let/const cannot be accessed before declaration');
console.log('  This is called the Temporal Dead Zone (TDZ)');

// ==================================================
// 5. Best Practices
// ==================================================

console.log('\n5. Best Practices:');
console.log('   Use const by default');
console.log('   Use let when you need to reassign');
console.log('   Avoid var (legacy code only)');

// Example: When to use each
console.log('\n  Examples:');

//  const - value won't change
const MAX_USERS = 100;
const API_URL = 'https://api.example.com';

//  let - value will change
let currentPage = 1;
let isLoading = false;

for (let i = 0; i < 3; i++) {
  //  let - loop counter
  console.log(`  Iteration ${i}`);
}

// ==================================================
// 6. Scope Chain
// ==================================================

console.log('\n6. Scope Chain:');

const globalVar = 'global';

function outer() {
  const outerVar = 'outer';

  function inner() {
    const innerVar = 'inner';

    // Can access all three scopes
    console.log('  Inner scope can access:');
    console.log('    - innerVar:', innerVar);
    console.log('    - outerVar:', outerVar);
    console.log('    - globalVar:', globalVar);
  }

  inner();
}

outer();

console.log('\n=== End of Example 1 ===\n');
