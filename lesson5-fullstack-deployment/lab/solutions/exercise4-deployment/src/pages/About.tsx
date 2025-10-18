export default function About() {
  return (
    <div className="page">
      <h1>About Production Deployment</h1>

      <div className="content-section">
        <h2>What Makes an App Production-Ready?</h2>
        <p>
          A production-ready React application goes beyond just "working code."
          It requires optimization, security, monitoring, and proper configuration
          for deployment.
        </p>

        <h2>Key Components</h2>

        <div className="component-card">
          <h3>1. Environment Configuration</h3>
          <p>
            Different settings for development, staging, and production environments.
            API URLs, feature flags, and debugging options should be environment-specific.
          </p>
          <pre>{`// .env.production
VITE_API_URL=https://api.myapp.com
VITE_ENABLE_ANALYTICS=true`}</pre>
        </div>

        <div className="component-card">
          <h3>2. Build Optimization</h3>
          <p>
            Minification, tree shaking, code splitting, and lazy loading to reduce
            bundle size and improve performance.
          </p>
          <ul>
            <li>Minify JavaScript and CSS</li>
            <li>Remove console.logs</li>
            <li>Split vendor and app code</li>
            <li>Optimize images and assets</li>
          </ul>
        </div>

        <div className="component-card">
          <h3>3. Deployment Platform</h3>
          <p>
            Choose a hosting platform that fits your needs:
          </p>
          <ul>
            <li><strong>Vercel</strong>: Best for Next.js and React apps</li>
            <li><strong>Netlify</strong>: Great for static sites and JAMstack</li>
            <li><strong>AWS S3 + CloudFront</strong>: Enterprise-grade, scalable</li>
            <li><strong>Azure Static Web Apps</strong>: Microsoft ecosystem</li>
            <li><strong>GitHub Pages</strong>: Free for open source</li>
          </ul>
        </div>

        <div className="component-card">
          <h3>4. Continuous Deployment (CD)</h3>
          <p>
            Automatically deploy when you push to your main branch:
          </p>
          <ol>
            <li>Push code to GitHub</li>
            <li>Platform detects changes</li>
            <li>Runs build command</li>
            <li>Deploys to production</li>
            <li>Provides preview URL</li>
          </ol>
        </div>

        <h2>Common Pitfalls</h2>

        <div className="warning-box">
          <h4> API Keys in Frontend Code</h4>
          <p>
            Never put secret API keys in frontend code! Use a backend proxy
            or serverless functions for sensitive operations.
          </p>
        </div>

        <div className="warning-box">
          <h4> SPA Routing on Static Hosts</h4>
          <p>
            Configure redirects so all routes return index.html, otherwise
            direct navigation to /about will return 404.
          </p>
        </div>

        <div className="warning-box">
          <h4> Environment Variables</h4>
          <p>
            Remember to set production environment variables on your hosting
            platform, not just in .env files!
          </p>
        </div>
      </div>
    </div>
  );
}
