# Reference - Full-Stack & Deployment Quick Lookup

> **Purpose of this file**: Quick deployment commands, configurations, copy-paste ready patterns. NO concept explanations.
>
> **Use Theory5 when you need**: Understanding WHY and HOW deployment works.

---

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Build Commands](#build-commands)
3. [Deployment Platforms](#deployment-platforms)
4. [Environment Variables](#environment-variables)
5. [Performance Optimization](#performance-optimization)
6. [CI/CD Configurations](#cicd-configurations)

---

## Environment Setup

### Frontend (Vite + React)

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install react-router-dom axios
```

### Backend (Express + TypeScript)

```bash
mkdir backend && cd backend
npm init -y
npm install express cors dotenv mongoose
npm install -D typescript @types/node @types/express @types/cors nodemon ts-node
npx tsc --init
```

### TypeScript Config (backend)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

## Build Commands

### Development

```bash
# Frontend
npm run dev

# Backend
npm run dev

# Both (using concurrently)
npm install -D concurrently
# In package.json:
"scripts": {
  "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\""
}
```

### Production Build

```bash
# Frontend
npm run build
npm run preview  # Test production build locally

# Backend
npm run build
npm start
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "test": "vitest"
  }
}
```

---

## Deployment Platforms

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Production
vercel --prod
```

### Netlify (Frontend)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### Railway (Full-Stack)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Render (Backend)

```yaml
# render.yaml
services:
  - type: web
    name: backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        fromDatabase:
          name: mongodb
          property: connectionString
```

---

## Environment Variables

### Frontend (.env)

```bash
# .env.development
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=My App Dev

# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_NAME=My App
```

### Backend (.env)

```bash
# .env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:5173
```

### Access in Code

```typescript
// Frontend (Vite)
const API_URL = import.meta.env.VITE_API_URL;

// Backend (Node)
const PORT = process.env.PORT || 3001;
```

### .gitignore

```
# Environment
.env
.env.local
.env.*.local

# Build
dist/
build/
node_modules/

# IDE
.vscode/
.idea/
```

---

## Performance Optimization

### Code Splitting

```tsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}
```

### useMemo

```tsx
import { useMemo } from 'react';

function ProductList({ products }) {
  const total = useMemo(() => {
    return products.reduce((sum, p) => sum + p.price, 0);
  }, [products]);
  
  return <div>Total: ${total}</div>;
}
```

### useCallback

```tsx
import { useCallback } from 'react';

function Parent() {
  const handleClick = useCallback((id: number) => {
    console.log('Clicked:', id);
  }, []);
  
  return <Child onClick={handleClick} />;
}
```

### React.memo

```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Only re-renders if data changes
  return <div>{data}</div>;
});
```

---

## CI/CD Configurations

### GitHub Actions (Vercel)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### GitHub Actions (Tests)

```yaml
# .github/workflows/test.yml
name: Run Tests
on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install
        run: npm install
      
      - name: Lint
        run: npm run lint
      
      - name: Test
        run: npm test
```

### Netlify Config

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Vercel Config

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

---

## Advanced: Docker (moved to Extras)

Containerization is beyond this lesson's core scope. See `extras/advanced_patterns.md` for complete Dockerfiles and Compose examples when you're ready.

---

## Monitoring & Error Tracking

### Sentry Setup

```bash
npm install @sentry/react
```

```tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});

function App() {
  return <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
    {/* Your app */}
  </Sentry.ErrorBoundary>;
}
```

---

## Quick Checklist

### Pre-Deployment

- [ ] Environment variables set
- [ ] `.env` files in `.gitignore`
- [ ] Production build tested locally (`npm run build && npm run preview`)
- [ ] CORS configured correctly
- [ ] API URLs use environment variables
- [ ] No console.logs in production code
- [ ] Error monitoring configured

### Post-Deployment

- [ ] Test all routes
- [ ] Check API endpoints
- [ ] Verify environment variables loaded
- [ ] Test authentication flow
- [ ] Check error tracking dashboard
- [ ] Monitor performance metrics

---

**For concepts and explanations**: See `theory5.md`  
**For practice**: See `lab5.md`
