export default function Dashboard() {
  // Simulate a heavy component with lots of data
  const stats = [
    { label: 'Total Users', value: '12,543', trend: '+12%', icon: '👥' },
    { label: 'Revenue', value: '$45,231', trend: '+8%', icon: '💰' },
    { label: 'Active Sessions', value: '1,234', trend: '+23%', icon: '' },
    { label: 'Conversion Rate', value: '3.24%', trend: '+5%', icon: '' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Created new project', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '15 minutes ago' },
    { id: 3, user: 'Bob Johnson', action: 'Completed task', time: '1 hour ago' },
    { id: 4, user: 'Alice Brown', action: 'Left a comment', time: '3 hours ago' },
    { id: 5, user: 'Charlie Wilson', action: 'Shared document', time: '5 hours ago' },
  ];

  return (
    <div className="page dashboard-page">
      <h1>Dashboard</h1>
      <p className="page-subtitle">
        This is a lazy-loaded dashboard - notice the separate chunk loaded in DevTools
      </p>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-trend positive">{stat.trend}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-avatar">
                {activity.user.charAt(0)}
              </div>
              <div className="activity-details">
                <div className="activity-user">{activity.user}</div>
                <div className="activity-action">{activity.action}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box">
        <strong> Performance Tip:</strong> This dashboard component is only loaded
        when you navigate to this page, keeping the initial bundle size small.
      </div>
    </div>
  );
}
