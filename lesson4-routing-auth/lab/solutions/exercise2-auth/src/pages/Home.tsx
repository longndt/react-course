export default function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1 className="hero-title">Secure Authentication System</h1>
        <p className="hero-subtitle">
          Learn React Router authentication with protected routes and Context API
        </p>

        <div className="hero-features">
          <div className="feature-card">
            <span className="feature-icon">🔐</span>
            <h3>Secure Login</h3>
            <p>User authentication with session management</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡</span>
            <h3>Protected Routes</h3>
            <p>Route guards to protect sensitive content</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👤</span>
            <h3>User Context</h3>
            <p>Global auth state with Context API</p>
          </div>
        </div>

        <div className="cta-section">
          <p>Login to access your personalized dashboard</p>
          <a href="/login" className="btn-cta">
            Get Started →
          </a>
        </div>
      </div>
    </div>
  );
}
