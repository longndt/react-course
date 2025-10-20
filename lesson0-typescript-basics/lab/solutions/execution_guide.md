# TypeScript Execution Guide

This guide demonstrates how to run TypeScript files using both traditional compilation and direct execution methods.

## Prerequisites

Make sure you have Node.js installed:
```bash
node --version  # Should be 18+ recommended
npm --version   # Should be 9+
```

## Method 1: Compile to JavaScript First

### Step 1: Install TypeScript
```bash
# Install TypeScript globally
npm install -g typescript

# Verify installation
tsc --version
```

### Step 2: Compile the TypeScript File
```bash
# Navigate to the solutions directory
cd lesson0-typescript-basics/lab/solutions

# Compile the TypeScript file
tsc typescript-execution-example.ts
```

This creates `typescript-execution-example.js`

### Step 3: Run the Compiled JavaScript
```bash
# Run the compiled JavaScript file
node typescript-execution-example.js
```

### Expected Output:
```
🎓 TypeScript Execution Example
================================

📚 All Students:
- Alice Johnson (ID: 1, Grade: A)
- Bob Smith (ID: 2, Grade: B)
- Charlie Brown (ID: 3, Grade: A)

🔍 Finding Student by ID:
Found: Bob Smith - English, History, Art

📊 Students with Grade A:
- Alice Johnson
- Charlie Brown

📈 Class GPA:
Average GPA: 3.33

🛡️ Type Safety Demo:
✅ All operations completed successfully with type safety!
```

## Method 2: Run TypeScript Directly

### Option A: Using ts-node (Recommended)

```bash
# Install ts-node globally
npm install -g ts-node

# Run TypeScript file directly
ts-node typescript-execution-example.ts
```

### Option B: Using tsx (Faster Alternative)

```bash
# Install tsx globally
npm install -g tsx

# Run TypeScript file directly
tsx typescript-execution-example.ts
```

### Option C: Using npx (No Global Installation)

```bash
# Run with ts-node without global installation
npx ts-node typescript-execution-example.ts

# Or with tsx
npx tsx typescript-execution-example.ts
```

## Advanced Usage

### Watch Mode (Auto-recompile on changes)
```bash
# Using ts-node with watch mode
ts-node --watch typescript-execution-example.ts

# Using tsc with watch mode
tsc --watch typescript-execution-example.ts
```

### Compile with Specific Options
```bash
# Compile with specific target and module
tsc typescript-execution-example.ts --target ES2020 --module commonjs

# Compile with source maps for debugging
tsc typescript-execution-example.ts --sourceMap
```

### Using tsconfig.json
```bash
# Create tsconfig.json
npx tsc --init

# Compile using tsconfig.json
tsc --project tsconfig.json
```

## Project Setup Example

### 1. Initialize a TypeScript Project
```bash
# Create new directory
mkdir my-typescript-project
cd my-typescript-project

# Initialize npm project
npm init -y

# Install TypeScript and ts-node
npm install -D typescript ts-node @types/node

# Initialize TypeScript config
npx tsc --init
```

### 2. Configure package.json
```json
{
  "name": "my-typescript-project",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "watch": "ts-node --watch src/index.ts"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "ts-node": "^10.9.2",
    "@types/node": "^24.6.2"
  }
}
```

### 3. Create tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Development Workflow
```bash
# For development (fast iteration)
npm run dev

# For production (optimized build)
npm run build
npm start

# Watch mode for development
npm run watch
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Module Resolution Errors
```bash
# Error: Cannot find module
# Solution: Check tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

#### 2. Type Declaration Errors
```bash
# Error: Cannot find type definitions
# Solution: Install @types packages
npm install -D @types/node
```

#### 3. ES Module Issues
```bash
# Error: Cannot use import statement outside a module
# Solution: Use ts-node with ESM support
ts-node --esm typescript-execution-example.ts
```

#### 4. Permission Errors
```bash
# Error: Permission denied
# Solution: Use npx instead of global installation
npx ts-node typescript-execution-example.ts
```

## Performance Comparison

| Method | Speed | Memory Usage | Best For |
|--------|-------|--------------|----------|
| **tsc + node** | Fastest execution | Lowest | Production, CI/CD |
| **ts-node** | Slower startup | Higher | Development, learning |
| **tsx** | Fast startup | Medium | Development, prototyping |

## Best Practices

1. **Use ts-node for development** - Faster iteration
2. **Compile for production** - Optimized output
3. **Use watch mode** - Auto-recompile on changes
4. **Configure tsconfig.json properly** - Consistent compilation
5. **Use proper module resolution** - Avoid import issues
6. **Install necessary @types packages** - Better type checking

## Quick Reference

```bash
# Compile TypeScript
tsc filename.ts

# Run TypeScript directly
ts-node filename.ts
tsx filename.ts

# Watch mode
tsc --watch filename.ts
ts-node --watch filename.ts

# Compile project
tsc --project tsconfig.json

# Run with npx (no global install)
npx ts-node filename.ts
npx tsx filename.ts
```

## Next Steps

After mastering TypeScript execution, you're ready to:
- Learn React with TypeScript (Lesson 1)
- Build modern web applications
- Use TypeScript in production projects
- Explore advanced TypeScript features
