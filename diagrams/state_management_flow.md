# State Management Flow Diagrams

## 1. State Management Levels Overview

```mermaid
graph TD
    App[React Application] --> Local[Local State<br/>useState, useReducer]
    App --> Lifted[Lifted State<br/>Props drilling]
    App --> Context[Context API<br/>Global state]
    App --> External[External Libraries<br/>Zustand, Redux, etc.]

    Local --> Use1[Single component state]
    Lifted --> Use2[Parent-child sharing]
    Context --> Use3[App-wide state]
    External --> Use4[Complex state logic]

    style Local fill:#d4edda
    style Lifted fill:#fff3cd
    style Context fill:#cce5ff
    style External fill:#f8d7da
```

---

## 2. Local State Flow (useState)

```mermaid
sequenceDiagram
    participant User
    participant Component
    participant State
    participant DOM

    User->>Component: Initial render
    Component->>State: useState(initialValue)
    State-->>Component: [value, setValue]
    Component->>DOM: Render with value
    DOM-->>User: Display UI

    User->>Component: User interaction (click, type)
    Component->>State: setValue(newValue)
    State->>State: Queue state update
    State->>Component: Trigger re-render
    Component->>DOM: Update UI
    DOM-->>User: Show new state
```


---

## 3. Lifted State (Props Drilling)

```mermaid
graph TD
    GrandParent[GrandParent Component<br/>State: user data] --> Parent1[Parent A]
    GrandParent --> Parent2[Parent B]

    Parent1 --> Child1[Child A1<br/>Receives: user prop]
    Parent1 --> Child2[Child A2<br/>Receives: user prop]

    Parent2 --> Child3[Child B1<br/>Receives: user prop]
    Parent2 --> Child4[Child B2<br/>Receives: user prop]

    Child1 --> Update1[Updates user via callback]
    Update1 -.Callback.-> GrandParent

    style GrandParent fill:#e1f5e1
    style Child1 fill:#ffe1e1
```


** Problems**
- 🔴 Props drilling through multiple levels
- 🔴 All intermediate components need props
- 🔴 Difficult to maintain

---

## 4. Context API Flow

```mermaid
graph TD
    Provider[Context Provider<br/>Wraps entire app<br/>Value: state + updaters] --> Tree[Component Tree]

    Tree --> Comp1[Component A<br/>✅ useContext]
    Tree --> Comp2[Component B<br/>❌ No context]
    Tree --> Comp3[Component C<br/>✅ useContext]

    Comp1 --> Access1[Direct access to context]
    Comp3 --> Access3[Direct access to context]

    Comp1 -.Update Context.-> Provider
    Comp3 -.Update Context.-> Provider

    Provider -.Re-render.-> Comp1
    Provider -.Re-render.-> Comp3

    style Provider fill:#e1f5e1
    style Comp1 fill:#d4edda
    style Comp2 fill:#f0f0f0
    style Comp3 fill:#d4edda
```


---

## 5. Context API vs Props Drilling Comparison

```mermaid
graph LR
    subgraph Props Drilling Problem
        A1[Level 1<br/>Has state] --> A2[Level 2<br/>Pass props]
        A2 --> A3[Level 3<br/>Pass props]
        A3 --> A4[Level 4<br/>Pass props]
        A4 --> A5[Level 5<br/>Use state]
    end

    subgraph Context API Solution
        B1[Provider<br/>Has state] --> B2[Level 2<br/>Skip]
        B2 --> B3[Level 3<br/>Skip]
        B3 --> B4[Level 4<br/>Skip]
        B4 --> B5[Level 5<br/>useContext]
        B1 -.Direct Access.-> B5
    end

    style A1 fill:#ffe1e1
    style A2 fill:#ffe1e1
    style A3 fill:#ffe1e1
    style A4 fill:#ffe1e1
    style A5 fill:#ffe1e1
    style B1 fill:#d4edda
    style B5 fill:#d4edda
```

---

## 6. Multiple Contexts Pattern

```mermaid
graph TD
    App[App Root] --> ThemeProvider[Theme Provider<br/>dark/light mode]
    ThemeProvider --> AuthProvider[Auth Provider<br/>user, login, logout]
    AuthProvider --> DataProvider[Data Provider<br/>app data, API calls]
    DataProvider --> Components[Component Tree]

    Components --> CompA[Component A<br/>useContext Theme]
    Components --> CompB[Component B<br/>useContext Auth]
    Components --> CompC[Component C<br/>useContext Theme + Auth]
    Components --> CompD[Component D<br/>useContext Data]

    style ThemeProvider fill:#e1f5e1
    style AuthProvider fill:#fff3cd
    style DataProvider fill:#cce5ff
```


---

## 7. useReducer State Flow

```mermaid
sequenceDiagram
    participant Component
    participant Reducer
    participant State
    participant DOM

    Component->>Reducer: useReducer(reducer, initialState)
    Reducer-->>Component: [state, dispatch]

    Component->>DOM: Render with state

    Note over Component: User clicks button
    Component->>Reducer: dispatch({ type: 'INCREMENT' })

    Reducer->>Reducer: switch(action.type)
    Reducer->>State: Return new state
    State->>Component: Trigger re-render
    Component->>DOM: Update UI
```


---

## 8. Zustand State Flow (External Library)

```mermaid
graph TD
    Store[Zustand Store<br/>Outside React] --> Hook1[useStore in Component A]
    Store --> Hook2[useStore in Component B]
    Store --> Hook3[useStore in Component C]

    Hook1 --> Update1[Update state]
    Update1 --> Store

    Store -.Auto Re-render.-> Hook1
    Store -.Auto Re-render.-> Hook2
    Store -.Auto Re-render.-> Hook3

    style Store fill:#e1f5e1
    style Hook1 fill:#d4edda
    style Hook2 fill:#d4edda
    style Hook3 fill:#d4edda
```

** Code Example**
```typescript
// 1. Create Store (outside component)
const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// 2. Use in any component
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>Count: {count}</button>;
}

function Display() {
  const count = useStore((state) => state.count); // Selective subscription
  return <p>{count}</p>;
}
```

** Benefits**
- ✅ No Provider needed
- ✅ Minimal boilerplate
- ✅ Selective subscriptions (performance)

---

## 9. Redux Toolkit Flow

```mermaid
flowchart TD
    Component[React Component] --> Dispatch[dispatch action]
    Dispatch --> Slice[Redux Slice]
    Slice --> Reducer[Reducer Function]
    Reducer --> State[Update State]
    State --> Store[Redux Store]
    Store --> Selector[useSelector]
    Selector --> Component

    Store --> Middleware{Middleware?}
    Middleware -->|Async| Thunk[Redux Thunk<br/>API calls]
    Middleware -->|Sync| Reducer

    Thunk --> API[External API]
    API --> Thunk
    Thunk --> Dispatch

    style Component fill:#e1f5e1
    style Store fill:#fff3cd
    style Thunk fill:#ffe1e1
```

** Code Example**
```typescript
// 1. Create Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

// 2. Configure Store
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

// 3. Use in Component
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(counterSlice.actions.increment())}>
      Count: {count}
    </button>
  );
}

// 4. Provider
<Provider store={store}>
  <App />
</Provider>
```

---

## 10. State Management Decision Tree

```mermaid
graph TD
    Start{Need State?} -->|No| None[No state management<br/>Use props only]
    Start -->|Yes| Scope{State Scope?}

    Scope -->|Single Component| Local[useState or useReducer]
    Scope -->|2-3 Components| Lift[Lift state to parent]
    Scope -->|Many Components| Global{Complexity?}

    Global -->|Simple| Context[Context API]
    Global -->|Medium| Zustand[Zustand]
    Global -->|Complex| Redux[Redux Toolkit]

    Local --> Simple{Simple Logic?}
    Simple -->|Yes| UseState[useState]
    Simple -->|No| UseReducer[useReducer]

    style None fill:#f0f0f0
    style UseState fill:#d4edda
    style UseReducer fill:#fff3cd
    style Context fill:#cce5ff
    style Zustand fill:#e7f3ff
    style Redux fill:#f8d7da
```

---

## 11. State Update Patterns Comparison

```mermaid
graph LR
    subgraph Direct Mutation BAD
        A1[state.count = 5] --> A2[❌ Does not trigger re-render]
    end

    subgraph Immutable Update GOOD
        B1[setState count: 5] --> B2[✅ Triggers re-render]
    end

    subgraph Object Update BAD
        C1[state.user.name = 'Bob'] --> C2[❌ Mutates object]
    end

    subgraph Object Update GOOD
        D1[setState ...state,<br/>user: ...user, name: 'Bob'] --> D2[✅ New object reference]
    end

    style A1 fill:#ffe1e1
    style A2 fill:#ffe1e1
    style C1 fill:#ffe1e1
    style C2 fill:#ffe1e1
    style B1 fill:#d4edda
    style B2 fill:#d4edda
    style D1 fill:#d4edda
    style D2 fill:#d4edda
```

** Example**

❌ ** Wrong** (Mutation):
```typescript
const [user, setUser] = useState({ name: 'Alice', age: 25 });

// DON'T DO THIS
user.name = 'Bob'; // Mutation!
setUser(user); // Same reference, may not re-render
```

✅ ** Correct** (Immutable):
```typescript
const [user, setUser] = useState({ name: 'Alice', age: 25 });

// DO THIS
setUser({ ...user, name: 'Bob' }); // New object
```

---

## 12. Async State Updates (API Calls)

```mermaid
sequenceDiagram
    participant User
    participant Component
    participant State
    participant API
    participant DOM

    User->>Component: Click "Load Data"
    Component->>State: setLoading(true)
    Component->>DOM: Show loading spinner

    Component->>API: fetch('/api/data')

    rect rgb(255, 255, 200)
        Note over API: Async Operation
        API-->>API: Process request
    end

    alt Success
        API-->>Component: Response data
        Component->>State: setData(response)
        Component->>State: setLoading(false)
        Component->>DOM: Display data
    else Error
        API-->>Component: Error
        Component->>State: setError(error)
        Component->>State: setLoading(false)
        Component->>DOM: Display error
    end
```

** Code Example**
```typescript
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/data');
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <DataDisplay data={data} />;
}
```

---

## 13. State Synchronization Across Tabs

```mermaid
graph TD
    Tab1[Browser Tab 1] --> LocalStorage[localStorage]
    Tab2[Browser Tab 2] --> LocalStorage
    Tab3[Browser Tab 3] --> LocalStorage

    Tab1 --> Event1[storage event listener]
    Tab2 --> Event2[storage event listener]
    Tab3 --> Event3[storage event listener]

    LocalStorage -.Broadcast.-> Event1
    LocalStorage -.Broadcast.-> Event2
    LocalStorage -.Broadcast.-> Event3

    Event1 --> Update1[Update state in Tab 1]
    Event2 --> Update2[Update state in Tab 2]
    Event3 --> Update3[Update state in Tab 3]

    style LocalStorage fill:#e1f5e1
```

** Code Example**
```typescript
function useSyncedState(key: string, initialValue: any) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [state, setState];
}
```

---

## 14. State Performance Optimization

```mermaid
graph TD
    Parent[Parent Component<br/>has state] --> Child1[Child A<br/>No memo]
    Parent --> Child2[Child B<br/>React.memo]
    Parent --> Child3[Child C<br/>React.memo + useMemo]

    Parent --> Update{State Updates}

    Update --> Render1[Child A re-renders<br/>ALWAYS]
    Update --> Check2{Props changed?}
    Update --> Check3{Props + computed<br/>changed?}

    Check2 -->|Yes| Render2[Child B re-renders]
    Check2 -->|No| Skip2[Skip re-render]

    Check3 -->|Yes| Render3[Child C re-renders]
    Check3 -->|No| Skip3[Skip re-render]

    style Render1 fill:#ffe1e1
    style Skip2 fill:#d4edda
    style Skip3 fill:#d4edda
```

** Code Example**
```typescript
// Without memo: re-renders on every parent update
function ChildA({ name }) {
  return <p>{name}</p>;
}

// With memo: re-renders only when props change
const ChildB = React.memo(({ name }) => {
  return <p>{name}</p>;
});

// With memo + useMemo: optimized computed values
const ChildC = React.memo(({ items }) => {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]); // Only recompute when items change

  return <p>Total: {total}</p>;
});
```

---

** Created** October 6, 2025
** For** React Course - LongNDT **Topic** State Management **Related Lessons** Lesson 2, Lesson 3
** Extra Material** [State Management Guide](../extras/state_management.md)
