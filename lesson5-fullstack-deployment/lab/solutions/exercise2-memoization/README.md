# Exercise 2: Component Memoization

Complete solution demonstrating React performance optimization with React.memo, useCallback, and useMemo.

## Features Implemented

- **React.memo**- Prevent unnecessary component re-renders
- **useCallback**- Memoize callback functions
- **useMemo**- Memoize expensive computations
- **Performance Comparison**- Side-by-side memoized vs non-memoized
- **Real-world example**- 1000 user list with filtering and sorting

## Project Structure

```
exercise2-memoization/
├── src/
│   ├── components/
│   │   ├── UserList.tsx              # Memoized user list
│   │   ├── UserList.css
│   │   ├── PerformanceComparison.tsx # Visual comparison demo
│   │   └── PerformanceComparison.css
│   ├── pages/
│   │   ├── UsersPage.tsx             # Main page with all optimizations
│   │   └── UsersPage.css
│   ├── main.tsx
│   └── index.css
├── package.json
└── readme.md
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and **press F12 to open Console**

### Build

```bash
npm run build
```

## How to Test Memoization

### Test 1: React.memo with useCallback

1. **Open Console**(F12)
2. **Click "Increment (Test Re-render)" button**multiple times
3. **Observe Console Output**
   - See: `" Rendering UserList (parent component)"`
   - Don't see: `"Rendering UserItem: X"` messages

4. **What This Proves**
   - Parent component re-renders
   - Child components (UserItems) DO NOT re-render
   - React.memo + useCallback working!

### Test 2: useMemo for Expensive Calculations

1. **Type in Search Box**(e.g., "User 5")
2. **Observe Console**
   - See: `" Filtering and sorting users..."`
   - See: `" Calculating stats..."`

3. **Click "Increment" button**(unrelated state)
4. **Observe Console**
   - Do NOT see filtering/sorting messages
   - useMemo prevents recalculation!

5. **Change Sort Order**(A→Z / Z→A)
6. **Observe Console**
   - See: `" Filtering and sorting users..."`
   - useMemo recalculates only when dependencies change

### Test 3: Performance Comparison Component

Scroll down to the " React.memo Performance Comparison" section.

1. **Click "Increment Parent"**
   - Left (No Memo): Logs `" ExpensiveComponentNoMemo rendering..."`
   - Right (With Memo): Does NOT log anything (skipped render)

2. **Click "Increment Child"**
   - Left (No Memo): Logs rendering
   - Right (With Memo): Logs rendering (prop changed, so it should render)

## Key Concepts Demonstrated

### 1. React.memo

Prevents component from re-rendering unless props change.

**Without React.memo:**
```typescript
function UserItem({ user, onSelect }: UserItemProps) {
  // Re-renders EVERY time parent renders
  return <div onClick={() => onSelect(user)}>...</div>;
}
```

**With React.memo:**
```typescript
const UserItem = memo(function UserItem({ user, onSelect }: UserItemProps) {
  // Only re-renders when user or onSelect props change
  return <div onClick={() => onSelect(user)}>...</div>;
});
```

### 2. useCallback

Memoizes callback functions to keep reference stable.

**Problem (Without useCallback):**
```typescript
function UsersPage() {
  const handleSelect = (user: User) => {  //  New function every render
    setSelectedUser(user.id);
  };

  return <UserList onSelect={handleSelect} />; // Prop "changes" every time
}
```

**Solution (With useCallback):**
```typescript
function UsersPage() {
  const handleSelect = useCallback((user: User) => {  //  Same function reference
    setSelectedUser(user.id);
  }, []); // Empty deps = never recreated

  return <UserList onSelect={handleSelect} />; // Prop stays stable
}
```

### 3. useMemo

Memoizes expensive calculations.

**Problem (Without useMemo):**
```typescript
function UsersPage() {
  const filtered = users.filter(...).sort(...);  //  Runs every render
  return <UserList users={filtered} />;
}
```

**Solution (With useMemo):**
```typescript
function UsersPage() {
  const filtered = useMemo(() => {
    return users.filter(...).sort(...);  //  Only runs when deps change
  }, [users, searchTerm, sortAsc]);

  return <UserList users={filtered} />;
}
```

## Performance Impact

### Scenario: 1000 User List

**Without Optimization:**
- Filter/sort calculation: Runs on EVERY render (even clicking increment!)
- UserItem renders: All 1000 items re-render on parent state change
- Total: ~1000+ wasted renders per interaction

**With Optimization:**
- Filter/sort calculation: Only runs when search/sort changes
- UserItem renders: 0 re-renders on unrelated state changes
- Total: Only necessary renders

### Real Numbers (Open React DevTools Profiler):

| Action | Without Memo | With Memo | Improvement |
|--------|--------------|-----------|-------------|
| Click Increment | ~1000 renders | 1 render | **99.9%**faster |
| Type in Search | ~1000 renders | ~500 renders (filtered) | **50%**faster |
| Change Sort | ~1000 renders | ~1000 renders (all need update) | Same (expected) |

## When to Use Each Hook

### React.memo

 **Use when:**
- Component renders often with same props
- Component is expensive to render
- Component is in a list
- Parent re-renders frequently

 **Don't use when:**
- Component is cheap to render
- Props change on every render
- Adds unnecessary complexity

### useCallback

 **Use when:**
- Passing callbacks to memoized child components
- Callbacks are dependencies of useEffect/useMemo
- Function is expensive to create

 **Don't use when:**
- Function is not passed as prop
- Child is not memoized
- Premature optimization

### useMemo

 **Use when:**
- Calculation is expensive (filtering, sorting, heavy math)
- Used in render or as dependency
- Noticeable performance impact

 **Don't use when:**
- Calculation is simple (`x + y`)
- Only used once
- Premature optimization

## Advanced Patterns

### Custom Comparison Function

```typescript
const UserItem = memo(
  function UserItem({ user, onSelect }) {
    return <div>...</div>;
  },
  (prevProps, nextProps) => {
    // Custom comparison - return true to skip render
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### Dependencies Best Practices

```typescript
//  Good: Specific dependencies
const filtered = useMemo(
  () => users.filter(u => u.name.includes(search)),
  [users, search]
);

//  Bad: Missing dependencies
const filtered = useMemo(
  () => users.filter(u => u.name.includes(search)),
  [users] // Missing 'search'!
);

//  Bad: No dependencies (defeats purpose)
const filtered = useMemo(
  () => users.filter(u => u.name.includes(search)),
  []
);
```

### Combining Optimizations

```typescript
// UserList: Memoized with memoized children
const UserList = memo(function UserList({ users, onSelect }) {
  return (
    <>
      {users.map(user => (
        <UserItem key={user.id} user={user} onSelect={onSelect} />
      ))}
    </>
  );
});

// Parent: Memoized callback + expensive calc
function UsersPage() {
  const handleSelect = useCallback((user: User) => {
    setSelected(user.id);
  }, []);

  const sorted = useMemo(() =>
    users.sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  );

  return <UserList users={sorted} onSelect={handleSelect} />;
}
```

## Common Pitfalls

### 1. Object/Array Props Break Memoization

```typescript
//  Bad: New object every render
<UserItem user={user} style={{ color: 'red' }} />

//  Good: Stable reference
const style = useMemo(() => ({ color: 'red' }), []);
<UserItem user={user} style={style} />
```

### 2. Inline Functions Break Memoization

```typescript
//  Bad: New function every render
<UserList onSelect={(user) => setSelected(user.id)} />

//  Good: Memoized callback
const handleSelect = useCallback((user) => setSelected(user.id), []);
<UserList onSelect={handleSelect} />
```

### 3. Over-Optimization

```typescript
//  Bad: Unnecessary for simple component
const SimpleText = memo(({ text }: { text: string }) => <p>{text}</p>);

//  Good: Just use regular component
function SimpleText({ text }: { text: string }) {
  return <p>{text}</p>;
}
```

## Learning Outcomes

After completing this exercise, you understand:

 How React.memo prevents unnecessary re-renders
 Why callbacks need useCallback for memoization
 How useMemo optimizes expensive calculations
 When to apply each optimization technique
 How to measure performance impact
 Common pitfalls and how to avoid them

## Related Exercises

- **Exercise 1** Code Splitting & Lazy Loading
- **Exercise 3** Virtual Lists for Large Datasets
- **Exercise 4** Production Build & Deployment

## Additional Resources

- [React.memo API](https://react.dev/reference/react/memo)
- [useCallback Hook](https://react.dev/reference/react/useCallback)
- [useMemo Hook](https://react.dev/reference/react/useMemo)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Profiling Components](https://react.dev/learn/react-developer-tools)

## Performance Profiling

### Using React DevTools

1. Install [React DevTools](https://react.dev/learn/react-developer-tools)
2. Open Profiler tab
3. Click Record ⏺
4. Interact with app (click increment, search, etc.)
5. Stop recording ⏹
6. Analyze flame graph:
   - Gray bars = Memoized (didn't render)
   - Colored bars = Rendered

### Using Browser DevTools

```javascript
// In console
console.time('filter');
// ... run expensive operation
console.timeEnd('filter'); // Logs: "filter: 12.34ms"
```

## 💪 Challenge Exercises

1. **Add pagination** Implement pagination with useMemo
2. **Add multi-select** Allow selecting multiple users with useCallback
3. **Add custom comparator** Implement custom memo comparison for UserItem
4. **Profile optimization** Measure before/after using React Profiler
5. **Add debounce** Debounce search input for better performance
