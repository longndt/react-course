# Exercise 1: Code Splitting & Lazy Loading

Complete solution for Exercise 1 demonstrating React code splitting with lazy loading.

##  Features Implemented

-  **React.lazy()** - Dynamic component imports
-  **Suspense** - Loading states with custom spinner
-  **ErrorBoundary** - Error handling for lazy-loaded components
-  **Route-based code splitting** - Each page is a separate bundle
-  **Manual chunking** - Vendor libraries in separate chunk

##  Project Structure

```
exercise1-code-splitting/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx       # Class component for error handling
│   │   ├── ErrorBoundary.css
│   │   ├── LoadingSpinner.jsx      # Suspense fallback component
│   │   └── LoadingSpinner.css
│   ├── pages/
│   │   ├── Home.jsx               # Lazy-loaded home page
│   │   ├── About.jsx              # Lazy-loaded about page
│   │   ├── Dashboard.jsx          # Lazy-loaded dashboard
│   │   ├── Users.jsx              # Lazy-loaded users page
│   │   └── Settings.jsx           # Lazy-loaded settings page
│   ├── App.jsx                    # Main app with lazy loading setup
│   ├── App.css                    # Global styles
│   └── main.jsx                   # Entry point
├── vite.config.ts                 # Vite config with manual chunking
├── package.json
└── readme.md
```

##  Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

##  How to Test Code Splitting

1. **Open DevTools**
   - Press `F12` or right-click → Inspect
   - Go to the **Network** tab

2. **Enable Network Throttling** (Optional)
   - Select "Slow 3G" to simulate slower connections
   - This makes the loading spinner more visible

3. **Observe Initial Load**
   - Refresh the page
   - Notice only the initial bundles are loaded:
     - `main.jsx` - Entry point
     - `react-vendor.js` - React libraries chunk
     - `Home-*.js` - Home page chunk (first route)

4. **Navigate Between Pages**
   - Click "About" → See `About-*.js` being downloaded
   - Click "Dashboard" → See `Dashboard-*.js` being downloaded
   - Click "Users" → See `Users-*.js` being downloaded
   - Click "Settings" → See `Settings-*.js` being downloaded

5. **Check Bundle Sizes**
   - Run `npm run build`
   - Examine `dist/assets/` folder
   - Each page is a separate chunk!

##  Key Concepts Demonstrated

### 1. React.lazy()

```javascript
// Before (eager loading) - all code loaded upfront
import Home from './pages/Home';
import About from './pages/About';

// After (lazy loading) - code loaded on demand
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
```

### 2. Suspense Boundary

```javascript
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<Home />} />
    {/* ... */}
  </Routes>
</Suspense>
```

### 3. ErrorBoundary

```javascript
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    {/* Lazy-loaded routes */}
  </Suspense>
</ErrorBoundary>
```

### 4. Manual Chunking (Vite)

```javascript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
      },
    },
  },
}
```

##  Performance Benefits

### Without Code Splitting
- Initial bundle: ~500KB
- All pages loaded upfront
- Slower Time to Interactive (TTI)
- Higher data usage

### With Code Splitting
- Initial bundle: ~150KB (main + vendor)
- Each page: ~10-20KB (loaded on demand)
- Faster Time to Interactive
- Lower initial data usage
- Better caching strategy

##  Features in the Demo

### Home Page
- Hero section explaining code splitting
- Feature cards with benefits
- Interactive guide

### About Page
- Code splitting explanation
- Benefits and implementation guide
- Key concepts overview

### Dashboard Page
- Stats grid with metrics
- Recent activity feed
- Demonstrates heavier component

### Users Page
- User table with 20 users
- Role and status badges
- Demonstrates data-heavy page

### Settings Page
- Notification toggles
- Appearance settings
- Interactive form controls

##  Advanced Techniques

### Prefetching

You can prefetch routes before navigation:

```javascript
const DashboardPage = lazy(() => import('./pages/Dashboard'));

// Prefetch on hover
<Link
  to="/dashboard"
  onMouseEnter={() => import('./pages/Dashboard')}
>
  Dashboard
</Link>
```

### Named Exports

For lazy loading named exports:

```javascript
const { ComponentName } = lazy(() =>
  import('./components/MyComponent').then(module => ({
    default: module.ComponentName
  }))
);
```

### Loading States Per Route

```javascript
<Route
  path="/dashboard"
  element={
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  }
/>
```

##  Monitoring Performance

### Lighthouse Audit
```bash
npm run build
npm run preview
# Run Lighthouse in Chrome DevTools
```

### Bundle Analysis

```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.ts`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  react(),
  visualizer({ open: true })
]
```

##  Common Pitfalls

1. **Don't lazy load above the fold content**
   - Hurts initial render performance

2. **Use Suspense boundaries strategically**
   - Too many = flickering loading states
   - Too few = large loading delays

3. **Always wrap with ErrorBoundary**
   - Network failures can break lazy loading
   - Provide fallback UI

4. **Avoid lazy loading tiny components**
   - Overhead > benefit for small components
   - Focus on routes and heavy components

##  Learning Outcomes

After completing this exercise, you understand:

 How React.lazy() enables dynamic imports
 When and where to apply code splitting
 How to handle loading states with Suspense
 How to catch errors with ErrorBoundary
 How to configure manual chunking in Vite
 How to measure and optimize bundle sizes

##  Related Exercises

- **Exercise 2**: Component Memoization
- **Exercise 3**: Virtual Lists
- **Exercise 4**: Production Deployment

##  Additional Resources

- [React Lazy Loading Docs](https://react.dev/reference/react/lazy)
- [Suspense API](https://react.dev/reference/react/Suspense)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Vite Code Splitting](https://vitejs.dev/guide/build.html#chunking-strategy)
