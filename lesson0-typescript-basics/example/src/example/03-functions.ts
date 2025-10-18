// Example 3: Functions

console.log("\n--- 03. Functions ---");

// Function with typed parameters and return type
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("TypeScript"));

// Arrow function
const multiply = (a: number, b: number): number => a * b;
console.log("5 * 3 =", multiply(5, 3));

// Optional parameters
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

console.log(buildName("John"));
console.log(buildName("John", "Doe"));

// Default parameters
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}

console.log("5^2 =", power(5));
console.log("5^3 =", power(5, 3));

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log("Sum of 1,2,3,4,5:", sum(1, 2, 3, 4, 5));

// Function overloading
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("Invalid arguments");
}

console.log("Combine strings:", combine("Hello", "World"));
console.log("Combine numbers:", combine(10, 20));

// Void return type
function logMessage(message: string): void {
  console.log("Log:", message);
}

logMessage("This function returns nothing");

// Never return type (for functions that never return)
function throwError(message: string): never {
  throw new Error(message);
}

// Uncomment to see error:
// throwError("This will throw an error");

// Use the function to avoid unused variable warning
console.log("throwError function is available but commented out for safety");

// Demonstrate the function exists (but don't actually call it)
const errorFunction: (message: string) => never = throwError;
console.log("Error function type:", typeof errorFunction);

// Function type alias
type MathFunc = (a: number, b: number) => number;

const subtract: MathFunc = (a, b) => a - b;
const divide: MathFunc = (a, b) => a / b;

console.log("10 - 3 =", subtract(10, 3));
console.log("10 / 2 =", divide(10, 2));

export { };
