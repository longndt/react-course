# Lab 5: React Performance Optimization & Advanced Patterns

## Overview

In this focused lab exercise, you'll implement advanced React performance optimization techniques and patterns. This demonstrates essential optimization strategies used in modern React applications.

_For detailed learning objectives and performance concepts, see [../README.md](../README.md)_

## Exercises

- Code Splitting & Lazy Loading
- Component Memoization
- Virtual Lists & Performance Monitoring

## Exercises

### Exercise 1: Code Splitting

1. Implement React.lazy for route components:

```jsx
// src/App.jsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

2. Create a LoadingSpinner component:

```jsx
// src/components/LoadingSpinner/LoadingSpinner.jsx
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
}

// src/components/LoadingSpinner/LoadingSpinner.css
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

3. Create an ErrorBoundary for lazy-loaded components:

```jsx
// src/components/ErrorBoundary.jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Update App.jsx
function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>{/* ... routes ... */}</Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
```

### Exercise 2: Component Memoization

1. Create a memoized list component:

```jsx
// src/components/MemoizedList.jsx
import { memo, useState, useMemo } from "react";

const ListItem = memo(function ListItem({ item, onSelect }) {
  console.log(`Rendering ListItem: ${item.id}`);
  return (
    <div className="list-item" onClick={() => onSelect(item)}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
});

function MemoizedList({ items }) {
  const [selectedId, setSelectedId] = useState(null);

  const sortedItems = useMemo(() => {
    console.log("Sorting items...");
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  }, [items]);

  const handleSelect = (item) => {
    setSelectedId(item.id);
  };

  return (
    <div className="memoized-list">
      {sortedItems.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onSelect={handleSelect}
          isSelected={item.id === selectedId}
        />
      ))}
    </div>
  );
}

export default memo(MemoizedList);
```

2. Implement a performance-optimized form:

```jsx
// src/components/OptimizedForm.jsx
import { memo, useCallback, useState } from "react";

const Input = memo(function Input({ label, value, onChange }) {
  console.log(`Rendering Input: ${label}`);
  return (
    <div className="form-group">
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
});

function OptimizedForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleNameChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, name: value }));
  }, []);

  const handleEmailChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, email: value }));
  }, []);

  const handleMessageChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, message: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Name" value={formData.name} onChange={handleNameChange} />
      <Input
        label="Email"
        value={formData.email}
        onChange={handleEmailChange}
      />
      <Input
        label="Message"
        value={formData.message}
        onChange={handleMessageChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default memo(OptimizedForm);
```

### Exercise 3: Virtual List Implementation

Create a virtualized list component:

```jsx
// src/components/VirtualList.jsx
import { useState, useEffect, useRef } from "react";

function VirtualList({ items, itemHeight, windowHeight, renderItem }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef();

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleItems = Math.ceil(windowHeight / itemHeight);
  const endIndex = Math.min(startIndex + visibleItems + 1, items.length);

  const visibleData = items.slice(startIndex, endIndex);

  const handleScroll = () => {
    const { scrollTop } = containerRef.current;
    setScrollTop(scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: windowHeight,
        overflow: "auto",
      }}
    >
      <div style={{ height: totalHeight }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          {visibleData.map((item, index) =>
            renderItem(item, startIndex + index)
          )}
        </div>
      </div>
    </div>
  );
}

// Usage example:
function VirtualizedList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    description: `Description for item ${i}`,
  }));

  return (
    <VirtualList
      items={items}
      itemHeight={50}
      windowHeight={400}
      renderItem={(item, index) => (
        <div
          key={item.id}
          style={{
            height: 50,
            padding: 10,
            borderBottom: "1px solid #eee",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      )}
    />
  );
}
```

### Exercise 4: Performance Monitoring

1. Create a performance monitoring component:

```jsx
// src/components/PerformanceMonitor.jsx
import { Profiler } from "react";

function PerformanceMonitor({ id, children }) {
  const handleRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    });
  };

  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
}

// Usage
function App() {
  return (
    <PerformanceMonitor id="app">
      <div className="app">{/* App content */}</div>
    </PerformanceMonitor>
  );
}
```

2. Implement a custom performance hook:

```jsx
// src/hooks/usePerformance.js
function usePerformance(label) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`${label} took ${duration}ms`);
    };
  }, [label]);
}

// Usage
function ExpensiveComponent() {
  usePerformance("ExpensiveComponent");

  // Component logic
  return <div>{/* Component content */}</div>;
}
```

## Bonus Tasks

### 1. Implement Intersection Observer

Create a component that lazy loads images:

```jsx
// src/components/LazyImage.jsx
function LazyImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {isVisible ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="image-placeholder" />
      )}
    </div>
  );
}
```

### 2. Add Web Worker

Implement a web worker for heavy computations:

```jsx
// src/workers/compute.worker.js
self.addEventListener("message", (e) => {
  const { data } = e;

  // Heavy computation
  const result = heavyComputation(data);

  self.postMessage(result);
});

// src/hooks/useWebWorker.js
function useWebWorker(workerPath) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker(workerPath);

    workerRef.current.onmessage = (e) => {
      setResult(e.data);
    };

    workerRef.current.onerror = (e) => {
      setError(e.error);
    };

    return () => workerRef.current.terminate();
  }, [workerPath]);

  const compute = useCallback((data) => {
    workerRef.current.postMessage(data);
  }, []);

  return { result, error, compute };
}
```

## Submission Requirements

1. GitHub repository containing:

   - Complete application code
   - Performance optimization documentation
   - Benchmark results
   - Profile traces

2. Your implementation should demonstrate:
   - Code splitting
   - Memoization
   - Virtual list
   - Performance monitoring
   - Error handling

## Grading Criteria

- Code Splitting Implementation (20%)
- Memoization Usage (20%)
- Virtual List Performance (20%)
- Performance Monitoring (20%)
- Code Quality (20%)

## Additional Resources

- [React Performance](https://react.dev/learn/managing-state)
- [Code Splitting Guide](https://react.dev/reference/react/lazy)
- [Profiler API](https://react.dev/reference/react/Profiler)
- [Web Workers Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
