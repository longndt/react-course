// ============================================
// Exercise 3: Template Literals - Tests
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

    console.log('=== Running Exercise 3 Tests ===\n');

    // Test 3.1: String Interpolation
    console.log('--- String Interpolation ---');

    const product = {
        name: 'Laptop',
        brand: 'TechBrand',
        price: 999.99,
        discount: 0.1
    };

    const description = `${product.brand} ${product.name} - $${product.price}`;
    const finalPrice = product.price * (1 - product.discount);
    const priceMessage = `Final price: $${finalPrice.toFixed(2)} (${product.discount * 100}% off)`;

    test('product description', description === 'TechBrand Laptop - $999.99');
    test('final price calculation', finalPrice === 899.991);
    test('price message format', priceMessage === 'Final price: $899.99 (10% off)');

    // Test 3.2: Multi-line Strings
    console.log('\n--- Multi-line Strings ---');

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

    const expectedTemplate = `Dear Alice,

Welcome to our platform!

Your account details:
- Email: alice@example.com
- Role: Developer

Best regards,
The Team`;

    test('multi-line email template', emailTemplate === expectedTemplate);

    // Test additional examples
    console.log('\n--- Additional Example ---');

    // Basic interpolation
    const name = 'John';
    const age = 30;
    const greeting = `Hello, my name is ${name} and I am ${age} years old.`;
    test('basic interpolation', greeting === 'Hello, my name is John and I am 30 years old.');

    // Expression evaluation
    const a = 10;
    const b = 20;
    const mathResult = `${a} + ${b} = ${a + b}`;
    test('math expression', mathResult === '10 + 20 = 30');

    // Function calls
    function formatCurrency(amount) {
        return `$${amount.toFixed(2)}`;
    }
    const price = 29.99;
    const formattedPrice = `The price is ${formatCurrency(price)}`;
    test('function call in template', formattedPrice === 'The price is $29.99');

    // Conditional expressions
    const isLoggedIn = true;
    const userStatus = `User is ${isLoggedIn ? 'logged in' : 'not logged in'}`;
    test('conditional expression', userStatus === 'User is logged in');

    // Test edge cases
    console.log('\n--- Edge Cases ---');

    // Empty template literal
    const empty = ``;
    test('empty template literal', empty === '');

    // Template literal with only variables
    const onlyVars = `${name}${age}`;
    test('only variables', onlyVars === 'John30');

    // Template literal with undefined/null
    const undefinedVar = undefined;
    const nullVar = null;
    const withNullish = `Value: ${undefinedVar}, Other: ${nullVar}`;
    test('undefined and null values', withNullish === 'Value: undefined, Other: null');

    // Nested template literals
    const nested = `Outer ${`Inner ${name}`}`;
    test('nested template literals', nested === 'Outer Inner John');

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
