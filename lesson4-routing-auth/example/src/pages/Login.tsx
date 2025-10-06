import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Login() {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [isRegister, setIsRegister] = useState<boolean>(false);
   const [name, setName] = useState<string>('');
   const [error, setError] = useState<string | null>(null);

   const navigate = useNavigate();
   const location = useLocation();
   const auth = useAuth();

   const from = location.state?.from?.pathname || '/';

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      try {
         if (isRegister) {
            await auth.register(email, password, name);
         } else {
            await auth.login(email, password);
         }
         navigate(from, { replace: true });
      } catch (err) {
         setError(err instanceof Error ? err.message : 'An error occurred');
      }
   };

   return (
      <div className="login-container">
         <form onSubmit={handleSubmit} className="login-form">
            <h2>{isRegister ? 'Register' : 'Login'}</h2>

            {error && <div className="error-message">{error}</div>}

            {isRegister && (
               <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     id="name"
                     value={name}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                     required
                  />
               </div>
            )}

            <div className="form-group">
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
               />
            </div>

            <div className="form-group">
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
               />
            </div>

            <button type="submit" className="submit-button">
               {isRegister ? 'Register' : 'Login'}
            </button>

            <button
               type="button"
               className="toggle-button"
               onClick={() => setIsRegister(!isRegister)}
            >
               {isRegister
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
            </button>
         </form>
      </div>
   );
}
