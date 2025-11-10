import { Link } from 'react-router-dom';

export function Unauthorized() {
  return (
    <div className="profile">
      <h2>Access denied</h2>
      <p>You do not have permission to view this page.</p>
      <p>
        <Link to="/" className="action-button">
          Go back home
        </Link>
      </p>
    </div>
  );
}

