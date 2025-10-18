// ============================================
// Exercise 2: Destructuring - Tests
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

    console.log('=== Running Exercise 2 Tests ===\n');

    // Test 2.1: Object Destructuring
    console.log('--- Object Destructuring ---');

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

    const { firstName, lastName } = user;
    const { address: { city } } = user;
    const { email: userEmail } = user;
    const { phone = 'N/A' } = user;

    test('firstName extraction', firstName === 'John');
    test('lastName extraction', lastName === 'Doe');
    test('nested city extraction', city === 'New York');
    test('email renaming', userEmail === 'john@example.com');
    test('default value for phone', phone === 'N/A');

    // Test 2.2: Array Destructuring
    console.log('\n--- Array Destructuring ---');

    const colors = ['red', 'green', 'blue', 'yellow', 'orange'];
    const [first, second] = colors;
    const [, , third] = colors;
    const [primary, ...rest] = colors;

    test('first color extraction', first === 'red');
    test('second color extraction', second === 'green');
    test('third color extraction (skip first two)', third === 'blue');
    test('primary color extraction', primary === 'red');
    test('rest colors extraction', JSON.stringify(rest) === JSON.stringify(['green', 'blue', 'yellow', 'orange']));

    // Test additional examples
    console.log('\n--- Additional Examples ---');

    // Function parameter destructuring
    function testFunction({ name, age = 0 }) {
        return { name, age };
    }

    const result = testFunction({ name: 'Alice' });
    test('function parameter destructuring', result.name === 'Alice' && result.age === 0);

    // Object destructuring with rest
    const { firstName: fName, ...userRest } = user;
    test('object destructuring with rest', fName === 'John' && userRest.lastName === 'Doe');

    // Array destructuring with defaults
    const [a, b, c = 'default'] = ['x', 'y'];
    test('array destructuring with defaults', a === 'x' && b === 'y' && c === 'default');

    // Test edge cases
    console.log('\n--- Edge Cases ---');

    // Destructuring undefined object
    const { nonExistent = 'default' } = {};
    test('destructuring undefined object', nonExistent === 'default');

    // Destructuring empty array
    const [emptyFirst, emptySecond = 'default'] = [];
    test('destructuring empty array', emptyFirst === undefined && emptySecond === 'default');

    // Nested destructuring with missing properties
    const { missing: { nested = 'default' } = {} } = {};
    test('nested destructuring with missing properties', nested === 'default');

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
