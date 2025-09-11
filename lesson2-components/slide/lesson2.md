# Components & Hooks

## Lesson 2 - Advanced React Patterns

---

### Learning Objectives

By the end of this lesson, you will be able to:

- Create advanced React components
- Implement custom hooks
- Handle forms effectively
- Use TypeScript with components and hooks

---

### Component Patterns

1. Functional Components
2. Higher-Order Components
3. Compound Components
4. Render Props
5. Custom Hooks

---

### Advanced Component Example

```typescript
interface TableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T]) => React.ReactNode;
  }[];
}

function DataTable<T extends object>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key as string}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col.key as string}>
                {col.render
                  ? col.render(row[col.key])
                  : (row[col.key] as string)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

### Custom Hooks

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

---

### Form Handling

```typescript
function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { values, errors, handleChange };
}
```

---

### Best Practices

1. Component Design

   - Single Responsibility
   - DRY Principle
   - Composition over Inheritance

2. Hook Rules

   - Only Call at Top Level
   - Only Call from React Functions
   - Use Proper Dependencies

3. Performance
   - Memoization (useMemo, useCallback)
   - Avoid Premature Optimization
   - Profile Before Optimizing

---

### Common Pitfalls

1. Component Issues

   - Prop Drilling
   - Unnecessary State
   - Complex Renders

2. Hook Issues
   - Missing Dependencies
   - Infinite Loops
   - State Updates in Effects

---

### Practical Exercise

Create a Form Component:

```typescript
interface FormData {
  username: string;
  email: string;
  password: string;
}

function RegistrationForm() {
  const { values, errors, handleChange } = useForm<FormData>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <form>
      <input name="username" value={values.username} onChange={handleChange} />
      {/* Add other fields */}
    </form>
  );
}
```

---

### Additional Resources

- [React Hooks API](https://react.dev/reference/react/hooks)
- [TypeScript React Patterns](https://www.patterns.dev/typescript)
- [Form Handling Best Practices](https://react-hook-form.com/)
