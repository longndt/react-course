/**
 * Example 5: Array Methods
 * Essential array methods for React development
 */

console.log('=== Example 5: Array Methods ===\n');

// Sample data
const users = [
  { id: 1, name: 'John', age: 25, active: true, salary: 50000 },
  { id: 2, name: 'Jane', age: 30, active: false, salary: 60000 },
  { id: 3, name: 'Bob', age: 35, active: true, salary: 55000 },
  { id: 4, name: 'Alice', age: 28, active: true, salary: 65000 },
  { id: 5, name: 'Charlie', age: 32, active: false, salary: 52000 }
];

// ==================================================
// 1. map() - Transform Elements
// ==================================================

console.log('1. map() - Transform array elements:');

// Extract names
const names = users.map(user => user.name);
console.log('  Names:', names);

// Extract specific properties
const userSummaries = users.map(user => ({
  id: user.id,
  name: user.name,
  status: user.active ? 'Active' : 'Inactive'
}));
console.log('  Summaries:', userSummaries);

// Transform with index
const numberedNames = users.map((user, index) =>
  `${index + 1}. ${user.name}`
);
console.log('  Numbered:', numberedNames);

// ==================================================
// 2. filter() - Select Elements
// ==================================================

console.log('\n2. filter() - Filter array elements:');

// Active users only
const activeUsers = users.filter(user => user.active);
console.log('  Active users:', activeUsers.map(u => u.name));

// Multiple conditions
const youngActiveUsers = users.filter(user =>
  user.active && user.age < 30
);
console.log('  Young & active:', youngActiveUsers.map(u => u.name));

// High salary
const highEarners = users.filter(user => user.salary > 55000);
console.log('  High earners:', highEarners.map(u => u.name));

// ==================================================
// 3. reduce() - Aggregate Values
// ==================================================

console.log('\n3. reduce() - Aggregate values:');

// Sum all salaries
const totalSalary = users.reduce((sum, user) => sum + user.salary, 0);
console.log('  Total salary:', totalSalary);

// Average age
const averageAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
console.log('  Average age:', averageAge);

// Count active users
const activeCount = users.reduce(
  (count, user) => count + (user.active ? 1 : 0),
  0
);
console.log('  Active count:', activeCount);

// Group by status
const usersByStatus = users.reduce((groups, user) => {
  const key = user.active ? 'active' : 'inactive';
  if (!groups[key]) groups[key] = [];
  groups[key].push(user);
  return groups;
}, {});
console.log('  Grouped by status:', {
  active: usersByStatus.active.length,
  inactive: usersByStatus.inactive.length
});

// ==================================================
// 4. find() - Find Single Element
// ==================================================

console.log('\n4. find() - Find first matching element:');

// Find by ID
const user2 = users.find(user => user.id === 2);
console.log('  User with ID 2:', user2.name);

// Find by condition
const firstInactive = users.find(user => !user.active);
console.log('  First inactive:', firstInactive.name);

// Returns undefined if not found
const user999 = users.find(user => user.id === 999);
console.log('  User with ID 999:', user999); // undefined

// ==================================================
// 5. findIndex() - Find Element Index
// ==================================================

console.log('\n5. findIndex() - Find element position:');

const bobIndex = users.findIndex(user => user.name === 'Bob');
console.log('  Bob is at index:', bobIndex);

const firstInactiveIndex = users.findIndex(user => !user.active);
console.log('  First inactive at index:', firstInactiveIndex);

// Returns -1 if not found
const notFoundIndex = users.findIndex(user => user.id === 999);
console.log('  Not found index:', notFoundIndex);

// ==================================================
// 6. some() - Test if Any Match
// ==================================================

console.log('\n6. some() - Test if any element matches:');

const hasActiveUsers = users.some(user => user.active);
console.log('  Has active users?', hasActiveUsers);

const hasUnder25 = users.some(user => user.age < 25);
console.log('  Has users under 25?', hasUnder25);

const hasMillionaire = users.some(user => user.salary > 1000000);
console.log('  Has millionaire?', hasMillionaire);

// ==================================================
// 7. every() - Test if All Match
// ==================================================

console.log('\n7. every() - Test if all elements match:');

const allActive = users.every(user => user.active);
console.log('  All users active?', allActive);

const allAdults = users.every(user => user.age >= 18);
console.log('  All users adults?', allAdults);

const allHighSalary = users.every(user => user.salary > 40000);
console.log('  All earn > 40k?', allHighSalary);

// ==================================================
// 8. sort() - Sort Elements
// ==================================================

console.log('\n8. sort() - Sort array elements:');

//  sort() mutates original array! Use spread to copy first
const byAge = [...users].sort((a, b) => a.age - b.age);
console.log('  Sorted by age:', byAge.map(u => `${u.name}(${u.age})`));

const bySalary = [...users].sort((a, b) => b.salary - a.salary);
console.log('  Sorted by salary (desc):', bySalary.map(u =>
  `${u.name}($${u.salary})`
));

const byName = [...users].sort((a, b) => a.name.localeCompare(b.name));
console.log('  Sorted by name:', byName.map(u => u.name));

// ==================================================
// 9. forEach() - Iterate Elements
// ==================================================

console.log('\n9. forEach() - Iterate over elements:');

console.log('  User list:');
users.forEach((user, index) => {
  console.log(`    ${index + 1}. ${user.name} - ${user.age} years old`);
});

// ==================================================
// 10. includes() - Check if Element Exists
// ==================================================

console.log('\n10. includes() - Check if value exists:');

const fruits = ['apple', 'banana', 'orange', 'mango'];
console.log('  Has banana?', fruits.includes('banana'));
console.log('  Has grape?', fruits.includes('grape'));

// ==================================================
// 11. indexOf() / lastIndexOf()
// ==================================================

console.log('\n11. indexOf() / lastIndexOf():');

const numbers = [1, 2, 3, 2, 4, 2, 5];
console.log('  First index of 2:', numbers.indexOf(2));
console.log('  Last index of 2:', numbers.lastIndexOf(2));
console.log('  Index of 99:', numbers.indexOf(99)); // -1

// ==================================================
// 12. slice() - Extract Portion
// ==================================================

console.log('\n12. slice() - Extract array portion:');

const first3Users = users.slice(0, 3);
console.log('  First 3:', first3Users.map(u => u.name));

const last2Users = users.slice(-2);
console.log('  Last 2:', last2Users.map(u => u.name));

// ==================================================
// 13. concat() - Combine Arrays
// ==================================================

console.log('\n13. concat() - Combine arrays:');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = arr1.concat(arr2);
console.log('  Combined:', combined);

// Better: use spread
const combinedSpread = [...arr1, ...arr2];
console.log('  Combined (spread):', combinedSpread);

// ==================================================
// 14. join() - Convert to String
// ==================================================

console.log('\n14. join() - Convert to string:');

const userNamesList = users.map(u => u.name).join(', ');
console.log('  Names:', userNamesList);

const path = ['home', 'user', 'documents', 'file.txt'].join('/');
console.log('  Path:', path);

// ==================================================
// 15. Chaining Methods (Most Important!)
// ==================================================

console.log('\n15. Chaining Methods (Common in React):');

// Get names of active users sorted by age
const activeUserNames = users
  .filter(user => user.active)
  .sort((a, b) => a.age - b.age)
  .map(user => user.name);
console.log('  Active users by age:', activeUserNames);

// Calculate average salary of active users
const avgActiveSalary = users
  .filter(user => user.active)
  .reduce((sum, user) => sum + user.salary, 0) /
  users.filter(user => user.active).length;
console.log('  Avg active salary:', avgActiveSalary);

// Complex chain
const summary = users
  .filter(user => user.age > 25)
  .map(user => ({
    ...user,
    category: user.salary > 55000 ? 'Senior' : 'Junior'
  }))
  .filter(user => user.active)
  .sort((a, b) => b.salary - a.salary);
console.log('  Complex summary:', summary.map(u =>
  `${u.name} (${u.category})`
));

// ==================================================
// 16. Practical React Examples
// ==================================================

console.log('\n16. Practical React Examples:');

// Rendering list in JSX (simulated)
const userElements = users.map(user =>
  `<div key="${user.id}">${user.name}</div>`
);
console.log('  JSX elements count:', userElements.length);

// Filter and render
const activeUserElements = users
  .filter(user => user.active)
  .map(user => `<UserCard key="${user.id}" name="${user.name}" />`);
console.log('  Active user elements:', activeUserElements.length);

// Conditional rendering
const hasUsers = users.length > 0;
console.log('  Should render list?', hasUsers);

// ==================================================
// 17. Performance Considerations
// ==================================================

console.log('\n17. Performance Tips:');
console.log('   Chain methods efficiently');
console.log('   Use filter before map to reduce iterations');
console.log('   Use find() instead of filter()[0]');
console.log('   Use some()/every() for existence checks');
console.log('    Avoid nested loops in callbacks');
console.log('    Remember: map/filter create new arrays');

// Example: filter first, then map
console.log('\n  Efficient chaining:');
//  Less efficient
const inefficient = users
  .map(user => ({ ...user, processed: true }))
  .filter(user => user.active);

//  More efficient
const efficient = users
  .filter(user => user.active)
  .map(user => ({ ...user, processed: true }));

console.log('  Both produce same result:',
  inefficient.length === efficient.length);

// ==================================================
// 18. Common Patterns
// ==================================================

console.log('\n18. Common Patterns:');

// Get unique values
const ages = users.map(u => u.age);
const uniqueAges = [...new Set(ages)];
console.log('  Unique ages:', uniqueAges);

// Flatten nested arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.reduce((flat, arr) => flat.concat(arr), []);
console.log('  Flattened:', flattened);

// Or use flat()
const flattened2 = nested.flat();
console.log('  Flattened (flat):', flattened2);

// Count occurrences
const fruits2 = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits2.reduce((count, fruit) => {
  count[fruit] = (count[fruit] || 0) + 1;
  return count;
}, {});
console.log('  Fruit count:', fruitCount);

// ==================================================
// 19. Best Practices
// ==================================================

console.log('\n19. Best Practices:');
console.log('   Use map() for transforming data');
console.log('   Use filter() for selecting data');
console.log('   Use reduce() for aggregating data');
console.log('   Use find() for single items');
console.log('   Chain methods for complex operations');
console.log('   Always return from callbacks');
console.log('    Don\'t mutate arrays (use spread to copy)');
console.log('    Handle empty arrays gracefully');

console.log('\n=== End of Example 5 ===\n');
