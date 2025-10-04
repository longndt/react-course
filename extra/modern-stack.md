# Modern React Stack

## Core Technologies

### Build Tools

- **Vite** (recommended) - Fast build tool and dev server
- **Create React App** - Traditional but slower option
- **Next.js** - Full-stack React framework

### Styling Solutions

- **Tailwind CSS** - Utility-first CSS framework
- **Styled Components** - CSS-in-JS solution
- **CSS Modules** - Scoped CSS
- **Emotion** - Performant CSS-in-JS library

### State Management

- **Zustand** - Lightweight and simple
- **Redux Toolkit** - Enterprise-grade solution
- **Jotai** - Atomic state management
- **Valtio** - Proxy-based state

### Data Fetching

- **TanStack Query (React Query)** - Server state management
- **SWR** - Data fetching with caching
- **Apollo Client** - GraphQL client
- **tRPC** - End-to-end typesafe APIs

### Form Handling

- **React Hook Form** - Performant forms with minimal re-renders
- **Formik** - Build forms without tears
- **React Final Form** - High performance subscription-based form state

### Testing

- **Vitest** - Fast unit test framework
- **React Testing Library** - Simple and complete testing utilities
- **Playwright** - E2E testing
- **MSW** - Mock Service Worker for API mocking

### TypeScript

- **TypeScript 5.0+** - Static type checking
- **ts-reset** - Better TypeScript defaults
- **type-fest** - Collection of essential TypeScript types

### Development Tools

- **ESLint** - Linting utility
- **Prettier** - Code formatter
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

### Deployment

- **Vercel** - Frontend cloud platform
- **Netlify** - Web development platform
- **Railway** - Infrastructure platform
- **Render** - Cloud application platform

## Package.json Example

```json
{
  "name": "modern-react-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@tanstack/react-query": "^4.24.0",
    "zustand": "^4.3.0",
    "react-hook-form": "^7.43.0",
    "@hookform/resolvers": "^2.9.0",
    "zod": "^3.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^3.1.0",
    "typescript": "^4.9.0",
    "vite": "^4.1.0",
    "vitest": "^0.28.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^5.16.0",
    "@testing-library/user-event": "^14.4.0",
    "msw": "^1.0.0",
    "eslint": "^8.35.0",
    "@typescript-eslint/eslint-plugin": "^5.54.0",
    "@typescript-eslint/parser": "^5.54.0",
    "eslint-plugin-react": "^7.32.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^2.8.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.1.0"
  }
}
```

## Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

## ESLint Configuration

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
```

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Modern React Patterns

### 1. Server Components (React 18+)

```jsx
// app/page.tsx - Server Component
async function HomePage() {
  const posts = await fetch("https://api.example.com/posts").then((r) =>
    r.json()
  );

  return (
    <div>
      <h1>Latest Posts</h1>
      <PostList posts={posts} />
    </div>
  );
}
```

### 2. Concurrent Features

```jsx
import { Suspense, lazy, startTransition } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  const [tab, setTab] = useState("home");

  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 3. Modern Hooks

```tsx
import { useId, useDeferredValue, useMemo } from 'react';

// useId for accessibility
interface FormFieldProps {
  label: string;
}

function FormField({ label }: FormFieldProps) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}

// useDeferredValue for performance
interface SearchResultsProps {
  query: string;
}

function SearchResults({ query }: SearchResultsProps) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => searchData(deferredQuery), [deferredQuery]);

  return <ResultsList results={results} />;
}
```

## Recommended Learning Path

1. **Foundation** (1-2 weeks)

   - Modern JavaScript (ES6+)
   - TypeScript basics
   - React fundamentals

2. **Core Concepts** (2-3 weeks)

   - Components and Hooks
   - State management
   - Event handling

3. **Ecosystem** (3-4 weeks)

   - React Router
   - Form handling
   - Data fetching

4. **Advanced Topics** (4-6 weeks)

   - Performance optimization
   - Testing strategies
   - Production deployment

5. **Modern Stack** (6+ weeks)
   - Next.js/Remix
   - Advanced patterns
   - Full-stack development

## Resources

### Official Documentation

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Community Resources

- [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React Patterns](https://reactpatterns.com)

### Tools and Extensions

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [VS Code ES7+ React/Redux snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Prettier](https://prettier.io)
- [ESLint](https://eslint.org)
