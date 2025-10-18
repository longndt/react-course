import { ENV } from '../config/env';
import './Home.css';

export default function Home() {
  return (
    <div className="page home-page">
      <div className="hero">
        <h1> Production Ready React App</h1>
        <p className="subtitle">
          A comprehensive example of production deployment with environment configuration
        </p>

        <div className="environment-status">
          <div className="status-badge">
            Environment: <strong>{ENV.isDevelopment ? 'Development' : 'Production'}</strong>
          </div>
          <div className="status-badge">
            Mode: <strong>{ENV.mode}</strong>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon"></span>
          <h3>Environment Variables</h3>
          <p>Separate configs for dev and production</p>
          <code>{ENV.apiUrl}</code>
        </div>

        <div className="feature-card">
          <span className="feature-icon"></span>
          <h3>Optimized Builds</h3>
          <p>Code splitting, minification, tree shaking</p>
          <small>Check Network tab to see chunked assets</small>
        </div>

        <div className="feature-card">
          <span className="feature-icon">☁</span>
          <h3>Cloud Deployment</h3>
          <p>Ready for Vercel, Netlify, or any static host</p>
          <small>Includes SPA routing configuration</small>
        </div>

        <div className="feature-card">
          <span className="feature-icon"></span>
          <h3>Performance First</h3>
          <p>Lazy loading, caching headers, CDN ready</p>
          <small>Lighthouse score: 95+</small>
        </div>
      </div>

      <div className="config-info">
        <h2>Current Configuration</h2>
        <table className="config-table">
          <tbody>
            <tr>
              <td><strong>API URL</strong></td>
              <td><code>{ENV.apiUrl}</code></td>
            </tr>
            <tr>
              <td><strong>App Name</strong></td>
              <td><code>{ENV.appName}</code></td>
            </tr>
            <tr>
              <td><strong>Analytics Enabled</strong></td>
              <td>{ENV.enableAnalytics ? ' Yes' : ' No'}</td>
            </tr>
            <tr>
              <td><strong>Logging Enabled</strong></td>
              <td>{ENV.enableLogging ? ' Yes' : ' No'}</td>
            </tr>
            <tr>
              <td><strong>Version</strong></td>
              <td><code>{ENV.version}</code></td>
            </tr>
            <tr>
              <td><strong>Build Time</strong></td>
              <td><code>{ENV.buildTime}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="deployment-checklist">
        <h2> Production Deployment Checklist</h2>
        <ul className="checklist">
          <li> Environment variables configured (.env.production)</li>
          <li> Build optimization enabled (vite.config.ts)</li>
          <li> Code splitting and chunking configured</li>
          <li> Console logs removed in production</li>
          <li> SPA routing configured (vercel.json / netlify.toml)</li>
          <li> Caching headers set for static assets</li>
          <li> Error boundary implemented</li>
          <li> TypeScript strict mode enabled</li>
          <li> Production build tested locally (npm run preview)</li>
          <li> Deployment platform configured</li>
        </ul>
      </div>

      <div className="quick-links">
        <h2> Quick Links</h2>
        <div className="links-grid">
          <a href="https://vitejs.dev/guide/build.html" target="_blank" rel="noopener noreferrer" className="link-card">
            <h4>Vite Build Guide</h4>
            <p>Learn about production builds</p>
          </a>
          <a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer" className="link-card">
            <h4>Vercel Docs</h4>
            <p>Deploy to Vercel</p>
          </a>
          <a href="https://docs.netlify.com/" target="_blank" rel="noopener noreferrer" className="link-card">
            <h4>Netlify Docs</h4>
            <p>Deploy to Netlify</p>
          </a>
          <a href="https://web.dev/vitals/" target="_blank" rel="noopener noreferrer" className="link-card">
            <h4>Web Vitals</h4>
            <p>Measure performance</p>
          </a>
        </div>
      </div>
    </div>
  );
}
