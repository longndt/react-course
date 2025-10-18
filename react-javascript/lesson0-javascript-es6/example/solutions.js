// ============================================
// Exercise 1: Arrow Functions Solutions
// ============================================

console.log('=== Exercise 1.1: Basic Arrow Functions ===');

// Solution 1.1
const greet = (name) => `Hello, ${name}!`;
const add = (a, b) => a + b;
const square = x => x * x;

console.log(greet('Alice')); // Hello, Alice!
console.log(add(5, 3)); // 8
console.log(square(4)); // 16

console.log('\n=== Exercise 1.2: Arrow Functions with Arrays ===');

// Solution 1.2
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((total, n) => total + n, 0);

console.log('Doubled:', doubled);
console.log('Evens:', evens);
console.log('Sum:', sum);

// ============================================
// Exercise 2: Destructuring Solutions
// ============================================

console.log('\n=== Exercise 2.1: Object Destructuring ===');

const user = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john@example.com',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Extract firstName and lastName
const { firstName, lastName } = user;

// Extract nested city
const { address: { city } } = user;

// Rename email
const { email: userEmail } = user;

// Default value for phone
const { phone = 'N/A' } = user;

console.log('Name:', firstName, lastName);
console.log('City:', city);
console.log('Email:', userEmail);
console.log('Phone:', phone);

console.log('\n=== Exercise 2.2: Array Destructuring ===');

const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

// First two colors
const [first, second] = colors;

// Skip first two, get third
const [, , third] = colors;

// First and rest
const [primary, ...rest] = colors;

console.log('First two:', first, second);
console.log('Third:', third);
console.log('Primary:', primary);
console.log('Rest:', rest);

// ============================================
// Exercise 3: Template Literals Solutions
// ============================================

console.log('\n=== Exercise 3.1: String Interpolation ===');

const product = {
  name: 'Laptop',
  brand: 'TechBrand',
  price: 999.99,
  discount: 0.1
};

const description = `${product.brand} ${product.name} - $${product.price}`;
const finalPrice = product.price * (1 - product.discount);
const priceMessage = `Final price: $${finalPrice.toFixed(2)} (${product.discount * 100}% off)`;

console.log(description);
console.log(priceMessage);

console.log('\n=== Exercise 3.2: Multi-line Strings ===');

const userData = {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'Developer'
};

const emailTemplate = `Dear ${userData.name},

Welcome to our platform!

Your account details:
- Email: ${userData.email}
- Role: ${userData.role}

Best regards,
The Team`;

console.log(emailTemplate);

// ============================================
// Exercise 4: Spread & Rest Operators Solutions
// ============================================

console.log('\n=== Exercise 4.1: Spread Operator ===');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];

// Extended array
const extended = [0, ...arr1, 7];

const userObj = { name: 'John', age: 30 };
const updates = { age: 31, city: 'NYC' };

// Merge objects
const updatedUser = { ...userObj, ...updates };

console.log('Combined:', combined);
console.log('Extended:', extended);
console.log('Updated user:', updatedUser);

console.log('\n=== Exercise 4.2: Rest Parameters ===');

// Calculate average
function calculateAverage(...numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((total, n) => total + n, 0);
  return sum / numbers.length;
}

// Greet all
function greetAll(greeting, ...names) {
  if (names.length === 0) return greeting;
  if (names.length === 1) return `${greeting}, ${names[0]}!`;
  const lastPerson = names.pop();
  return `${greeting}, ${names.join(', ')}, and ${lastPerson}!`;
}

console.log('Average:', calculateAverage(1, 2, 3, 4, 5));
console.log(greetAll('Hello', 'Alice', 'Bob', 'Charlie'));

// ============================================
// Exercise 5: Array Methods Solutions
// ============================================

console.log('\n=== Exercise 5.1: Working with User Data ===');

const users = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
  { id: 4, name: 'David', age: 28, active: true },
  { id: 5, name: 'Eve', age: 32, active: false }
];

// Get names
const names = users.map(u => u.name);

// Get active users
const activeUsers = users.filter(u => u.active);

// Find user with id 3
const user3 = users.find(u => u.id === 3);

// Check if any user is over 30
const hasOldUsers = users.some(u => u.age > 30);

// Check if all users are active
const allActive = users.every(u => u.active);

// Calculate average age
const averageAge = users.reduce((sum, u) => sum + u.age, 0) / users.length;

console.log('Names:', names);
console.log('Active users:', activeUsers.map(u => u.name));
console.log('User 3:', user3.name);
console.log('Has users over 30?', hasOldUsers);
console.log('All active?', allActive);
console.log('Average age:', averageAge);

console.log('\n=== Exercise 5.2: Shopping Cart ===');

const cart = [
  { name: 'Book', price: 12.99, quantity: 2 },
  { name: 'Pen', price: 1.99, quantity: 5 },
  { name: 'Notebook', price: 3.99, quantity: 3 }
];

// Calculate total
const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// Get bulk items
const bulkItems = cart.filter(item => item.quantity > 2);

// Create summaries
const summaries = cart.map(item =>
  `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`
);

console.log('Total:', `$${total.toFixed(2)}`);
console.log('Bulk items:', bulkItems.map(i => i.name));
console.log('Summaries:', summaries);

// ============================================
// Exercise 6: Async/Await Solutions
// ============================================

console.log('\n=== Exercise 6.1: Simulated API Calls ===');

// Simulated API functions
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User${id}`, email: `user${id}@example.com` });
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId },
        { id: 2, title: 'Post 2', userId }
      ]);
    }, 1000);
  });
}

// Get user with posts
async function getUserWithPosts(userId) {
  const user = await fetchUser(userId);
  const posts = await fetchPosts(userId);
  return { user, posts };
}

// Safe get user
async function safeGetUser(userId) {
  try {
    const user = await fetchUser(userId);
    return user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

console.log('Fetching user...');
getUserWithPosts(1).then(result => {
  console.log('Result:', result);
});

console.log('\n=== Exercise 6.2: Parallel Requests ===');

// Get all users in parallel
async function getAllUsers() {
  const userPromises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ];
  const users = await Promise.all(userPromises);
  return users;
}

console.log('Fetching all users...');
getAllUsers().then(allUsers => {
  console.log('All users:', allUsers);
});

// ============================================
// Exercise 7: Optional Chaining & Nullish Coalescing Solutions
// ============================================

console.log('\n=== Exercise 7.1: Safe Property Access ===');

const data = {
  user: {
    name: 'John',
    profile: {
      bio: 'Developer'
    }
  }
};

// Safe access
const bio = data?.user?.profile?.bio;
const age = data?.user?.age;
const cityName = data?.user?.address?.city ?? 'Unknown';

console.log('Bio:', bio);
console.log('Age:', age);
console.log('City:', cityName);

console.log('\n=== Exercise 7.2: Default Values ===');

function displayUser(user) {
  const name = user?.name ?? 'Guest';
  const role = user?.role ?? 'User';
  const status = user?.status ?? 'Offline';

  return `${name} (${role}) - ${status}`;
}

console.log(displayUser({ name: 'Alice', role: 'Admin' }));
console.log(displayUser({ name: 'Bob' }));
console.log(displayUser({}));

// ============================================
// Bonus Challenge: UserManager Class Solution
// ============================================

console.log('\n=== Bonus Challenge: UserManager ===');

class UserManager {
  constructor() {
    this.users = [];
  }

  // Add user
  addUser(user) {
    this.users = [...this.users, { ...user }];
  }

  // Get user by id
  getUser(id) {
    return this.users.find(u => u.id === id);
  }

  // Update user
  updateUser(id, updates) {
    this.users = this.users.map(u =>
      u.id === id ? { ...u, ...updates } : u
    );
  }

  // Get active users
  getActiveUsers() {
    return this.users.filter(u => u.active);
  }

  // Get user summaries
  getUserSummaries() {
    return this.users.map(u =>
      `${u.name} (${u.active ? 'Active' : 'Inactive'})`
    );
  }
}

// Test UserManager
const manager = new UserManager();
manager.addUser({ id: 1, name: 'Alice', active: true });
manager.addUser({ id: 2, name: 'Bob', active: false });
manager.updateUser(1, { name: 'Alice Smith' });

console.log('All users:', manager.users);
console.log('User 1:', manager.getUser(1));
console.log('Active users:', manager.getActiveUsers());
console.log('Summaries:', manager.getUserSummaries());

console.log('\n✅ All exercises completed! Check the results above.');
