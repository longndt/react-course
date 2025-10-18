// ============================================
// Exercise 1: Arrow Functions - Tests
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

    console.log('=== Running Exercise 1 Tests ===\n');

    // Test 1.1: Basic Arrow Functions
    console.log('--- Basic Arrow Functions ---');

    const greet = (name) => `Hello, ${name}!`;
    const add = (a, b) => a + b;
    const square = x => x * x;

    test('greet function works', greet('Alice') === 'Hello, Alice!');
    test('add function works', add(5, 3) === 8);
    test('square function works', square(4) === 16);

    // Test 1.2: Arrow Functions with Arrays
    console.log('\n--- Arrow Functions with Arrays ---');

    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(n => n * 2);
    const evens = numbers.filter(n => n % 2 === 0);
    const sum = numbers.reduce((total, n) => total + n, 0);

    test('map with arrow function', JSON.stringify(doubled) === JSON.stringify([2, 4, 6, 8, 10]));
    test('filter with arrow function', JSON.stringify(evens) === JSON.stringify([2, 4]));
    test('reduce with arrow function', sum === 15);

    // Test additional examples
    console.log('\n--- Additional Example ---');

    const multiply = (a, b) => a * b;
    const getCurrentTime = () => new Date().toISOString();
    const createUser = (name, age) => ({ name, age, isActive: true });

    test('multiply function works', multiply(3, 4) === 12);
    test('getCurrentTime returns string', typeof getCurrentTime() === 'string');
    test('createUser returns object', typeof createUser('John', 25) === 'object');

    // Test edge cases
    console.log('\n--- Edge Cases ---');

    test('empty array map', [].map(x => x * 2).length === 0);
    test('empty array filter', [].filter(x => x > 0).length === 0);
    test('empty array reduce', [].reduce((a, b) => a + b, 0) === 0);

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
