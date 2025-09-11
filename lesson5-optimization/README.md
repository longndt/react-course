# Lesson 5: Optimizing and Deploying React Applications

## Overview
In this lesson, you'll learn how to optimize React applications for better performance and deploy them to production. We'll cover practical techniques and tools to make your apps faster and more reliable.

## Learning Objectives
After this lesson, you will be able to:
- Optimize React applications for better performance
- Use code splitting and lazy loading
- Monitor application performance
- Deploy React applications to production
- Set up continuous deployment

## 1. Performance Optimization

### Understanding React Performance
React apps can become slow due to:
1. Large bundle sizes
2. Unnecessary re-renders
3. Unoptimized images
4. Heavy computations

### Code Splitting
Break your app into smaller chunks:
```jsx
// Before - everything in one bundle
import BigComponent from './BigComponent';

// After - split into chunks
const BigComponent = lazy(() => import('./BigComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BigComponent />
    </Suspense>
  );
}
```

### Preventing Re-renders
Use React.memo for components that render often:
```jsx
// Without memo - re-renders on every parent update
function MovieCard({ title, rating }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <span>{rating}/10</span>
    </div>
  );
}

// With memo - only re-renders when props change
const MovieCard = React.memo(function MovieCard({ title, rating }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <span>{rating}/10</span>
    </div>
  );
});
```

### Optimizing Images
```jsx
// Bad - full-size image loaded
<img src="large-image.jpg" />

// Better - responsive images
<picture>
  <source
    media="(min-width: 800px)"
    srcSet="large-image.jpg"
  />
  <source
    media="(min-width: 400px)"
    srcSet="medium-image.jpg"
  />
  <img src="small-image.jpg" alt="Description" />
</picture>
```

## 2. Performance Monitoring

### Using React DevTools
```jsx
// Add component names for profiling
const Header = React.memo(function Header() {
  return <header>...</header>;
});

// Measure render times
function SlowComponent() {
  console.time('SlowComponent render');
  // ... component logic
  console.timeEnd('SlowComponent render');
  return <div>...</div>;
}
```

### Web Vitals Monitoring
```jsx
import { getCLS, getFID, getLCP } from 'web-vitals';

function reportWebVitals({ name, value }) {
  console.log(`${name}: ${value}`);
  // Send to analytics
}

getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals);
```

## 3. Deployment Process

### 1. Build Configuration
```jsx
// vite.config.js
export default defineConfig({
  build: {
    // Generate source maps
    sourcemap: true,

    // Split chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Split large dependencies
          utils: ['date-fns', 'lodash']
        }
      }
    }
  }
});
```

### 2. Environment Variables
```jsx
// .env
VITE_API_URL=https://api.example.com
VITE_GA_ID=UA-XXXXX-Y

// Usage in components
const apiUrl = import.meta.env.VITE_API_URL;
```

### 3. Deployment Scripts
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy:vercel": "vercel",
    "deploy:netlify": "netlify deploy --prod"
  }
}
```

## Lab Exercises

### Exercise 1: Performance Analysis (30 minutes)
1. Install React DevTools
2. Profile component renders
3. Identify performance bottlenecks
4. Measure load times
5. Record findings

### Exercise 2: Optimization (45 minutes)
1. Implement code splitting
2. Add lazy loading
3. Optimize images
4. Fix unnecessary re-renders
5. Test improvements

### Exercise 3: Deployment (45 minutes)
1. Set up deployment platform (Vercel/Netlify)
2. Configure environment variables
3. Set up continuous deployment
4. Add custom domain
5. Monitor deployment

## Project Structure
```
src/
├── components/
│   ├── LazyComponent.jsx
│   └── OptimizedList.jsx
├── hooks/
│   └── usePerformance.js
├── utils/
│   ├── monitoring.js
│   └── optimization.js
└── config/
    ├── build.js
    └── deploy.js
```

## Additional Resources
- [React Performance Guide](https://reactjs.org/docs/optimizing-performance.html)
- [Web Vitals](https://web.dev/vitals/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

## Homework
1. Optimize Your Project
   - Profile your application
   - Implement performance improvements
   - Measure improvements
   - Document optimizations

2. Set Up Deployment
   - Choose a hosting platform
   - Configure automatic deployment
   - Set up monitoring
   - Add error tracking

3. Create Documentation
   - Performance optimization guide
   - Deployment instructions
   - Monitoring setup
   - Troubleshooting guide
