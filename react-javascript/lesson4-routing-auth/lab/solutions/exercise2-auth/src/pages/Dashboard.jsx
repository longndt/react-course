import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="dashboard-hero">
        <h1>Welcome, {user?.username}! 👋</h1>
        <p>You're successfully logged into your dashboard</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>Analytics</h3>
            <p className="stat-value">1,234</p>
            <p className="stat-label">Total Views</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Users</h3>
            <p className="stat-value">567</p>
            <p className="stat-label">Active Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Revenue</h3>
            <p className="stat-value">$12,345</p>
            <p className="stat-label">This Month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <h3>Growth</h3>
            <p className="stat-value">+23%</p>
            <p className="stat-label">vs Last Month</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Your Account Information</h2>
        <div className="info-card">
          <div className="info-row">
            <span className="info-label">User ID:</span>
            <span className="info-value">{user?.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Username:</span>
            <span className="info-value">{user?.username}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Role:</span>
            <span className="info-value">
              <span className="role-badge">{user?.role}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
