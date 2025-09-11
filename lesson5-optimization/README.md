# Lesson 5: Performance Optimization & Deployment

## Overview

This lesson covers React performance optimization techniques, deployment strategies, and production best practices.

## Prerequisites

- Completion of Lessons 1-4
- Understanding of React performance concepts
- Basic knowledge of build tools
- Familiarity with CI/CD concepts

## Theory (45 minutes)

### 1. Performance Optimization

- Code splitting
- Lazy loading
- Bundle size optimization
- Tree shaking
- Performance monitoring

### 2. Build Configuration

- Webpack optimization
- Vite build options
- Environment variables
- Source maps
- Compression

### 3. Deployment Strategies

- Static hosting
- Server deployment
- Container deployment
- CDN configuration
- SSL/TLS setup

## Demo (45 minutes)

### 1. Code Splitting Implementation

```tsx
// App.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 2. Performance Monitoring

```tsx
// performance.ts
export const measurePerformance = () => {
  if (typeof window !== "undefined") {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log("Performance metric:", {
          name: entry.name,
          duration: entry.duration,
          startTime: entry.startTime,
        });
      });
    });

    observer.observe({ entryTypes: ["paint", "largest-contentful-paint"] });
  }
};

// App.tsx
useEffect(() => {
  measurePerformance();
}, []);
```

### 3. Build and Deploy Scripts

```json
{
  "scripts": {
    "build": "vite build",
    "analyze": "source-map-explorer 'dist/**/*.js'",
    "deploy:vercel": "vercel",
    "deploy:netlify": "netlify deploy --prod",
    "docker:build": "docker build -t my-react-app .",
    "docker:run": "docker run -p 80:80 my-react-app"
  }
}
```

## Lab Exercises (90 minutes)

### Exercise 1: Performance Optimization (30 mins)

1. Implement code splitting
2. Add lazy loading
3. Optimize images
4. Implement memoization

### Exercise 2: Build Configuration (30 mins)

1. Configure build process
2. Set up environment variables
3. Optimize bundle size
4. Add source maps

### Exercise 3: Deployment (30 mins)

1. Deploy to Vercel/Netlify
2. Set up GitHub Actions
3. Configure custom domain
4. Implement SSL

## Project Structure

```
project/
├── src/
│   ├── components/
│   ├── pages/
│   └── utils/
├── public/
├── dist/
├── .github/
│   └── workflows/
├── Dockerfile
├── nginx.conf
└── deployment/
    ├── vercel.json
    └── netlify.toml
```

## Deployment Files

### Dockerfile

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### GitHub Actions Workflow

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
```

## Additional Resources

- [React Performance Documentation](https://reactjs.org/docs/optimizing-performance.html)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Web Vitals](https://web.dev/vitals/)

## Homework

1. Optimize an existing application
2. Set up automated deployment
3. Implement monitoring
4. Create production checklist
5. Document deployment process
