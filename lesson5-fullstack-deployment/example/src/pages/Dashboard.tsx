import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  monthlyGrowth: number;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

interface RecentActivity {
  type: string;
  description: string;
  timestamp: string;
}

interface DashboardData {
  stats: DashboardStats;
  topProducts: TopProduct[];
  recentActivity: RecentActivity[];
}

export function Dashboard() {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardAPI.getDashboard();
      setDashboardData(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-message">
          <h3>Error loading dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      {dashboardData && (
        <>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">{formatNumber(dashboardData.stats.totalUsers)}</p>
              <span className="stat-growth">
                {dashboardData.stats.monthlyGrowth > 0 ? '+' : ''}
                {dashboardData.stats.monthlyGrowth}% this month
              </span>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-number">{formatCurrency(dashboardData.stats.totalRevenue)}</p>
              <span className="stat-growth">
                {dashboardData.stats.monthlyGrowth > 0 ? '+' : ''}
                {dashboardData.stats.monthlyGrowth}% this month
              </span>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-number">{formatNumber(dashboardData.stats.totalOrders)}</p>
              <span className="stat-growth">
                {dashboardData.stats.monthlyGrowth > 0 ? '+' : ''}
                {dashboardData.stats.monthlyGrowth}% this month
              </span>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-section">
              <h3>Top Products</h3>
              <div className="top-products">
                {dashboardData.topProducts.map((product, index) => (
                  <div key={index} className="product-item">
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>{formatNumber(product.sales)} sales</p>
                    </div>
                    <div className="product-revenue">
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-section">
              <h3>Recent Activity</h3>
              <div className="recent-activity">
                {dashboardData.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-content">
                      <p className="activity-description">{activity.description}</p>
                      <span className="activity-time">
                        {formatDate(activity.timestamp)}
                      </span>
                    </div>
                    <div className={`activity-type activity-${activity.type}`}>
                      {activity.type.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
