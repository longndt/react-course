# Quick Start Guide - Lesson 5

## Deploy Your React App to Production

### 1. Optimize for Production

First, let's prepare your app for deployment:

```bash
# In your React app directory
# Install additional optimization packages
npm install --save-dev @vitejs/plugin-react-swc

# Build your app for production
npm run build
```

### 2. Test Production Build Locally

```bash
# Preview the production build
npm run preview

# Your app should now be running on http://localhost:4173
# Test that everything works in production mode
```

### 3. Deploy to Vercel (Fastest Option)

#### Option A: Deploy with Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (creates account if needed)
vercel login

# Deploy your app
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project's name? (enter name)
# - In which directory is your code located? ./
# - Want to override settings? No
```

#### Option B: Deploy via GitHub (Recommended)

1. **Push to GitHub first:**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Vercel will auto-detect it's a React app
   - Click "Deploy"

### 4. Add Environment Variables

Create `.env.example` for your team:

```bash
# .env.example
VITE_API_URL=https://your-api-url.com
VITE_APP_NAME=My React App
```

Create `.env.production` for production:

```bash
# .env.production
VITE_API_URL=https://your-production-api.com
VITE_APP_NAME=My React App
```

### 5. Configure Custom Domain (Optional)

In your Vercel dashboard:

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

### 6. Setup Continuous Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage --watchAll=false

      - name: Build application
        run: npm run build

      - name: Deploy to Vercel
        uses: vercel/vercel-action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: "--prod"
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 7. Add Performance Optimizations

Update your `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
        },
      },
    },
    // Enable compression
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Enable better development experience
  server: {
    open: true,
    port: 3000,
  },
});
```

### 8. Add Progressive Web App Features

Create `public/manifest.json`:

```json
{
  "name": "My React App",
  "short_name": "ReactApp",
  "description": "My awesome React application",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ]
}
```

Add to your `index.html`:

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#000000" />
```

### 9. Monitor Your Deployment

Add basic analytics with Vercel Analytics:

```bash
npm install @vercel/analytics

# Add to your main.jsx:
```

Update `src/main.jsx`:

```javascript
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
```

### 10. Test Your Deployment

1. **Performance Test:**

   - Use Lighthouse in Chrome DevTools
   - Aim for scores above 90 in all categories

2. **Cross-browser Test:**

   - Test in Chrome, Firefox, Safari, Edge
   - Test on mobile devices

3. **Load Test:**
   - Share your deployed URL with others
   - Monitor for any issues

## 🎉 Congratulations!

You now have:

- ✅ Production-optimized React build
- ✅ Deployed app with custom domain
- ✅ Continuous deployment setup
- ✅ Performance monitoring
- ✅ PWA capabilities

## Your Deployed App

Your app should now be live at:

- **Vercel URL**: `https://your-app-name.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)

## Next Steps

1. Read the full [Lesson 5 README](./README.md)
2. Set up error monitoring (Sentry)
3. Add more PWA features
4. Configure CDN and caching
5. Complete the lab exercises

## Need Help?

- Check Vercel deployment logs for any build errors
- Use `npm run preview` to test locally first
- Verify all environment variables are set correctly
- Check browser console for any runtime errors

## Alternative Deployment Options

- **Netlify**: Similar to Vercel, great for static sites
- **Firebase Hosting**: Google's hosting solution
- **GitHub Pages**: Free hosting for public repos
- **AWS S3 + CloudFront**: More control, requires setup
