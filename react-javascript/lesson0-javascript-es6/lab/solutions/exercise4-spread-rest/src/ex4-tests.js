// ============================================
// Exercise 4: Spread & Rest Operators - Tests
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

    console.log('=== Running Exercise 4 Tests ===\n');

    // Test 4.1: Spread Operator
    console.log('--- Spread Operator ---');

    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const combined = [...arr1, ...arr2];
    const extended = [0, ...arr1, 7];

    test('array combination', JSON.stringify(combined) === JSON.stringify([1, 2, 3, 4, 5, 6]));
    test('array extension', JSON.stringify(extended) === JSON.stringify([0, 1, 2, 3, 7]));

    const user = { name: 'John', age: 30 };
    const updates = { age: 31, city: 'NYC' };
    const updatedUser = { ...user, ...updates };

    test('object merging', updatedUser.name === 'John' && updatedUser.age === 31 && updatedUser.city === 'NYC');

    // Test 4.2: Rest Parameters
    console.log('\n--- Rest Parameters ---');

    function calculateAverage(...numbers) {
        if (numbers.length === 0) return 0;
        const sum = numbers.reduce((total, n) => total + n, 0);
        return sum / numbers.length;
    }

    function greetAll(greeting, ...names) {
        if (names.length === 0) return greeting;
        if (names.length === 1) return `${greeting}, ${names[0]}!`;
        const lastPerson = names.pop();
        return `${greeting}, ${names.join(', ')}, and ${lastPerson}!`;
    }

    test('calculate average', calculateAverage(1, 2, 3, 4, 5) === 3);
    test('calculate average empty', calculateAverage() === 0);
    test('greet all multiple', greetAll('Hello', 'Alice', 'Bob', 'Charlie') === 'Hello, Alice, Bob, and Charlie!');
    test('greet all single', greetAll('Hi', 'Alice') === 'Hi, Alice!');
    test('greet all none', greetAll('Hello') === 'Hello');

    // Test additional examples
    console.log('\n--- Additional Examples ---');

    // Array spreading
    const originalArray = [1, 2, 3];
    const copiedArray = [...originalArray];
    test('array copying', JSON.stringify(copiedArray) === JSON.stringify(originalArray));
    test('array copying is shallow', copiedArray !== originalArray);

    // Object spreading
    const baseConfig = { apiUrl: 'https://api.example.com', timeout: 5000 };
    const devConfig = { ...baseConfig, apiUrl: 'https://dev-api.example.com', debug: true };
    test('object spreading with override', devConfig.apiUrl === 'https://dev-api.example.com' && devConfig.timeout === 5000 && devConfig.debug === true);

    // Rest with destructuring
    const [first, second, ...remaining] = [1, 2, 3, 4, 5];
    test('rest with array destructuring', first === 1 && second === 2 && JSON.stringify(remaining) === JSON.stringify([3, 4, 5]));

    // Test edge cases
    console.log('\n--- Edge Cases ---');

    // Empty arrays
    const emptyArray = [];
    const spreadEmpty = [...emptyArray, 1];
    test('spread empty array', JSON.stringify(spreadEmpty) === JSON.stringify([1]));

    // Empty objects
    const emptyObject = {};
    const spreadEmptyObj = { ...emptyObject, key: 'value' };
    test('spread empty object', spreadEmptyObj.key === 'value');

    // Rest with no arguments
    function testRest(...args) {
        return args.length;
    }
    test('rest with no arguments', testRest() === 0);

    // Spread with function calls
    function testSpread(a, b, c) {
        return a + b + c;
    }
    const numbers = [1, 2, 3];
    test('spread with function call', testSpread(...numbers) === 6);

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
