// Example 6: Type Guards

console.log("\n--- 06. Type Guards ---");

// 1. typeof type guard
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return `String (uppercase): ${value.toUpperCase()}`;
  } else {
    return `Number (squared): ${value * value}`;
  }
}

console.log(processValue("hello"));
console.log(processValue(5));

// 2. instanceof type guard
class Dog {
  constructor(public name: string) {}
  bark(): void {
    console.log(`${this.name} says: Woof!`);
  }
}

class Cat {
  constructor(public name: string) {}
  meow(): void {
    console.log(`${this.name} says: Meow!`);
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

const myDog = new Dog("Buddy");
const myCat = new Cat("Whiskers");

makeSound(myDog);
makeSound(myCat);

// 3. Custom type guard with type predicate
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    console.log("Swimming...");
    pet.swim();
  } else {
    console.log("Flying...");
    pet.fly();
  }
}

const fish: Fish = {
  swim() {
    console.log("Fish is swimming");
  }
};

const bird: Bird = {
  fly() {
    console.log("Bird is flying");
  }
};

move(fish);
move(bird);

// 4. Discriminated unions (tagged unions)
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 10, height: 5 };
const triangle: Triangle = { kind: "triangle", base: 6, height: 8 };

console.log("Circle area:", calculateArea(circle).toFixed(2));
console.log("Rectangle area:", calculateArea(rectangle));
console.log("Triangle area:", calculateArea(triangle));

// 5. in operator type guard
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type UnknownEmployee = Admin | Employee;

function printEmployeeInfo(emp: UnknownEmployee): void {
  console.log(`Name: ${emp.name}`);

  if ("privileges" in emp) {
    console.log("Privileges:", emp.privileges.join(", "));
  }

  if ("startDate" in emp) {
    console.log("Start Date:", emp.startDate.toLocaleDateString());
  }
}

const admin: Admin = {
  name: "John",
  privileges: ["create-server", "delete-user"]
};

const employee: Employee = {
  name: "Alice",
  startDate: new Date("2023-01-15")
};

printEmployeeInfo(admin);
console.log("---");
printEmployeeInfo(employee);

// 6. Nullish checks
function processString(text: string | null | undefined): string {
  // Type guard for null/undefined
  if (text == null) {
    return "No text provided";
  }
  return text.toUpperCase();
}

console.log(processString("hello"));
console.log(processString(null));
console.log(processString(undefined));

// 7. Array type guards
function sumNumbers(arr: (number | string)[]): number {
  let sum = 0;
  for (const item of arr) {
    if (typeof item === "number") {
      sum += item;
    }
  }
  return sum;
}

console.log("Sum:", sumNumbers([1, "hello", 2, "world", 3]));

export {};
