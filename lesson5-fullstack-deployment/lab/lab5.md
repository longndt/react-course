# Lab 5 - Performance Optimization & Production Deployment

## 📋 Overview

In this final lab, you'll learn **essential performance optimization techniques**and **production deployment strategies**for React applications. You'll implement code splitting, memoization, virtual lists, and prepare your application for production deployment with environment configuration and build optimization.

### What You'll Build

A performance-optimized React application featuring:
- **Code Splitting**with React.lazy() and Suspense
- **Component Memoization**with React.memo, useMemo, useCallback
- **Virtual Lists**for rendering thousands of items efficiently
- **Performance Monitoring**with React Profiler
- **Production Build**configuration
- **Environment Management**with different configs for dev/prod
- **Deployment Ready**application for Vercel/Netlify

### Why This Matters

- **User Experience** Slow apps lose users - 53% leave if load takes >3 seconds
- **Performance** Optimized apps feel faster and use less resources
- **Scalability** Handle large datasets without freezing the browser
- **Production Ready** Deploy with confidence using best practices
- **Professional Skills** Performance optimization is crucial for senior developers

---

## Learning Objectives

By the end of this lab, you will:

### Performance Optimization Skills
- Implement code splitting with React.lazy() and dynamic imports
- Use Suspense for loading states
- Apply React.memo to prevent unnecessary re-renders
- Optimize expensive computations with useMemo
- Prevent function recreation with useCallback
- Build virtual lists for large datasets (10,000+ items)
- Monitor performance with React Profiler API

### Production Deployment Skills
- Create optimized production builds
- Configure environment variables for different environments
- Understand bundle size and optimization techniques
- Deploy to Vercel or Netlify
- Set up deployment workflows
- Handle routing in production (SPA config)

### Advanced Patterns
- Lazy load components and routes
- Create efficient custom hooks
- Implement windowing/virtualization
- Profile and measure performance improvements

---

## Pre-Lab Checklist

### Required Software
- [ ] **Node.js**(v18+) installed
- [ ] **npm**or **yarn**package manager
- [ ] **VS Code**with React DevTools extension
- [ ] **Browser**with React DevTools (Chrome/Firefox)
- [ ] **Git**for version control (deployment)

### Verification Commands
```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 9.0.0 or higher
git --version     # Should show 2.0.0 or higher
```

### Required Knowledge
- [ ] React fundamentals (components, hooks, state)
- [ ] React Hooks (useState, useEffect, useContext, useMemo, useCallback)
- [ ] TypeScript basics
- [ ] Completion of Labs 1-4

### Project Setup
```bash
# Create Vite + React + TypeScript project
npm create vite@latest lab5-performance -- --template react-ts
cd lab5-performance
npm install
npm install react-router-dom
```

---

## Exercises

---

### Exercise 1: Code Splitting & Lazy Loading (40% Practice)

**Goal** Implement code splitting to reduce initial bundle size and improve load time.

#### Task 1.1: Setup React Router with Lazy Loading (Guided)

**Step 1: Install Dependencies**
```bash
npm install react-router-dom
```

**Step 2: Create Basic Page Components**

Create three page components (we'll lazy load them next):

```tsx
// src/pages/Home.tsx
export default function Home() {
  return (
    <div className="page">
      <h1>Home Page</h1>
      <p>Welcome to the performance-optimized app!</p>
    </div>
  );
}

// src/pages/About.tsx
export default function About() {
  return (
    <div className="page">
      <h1>About Page</h1>
      <p>This app demonstrates performance optimization techniques.</p>
    </div>
  );
}

// src/pages/Dashboard.tsx
export default function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p>This is a heavy dashboard component.</p>
    </div>
  );
}
```

**Step 3: Create LoadingSpinner Component**

```tsx
// src/components/LoadingSpinner.tsx
import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
```

```css
/* src/components/LoadingSpinner.css */
.loading-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 1rem;
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

**Step 4: Implement Lazy Loading in App.tsx**

```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

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

export default App;
```

**Test**
- Run `npm run dev`
- Open browser DevTools → Network tab
- Navigate between pages
- Notice separate chunks loading for each page (e.g., `About-xxxxx.js`)

---

#### Task 1.2: Add Error Boundary for Lazy Components (50% TODO)

**🔨 TODO** Create an Error Boundary to handle loading failures gracefully.

**Requirements**
1. Create `src/components/ErrorBoundary.tsx` (class component)
2. Implement `componentDidCatch` to log errors
3. Implement `getDerivedStateFromError` to update state
4. Render error UI when lazy loading fails
5. Add a "Retry" button that reloads the page
6. Wrap `<Suspense>` with `<ErrorBoundary>` in App.tsx

**Hints**

```jsx
import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    // Reset state and reload
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Oops! Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

// Wrap in App.jsx
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>
```

**CSS Hint**
```css
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
}
```

**Expected Outcome**
- App handles lazy loading failures
- Error message displayed if chunk fails to load
- Retry button reloads the application
- Console logs error details

**Solution** See `solutions/exercise1-code-splitting/`

---

#### Task 1.3: Measure Bundle Size Improvement (Testing)

**🔨 TODO** Build for production and analyze bundle size.

**Requirements**
1. Run `npm run build`
2. Check `dist/` folder for generated chunks
3. Note the sizes of individual chunks
4. Compare with non-lazy loaded version (optional)

**Hints**

```bash
# Build for production
npm run build

# Check generated files
dir dist\assets  # Windows
ls -lh dist/assets  # Mac/Linux
```

**Analyze with Rollup Visualizer**(Optional):
```bash
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
});
```

**Expected Outcome**
- Production build creates separate chunks for each lazy-loaded component
- Main bundle is smaller than if all components were bundled together
- Each route loads its own JavaScript file on demand
- Improved initial load time (especially noticeable with larger apps)

**Solution** See `solutions/exercise1-code-splitting/readme.md`

---

### Exercise 2: Component Memoization (70% Practice)

**Goal** Optimize component rendering with React.memo, useMemo, and useCallback.

#### Task 2.1: Create a Memoized List Component (Guided)

**Step 1: Create a UserList Component**

```tsx
// src/components/UserList.tsx
import { memo } from 'react';

/**
 * User object
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 */

// Memoized UserItem - only re-renders if props change
const UserItem = memo(function UserItem({ user, onSelect }) {
  console.log(`Rendering UserItem: ${user.id}`);

  return (
    <div className="user-item" onClick={() => onSelect(user)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

function UserList({ users, onSelect }) {
  console.log('Rendering UserList');

  return (
    <div className="user-list">
      {users.map(user => (
        <UserItem key={user.id} user={user} onSelect={onSelect} />
      ))}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default memo(UserList);
```

**Step 2: Use UserList in a Page**

```jsx
// src/pages/Users.jsx
import { useState } from 'react';
import UserList from '../components/UserList';

// Generate mock users
const generateUsers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));
};

export default function Users() {
  const [users] = useState(() => generateUsers(100));
  const [selectedUser, setSelectedUser] = useState(null);
  const [count, setCount] = useState(0);

  const handleSelect = (user) => {
    setSelectedUser(user.id);
  };

  return (
    <div>
      <h1>Users Page</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (Test Re-render)</button>
      <UserList users={users} onSelect={handleSelect} />
    </div>
  );
}
```

**Test**
- Click "Increment" button
- Check console - UserItems should NOT re-render
- Problem: They DO re-render because `handleSelect` is recreated each render!

---

#### Task 2.2: Optimize with useCallback (70% TODO)

**🔨 TODO** Fix the unnecessary re-renders by memoizing the callback function.

**Requirements**
1. Import `useCallback` from React
2. Wrap `handleSelect` function with `useCallback`
3. Add empty dependency array (no dependencies)
4. Click "Increment" again and verify UserItems don't re-render
5. Add console logs to track renders

**Hints**

```tsx
import { useState, useCallback } from 'react';

const handleSelect = useCallback((user: User) => {
  setSelectedUser(user.id);
}, []); // Empty array - function never recreated

// Alternative: if you need dependencies
const handleSelect = useCallback((user: User) => {
  console.log('Current count:', count);
  setSelectedUser(user.id);
}, [count]); // Re-create only when count changes
```

**Why This Works**
- Without `useCallback`: New function created every render
- `UserItem` receives "different" prop (even though it does the same thing)
- `memo()` sees prop changed, re-renders component
- With `useCallback`: Same function reference across renders
- `memo()` sees no change, skips re-render

**Expected Outcome**
- Clicking "Increment" does NOT trigger UserItem re-renders
- Console shows "Rendering UserList" but NOT "Rendering UserItem: X"
- Selected user still updates correctly when clicking a user
- Performance improves with larger lists

**Solution** See `solutions/exercise2-memoization/`

---

#### Task 2.3: Optimize Expensive Calculations with useMemo (80% TODO)

**🔨 TODO** Use `useMemo` to optimize a filtered and sorted user list.

**Requirements**
1. Add a search input to filter users by name
2. Add a "Sort by Name" button
3. Use `useMemo` to memoize the filtered and sorted results
4. Add console logs to see when filtering/sorting happens
5. Verify it only recalculates when search term or sort order changes

**Hints**

```tsx
import { useState, useMemo, useCallback } from 'react';

export default function Users() {
  const [users] = useState(() => generateUsers(1000)); // More users!
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // Expensive computation - only runs when dependencies change
  const filteredAndSortedUsers = useMemo(() => {
    console.log('Filtering and sorting users...');

    let result = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortAsc ? comparison : -comparison;
    });

    return result;
  }, [users, searchTerm, sortAsc]); // Only recalculate when these change

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort: {sortAsc ? 'A→Z' : 'Z→A'}
      </button>
      <UserList users={filteredAndSortedUsers} onSelect={handleSelect} />
    </div>
  );
}
```

**Without useMemo** Filtering/sorting runs on EVERY render (even clicking increment!)

**With useMemo** Only runs when `users`, `searchTerm`, or `sortAsc` changes

**Expected Outcome**
- Typing in search filters the list
- Clicking sort button reverses order
- Console shows "Filtering and sorting..." only when needed
- Unrelated state changes (count) don't trigger recalculation
- Smooth performance even with 1000+ users

**Solution** See `solutions/exercise2-memoization/`

---

### Exercise 3: Virtual List for Large Datasets (85% Practice)

**Goal** Build a virtual list that efficiently renders 10,000+ items.

#### Task 3.1: Understand the Problem (Reading)

**The Problem with Large Lists**

```tsx
// BAD: Renders all 10,000 items (DOM nodes)
function BadList() {
  const items = Array.from({ length: 10000 }, (_, i) => i);
  return (
    <div style={{ height: '600px', overflow: 'auto' }}>
      {items.map(i => (
        <div key={i} style={{ height: '50px', border: '1px solid #ccc' }}>
          Item {i}
        </div>
      ))}
    </div>
  );
}
// Result: 10,000 DOM nodes, slow scrolling, high memory usage
```

**The Solution: Virtual List**
- Only render items currently visible in the viewport
- Example: If viewport shows 10 items, only render ~15 items (10 visible + 5 buffer)
- As user scrolls, swap out items
- Result: Constant DOM size regardless of data size

---

#### Task 3.2: Build a Simple Virtual List (85% TODO)

**🔨 TODO** Create a custom virtual list component.

**Requirements**
1. Create `src/components/VirtualList.tsx`
2. Accept props: `items`, `itemHeight`, `containerHeight`, `renderItem`
3. Track scroll position with `onScroll` event
4. Calculate which items are visible based on scroll position
5. Only render visible items (+ small buffer)
6. Use absolute positioning to create illusion of full list

**Hints**

```tsx
// src/components/VirtualList.tsx
import { useState, useRef, UIEvent } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  // Get visible items
  const visibleItems = items.slice(startIndex, endIndex);

  // Total height of all items
  const totalHeight = items.length * itemHeight;

  // Offset to position visible items correctly
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      {/* Spacer to create scrollbar */}
      <div style={{ height: totalHeight, width: '100%' }} />

      {/* Visible items */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: `translateY(${offsetY}px)`,
        }}
      >
        {visibleItems.map((item, index) => (
          <div key={startIndex + index}>
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualList;
```

**Usage Example**
```tsx
// src/pages/VirtualListDemo.tsx
import VirtualList from '../components/VirtualList';

export default function VirtualListDemo() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    description: `Description for item ${i}`,
  }));

  return (
    <div>
      <h1>Virtual List Demo (10,000 items)</h1>
      <VirtualList
        items={items}
        itemHeight={60}
        containerHeight={600}
        renderItem={(item, index) => (
          <div
            style={{
              height: '60px',
              padding: '10px',
              borderBottom: '1px solid #eee',
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
            }}
          >
            <strong>{item.title}</strong>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              {item.description}
            </p>
          </div>
        )}
      />
    </div>
  );
}
```

**Expected Outcome**
- Smooth scrolling through 10,000 items
- Only ~10-15 items rendered in DOM at any time
- Scroll bar reflects full list height
- Items appear/disappear as you scroll
- Performance much better than rendering all items

**Solution** See `solutions/exercise3-virtual-list/`

---

#### Task 3.3: Compare Performance (Testing - 90% TODO)

**🔨 TODO** Create a comparison page showing regular list vs virtual list performance.

**Requirements**
1. Create a page with two tabs: "Regular List" and "Virtual List"
2. Both render the same 10,000 items
3. Use Chrome DevTools Performance tab to profile both
4. Record FPS (frames per second) while scrolling
5. Document the performance difference

**Hints**

**Profiling Steps**
1. Open Chrome DevTools → Performance tab
2. Click "Record" button
3. Scroll through the list
4. Stop recording
5. Check "FPS" graph - higher is better (60 FPS = smooth)
6. Check "Main" timeline - less red = better performance

**Expected Results**
- **Regular List** Laggy scrolling, FPS drops to 20-30, janky animations
- **Virtual List** Smooth scrolling, FPS stays at 55-60, butter smooth

**Expected Outcome**
- Clear performance difference visible
- Virtual list maintains 60 FPS
- Regular list struggles with large dataset
- Understanding of when virtualization is needed

**Solution** See `solutions/exercise3-virtual-list/readme.md`

---

### Exercise 4: Production Build & Deployment (90% Practice)

**Goal** Prepare app for production and deploy to a hosting platform.

#### Task 4.1: Environment Variables (90% TODO)

**🔨 TODO** Set up environment variables for different environments.

**Requirements**
1. Create `.env.development` file for development config
2. Create `.env.production` file for production config
3. Add API URL as environment variable
4. Create a config file that reads these variables
5. Use different API URLs for dev and prod

**Hints**

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MyApp (Dev)
VITE_ENABLE_ANALYTICS=false

# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_NAME=MyApp
VITE_ENABLE_ANALYTICS=true
```

**Important** Vite requires `VITE_` prefix!

```tsx
// src/config/env.ts
export const ENV = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Usage
import { ENV } from './config/env';

fetch(`${ENV.apiUrl}/users`)
  .then(/* ... */);
```

**Expected Outcome**
- `npm run dev` uses development variables
- `npm run build` uses production variables
- API calls use correct URLs per environment
- Analytics only enabled in production

**Solution** See `solutions/exercise4-deployment/`

---

#### Task 4.2: Production Build Optimization (95% TODO)

**🔨 TODO** Configure Vite for optimal production builds.

**Requirements**
1. Update `vite.config.ts` with production optimizations
2. Configure chunk splitting strategy
3. Enable minification and compression
4. Build and analyze the bundle size
5. Document bundle sizes before and after optimization

**Hints**

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers
    target: 'esnext',

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },

    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI library if you have one
          // 'ui-vendor': ['@mui/material'],
        },
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000, // KB
  },
});
```

**Build and Analyze**
```bash
npm run build

# Check sizes
ls -lh dist/assets

# Optional: Install and use bundle analyzer
npm install --save-dev rollup-plugin-visualizer
```

**Expected Outcome**
- Production build completes successfully
- Separate vendor chunks for React libraries
- Minified JavaScript and CSS
- No console.logs in production code
- Bundle sizes documented and optimized

**Solution** See `solutions/exercise4-deployment/`

---

#### Task 4.3: Deploy to Vercel (100% TODO)

**🔨 TODO** Deploy your application to Vercel (or Netlify).

**Requirements**
1. Create a GitHub repository for your project
2. Push your code to GitHub
3. Sign up for Vercel account (free)
4. Connect your GitHub repository
5. Configure build settings
6. Deploy and verify the live URL

**Hints**

**Step 1: Prepare Git Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables (if any)
7. Click "Deploy"

**Step 3: Configure SPA Routing**

Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures all routes redirect to `index.html` for client-side routing.

**Alternative: Netlify**

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Expected Outcome**
- Live URL provided (e.g., `your-app.vercel.app`)
- App loads and works correctly
- Routing works (no 404 on refresh)
- Environment variables applied
- Auto-deploys on Git push

**Solution** See `solutions/exercise4-deployment/readme.md`

---

## Bonus Challenges

### Bonus 1: React Profiler Integration (Advanced)

**Challenge** Add React Profiler to measure render performance in production.

**Hints**
```tsx
import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (
  id, phase, actualDuration, baseDuration
) => {
  console.log({ id, phase, actualDuration, baseDuration });
  // Send to analytics service
};

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

**Expected** Performance metrics logged for each component tree

---

### Bonus 2: Service Worker for Caching (Advanced)

**Challenge** Add a service worker to cache assets and enable offline mode.

**Hints** Use `vite-plugin-pwa`

```bash
npm install vite-plugin-pwa
```

**Expected** App works offline after first visit

---

### Bonus 3: Image Lazy Loading (Medium)

**Challenge** Implement lazy loading for images using Intersection Observer.

**Hints**
```tsx
const [isVisible, setIsVisible] = useState(false);
const imgRef = useRef<HTMLImageElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.disconnect();
    }
  });

  if (imgRef.current) observer.observe(imgRef.current);
}, []);

{isVisible ? <img src={src} /> : <div className="placeholder" />}
```

**Expected** Images load only when scrolled into view

---

### Bonus 4: Web Vitals Monitoring (Advanced)

**Challenge** Track Core Web Vitals (LCP, FID, CLS) and send to analytics.

**Hints**
```bash
npm install web-vitals
```

```tsx
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

**Expected** Real performance metrics captured and logged

---

## Key Takeaways

### Performance Optimization
- **Code Splitting** Reduces initial bundle size, improves load time
- **React.lazy()** Dynamically import components only when needed
- **Suspense** Provides loading states during code splitting
- **React.memo** Prevents re-renders when props haven't changed
- **useMemo** Caches expensive computations
- **useCallback** Prevents function recreation across renders
- **Virtual Lists** Efficiently render large datasets

### Production Deployment
- **Environment Variables** Different configs for dev/prod
- **Build Optimization** Minification, chunk splitting, tree shaking
- **Hosting** Deploy to Vercel/Netlify with CI/CD
- **SPA Routing** Configure server for client-side routing

### Best Practices
- Measure before optimizing (use profiler)
- Don't over-optimize - profile first!
- Use production builds for performance testing
- Monitor real user metrics (Web Vitals)

---

## 🐛 Troubleshooting Guide

### Issue: Lazy loaded components show white screen

**Cause** Missing Suspense boundary or error in component

**Solution**
- Wrap routes with `<Suspense fallback={<Loading />}>`
- Add Error Boundary around Suspense
- Check console for errors

---

### Issue: memo() not preventing re-renders

**Cause** Props reference changing every render

**Solution**
- Use `useCallback` for function props
- Use `useMemo` for object/array props
- Check props with `console.log` or React DevTools

---

### Issue: Virtual list items jumping or flickering

**Cause** Incorrect height calculations or missing keys

**Solution**
- Ensure `itemHeight` prop is accurate
- Use stable keys (item.id, not index)
- Add `will-change: transform` CSS for smoother scrolling

---

### Issue: Environment variables not working in production

**Cause** Forgot `VITE_` prefix or not rebuilding

**Solution**
- All env vars must start with `VITE_`
- Rebuild with `npm run build` after changing .env files
- Don't access `process.env`, use `import.meta.env`

---

### Issue: 404 errors on page refresh in deployed app

**Cause** Server not configured for SPA routing

**Solution**
- Add `vercel.json` or `netlify.toml` with redirect rules
- Configure server to serve `index.html` for all routes

---

## Self-Assessment Checklist

Before completing this course, ensure you can:

### Performance Optimization
- [ ] Implement code splitting with React.lazy()
- [ ] Add Suspense boundaries with loading states
- [ ] Create error boundaries for lazy components
- [ ] Use React.memo to prevent unnecessary re-renders
- [ ] Apply useMemo for expensive calculations
- [ ] Use useCallback to memoize functions
- [ ] Build a virtual list component
- [ ] Profile component performance

### Production Deployment
- [ ] Configure environment variables
- [ ] Create optimized production builds
- [ ] Analyze bundle sizes
- [ ] Deploy to hosting platform (Vercel/Netlify)
- [ ] Configure SPA routing in production
- [ ] Set up automatic deployments from Git

### Advanced Techniques
- [ ] Understand when to optimize (profile first!)
- [ ] Measure performance improvements
- [ ] Handle large datasets efficiently
- [ ] Implement loading and error states

---

## 📖 Additional Resources

### Official Documentation
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [React.lazy Reference](https://react.dev/reference/react/lazy)
- [React Profiler API](https://react.dev/reference/react/Profiler)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

### Performance Tools
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)

### Deployment Guides
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [SPA Routing Configuration](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations)

### Advanced Topics
- Progressive Web Apps (PWA)
- Service Workers
- Server-Side Rendering (SSR) with Next.js
- Static Site Generation (SSG)

---

## ✅ Success Criteria Checklist

Before completing this course, verify you can:

### **Performance Optimization**
- [ ] Implement code splitting with React.lazy()
- [ ] Add Suspense boundaries with loading states
- [ ] Create error boundaries for lazy components
- [ ] Use React.memo to prevent unnecessary re-renders
- [ ] Apply useMemo for expensive calculations
- [ ] Use useCallback to memoize functions
- [ ] Build a virtual list component
- [ ] Profile component performance with DevTools

### **Production Deployment**
- [ ] Configure environment variables for different environments
- [ ] Create optimized production builds
- [ ] Analyze bundle sizes and optimize them
- [ ] Deploy to hosting platform (Vercel/Netlify)
- [ ] Configure SPA routing in production
- [ ] Set up automatic deployments from Git
- [ ] Handle environment-specific configurations

### **Advanced Techniques**
- [ ] Understand when to optimize (profile first!)
- [ ] Measure performance improvements accurately
- [ ] Handle large datasets efficiently
- [ ] Implement proper loading and error states
- [ ] Use production builds for performance testing
- [ ] Monitor real user metrics (Web Vitals)

### **Full-Stack Integration**
- [ ] Connect React frontend to backend APIs
- [ ] Handle authentication in production
- [ ] Manage environment variables securely
- [ ] Implement proper error handling
- [ ] Set up monitoring and logging

**Goal: Check at least 20/25 items to complete the course**

---

## Course Completion

You've completed the React Performance & Deployment course! You now have the skills to:

 Build performant React applications
 Optimize rendering and bundle sizes
 Handle large datasets efficiently
 Deploy production-ready applications
 Configure professional development workflows

### Next Steps

1. **Build a Portfolio Project** Apply all 5 labs' concepts
2. **Learn Advanced Topics**
   - Next.js for SSR and SSG
   - React Native for mobile apps
   - Advanced state management (Redux, Zustand)
   - Testing (Jest, React Testing Library)
3. **Contribute to Open Source** Practice your skills
4. **Keep Learning** React ecosystem is always evolving!

---

---

