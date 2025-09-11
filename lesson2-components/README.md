# Lesson 2: Advanced Component Patterns & State Management

## Overview

This lesson covers advanced React component patterns, custom hooks, and state management solutions for complex applications.

## Prerequisites

- Completion of Lesson 1
- Understanding of React basics
- Familiarity with TypeScript
- Experience with React hooks

## Theory (45 minutes)

### 1. Advanced Component Patterns

- Higher-Order Components (HOCs)
- Render Props
- Compound Components
- Custom Hooks
- Component Composition

### 2. State Management Solutions

- React Context
  - When to use
  - Performance considerations
  - Best practices
- Redux Toolkit
  - Modern Redux patterns
  - RTK Query
  - Middleware
- Zustand
  - Simple state management
  - Integration with React
  - Performance benefits

### 3. Performance Optimization

- React.memo
- useMemo
- useCallback
- Code splitting
- Lazy loading

## Demo (45 minutes)

### 1. Building a Reusable Component Library

#### DataTable Component

```tsx
interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  sorting?: boolean;
  filtering?: boolean;
}

export const DataTable = <T,>({
  data,
  columns,
  sorting,
  filtering,
}: DataTableProps<T>) => {
  // Implementation
};
```

#### Form Components

```tsx
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
}) => {
  // Implementation
};
```

### 2. Custom Hooks Implementation

```tsx
// useAPI hook
const useAPI = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

### 3. State Management Setup

```tsx
// Zustand Store
interface Store {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useStore = create<Store>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

## Lab Exercises (90 minutes)

### Exercise 1: Component Library (30 mins)

1. Create reusable components:
   - Data table with sorting/filtering
   - Form components with validation
   - Modal system
2. Implement TypeScript types
3. Add documentation

### Exercise 2: Custom Hooks (30 mins)

1. Create custom hooks for:
   - API calls
   - Form handling
   - Authentication
   - Local storage
2. Write tests for hooks

### Exercise 3: State Management (30 mins)

1. Implement global state using Zustand
2. Create actions and selectors
3. Handle async operations
4. Implement persistence

## Project Structure

```
src/
├── components/
│   ├── DataTable/
│   ├── Form/
│   └── Modal/
├── hooks/
│   ├── useAPI.ts
│   ├── useForm.ts
│   └── useAuth.ts
└── store/
    ├── store.ts
    └── slices/
```

## Additional Resources

- [React Patterns](https://reactpatterns.com/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)

## Homework

1. Extend the component library
2. Create additional custom hooks
3. Implement complex state management
4. Write tests for components and hooks
