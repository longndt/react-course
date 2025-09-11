import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

export function Cart() {
   const [cartItems, setCartItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const { user } = useAuth();

   useEffect(() => {
      fetchCartItems();
   }, []);

   const fetchCartItems = async () => {
      try {
         const response = await fetch('/api/cart', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });

         if (!response.ok) {
            throw new Error('Failed to fetch cart items');
         }

         const data = await response.json();
         setCartItems(data);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
         setLoading(false);
      }
   };

   const updateQuantity = async (itemId, quantity) => {
      try {
         const response = await fetch(`/api/cart/${itemId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ quantity }),
         });

         if (!response.ok) {
            throw new Error('Failed to update quantity');
         }

         setCartItems((items) =>
            items.map((item) =>
               item.id === itemId ? { ...item, quantity } : item
            )
         );
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to update quantity');
      }
   };

   const removeItem = async (itemId) => {
      try {
         const response = await fetch(`/api/cart/${itemId}`, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });

         if (!response.ok) {
            throw new Error('Failed to remove item');
         }

         setCartItems((items) => items.filter((item) => item.id !== itemId));
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to remove item');
      }
   };

   const calculateTotal = () => {
      return cartItems.reduce(
         (total, item) => total + item.price * item.quantity,
         0
      );
   };

   if (loading) {
      return <div>Loading cart...</div>;
   }

   if (error) {
      return <div className="error-message">{error}</div>;
   }

   return (
      <div className="cart">
         <h2>Shopping Cart</h2>

         {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
         ) : (
            <>
               <div className="cart-items">
                  {cartItems.map((item) => (
                     <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                           <h3>{item.name}</h3>
                           <p>${item.price}</p>
                        </div>
                        <div className="quantity-controls">
                           <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                           >
                              -
                           </button>
                           <span>{item.quantity}</span>
                           <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                           >
                              +
                           </button>
                        </div>
                        <button
                           className="remove-button"
                           onClick={() => removeItem(item.id)}
                        >
                           Remove
                        </button>
                     </div>
                  ))}
               </div>

               <div className="cart-summary">
                  <h3>Order Summary</h3>
                  <p><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
                  <button className="checkout-button">Proceed to Checkout</button>
               </div>
            </>
         )}
      </div>
   );
}
