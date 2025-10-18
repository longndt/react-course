# Lesson 2: React Components & Hooks

## Overview

**Difficulty**: Intermediate
**Prerequisites**: Lesson 1 completed, TypeScript basics

This lesson covers React component architecture and hooks - the foundation of modern React development. You'll learn to build reusable components, manage state effectively, and create custom hooks for shared logic.

---

## 🎯 Learning Objectives

After completing this lesson, you will be able to:

- ✅ Build reusable component libraries with TypeScript
- ✅ Master component composition and props patterns
- ✅ Apply essential React Hooks (useState, useEffect, useRef, useContext, useReducer)
- ✅ Create custom hooks for reusable business logic
- ✅ Handle side effects and lifecycle events properly
- ✅ Avoid common Hook mistakes and anti-patterns
- ✅ Debug components with React DevTools
- ✅ Optimize component performance

---

## 📋 Prerequisites

Before starting this lesson, make sure you have:

### Required Knowledge
- ✅ React fundamentals (JSX, component basics)
- ✅ TypeScript basics (types, interfaces, generics)
- ✅ JavaScript ES6+ features (arrow functions, destructuring)
- ✅ Completed Lesson 1 setup

### Environment Setup
- ✅ Node.js and npm installed
- ✅ VS Code with React extensions
- ✅ React project created (Vite recommended)

### Verification
```bash
# Check your setup
node --version  # Should be 18+
npm --version   # Should be 9+
```

> **⚠️ Not ready?** → Review [Lesson 1](../lesson1-fundamentals-setup/) first

---

## 🚀 Quick Start

> 🎯 Goal: Master React components and hooks for building complex UIs

### Setup
```bash
# 1. Create new React project (if needed)
npm create vite@latest my-components-app -- --template react-ts
cd my-components-app

# 2. Install additional dependencies
npm install

# 3. Start development server
npm run dev
```

### Learning Path (Choose Your Style)
- 📖 **Theory First**: Start with [Theory](./theory/theory2.md) → [Examples](./example/) → [Lab](./lab/lab2.md)
- ⚡ **Hands-On**: Start with [Reference](./reference/) → [Examples](./example/) → [Theory](./theory/theory2.md)
- 🎯 **Quick Review**: [Reference](./reference/) → [Quiz](./quiz/quiz2.html) → Focus on weak areas

---

## What's Next

### Ready to Continue?
- **Completed this lesson?** → Proceed to [Lesson 3: API & Data Management](../lesson3-api-data/)

### Need More Practice?
- **Study theory** → [theory2.md](./theory/theory2.md) - Deep dive into components and hooks
- **View examples** → [example/](./example/) - Follow-along tutorials
- **Practice exercises** → [lab2.md](./lab/lab2.md) - Hands-on challenges

### Additional Resources
- **Quiz yourself** → [quiz/](./quiz/) - Test your knowledge
- ❓ **Having issues?** → [Troubleshooting Guide](../extras/troubleshooting_guide.md)
- **Advanced patterns** → [Advanced Patterns](../extras/advanced_patterns.md)

---

## Resources & References

### Course Guides
- [Advanced Patterns](../extras/advanced_patterns.md) - Advanced component patterns and techniques
- [State Management Guide](../extras/state_management.md) - State management patterns

### Official Documentation
- [React Components](https://react.dev/learn/your-first-component) - Component fundamentals
- [Hooks Reference](https://react.dev/reference/react) - All React hooks
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) - Building custom hooks
- [Component Composition](https://react.dev/learn/passing-props-to-a-component) - Props and composition

### Performance & Optimization
- [React.memo](https://react.dev/reference/react/memo) - Component memoization
- [useMemo & useCallback](https://react.dev/reference/react/useMemo) - Hook optimization
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools#profiler) - Performance profiling

### TypeScript with React
- [TypeScript with React](https://react.dev/learn/typescript) - TypeScript integration
- [Component Props Types](https://react.dev/learn/typescript#typing-component-props) - Props typing
- [Hook Types](https://react.dev/learn/typescript#typing-hooks) - Hook typing