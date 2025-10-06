export function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Users</h3>
          <p>1,234</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>$45,678</p>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p>890</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
