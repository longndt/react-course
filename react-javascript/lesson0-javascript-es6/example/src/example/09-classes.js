/**
 * Example 9: ES6 Classes
 * Object-Oriented Programming in JavaScript
 */

console.log('=== Example 9: ES6 Classes ===\n');

// ==================================================
// 1. Basic Class
// ==================================================

console.log('1. Basic Class:');

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}, ${this.age} years old`;
  }
}

const john = new Person('John', 25);
console.log('  Person:', john.greet());

// ==================================================
// 2. Class Properties
// ==================================================

console.log('\n2. Class Properties:');

class User {
  // Public field (ES2022)
  role = 'user';

  // Private field (ES2022)
  #password = 'secret';

  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  // Public method
  getInfo() {
    return `${this.name} (${this.email})`;
  }

  // Private method
  #validatePassword(password) {
    return password.length >= 8;
  }

  // Public method using private
  changePassword(newPassword) {
    if (this.#validatePassword(newPassword)) {
      this.#password = newPassword;
      return 'Password changed';
    }
    return 'Password too short';
  }
}

const user = new User('Alice', 'alice@example.com');
console.log('  User info:', user.getInfo());
console.log('  Role:', user.role);
console.log('  Change password:', user.changePassword('newpassword123'));
// console.log(user.#password); // Error: Private field

// ==================================================
// 3. Getters and Setters
// ==================================================

console.log('\n3. Getters and Setters:');

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // Getter
  get area() {
    return this.width * this.height;
  }

  // Getter
  get perimeter() {
    return 2 * (this.width + this.height);
  }

  // Setter
  set dimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }
}

const rect = new Rectangle(10, 5);
console.log('  Area:', rect.area); // Called like a property
console.log('  Perimeter:', rect.perimeter);

rect.dimensions = { width: 20, height: 10 }; // Setter
console.log('  New area:', rect.area);

// ==================================================
// 4. Static Methods
// ==================================================

console.log('\n4. Static Methods:');

class MathHelper {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static circleArea(radius) {
    return MathHelper.PI * radius * radius;
  }
}

// Call without creating instance
console.log('  Add:', MathHelper.add(5, 3));
console.log('  Multiply:', MathHelper.multiply(4, 7));
console.log('  Circle area:', MathHelper.circleArea(5));
console.log('  PI:', MathHelper.PI);

// ==================================================
// 5. Inheritance - extends
// ==================================================

console.log('\n5. Inheritance with extends:');

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }

  move() {
    return `${this.name} moves`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  // Override method
  speak() {
    return `${this.name} barks!`;
  }

  // New method
  fetch() {
    return `${this.name} fetches the ball`;
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
console.log('  Speak:', dog.speak());
console.log('  Move:', dog.move()); // Inherited
console.log('  Fetch:', dog.fetch());
console.log('  Breed:', dog.breed);

// ==================================================
// 6. Super Keyword
// ==================================================

console.log('\n6. Using super keyword:');

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  getAnnualSalary() {
    return this.salary * 12;
  }
}

class Manager extends Employee {
  constructor(name, salary, department) {
    super(name, salary); // Must call super first!
    this.department = department;
  }

  getAnnualSalary() {
    const base = super.getAnnualSalary(); // Call parent method
    const bonus = this.salary * 2; // 2 months bonus
    return base + bonus;
  }
}

const manager = new Manager('Sarah', 5000, 'Engineering');
console.log('  Annual salary:', manager.getAnnualSalary());
console.log('  Department:', manager.department);

// ==================================================
// 7. instanceof Operator
// ==================================================

console.log('\n7. instanceof operator:');

console.log('  dog instanceof Dog:', dog instanceof Dog);
console.log('  dog instanceof Animal:', dog instanceof Animal);
console.log('  dog instanceof Object:', dog instanceof Object);
console.log('  manager instanceof Manager:', manager instanceof Manager);
console.log('  manager instanceof Employee:', manager instanceof Employee);

// ==================================================
// 8. Practical Example - React Component Pattern
// ==================================================

console.log('\n8. React Component Pattern (Class Components):');

class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    console.log('  State updated:', this.state);
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return `Count: ${this.state.count}`;
  }
}

const counter = new Counter({ initialCount: 0 });
console.log('  Initial:', counter.render());
counter.increment();
counter.increment();
console.log('  After increment:', counter.render());

// ==================================================
// 9. Practical Example - Data Models
// ==================================================

console.log('\n9. Data Models:');

class Task {
  static nextId = 1;

  constructor(title, description) {
    this.id = Task.nextId++;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
  }

  complete() {
    this.completed = true;
  }

  uncomplete() {
    this.completed = false;
  }

  update(data) {
    Object.assign(this, data);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }
}

const task1 = new Task('Learn JavaScript', 'Complete ES6+ tutorial');
const task2 = new Task('Build app', 'Create React app');

console.log('  Task 1:', task1.toJSON());
task1.complete();
console.log('  Task 1 completed:', task1.completed);
console.log('  Task 2 ID:', task2.id);

// ==================================================
// 10. Practical Example - API Client
// ==================================================

console.log('\n10. API Client:');

class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  setAuthToken(token) {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  async get(endpoint) {
    // Simulated GET request
    console.log(`  GET ${this.baseURL}${endpoint}`);
    return { data: [] };
  }

  async post(endpoint, data) {
    // Simulated POST request
    console.log(`  POST ${this.baseURL}${endpoint}`, data);
    return { success: true };
  }
}

const api = new APIClient('https://api.example.com');
api.setAuthToken('abc123');
api.get('/users');
api.post('/users', { name: 'John' });

// ==================================================
// 11. Method Chaining
// ==================================================

console.log('\n11. Method Chaining:');

class QueryBuilder {
  constructor() {
    this.query = '';
  }

  select(fields) {
    this.query += `SELECT ${fields} `;
    return this; // Return this for chaining
  }

  from(table) {
    this.query += `FROM ${table} `;
    return this;
  }

  where(condition) {
    this.query += `WHERE ${condition} `;
    return this;
  }

  build() {
    return this.query.trim();
  }
}

const query = new QueryBuilder()
  .select('*')
  .from('users')
  .where('age > 18')
  .build();

console.log('  Query:', query);

// ==================================================
// 12. Multiple Inheritance (Mixins)
// ==================================================

console.log('\n12. Mixins (Multiple Inheritance Pattern):');

// Mixin functions
const CanEat = {
  eat(food) {
    return `${this.name} is eating ${food}`;
  }
};

const CanWalk = {
  walk() {
    return `${this.name} is walking`;
  }
};

const CanSwim = {
  swim() {
    return `${this.name} is swimming`;
  }
};

class Duck {
  constructor(name) {
    this.name = name;
  }
}

// Apply mixins
Object.assign(Duck.prototype, CanEat, CanWalk, CanSwim);

const duck = new Duck('Donald');
console.log(' ', duck.eat('bread'));
console.log(' ', duck.walk());
console.log(' ', duck.swim());

// ==================================================
// 13. Abstract Pattern (No native abstract classes)
// ==================================================

console.log('\n13. Abstract Pattern:');

class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('Cannot instantiate abstract class');
    }
  }

  area() {
    throw new Error('Method area() must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
console.log('  Circle area:', circle.area().toFixed(2));

// This would throw error:
// const shape = new Shape();

// ==================================================
// 14. Class vs Factory Function
// ==================================================

console.log('\n14. Class vs Factory Function:');

// Using class
class PersonClass {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

// Using factory function
function createPerson(name) {
  return {
    name,
    greet() {
      return `Hello, ${name}`;
    }
  };
}

const p1 = new PersonClass('John');
const p2 = createPerson('Jane');

console.log('  Class:', p1.greet());
console.log('  Factory:', p2.greet());

// ==================================================
// 15. When to Use Classes
// ==================================================

console.log('\n15. When to Use Classes:');
console.log(`
   Use classes when:
  - You need inheritance
  - You need private fields
  - You want a clear OOP structure
  - Building React class components (legacy)
  - Creating data models

    Consider alternatives when:
  - Simple data structures (use objects)
  - Functional programming preferred
  - No need for inheritance
  - Using React hooks (functional components)
`);

// ==================================================
// 16. Best Practices
// ==================================================

console.log('\n16. Best Practices:');
console.log('   Use class for complex objects with behavior');
console.log('   Use static methods for utilities');
console.log('   Use getters/setters for computed properties');
console.log('   Use private fields for encapsulation');
console.log('   Call super() first in constructor');
console.log('    Don\'t overuse inheritance');
console.log('    Prefer composition over inheritance');
console.log('    Keep classes focused (Single Responsibility)');

console.log('\n=== End of Example 9 ===\n');
console.log(' Note: React now prefers functional components with hooks over class components!');
