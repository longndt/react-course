/**
 * Example 10: Modern JavaScript Features
 * ES2020+ features: Optional Chaining, Nullish Coalescing, and more
 */

console.log('=== Example 10: Modern JavaScript Features ===\n');

// ==================================================
// 1. Optional Chaining (?.)
// ==================================================

console.log('1. Optional Chaining (?.) - ES2020:');

const user = {
  name: 'John',
  address: {
    city: 'Hanoi',
    country: 'Vietnam'
    // No 'street' property
  }
};

//  Old way - can throw error
// const street = user.address.street.name; // Error!

//  Old way - verbose checking
const street1 = user && user.address && user.address.street;

//  Optional chaining
const street2 = user?.address?.street;
console.log('  Street:', street2); // undefined (no error!)

// With arrays
const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 }
];

const firstUser = users?.[0];
const thirdUser = users?.[2]; // undefined
console.log('  First user:', firstUser?.name);
console.log('  Third user:', thirdUser?.name); // undefined

// With function calls
const obj = {
  greet: () => 'Hello!'
};

const result1 = obj.greet?.(); // 'Hello!'
const result2 = obj.goodbye?.(); // undefined (method doesn't exist)
console.log('  Greet:', result1);
console.log('  Goodbye:', result2);

// ==================================================
// 2. Nullish Coalescing (??)
// ==================================================

console.log('\n2. Nullish Coalescing (??) - ES2020:');

// ?? returns right side ONLY if left is null or undefined
// Different from || which returns right for ANY falsy value

const port = 0;
const debug = false;
const name = '';

//  Using || (wrong for 0, false, '')
const serverPort1 = port || 3000; // 3000 (wrong! port is 0)
const debugMode1 = debug || true; // true (wrong! debug is false)
const username1 = name || 'Guest'; // 'Guest' (wrong! name is '')

//  Using ?? (correct)
const serverPort2 = port ?? 3000; // 0 (correct!)
const debugMode2 = debug ?? true; // false (correct!)
const username2 = name ?? 'Guest'; // '' (keeps empty string)

console.log('  Port (||):', serverPort1);
console.log('  Port (??):', serverPort2);
console.log('  Debug (||):', debugMode1);
console.log('  Debug (??):', debugMode2);

// Practical example
const config = {
  timeout: 0, // Intentionally 0
  retries: null // Not set
};

const timeout = config.timeout ?? 5000; // 0 (keeps zero)
const retries = config.retries ?? 3; // 3 (null becomes 3)
console.log('  Timeout:', timeout);
console.log('  Retries:', retries);

// ==================================================
// 3. Logical Assignment Operators (ES2021)
// ==================================================

console.log('\n3. Logical Assignment Operators:');

let obj1 = { value: 0 };
let obj2 = { value: null };
let obj3 = {};

// ||= (OR assignment)
obj1.value ||= 10; // 10 (0 is falsy)
console.log('  ||= with 0:', obj1.value);

// ??= (Nullish assignment)
obj2.value ??= 10; // 10 (null is nullish)
obj3.value ??= 10; // 10 (undefined is nullish)
console.log('  ??= with null:', obj2.value);
console.log('  ??= with undefined:', obj3.value);

// &&= (AND assignment)
let obj4 = { value: 5 };
obj4.value &&= obj4.value * 2; // 10 (value exists, so multiply)
console.log('  &&= with truthy:', obj4.value);

// ==================================================
// 4. Numeric Separators (ES2021)
// ==================================================

console.log('\n4. Numeric Separators:');

// Makes large numbers more readable
const billion = 1_000_000_000;
const bytes = 0xFF_FF_FF_FF;
const price = 99_999.99;

console.log('  Billion:', billion);
console.log('  Bytes:', bytes);
console.log('  Price:', price);

// ==================================================
// 5. String.replaceAll() (ES2021)
// ==================================================

console.log('\n5. String.replaceAll():');

const text = 'Hello World! Hello Universe!';

//  Old way - only replaces first occurrence
const replaced1 = text.replace('Hello', 'Hi');
console.log('  replace():', replaced1);

//  replaceAll()
const replaced2 = text.replaceAll('Hello', 'Hi');
console.log('  replaceAll():', replaced2);

// ==================================================
// 6. Promise.any() (ES2021)
// ==================================================

console.log('\n6. Promise.any() - First successful promise:');

const promises = [
  Promise.reject('Error 1'),
  new Promise(resolve => setTimeout(() => resolve('Success!'), 500)),
  Promise.reject('Error 2')
];

Promise.any(promises)
  .then(result => console.log('  First success:', result))
  .catch(() => console.log('  All failed'));

// ==================================================
// 7. Array.at() (ES2022)
// ==================================================

console.log('\n7. Array.at() - Negative indexing:');

const arr = ['a', 'b', 'c', 'd', 'e'];

//  Old way for last element
const last1 = arr[arr.length - 1];

//  New way
const last2 = arr.at(-1);
const secondLast = arr.at(-2);

console.log('  Last element:', last2);
console.log('  Second last:', secondLast);
console.log('  First element:', arr.at(0));

// ==================================================
// 8. Object.hasOwn() (ES2022)
// ==================================================

console.log('\n8. Object.hasOwn():');

const person = {
  name: 'John',
  age: 25
};

//  Old way
const hasName1 = person.hasOwnProperty('name');

//  New way (safer)
const hasName2 = Object.hasOwn(person, 'name');
const hasEmail = Object.hasOwn(person, 'email');

console.log('  Has name:', hasName2);
console.log('  Has email:', hasEmail);

// ==================================================
// 9. Top-level await (ES2022)
// ==================================================

console.log('\n9. Top-level await (ES2022):');

console.log(`
  // In ES modules (.mjs or type="module")

  //  Old way - need IIFE
  (async () => {
    const data = await fetch('/api/data');
  })();

  //  New way - direct await
  const data = await fetch('/api/data');
  const json = await data.json();

  // Very useful for module initialization!
`);

// ==================================================
// 10. Private Class Fields (ES2022)
// ==================================================

console.log('\n10. Private Class Fields:');

class BankAccount {
  #balance = 0; // Private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    if (this.#balance >= amount) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log('  Balance:', account.getBalance());
// console.log(account.#balance); // Error: Private field!

// ==================================================
// 11. Combining Modern Features
// ==================================================

console.log('\n11. Combining Modern Features:');

// Real-world example
const userData = {
  user: {
    profile: {
      name: 'John',
      settings: {
        theme: null,
        notifications: false
      }
    }
  }
};

// Using optional chaining + nullish coalescing
const theme = userData?.user?.profile?.settings?.theme ?? 'light';
const notifications = userData?.user?.profile?.settings?.notifications ?? true;
const language = userData?.user?.profile?.settings?.language ?? 'en';

console.log('  Theme:', theme);
console.log('  Notifications:', notifications);
console.log('  Language:', language);

// ==================================================
// 12. Practical Example - API Response Handling
// ==================================================

console.log('\n12. Practical Example - API Response:');

const apiResponse = {
  data: {
    users: [
      { id: 1, name: 'John', email: null },
      { id: 2, name: 'Jane', email: 'jane@example.com' }
    ]
  },
  metadata: {
    total: 2
  }
};

// Safe data extraction
const firstUserEmail = apiResponse?.data?.users?.[0]?.email ?? 'No email';
const secondUserEmail = apiResponse?.data?.users?.[1]?.email ?? 'No email';
const totalUsers = apiResponse?.metadata?.total ?? 0;

console.log('  First user email:', firstUserEmail);
console.log('  Second user email:', secondUserEmail);
console.log('  Total users:', totalUsers);

// ==================================================
// 13. Practical Example - Form Data
// ==================================================

console.log('\n13. Practical Example - Form Data:');

const formData = {
  username: '',
  age: 0,
  email: null,
  terms: false
};

// Validate with nullish coalescing
const username = formData.username || 'Guest'; // Wrong for ''
const usernameCorrect = formData.username ?? 'Guest'; // Keeps ''
const age = formData.age ?? 18; // Keeps 0
const email = formData.email ?? 'not-provided@example.com';
const acceptedTerms = formData.terms ?? false;

console.log('  Username (||):', username);
console.log('  Username (??):', usernameCorrect);
console.log('  Age:', age);
console.log('  Email:', email);
console.log('  Accepted terms:', acceptedTerms);

// ==================================================
// 14. Practical Example - Configuration
// ==================================================

console.log('\n14. Practical Example - Configuration:');

const userConfig = {
  api: {
    baseURL: 'https://api.example.com',
    timeout: 0 // No timeout
  }
};

const defaultConfig = {
  api: {
    baseURL: 'https://default-api.com',
    timeout: 5000,
    retries: 3
  },
  cache: {
    enabled: true,
    ttl: 3600
  }
};

// Merge configurations safely
const finalConfig = {
  api: {
    baseURL: userConfig?.api?.baseURL ?? defaultConfig.api.baseURL,
    timeout: userConfig?.api?.timeout ?? defaultConfig.api.timeout,
    retries: userConfig?.api?.retries ?? defaultConfig.api.retries
  },
  cache: {
    enabled: userConfig?.cache?.enabled ?? defaultConfig.cache.enabled,
    ttl: userConfig?.cache?.ttl ?? defaultConfig.cache.ttl
  }
};

console.log('  Final config:', finalConfig);

// ==================================================
// 15. Browser Compatibility
// ==================================================

console.log('\n15. Browser Compatibility:');
console.log(`
  Feature Support (as of 2025):

   Optional Chaining (?.)        - All modern browsers
   Nullish Coalescing (??)       - All modern browsers
   Logical Assignment (??=)      - All modern browsers
   Numeric Separators            - All modern browsers
   String.replaceAll()           - All modern browsers
   Promise.any()                 - All modern browsers
   Array.at()                    - All modern browsers
   Object.hasOwn()               - All modern browsers
   Private Class Fields (#)      - All modern browsers
   Top-level await               - All modern browsers (ES modules)

  For older browsers, use Babel transpiler.
`);

// ==================================================
// 16. Best Practices
// ==================================================

console.log('\n16. Best Practices:');
console.log('   Use ?. for safe property access');
console.log('   Use ?? when 0, false, "" are valid values');
console.log('   Combine ?. and ?? for robust code');
console.log('   Use private fields (#) for encapsulation');
console.log('   Use numeric separators for readability');
console.log('    Know the difference between || and ??');
console.log('    Don\'t overuse ?. (indicates poor data structure)');
console.log('    Check browser support for production');

console.log('\n=== End of Example 10 ===\n');
console.log(' These modern features make JavaScript code safer and more readable!');
