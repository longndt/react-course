import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

/**
 * @typedef {Object} DashboardData
 * @property {number} totalUsers
 * @property {number} totalRevenue
 * @property {number} totalOrders
 * @property {number} monthlyGrowth
 * @property {Array<{name: string, sales: number, revenue: number}>} topProducts
 * @property {Array<{type: string, description: string, timestamp: string}>} recentActivity
 */

const Dashboard = () => {
  const { user, logout, success, clearSuccess } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        totalUsers: 1234,
        totalRevenue: 45678,
        totalOrders: 567,
        monthlyGrowth: 12.5,
        topProducts: [
          { name: 'Product A', sales: 123, revenue: 12345 },
          { name: 'Product B', sales: 98, revenue: 9876 },
          { name: 'Product C', sales: 76, revenue: 7654 }
        ],
        recentActivity: [
          { type: 'user_registration', description: 'New user registered', timestamp: new Date().toISOString() },
          { type: 'order_placed', description: 'Order #1234 placed', timestamp: new Date().toISOString() },
          { type: 'payment_received', description: 'Payment of $123.45 received', timestamp: new Date().toISOString() }
        ]
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="dashboard-page">
      {success && (
        <div className="toast toast-success" onClick={clearSuccess}>
          ✓ {success}
        </div>
      )}

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, <strong>{user?.name}</strong>!</p>
          </div>
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-users">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-value">{dashboardData?.totalUsers.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-revenue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <p className="stat-value">${dashboardData?.totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-orders">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <p className="stat-value">{dashboardData?.totalOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-growth">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Monthly Growth</h3>
              <p className="stat-value stat-value-positive">+{dashboardData?.monthlyGrowth}%</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <Link to="/file-manager" className="action-card">
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
              </div>
              <h3>File Manager</h3>
              <p>Upload and manage your files</p>
            </Link>

            <Link to="/performance" className="action-card">
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3>Performance Demo</h3>
              <p>Test performance optimizations</p>
            </Link>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="dashboard-grid">
          {/* Top Products */}
          <div className="dashboard-section">
            <h2>Top Products</h2>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.topProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td>${product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {dashboardData?.recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'user_registration' && '👤'}
                    {activity.type === 'order_placed' && '🛒'}
                    {activity.type === 'payment_received' && '💰'}
                  </div>
                  <div className="activity-content">
                    <p>{activity.description}</p>
                    <span className="activity-time">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
