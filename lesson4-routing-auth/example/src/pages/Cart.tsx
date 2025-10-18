import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Modal } from '../components/Modal';

export function Cart() {
   const {
      cartItems,
      updateQuantity,
      removeFromCart,
      checkout,
      getCartTotal
   } = useCart();
   const [showModal, setShowModal] = useState<boolean>(false);

   const handleCheckout = () => {
      checkout();
      setShowModal(true);
   };

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
                           onClick={() => removeFromCart(item.id)}
                        >
                           Remove
                        </button>
                     </div>
                  ))}
               </div>

               <div className="cart-summary">
                  <h3>Order Summary</h3>
                  <p><strong>Total:</strong> ${getCartTotal().toFixed(2)}</p>
                  <button
                     className="checkout-button"
                     onClick={handleCheckout}
                  >
                     Proceed to Checkout
                  </button>
               </div>
            </>
         )}

         <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Order Placed Successfully!"
            type="success"
         >
            <p>Your order has been placed successfully!</p>
            <p>You can view your order history in the Profile page.</p>
         </Modal>
      </div>
   );
}
