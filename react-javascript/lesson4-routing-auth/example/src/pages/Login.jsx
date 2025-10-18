import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);

   const navigate = useNavigate();
   const location = useLocation();
   const auth = useAuth();

   const from = location.state?.from?.pathname || '/';

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      try {
         await auth.login(email, password);
         navigate(from, { replace: true });
      } catch (err) {
         setError(err instanceof Error ? err.message : 'An error occurred');
      }
   };

   return (
      <div className="login-container">
         <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>

            <div className="demo-info">
               <p><strong>Demo Account:</strong></p>
               <p>Email: demo@gmail.com</p>
               <p>Password: demo</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>

            <div className="form-group">
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>

            <button type="submit" className="submit-button">
               Login
            </button>

            <p className="auth-link">
               Don't have an account? <Link to="/register">Register here</Link>
            </p>
         </form>
      </div>
   );
}
