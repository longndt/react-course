/**
 * Example 4: Spread and Rest Operators
 * The ... operator in JavaScript
 */

console.log('=== Example 4: Spread & Rest Operators ===\n');

// ==================================================
// 1. Spread Operator - Arrays
// ==================================================

console.log('1. Spread Operator with Arrays:');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

//  Old way - concat
const combined1 = arr1.concat(arr2);

//  Spread operator
const combined = [...arr1, ...arr2];
console.log('  Combined:', combined);

// Add elements while spreading
const withExtra = [...arr1, 99, ...arr2];
console.log('  With extra:', withExtra);

// ==================================================
// 2. Copying Arrays
// ==================================================

console.log('\n2. Copying Arrays:');

const original = [1, 2, 3];

//  This creates a reference, not a copy!
const reference = original;
reference.push(4);
console.log('  Original (modified!):', original);

//  Create a real copy with spread
const copy = [...original];
copy.push(5);
console.log('  Copy:', copy);
console.log('  Original (not modified):', original);

// ==================================================
// 3. Spread Operator - Objects
// ==================================================

console.log('\n3. Spread Operator with Objects:');

const user = {
  name: 'John',
  age: 25,
  email: 'john@example.com'
};

// Copy object
const userCopy = { ...user };
console.log('  User copy:', userCopy);

// Update properties
const updatedUser = { ...user, age: 26 };
console.log('  Updated user:', updatedUser);

// Add new properties
const userWithCity = { ...user, city: 'Hanoi' };
console.log('  User with city:', userWithCity);

// ==================================================
// 4. Merging Objects
// ==================================================

console.log('\n4. Merging Objects:');

const defaults = {
  theme: 'light',
  language: 'en',
  fontSize: 14
};

const userPrefs = {
  language: 'vi',
  fontSize: 16
};

// Later properties override earlier ones
const config = { ...defaults, ...userPrefs };
console.log('  Config:', config);

// ==================================================
// 5. Rest Parameters in Functions
// ==================================================

console.log('\n5. Rest Parameters in Functions:');

// Collect all arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log('  sum(1, 2, 3):', sum(1, 2, 3));
console.log('  sum(1, 2, 3, 4, 5):', sum(1, 2, 3, 4, 5));

// Combine with regular parameters
function multiply(multiplier, ...numbers) {
  return numbers.map(num => num * multiplier);
}

console.log('  multiply(2, 1, 2, 3):', multiply(2, 1, 2, 3));
console.log('  multiply(3, 5, 10, 15):', multiply(3, 5, 10, 15));

// ==================================================
// 6. Rest with Destructuring
// ==================================================

console.log('\n6. Rest with Destructuring:');

// Arrays
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log('  First:', first);
console.log('  Second:', second);
console.log('  Rest:', rest);

// Objects
const person = {
  name: 'John',
  age: 25,
  city: 'Hanoi',
  country: 'Vietnam',
  email: 'john@example.com'
};

const { name, age, ...otherInfo } = person;
console.log('  Name:', name);
console.log('  Age:', age);
console.log('  Other info:', otherInfo);

// ==================================================
// 7. Practical Example - State Updates (React)
// ==================================================

console.log('\n7. Practical Example - State Updates:');

// Immutable state update
let state = {
  user: { name: 'John', age: 25 },
  theme: 'dark',
  language: 'en'
};

console.log('  Initial state:', state);

//  Don't mutate directly
// state.user.age = 26; // Bad!

//  Create new state object
state = {
  ...state,
  user: { ...state.user, age: 26 }
};

console.log('  Updated state:', state);

// ==================================================
// 8. Practical Example - Array Operations
// ==================================================

console.log('\n8. Practical Example - Array Operations:');

let todos = [
  { id: 1, text: 'Learn JavaScript', done: true },
  { id: 2, text: 'Learn React', done: false }
];

console.log('  Initial todos:', todos);

// Add todo
todos = [...todos, { id: 3, text: 'Build app', done: false }];
console.log('  After add:', todos.length, 'todos');

// Update todo
todos = todos.map(todo =>
  todo.id === 2 ? { ...todo, done: true } : todo
);
console.log('  After update:', todos.find(t => t.id === 2));

// Remove todo
todos = todos.filter(todo => todo.id !== 1);
console.log('  After remove:', todos.length, 'todos');

// ==================================================
// 9. Practical Example - Function Arguments
// ==================================================

console.log('\n9. Practical Example - Function Arguments:');

function createUser(name, age, ...options) {
  const user = { name, age };

  // Process additional options
  options.forEach(([key, value]) => {
    user[key] = value;
  });

  return user;
}

const newUser = createUser(
  'John',
  25,
  ['email', 'john@example.com'],
  ['city', 'Hanoi'],
  ['active', true]
);

console.log('  Created user:', newUser);

// ==================================================
// 10. Practical Example - Combining Arrays
// ==================================================

console.log('\n10. Practical Example - Combining Arrays:');

const frontend = ['React', 'Vue', 'Angular'];
const backend = ['Node.js', 'Express', 'MongoDB'];
const tools = ['Git', 'VS Code'];

const allSkills = [...frontend, ...backend, ...tools];
console.log('  All skills:', allSkills);

// Insert in middle
const technologiesWithDesign = [
  ...frontend,
  'Figma',
  'Adobe XD',
  ...backend
];
console.log('  With design tools:', technologiesWithDesign);

// ==================================================
// 11. Nested Object Updates
// ==================================================

console.log('\n11. Nested Object Updates:');

const appState = {
  user: {
    profile: {
      name: 'John',
      email: 'john@example.com'
    },
    preferences: {
      theme: 'dark',
      notifications: true
    }
  },
  session: {
    loggedIn: true,
    timestamp: Date.now()
  }
};

// Update nested property
const newAppState = {
  ...appState,
  user: {
    ...appState.user,
    profile: {
      ...appState.user.profile,
      email: 'newemail@example.com'
    }
  }
};

console.log('  New email:', newAppState.user.profile.email);
console.log('  Theme unchanged:', newAppState.user.preferences.theme);

// ==================================================
// 12. Spreading Function Arguments
// ==================================================

console.log('\n12. Spreading Function Arguments:');

function greet(firstName, lastName, age) {
  return `Hello, I'm ${firstName} ${lastName}, ${age} years old`;
}

const userData = ['John', 'Doe', 25];

//  Spread array as arguments
const greeting = greet(...userData);
console.log(' ', greeting);

// Math operations
const nums = [5, 2, 9, 1, 7];
console.log('  Max:', Math.max(...nums));
console.log('  Min:', Math.min(...nums));

// ==================================================
// 13. Conditional Spreading
// ==================================================

console.log('\n13. Conditional Spreading:');

const isAdmin = true;
const isPremium = false;

const userPermissions = {
  read: true,
  write: true,
  ...(isAdmin && { delete: true, admin: true }),
  ...(isPremium && { premium: true, adsRemoved: true })
};

console.log('  User permissions:', userPermissions);

// ==================================================
// 14. Removing Properties
// ==================================================

console.log('\n14. Removing Properties:');

const fullUser = {
  id: 1,
  name: 'John',
  password: 'secret123',
  email: 'john@example.com'
};

// Remove password
const { password, ...safeUser } = fullUser;
console.log('  Safe user (no password):', safeUser);

// ==================================================
// 15. Array Deduplication
// ==================================================

console.log('\n15. Array Deduplication:');

const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];

// Remove duplicates using Set + spread
const unique = [...new Set(duplicates)];
console.log('  Unique values:', unique);

// ==================================================
// 16. Best Practices
// ==================================================

console.log('\n16. Best Practices:');
console.log('   Use spread for immutable updates');
console.log('   Use spread to copy arrays/objects');
console.log('   Use rest for flexible function parameters');
console.log('    Spread creates shallow copies only');
console.log('    Use rest parameter as last parameter');
console.log('    Don\'t spread large arrays (performance)');

// Shallow copy warning
console.log('\n  Warning - Shallow Copy:');
const nested = { a: { b: { c: 1 } } };
const shallowCopy = { ...nested };
shallowCopy.a.b.c = 2; // Modifies original!
console.log('    Original modified:', nested.a.b.c);

console.log('\n=== End of Example 4 ===\n');
