/**
 * utils.js - Named Exports
 * Multiple utility functions exported individually
 */

// Named export - can have multiple per file
export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

// Constants
export const PI = 3.14159;
export const E = 2.71828;

// Can also export like this:
const square = (x) => x * x;
const cube = (x) => x * x * x;

export { square, cube };

// Export with rename
const powerOfTwo = (x) => Math.pow(2, x);
export { powerOfTwo as pow2 };
