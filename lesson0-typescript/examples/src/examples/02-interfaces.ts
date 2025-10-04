// Example 2: Interfaces

console.log("\n--- 02. Interfaces ---");

// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Readonly property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
};

console.log("User:", user);

// Interface with methods
interface Product {
  id: number;
  name: string;
  price: number;
  calculateDiscount(percent: number): number;
}

const laptop: Product = {
  id: 1,
  name: "Gaming Laptop",
  price: 1500,
  calculateDiscount(percent: number): number {
    return this.price * (percent / 100);
  }
};

console.log("Laptop:", laptop.name);
console.log("10% discount:", laptop.calculateDiscount(10));

// Extending interfaces
interface Person {
  name: string;
  age: number;
}

interface Student extends Person {
  studentId: string;
  major: string;
}

const student: Student = {
  name: "Alice",
  age: 20,
  studentId: "S12345",
  major: "Computer Science"
};

console.log("Student:", student);

// Interface for function types
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

console.log("Add 5 + 3:", add(5, 3));
console.log("Multiply 5 * 3:", multiply(5, 3));

// Type alias vs Interface
type Point = {
  x: number;
  y: number;
};

const coordinate: Point = { x: 10, y: 20 };
console.log("Coordinate:", coordinate);

export {};
