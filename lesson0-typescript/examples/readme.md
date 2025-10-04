# TypeScript Demo - Lesson 0

This demo project showcases TypeScript fundamentals with practical examples.

## 📁 Project Structure

```
examples/
├── src/
│   ├── index.ts              # Main entry point
│   ├── examples/
│   │   ├── 01-basic-types.ts
│   │   ├── 02-interfaces.ts
│   │   ├── 03-functions.ts
│   │   ├── 04-generics.ts
│   │   ├── 05-utility-types.ts
│   │   └── 06-type-guards.ts
├── package.json
├── tsconfig.json
└── readme.md
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Examples

```bash
# Run with ts-node (recommended for development)
npm run dev

# Or compile and run
npm run build
npm start

# Watch mode (auto-compile on save)
npm run watch
```

## 📚 Examples

### 01. Basic Types
- Primitive types (string, number, boolean)
- Arrays and tuples
- Enums
- Type inference

### 02. Interfaces
- Object shapes
- Optional properties
- Readonly properties
- Extending interfaces

### 03. Functions
- Typed parameters and return types
- Optional and default parameters
- Rest parameters
- Function overloading

### 04. Generics
- Generic functions
- Generic interfaces
- Generic classes
- Type constraints

### 05. Utility Types
- Partial<T>
- Required<T>
- Readonly<T>
- Pick<T, K>
- Omit<T, K>
- Record<K, T>

### 06. Type Guards
- typeof guards
- instanceof guards
- Custom type predicates
- Discriminated unions

## 🎯 Learning Objectives

After completing this demo, you will understand:

- ✅ How to use TypeScript's type system
- ✅ When to use interfaces vs type aliases
- ✅ How to write type-safe functions
- ✅ How to use generics for reusable code
- ✅ How to leverage utility types
- ✅ How to implement type guards

## 💡 Tips

- Run examples one at a time to see output clearly
- Modify examples to experiment with TypeScript
- Check compiler errors - they help you learn!
- Use VS Code for best TypeScript experience

## 🔗 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## ✅ Next Steps

1. Complete **Lab 0** exercises
2. Take the **Quiz**
3. Move to **Lesson 1** - React with TypeScript
