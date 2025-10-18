export default function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1 className="hero-title">Welcome to MyApp</h1>
        <p className="hero-subtitle">
          A demonstration of React Router v6 with navigation and route parameters
        </p>
        <div className="hero-features">
          <div className="feature-card">
            <span className="feature-icon"></span>
            <h3>Fast Navigation</h3>
            <p>Client-side routing without page reloads</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"></span>
            <h3>Dynamic Routes</h3>
            <p>URL parameters for dynamic content</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon"></span>
            <h3>Modern Design</h3>
            <p>Beautiful UI with smooth transitions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
