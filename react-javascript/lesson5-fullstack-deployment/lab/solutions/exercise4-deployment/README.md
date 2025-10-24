# Exercise 4: Production Build & Deployment

A complete production-ready React application demonstrating environment configuration, build optimization, and cloud deployment.

## Project Structure

```
exercise4-deployment/
├── src/
│   ├── config/
│   │   └── env.ts              # Environment configuration
│   ├── pages/
│   │   ├── Home.jsx            # Home page with deployment checklist
│   │   ├── Home.css            # Home page styles
│   │   ├── About.jsx           # Production deployment guide
│   │   ├── Dashboard.jsx       # Dashboard with API integration
│   │   └── Settings.jsx        # Settings page
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css                 # Global app styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global CSS reset
├── .env.development            # Development environment variables
├── .env.production             # Production environment variables
├── .env.example                # Example environment variables template
├── vite.config.ts              # Optimized production build configuration
├── vercel.json                 # Vercel deployment configuration
├── netlify.toml                # Netlify deployment configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.node.json          # TypeScript config for Vite
└── .gitignore                  # Git ignore rules
```

## Learning Objectives

After completing this exercise, you will understand:

1. **Environment Variables**- Managing different configs for dev/prod
2. **Build Optimization**- Minification, code splitting, tree shaking
3. **Production Deployment**- Deploying to Vercel, Netlify, or other platforms
4. **SPA Routing**- Configuring servers for client-side routing
5. **Performance**- Bundle analysis and optimization techniques

## Setup Instructions

### 1. Install Dependencies

```bash
cd exercise4-deployment
npm install
```

### 2. Environment Configuration

The project includes three environment files:

**`.env.development`**- Used during development (`npm run dev`)
```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MyApp (Development)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_LOGGING=true
```

**`.env.production`**- Used for production builds (`npm run build`)
```bash
VITE_API_URL=https://api.myapp.com
VITE_APP_NAME=MyApp
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_LOGGING=false
```

**`.env.example`**- Template for local overrides
- Copy to `.env.local` for custom local settings
- `.env.local` is gitignored and overrides other env files

### 3. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder:
- Minified JavaScript and CSS
- Console.logs removed
- Code split into chunks
- Tree shaking applied
- Assets hashed for cache busting

### 5. Preview Production Build Locally

```bash
npm run preview
```

Visit: http://localhost:4173

This lets you test the production build before deploying.

## Build Optimization Features

### 1. **Code Minification**

The `vite.config.ts` uses Terser for aggressive minification:

```javascript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,     // Remove console.* in production
      drop_debugger: true,    // Remove debugger statements
    },
  },
}
```

### 2. **Manual Chunk Splitting**

Vendor libraries are separated from app code:

```javascript
rollupOptions: {
  output: {
    manualChunks: {
      'react-vendor': ['react', 'react-dom'],
      'router-vendor': ['react-router-dom'],
    },
  },
}
```

**Benefits:**
- React libraries cached separately (changes infrequently)
- App code can update without re-downloading React
- Better browser caching and faster subsequent loads

### 3. **Asset Organization**

Assets are organized by type with cache-busting hashes:

```
dist/
├── assets/
│   ├── images/
│   │   └── logo-a1b2c3d4.png
│   ├── fonts/
│   │   └── roboto-e5f6g7h8.woff2
│   └── js/
│       ├── react-vendor-i9j0k1l2.js
│       ├── router-vendor-m3n4o5p6.js
│       └── main-q7r8s9t0.js
└── index.html
```

### 4. **Bundle Size Tracking**

After building, check bundle sizes:

```bash
npm run build

# Output example:
dist/assets/react-vendor-abc123.js    142.45 kB │ gzip:  45.67 kB
dist/assets/router-vendor-def456.js    45.12 kB │ gzip:  14.23 kB
dist/assets/main-ghi789.js             12.34 kB │ gzip:   4.56 kB
```

## 🌍 Environment Variables Guide

### How Vite Environment Variables Work

1. **VITE_ Prefix Required**- Only vars with `VITE_` prefix are exposed to client
2. **import.meta.env**- Access vars via `import.meta.env.VITE_YOUR_VAR`
3. **Built-in Vars**
   - `import.meta.env.DEV` - `true` in development
   - `import.meta.env.PROD` - `true` in production
   - `import.meta.env.MODE` - Current mode (`development` or `production`)

### Type-Safe Environment Config

The `src/config/env.ts` file provides type-safe access:

```javascript
export const ENV = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  appName: import.meta.env.VITE_APP_NAME || 'Production Ready App',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
```

**Usage in components:**

```javascript
import { ENV } from './config/env';

function MyComponent() {
  useEffect(() => {
    if (ENV.enableAnalytics) {
      // Initialize analytics
    }
  }, []);

  return <p>API: {ENV.apiUrl}</p>;
}
```

### Security Warning

**Never put secret API keys in frontend environment variables!**

```bash
#  WRONG - Secret keys should never be in frontend code
VITE_SECRET_API_KEY=sk_live_1234567890

#  CORRECT - Use public keys or backend proxy
VITE_PUBLIC_API_KEY=pk_live_abcdefghij
```

For sensitive operations, create a backend API route that uses secrets server-side.

## ☁ Deployment Guide

### Option 1: Deploy to Vercel (Recommended)

Vercel is optimized for React/Vite applications with zero configuration.

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"New Project"**
3. **Import Git Repository**→ Select your GitHub repo
4. **Configure Project**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variables**
   ```
   VITE_API_URL = https://api.myapp.com
   VITE_APP_NAME = MyApp
   VITE_ENABLE_ANALYTICS = true
   VITE_ENABLE_LOGGING = false
   ```

6. Click **Deploy**

Your app will be live at: `https://your-project.vercel.app`

#### Step 3: Automatic Deployments

Every push to `main` branch automatically deploys to production!

```bash
git add .
git commit -m "Update homepage"
git push
#  Auto-deploys in ~30 seconds
```

#### vercel.json Configuration

The included `vercel.json` handles SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

This ensures that `/about`, `/dashboard`, etc. all return `index.html`.

### Option 2: Deploy to Netlify

#### Step 1: Push to GitHub (same as Vercel)

#### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site"**→ **"Import an existing project"**
3. **Connect to GitHub**→ Select your repository
4. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Environment Variables**→ Add production environment variables

6. Click **Deploy site**

Your app will be live at: `https://your-project.netlify.app`

#### netlify.toml Configuration

The included `netlify.toml` handles SPA routing and caching:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Option 3: Manual Deployment (AWS S3, Azure, etc.)

#### Step 1: Build

```bash
npm run build
```

#### Step 2: Upload `dist/` folder

Upload the entire `dist/` folder to your hosting provider.

#### Step 3: Configure SPA Routing

Ensure your server returns `index.html` for all routes:

**AWS S3 + CloudFront:**
- CloudFront → Error Pages → Add Custom Error Response
- HTTP Error Code: 403, 404
- Response Page Path: `/index.html`
- HTTP Response Code: 200

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Performance Optimization Tips

### 1. **Lazy Load Routes**

For larger apps, lazy load routes:

```javascript
const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<Loading />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Suspense>
```

### 2. **Code Splitting**

Split large vendor libraries:

```javascript
manualChunks: {
  'chart-vendor': ['chart.js', 'react-chartjs-2'],
  'ui-vendor': ['@mui/material'],
}
```

### 3. **Image Optimization**

Use WebP format and responsive images:

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>
```

### 4. **Analyze Bundle Size**

```bash
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
});

npm run build
# Opens interactive bundle visualization
```

### 5. **Enable Compression**

Most hosting providers (Vercel, Netlify) automatically enable Brotli/Gzip compression.

For manual hosting, enable it:

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript application/json;
```

## Testing Production Build Locally

### Method 1: Preview Command

```bash
npm run preview
```

### Method 2: Serve Package

```bash
npm install -g serve
serve -s dist
```

### Method 3: Python Server

```bash
cd dist
python -m http.server 8000
```

## Debugging Production Issues

### 1. **Enable Source Maps**

In `vite.config.ts`:

```javascript
build: {
  sourcemap: true,  // Enable for production debugging
}
```

** Warning:**Source maps expose your source code. Only enable for debugging.

### 2. **Test Environment Variables**

Add this to your app:

```javascript
console.log('ENV Check:', {
  apiUrl: ENV.apiUrl,
  isDev: ENV.isDevelopment,
  isProd: ENV.isProduction,
});
```

### 3. **Check Network Tab**

Open DevTools → Network tab:
- Verify API calls use production URL
- Check chunk sizes
- Ensure assets are cached (304 responses)

## Production Deployment Checklist

Before deploying to production, verify:

- [x] Environment variables configured correctly
- [x] Build optimization enabled (minification, code splitting)
- [x] Console logs removed in production
- [x] SPA routing configured (vercel.json or netlify.toml)
- [x] Error boundary implemented
- [x] 404 page created
- [x] Meta tags for SEO
- [x] Favicon and app icons
- [x] HTTPS enabled
- [x] Analytics tracking (if required)
- [x] Performance monitoring (Sentry, LogRocket)
- [x] Lighthouse audit score > 90
- [x] Tested on multiple browsers
- [x] Mobile responsive
- [x] Accessibility (a11y) tested

## Additional Resources

- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Netlify Deployment Docs](https://docs.netlify.com/)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance Audit](https://developers.google.com/web/tools/lighthouse)

## Next Steps

1. **Add Monitoring** Integrate Sentry for error tracking
2. **Add Analytics** Set up Google Analytics or Plausible
3. **Add CI/CD** Set up GitHub Actions for testing before deploy
4. **Add E2E Tests** Use Playwright or Cypress
5. **Add CDN** Use CloudFlare or AWS CloudFront
6. **Add Database** Connect to Firebase, Supabase, or PostgreSQL
7. **Add Authentication** Implement Auth0, Clerk, or Firebase Auth

## What You Learned

 How to configure environment variables for different environments
 How to optimize production builds (minification, code splitting)
 How to deploy React apps to Vercel and Netlify
 How to configure SPA routing for production servers
 How to analyze and optimize bundle sizes
 How to test production builds locally
 How to set up automatic deployments from Git

---

You've completed Exercise 4 and now have a production-ready, fully-deployed React application!
