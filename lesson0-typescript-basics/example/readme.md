# Lesson 0 Demo: TypeScript for React

This demo project showcases TypeScript fundamentals specifically for React development with practical examples.

## Project Structure

```
example/
├── src/
│   ├── index.ts              # Main entry point
│   ├── example/
│   │   ├── 01-basic-types.ts
│   │   ├── 02-functions.ts
│   │   ├── 03-arrays-objects.ts
│   │   ├── 04-union-types.ts
│   │   ├── 05-generics.ts
│   │   ├── 06-react-types.ts
│   │   └── 07-component-examples.ts
├── package.json
├── tsconfig.json
└── readme.md
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Example

```bash
# Run with ts-node (recommended for development)
npm run dev

# Or compile and run
npm run build
npm start

# Watch mode (auto-compile on save)
npm run watch
```

## Example

### 01. Basic Types & Type Inference
- Primitive types (string, number, boolean)
- Type inference vs explicit typing
- Arrays and tuples
- Object types and interfaces

### 02. Functions
- Function types and signatures
- Optional and default parameters
- Arrow functions
- Function overloads

### 03. Arrays & Objects
- Array types and methods
- Object types and interfaces
- Enums and const assertions
- Index signatures

### 04. Union Types & Type Aliases
- Union types and type guards
- String and numeric literals
- Discriminated unions
- Type aliases vs interfaces

### 05. Generics
- Generic functions and interfaces
- Generic constraints
- Utility types (Partial, Pick, Omit)
- Generic components

### 06. React Types
- React.ReactNode and React.ReactElement
- Event handler types
- Component prop types
- Ref types

### 07. Component Example
- TypeScript React components
- Props interfaces
- State typing
- Event handling

## Key Learning Points

### Type Safety
- Catch errors at compile time
- Better IDE support and autocomplete
- Self-documenting code

### React Integration
- TSX syntax and rules
- Component typing patterns
- Event handler types
- State management with types

### Best Practices
- Use type inference when possible
- Prefer interfaces for object types
- Use union types for variants
- Leverage generics for reusability

## Running Individual Example

```bash
# Run specific example
npx ts-node src/example/01-basic-types.ts
npx ts-node src/example/02-functions.ts
npx ts-node src/example/03-arrays-objects.ts
npx ts-node src/example/04-union-types.ts
npx ts-node src/example/05-generics.ts
npx ts-node src/example/06-react-types.ts
npx ts-node src/example/07-component-examples.ts
```

## Next Steps

1. **Practice**: Modify the examples and experiment with different types
2. **Learn More**: Check [Reference Guide](./reference/reference0.md) for quick lookup
3. **Theory**: Read [Theory Guide](./theory/theory0.md) for detailed explanations
4. **Continue**: Move to [Lesson 1](../lesson1-fundamentals-setup/) for React fundamentals

> **💡 Tip**: Open this project in VS Code for the best TypeScript experience with IntelliSense and error checking!