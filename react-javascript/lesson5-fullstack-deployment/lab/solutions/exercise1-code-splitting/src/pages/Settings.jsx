import { useState } from 'react';

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="page settings-page">
      <h1>Settings</h1>
      <p className="page-subtitle">
        Configure your application preferences
      </p>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-group">
          <label className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Email Notifications</div>
              <div className="setting-description">
                Receive email updates about your account
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="toggle"
            />
          </label>

          <label className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Push Notifications</div>
              <div className="setting-description">
                Receive push notifications on your device
              </div>
            </div>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
              className="toggle"
            />
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Appearance</h2>
        <div className="settings-group">
          <label className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Dark Mode</div>
              <div className="setting-description">
                Use dark theme across the application
              </div>
            </div>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="toggle"
            />
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>General</h2>
        <div className="settings-group">
          <label className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Auto-Save</div>
              <div className="setting-description">
                Automatically save changes
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
              className="toggle"
            />
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-secondary">Reset to Defaults</button>
      </div>

      <div className="info-box">
        <strong> Performance:</strong> This settings page is lazy-loaded,
        so users who never visit settings don't download this code!
      </div>
    </div>
  );
}
