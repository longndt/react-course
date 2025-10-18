// ============================================
// Exercise 7: Optional Chaining & Nullish Coalescing Solutions
// ============================================

console.log('=== Exercise 7.1: Safe Property Access ===');

const data = {
  user: {
    name: 'John',
    profile: {
      bio: 'Developer'
    }
  }
};

// Safely access nested properties
const bio = data?.user?.profile?.bio; // Should be 'Developer'
const age = data?.user?.age; // Should be undefined (use optional chaining)
const city = data?.user?.address?.city ?? 'Unknown'; // Should be 'Unknown' (use ?? operator)

console.log('Bio:', bio);
console.log('Age:', age);
console.log('City:', city);

console.log('\n=== Exercise 7.2: Default Values ===');

function displayUser(user) {
  // Use nullish coalescing for defaults
  const name = user?.name ?? 'Guest';
  const role = user?.role ?? 'User';
  const status = user?.status ?? 'Offline';

  return `${name} (${role}) - ${status}`;
}

console.log(displayUser({ name: 'Alice', role: 'Admin' }));
console.log(displayUser({ name: 'Bob' }));
console.log(displayUser({}));

// ============================================
// Additional Example and Learning Points
// ============================================

console.log('\n=== Additional Example ===');

// Optional chaining with method calls
const api = {
  users: {
    get: (id) => ({ id, name: `User${id}` }),
    delete: (id) => console.log(`Deleting user ${id}`)
  }
};

// Safe method calls
const user = api?.users?.get?.(1);
const deleteResult = api?.users?.delete?.(1);

console.log('User from API:', user);
console.log('Delete result:', deleteResult);

// Optional chaining with arrays
const users = [
  { name: 'Alice', posts: [{ title: 'Post 1' }] },
  { name: 'Bob', posts: [] },
  { name: 'Charlie' } // No posts property
];

users.forEach((user, index) => {
  const firstPost = user?.posts?.[0]?.title ?? 'No posts';
  console.log(`User ${index + 1} first post:`, firstPost);
});

// ============================================
// Advanced Patterns
// ============================================

console.log('\n=== Advanced Patterns ===');

// Complex nested data
const company = {
  departments: [
    {
      name: 'Engineering',
      manager: {
        name: 'John Doe',
        contact: {
          email: 'john@company.com',
          phone: '+1234567890'
        }
      },
      employees: [
        { name: 'Alice', skills: ['JavaScript', 'React'] },
        { name: 'Bob', skills: ['Python', 'Django'] }
      ]
    },
    {
      name: 'Marketing',
      manager: null, // No manager assigned
      employees: [
        { name: 'Carol', skills: ['SEO', 'Content'] }
      ]
    }
  ]
};

// Safe access to complex nested data
company.departments?.forEach((dept, index) => {
  console.log(`\nDepartment ${index + 1}: ${dept.name}`);

  // Safe access to manager
  const managerName = dept?.manager?.name ?? 'No manager assigned';
  const managerEmail = dept?.manager?.contact?.email ?? 'No email available';

  console.log(`Manager: ${managerName}`);
  console.log(`Manager email: ${managerEmail}`);

  // Safe access to employees
  const employeeCount = dept?.employees?.length ?? 0;
  console.log(`Employee count: ${employeeCount}`);

  // Safe access to first employee's skills
  const firstEmployeeSkills = dept?.employees?.[0]?.skills?.join(', ') ?? 'No skills listed';
  console.log(`First employee skills: ${firstEmployeeSkills}`);
});

// ============================================
// Practical Example
// ============================================

console.log('\n=== Practical Example ===');

// API response handling
function processApiResponse(response) {
  // Safe access to API response data
  const users = response?.data?.users ?? [];
  const pagination = response?.pagination ?? { page: 1, total: 0 };
  const error = response?.error ?? null;

  console.log('Processing API response:');
  console.log('Users count:', users.length);
  console.log('Current page:', pagination.page);
  console.log('Total items:', pagination.total);
  console.log('Error:', error);

  return {
    users: users.map(user => ({
      id: user?.id ?? 'unknown',
      name: user?.name ?? 'Anonymous',
      email: user?.email ?? 'no-email@example.com'
    })),
    pagination,
    hasError: error !== null
  };
}

// Test with different response structures
const validResponse = {
  data: {
    users: [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob' } // Missing email
    ]
  },
  pagination: { page: 1, total: 2 }
};

const errorResponse = {
  error: { message: 'API Error', code: 500 }
};

const emptyResponse = {};

console.log('Valid response:');
processApiResponse(validResponse);

console.log('\nError response:');
processApiResponse(errorResponse);

console.log('\nEmpty response:');
processApiResponse(emptyResponse);

// ============================================
// Common Pitfalls and Best Practices
// ============================================

console.log('\n=== Best Practices ===');

// Don't overuse optional chaining
const userData = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Good: Use when you're not sure if property exists
const city = userData?.address?.city ?? 'Unknown';

// Bad: Don't use when you know property exists
// const name = userData?.name ?? 'Unknown'; // Unnecessary

// Good: Use for API responses or user input
const apiUser = null; // Could be null from API
const userName = apiUser?.name ?? 'Guest';

console.log('City:', city);
console.log('User name:', userName);

// Combining with other operators
const config = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000
  },
  features: {
    darkMode: true
  }
};

// Safe access with fallbacks
const apiUrl = config?.api?.baseUrl ?? 'https://default-api.com';
const timeout = config?.api?.timeout ?? 10000;
const darkMode = config?.features?.darkMode ?? false;
const newFeature = config?.features?.newFeature ?? false;

console.log('API URL:', apiUrl);
console.log('Timeout:', timeout);
console.log('Dark mode:', darkMode);
console.log('New feature:', newFeature);

// ============================================
// Performance Considerations
// ============================================

console.log('\n=== Performance Considerations ===');

// Optional chaining is generally fast, but be mindful of deep nesting
const deepObject = {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: {
            value: 'Deep value'
          }
        }
      }
    }
  }
};

// This is fine for occasional use
const deepValue = deepObject?.level1?.level2?.level3?.level4?.level5?.value ?? 'Not found';

// But for frequent access, consider caching or restructuring
const level1 = deepObject?.level1;
const level2 = level1?.level2;
const level3 = level2?.level3;
const level4 = level3?.level4;
const level5 = level4?.level5;
const cachedValue = level5?.value ?? 'Not found';

console.log('Deep value (direct):', deepValue);
console.log('Deep value (cached):', cachedValue);

console.log('\n✅ Exercise 7 completed! Check the results above.');
