import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="page-container">
      <h1>Settings</h1>

      <div className="settings-container">
        {/* Account Settings */}
        <div className="settings-section">
          <h2>Account Settings</h2>
          <div className="settings-card">
            <div className="form-group">
              <label>Display Name</label>
              <input type="text" defaultValue={user?.username} />
              <span className="form-hint">This is how your name will appear across the site</span>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" defaultValue={user?.email} />
              <span className="form-hint">We'll send important updates to this email</span>
            </div>

            <div className="form-group">
              <label>Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="settings-card">
            <div className="toggle-group">
              <div className="toggle-content">
                <h3>Email Notifications</h3>
                <p>Receive email updates about your account activity</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="toggle-group">
              <div className="toggle-content">
                <h3>Push Notifications</h3>
                <p>Receive push notifications on your device</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="settings-card">
            <div className="toggle-group">
              <div className="toggle-content">
                <h3>Dark Mode</h3>
                <p>Use dark theme across the application</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section">
          <h2>Security</h2>
          <div className="settings-card">
            <div className="security-item">
              <div>
                <h3>Password</h3>
                <p>Last changed 30 days ago</p>
              </div>
              <button className="btn-secondary">Change Password</button>
            </div>

            <div className="security-item">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <button className="btn-secondary">Enable 2FA</button>
            </div>

            <div className="security-item">
              <div>
                <h3>Active Sessions</h3>
                <p>Manage devices where you're logged in</p>
              </div>
              <button className="btn-secondary">View Sessions</button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-actions">
          <button className="btn-primary btn-large" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn-secondary btn-large">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
