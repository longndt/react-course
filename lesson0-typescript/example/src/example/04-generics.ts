// Example 4: Generics

console.log("\n--- 04. Generics ---");

// Generic function
function identity<T>(value: T): T {
  return value;
}

console.log("Identity string:", identity<string>("Hello"));
console.log("Identity number:", identity<number>(42));
console.log("Identity inferred:", identity(true));

// Generic array function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log("First number:", getFirstElement([1, 2, 3]));
console.log("First string:", getFirstElement(["a", "b", "c"]));

// Generic with multiple type parameters
function createPair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

console.log("Pair:", createPair("name", "John"));
console.log("Pair:", createPair(10, true));

// Generic interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "Hello" };

console.log("Number box:", numberBox);
console.log("String box:", stringBox);

// Generic class
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  removeItem(item: T): void {
    this.data = this.data.filter(i => i !== item);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Apple");
textStorage.addItem("Banana");
textStorage.addItem("Cherry");
console.log("Text storage:", textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.addItem(3);
console.log("Number storage:", numberStorage.getItems());

// Generic constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log("Length:", item.length);
}

logLength("Hello World");
logLength([1, 2, 3, 4, 5]);
logLength({ length: 10 });
// logLength(123); // Error: number doesn't have length

// Generic with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

console.log("Name:", getProperty(person, "name"));
console.log("Age:", getProperty(person, "age"));

export {};
