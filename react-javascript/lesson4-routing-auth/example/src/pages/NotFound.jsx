import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="profile">
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist or was moved.</p>
      <p>
        <Link to="/" className="action-button">
          Return home
        </Link>
      </p>
    </div>
  );
}

