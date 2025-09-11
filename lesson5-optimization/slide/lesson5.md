# Optimization & Deployment

## Lesson 5 - Performance & Production

---

### Learning Objectives

By the end of this lesson, you will be able to:

- Optimize React applications
- Implement code splitting
- Configure build process
- Deploy React applications

---

### Performance Optimization

1. Component Optimization

   - Memoization
   - Virtual Lists
   - Lazy Loading

2. Bundle Optimization
   - Code Splitting
   - Tree Shaking
   - Compression

---

### Code Splitting

```typescript
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

---

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

interface Props {
  data: ExpensiveData;
  onAction: (id: string) => void;
}

const MemoizedComponent = memo(({ data, onAction }: Props) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  const handleClick = useCallback((id: string) => {
    onAction(id);
  }, [onAction]);

  return (
    // Component implementation
  );
});
```

---

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});
```

---

### Deployment Checklist

1. Build Optimization

   - Minification
   - Tree Shaking
   - Asset Optimization

2. Environment Setup

   - Environment Variables
   - API Configuration
   - Error Tracking

3. Security
   - Content Security Policy
   - HTTPS
   - Security Headers

---

### Performance Monitoring

```typescript
import { useEffect } from "react";

function usePerformanceMonitoring() {
  useEffect(() => {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        // Send metrics to analytics
      });

      observer.observe({
        entryTypes: ["paint", "largest-contentful-paint"],
      });

      return () => observer.disconnect();
    }
  }, []);
}
```

---

### Best Practices

1. Performance

   - Measure First
   - Profile Regularly
   - Optimize Critical Path
   - Lazy Load Non-Critical

2. Deployment
   - Automated Pipeline
   - Staged Rollout
   - Monitoring Setup
   - Backup Strategy

---

### Common Pitfalls

1. Performance Issues

   - Over-optimization
   - Unnecessary Renders
   - Large Bundles

2. Deployment Issues
   - Environment Mismatch
   - Missing Dependencies
   - Cache Issues

---

### Practical Exercise

Implement Code Splitting:

```typescript
const routes = [
  {
    path: "/dashboard",
    component: lazy(() => import("./pages/Dashboard")),
  },
  {
    path: "/profile",
    component: lazy(() => import("./pages/Profile")),
  },
];

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Suspense>
  );
}
```

---

### Additional Resources

- [React Performance](https://react.dev/learn/reference/react/memo)
- [Web Vitals](https://web.dev/vitals/)
- [Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Performance Monitoring](https://web.dev/metrics/)
