# ES6 Modules Examples

This folder contains examples of ES6 module system (import/export).

## Files:

1. **utils.js** - Named exports (functions, constants)
2. **User.js** - Default export (class)
3. **api.js** - Mixed exports (default + named)
4. **constants.js** - Named exports (constants only)
5. **index.js** - Re-exporting modules
6. **main.js** - Import examples (how to use all above)

## How to Run:

```bash
# In package.json, make sure you have:
"type": "module"

# Then run:
node src/example/08-modules/main.js
```

## Key Concepts:

### Named Exports
```javascript
// Export
export const add = (a, b) => a + b;
export const PI = 3.14;

// Import
import { add, PI } from './utils.js';
```

### Default Exports
```javascript
// Export
export default class User { }

// Import
import User from './User.js';
import MyUser from './User.js'; // Can rename
```

### Mixed Exports
```javascript
// Export
export const API_URL = '...';
export default api;

// Import
import api, { API_URL } from './api.js';
```

### Import All
```javascript
import * as utils from './utils.js';
utils.add(1, 2);
```

### Re-exporting
```javascript
export { add, subtract } from './utils.js';
export { default as User } from './User.js';
```

## Best Practices:

 Use named exports for utilities
 Use default export for main class/component
 Group related exports in index.js
 Use .js extension in imports
 One default export per file
 Avoid circular dependencies
