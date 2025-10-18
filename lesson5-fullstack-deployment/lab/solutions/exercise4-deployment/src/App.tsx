import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import { ENV } from './config/env';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            {ENV.appName} {ENV.isDevelopment && '(Dev)'}
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/settings">Settings</Link>
          </div>
          <div className="env-badge">
            {ENV.isDevelopment ? ' Dev' : ' Prod'}
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>
            Environment: <strong>{ENV.isDevelopment ? 'Development' : 'Production'}</strong>
            {' '} | API: <strong>{ENV.apiUrl}</strong>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
