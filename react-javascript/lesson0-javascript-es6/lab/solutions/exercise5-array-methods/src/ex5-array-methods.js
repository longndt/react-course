// ============================================
// Exercise 5: Array Methods Solutions
// ============================================

console.log('=== Exercise 5.1: Working with User Data ===');

const users = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 30, active: false },
    { id: 3, name: 'Charlie', age: 35, active: true },
    { id: 4, name: 'David', age: 28, active: true },
    { id: 5, name: 'Eve', age: 32, active: false }
];

// Get array of just the names
const names = users.map(u => u.name);

// Get only active users
const activeUsers = users.filter(u => u.active);

// Find user with id 3
const user3 = users.find(u => u.id === 3);

// Check if any user is over 30
const hasOldUsers = users.some(u => u.age > 30);

// Check if all users are active
const allActive = users.every(u => u.active);

// Calculate average age of all users
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

// Calculate total price (price * quantity for each item)
const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// Get items with quantity > 2
const bulkItems = cart.filter(item => item.quantity > 2);

// Create array of item summaries: "Book x2: $25.98"
const summaries = cart.map(item =>
    `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`
);

console.log('Total:', `$${total.toFixed(2)}`);
console.log('Bulk items:', bulkItems.map(i => i.name));
console.log('Summaries:', summaries);

// ============================================
// Additional Examples and Learning Points
// ============================================

console.log('\n=== Additional Examples ===');

// Array method chaining
const products = [
    { name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
    { name: 'Book', price: 15, category: 'Education', inStock: false },
    { name: 'Phone', price: 699, category: 'Electronics', inStock: true },
    { name: 'Pen', price: 2, category: 'Office', inStock: true },
    { name: 'Tablet', price: 399, category: 'Electronics', inStock: false }
];

// Chain multiple array methods
const expensiveElectronics = products
    .filter(p => p.category === 'Electronics')
    .filter(p => p.price > 500)
    .map(p => ({ ...p, discountedPrice: p.price * 0.9 }))
    .sort((a, b) => b.price - a.price);

console.log('Expensive electronics with discount:', expensiveElectronics);

// ============================================
// Advanced Array Methods
// ============================================

console.log('\n=== Advanced Array Methods ===');

// forEach - side effects
console.log('User details:');
users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name} (${user.age} years old) - ${user.active ? 'Active' : 'Inactive'}`);
});

// flatMap - map and flatten
const departments = [
    { name: 'Engineering', employees: ['Alice', 'Bob'] },
    { name: 'Marketing', employees: ['Charlie', 'David'] },
    { name: 'Sales', employees: ['Eve'] }
];

const allEmployees = departments.flatMap(dept => dept.employees);
console.log('All employees:', allEmployees);

// reduce with complex accumulator
const salesData = [
    { month: 'Jan', revenue: 1000, expenses: 800 },
    { month: 'Feb', revenue: 1200, expenses: 900 },
    { month: 'Mar', revenue: 1100, expenses: 850 }
];

const financialSummary = salesData.reduce((acc, data) => {
    acc.totalRevenue += data.revenue;
    acc.totalExpenses += data.expenses;
    acc.months.push(data.month);
    acc.profit = acc.totalRevenue - acc.totalExpenses;
    return acc;
}, { totalRevenue: 0, totalExpenses: 0, months: [], profit: 0 });

console.log('Financial summary:', financialSummary);

// ============================================
// Performance Considerations
// ============================================

console.log('\n=== Performance Considerations ===');

// Large dataset example
const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    value: Math.random() * 1000,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
}));

console.log('Large dataset size:', largeDataset.length);

// Efficient filtering and mapping
const startTime = performance.now();

const categoryAItems = largeDataset
    .filter(item => item.category === 'A')
    .map(item => ({ ...item, processed: true }));

const endTime = performance.now();
console.log(`Processed ${categoryAItems.length} items in ${(endTime - startTime).toFixed(2)}ms`);

// ============================================
// Practical Examples
// ============================================

console.log('\n=== Practical Examples ===');

// Data transformation pipeline
const rawData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', lastLogin: '2024-01-13' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'moderator', lastLogin: '2024-01-12' }
];

// Transform and filter data
const userSummary = rawData
    .filter(user => user.role !== 'admin') // Exclude admins
    .map(user => ({
        id: user.id,
        displayName: user.name,
        email: user.email,
        role: user.role.toUpperCase(),
        isRecentUser: new Date(user.lastLogin) > new Date('2024-01-13')
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

console.log('User summary:', userSummary);

// Grouping data
const groupedByRole = rawData.reduce((groups, user) => {
    const role = user.role;
    if (!groups[role]) {
        groups[role] = [];
    }
    groups[role].push(user);
    return groups;
}, {});

console.log('Grouped by role:', groupedByRole);

// ============================================
// Common Patterns and Best Practices
// ============================================

console.log('\n=== Best Practices ===');

// Immutable operations
const originalNumbers = [1, 2, 3, 4, 5];

// Good: Create new array
const doubled = originalNumbers.map(n => n * 2);
console.log('Original:', originalNumbers);
console.log('Doubled:', doubled);

// Bad: Mutate original array
// originalNumbers.forEach((n, i) => originalNumbers[i] = n * 2);

// Error handling in array methods
const mixedData = [1, 'hello', null, 42, undefined, 'world'];

const validNumbers = mixedData
    .filter(item => typeof item === 'number' && !isNaN(item))
    .map(num => num * 2);

console.log('Valid numbers doubled:', validNumbers);

// Early termination with find
const targetUser = users.find(user => user.name === 'Charlie');
if (targetUser) {
    console.log('Found user:', targetUser);
} else {
    console.log('User not found');
}

console.log('\n✅ Exercise 5 completed! Check the results above.');
