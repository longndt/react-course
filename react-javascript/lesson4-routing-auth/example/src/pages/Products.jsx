import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Modal } from '../components/Modal';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Products() {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [addedProduct, setAddedProduct] = useState('');
   const { addToCart } = useCart();

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         // Simulate slow network (3 seconds delay)
         await new Promise(resolve => setTimeout(resolve, 3000));

         // Mock data for demo purposes
         // In a real app, this would be: const response = await fetch('/api/products');
         const mockProducts = [
            {
               id: '1',
               name: 'Wireless Headphones',
               description: 'Wireless headphones with noise cancellation',
               price: 199.99,
               image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
            },
            {
               id: '2',
               name: 'Smart Watch',
               description: 'Advanced smartwatch with health monitoring features',
               price: 299.99,
               image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
            },
            {
               id: '3',
               name: 'Laptop Stand',
               description: 'Adjustable laptop stand for better ergonomics',
               price: 79.99,
               image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop'
            },
            {
               id: '4',
               name: 'Mechanical Keyboard',
               description: 'RGB mechanical keyboard with tactile switches',
               price: 149.99,
               image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop'
            }
         ];

         // Simulate API delay
         await new Promise(resolve => setTimeout(resolve, 1000));
         setProducts(mockProducts);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
         setLoading(false);
      }
   };

   const handleAddToCart = (product) => {
      addToCart(product);
      setAddedProduct(product.name);
      setShowModal(true);
   };

   if (loading) {
      return <LoadingSpinner size="fullscreen" text="Loading products..." />;
   }

   if (error) {
      return <div className="error-message">{error}</div>;
   }

   return (
      <div className="products">
         <h2>Our Products</h2>
         <div className="product-grid">
            {products.map((product) => (
               <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">${product.price}</p>
                  <button
                     className="add-to-cart"
                     onClick={() => handleAddToCart(product)}
                  >
                     Add to Cart
                  </button>
               </div>
            ))}
         </div>

         <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Added to Cart"
            type="success"
         >
            <p><strong>{addedProduct}</strong> has been added to your cart!</p>
         </Modal>
      </div>
   );
}
