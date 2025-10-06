import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

interface Order {
   id: string;
   date: string;
   total: number;
   status: string;
}

export function Profile() {
   const { user } = useAuth();
   const [orders, setOrders] = useState<Order[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      fetchOrders();
   }, []);

   const fetchOrders = async () => {
      try {
         const response = await fetch('/api/orders', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });

         if (!response.ok) {
            throw new Error('Failed to fetch orders');
         }

         const data = await response.json();
         setOrders(data);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return <div>Loading profile...</div>;
   }

   if (error) {
      return <div className="error-message">{error}</div>;
   }

   return (
      <div className="profile">
         <h2>Profile</h2>

         <div className="profile-info">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
         </div>

         <div className="order-history">
            <h3>Order History</h3>
            {orders.length === 0 ? (
               <p>No orders yet</p>
            ) : (
               <div className="orders-list">
                  {orders.map((order) => (
                     <div key={order.id} className="order-card">
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ${order.total}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}
