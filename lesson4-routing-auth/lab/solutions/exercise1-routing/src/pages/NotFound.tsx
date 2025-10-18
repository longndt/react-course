import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-container">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
