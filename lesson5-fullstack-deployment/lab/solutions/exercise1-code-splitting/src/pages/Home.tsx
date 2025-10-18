export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1> Code Splitting & Lazy Loading</h1>
        <p className="subtitle">
          This app demonstrates React performance optimization with code splitting
        </p>

        <div className="features">
          <div className="feature-card">
            <span className="feature-icon"></span>
            <h3>Smaller Bundles</h3>
            <p>Each page loads only when needed, reducing initial load time</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"></span>
            <h3>Faster Performance</h3>
            <p>Lazy loading improves Time to Interactive (TTI)</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"></span>
            <h3>Better UX</h3>
            <p>Users download only what they need</p>
          </div>
        </div>

        <div className="info-box">
          <h3>How It Works</h3>
          <ul>
            <li> Each page is loaded as a separate chunk</li>
            <li> Suspense handles loading states gracefully</li>
            <li> ErrorBoundary catches lazy loading failures</li>
            <li> Navigate between pages to see chunks loading in DevTools Network tab</li>
          </ul>
        </div>

        <div className="cta">
          <p>Open DevTools → Network tab and navigate between pages to see code splitting in action!</p>
        </div>
      </div>
    </div>
  );
}
