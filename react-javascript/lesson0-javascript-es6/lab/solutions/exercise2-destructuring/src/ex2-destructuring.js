// ============================================
// Exercise 2: Destructuring Solutions
// ============================================

console.log('=== Exercise 2.1: Object Destructuring ===');

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

// Extract firstName and lastName using destructuring
const { firstName, lastName } = user;

// Extract city from nested address
const { address: { city } } = user;

// Rename email to userEmail
const { email: userEmail } = user;

// Add default value for phone (should be 'N/A')
const { phone = 'N/A' } = user;

console.log('Name:', firstName, lastName);
console.log('City:', city);
console.log('Email:', userEmail);
console.log('Phone:', phone);

console.log('\n=== Exercise 2.2: Array Destructuring ===');

const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

// Extract first and second colors
const [first, second] = colors;

// Skip first two, get third
const [, , third] = colors;

// Get first color and rest in separate array
const [primary, ...rest] = colors;

console.log('First two:', first, second);
console.log('Third:', third);
console.log('Primary:', primary);
console.log('Rest:', rest);

// ============================================
// Additional Example and Learning Points
// ============================================

console.log('\n=== Additional Example ===');

// Object destructuring with multiple properties
const { firstName: fName, lastName: lName, age } = user;
console.log('Renamed properties:', fName, lName, age);

// Array destructuring with default values
const [a, b, c, d = 'default'] = ['x', 'y'];
console.log('Array with defaults:', a, b, c, d);

// Destructuring in function parameters
function greetUser({ firstName, lastName = 'Unknown' }) {
    return `Hello, ${firstName} ${lastName}!`;
}

console.log('Function destructuring:', greetUser(user));
console.log('Function destructuring (partial):', greetUser({ firstName: 'Jane' }));

// Destructuring with rest operator in objects
const { firstName: name, ...userInfo } = user;
console.log('Name:', name);
console.log('Rest of user info:', userInfo);

// Destructuring with rest operator in arrays
const [head, ...tail] = colors;
console.log('Head:', head);
console.log('Tail:', tail);

// ============================================
// Practical Example
// ============================================

console.log('\n=== Practical Example ===');

// API response destructuring
const apiResponse = {
    data: {
        users: [
            { id: 1, name: 'Alice', role: 'admin' },
            { id: 2, name: 'Bob', role: 'user' }
        ],
        pagination: {
            page: 1,
            total: 2
        }
    },
    status: 'success'
};

// Extract users and pagination
const { data: { users, pagination } } = apiResponse;
console.log('Users:', users);
console.log('Pagination:', pagination);

// Function that returns multiple values
function getCoordinates() {
    return [40.7128, -74.0060]; // [lat, lng]
}

const [latitude, longitude] = getCoordinates();
console.log('Coordinates:', latitude, longitude);

// Destructuring in loops
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];

console.log('People ages:');
for (const { name, age } of people) {
    console.log(`${name}: ${age}`);
}

// ============================================
// Advanced Patterns
// ============================================

console.log('\n=== Advanced Patterns ===');

// Nested destructuring with defaults
const config = {
    database: {
        host: 'localhost',
        port: 5432
    }
};

const {
    database: {
        host = 'default-host',
        port = 3306,
        ssl = false
    } = {}
} = config;

console.log('Database config:', { host, port, ssl });

// Destructuring with computed property names
const prop = 'name';
const obj = { name: 'John', age: 30 };
const { [prop]: extractedName } = obj;
console.log('Computed property:', extractedName);

// Destructuring arrays with gaps
const [firstItem, , thirdItem, ...remaining] = [1, 2, 3, 4, 5, 6];
console.log('Array destructuring with gaps:', { firstItem, thirdItem, remaining });

console.log('\n✅ Exercise 2 completed! Check the results above.');
