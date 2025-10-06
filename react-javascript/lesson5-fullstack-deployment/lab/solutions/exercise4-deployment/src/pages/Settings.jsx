import { useState } from 'react';
import { ENV } from '../config/env';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert('Settings saved! (Simulated)');

    if (ENV.enableLogging) {
      console.log('Settings saved:', { notifications, darkMode });
    }
  };

  return (
    <div className="page settings-page">
      <h1>Settings</h1>
      <p className="page-subtitle">
        Configure your application preferences
      </p>

      <div className="settings-section">
        <h2>Preferences</h2>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-label">Email Notifications</div>
            <div className="setting-description">
              Receive updates about your account
            </div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-label">Dark Mode</div>
            <div className="setting-description">
              Use dark theme across the app
            </div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Build Information</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <td><strong>Version</strong></td>
              <td><code>{ENV.version}</code></td>
            </tr>
            <tr>
              <td><strong>Environment</strong></td>
              <td><code>{ENV.mode}</code></td>
            </tr>
            <tr>
              <td><strong>Build Time</strong></td>
              <td><code>{ENV.buildTime}</code></td>
            </tr>
            <tr>
              <td><strong>Logging</strong></td>
              <td>{ENV.enableLogging ? ' Enabled' : ' Disabled'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="settings-actions">
        <button onClick={handleSave} className="btn-primary">
          Save Settings
        </button>
        <button onClick={() => window.location.reload()} className="btn-secondary">
          Reset
        </button>
      </div>
    </div>
  );
}
