import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h1>User Profile</h1>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{user?.username}</h2>
            <p>{user?.email}</p>
            <span className="role-badge">{user?.role}</span>
          </div>
        </div>

        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={user?.username} readOnly />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={user?.email} readOnly />
          </div>
          <div className="form-group">
            <label>User ID</label>
            <input type="text" value={user?.id} readOnly />
          </div>
          <div className="form-group">
            <label>Account Role</label>
            <input type="text" value={user?.role} readOnly />
          </div>
        </div>

        <div className="profile-section">
          <h3>Account Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">42</span>
              <span className="stat-label">Posts Created</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">128</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">89</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">256</span>
              <span className="stat-label">Likes</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-primary">Edit Profile</button>
          <button className="btn-secondary">Change Password</button>
        </div>
      </div>
    </div>
  );
}
