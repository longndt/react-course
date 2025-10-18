// ============================================
// Exercise 5: Array Methods - Tests
// ============================================

// Simple test framework for demonstration
function runTests() {
    let passed = 0;
    let failed = 0;

    function test(name, condition) {
        if (condition) {
            console.log(`✅ ${name}`);
            passed++;
        } else {
            console.log(`❌ ${name}`);
            failed++;
        }
    }

    console.log('=== Running Exercise 5 Tests ===\n');

    // Test 5.1: Working with User Data
    console.log('--- Working with User Data ---');

    const users = [
        { id: 1, name: 'Alice', age: 25, active: true },
        { id: 2, name: 'Bob', age: 30, active: false },
        { id: 3, name: 'Charlie', age: 35, active: true },
        { id: 4, name: 'David', age: 28, active: true },
        { id: 5, name: 'Eve', age: 32, active: false }
    ];

    const names = users.map(u => u.name);
    const activeUsers = users.filter(u => u.active);
    const user3 = users.find(u => u.id === 3);
    const hasOldUsers = users.some(u => u.age > 30);
    const allActive = users.every(u => u.active);
    const averageAge = users.reduce((sum, u) => sum + u.age, 0) / users.length;

    test('map names', JSON.stringify(names) === JSON.stringify(['Alice', 'Bob', 'Charlie', 'David', 'Eve']));
    test('filter active users', activeUsers.length === 3);
    test('find user by id', user3 && user3.name === 'Charlie');
    test('some users over 30', hasOldUsers === true);
    test('not all users active', allActive === false);
    test('average age calculation', averageAge === 30);

    // Test 5.2: Shopping Cart
    console.log('\n--- Shopping Cart ---');

    const cart = [
        { name: 'Book', price: 12.99, quantity: 2 },
        { name: 'Pen', price: 1.99, quantity: 5 },
        { name: 'Notebook', price: 3.99, quantity: 3 }
    ];

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const bulkItems = cart.filter(item => item.quantity > 2);
    const summaries = cart.map(item =>
        `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`
    );

    test('total calculation', Math.abs(total - 47.92) < 0.01);
    test('bulk items filter', bulkItems.length === 2);
    test('summaries format', summaries[0] === 'Book x2: $25.98');

    // Test additional examples
    console.log('\n--- Additional Examples ---');

    // Array method chaining
    const products = [
        { name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
        { name: 'Book', price: 15, category: 'Education', inStock: false },
        { name: 'Phone', price: 699, category: 'Electronics', inStock: true }
    ];

    const expensiveElectronics = products
        .filter(p => p.category === 'Electronics')
        .filter(p => p.price > 500);

    test('array method chaining', expensiveElectronics.length === 2);

    // forEach test
    let forEachCount = 0;
    users.forEach(() => forEachCount++);
    test('forEach execution', forEachCount === 5);

    // flatMap test
    const departments = [
        { name: 'Engineering', employees: ['Alice', 'Bob'] },
        { name: 'Marketing', employees: ['Charlie'] }
    ];
    const allEmployees = departments.flatMap(dept => dept.employees);
    test('flatMap functionality', JSON.stringify(allEmployees) === JSON.stringify(['Alice', 'Bob', 'Charlie']));

    // Test edge cases
    console.log('\n--- Edge Cases ---');

    // Empty array tests
    const emptyArray = [];
    test('map on empty array', emptyArray.map(x => x).length === 0);
    test('filter on empty array', emptyArray.filter(x => x).length === 0);
    test('reduce on empty array', emptyArray.reduce((a, b) => a + b, 0) === 0);
    test('find on empty array', emptyArray.find(x => x) === undefined);

    // Array with undefined/null values
    const mixedArray = [1, null, 3, undefined, 5];
    const validNumbers = mixedArray.filter(x => x != null);
    test('filter null/undefined', validNumbers.length === 3);

    // Summary
    console.log('\n=== Test Summary ===');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${passed + failed}`);

    if (failed === 0) {
        console.log('🎉 All tests passed!');
    } else {
        console.log('⚠️  Some tests failed. Check your implementation.');
    }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
    // Node.js environment
    runTests();
} else {
    // Browser environment - expose test function
    window.runTests = runTests;
    console.log('Tests loaded. Run runTests() in console to execute tests.');
}
