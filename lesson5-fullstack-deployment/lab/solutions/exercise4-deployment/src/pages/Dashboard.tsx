import { useState, useEffect } from 'react';
import { ENV } from '../config/env';

interface DashboardStats {
  users: number;
  activeProjects: number;
  deployments: number;
  uptime: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      try {
        // In a real app, this would be:
        // const response = await fetch(`${ENV.apiUrl}/stats`);
        // const data = await response.json();

        // Simulated data
        await new Promise(resolve => setTimeout(resolve, 1000));

        setStats({
          users: 1234,
          activeProjects: 42,
          deployments: 156,
          uptime: '99.99%',
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="page dashboard-page">
      <h1>Dashboard</h1>
      <p className="page-subtitle">
        Production metrics and monitoring
      </p>

      <div className="api-info">
        <strong>API Endpoint:</strong> <code>{ENV.apiUrl}</code>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{stats.users.toLocaleString()}</div>
            <div className="stat-label">Total Users</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-value">{stats.activeProjects}</div>
            <div className="stat-label">Active Projects</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-value">{stats.deployments}</div>
            <div className="stat-label">Deployments</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱</div>
            <div className="stat-value">{stats.uptime}</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
      )}

      <div className="monitoring-section">
        <h2>Monitoring & Analytics</h2>
        <p>
          In production, you would integrate monitoring tools here:
        </p>
        <ul>
          <li><strong>Sentry</strong> - Error tracking and monitoring</li>
          <li><strong>Google Analytics</strong> - User behavior analytics</li>
          <li><strong>LogRocket</strong> - Session replay and debugging</li>
          <li><strong>Datadog</strong> - Infrastructure monitoring</li>
        </ul>

        {ENV.enableAnalytics ? (
          <div className="status-success">
             Analytics is ENABLED in this environment
          </div>
        ) : (
          <div className="status-warning">
             Analytics is DISABLED in this environment
          </div>
        )}
      </div>
    </div>
  );
}
