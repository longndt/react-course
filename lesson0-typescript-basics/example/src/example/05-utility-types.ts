// Example 5: Utility Types

console.log("\n--- 05. Utility Types ---");

// Base interface for examples
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  isActive: boolean;
}

// 1. Partial<T> - Make all properties optional
type PartialUser = Partial<User>;

const updateUser: PartialUser = {
  email: "newemail@example.com" // Only updating email
};

console.log("Partial update:", updateUser);

// 2. Required<T> - Make all properties required
interface Config {
  host?: string;
  port?: number;
  timeout?: number;
}

type RequiredConfig = Required<Config>;

const config: RequiredConfig = {
  host: "localhost",
  port: 3000,
  timeout: 5000 // All are now required
};

console.log("Required config:", config);

// 3. Readonly<T> - Make all properties readonly
type ReadonlyUser = Readonly<User>;

const immutableUser: ReadonlyUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "secret",
  age: 25,
  isActive: true
};

// immutableUser.email = "new@example.com"; // Error: Cannot assign to 'email'
console.log("Readonly user:", immutableUser);

// 4. Pick<T, K> - Pick specific properties
type UserPreview = Pick<User, "id" | "name" | "email">;

const preview: UserPreview = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

console.log("User preview:", preview);

// 5. Omit<T, K> - Omit specific properties
type PublicUser = Omit<User, "password">;

const publicProfile: PublicUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 25,
  isActive: true
  // No password property
};

console.log("Public profile:", publicProfile);

// 6. Record<K, T> - Create object type with specific keys and values
type UserRole = "admin" | "user" | "guest";
type Permissions = Record<UserRole, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

console.log("Permissions:", permissions);

// 7. Extract<T, U> - Extract types from union
type AllStatus = "pending" | "approved" | "rejected" | "cancelled";
type ActiveStatus = Extract<AllStatus, "pending" | "approved">;

const status1: ActiveStatus = "pending";
const status2: ActiveStatus = "approved";
// const status3: ActiveStatus = "cancelled"; // Error

console.log("Active statuses:", { status1, status2 });

// 8. Exclude<T, U> - Exclude types from union
type InactiveStatus = Exclude<AllStatus, "pending" | "approved">;

const status4: InactiveStatus = "rejected";
const status5: InactiveStatus = "cancelled";
// const status6: InactiveStatus = "pending"; // Error

console.log("Inactive statuses:", { status4, status5 });

// 9. NonNullable<T> - Exclude null and undefined
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;

const value: DefinitelyString = "Hello";
// const value2: DefinitelyString = null; // Error

console.log("Non-nullable value:", value);

// 10. ReturnType<T> - Get return type of function
function createUser() {
  return {
    id: 1,
    name: "John",
    email: "john@example.com"
  };
}

type UserReturnType = ReturnType<typeof createUser>;

const newUser: UserReturnType = {
  id: 2,
  name: "Alice",
  email: "alice@example.com"
};

console.log("User from return type:", newUser);

export {};
