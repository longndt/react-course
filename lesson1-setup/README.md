# Lesson 1: Modern React Setup & Fundamentals

## Overview

This lesson covers modern React development approaches, setup methods, and fundamental concepts for advanced web developers.

## Prerequisites

- Node.js (v18+) installed
- Basic understanding of JavaScript/TypeScript
- Familiarity with web development concepts
- Code editor (VS Code recommended)

## Theory (45 minutes)

### 1. Evolution of React Development

- React's journey from 2013 to present
- Key milestones and changes
- Modern React features (React 18+)

### 2. Build Tools Comparison

- Create React App (CRA)
  - Pros: Easy to start, well-documented
  - Cons: Slower builds, less flexible
- Vite
  - Pros: Fast builds, modern approach
  - Cons: Newer, smaller ecosystem
- Next.js
  - Pros: Full-featured, SSR support
  - Cons: More complex, opinionated

### 3. React 18 Key Features

- Automatic Batching
- Transitions
- Suspense
- Concurrent Features
- New Hooks (useId, useTransition, useDeferredValue)

### 4. Project Structure Best Practices

```
src/
├── components/
│   ├── common/
│   └── features/
├── hooks/
├── services/
├── utils/
├── types/
└── pages/
```

## Demo (45 minutes)

### 1. Setting Up Projects

```bash
# CRA Setup
npx create-react-app cra-demo
cd cra-demo
npm start

# Vite Setup
npm create vite@latest vite-demo -- --template react-ts
cd vite-demo
npm install
npm run dev

# Direct HTML Setup
# See html-integration/index.html
```

### 2. Converting REST API Project

- Integration with existing APIs
- Setting up API clients
- Environment configuration
- Type definitions

### 3. Development Environment

- VS Code setup
- Essential extensions
- Debug configuration
- ESLint & Prettier setup

## Lab Exercises (90 minutes)

### Exercise 1: Multi-Project Setup (30 mins)

1. Create three React projects:
   - CRA project with TypeScript
   - Vite project with TypeScript
   - Basic HTML integration
2. Compare build times and initial setup

### Exercise 2: API Integration (30 mins)

1. Create a dashboard that displays:
   - User list from API
   - Product data from API
   - Basic statistics
2. Implement loading states
3. Handle errors gracefully

### Exercise 3: Project Structure (30 mins)

1. Set up a proper project structure
2. Create reusable components
3. Implement proper typing
4. Add documentation

## Project Files

See the following directories:

- `/cra-demo`
- `/vite-demo`
- `/html-integration`

## Additional Resources

- [React 18 Documentation](https://reactjs.org)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Homework

1. Create a new React project using your preferred method
2. Integrate with at least two different APIs
3. Implement proper error handling and loading states
4. Document your code using TypeScript and JSDoc
