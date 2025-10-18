// ============================================
// Exercise 3: Template Literals Solutions
// ============================================

console.log('=== Exercise 3.1: String Interpolation ===');

const product = {
    name: 'Laptop',
    brand: 'TechBrand',
    price: 999.99,
    discount: 0.1
};

// Create product description using template literal
const description = `${product.brand} ${product.name} - $${product.price}`;

// Calculate and display final price
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

// Create multi-line email template
const emailTemplate = `Dear ${userData.name},

Welcome to our platform!

Your account details:
- Email: ${userData.email}
- Role: ${userData.role}

Best regards,
The Team`;

console.log(emailTemplate);

// ============================================
// Additional Example and Learning Points
// ============================================

console.log('\n=== Additional Example ===');

// Basic interpolation
const name = 'John';
const age = 30;
const greeting = `Hello, my name is ${name} and I am ${age} years old.`;
console.log('Basic interpolation:', greeting);

// Expression evaluation
const a = 10;
const b = 20;
const mathResult = `${a} + ${b} = ${a + b}`;
console.log('Math expression:', mathResult);

// Function calls in template literals
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

const price = 29.99;
const formattedPrice = `The price is ${formatCurrency(price)}`;
console.log('Function call:', formattedPrice);

// Conditional expressions
const isLoggedIn = true;
const userStatus = `User is ${isLoggedIn ? 'logged in' : 'not logged in'}`;
console.log('Conditional expression:', userStatus);

// ============================================
// Advanced Template Literal Features
// ============================================

console.log('\n=== Advanced Features ===');

// Nested template literals
const items = ['apple', 'banana', 'orange'];
const listItems = items.map(item => `  - ${item}`).join('\n');
const shoppingList = `Shopping List:\n${listItems}`;
console.log('Nested template literals:');
console.log(shoppingList);

// Template literals with objects
const person = {
    firstName: 'Jane',
    lastName: 'Smith',
    address: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001'
    }
};

const fullAddress = `${person.firstName} ${person.lastName}
${person.address.street}
${person.address.city}, ${person.address.zipCode}`;

console.log('Object properties:');
console.log(fullAddress);

// ============================================
// Tagged Template Literals (Advanced)
// ============================================

console.log('\n=== Tagged Template Literals ===');

// Simple tagged template function
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? `<mark>${values[i]}</mark>` : '';
        return result + string + value;
    }, '');
}

const searchTerm = 'JavaScript';
const text = highlight`Searching for ${searchTerm} in the codebase`;
console.log('Tagged template:', text);

// Tagged template for SQL-like queries
function sql(strings, ...values) {
    const query = strings.reduce((result, string, i) => {
        const value = values[i] ? `'${values[i]}'` : '';
        return result + string + value;
    }, '');
    return query.trim();
}

const tableName = 'users';
const userId = 123;
const query = sql`SELECT * FROM ${tableName} WHERE id = ${userId}`;
console.log('SQL query:', query);

// ============================================
// Practical Example
// ============================================

console.log('\n=== Practical Example ===');

// HTML template generation
function createUserCard(user) {
    return `
    <div class="user-card">
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>Role: ${user.role}</p>
      <p>Status: ${user.active ? 'Active' : 'Inactive'}</p>
    </div>
  `;
}

const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    active: true
};

console.log('HTML template:');
console.log(createUserCard(user));

// Configuration string generation
const config = {
    apiUrl: 'https://api.example.com',
    version: 'v1',
    timeout: 5000
};

const configString = `
API Configuration:
- URL: ${config.apiUrl}
- Version: ${config.version}
- Timeout: ${config.timeout}ms
`;

console.log('Configuration:');
console.log(configString);

// Error message formatting
function createErrorMessage(error, context) {
    return `
Error: ${error.message}
Context: ${context}
Timestamp: ${new Date().toISOString()}
Stack: ${error.stack}
  `.trim();
}

const sampleError = new Error('Something went wrong');
const errorMessage = createErrorMessage(sampleError, 'User login');
console.log('Error message:');
console.log(errorMessage);

console.log('\n✅ Exercise 3 completed! Check the results above.');
