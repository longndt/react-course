import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🔐</span>
          AuthApp
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              end
            >
              Home
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Settings
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <span className="user-greeting">
                Welcome, <strong>{user?.username}</strong>
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn-login-nav">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
