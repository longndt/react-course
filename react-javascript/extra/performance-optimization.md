# React Performance Optimization Guide

## 📋 Table of Contents

- [Overview](#overview)
- [When to Optimize](#when-to-optimize)
- [Measuring Performance](#measuring-performance)
- [React DevTools Profiler](#react-devtools-profiler)
- [Memoization](#memoization)
- [Code Splitting](#code-splitting)
- [Virtual Lists](#virtual-lists)
- [Image Optimization](#image-optimization)
- [Bundle Analysis](#bundle-analysis)
- [Web Vitals](#web-vitals)
- [Advanced Patterns](#advanced-patterns)
- [Common Mistakes](#common-mistakes)
- [Checklist](#checklist)
- [Resources](#resources)

---

## Overview

Performance optimization ensures your React application is fast and responsive. This guide covers modern techniques to improve rendering speed, reduce bundle size, and enhance user experience.

**Performance Metrics**:
-  **First Contentful Paint (FCP)**: < 1.8s
-  **Largest Contentful Paint (LCP)**: < 2.5s
-  **Time to Interactive (TTI)**: < 3.8s
-  **Cumulative Layout Shift (CLS)**: < 0.1
-  **First Input Delay (FID)**: < 100ms

---

## When to Optimize

###  Don't Optimize Prematurely

> *"Premature optimization is the root of all evil."* - Donald Knuth

**Optimize when you have**:
-  Measurable performance problems
-  User complaints about slowness
-  Profiler data showing bottlenecks
-  Lighthouse score < 90

**Don't optimize when**:
-  "Just in case"
-  Without measuring first
-  Code works fine
-  No user impact

### Signs You Need Optimization

- Slow page loads (> 3 seconds)
- Laggy interactions (> 100ms delay)
- High CPU usage
- Large bundle size (> 500KB)
- Memory leaks
- Poor Lighthouse scores

---

## Measuring Performance

### React DevTools Profiler

**Installation**:
```bash
# Browser extension
# Chrome: https://chrome.google.com/webstore (React Developer Tools)
# Firefox: https://addons.mozilla.org/firefox (React Developer Tools)
```

**Using Profiler**:
1. Open React DevTools
2. Go to "Profiler" tab
3. Click "Record"
4. Interact with app
5. Click "Stop"
6. Analyze flame graph

**What to Look For**:
- Components that render too often
- Components that take too long to render
- Unnecessary re-renders

### Programmatic Profiler

```tsx
import { Profiler } from 'react';

function onRenderCallback(
  id, // Component identifier
  phase, // "mount" or "update"
  actualDuration, // Time spent rendering
  baseDuration, // Estimated time without memoization
  startTime, // When rendering started
  commitTime, // When committed
  interactions // Set of interactions
) {
  console.log(`${id} took ${actualDuration}ms to render`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MainContent />
    </Profiler>
  );
}
```

### Performance API

```tsx
// Mark start
performance.mark('component-render-start');

// ... component renders ...

// Mark end
performance.mark('component-render-end');

// Measure
performance.measure(
  'component-render',
  'component-render-start',
  'component-render-end'
);

// Get measurement
const measure = performance.getEntriesByName('component-render')[0];
console.log(`Render took ${measure.duration}ms`);
```

---

## React DevTools Profiler

### Finding Render Performance Issues

#### Example: Slow Component

```tsx
// Slow component (re-renders too often)
function ExpensiveList({ items, filter }) {
  // Expensive calculation on every render
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

**Profiler shows**:
- Component renders on every parent re-render
- filteredItems calculated unnecessarily
- 50ms+ render time

**Solution**:
```tsx
import { useMemo } from 'react';

function ExpensiveList({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // Only recalculate when items or filter change

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

**Result**: 50ms → 2ms render time

---

## Memoization

### useMemo

Memoizes expensive calculations.

#### When to Use

 **Good Use Cases**:
- Expensive calculations (sorting, filtering large arrays)
- Complex object transformations
- Derived data that doesn't change often

```tsx
function ProductList({ products, sortBy }) {
  // Without useMemo: re-sorts on every render
  const sortedProducts = useMemo(() => {
    console.log('Sorting products...');
    return [...products].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, sortBy]); // Only re-sort when products or sortBy changes

  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

 **Bad Use Cases**:
```tsx
// Don't use for simple calculations
const sum = useMemo(() => a + b, [a, b]); // Overkill!

// Don't use for primitives
const doubled = useMemo(() => count * 2, [count]); // Unnecessary
```

### useCallback

Memoizes function references.

#### When to Use

 **Good Use Cases**:
- Passing callbacks to memoized child components
- Dependencies in useEffect
- Callbacks passed to React.memo components

```tsx
import { useCallback, memo } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback: new function on every render
  // Child re-renders even if memoized
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Function reference stays the same

  return (
    <div>
      <p>Count: {count}</p>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

const ExpensiveChild = memo(({ onClick }) => {
  console.log('ExpensiveChild rendered');
  return <button onClick={onClick}>Increment</button>;
});
```

 **Bad Use Cases**:
```tsx
// Don't use if not passed to memoized components
function Component() {
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // No benefit if not passed to memo component

  return <button onClick={handleClick}>Click</button>;
}
```

### React.memo

Memoizes components (prevents re-renders if props unchanged).

```tsx
import { memo } from 'react';

// Without memo: re-renders when parent re-renders
const UserCard = memo(({ user }) => {
  console.log('UserCard rendered');
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});

// Custom comparison
const UserCardCustom = memo(
  ({ user }) => <div>{user.name}</div>,
  (prevProps, nextProps) => {
    // Return true if equal (skip render)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### When to Use Each

| Hook | Use Case | Example |
|------|----------|---------|
| `useMemo` | Expensive calculations | Sorting, filtering large lists |
| `useCallback` | Function references | Callbacks to memo components |
| `React.memo` | Prevent re-renders | Pure components with stable props |

---

## Code Splitting

### React.lazy & Suspense

#### Basic Route Splitting

```tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load routes
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function Loading() {
  return <div>Loading...</div>;
}
```

**Result**: Initial bundle 500KB → 150KB (70% reduction!)

#### Component-Level Splitting

```tsx
// Heavy component only loaded when needed
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>

      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

#### Named Exports

```tsx
// components/Charts.tsx
export function LineChart() { /* ... */ }
export function BarChart() { /* ... */ }

// App.tsx - Won't work!
const LineChart = lazy(() => import('./components/Charts')); // 

// Solution: Re-export
const LineChart = lazy(() =>
  import('./components/Charts').then(module => ({ default: module.LineChart }))
);
```

### Preloading

```tsx
// Preload on hover
function ProductCard({ product }) {
  const handleMouseEnter = () => {
    // Preload before navigation
    import('./pages/ProductDetails');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      onMouseEnter={handleMouseEnter}
    >
      {product.name}
    </Link>
  );
}
```

---

## Virtual Lists

### Problem: Rendering 10,000 Items

```tsx
//  Renders all 10,000 DOM nodes
function BadList({ items }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

**Result**: Slow, janky scrolling

### Solution: react-window

```bash
npm install react-window
```

```tsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  );

  return (
    <FixedSizeList
      height={600} // Viewport height
      itemCount={items.length}
      itemSize={50} // Row height
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**Result**: 10,000 items scroll smoothly (only renders visible rows)

### Variable Size Lists

```tsx
import { VariableSizeList } from 'react-window';

function DynamicList({ items }) {
  const getItemSize = (index) => {
    // Calculate height based on content
    return items[index].content.length > 100 ? 100 : 50;
  };

  const Row = ({ index, style }) => (
    <div style={style}>{items[index].content}</div>
  );

  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  );
}
```

---

## Image Optimization

### Lazy Loading Images

```tsx
// Native lazy loading
<img
  src="large-image.jpg"
  alt="Description"
  loading="lazy" // Browser-native lazy loading
/>

// With placeholder
function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="image-container">
      {!loaded && <div className="placeholder" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  );
}
```

### Responsive Images

```tsx
<picture>
  <source
    srcSet="image-small.jpg 480w, image-medium.jpg 800w, image-large.jpg 1200w"
    sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
  />
  <img src="image-medium.jpg" alt="Responsive image" />
</picture>
```

### Modern Image Formats

```tsx
<picture>
  <source srcSet="image.avif" type="image/avif" />
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Fallback" />
</picture>
```

---

## Bundle Analysis

### Webpack Bundle Analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
```

**Create React App**:
```bash
npm install --save-dev cra-bundle-analyzer
npm run build
npx cra-bundle-analyzer
```

**Vite**:
```bash
npm install --save-dev rollup-plugin-visualizer
```

```ts
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
    })
  ]
};
```

### What to Look For

- **Large dependencies** (> 100KB)
- **Duplicate dependencies**
- **Unused code**

### Common Optimizations

#### 1. Use Lighter Alternatives

```tsx
//  Heavy: moment.js (288KB)
import moment from 'moment';

//  Light: date-fns (13KB, tree-shakeable)
import { format } from 'date-fns';
```

#### 2. Import Only What You Need

```tsx
//  Imports entire library
import _ from 'lodash';

//  Import specific function
import debounce from 'lodash/debounce';
```

#### 3. Dynamic Imports

```tsx
// Heavy library only loaded when needed
async function handleExport() {
  const XLSX = await import('xlsx');
  XLSX.writeFile(workbook, 'export.xlsx');
}
```

---

## Web Vitals

### Core Web Vitals

**LCP (Largest Contentful Paint)**:
- Measures: Loading performance
- Good: < 2.5s
- Tips: Optimize images, reduce JS, use CDN

**FID (First Input Delay)**:
- Measures: Interactivity
- Good: < 100ms
- Tips: Code splitting, reduce JS execution

**CLS (Cumulative Layout Shift)**:
- Measures: Visual stability
- Good: < 0.1
- Tips: Reserve space for images, avoid dynamic content

### Measuring with web-vitals

```bash
npm install web-vitals
```

```tsx
// index.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric);
  // Send to analytics service
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Improving Core Web Vitals

#### Improve LCP

```tsx
// 1. Preload critical resources
<link rel="preload" href="hero.jpg" as="image" />

// 2. Use CDN for images
<img src="https://cdn.example.com/hero.jpg" alt="Hero" />

// 3. Optimize images (WebP, AVIF)
<picture>
  <source srcSet="hero.webp" type="image/webp" />
  <img src="hero.jpg" alt="Hero" />
</picture>
```

#### Improve FID

```tsx
// 1. Code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 2. Defer non-critical JS
<script src="analytics.js" defer />

// 3. Break up long tasks
function* processItems(items) {
  for (const item of items) {
    yield processItem(item);
    // Yield to browser between items
  }
}
```

#### Improve CLS

```tsx
// 1. Reserve space for images
<img
  src="image.jpg"
  alt="Description"
  width="800"
  height="600"
  style={{ aspectRatio: '800/600' }}
/>

// 2. Avoid inserting content above existing content
//  Bad
<div>
  {showBanner && <Banner />} {/* Pushes content down */}
  <Content />
</div>

//  Good
<div>
  <div style={{ minHeight: showBanner ? '100px' : 0 }}>
    {showBanner && <Banner />}
  </div>
  <Content />
</div>
```

---

## Advanced Patterns

### Debouncing & Throttling

#### Debounce (wait for pause)

```tsx
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

function SearchBox() {
  const [query, setQuery] = useState('');

  // Only search after user stops typing for 300ms
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      console.log('Searching for:', value);
      // API call here
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

#### Throttle (limit frequency)

```tsx
import throttle from 'lodash/throttle';

function ScrollHandler() {
  const handleScroll = useCallback(
    throttle(() => {
      console.log('Scroll position:', window.scrollY);
    }, 100), // Max once per 100ms
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <div>{/* content */}</div>;
}
```

### Intersection Observer (Lazy Load)

```tsx
function LazyComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? <HeavyComponent /> : <Placeholder />}
    </div>
  );
}
```

### Web Workers

```tsx
// worker.js
self.addEventListener('message', (e) => {
  const result = expensiveCalculation(e.data);
  self.postMessage(result);
});

// Component.tsx
function Component() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const worker = new Worker(new URL('./worker.js', import.meta.url));

    worker.postMessage(data);

    worker.onmessage = (e) => {
      setResult(e.data);
      worker.terminate();
    };

    return () => worker.terminate();
  }, [data]);

  return <div>{result}</div>;
}
```

---

## Common Mistakes

### Mistake 1: Inline Functions in JSX

```tsx
//  New function every render
<button onClick={() => console.log('Clicked')}>
  Click me
</button>

//  Stable reference
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

<button onClick={handleClick}>Click me</button>
```

### Mistake 2: Creating Objects/Arrays in Render

```tsx
//  New object every render
<UserCard style={{ margin: 10 }} />

//  Define outside
const cardStyle = { margin: 10 };
<UserCard style={cardStyle} />
```

### Mistake 3: Not Using Keys Properly

```tsx
//  Index as key (breaks on reorder)
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

//  Stable unique ID
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### Mistake 4: Overusing State

```tsx
//  Unnecessary state
const [fullName, setFullName] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

//  Derive from state
const fullName = `${firstName} ${lastName}`;
```

---

## Checklist

### Before Launch

- [ ] Run Lighthouse audit (score > 90)
- [ ] Check bundle size (< 500KB initial)
- [ ] Lazy load routes
- [ ] Optimize images (WebP, lazy loading)
- [ ] Memoize expensive calculations
- [ ] Use React.memo for pure components
- [ ] Code split heavy libraries
- [ ] Measure Core Web Vitals
- [ ] Test on slow network (3G)
- [ ] Test on low-end devices
- [ ] Check for memory leaks (DevTools Memory)
- [ ] Remove console.logs
- [ ] Enable production mode

### Performance Budget

- **Initial JS**: < 170KB (gzipped)
- **Total JS**: < 350KB (gzipped)
- **Images**: < 500KB total per page
- **FCP**: < 1.8s
- **LCP**: < 2.5s
- **TTI**: < 3.8s

---

## Resources

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [Bundle Phobia](https://bundlephobia.com/)

### Libraries

- [react-window](https://github.com/bvaughn/react-window) - Virtual lists
- [web-vitals](https://github.com/GoogleChrome/web-vitals) - Metrics
- [date-fns](https://date-fns.org/) - Lightweight dates

### Learning

- [Web.dev Performance](https://web.dev/performance/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

---

**Remember**: Profile first, optimize second. Don't optimize without measuring. Focus on user-perceived performance, not just metrics.
