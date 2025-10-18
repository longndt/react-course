import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './Layout.css';

interface LayoutProps {
   children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
   const { user, logout } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      logout();
      navigate('/login');
   };

   return (
      <div className="layout">
         <header className="header">
            <nav className="nav">
               <Link to="/" className="nav-logo">
                  React Shop
               </Link>

               <div className="nav-links">
                  <Link to="/products" className="nav-link">
                     Products
                  </Link>

                  {user ? (
                     <>
                        <Link to="/profile" className="nav-link">
                           Profile
                        </Link>
                        <Link to="/my-orders" className="nav-link">
                           My Orders
                        </Link>
                        <Link to="/cart" className="nav-link">
                           Cart
                        </Link>
                        <button onClick={handleLogout} className="nav-button">
                           Logout
                        </button>
                     </>
                  ) : (
                     <Link to="/login" className="nav-button">
                        Login
                     </Link>
                  )}
               </div>
            </nav>
         </header>

         <main className="main">
            {children}
         </main>

         <footer className="footer">
            <p>© 2025 React Shop. All rights reserved.</p>
         </footer>
      </div>
   );
}
