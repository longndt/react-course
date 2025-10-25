import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout, success, clearSuccess } = useAuth();

  return (
    <div className="dashboard">
      {success && (
        <div className="toast" onClick={clearSuccess}>
          {success}
        </div>
      )}

      <div className="header">
        <h1>Welcome, {user?.name}!</h1>
        <div className="header-actions">
          <Link to="/file-manager" className="btn btn-primary">
            File Manager
          </Link>
          <Link to="/performance" className="btn btn-primary">
            Performance Demo
          </Link>
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div>
        <h2>Dashboard Content</h2>
        <p>This is your dashboard. You can navigate to different sections using the buttons above.</p>
      </div>
    </div>
  );
};

export default Dashboard;