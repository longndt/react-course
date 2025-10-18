// ============================================
// Exercise 4: Spread & Rest Operators Solutions
// ============================================

console.log('=== Exercise 4.1: Spread Operator ===');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays using spread
const combined = [...arr1, ...arr2];

// Create array with 0 at start, arr1, then 7 at end
const extended = [0, ...arr1, 7];

const user = { name: 'John', age: 30 };
const updates = { age: 31, city: 'NYC' };

// Merge objects (updates should override user)
const updatedUser = { ...user, ...updates };

console.log('Combined:', combined);
console.log('Extended:', extended);
console.log('Updated user:', updatedUser);

console.log('\n=== Exercise 4.2: Rest Parameters ===');

// Create function that accepts any number of arguments
// and returns their average
function calculateAverage(...numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((total, n) => total + n, 0);
    return sum / numbers.length;
}

// Create function with first parameter as greeting
// and rest as names, return greeting with all names
function greetAll(greeting, ...names) {
    if (names.length === 0) return greeting;
    if (names.length === 1) return `${greeting}, ${names[0]}!`;
    const lastPerson = names.pop();
    return `${greeting}, ${names.join(', ')}, and ${lastPerson}!`;
}

console.log('Average:', calculateAverage(1, 2, 3, 4, 5)); // 3
console.log(greetAll('Hello', 'Alice', 'Bob', 'Charlie'));
// "Hello, Alice, Bob, and Charlie!"

// ============================================
// Additional Examples and Learning Points
// ============================================

console.log('\n=== Additional Examples ===');

// Array spreading examples
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray]; // Shallow copy
const arrayWithNewElement = [...originalArray, 4, 5];
const arrayInMiddle = [0, ...originalArray, 4];

console.log('Original array:', originalArray);
console.log('Copied array:', copiedArray);
console.log('Array with new elements:', arrayWithNewElement);
console.log('Array in middle:', arrayInMiddle);

// Object spreading examples
const baseConfig = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3
};

const devConfig = {
    ...baseConfig,
    apiUrl: 'https://dev-api.example.com',
    debug: true
};

const prodConfig = {
    ...baseConfig,
    timeout: 10000,
    retries: 5
};

console.log('Base config:', baseConfig);
console.log('Dev config:', devConfig);
console.log('Prod config:', prodConfig);

// ============================================
// Advanced Spread and Rest Patterns
// ============================================

console.log('\n=== Advanced Patterns ===');

// Rest parameters with destructuring
function processUser({ name, age, ...otherProps }) {
    console.log(`Processing user: ${name}, age ${age}`);
    console.log('Other properties:', otherProps);
    return { name, age, processed: true, ...otherProps };
}

const userData = {
    name: 'Alice',
    age: 25,
    email: 'alice@example.com',
    role: 'admin',
    preferences: { theme: 'dark' }
};

const processedUser = processUser(userData);
console.log('Processed user:', processedUser);

// Spread with function calls
function sum(a, b, c) {
    return a + b + c;
}

const numbers = [1, 2, 3];
const result = sum(...numbers);
console.log('Spread with function call:', result);

// Rest with array destructuring
const [first, second, ...remaining] = [1, 2, 3, 4, 5, 6];
console.log('First:', first);
console.log('Second:', second);
console.log('Remaining:', remaining);

// ============================================
// Practical Examples
// ============================================

console.log('\n=== Practical Examples ===');

// State management pattern (React-like)
function updateState(currentState, updates) {
    return { ...currentState, ...updates };
}

const initialState = {
    user: null,
    loading: false,
    error: null,
    data: []
};

const newState = updateState(initialState, {
    user: { name: 'John', id: 1 },
    loading: true
});

console.log('State update:', newState);

// Array manipulation
function addItemToArray(array, item) {
    return [...array, item];
}

function removeItemFromArray(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}

const items = ['apple', 'banana', 'orange'];
const withNewItem = addItemToArray(items, 'grape');
const withoutItem = removeItemFromArray(items, 1);

console.log('Original items:', items);
console.log('With new item:', withNewItem);
console.log('Without item at index 1:', withoutItem);

// Function composition with rest
function compose(...functions) {
    return functions.reduce((f, g) => (...args) => f(g(...args)));
}

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const composed = compose(addOne, multiplyByTwo, square);
console.log('Composed function (square, multiplyByTwo, addOne):', composed(3)); // ((3²) * 2) + 1 = 19

// ============================================
// Common Pitfalls and Best Practices
// ============================================

console.log('\n=== Best Practices ===');

// Shallow vs deep copying
const originalObject = {
    name: 'John',
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const shallowCopy = { ...originalObject };
const deepCopy = {
    ...originalObject,
    address: { ...originalObject.address }
};

// Modifying nested object in shallow copy affects original
shallowCopy.address.city = 'Los Angeles';
console.log('Original after shallow copy modification:', originalObject.address.city); // 'Los Angeles'

// Deep copy prevents this
deepCopy.address.city = 'Chicago';
console.log('Original after deep copy modification:', originalObject.address.city); // Still 'Los Angeles'

// Performance considerations
const largeArray = Array.from({ length: 1000 }, (_, i) => i);
console.log('Large array length:', largeArray.length);

// Use spread for small arrays, consider alternatives for large ones
const smallArray = [1, 2, 3];
const spreadResult = [...smallArray, 4];
console.log('Small array spread:', spreadResult);

console.log('\n✅ Exercise 4 completed! Check the results above.');
