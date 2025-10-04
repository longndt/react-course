export default function About() {
  return (
    <div className="page">
      <h1>About Code Splitting</h1>

      <div className="content-section">
        <h2>What is Code Splitting?</h2>
        <p>
          Code splitting is a technique that splits your application into smaller chunks
          that can be loaded on demand, rather than loading the entire application upfront.
        </p>

        <h2>Benefits</h2>
        <ul className="benefits-list">
          <li>
            <strong>Faster Initial Load:</strong> Users download only the code needed
            for the current page
          </li>
          <li>
            <strong>Better Performance:</strong> Smaller bundles = faster downloads
          </li>
          <li>
            <strong>Improved Caching:</strong> Unchanged chunks remain cached
          </li>
          <li>
            <strong>Scalability:</strong> As your app grows, users don't download more code
          </li>
        </ul>

        <h2>Implementation</h2>
        <div className="code-example">
          <pre>{`// Before (eager loading)
import Home from './pages/Home';
import About from './pages/About';

// After (lazy loading)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));`}</pre>
        </div>

        <h2>Key Concepts</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>React.lazy()</h3>
            <p>Dynamically imports a component and returns it as a promise</p>
          </div>
          <div className="concept-card">
            <h3>Suspense</h3>
            <p>Displays fallback UI while lazy component loads</p>
          </div>
          <div className="concept-card">
            <h3>ErrorBoundary</h3>
            <p>Catches errors during lazy loading and shows error UI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
