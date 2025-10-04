// Example 1: Basic Types

console.log("\n--- 01. Basic Types ---");

// Primitive types
let userName: string = "John Doe";
let userAge: number = 25;
let isActive: boolean = true;

console.log("User:", { userName, userAge, isActive });

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

console.log("Numbers:", numbers);
console.log("Names:", names);

// Tuples
let person: [string, number, boolean] = ["Alice", 30, true];
console.log("Person tuple:", person);

// Enums
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

let currentRole: UserRole = UserRole.Admin;
console.log("Current role:", currentRole);

// Type inference
let inferredString = "TypeScript infers this as string";
let inferredNumber = 42; // TypeScript infers as number
let inferredBoolean = true; // TypeScript infers as boolean

console.log("Inferred types:", { inferredString, inferredNumber, inferredBoolean });

// Union types
let id: string | number;
id = "user123";
console.log("ID as string:", id);
id = 12345;
console.log("ID as number:", id);

// Literal types
let status: "pending" | "approved" | "rejected" = "pending";
console.log("Status:", status);

// Type: any (avoid when possible)
let anything: any = "can be anything";
anything = 123;
anything = true;
console.log("Any type (avoid!):", anything);

export {};
