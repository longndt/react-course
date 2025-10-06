export default function About() {
  return (
    <div className="page-container">
      <h1>About Us</h1>
      <div className="content-card">
        <p>
          This is a demo application showcasing <strong>React Router v6</strong> features:
        </p>
        <ul className="feature-list">
          <li> BrowserRouter setup</li>
          <li> Navigation with Link and NavLink components</li>
          <li> Active link highlighting</li>
          <li> Route parameters with useParams</li>
          <li> Programmatic navigation with useNavigate</li>
          <li> 404 Not Found page</li>
        </ul>

        <h2>Technologies Used</h2>
        <div className="tech-stack">
          <span className="tech-badge">React 18</span>
          <span className="tech-badge">TypeScript</span>
          <span className="tech-badge">React Router v6</span>
          <span className="tech-badge">Vite</span>
        </div>
      </div>
    </div>
  );
}
