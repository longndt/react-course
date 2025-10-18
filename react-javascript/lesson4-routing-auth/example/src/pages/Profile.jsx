import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

export function Profile() {
   const { user } = useAuth();

   return (
      <div className="profile">
         <h2>Profile</h2>

         <div className="profile-info">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <div className="profile-actions">
               <Link to="/change-password" className="action-button">
                  Change Password
               </Link>
               <Link to="/my-orders" className="action-button secondary">
                  View My Orders
               </Link>
            </div>
         </div>
      </div>
   );
}
