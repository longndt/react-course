# Lesson 5 Demo: Full-Stack Deployment & Production

This demo shows how to deploy React applications to production with modern CI/CD practices.

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Git repository
- Vercel/Netlify account (for deployment)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build for production:**

   ```bash
   npm run build
   ```

3. **Preview production build:**
   ```bash
   npm run preview
   ```

## Features Demonstrated

- **Production Optimization**:

  - Code splitting with React.lazy
  - Bundle optimization
  - Image optimization
  - Performance monitoring

- **Deployment**:

  - Static site deployment (Vercel/Netlify)
  - Environment variable configuration
  - Custom domain setup
  - SSL certificate management

- **CI/CD Pipeline**:
  - GitHub Actions workflow
  - Automated testing
  - Build optimization
  - Deployment automation

## Deployment Targets

- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **Cloud Platforms**: AWS S3, Google Cloud, Azure
- **CDN Integration**: Cloudflare, AWS CloudFront

## Performance Optimizations

- Tree shaking for smaller bundles
- Lazy loading for routes and components
- Image optimization and compression
- Caching strategies for API requests


