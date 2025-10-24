# Exercise 3: Template Literals - Solutions

## Overview

This exercise covers template literals in JavaScript ES6+, including:
- String interpolation
- Multi-line strings
- Expression evaluation
- Tagged templates (advanced)

## Solutions

### Task 3.1: String Interpolation

```javascript
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
```

### Task 3.2: Multi-line Strings

```javascript
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
```

## Key Learning Points

1. **Template Literals** Use backticks (`) instead of quotes
2. **Interpolation** Use `${expression}` to embed expressions
3. **Multi-line** Natural line breaks without `\n`
4. **Expressions** Any valid JavaScript expression can be used
5. **Tagged Templates** Advanced feature for custom processing

## Running the Solution

```bash
cd exercise3-template-literals
npm install
npm start
```

## Expected Output

```
=== Exercise 3.1 ===
TechBrand Laptop - $999.99
Final price: $899.99 (10% off)
=== Exercise 3.2 ===
Dear Alice,

Welcome to our platform!

Your account details:
- Email: alice@example.com
- Role: Developer

Best regards,
The Team
```
