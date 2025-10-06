# React Component Lifecycle & Hooks Diagrams

## 1. Component Lifecycle Overview

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant React
    participant Component
    participant DOM

    User->>Browser: Visits page
    Browser->>React: Initialize React app
    React->>Component: Create component instance

    rect rgb(200, 255, 200)
        Note over Component: MOUNTING PHASE
        Component->>Component: Constructor/Initialize
        Component->>Component: Render (return JSX)
        Component->>DOM: Commit to DOM
        Component->>Component: useEffect (mount)
    end

    rect rgb(255, 255, 200)
        Note over Component: UPDATING PHASE
        User->>Component: Interaction (click, type, etc.)
        Component->>Component: State/Props change
        Component->>Component: Re-render
        Component->>DOM: Update DOM
        Component->>Component: useEffect (dependencies changed)
    end

    rect rgb(255, 200, 200)
        Note over Component: UNMOUNTING PHASE
        User->>Browser: Navigate away
        Component->>Component: useEffect cleanup
        Component->>DOM: Remove from DOM
        Component->>React: Destroy component
    end
```

---

## 2. Functional Component Render Cycle

```mermaid
flowchart TD
    Start([Component Called]) --> Check{First Render?}

    Check -->|Yes| Init[Initialize State<br/>useState initial value]
    Check -->|No| Reuse[Reuse State<br/>from previous render]

    Init --> Render[Execute Component Function<br/>JSX Creation]
    Reuse --> Render

    Render --> Virtual[Create Virtual DOM]
    Virtual --> Diff{Changes<br/>Detected?}

    Diff -->|Yes| Update[Update Real DOM<br/>Minimal changes only]
    Diff -->|No| Skip[Skip DOM update]

    Update --> Effects[Run useEffect<br/>if dependencies changed]
    Skip --> Effects

    Effects --> Complete([Render Complete])

    Complete --> Wait[Wait for next trigger]
    Wait --> Trigger{Trigger?}

    Trigger -->|State Update| Check
    Trigger -->|Props Change| Check
    Trigger -->|Force Update| Check
    Trigger -->|Unmount| Cleanup[Run useEffect cleanups]

    style Init fill:#d4edda
    style Render fill:#fff3cd
    style Update fill:#cce5ff
    style Effects fill:#f8d7da
    style Cleanup fill:#ffe1e1
```

---

## 3. useState Hook Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Initial: Component Mount

    Initial --> Stored: Initialize State<br/>useState(initialValue)

    Stored --> Reading: Component Reads State<br/>const [value, setValue]

    Reading --> Rendering: Use value in JSX<br/>{value}

    Rendering --> Displayed: DOM Shows Value

    Displayed --> UserAction: User Interaction<br/>(click, input, etc.)

    UserAction --> Updating: Call setState<br/>setValue(newValue)

    Updating --> Queued: React Queues Update<br/>(batching)

    Queued --> Rerender: Trigger Re-render

    Rerender --> Stored: New State Value

    Stored --> [*]: Component Unmount

    note right of Queued
        React batches multiple
        setState calls for
        performance
    end note
```

---

## 4. useEffect Hook Execution Timeline

```mermaid
gantt
    title useEffect Execution During Component Lifecycle
    dateFormat X
    axisFormat %L

    section First Render
    Component Function Runs        :a1, 0, 10
    JSX Creation                   :a2, 10, 20
    DOM Commit                     :a3, 20, 30
    useEffect (mount) Runs         :crit, a4, 30, 40
    Browser Paint                  :a5, 40, 50

    section State Update
    setState Called                :b1, 50, 55
    Component Re-runs              :b2, 55, 65
    JSX Re-creation                :b3, 65, 75
    DOM Update                     :b4, 75, 85
    useEffect (update) Runs        :crit, b5, 85, 95
    Browser Repaint                :b6, 95, 105

    section Unmount
    Navigation/Unmount Trigger     :c1, 105, 110
    useEffect Cleanup Runs         :crit, c2, 110, 120
    Component Destroyed            :c3, 120, 130
```

---

## 5. Multiple Hooks Execution Order

```mermaid
flowchart TD
    Render[Component Renders] --> H1[Hook 1: useState]
    H1 --> H2[Hook 2: useState]
    H2 --> H3[Hook 3: useEffect #91;#93;]
    H3 --> H4[Hook 4: useEffect #91;deps#93;]
    H4 --> H5[Hook 5: useContext]
    H5 --> H6[Hook 6: useRef]
    H6 --> H7[Hook 7: useMemo]
    H7 --> H8[Hook 8: useCallback]
    H8 --> JSX[Return JSX]

    JSX --> DOM[Commit to DOM]

    DOM --> Effect1[Run useEffect #91;#93;<br/>mount only]
    Effect1 --> Effect2[Run useEffect #91;deps#93;<br/>if deps changed]

    Effect2 --> Paint[Browser Paint]

    style H1 fill:#e1f5e1
    style H2 fill:#e1f5e1
    style H3 fill:#ffe1e1
    style H4 fill:#ffe1e1
    style Effect1 fill:#ffd4d4
    style Effect2 fill:#ffd4d4
```

**Rules**:
1. ✅ Hooks must be called in the **same order** every render
2. ✅ Hooks must be at the **top level** (not in conditions/loops)
3. ✅ `useEffect` runs **after** render and DOM commit
4. ✅ Multiple `useEffect` hooks run in **order of declaration**

---

## 6. useEffect Dependency Array Behavior

```mermaid
graph TD
    Component[Component Renders] --> Check{useEffect<br/>Dependency Array?}

    Check -->|No array| Always[Runs on EVERY render<br/>useEffect#40;#41; => {...}#41;]
    Check -->|Empty array #91;#93;| Once[Runs ONCE on mount<br/>useEffect#40;#41; => {...}, #91;#93;#41;]
    Check -->|With deps #91;a, b#93;| Compare{Dependencies<br/>Changed?}

    Compare -->|Yes| Run[Run Effect]
    Compare -->|No| Skip[Skip Effect]

    Always --> Cleanup1{Cleanup<br/>Function?}
    Once --> Cleanup2{Cleanup<br/>Function?}
    Run --> Cleanup3{Cleanup<br/>Function?}

    Cleanup1 -->|Yes| Clean1[Run cleanup on<br/>EVERY re-render]
    Cleanup2 -->|Yes| Clean2[Run cleanup on<br/>UNMOUNT only]
    Cleanup3 -->|Yes| Clean3[Run cleanup when<br/>deps change or unmount]

    style Always fill:#ffe1e1
    style Once fill:#d4edda
    style Run fill:#fff3cd
    style Skip fill:#e7f3ff
```

---

## 7. Component Re-render Triggers

```mermaid
mindmap
  root((Component<br/>Re-renders))
    State Changes
      useState
      useReducer
      Custom hooks with state
    Props Changes
      Parent re-renders
      New prop values
      Prop reference changes
    Context Changes
      useContext value updates
      Provider value changes
    Force Updates
      Parent component re-renders
      Key prop changes
    Not Re-render
      Ref changes #40;useRef#41;
      Regular variables
      Memoized values #40;same deps#41;
```

---

## 8. Batching and Async Updates

```mermaid
sequenceDiagram
    participant User
    participant Event
    participant React
    participant Component
    participant DOM

    User->>Event: Click button
    Event->>React: Event handler triggered

    rect rgb(255, 255, 200)
        Note over React: BATCHING PHASE
        React->>Component: setState(1)
        React->>Component: setState(2)
        React->>Component: setState(3)
        Note over React: React batches all updates
    end

    React->>Component: Single re-render
    Component->>Component: Calculate new state
    Component->>DOM: Apply changes once
    DOM->>User: UI updates

    Note over React,Component: React 18+: Automatic batching<br/>even in setTimeout, Promises, etc.
```

---

## 9. Custom Hook Lifecycle

```mermaid
flowchart TD
    Parent[Parent Component] --> Custom[Call Custom Hook<br/>const data = useCustomData#40;#41;]

    Custom --> Internal1[Internal useState]
    Internal1 --> Internal2[Internal useEffect]
    Internal2 --> Logic[Custom Logic]
    Logic --> Return[Return Values]

    Return --> Parent

    Parent --> Render[Render with data]
    Render --> Update{Data Changed?}

    Update -->|Yes| Custom
    Update -->|No| Wait[Wait for trigger]

    Wait --> Trigger{Trigger?}
    Trigger -->|State change| Custom
    Trigger -->|Unmount| Cleanup[Custom Hook Cleanup]

    style Custom fill:#e1f5e1
    style Internal1 fill:#d4edda
    style Internal2 fill:#ffe1e1
    style Logic fill:#fff3cd
```

**Example**:
```typescript
function useCustomData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
    return () => cleanup(); // Cleanup
  }, []);

  return data;
}
```

---

## 10. Component vs Hook Lifecycle Comparison

```mermaid
graph LR
    subgraph Class Component Old
        A1[constructor#40;#41;] --> A2[render#40;#41;]
        A2 --> A3[componentDidMount#40;#41;]
        A3 --> A4[componentDidUpdate#40;#41;]
        A4 --> A5[componentWillUnmount#40;#41;]
    end

    subgraph Functional Component Modern
        B1[Component Function] --> B2[useState initialization]
        B2 --> B3[Render JSX]
        B3 --> B4[useEffect mount]
        B4 --> B5[useEffect deps]
        B5 --> B6[useEffect cleanup]
    end

    A1 -.Maps to.-> B2
    A2 -.Maps to.-> B3
    A3 -.Maps to.-> B4
    A4 -.Maps to.-> B5
    A5 -.Maps to.-> B6

    style A1 fill:#ffe1e1
    style A2 fill:#ffe1e1
    style A3 fill:#ffe1e1
    style A4 fill:#ffe1e1
    style A5 fill:#ffe1e1
    style B2 fill:#d4edda
    style B3 fill:#d4edda
    style B4 fill:#d4edda
    style B5 fill:#d4edda
    style B6 fill:#d4edda
```

---

## 11. Memory Leak Prevention with useEffect

```mermaid
flowchart TD
    Mount[Component Mounts] --> Setup[useEffect Runs]
    Setup --> Sub1[Subscribe to events]
    Setup --> Sub2[Start timers]
    Setup --> Sub3[Open connections]

    Sub1 --> Active[Component Active]
    Sub2 --> Active
    Sub3 --> Active

    Active --> Unmount{Component<br/>Unmounts?}

    Unmount -->|Without Cleanup| Leak[❌ MEMORY LEAK<br/>Listeners still active<br/>Timers still running<br/>Connections open]

    Unmount -->|With Cleanup| Clean[✅ CLEANUP FUNCTION]
    Clean --> Clean1[Unsubscribe events]
    Clean --> Clean2[Clear timers]
    Clean --> Clean3[Close connections]

    Clean1 --> Safe[✅ No Memory Leaks]
    Clean2 --> Safe
    Clean3 --> Safe

    style Leak fill:#ffe1e1
    style Safe fill:#d4edda
```

**Example with Cleanup**:
```typescript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer); // ✅ Prevents memory leak
  };
}, []);
```

---

## 12. Strict Mode Double Rendering (Development)

```mermaid
sequenceDiagram
    participant React
    participant Component
    participant DOM

    Note over React: React.StrictMode (Dev Only)

    React->>Component: First Render
    Component->>Component: Run component function
    Component->>Component: Run useEffect

    React->>Component: Second Render (intentional)
    Component->>Component: Run component function again
    Component->>Component: Cleanup previous useEffect
    Component->>Component: Run useEffect again

    React->>DOM: Commit to DOM (only once)

    Note over React,Component: This helps detect:<br/>- Side effects in render<br/>- Missing cleanup functions<br/>- State initialization issues
```

**Why?**: React 18+ runs components twice in development to help you catch bugs early.

---

**Created**: October 6, 2025
**For**: React Course - LongNDT
**Topic**: Component Lifecycle & Hooks
**Related Lessons**: Lesson 1, Lesson 2
