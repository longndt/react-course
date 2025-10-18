# TypeScript Strict Mode Guide

## Overview

TypeScript's strict mode enables additional type checking options that make your code more robust and catch potential errors at compile time. This guide demonstrates how to use strict mode effectively in React applications.

## Enabling Strict Mode

### 1. Basic Strict Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 2. Advanced Strict Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Key Strict Mode Features

### 1. Strict Null Checks

```tsx
// ❌ Without strict null checks - allows null/undefined
function getUserName(user: User | null): string {
  return user.name; // Error: Object is possibly 'null'
}

// ✅ With strict null checks - proper null handling
function getUserName(user: User | null): string {
  if (user === null) {
    throw new Error('User is null');
  }
  return user.name;
}

// ✅ Using optional chaining
function getUserName(user: User | null): string {
  return user?.name ?? 'Unknown';
}
```

### 2. No Implicit Any

```tsx
// ❌ Implicit any - not allowed in strict mode
function processData(data) {
  return data.map(item => item.value);
}

// ✅ Explicit typing
function processData(data: Array<{ value: string }>): string[] {
  return data.map(item => item.value);
}

// ✅ Using generics
function processData<T extends { value: string }>(data: T[]): string[] {
  return data.map(item => item.value);
}
```

### 3. Exact Optional Properties

```tsx
// ❌ Without exactOptionalPropertyTypes
interface User {
  name: string;
  email?: string;
}

const user: User = {
  name: 'John',
  email: undefined // This is allowed but might not be intended
};

// ✅ With exactOptionalPropertyTypes
interface User {
  name: string;
  email?: string | undefined; // Explicitly allow undefined
}

const user: User = {
  name: 'John',
  email: undefined // Now explicitly allowed
};
```

### 4. No Unchecked Indexed Access

```tsx
// ❌ Without noUncheckedIndexedAccess
function getFirstItem<T>(array: T[]): T {
  return array[0]; // Could be undefined
}

// ✅ With noUncheckedIndexedAccess
function getFirstItem<T>(array: T[]): T | undefined {
  return array[0]; // Explicitly returns T | undefined
}

// ✅ Safe access with proper handling
function getFirstItem<T>(array: T[]): T | undefined {
  return array[0];
}

function processFirstItem<T>(array: T[]): void {
  const firstItem = getFirstItem(array);
  if (firstItem !== undefined) {
    // Safe to use firstItem here
    console.log(firstItem);
  }
}
```

## React-Specific Strict Mode Patterns

### 1. Strict Component Props

```tsx
// ✅ Strict interface with exact optional properties
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean | undefined;
  className?: string | undefined;
  'aria-label'?: string | undefined;
}

function Button({ 
  children, 
  onClick, 
  disabled = false,
  className,
  'aria-label': ariaLabel 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
```

### 2. Strict State Management

```tsx
// ✅ Strict state typing
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

function UserManager() {
  const [state, setState] = useState<UserState>({
    users: [],
    loading: false,
    error: null
  });

  // Strict state updates
  const addUser = useCallback((user: User) => {
    setState(prevState => ({
      ...prevState,
      users: [...prevState.users, user]
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prevState => ({
      ...prevState,
      loading
    }));
  }, []);

  return (
    <div>
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}
      {state.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 3. Strict Event Handlers

```tsx
// ✅ Strict event handler typing
function FormComponent() {
  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  // Strict event handler
  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setIsValid(value.includes('@'));
  }, []);

  // Strict form submission
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      console.log('Submitting email:', email);
    }
  }, [email, isValid]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        aria-invalid={!isValid}
        aria-describedby={!isValid ? 'email-error' : undefined}
      />
      {!isValid && (
        <div id="email-error">Please enter a valid email address</div>
      )}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
```

## Common Strict Mode Challenges

### 1. Handling Optional Properties

```tsx
// ❌ Problem: Optional property might be undefined
interface User {
  name: string;
  avatar?: string;
}

function UserAvatar({ user }: { user: User }) {
  return (
    <img 
      src={user.avatar} // Error: string | undefined
      alt="User avatar" 
    />
  );
}

// ✅ Solution: Proper null checking
function UserAvatar({ user }: { user: User }) {
  if (user.avatar === undefined) {
    return <div className="avatar-placeholder">No avatar</div>;
  }
  
  return (
    <img 
      src={user.avatar} // Now guaranteed to be string
      alt="User avatar" 
    />
  );
}

// ✅ Alternative: Using optional chaining
function UserAvatar({ user }: { user: User }) {
  return user.avatar ? (
    <img src={user.avatar} alt="User avatar" />
  ) : (
    <div className="avatar-placeholder">No avatar</div>
  );
}
```

### 2. Array Access Safety

```tsx
// ❌ Problem: Array access might return undefined
function getFirstUser(users: User[]): User {
  return users[0]; // Error: User | undefined
}

// ✅ Solution: Proper handling
function getFirstUser(users: User[]): User | undefined {
  return users[0];
}

// ✅ Alternative: Using array methods
function getFirstUser(users: User[]): User | undefined {
  return users.at(0); // Returns undefined for empty arrays
}

// ✅ Safe access with default
function getFirstUser(users: User[]): User {
  const firstUser = users[0];
  if (firstUser === undefined) {
    throw new Error('No users available');
  }
  return firstUser;
}
```

### 3. Generic Constraints

```tsx
// ❌ Problem: Generic without constraints
function getProperty<T>(obj: T, key: string): any {
  return obj[key]; // Error: No index signature
}

// ✅ Solution: Proper generic constraints
function getProperty<T extends Record<string, any>>(
  obj: T, 
  key: keyof T
): T[keyof T] {
  return obj[key];
}

// ✅ Alternative: Using mapped types
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## Best Practices

### 1. Gradual Adoption

Start with basic strict mode and gradually enable more options:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. Use Type Assertions Sparingly

```tsx
// ❌ Avoid: Unsafe type assertions
const user = data as User;

// ✅ Prefer: Type guards
function isUser(data: unknown): data is User {
  return typeof data === 'object' && 
         data !== null && 
         'name' in data && 
         'email' in data;
}

if (isUser(data)) {
  // data is now typed as User
  console.log(data.name);
}
```

### 3. Leverage Utility Types

```tsx
// ✅ Using utility types for strict typing
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Create a type for user updates (all fields optional except id)
type UserUpdate = Partial<Pick<User, 'name' | 'email'>> & Pick<User, 'id'>;

// Create a type for user creation (all fields required except id)
type CreateUser = Omit<User, 'id'>;

// Create a type for user display (exclude sensitive data)
type UserDisplay = Omit<User, 'password'>;
```

## Migration Strategy

1. **Start with basic strict mode**
2. **Fix type errors gradually**
3. **Enable additional strict options one by one**
4. **Use `any` temporarily with `@ts-ignore` if needed**
5. **Replace `any` with proper types over time**

## Resources

- [TypeScript Strict Mode Documentation](https://www.typescriptlang.org/tsconfig#strict)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

Remember: **Strict mode makes your code more robust and catches errors early. The initial effort pays off with better code quality and fewer runtime errors.**
