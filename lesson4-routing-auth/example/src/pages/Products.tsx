import { useState, useEffect } from 'react';

interface Product {
   id: string;
   name: string;
   description: string;
   price: number;
   image: string;
}

export function Products() {
   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const response = await fetch('/api/products');
         if (!response.ok) {
            throw new Error('Failed to fetch products');
         }
         const data = await response.json();
         setProducts(data);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return <div>Loading products...</div>;
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
                  <button className="add-to-cart">Add to Cart</button>
               </div>
            ))}
         </div>
      </div>
   );
}
